import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasFormComponent } from './artistas-form.component';

describe('ArtistasFormComponent', () => {
  let component: ArtistasFormComponent;
  let fixture: ComponentFixture<ArtistasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
