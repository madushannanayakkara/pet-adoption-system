import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return renewToken(req, res, next);
  }

  jwt.verify(accessToken, process.env.JWT_ACC_SECRET, (err, decoded) => {
    if (err) {
      return renewToken(req, res, next);
    }

    req.userName = decoded.userName;
    next();
  });
};

const renewToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(400)
      .send({ errors: { message: "No refresh token", goAuthPage: true } });
  }

  jwt.verify(refreshToken, process.env.JWT_REF_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).send({
        errors: {
          message: "Invalid or expired refresh token",
          goAuthPage: true,
        },
      });
    }

    const newAccessToken = jwt.sign(
      { _id: decoded._id, userName: decoded.userName },
      process.env.JWT_ACC_SECRET,
      { expiresIn: "1m" }
    );

    res.cookie("accessToken", newAccessToken, { maxAge: 60000 });

    req.userName = decoded.userName;
    next();
  });
};
