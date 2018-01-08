


require(['jquery','textfit','imagepicker', 'domtoimage','domReady!'],function($){
    
    //layout
//jQuery( "#product-options-wrapper .field:eq( 0 )" ).css("display", "block");
//jQuery( "#product-options-wrapper .field:eq( 1 )" ).css("width", "100%");
//jQuery( "#product-options-wrapper .field:eq( 2 )" ).css("width", "50%");
//jQuery( "#product-options-wrapper .field:eq( 3 )" ).css("width", "50%");
//jQuery( "#product-options-wrapper .field:eq( 4 )" ).css("width", "50%");
//jQuery( "#product-options-wrapper .field:eq( 5 )" ).css("width", "50%");


//jQuery( "#product-options-wrapper .field" ).css("float", "left");
//jQuery( "#product-options-wrapper .field" ).css("float", "left");


jQuery(".product-info-main").after('<div id="the_cullom"><h2>Velg design</h2></div>');

jQuery(".product-info-main").prepend('<div id="the_mark"></div>');

jQuery("#the_mark").prepend('<div id="editable_label" class="mark"></div>');
jQuery("#editable_label").append('<div class="mark_image"></div>');
jQuery("#editable_label").append('<div class="mark_name"><div id="mark_name_edit" spellcheck="false" contenteditable>Skriv her</div></div>');
     



//icons
//jQuery('.mark_image').css("background-image", 'url("http://dev05.kloner.no/magento/kronemerker/pub/media/kloner/icon/cat.png")' );
//jQuery('.mark_image').css("background-size","contain");

var first_icon = jQuery("#the_cullom div.thumbnail:first-of-type");
first_icon.addClass( "selected" );

var icon_el = jQuery("#product-options-wrapper select:eq(0)");
icon_el.find('option:eq(1)').prop('selected', true);
var icon_el_label = jQuery("#product-options-wrapper label:eq(0)");
var icon_options =  icon_el.children('option');
var real_input = jQuery('#product-options-wrapper textarea.product-custom-option:nth-of-type(1)');
var editable_box = jQuery('#editable_label');
var editable_label = jQuery('#editable_label .mark_name');
var editable_label_edit = jQuery('#mark_name_edit');
var editable_image = jQuery('#editable_label .mark_image');
var hidden_box = jQuery('#hidden_mark');
var hidden_label = jQuery('#hidden_mark .mark_name');
var hidden_image = jQuery('#hidden_mark .mark_image');

var mark  = jQuery('.mark');

var editable_box_height = editable_box.width() / 2.3135;

editable_box.css("height", editable_box_height);
editable_image.css("width", editable_box_height-16);     
editable_image.css("height", editable_box_height-16);
editable_image.css("border-radius", "16px 0 0 16px");
editable_image.css("display", "none");
editable_label.css("text-align", "center"); 
editable_label.css("width", "100%");     
editable_label.css("height", editable_box_height);

hidden_box.css("width", editable_box.width());
hidden_box.css("height", editable_box_height);

hidden_image.css("width", editable_box_height);     
hidden_image.css("height", editable_box_height);
hidden_image.css("display", "none");
hidden_label.css("width", "98%");  
hidden_label.css("height", editable_box_height);

icon_el_label.css("display", "none");

    //do placeholder
var placeholder = "Skriv her"; //Change this to your placeholder text
	editable_label_edit.focus(function() {
		 console.log("focus","-"+jQuery(this).text() + "-");
    if (jQuery(this).text().trim() == placeholder) {
    	console.log("focus match");
        jQuery(this).html('');
    }
}).focusout(function() {
    if (!jQuery(this).text().length) {
        jQuery(this).html(placeholder);
        ajust_font_margin();
    }
});



var calculateContentHeight = function( ta, scanAmount ) {
    var origHeight = ta.style.height,
        height = ta.offsetHeight,
        scrollHeight = ta.scrollHeight,
        overflow = ta.style.overflow;
    /// only bother if the ta is bigger than content
    if ( height >= scrollHeight ) {
        /// check that our browser supports changing dimension
        /// calculations mid-way through a function call...
        ta.style.height = (height + scanAmount) + 'px';
        /// because the scrollbar can cause calculation problems
        ta.style.overflow = 'hidden';
        /// by checking that scrollHeight has updated
        if ( scrollHeight < ta.scrollHeight ) {
            /// now try and scan the ta's height downwards
            /// until scrollHeight becomes larger than height
            while (ta.offsetHeight >= ta.scrollHeight) {
                ta.style.height = (height -= scanAmount)+'px';
            }
            /// be more specific to get the exact height
            while (ta.offsetHeight < ta.scrollHeight) {
                ta.style.height = (height++)+'px';
            }
            /// reset the ta back to it's original height
            ta.style.height = origHeight;
            /// put the overflow back
            ta.style.overflow = overflow;
            return height;
        }
    }
    else {
        return scrollHeight;
    }
}

var calculateHeight = function() {
    var ta = document.getElementById("mark_name_edit"),
        style = (window.getComputedStyle) ?
            window.getComputedStyle(ta) : ta.currentStyle,
        
        // This will get the line-height only if it is set in the css,
        // otherwise it's "normal"
        taLineHeight = parseInt(style.lineHeight, 10),
        // Get the scroll height of the textarea
        taHeight = calculateContentHeight(ta, taLineHeight),
        // calculate the number of lines
        numberOfLines = Math.floor(taHeight / taLineHeight);
return numberOfLines;
        
};


         console.log("icon_el",icon_el);
console.log("icon_options",icon_options);  
//set icons
icon_options.each(function() {
    if(this.value > 0){

        jQuery(this).attr("data-img-src", 'http://dev05.kloner.no/magento/kronemerker/pub/media/kloner/icon/' + this.text+'.png');
        jQuery(this).attr("data-img-class", 'smalicon');
        jQuery(this).attr("data-img-label", this.text);
    }
});



icon_el.imagepicker({
    show_smal : true,
    hide_select : true,
    show_label  : false, 
    initialized:  function(picker) {
       
       console.log("imagepicker initialized", picker); 
       //console.log("picker",picker.selected_values());
    },           
    selected: function(selected) {
        console.log("selected.option",selected.option);
        console.log("selected.option",selected.option.data("img-label"));

        if(selected.option.data("img-label") == "Blank"){
        hidden_label.css("width", "98%");  
        editable_label.css("width", "100%"); 
        editable_label.css("text-align", "center"); 
        ajust_font_margin();
        editable_image.css("display", "none");
        }else{
            hidden_label.css("width", editable_box.width() - editable_box_height -20);  
        editable_label.css("width", editable_box.width() - editable_box_height -20);
        editable_label.css("text-align", "left"); 
        ajust_font_margin();
        editable_image.css("display", "block");
        editable_image.css("background-image", 'url(' +selected.option.data("img-src")+')' );
        }
        

    }
});

      
//fonts
//var fonts = {25: "Arial", 26: "Verdana, Geneva, sans-serif", 27: "Impact", 28: "Comic Sans MS",29: "Times New Roman, Times"};


//textarea
var tab = RegExp("\\t", "g");
console.log("texttext",editable_label_edit.text().replace(tab,'')); 

real_input.val(editable_label_edit.text().replace(tab,''));
//var actual_size_text = jQuery('#actual_label .mark_name_smal');


//actual_size_text.html(hidden_label.html());

if(real_input.val()){
    jQuery('.hidden_mark_name_edit').text(real_input.val());
    //jQuery('.mark_name_smal').html(editable_label_edit.html());
}
ajust_font_margin();

/*
jQuery('.hidden_mark_name .textfitted').contents()
                       .filter(function() { 
                           return !!$.trim( this.innerHTML || this.data ); 
                       })
                       .first().wrapInner( "<strong></strong>");

*/

//on keyup
editable_label_edit.on('keyup', function(e) {
    console.log("keyup");
    if(jQuery(this).html()){
        //jQuery('.mark_name').text(jQuery(this).val());
        //console.log("first replace",nl2br(jQuery(this).text()));
        //console.log("secend replace",jQuery(this).val().replace("\n", "<br />", "g"));
        var text_el = jQuery(this);
		var html_text = text_el.html();
		//var text_text = text_el.text();



/*


        if(!text_el.find("span")){
            console.log("no span");

        }

		var nb_of_br = jQuery('#mark_name_edit br').length;
		var text_array = text_text.replace(/^\s+/g, "").trim().split(" ");
		var nb_of_space = text_array.length - 1;
		var nb_of_char = text_text.replace(/^\s+/g, "").length;

		console.log("text_text length",nb_of_char);
		console.log("nb_of_br",nb_of_br);
		console.log("nb_of_space",nb_of_space);

        if(nb_of_char > 11 && nb_of_br == 0 && nb_of_space == 1){
        	console.log("create brake");
 		//var start = editable_label.selectionStart,
        //var end = editable_label.selectionEnd;
        //console.log("start end", start end);
        //	text_el.html(html_text.replace(/ /g,"_"));
        	//text_el.setSelectionRange(start, end);
        }
           var text = text_el.clone().find("span").remove();
        console.log("--text--", text);
        */
     
        var end_text = html_text.trim().replace(/\s+/g, " ").replace(/(<br>\s*)+$/,'');
        real_input.val(end_text);

        //jQuery('.mark_name_smal').html(jQuery(this).html());
        jQuery('.hidden_mark_name_edit').html(jQuery(this).remove('span').html().replace(/(<br>\s*)+$/,''));
        //jQuery('.mark_name').text(jQuery(this).val());
        //jQuery('#hidden_label .mark_name').html(nl2br(jQuery(this).val()));
        ajust_font_margin();
    }    
});

//stopp more tha 2 linebreaks
editable_label_edit.on('keydown', function(e) {
	console.log("keydown");
   // ajust_font_margin();
   /*
    var lines = 3;
    //newLines = $(this).find('br').length;

	var numberOfLines = calculateHeight();

	console.log("numberOfLines",numberOfLines);
    console.log("keyCode",e.keyCode);

    if(e.keyCode == 13 && numberOfLines >= lines) {
	   jQuery( '<div class="error">Maksimum 3 linjer</div>').insertBefore( "#the_mark" );
    	
        return false;
    }
    */
});

//hidden label 

//initial magento text field
    jQuery("#run_textfit").click(function() { 
        ajust_font_margin ();
    });
    jQuery("#run_margin").click(function() {
   	    ajust_font_margin ();

    });
    
    jQuery("#btnSave").click(function() { 
        console.log("btnSave was clicked");
        var node = document.getElementById('editable_label');

        var options = { width: 85, height: 37, quality: 1 };
        domtoimage.toSvg(node, options).then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    });  

    jQuery("#btnSave2").click(function() { 
        //updatePreview ();
        console.log("btnSave2 was clicked");
        var node2 = document.getElementById('hidden_mark');
        var options = { width: 85, height: 37, quality: 1 };
        domtoimage.toSvg(node2, options).then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
            //updatePreview(img);
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    });      


/*

var ta2 = document.getElementById("mark_name_edit");
if (ta2.addEventListener) {
    ta2.addEventListener("mouseup", calculateHeight, false);
    ta2.addEventListener("keyup", calculateHeight, false);
} else if (ta2.attachEvent) { // IE
    ta2.attachEvent("onmouseup", calculateHeight);
    ta2.attachEvent("onkeyup", calculateHeight);
}
*/
function set_style(selected_label){

            if(selected_label == "Classic"){
                //jQuery(this).removeAttr("data-img-src");
                jQuery('.mark').addClass("classic");
                jQuery('.mark').removeClass("style1");
                jQuery('.mark').removeClass("style2");
                set_classic_style();
            }
            if(selected_label == "Classic uten ikon"){
                set_noicon_style();
            }
            if(selected_label == "Moderne"){
                console.log("Bakgrund2--");
                //jQuery('#hidden_label').slabText();
                jQuery('.mark').addClass("style1");
                jQuery('.mark').removeClass("classic");
                jQuery('.mark').removeClass("style2");
                set_modern_style();

            }
}
function set_classic_style(){
        mark.css('background-size', 'contain');
        mark.css('font-family', "Verdana, Geneva, sans-serif");
        mark.css('text-align', 'center');
        mark.css('text-transform', 'none');
   }
function set_modern_style(){
        mark.css('background-size', '130%');
        mark.css('font-family', "Comic Sans MS");
        mark.css('text-align', 'left');
        mark.css('text-transform', 'uppercase');
   }
function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}


function updatePreview () {
    //var actual_el = "";
    //actual_el = jQuery("#hidden_mark").removeAttr("id");
    var count = 21;
 
    var preview_el = jQuery("#preview");

    for(i = 0; i < count; i++) {
        console.log("running preview "+i);
        //actual_el.clone().appendTo( preview_el );
    };
}

function ajust_font_margin () {  
   jQuery('.hidden_mark_name').textFit({
        multiLine: true,
        reProcess: true,
        minFontSize: 40,
        maxFontSize: 110
    }); 

   var font_size = jQuery('.hidden_mark_name_edit').css("font-size");
  	console.log("new font_size",font_size);

	var calc_font_size = font_size.replace('px', '');
	//var calc_smal_font_size = calc_font_size/4.16;
    //jQuery('#actual_label .mark_name_smal').css("font-size", calc_smal_font_size+'px');

    //sett the big visual
    editable_label_edit.css("font-size", font_size);
    
    setTopMargin();

   var numberOfLines = calculateHeight();
}

function setTopMargin() {
    var text = jQuery('#hidden_mark .hidden_mark_name_edit');
    var box = jQuery('#hidden_mark .mark_name') ;
    var editable_span = jQuery('#mark_name_edit') ;
    //var actual = jQuery('#actual_label .mark_name_smal span') ;
    var diff = 0;
    var topmargin = 0;
    var textheight = text.height();
    console.log("textheight",textheight);
    var boxheight = box.height() ;
    console.log("boxheight",boxheight);
    if(textheight < boxheight){
        diff = boxheight - textheight;
        console.log("diff",diff);
        topmargin = diff/2;
        console.log("topmargin",topmargin);
        text.children().first().css("margin-top", topmargin);
        text.css("color", "black");
        editable_span.css("margin-top", topmargin);
        //actual.css("margin-top", topmargin/4.16);
    }else{
        text.css("margin-top", 0);
        editable_span.css("margin-top", 0);
        //actual.css("margin-top", 0);
    }
    //text.css("display", "inline-block");
    //actual.css("display", "inline-block");
   
}

function getImageLightness(imageSrc,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness);
    }
}


});