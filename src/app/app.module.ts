import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { WaitComponent } from './wait/wait.component';
import { PopupmessageComponent } from './popupmessage/popupmessage.component';
import { LogindialogComponent } from './logindialog/logindialog.component';
import { TutorialComponent } from './tutorial/tutorial.component';
@NgModule({
  declarations: [
    AppComponent,
    WaitComponent,
    NavbarComponent,
    PopupmessageComponent,
    LogindialogComponent,
    TutorialComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
