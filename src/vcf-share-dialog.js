import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ElementMixin } from '@vaadin/vaadin-element-mixin';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-notification';
import '@polymer/iron-icon';
import '@vaadin-component-factory/vcf-avatar-item';
import '@vaadin-component-factory/vcf-webshare-button';

import './icons';

class VcfShareDialog extends ElementMixin(ThemableMixin(PolymerElement)) {
  static get template() {
    return html`
      <style>
        .share-view {
          padding: var(--lumo-space-s) var(--lumo-space-l);
          box-sizing: border-box;
          line-height: var(--lumo-line-height-s);
          max-width: 360px;
        }

        .share-view h3 {
          font-size: var(--lumo-font-size-l);
          display: flex;
          align-items: center;
          color: var(--lumo-header-text-color);
        }

        .share-view h3 iron-icon {
          flex: none;
          width: var(--lumo-icon-size-s);
          height: var(--lumo-icon-size-s);
          color: var(--lumo-contrast-60pct);
        }

        .share-view h3 b {
          margin-left: var(--lumo-space-s);
          margin-right: var(--lumo-space-m);
          font-weight: 600;
        }

        .share-view h3 span {
          margin-left: auto;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
          color: var(--lumo-tertiary-text-color);
        }

        .share-view p {
          font-size: var(--lumo-font-size-s);
          margin: var(--lumo-space-m) 0;
        }

        .share-view vaadin-text-field {
          width: 100%;
        }

        .share-view .share-buttons {
          display: flex;
          justify-content: space-between;
        }

        .share-view p.small {
          font-size: var(--lumo-font-size-xs);
          color: var(--lumo-tertiary-text-color);
        }

        .share-view .members {
          border-top: 1px solid var(--lumo-contrast-10pct);
        }

        .share-view .members h4 {
          font-size: var(--lumo-font-size-s);
          font-weight: 500;
          margin-bottom: var(--lumo-space-m);
        }

        .share-view .member {
          display: flex;
          align-items: center;
          margin: var(--lumo-space-s) 0;
        }

        .share-view .member vcf-avatar-item {
          margin-right: var(--lumo-space-m);
          background-color: var(--lumo-primary-color);
          color: var(--lumo-primary-contrast-color);
          width: var(--lumo-size-s);
          height: var(--lumo-size-s);
        }

        .share-view .footer {
          margin: calc(var(--lumo-space-s) * -1) calc(var(--lumo-space-l) * -1);
          padding: 0 var(--lumo-space-l);
          margin-top: var(--lumo-space-l);
          background: var(--lumo-base-color) linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
          border-radius: 0 0 var(--lumo-border-radius-m) var(--lumo-border-radius-m);
          position: -webkit-sticky;
          position: sticky;
          bottom: 0;
        }

        .share-view .footer vaadin-button {
          width: 100%;
        }
      </style>
      <vaadin-button theme="small" on-click="showShareView" class="share-button">
        <iron-icon icon="taskmob:user-plus" slot="prefix"></iron-icon>
        <span>[[buttonCaption]]</span>
      </vaadin-button>

      <vaadin-dialog id="shareView">
        <template>
          <div class="share-view">
            <h3>
              <iron-icon icon="taskmob:user-plus"></iron-icon>
              <b>[[titleText]]</b>
              <span>[[secondaryTitleText]]</span>
            </h3>
            <p>[[descriptionText]]</p>
            <vaadin-text-field readonly value="[[shareUrl]]" autoselect></vaadin-text-field>
            <div class="share-buttons">
              <vaadin-button theme="tertiary small" on-click="copyShareUrlToClipboard" title="[[copyText]]">
                <iron-icon icon="taskmob:clipboard" slot="prefix"></iron-icon>
                <span>[[copyText]]</span>
              </vaadin-button>
              <vcf-webshare-button
                share-url="[[shareUrl]]"
                share-text="[[shareText]]"
                share-title="[[shareTitle]]"
                share-button-text="[[shareButtonText]]"
                browser-compatible="[[webShare]]"
              ></vcf-webshare-button>
            </div>
            <p class="small">[[notesText]]</p>
            <template is="dom-if" if="[[members.length]]">
              <div class="members">
                <h4>[[membersText]] ([[members.length]])</h4>
                <template is="dom-repeat" items="[[members]]" as="member" id="member-repeater">
                  <div class="member">
                    <vcf-avatar-item name="[[member.name]]"></vcf-avatar-item>
                    <span>[[member.name]]</span>
                  </div>
                </template>
              </div>
            </template>
            <div class="footer">
              <vaadin-button on-click="hideShareView" theme="tertiary">[[closeText]]</vaadin-button>
            </div>
          </div>
        </template>
      </vaadin-dialog>

      <vaadin-notification id="clipboardFeedback" position="bottom-center" theme="dark" duration="3000">
        <template
          >[[copiedText]]</template
        >
      </vaadin-notification>
    `;
  }

