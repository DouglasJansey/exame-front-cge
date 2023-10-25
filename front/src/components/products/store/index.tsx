/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useProduct } from '../../../../context/productContext'
import style from '../../../../styles/productStyle/product.module.sass'
type ProductType = {
    name: string,
    description: string,
    category: string,
    imageProduct?: string,
}

export default function Products() {
    const defaultImage = 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'
    const {CreateProduct} = useProduct();
    const [formData, setFormData] = useState<ProductType>({
        name: '', category:'', description: '', imageProduct: ''});

    const handleInputForm = (ev: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = ev.target
        setFormData({...formData, [name]: value})
    }
    const validateInput = () => {
        
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        validateInput()
        CreateProduct(formData)
    }
    return (
        <div className={style.container}>
            <form className={style.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <span className={style.title}>
                    <p>Cadastrar</p>
                </span>
            <div className={style.containerImage}><img src={ formData.imageProduct || defaultImage} alt='' /></div>
               <div className={style.labelContainer}>              
                <label className={style.label}>
                    Nome:
                    <input className={style.inputStyle} type="text" name="name" 
                    placeholder="Digite seu nome" value={formData.name}
                    onChange={(e) => handleInputForm(e)}
                    />
                </label>
                <label className={style.label}>
                    Descrição:
                    <input className={style.inputStyle} type="text" name="description"
                     placeholder="Digite seu email" 
                     onChange={(e) => handleInputForm(e)}
                     />
                </label>
                <label className={style.label}>
                    Categoria:
                    <input className={style.inputStyle} type="text" name="category"
                    placeholder="Digite sua senha!"
                    onChange={(e) => handleInputForm(e)} />
                </label>
                    </div>
                <label className={style.label}>
                    Link da imagem:
                    <input className={style.inputStyle} type="text" name="imageProduct"
                    placeholder="Digite sua senha!"
                    onChange={(e) => handleInputForm(e)} />
                </label>
                <button type='submit' className={style.buttonSubmit}>Cadastrar</button>
            </form>
        </div>
    )
}