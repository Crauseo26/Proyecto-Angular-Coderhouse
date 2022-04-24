import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NavComponent} from "./nav/nav.component";
import {NavMenuComponent} from "./nav/nav-menu/nav-menu.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    NavComponent,
    NavMenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    NavComponent,
    NavMenuComponent
  ]
})
export class NavigationModule { }
