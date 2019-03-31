---
slug: tests-pasivos-en-javascript
title: Tests pasivos en Javascript
date: 2018-10-09T05:58:41.008Z
author: Gustavo Ordaz
description:
  Escribir tests para tus aplicaciones de JavaScript puede ser una tarea
  tediosa, a nadie le gusta. Personalmente pienso que la razón es sencilla, no
  es divertido 😞.
banner: ./images/banner.png
keyword:
  - javascript
  - tooling
---

Escribir tests para tus aplicaciones de JavaScript puede ser una tarea tediosa,
a nadie le gusta. Personalmente pienso que la razón es sencilla: no es divertido
😞. Actualmente estoy aprendiendo a escribir tests y poco a poco voy entendiendo
la importancia de ellos (sobre todo cuando hago las cosas sin probarlas bien
😁).

Sin embargo, actualmente uso 3 herramientas que me ayudan a reducir estos bugs
sin necesidad de escribir tests.

> La idea de este post no es que evites escribir tests, todo lo contrario, te
> invito a que aprendas y los pongas en practica.

## 1. ESlint

> The pluggable linting utility for JavaScript and JSX

Un linter es una herramienta que permite detectar errores de código "ahead of
time", es decir, mientras vas escribiendo.

También permite forzar un estilo de código como:

- [AirBNB ](https://github.com/airbnb/javascript) (Mi favorito actualmente)
- [Google](https://google.github.io/styleguide/jsguide.html)
- [Standard](https://standardjs.com/)

Son algunos de los más utilizados.

Ejemplo:

```js
const lunch = {
  beverage: 'Water',
  dish: 'Pizza',
  dessert: 'Lemon pie',
}

if (!'dessert' in lunch) {
  buyDessert()
}
```

Si notaste el error te felicito, pero sinceramente es un error que a cualquiera
se le puede escapar. Lo importante es tener la herramienta a la mano y dejar que
la maquina trabaje por ti, en lugar de perder tiempo pensando y leyendo el
código buscando la falla.

Cabe destacar que existen otras herramientas que cumplen con el mismo objetivo,
pero **ESlint** es la más utilizada actualmente.

## 2. Prettier

> An opinionated code formatter

Prettier es una de mis herramientas favoritas. Me permite olvidarme de escribir
código "bonito" ya que él lo hace por mí ahorrándome mucho tiempo que puedo
invertir en otras cosas más importantes, ademas de la paz mental que me trae ver
el código bien formateado 💆‍♂️. Sí, soy un poco obsesivo.

Tengo un post donde te explico como
[configurar prettier para que funcione de manera automática](https://blog.ordazgustavo.com/posts/configurar-prettier-para-dar-formato-a-tu-codigo-automaticamente/)
cuando haces un commit.

¿Por qué digo que prettier te ayuda a testear el código?

Cuando éste da formato al código corrige pequeños bugs que se nos pueden escapar
a simple vista.

Ejemplo:

Antes

```js
const a = true
const b = true
const c = false
const d = (a && b) || c
```

Después

```js
const a = true
const b = true
const c = false
const d = (a && b) || c
```

O puede que quieras evaluar de una manera diferente

```js
const d = a && (b || c)
```

Si no entiendes las diferencia, te recomiendo este
[articulo](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Operator_Precedence)
en MDN.

La mejor parte es que tiene una excelente
[integración](https://github.com/prettier/eslint-config-prettier) con ESlint, de
manera que trabajan juntos (en la mayoría de los casos) para ayudarte a mantener
tu código ordenado.

## 3. Typescript / Flow

Ambos son lo que se conoce como "static type checker", algo como analizador de
tipado estático (🤷‍♂️), es otras palabras, analizan el código mientras vas
escribiendo para evitar "mezclar" tipos de datos, uno de los errores mas comunes
que se comete en Javascript.

```js
function greet(name) {
  return 'Hello' + name
}

greet(10) // NaN
```

Es un ejemplo tonto, pero todos hemos estado ahí.

Tengo un poco de experiencia con ambos, la ventaja de Flow es que se puede
integrar de forma sencilla a un proyecto existente, ya que se puede hacer de
forma gradual, solo se debe insertar un comentario en el inicio del archivo y ya
Flow lo tomara en cuenta.

```js
// @flow

import React from 'react'
...
```

Sin embargo, si estoy iniciando un proyecto nuevo, me gusta utilizar Typescript
ya que sus mensajes de error son más fáciles de entender y su integración con
VSCode es excelente (VSCode esta hecho con Typescript).

Este post esta inspirado en una de las personas que mas admiro en la comunidad
de Javascript, [Kent C Dodds](https://twitter.com/kentcdodds), te recomiendo que
lo sigas.
