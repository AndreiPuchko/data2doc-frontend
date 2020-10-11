import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { WaitComponent } from './wait/wait.component';
import { PopupmessageComponent } from './popupmessage/popupmessage.component';

@NgModule({
  declarations: [
    AppComponent,
    WaitComponent,
    NavbarComponent,
    PopupmessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    // LayoutModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
