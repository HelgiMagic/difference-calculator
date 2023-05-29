### Hexlet tests and linter status:
[![hexlet-check](https://github.com/HelgiMagic/difference-calculator/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/HelgiMagic/difference-calculator/actions/workflows/hexlet-check.yml)
[![Node CI](https://github.com/HelgiMagic/difference-calculator/actions/workflows/nodejs.yml/badge.svg)](https://github.com/HelgiMagic/difference-calculator/actions/workflows/nodejs.yml)
<a href="https://codeclimate.com/github/HelgiMagic/difference-calculator/maintainability"><img src="https://api.codeclimate.com/v1/badges/97fd75756a39f45a2137/maintainability" /></a>
<a href="https://codeclimate.com/github/HelgiMagic/difference-calculator/test_coverage"><img src="https://api.codeclimate.com/v1/badges/97fd75756a39f45a2137/test_coverage" /></a>

### What is it?

A project that shows the difference between two files. It supports JSON and YAML formats, as well as three different output styles: 'stylish', 'plain', 'json'.

![image](https://user-images.githubusercontent.com/113669521/228578148-bfb6b771-dbd8-416a-ae66-ba49281d3cf4.png)

### How do I start using the project?

1. Install [node.js](https://nodejs.org/). Use the instructions on the website.
2. Copy the repository to your computer using git clone:
```
git clone https://github.com/HelgiMagic/frontend-project-46.git
```
3. To start using this project, copy and paste the following commands into the command line. This commands will install all the necessary modules for the project to work.
```
npm ci
npm link
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
gendiff stylish format:
[![asciicast](https://asciinema.org/a/Uoxk7GHgf8Z0oT1N4CT5UNfDp.svg)](https://asciinema.org/a/Uoxk7GHgf8Z0oT1N4CT5UNfDp)
gendiff plain format:
[![asciicast](https://asciinema.org/a/578100.svg)](https://asciinema.org/a/578100)
gendiff json format:
[![asciicast](https://asciinema.org/a/578099.svg)](https://asciinema.org/a/578099)