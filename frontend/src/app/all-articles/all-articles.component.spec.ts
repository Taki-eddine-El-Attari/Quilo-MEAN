import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticlesComponent } from './all-articles.component';

describe('AllArticlesComponent', () => {
  let component: AllArticlesComponent;
  let fixture: ComponentFixture<AllArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
