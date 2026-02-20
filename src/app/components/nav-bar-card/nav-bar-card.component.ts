import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../../models/layout.model';

@Component({
  selector: 'landing-nav-bar-card',
  imports: [],
  templateUrl: './nav-bar-card.component.html',
  styleUrl: './nav-bar-card.component.scss'
})
export class NavBarCardComponent {
  @Input() module!: NavItem;

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate([this.module.route]);
  }
}
