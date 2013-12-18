/**
 * based on (https://github.com/jsliang/eqHeight.coffee)
 * 
 * eqheight.js
*/

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    // heights - http://www.texelate.co.uk/blog/jquery-whats-the-difference-between-height-innerheight-and-outerheight/ 
    var pluginName = 'eqHeight',
        defaults = {
            accountForPadding               : false, // true , false 
            columnSelector                  : ''    
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        //if the options var is a string, just put this as the column_selector
        if(typeof(options) === 'string') {
            options.columnSelector = options;
        }

        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        //set some defaults
        this._defaults = defaults;
        this._name = pluginName;

        //init the plugin
        this.init();
    }

    //init the plugin
    Plugin.prototype.init = function () {
        var $elem = $(this.element),
            obj = this;

        //get the elements
        obj.columns = $elem.find(obj.options.columnSelector);

        //nothing found, we get the first set of children
        if (obj.columns.length === 0) {
          obj.columns = $elem.children(obj.options.columnSelector);
        }

        //still no luck, return
        if (obj.columns.length === 0) {
          return;
        }

        //start ewualizing
        //obj.equalizer(); 

        //start after 100ms, so we are sure everything is loaded 
        setTimeout(function(){
            obj.equalizer();    
        }, 100);

        //responsive... do it with the resize
        $(window).resize(function(){
            obj.equalizer();
        });
    };

     Plugin.prototype.equalizer = function () {
        var $elem = $(this.element),
            obj = this;

        //set the height to auto
        obj.columns.height("auto");

        //get the first height
        var rowTopValue = obj.columns.first().position().top;
        
        var paddingTop, paddingBottom;

        //loop over all the elements
        obj.columns.each(function() {
            //set the var for the height
            var currentTop;

            //get  the current top
            currentTop = $(this).position().top;
        
            //do we have the set the height?
            //@todo, need figure out why this code is needed... :-|
            if (currentTop !== rowTopValue) {
                obj.equalizeMarkedColumns();
                rowTopValue = $(this).position().top;
            }

            //do we need to take care of paddings?
            if(obj.options.accountForPadding) {
                //mark the element which need to be reparsed due the padding            
                paddingTop = parseInt($(this).css("padding-top").replace("px", ""));
                paddingBottom = parseInt($(this).css("padding-bottom").replace("px", ""));
                
                //set the paddingTop
                if(paddingTop > 0 || paddingBottom > 0) {
                    $(this).addClass('eqHeightPadding');
                }
            }
            
            //mark the div with a class
            $(this).addClass("eqHeight_row");
        });
        
        //lets eqHeight all the marked columns
        obj.equalizeMarkedColumns();
        
        //lets do the padding calculation
        obj.equalizePaddings()
    };

    //eqHeight the marked columns
    Plugin.prototype.equalizeMarkedColumns = function () {
        var $elem = $(this.element),
            obj = this;

        //set vars
        var markedColumns, maxColHeight, paddingTop, paddingBottom;

        //get the markerd element
        obj.markedColumns = $(".eqHeight_row");

        //default height
        maxColHeight = 0; 
       
        //loop over the marked columns
        obj.markedColumns.each(function() {
                                
            //calculate the heighest value
            maxColHeight = Math.max($(this).height(), maxColHeight);
                
        });

        //set the height
        obj.markedColumns.height(maxColHeight);

        //remove the class markerd indicator
        $(".eqHeight_row").removeClass("eqHeight_row");
    };
    
    //eqHeight the paddings
    Plugin.prototype.equalizePaddings = function () {
        var $elem = $(this.element),
            obj = this;

        //do we need to proceed?
        if(obj.options.accountForPadding && $elem.find('.eqHeightPadding').length) {
            
            var maxColHeight = 0;
      
            //lets get the height we need
            $elem.find('.eqHeightPadding').each(function(){
                maxColHeight = Math.max($(this).innerHeight(), maxColHeight);               
            });
            
            //reset the height to the padding
            if(maxColHeight > 0) {
                obj.markedColumns.each(function() {
                    //do not set the height of an padding elem
                    if(!$(this).hasClass('eqHeightPadding')) {
                        $(this).height(maxColHeight);
                    }
                });
            }
        }

        //remove the class markerd indicator
        $(".eqHeightPadding").removeClass("eqHeightPadding");
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );    

/*!
 * Retina.js v1.1.0
 *
 * Copyright 2013 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
(function(){var root=typeof exports=="undefined"?window:exports;var config={check_mime_type:true};root.Retina=Retina;function Retina(){}Retina.configure=function(options){if(options==null)options={};for(var prop in options)config[prop]=options[prop]};Retina.init=function(context){if(context==null)context=root;var existing_onload=context.onload||new Function;context.onload=function(){var images=document.getElementsByTagName("img"),retinaImages=[],i,image;for(i=0;i<images.length;i++){image=images[i];retinaImages.push(new RetinaImage(image))}existing_onload()}};Retina.isRetina=function(){var mediaQuery="(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";if(root.devicePixelRatio>1)return true;if(root.matchMedia&&root.matchMedia(mediaQuery).matches)return true;return false};root.RetinaImagePath=RetinaImagePath;function RetinaImagePath(path,at_2x_path){this.path=path;if(typeof at_2x_path!=="undefined"&&at_2x_path!==null){this.at_2x_path=at_2x_path;this.perform_check=false}else{this.at_2x_path=path.replace(/\.\w+$/,function(match){return"@2x"+match});this.perform_check=true}}RetinaImagePath.confirmed_paths=[];RetinaImagePath.prototype.is_external=function(){return!!(this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain))};RetinaImagePath.prototype.check_2x_variant=function(callback){var http,that=this;if(this.is_external()){return callback(false)}else if(!this.perform_check&&typeof this.at_2x_path!=="undefined"&&this.at_2x_path!==null){return callback(true)}else if(this.at_2x_path in RetinaImagePath.confirmed_paths){return callback(true)}else{http=new XMLHttpRequest;http.open("HEAD",this.at_2x_path);http.onreadystatechange=function(){if(http.readyState!=4){return callback(false)}if(http.status>=200&&http.status<=399){if(config.check_mime_type){var type=http.getResponseHeader("Content-Type");if(type==null||!type.match(/^image/i)){return callback(false)}}RetinaImagePath.confirmed_paths.push(that.at_2x_path);return callback(true)}else{return callback(false)}};http.send()}};function RetinaImage(el){this.el=el;this.path=new RetinaImagePath(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var that=this;this.path.check_2x_variant(function(hasVariant){if(hasVariant)that.swap()})}root.RetinaImage=RetinaImage;RetinaImage.prototype.swap=function(path){if(typeof path=="undefined")path=this.path.at_2x_path;var that=this;function load(){if(!that.el.complete){setTimeout(load,5)}else{that.el.setAttribute("width",that.el.offsetWidth);that.el.setAttribute("height",that.el.offsetHeight);that.el.setAttribute("src",path)}}load()};if(Retina.isRetina()){Retina.init(root)}})();