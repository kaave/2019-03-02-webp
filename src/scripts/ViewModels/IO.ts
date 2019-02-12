export interface ViewModel<T> {
  state: T;

  setState: (p: Partial<T>) => void;
  render: (prev: T, next: T) => void;
}
