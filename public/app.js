// ===== Estado =====
let lista = [];
const btnAgregar = document.getElementById("btnAgregar");

// ===== Helpers Service Worker Snapshot =====
function postToSW(msg) {
  try {
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  } catch (_) {}
}

function guardarSnapshot() {
  postToSW({ type: 'SAVE_SNAPSHOT', payload: lista });
}

async function restaurarDesdeSnapshotSiHaceFalta() {
  try {
    if (lista.length) return; // ya hay datos cargados
    if ('caches' in window) {
      const res = await caches.match('/snapshot/tareas.json');
      if (res && res.ok) {
        const backup = await res.json();
        if (Array.isArray(backup) && backup.length) {
          lista = backup;
          localStorage.setItem('lista', JSON.stringify(lista));
          mostrarLista();
        }
      }
    }
  } catch (_) {}
}

// ===== Red robusta =====
async function isReallyOnline(msTimeout = 1200) {
  if (!navigator.onLine) return false;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), msTimeout);
    const res = await fetch('/', { method: 'HEAD', cache: 'no-store', signal: ctrl.signal });
    clearTimeout(t);
    return !!res.ok;
  } catch {
    return false;
  }
}

// ===== Storage helpers =====
function loadLocal() {
  try { return JSON.parse(localStorage.getItem('lista') || '[]'); }
  catch { return []; }
}
function saveLocal(arr) {
  try { localStorage.setItem('lista', JSON.stringify(arr || [])); } catch {}
}
function loadPendientes() {
  try { return JSON.parse(localStorage.getItem('pendientes') || '[]'); }
  catch { return []; }
}
function savePendientes(arr) {
  try { localStorage.setItem('pendientes', JSON.stringify(arr || [])); } catch {}
}
function loadEliminaciones() {
  try { return JSON.parse(localStorage.getItem('eliminacionesPendientes') || '[]'); }
  catch { return []; }
}
function saveEliminaciones(arr) {
  try { localStorage.setItem('eliminacionesPendientes', JSON.stringify(arr || [])); } catch {}
}

// ===== Carga =====
// 1) pintamos lo local SIEMPRE; 2) si hay red real, vamos al server
async function cargarTareas() {
  lista = loadLocal();
  mostrarLista();

  if (await isReallyOnline()) {
    try {
      const res = await fetch('/api/tareas', { cache: 'no-store' });
      if (!res.ok) throw new Error('api');
      const datosServidor = await res.json();
      const tareasServidor = Array.isArray(datosServidor.tareas) ? datosServidor.tareas : datosServidor;
      lista = tareasServidor;
      saveLocal(lista);
      guardarSnapshot();
      mostrarLista();
      // sincroniza después de pintar
      await sincronizarTareas();
      await sincronizarEliminaciones();
    } catch {
      // offline lógico → nos quedamos con local
    }
  }
}

// ===== Agregar =====
btnAgregar.addEventListener("click", async () => {
  const descripcion = document.getElementById("txtTarea").value.trim();
  if (!descripcion) return alert("Ingrese una tarea válida.");

  if (await isReallyOnline()) {
    try {
      const res = await fetch('/api/tarea', {
        method: 'POST',
        body: JSON.stringify({ descripcion }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('post');
      const json = await res.json();
      lista.push({ id: json?.tarea?.id ?? Date.now(), descripcion });
      saveLocal(lista);
      guardarSnapshot();
      mostrarLista();
      limpiarCampos();
    } catch {
      agregarTareaOffline(descripcion);
    }
  } else {
    agregarTareaOffline(descripcion);
  }
});

function agregarTareaOffline(descripcion) {
  const tarea = { id: Date.now(), descripcion }; // id temporal
  lista.push(tarea);
  saveLocal(lista);

  const pendientes = loadPendientes();
  pendientes.push(tarea);
  savePendientes(pendientes);

  guardarSnapshot();
  mostrarLista();
  limpiarCampos();
}

// ===== Sincronización =====
async function sincronizarTareas() {
  if (!(await isReallyOnline())) return;

  let pendientes = loadPendientes();
  for (const tarea of pendientes) {
    try {
      const res = await fetch('/api/tarea', {
        method: 'POST',
        body: JSON.stringify({ descripcion: tarea.descripcion }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('post');
      const json = await res.json();

      // quitar de pendientes
      pendientes = loadPendientes().filter(p => p.id !== tarea.id);
      savePendientes(pendientes);

      // actualizar id real en lista
      lista = loadLocal().map(t => t.id === tarea.id ? { id: json?.tarea?.id ?? t.id, descripcion: tarea.descripcion } : t);
      saveLocal(lista);
      guardarSnapshot();
      mostrarLista();
    } catch {
      // si falla, se intentará luego
    }
  }
}

async function sincronizarEliminaciones() {
  if (!(await isReallyOnline())) return;

  let eliminaciones = loadEliminaciones();
  const restantes = [];
  for (const id of eliminaciones) {
    try {
      const res = await fetch(`/api/tarea/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('del');
      // si elimina bien en server, también quitamos de local
      lista = loadLocal().filter(t => t.id !== id);
      saveLocal(lista);
      guardarSnapshot();
      mostrarLista();
    } catch {
      // queda pendiente para la próxima
      restantes.push(id);
    }
  }
  saveEliminaciones(restantes);
}

// ===== UI =====
function mostrarLista() {
  const listadoTareas = document.getElementById("listadoTareas");
  listadoTareas.innerHTML = "";
  for (const tarea of lista) {
    listadoTareas.innerHTML += `
      <li>
        ${tarea.descripcion}
        <button type="button" class="btnEliminar" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
      </li>`;
  }
}

// ===== Eliminar =====
async function eliminarTarea(id) {
  if (await isReallyOnline()) {
    try {
      const res = await fetch(`/api/tarea/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error('del');
      lista = lista.filter(t => t.id !== id);
      saveLocal(lista);
      guardarSnapshot();
      mostrarLista();
    } catch {
      eliminarOffline(id);
    }
  } else {
    eliminarOffline(id);
  }
}

function eliminarOffline(id) {
  // quita de la lista local
  lista = lista.filter(t => t.id !== id);
  saveLocal(lista);

  // registra eliminación pendiente
  const elim = loadEliminaciones();
  elim.push(id);
  saveEliminaciones(elim);

  // si estaba por agregarse, cancélalo
  let pendientes = loadPendientes();
  pendientes = pendientes.filter(p => p.id !== id);
  savePendientes(pendientes);

  guardarSnapshot();
  mostrarLista();
}

// ===== Util =====
function limpiarCampos() {
  document.getElementById("txtTarea").value = "";
}

// ===== Ciclo de vida =====
window.addEventListener('load', async () => {
  // Espera a que el SW esté listo para que snapshots funcionen
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.ready.catch(() => {});
  }
  await cargarTareas();                   // pinta local y luego intenta server
  await restaurarDesdeSnapshotSiHaceFalta(); // si LS vino vacío, usa snapshot

  if (await isReallyOnline()) {
    await sincronizarTareas();
    await sincronizarEliminaciones();
  }
});

window.addEventListener('online', async () => {
  await sincronizarEliminaciones();
  await sincronizarTareas();
});

// ===== Service Worker =====
if ('serviceWorker' in navigator) {
  // usa ruta ABSOLUTA para cubrir todo el sitio
  navigator.serviceWorker.register('/sw.js')
    .then(r => console.log('SW registrado:', r))
    .catch(err => console.log('Error al registrar el SW:', err));

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // listo para postMessage cuando cambie el controller
  });
}
