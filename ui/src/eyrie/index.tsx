import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { StartParams, useEyreState } from '../state/eyre'
import styles from '../index.css?inline'
import { EyrieMenu } from './EyrieMenu'

const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  display: inline-block;
}
${styles}
</style>`

export class Eyrie extends HTMLElement {
  root: Root;

  constructor() {
    super()
    const mountPoint = document.createElement('div')
    mountPoint.classList.add('w-full', 'text-sm', 'font-sans', 'text-gray-900', 'antialiased')
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    )

    this.shadowRoot?.appendChild(mountPoint)

    this.root = createRoot(mountPoint)
    this.root.render(<EyrieMenu />)
  }

  init(props: StartParams) {
    useEyreState.getState().start(props);
  }
}
customElements.define('tlon-eyrie', Eyrie)
