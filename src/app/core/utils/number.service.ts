import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor() { }

  static randomIntFromInterval(min: number, max: number)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
}
