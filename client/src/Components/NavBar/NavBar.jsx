import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getTypes, getPokemons } from '../../Redux/actions.js';
import Card from '../Card/Card.jsx';
import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';


export function NavBar() {

    const dispatch = useDispatch();

    const [input, setInput] = useState("");

    const pokemons = useSelector(state => state.allCurrentPokemons);

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

    const handleClick = () => {
        dispatch(getPokemons());
        dispatch(getTypes());
    };

    return (
        <>
            <div className={s.Main}>
                <div className={s.Buttons}>
                    <button onClick={handleClick} className={s.BackButton}>Quitar filtros</button>
                    <ul>
                        <li>
                            <NavLink to="/about" className={s.NavLink}>
                                Acerca de
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create" className={s.NavLink}>
                                Crear Pokemon
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <h1 className={s.title}>PoKemon</h1>
                <form onSubmit={handleSubmit} className={s.form}>
                    <input className={s.input}
                        name="name" value={input}
                        placeholder="Buscar pokemon por nombre..."
                        autoComplete="off"
                        onChange={handleChange}
                    ></input>
                    <button type="submit" className={s.button}></button>
                </form>
            </div>
            <div className={s.result}>
                {pokemons.nombre && <Card {...pokemons} />}
            </div>
        </>
    );
};