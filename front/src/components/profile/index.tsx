/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { ChangeEvent, FormEvent, use, useEffect, useState } from 'react';
import style from '../../../styles/registerStyle/register.module.sass'
import { useAuth } from '../../../context/authContext';
import { useCrud } from '../../../context/crudContext';
import React from 'react';
import { parseCookies } from 'nookies';

export default function Profile() {
    const {user} = useAuth();
    const nameUser: any = user && user?.name! || ''
    const { UpdateUser, deteleUser } = useCrud();
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState('');
   

    const handleInputForm = (ev: ChangeEvent<HTMLInputElement>) => {
        const { value }: any = ev.target
        setFormData(value)
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        UpdateUser(formData)
    }
    const editUser = () => {
        setEdit(!edit)
    }

    useEffect(()=>{
        const {'USER-INFO-TOKEN': userCookie}: any = parseCookies();
        if(userCookie){
            const { name }: any = userCookie && JSON.parse(userCookie);
            setFormData(name);
        }
    },[nameUser])

    return (
        <div className={style.container}>
            <form className={style.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <span className={style.title}>
                    <p>Perfil</p>
                </span>
                <label className={style.labelContainer}>
                    Nome:
                    <input className={style.inputStyle} type="name" name="text"
                        value={formData}
                        onChange={(e) => handleInputForm(e)}
                        disabled={!edit}
                        
                    /><button type='button' onClick={()=> editUser()}>editar</button>
                </label>
               {edit && <button type='submit' className={style.buttonSubmit}>Salvar</button>}
                <h5 onClick={ ()=> deteleUser() } style={{color: 'red', cursor: 'pointer'}}> deletar usuário </h5>
            </form>
        </div>
    )
}