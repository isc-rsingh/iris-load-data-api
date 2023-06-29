import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styles: [
  ]
})
export class OnboardComponent {
  config:any = {
    "from":
    {
      "file": {
        "header": true,
        "skip": 0,
        "columnseparator": ","
      },
      "filepath": "/Users/rsingh/Downloads/dataexport.csv"
    },
    "tablename": 'SQLUser.newtable',
    "verbose": 0
  };
  infoMessage: any = {"message": "",status:200,statusText:"OK"};
  showSource = true;
  showFormat = false;
  showDestination = false;
  showFields = false;
  showInfo = false;

  constructor(private http: HttpClient) { }

  onFilePathChanged(filepath: string) {
    this.config.from.filepath = filepath;
    // set table name to file name
    let fps = [];
    if (filepath.indexOf('/') > -1) { // unix or Mac
      fps = filepath.split('/');
    } else { // windows
      fps = filepath.split('\\');
    }
    let fp = fps[fps.length - 1];
    this.config.tablename = 'SQLUser.' + fp.split('.')[0];
    this.showSource = false; // collapse this section
    this.showFormat = true; // open up the format component
  }
  onFormatChanged(format: any) {
    // console.log('onboard.onFormatChanged columnseparator: ' + format.delimiter);
    this.config.from.file.columnseparator = format.delimiter;
    if (this.config.from.file.columnseparator == 't')
      this.config.from.file.columnseparator = '\t';

    // this.config.from.file.header = format.header=='true' ? true : false
    this.config.from.file.header = format.header;
    this.config.from.file.skip = format.skip;
    this.config.charset = format.textencoding;
    this.showFormat = false; // collapse the format component
    this.showDestination = true; // open up the destination component
  }
  onTableNameChanged(tablename: string) {
    this.config.tablename = tablename;
    console.log('POSTING: ')
    console.log(this.config);
    this.http.post(environment.dbURL+'/columns', this.config).subscribe((data: any) => {
      this.config = Object.assign(this.config, data);
      this.showDestination = false; // collapse the destination component
      this.showFields = true; // open up the fields component
    });
  }

  onFieldsChanged(newfields: any) {
    this.config.fields = newfields;
    // console.log('onboard.onFieldsChanged');
    // console.log(this.config.fields);
  }

  onLoadData(event: any) {
    console.log('onLoadData');
    console.log(this.config);
    this.http.post(environment.dbURL+'/createtable', this.config)
      .subscribe({
          next: (data: any) => {
            console.log("Create table response.");
            console.log(data);
            this.http.post(environment.dbURL+'/load', this.config).subscribe({
              next: (data: any) => {
              console.log("Load data response.");
              console.log(data);
              },
              error: (err) => {
                this.handleError(err);
              }
            });
          },
          error: (err) => {
            this.handleError(err);
          }
    });
  }

  handleError(err: any) {
    this.infoMessage = {
      "message": "ERROR: " + err.error.error,
      "status": err.status,
      "statusText": err.statusText
    }
    this.showInfo = true;
  }
}
