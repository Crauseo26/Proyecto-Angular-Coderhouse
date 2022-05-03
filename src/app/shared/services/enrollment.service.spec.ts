import {inject, TestBed} from '@angular/core/testing';

import { EnrollmentService } from './enrollment.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MOCK_API_BASE_ROUTE} from "../constants/API.services";

describe('EnrollmentService', () => {
  let service: EnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnrollmentService]
    });
    service = TestBed.inject(EnrollmentService);
  });

  describe('Enrollment Service', () => {
    it('should get enrollment list',
      inject(
        [HttpTestingController, EnrollmentService],
        (httpMock: HttpTestingController, EnrollmentService: EnrollmentService) => {
          EnrollmentService.get().subscribe(enrollments => {
            console.log(enrollments);
            expect(enrollments.length).toBeGreaterThan(0);
          });

          const request = httpMock.expectOne({
            method: 'GET',
            url: `${MOCK_API_BASE_ROUTE}/Enrollment`
          });
          request.flush({});
        }),
    )


  })

});
