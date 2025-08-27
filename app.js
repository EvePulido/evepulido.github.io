let lista = [];

// Cargar la lista desde localStorage al iniciar
if (localStorage.getItem("lista")) {
    lista = JSON.parse(localStorage.getItem("lista"));
    mostrarLista();
}

let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
    let tarea = document.getElementById("txtTarea").value;
    let listadoTareas = document.getElementById("listadoTareas");
    if (tarea === "") { 
        return listadoTareas.innerHTML = "<li>Por favor, ingrese una tarea válida.</li>";
    }
    lista.push(tarea);
    localStorage.setItem("lista", JSON.stringify(lista));
    mostrarLista();
    limpiarCampos();
});

function mostrarLista() {
    let listadoTareas = document.getElementById("listadoTareas");
    listadoTareas.innerHTML = "";
    lista.forEach((tarea, index) => {
        listadoTareas.innerHTML += `<li>${tarea} <button type="button" class="btnEliminar" onclick="eliminarTarea(${index})">Eliminar</button></li>`;
    });
}

function eliminarTarea(index) {
    lista.splice(index, 1);
    localStorage.setItem("lista", JSON.stringify(lista));
    mostrarLista();
}

function limpiarCampos() {
    document.getElementById("txtTarea").value = "";
}

// Registro de Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registro => console.log('Service Worker registrado:', registro))
        .catch(error => console.log('Error al registrar el Service Worker:', error));
}
