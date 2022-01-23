import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsModule} from "@angular/google-maps";
import { PlacesMapComponent } from './components/places-map/places-map.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    PlacesMapComponent
  ],
  exports: [
    PlacesMapComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ]
})
export class PlacesModule {
}
