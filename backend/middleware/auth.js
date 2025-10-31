const jwt = require('jsonwebtoken');

require('dotenv').config();

function auth(req,res,next){
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.status(401).json({msg:'No Token'});
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({ msg: 'Token invalid' });
    }
}

module.exports=auth;