# react-aria-live

<!-- [![Travis][build-badge]][build] -->
[![npm package][npm-badge]][npm]
<!-- [![Coveralls][coveralls-badge]][coveralls] -->

An app-wide aria-live announcer for React applications.

With `react-aria-live` you can communicate crucial messages to screen readers from anywhere in your React application.

The double announcer region mechanism was inspired by [ngA11y](https://github.com/dequelabs/ngA11y).

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

Wrap you React application in the `LiveAnnouncer` component. It will render a visually hidden message area in your application
that can broadcast `aria-live` messages.

Then you can use the `LiveMessage` component to send `polite` or `assertive` messages. Messages are only triggered when the bound `message` prop changes.

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

As the library uses context, the `LiveMessage` component can be placed anywhere in the component tree wrapped by `LiveAnnouncer`.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
