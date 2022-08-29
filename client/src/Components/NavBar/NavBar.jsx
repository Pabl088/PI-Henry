import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getTypes, getPokemons } from '../../Redux/actions.js';
import Card from '../Card/Card.jsx';
import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';
import title from './Images/Pokemon.png';
import search from './Images/search.gif';
import { resetSelects } from '../Home/Home.jsx';


export function NavBar() {

    const dispatch = useDispatch();

    const [input, setInput] = useState("");

    const pokemon = useSelector(state => state.allCurrentPokemons);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.length) {
            dispatch(getByName(input.toLowerCase()));
            setInput("");
        };
    };

    const handleClear = () => {
        dispatch(getPokemons());
        dispatch(getTypes());
        if (pokemon.length) resetSelects();
    };

    return (
        <>
            <div className={s.Main}>
                <div className={s.container}>
                    <div className={s.form}>
                        <form onSubmit={handleSubmit} >
                            <input className={s.input}
                                name="name" value={input}
                                placeholder="Buscar pokemon por nombre..."
                                autoComplete="off"
                                onChange={handleChange}
                            ></input>
                            <button type="submit" className={s.sbutton}>
                                <img src={search} alt="submit" />
                            </button>
                        </form>
                    </div>
                    <div className={s.title}><img src={title} alt="Pokemon" /></div>
                    <div className={s.list}>
                        <ul>
                            <li>
                                <NavLink to="/create" className={s.NavLink}>
                                    Crear Pokemon
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className={s.NavLink}>
                                    Acerca de
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <button onClick={handleClear} className={s.resetFilter}>Quitar filtros</button>
            </div>
            <div className={s.result}>
                {pokemon.nombre && <Card {...pokemon} />}
            </div>
        </>
    );
};