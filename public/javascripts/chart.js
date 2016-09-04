/**
 * Created by ajantha on 5/26/16.
 */
function DrawChart() {
    console.log("constructor invoked");
    this.availableSlots = [];
    this.numOfSlots = [];
    this.owners = [];
}

DrawChart.prototype.clearChart = function () {
    this.owners = [];
    this.numOfSlots = [];
    this.availableSlots =[];
};

DrawChart.prototype.initialize = function (places,cb) {
    console.log("graph initializing");
  for(var place in places){
          this.owners.push(places[place].owner);
          this.numOfSlots.push(places[place].count);
          this.availableSlots.push(places[place].isActiveCount);
  }
    cb(this.owners, this.numOfSlots, this.availableSlots);
};


DrawChart.prototype.draw = function(labels, data1, data2){
    // Bar chart
    var ctx = document.getElementById("mybarChart");
    var mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Slots',
                backgroundColor: "#26B99A",
                data: data1
            }, {
                label: '# of Available Slots',
                backgroundColor: "#03586A",
                data: data2
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};

