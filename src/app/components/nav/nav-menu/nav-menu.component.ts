import {Component, OnInit, Output} from '@angular/core';
import {ContentRendererService} from "../../../shared/services/content-renderer.service";

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
    {icon: 'school', label: 'Students'},
    {icon: 'class', label: 'Courses'},
    {icon: 'event_available', label: 'Lectures'},
  ]

  constructor(private contentRendererService: ContentRendererService) { }

  ngOnInit(): void {
  }

  public onMenuOptionSelected(selectedOption: string): void{
    this.contentRendererService.setActiveContent(selectedOption);
  }

}
