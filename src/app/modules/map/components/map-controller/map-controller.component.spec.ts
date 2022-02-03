import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapControllerComponent } from './map-controller.component';

describe('PlacesMapComponent', () => {
  let component: MapControllerComponent;
  let fixture: ComponentFixture<MapControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
