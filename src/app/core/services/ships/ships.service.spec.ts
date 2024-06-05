import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ShipsService } from './ships.service';

describe('ShipsService', () => {
  let service: ShipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
    });
    service = TestBed.inject(ShipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
