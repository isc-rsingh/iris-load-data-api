import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datapreview',
  templateUrl: './datapreview.component.html',
  styles: [
    '#datapreview { color: #bbb; background-color: #444; height: 800px; margin-left: 0px;}',
    '#previewwin { height: 95%; }',
    '#datapreview pre { font-size: 9pt; overflow-y: auto; scrollbar-color: #222 #000; scrollbar-width: thin; max-height: 100%; }',
  ]
})
export class DatapreviewComponent {
  @Input() config: any;
}
