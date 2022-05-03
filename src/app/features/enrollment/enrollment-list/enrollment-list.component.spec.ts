import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { EnrollmentListComponent } from './enrollment-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EnrollmentListComponent', () => {
  let component: EnrollmentListComponent;
  let fixture: ComponentFixture<EnrollmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentListComponent],
      imports: [HttpClientTestingModule, MaterialModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(EnrollmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have Columns to Display', () => {
    fixture = TestBed.createComponent(EnrollmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.columnsToDisplay.length).toBeGreaterThan(0);
  });

  it('should render Table', () => {
    fixture = TestBed.createComponent(EnrollmentListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should render No. Column', () => {
    fixture = TestBed.createComponent(EnrollmentListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('th')?.textContent).toContain('No.');
  });


});
