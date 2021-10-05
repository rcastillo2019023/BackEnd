"use strict";
const User = require("../model/user.model");
const Book = require("../model/book.model");
const Magazine = require("../model/magazine.model")
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt.service");
const { parseZone } = require("moment");

function mainStart(req, res) {
  let userModel = new User();

  userModel.user = "adminpractica";
  userModel.password = "adminpractica";
  userModel.email = "mainAdmin@gmail.com";
  userModel.role = "admin";

  User.find({ user: userModel.user }, (err, userFind) => {
    if (err) return console.log("ERROR en la peticion");

    if (userFind && userFind.length >= 1) {
      console.log("Usuario Admin creado!");
    } else {
      bcrypt.hash(userModel.password, null, null, (err, passCrypt) => {
        userModel.password = passCrypt;
      });

      userModel.save((err, saveUser) => {
        if (err) return console.log("ERROR al crear el usuario Admin");

        if (saveUser) {
          console.log("Usuario Creado");
        }
      });
    }
  });
}

function login(req, res) {
  let params = req.body;

  if (params.user && params.password) {
    User.findOne({ user: params.user }).exec((err, userFound) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (userFound) {
        
        bcrypt.compare(
          params.password,
          userFound.password,
          (err, passCorrect) => {
            if (passCorrect) {
              userFound.password = undefined;
              return res
                .status(200)
                .send({ token: jwt.userToken(userFound), userFound });
            } else {
              return res.status(404).send({ mensaje: "Password incorrecta" });
            }
          }
        );
      } else {
        return res.status(404).send({ mensaje: "Usuario no encontrado" });
      }
    });
  } else {
    return res.status(500).send({ mensaje: "Ingrese todos los campos" });
  }
}

function registerUser(req, res) {
  let userModel = new User();
  let params = req.body;
  if (
    params.id &&
    params.user &&
    params.password &&
    params.email &&
    params.name &&
    params.lastName
  ) {
    userModel.id = params.id;
    userModel.user = params.user;
    userModel.password = params.password;
    userModel.email = params.email;
    userModel.name = params.name;
    userModel.lastName = params.lastName;
    userModel.record = 0
    userModel.lend = 0

    userModel.role = "estudiante";

    User.find({ user: params.user }).exec((err, userFound) => {
      if (err)
        return res
          .status(500)
          .send({ mensaje: "Error en la busqueda de usuario" });
      if (userFound && userFound.length > 0) {
        return res.status(200).send({ mensaje: "El nombre usuario ya existe" });
      } else {
        User.find({ id: params.id }).exec((err, userFound) => {
          if (err)
            return res
              .status(500)
              .send({ mensaje: "Error en la busqueda de usuario" });
          if (userFound && userFound.length > 0) {
            return res
              .status(200)
              .send({ mensaje: "El numero de carnet ya esta registrado" });
          } else {
            bcrypt.hash(params.password, null, null, (err, passE) => {
              userModel.password = passE;
              userModel.save((err, userSaved) => {
                if (err)
                  return res
                    .status(500)
                    .send({ mensaje: "Error en la peticion guardar" });
                if (userSaved) {
                  return res.status(200).send({ userSaved });
                }
              });
            });
          }
        });
      }
    });
  } else {
    return res.status(500).send({ mensaje: "Ingrese todos los campos" });
  }
}

function registerLibrarian(req, res) {
  let userModel = new User();
  let params = req.body;
  if (
    params.id &&
    params.user &&
    params.password &&
    params.email &&
    params.name &&
    params.lastName
  ) {
    userModel.id = params.id;
    userModel.user = params.user;
    userModel.password = params.password;
    userModel.email = params.email;
    userModel.name = params.name;
    userModel.lastName = params.lastName;
    userModel.record = 0
    userModel.lend = 0
    userModel.role = "bibliotecario";

    User.find({ user: params.user }).exec((err, userFound) => {
      if (err)
        return res
          .status(500)
          .send({ mensaje: "Error en la busqueda de usuario" });
      if (userFound && userFound.length > 0) {
        return res.status(200).send({ mensaje: "El nombre usuario ya existe" });
      } else {
        User.find({ id: params.id }).exec((err, userFound) => {
          if (err)
            return res
              .status(500)
              .send({ mensaje: "Error en la busqueda de usuario" });
          if (userFound && userFound.length > 0) {
            return res
              .status(200)
              .send({ mensaje: "El numero CUI ya esta registrado" });
          } else {
            bcrypt.hash(params.password, null, null, (err, passE) => {
              userModel.password = passE;
              userModel.save((err, userSaved) => {
                if (err)
                  return res
                    .status(500)
                    .send({ mensaje: "Error en la peticion guardar" });
                if (userSaved) {
                  return res.status(200).send({ userSaved });
                }
              });
            });
          }
        });
      }
    });
  } else {
    return res.status(500).send({ mensaje: "Ingrese todos los campos" });
  }
}

