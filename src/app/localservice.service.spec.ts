import { TestBed } from '@angular/core/testing';

import { LocalserviceService } from './localservice.service';

describe('LocalserviceService', () => {
  let service: LocalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
