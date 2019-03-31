---
slug: git-pro-tips
title: Git Pro Tips
date: 2018-11-12T06:23:40.509Z
author: Gustavo Ordaz
description:
  Git es una de las herramientas más importantes en el día a día de un
  desarrollador.
banner: ./images/banner.png
keyword:
  - git
---

Git es una de las herramientas más importantes en el día a día de un
desarrollador. Esta, te permite ser organizado y estructurado a la hora de
iniciar un proyecto o desarrollar nuevos _features_ para tu aplicación, así como
también detectar en que punto se introdujo algún bug en el código.

A pesar de ser una herramienta tan util y con un sin fin de capacidades y
utilidades, tiene una pequeña curva de aprendizaje que dificulta su uso cuando
estas empezando a trabajar con ella.

Por eso me anime a escribir este post con algunos tips 🔥 que he ido aprendiendo
y que me parece, vale la pena compartir.

## git stash 💾

Este comando te permite "guardar" el estado actual de los cambios que hayas
realizado a una rama en caso de que necesites cambiar de rama temporalmente sin
perder dichos cambios.

Es muy util cuando estas trabajando en un _feature_ y surge alguna eventualidad
como un _bug_ y no quieres hacer _commit_ de tus cambios.

Su uso es muy sencillo:

```bash
$ git stash
```

Para ver que elementos hay en el stash puedes usar:

```bash
$ git stash list
stash@{0}: WIP on master: c8a1ae6 fix: footer media query
```

El numero dentro de las llaves representa el **id** de ese stash, seguido por la
rama y finalmente el hash y mensaje del commit en el que se le realizo el stash.

También puedes hacer un stash con un mensaje:

```bash
$ git stash save "save stash message"
$ git stash list
stash@{0}: On master: save stash message
```

Para sacar tus cambios del stash puedes usar el comando:

```bash
$ git stash pop
```

Sin embargo, si tienes multiples cambios almacenados en stash puede que solo
quieras sacar uno de ellos, para esto se debe usar el indice del stash que se
quiere sacar:

```bash
$ git stash pop stash@{1}
```

Si tienes problemas con este comando, puedes intentar _escapando_ las llaves:

```bash
$ git stash pop stash@\{1\}
```

Este es un comando super util de git el cual uso frecuentemente. Si quieres ver
que mas puedes hacer con el mismo te recomiendo leer la
[documentación](https://git-scm.com/docs/git-stash) oficial y
[este](https://medium.freecodecamp.org/useful-tricks-you-might-not-know-about-git-stash-e8a9490f0a1a)
articulo de freeCodeCamp en medium con muchos ejemplos.

## git push 🏋🏾‍♀️

Como sabras, este comando te permite enviar los cambios de tu repositorio local
a un repositorio remoto, ya sea en GitHub, GitLab, Bitbucket o el de tu
preferencia.

Su uso es el siguiente:

```bash
$ git push origin master
```

Pero seguro eso lo sabes, el **pro tip** que te quiero dar para este comando es
configurar el upstream de la rama (a que rama apunta en el origen remoto) para
reducir el comando a solo dos palabras:

```bash
$ git push --set-upstream origin master
```

O la version corta

```bash
$ git push -u origin master
```

De esta manera, cada vez que hagas un push a esta rama, solo debes hacer:

```bash
$ git push
```

Y listo! Sencillo pero muy conveniente.

## git commit 🧘🏽‍♀️

Este es uno sencillo pero que también te ayuda a ahorrar un par de comandos:

```bash
$ git commit -am "Commit message"
```

El flag `-am` esta haciendo dos cosas:

1. `a` agrega al stage los cambios
2. `m` te permite modificar el mensaje del commit

**Nota:** esta abreviatura no te permite agregar los archivos nuevos conocidos
como **_untracked_** al _stage_, para eso debes hacer un `git add path/to/file/`
de manera explicita.

## git checkout 🗑

El ultimo, pero no menos importante, de este post. Este comando tiene una gran
variedad de usos, desde cambiar de ramas hasta crear nuevas y cambiar a las
mismas en un solo comando. Pero, el que quiero mostrar a continuacion, es muy
util pero menos conocido:

```bash
$ git checkout -- path/to/file/
```

De esta manera se pueden descartar los cambios de un archivo en especifico, para
descartar **todos** los cambios realizados puedes hacerlo de esta manera:

```bash
$ git checkout -- .
```

Espero que estos tips te sean útiles, yo los uso casi a diario, ya que, me
permiten ser mas productivo en mi trabajo 🔥.
