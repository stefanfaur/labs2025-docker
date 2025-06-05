import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePizzaListComponent } from './feature-pizza-list.component';

describe('FeaturePizzaListComponent', () => {
  let component: FeaturePizzaListComponent;
  let fixture: ComponentFixture<FeaturePizzaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePizzaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturePizzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
