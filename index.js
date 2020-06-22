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
var l = getLocation("https://www.firstthingsfirst2020.org/arabic");

if (l.pathname == '/arabic') {
	document.body.style.font-size = "18px";
}

    new Vue({
      el: '#app',
      data: {
        sigs: [],
      },
      created () {
        this.fetchData();
      },
      methods: {
        fetchData: function() {
          // GET request
          getJSON("https://spreadsheets.google.com/feeds/list/12vqpLpmehBzF4S28IpylhjUlK7Js2YyWdV6WCoNYP28/od6/public/values?alt=json").then(data => {
              // console.log(data);
              // get status
              // data.status;
              this.sigs = data.feed.entry;
          })
          }, function (data) {
            console.warn(data);
              // error callback
          }
        },
      });
