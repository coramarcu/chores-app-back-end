const db = require("../services/db");
const getDb = require("../services/db");

exports.createUser = async (req, res) => {
  const db = await getDb();
  const { familyID } = req.params;
  const { email, name, role } = req.body;
  const newRole = role ? role : "parent";

  try {
    await db.query(
      `INSERT INTO User (familyID, email, name, role) VALUES (?, ?, ?, ?)`,
      [familyID, email, name, newRole]
    );

    const [newUser] = await db.query(
      `SELECT * FROM User WHERE email = "${email}"`
    );

    console.log(`TYPE OF NEW USER: ${Array.isArray(newUser)}`);
    console.log(`NEW USER IN CREATE_USER CONTROLLER: ${Object.keys(newUser)}`);

    res.status(201);
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.readUser = async (req, res) => {
  const db = await getDb();
  const { email, role } = req.body;

  const queryString = role
    ? `SELECT * FROM User WHERE role = "${role}"`
    : `SELECT * FROM User WHERE email = "${email}"`;

  console.log(`QUERY STRING IS: ${queryString}`);

  try {
    const [foundUsers] = await db.query(queryString);

    console.log(
      "FROM CONTROLLER foundUsers[0].userID: " + foundUsers[0].userID
    );

    res.status(201);
    res.send(foundUsers);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }

  db.close();
};
