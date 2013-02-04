/*
 * FireFly v1.1.1 - jQuery plugin
 *
 * An updated version of Dharmveer Motyar's firefly plugin.
 * Creates an effect of fireflys flying around your page.
 *
 * @example  $.firefly()
 *
 *           // to stop and start
 *           $.firefly.stop()
 *           $.firefly.start()
 *
 * Copyright © 2011 Matt 'Dirty Monkey' Stevens, http://www.dirtymonkey.co.uk
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function($){
    /*
     * default settings
     */
    var defaults = {
        // base64 encoded to cut down requests,
        // doesn't work in IE <= 7.0 and I'm not bothered to be honest
        images: [ // spark one
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABjCAYAAACPO76VAAAA'+
                  'BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAA'+
                  'D6SURBVHja7Nc7CsJAAEVRM/7ARqws3f+q3IBVrETC+AIpUthPBs6FB2nDYfIZaq07baMB'+
                  'BgzBgCEYMAQDhmDAEAwYgiEYMAQDhmDAEAwYggFDMGAIhmDAEAwYggFDMGAIBgzBgCEYgg'+
                  'FDMGAIBgzBgCEYf+9hdV1htOuQnbOSfbNPzyA9Y8wn4pI9smv2zF7Z1CtI6fwRVRaIe3by'+
                  'zmh7MuZH1C07ZmP2Xk4GjEYg+9XLe3IytoHS/2eh/wwYggFDMGAIBgzBgCEYMARDMGAIBg'+
                  'zBgCEYMAQDhmDAEAzBgCEYMAQDhmDAEAwYggFDMAQDhmDAEIwu+wkwAGUEM3yaFGKDAAAA'+
                  'AElFTkSuQmCC',
                  // spark two
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABjCAYAAACPO76VAAAA'+
                  'BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAA'+
                  'FjSURBVHja7NrRasJAEEDRjuT/f3n6KrLZnTamZppzQSpthJLjZLNiZOaXrtHDKYAhGDAE'+
                  'A4ZgwBAMGIIBQzAEA4ZgwBAMGIIBQzBgCAYMwRAMGIIBQzBgCAYMwYAhGHdra/p/x+B3Ce'+
                  'OzAHt/Txh/AzFDyadj2oE8GkFEcTqiOEkm4wDEbyaj1YRsjSBiApQDlHYgW0OI1WVoBNEC'+
                  'pNvdVOysHa8n293UyQv3CGP1jneZOnE/UQHJyWsvjdLl45BY3FHF5Fj7jA9sAFsCdMfIwn'+
                  'MYJwPkYl+xd6y7qYMnPopT8bworxDsM96AUj3BOXi0unx12vTlZHqq0wHj4FRUPtLI4k8Y'+
                  'bwRZrQE5AYJxwqKexeNdpk5aJ+Ll+U/3IDBMxj3upnw75KIw/yZfYoMhGDAEA4ZgwBAMGI'+
                  'IBQzAEA4ZgwBAMGIIBQzBgCAYMwRAMGIIBQzBgCAYMwYAhGLfrW4ABAC0AVeQCiPR5AAAA'+
                  'AElFTkSuQmCC',
                  // spark three
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABjCAYAAACPO76VAAAA'+
                  'BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAA'+
                  'JxSURBVHja7J3BkuMgDERHLv7/l3vvW5sdx4DUwq+PSYGFnoTElMOEpB/koQsXAAMBAxgI'+
                  'GMBAwAAGAgYwEDCAgYCBgAEMBAxgIGAAA81oNLI1JsYKGLUAPs0jYOQDaAfmehmIfz0vgO'+
                  'HlFAsg42WZcMcWvTEznEBY2HUBwse+0Wyh347V5LN0MowoHCd3IJc5iJVdVkzYcBSMKISw'+
                  'Yu44BUaYQFgRIK85gUdytNudwIeJg2PRnPGwm7pbqLcW9NEExGw3Ve7oDtvUThA7u7JWMN'+
                  'wceNeuqAQyTLNihdP0cOsq264u06xYkS0xATwq1nk1yoowDI5jzxmfHLeidsR/5n41jPgS'+
                  'xF1HR4I9rQ59YQRUCcV56XyXSVbsiFibiO9WM3b1963Aub7eubLYRpfs4F1bYKQ3BgEMVA'+
                  'aj+wm53P6VMJQ8brXK7e+yTal4PDWDmoGAcWNbkcFcR8HQ5J6uRc9bbdfx25ROcHAlDCWC'+
                  '0sPvbNc7iiI+bn6uXw5VMsjAY7cpfRnps5l0/K9dtSm9lRj52mhPqwKuBxH+symjUhUb/2'+
                  'XD7LtHUQC7LCscMkPJka0KJzvA0MJ5ZGTPNjncHfJb+/q3M2MTAFVDHUaOjglnzL6/JIfs'+
                  'crpV50nk72p7j6sZTxesZPg2dl3GC9dGWywDJLO1VZLjVs+VtpVl14xvCvUnh2TeH3L03S'+
                  'EzQNxrStsTuPsB7Jjf9HUHUmbXMFl4vBmCQ2a4OMLmT+2nnMCP2CYdLxmeaWNbNw/u12+v'+
                  'AsNd6IkRHZ2cfgKM9pHfpZtCwAAGAgYwEDCAgYABDAQMYCBgAAMBAwEDGOiT/ggwACwkj/'+
                  'K9LOCpAAAAAElFTkSuQmCC',
                  // spark four
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABjCAYAAACPO76VAAAA'+
                  'BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAA'+
                  'DISURBVHja7NyxDYAwDEVBTIpQsgn770VDZVxQsEECuif9BXxSykRmLpqj1QlgCAYMwYAh'+
                  'GDAEA4ZgwBAMwYAhGDAEA4ZgwBAMGIIBQzAEA4ZgwBAMGIIBQzBgCAYMwRAMGIIBQzBgCA'+
                  'YMwXgXta3WYIyv147a/heM+PBPbO2BOGsXDHmmYAgGDMGAIRiCAUMwYAgGDMGAIRgwBAOG'+
                  'E8AQDBiCAUMwYAgGDMGAIRiCAUMwYAgGDMGAIRgwBAOGYAgGDMGYvVuAAQD5BwwNjgAKGw'+
                  'AAAABJRU5ErkJggg%3D%3D'
                ],
        total:    50,   // anything over a few hundred is gonna crawl
        boundary: 100,  // avoid the edge of the window
        fast:     5,    // fastest spark (a lower number is faster)
        slow:     1,    // slowest spark (a higher number is slower)
        limit:    3600, // stop after this many seconds (one hour)
    }


    // shortcuts
    var ff, ffs, x, y, old_x, old_y, start, timer_handle, delay_handle, sparks = []


    // init
    // initializes and starts everything
    $.firefly = function(settings){
        ff = $.firefly
        ffs = $.extend({}, defaults, settings)

        ff.calibrate()  // get size of window
        ff.make()       // load the spark images
        ff.start()      // start moving them
        ff.check_time() // start timer
    }


    // create
    // creates every spark and inserts it into the DOM
    $.firefly.make = function(){
        for (i = 0; i < ffs.total; i++)
            sparks[i] = ff.create(ffs.images[ff.random(0,ffs.images.length-1)])
    }


    // start
    // records start time, watches window resize and begins movement
    $.firefly.start = function(){
        start = parseInt((new Date).getTime()/1000)
        $(window).bind('resize.firefly', function(){
            ff.delay(ff.resized, 250)
        })
        for (i = 0; i < sparks.length; i++) ff.move(sparks[i])
    }


    // reset
    // stop and remove all fireflies, then create and start them again
    $.firefly.reset = function(){
        for (i = 0; i < ffs.total; i++)
            sparks[i].remove()

        $.firefly()
    }


    // delay
    // utility function to prevent the resize event from being fired multiple times
    $.firefly.delay = function(callback, milliseconds){
        clearTimeout(delay_handle)
        delay_handle = setTimeout(callback, milliseconds);
    }


    // resized
    // event handler to deal with window resizing
    $.firefly.resized = function(e){
        ff.calibrate();
        (x < old_x || y < old_y) && ff.reset()
    }


    // stop
    // freezes a spark in its current position
    $.firefly.stop = function(){
        $(window).unbind('resize.firefly')
        for (i = 0; i < sparks.length; i++) $(sparks[i]).stop(true)
    }


    // remove
    // removes a spark from the DOM
    $.firefly.remove = function() {
        for (i = 0; i < ffs.total; i++) $('img[src="'+ffs.images[i]+'"]').remove()
    }


    // create
    // inserts a spark into the DOM at a random position
    $.firefly.create = function(i){
        var spark = $('<img>').attr({'src':i}).hide()
        $("body").append(spark)

        spark.css({'position': 'absolute',
                    'z-index':  ff.random(0, 20),
                    'top':      ff.random(ffs.boundary, y - ffs.boundary),
                    'left':     ff.random(ffs.boundary, x - ffs.boundary)
                    })

        return spark.show()
    }


    // move
    // animate to a random position, within the boundaries
    $.firefly.move = function(image){
        image.animate({top:  ff.random(ffs.boundary,y-ffs.boundary),  // x coordinate
                       left: ff.random(ffs.boundary,x-ffs.boundary)}, // y coordinate
                       ff.random(ffs.slow,ffs.fast) * 1000,           // speed
                       function(){ff.move(image)})                    // callback
    }


    // check_time
    // check every second whether or not we have passed the time limit
    $.firefly.check_time = function(){
        if (parseInt((new Date).getTime()/1000) > (start+ffs.limit)) {
            ff.stop()
        } else {
            window.setTimeout('$.firefly.check_time()', 1000)
        }
    }


    // calibrate
    // get the dimensions of the window
    $.firefly.calibrate = function(){
        old_x = x
        old_y = y

        x = $(window).width()
        y = $(window).height()
    }


    // random
    // return a random number between a and b
    $.firefly.random = function(a,b){
        return Math.floor(Math.random()*(b-a+1)+a)
    }
})(jQuery)
