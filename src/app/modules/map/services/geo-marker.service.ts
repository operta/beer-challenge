import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GeoMarker} from "../models/geo-marker.model";
import {GeoPoint} from "../models/geo-point.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GeoMarkerService {
  private markers$: BehaviorSubject<GeoMarker[]>;

  constructor(private httpClient: HttpClient) {
    this.markers$ = new BehaviorSubject<GeoMarker[]>([])
    this.loadMarkersFromJson();
  }

  private loadMarkers(): void {
      const presetMarkers = [
        new GeoMarker(new GeoPoint(0, 0), 'M1'),
        new GeoMarker(new GeoPoint(0.5, 0), 'M2'),
      ]
    this.markers$.next(presetMarkers);
  }

  listenToGeoMarkerChanges(): BehaviorSubject<GeoMarker[]> {
    return this.markers$;
  }

  private loadMarkersFromJson() {
    this.httpClient.get("assets/data/pubs_vienna.json").subscribe((data: any) => {
      console.log(data);
      const list: any[] = data;
      const geoMarkers: GeoMarker[] = [];
      list.forEach(row => geoMarkers.push(new GeoMarker(new GeoPoint(row['lat'], row['lng']), row['name'], row['name'])));
      this.markers$.next(geoMarkers);
    })

  }
}
