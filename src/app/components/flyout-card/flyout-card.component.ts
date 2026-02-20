import { Component, HostListener, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'landing-flyout-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flyout-card.component.html',
  styleUrl: './flyout-card.component.scss'
})
export class FlyoutCardComponent {
  @Input() open = false;
  @Input() content!: TemplateRef<any>;

  @HostListener('click', ['$event'])
  stopClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
