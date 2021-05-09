import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistSingleComponent } from './artist-single.component';


describe('ArtistSingleComponent', () => {
  let component: ArtistSingleComponent;
  let fixture: ComponentFixture<ArtistSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
