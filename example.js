'use strict'

var eventer = require('./tiny-eventer');

var Eventer = require('./tiny-eventer').Eventer;

var _eventer = new Eventer();

var counter = 0;
var _counter = -1;

function listener() {
  ++counter;
  console.log(counter, new Date());

  if (counter === 10) {
    eventer.off('tick', listener, 'test');
  }
}

/**
 * Other listener on separate
 */
function _listener() {
  ++_counter;
  console.log('_', _counter, new Date());

  if (_counter === 12) {
    _eventer.off('tick', _listener, 'test');
  }
}

eventer.on('tick', listener, 'test');
_eventer.on('tick', _listener, 'test');

setInterval(function() {
  eventer.trigger('tick');
}, 1000);

setInterval(function() {
  _eventer.trigger('tick');
}, 800);
