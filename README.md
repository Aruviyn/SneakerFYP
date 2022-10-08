FYP For sneaker classification using tensorflow. Dataset can be obtained [Here](https://www.kaggle.com/datasets/sebastiaanjohn/sneakers)

# Gradle implementation

The build and management of this project is done through Gradle. Gradle is an open-source build automation tool that is designed to be flexible enough to build almost any type of software.

## Gradle installation

The project provided you with gradle wrapper. Find file with name `gradlew` when using mac or linux, or in windows `gradlew.bat`.

Executing the file (in terminal or command prompt) will install gradle into your machine through the wrapper. The only requirement you need is JAVA_HOME set up in your environment variable. Once you're set, you may invoke gradle wrapper with `./gradlew` (or `gradlew.bat` in windows) command.

If you plan to install gradle natively in your machine, I would advise to install the latest version, or look for gradle-6.7.1. To invoke gradle installed, use `gradle` instead of the wrapper one.

## Build and run the application using gradle

Inspect all available tasks defined with build.gradle with `./gradlew tasks`.

Each of the gradle tasks available will be listed up with description.

Execute any relevant task by the command `./gradlew <task>`. For example `./gradlew start`
Similarly in Windows machine, run `gradlew.bat <task>`. For example `gradlew.bat start`

### Building node program.

To make it convenient to run node program, running any node related tasks will install node (version 16.15.1 at the time of writing).

To compile and run the node program, execute command `./gradlew start`. Below is the sample output when running the gradle task:

```
# ./gradlew start

> Task :npmInstall

up to date, audited 267 packages in 970ms

21 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> Task :start

> fyp@1.0.0 start
> node app.js

Example app listening on port 3000

============================
Hi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.
============================
MobileNet v3 loaded successfully!
[ 1, 1024 ]
<=========----> 75% EXECUTING [43s]
> :start              
```

You may then browse to http://localhost:3000

### Stopping the node program

To stop the node program, press control+c on the terminal. Such input will kill the node program.
