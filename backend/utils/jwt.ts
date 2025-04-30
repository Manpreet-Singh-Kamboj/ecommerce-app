import jwt from "jsonwebtoken";

interface GenerateTokenProps {
  jwtPayload: any;
  jwtExpiry: string;
  jwtSecret: string;
}

interface VerifyTokenProps {
  token: string;
  jwtSecret: string;
}

export const generateJwtToken = ({
  jwtPayload,
  jwtExpiry,
  jwtSecret,
}: GenerateTokenProps) => {
  return jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: jwtExpiry,
  });
};

export const verifyJwtToken = ({ token, jwtSecret }: VerifyTokenProps) => {
  return jwt.verify(token, jwtSecret);
};
