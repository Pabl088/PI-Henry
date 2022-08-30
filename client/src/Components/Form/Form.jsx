import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPokemon, getTypes, getAllPokemons, cleanForm, getPokemons, updatePage } from '../../Redux/actions.js';
import s from './Form.module.css';
import pikachu from './Images/pikachu.gif';

export default function Form() {

    const history = useHistory()
    const dispatch = useDispatch();

    const [names, setNames] = useState([]);
    const [input, setInput] = useState({
        nombre: "",
        vida: 0,
        ataque: 0,
        defensa: 0,
        velocidad: 0,
        img: "",
        altura: 0,
        peso: 0,
        Tipos: []
    });

    const [errors, setErrors] = useState({});

    const types = useSelector(state => state.types);
    const toNames = useSelector(state => state.pokemons);
    const pokemonName = useSelector(state => state.createdPokemon);

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
        setNames(() => toNames);
        return () => {
            dispatch(cleanForm());
        }
    }, []);

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [pokemonName]);


    const handleClickBack = () => {
        dispatch(getPokemons());
        history.goBack();
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    function hanldeChangeType(e) {
        let selected = [];
        for (const option of document.getElementById('types').options) {
            if (option.selected) {
                selected.push(option.value);
            };
        };
        setInput({
            ...input,
            Tipos: selected
        });
        setErrors(validateInput({
            ...input,
            types: selected
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(validateInput(input)).length
            ? alert("Por favor revisa la informacion!")
            : !names.find(poke => poke.nombre.toLowerCase() === input.nombre.toLowerCase()) ?
                dispatch(createPokemon(input)) && setInput({
                    nombre: "",
                    vida: 0,
                    ataque: 0,
                    defensa: 0,
                    velocidad: 0,
                    img: "",
                    altura: 0,
                    peso: 0,
                    Tipos: []
                })
                : alert(`${input.nombre} ya existe!`);
        dispatch(updatePage(1));
        dispatch(getPokemons());
    };

    const handleBlur = () => {
        dispatch(cleanForm());
        setNames(() => toNames);
    };


    return (
        <div className={s.background}>
            <div className={s.main}>
                <div className={s.header}>
                    <h1 className={s.title}>Crear pokemon</h1>
                    <button onClick={handleClickBack} className={s.BackButton}>X</button>
                </div>
                <div className={s.container}>
                    <div className={s.Form}>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className={s.DivInput}>
                                <label className={s.Label}>Nombre:</label>
                                <input className={s.InputFormName} type="text" name="nombre" placeholder="Nombre..." value={input.nombre} onChange={handleChange} onBlur={handleBlur} required></input>
                                {errors.name ? <span className={s.warning}>{errors.name}</span> : null}
                            </div>
                            <div className={s.DivInput}>
                                <label className={s.Label}>Vida (1 - 200):</label>
                                <input className={s.InputForm} type="number" name="vida" value={input.vida} onChange={handleChange} required></input>
                                {errors.hp ? <span className={s.warning}>{errors.hp}</span> : null}
                            </div>
                            <div className={s.DivInput}>
                                <label className={s.Label}>Ataque (1 - 200):</label>
                                <input className={s.InputForm} type="number" name="ataque" value={input.ataque} onChange={handleChange} required></input>
                                {errors.attack ? <span className={s.warning}>{errors.attack}</span> : null}
                            </div>
                            <div className={s.DivInput}>
                                <label className={s.Label}>Defensa (1 - 200):</label>
                                <input className={s.InputForm} type="number" name="defensa" value={input.defensa} onChange={handleChange} required></input>
                                {errors.defense ? <span className={s.warning}>{errors.defense}</span> : null}
                            </div>
                            <div className={s.DivInput}>
                                <label className={s.Label}>Velocidad (1 - 200):</label>
                                <input className={s.InputForm} type="number" name="velocidad" value={input.velocidad} onChange={handleChange} required></input>
                                {errors.speed ? <span className={s.warning}>{errors.speed}</span> : null}
                            </div>
                            <div className={s.DivInput}>
                                <label className={s.Label}>Altura (1cm - 200cm):</label>
                                <input className={s.InputForm} type="number" name="altura" value={input.altura} onChange={handleChange} required></input>
                                {errors.height ? <span className={s.warning}>{errors.height}</span> : null}
                            </div>
                            <div className={s.DivInput}>
                                <label className={s.Label}>Peso(1kg - 200kg):</label>
                                <input className={s.InputForm} type="number" name="peso" value={input.peso} onChange={handleChange} required></input>
                                {errors.weight ? <span className={s.warning}>{errors.weight}</span> : null}
                            </div>
                            <div className={s.DivInput}>
                                <label className={s.Label}>Elige los tipos:</label>
                                <select className={s.SelectInput} id="types" name="Tipos" multiple="multiple" onChange={(e) => hanldeChangeType(e)}>
                                    {types.length ? types.map((t, i) => <option key={i} value={`${t.nombre}`}>{`${t.nombre}`}</option>) : null}
                                </select>
                                {errors.types ? <div className={s.errorTypes}><span className={s.errorType}>{errors.types}</span> </div> : null}
                            </div>
                            <div className={s.imageFormInput}>
                                <label className={s.Label}>Url de imagen:</label>
                                <input className={s.InputFormImg} type="text" name="img" value={input.img} placeholder="Ingresa url..." onChange={handleChange}></input>
                            </div>
                            <button type="submit" className={s.create}>CREAR</button>
                        </form>
                    </div>
                    <div className={s.resContainer}>
                        {pokemonName.nombre ? <div className={s.response}>
                            <div className={s.pokeCreated}><h1>{`Pokémon ${pokemonName.nombre} creado con éxito!`}</h1></div>
                            <div className={s.BGoPoke}>
                                <a href={`/pokemons/${pokemonName.ID}`}>VER POKEMON</a>
                            </div>
                        </div>
                            : <div >
                                <img src={pikachu} alt="pikachu" className={s.pikachu} />
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

function validateInput(input) {

    let errors = {};

    if (!input.nombre) {
        errors.name = "El nombre es requerido.";
    } else if (!/^[A-Za-z0-9\s]+$/g.test(input.nombre)) {
        errors.name = "El nombre no debe contener caracteres especiales.";
    } else if (input.nombre.length > 15) {
        errors.name = "Maximo 15 caracteres.";
    };

    if (!input.vida) {
        errors.hp = "Vida es requerida.";
    } else if (input.vida <= 0 || !/^[0-9]*$/g.test(input.vida)) {
        errors.hp = "Vida minima es 1.";
    } else if (input.vida > 200 || !/^[0-9]*$/g.test(input.vida)) {
        errors.hp = "Vida maxima es 100.";
    };

    if (!input.ataque) {
        errors.attack = "Ataque es requerido.";
    } else if (input.ataque <= 0 || !/^[0-9]*$/g.test(input.ataque)) {
        errors.attack = "Ataque minimo es 1.";
    } else if (input.ataque > 200 || !/^[0-9]*$/g.test(input.ataque)) {
        errors.attack = "Ataque maximo es 100.";
    };

    if (!input.defensa) {
        errors.defense = "Defensa es requerida.";
    } else if (input.defensa <= 0 || !/^[0-9]*$/g.test(input.defensa)) {
        errors.defense = "Defensa minima es 1.";
    } else if (input.defensa > 200 || !/^[0-9]*$/g.test(input.defensa)) {
        errors.defense = "Defensa maxima es 100.";
    };

    if (!input.velocidad) {
        errors.speed = "Velocidad es requerida.";
    } else if (input.velocidad <= 0 || !/^[0-9]*$/g.test(input.velocidad)) {
        errors.speed = "Velocidad minima es 1.";
    } else if (input.velocidad > 200 || !/^[0-9]*$/g.test(input.velocidad)) {
        errors.speed = "Velocidad maxima es 100.";
    };

    if (!input.altura) {
        errors.height = "Altura es requerida.";
    } else if (input.altura <= 0 || !/^[0-9]*$/g.test(input.altura)) {
        errors.height = "Altura minima es 1.";
    } else if (input.altura > 200 || !/^[0-9]*$/g.test(input.altura)) {
        errors.height = "Altura maxima es 100.";
    };

    if (!input.peso) {
        errors.weight = "Peso es requerido.";
    } else if (input.peso <= 0 || !/^[0-9]*$/g.test(input.peso)) {
        errors.weight = "Peso minimo es requerido.";
    } else if (input.peso > 200 || !/^[0-9]*$/g.test(input.peso)) {
        errors.weight = "Peso maximo es 100.";
    };

    if (!input.Tipos.length || input.Tipos.length > 3) {
        errors.types = "Debes seleccionar al menos un tipo, pero no mas de tres";
    };
    return errors
};