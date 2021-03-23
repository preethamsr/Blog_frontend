import { TestBed } from '@angular/core/testing';

import { BlogbackendService } from './blogbackend.service';

describe('BlogbackendService', () => {
  let service: BlogbackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogbackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
