import React from "react";
import { Link } from "react-router-dom";
import s from './CardDetail.module.css';

export default function CardDetail(props) {

    const { ID, nombre, tipo, vida, ataque, defensa, velocidad, altura, peso, img } = props;

    return (
        <div className={s.Main}>
            <button>X</button>
            <div className={s.Card}>
                <div className={s.CardFront}>
                    <img src={img} alt="Pokemon image" />
                    <h1>{nombre}</h1>
                    <p>ID: {ID}</p>
                </div>
                <div className={s.CardBack}>
                    <h1>{nombre}</h1>
                    <p>TIPO: {tipo}</p>
                    <div className={s.Stats}>
                        <div>
                            <span>VIDA: {vida}</span><span>VELOCIDAD: {velocidad}</span>
                        </div>
                        <div>
                            <span>ATAQUE: {ataque}</span><span>DEFENSA: {defensa}</span>
                        </div>
                        <div>
                            <span>ALTURA: {altura}</span><span>PESO: {peso}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};