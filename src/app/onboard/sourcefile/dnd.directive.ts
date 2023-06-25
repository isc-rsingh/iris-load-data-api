import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[fileDnd]'
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver: boolean = false;

  constructor() { }

}
