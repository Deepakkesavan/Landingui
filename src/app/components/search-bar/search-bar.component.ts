import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'landing-search-bar',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchText = '';

  @Output() search = new EventEmitter<string>();

  onInput() {
    this.search.emit(this.searchText);
  }
}
