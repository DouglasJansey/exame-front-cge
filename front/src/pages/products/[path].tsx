import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useAuth } from "../../../context/authContext";

const RegisterPeoducts = dynamic(() => import("@/components/products/store"), { ssr: false })
const ListProducts = dynamic(() => import("@/components/products/listproducts"), { ssr: false })

type PagesType = {
    listproducts: ReactNode,
    store: ReactNode,
}
export default function HandlePages() {
    const { isAuthenticated } = useAuth()
    const { query, replace } = useRouter()
    const pages = query?.path;


    const currentPage: PagesType = {
        listproducts: !isAuthenticated && <ListProducts /> ,
        store: <RegisterPeoducts />,
    }
    const closeRouter = currentPage[pages as keyof typeof currentPage]
    
    return (
        <>
            {closeRouter && currentPage[pages as keyof typeof currentPage]}
        </>
    )
}