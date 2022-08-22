import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css';

export default function Card(props) {

    const { ID, nombre, tipo, img } = props;

    return (
        <div className={s.Card}>
            <div className={s.CardFront}>
                <img src={img} alt="Pokemon image" />
                <h1>{nombre}</h1>
            </div>
            <div className={s.CardBack}>
                <h1>{nombre}</h1>
                <p>TIPO</p>
                {/* FUNCION PARA RENDERIZAR LOS TIPOS */}
            </div>
        </div>
    );
};