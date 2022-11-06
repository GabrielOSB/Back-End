const Dog = require("../models/misterDog.model");

//Create

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body.nome);
  // Create a Dog
  const dog = new Dog({
    nome: req.body.nome,
    ingrediente: req.body.ingrediente,
    preco: req.body.preco,
  });

  console.log(dog);

  // Save Dog in the database
  Dog.create(dog, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Dog.",
      });
    else res.send(data);
  });
};

//Get

exports.findAll = (req, res) => {
  Dog.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Dog.",
      });
    else res.send(data);
  });
};

//Update

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Dog.updateById(req.params.id, new Dog(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Dog with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Dog with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

//Delete
exports.delete = (req, res) => {
  Dog.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Dog with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Dog with id " + req.params.id,
        });
      }
    } else res.send({ message: `Dog was deleted successfully!` });
  });
};
