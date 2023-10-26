/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useProduct } from '../../../../context/productContext';
import { Loading } from '@/components/loading'
import dynamic from 'next/dynamic';
import style from '../../../../styles/productStyle/product.module.sass'
type ProductType = {
    name: string,
    description: string,
    category: string,
    imageProduct?: string,
}

const Card = dynamic(() => import('@/components/card'), { ssr: false })

export default function ListProducts() {
    const { showProduct } = useProduct()
    const [loading, setLoading] = useState(false)
    const [listProducts, setListProducts] = useState([{
        name: '', category: '', description: '', imageProduct: '', id: ''
    }])
    useEffect(() => {
        async function getData() {
            const products: any = Card && await showProduct()
            setListProducts(products)
            products && setLoading(true)
        }
        getData()
    }, [])
    return (
        <div className={style.listContainer}>

            {!loading && <Loading /> || listProducts.map((product, index) => (
                <div key={index + 2}>
                    <Card
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        category={product.category}
                        imageProduct={product.imageProduct} />
                </div>

            ))
            }
        </div>
    )
}