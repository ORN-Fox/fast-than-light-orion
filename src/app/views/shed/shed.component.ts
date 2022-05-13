import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shed',
  templateUrl: './shed.component.html',
  styleUrls: ['./shed.component.scss']
})
export class ShedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const shedCanvas = document.querySelector('#shedCanvas') as HTMLCanvasElement;
    shedCanvas.height = 768;
    shedCanvas.width = 1366;

    const ctx = shedCanvas.getContext('2d') as CanvasRenderingContext2D;

    // TEMP
    let shipImage = new Image();
    shipImage.onload = function() {
      ctx.drawImage(shipImage, 400, 100);
    };
    shipImage.src = '/assets/images/ships/kestrel_cruiser_a.webp';
  }

}
