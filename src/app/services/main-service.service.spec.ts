import { TestBed } from '@angular/core/testing';

import { MainServiceService } from './main-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthResponse } from '../interfaces/auth-response.interface';

describe('MainServiceService', () => {
  let service: MainServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MainServiceService]
    });
    service = TestBed.inject(MainServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockResponse: AuthResponse = {
      accessToken: 'sdjk3wj343jk4j',
      refreshToken: 'sdfj3j4k3j4k3j'
    };

    const userData = { username: 'test', password: 'test' };

    service.registerUser(userData).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse);
  });

});
