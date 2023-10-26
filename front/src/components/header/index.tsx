/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import Link from "next/link";

//import { MdKeyboardArrowDown } from "react-icons/md";

import style from "../../../styles/headerStyle/Header.module.sass";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/authContext";

export default function Header() {
  const { isAuthenticated, LogOut } = useAuth();
  const { pathname } = useRouter();

  const menu: Array<string> = [
    "Home",
    "Sobre nós",
    "Onde estamos",
    "Contato",
  ];

  const filterWords = (value: string): string => {
    //filtra o path recebido e retorna tudo junto e sem caracter especial
    const path = value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(" ", "");
    if(path === 'home') return ''
    return path;
  };
  const activeLink = (url: string) => {
    //compara se o path é igual ao url recebido para ativar a classe que sublinha o link quando for clicado
    const path = pathname === url
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
                  {item}
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
