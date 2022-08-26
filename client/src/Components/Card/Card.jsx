import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css';

export default function Card(props) {

    const { ID, nombre, Tipos, img } = props;

    return (
        <div className={s.Main}>
            <div className={s.Card}>
                <div className={s.CardFront}>
                    <h1>{nombre}</h1>
                    <img src={img} alt="Pokemon image" />
                </div>
                <div className={s.CardBack}>
                    <Link to={`/pokemons/${props.ID}`} className={s.Link}>
                        <h1>{nombre}</h1>
                        <p>TIPOS:</p>
                        <div className={s.Types}>{Tipos.map((t, i) => <p key={i}>{t.nombre}</p>)}</div>
                        <p>ID: {ID}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};