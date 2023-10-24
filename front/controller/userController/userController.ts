/* eslint-disable import/no-anonymous-default-export */
import { db } from '../../repository/prisma';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

type DataType = {
    name: string;
    email: string;
    password: string;
    id?: string;
};
export default class userController {
    async getUser() {
        const user = await db.user.findMany();
        return user;
    };
    
    async createUser ({ name, email, password }: DataType) {
        const salt = 10;
        const passwordHash = await bcrypt.hash(password, salt);
        if (!password) return;
        const user = await db.user.create({
            data: {
                name,
                email,
                password: passwordHash
            }
        });
        return user;
    };
    async updateUser (id: string, { ...updateData }) {  
            const user = await db.user.update({
                where: {
                    id
                },
                data: {
                    ...updateData
                }
            });
            const {email, name} = user
         return {email, name};
    };
    async deleteUser  ( id: string) {
        const userDelete = await db.user.delete({
            where: {
                id
            }});
        return userDelete;
    };
}

