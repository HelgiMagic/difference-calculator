### Hexlet tests and linter status:
[![Actions Status](https://github.com/HelgiMagic/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/HelgiMagic/frontend-project-46/actions)
[![Node CI](https://github.com/HelgiMagic/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/HelgiMagic/frontend-project-46/actions/workflows/nodejs.yml)
<a href="https://codeclimate.com/github/HelgiMagic/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/b149de33acd442d4fb8c/maintainability" /></a>
<a href="https://codeclimate.com/github/HelgiMagic/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b149de33acd442d4fb8c/test_coverage" /></a>

### What is it?

A project that shows the difference between two files. It supports JSON and YAML formats, as well as three different output styles: 'stylish', 'plain', 'json'.

![image](https://user-images.githubusercontent.com/113669521/228578148-bfb6b771-dbd8-416a-ae66-ba49281d3cf4.png)

### How do I start using the project?

1. Install [node.js](https://nodejs.org/). Use the instructions on the website.
2. Copy the repository to your computer using git clone:
```
git clone https://github.com/HelgiMagic/frontend-project-46.git
```
3. To start using this project, type the npm install @hexlet/code. This command will install all the necessary modules for the project to work.
```
npm install @hexlet/code
```

### What is available to me in this project?

Three output formats: 'stylish', 'plain', 'json'. To use them, use the -f flag (--format).(if you do not use the flag, the default format will be stylish)
```
gendiff -f stylish file1.json file2.json
```
Finding the difference between JSON and YAML(YML too). It doesn't matter if both files are JSON or YAML, you can mix them however you want:
```
gendiff -f plain file1.yml file2.json
```
To get general information about the commands, write:
```
gendiff -h
```

### Examples of usage
gendiff example:
[![asciicast](https://asciinema.org/a/Zk1NKCizw8vlf4QZRglZZg0UM.svg)](https://asciinema.org/a/Zk1NKCizw8vlf4QZRglZZg0UM)
gendiff yaml example:
[![asciicast](https://asciinema.org/a/JIJZNSwhCntKFg6PYcxjIAQcQ.svg)](https://asciinema.org/a/JIJZNSwhCntKFg6PYcxjIAQcQ)
gendiff recursive example:
[![asciicast](https://asciinema.org/a/WvCuA7nbDV9FzlNbM3THvbpNv.svg)](https://asciinema.org/a/WvCuA7nbDV9FzlNbM3THvbpNv)
gendiff plain format:
[![asciicast](https://asciinema.org/a/vnInIqtHygbRuk1kpM2nscFVu.svg)](https://asciinema.org/a/vnInIqtHygbRuk1kpM2nscFVu)
gendiff json format:
[![asciicast](https://asciinema.org/a/FF3q0QbUnaXhWqdZE7DbZvPiw.svg)](https://asciinema.org/a/FF3q0QbUnaXhWqdZE7DbZvPiw)