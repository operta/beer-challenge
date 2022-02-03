import {AfterViewInit, Component} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../../../../environments/environment";
import {AbstractMapModel} from "../../models/abstract-map.model";
import {GeoMarker} from "../../models/geo-marker.model";

@Component({
  selector: 'app-mapbox-map',
  templateUrl: './mapbox-map.component.html',
  styleUrls: ['./mapbox-map.component.css']
})
export class MapboxMapComponent extends AbstractMapModel implements AfterViewInit {
  override map!: mapboxgl.Map;
  mapId: string = 'mapboxMap';
  markersOnMap: mapboxgl.Marker[] = []

  ngAfterViewInit(): void {
    this.initializeMap();
    this.setMapZoom();
    this.setMapCenter();
  }

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: this.mapId,
      accessToken: environment.MAPBOX_ACCESS_TOKEN,
      style: 'mapbox://styles/mapbox/streets-v11',
    }).on('load', () => {
      this.map.resize();
    })
  }

  setMapZoom(): void {
    this.map.setZoom(this.zoom);
  }

  setMapCenter(): void {
    this.map.setCenter(this.center.lngLatLike())
  }

  addMarkerToMap(marker: GeoMarker): void {
      const markerOnMap = new mapboxgl.Marker(this.createMarkerHTML())
        .setLngLat(marker.location.lngLatLike())
        .setPopup(
          new mapboxgl.Popup().setHTML(`<h1>${marker.title}</h1>${marker.description}`)
        )
        .addTo(this.map);
      this.markersOnMap.push(markerOnMap);
  }

  private createMarkerHTML(): HTMLElement {
    const el = document.createElement('div');
    const width = 50;
    const height = 50;
    el.className = 'marker';
    el.style.backgroundImage = `url(assets/icons/beer.png)`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';
    return el;
  }

  clearMarkersFromMap(marker: GeoMarker): void {
    this.markersOnMap.forEach(m => m.remove());
    this.markersOnMap = [];
  }
}
