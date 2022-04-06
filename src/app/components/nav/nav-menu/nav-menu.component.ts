import { Component, OnInit } from '@angular/core';

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

  public labelOption!: string

  public menuOptions: menuOption[] = [
    {icon: 'school', label: 'Students'},
    {icon: 'class', label: 'Courses'},
    {icon: 'event_available', label: 'Lectures'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public onMenuOptionsHover(option: string): void{
    this.labelOption = option;
  }

  public resetLabel(): void{
    this.labelOption = '';
  }

}
