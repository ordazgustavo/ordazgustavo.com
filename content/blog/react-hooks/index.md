---
slug: react-hooks
title: React Hooks
date: 2019-02-05T02:14:28.530Z
author: Gustavo Ordaz
description:
  Tengo tiempo con ganas de escribir sobre esta actualización de React pero,
  pensé que sería mejor hacerlo una vez que se acercara el release date de este
  nuevo API
banner: ./images/banner.png
keywords:
  - javascript
  - react
  - hooks
---

Tengo tiempo con ganas de escribir sobre esta actualización de React pero, pensé
que sería mejor hacerlo una vez que se acercara el release date de este nuevo
API, el cual ha estado disponible desde la cómo alfa desde que se anunció en
noviembre de 2018, sin embargo, se desaconsejaba (y todavía, hasta que sea
estable) su uso en producción.

## ¿Que son los React Hooks?

Son un conjunto de funciones que pone React a disposición para manejar un local
state y/o side effects en un componente, en otras palabras, son una
**alternativa** a `setState` y los lifecycle hooks como `componentDidMount`,
`componentDidUpdate`, etc. Ejemplos en unos instantes.

## ¿Por qué surge este nuevo API?

Si tienes tiempo desarrollando en React, habrás notado que al utilizar un
**class component** la lógica de mismo se divide como mínimo en dos lifecycle:
`componentDidMount` y `componentDidUpdate`, uno para llamar un endpoint y el
otro para actualizar con nueva data, por ejemplo.

Y si en dicho componente se realiza alguna suscripción a un evento asíncrono
como una conexión a Web Socket o un observer, se debe desuscribir en el
`componentWillUnmount`.

Además, si la lógica de dicho componente se vuelve compleja, puede que haga
falta cuidar el performance utilizando `shouldComponentUpdate` para evaluar si
el mismo requiere de un re-render.

Creo que me dejo entender 😥 suena complejo, innecesariamente complejo.

## Hooks FTW! 🔥

Con los Hooks puedes evitarte este "trip" de lifecycle en lifecycle para
mantener un flujo estable, manteniendo todo en un solo sitio y dividido por
"tipo".

Además del mejor manejo del lifecycle de un componente, existen otros hooks que
nos facilitaran la vida, permitiendo utilizar _context_ sin agregar un wrapper
más al component tree, [memoizar](https://en.wikipedia.org/wiki/Memoization)
callbacks para reducir el impacto en la memoria, etc.

## Ejemplos

### useState

Este Hook "reemplaza" el `this.setState(...)` de un class component, es una
función que recibe un parámetro y retorna un arreglo con el valor y una función
para actualizar ese valor, conocida como `dispatcher`.

```jsx
import React, {useState} from 'react'

function MyComponent() {
  // v--- el estado con valor inicial `0`
  const [myValue, setMyValue] = useState(0)
  // ^--- el dispatcher

  return (
    <div>
      {myValue}
      <button onClick={() => setMyValue(value + 1)} />
    </div>
  )
}
```

Si no conoces esta sintaxis:

```js
const [myValue, setMyValue] = useState(0)
```

Se llama **Array Destructuring** y es un syntactic sugar para:

```js
const myState = useState(0)
myState[0] // <-- myValue
myState[1] // <-- setMyValue
```

### useEffect

Este es el que permite manejar el lifecycle del componente en un solo lugar, se
debe usar para realizar acciones que no se hacen en el render, como configurar
timers, llamadas a endpoints, suscripciones, observers, mutations.

```js
useEffect(() => {
  const socket = props.socket.connect()
  return () => {
    socket.disconnect()
  }
})
```

De esta manera, al montarse el componente (`componentDidMount` en un class
component), se abre la conexión a un WebSocket y cuando se desmonta el
componente (`componentWillUnmount` en un class component) se cierra la conexión
inmediatamente.

Es un ejemplo sencillo y sin contexto pero que permite entender el
funcionamiento básico de `useEffect`.

`useEffect` también acepta un segundo parámetro opcional, se trata de un arreglo
de variables que determinan si se debe ejecutar ese _efecto_, ya que, por
defecto el mismo se ejecuta cada vez que se completa el render de un componente.

Suponiendo que se requiere conectarse a un socket diferente en cierto punto, se
puede realizar lo siguiente:

```js
useEffect(() => {
  const socket = props.socket.connect()
  return () => {
    socket.disconnect()
  }
}, [props.socket])
```

De esta manera, se puede detectar un cambio en el property `socket`, permitiendo
ejecutar nuevamente el `useEffect` y cambiar la conexión.

### useContext

Con este Hook, se puede acceder al valor de un context sin necesidad de usar
render props como se hace actualmente.

```js
const MyContext = React.createContext({theme: 'light'})

...

const context = useContext(MyContext)
```

Existen otros Hooks de los cuales estaré hablando en futuros posts. Por ahora,
estos son los más importante y por ende, los que mas se usaran.

## ¿Qué otras posibilidades existen?

Como puedes notar, los Hooks son simples funciones, por lo tanto, se pueden
extender y "mezclar" para crear funcionalidades reusables, por ejemplo:

```jsx
// use-input.js
function useInput(name, initialValue) {
  const [value, setValue] = useState(initialValue)
  return {
    name,
    value,
    onChange: (e) => setValue(e.target.value)
  }
}

...

// MyForm.js
function MyForm() {
  const firstName = useInput('firstName', 'Gustavo')
  const lastName = useInput('lastName', 'Ordaz')
  return (
    <form>
      <input {...firstName} />
      <input {...lastName} />
    </form>
  )
}
```

`useInput` es un _custom hook_ que permite utilizar inputs de manera sencilla,
haciendo un `spread` de los valores que retorna en el input. El objetivo es que
el _custom hook_ sea reutilizable. En este ejemplo, se supone que `useInput`
esta en otro archivo y se importa en el componente que lo utiliza.

## Caveats

- No pueden ser usados en clases
- `useState` solo se debe usar en la parte superior de la función, es decir, no
  se deben declarar otras variables o funciones por encima de este.

## Recursos

- [React Docs](https://reactjs.org/docs/hooks-reference.html#basic-hooks): La
  documentación de react.
- [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks): una
  colección de librerías y ejemplos de hooks.
- [react-final-form-hooks](https://github.com/final-form/react-final-form-hooks):
  una librería para el manejo de formularios usando hooks.
- [useHooks](https://usehooks.com/): un blog con ejemplos de hooks listos para
  usar.
