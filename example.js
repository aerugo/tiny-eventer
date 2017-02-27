'use strict'

var eventer = require('./tiny-eventer');

var Eventer = require('./tiny-eventer').Eventer;

var _eventer = new Eventer();

var counter = 0;
var _counter = -1;

var mainInterval = null;
var secondaryInterval = null;

function listener() {
  ++counter;
  console.log(counter, new Date());

  if (counter === 10) {
    eventer.off('tick', listener, 'test');
  }
}

/**
 * Other listener on separate Eventer instance
 */
function _listener() {
  ++_counter;
  console.log('_', _counter, new Date());

  if (_counter === 12) {
    _eventer.off('tick', _listener, 'test');
    clearInterval(secondaryInterval);
  }
}

function finalListener() {
  console.log('Final event happened, clearing all events on eventer, _eventer events will continue being triggered though.');
  eventer.clearAll();

  clearInterval(mainInterval);
}

eventer.on('tick', listener, 'test');
_eventer.on('tick', _listener, 'test');
eventer.once('final', finalListener, 'test');

mainInterval = setInterval(function() {
  eventer.trigger('tick');
}, 1000);

secondaryInterval = setInterval(function() {
  _eventer.trigger('tick');
}, 800);

setTimeout(function () {
  eventer.trigger('final');
}, 5000);
