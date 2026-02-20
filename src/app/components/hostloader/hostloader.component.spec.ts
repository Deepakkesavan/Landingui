import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostloaderComponent } from './hostloader.component';

describe('HostloaderComponent', () => {
  let component: HostloaderComponent;
  let fixture: ComponentFixture<HostloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostloaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
