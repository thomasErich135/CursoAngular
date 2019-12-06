import {  Directive, HostListener, HostBinding,
  ElementRef, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseOver(){
    //this._renderer.setElementStyle(this._elementRef.nativeElement, 'background-color','yellow')
    this.backgroundColor = this.hightlightColor;
  }

  @HostListener('mouseleave') onMouseLeave(){
    //this._renderer.setElementStyle(this._elementRef.nativeElement, 'background-color','white')
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor: string;

  @Input() defaultColor: string = 'white';
  @Input('highlight') hightlightColor: string = 'yellow'

  constructor(//private _elementRef: ElementRef,
    //private _renderer: Renderer) {
    ){

     }

     ngOnInit() {
        this.backgroundColor = this.defaultColor;
     }
}
