import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvdAppComponent } from './avd-app.component';

describe('AvdAppComponent', () => {
  let component: AvdAppComponent;
  let fixture: ComponentFixture<AvdAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvdAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvdAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
