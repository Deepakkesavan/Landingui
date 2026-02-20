import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModuleCardComponent } from '../../components/module-card/module-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AuthService } from '../../serivces/auth.service';
import { ModuleItem } from '../../models/layout.model';
import { ModuleDescription } from '../../constants/app.constant';

@Component({
  selector: 'landing-home',
  imports: [
    FormsModule,
    CommonModule,
    ModuleCardComponent,
    SearchBarComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  searchText = '';

  modules: ModuleItem[] = ModuleDescription

  onSearch(value: string) {
    this.searchText = value.toLowerCase();
  }
  get filteredModules() {
    return this.modules.filter(
      (m) =>
        m.title.toLowerCase().includes(this.searchText) ||
        m.description.toLowerCase().includes(this.searchText) ||
        m.actionLabel.toLowerCase().includes(this.searchText)
    );
  }
}
