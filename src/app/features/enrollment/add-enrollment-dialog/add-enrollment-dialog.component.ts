import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../shared/models/courses.model";
import {FormControl} from "@angular/forms";
import {mergeMap, ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {Student} from "../../../shared/models/student.model";
import {MatSelect} from "@angular/material/select";
import {StudentService} from "../../../shared/services/student.service";
import {EnrollmentService} from "../../../shared/services/enrollment.service";
import { Enrollment } from '../../../shared/models/enrollment.model';
import {CoursesService} from "../../../shared/services/courses.service";
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-add-enrollment-dialog',
  templateUrl: './add-enrollment-dialog.component.html',
  styleUrls: ['./add-enrollment-dialog.component.css']
})
export class AddEnrollmentDialogComponent implements OnInit, AfterViewInit {

  public students: Student[] = [];
  public studentSelect: FormControl = new FormControl();
  public studentFilterSelect: FormControl = new FormControl();
  public filteredStudents: ReplaySubject<Student[]> = new ReplaySubject<Student[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;
  protected _onDestroy = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Course,
              private studentService: StudentService,
              private dialogRef: MatDialogRef<AddEnrollmentDialogComponent>,
              private enrollmentService: EnrollmentService,
              private courseService: CoursesService) {
    this.studentService.get().subscribe(students =>{
      this.students = students;
    });

  }

  public ngOnInit(): void {
    // load the initial bank list
    this.filteredStudents.next(this.students.slice());

    // listen for search field value changes
    this.studentFilterSelect.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterStudents();
      });
  }

  public ngAfterViewInit(): void {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredStudents
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Student, b: Student) => a && b && a.id === b.id;
      });
  }

  private filterStudents(): void {
    if (!this.students) {
      return;
    }
    // get the search keyword
    let search = this.studentFilterSelect.value;
    if (!search) {
      this.filteredStudents.next(this.students.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredStudents.next(
      this.students.filter(student => student.firstName.toLowerCase().indexOf(search) > -1)
    );

  }

  public onSubmit(): void {
    const Enrollment: Enrollment = {
      id: 0,
      date: new Date(),
      Course: this.data,
      Student: this.studentSelect.value,
      status: 'Pending'
    }

    this.enrollmentService.create(Enrollment).subscribe(result =>{
      const updatedStudent = this.updateStudent();
      this.studentService.update(updatedStudent).subscribe(result =>{
        const updatedCourse = this.updateCourse();
        this.courseService.update(updatedCourse).subscribe(result =>{
          this.dialogRef.close(this.updateStudent());
        })
      })
    });
  }

  public onBack(): void{
    this.dialogRef.close(null);
  }

  private updateStudent(): Student {
    let updatedStudent = cloneDeep(this.studentSelect.value);
    updatedStudent.Courses.push(this.data);
    return updatedStudent;

  }

  private updateCourse(): Course {
    let updatedCourse = cloneDeep(this.data);
    updatedCourse.students.push(this.studentSelect.value);
    return updatedCourse;
  }

  private onSuccessEnrollment(): void {
    this.updateStudent();
    this.updateCourse();

  }
}
