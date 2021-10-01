// eslint-disable-next-line import/prefer-default-export
export class LocalStorage {
  constructor() {
    this.array = [];
  }

  setLocalStorage = (object) => {
    this.array.push(object);
  };

  getLocalStorage = () => this.array;
}