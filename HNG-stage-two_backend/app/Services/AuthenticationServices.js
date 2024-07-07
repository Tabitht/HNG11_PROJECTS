const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addSeconds, getTime } = require('date-fns');
//const path = require('path');
//const { User, Organisation } = require(path.join(__dirname, '../model'));
const { User, Organisation } = require('../Model/Users-and-Organisation');

async function registerUser(userData) {
    const existingUser = await User.findOne({ where: { email: userData.email }})
    if (existingUser) {
        console.log('user already exist');
        const error = new Error('Registration unsuccessful');
        error.status = 'Bad request';
        error.statusCode = 400;
        throw error;
    }

    let hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({ 
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        phone: userData.phone
    })

    const organisationName = `${userData.firstName}'s Organisation`;
    const organisation = await Organisation.create({ name: organisationName });

    await user.addOrganisation(organisation).then(updated => {
        console.log('organisation added', updated)});
    

    const expiryDate = addSeconds(new Date(), process.env.JWT_TOKEN_EXPIRY);

    const token = jwt.sign(
        { userId: user.userId,
          exp: Math.floor(getTime(expiryDate) / 1000),
          email: user.email  
        }, 
        process.env.JWT_SECRET, 
        {
            issuer: process.env.JWT_TOKEN_ISSUER,
            notBefore: '0s'
        }
    );
    return {
        status: "success",
        message: "Registration successful",
        data: {
            accessToken: token,
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        }
    }
}

async function loginUser(email, password){
    const user = await User.findOne({ where: { email: email }});
    if(!user) {
        console.log('User not found');
        const error = new Error('Authentication failed');
        error.status = 'Bad request';
        error.statusCode = 401;
        throw error;
    }
    const matches = await bcrypt.compare(password, user.password);
    
    if(!matches) {
        console.log('password does not match');
        const error = new Error('Authentication failed');
        error.status = 'Bad request';
        error.statusCode = 401;
        throw error;
    }

    const expiryDate = addSeconds(new Date(), process.env.JWT_TOKEN_EXPIRY);

    const token = jwt.sign(
        { userId: user.userId,
          exp: Math.floor(getTime(expiryDate) / 1000),
          email: user.email  
        }, 
        process.env.JWT_SECRET, 
        {
            issuer: process.env.JWT_TOKEN_ISSUER,
            notBefore: '0s'
        }
    );

    return {
        status: "success",
        message: "login successful",
        data: {
            accessToken: token,
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        }
    }

}
module.exports = {
    registerUser,
    loginUser
}
















