let lista = [];
const btnAgregar = document.getElementById("btnAgregar");

function estaOnline() {
    return navigator.onLine;
}

function cargarTareas() {
    if (estaOnline()) {
        fetch('/api/tareas')
            .then(res => res.json())
            .then(datosServidor => {
                const tareasServidor = Array.isArray(datosServidor.tareas) ? datosServidor.tareas : datosServidor;

                lista = tareasServidor;  // Reemplazar lista con tareas de la bd
                localStorage.setItem("lista", JSON.stringify(lista));
                mostrarLista();
                
                sincronizarTareas(); // Sincronizar pendientes offline
                sincronizarEliminaciones();
            })
            .catch(() => {
                lista = JSON.parse(localStorage.getItem("lista")) || [];
                mostrarLista();
            });
    } else {
        lista = JSON.parse(localStorage.getItem("lista")) || []; // Offline
        mostrarLista();
    }
}

btnAgregar.addEventListener("click", () => {
    const descripcion = document.getElementById("txtTarea").value;
    if (!descripcion) return alert("Ingrese una tarea válida.");

    if (estaOnline()) {
        fetch('/api/tarea', {
            method: 'POST',
            body: JSON.stringify({ descripcion }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => {
            lista.push({ id: json.tarea.id, descripcion });
            localStorage.setItem("lista", JSON.stringify(lista));
            mostrarLista();
            limpiarCampos();
        });
    } else {
        agregarTareaOffline(descripcion);
    }
});

function agregarTareaOffline(descripcion) {
    const tarea = { id: Date.now(), descripcion }; // id temporal

    lista.push(tarea);
    localStorage.setItem("lista", JSON.stringify(lista));

    let pendientes = JSON.parse(localStorage.getItem("pendientes")) || []; // Crear localstorage para pendientes
    pendientes.push(tarea);
    localStorage.setItem("pendientes", JSON.stringify(pendientes)); //Guardar pendientes en localStorage

    mostrarLista();
    limpiarCampos();
}

function sincronizarTareas() {
    if (!estaOnline()) return;

    let pendientes = JSON.parse(localStorage.getItem("pendientes")) || []; // Toma el storage de pendientes
    pendientes.forEach(tarea => { // Hace post por cada tarea pendiente
        fetch('/api/tarea', {
            method: 'POST',
            body: JSON.stringify({ descripcion: tarea.descripcion }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => {
            let nuevosPendientes = JSON.parse(localStorage.getItem("pendientes")) // Eliminar de pendientes
                .filter(p => p.id !== tarea.id);
            localStorage.setItem("pendientes", JSON.stringify(nuevosPendientes));

            // Actualizar lista con ID de la bd
            lista = lista.map(t => t.id === tarea.id ? { id: json.tarea.id, descripcion: tarea.descripcion } : t);
            localStorage.setItem("lista", JSON.stringify(lista));
            mostrarLista();
        });
    });
}

function sincronizarEliminaciones() {
    if (!estaOnline()) return;

    let eliminaciones = JSON.parse(localStorage.getItem("eliminacionesPendientes")) || []; // Toma el storage de eliminaciones pendientes
    eliminaciones.forEach(id => { // Hace delete por cada id pendiente
        fetch(`/api/tarea/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            lista = lista.filter(t => t.id !== id);// Actualizar lista local
            localStorage.setItem("lista", JSON.stringify(lista));
            mostrarLista();
        });
    });
    localStorage.setItem("eliminacionesPendientes", JSON.stringify([]));
}

function mostrarLista() {
    const listadoTareas = document.getElementById("listadoTareas");
    listadoTareas.innerHTML = "";
    lista.forEach(tarea => {
        listadoTareas.innerHTML += `<li>${tarea.descripcion} <button type="button" class="btnEliminar" onclick="eliminarTarea(${tarea.id})">Eliminar</button></li>`;
    });
}

function eliminarTarea(id) {
    if (estaOnline()) {
        fetch(`/api/tarea/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            lista = lista.filter(t => t.id !== id);
            localStorage.setItem("lista", JSON.stringify(lista));
            mostrarLista();
        });
    } else {
        lista = lista.filter(t => t.id !== id); // Offline: marcar para eliminar después
        localStorage.setItem("lista", JSON.stringify(lista)); 

        let eliminaciones = JSON.parse(localStorage.getItem("eliminacionesPendientes")) || []; // Guardar en eliminaciones pendientes
        eliminaciones.push(id);
        localStorage.setItem("eliminacionesPendientes", JSON.stringify(eliminaciones));

        // Quitar de pendientes si estaba pendiente de agregar
        let pendientes = JSON.parse(localStorage.getItem("pendientes")) || [];
        pendientes = pendientes.filter(p => p.id !== id);
        localStorage.setItem("pendientes", JSON.stringify(pendientes));
        mostrarLista();
    }
}

function limpiarCampos() {
    document.getElementById("txtTarea").value = "";
}

window.addEventListener('load', () => {
    cargarTareas();
    sincronizarTareas();
    sincronizarEliminaciones();
});

window.addEventListener('online', () => {
    sincronizarEliminaciones();
    sincronizarTareas();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(registro => console.log('SW registrado:', registro))
        .catch(error => console.log('Error al registrar el SW:', error));
}
