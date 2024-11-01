import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestoreDataPage } from './restore-data.page';

describe('RestoreDataPage', () => {
  let component: RestoreDataPage;
  let fixture: ComponentFixture<RestoreDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
