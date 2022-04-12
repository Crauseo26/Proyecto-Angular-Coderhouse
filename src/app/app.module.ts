import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StudentTableComponent } from './components/content/student-table/student-table.component';
import {ContentComponent} from "./components/content/content.component";
import { AddStudentDialogComponent } from './components/content/add-student-dialog/add-student-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from '@angular/material/divider';
import { NavMenuComponent } from './components/nav/nav-menu/nav-menu.component';
import { TooltipDirective } from './shared/directives/tooltip.directive';
import { StudentDetailDialogComponent } from './components/content/student-detail-dialog/student-detail-dialog.component';
import {MatCardModule} from "@angular/material/card";
import {StudentEditDialogComponent} from "./components/content/student-edit-dialog/student-edit-dialog.component";
import { StudentNamesPipe } from './shared/pipes/student-names.pipe';
import { StudentRecognitionDirective } from './shared/directives/student-recognition.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StudentTableComponent,
    ContentComponent,
    AddStudentDialogComponent,
    NavMenuComponent,
    TooltipDirective,
    StudentDetailDialogComponent,
    StudentEditDialogComponent,
    StudentNamesPipe,
    StudentRecognitionDirective
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule, MatNativeDateModule,
        MatSelectModule,
        MatDividerModule,
        FormsModule, MatCardModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
