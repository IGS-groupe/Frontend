import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterFormComponent } from './paramater-form.component';

describe('ParamaterFormComponent', () => {
  let component: ParameterFormComponent;
  let fixture: ComponentFixture<ParameterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
