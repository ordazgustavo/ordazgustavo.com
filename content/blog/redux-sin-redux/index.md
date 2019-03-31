---
slug: redux-sin-redux
title: Redux sin Redux
date: 2019-03-02T04:19:24.334Z
author: Gustavo Ordaz
description:
  Redux es una excelente librería de JavaScript que te permite manejar el estado
  global de una aplicación, comúnmente se usa en conjunto con React para
  desarrollar aplicaciones muy complejas con un alto nivel de manejo de datos.
banner: ./images/banner.png
keywords:
  - javascript
  - redux
  - react
---

Redux es una excelente librería de JavaScript que te permite manejar el estado
global de una aplicación, comúnmente se usa en conjunto con React para
desarrollar aplicaciones muy complejas con un alto nivel de manejo de datos, lo
que permite un mayor dinamismo, ya que, al encontrarse la data en un solo lugar,
se puede acceder a ella desde multiples niveles sin recurrir al famoso **props
drilling** (pasar props de componente en componente hasta llegar al que
realmente lo necesita).

Sin embargo, la recomendación general es no usar Redux hasta que realmente sea
necesario, ya que, aumenta la complejidad de la arquitectura de la aplicación.

En esta ocasión quiero mostrar una solución que implemente recientemente en una
aplicación (hecha con React), que te permite manejar el estado global de tu
aplicación sin agregar ninguna dependencia al proyecto y que te permite
fácilmente agregar Redux en un futuro, si la complejidad de la misma lo
requiere.

Para esto, combine varios de los API's de React para crear una arquitectura
parecida a la de React Redux.

Lo primero es crear un context donde se almacenará el estado global:

```jsx
import React from 'react'

const StoreContext = React.createContext()

function StoreProvider({store, initialValue, children}) {
  const initialState = store(initialValue, {type: '__INIT__'})
  const [state, dispatch] = React.useReducer(store, initialState)

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

export {StoreContext, StoreProvider}
```

El componente `StoreProvider` recibe un `store`, `initialValue` y el `children`,
El `store` es el `rootReducer` (mas adelante), a la cual se le pasa un
`initialValue` por se se requiere algún valor inicial o cachear el store, y una
acción inicial con un string random, lo que devuelve el estado inicial del la
aplicación (el objeto que compone el estado global).

Lo siguiente es utilizar el nuevo hook `useReducer` que nos proporciona el
estado un una función para actualizar ese estado.

Luego, en el `index.js`:

```jsx
import store from './store'

import {App} from './App'

function Main() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  )
}
```

De esta manera, se tiene acceso al estado global en cualquier parte de la
aplicación.

El store (rootReducer) se crea utilizando la función `combineReducers`:

```jsx
import {combineReducers} from './combineReducers'

import {todos} from './reducers/todosReducer'

const rootReducer = combineReducers({
  todos,
})

export default rootReducer
```

El `todosReducer` luce exactamente igual a un reducer en Redux:

```jsx
const initialState = {
  todosList: [],
}

export function todos(state = initialState, actions) {
  switch (actions.type) {
    case ADD_TODO:
      return {...state, todosList: [actions.todo, ...state.todosList]}

    case REMOVE_TODO:
      return [actions.todo, ...state.todosList]

    default:
      return state
  }
}
```

Finalmente, para utilizar el store al estilo hook, se usa el nuevo API de React
`useContext`:

```jsx
import React from 'react'

import {StoreContext} from './storeContext'

export function useStore() {
  return React.useContext(StoreContext)
}
```

Una vez que esta todo configurado, se puede utilizar de la siguiente manera:

```jsx
import React from 'react'

import {useStore} from '../useStore'
import {ADD_TODO} from '../reducers/actions'

export function Todos() {
  const [{todos}, dispatch] = useStore()
  const [todo, setTodo] = React.useState('')

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch({type: ADD_TODO, todo})
        }}
      >
        <input
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
        <button type="submit">+</button>
      </form>
      <ul>
        {todos.todosList.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}
```

La línea importante es:

```js
const [{todos}, dispatch] = useStore()
```

El context almacena una
[tupla](https://www.fing.edu.uy/inco/cursos/fpr/wiki/index.php/Tuplas) de
`state` y `dispatch`, por lo tanto, el useStore retorna un array al cual se le
realiza un
[destructuring assignment](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/)
para extraer su valor, el primero que se obtiene del array es el estado, pero,
como solo se necesita el `todos` en este caso se realiza un nuevamente un
destructuring assigment pero en este caso a un objeto.

Lo que equivale a:

```js
const store = useStore()
const state = store[0]
const dispatch = store[1]
const todos = state.todos
```

No, gracias...

## The secret sauce

A pesar de que el titulo es **Redux sin Redux**, realmente si hay algo de Redux
que aun no menciono, `combineReducers`, por simplicidad estoy utilizando la
misma función que viene incluida con la librería adaptada mínimamente para este
use case.

```js
export function combineReducers(reducers = {}) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  const finalReducerKeys = Object.keys(finalReducers)

  return (state = {}, action) => {
    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}
```

Puedes encontrar el código original en el repo de
[Redux](https://github.com/reduxjs/redux/blob/master/src/combineReducers.js).

`combineReducers` es una función que recibe un objeto de reducers, valida que
cada elemento sea una función y crea un nuevo objeto con los reducers validos,
luego retorna una nueva función que recibe un estado inicial y una acción (lo
que hicimos en el `StoreProvider`).

Ésta función que retorna en esencia lo que hace es verificar si el estado
anterior es ejecutar la función reducer, verifica si el estado anterior es
diferente al nuevo estado y retorna uno o el otro.

---

Como puedes ver, estoy combinando `createContext`, `useReducer` y `useContext`
para crear una interface que se parece mucho a Redux sin instalar ninguna
dependencia, pero que, a su vez, cuando requieras cosas mas avanzadas como la
inclusion de middlewares, sea fácil adaptar Redux al codebase existente.

Puedes encontrar un ejemplo funcional en este
[codesandbox](https://codesandbox.io/s/0pw6r3komn).
