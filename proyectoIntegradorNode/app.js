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




app.use(function(req,res,next){

  // Para poder compartir esta información entre toooodas mis vistas. 
  //  Utilizamos la variable res.locals, la cual es un objeto literal que utilizo para almacenar 
  // todos los valores que quieran compartir con todas las vistas. 
  
  res.locals={

    //Luego a res.locals, voy a querer compartirle el usuarioLogueado y le voy a poner req.session.usuarioLogueado.
    usuarioLogueado: req.session.usuarioLogueado
  }
  next();

  // Ya no hace falta ponerlo en todos los Controllers ahora, ya que compartí  mi usuarioLogueado con todas mis vistas con res.locals. 

});


//  Para finalizar la implementación de cookies, hay que hacer una validación en app.js, 
// lo hago aquí porque el app.js es codigo que se ejecuta para todas las paginas. 


//Entonces armo mi app.use con una function con req,res,next el cual sirve para hacer cosas que se hagan en todas las pagina. 
app.use(function(req,res,next){


  // Hago un if, que dice, que hay una cookie que guarda el idDelUsuarioLogueado (el cual es el nombre de mi cookie)
  // y es distinto undefined, (es decir hay algo ahí adentro), 
  // pero además en session no hay nada (req.session.usuarioLogueado == undefined))

  // Este if lo que valida que hay una cookie, 
  // el usuario dijo que quiere que lo recuerden pero como cerro el navegador quedo deslogueado. 

  if(req.cookies.idDelUsuarioLogueado != undefined && req.session.usuarioLogueado == undefined){

  // Ahora que me traje la base de datos, pido un usuario, a mi modelo de usuarios, que matchee con mi primary key 
  // segun lo que hay en la cookie.
  // El findByPk es un método que busca un registro con la clave primaria del mismo valor del parámetro que le pasamos, 
  // que en este caso es lo que hay en la cookie, o sea el id del usuario que nos dijo que lo recordemos

    db.usuarios.findByPk(req.cookies.idDelUsuarioLogueado)

    // Luego como toda promesa, tengo un .then con una function que recibe a usuarios.


    .then(function(usuarios){

    // lo siguiente que hago es loguear al usuario, es decir, pongo en session todos los datos del usuario logueado
      req.session.usuarioLogueado = usuarios;
   
      // refresheo la pagina para acatar posibles errores en la cookie
      res.redirect(req.originalUrl);
      next();
    })
  } else {
    next();
  }
});

// En resumen lo que hace el IF es que ataja donde el usuario clickeo en recordame, 
// es decir se guardó la cookie, pero como cerró el navegador, se perdió la session. 
//El if chequea eso, si hay una cookie y el usuario no está logueado, voy a tener que ejecutar 
//la lógica que está dentro del if, para que se autologee. 



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
