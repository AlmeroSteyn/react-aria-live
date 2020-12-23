import React, { Component, Fragment, StrictMode } from 'react';
import { render } from 'react-dom';
import uuidv4 from 'uuid/v4';

import LiveAnnouncer from '../../src/modules/LiveAnnouncer';
import LiveMessage from '../../src/modules/LiveMessage';
import LiveMessenger from '../../src/modules/LiveMessenger';
import useAriaLive from '../../src/modules/useAriaLive';

const MyFunctionalComponent = () => {
  const { announcePolite, announceAssertive } = useAriaLive();
  return (
    <Fragment>
      <button
        type="button"
        onClick={() => {
          announceAssertive('HELLO WORLD WITH HOOK');
        }}>
        Click for assertive message via hook
      </button>
      <button
        type="button"
        onClick={() => {
          announcePolite('Hello world with hook');
        }}>
        Click for polite message via hook
      </button>
    </Fragment>
  );
};
class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      politeMessage: '',
      assertiveMessage: '',
      politeRawClicked: false,
      assertiveRawClicked: false
    };

    this.onAssertiveClickHandler = this.onAssertiveClickHandler.bind(this);
    this.onPoliteClickHandler = this.onPoliteClickHandler.bind(this);
    this.getUniqueId = this.getUniqueId.bind(this);
  }

  onPoliteClickHandler() {
    if (this.state.politeMessage === 'Hello world.') {
      this.setState({ politeMessage: 'How are you?' });
    } else {
      this.setState({ politeMessage: 'Hello world.' });
    }
  }

  onAssertiveClickHandler() {
    if (this.state.assertiveMessage === 'HELLO WORLD!') {
      this.setState({ assertiveMessage: 'HOW ARE YOU?!' });
    } else {
      this.setState({ assertiveMessage: 'HELLO WORLD!' });
    }
  }

  onPoliteRawClickHandler(announcerFunc) {
    if (this.state.politeRawClicked) {
      announcerFunc('How are you with raw function?');
    } else {
      announcerFunc('Hello world with raw function.');
    }
    this.setState({ politeRawClicked: !this.state.politeRawClicked });
  }

  onAssertiveRawClickHandler(announcerFunc) {
    if (this.state.politeRawClicked) {
      announcerFunc('HOW ARE YOU WITH RAW FUNCTION?!');
    } else {
      announcerFunc('HELLO WORLD WITH RAW FUNCTION!');
    }
    this.setState({ politeRawClicked: !this.state.politeRawClicked });
  }

  getUniqueId() {
    return uuidv4();
  }

  render() {
    return (
      <StrictMode>
        <main>
          <h1>react-aria-live Demo</h1>
          <p>Start up your screen reader of choice.</p>
          <LiveAnnouncer>
            <LiveMessage message={this.state.politeMessage} aria-live="polite" />
            <LiveMessage message={this.state.assertiveMessage} aria-live="assertive" />
            <button type="button" onClick={this.onAssertiveClickHandler}>
              Click for assertive message
            </button>
            <button type="button" onClick={this.onPoliteClickHandler}>
              Click for polite message
            </button>
            <LiveMessenger>
              {({ announceAssertive, announcePolite }) => (
                <Fragment>
                  <p>These buttons announce via the raw functions</p>
                  <button
                    type="button"
                    onClick={() => {
                      this.onAssertiveRawClickHandler(announceAssertive);
                    }}>
                    Click for assertive message via raw function
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.onPoliteRawClickHandler(announcePolite);
                    }}>
                    Click for polite message via raw function
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      announcePolite('This is a message I want to hear again and again', this.getUniqueId());
                    }}>
                    Rebroadcast the same message
                  </button>
                  <MyFunctionalComponent />
                </Fragment>
              )}
            </LiveMessenger>
          </LiveAnnouncer>
        </main>
      </StrictMode>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
