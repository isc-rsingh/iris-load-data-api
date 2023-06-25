import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-datatypes',
  templateUrl: './datatypes.component.html',
  styles: [
  ]
})
export class DatatypesComponent {
  datatypes = ["VARCHAR","BIGINT","BINARY","BIT","BLOB","CHAR","CHAR VARYING","CLOB","DATE","DATETIME","DECIMAL","DOUBLE","FLOAT","IMAGE","INT","LONG","LONG VARCHAR","LONGTEXT","MONEY","NCHAR","NTEXT","NUMERIC","POSIXTIME","REAL","ROWVERSION","SERIAL","SMALLDATETIME","SMALLINT","SMALLMONEY","SYSNAME","TEXT","TIME","TIMESTAMP","TINYINT","UNIQUEIDENTIFIER","VARBINARY"]
  @Input() defaultDatatype: string;
  @Output() datatypeDefined = new EventEmitter<any>();

  onDatatypeChanged(event: any) {
    console.log('in onDatatypeChanged');
    let goodval = event.target.value.split(':')[1].trim()
    console.log(goodval);
    this.datatypeDefined.emit(goodval);
  }
}
