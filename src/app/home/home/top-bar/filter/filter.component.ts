import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  date!: any;
  selectedPermission: string = 'all';
  selectedOption: string = 'all';

  @Output() permissionSelected: EventEmitter<string> =
    new EventEmitter<string>();

  @Output() dateSelecter: EventEmitter<string> = new EventEmitter<string>();
  onDateChange() {
    this.dateSelecter.emit(this.date);
    console.log(this.date);
  }

  onPermissionChange() {
    this.permissionSelected.emit(this.selectedPermission);
    console.log(this.selectedPermission);
  }
}
