!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){return $.ui=$.ui||{},$.ui.version="1.12.1"}),function(factory){"function"==typeof define&&define.amd?define(["jquery","./version"],factory):factory(jQuery)}(function($){return $.ui.plugin={add:function(module,option,set){var i,proto=$.ui[module].prototype;for(i in set)proto.plugins[i]=proto.plugins[i]||[],proto.plugins[i].push([option,set[i]])},call:function(instance,name,args,allowDisconnected){var i,set=instance.plugins[name];if(set&&(allowDisconnected||instance.element[0].parentNode&&11!==instance.element[0].parentNode.nodeType))for(i=0;i<set.length;i++)instance.options[set[i][0]]&&set[i][1].apply(instance.element,args)}}});