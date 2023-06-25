import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styles: [
    'label { font-size: 9pt; font-weight: 600; }',
  ]
})
export class FieldsComponent {
  @Input() showme: boolean;
  @Input() fields: any;
  @Output() fieldsChanged = new EventEmitter<any>();
  @Output() fieldsDone = new EventEmitter<any>();

  // ngOnChanges() {
  //   console.log('in ngOnChanges');
  // }
  onFieldChanged(field: any) {
    // console.log('field map got field changes');
    // console.log(field);
    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].srcname === field.srcname) {
        if ("destname" in field) {
          this.fields[i].destname = field.destname;
        }
        if ("destdatatype" in field) {
          this.fields[i].destdatatype = field.destdatatype;
        }
      }
    }
    this.fieldsChanged.emit(this.fields);
  }
  onLoadData() {
    this.fieldsDone.emit(this.fields);
  }
}
