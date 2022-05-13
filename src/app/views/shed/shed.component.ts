import { Component, OnInit } from '@angular/core';

import { ShipsService } from '../../core/services/ships/ships.service';

import { Ship } from '../../core/models/ships/ship.model';

@Component({
  selector: 'app-shed',
  templateUrl: './shed.component.html',
  styleUrls: ['./shed.component.scss']
})
export class ShedComponent implements OnInit {

  canvasHeight: number = 720;
  canvasWidth: number = 1280;
  canvasRatio: number;

  ships: Ship[];
  selectedShip: Ship;

  constructor(private shipsService: ShipsService)
  {
    // TODO extract canvas managemnet on dedicated file / service
    this.canvasRatio = this.canvasHeight / this.canvasWidth;
    console.log(this.canvasRatio); // 720 / 1280 = 0.5625

    this.ships = this.shipsService.getShips();
    this.selectedShip = this.ships[0];
  }

  ngOnInit(): void {
    const shedBody = document.querySelector('.shed') as HTMLHtmlElement;
    shedBody.style.height = `${this.canvasHeight}px`;
    shedBody.style.width = `${this.canvasWidth}px`;

    const shedCanvas = document.querySelector('#shedCanvas') as HTMLCanvasElement;
    shedCanvas.height = this.canvasHeight;
    shedCanvas.width = this.canvasWidth;

    const ctx = shedCanvas.getContext('2d') as CanvasRenderingContext2D;

    this.loadSelectedShip(ctx);
  }

  loadSelectedShip(ctx: CanvasRenderingContext2D)
  {
    let hullShipImage = new Image();
    hullShipImage.onload = () => {
      ctx.drawImage(hullShipImage, 300, 0);
    }
    hullShipImage.src = this.selectedShip.srcHullSprite;

    let interiorShipImage = new Image();
    interiorShipImage.onload = () => {
      ctx.drawImage(interiorShipImage, 350, 97);
    }
    interiorShipImage.src = this.selectedShip.srcInteriorSprite;
  }

}
