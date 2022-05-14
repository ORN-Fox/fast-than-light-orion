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
  canvasRatio: number; // 720 / 1280 = 0.5625

  ctx: CanvasRenderingContext2D;

  ships: Ship[];
  selectedShip: Ship;

  constructor(private shipsService: ShipsService)
  {
    // TODO extract canvas managemnet on dedicated file / service
    this.canvasRatio = this.canvasHeight / this.canvasWidth;

    this.ships = this.shipsService.getShips();
  }

  ngOnInit(): void {
    this.initShepCanvas();

    this.loadSelectedShip(this.ships[0]);
    setTimeout(() => this.loadShedGUI(), 200);
  }

  initShepCanvas()
  {
    const shedBody = document.querySelector('.shed') as HTMLElement;
    shedBody.style.height = `${this.canvasHeight}px`;
    shedBody.style.width = `${this.canvasWidth}px`;

    const shedGUIContainer = document.querySelector('.shed-gui-container') as HTMLElement;
    shedGUIContainer.style.height = `${this.canvasHeight}px`;
    shedGUIContainer.style.width = `${this.canvasWidth}px`;

    const shedCanvas = document.querySelector('#shedCanvas') as HTMLCanvasElement;
    shedCanvas.height = this.canvasHeight;
    shedCanvas.width = this.canvasWidth;

    this.ctx = shedCanvas.getContext('2d') as CanvasRenderingContext2D;
  }

  loadShedGUI()
  {
    let boxShipNameGUI = new Image();
    boxShipNameGUI.src = '/assets/images/gui/box_shipname.png';
    boxShipNameGUI.onload = () => {
      this.ctx.drawImage(boxShipNameGUI, 5, 8);
    }

    let boxShipSelectGUI = new Image();
    boxShipSelectGUI.src = '/assets/images/gui/box_shipselect.png';
    boxShipSelectGUI.onload = () => {
      this.ctx.drawImage(boxShipSelectGUI, 0, 105);
    }

    let boxShipShipashGUI = new Image();
    boxShipShipashGUI.src = '/assets/images/gui/box_shipach.png';
    boxShipShipashGUI.onload = () => {
      this.ctx.drawImage(boxShipShipashGUI, 0, 355);
    }

    let boxStartGUI = new Image();
    boxStartGUI.src = '/assets/images/gui/box_start.png';
    boxStartGUI.onload = () => {
      this.ctx.drawImage(boxStartGUI, this.canvasWidth - 316, 0);
    }

    let shipEquipmentGUI = new Image();
    shipEquipmentGUI.src = '/assets/images/gui/box_shipequip.png';
    shipEquipmentGUI.onload = () => {
      this.ctx.drawImage(shipEquipmentGUI, 0, this.canvasHeight - 242);
    }
  }

  loadSelectedShip(ship: Ship)
  {
    this.selectedShip = ship;

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

    let thrustersLeftImage = new Image();
    thrustersLeftImage.src = '/assets/images/effects/thrusters_on_img.png';
    thrustersLeftImage.onload = () => {
      this.ctx.drawImage(thrustersLeftImage, 360, 40);
    }

    let thrustersRightImage = new Image();
    thrustersRightImage.src = '/assets/images/effects/thrusters_on_img.png';
    thrustersRightImage.onload = () => {
      this.ctx.drawImage(thrustersRightImage, 360, 305);
    }

    this.loadSystemsGUIofShip(this.selectedShip)
  }

  loadSystemsGUIofShip(ship: Ship)
  {
    for (let i = 0; i < ship.rooms.length; i++) {
      let shipSystemGUI = new Image();
      shipSystemGUI.src = '/assets/images/gui/box_system_on.png';
      shipSystemGUI.onload = () => {
        this.ctx.drawImage(shipSystemGUI, 380 + (i * 38), 382);

        let shipSystemIconGUI = new Image();
        shipSystemIconGUI.src = ship.rooms[i].affectedSystem.srcSystemGreenSprite;
        shipSystemIconGUI.onload = () => {
          this.ctx.drawImage(shipSystemIconGUI, 367 + (i * 38), 427);
        };
      }
    }
  }

  selectShip(ship: Ship)
  {
    if (ship == this.selectedShip)
      return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.loadSelectedShip(ship);
    setTimeout(() => this.loadShedGUI(), 200);
  }

}
