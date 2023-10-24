import { ReactNode } from "react";
import dynamic from "next/dynamic";
import style from '../../../styles/home.module.sass'
import Header from "../header";
import { usePathname } from "next/navigation";
import { CheckPublicRouter } from "../../../functions/checkPublicPages";
const PrivateRouter: any = dynamic(() => import('../../PrivateRouter'), {ssr: false})

type component = {
  children: ReactNode
}

export default function Layout({ children }: component) {
  const path = usePathname()
  const isPublicPage = CheckPublicRouter(path!)

  return (
    <div className={style.container}>
        <Header />
        {isPublicPage && children }
        {!isPublicPage && <PrivateRouter>{children}</PrivateRouter>}
    </div>
  );
};
