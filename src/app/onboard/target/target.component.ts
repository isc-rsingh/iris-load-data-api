import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styles: [
    'label { font-size: 9pt; font-weight: 600; }',
  ]
})
export class TargetComponent {
  @Input() tablename;
  @Input() showme;
  @Output() nameDefined = new EventEmitter<string>();

  onSetName() {
    this.nameDefined.emit(this.tablename);
  }
  onNameChanged(event: any) {
    this.tablename = event.target.value;
  }
}
