'use strict'
const Magazine =require('../model/magazine.model')


function addMagazine (req, res) {
    let magazineModel = new Magazine();
    let params = req.body;

    if (req.user.role == "admin") {
        if (params.author && params.title && params.edition && params.description && params. frequency  && params.exemplar 
            && params.topics && params.keywords  && params.copy) {
            
            magazineModel.author = params.author;
            magazineModel.title = params.title;
            magazineModel.edition = params.edition;
            magazineModel.description = params.description;
            magazineModel.frequency = params.frequency;
            magazineModel.exemplar = params.exemplar;
            magazineModel.keywords = params.keywords.split(", ")
            magazineModel.topics = params.topics.split(", ");
            magazineModel.copy = params.copy;
            magazineModel.available = params.copy;
            magazineModel.record = 0;
            magazineModel.search = 0;



            Magazine.find({ title: params.title }, (err, magazineFind) => {
                if (err) return res.status(500).send({ message: 'ERROR al buscar el libro' })

                if (magazineFind && magazineFind.length > 0) {
                    return res.status(200).send({ mensaje: 'Ya existe una revista con este nombre' })
                } else {
                    
                    magazineModel.save((err, magazineSaved) => {
                        console.log(magazineSaved)
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion guardar' });

                        if (magazineSaved) {
                            return res.status(200).send({ magazineSaved })
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
function listMagazine(req, res) {
    Magazine.find((err, magazineFind) => {
        if (err) return res.status(500).send({ message: 'ERROR al solicitar áreas de trabajo' })
        if (magazineFind && magazineFind.length > 0) {
            return res.status(200).send({magazineFind})
        } else {
            return res.status(500).send({ message: 'No se pudieron listar las áreas de trabajo' })
        }
    })
}
function updateMagazine(req, res) {
    let params = req.body;
    var idMagazine = req.params.idMagazine;

    if (req.user.role == "admin") {
        Magazine.find({title: params.title}).exec((err,magazineFound)=>{
            if (err) return res.status(500).send({ mensaje: 'ERROR en la solicitud de datos' })
            if (magazineFound.length > 0 ) return res.status(500).send({ mensaje: 'La revista ya existe' })

        Magazine.findByIdAndUpdate(idMagazine, params, { new: true }, (err, magazineUpdated) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion xads' })

            if (!magazineUpdated) return res.status(500).send({ mensaje: 'error al actualizar el libro' })

            magazineUpdated.keywords = params.keywords.split(", ")
            magazineUpdated.topics = params.topics.split(", ")
            return res.status(200).send({ magazineUpdated })
        })
    })
    } else {
        return res.status(500).send({ mensaje: 'No puede hacer uso de esta ruta' })
    }

}
function deleteMagazine(req, res){
        var idMagazine = req.params.idMagazine;
      
        if (req.user.role == "admin") {
            Magazine.findByIdAndDelete(idMagazine, (err, magazineDeleted) => {
            if (err) return res.status(500).send({ mensaje: 'ERROR al solicitar eliminar area de trabajo' })
            if (!magazineDeleted) return res.status(500).send({ mensaje: 'ERROR al eliminar revista' })
    
            return res.status(200).send({ mensaje: 'Revista eliminadga' ,magazineDeleted})
          
        })
        } else {
          return res.status(500).send({ mensaje: 'No tiene permisos' })
        }
      


}

function findMagazine(req,res){
    let params = req.body

    Magazine.find({$or: [
        {topics: params.word},
        {keywords: params.word}
    ]}).exec((err, magazineFind)=>{
        if (err) return res.status(500).send({ mensaje: 'Error al solicitar tipo de empleado' })
        if (magazineFind) {
          return res.status(200).send({ magazineFind })
        } else {
          return res.status(500).send({ mensaje: 'No se encontraron registros para mostrar' })
        }
      })
}

function findMagazineId(req, res) {
    let idMagazine = req.params.idMagazine;
  
    Magazine.findOne({ _id: idMagazine }, (err, magazineFind) => {
      if (err) return res.status(500).send({ mensaje: 'Error al solicitar tipo de empleado' })
      if (magazineFind) {
        return res.status(200).send({ magazineFind })
      } else {
        return res.status(500).send({ mensaje: 'No se encontraron registros para mostrar' })
      }
    })
  }

  function listMagazineRecord(req, res) {
    Magazine.find().sort({record:-1}).exec((err, magazineFind) => {
        if (err) return res.status(500).send({ message: 'ERROR al solicitar áreas de trabajo' })
        if (magazineFind && magazineFind.length > 0) {
            return res.status(200).send({magazineFind})
        } else {
            return res.status(500).send({ message: 'No se pudieron listar las áreas de trabajo' })
        }
    })
}

module.exports ={
    addMagazine,
    listMagazine,
    updateMagazine,
    deleteMagazine,
    findMagazineId,
    findMagazine,
    listMagazineRecord
}