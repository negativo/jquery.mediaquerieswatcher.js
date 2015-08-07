(function($,window,document){
    $.mediaquerieswatcher = function(options, el){
        var base = this,
            rootEl = "",
            lib = "",
            allStyleSheets = document.styleSheets;
        base.$el = $(el);
        base.el = el;
        base.$el.data("mediaquerieswatcher", base);
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
            ]
        };
        base.checkMedia = function() {
            var theLib = base.rules[base.options.lib];
            for(var i in theLib){
                var thisMedia = theLib[i];

                if(window.matchMedia('only screen '+thisMedia.rule).matches){
                    rootEl.find('.content').html('<div class="mqw"><span class="mqw">screen size: </span>'+thisMedia.name+'</div><div class="mqw"><span class="mqw">actual pixels: </span>'+thisMedia.info.replace('min-width','From').replace('and max-width','To').replace('max-width','Until')+'</div><div class="mqw"><span class="mqw">responsive rule:</span>@media only screen '+thisMedia.rule+'</div>');
                }
                $('body').find('.framework.mqw').html(base.options.lib);
            }                
        };
        base.setup = function(){
            var baseHtml = '<div id="mediaquerieswatcher" class="mqw" >'+
                                '<div class="mqw buttons">'+
                                    '<div class="mqw maincolor"></div>'+
                                    '<div class="mqw secondarycolor"></div>'+
                                    '<div class="mqw thirdcolor"></div>'+
                                    '<div class="mqw fourthcolor"></div>'+
                                '</div>'+
                                '<div class="mqw framework"></div>'+
                                '<div class="mqw content"></div>'+
                                '<div class="mqw rules"></div>'+
                            '</div>';
            $('body').append($(baseHtml));
            rootEl = $('#mediaquerieswatcher');
            if(base.options.positioning === 'fixed'){
                rootEl.addClass('fixedpositioning');
                rootEl.addClass(base.options.position);   
            }
            
            rootEl.find('.rules').hide();
        };
        window.addEventListener('resize', this.checkMedia, false);
        base.init = function(){
            base.options = $.extend( {}, $.mediaquerieswatcher.defaultOptions, options );
            base.setup();
            base.checkMedia();
            if(base.options.positioning === 'draggable'){
                rootEl.draggable();    
            }
        }();
        function getStylez(el){
            var comp = el.currentStyle || getComputedStyle(el, null);
            return comp;
        }
        function getRules(el){
            var rulex = [];
            for(var i in allStyleSheets){
                var sheet = allStyleSheets[i],
                    sheetRules=sheet.cssRules ? sheet.cssRules: sheet.rules;
                    console.log("jquery.mediaquerieswatcher.js", i);
                for (var j in sheetRules){
                    var sr = sheetRules[j],
                        text = sr.cssText;
                    if(text.indexOf(el)!=-1){
                        rulex.push(sheetRules[j]);
                    }
                }
            }
            return rulex;
        }
        window.addEventListener('resize', this.checkMedia, false);
        $('.buttons').find('div').click(function(){
            rootEl.css('background-color',$(this).css('background-color'));
        });

        rootEl.find('.rules').delegate('.rule','click',function(e){
            e.stopPropagation();
            console.log('test, rule clicked ->'+ $(this).html());
          
        });
        rootEl.find('.rules').delegate('div','click',function(e){
            e.stopPropagation();
            console.log('test, rule clicked ->'+ $(this).parent().find('.rule').html());
          
        });

        $('*').each(function(){
            if(!$(this).hasClass('mqw')){
                $(this).click(function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var rulez = window.getMatchedCSSRules(this),
                        rujes = [];
                    rootEl.find('.rules').html(' ');
                    for(var i in rulez){
                        if(rulez[i].cssText){
                            var theText = rulez[i].cssText,
                                count = theText.match(/^(,*)/)[0].length;
                            rujes.push(theText);
                        }
                    }
                    rujes.reverse();
                    for(var i in rujes){
                        var string = '<span class="rule">'+ rujes[i],
                            first = string.replace('{','</span>{<div>'),
                            last = first.replace('}','</div>}<br/>'),
                            clean = last.replace( new RegExp("\\;","gm"),';<br/>');
                        rootEl.find('.rules').append('<br/>'+clean);    
                    }
                    if(rootEl.find('.rules').html() != ' ') { 
                        rootEl.find('.rules').show();
                    }else{ 
                        rootEl.find('.rules').hide();
                    }
                });
            }         
        });
    };
    $.mediaquerieswatcher.defaultOptions = {
        lib: "foundation5",
        positioning: "draggable", // draggable | absolute
        position: "top-center"  
    };
    $.fn.mediaquerieswatcher = function(options){
        return this.each(function(){
            (new $.mediaquerieswatcher(this,options));
            $this = $(this);
        });
    };

})(jQuery,window,document);