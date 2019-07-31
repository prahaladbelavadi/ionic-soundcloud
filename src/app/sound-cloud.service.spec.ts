import { TestBed } from '@angular/core/testing';

import { SoundCloudService } from './sound-cloud.service';

describe('SoundCloudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundCloudService = TestBed.get(SoundCloudService);
    expect(service).toBeTruthy();
  });
});
