import { TestBed } from '@angular/core/testing';

import { ShellLocationStrategyService } from './shell-location-strategy.service';

describe('ShellLocationStrategyService', () => {
  let service: ShellLocationStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellLocationStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
