const { json } = require('express');
const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    // si no tengo autorización
    console.log(req)
    const header = req.headers.authorization;
    if (!header){
        return res.status(401).json('No token was found');
    }
    // si no tengo token 
    const token = header.split(' ')[1]; // split nos devuelve un array, por un lado Bearer y por otro el token. SI pongo split[1], estoy accediendo al token
    if (!token){
        return res.status(401).json('Invalid token');
    }
    
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if(error){
            console.log(error);
            return res.status(400).json(error);
        }

        req.body.user = decoded;
        next();
    });
}

module.exports = verify;