# React Timer 

Just playing around with React during a react class I took. Built off a larger React/Grunt boilerplate that includes ALL THE THINGS

### Requirements
* [Node.js](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/)
* [Sass Gem](http://sass-lang.com/install)
* Grunt

## Installation

1. Install Grunt's command line interface (CLI) globally. `npm install -g grunt-cli`

1. Run `npm install` to install the required dependencies.

## Running Grunt Or The Server
There are three basic commands that will start grunt. You may want to use the connect server if you have static HTML only. If you have some PHP in your project (header partials, etc.) then you can just use the grunt command without the server. The `dev` command is just an alias for `serve`.

* Running `grunt` will concatenate your scripts, compile your Sass, and watch for changes.

* Running `grunt serve` or `grunt dev` will concatenate your scripts, compile your Sass, **start a server on port 8000 [http://localhost:8000/](http://localhost:8000/)**, and watch for changes.

* Running `grunt uglify` will take your concatenated JavaScript and compress it as a new file with the `.min.js` extension, then exit.


## The Project Includes

* .gitignore
* .editorconfig
* Bootstrap 3
* Glyphicons (Bootstrap 3)
* Fontello (sample icons)
* jQuery
* Sass
* Babel (`.jsx` or `.es6`) (optional)
* Uglify For JS (optional)
* Modernizer.js
* Respond.js (IE 8)
* html5shiv.js (IE 8)
* browsersync
