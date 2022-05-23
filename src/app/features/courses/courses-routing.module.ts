import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {AuthorizationGuard} from "../../core/auth/services/authorization.guard";

const routes: Routes = [
  {
  path: "",
  component: CoursesListComponent
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class CoursesRoutingModule { }
