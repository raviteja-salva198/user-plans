// controllers/planController.js
const Plan = require('../models/Plan');
const nodemailer = require('nodemailer');

// Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com', // Replace with your SMTP host
//   port: 587, // Replace with your SMTP port
//   secure: false, // Use TLS
//   auth: {
//     user: 'ravi9381598559@gmail.com', // Replace with your email
//     pass: 'Ravi@198' // Replace with your email password or app-specific password
//   }
// });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gade.manicharan12@gmail.com',
    pass: 'eghd jrrw awkt iate'  // App password instead of your Gmail password
  }
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Aptitude Guru Hem" gade.manicharan12@gmail.com', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: `<b>${text}</b>`, // html body (optional)
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Buy or Update Plan
const buyPlan = async (req, res) => {
  const { userId } = req.params;
  const { planName, email } = req.body;
  const time = new Date();

  try {
    let userPlan = await Plan.findOne({ userId });

    if (userPlan) {
      userPlan.planName = planName;
      userPlan.time = time;
      await userPlan.save();
    } else {
      const newPlan = new Plan({ userId, planName, time });
      await newPlan.save();
    }

    // Send email notification
    await sendEmail(
      email,
      'Plan Update Confirmation',
      `Your plan has been updated to ${planName}. Thank you for your purchase!`
    );

    res.status(200).json({ success: true, message: 'Plan purchased successfully and email sent' });
  } catch (error) {
    console.error('Error in buyPlan:', error);
    res.status(500).json({ error: 'Failed to save plan or send email' });
  }
};

// Get Current Plan
const getCurrentPlan = async (req, res) => {
  const { userId } = req.params;

  try {
    const plan = await Plan.findOne({ userId });
    res.status(200).json(plan || { planName: null });
  } catch (error) {
    console.error('Error in getCurrentPlan:', error);
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
};

module.exports = {
  buyPlan,
  getCurrentPlan
};


// // controllers/planController.js
// const Plan = require('../models/Plan');

// // Buy or Update Plan
// const buyPlan = async (req, res) => {
//   const { userId } = req.params;
//   const { planName } = req.body;
//   const time = new Date();

//   try {
//     let userPlan = await Plan.findOne({ userId });

//     if (userPlan) {
//       userPlan.planName = planName;
//       userPlan.time = time;
//       await userPlan.save();
//     } else {
//       const newPlan = new Plan({ userId, planName, time });
//       await newPlan.save();
//     }

//     res.status(200).json({ success: true, message: 'Plan purchased successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to save plan' });
//   }
// };

// // Get Current Plan
// const getCurrentPlan = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const plan = await Plan.findOne({ userId });
//     res.status(200).json(plan || { planName: null });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch plan' });
//   }
// };

// module.exports = {
//   buyPlan,
//   getCurrentPlan
// };
