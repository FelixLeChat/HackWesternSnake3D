# node-js Heroku Server

A barebones Node.js app using [Express 4](http://expressjs.com/).
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Node.js app act as a voting server that gather all votes and broadcast the result each 5 sec.

run locally
```sh
$ git clone git@github.com:heroku/HackWestern-Snake3D.git # or clone your own fork
$ cd HackWestern-Snake3D
$ npm install
$ npm start
```

## Running Locally on the raspberry Pi

in Client folder

Western_play_snake.js
Local server that register to the Heroku server and receive the vote each 5 sec. It will update the LED cube when the snake moves.

Snake.js
Local server that register to the Myo output and mode the snake in the 3D LED cube.

You need to run after:
  myo_connector.py // watch the myo output
  test_myo.py // connect and start streaming on local port
