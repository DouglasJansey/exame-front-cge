import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";

const Login = dynamic(() => import("@/components/login"), { ssr: false })
const Register = dynamic(() => import("@/components/register"), { ssr: false })
const Profile = dynamic(() => import("@/components/profile"), { ssr: false })

type PagesType = {
    login: ReactNode,
    register: ReactNode,
    profile: ReactNode,
}
export default function HandlePages() {
    const { isAuthenticated } = useAuth()
    const { query, push } = useRouter()
    const pages = query?.path;

    const currentPage: PagesType = {
        login: !isAuthenticated && <Login />,
        register: !isAuthenticated && <Register />,
        profile: <Profile />,
    }
    const closeRouter = !!currentPage[pages as keyof typeof currentPage]
    useEffect(() => {
        if(!closeRouter){
            push('/account/profile')
        }
    },[closeRouter, push])
    return (
        <>
            {closeRouter && currentPage[pages as keyof typeof currentPage]}
        </>
    )
}