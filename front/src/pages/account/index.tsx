import dynamic from "next/dynamic";
import { usePathname, } from "next/navigation";
import {  useRouter } from "next/router";
export default function Account(){
    const {push} = useRouter()
    const pathName = usePathname()
    const handleClick = (path: string) =>{
        push(`/account${path}`)
    }
    return(
        <>
        <button style={{marginTop: 250}} onClick={() => handleClick(pathName)}>FOI</button>
        </>
    )
}