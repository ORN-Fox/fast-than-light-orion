import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CrewsService } from './crews.service';

describe('CrewsService', () => {
  let service: CrewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
    });
    service = TestBed.inject(CrewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
