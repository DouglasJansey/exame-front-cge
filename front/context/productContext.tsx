/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useContext } from "react";
import axios from '../services/axios';
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type ProductType = {
    name: string,
    description: string,
    category: string,
    imageProduct?: string,
}

type ProductContextType = {
    CreateProduct: (data: ProductType) => Promise<void>
    UpdateProduct: (id: string, data: ProductType) => Promise<void>
    deleteProduct: (id: string) => Promise<any>
    findOne: (id: string) => Promise<void>
    showProduct: (name?: string, category?: string) => Promise<object[]>
}
type productContextProps = {
    children: ReactNode;
}

const ProductContext = createContext({} as ProductContextType)

export function ProductProvider({ children }: productContextProps) {
    const { push } = useRouter()
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
    async function UpdateProduct(id:string, data: ProductType) {
        const {name, category, imageProduct, description} = data;
        try {
            await axios.put(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/product?id=${id}`, {        
                    name,
                    category,
                    imageProduct,
                    description
                
            }).then(resp => {
                return resp.data
            })
            push('/')
            
        } catch (err) {
            toast.error('Falha no update!', {
                autoClose: 1000
            })
        }
    }
    async function deleteProduct(id: string) {
        try{
            const response = await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/product?id=${id}`)
            return response
        }catch(err){
            new Error('Erro ao deletar produto')
        }
        toast.success('Produto deletado com sucesso!', {
            autoClose: 3000
        })
    }
    async function showProduct(name?: string, category?: string) {
        try{
          const productList =  await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/product/`).then(res => res.data)
            return productList!
        }catch(err){
            new Error('Erro ao mostrar produtos')
        }
    }
    async function findOne(id:string) {
        try{
            const product = id && await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/product/find?id=${id}`)
            .then(res => res.data[0])
            return product
        }catch(err){
            new Error('Erro ao mostrar produtos')
        }
    }


    return (
        <ProductContext.Provider value={{ findOne, UpdateProduct, deleteProduct, CreateProduct, showProduct }}>
            {children}
        </ProductContext.Provider>
    )
}
export const useProduct = () => {
    return useContext(ProductContext);
};