---
slug: configurar-prettier-para-dar-formato-a-tu-codigo-automaticamente
title: Configurar Prettier para dar formato a tu código automáticamente
date: 2018-10-03T04:39:36.838Z
author: Gustavo Ordaz
description:
  Prettier es una herramienta que permite dar y mantener un formato consistente
  al código
banner: ./images/banner.png
keywords:
  - javascript
  - tooling
---

[Prettier](https://prettier.io/) es una herramienta que permite dar y mantener
un formato consistente al código, algunos editores de texto, cómo VSCode
permiten instalar prettier y configurar cuando quieres que se ejecute.

Existen múltiples formas de configurar prettier para ejecutarse en tus commits,
la que presento en esta guía es una de las mas populares, incluso es usada por
el equipo de
[create-react-app](https://github.com/facebook/create-react-app/blob/master/package.json#L39)
(y muchos otros, por supuesto) para mantener consistencia en el repositorio.

> Esta guía asume que has usado prettier y npm previamente.

## ¿Por qué ejecutar prettier de forma automática?

- Te ayuda a mantener un estilo de código uniforme.
- Si trabajas en un equipo, no es necesario configurarlo en cada editor.
- Evitas enviar código potencialmente mal formateado sin querer.
- Mejora la legibilidad del código.
- Mantienes un estándar (como tanto nos gusta a los desarrolladores).
- Deja que la máquina trabaje por ti.

## Consejos antes de configurarlo

- Si trabajas en un equipo, consulta con todos, trata de convencerlos pero
  respeta su opinión.
- Trata de hacerlo cuando todos hayan enviado sus cambios de manera que no se
  creen conflictos al `pushear` a una rama.

## Configuración

Para esta guía usaremos 3 paquetes de npm:

- prettier
- husky
- lint-staged

Antes de instalar los paquetes voy a explicar para que sirve cada uno:

Prettier como ya debes saber te permite dar formato al código de forma
automática, se debe instalar mediante `npm` para utilizarlo a través del CLI
(Interfaz de líneas de comando).

Husky es una herramienta que nos permite configurar `git hooks`, lo que nos
permite ejecutar tareas durante la ejecución del algún comando de `git`, para
nuestro caso ocuparemos el `precommit hook`, es decir, ejecutaremos prettier
justo antes de que se ejecute el commit a la rama que se esta trabajando.

Lint staged es otra herramienta que nos permite ejecutar tareas, pero en este
caso, se ejecutan en archivos que se encuentren en la etapa `stage` de git.

Instalación:

```bash
npm install --save-dev prettier husky lint-staged
```

**Pro tip!**: Puedes usar `npm i` en lugar de `npm install`

**Pro tip!**: Puedes usar `-D` en lugar de `--save-dev`

```bash
npm i -D prettier husky lint-staged
```

Una vez completada la instalación se debe crear un archivo `.prettierrc` en la
raíz del proyecto, mi configuración favorita por el momento es la siguiente:

```json
{
  "printWidth": 79,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "jsxBracketSameLine": false,
  "proseWrap": "always"
}
```

En la [documentación](https://prettier.io/docs/en/options.html) puedes encontrar
que significa cada una y configurarla a tu gusto.

Lo siguiente que me gusta hacer es correr prettier en todo el proyecto, para
ello agrego el siguiente comando a la sección de `scripts` del `package.json`:

```json
"scripts": {
  "format": "prettier --write \"**/*.js\""
}
```

Ó

```json
"scripts": {
  "format": "prettier --write \"**/*.+(js|md|css|json)\""
}
```

Ya que prettier soporta otros tipos de archivo aparte de Javascript.

El paso siguiente es tan sencillo como agregar lo siguiente a tu `package.json`:

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

De esta manera al realizar un commit se va a ejecutar `lint-staged`.

Finalmente en el mismo `package.json` agrega:

```json
"lint-staged": {
  "linters": {
    "*.{js,md,css,json}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

Este paso es un poco mas complejo, veámoslo por partes:

1.  Al ejecutar `lint-staged`, va a correr, como mencione anteriormente, en
    todos los archivos que se encuentren en etapa `stage` de git, siempre y
    cuando tengan el formato especificado en el glob (mas adelante explico que
    es un glob).
2.  En el `array` se especifican en orden los pasos que se van a ejecutar sobre
    ese archivo, en este caso va a ejecutar prettier sobre el mismo y luego va a
    añadirlo nuevamente al `stage`. Finalmente, como el comando se ejecuto antes
    del commit, una vez que `lint-staged` termina, se completa el commit.

Esto no deberia afectar tu flujo de git ya que es un proceso totalmente
transparente.

Se que al principio puede parecer que son muchos pasos y pude ser un poco
aterrador, sin embargo, es algo que implemento en la mayoría de mis proyectos y
hasta ahora no he tenido inconvenientes, al contrario, prettier te puede ayudar
a encontrar errores que no hayas notado, te alertará mientras se ejecuta `husky`
y no se completará el commit (lo digo por experiencia) dándote oportunidad de
corregirlo y evitar bugs difíciles de diagnosticar.

## Bonus: globs

Esto: `"**/*.js"` se conoce como glob y nos permite indicar en que directorios y
archivos ejecutar prettier (las barras `\` son para escapar las comillas dobles)

Ejemplo de como construir globs:

```json
{
  // TODOS los archivos .js en el proyecto
  "*.js": ["eslint"],
  // TODOS los archivos .js en el proyecto
  "**/*.js": ["eslint"],
  // TODOS los archivos .js en la raiz de src
  "src/*.js": ["eslint"],
  // TODOS los archivos .js en src
  "src/**/*.js": ["eslint"]
}
```

> Disclaimer: No me hago responsable por los daños causados siguiendo los pasos
> recomendados por esta guía, sin embargo, si sigues bien los pasos todo debería
> salir bien.
