import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../serivces/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'landing-sidebar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly route = inject(Router);
  private readonly authService = inject(AuthService);

  navItems = [
    {
      label: 'EMS',
      route: 'ems',
      icon: 'fa-regular fa-chart-bar',
      title: 'Employee Management System',
    },
    {
      label: 'LMS',
      route: 'lms',
      icon: 'fa-regular fa-chart-bar',
      title: 'Leave Management System',
    },
    {
      label: 'TMS',
      route: 'tms',
      icon: 'fa-regular fa-clock',
      title: 'Timesheet Management System',
    },
    {
      label: 'RRF',
      route: 'rrf',
      icon: 'fa-regular fa-clock',
      title: 'Resource Requisition System',
    },
    {
      label: 'PMS',
      route: 'pm',
      icon: 'fa-regular fa-chart-bar',
      title: 'Project Management System',
    },
    {
      label: 'ORG',
      route: 'orgchart',
      icon: 'fa-regular fa-chart-bar',
      title: 'Organisation Chart',
    },
  ];

  navigate(item: any) {
    if (!item || !item.route) return;

    this.route.navigate([item.route]);
  }
}
