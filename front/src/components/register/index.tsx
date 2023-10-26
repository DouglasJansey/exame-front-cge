import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import { useCrud } from '../../../context/crudContext'
import style from '../../../styles/registerStyle/register.module.sass'
import { toast } from 'react-toastify';
type formDataType = {
    name: string,
    email: string,
    password: string
}

export default function Register() {
    const {CreateUser} = useCrud();
    let error = false;
    const [formData, setFormData] = useState<formDataType>({
        name: '', email:'', password: ''});

    const handleInputForm = (ev: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = ev.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();  
        CreateUser(formData)
    }
    return (
        <div className={style.container}>
            <form className={style.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <span className={style.title}>
                    <p>Cadastrar</p>
                </span>
                <label className={style.labelContainer}>
                    Nome:
                    <input className={style.inputStyle} type="text" name="name" 
                    placeholder="Digite seu nome" value={formData.name}
                    onChange={(e) => handleInputForm(e)}
                    />
                </label>
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
                    onChange={(e) => handleInputForm(e)} />
                </label>
                <button type='submit' className={style.buttonSubmit}>Cadastrar</button>
                <p className={style.textParagraph}>Se você já tem uma conta, faça seu
                <Link href={'/account/login'}> Login </Link> aqui</p>
            </form>
        </div>
    )
}