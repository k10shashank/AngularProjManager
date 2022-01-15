import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username!: string;

  ngOnInit(): void {
    // Username to be fetched after logging
    this.username = 'User';
  }
}
