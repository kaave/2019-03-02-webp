import './common/initializer';

interface Elements {
  userAgent: HTMLElement;
  images: HTMLElement[];
  inputs: HTMLInputElement[];
}

interface State {
  currentImageIndex: number;
  userAgent: string;
}

function getElements(): Elements {
  let selector = '.-js-ua';
  const userAgent = document.querySelector(selector);
  if (!userAgent || !(userAgent instanceof HTMLElement)) {
    throw new Error(`Invalid DOM: not found ${selector}.`);
  }
  selector = '.-js-image';
  const images = ([].slice.call(document.querySelectorAll(selector)) as unknown) as HTMLElement[];

  selector = '.-js-input';
  const inputs = ([].slice.call(document.querySelectorAll(selector)) as unknown) as HTMLInputElement[];

  return { userAgent, images, inputs };
}

class Main {
  state: State = { currentImageIndex: 0, userAgent: '' };
  elements = getElements();

  constructor() {
    this.setEvents();
    this.setState({ userAgent: navigator.userAgent });
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

  render: (prev: State, next: State) => void = (prev, { userAgent, currentImageIndex }) => {
    if (userAgent !== prev.userAgent) {
      this.elements.userAgent.innerText = userAgent;
    }

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
