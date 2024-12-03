import jwt from 'jsonwebtoken';
const generateToken = (userInfo: object) => {
  return jwt.sign(userInfo, process.env.JWT_SECRET ?? '', {
    expiresIn: '7d',
  });
};
export default generateToken;
