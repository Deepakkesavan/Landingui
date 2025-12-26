import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-header',
  imports: [],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  name = input<string>('');
  greeting = input<string>('');

  private readonly route = inject(Router);

  goToOverview() {
    this.route.navigate(['/overview']);
  }
}
