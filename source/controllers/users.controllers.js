const {index,write} = require('../models/users.model');
const {validationResult} = require("express-validator");

module.exports = {
    login: (req,res) => res.render('users/login'),
    register: (req,res) => res.render('users/register'),
    profile: (req,res) => res.render('users/profile'),
    save: (req,res) => {

        //control de las validaciones
        const result = validationResult (req);
        if(!result.isEmpty()) {
            let errores = result.mapped();
            return res.render('users/register', {
                style:'register',
                errores: errores,
                data: req.body
            })
        }
        //si pasamos las validaciones
        let all = index();
        req.body.avatar = req.files && req.files[0] ? req.files[0].filename : null
        req.body.id = all.length > 0 ? all.pop().id + 1 : 1
        let user = {...req.body};
        all.push(user)
        write(all)
        return res.redirect('/users/login')
    },
    access: (req,res) => {
        //control de las validaciones
        const result = validationResult (req);
        if(!result.isEmpty()) {
            let errores = result.mapped();
            return res.render('users/login', {
                style:'login',
                errores: errores,
                data: req.body
            })
        }


        res.cookie('user', req.body.email, {maxAge: 1000 * 60 * 60 * 24}) // cuanto tiempo se queda logueado el usuario
        let all = index();
        res.session.user = all.find(user => user.email == req.body.email)


    return res.rediret('/')
   }
}



