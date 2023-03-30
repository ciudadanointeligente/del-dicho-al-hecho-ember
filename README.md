# Ddah-ember

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Se sube a un GitHub Pages relindo y se hace así:

```npm run deploy```

y luego debemos hacer algo así como esto:

```git push origin gh-pages```

Y estamos

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


## Subir un nuevo gobierno

* En el archivo environment.js agregar otro *government*
* Para agregar un nuevo estudio, debe incluirse en el atributo *studies*
* El estudio que se quiera destacar en el home debe tener el atributo `in_landing: true`

## Para el desarrollo local se recomienda

* Instalar un manejador de versiones de node, algo como nvm. Con nvm use stable corre prefecto
* Es importante para hacer pruebas y levantar el local recordar que se debe estar en la rama master, volver siempre a esta luego de hacer deploy a gh-pages
