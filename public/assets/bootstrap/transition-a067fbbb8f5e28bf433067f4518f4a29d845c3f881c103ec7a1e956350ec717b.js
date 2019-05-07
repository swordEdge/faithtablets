/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function($){"use strict";function transitionEnd(){var el=document.createElement("bootstrap"),transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var name in transEndEventNames)if(el.style[name]!==undefined)return{end:transEndEventNames[name]};return!1}$.fn.emulateTransitionEnd=function(duration){var called=!1,$el=this;return $(this).one("bsTransitionEnd",function(){called=!0}),setTimeout(function(){called||$($el).trigger($.support.transition.end)},duration),this},$(function(){$.support.transition=transitionEnd(),$.support.transition&&($.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}})})}(jQuery);