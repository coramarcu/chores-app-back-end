exports.getChores = (req, res) => {
  res.status(201);
  res.send({ allChores: ["chore 1", "chore 2", "chore 3"] });
};

exports.createChores = (req, res) => {
  res.sendStatus(201);
  //   res.send({ result: "New chore is added!" });
};
