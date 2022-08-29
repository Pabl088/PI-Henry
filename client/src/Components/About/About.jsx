import React from 'react';
import { useHistory } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import s from './About.module.css';



export default function About() {

    const history = useHistory()

    //const dispatch = useDispatch()


    const handleClickBack = () => {
        //dispatch(getTypes())
        history.goBack()
    };



    return (
        <div className={s.Container}>
            <button onClick={handleClickBack}>X</button>
            <b>Acá va el chamuyo</b>

        </div>
    );
};