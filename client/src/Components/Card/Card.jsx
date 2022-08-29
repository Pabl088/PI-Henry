import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css';
import image from './Images/desconocido.gif';

export default function Card(props) {

    const { ID, nombre, Tipos, img } = props;

    return (
        <div className={s.Main}>
            <div className={s.Card}>
                <div className={s.CardFront}>
                    <h1 className={s.name}>{nombre}</h1>
                    <img className={s.img} src={!img ? image : img} alt="Pokemon" />
                </div>
                <div className={s.CardBack}>
                    <Link to={`/pokemons/${props.ID}`} className={s.Link}>
                        <h1 className={s.name}>{nombre}</h1>
                        <span className={s.tipos}>TIPOS:</span>
                        <div className={s.Types}>{Tipos.map((t, i) => <span className={s.tiposList} key={i}>{t.nombre}</span>)}</div>
                        <p className={s.id}>ID: {ID}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};