import { Component } from '@angular/core';

@Component({
  selector: 'landing-footer',
  standalone: true,
  template: `
    <footer class="dashboard-footer">
      <div class="footer-left">
        <span class="copyright">&copy; 2026 Clarium. All rights reserved.</span>
      </div>
    </footer>
  `,
  styles: [
    `
      .dashboard-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
        margin-top: auto;
        border-top: 1px solid var(--border-subtle);
        font-size: 0.85rem;
        width: 100%;
        background-color: var(--bg-surface);
        color: var(--text-secondary);
        flex-shrink: 0;
      }

      .version {
        font-weight: 500;
        color: #ccc;
      }
    `,
  ],
})
export class FooterComponent { }
