# react-aria-live

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

The library exports two components, namely `LiveAnnouncer` and `LiveMessage`.

Wrap you React application in the `LiveAnnouncer` component. It will render a visually hidden message area in your application that can broadcast `aria-live` messages. `LiveAnnouncer` is best placed as high up as possible in your component tree, as `ARIA Live Regions` are sensitive to changes to the HTML rendering these regions. Best results are obtained when the HTML is rendered only once when the application root component is mounted.

Now you can use the `LiveMessage` component to send `polite` or `assertive` messages. Messages are only triggered when the bound `message` prop changes.

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

The `LiveMessage` component does not have to exists in the same component as `LiveAnnouncer`, as long as it exists inside a component tree wrapped by `LiveAnnouncer`.
