# grunt-styleguide

Generate a styleguide using [grunt-dss](https://github.com/darcyclarke/grunt-dss) and [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass/)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-styleguide --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-styleguide');
```

## The "styleguide" task

### Overview
In your project's Gruntfile, add a section named `styleguide` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  styleguide: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.taskTarget
Type: `String`
Default value: `styledocs`

Name for the target value of the new tasks. Use if you have conflicting compass or dss target already in your Gruntfile;

#### options.compass
Type: `Object`
Default value: `{config: 'config.rb',}`

Object that will be used to configure the [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass) task for compiling the SASS files for the [grunt-dss template](https://github.com/darcyclarke/grunt-dss#optionstemplate). 

[Explation of grunt-contrib-compass options](https://github.com/gruntjs/grunt-contrib-compass?source=c#options)

#### options.compassSourceTarget
Type: `Boolean`
Default value: `false`

By default the Compass `css_dir` and `sass_dir` will be set relative to the `dssTemplate` value, as `[dssTemplate]assets/source` and  `[dssTemplate]assets/css`. Set this to `true` to repect the `options.compass.cssDir` and `options.compass.sassDir` settings instead.

#### options.dssTemplate _Required_
Type: `String`
Default value: `dssTemplate/`

Path to the template you want to use with [grunt-dss](https://github.com/darcyclarke/grunt-dss) to document.

#### options.dssTarget _Required_
Type: `String`
Default value: `styledocs/`

Folder where [grunt-dss](https://github.com/darcyclarke/grunt-dss) outputs.

#### options.dssFiles _Required_
Type: `Array`
Default value: `[]`

Files array of the css files you want [grunt-dss](https://github.com/darcyclarke/grunt-dss) to document.

#### options.dssParsers
Type: `Object`
Default value: `{}`

Custom [DSS](https://github.com/darcyclarke/DSS) parsers. This task already has a few.

### Usage Examples

#### Default Options
Requrired Config

```js
grunt.initConfig({
  styleguide: {
    dev: {
      dssTemplate: 'source/dssTemplate/',
      dssTarget: 'docs/dssDocs/',
      dssFiles: ['test/fixtures/*.{css,scss,sass,less,styl}'],
    },
  },
})
```

#### Custom Options

```js
grunt.initConfig({
  styleguide: {
    options: {
      taskTarget: 'dssDocs',
      dssTemplate: 'source/dssTemplate/',
      dssTarget: 'docs/dssDocs/',
      dssFiles: ['test/fixtures/*.{css,scss,sass,less,styl}'],
    },
    dev: {},
    dist: {
      options: {
        compass: {
          config: 'config.rb'
          outputStyle: 'compact',
          noLineComments: true,
          force: true,
        },
      },
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
