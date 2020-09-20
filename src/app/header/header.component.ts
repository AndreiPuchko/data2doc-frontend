import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Add these three lines above the constructor entry.
  showBackButton: boolean;
  currentTitle: string;
  showHistoryNav: boolean;

  constructor()  {}

  ngOnInit(): void {
  }

}

