import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ElementMixin } from '@vaadin/vaadin-element-mixin';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-notification';
import '@polymer/iron-icon';
import '@vaadin-component-factory/vcf-avatar-item';

import './icons';
import resources from './locales.js';

class VcfShareDialog extends ElementMixin(ThemableMixin(mixinBehaviors([AppLocalizeBehavior], PolymerElement))) {
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
              <vaadin-button
                theme="tertiary small"
                on-click="openWebShare"
                title="[[localize('share')]]"
                hidden$="[[!webShare]]"
              >
                <iron-icon icon="taskmob:share" slot="prefix"></iron-icon>
                <span>[[localize('share')]]</span>
              </vaadin-button>
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
    return '0.1.0';
  }

  static get properties() {
    return {
      buttonCaption: String,
      titleText: String,
      shareTitle: String,
      shareText: String,
      secondaryTitleText: String,
      descriptionText: String,
      copyText: String,
      notesText: String,
      membersText: String,
      closeText: String,
      copiedText: String,

      shareUrl: String,
      members: {
        type: Array,
        value: () => []
      },
      language: {
        type: String,
        value: 'en'
      },
      webShare: {
        type: Boolean,
        value: 'share' in navigator
      },
      resources: {
        type: Object,
        value: () => resources
      }
    };
  }

  attached() {
    super.attached();

    this.buttonCaption = this.buttonCaption || this.localize('buttonCaption');
    this.titleText = this.titleText || this.localize('title');
    this.descriptionText = this.descriptionText || this.localize('description');
    this.copyText = this.copyText || this.localize('copy');
    this.membersText = this.membersText || this.localize('members');
    this.closeText = this.closeText || this.localize('close');
    this.copiedText = this.copiedText || this.localize('copied');
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

  openWebShare() {
    if (window.ga) {
      window.ga('send', 'event', 'Sharing', 'native api used');
    }

    const shareOptions = {
      title: this.shareTitle,
      text: this.shareText,
      url: this.shareUrl
    };
    navigator.share(shareOptions);
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
