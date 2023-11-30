// controllers/authController.js
const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('login/login', { title: 'Login' });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.render('login', { title: 'Login', error: 'Please provide both username and password' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists and the password is correct
    if (user && user.comparePassword(password)) {
      // Set up the user session
      req.session.user = user;

      // Redirect to the user profile route
      return res.redirect('/user/profile');
    } else {
      // Authentication failed
      return res.render('login', { title: 'Login', error: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle errors (e.g., database connection issues)
    console.error(error);
    return res.render('login', { title: 'Login', error: 'An error occurred during login' });
  }
};

exports.getSignup = (req, res) => {
  res.render('login/signup', { title: 'signup'});
};

exports.postSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('login/signup', { title: 'Signup', error: 'Email already in use' });
    }

    const newUser = new User({ username, email, password });

    await newUser.save();

    // Redirect to the login page after successful signup
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    console.log(error)
    res.render('error', { title: 'Error', error: 'An error occurred during signup', message: 'Need to look into this more '});
  }
};

exports.logout = (req, res) => {
  req.logout(); // This function removes the user from the session
  res.redirect('/');
};

