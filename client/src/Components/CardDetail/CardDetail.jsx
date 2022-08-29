import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, cleanDetails, getTypes, getPokemons } from '../../Redux/actions.js';
import s from './CardDetail.module.css';
import image from './Images/desconocido.gif';

export default function CardDetail(props) {

    const history = useHistory();
    const dispatch = useDispatch();

    const id = props.match.params.id;


    useEffect(() => {
        dispatch(getById(id));
        return () => {
            dispatch(cleanDetails());
        };
    }, [dispatch, id]);


    const handleBack = () => {
        history.goBack();
        dispatch(getPokemons());
    };

    const pokemon = useSelector(state => state.currentPokemon);

    return (
        <div className={s.Container}>
            {pokemon.nombre ?
                <>
                    <button onClick={handleBack} className={s.Boton}>X</button>
                    <div className={s.Main}>
                        <div className={s.Card}>
                            <div className={s.CardFront}>
                                <h1>{pokemon.nombre}</h1>
                                <img src={!pokemon.img ? image : pokemon.img} alt="Pokemons" />
                            </div>
                            <div className={s.CardBack}>
                                <h1>{pokemon.nombre}</h1>
                                <p className={s.string_types}>TIPOS:</p>
                                <div className={s.Types}>{pokemon.Tipos.map((t, i) => <p key={i}>{t.nombre}</p>)}</div>
                                <div className={s.Stats}>
                                    <div className={s.Stats1}>
                                        <span>VIDA: {pokemon.vida}</span><span>VELOCIDAD: {pokemon.velocidad}</span>
                                    </div>
                                    <div className={s.Stats2}>
                                        <span>ATAQUE: {pokemon.ataque}</span><span>DEFENSA: {pokemon.defensa}</span>
                                    </div>
                                    <div className={s.Stats3}>
                                        <span>ALTURA: {pokemon.altura}</span><span>PESO: {pokemon.peso}</span>
                                    </div>
                                </div>
                                <p className={s.id}>ID: {pokemon.ID}</p>
                            </div>
                        </div>
                    </div>
                </> : <b>No existe un pokemon con la id seleccionada</b>}
        </div>
    );
};