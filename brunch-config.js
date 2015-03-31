'use strict';

var es6Experiments = [
  'raymarch-physic',
  'substrate'
];

exports.config = {
  paths: {
    watched: [
      'app',
      'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill.js'
    ]
  },
  conventions: {
    assets: function (path) {
      return /^app/.test(path) && !/scripts|styles/.test(path);
    }
  },
  files: {
    javascripts: {
      joinTo: Object.defineProperties({
        'scripts/vendor.js': [
          'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill.js',
          /^bower_components/
        ],
        'scripts/main.js': /^app[\\/]scripts/
      },
      (function() {
        var obj = {};
        for (var i = 0; i < es6Experiments.length; i++) {
          var experimentName = es6Experiments[i];
          obj['experiments/' + experimentName + '/scripts/main.js'] = {
            value:'app/experiments/' + experimentName + '/scripts/**/*.js',
            enumerable: true
          };
        }
        return obj;
      })()
      ),
      order: {
        before: ['bower_components/threejs/build/three.js']
      }
    },
    stylesheets: {
      joinTo: 'styles/main.css'
    }
  },
  onCompile: function() {
    require('fs').appendFile('public/scripts/vendor.js', '\n\nrequire(\'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill\');');
    require('fs').appendFile('public/scripts/main.js', '\n\nrequire(\'scripts/main\');');
    for (var i = 0; i < es6Experiments.length; i++) {
      var experimentName = es6Experiments[i];
      require('fs').appendFile('public/experiments/' + experimentName + '/scripts/main.js', '\n\nrequire(\'experiments/' + experimentName + '/scripts/main\');');
    }
  }
};
