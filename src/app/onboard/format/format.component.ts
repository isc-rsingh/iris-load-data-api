import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styles: [
    'label { font-size: 9pt; font-weight: 600; }',
  ]
})
export class FormatComponent {
  public isdelimited = true;
  public delimiter = ',';
  public escapechar = '\\';
  public quotechar = '"';
  public textencoding = 'utf-8';
  public header:boolean = true;
  public skip:number = 0;
  @Input() showme;
  @Output() formatDefined = new EventEmitter<any>();

  constructor() { }

  onFormatChanged(event: any) {
    this.formatDefined.emit({
      "delimiter": this.delimiter,
      "escapechar": this.escapechar,
      "quotechar": this.quotechar,
      "textencoding": this.textencoding,
      "header": this.header,
      "skip": this.skip
    });
  }
}
