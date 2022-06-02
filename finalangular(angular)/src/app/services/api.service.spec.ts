/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { apiService} from './api.service';

describe('Service: Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [apiService]
    });
  });

  it('should ...', inject([apiService], (service: apiService) => {
    expect(service).toBeTruthy();
  }));
});
