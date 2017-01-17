var gulp = require('gulp');
var rollup = require('rollup').rollup;
var nodeResolve = require('rollup-plugin-node-resolve');
var typescript = require('rollup-plugin-typescript');

gulp.task('default', ['bundle']);

gulp.task('bundle', function () {
  return rollup({
    entry: './src/index.ts',
    plugins: [
      typescript(),
      nodeResolve({ jsnext: true })
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: './www/scripts/index.js'
    });
  });
});

