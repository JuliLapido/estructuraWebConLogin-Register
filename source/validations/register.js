const {body} = require ("express-validator");

let email = body('email').notEmpty().withMessage('Email no puede quedar vacio').bail().isEmail().withMessage('Email no valido');

let password = body('password').notEmpty().withMessage('contraseña no valida').bail().isLength({min:4}).withMessage('Minimo 4 caracteres')

let validaciones = [email, password]

module.exports = validaciones;