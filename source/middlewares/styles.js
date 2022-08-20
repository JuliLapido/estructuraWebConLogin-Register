// TODO Middleware to send style property to views without controllers 

let middleware = (req, res, next) => {
let ruta = req.path.split("/").pop()
let style = ruta.length > 0 ? ruta : "home"
res.locals.style = style
return next()
}

module.exports = middleware