import { html } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing';
import '@vaadin/vaadin-lumo-styles/typography';
import '@vaadin/vaadin-lumo-styles/style';
import '@vaadin/vaadin-lumo-styles/spacing';

const theme = document.createElement('dom-module');
theme.id = 'vcf-share-dialog-lumo';
theme.setAttribute('theme-for', 'vcf-share-dialog');
theme.innerHTML = `
    <template>
      <style include="lumo-color lumo-typography">
        :host {}
      </style>
    </template>
  `;
theme.register(theme.id);

const template = html`
  <dom-module id="my-dialog-overlay-styles" theme-for="vaadin-dialog-overlay">
    <template>
      <style>
        [part='content'] {
          padding: 0;
          height: 100%;
        }
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild(template.content);
