import { TestBed } from '@angular/core/testing';

import { HttpclientwrapperService } from './httpclientwrapper.service';

describe('HttpclientwrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpclientwrapperService = TestBed.get(HttpclientwrapperService);
    expect(service).toBeTruthy();
  });
});
