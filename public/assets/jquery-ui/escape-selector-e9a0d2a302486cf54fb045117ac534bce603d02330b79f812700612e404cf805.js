!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){return $.ui=$.ui||{},$.ui.version="1.12.1"}),function(factory){"function"==typeof define&&define.amd?define(["jquery","./version"],factory):factory(jQuery)}(function($){return $.ui.escapeSelector=function(){var selectorEscape=/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;return function(selector){return selector.replace(selectorEscape,"\\$1")}}()});