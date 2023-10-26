/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useContext } from "react";
import axios from '../services/axios';
import { toast } from "react-toastify";
import { setCookie, destroyCookie } from 'nookies'
import { useRouter } from "next/navigation";
type UserType = {
    name: string,
    email: string,
    password: string
}

type CrudContextType = {
    CreateUser: (data: UserType) => Promise<void> | any
    UpdateUser: (name: string) => Promise<void>
    deteleUser: () => Promise<void>
}
type authContextProps = {
    children: ReactNode;
}

const CrudContext = createContext({} as CrudContextType)

export function CrudProvider({ children }: authContextProps) {
    const { push } = useRouter()

    async function CreateUser({name, email, password}:UserType) {
        if((name === '' || name.length < 4 )) return toast.error(`Nome inválido, precisa ter no mínimo 4 caracteres`, { autoClose: 2000})
        if( email === '' ) return toast.error('Falha no cadastro!', { autoClose: 1000});
        if(password === '') return toast.error('Falha no cadastro!', { autoClose: 1000})
        try {
             const res = await axios.post('/api/user', {
                 name,
                 email,
                 password,
                
             }).then(resp => {
                 return resp
             })
             const { status } = res
             if(status === 200){
                 toast.success('Usuário atualizado!', {
                     autoClose: 1000
                 })
                 push('/account/login')
             }
        } catch (err) {
            toast.error('Falha no update!', {
                autoClose: 1000
            })
        }
    }
    async function UpdateUser(nameUpdate: string) {
        try {
            const res = await axios.put('/api/user', {
                name: nameUpdate
            }).then(resp => {
                return resp.data
            })
            const { user } = await res
            toast.success('Usuário atualizado!', {
                autoClose: 1000
            })
            //adiciona os dados atualizados do usuário no cookie para não ter que ficar fazendo requisição get
            //toda vez que fizer um update já recebe os dados novos e salva no cookie
            setCookie(undefined, 'USER-INFO-TOKEN', JSON.stringify(user), {
                maxAge: 60 * 60 * 360,
                path: '/'
            })
        } catch (err) {
            toast.error('Falha no update!', {
                autoClose: 1000
            })
        }
    }
    async function deteleUser() {
        const response = await axios.delete('/api/user')
        toast.success('Usuário deletado com sucesso!', {
            autoClose: 3000
        })
        destroyCookie(undefined, 'AUTH-TOKEN',{
            path:'/'
          })
          destroyCookie(undefined, 'USER-INFO-TOKEN',{
            path:'/'
          })
        push('/account/login')
    }


    return (
        <CrudContext.Provider value={{ UpdateUser, deteleUser, CreateUser }}>
            {children}
        </CrudContext.Provider>
    )
}
export const useCrud = () => {
    return useContext(CrudContext);
};