# react-aria-live

**Please Note**: As of version 2.0.0 this package no longer supports the old pre React 16.3 context API. If you are still using an older version of React, please use the latest 1.x release of react-aria-live.

With this package you can broadcast `aria-live` messages to assistive technology from anywhere in your React applications.

[ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) are used to communicate important information to `screen reader software`.

In web applications we make a lot of changes to our pages using JavaScript. These changes can be completely undetected by screen readers, meaning that not all our users are being notified of important changes to our applications.

A very common example in web applications, is the use of routing software. We need to tell screen readers that a new route has been loaded, as this is usually not automatically detected.

Other examples are error situations, or content and state changes in our application that could be very clear visually but not detected by screen readers.

Using `react-aria-live` you can broadcast these important messages easily from any component in your application.

The technical double announcer region implementation of `react-aria-live` was inspired by [ngA11y](https://github.com/dequelabs/ngA11y).

## Installation

```
npm install react-aria-live
```

or

```
yarn add react-aria-live
```

## Usage

The library exports three components, namely `LiveAnnouncer`, `LiveMessage` and `LiveMessenger`.

Firstly, wrap your React application in the `LiveAnnouncer` component. It will render a visually hidden message area in your application that can broadcast `aria-live` messages. `LiveAnnouncer` is best placed as high up as possible in your component tree, as `ARIA Live Regions` are sensitive to changes to the HTML rendering these regions. Best results are obtained when the HTML is rendered only once when the application root component is mounted.

**Please note**: `react-aria-live` only broadcasts a message if the string value changes from the previous broadcast. This is done to keep verbosity down and avoid accidental duplication. If you want to rebroadcast the same message, please clear the live region with an empty string value first. The `LiveMessage` component accepts an optional `clearOnUnmount` prop to assist with this when unmounting the component. You can also mitigate this by passing a new id to the functions from `LiveMessenger`. More about this in the section below. 

### LiveMessage
If rendered inside a `LiveAnnouncer`, you can use the `LiveMessage` component to send `polite` or `assertive` messages. Messages are only triggered when the bound `message` prop changes.

```
import React, { Component } from 'react';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';

class MyApp extends Component {
  state = {
    a11yMessage: '',
  };

  render() {
    return (
      <LiveAnnouncer>
        <LiveMessage message={this.state.a11yMessage} aria-live="polite" />
        <button
          onClick={() => {
            this.setState({ a11yMessage: 'Button Pressed' });
          }}>
          Press me
        </button>
      </LiveAnnouncer>
    );
  }
}

export default MyApp;
```

The `LiveMessage` component does not have to exist in the same component as `LiveAnnouncer`, as long as it exists inside a component tree wrapped by `LiveAnnouncer`.

Setting the optional `clearOnUnmount` prop to `true` will clear the live region text when the `LiveMessage` component is unmounted. This can be handy in cases where you want to repeatedly broadcast the same message. Using ID's, newly rendered components should broadcast the same message again so this is an escape hatch if you need to force the clear of the live region.

```
<LiveMessage message="Some static message" aria-live="polite" clearOnUnmount="true" />
```

### LiveMessenger

If rendered inside a `LiveAnnouncer`, you can use the `LiveMessage` component to send `polite` or `assertive` messages using javascript functions called `announcePolite` and `announceAssertive`.

Use this component when you want to avoid a lot of boilerplate code to send screen-reader messages to via the `LiveMessage` component.

This component accepts a render function as `children`. This render function injects the `announcePolite` and `announceAssertive` functions. Each of these functions can be called with a string message you would like to send to the screen-reader.

These functions also accepts an optional second parameter which is a string ID value. By passing a new ID value with each call you can easily rebroadcast the same event message when required without writing complex code to clear the live region first. 

```
import React, { Component, Fragment } from 'react';
import { LiveAnnouncer, LiveMessenger } from 'react-aria-live';

class MyApp extends Component {

  render() {
    return (
      <LiveAnnouncer>
        <LiveMessenger>
        {({announcePolite, announceAssertive}) => 
            <Fragment>
                <button
                onClick={() => {
                   //Call without ID. Will broadcast when string values changes.
                   announcePolite('Polite message');
                  }}>
                  Press me for a polite message
                </button>
                <button
                onClick={() => {
                   //Call with ID. Will always broadcast when ID changes.
                   announceAssertive('Assertive message', this.getUniqueId());
                  }}>
                  Press me for an assertive message
                </button>
            </Fragment>
         }
        </LiveMessenger>
      </LiveAnnouncer>
    );
  }
}

export default MyApp;
```

If you want to use these functions in lifecycle hooks, please pass them as props to the component in question.