/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProduct } from '../../../../context/productContext'
import style from '../../../../styles/productStyle/product.module.sass'
import { usePathname } from 'next/navigation';
type ProductType = {
    name: string,
    description: string,
    category: string,
    imageProduct?: string,
}
const initialState = {
    name: '',
    description: '',
    category: '',
    imageProduct: '',
}

export default function Update() {
    const defaultImage = 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'
    const { query }: any = useRouter();
    const { findOne, UpdateProduct } = useProduct();
    const { id } = query!
    const [formData, setFormData] = useState<ProductType>(initialState);
        
        useEffect(() => {
        async function getProductUpdate(){
            const prodUpdate: any =  await findOne(id)
            setFormData(prodUpdate)
        }
        getProductUpdate()
    }, [id, UpdateProduct])
    console.log(initialState)
    const handleInputForm = (ev: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = ev.target
        setFormData({...formData, [name]: value})
    }
    const validateInput = () => {
        
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        id && UpdateProduct(id, formData)
    }
    return (
        <div className={style.container}>
            <form className={style.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <span className={style.title}>
                    <p>Editar Produto</p>
                </span>
            <div className={style.containerImage}><img src={formData.imageProduct || defaultImage} alt='' /></div>
               <div className={style.labelContainer}>              
                <label className={style.label}>
                    Nome:
                    <input className={style.inputStyle} type="text" name="name" value={formData.name || ''}
                    onChange={(e) => handleInputForm(e)}
                    />
                </label>
                <label className={style.label}>
                    Descrição:
                    <input className={style.inputStyle} type="text" name="description" value={formData.description || ''}
                     onChange={(e) => handleInputForm(e)}
                     />
                </label>
                <label className={style.label}>
                    Categoria:
                    <input className={style.inputStyle} type="text" name="category" value={formData.category || ''}
                    onChange={(e) => handleInputForm(e)} />
                </label>
                    </div>
                <label className={style.label}>
                    Link da imagem:
                    <input className={style.inputStyle} type="text" name="imageProduct" value={formData.imageProduct || ''}
                    onChange={(e) => handleInputForm(e)} />
                </label>
                <button type='submit' className={style.buttonSubmit}>Atualizar</button>
            </form>
        </div>
    )
}