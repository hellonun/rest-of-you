let mapImg;

//center lat and long
let clat = 40.7294285;
let clon = -73.9958957;

let ww = 1024;
let hh = 512;
let zoom = 11.6;

let data;

//load in the map box data
function preload() {

  //load the google json file in
  data = loadJSON("LocationHistory.json")

  //load the map image in and personal access key
  mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoibWJtNTU3IiwiYSI6ImNqcDdjaWNhcjBzYmkzcHFzbGVndnlxaW8ifQ.29fPaVXPdaP9HomnlkG-_w');
}

//mercurial calculations for mapping data on a flat surface
function mercX(lon) {
  lon = radians(lon);
  let a = (256 / PI) * pow(2, zoom);
  let b = lon + PI;
  return a * b;
}
//mercurial calculations for mapping data on a flat surface

function mercY(lat) {
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapImg, 0, 0);

  let cx = mercX(clon);
  let cy = mercY(clat);

  let locations = data.locations;

  for (let i = 0; i < locations.length /3; i++) {
    //divide both latitude and longitude by 10000000 to revert to normal values
    let lat = (data.locations[i].latitudeE7) / 10000000;
    let lon = (data.locations[i].longitudeE7) / 10000000;

    let x = mercX(lon) - cx;
    let y = mercY(lat) - cy;

stroke(0,0,0,60);
    fill(0,0,0,20);
    ellipse(x, y, 5, 5);
  }


}
