// Statefull 
// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
  //   sessionIdToUserMap.set(id, user);
  // }
  // function getUser(id) {
    //   return sessionIdToUserMap.get(id);
    // }
    

// Stateless 
import jwt from "jsonwebtoken";

// secret key needst to be private, which can be done using .env file
const secret = "Utkars***12$34";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export { setUser, getUser };
