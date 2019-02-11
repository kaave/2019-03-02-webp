import Rellax from 'rellax';

interface Elements {
  intersectionObserverTargets: HTMLElement[];
}

export interface IO {
  render: () => void;
}

const getElements: () => Elements = () => {
  const selector = '.-js-intersection-observer';
  const intersectionObserverTargets = Array.from<HTMLElement>(document.querySelectorAll(selector));

  return { intersectionObserverTargets };
};

const setIntersectionObservers = (entries: HTMLElement[]) => {
  const io = new IntersectionObserver(
    entryCollection =>
      entryCollection.forEach(entry => {
        if (entry.intersectionRatio < 0.4) {
          return;
        } else if (!entry.target.classList.contains('-visually-hidden')) {
          return;
        }

        entry.target.classList.remove('-visually-hidden');
      }),
    { threshold: [0.4] },
  );
  entries.forEach(entry => io.observe(entry));
};

class VisualEffects {
  elements: Elements = getElements();

  constructor() {
    const rellax = new Rellax('.-js-parallax');
    setIntersectionObservers(this.elements.intersectionObserverTargets);
    console.log(rellax);
  }

  render: () => void = () => console.log('');
}

export function create(): IO {
  return new VisualEffects();
}
