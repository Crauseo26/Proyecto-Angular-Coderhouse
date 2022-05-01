import {Component, OnInit} from '@angular/core';

interface menuOption {
  icon: string,
  label: string
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public menuOptions: menuOption[] = [
    {icon: 'home', label: 'Home'},
    {icon: 'school', label: 'Students'},
    {icon: 'class', label: 'Courses'},
    {icon: 'playlist_add_check', label: 'Enrollment'},

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
