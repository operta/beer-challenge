import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {PlaceLocation} from "../../models/place-location.model";

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.css']
})
export class PlacesMapComponent implements OnInit {
  apiLoaded$: Observable<any>;
  placeLocationMarkers$: Observable<google.maps.LatLng[]> | undefined;

  constructor(httpClient: HttpClient) {
    this.apiLoaded$ = httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=AIzaSyBm3JBOsD5b6m4LbE1Yn0FP8aIIo6jT2Og", "callback")
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
    this.placeLocationMarkers$ = this.loadPlaces()
      .pipe(
        map((res: PlaceLocation[]) =>
          this.convertPlaceLocationsToMarkers(res)
        )
      )
  }

  private convertPlaceLocationsToMarkers(placeLocations: PlaceLocation[]) {
    return placeLocations.flatMap(
      (location) => new google.maps.LatLng(location.latitude, location.longitude)
    );
  }

  private loadPlaces(): Observable<PlaceLocation[]> {
    return of(
      [
        new PlaceLocation(1, 37.423548, -122.084819),
        new PlaceLocation(2, 37.419202, -122.086503)
      ]
    );
  }

}
