import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../serivces/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../models/dashboard.model';

@Component({
  selector: 'landing-overview',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);
  username = '';
  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        // if()
        this.username = response.givenName ?? '';
      },
    });
  }
  searchText = '';

  cards = [
    {
      imageUrl: 'assets/lms-bg.jpg',
      title: 'Employee Management System',
      description:
        'View and update employee profiles, roles, and essential information.',
      buttonText: 'Open EMS',
      url: 'ems',
    },
    {
      imageUrl: 'assets/lms-bg.jpg',
      title: 'Leave Management System',
      description:
        'Apply for leaves, track leave balances, and view your leave history.',
      buttonText: 'Open LMS',
      url: 'lms',
    },
    {
      imageUrl: 'assets/timesheet-bg.jpg',
      title: 'Timesheet',
      description:
        'Log daily work hours, submit timesheets, and monitor approvals.',
      buttonText: 'Submit Timesheet',
      url: 'tms',
    },
    {
      imageUrl: 'assets/resources-bg.jpg',
      title: 'Resource Requisition',
      description:
        'Raise requests and view scheduled interviews for resource needs.',
      buttonText: 'Schedule',
      url: 'rrf',
    },
    {
      imageUrl: 'assets/project-management-bg.jpg',
      title: 'Project Management',
      description:
        'Plan and assign tasks, track project progress, and collaborate across teams.',
      buttonText: 'Manage Projects',
      url: 'pm',
    },
    {
      imageUrl: 'assets/announcements-bg.jpg',
      title: 'Org-Charts',
      description:
        'Explore organizational hierarchy and view employee profiles.',
      buttonText: 'Open Org-Charts',
      url: 'orgchart',
    },
    {
      imageUrl: 'assets/Offboarding_Employee_Thumbnail.jpg',
      title: 'Employee-Offboarding',
      description:
        'Start your Offboarding Process and get Approvals from all the Stakeholders.',
      buttonText: 'Open Exit Forms',
      url: 'offboarding',
    },
  ];

  get filteredCards() {
    if (!this.searchText.trim()) {
      return this.cards;
    }

    const text = this.searchText.toLowerCase();

    return this.cards.filter(
      (card) =>
        card.title.toLowerCase().includes(text) ||
        card.description.toLowerCase().includes(text)
    );
  }
  navigate(url: string) {
    this.router.navigate([url]);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (value) => {
        this.router.navigate(['login']);
      },
    });
  }
}
