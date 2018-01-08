/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
/*jshint browser:true jquery:true*/
/*global alert*/
define(
    [
        'uiComponent'
    ],
    function (Component) {
        "use strict";
        var imageData = window.checkoutConfig.imageData;
        return Component.extend({
            defaults: {
                template: 'Magento_Checkout/summary/item/details/thumbnail'
            },
            displayArea: 'before_details',
            imageData: imageData,
            getImageItem: function(item) {
                if (this.imageData[item.item_id]) {
                    return this.imageData[item.item_id];
                }
                return [];
            },
            getSrc: function(item) {
                console.log("ktk",this.imageData[item.item_id]);
                console.log("kdk",item.item_id);
//var el = $(".product-item-details").find("[data-slide='" + item.item_id + "']").find( '.admin__control-select' );
//var el = document.getElementsByClassName("admin__control-select");
var el = document.querySelectorAll('[data-item-id="'+item.item_id+'"] select');
if(typeof el["0"] !== 'undefined'){
console.log("el",el);
var text = el["0"].options[el["0"].selectedIndex].innerHTML;
}

var icon = "http://dev05.kloner.no/magento/kronemerker/pub/media/kloner/icon/" + text + ".png";
                if (this.imageData[item.item_id]) {
                    return icon;
                }
                return null;
            },
            getWidth: function(item) {
                if (this.imageData[item.item_id]) {
                    return this.imageData[item.item_id]['width'];
                }
                return null;
            },
            getHeight: function(item) {
                if (this.imageData[item.item_id]) {
                    return this.imageData[item.item_id]['height'];
                }
                return null;
            },
            getAlt: function(item) {
                if (this.imageData[item.item_id]) {
                    return this.imageData[item.item_id]['alt'];
                }
                return null;
            }
        });
    }
);
