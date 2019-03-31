---
slug: react-memo-contexttype-y-lazy
title: 'React memo, contextType y lazy'
date: 2018-10-26T04:56:59.096Z
author: Gustavo Ordaz
description:
  Hace un par de días el equipo de React libero la nueva actualización a la
  version 16.6 con un par de nuevas API's muy interesantes.
banner: ./images/banner.png
keyword:
  - javascript
  - react
---

Hace un par de días el equipo de React libero la nueva actualización a la
version 16.6 con un par de nuevas API's muy interesantes. Lo mas importante es
que esta actualización no trae _Breaking Changes_ por lo que si estas en React
16.X puedes actualizar sin miedo.

## React.memo()

Este nuevo API es muy parecido utilizar `PureComponent` o
`shouldComponentUpdate` en un _Statefull Component_, pero con un _function
component_.

```jsx
import React from 'react'

const Button = function(props) {
  return <button onClick={props.handleClick}>{props.children}</button>
}

return React.memo(Button)
```

Es importante mencionar que al igual que `PureComponent` y
`shouldComponentUpdate`, `React.memo()` hace lo que se conoce como **shallow
compare** es decir, solo compara los keys del primer nivel de los `props` con
los `prevProps`, no compara los hijos de estos (si se trata de un objeto o array
por ejemplo) ya que es una operación que consume muchos recursos.

## static contextType

Se trata de una alternativa a utilizar la version _render prop_ del context
consumer en un _Statefull Component_, un ejemplo para ilustrarlo mejor:

**Context con render prop**

```jsx
class Profile extends React.Component {
  // Logic ...
  render() {
    return (
      <AuthContext.Consumer>
        {user => (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        )}
      </AuthContext.Consumer>
    )
  }
}
```

**Context con contextType**

```jsx
class Profile extends React.Component {
  static contextType = AuthContext

  render() {
    return (
      <div>
        <p>{this.context.user.name}</p>
        <p>{this.context.user.email}</p>
      </div>
    )
  }
}
```

Como puedes ver es mucho mas limpio y conciso.

## React.lazy() 🔥

Probablemente mi API favorita en React actualmente, la cual, te permite realizar
[code splitting](https://reactjs.org/docs/code-splitting.html#code-splitting) de
forma sencilla y nativa en React. Anteriormente se podia crear manualmente un
HOC o utilizar una librería externa llamada
[React Loadable](https://github.com/jamiebuilds/react-loadable) para poder
realizar code splitting, sin embargo, en mi opinion (y sin quitarle valor a la
librería mencionada) me parece que es mejor utilizar un API nativo por dos
razones:

1. Soporte del mismo equipo de React.
2. Reducir las dependencias de terceros.

Ejemplo de uso:

```jsx
import React, {lazy, Suspense} from 'react'
const OtherComponent = lazy(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  )
}
```

> Ejemplo tomado del
> [blog de react](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense)

En este ejemplo, cuando sea montado `MyComponent` se realiza una llamada al
servidor para traer el pedazo (chunk) de código que contiene `OtherComponent`, y
el prop `fallback` de `Suspense` mostrara algún componente, en este caso un div
con el texto Loading, sin embargo, puede ser un spinner o cualquier placeholder.

Suspense es otro nuevo api que aun se considera inestable, pero que puede ser
usado con `React.lazy()` de forma segura actualmente.

Actualmente Lazy no funciona con server-side rendering aunque el equipo de React
asegura que una vez que liberen Suspense podrá ser usado con SSR.

Ademas de estos nuevos API's hubo otros cambios importantes, te recomiendo leer
el articulo del
[blog de react](https://reactjs.org/blog/2018/10/23/react-v-16-6.html) para
estar al día ⚛️🔥
