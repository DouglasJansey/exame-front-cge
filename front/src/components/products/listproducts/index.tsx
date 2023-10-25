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
    }
    return (
        <div className={style.container}>
           
        </div>
    )
}