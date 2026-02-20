import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'landing-hostloader',
  imports: [CommonModule],
  templateUrl: './hostloader.component.html',
  styleUrl: './hostloader.component.scss'
})
export class HostloaderComponent {
  @Input() loading = false;

}
