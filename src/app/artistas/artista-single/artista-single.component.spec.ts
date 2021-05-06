import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaSingleComponent } from './artista-single.component';

describe('ArtistaSingleComponent', () => {
  let component: ArtistaSingleComponent;
  let fixture: ComponentFixture<ArtistaSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistaSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistaSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
