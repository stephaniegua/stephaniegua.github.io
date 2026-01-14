import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMap } from './school-map';

describe('SchoolMap', () => {
  let component: SchoolMap;
  let fixture: ComponentFixture<SchoolMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
