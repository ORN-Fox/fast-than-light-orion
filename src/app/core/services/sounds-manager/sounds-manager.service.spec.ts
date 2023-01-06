import { TestBed } from '@angular/core/testing';

import { SoundsManagerService } from './sounds-manager.service';

describe('SoundsManagerService', () => {
  let service: SoundsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
