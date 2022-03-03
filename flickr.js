var keyword = "stalin";
var rate = 100;
var data = null;


function get(name){
    var r = /[?&]([^=#]+)=([^&#]*)/g,p={},match;
    while(match = r.exec(window.location)) p[match[1]] = match[2];
    return p[name];
}


function newimage() {

    console.log("yo");
    let image = data[Math.floor(Math.random() * data.length)]
    let farm_id = image['farm'];
    let server_id = image['server'];
    let id = image['id'];
    let secret = image['secret'];

    let url = "http://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + id + "_" + secret + ".jpg";
    document.getElementById("image").src = url;

    setTimeout(newimage, 5000);
}


window.onload = function() {
    keyword = get("keyword");
    rate = get("rate");

    let search = 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=8be84229a39631f3d6addac0bc09a3dd&sort=interestingness-asc&per_page=' + rate.toString() + '&tags=' + keyword + '&jsoncallback=?'

    $.get(search, {}, 
        function(resp) {
            data = JSON.parse(resp.slice(14, -1)).photos.photo;

            newimage();

        }
    );
}


window.addEventListener('mousedown', function() {

    let image = data[Math.floor(Math.random() * data.length)]
    let farm_id = image['farm'];
    let server_id = image['server'];
    let id = image['id'];
    let secret = image['secret'];

    let url = "http://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + id + "_" + secret + ".jpg";
    document.getElementById("image").src = url;

});

