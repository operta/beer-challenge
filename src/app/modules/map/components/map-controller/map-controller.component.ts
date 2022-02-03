import {
  AfterViewInit,
  Component, ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from "rxjs";
import {MapTypeEnum} from "../../models/map-type.enum";
import {MapComponentFactory} from "../../services/map-component.factory";
import {GeoMarker} from "../../models/geo-marker.model";
import {GeoMarkerService} from "../../services/geo-marker.service";
import {tag} from "rxjs-spy/operators";

@Component({
  selector: 'app-map-controller',
  templateUrl: './map-controller.component.html',
  styleUrls: ['./map-controller.component.css']
})
export class MapControllerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', {read: ViewContainerRef}) mapContainerRef!: ViewContainerRef;
  mapComponentRef!: ComponentRef<any>;
  selectedMapType: MapTypeEnum = MapTypeEnum.MAPBOX;
  geoMarkersSubscription: Subscription = new Subscription();
  loadedMarkers: GeoMarker[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private geoMarkerService: GeoMarkerService) {
    this.subscribeToGeoMarkerChanges();
  }

  ngAfterViewInit(): void {
    this.createMapComponent();
  }

  createMapComponent(): void {
    if (this.mapComponentRef != undefined) {
      this.mapComponentRef.destroy();
    }
    let factory: ComponentFactory<any> = new MapComponentFactory(this.componentFactoryResolver).createMapFactory(this.selectedMapType);
    this.mapComponentRef = this.mapContainerRef.createComponent(factory);
  }

  private subscribeToGeoMarkerChanges() {
    this.geoMarkersSubscription = this.geoMarkerService.listenToGeoMarkerChanges()
      .pipe(tag("geomarker"))
      .subscribe((markers: GeoMarker[]) => {
        this.loadedMarkers = markers;
      })
  }

  addMarkersToMap() {
    this.mapComponentRef.instance.clearMarkersFromMap();
    this.loadedMarkers.forEach(m => this.mapComponentRef.instance.addMarkerToMap(m))
  }

  ngOnDestroy() {
    this.geoMarkersSubscription.unsubscribe();
  }

  // function to load enum in html template
  public get mapType(): typeof MapTypeEnum {
    return MapTypeEnum;
  }

}
