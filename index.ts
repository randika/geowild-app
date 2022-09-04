/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 8,
    center: { lat: 7.8731, lng: 80.7718 },
  });

  // NOTE: This uses cross-domain XHR, and may not work on older browsers.
  map.data.loadGeoJson(
    "https://n3qa2e85u2.execute-api.us-east-1.amazonaws.com/sightings/geojson"
  );

  map.data.setStyle(function(feature) {
    console.log('test: '+ feature.getProperty('id'));
    return ({
      title: feature.getProperty('code'),
      icon: feature.getProperty("icon")
    });
  });
  google.maps.event.addListener(map, 'click', function(event) {
   
    placeMarker(event.latLng);
  });

  function placeMarker(location) {
    console.log("on map:" + location);
  }
  // Set click event for each feature.
  map.data.addListener('click', function(event) {
    console.log("on polygon:" + event.latLng.toUrlValue(6));
    placeMarker(event.latLng);
  });
  
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