function addAdmin(req, res) {
  let params = req.body;
  let userModel = new User();
  if (req.user.role == "admin") {
    if (params.email && params.password && params.user) {
      userModel.id = params.id;
      userModel.name = params.name;
      userModel.lastName = params.lastName;
      userModel.user = params.user;
      userModel.email = params.email;
      userModel.password = params.password;
      userModel.record = 0
      userModel.lend = 0
      userModel.role = "admin";

      User.find({ user: params.user }).exec((err, userFound) => {
        if (err)
          return res
            .status(500)
            .send({ mensaje: "Error en la busqueda de usuario" });
        if (userFound && userFound.length > 0) {
          return res.status(500).send({ mensaje: "El usuario ya existe" });
        } else {
          bcrypt.hash(params.password, null, null, (err, passE) => {
            userModel.password = passE;
            userModel.save((err, userSaved) => {
              if (err)
                return res
                  .status(500)
                  .send({ mensaje: "Error en la peticion guardar" });
              if (userSaved) {
                return res.status(200).send({ userSaved });
              }
            });
          });
        }
      });
    } else {
      return res.status(500).send({ mensaje: "Ingrese todos los campos" });
    }
  } else {
    return res
      .status(500)
      .send({ mensaje: "No posee permisos para agregar un administrador" });
  }
}

function listProfile(req, res) {
  User.find({ _id: req.user.sub }).exec((err, userFound) => {
    if (err) return res.status(500).send({ mensaje: "error en la peticion" });
    return res.status(200).send({ userFound });
  });
}

function listUsers(req, res) {
  if (req.user.role == "admin") {
    User.find({ role: 'estudiante'}).exec((err, userFound) => {
      if (err) return res.status(500).send({ mensaje: "error en la peticion" });
      return res.status(200).send({ userFound });
    });
} else {
  return res.status(500).send({ mensaje: "No posee permisos" });
}
}

function listAdmins(req, res) {
  if (req.user.role == "admin") {
    User.find({role:'admin'}).exec((err, usersFound) => {
        if (err){return res.status(500).send({ mensaje: "error en la peticion" });}
        return res.status(200).send({ usersFound });
      }
    );
  } else {
    return res.status(500).send({ mensaje: "No posee permisos" });
  }
}

function listLibrarians(req, res) {
  if (req.user.role == "admin") {
    User.find({ role: "bibliotecario" }).exec((err, usersFound) => {
      if (err) return res.status(500).send({ mensaje: "error en la peticion" });
      return res.status(200).send({ usersFound });
    });
  } else {
    return res.status(500).send({ mensaje: "No posee permisos" });
  }
}

function deleteProfile(req, res) {
  User.findByIdAndDelete(req.user.sub, (err, userDeleted) => {
    if (err)
      return res.status(500).send({ mensaje: "error en la peticion eliminar" });
    if (!userDeleted)
      return res.status(500).send({ mensaje: "error al eliminar usuario" });
    return res.status(200).send({ userDeleted });
  });
}

function deleteUsers(req, res) {
  var idUser = req.params.idUser;

  if (req.user.role == "admin") {
    User.findByIdAndDelete(idUser, (err, userDeleted) => {
      if (err)
        return res
          .status(500)
          .send({ mensaje: "ERROR al solicitar eliminar usuario" });
      if (!userDeleted)
        return res
          .status(500)
          .send({ mensaje: "ERROR al eliminar al usuario" });

      return res.status(200).send({ mensaje: "Usuario eliminado" });
    });
  } else {
    return res.status(500).send({ mensaje: "No puede modificar este usuario" });
  }
}

