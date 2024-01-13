import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search: string = '';

  @Output() searchEventEmitter = new EventEmitter<string>();

  emitSearch() {
    this.searchEventEmitter.emit(this.search);
    // console.log(this.search)
  }
}
