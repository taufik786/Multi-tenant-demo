import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Org1Component } from './org1.component';

describe('Org1Component', () => {
  let component: Org1Component;
  let fixture: ComponentFixture<Org1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Org1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Org1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
