import { TestBed } from '@angular/core/testing';

import { ContentRendererService } from './content-renderer.service';

describe('ContentRendererService', () => {
  let service: ContentRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
