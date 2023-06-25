import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fieldmap',
  templateUrl: './fieldmap.component.html',
  styles: [
  ]
})
export class FieldmapComponent {
  @Input() field: any;
  @Output() fieldChanged = new EventEmitter<any>();

  onDestinationNameChanged(event: any) {
    this.field.destname = event.target.value;
    this.onFieldChanged();
  }
  onDatatypeChanged(event: any) {
    this.field.destdatatype = event;
    this.onFieldChanged();
  }
  onLengthChanged(event: any) {
    this.field.length = event.target.value;
    this.onFieldChanged();
  }
  onFieldChanged() {
    this.fieldChanged.emit(
      this.field
    );
  }
}
