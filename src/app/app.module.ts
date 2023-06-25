import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OnboardComponent } from './onboard/onboard.component';
import { SourcefileComponent } from './onboard/sourcefile/sourcefile.component';
import { FormatComponent } from './onboard/format/format.component';
import { TargetComponent } from './onboard/target/target.component';
import { FieldsComponent } from './onboard/fields/fields.component';
import { HeaderComponent } from './header/header.component';
import { FieldmapComponent } from './onboard/fields/fieldmap/fieldmap.component';
import { DatatypesComponent } from './onboard/fields/fieldmap/datatypes/datatypes.component';
import { DatapreviewComponent } from './datapreview/datapreview.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OnboardComponent,
    SourcefileComponent,
    FormatComponent,
    TargetComponent,
    FieldsComponent,
    HeaderComponent,
    FieldmapComponent,
    DatatypesComponent,
    DatapreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
