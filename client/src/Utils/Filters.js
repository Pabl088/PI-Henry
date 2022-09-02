export function orderA_Z(array) {
    return array.sort(sortArrayA_Z);
};
function sortArrayA_Z(x, y) {
    if (x.nombre.toLowerCase() < y.nombre.toLowerCase()) {
        return -1;
    };
    if (x.nombre.toLowerCase() > y.nombre.toLowerCase()) {
        return 1;
    };
    return 0;
};



export function orderZ_A(array) {
    return array.sort(sortArrayZ_A);
};
function sortArrayZ_A(x, y) {
    if (x.nombre.toLowerCase() < y.nombre.toLowerCase()) {
        return 1;
    };
    if (x.nombre.toLowerCase() > y.nombre.toLowerCase()) {
        return -1;
    };
    return 0;
};


export function orderMin_MaxAtaque(array) {
    return array.sort(sortMin_Max);
};
function sortMin_Max(x, y) {
    if (x.ataque < y.ataque) {
        return -1
    };
    if (x.ataque > y.ataque) {
        return 1;
    };
    return 0;
};


export function orderMax_MinAtaque(array) {
    return array.sort(sortMax_Min);
};
function sortMax_Min(x, y) {
    if (x.ataque < y.ataque) {
        return 1;
    };
    if (x.ataque > y.ataque) {
        return -1;
    };
    return 0;
};


export function filterByApi(arr) {

    return arr.filter(p => {

        return !p.del_usuario;
    });
};


export function filterByDb(arr) {

    return arr.filter(p => {

        return p.del_usuario;
    });
};


export function filterByType(str, arr) {

    return arr.filter(p => {

        return p.Tipos.length && p.Tipos.find(t => t.nombre === str);
    });
};