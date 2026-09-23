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
