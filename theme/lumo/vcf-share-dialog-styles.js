const theme = document.createElement('dom-module');
theme.id = 'vcf-share-dialog-lumo';
theme.setAttribute('theme-for', 'vcf-share-dialog');
theme.innerHTML = `
    <template>
      <style>
        :host {}
      </style>
    </template>
  `;
theme.register(theme.id);
