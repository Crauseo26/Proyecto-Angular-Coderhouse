import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from "../../../shared/services/courses.service";
import {Course} from "../../../shared/models/courses.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LecturesDetailsComponent} from "../lectures-details/lectures-details.component";
import {CoursesEditDialogComponent} from "../courses-edit-dialog/courses-edit-dialog.component";
import {DeleteWarningDialogComponent} from "../../../shared/delete-warning-dialog/delete-warning-dialog.component";
import {AddCoursesDialogComponent} from "../add-courses-dialog/add-courses-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

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
export class CoursesListComponent implements OnInit {
  public columnsToDisplay = ['name', 'teacher', 'startPeriod', 'actions'];
  public expandedRow: Course | null = null;
  public dataSource!: MatTableDataSource<Course>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private courseService: CoursesService, private dialogRef: MatDialog) {
    this.initialize();
  }

  public ngOnInit(): void {  }

  private initialize(): void {
    this.courseService.get().subscribe(result =>{
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;

    });
  }

  public ngAfterViewInit(): void {

  }

  public filterTable(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
        let updatedCourse: Course = course;
        updatedCourse.name = result.name;
        updatedCourse.description = result.description;
        updatedCourse.startPeriod = result.startPeriod;
        updatedCourse.endPeriod = result.endPeriod;
        updatedCourse.capacity = result.capacity;
        this.updateCourse(updatedCourse);
      }
    });
  }

  private updateCourse(updatedCourse: Course): void {
    this.courseService.update(updatedCourse).subscribe(result => {
      this.initialize();
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
          this.initialize();
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
        this.initialize();
      });
    });
  }
}

