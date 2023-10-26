/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import Link from "next/link";

//import { MdKeyboardArrowDown } from "react-icons/md";

import style from "../../../styles/headerStyle/Header.module.sass";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/authContext";

export default function Header() {
  const { isAuthenticated, LogOut } = useAuth();
  const { pathname, query } = useRouter();

  const menu: Array<string> = [
    "Home",
    "Listar Produtos",
    "Registrar Produtos",
  ];

  const filterWords = (value: string): string => {
    //filtra o path recebido e retorna tudo junto e sem caracter especial
    //retorna o caminho 
    const pathPage = {
      listarprodutos: 'products/listproducts',
      registrarprodutos: 'products/store',
      home: ''
    }
    const path = value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(" ", "");

    return pathPage[path as keyof typeof pathPage];
  };

  const activeLink = (url: string) => {
    //compara se o path é igual ao url recebido para ativar a classe que sublinha o link quando for clicado
    const valuePath: any = query?.path
    const path = `/products/${valuePath}` === url
    const active = path ? style.activePath : style.linkStyle
    return active
  };
  return (
    <>
      <div className={style.container}>
        <span>
          <nav className={style.nav}>
            {menu.map((item, index) => (
              <div key={index}>
                <Link
                  className={activeLink(`/${filterWords(item)}`)}
                  href={`/${filterWords(item)}`}
                >
                  { !isAuthenticated && item === 'Registrar Produtos' ? '' : item}
                </Link>
              </div>
            ))}
          </nav>
        </span>
        <div className={style.containerProfile}>
          <nav>
            {isAuthenticated &&
              <>
                <Link href={'/account/profile'} className={activeLink(`/account/${filterWords('profile')}`)}>
                  Perfil
                </Link>
                <p onClick={() => LogOut()} style={{ cursor: 'pointer' }}>Logout [X]</p>
              </>
            }
            {!isAuthenticated && <Link className={activeLink(`/account/${filterWords('profile')}`)} href={"/account/login"}>
              Login
            </Link>}
          </nav>
        </div>
      </div>
    </>
  );
}
