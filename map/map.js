// initial map
var map = L.map('map').setView([33.77684, -84.38867], 17);

L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
  attribution: '<a href="http://proximityviz.com/">Proximity Viz</a> | <a href="credits.html" target="_blank">Credits</a>',
  maxZoom: 19
}).addTo(map);

// icons
function createIcon(icon, prefix, markerColor) {
  var icon = L.AwesomeMarkers.icon({
    icon: icon,
    prefix: prefix,
    markerColor: markerColor
  });
  return icon;
}

var cicIcon = createIcon('briefcase', 'glyphicon', 'cadetblue');
var edIcon = createIcon('money', 'fa', 'green');
var eventIcon = createIcon('group', 'fa', 'darkpurple');
var incubatorIcon = createIcon('fa-lightbulb-o', 'fa', 'orange');
var investorIcon = createIcon('arrow-graph-up-right', 'ion', 'darkred');
var retailIcon = createIcon('bag', 'ion', 'darkgreen');
var serviceIcon = createIcon('wrench', 'fa', 'purple');
var startupIcon = createIcon('mobile', 'fa', 'blue');
var univIcon = createIcon('university', 'ion', 'darkblue');
var defaultIcon = createIcon('thumb-tack', 'fa', 'red');

// setup layer arrays
var cicArray = [], edArray = [], eventArray = [], incubatorArray = [], investorArray = [], retailArray = [], serviceArray = [], startupArray = [], univArray = [], otherArray = [];

layers_visible = ['cicArray', 'edArray', 'eventArray', 'incubatorArray', 'investorArray', 
  'retailArray', 'serviceArray', 'startupArray', 'univArray', 'otherArray'];

// markers
var markers = new L.markerClusterGroup({
  polygonOptions: {opacity: 0.3,
    weight: 3}
});

// standard layers don't work with clusters, so we have to place markers into filterable categories in a different way
function createMarkers(feature, icon, arrayName) {
  var marker = L.marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]), {icon: icon});
  marker.bindPopup(feature.properties.Entity + "<br>" + feature.properties.Category + "<br>" + feature.properties.Building + "<br>" + feature.properties.Suite);
  arrayName.push(marker);
  markers.addLayer(marker);
}

function onEachItem(feature, layer) {
  switch (feature.properties.Category) {
    case 'Corporate Innovation Center': createMarkers(feature, cicIcon, cicArray); break;
    case 'Economic Development': createMarkers(feature, edIcon, edArray); break;
    case 'Event Venue': createMarkers(feature, eventIcon, eventArray); break;
    case 'Incubator': createMarkers(feature, incubatorIcon, incubatorArray); break;
    case 'Investor': createMarkers(feature, investorIcon, investorArray); break;
    case 'Retail': createMarkers(feature, retailIcon, retailArray); break;
    case 'Service Provider': createMarkers(feature, serviceIcon, serviceArray); break;
    case 'Startup': createMarkers(feature, startupIcon, startupArray); break;
    case 'University/College': createMarkers(feature, univIcon, univArray); break;
    default: createMarkers(feature, defaultIcon, otherArray);
  }
}

L.geoJson(directory, {
  onEachFeature: onEachItem
});

// add layers to map
map.addLayer(markers);

// Functions that make layering work (from http://jsfiddle.net/pvwKJ/7/)
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
  var arr = [];
  for(var i = 0; i < this.length; i++) {
    if(!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
}
 
refreshLayers = function() {
    markers_visible = [];
    
    for(i = 0; i < layers_visible.length; i++) {
      markers_array = window[layers_visible[i]]; // select the array
      markers_visible = markers_visible.concat(markers_array);        // add contents to markers_visible
    }
 
    markers_visible = markers_visible.unique(); // remove duplications from array caused when marker is in multiple visible layers
 
    markers.clearLayers(); // remove all markers from map
    markers.addLayers(markers_visible); // add back markers currently visible
}
 
$("div#map-buttons").delegate("button", "click", function() {
  layer_array = $(this).attr("id") + "Array";
 
  // update layers_visible array
  if($(this).hasClass("active")) {
    // remove from array
    layers_visible.splice(layers_visible.indexOf(layer_array), 1);
  } else {
    // add to array
    layers_visible.push(layer_array);
  }
 
  refreshLayers();
});

// all and none buttons
showAllLayers = function() {
  // add all items to map
  layers_visible = ['cicArray', 'edArray', 'eventArray', 'incubatorArray', 'investorArray', 
  'retailArray', 'serviceArray', 'startupArray', 'univArray', 'otherArray'];
  refreshLayers();

  // change all buttons to active (except "none" button)
  var buttons = document.querySelectorAll(".btn");
  for (var i = buttons.length - 1; i >= 0; i--) {
    buttons[i].setAttribute("class", "btn active");
  };
}

hideAllLayers = function() {
  // remove all items from map
  layers_visible = [];
  refreshLayers();

  // change all buttons to normal
  var buttons = document.querySelectorAll(".btn");
  for (var i = buttons.length - 1; i >= 0; i--) {
    buttons[i].setAttribute("class", "btn normal");
  };
}

