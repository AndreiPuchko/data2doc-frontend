import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  pos="start";
  constructor() {}

  navBarCommand(command:string){
    // if (this.pos=="start") {this.pos="end"}
    
    alert("Command is:"+command);
    // this.zzMess("Command is:"+command,"Not enough data!","Go on");
  }
}
