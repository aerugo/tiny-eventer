// Type definition for tiny-eventer v0.0.2
// Project: htps://github.com/kristofferostlund/tiny-eventer
// Definitions by: Kristoffer Östund <https://gihub.com/kristofferostlund/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'tiny-eventer' {

    interface TinyEventItem { listener: (...args) => void, _this?: any; }

    interface IDictionary<T> {
        [index: string]: T;
    }
    /**
     * Creates a new instance of the Eventer class, which is completely sandboxed from any other, or the global, events.
     */

    class Eventer {

        /**
         * Container of all the events and their event items.
         */
        $events: IDictionary<TinyEventItem[]>;

        /**
         * Subscribes to events on `eventName`.
         *
         * When an event is triggered, `listener` is called with any params passed into `trigger`.
         *
         * For identification, `_this` can be passed in to allow for grouped unsubsribes or when `listener` is anonymous.
         *
         * Returns the created TinyEventItem.
         *
         * @param {String} eventName Name of the event to listen for
         * @param {Function} listener The function to be called. Defaults to _.noop
         * @param {Any} _this Optional other identification to use for when the listener could be anonymous
         * @return {TinyEventItem}
         */
        on(eventName: String, listener: (...args) => void, _this?: any): TinyEventItem;

        /**
         * Unsubscribes to events on `eventName` and removes all TinyEventItems where `listener` or `_this` matches their equivalent in the TinyEventItem.
         *
         * `_this` can be passed in to allow for grouped unsubsribes or when `listener` is anonymous.
         *
         * @param {String} eventName Name of the event to stop listening for
         * @param {Function} _listener The function to be called.
         * @param {Any} _this Other identification to use for when the listener could be anonymous
         */
        off(eventName: String, listener: (...args) => void, _this?: any): void;

        /**
         * Unsubscribes all listeners on `eventName`
         *
         * @param {String} eventName Name of the event to remove all listeners for
         */
        clear(eventName: String): void;

        /**
         * Triggers an event with the passed in parameters, if any.
         *
         * @param {String} eventName Name of the event to trigger
         * @param {Any} params Splat array of all params other than *eventName*, will be used when calling listeners
         */
        trigger(eventName: string, ...params): void;

        Eventer: new Eventer;
    }

    export = new Eventer;
}
