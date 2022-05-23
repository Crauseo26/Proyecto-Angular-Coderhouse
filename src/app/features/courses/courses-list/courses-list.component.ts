import {Component, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {CoursesService} from "../../../shared/services/courses.service";
import {Course} from "../../../shared/models/courses.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {LecturesDetailsComponent} from "../lectures-details/lectures-details.component";
import {CoursesEditDialogComponent} from "../courses-edit-dialog/courses-edit-dialog.component";
import {DeleteWarningDialogComponent} from "../../../shared/delete-warning-dialog/delete-warning-dialog.component";
import {AddCoursesDialogComponent} from "../add-courses-dialog/add-courses-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentService} from "../../../shared/services/student.service";
import {EnrollmentService} from "../../../shared/services/enrollment.service";
import {Student} from "../../../shared/models/student.model";
import {AuthenticationService} from "../../../core/auth/services/authentication.service";
import {AppState} from "../../../shared/state/app.state";
import {Store} from "@ngrx/store";
import {loadCourses, loadedCourses} from "../../../shared/state/actions/courses.actions";
import {coursesSelector} from "../../../shared/state/selectors/courses.selector";
import {activeSessionSelector} from "../../../shared/state/selectors/login.selector";
import {Subscription} from "rxjs";
import {EnrollmentListComponent} from "../../enrollment/enrollment-list/enrollment-list.component";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnChanges {
  public columnsToDisplay = ['name', 'teacher', 'startPeriod', 'actions'];
  public expandedRow: Course | null = null;
  public dataSource!: MatTableDataSource<Course>;
  public coursesSubscription = new Subscription();
  public isLoading = false;
  public isAdmin = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private courseService: CoursesService,
              private dialogRef: MatDialog,
              private studentService: StudentService,
              private enrollmentService: EnrollmentService,
              private authService: AuthenticationService,
              private store: Store<AppState>) {
    this.getCoursesData();
    this.store.select(activeSessionSelector).subscribe(session =>{
      this.isAdmin = session.currentUser.isAdmin;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.getCoursesData();
  }

  private getCoursesData(): void {
    this.store.dispatch(loadCourses());
    this.dataSource = new MatTableDataSource<Course>(undefined);
    this.store.select(coursesSelector).subscribe(state =>{
      this.isLoading = state.isLoading;
    });

    this.coursesSubscription = this.courseService.get().subscribe(courses =>{
      this.store.dispatch(loadedCourses({courses: courses}));
      this.setCoursesData();
    });
  }

  private setCoursesData(): void {
    this.store.select(coursesSelector).subscribe(state =>{
      this.dataSource = new MatTableDataSource<Course>(state.courses);
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public filterTable(filter: string): void {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  public onLectureDetail(element: Course):void {
    const detailDialog = this.dialogRef.open(LecturesDetailsComponent, {
      data: element.lectures,
      width: '70rem'
    });
  }

  public onEditCourse(course: Course): void {
    const editDialog = this.dialogRef.open(CoursesEditDialogComponent, {
      data: course,
      width: '40rem'
    });

    editDialog.afterClosed().subscribe(result => {
      if(result){
        let updatedCourse: Course = {
          id: course.id,
          name: result.name,
          description:  result.description,
          startPeriod: result.startPeriod,
          endPeriod: result.endPeriod,
          capacity: result.capacity,
          teacher: course.teacher,
          students: course.students,
          lectures: course.lectures
        }
        this.updateCourse(updatedCourse);
      }
    });
  }

  private updateCourse(updatedCourse: Course): void {
    this.courseService.update(updatedCourse).subscribe(result => {
      this.getCoursesData();

    });
  }

  public onDeleteCourse(selectedCourse: Course): void {

    const deleteDialog = this.dialogRef.open(DeleteWarningDialogComponent, {
      width: '25rem',
      height: '10rem',
      data: 'course'
    })

    deleteDialog.afterClosed().subscribe(result=>{
      if(result){
        this.courseService.delete(selectedCourse.id).subscribe(result =>{
          this.getCoursesData();
        });
      }
    });
  }

  public onAddCourse(): void {
    const addCourseDialog = this.dialogRef.open(AddCoursesDialogComponent, {
      minWidth: '30rem'
    });

    addCourseDialog.afterClosed().subscribe(result => {
      let newCourse: Course = {
        id: 0,
        name: result.name,
        description: result.description,
        startPeriod: result.startPeriod,
        endPeriod: result.endPeriod,
        capacity: result.capacity,
        teacher: undefined,
        lectures: [],
        students: [],
      }
      this.courseService.create(newCourse).subscribe(result =>{
        this.getCoursesData();

      });
    });
  }

  public onEnrollment(course: Course): void {
    const enrollmentDialog = this.dialogRef.open(EnrollmentListComponent, {
      width: '70rem',
      maxHeight: '50rem',
      data: course,
      autoFocus: false
    });

    enrollmentDialog.afterClosed().subscribe(result => this.getCoursesData());
  }

  private onEnrollmentSuccess(course: Course) {
    this.courseService.update(course).subscribe(result =>{
      this.getCoursesData();
    })

  }

}

