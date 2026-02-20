import { Component, Input } from '@angular/core';
import { ModuleItem } from '../../models/layout.model';
import { Router } from '@angular/router';
import { LayoutStateService } from '../../serivces/layout-state.service';

@Component({
  selector: 'landing-module-card',
  imports: [],
  standalone: true,
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.scss',
})
export class ModuleCardComponent {
  @Input() module!: ModuleItem;

  constructor(private router: Router, private layoutState: LayoutStateService) {}

  navigate() {
    this.layoutState.selectModule(this.module.url);
    this.router.navigate([this.module.url]);
  }
}
