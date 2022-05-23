import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Enrollment} from "../../../shared/models/enrollment.model";
import {Student} from "../../../shared/models/student.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../../../shared/services/users.service";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public columnsToDisplay: string[];
  public dataSource!: MatTableDataSource<User>;
  public loggedStudent!: Student;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService) {
    this.columnsToDisplay = [
      'username',
      'isAdmin',
      'actions',
    ];
    this.Initialize();
  }

  ngOnInit(): void {
  }

  private Initialize(): void {
    this.userService.get().subscribe(result =>{
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }
}
