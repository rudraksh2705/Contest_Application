import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perfomance } from './perfomance';

describe('Perfomance', () => {
  let component: Perfomance;
  let fixture: ComponentFixture<Perfomance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfomance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perfomance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
