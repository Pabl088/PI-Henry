import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card.jsx';
import { NavBar } from '../NavBar/NavBar.jsx';
import Pages from '../Pages/Pages.jsx';
import { getPokemons, orderPokemons, getTypes, getCreates, getAPI, getAllPokemons, updatePage } from '../../Redux/actions.js';
import sCard from '../Card/Card.module.css';
import s from './Home.module.css';

export default function Home() {

    const currentPage = useSelector(state => state.currentPage);

    const [page, setPage] = useState(currentPage);

    const [forEachPage, setforEachPage] = useState(10);

    const dispatch = useDispatch();

    const pokemons = useSelector(state => state.allCurrentPokemons);
    const types = useSelector(state => state.types);

    let max = pokemons.length > 1 ? Math.ceil(pokemons.length / forEachPage) : 1;

    const handleTypes = () => {
        for (const option of document.getElementById('filter').options) {
            if (option.selected && option.value) {
                dispatch(updatePage(1));
                dispatch(orderPokemons("filter", option.value));
            };
        };
    };

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
        setPage(currentPage);
    }, [pokemons]);

    // const handleClickShowAll = () => {
    //     dispatch(getPokemons());
    //     dispatch(getTypes());
    //     dispatch(getAllPokemons());
    //     dispatch(updatePage(1));
    // };

    const handleOrders = (e) => {
        dispatch(updatePage(1));
        dispatch(orderPokemons(e.target.name), null);
    };

    const handleClickAPI = () => {
        dispatch(updatePage(1));
        dispatch(getAPI());
    };

    const handleClickDB = () => {
        dispatch(updatePage(1));
        dispatch(getCreates());
    };

    return (
        <>
            <NavBar></NavBar>
            <div >
                {
                    pokemons.length ? <div className={s.ContainerButtons}>
                        <button name={"AZ"} onClick={handleOrders} className={s.buttons}>A-Z</button>
                        <button name={"ZA"} onClick={handleOrders} className={s.buttons}>Z-A</button>
                        <button name={"MAX_MIN"} onClick={handleOrders} className={s.buttons}>Mayor ataque</button>
                        <button name={"MIN_MAX"} onClick={handleOrders} className={s.buttons}>Menor ataque</button>
                        <select id="filter" name="filter" onClick={handleTypes} className={s.buttons} defaultValue="TODOS">
                            <option value={"TODOS"} className={s.selected}>{"TODOS"}</option>
                            {
                                types && types.length && types.map((t, i) => <option key={i} value={`${t.nombre}`} className={s.selected}>{`${t.nombre}`}</option>)
                            }
                        </select>
                        <button onClick={handleClickDB} className={s.buttons}>SOLO CREADOS</button>
                        <button onClick={handleClickAPI} className={s.buttons}>SOLO ORIGINALES</button>
                    </div>
                        : null
                }
                {pokemons.length ? <Pages page={page} setPage={setPage} max={max}></Pages> : null}
            </div>
            <div className={sCard.containerCard}>
                {
                    pokemons.length
                        ? <> {pokemons.slice((page - 1) * forEachPage, (page - 1) * forEachPage + forEachPage)
                            .map(p => <Card key={parseInt((Math.random * 1000))} {...p} />)}
                        </>
                        : !pokemons.nombre ?
                            <div
                                className={s.contenedorNoPokemons}><img className={s.NoPokemonsIMG} alt="nopokemonsimg" src="https://i.gifer.com/origin/7d/7dab25c7b14a249bbc4790176883d1c5_w200.gif" />
                            </div>
                            : null
                }
            </div>
        </>
    );
};