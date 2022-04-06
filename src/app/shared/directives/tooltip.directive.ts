import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[appTooltip]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tooltip.directive.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TooltipDirective implements AfterViewInit{

  @Input() appTooltip = '';
  @Input() appTooltipPosition = 'right';
  private bodyElement!: HTMLBodyElement;
  private tooltipElement!: any;
  private readonly tooltipHalfHeight = 12;
  private readonly  tooltipArrowHeight= 5;
  private readonly paddingWidth = 24;


  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngAfterViewInit(): void {
    this.bodyElement = document.getElementsByTagName('body')[0];
    this.element.nativeElement.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.element.nativeElement.addEventListener('mouseleave', this.onMouseExit.bind(this));
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipElement, 'tooltip-arrow-' + this.appTooltipPosition);
    this.tooltipElement.style.visibility = 'hidden';
    this.renderer.addClass(this.tooltipElement, 'tooltip-text');
    this.tooltipElement.style.top = 0;
    this.tooltipElement.style.left = 0;
    this.renderer.appendChild(this.bodyElement, this.tooltipElement);
  }

  public onMouseEnter() {
    this.tooltipElement.textContent = this.appTooltip;
    const boundries = this.element.nativeElement.getBoundingClientRect();
    const screenResolution = window.screen.availWidth;
    if (this.appTooltipPosition === 'right') {
      this.tooltipElement.style.top = boundries.top + this.element.nativeElement.clientHeight / 2 - this.tooltipHalfHeight + 'px';
      this.tooltipElement.style.left = boundries.left + this.element.nativeElement.clientWidth + 'px';
    } else if (this.appTooltipPosition === 'bottom') {
      this.tooltipElement.style.top = boundries.top + this.element.nativeElement.clientHeight + this.tooltipArrowHeight + 'px';
      if (screenResolution > boundries.left + this.tooltipElement.clientWidth + 10) {
        this.tooltipElement.style.left = boundries.left + 'px';
        this.renderer.removeClass(this.tooltipElement, 'tooltip-arrow-bottom-right');
      } else {
        this.tooltipElement.style.left = boundries.left - this.tooltipElement.clientWidth + this.paddingWidth + 'px';
        this.renderer.addClass(this.tooltipElement, 'tooltip-arrow-bottom-right');
      }
    } else {
      this.tooltipElement.style.top = boundries.top - this.tooltipHalfHeight + 'px';
      this.tooltipElement.style.left = boundries.left + 'px';
    }
    this.tooltipElement.style.visibility = 'visible';
  }

  public onMouseExit() {
    this.tooltipElement.style.visibility = 'hidden';
  }

}
