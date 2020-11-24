# &lt;vcf-share-dialog&gt;

## Demo

https://vcf-share-dialog.netlify.com/

## Installation

Install `vcf-share-dialog`:

```sh
npm i @vaadin-component-factory/vcf-share-dialog --save
```

## Usage

Once installed, import it in your application:

```js
import '@vaadin-component-factory/vcf-share-dialog';
```

And use it:

```html
<vcf-share-dialog share-url="https://vaadin.com"></vcf-share-dialog>
```

### Attributes

- `share-url`: The url which will be shared.
- `members`: A list of people whom this URL is shared with.
- `button-caption`: Text shown inside the button.
- `title-text`: Title of share dialog.
- `secondary-title-text`: Secondary title shown on the top right corner of share dialog.
- `share-title`: Title used for native share.
- `share-text`: Description used for native share.
- `share-button-text`: Text shown inside native share button.
- `description-text`: Description text of share dialog.
- `copy-text`: Text shown inside copy button.
- `notes-text`: Secondary text shown after copy button.
- `members-text`: Title of members section.
- `close-text`: Text shown inside close button.
- `copied-text`: Text shown when the share url is copied.

### Events

The component fires 2 custom events:

- `vcf-share-dialog-opened`: when the share dialog opens.
- `vcf-share-dialog-link-copied`: when the sharable link is copied.

## Running demo

1. Fork the `vcf-share-dialog` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vcf-share-dialog` directory, run `npm install` to install dependencies.

1. Run `npm start` to open the demo.

## Contributing

To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.

## License

Apache License 2.0