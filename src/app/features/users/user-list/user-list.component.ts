import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../../../shared/services/users.service";
import {User} from "../../../shared/models/user.model";
import {activeSessionSelector} from "../../../shared/state/selectors/users.selector";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/state/app.state";
import {Subscription} from "rxjs";
import {loadedUsers, loadUsers} from "../../../shared/state/actions/user.action";
import {loadUsersSelector, usersListSelector, usersSelector} from "../../../shared/state/selectors/session.selector";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {DeleteWarningDialogComponent} from "../../../shared/delete-warning-dialog/delete-warning-dialog.component";
import {Student} from "../../../shared/models/student.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  public columnsToDisplay: string[] = [
    'username',
    'isAdmin',
    'actions',
  ];
  public dataSource!: MatTableDataSource<User>;
  public isAdmin = false;
  public isLoading= false;
  public usersSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService,
              private store: Store<AppState>,
              private matDialogRef: MatDialog,
              private snackBar: MatSnackBar,) {
    this.store.select(activeSessionSelector).subscribe(session =>{
      this.isAdmin = session.currentUser.isAdmin;
    });
    this.getUsersData();
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  public filterTable(filter: string): void {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  private getUsersData(): void {
    this.store.dispatch(loadUsers());
    this.store.select(loadUsersSelector).subscribe( isLoading =>{
      this.isLoading = isLoading;
      this.dataSource = new MatTableDataSource<User>(undefined);
    })
    this.setUsersData();
  }

  private setUsersData(): void {
    this.store.select(usersListSelector).subscribe(users =>{
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public onAddUser(): void {
    const addUserDialog = this.matDialogRef.open(AddUserDialogComponent, {
      maxWidth: '45rem',
      maxHeight: '25rem',
      autoFocus: false
    });

    addUserDialog.afterClosed().subscribe(userAdded =>{
      this.usersSubscription = this.userService.create(userAdded).subscribe(result =>{
        this.snackBar.open('User created successfully ✔', 'close', {verticalPosition: "top", duration: 1000, horizontalPosition: 'center'})
        this.getUsersData();
      })
    })

  }

  public onUserDelete(userId: number): void {

    const deleteWarningDialog = this.matDialogRef.open(DeleteWarningDialogComponent, {
      width: '25rem',
      height: '10rem',
      data: 'User'
    })

    deleteWarningDialog.afterClosed().subscribe(result=>{
      if(result){
        this.usersSubscription =  this.userService.delete(userId).subscribe(result =>{
          this.snackBar.open('User deleted successfully ✔', 'close', {verticalPosition: "top", duration: 1000, horizontalPosition: 'center'})
          this.getUsersData();
        });
      }
    });
  }

  public onEditUser(user: User) {

    const editUserDialog = this.matDialogRef.open(EditUserDialogComponent, {
      maxWidth: '45rem',
      maxHeight: '25rem',
      autoFocus: false,
      data: user
    });

    editUserDialog.afterClosed().subscribe(userUpdated =>{
      if(userUpdated){
        this.usersSubscription = this.userService.update(userUpdated).subscribe(result =>{
          this.snackBar.open('User updated successfully ✔', 'close', {verticalPosition: "top", duration: 1000, horizontalPosition: 'center'})
          this.getUsersData();
        });
      }
    });
  }
}
