import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  pos = "end";
  constructor(private apiService: ApiService,
  ) { }

  navBarCommand(command: string) {
    this.apiService.zzMess("Command is:" + command, "Command button clicked", "Go on");
  }
}
