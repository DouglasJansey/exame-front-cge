import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";

type PrivateRouterType = {
    children: ReactNode
}

const PrivateRouter = ({ children }: PrivateRouterType) => {
    const { push } = useRouter();
    const { isAuthenticated } = useAuth();

     useEffect(() => {
         if (!isAuthenticated) {
             push('/account/login')
         }
     }, [isAuthenticated, push])

    return (
        <>
            {!isAuthenticated && null}
            {isAuthenticated && children}
        </>
    )
}
export default PrivateRouter;