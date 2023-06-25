import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sourcefile',
  templateUrl: './sourcefile.component.html',
  styles: [
    '.next-btn { align-self: flex-end; }',
    'label { font-size: 9pt; font-weight: 600; }',
  ]
})
export class SourcefileComponent {
  public fileOver: boolean = false;
  @Input() showme: boolean;
  @Input() sourcepath: string = ''
  @Output() pathDefined = new EventEmitter<string>();

  onSetPath() {
    this.pathDefined.emit(this.sourcepath);
    // TODO then expand format section
  }
  onPathChanged(event: any) {
    this.sourcepath = event.target.value;
  }
}
