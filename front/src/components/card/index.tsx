/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProduct } from '../../../context/productContext'
import { BsFillPencilFill } from 'react-icons/bs'
import style from '../../../styles/cardStyle/card.module.sass'
type ProductType = {
    id: string
    name: string,
    description: string,
    category: string,
    imageProduct?: string,
}

export default function Card({ name, description, category, imageProduct, id }: ProductType) {
    const defaultImage = 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'
    const [edit, setEdit] = useState(false);
    const { push } = useRouter()
    const [formData, setFormData] = useState<ProductType>({
        name, category, description, imageProduct, id
    });

    const handleInputForm = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target
        setFormData({ ...formData, [name]: value })
    }
    const validateInput = () => {
        push(`/products/update/${id}`)
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    }
   
    return (
        <>
            <div className={style.container}>
                <div className={style.subContainer}>
                    <button onClick={() => setEdit(!edit)}><BsFillPencilFill /></button>
                    <div className={style.containerImage}>
                        <img src={imageProduct || defaultImage} alt="" />
                    </div>
                    <div className={style.label}>
                        {edit ? <input type='text' hidden={!edit} value={formData.name} disabled={!edit} />
                            : <h1 className={style.label}> {formData.name} </h1>
                        }
                    </div>
                    <div className={style.label}>
                        <h5 className={style.label}>{formData.category}</h5>
                    </div>
                    <div className={style.labelContainer}>
                        <h5 className={style.label}>{formData.description}</h5>
                    </div>
                </div>
            </div>
        </>
    )

}