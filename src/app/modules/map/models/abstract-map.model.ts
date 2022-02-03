import {GeoPoint} from "./geo-point.model";
import {GeoMarker} from "./geo-marker.model";


export abstract class AbstractMapModel {
  map: any;
  private _markers: GeoMarker[] = [new GeoMarker(new GeoPoint(0, 0), 'ddd')];
  private _center: GeoPoint = new GeoPoint(48.208633, 16.365965);
  private _zoom: number = 13;

  get markers(): GeoMarker[] {
    return this._markers;
  }

  set markers(value: GeoMarker[]) {
    this._markers = value;
  }

  get center(): GeoPoint {
    return this._center;
  }

  set center(value: GeoPoint) {
    this._center = value;
  }

  get zoom(): number {
    return this._zoom;
  }

  set zoom(value: number) {
    this._zoom = value;
  }

  abstract initializeMap(): void;

  abstract setMapZoom(): void;

  abstract setMapCenter(): void;

  abstract addMarkerToMap(marker: GeoMarker): void;

  abstract clearMarkersFromMap(marker: GeoMarker): void;

}

