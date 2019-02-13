import { ViewModel } from './IO';

// tslint:disable-next-line no-empty-interface
interface Elements {}

// tslint:disable-next-line no-empty-interface
interface State {}

function getElements(): Elements {
  return {};
}

export type IO = ViewModel<State>;

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

  // tslint:disable-next-line no-empty
  render: (prev: State, next: State) => void = (_prev, _next) => {};
}

export function create(): IO {
  return new SupportTable();
}
