import Rellax from 'rellax';

import { ViewModel } from './IO';

interface Elements {
  intersectionObserverTargets: HTMLElement[];
}

interface State {
  execIntersectionObserverTargets: HTMLElement[];
}

export type IO = ViewModel<State>;

const getElements: () => Elements = () => {
  const selector = '.-js-intersection-observer';
  const intersectionObserverTargets = Array.from<HTMLElement>(document.querySelectorAll(selector));

  return { intersectionObserverTargets };
};

class VisualEffects {
  state: State = { execIntersectionObserverTargets: [] };
  elements: Elements = getElements();

  constructor() {
    // @ts-ignore
    const rellax = new Rellax('.-js-parallax');
    this.setIntersectionObservers(this.elements.intersectionObserverTargets);
  }

  setState: (p: Partial<State>) => void = p => {
    const prev = this.state;
    this.state = { ...this.state, ...p };
    this.render(prev, this.state);
  };

  setIntersectionObservers = (entries: HTMLElement[]) => {
    const io = new IntersectionObserver(
      entryCollection =>
        entryCollection.forEach(entry => {
          const element = entry.target as HTMLElement;
          if (entry.intersectionRatio < 0.4) {
            return;
          } else if (this.state.execIntersectionObserverTargets.includes(element)) {
            return;
          }

          this.setState({
            execIntersectionObserverTargets: [...this.state.execIntersectionObserverTargets, element],
          });
        }),
      { threshold: [0.4] },
    );
    entries.forEach(entry => io.observe(entry));
  };

  render: (prev: State, next: State) => void = (prev, { execIntersectionObserverTargets }) => {
    if (execIntersectionObserverTargets.length !== prev.execIntersectionObserverTargets.length) {
      execIntersectionObserverTargets
        .filter(element => element.classList.contains('-visually-hidden'))
        .forEach(element => element.classList.remove('-visually-hidden'));
    }
  };
}

export function create(): IO {
  return new VisualEffects();
}
