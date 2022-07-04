import { CrewsService } from '../../../services/crews/crews.service';

import { EngiShip } from './engiShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi } from '../../races/engi/engi.model';

import { Room, RoomDisplaySettings } from '../../room/index';
import { Slot } from '../../slot/slot.model';
import { Battery, Cloacking, DoorControl, DroneControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';

import { AntiPersonnel, SystemRepair } from '../../drones/index';
import { DroneReactorBooster } from '../../upgrades/index';
import { HeavyIon, HeavyLaserI } from '../../weapons/index';

export class EngiLayoutB extends EngiShip {

  constructor(crewsService: CrewsService) {
    super();

    this.name = this.originalName = 'The Vortex';
    this.layout = 'B';

    this.hull = this.maxHull = 300;
    this.reactorPower = 9;
    this.fuel = 16;
    this.missiles = 0;
    this.droneParts = 6;

    this.crews = [
      crewsService.createCrew(new Engi(), Gender.Other)
    ];

    let shieldRoom = new Room(new RoomDisplaySettings(308, 266, 2, 1), new Shield(2, SystemPositionEnum.Bottom, 11)),
      engineRoom = new Room(new RoomDisplaySettings(168, 92, 2, 2), new Engine(1, SystemPositionEnum.Bottom, 2)),
      oxygenRoom = new Room(new RoomDisplaySettings(204, 162, 1, 2), new Oxygen(1, 6)),
      weaponControlRoom = new Room(new RoomDisplaySettings(238, 127, 2, 1), new WeaponControl(3, SystemPositionEnum.Top, 8)),
      droneControlRoom = new Room(new RoomDisplaySettings(168, 232, 2, 2), new DroneControl(3)),
      medbayRoom = new Room(new RoomDisplaySettings(378, 196, 1, 2), new Medbay(1, 6)),
      pilotingRoom = new Room(new RoomDisplaySettings(448, 266, 1, 2), new Piloting(1, SystemPositionEnum.Right), this.crews[0]), // Engi
      doorControlRoom = new Room(new RoomDisplaySettings(238, 230, 2, 1), new DoorControl()),
      mindControlRoom = new Room(new RoomDisplaySettings(167, 162, 1, 2), new MindControl(1, 2, false)),
      sensorRoom = new Room(new RoomDisplaySettings(308, 127, 2, 1), new Sensor(1, SystemPositionEnum.Bottom, 2, false)),
      teleprtRoom = new Room(new RoomDisplaySettings(378, 127, 1, 2), new Teleport(1, false)),
      hackingRoom = new Room(new RoomDisplaySettings(308, 230, 2, 1), new Hacking(1, 2, false)), // manage advancedEditionEnabled
      batteryRoom = new Room(new RoomDisplaySettings(238, 266, 2, 1), new Battery(1, 2, false)),
      cloackingRoom = new Room(new RoomDisplaySettings(378, 266, 2, 1), new Cloacking(1, 2, false)),
      topOfWeaponControlRoom = new Room(new RoomDisplaySettings(273, 90, 2, 1));

    this.rooms = [
      shieldRoom,
      engineRoom,
      oxygenRoom,
      weaponControlRoom,
      droneControlRoom,
      medbayRoom,
      pilotingRoom,
      doorControlRoom,
      mindControlRoom,
      sensorRoom,
      teleprtRoom,
      hackingRoom,
      batteryRoom,
      cloackingRoom,
      topOfWeaponControlRoom
    ];

    this.weapons = [
      new HeavyIon(),
      new HeavyLaserI()
    ];

    this.drones = [
      new AntiPersonnel(),
      new SystemRepair(),
      new SystemRepair()
    ];

    this.upgrades = [
      new DroneReactorBooster()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_b/circle_cruiser_b_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_b/circle_cruiser_b_floor.png';

    // Shed display related
    this.hullSpriteX = 400;
    this.hullSpriteY = 50;
    this.interiorSpriteX = 439;
    this.interiorSpriteY = 64;

    // Experimental
    this.shipRepresentation = [
      [new Slot(0, 0, engineRoom), new Slot(1, 0, engineRoom), null, new Slot(0, 0, topOfWeaponControlRoom), new Slot(1, 0, topOfWeaponControlRoom), null, null, null, null], // y0
      [new Slot(0, 1, engineRoom), new Slot(1, 1, engineRoom), new Slot(0, 0, weaponControlRoom), new Slot(1, 0, weaponControlRoom), new Slot(0, 0, sensorRoom), new Slot(1, 0, sensorRoom), new Slot(0, 0, teleprtRoom), null, null], // y1
      [new Slot(0, 0, mindControlRoom), new Slot(0, 0, oxygenRoom), null, null, null, null, new Slot(0, 1, teleprtRoom), null,  null], // y2
      [new Slot(1, 0, mindControlRoom), new Slot(1, 0, oxygenRoom), null, null, null, null, new Slot(0, 0, medbayRoom), null, null], // y3
      [new Slot(0, 0, droneControlRoom), new Slot(1, 0, droneControlRoom), new Slot(0, 0, doorControlRoom), new Slot(1, 0, doorControlRoom), new Slot(0, 0, hackingRoom), new Slot(1, 0, hackingRoom), new Slot(0, 1, medbayRoom), null, null], // y4
      [new Slot(0, 1, droneControlRoom), new Slot(1, 1, droneControlRoom), new Slot(0, 0, batteryRoom), new Slot(1, 0, batteryRoom), new Slot(0, 0, shieldRoom), new Slot(1, 0, shieldRoom), new Slot(0, 0, cloackingRoom), new Slot(1, 0, cloackingRoom), new Slot(0, 0, pilotingRoom, pilotingRoom.affectedCrew)], // y5
      [null, null, null, null, null, null, null, null, new Slot(0, 1, pilotingRoom)] // y6
    ];
  }
}
