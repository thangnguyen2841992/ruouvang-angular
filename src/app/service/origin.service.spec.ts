import { TestBed } from '@angular/core/testing';

import { OriginService } from './origin.service';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OriginService = TestBed.get(OriginService);
    expect(service).toBeTruthy();
  });
});
