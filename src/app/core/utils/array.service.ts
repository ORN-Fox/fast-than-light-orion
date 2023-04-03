import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  static NOT_FOUND_ITEM_INDEX = -1;

  constructor() { }

  static getItemIndex<T>(arr: Array<T>, value: T): number {
    return arr.indexOf(value);
  }

  static removeItem<T>(arr: Array<T>, value: T): Array<T> {
    const index = this.getItemIndex(arr, value);
    if (index > this.NOT_FOUND_ITEM_INDEX) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
