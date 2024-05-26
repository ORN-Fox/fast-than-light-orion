import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { shedResolver } from './shed.resolver';

describe('shedResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => shedResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
