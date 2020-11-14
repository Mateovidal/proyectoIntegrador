var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// requerimos el paquete de session en el app
var session = require("express-session");

// me traigo la base de datos para poder laburar la parte de la cookie
var db = require("./database/models/index")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// esto es necesario para el session

app.use(session({ secret: "Vamo arriba"}));

// para tener mi informacion en todas las vistas, 
// el res.locals nos permite tener informacion que yo quiero compartir con toooodas las vistas, 
// No hace falta ir al controllador porue esto ya esta ebn todas las vistas
// comparto el usuario logueado con todoas las vistas con el res.locals

app.use(function(req,res,next){

  res.locals={
    usuarioLogueado: req.session.usuarioLogueado
  }
  next();

});

app.use(function(req,res,next){

  // hay una cookie, el usuario dijo que quiere que lo recuerden priemr parametro
  // pero, como cerro el navegador quedo deslogueado
  if(req.cookies.idDelUsuarioLogueado != undefined && req.session.usuarioLogueado == undefined){

    // pedimos un usuario que matchee la primary key segun lo que hay en la cookie
    // ya si estoy este if estoy seguro que hay algo en la cookie 

    db.usuarios.findByPk(req.cookies.idDelUsuarioLogueado)
    .then(function(usuarios){
      // logueo al usuario, pongo en session todos los datos del usuario logueado 
      req.session.usuarioLogueado = usuarios;
      // refresheo la pagina para acatar posibles errores en la cookie
      res.redirect(req.originalUrl);
      next();
    })
  } else {
    next();
  }
});

// si hay cookie pero nada en session, el usuario tildo en recordame y lo tengo que loguear

app.use('/', indexRouter);
app.use('/users', usersRouter);

let rutaRegistracion = require('./routes/registracion')
app.use('/registracion', rutaRegistracion)

let rutaResultadoBusqueda = require('./routes/resultadoBusqueda')
app.use('/resultadoBusqueda', rutaResultadoBusqueda)

let rutaAgregarPost = require('./routes/agregarPost')
app.use('/agregarPost', rutaAgregarPost)

let rutaDetallePost = require('./routes/detallePost')
app.use('/detallePost', rutaDetallePost)

let rutasHome = require("./routes/home");
app.use("/home",rutasHome);

let rutasLogin = require("./routes/login");
app.use("/login",rutasLogin);

let rutasLogout = require("./routes/login");
app.use("/logout",rutasLogout);

// let rutasEditPerfil = require("./routes/editPerfil");
// app.use("/editPerfil",rutasEditPerfil);

let rutasMiPerfil = require("./routes/miPerfil");
app.use("/miPerfil",rutasMiPerfil);


const router = require('./routes/index');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
