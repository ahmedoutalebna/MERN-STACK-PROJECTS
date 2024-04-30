const jwt = require('jsonwebtoken')

const generateToken = async(res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'})
    // save the token in cookies
    res.cookie('jwtToken', token, {
        httpOnly: true, // this cookies can be accessible only via http request not js
        secure: true, // this cookies is sending over HTTPS protocol
        sameSite: 'strict', // preventing CSRF attacks by using only first party context
        maxAge: 30 * 24 * 60 * 60 * 1000  // this cookies is valid for 30 days (milliseconds)
    })
}

module.exports = generateToken

// const jwt = require('jsonwebtoken');

// // Define your payload (data to be included in the token)
// const payload = {
//   userId: '123456',
//   username: 'exampleuser'
// };

// // Define your secret key (used to sign the token)
// const secretKey = 'your_secret_key';

// // Generate the JWT token
// const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // expiresIn is optional, it sets expiration time for the token

// console.log('Generated token:', token);
