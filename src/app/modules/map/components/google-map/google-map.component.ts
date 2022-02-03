import {AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractMapModel} from "../../models/abstract-map.model";
import {GeoMarker} from "../../models/geo-marker.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {catchError, lastValueFrom, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GoogleMapComponent extends AbstractMapModel implements AfterViewInit {
  override map!: google.maps.Map;
  mapId: string = 'googleMap';
  apiLoaded$: Observable<boolean>;
  markersOnMap: google.maps.Marker[] = [];

  constructor(private httpClient: HttpClient) {
    super();
    this.apiLoaded$ = this.loadApi();
  }

  private loadApi(): Observable<boolean> {
    return this.httpClient.jsonp(environment.GOOGLE_MAPS_API, "callback")
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngAfterViewInit(): void {
    lastValueFrom(this.loadApi()).then(() => {
      this.initializeMap();
      this.setMapZoom();
      this.setMapCenter();
    });
  }

  initializeMap(): void {
    this.map = new google.maps.Map(document.getElementById(this.mapId) as HTMLElement);
  }

  setMapCenter(): void {
    this.map.setCenter(new google.maps.LatLng(this.center.latitude, this.center.longitude));
  }

  setMapZoom(): void {
    this.map.setZoom(this.zoom)
  }

  addMarkerToMap(marker: GeoMarker): void {
    const markerOnMap = new google.maps.Marker({
      position: new google.maps.LatLng(marker.location.latitude, marker.location.longitude),
      title: marker.title,
      label: marker.title,
      icon: {
        scaledSize: new google.maps.Size(48,48),
        url: marker.iconUrl
      },
      map: this.map,
    });
    this.markersOnMap.push(markerOnMap);
  }

  clearMarkersFromMap(): void {
    this.hideMarkersFromMap();
    this.markersOnMap = [];
  }

  private hideMarkersFromMap(): void {
    this.markersOnMap.forEach(m => m.setMap(null));
  }

}
