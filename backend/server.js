import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import listEndpoints from 'express-list-endpoints';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true,
  }
});

userSchema.pre('save', async function (next) {
  const user = this;
  // isModified: "Returns true if any of the given paths is modified, else false. If no arguments, returns true if any path in this document is modified."
  // https://mongoosejs.com/docs/api.html#document_Document-isModified
  if (!user.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  // Hash the password – this happens after the validation.
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

// Set up in which PORT to run server
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Authenticator function to validate access to restricted endpoints
// This function expects the user's access token which is sent in the
// Authorization header in the GET request
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header('Authorization') });

    if (user) {
      // if the user is found, we attach the user to the request object and call
      // the next() function so they can access the restricted page
      req.user = user;
      next();
    } else {
      res.status(401).json({ loggedOut: true, message: 'Please try logging in again' });
    }
  } catch (err) {
    res.status(403).json({ message: 'Access token is missing or wrong', errors: err });
  }
};

// ROUTES
// Landing Page: will show a list of the existing endpoints
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

// SIGN UP ENDPOINT - to create a NEW account - Sign Up
// This endpoint expects a name and password in the body from the POST request from the Frontend
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body;

    // this will create a new user in the database, store the name and the encrypted password.
    const user = await new User({ name, password }).save();

    // if the user was saved successfully, the response will include the newly saved user's ID and their access token
    res.status(201).json({ userId: user._id, accessToken: user.accessToken });
  } catch (error) {
    res.status(400).json({ message: 'Could not create user', error });
  }
});

// RESTRICTED ENDPOINT: only accesible after user has logged in and has valid access token
// this endpoint is restricted, so the user's access token must be included in the GET request's 
// Authorization header done in the Frontend
app.get('/users/:id/secret', authenticateUser);
app.get('/users/:id/secret', (req, res) => {
  // At this point the user has been added to the request object, so we have access to
  // that specific user's data
  const secretMessage = `This is a super secret message for ${req.user.name}`;
  res.status(201).json({ secretMessage });
});

// LOGIN ENDPOINT - login for already existing users
// This endpoint expects a username and password from frontend POST request
app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (user && bcrypt.compareSync(password, user.password)) {
      // if the user is found and the password matches, we respond with the user ID and their access token
      res.status(201).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(404).json({ notFound: true, message: 'Verify username and password is correct' });
    }
  } catch (err) {
    res.status(404).json({ notFound: true, message: 'Verify username and password is correct' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
