const {index} = require('../models/users.model') 
let middleware = (req, res, next) => {

    let user = null;

    // caso 1 - existe cookie de usuario (user)

    if(req.cookies && req.cookies.user){
        let users = index()
        let result = users.find(user => user.email === req.cookies.user)
        req.session.user = result 
    }

    // caso 2 - existe un usuario en sesion (user en sesion)

    if(req.session && req.session.user){
        user = req.session.user
    }

    res.locals.user = user


    return next()

    }

    module.exports = middleware