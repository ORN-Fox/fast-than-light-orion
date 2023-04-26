import { TestBed } from '@angular/core/testing';

import { ShipRenderService } from './ship-render.service';

describe('ShipRenderService', () => {
  let service: ShipRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
