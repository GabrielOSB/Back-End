module.exports = (app) => {
  const dog = require("../controllers/dog.controller");
  var router = require("express").Router();

  // Retrieve all Dogs
  router.get("/", dog.findAll);
  // Create
  router.post("/", dog.create);
  // Update
  router.put("/:id", dog.update);
  // Delete
  router.delete("/:id", dog.delete);
  
  app.use("/api/misterdog", router);
};
