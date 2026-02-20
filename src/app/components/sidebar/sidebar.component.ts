import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../serivces/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavItem } from '../../models/layout.model';
import { FlyoutCardComponent } from '../flyout-card/flyout-card.component';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { SubModuleIconList } from '../../constants/app.constant';
import { NavBarCardComponent } from "../nav-bar-card/nav-bar-card.component";
import { LayoutStateService } from '../../serivces/layout-state.service';

@Component({
  selector: 'landing-sidebar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FlyoutCardComponent, SearchBarComponent, NavBarCardComponent],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('overflowContainer', { static: true }) overflowContainer!: ElementRef<HTMLElement>;
  @ViewChild('mainContainer', { static: true }) mainContainer!: ElementRef<HTMLElement>;

  @Input('subModules') subModules!: any;

  private readonly router = inject(Router);
  public readonly layoutState = inject(LayoutStateService);

  constructor(private elementRef: ElementRef) { }

  isMoreOpen = false;
  searchText = '';

  toggleMore(event?: MouseEvent): void {
    event?.stopPropagation();
    this.isMoreOpen = !this.isMoreOpen;
  }

  closeMore() {
    this.isMoreOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMoreOpen) return;

    const clickedInside =
      this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.closeMore();
    }
  }

  navItems: NavItem[] = SubModuleIconList;

  visibleItems: NavItem[] = [];
  overflowItems: NavItem[] = [];
  readonly MAX_ITEM = 5;
  readonly ITEM_HEIGHT = 80;

  ngOnInit(): void {
    const enabledModuleKeys = this.subModules
      .map((m: any) => m.key.toLowerCase());

    this.navItems = SubModuleIconList.filter(item =>
      enabledModuleKeys.includes(item.route.toLowerCase())
    );
  }

  ngAfterViewInit() {
    queueMicrotask(() => {
      this.calculateVisibleItems();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateVisibleItems();
  }

  private calculateVisibleItems() {
    const containerHeight =
      this.mainContainer.nativeElement.clientHeight;

    const reservedHeight =
      (this.overflowContainer? this.overflowContainer.nativeElement.clientHeight:0);

    const availableHeight =
      containerHeight - reservedHeight;

    const maxVisible = Math.max(
      0,
      Math.min(
        this.MAX_ITEM,
        Math.floor(availableHeight / this.ITEM_HEIGHT)
      )
    );

    this.visibleItems = this.navItems.slice(0, maxVisible);
    this.overflowItems = this.navItems.slice(maxVisible);

    if (this.overflowItems.length === 0) {
      this.isMoreOpen = false;
    }
  }

  onNavigate(parentRoute: string, childRoute?: string) {
    if (childRoute) {
      this.router.navigate([parentRoute, childRoute],{
        skipLocationChange: true,
        replaceUrl: false
    });
    } else {
      this.router.navigate([parentRoute],{
        skipLocationChange: true,
        replaceUrl: false
      });
    }
  }

  onSearch(value: string) {
    this.searchText = value.toLowerCase();
  }
  get filteredModules() {
    return this.overflowItems.filter(
      (m) =>
        m.label.toLowerCase().includes(this.searchText) || 
        m.title?.toLowerCase().includes(this.searchText)
    );
  }

}