function updateUsers(req, res) {
  var idUser = req.params.idUser;
  var params = req.body;

  User.find({ user: params.user }).exec((err, userUpdated) => {
    if (err)
      return res
        .status(500)
        .send({ mensaje: "ERROR en la solicitud de datoss" });
    if (userUpdated.length > 0)
      return res
        .status(500)
        .send({ mensaje: "El nombre del usuario ya existe" });
    console.log(params);
    User.findByIdAndUpdate(idUser, params, { new: true }, (err, userFind) => {
      if (err)
        return res
          .status(500)
          .send({ mensaje: "ERROR en la solicitud de datos" });
      if (!userFind)
        return res.status(500).send({ mensaje: "Error al actualizar usuario" });
      return res.status(200).send({ userFind });
    });
  });
}

function updateProfile(req, res) {
  let params = req.body;
  var idUser = req.user.sub;
  console.log(params);
  User.find({ user: params.user }).exec((err, userUpdated) => {
    if (err)
      return res
        .status(500)
        .send({ mensaje: "ERROR en la solicitud de datos" });
    if (userUpdated.length > 0)
      return res
        .status(500)
        .send({ mensaje: "El nombre del usuario ya existe" });

    User.findByIdAndUpdate(idUser, params, { new: true }, (err, userFind) => {
      if (err)
        return res
          .status(500)
          .send({ mensaje: "ERROR en la solicitud de datosss" });
      if (!userFind)
        return res.status(500).send({ mensaje: "Error al actualizar perfil" });
      return res.status(200).send({ userFind });
    });
  });
}

function findUserId(req, res) {
  var idUser = req.params.idUser;

  User.findOne({ _id: idUser }).exec((err, userFind) => {
    if (err)
      return res.status(500).send({ mensaje: "Error al solicitar usuario" });
    if (userFind) {
      return res.status(200).send({ userFind });
    } else {
      return res
        .status(500)
        .send({ mensaje: "No se encontraron registros para mostrar" });
    }
  });
}


function lendBook(req, res) {
  let idBook = req.params.idBook;
 

  Book.findById(idBook ,(err, bookFound) => {
    if (err)
      return res.status(500).send({ menssage: "error al buscar el libro" });
    if (!bookFound)
      return res.status(500).send({ menssage: "No existe el libro" });
      var ava = bookFound.available-1
      var re = bookFound.record+1
      
  User.findById(req.user.sub,(err, userFound) => {
   
    if(err) return res.status(500).send({ menssage: "error en la peticion" });
    if (!userFound)
    return res.status(500).send({ menssage: "El usuario no exite" });
   
    if (userFound && userFound.lend >= 10) {
      return res.status(200).send({ mensaje: "limite de libros prestados ha sido alcanzado" });
    } else {
    var cant = userFound.record+1;
    console.log(cant)
    var len = userFound.lend+1;
    console.log(len)
    User.findByIdAndUpdate(req.user.sub,
      {
        $push: {
          loan: {state: "prestado", idBook: idBook,title:bookFound.title,author:bookFound.author,description:bookFound.description },
        },
      },
      { new: true },
      (err, lend) => {
        if (err)
          return res.status(500).send({ menssage: "error al agregar libro" });
        
          User.findByIdAndUpdate(req.user.sub, { lend: len } , { new: true }, (err, aumento) => {
          })
        User.findByIdAndUpdate(req.user.sub, { record: cant } , { new: true }, (err, aumento) => {
        })
        Book.findByIdAndUpdate(idBook, {available: ava }, { new: true }, (err, aumento) => {
        })
        Book.findByIdAndUpdate(idBook, {record: re }, { new: true }, (err, aumento) => {
        })
        return res.status(200).send({ lend });
      });
    }
    });
  });
}

function returnBook(req, res) {
  let idBook= req.params.idBook;
  var idLend = req.params.idLend;
 
 
  Book.findById(idBook ,(err, bookFound) => {
    if (err)
      return res.status(500).send({ menssage: "error al buscar el libro" });
    if (!bookFound)
      return res.status(500).send({ menssage: "No existe el libro" });
      
      var ava = bookFound.available+1
      
      User.findById(req.user.sub,(err, userFound) => {
   
        if(err) return res.status(500).send({ menssage: "error en la peticion" });
        if (!userFound)
        return res.status(500).send({ menssage: "El usuario no exite" });
        var len = userFound.lend-1   
       User.findOneAndUpdate({ _id: req.user.sub, "loan._id": idLend}, 
       { "loan.$.state": 'devuelto' }, {new: true, useFindAndModify: false}, (err, comentarioEditado)=>{
          if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Comentario' });
          if(!comentarioEditado) return res.status(500).send({ mensaje: 'No posee los permisos para editar este comentario' });
          Book.findByIdAndUpdate(idBook, {available: ava }, { new: true }, (err, aumento) => {
          })
          User.findByIdAndUpdate(req.user.sub, { len: len} , { new: true }, (err, aumento) => {
           
          })
          return res.status(200).send( {comentarioEditado} )
      } )
    });
  });
  
}


