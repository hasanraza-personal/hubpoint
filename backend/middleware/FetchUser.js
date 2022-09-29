const jwt = require('jsonwebtoken');
const JWT_SECRET = 'asjdJHD54rht534$^%$hasd';

const FetchUser = (req, res, next) => {
    // Get the user from the JWT token and add id to req Object
    const token = req.header('user-token');
    if(!token){
        res.status(401).send({error: "Access Denied"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}

module.exports = FetchUser;