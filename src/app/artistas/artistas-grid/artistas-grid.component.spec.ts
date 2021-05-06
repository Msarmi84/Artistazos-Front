import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasGridComponent } from './artistas-grid.component';

describe('ArtistasGridComponent', () => {
  let component: ArtistasGridComponent;
  let fixture: ComponentFixture<ArtistasGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistasGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
