---
slug: mi-primera-libreria-de-javascript
title: Mi primera librería de JavaScript
date: 2019-01-28T03:20:57.394Z
author: Gustavo Ordaz
description:
  Hace unos días publique mi primera librería de JavaScript, la cual te permite
  insertar mapas de HERE Maps.
banner: ./images/banner.png
keyword:
  - javascript
  - react
  - npm
---

https://twitter.com/ordazsgustavo/status/1088442213439324160

Hace unos días publique mi primera
[librería de JavaScript](https://www.npmjs.com/package/here-maps-react), la cual
te permite insertar mapas de [HERE Maps](https://www.here.com/) en cualquier
aplicación desarrollada con React, de manera que, los mapas y ciertos elementos
puedan ser insertados utilizando componentes regulares de React.

Hasta el momento están disponibles 4 componentes:

1.  HEREMap: el componente que te permitirá mostrar un mapa en el sitio web.
2.  Marker: un marcador para ubicar en el mapa dadas las coordenadas de latitud
    y longitud.
3.  Circle: te permite mostrar un circulo en unas coordenadas y con un radio
    especificado, el cual puede variar.
4.  RouteLine: este componente te permite mostrar una linea de ruta en el mapa.

## Instalación

Para instalar la librería, se hace como cualquier librería de JavaScript:

```bash
npm i here-maps-react
```

## ¿Cómo usar?

### \<HEREMap />

```jsx
import React from 'react'
import HEREMap from 'here-maps-react'

class Map extends React.Component {
  render() {
    return (
      <HEREMap
        appId="my_app_id"
        appCode="my_app_code"
        center={{lat: -12.0464, lng: -77.0428}}
        zoom={12}
      />
    )
  }
}
```

### \<Marker />

```jsx
import React from 'react'
import HEREMap, {Marker} from 'here-maps-react'

class Map extends React.Component {
  render() {
    return (
      <HEREMap
        appId="my_app_id"
        appCode="my_app_code"
        center={{lat: -12.0464, lng: -77.0428}}
        zoom={12}
      >
        <Marker lat={-12.1199408} lng={-77.037241} />
      </HEREMap>
    )
  }
}
```

### \<RouteLine />

```jsx
import React from 'react'
import HEREMap, {Marker, RouteLine} from 'here-maps-react'

class Map extends React.Component {
  render() {
    return (
      <HEREMap
        appId="my_app_id"
        appCode="my_app_code"
        center={{lat: -12.0464, lng: -77.0428}}
        zoom={12}
      >
        <Marker lat={-12.1199408} lng={-77.037241} />
        <Marker lat={-12.1261171} lng={-77.02060549999999} />
        <RouteLine
          shape={this.state.shape}
          strokeColor="#48dad0"
          lineWidth={4}
        />
      </HEREMap>
    )
  }
}
```

## ¿Puedo contribuir?

Estaré feliz de aceptar cualquier tipo de Pull Request, desde un error
ortográfico, hasta un nuevo feature.

## Agradecimientos

Esta librería esta basada en
[react-here-maps](https://github.com/Josh-ES/react-here-maps).

Decidí crear una nueva ya que la misma se encuentra sin mantenimiento desde hace
dos años y utiliza APIs antiguos de react, por lo tanto, me propuse reescribirla
utilizando las nuevas APIs y para crear nuevos componentes como el
**RouteLine**.

Puedes encontrar mas información en:

- [GitHub](https://github.com/ordazgustavo/here-maps-react)
- [npm.js](https://www.npmjs.com/package/here-maps-react)
