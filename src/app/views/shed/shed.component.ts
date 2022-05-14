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

  ctx: CanvasRenderingContext2D;

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

    this.ctx = shedCanvas.getContext('2d') as CanvasRenderingContext2D;

    this.initShedGUI();
    this.loadSelectedShip();
  }

  initShedGUI()
  {
    let boxShipSelectGUI = new Image();
    boxShipSelectGUI.onload = () => {
      this.ctx.drawImage(boxShipSelectGUI, 0, 105);
    }
    boxShipSelectGUI.src = '/assets/images/gui/box_shipselect.png';

    let boxStartGUI = new Image();
    boxStartGUI.onload = () => {
      this.ctx.drawImage(boxStartGUI, this.canvasWidth - 316, 0);
    }
    boxStartGUI.src = '/assets/images/gui/box_start.png';

    let shipEquipmentGUI = new Image();
    shipEquipmentGUI.onload = () => {
      this.ctx.drawImage(shipEquipmentGUI, 0, this.canvasHeight - 242);
    }
    shipEquipmentGUI.src = '/assets/images/gui/box_shipequip.png';
  }

  loadSelectedShip()
  {
    let hullShipImage = new Image();
    hullShipImage.onload = () => {
      this.ctx.drawImage(hullShipImage, 300, 0);
    }
    hullShipImage.src = this.selectedShip.srcHullSprite;

    let interiorShipImage = new Image();
    interiorShipImage.onload = () => {
      this.ctx.drawImage(interiorShipImage, 350, 97);
    }
    interiorShipImage.src = this.selectedShip.srcInteriorSprite;

    // Ship systems
    for (let i = 0; i < this.selectedShip.rooms.length; i++) {
      let shipSystemGUI = new Image();
      shipSystemGUI.onload = () => {
        this.ctx.drawImage(shipSystemGUI, 380 + (i * 38), 382);
      }
      shipSystemGUI.src = '/assets/images/gui/box_system_on.png';
    }
  }

  selectShip(ship: Ship)
  {
    if (ship == this.selectedShip)
      return;

    this.selectedShip = ship;
    this.loadSelectedShip();
  }

}
