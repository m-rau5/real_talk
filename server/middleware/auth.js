import jwt from "jsonwebtoken";

//grabbing the token for verification so that
//a user can only access data that it has access to
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    //verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); //cuz it's middleware, so we go to the next part of the funtion that invokes it
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
