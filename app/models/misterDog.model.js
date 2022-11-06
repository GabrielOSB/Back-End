const sql = require("./db.js");

// constructor
const dog = function (dog) {
  this.nome = dog.nome;
  this.ingrediente = dog.ingrediente;
  this.preco = dog.preco;
};


dog.create = (dog, result) => {
  console.log("INSERT INTO Produto SET ?" + dog,);

  sql.query("INSERT INTO Produto SET ?", dog, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Filme: ", { id: res.insertId, ...dog });
    result(null, { id: res.insertId, ...dog });
  });
};


dog.updateById = (id, dog, result) => {
  console.log(dog);
  sql.query(
    "UPDATE Produto SET nome = ?, ingrediente = ?, preco = ? WHERE id = ?",
    [dog.nome, dog.ingrediente, dog.preco, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Filme with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Filme: ", { id: id, ...dog });
      result(null, { id: id, ...dog });
    }
  );
};

dog.getAll = (result) => {
  let query = "SELECT * FROM Produto";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Filme: ", res);
    result(null, res);
  });
};


dog.remove = (id, result) => {
  sql.query("DELETE FROM Produto WHERE Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Filme with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Filme with id: ", id);
    result(null, res);
  });
};

module.exports = dog;