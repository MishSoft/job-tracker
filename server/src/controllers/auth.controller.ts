import { Request, Response } from "express"
import { registerUser } from "../services/auth.service"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password } = req.body;
    const user = await registerUser(name, lastName, email, password)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({message: "Something went wrong!"})
  }

}
