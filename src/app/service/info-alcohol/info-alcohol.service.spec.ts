import { TestBed } from '@angular/core/testing';

import { InfoAlcoholService } from './info-alcohol.service';

describe('InfoAlcoholService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoAlcoholService = TestBed.get(InfoAlcoholService);
    expect(service).toBeTruthy();
  });
});
