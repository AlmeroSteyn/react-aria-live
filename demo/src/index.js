import React, { Component } from 'react';
import { render } from 'react-dom';

import LiveAnnouncer from '../../src/modules/LiveAnnouncer';
import LiveMessage from '../../src/modules/LiveMessage';

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            politeMessage: '',
            assertiveMessage: ''
        };

        this.onAssertiveClickHandler = this.onAssertiveClickHandler.bind(this);
        this.onPoliteClickHandler = this.onPoliteClickHandler.bind(this);
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

    render() {
        return (
            <main>
                <h1>react-aria-live Demo</h1>
                <p>Start up your screen reader of choice.</p>
                <LiveAnnouncer>
                    <LiveMessage
                        message={this.state.politeMessage}
                        aria-live="polite"
                    />
                    <LiveMessage
                        message={this.state.assertiveMessage}
                        aria-live="assertive"
                    />
                    <button
                        type="button"
                        onClick={this.onAssertiveClickHandler}>
                        Click for assertive message
                    </button>
                    <button type="button" onClick={this.onPoliteClickHandler}>
                        Click for polite message
                    </button>
                </LiveAnnouncer>
            </main>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
