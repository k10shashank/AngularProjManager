import { Component, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() username = '';
  @Output() onClose = new EventEmitter();

  constructor(private readonly cd: ChangeDetectorRef) { }

  onLogOut() {
    this.onClose.emit();
    this.cd.markForCheck();
  }
}
