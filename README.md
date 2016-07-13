*jsdroid*

Code evaluation bot for IRC.

* Code is run in a Docker container to hinder tampering
* When relevant, console logs and return values are returned separately
* Output is sanitized and long results are pasted and linked
* Currently supports JavaScript

**Docker images**
To learn about Docker, visit [https://docs.docker.com/](https://docs.docker.com/).

***JavaScript***
JavaScript is evaluated using Node middleware that [sandboxes](https://github.com/patriksimek/vm2) the code to limit available methods. The middleware also summarizes the result to include e.g. the type of the return value. It makes available popular libraries like [lodash](https://lodash.com/), [Moment.js](http://momentjs.com/) and [Math.js](http://mathjs.org/). The Dockerfile and middleware is installed as a dependency and can be found in `node_modules/jsdroid-node/`, where it can be built with Docker as follows:

`docker build -t jsdroid-node .`

The middleware can be modified before building the image to remove default libraries or install and include new ones. This does not require jsdroid to be restarted; the bot will immediately start using the new image. To remove the old image first and prevent a graveyard of unused images, run `docker rmi -f jsdroid-node` before building.
