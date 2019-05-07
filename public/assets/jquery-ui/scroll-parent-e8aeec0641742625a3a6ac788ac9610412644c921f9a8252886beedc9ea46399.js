!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){return $.ui=$.ui||{},$.ui.version="1.12.1"}),/*!
 * jQuery UI Scroll Parent 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","./version"],factory):factory(jQuery)}(function($){return $.fn.scrollParent=function(includeHidden){var position=this.css("position"),excludeStaticParent="absolute"===position,overflowRegex=includeHidden?/(auto|scroll|hidden)/:/(auto|scroll)/,scrollParent=this.parents().filter(function(){var parent=$(this);return excludeStaticParent&&"static"===parent.css("position")?!1:overflowRegex.test(parent.css("overflow")+parent.css("overflow-y")+parent.css("overflow-x"))}).eq(0);return"fixed"!==position&&scrollParent.length?scrollParent:$(this[0].ownerDocument||document)}});