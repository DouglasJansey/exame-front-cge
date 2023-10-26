import style from '../../../styles/loadingStyle/loading.module.sass'
export const Loading = () => {
    return (
        <>
            <div className={style.container}>
                <span className={style.loading}/>
            </div>
        </>
    )
}
