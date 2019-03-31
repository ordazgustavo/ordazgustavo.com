---
slug: como-contribuir-a-open-source
title: Cómo contribuir a open source
date: 2018-10-17T04:20:30.915Z
author: Gustavo Ordaz
description:
  Contribuir a OSS (Open Source) es algo que muchos queremos hacer pero no
  sabemos como
banner: ./images/banner.png
keywords:
  - oss
---

Contribuir a OSS (Open Source) es algo que muchos queremos hacer pero no sabemos
como, parece muy complicado e incluso es un poco aterrador que otras personas
vean y evalúen tu trabajo. Sin embargo, esto no es del todo cierto, la comunidad
de open source es muy abierta (¡pun intended!) a apoyar a los más novatos según
mi experiencia.

## ¿Por qué contribuir?

De mi perspectiva, apoyar proyectos de este tipo es una forma de agradecer a las
personas que dedican su tiempo a desarrollar estas librerías que todos amamos y
usamos. Por otra parte, te creas una reputación en internet, haciéndote notar.

## ¿Qué contribuir?

Existe la creencia de que lo único que se valora son los aportes de código, nada
más alejado de la realidad. Mientras los proyectos van creciendo surgen otras
necesidades como traducción de documentación, diseño, ejemplos del uso del API,
tests, tutoriales, etc.

## ¿Cómo contribuir?

Generalmente cada proyecto tiene una guía de cómo descargar el proyecto y
ejecutarlo, normalmente esta guía se encuentra en el README.md o en el
CONTRIBUTING.md. En lineas generales los pasos básicos son los siguientes:

1.  Hacer un _fork_ del repositorio. Para ello debes presionar el botón con el
    icono que representa una bifurcación en la esquina superior derecha de la
    pantalla.

    Esto creará una copia del repositorio en tu en tu perfil de GitHub.

2.  A continuación debes clonar el repositorio en tu computadora, para ello
    debes usar el siguente comando.

    **SSH**

    ```shell
    $ git clone git@github.com:ordazgustavo/all-contributors.git
    ```

    **Ó HTTPS**

    ```shell
    $ git clone https://github.com/ordazgustavo/all-contributors.git
    ```

    > **Pro tip:** Te recomiendo
    > [setear una llave SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)
    > para GitHub

3.  Ahora que tienes el proyecto en tu local es importante que configures el
    repositorio `upstream`, esto permitirá que tu repo local se mantenga
    sincronizada con la repo original del publicante, para ello debes hacer lo
    siguiente:

    ```shell
    # Ingresa a la carpeta del repositorio
    $ cd all-contributors

    # configura el upstream
    $ git remote add upstream https://github.com/kentcdodds/all-contributors.git
    ```

    > En este caso, como no tienes acceso SSH al proyecto, debes usar el HTTPS

    Para verificar que todo esta bien puedes utilizar el sigiente comando:

    ```shell
    $ git remote -v
    ```

    Deberias ver algo como lo sigiente:

    ```shell
    origin    https://github.com/ordazgustavo/all-contributors.git (fetch)
    origin    https://github.com/ordazgustavo/all-contributors.git (push)
    upstream    https://github.com/kentcdodds/all-contributors.git (fetch)
    upstream    https://github.com/kentcdodds/all-contributors.git (push)
    ```

4.  Ahora que tienes todo configurado puedes empezar a trabajar en el código,
    para ello debes crear una rama o _branch_ con un nombre descriptivo.

    Si el proyecto no provee una guía de convención en este sentido puedes
    consultar directamente en el issue o usar una convention común como
    `fix/descripcion-corta-del-fix`, también puedes usar otros prefijos como
    `feat/` para un _feature_ o `translate/` para una traducción.

    Recuerda que nunca debes trabajar directamente en la rama `master` debido a
    que mientras trabajas en tu pull request otras personas pueden haber enviado
    otros PR, lo que causara conflictos al realizar el merge

    ```shell
    $ git checkout -b fix/descripcion-corta-del-fix
    ```

5.  Una vez que termines de trabajar en el issue puedes hacer _commit_ de tus
    cambios, para ello primero debes agregar únicamente los archivos que
    modificaste al _stage_:

    ```shell
    $ git add ruta/a/mi/archivo/modificado.ext
    ```

    Ó

    ```shell
    $ git add .
    ```

    Si quieres agregar todos los archivos modificados.

    Ahora puedes realizar el _commit_:

    ```shell
    $ git commit -m "fix: mensaje de commit corto"
    ```

    En caso de que quieras modificar el mensaje del commit puedes utilizar el
    comando:

    ```shell
    $ git commit --ammend
    ```

    Esto abrirá el editor por defecto de tu OS como `nano` o `vi` donde podrás
    editar el mensaje.

6.  Enviando los cambios a tu repositorio en GitHub

    ```shell
    $ git push origin fix/descripcion-corta-del-fix
    ```

7.  Una vez enviados los cambios puedes realizar el pull request. Para ello,
    debes ir a tu _fork_ del repo en GitHub, podrás ver un botón con el texto
    _Compare & pull request_ que te permitirá hacer el PR.

8.  Se te presentara con una vista donde tendrás que indicar la rama del
    repositorio original a la que quieres enviar tus cambios, por lo general es
    la rama `master` pero siempre recuerda consultar la documentación antes de
    realizar la solicitud.

    Es común que algunos proyectos te pidan un poco de información cuando
    realizas el PR, por ejemplo, marcar unas casillas donde indicas que seguiste
    los pasos recomendados, de esta manera te tomaran en serio y se darán la
    tarea de revisar tu solicitud.

    ¡¡Felicitaciones!! 🎉 has realizado tu primer pull request y potencial
    aporte a la comunidad.

    Recuerda que no esta en tu control que los cambios lleguen a producción pero
    si todo esta bien y los tests pasan, es muy probable que lo haga.

## Recursos que te pueden ayudar

- [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
  una serie de videos prácticos donde aprenderás todo lo que acabas de leer de
  forma practica con un proyecto _sandbox_ dedicado para ello. (Inglés)
- [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)
  documentación de la convención usada por gran cantidad de proyectos OSS
