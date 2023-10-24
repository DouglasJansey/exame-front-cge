/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import axios from '../services/axios';
import { toast } from "react-toastify";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";

type UserType = {
    name: string,
    email: string,
    id: string,
}
type SignInData = {
    email: string,
    password: string
}

type AuthContextType = {
    isAuthenticated: boolean,
    user: UserType | null,
    SignIn: (data: SignInData) => Promise<void>
    LogOut: () => Promise<void>
}
type authContextProps = {
    children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: authContextProps) {
    const { 'USER-INFO-TOKEN': userUpdate } = parseCookies()
    const { 'AUTH-TOKEN': tokenCookie } = parseCookies() // pega o token e para poder salva no cabeçalho das requisições com o axios
    const {push, replace, reload} = useRouter()
    const [user, setUser] = useState<UserType | null >(null)
    const isAuthenticated = !!user;
    
    
    useEffect(() => {
        if (tokenCookie) {
            const { user }: any = decode(tokenCookie)
            userUpdate && setUser(JSON.parse(userUpdate)!) || setUser(user) ;  
        }
    }, [userUpdate, tokenCookie])
    const LogOut = async () =>{
        destroyCookie(undefined, 'AUTH-TOKEN',{
          path:'/'
        })
        destroyCookie(undefined, 'USER-INFO-TOKEN',{
          path:'/'
        })
        setUser(null)
            replace('/account/login')
      };
      
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenCookie}`; //adiciona o token no cabeçalho do axios para utilizar as ações que precisam de token
    async function SignIn({ email, password }: SignInData) {
        try{
            const res = axios.post('/api/token', {
                email,
                password
        }).then(resp => {
            return resp.data
        })
        const { token } = await res
        const { user }: any = decode(token)
        toast.success('Logado com sucesso!')
        setUser(user)
        //adiciona o token nos cookies para salvar a autenticação do usuário com os dados
        setCookie(undefined, 'AUTH-TOKEN', token, {
            maxAge: 60 * 60 * 24,
            path: '/'
        })
       
        replace('/account/login')('/account/profile');
        }catch(err){
            toast.error('Falha ao logar!')
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, SignIn, LogOut }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
};