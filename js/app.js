//variables
const presupuestoUser = prompt('ingresa tu presupuesto');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

//clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

//clase Interfaz maneja todo lo que se ba a insertar en el hTML
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');
        //insertar el presupuesto al dom
        presupuestoSpan.innerHTML= `${cantidad}`;
        restanteSpan.innerHTML= `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));
        //insertar al DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //quitar el mensaje
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
            formulario.reset();

        }, 3000);
    }
//insertar gasto a lalista
    agregarGastoLista(nombre, cantidad){
        const gastoLista = document.querySelector('#gastos ul');

        //crear el li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //insertar li
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">${cantidad}</span>
        `;
        //insertar al html
        gastoLista.appendChild(li);
    }
    //presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('#restante');
        //leer el presupuesto restante
        const presupuestoRestanteUser = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteUser}`; 

        this.comprobarPesupuesto();
    }
    //cambia de color presupuesto
    comprobarPesupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //comprobamos 25%
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}


//eventListener
document.addEventListener('DOMContentLoaded',function(){
    if(presupuestoUser === null || presupuestoUser === ''){
        window.location.reload();
    }
    //instancia un presupuesto
    cantidadPresupuesto = new Presupuesto(presupuestoUser);

    //instancia la clase interfacew
    const ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);

});

formulario.addEventListener('submit',function(e){
    e.preventDefault();

    //leer datos del formulario
    const nombreGastos = document.getElementById('gasto').value;
    const cantidadGastos = document.getElementById('cantidad').value;

    //Instanciar la interfaz
    const ui = new Interfaz();

    //comprobando que lso input no esten vacios
    if (nombreGastos === '' || cantidadGastos === '') {
        ui.imprimirMensaje('hubo un error','error');
    } else {
        //insertar en el html
        ui.imprimirMensaje('correcto','correcto');
        ui.agregarGastoLista(nombreGastos, cantidadGastos);
        ui.presupuestoRestante(cantidadGastos);
    }


})