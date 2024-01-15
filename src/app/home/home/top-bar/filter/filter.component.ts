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

  // @Output() dateSelected: EventEmitter<string> = new EventEmitter<string>();

  // ondateChange() {
  //   this.dateSelected.emit(this.date);
  //   console.log(this.date);
  // }

  onPermissionChange() {
    this.permissionSelected.emit(this.selectedPermission);
    console.log(this.selectedPermission);
  }
  // assignDate(date: any) {
  //   this.date = this.formatMediumDate(date.value);
  //   console.log(this.date);
  // }

  // formatMediumDate(date: Date): string {
  //   const options: Intl.DateTimeFormatOptions = {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   };

  //   return date.toLocaleDateString('en-US', options);
  // }
}

