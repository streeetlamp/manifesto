function getJSON(url, qs_params) {
  function buildQueryString(params) {
    return Object.entries(params).map(d => `${d[0]}=${d[1]}`).join('&');
  }

  return new Promise((resolve, reject) => {
    const qs = qs_params ? '?' + buildQueryString(qs_params) : '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}${qs}`);

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        resolve(xhr.responseText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}



var getLocation = function(href) {
	var l = document.createElement("a");
	l.href = href;
	return l;
};
var l = getLocation("http://example.com/path");
console.debug(l.hostname)
console.debug(l.pathname)



getJSON("https://spreadsheets.google.com/feeds/list/1h-nGB1WSyYPSnEWHlzKeWeHXvdQlKIq-H-yMAOkosdg/1/public/values?alt=json")
.then(data => {
console.log(data.feed.entry);
});



var map;
var markerArray = [];

$(function() {
	// create a map in the "map" div, set the view to a given place and zoom
	// map = L.map('map').setView([34,-118], 13);

	// add an OpenStreetMap tile layer
	// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	// }).addTo(map);

	// map google data
	getGoogleData();

});

function getGoogleData()
{
	var spreadsheetID = '1h-nGB1WSyYPSnEWHlzKeWeHXvdQlKIq-H-yMAOkosdg';
	var worksheetID = '1';
	var url = 'https://spreadsheets.google.com/feeds/list/'+spreadsheetID+'/'+worksheetID+'/public/values?alt=json';

	$.getJSON(url,function(data){
		$.each(data.feed.entry,function(i,val){

			// assign parameters for mapping and infowindow
			// note that this will be different depending on header titles
			// var lng = val.gsx$x.$t;
			// var lat = val.gsx$y.$t;
			// var title = val.gsx$affiliated.$t;
			var content = val.gsx$notes.$t;

			var thisMarker = L.marker([lat,lng]).addTo(map)
			    .bindPopup('<h2>' + title + '</h2>' + content);

			// push marker into an array
			markerArray.push(thisMarker);

		});

		// // put markers into a group to 
		// var group = L.featureGroup(markerArray).addTo(map);
		// map.fitBounds(group.getBounds());
	})


}

