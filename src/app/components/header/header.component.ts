import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  username!: string;

  constructor(private readonly cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Username to be fetched after logging
    this.username = 'User';
    this.cd.markForCheck();
  }

  onLogOut() {
    this.onClose.emit();
    this.cd.markForCheck();
  }
}
