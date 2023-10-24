import { NextApiResponse, NextApiRequest } from 'next'
import UserController from '../../../../controller/userController/userController';
import loginRequired from "../../../../middleware/loginRequired";

interface UserRequest extends NextApiRequest {
    userEmail: string;
    userId: string;
}

export default async function handler(req: UserRequest, res: NextApiResponse){
    const {method} = req
    const {getUser, createUser, updateUser, deleteUser} = new UserController()
  
    switch(method){
        case 'GET': {
            const user = await getUser()
            return res.status(200).json({user})
        };
        case 'POST':{
            const userData = req.body
            const user = await createUser(userData)
            return res.status(200).json({user})
        };
        case 'PUT':{
            await loginRequired(req, res)
            const id = req.userId
            const {...updateData} = req.body
            const user = await updateUser(id, updateData)
            return res.status(200).json({user})
        };
        case 'DELETE':{
            await loginRequired(req, res)
            const id = req.userId
            const user = await deleteUser(id)
            return res.status(200).json({user})
        };
        default: return '';
    }

}