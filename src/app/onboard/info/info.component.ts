import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styles: [
    '#onboardinfowin { border: 3px solid red; }',
  ]
})
export class InfoComponent {
  @Input() showme: boolean = false;
  @Input() msg: any = {"message": "",status:200,statusText:"OK"};
}
