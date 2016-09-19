# tiny-eventer

Tiny and simple event module with no third party dependencies.

## Usage

### Installation

Using npm:

```bash
npm install tiny-eventer [--save]
```

In Node.js:

```javascript
'use strict'

// Load a global instance
var eventer = require('tiny-eventer');

// Or load the Eventer class to use a new instance of it.
var Eventer = require('tiny-eventer').Eventer;
```

### API

#### `eventer.on(eventName, listener, [thisArg])`

Subscribes to events on `eventName`.

`eventName (String)` Name of the event to listen for

`listener (Function)` The function to be called. Any params passed into `trigger(eventName, [...params])` will be passed in.

`[thisArg (Any)]` A reference to `this` (or an ID of sorts) which can be used for unsubscribing to events when `listener` is an anonymous function. This can be used to group event listeners, as string or number could be passed in.

**Example**

```javascript
/** ... */

// Passing in a named function and skipping *thisArg*
eventer.on('user_added', onAddedUser);

function onAddedUser(user) {
  console.log('user_added event!');
}

// Passing in an anonymous function with a string ID as *thisArg*.
eventer.on('other_user_added', function (user) { console.log('other_user_added event!') }, 'some.id');

/** ... */
```

#### `eventer.off(eventName, listener, [thisArg])`

Unsubscribes to events on `eventName`.

`eventName (String)` Name of the event to stop listening for

`[listener (Function)]` The function which would've been called. Either this `thisArg` can be used to match an event listener.

`[thisArg (Any)]` A possible other identification if `listener` is an anonymous function, or if a group of events should be unsubscribed with a single call.

**Example**

```javascript
/** ... */

// Unsubscribe by passing in a named function and skipping *thisArg*
eventer.off('user_added', onAddedUser);

function onAddedUser(user) { /** ... */ }

// Unsubscribe by passing in a string ID as *thisArg* and leaving *listener* empty
eventer.off('other_user_added', undefined, 'some.id');

/** ... */
```

#### `eventer.trigger(eventName, [...params])`

Triggers an event with the passed in parameters, if any.

`eventName (String)` Name of the event to trigger

`[...params (Any)]` Parameters to be passed into callbacks

```javascript
/** ... */

var newUser = {
  id: 42,
  name: 'Arthur Dent',
  occupation: 'Hapless Englishman'
};

var otherUser = {
  id: 49,
  name: 'Ford Prefect',
  occupation: 'Writer'
};

// Triggers an event with no parameters passed into it.
eventer.trigger('look_no_params_ma');

// Trigger event with a single parameter passed in (other than eventName, obviously).
eventer.trigger('user_added', newUser);

// Trigger event with multiple parameters passed in. Any number of parameters can be passed in.
eventer.trigger('users_added', newUser, otherUser);

/** ... */
```

#### `new eventer.Eventer()`

Creates a new Eventer instance useful for creating sandboxed events.

```javascript
/** ... */

var _eventer = new eventer.Eventer();

_eventer === eventer;

/** ... */
```

