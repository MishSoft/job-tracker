import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import jwt from "jsonwebtoken";
export const registerUser = async (
  name: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      lastName,
      email,
      password: hashedPassword,
    },
  });
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginUser = async (email: string, password: string) => {

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

   if (!isPasswordValid) {
     throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    {expiresIn: "1d"}
  )

  const {password: _, ...userWithoutPassword} = user

  return { token, user: userWithoutPassword };
};
