const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./jwt');
const bcrypt = require('bcrypt');
const DetailsModel = require('./Details-crudModel');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4004;
const secretKey = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM.,1234567890!@#$%^&*()';

app.use(express.json());
const db = require('./config');
const generateOTP = require('./otp');
const multer = require('multer');
var otpCache = undefined
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

//--------------user login ---------------------
app.post('/userlogin', async (req, res) => {
  try {
    const { email } = req.body;
    const { otp, hashedOTP } = await generateOTP(email);
    otpCache = hashedOTP
    console.log("Generated OTP", otp)
    res.json({ message: 'OTP generated and sent to your email for verification.' });
  } catch (error) {
    console.error('Error during OTP generation and sending:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/getotp', async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    if (!email || !password || !otp) {
      return res.status(400).json({ error: 'Email, password, and OTP are required.' });
    }
    const userOtp = await DetailsModel.findOne({ email });
    if (!userOtp) {
      return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
    }
    const otpMatch = await bcrypt.compare(otp, otpCache);
    if (!otpMatch) {
      return res.status(400).json({ error: 'Incorrect OTP. Please try again.' });
    } else {
      console.log("--------- OTP Verified----------")
    }
    const user = await DetailsModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1d' });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
//-----------------------------------------------------------
const upload = multer({ dest: 'uploads/' });
// Handle user registration
app.post('/userregister/', upload.single('image'), async (req, res) => {
  const { name, email, phone, address, city, state, country, password } = req.body;
  try {
    const user = await DetailsModel.findOne({ email: email });
    if (user) {
      console.log('User with this email already exists');
      res.json('email is already exist..');
    } if (!name || !email || !phone || !address || !city || !state || !country) {
      res.json('Field is required.');
    } if (!user) {
      const hashedPassword = await bcrypt.hash(password, 7);
      const newDetail = new DetailsModel({
        name, email, phone, address, city, state, country, password: hashedPassword,
      });
      const result = await newDetail.save();
      res.status(201).json({ message: 'User registered successfully', user: result });
    } else {
      res.json(" Account Not created ");
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//------------------------Updateuser-------------------
app.put('/updateuser/:Id', authenticateToken, upload.single('image'), async (req, res) => {
  const storedUserId = req.params.userId;
  try {
    const userId = req.userId;
    const { name, email, phone, address, city, state, country, password } = req.body;
    let imagePath = '';
    if (req.file) {
      imagePath = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    }
    const updatedDetails = {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      password,
      image: imagePath,
    };
    const result = await DetailsModel.findByIdAndUpdate(userId, updatedDetails);
    if (result) {
      res.json('User details updated successfully');
    } else {
      res.status(404).json({ error: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Internal server errorrr' });
  }
});
//****** To Delete ******/

app.delete('/deleteuser/:Id', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({ error: 'User Not Found...' });
    }
    const deleteuser = await DetailsModel.findByIdAndDelete(userId);
    if (!deleteuser) {
      return res.status(404).json('Details not found for the provided ID.');
    }
    res.json('Details deleted successfully');
  } catch (error) {
    console.error('Error deleting details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user/:userId', async (req, res) => {
  const storedUserId = req.params.userId;
  try {
    const user = await DetailsModel.findById(storedUserId);
    if (!user) {
      return res.status(404).json({ error: 'User not foundd' });
    }
    console.log(user);
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user detailsss:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//****** To GET user details ******/
//-------- ALL users------------
app.get('/userdetails', async (req, res) => {
  try {
    const details = await DetailsModel.find();
    res.json(details);
    console.log(details);
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});