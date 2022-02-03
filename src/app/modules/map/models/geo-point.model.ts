export class GeoPoint{
  private _latitude: number;
  private _longitude: number;

  constructor(latitude: number, longitude: number) {
    this._latitude = latitude;
    this._longitude = longitude;
  }

  latLngLike(): [number, number] {
    return [this._latitude, this._longitude];
  }

  lngLatLike(): [number, number] {
    return [this._longitude, this._latitude];
  }


  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }
}
