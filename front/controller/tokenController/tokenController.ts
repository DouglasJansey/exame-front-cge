import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../repository/prisma';

export default class Token {
    async generateToken(email: string, password: string) {
        if (!email || !password) throw new Error('preencha os campos!');
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        if (!user) throw new Error('usuário não existe');
        const checkPass = bcrypt.compare(password, user.password);
        if (!checkPass) throw new Error('Usuário ou senha inválidos');
        const { name, id } = user;
        const secret: any = new TextEncoder().encode(
            process.env.NEXT_PUBLIC_SECRET_JWT,
        );
        const alg = 'HS256'
            
        const token = jwt.sign({ user:{ name, id, email} }, secret, {
            algorithm: alg,
            expiresIn: process.env.NEXT_PUBLIC_EXPIRATION_TOKEN
        });
        return token;
    }
}
