import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import s from './LandingPage.module.css';
import { getPokemons, getTypes } from '../../Redux/actions.js';

export function Landing() {

    useEffect(() => {
        // Update the document title using the browser API
        console.log("this component has been mounted");
    }, []);

    return (
        <div className={s.Main}>
            {
                props.pokemons.length ? <Link to="/home"><div className={s.button}></div></Link>
                    : <div className={s.container}><span className={s.loader}></span><h1 className={estilos.loading}>Loading...</h1></div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        tipos: state.types
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemons: () => dispatch(getPokemons()),
        getTypes: () => dispatch(getTypes()),
        getAllPokemons: () => dispatch(getAllPokemons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)