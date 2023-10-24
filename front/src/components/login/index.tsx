/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import style from '../../../styles/registerStyle/register.module.sass'
import { useAuth } from '../../../context/authContext';
type formDataType = {
    email: string,
    password: string
}

export default function Login() {
    const { SignIn } = useAuth();
    const [formData, setFormData] = useState<formDataType>({
        email: '', password: ''
    });

    const handleInputForm = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        SignIn(formData)
    }

    return (
        <div className={style.container}>
            <form className={style.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <span className={style.title}>
                    <p>Login</p>
                </span>
                <label className={style.labelContainer}>
                    Email:
                    <input className={style.inputStyle} type="email" name="email"
                        placeholder="Digite seu email"
                        onChange={(e) => handleInputForm(e)}
                    />
                </label>
                <label className={style.labelContainer}>
                    Password:
                    <input className={style.inputStyle} type="password" name="password"
                        placeholder="Digite sua senha!"
                        onChange={(e) => handleInputForm(e)}
                    />
                </label>
                <button type='submit' className={style.buttonSubmit}>Login</button>
                <p className={style.textParagraph}>Se você ainda não tem uma conta, faça seu
                <Link href={'/account/register'}> Cadastro </Link> aqui</p>
            </form>
        </div>
    )
}