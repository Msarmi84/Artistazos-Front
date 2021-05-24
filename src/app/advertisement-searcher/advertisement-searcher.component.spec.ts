import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementSearcherComponent } from './advertisement-searcher.component';

describe('AdvertisementSearcherComponent', () => {
  let component: AdvertisementSearcherComponent;
  let fixture: ComponentFixture<AdvertisementSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
