/* La contrasena de /jugar se pide una vez y se queda en sessionStorage: se
   puede recargar la pagina sin volver a escribirla, y se va sola al cerrar la
   pestana. No es la que protege nada -eso lo hace api/jugar.js, que sin ella
   no gira-; esto solo evita pedirla dos veces. */
const LLAVE = "s2b-clave";

export function claveGuardada() {
  try { return sessionStorage.getItem(LLAVE) || ""; } catch { return ""; }
}

export function guardarClave(clave) {
  try { sessionStorage.setItem(LLAVE, clave); } catch { /* sin storage se pide de nuevo al recargar */ }
}

export function olvidarClave() {
  try { sessionStorage.removeItem(LLAVE); } catch {}
}

/* un header no acepta acentos ni la ene, asi que viaja codificada */
export const headerClave = (clave) => ({ "x-sb2b-clave": encodeURIComponent(clave) });

/* El nombre del jugador va en localStorage y no en sessionStorage: quien
   vuelve manana sigue sumando en la misma fila del ranking sin tener que
   acordarse de como lo escribio. */
const LLAVE_NOMBRE = "s2b-jugador";

export function nombreGuardado() {
  try { return localStorage.getItem(LLAVE_NOMBRE) || ""; } catch { return ""; }
}

export function guardarNombre(nombre) {
  try { localStorage.setItem(LLAVE_NOMBRE, nombre); } catch {}
}

export const limpiarNombre = (n) => String(n || "").replace(/\s+/g, " ").trim().slice(0, 40);

export const headerNombre = (nombre) => (nombre ? { "x-sb2b-nombre": encodeURIComponent(nombre) } : {});

/* aviso para que el ranking se vuelva a pedir despues de cada tirada */
export const EVENTO_RANKING = "s2b-ranking";
