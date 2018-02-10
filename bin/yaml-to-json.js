#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const replaceExt = require('replace-ext')
const glob = require('globby')
const yaml = require('js-yaml')

const [ src, dest ] = process.argv.slice(2)

const yamlToJson = yamlString => JSON.stringify(yaml.safeLoad(yamlString), null, 2)

if (process.stdin.isTTY) {
  glob(path.join(src, '/**/*.{yml,yaml}'))
    .then(files => Promise.all(
      files.map(file => fs
        .readFile(file, 'utf8')
        .then(contents => fs.outputFile(
          path.join(dest, replaceExt(file, '.json')),
          yamlToJson(contents)
        ))
      )
    ))
} else {
  if (src || dest) {
    throw new Error('"src" and "dest" options are not supported when piping to stdin')
  }

  let contents = ''
  process.stdin.on('data', buffer => contents += buffer.toString())
  process.stdin.on('end', () => process.stdout.write(yamlToJson(contents)))
}
