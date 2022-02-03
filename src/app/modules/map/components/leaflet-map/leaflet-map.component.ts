import {AfterViewInit, Component} from '@angular/core';
import * as leaflet from 'leaflet';
import {AbstractMapModel} from "../../models/abstract-map.model";
import {GeoMarker} from "../../models/geo-marker.model";

@Component({
  selector: 'app-leaflet-js-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent extends AbstractMapModel implements AfterViewInit {
  override map!: leaflet.Map;
  mapId: string = 'leafletMap';
  markersLayerGroup: leaflet.LayerGroup = new leaflet.LayerGroup()

  ngAfterViewInit(): void {
    this.initializeMap();
    this.addTilesToMap();
    this.setMapZoom();
    this.setMapCenter();
    this.markersLayerGroup.addTo(this.map);
  }

  initializeMap(): void {
    this.map = new leaflet.Map(this.mapId);
  }

  private addTilesToMap(): void {
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  setMapZoom(): void {
    this.map.setZoom(this.zoom);
  }

  setMapCenter(): void {
    this.map.setView(this.center.latLngLike());
  }

  addMarkerToMap(marker: GeoMarker): void {
    new leaflet.Marker(marker.location.latLngLike())
      .setIcon(new leaflet.Icon({
        iconUrl: marker.iconUrl,
        iconSize: [48,48]
      }))
      .bindPopup(`<h1>${marker.title}</h1>${marker.description}`)
      .addTo(this.markersLayerGroup);
  }

  clearMarkersFromMap(marker: GeoMarker): void {
    this.markersLayerGroup.clearLayers()
  }
}
