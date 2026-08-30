import bcrypt from "bcrypt"
import {prisma} from "../config/db"

export const registerUser = async (name: string, lastName: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      lastName,
      email,
      password: hashedPassword
    }
  })
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword;
}
