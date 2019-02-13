import format from 'date-fns/format';

import { ViewModel } from './IO';

interface Elements {
  userAgent: HTMLElement;
  mouse: HTMLElement;
  wheel: HTMLElement;
  datetime: HTMLElement;
}

interface State {
  userAgent: string;
  mouse: MouseEvent | null;
  wheel: WheelEvent | null;
  datetime: Date;
}

function getElements(): Elements {
  let selector = '.-js-ua';
  const userAgent = document.querySelector(selector);
  if (!userAgent || !(userAgent instanceof HTMLElement)) {
    throw new Error(`Invalid DOM: not found ${selector}.`);
  }

  selector = '.-js-mouse';
  const mouse = document.querySelector(selector);
  if (!mouse || !(mouse instanceof HTMLElement)) {
    throw new Error(`Invalid DOM: not found ${selector}.`);
  }

  selector = '.-js-wheel';
  const wheel = document.querySelector(selector);
  if (!wheel || !(wheel instanceof HTMLElement)) {
    throw new Error(`Invalid DOM: not found ${selector}.`);
  }

  selector = '.-js-datetime';
  const datetime = document.querySelector(selector);
  if (!datetime || !(datetime instanceof HTMLElement)) {
    throw new Error(`Invalid DOM: not found ${selector}.`);
  }

  return { userAgent, mouse, wheel, datetime };
}

export type IO = ViewModel<State>;

class SupportTable implements IO {
  state: State = { userAgent: '', mouse: null, wheel: null, datetime: new Date() };
  elements = getElements();

  constructor() {
    this.setState({ userAgent: navigator.userAgent });
    setInterval(() => this.setState({ datetime: new Date() }), 1000);
    document.body.addEventListener('mousemove', mouse => this.setState({ mouse }));
    document.body.addEventListener('wheel', wheel => this.setState({ wheel }));
  }

  setState: (p: Partial<State>) => void = p => {
    const prev = this.state;
    this.state = { ...this.state, ...p };
    this.render(prev, this.state);
  };

  render: (prev: State, next: State) => void = (prev, { userAgent, mouse, wheel, datetime }) => {
    if (userAgent !== prev.userAgent) {
      this.elements.userAgent.innerText = userAgent;
    }

    if (mouse && mouse !== prev.mouse) {
      this.elements.mouse.innerText = `x: ${mouse.x}, y: ${mouse.y}`;
    }

    if (wheel && wheel !== prev.wheel) {
      this.elements.wheel.innerText = `deltaX: ${wheel.deltaX}, deltaY: ${wheel.deltaY}`;
    }

    if (datetime !== prev.datetime) {
      this.elements.datetime.innerText = `${format(datetime, 'YYYY-MM-DD HH:mm:ss')} innerwidth: ${
        window.innerWidth
      } innerheight: ${window.innerHeight}`;
    }
  };
}

export function create(): IO {
  return new SupportTable();
}
