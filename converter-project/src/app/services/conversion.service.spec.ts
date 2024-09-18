import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ConversionService } from './conversion.service';
import { provideHttpClient } from '@angular/common/http';

describe('ConversionService', () => {
  let service: ConversionService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversionService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ConversionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Convert tests
  it('should successfully convert pounds to kilograms', () => {
    const mockResponse = {
      original_value: 10,
      original_unit: 'pounds',
      converted_value: 4.53592,
      converted_unit: 'kilograms'
    };
  
    service.convert(10, 'pounds', 'kilograms').subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${apiUrl}/convert`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
  
  it('should return an error for unsupported conversion (pounds to kilometers)', () => {
    service.convert(10, 'pounds', 'kilometers').subscribe(
      () => fail('expected an error'),
      error => {
        expect(error).toBe('Failed to convert units. Please check your input and try again.');
      }
    );
  
    const req = httpMock.expectOne(`${apiUrl}/convert`);
    expect(req.request.method).toBe('POST');
    req.flush({ error: 'Conversion not supported' }, { status: 400, statusText: 'Bad Request' });
  });

  // Add tests
  it('should successfully add pounds and kilograms', () => {
    const mockResponse = {
      value1: 5,
      unit1: 'pounds',
      value2: 1,
      unit2: 'kilograms',
      total_value_in_unit1: 7.20462
    };
  
    service.add(5, 'pounds', 1, 'kilograms').subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${apiUrl}/add`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
  
  it('should return an error when adding unsupported units', () => {
    service.add(5, 'pounds', 1, 'miles').subscribe(
      () => fail('expected an error'),
      error => {
        expect(error).toBe('Failed to add units. Please check your input and try again.');
      }
    );
  
    const req = httpMock.expectOne(`${apiUrl}/add`);
    expect(req.request.method).toBe('POST');
    req.flush({ error: 'Conversion not supported for addition' }, { status: 400, statusText: 'Bad Request' });
  });

  // Subtract tests
  it('should successfully subtract kilograms from pounds', () => {
    const mockResponse = {
      value1: 10,
      unit1: 'pounds',
      value2: 1,
      unit2: 'kilograms',
      result_in_unit1: 7.79538
    };
  
    service.subtract(10, 'pounds', 1, 'kilograms').subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${apiUrl}/subtract`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
  
  it('should return an error when subtracting unsupported units', () => {
    service.subtract(5, 'pounds', 1, 'miles').subscribe(
      () => fail('expected an error'),
      error => {
        expect(error).toBe('Failed to subtract units. Please check your input and try again.');
      }
    );
  
    const req = httpMock.expectOne(`${apiUrl}/subtract`);
    expect(req.request.method).toBe('POST');
    req.flush({ error: 'Conversion not supported for subtraction' }, { status: 400, statusText: 'Bad Request' });
  });
  
});
