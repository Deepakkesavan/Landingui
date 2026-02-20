import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCardComponent } from './nav-bar-card.component';

describe('NavBarCardComponent', () => {
  let component: NavBarCardComponent;
  let fixture: ComponentFixture<NavBarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
