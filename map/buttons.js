$ ( document ).ready(function() {
	var longString = '<div style="text-align: center; width: 100%">Filter map markers:</div>\
  <div id="map-buttons" data-toggle="buttons-checkbox">  \
    <button id="cic" class="btn active">\
      <i class="fa fa-briefcase"></i> \
      Corporate Innovation<br><span style="padding-left: 17px">Center</span></button><br>\
    <button id="ed" class="btn active">\
      <i class="fa fa-money"></i> \
      Economic<br><span style="padding-left: 17px">Development</span></button><br>\
    <button id="event" class="btn active">\
      <i class="fa fa-group"></i> \
      Event Venue</button><br>\
    <button id="incubator" class="btn active">\
      <i class="fa fa-lightbulb-o"></i> \
      Incubator</button><br>\
    <button id="investor" class="btn active">\
      <i class="ionicons ion-arrow-graph-up-right"></i> \
      Investor</button><br>\
    <button id="retail" class="btn active">\
      <i class="ionicons ion-bag"></i> \
      Retail</button><br>\
    <button id="service" class="btn active">\
      <i class="fa fa-wrench"></i> \
      Service Provider</button><br>\
    <button id="startup" class="btn active">\
      <i class="fa fa-mobile"></i> \
      Startup</button><br>\
    <button id="univ" class="btn active">\
      <i class="ionicons ion-university"></i> \
      University/<br><span style="padding-left: 17px">College</span></button><br>\
    <button id="other" class="btn active">\
      <i class="fa fa-thumb-tack"></i> \
      Other</button><br>\
  </div>\
  <button id="all" class="btn" onclick="showAllLayers()">All</button><br>\
  <button id="none" class="btn" onclick="hideAllLayers()">None</button>\
  <div id="missing"><a href="https://docs.google.com/forms/d/1QQzf-1HFYGZ9X0Q_f1LBVBONK32zHt95hFOfYQ8iEHQ/viewform?usp=send_form" target="_blank">Is something missing? Please help us add locations to the map.</a></div>';
	document.getElementById('sidebar').innerHTML = longString;
});