function lendMagazine(req, res) {
  let idMagazine = req.params.idMagazine;
 

  Magazine.findById(idMagazine ,(err, magazineFound) => {
    if (err)
      return res.status(500).send({ menssage: "error al buscar el libro" });
    if (!magazineFound)
      return res.status(500).send({ menssage: "No existe el libro" });
      var ava = magazineFound.available-1
      var re = magazineFound.record+1
      
  User.findById(req.user.sub,(err, userFound) => {
   
    if(err) return res.status(500).send({ menssage: "error en la peticion" });
    if (!userFound)
    return res.status(500).send({ menssage: "El usuario no exite" });
   
    if (userFound && userFound.lend >= 10) {
      return res.status(200).send({ mensaje: "limite de libros prestados ha sido alcanzado" });
    } else {
    var cant = userFound.record+1;
    console.log(cant)
    var len = userFound.lend+1;
    console.log(len)
    User.findByIdAndUpdate(req.user.sub,
      {
        $push: {
          loan: {state: "prestado", idMagazine: idMagazine,title:magazineFound.title,author:magazineFound.author,description:magazineFound.description },
        },
      },
      { new: true },
      (err, lend) => {
        if (err)
          return res.status(500).send({ menssage: "error al agregar libro" });
        
          User.findByIdAndUpdate(req.user.sub, { lend: len } , { new: true }, (err, aumento) => {
          })
        User.findByIdAndUpdate(req.user.sub, { record: cant } , { new: true }, (err, aumento) => {
        })
        Magazine.findByIdAndUpdate(idMagazine, {available: ava }, { new: true }, (err, aumento) => {
        })
        Magazine.findByIdAndUpdate(idMagazine, {record: re }, { new: true }, (err, aumento) => {
        })
        return res.status(200).send({ lend });
      });
    }
    });
  });
}

function returnMagazine(req, res) {
  let idMagazine= req.params.idMagazine;
  var idLend = req.params.idLend;
 
 
  Magazine.findById(idMagazine ,(err, magazineFound) => {
    console.log(idMagazine)
    if (err)
      return res.status(500).send({ menssage: "error al buscar el libro" });
    if (!magazineFound)
      return res.status(500).send({ menssage: "No existe la revista" });
      
      var ava = magazineFound.available+1
      
      User.findById(req.user.sub,(err, userFound) => {
   
        if(err) return res.status(500).send({ menssage: "error en la peticion" });
        if (!userFound)
        return res.status(500).send({ menssage: "El usuario no exite" });
        var len = userFound.lend-1   
       User.findOneAndUpdate({ _id: req.user.sub, "loan._id": idLend}, 
       { "loan.$.state": 'devuelto' }, {new: true, useFindAndModify: false}, (err, comentarioEditado)=>{
          if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Comentario' });
          if(!comentarioEditado) return res.status(500).send({ mensaje: 'No posee los permisos para editar este comentario' });
          Magazine.findByIdAndUpdate(idMagazine, {available: ava }, { new: true }, (err, aumento) => {
          })
          User.findByIdAndUpdate(req.user.sub, { len: len} , { new: true }, (err, aumento) => {
           
          })
          return res.status(200).send( {comentarioEditado} )
      } )
    });
  });
  
}
function listUsersRecord(req, res) {
  if (req.user.role == "admin") {
    User.find({ role: 'estudiante'}).sort({lend:-1}).exec((err, userFound) => {
      if (err) return res.status(500).send({ mensaje: "error en la peticion" });
      return res.status(200).send({ userFound });
    });
} else {
  return res.status(500).send({ mensaje: "No posee permisos" });
}
}
module.exports = {
  mainStart,
  registerUser,
  registerLibrarian,
  login,
  addAdmin,
  listProfile,
  listLibrarians,
  deleteProfile,
  deleteUsers,
  updateUsers,
  updateProfile,
  findUserId,
  lendBook,
  returnBook,
  listAdmins,
  listUsers,
  listUsersRecord,
  lendMagazine,
  returnMagazine
}; 
