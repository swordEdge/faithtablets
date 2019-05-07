/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.tooltip"),options="object"==typeof option&&option;(data||"destroy"!=option)&&(data||$this.data("bs.tooltip",data=new Tooltip(this,options)),"string"==typeof option&&data[option]())})}var Tooltip=function(element,options){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",element,options)};Tooltip.VERSION="3.2.0",Tooltip.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},Tooltip.prototype.init=function(type,element,options){this.enabled=!0,this.type=type,this.$element=$(element),this.options=this.getOptions(options),this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport);for(var triggers=this.options.trigger.split(" "),i=triggers.length;i--;){var trigger=triggers[i];if("click"==trigger)this.$element.on("click."+this.type,this.options.selector,$.proxy(this.toggle,this));else if("manual"!=trigger){var eventIn="hover"==trigger?"mouseenter":"focusin",eventOut="hover"==trigger?"mouseleave":"focusout";this.$element.on(eventIn+"."+this.type,this.options.selector,$.proxy(this.enter,this)),this.$element.on(eventOut+"."+this.type,this.options.selector,$.proxy(this.leave,this))}}this.options.selector?this._options=$.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS},Tooltip.prototype.getOptions=function(options){return options=$.extend({},this.getDefaults(),this.$element.data(),options),options.delay&&"number"==typeof options.delay&&(options.delay={show:options.delay,hide:options.delay}),options},Tooltip.prototype.getDelegateOptions=function(){var options={},defaults=this.getDefaults();return this._options&&$.each(this._options,function(key,value){defaults[key]!=value&&(options[key]=value)}),options},Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data("bs."+this.type);return self||(self=new this.constructor(obj.currentTarget,this.getDelegateOptions()),$(obj.currentTarget).data("bs."+this.type,self)),clearTimeout(self.timeout),self.hoverState="in",self.options.delay&&self.options.delay.show?void(self.timeout=setTimeout(function(){"in"==self.hoverState&&self.show()},self.options.delay.show)):self.show()},Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data("bs."+this.type);return self||(self=new this.constructor(obj.currentTarget,this.getDelegateOptions()),$(obj.currentTarget).data("bs."+this.type,self)),clearTimeout(self.timeout),self.hoverState="out",self.options.delay&&self.options.delay.hide?void(self.timeout=setTimeout(function(){"out"==self.hoverState&&self.hide()},self.options.delay.hide)):self.hide()},Tooltip.prototype.show=function(){var e=$.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var inDom=$.contains(document.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!inDom)return;var that=this,$tip=this.tip(),tipId=this.getUID(this.type);this.setContent(),$tip.attr("id",tipId),this.$element.attr("aria-describedby",tipId),this.options.animation&&$tip.addClass("fade");var placement="function"==typeof this.options.placement?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement,autoToken=/\s?auto?\s?/i,autoPlace=autoToken.test(placement);autoPlace&&(placement=placement.replace(autoToken,"")||"top"),$tip.detach().css({top:0,left:0,display:"block"}).addClass(placement).data("bs."+this.type,this),this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element);var pos=this.getPosition(),actualWidth=$tip[0].offsetWidth,actualHeight=$tip[0].offsetHeight;if(autoPlace){var orgPlacement=placement,$parent=this.$element.parent(),parentDim=this.getPosition($parent);placement="bottom"==placement&&pos.top+pos.height+actualHeight-parentDim.scroll>parentDim.height?"top":"top"==placement&&pos.top-parentDim.scroll-actualHeight<0?"bottom":"right"==placement&&pos.right+actualWidth>parentDim.width?"left":"left"==placement&&pos.left-actualWidth<parentDim.left?"right":placement,$tip.removeClass(orgPlacement).addClass(placement)}var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight);this.applyPlacement(calculatedOffset,placement);var complete=function(){that.$element.trigger("shown.bs."+that.type),that.hoverState=null};$.support.transition&&this.$tip.hasClass("fade")?$tip.one("bsTransitionEnd",complete).emulateTransitionEnd(150):complete()}},Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip(),width=$tip[0].offsetWidth,height=$tip[0].offsetHeight,marginTop=parseInt($tip.css("margin-top"),10),marginLeft=parseInt($tip.css("margin-left"),10);isNaN(marginTop)&&(marginTop=0),isNaN(marginLeft)&&(marginLeft=0),offset.top=offset.top+marginTop,offset.left=offset.left+marginLeft,$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0),$tip.addClass("in");var actualWidth=$tip[0].offsetWidth,actualHeight=$tip[0].offsetHeight;"top"==placement&&actualHeight!=height&&(offset.top=offset.top+height-actualHeight);var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight);delta.left?offset.left+=delta.left:offset.top+=delta.top;var arrowDelta=delta.left?2*delta.left-width+actualWidth:2*delta.top-height+actualHeight,arrowPosition=delta.left?"left":"top",arrowOffsetPosition=delta.left?"offsetWidth":"offsetHeight";$tip.offset(offset),this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],arrowPosition)},Tooltip.prototype.replaceArrow=function(delta,dimension,position){this.arrow().css(position,delta?50*(1-delta/dimension)+"%":"")},Tooltip.prototype.setContent=function(){var $tip=this.tip(),title=this.getTitle();$tip.find(".tooltip-inner")[this.options.html?"html":"text"](title),$tip.removeClass("fade in top bottom left right")},Tooltip.prototype.hide=function(){function complete(){"in"!=that.hoverState&&$tip.detach(),that.$element.trigger("hidden.bs."+that.type)}var that=this,$tip=this.tip(),e=$.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(e),e.isDefaultPrevented()?void 0:($tip.removeClass("in"),$.support.transition&&this.$tip.hasClass("fade")?$tip.one("bsTransitionEnd",complete).emulateTransitionEnd(150):complete(),this.hoverState=null,this)},Tooltip.prototype.fixTitle=function(){var $e=this.$element;($e.attr("title")||"string"!=typeof $e.attr("data-original-title"))&&$e.attr("data-original-title",$e.attr("title")||"").attr("title","")},Tooltip.prototype.hasContent=function(){return this.getTitle()},Tooltip.prototype.getPosition=function($element){$element=$element||this.$element;var el=$element[0],isBody="BODY"==el.tagName;return $.extend({},"function"==typeof el.getBoundingClientRect?el.getBoundingClientRect():null,{scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop(),width:isBody?$(window).width():$element.outerWidth(),height:isBody?$(window).height():$element.outerHeight()},isBody?{top:0,left:0}:$element.offset())},Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return"bottom"==placement?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:"top"==placement?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:"left"==placement?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}},Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0};if(!this.$viewport)return delta;var viewportPadding=this.options.viewport&&this.options.viewport.padding||0,viewportDimensions=this.getPosition(this.$viewport);if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll,bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight;topEdgeOffset<viewportDimensions.top?delta.top=viewportDimensions.top-topEdgeOffset:bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height&&(delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset)}else{var leftEdgeOffset=pos.left-viewportPadding,rightEdgeOffset=pos.left+viewportPadding+actualWidth;leftEdgeOffset<viewportDimensions.left?delta.left=viewportDimensions.left-leftEdgeOffset:rightEdgeOffset>viewportDimensions.width&&(delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset)}return delta},Tooltip.prototype.getTitle=function(){var title,$e=this.$element,o=this.options;return title=$e.attr("data-original-title")||("function"==typeof o.title?o.title.call($e[0]):o.title)},Tooltip.prototype.getUID=function(prefix){do prefix+=~~(1e6*Math.random());while(document.getElementById(prefix));return prefix},Tooltip.prototype.tip=function(){return this.$tip=this.$tip||$(this.options.template)},Tooltip.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},Tooltip.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},Tooltip.prototype.enable=function(){this.enabled=!0},Tooltip.prototype.disable=function(){this.enabled=!1},Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled},Tooltip.prototype.toggle=function(e){var self=this;e&&(self=$(e.currentTarget).data("bs."+this.type),self||(self=new this.constructor(e.currentTarget,this.getDelegateOptions()),$(e.currentTarget).data("bs."+this.type,self))),self.tip().hasClass("in")?self.leave(self):self.enter(self)},Tooltip.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var old=$.fn.tooltip;$.fn.tooltip=Plugin,$.fn.tooltip.Constructor=Tooltip,$.fn.tooltip.noConflict=function(){return $.fn.tooltip=old,this}}(jQuery);