const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  const jwtPayload = {
    id: user?.id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const data = {
    user,
    token,
  };

  return data;
};
