/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useProduct } from '../../../../context/productContext';
import dynamic from 'next/dynamic';
import style from '../../../../styles/productStyle/product.module.sass'
type ProductType = {
    name: string,
    description: string,
    category: string,
    imageProduct?: string,
}
type ProductProps = {
    showProduct: (data?: ProductType) => Promise<object[]>
}
const Card = dynamic(() => import('@/components/card'), { ssr: false })

export default function ListProducts() {
    const { showProduct } = useProduct()
    const [listProducts, setListProducts] = useState([{
        name: '', category: '', description: '', imageProduct: '', id: ''
    }])
    useEffect(() => {
        async function getData() {
            const products: any = await showProduct()
            console.log(products)
            setListProducts(products)
        }
        getData()
    }, [])
    return (
        <div className={style.flex}>
            {listProducts.map((product, index) => (
                <div key={index + 2}>
                    <Card
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        category={product.category}
                        imageProduct={product.imageProduct} />
                </div>

            ))}
        </div>
    )
}