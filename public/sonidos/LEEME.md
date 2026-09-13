# Sonidos de la tragamonedas

Poné los archivos acá con **estos nombres exactos** y la máquina los usa sola.
No hay que tocar código.

| Archivo | Qué tiene que ser | Duración |
|---|---|---|
| `boton.mp3` | El clac al apretar GIRAR. Seco y corto. | < 0,5 s |
| `giro.mp3` | El rodillo girando. **Tiene que poder repetirse sin que se note el corte**, porque se pone en bucle mientras dura la jugada. | 1 – 3 s |
| `freno.mp3` | Un rodillo que para. Suena cinco veces por jugada. | < 1 s |
| `moneda.mp3` | **UNA sola moneda** cayendo, no una lluvia. La lluvia se arma sola repitiendo esta con el tono y la posición cambiados. | < 1 s |
| `premio.mp3` | La fanfarria de un premio común (10 %, 15 %, 20 %). | 1 – 3 s |
| `mayor.mp3` | La del premio mayor, con campana. Puede durar más. | 2 – 5 s |
| `bonus.mp3` | El aviso de "otro intento". | < 2 s |
| `perdio.mp3` | El sonido corto de cuando no sale nada. Opcional. | < 1 s |

## Cómo funciona

- **Se pueden agregar de a uno.** Cada archivo que aparece reemplaza a su
  sonido sintetizado; los que falten siguen sonando sintetizados. La máquina
  nunca queda muda.
- Un archivo que falta da 404 y no rompe nada: está contemplado.
- Todo pasa igual por la cadena de audio (sala, compresor, estéreo) y **cada
  repetición sale con el tono corrido al azar**, así cinco frenadas seguidas
  no suenan calcadas.

## Por qué una moneda sola y no una lluvia

Una lluvia grabada puesta en bucle se nota enseguida: el oído encuentra el
punto de repetición en dos vueltas. Una moneda sola, repetida 44 veces con
tono y posición distintos cada vez, no.

## De dónde sacarlos

Cualquier banco de sonidos con licencia para uso comercial. Gratis y sin
atribución: **Pixabay Audio** y **Mixkit**. Gratis con atribución o CC0:
**Freesound** (filtrá por licencia CC0). Pagos: Envato Elements, Epidemic
Sound, AudioJungle.

Buscá: `slot machine`, `casino win`, `coin drop`, `reel spin`, `jackpot bell`.

## Después de copiarlos

```
npm run build
npx vercel --prod
```
