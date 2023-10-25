import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../repository/prisma';
interface JwtPayload {
    user: {
        id: string;
        email: string;
    }
}interface UserRequest extends Request {
    userEmail: string;
    userId: string;
}
export default async (req: UserRequest, res: Response, next: NextFunction)=>{
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({
            error: ['Precisa estar logado!']
        });
    }
    const token = authorization.split(' ')[1]
    const secret: any = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_JWT!)
    try{
        const { user } = jwt.verify(token, secret) as JwtPayload
        const { id, email } = user!
        const checkUser = await db.user.findUnique({
            where:{
                id,
                email,
            }
        })
        if(!checkUser){
            return res.status(401).json({
                error: ['Usuário inválido']
            });
        }
        req.userId = id;
        req.userEmail = email;
        
        return next()
    }catch(err){
        return res.status(401).json({
            error: ['Token expirado ou inválido!']
        });
    }
}