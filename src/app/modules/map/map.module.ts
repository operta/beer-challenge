import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsModule} from "@angular/google-maps";
import { MapControllerComponent } from './components/map-controller/map-controller.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { MapboxMapComponent } from './components/mapbox-map/mapbox-map.component';
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {FormsModule} from "@angular/forms";
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import {GeoMarkerService} from "./services/geo-marker.service";


@NgModule({
  declarations: [
    MapControllerComponent,
    GoogleMapComponent,
    MapboxMapComponent,
    LeafletMapComponent
  ],
  exports: [
    MapControllerComponent,
    MapboxMapComponent,
    LeafletMapComponent,
    GoogleMapComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ButtonsModule,
    FormsModule
  ],
  providers: [
    GeoMarkerService
  ]
})
export class MapModule {
}
