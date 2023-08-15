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

const startEyrie = useEyreState.getState().start;
export { startEyrie };

export class Eyrie extends HTMLElement {
  root: Root;
  mountPoint: HTMLDivElement;

  constructor() {
    super()
    this.mountPoint = document.createElement('div')
    this.mountPoint.classList.add('w-full', 'text-sm', 'font-sans', 'text-gray-900', 'antialiased')
    this.root = createRoot(this.mountPoint)
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    )
    this.shadowRoot?.appendChild(this.mountPoint)
    this.root.render(<EyrieMenu />)
  }

  disconnectedCallback() {
    this.root.unmount();
  }

  init(props: StartParams) {
    useEyreState.getState().start(props);
  }
}
customElements.define('tlon-eyrie', Eyrie)
