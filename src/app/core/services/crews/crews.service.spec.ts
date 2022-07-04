import { TestBed } from '@angular/core/testing';

import { CrewsService } from './crews.service';

describe('CrewsService', () => {
  let service: CrewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
