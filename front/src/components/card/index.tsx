/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/authContext'
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
    const { push } = useRouter()
    const { deleteProduct } = useProduct()
    const { isAuthenticated } = useAuth()

    const EditProduct = () => {
        push(`/products/update/${id}`)
    }
    const deleteProd = async () => {
        await deleteProduct(id)
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.containerImage}>
                    <img src={imageProduct || defaultImage} alt="" />
                </div>
                <div className={style.subContainer}>
                    <div className={style.title}>
                        <h1 className={style.label}> {name} </h1>
                    </div>
                    <div className={style.description}>
                        <h5 className={style.label}>{category}</h5>
                    </div>
                    <div className={style.description}>
                        <h5 className={style.label}>{description}</h5>
                    </div>
                </div>
                <span className={style.containerButtons}>
                {isAuthenticated && <button className={style.buttonClose} type='button' onClick={() => deleteProd()}>
                    Excluir
                </button>}
                {isAuthenticated && <button className={style.buttonEdit} type='button' onClick={() => EditProduct()}>
                    Editar &nbsp; <BsFillPencilFill size={12} />
                </button>}
                </span>
            </div>
        </>
    )

}