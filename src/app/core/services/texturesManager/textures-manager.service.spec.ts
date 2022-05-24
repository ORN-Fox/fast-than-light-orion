import { TestBed } from '@angular/core/testing';

import { TexturesManagerService } from './textures-manager.service';

describe('TexturesManagerService', () => {
  let service: TexturesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TexturesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
