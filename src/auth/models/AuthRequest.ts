import { User } from "src/user/entities/user.entity";
import { Request } from "express";

export class AuthRequest extends Request {
    user: User
}