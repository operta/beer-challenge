import {GeoPoint} from "./geo-point.model";

export class GeoMarker {
  private _location: GeoPoint;
  private _title: string;
  private _description: string;
  private _iconUrl: string;

  constructor(
    location: GeoPoint,
    title: string,
    description: string = 'default description',
    iconUrl: string = 'assets/icons/beer.png'
  ) {
    this._location = location;
    this._title = title;
    this._description = description;
    this._iconUrl = iconUrl;
  }

  get location(): GeoPoint {
    return this._location;
  }

  set location(value: GeoPoint) {
    this._location = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }


  get iconUrl(): string {
    return this._iconUrl;
  }

  set iconUrl(value: string) {
    this._iconUrl = value;
  }
}
