import { TestBed } from '@angular/core/testing';

import { Perfomance } from './perfomance';

describe('Perfomance', () => {
  let service: Perfomance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Perfomance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
