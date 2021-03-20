const jwt = require('jsonwebtoken');
const User = require('./models/user');

const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500  : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'LOL' : error.stack,
    });
};

const auth = async(req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, 'tempToken');
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});

        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }catch(e){
        res.status(401).send({error: 'Authenticate!'});
    }
    
}

module.exports = {
    notFound,
    errorHandler,
    auth,
};