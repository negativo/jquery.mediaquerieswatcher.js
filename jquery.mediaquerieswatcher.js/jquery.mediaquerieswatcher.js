(function($,window,document){
    $.mediaquerieswatcher = function(el, data, options){
        var base = this;
        var rootEl = "";
        base.$el = $(el);
        base.el = el;
        base.$el.data("mediaquerieswatcher", base);
        base.foundationRules = [
            { name: 'mobile', rule: 'and (max-width: 40em)', info: 'max-width 640px, mobile-only styles' },
            { name: 'medium', rule: 'and (min-width: 40em)', info: 'min-width 641px, medium screens' },
            { name: 'medium', rule: 'and (min-width: 40.063em) and (max-width: 64em)', info: 'min-width 641px and max-width 1024px' },
            { name: 'large',  rule: 'and (min-width: 64.063em)', info: 'min-width 1025px, large screens' },
            { name: 'large',  rule: 'and (min-width: 64.063em) and (max-width: 90em)', info: 'min-width 1024px and max-width 1440px' },
            { name: 'xlarge', rule: 'and (min-width: 90.063)', info: 'min-width 1441px, xlarge screens' },
            { name: 'xlarge', rule: 'and (min-width: 90.063) and (max-width: 120em) ', info: 'min-width 1441px, xlarge screens' },
            { name: 'xlarge', rule: 'and (min-width: 120em) ', info: 'min-width 1921px, xlarge screens' }
        ];
         base.checkMedia = function() {
            for(var i in base.foundationRules){
                var thisMedia = base.foundationRules[i];
                if(window.matchMedia('only screen '+thisMedia.rule).matches){
                    rootEl.html(thisMedia.name+' screen<br/> '+thisMedia.info+'<br/>rule: <br/>&nbsp;&nbsp;'+thisMedia.rule);
                }
            }
        };
        base.setup = function(){
            $('body').append($('<div id="mediaquerieswatcher" />'));
            rootEl = $('body').find('#mediaquerieswatcher');
        };
        window.addEventListener('resize', this.checkMedia, false);
        base.init = function(){
            base.options = $.extend({},$.mediaquerieswatcher.defaultOptions, options);
            base.setup();
            base.checkMedia();
        }();
    };
    $.mediaquerieswatcher.defaultOptions = {
        lib: "foundation",
    };
    $.fn.mediaquerieswatcher = function(view, options){
        return this.each(function(){
            (new $.mediaquerieswatcher(this, view, options));
            $this = $(this);
        });
    };
})(jQuery,window,document);
