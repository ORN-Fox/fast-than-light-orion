import { Component, OnInit } from '@angular/core';

import { GameService } from '../../core/services/game/game.service';
import { ShipsService } from '../../core/services/ships/ships.service';

import { Difficulty } from '../../core/models/difficulty/difficulty.model';
import { Game } from '../../core/models/game/game.model';
import { Ship, ShipList } from '../../core/models/ships/index';

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

  difficulties: Difficulty[];

  game: Game;

  ships: ShipList[];
  shipListIndex: number = 0;

  selectedShip: Ship;


  renameShipEnabled: boolean = false;

  constructor(
    private gameService: GameService,
    private shipsService: ShipsService)
  {
    // TODO extract canvas managemnet on dedicated file / service
    this.canvasRatio = this.canvasHeight / this.canvasWidth;

    this.gameService.newGame(); // TEMP
    this.game = this.gameService.game;

    this.difficulties = this.gameService.difficulties;
    this.game.difficulty = this.difficulties[0];

    this.ships = this.shipsService.getShips();
  }

  ngOnInit(): void {
    this.initShepCanvas();

    this.loadSelectedShip(this.ships[this.shipListIndex].layouts[0]);

    this.loadShedGUI();

    this.loadSystemsGUIofShip(this.selectedShip);
    this.loadWeasponsGUIofShip(this.selectedShip);
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

    let shipAdvancedGUI = new Image();
    shipAdvancedGUI.src = '/assets/images/gui/box_advanced.png';
    shipAdvancedGUI.onload = () => {
      this.ctx.drawImage(shipAdvancedGUI, this.canvasWidth - 305, this.canvasHeight - 340);
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
    hullShipImage.src = this.selectedShip.srcHullSprite;
    hullShipImage.onload = () => {
      this.ctx.drawImage(hullShipImage, 300, 0);

      let interiorShipImage = new Image();
      interiorShipImage.src = this.selectedShip.srcInteriorSprite;
      interiorShipImage.onload = () => {
        this.ctx.drawImage(interiorShipImage, 350, 97);
      }
    }

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

          for (let y = 0; y < ship.rooms[i].affectedSystem.level; y++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "#3ff33c";
            this.ctx.fillRect(391.5 + (i * 38), 435 + (y * -7), 15, 5);
            this.ctx.closePath();
          }
        };
      }
    }
  }

  loadWeasponsGUIofShip(ship: Ship)
  {
    for (let i = 0; i < ship.maxWeaponsAllowed; i++) {
      let shipWeaponGUI = new Image();
      shipWeaponGUI.src = `/assets/images/gui/box_weapons_${ i < ship.weapons.length ? 'on' : 'off'}.png`;
      shipWeaponGUI.onload = () => {
        this.ctx.drawImage(shipWeaponGUI, 425 + (i * 120), 515);
      };
    }
  }

  previousShip()
  {
    this.shipListIndex--;
    this.selectShip(this.ships[this.shipListIndex].layouts[0]);
  }

  openShipsList()
  {
    // TODO
  }

  nextShip()
  {
    this.shipListIndex++;
    this.selectShip(this.ships[this.shipListIndex].layouts[0]);
  }

  selectShip(ship: Ship)
  {
    if (ship != this.selectedShip)
    {
      // Clear canvas before display new ship
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      ship.resetName();

      this.loadSelectedShip(ship);

      this.loadShedGUI();

      this.loadSystemsGUIofShip(this.selectedShip);
      this.loadWeasponsGUIofShip(this.selectedShip);
    }
  }

  selectDifficulty(difficulty: Difficulty)
  {
    this.game.difficulty = difficulty;
  }

  openRenameShipInput()
  {
    this.renameShipEnabled = true;

    let renameShipInput = document.querySelector('#inputShipRename') as HTMLInputElement;
    renameShipInput.focus();
  }

  closeRenameShipInput()
  {
    this.renameShipEnabled = false;

    let renameShipInput = document.querySelector('#inputShipRename') as HTMLInputElement;
    renameShipInput.blur();
  }

  toggleAdvancedEditionContentActivation() {
    this.game.advancedEditionEnabled = !this.game.advancedEditionEnabled;
  }

  startGame() {
    this.game.ship = this.selectedShip;

    console.log('Start game, include in future version', this.game);
  }

}
