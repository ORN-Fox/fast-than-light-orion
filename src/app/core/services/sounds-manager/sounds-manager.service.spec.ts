import { TestBed } from '@angular/core/testing';

import { SettingsService } from '../settings/settings.service';
import { SoundsManagerService } from './sounds-manager.service';

describe('SoundsManagerService', () => {
  let service: SoundsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        SoundsManagerService,
      ],
    });
    service = TestBed.inject(SoundsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
