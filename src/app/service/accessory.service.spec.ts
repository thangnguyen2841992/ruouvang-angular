import { TestBed } from '@angular/core/testing';

import { AccessoryService } from './accessory.service';

describe('BrandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessoryService = TestBed.get(AccessoryService);
    expect(service).toBeTruthy();
  });
});
