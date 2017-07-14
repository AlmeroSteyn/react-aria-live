import React, {Component} from 'react'
import {render} from 'react-dom'

import LiveAnnouncer from '../../src/modules/LiveAnnouncer'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-aria-live Demo</h1>
      <LiveAnnouncer/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
