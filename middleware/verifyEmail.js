// verify email
const verifyEmail = (req, res, next) => {
  if (req.decoded.email !== req.query.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = verifyEmail;
