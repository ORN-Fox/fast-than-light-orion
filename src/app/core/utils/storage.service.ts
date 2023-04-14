import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static getLocalStorageItem(name: string): string | null {
    return localStorage.getItem(name);
  }

  static setLocalStorageItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value, null, 2));
  }

  static removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  }
}
