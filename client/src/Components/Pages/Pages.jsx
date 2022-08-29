import s from './Pages.module.css';
import { useDispatch } from "react-redux";
import { updatePage } from '../../Redux/actions.js';

export default function Pages({ page, setPage, max }) {

    const dispatch = useDispatch();

    const nextPage = () => {
        dispatch(updatePage(parseInt(page) + 1));
        setPage(parseInt(page) + 1);
    };

    const previusPage = () => {
        dispatch(updatePage(parseInt(page) - 1));
        setPage(parseInt(page) - 1);
    };

    return (
        <div className={s.Container}>
            <button disabled={page === 1 || page < 1} onClick={previusPage} className={s.button} >{"<"}</button>
            <b className={s.text}>{page} de {max}</b>
            <button disabled={page === Math.ceil(max) || page > Math.ceil(max)} onClick={nextPage} className={s.button}>{">"}</button>
        </div>
    );
};