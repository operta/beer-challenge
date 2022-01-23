export class PlaceLocation {

  constructor(
    public id: number,
    public latitude: number,
    public longitude?: number | null,
    public streetAddress?: string | null,
    public streetNumber?: string | null,
    public floor?: string | null,
    public doorNumber?: string | null,
    public postalCode?: string | null,
    public description?: string | null,
    public regionId?: number | null,
    public regionName?: string | null,
    public placeId?: number | null,
  ) {
  }
}
