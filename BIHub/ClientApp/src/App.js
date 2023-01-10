import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link } from 'react-router';
class App extends Component {
  render() {
    return (
      <div>
        <div className="gfpPanel">
          <div className="leftNavigation">
            <div className="panelTitle">Navigation</div>
            <div>
              <ul className='pageNavigationList'>
                <li>
                  <Link to="/"></Link>
                </li>
                <li>
                  <Link to="/GFP">GFP</Link>
                </li>
                <li>
                  <Link to="/Reports">Reports</Link>
                </li>
                <li>
                  <Link to="/LandingPage">Landing Page</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
