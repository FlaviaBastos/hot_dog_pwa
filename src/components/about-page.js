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

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js'

class About extends PageViewElement {
  _render (props) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Is it too hot or too cold for a walk?</h2>
        <p>Summer days can get too hot to take your dog outside, even for a walk. Winter is no different: sometimes is too cold for walkies!</p>
        <p>Here you can check if you'd better play an indoor game instead.</p>
        <p class="center-wrap"><a href="/">Home</a></p>
      </section>
    `
  }
}

window.customElements.define('about-page', About)
