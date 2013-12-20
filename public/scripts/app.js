//the site name
var siteName = 'app';
var baseUrl = "/public/scripts/"

// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
requirejs.config({
    "baseUrl": baseUrl+'vendor',
    "paths": {
      "app": "../"+siteName
    }
    /*"shim": {
        "backbone": ["jquery", "underscore"],
        "bootstrap": ["jquery"]
    }*/
});

//modify here.
// for now we load this in the html_header seperated
//loadScript('/assets/templates/_js/vendor/mobify.js');

// Load the main app module to start the app
requirejs(["app/main"]);

//small helper function to load scripts
function loadScript(url, callback)
{
    //deal with an array
    if(typeof(url) == 'object') {
        for (var x in url) {
            //console.log(baseUrl+'../'+siteName+''+url[x]);
            loadScript(baseUrl+''+siteName+'/'+url[x]+'.js', callback);
        }
        return;
    }

    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

//how to use
//<!-- Load all scripts -->
//<script data-main="{js_url}default_site" src="{js_url}require.min.js"></script>