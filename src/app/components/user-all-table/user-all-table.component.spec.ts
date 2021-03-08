import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllTableComponent } from './user-all-table.component';

describe('UserAllTableComponent', () => {
  let component: UserAllTableComponent;
  let fixture: ComponentFixture<UserAllTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAllTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
