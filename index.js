    new Vue({
      el: '#app',
      data: {
        allMen: [],
      },
      created () {
        this.fetchData();
      },
      methods: {
        fetchData: function() {
          // GET request
          this.$http.get('https://spreadsheets.google.com/feeds/list/12vqpLpmehBzF4S28IpylhjUlK7Js2YyWdV6WCoNYP28/od6/public/values?alt=json').then(function (response) {
            console.log(response);
              // get status
              response.status;
              // this.allMen = response.data.posts.items;

          }, function (response) {

              // error callback
          })
        },
      }
    })