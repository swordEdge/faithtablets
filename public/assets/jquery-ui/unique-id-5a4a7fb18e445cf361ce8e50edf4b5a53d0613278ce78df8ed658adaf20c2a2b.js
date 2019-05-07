!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){return $.ui=$.ui||{},$.ui.version="1.12.1"}),
/*!
 * jQuery UI Unique ID 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","./version"],factory):factory(jQuery)}(function($){return $.fn.extend({uniqueId:(uuid=0,function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++uuid)})}),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&$(this).removeAttr("id")})}});var uuid});