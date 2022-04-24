import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StudentTableComponent} from "./student-table/student-table.component";


const routes: Routes = [{
  path: "",
  component: StudentTableComponent
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class StudentsRoutingModule { }
