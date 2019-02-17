import * as Background from './ViewModels/Background';

window.addEventListener('DOMContentLoaded', () => {
  Background.create();

  const compressTypeForm = document.querySelector('.-js-compress-type');
  if (!compressTypeForm || !(compressTypeForm instanceof HTMLSelectElement)) {
    return;
  }

  const images = Array.from<HTMLElement>(document.querySelectorAll('.-js-image'));
  compressTypeForm.addEventListener('change', ({ currentTarget }) => {
    if (!currentTarget || !(currentTarget instanceof HTMLSelectElement)) {
      return;
    }

    images.forEach(element => (element.dataset.type = currentTarget.value));
  });
});
