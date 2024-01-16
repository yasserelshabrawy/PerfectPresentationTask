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

  @Output() permissionSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateSelecter: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateChange: EventEmitter<string> = new EventEmitter<string>();


  onDateChange() {
    this.dateSelecter.emit(this.date);
  }


  onFilterOptionChange() {
    this.dateChange.emit(this.selectedOption);
  }

  onPermissionChange() {
    this.permissionSelected.emit(this.selectedPermission);
  }
  
}
