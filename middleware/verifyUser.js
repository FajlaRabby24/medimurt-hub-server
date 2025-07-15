// verify rider
const verifyUser = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email };
  const user = await req.db.usersCollection.findOne(query);
  if (!user) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = verifyUser;
