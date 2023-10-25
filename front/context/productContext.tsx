/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useContext } from "react";
import axios from '../services/axios';
import { toast } from "react-toastify";

type ProductType = {
    name: string,
    description: string,
    category: string,
    imageProduct?: string,
}

type ProductContextType = {
    CreateProduct: (data: ProductType) => Promise<void>
    UpdateProduct: (id: string, data: {}) => Promise<void>
    deteleProduct: (id: string) => Promise<void>
    showProduct: (data?: ProductType) => Promise<void>
}
type productContextProps = {
    children: ReactNode;
}

const ProductContext = createContext({} as ProductContextType)

export function ProductProvider({ children }: productContextProps) {

    async function CreateProduct({name, description, category, imageProduct}:ProductType) {
        try {
             const res = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/product`, {
                name,
                description,
                category,
                imageProduct,
                
             }).then(resp => {
                 return resp
             })
             const { status } = res
             if(status === 200){
                 toast.success('Produto cadastrado com sucesso!', {
                     autoClose: 3000
                 })
             }
        } catch (err) {
            toast.error('Falha no cadastrado!', {
                autoClose: 1000
            })
        }
    }
    async function UpdateProduct(id:string, {...data}: {}) {
        try {
            await axios.put(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/product/${id}`, {
                data
            }).then(resp => {
                return resp.data
            })
        } catch (err) {
            toast.error('Falha no update!', {
                autoClose: 1000
            })
        }
    }
    async function deteleProduct(id: string) {
        try{
            const response = await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/product/${id}`)
        }catch(err){
            new Error('Erro ao deletar produto')
        }
        toast.success('Produto deletado com sucesso!', {
            autoClose: 3000
        })
    }
    async function showProduct(data?: {}) {
        try{
            await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/product/`)
        }catch(err){
            new Error('Erro ao mostrar produtos')
        }
    }


    return (
        <ProductContext.Provider value={{ UpdateProduct, deteleProduct, CreateProduct, showProduct }}>
            {children}
        </ProductContext.Provider>
    )
}
export const useProduct = () => {
    return useContext(ProductContext);
};