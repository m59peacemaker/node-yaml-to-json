# yaml-to-json

> pipe yaml to stdin, get json from stdout, or pass a src directory of yaml files (recursive) and a dest directory for json files.

## install

```sh
$ npm install -g @m59/yaml-to-json
```

## example

```sh
cat my-file.yaml | yaml-to-json > my.file.json
```

### `yaml-to-json $src $dest`

`.yml` and `.yaml` in the `$src` directory and subdirectories (recursive) will be used to write json files. The json files are output with the same directory structure, but starting from `$dest`.

```sh
# process yaml files under current directory
# output json in the same directory as the corresponding yaml
yaml-to-json . .
```

```sh
yaml-to-json src /some/other/place
```
