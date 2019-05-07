!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){return $.ui=$.ui||{},$.ui.version="1.12.1"}),/*!
 * jQuery UI :data 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","./version"],factory):factory(jQuery)}(function($){return $.extend($.expr[":"],{data:$.expr.createPseudo?$.expr.createPseudo(function(dataName){return function(elem){return!!$.data(elem,dataName)}}):function(elem,i,match){return!!$.data(elem,match[3])}})});