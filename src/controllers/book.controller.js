'use strict'
const Book =require('../model/book.model')


function addBook (req, res) {
    let bookModel = new Book(); 
    let params = req.body;

    if (req.user.role == "admin") {
        if (params.author && params.title && params.edition && params.keywords && params.description && params.topics
            && params.copy) {
            
            bookModel.author = params.author;
            bookModel.title = params.title;
            bookModel.edition = params.edition;
            bookModel.keywords = params.keywords.split(", ")
            bookModel.description = params.description;
            bookModel.topics = params.topics.split(", ");
            bookModel.copy = params.copy;
            bookModel.available = params.copy;
            bookModel.record = 0;
            bookModel.search = 0;


            Book.find({ title: params.title }, (err, bookFind) => {
                if (err) return res.status(500).send({ message: 'ERROR al buscar el libro' })

                if (bookFind && bookFind.length > 0) {
                    return res.status(200).send({ mensaje: 'Ya existe un libro con este nombre' })
                } else {
                    
                    bookModel.save((err, bookSaved) => {
                        console.log(bookSaved)
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion guardar' });

                        if (bookSaved) {
                            return res.status(200).send({ bookSaved })
                        }
                    })
                }
            })
        } else {
            return res.status(500).send({ message: 'llene todos los campos' })
        }
    } else {
        return res.status(500).send({ message: 'No puede realizar esta acción' })
    }

}
function listBook(req, res) {
    Book.find((err, bookFind) => {
        if (err) return res.status(500).send({ message: 'ERROR al solicitar áreas de trabajo' })
        if (bookFind && bookFind.length > 0) {
            return res.status(200).send({bookFind})
        } else {
            return res.status(500).send({ message: 'No se pudieron listar las áreas de trabajo' })
        }
    })
}
function updateBook(req, res) {
    let params = req.body;
    var idBook = req.params.idBook;

    if (req.user.role == "admin") {
        Book.find({title: params.title}).exec((err,bookFound)=>{
            if (err) return res.status(500).send({ mensaje: 'ERROR en la solicitud de datos' })
            if (bookFound.length > 0 ) return res.status(500).send({ mensaje: 'El libro ya existe' })

        Book.findByIdAndUpdate(idBook, params, { new: true }, (err, bookUpdated) => { 
            if (err) return res.status(500).send({ mensaje: 'error en la peticion xads' })

            if (!bookUpdated) return res.status(500).send({ mensaje: 'error al actualizar el libro' })

            bookUpdated.keywords = params.keywords.split(", ")
            bookUpdated.topics = params.topics.split(", ") 
            return res.status(200).send({ bookUpdated })
        })
    })
    } else {
        return res.status(500).send({ mensaje: 'No puede hacer uso de esta ruta' })
    }

}
function deleteBook(req, res){
        var idBook = req.params.idBook;
      
        if (req.user.role == "admin") {
            Book.findByIdAndDelete(idBook, (err, bookDeleted) => {
            if (err) return res.status(500).send({ mensaje: 'ERROR al solicitar eliminar area de trabajo' })
            if (!bookDeleted) return res.status(500).send({ mensaje: 'ERROR al eliminar el libro' })
    
            return res.status(200).send({ mensaje: 'Libro eliminado0' ,bookDeleted})
          
        })
        } else {
          return res.status(500).send({ mensaje: 'No tiene permisos' })
        }
      


}

function findBook(req,res){
    let params = req.body

    Book.find({$or: [
        {topics: params.word},
        {keywords: params.word}
    ]}).exec((err, bookFind)=>{
        if (err) return res.status(500).send({ mensaje: 'Error al solicitar tipo de empleado' })
        if (bookFind) {
          return res.status(200).send({ bookFind })
        } else {
          return res.status(500).send({ mensaje: 'No se encontraron registros para mostrar' })
        }
      })
}

function findBookId(req, res) {
    let idBook = req.params.idBook;
  
    Book.findOne({ _id: idBook }, (err, bookFind) => {
      if (err) return res.status(500).send({ mensaje: 'Error al solicitar tipo de empleado' })
      if (bookFind) {
        return res.status(200).send({ bookFind })
      } else {
        return res.status(500).send({ mensaje: 'No se encontraron registros para mostrar' })
      }
    })
  }
  
  function booksAvailable(req, res) {
    Book.find((err, bookFind) => {
        if (err) return res.status(500).send({ message: 'ERROR al solicitar áreas de trabajo' })
        if (bookFind && bookFind.length > 0) {
            
            return res.status(200).send({bookFind})
        } else {
            
            return res.status(500).send({ message: 'No se pudieron listar las áreas de trabajo' })
        }
    })
}

function listBookRecord(req, res) {
    Book.find().sort({record:-1}).exec((err, bookFind) => {
        if (err) return res.status(500).send({ message: 'ERROR al solicitar áreas de trabajo' })
        if (bookFind && bookFind.length > 0) {
            return res.status(200).send({bookFind})
        } else {
            return res.status(500).send({ message: 'No se pudieron listar las áreas de trabajo' })
        }
    })
}

module.exports ={
    addBook,
    listBook,
    updateBook,
    deleteBook,
    findBookId,
    findBook,
    booksAvailable,
    listBookRecord
}