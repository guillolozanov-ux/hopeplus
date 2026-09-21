/**
 * Coordinación entre la intro y el resto de la página.
 * La clase `con-intro` la pone un script en <head> antes del primer pintado
 * (ver layout.tsx), así el velo tapa la página desde el primer cuadro.
 */

export const CLASE_INTRO = "con-intro";
export const CLAVE_SESION = "hope-intro-vista";
export const EVENTO_REVELA = "hope:intro-revela";

/** Script inline: decide antes de pintar si la intro se muestra. */
export const scriptIntro = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('${CLAVE_SESION}'))document.documentElement.classList.add('${CLASE_INTRO}')}catch(e){}`;

export const hayIntro = () => document.documentElement.classList.contains(CLASE_INTRO);

/** Ejecuta `fn` cuando el velo empieza a abrirse, o de inmediato si no hay intro. */
export function alRevelar(fn: () => void) {
  if (!hayIntro()) {
    fn();
    return () => {};
  }
  window.addEventListener(EVENTO_REVELA, fn, { once: true });
  return () => window.removeEventListener(EVENTO_REVELA, fn);
}
