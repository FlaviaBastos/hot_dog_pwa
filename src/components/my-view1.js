/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../store.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js'

class MyView1 extends connect(store)(PageViewElement) {
  constructor() {
    super();
    this.state = {games: false};
  }

  static get properties () {
    return {
      city: { type: String },
      condition: { type: String },
      fahr: { type: String }
    }
  }

  _checkStatus (currTemp) {
    let status
    currTemp = parseInt(currTemp)

    if (currTemp <= 60) {
      status = this._coldCheck(currTemp)
    } else {
      status = this._hotCheck(currTemp)
    }
    return status
  }

  _coldCheck (temp) {
    let message;
  
    switch (true) {
      case temp > 40 && temp <= 60:
        message = "Let all the dogs out!";
        break;
      case temp >= 30 && temp <= 40:
        message = "It's ok to go out but be careful. It's getting cold...";
        break;
      case temp >= 20 && temp <= 29:
        message = "It's cold outside. Only go out for a short period of time";
        break;
      case temp <= 19:
        message = "Too cold! Better stay inside. How about playing some games?";
        this.state.games = true;
        break;
      default:
        message = "Uh oh... we can't get weather info. How about checking out the window instead?";
    }
    return message;
  }

  _hotCheck (temp) {
    let message;
    switch (true) {
      case temp > 60 && temp <= 64:
        message = "Let all the dogs out!";
        break;
      case temp >= 65 && temp <= 70:
        message = "It's ok to go out but be careful. It's getting hot...";
        break;
      case temp >= 71 && temp <= 79:
        message = "It's hot outside. Keep an eye on your dog";
        break;
      case temp >= 80 && temp <= 84:
        message = "It's hot outside. Only go out for a short period of time";
        break;
      case temp > 84:
        message = "Too hot! Better stay inside. How about playing some games?";
        this.state.games = true;
        break;
      default:
        message = "Uh oh... we can't get weather info. How about checking out the window instead?";
    }
    return message;
  }

  _loadActivities () {
    console.log("IN LOAD ACTIVITIES")
    const games = ["fetch", "hide & seek", "indoor agility", "tug war"]
    console.log(`Activities: ${games}`)
    
    return html`
      ${SharedStyles}
      <section>
        <h3>Here are some suggestions:</h3>
        <ul>
        ${games.map((game, index) =>
          html`
            <li>${game}</li>
          `
        )}
        </ul>
      </section>
    `
  }

  _render (props) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Current Condition</h2>
        <p>You're in ${this.city}, ${this.region}</p>
        <p>The temp is ${this.fahr} and the weather condition is ${this.condition}</p>
      </section>
      <section>
        <p>${this._checkStatus(this.fahr)}</p>
        ${ this.state.games ? 
          this._loadActivities()
          : null 
        }
      </section>
    `
  }

  _stateChanged (state) {
    this.city = state.weather.city
    this.condition = state.weather.condition
    this.fahr = state.weather.fahr
  }
}

window.customElements.define('my-view1', MyView1)
