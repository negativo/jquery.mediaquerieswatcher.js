(function($,window,document){
    $.mediaquerieswatcher = function(options, el){
        var base = this;
        var rootEl = "";
        base.$el = $(el);
        base.el = el;
        base.$el.data("mediaquerieswatcher", base);
        var lib = "";
        base.rules= { foundation5: [
            { name: 'mobile', rule: 'and (max-width: 40em)', info: 'max-width 640px, mobile-only styles' },
            { name: 'medium', rule: 'and (min-width: 40em)', info: 'min-width 641px, medium screens' },
            { name: 'medium', rule: 'and (min-width: 40.063em) and (max-width: 64em)', info: 'min-width 641px and max-width 1024px' },
            { name: 'large',  rule: 'and (min-width: 64.063em)', info: 'min-width 1025px, large screens' },
            { name: 'large',  rule: 'and (min-width: 64.063em) and (max-width: 90em)', info: 'min-width 1024px and max-width 1440px' },
            { name: 'xlarge', rule: 'and (min-width: 90.063)', info: 'min-width 1441px, xlarge screens' },
            { name: 'xlarge', rule: 'and (min-width: 90.063) and (max-width: 120em) ', info: 'min-width 1441px, xlarge screens' },
            { name: 'xlarge', rule: 'and (min-width: 120em) ', info: 'min-width 1921px, xlarge screens' }
        ],
        bootstrap3: [
            { name: 'xs - extra small', rule: 'and (max-width: 767px)', info: 'max-width: 767px' },
            { name: 'sm - small', rule: 'and (min-width: 768px) and (max-width: 991px)', info: 'min-width 768px and max-width 991px' },
            { name: 'md - medium', rule: 'and (min-width: 992px) and (max-width: 1199px)', info: 'min-width 992px and max-width 1199px' },
            { name: 'lg - large', rule: 'and (min-width: 1200px)', info: 'min-width: 1200px' },
        ]};

        base.checkMedia = function() {
            
                
                var theLib = base.rules[base.options.lib];
                
                
                    
                    for(var i in theLib){
                        console.log(theLib[i]);
                        var thisMedia = theLib[i];
                        if(window.matchMedia('only screen '+thisMedia.rule).matches){
                            rootEl.find('.content').html('<div><span>screen size: </span>'+thisMedia.name+'</div><div><span>actual pixels: </span>'+thisMedia.info.replace('min-width','From').replace('and max-width','To').replace('max-width','Until')+'</div><div><span>responsive rule:</span>@media only screen '+thisMedia.rule+'</div>');
                        }
                    }        
                
            
            
        };
        base.setup = function(){
            $('body').append($('<div id="mediaquerieswatcher" ><div class="buttons"></div><div class="content"></div></div>'));
            $('#mediaquerieswatcher').addClass(base.options.position);
            rootEl = $('#mediaquerieswatcher');
        };
        base.init = function(){
            base.options = $.extend({},$.mediaquerieswatcher.defaultOptions, options);
            base.setup();
            base.checkMedia();
        }();
        window.addEventListener('resize', this.checkMedia, false);
    };
    $.mediaquerieswatcher.defaultOptions = {
        lib: "foundation5",
        position: "top-center"  
    };
    $.fn.mediaquerieswatcher = function(options){
        return this.each(function(){
            (new $.mediaquerieswatcher(this,options));
            $this = $(this);
        });
    };
})(jQuery,window,document);


