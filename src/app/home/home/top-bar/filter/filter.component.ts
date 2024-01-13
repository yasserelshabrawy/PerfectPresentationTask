import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  selectedPermission: string = 'all';

  @Output() permissionSelected: EventEmitter<string> =
    new EventEmitter<string>();

  onPermissionChange() {
    this.permissionSelected.emit(this.selectedPermission);
    console.log(this.selectedPermission)
  }
}
