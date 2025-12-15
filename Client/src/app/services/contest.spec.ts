import { TestBed } from '@angular/core/testing';

import { Contest } from './contest';

describe('Contest', () => {
  let service: Contest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
