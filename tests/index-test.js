import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import PoliteMessage from 'src/modules/PoliteMessage';

describe('PoliteMessage', () => {
    let node;

    beforeEach(() => {
        node = document.createElement('div');
    });

    afterEach(() => {
        unmountComponentAtNode(node);
    });

    it('renders a polite message', () => {
        render(<PoliteMessage message="Some message" />, node, () => {
            expect(node.innerHTML).toContain('Some message');
        });
    });
});
