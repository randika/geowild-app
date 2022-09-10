/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

 var infowindow;
 var markers;
function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 8,
      center: { lat: 7.8731, lng: 80.7718 },
      mapTypeId: 'terrain'
    }
  );

  infowindow = new google.maps.InfoWindow();

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

  var infowindow = new google.maps.InfoWindow({
    content: "hello"
  });

  map.data.addListener('click', function(event) {
    let id = event.feature.getProperty('code');
    let name = event.feature.getProperty('nickname');

    let html = "<div style='float:left'><img src='http://i.stack.imgur.com/g672i.png'></div><div style='float:right; padding: 10px;'><b>"+id+"</b><br/>"+name+"</div>"
    infowindow.setContent(html);
    infowindow.setPosition(event.latLng);
    infowindow.setOptions({
      pixelOffset: new google.maps.Size(0, -34)
    }); // move the infowindow up slightly to the top of the marker icon
    infowindow.open(map);

  });
   
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
