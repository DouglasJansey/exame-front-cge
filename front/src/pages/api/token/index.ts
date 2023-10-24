import { NextApiRequest, NextApiResponse } from "next";
import Token from '../../../../controller/tokenController/tokenController'

export default async function TokenGenerate(req: NextApiRequest, res: NextApiResponse){
    try{
        const {method} = req
        const {email, password} = req.body
        const { generateToken } = new Token()
        if(method === 'POST') {
            const token = await generateToken(email,password);
            res.status(200).json({token})     
        } 
    }catch(err){
        throw new Error('problema ao gerar token')
    }
}