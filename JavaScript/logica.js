const entrada = document.getElementById('entrada');
const listaPendientes = document.getElementById('lista-pendientes');
const listaCompletadas = document.getElementById('lista-completadas');

cargarLocalStorage()

function agregarTarea() {
    const tareaTexto = entrada.value.trim();
    if (tareaTexto === '') { 
        alert('Debes escribir algo.');
        return;
    }

    const nuevaTarea = document.createElement('li');
    nuevaTarea.innerText = tareaTexto;

    const botonCompletar = document.createElement('button');
    botonCompletar.innerText = '✔';
    botonCompletar.classList.add('button-listo');
    botonCompletar.addEventListener('click', marcarComoCompletada);

    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = 'X';
    botonEliminar.classList.add('button-eliminar');
    botonEliminar.addEventListener('click', eliminarTarea);

    nuevaTarea.appendChild(botonCompletar);
    nuevaTarea.appendChild(botonEliminar);

    listaPendientes.appendChild(nuevaTarea);

    entrada.value = '';

    guardarLocalStorage();
}

if (entrada) {
    entrada.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            agregarTarea();
        }
    });
}

function marcarComoCompletada(event) {
    const tareaCompletada = event.target.parentElement;
    listaCompletadas.appendChild(tareaCompletada);
    event.target.remove();
    tareaCompletada.classList.add('listo');

    guardarLocalStorage();
}

function eliminarTarea(event) {
    event.target.parentElement.remove();
    guardarLocalStorage();
}


//! LocalStorage: Almacenamiento del Navegador: 
function guardarLocalStorage() {
    const tareasPendientes = [];
    listaPendientes.childNodes.forEach((tarea) => {
        if (tarea.nodeType === 1) { 
            tareasPendientes.push(tarea.innerText.replace('✔', '').replace('X', '').trim());
            // console.log(tareasPendientes);
        }
    });

    const tareasCompletadas = [];
    listaCompletadas.childNodes.forEach((tarea) => {
        if (tarea.nodeType === 1) {
            tareasCompletadas.push(tarea.innerText.replace('X', '').trim());
            // console.log(tareasCompletadas);
        }
    });

    localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientes));
    localStorage.setItem('tareasCompletadas', JSON.stringify(tareasCompletadas));
}

function cargarLocalStorage() {
    document.addEventListener('DOMContentLoaded', () => {
        const tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes')) || [];
        const tareasCompletadas = JSON.parse(localStorage.getItem('tareasCompletadas')) || [];

        tareasPendientes.forEach((tarea) => {
            const nuevaTarea = document.createElement('li');
            nuevaTarea.innerText = tarea;

            const botonCompletar = document.createElement('button');
            botonCompletar.innerText = '✔';
            botonCompletar.classList.add('button-listo');
            botonCompletar.addEventListener('click', marcarComoCompletada);

            const botonEliminar = document.createElement('button');
            botonEliminar.innerText = 'X';
            botonEliminar.classList.add('button-eliminar');
            botonEliminar.addEventListener('click', eliminarTarea);

            nuevaTarea.appendChild(botonCompletar);
            nuevaTarea.appendChild(botonEliminar);

            listaPendientes.appendChild(nuevaTarea);
        });

        tareasCompletadas.forEach((tarea) => {
            const nuevaTarea = document.createElement('li');
            nuevaTarea.innerText = tarea;
            nuevaTarea.classList.add('listo');

            const botonEliminar = document.createElement('button');
            botonEliminar.innerText = 'X';
            botonEliminar.classList.add('button-eliminar');
            botonEliminar.addEventListener('click', eliminarTarea);

            nuevaTarea.appendChild(botonEliminar);

            listaCompletadas.appendChild(nuevaTarea);
        });
    });
}