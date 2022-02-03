import {ComponentFactoryResolver} from "@angular/core";
import {MapTypeEnum} from "../models/map-type.enum";
import {GoogleMapComponent} from "../components/google-map/google-map.component";
import {MapboxMapComponent} from "../components/mapbox-map/mapbox-map.component";
import {LeafletMapComponent} from "../components/leaflet-map/leaflet-map.component";

export class MapComponentFactory {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  createMapFactory(mapType: string) {
    switch (mapType) {
      case MapTypeEnum.GOOGLE: {
        return this.createGoogleMapComponentFactory()
      }
      case MapTypeEnum.LEAFLET: {
        return this.createLeafletMapComponentFactory();
      }
      case MapTypeEnum.MAPBOX: {
        return this.createMapboxMapComponentFactory();
      }
      default:
        return this.createGoogleMapComponentFactory();
    }
  }

  private createGoogleMapComponentFactory() {
    return this.componentFactoryResolver.resolveComponentFactory(GoogleMapComponent)
  }

  private createLeafletMapComponentFactory() {
    return this.componentFactoryResolver.resolveComponentFactory(LeafletMapComponent)
  }

  private createMapboxMapComponentFactory() {
    return this.componentFactoryResolver.resolveComponentFactory(MapboxMapComponent)
  }
}
