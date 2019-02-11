interface Elements {
  userAgent: HTMLElement;
}

interface State {
  userAgent: string;
}

function getElements(): Elements {
  const selector = '.-js-ua';
  const userAgent = document.querySelector(selector);
  if (!userAgent || !(userAgent instanceof HTMLElement)) {
    throw new Error(`Invalid DOM: not found ${selector}.`);
  }

  return { userAgent };
}

export interface IO {
  render: (prev: State, next: State) => void;
}

class SupportTable implements IO {
  state: State = { userAgent: '' };
  elements = getElements();

  constructor() {
    this.setState({ userAgent: navigator.userAgent });
  }

  setState: (p: Partial<State>) => void = p => {
    const prev = this.state;
    this.state = { ...this.state, ...p };
    this.render(prev, this.state);
  };

  render: (prev: State, next: State) => void = (prev, { userAgent }) => {
    if (userAgent !== prev.userAgent) {
      this.elements.userAgent.innerText = userAgent;
    }
  };
}

export function create(): IO {
  return new SupportTable();
}
