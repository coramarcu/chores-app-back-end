const getDb = require("../services/db");

exports.createChore = async (req, res) => {
  const db = await getDb();
  const { name, price, status, familyID } = req.body;

  try {
    await db.query(
      `INSERT INTO Chores (name, price, status, familyID) VALUES (?, ?, ?, ?)`,
      [name, price, status, familyID]
    );

    res.status(201);
    res.send({
      name: name,
      price: price,
      status: status,
      familyID: familyID,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.readChores = async (req, res) => {
  const db = await getDb();
  const { familyID } = req.params;

  try {
    const [chores] = await db.query(`SELECT * FROM Chores WHERE familyID = ?`, [
      familyID,
    ]);

    console.log("From Controller:" + chores);

    res.status(200);
    res.send(chores);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }
};

// name, price, status, userID
exports.updateChores = async (req, res) => {
  const db = await getDb();
  const { choreID, name, price, status } = req.body;

  const newName = name ? ` name = "${name}",` : "";
  const newPrice = price ? ` price = "${price}",` : "";
  const newStatus = status ? ` status = "${status}",` : "";
  // const newUserID = userID ? ` userID = ${userID},` : "";

  const queryString = `UPDATE Chores SET${newName}${newPrice}${newStatus}`;
  const formattedQueryString = queryString.substring(0, queryString.length - 1);
  const finalQueryString = formattedQueryString.concat(
    ` WHERE choreID = ${choreID};`
  );

  console.log(finalQueryString);

  try {
    const [updatedChore] = await db.query(finalQueryString);

    console.log(updatedChore);

    res.status(200);
    res.send(updatedChore);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }
};
