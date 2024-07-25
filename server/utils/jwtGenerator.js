import jwt from 'jsonwebtoken'

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export default jwtGenerator;