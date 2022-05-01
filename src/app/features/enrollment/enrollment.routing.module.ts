import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EnrollmentListComponent} from "./enrollment-list/enrollment-list.component";

const routes: Routes = [{
  path: '',
  component: EnrollmentListComponent
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EnrollmentRoutingModule { }
