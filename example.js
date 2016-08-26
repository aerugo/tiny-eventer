'use strict'

var eventer = require('./tiny-eventer');

var counter = 0;

function listener() {
  ++counter;
  console.log(counter, new Date());

  if (counter === 10) {
    eventer.off('tick', listener);
  }
}

eventer.on('tick', listener);

setInterval(function() {
  eventer.trigger('tick');
}, 1000);