  static get is() {
    return 'vcf-share-dialog';
  }

  static get version() {
    return '0.3.0';
  }

  static get properties() {
    return {
      buttonCaption: {
        type: String,
        value: 'Share'
      },
      titleText: {
        type: String,
        value: 'Share'
      },
      shareTitle: {
        type: String,
        value: ''
      },
      shareText: {
        type: String,
        value: ''
      },
      shareButtonText: {
        type: String,
        value: 'Share...'
      },
      secondaryTitleText: {
        type: String,
        value: ''
      },
      descriptionText: {
        type: String,
        value: 'Invite people to collaborate by sending them the public address.'
      },
      copyText: {
        type: String,
        value: 'Copy to clipboard'
      },
      notesText: {
        type: String,
        value: ''
      },
      membersText: {
        type: String,
        value: 'Current members'
      },
      closeText: {
        type: String,
        value: 'Close'
      },
      copiedText: {
        type: String,
        value: 'Link copied to clipboard'
      },
      shareUrl: String,
      members: {
        type: Array,
        value: () => []
      },
      webShare: {
        type: Boolean,
        value: 'share' in navigator
      }
    };
  }

  showShareView() {
    if (window.ga) {
      window.ga('send', 'event', 'Sharing', 'dialog opened');
    }

    this.$.shareView.opened = true;
  }

  hideShareView() {
    this.$.shareView.opened = false;
  }

  iOSDevice() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }

  copyShareUrlToClipboard() {
    if (window.ga) {
      window.ga('send', 'event', 'Sharing', 'link copied');
    }

    // https://gist.github.com/lgarron/d1dee380f4ed9d825ca7
    const urlTextField = this.$.shareView.$.overlay.$.content.shadowRoot.querySelector('vaadin-text-field');
    let success = false;
    if (this.iOSDevice()) {
      // iOS 12.1 workaround
      const range = document.createRange();
      range.selectNodeContents(this.$.shareView.$.overlay.$.content.shadowRoot.querySelector('p'));
      document.getSelection().addRange(range);
      document.addEventListener(
        'copy',
        e => {
          e.clipboardData.setData('text/plain', this.shareUrl);
          e.preventDefault();
          success = true;
        },
        { once: true }
      );
    } else {
      // Firefox (and Edge?) will copy whatever selected and disregard the listener
      // Therefore, focus on the text field explicitly to ensure that it always copies the url (thanks to 'autoselect').
      urlTextField.focus();
      success = true;
    }
    document.execCommand('copy');
    urlTextField.blur();
    // Blur is not enough to clear the selection in Chrome
    document.getSelection().removeAllRanges();

    if (success) {
      this.$.clipboardFeedback.opened = true;
    }
  }
}

customElements.define(VcfShareDialog.is, VcfShareDialog);

/**
 * @namespace Vaadin
 */
window.Vaadin.VcfShareDialog = VcfShareDialog;

if (window.Vaadin.runIfDevelopmentMode) {
  window.Vaadin.runIfDevelopmentMode('vaadin-license-checker', VcfShareDialog);
}
