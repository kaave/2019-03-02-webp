import './common/initializer';

interface Elements {
  images: HTMLElement[];
  inputs: HTMLInputElement[];
}

interface State {
  currentImageIndex: number;
}

function getElements(): Elements {
  const images = ([].slice.call(document.querySelectorAll('.-js-image')) as unknown) as HTMLElement[];
  const inputs = ([].slice.call(document.querySelectorAll('.-js-input')) as unknown) as HTMLInputElement[];

  return { images, inputs };
}

class Main {
  state: State = { currentImageIndex: 0 };
  elements = getElements();

  constructor() {
    this.setEvents();
  }

  setState: (p: Partial<State>) => void = p => {
    const prev = this.state;
    this.state = { ...this.state, ...p };
    this.render(prev, this.state);
  };

  setEvents = () => {
    this.elements.inputs.forEach(e => e.addEventListener('change', this.onInputChange));
  };

  onInputChange: (e: Event) => void = ({ currentTarget }) => {
    if (!(currentTarget instanceof HTMLInputElement)) {
      return;
    }

    const currentImageIndex = parseInt(currentTarget.value, 10);
    if (Number.isNaN(currentImageIndex)) {
      return;
    }

    this.setState({ currentImageIndex });
  };

  render: (prev: State, next: State) => void = (prev, { currentImageIndex }) => {
    if (currentImageIndex !== prev.currentImageIndex) {
      this.elements.images.forEach((element, i) => {
        if (i === currentImageIndex) {
          element.removeAttribute('hidden');
        } else {
          element.setAttribute('hidden', '');
        }
      });
    }
  };
}

window.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  console.log(main);
});
