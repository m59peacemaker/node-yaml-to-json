#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const replaceExt = require('replace-ext')
const glob = require('globby')
const yaml = require('js-yaml')

const [ src, dest ] = process.argv.slice(2)

const yamlToJson = yamlString => JSON.stringify(yaml.safeLoad(yamlString), null, 2)

if (src) {
  if (!dest) {
    throw new Error('destination directory is a required argument')
  }

  glob('**/*.{yml,yaml}', { cwd: src })
    .then(files => Promise.all(
      files.map(file => fs
        .readFile(path.join(src, file), 'utf8')
        .then(contents => fs.outputFile(
          path.join(dest, replaceExt(file, '.json')),
          yamlToJson(contents)
        ))
      )
    ))
} else {
  let contents = ''
  process.stdin.on('data', buffer => contents += buffer.toString())
  process.stdin.on('end', () => process.stdout.write(yamlToJson(contents)))
}
