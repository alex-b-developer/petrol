# Foxy Themes - Workflow

This is our magic super awesome workflow that will allow you to boost your next project up to the space!
## Current Version: 0.0.1

## Installation
This repository requires NodeJs, Grunt and Bower to work properly.

These three components need to be installed just once, if you already have them you can skip the next 3 steps:

1. [Install NodeJs](https://nodejs.org/) 
2. [Install Grunt](http://gruntjs.com/)
3. [Install Bower](http://bower.io/)

4. Install node dependencies with `npm install` command
5. Install project dependencies (explained in next point)

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

## Installing Dependencies
To install dependencies run this command: `grunt install` this command will install all dependencies automatically via bower and then they will be moved to `assets/lib` based on `grunt-config/dependencies.json` file.

Dependencies will be copied to `assets/lib/` by default

### Setup project dependencies
To set the project dependencies please add them to bower.json file with their respective version, you will find more information about bower.json in [official bower docs](http://bower.io/docs/creating-packages/#bowerjson).

The previous process can be done automatically by installing bower dependencies with `--save` flag for example: `bower install package-name --save` Bower will automatically add the dependency to bower.json file.

### Move Bower dependencies to assets/lib
As you may not want to include all the original files from every package, you can define which files you want to move to your `assets/lib` directory in `grunt-config/dependencies.json` like this:
```
"package-name": {
    "files":{
      "folder-dest/folder1" : "package-name/folder-src-1",
      "folder-dest/folder1" : "package-name/folder-src-2"
    }
  }
```

If you want to check original package files from all your dependendicies before they are moved to `assets/lib` folder you can run `bower install` command, this will create a new `dependencies` folder in the project's root path. Don't worry about this folder because once you run `grunt install` again this folder will be deleted automatically.

More info about bowercopy config [here](https://www.npmjs.com/package/grunt-bowercopy#usage-examples)

## Generate a distribution
To generate a new distribution just run `grunt dist` command, this will create the `dist` folder in project's root path.

## Create a release
In order to create a new release run `grunt release` and the console will ask you some questions like:

- What version number you want to increase
- If you want to generate a compressed zip dist version 

NOTE: This command runs `grunt dist` internally.

## Run development Jade Server
To check your changes in real time, run `grunt` default task, this will start two simultaneously tasks: jade server and less watch.

You can see your changes open this URL in your browser: `http://localhost:8080/jade-file.jade` this point to `src/html/` folder.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
Copyright Foxy Themes