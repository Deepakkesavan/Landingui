import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsWrapperComponent } from './ems-wrapper.component';

describe('EmsWrapperComponent', () => {
  let component: EmsWrapperComponent;
  let fixture: ComponentFixture<EmsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmsWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
