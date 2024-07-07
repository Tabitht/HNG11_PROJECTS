const jwt = require('jsonwebtoken');
const User = require('../Model/User');

async function authenticateuser(request, response, next) {
    const authorizationHeader = request.headers.authorization;

    if (! authorizationHeader) {
        return response.status(401).json({
            'data': {
                'error': {
                    'title': 'Authentication error',
                    'message': 'Authenticate to continue'
                }
            }
        });
    }

    try{
        const token = authorizationHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded);
        const decodedToken = jwt.decode(token);
        //console.log('Decoded Token:', decodedToken);

        const user = await User.findOne({ where: { userId: decoded.userId } });
        console.log('User from DB:', user);

        if (!user) {
      console.error('User not found for ID:', decoded.userId);
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized: user not found',
        statusCode: 401,
      });
    }

    req.user = user;
    next();
    } catch (error) {
    response.status(401).json({
      status: 'fail',
      message: 'Unauthorized: invalid token',
      statusCode: 401,
    });
    }
}
module.exports = authenticateuser;
