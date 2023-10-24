/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '../repository/prisma';

interface UserRequest extends NextApiRequest {
    userEmail: string;
    userId: string;
}
interface JwtPayload {
    user: {
        id: string;
        email: string;
    }
}

export default async function (req: UserRequest, res: NextApiResponse) {
    const { authorization }: any = req.headers!;
    if (!authorization) {
        return res.status(401).json({
            error: ['É preciso estar logado!']
        });
    }
    const token = authorization.split(' ')[1];
    
    const secret: any = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_JWT!);
    
    const { user } = jwt.verify(token, secret) as JwtPayload;
    const {id, email} = user!
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
    return NextResponse.next();
}
