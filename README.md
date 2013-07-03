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

#### options.compass
Type: `Object`
Default value: `{}`

Object that will be used to configure the [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass) task for compiling the sass the styleDocs. [Explation of grunt-contrib-compass options](https://github.com/gruntjs/grunt-contrib-compass?source=c#options)

#### options.dss
Type: `Object`
Default value: `{ options:{}, files:{} }`

Object that will be used to configure the [grunt-dss](https://github.com/darcyclarke/grunt-dss) task for compiling the stylesheet docs. [Explation of grunt-dss settings](https://github.com/darcyclarke/grunt-dss#settings)

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  styleguide: {
    options: {
      compass:{
        config:  'test/config.rb',
        sassDir: 'test/fixtures/template/assets/source',
        cssDir:  'test/fixtures/template/assets/css' 
      },
      dss: {
        options: {
          template: 'test/fixtures/template/'
        } 
      }
    },
    dev: {},
    dist: {
      options: {
        compass: {
          outputStyle:'compact',
          noLineComments:true,
          force:true
        },
        dss: {
          files: {
            'tmp3/':['test/fixtures/*.{css,scss,sass,less,styl}']
          }
        }
      }
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
