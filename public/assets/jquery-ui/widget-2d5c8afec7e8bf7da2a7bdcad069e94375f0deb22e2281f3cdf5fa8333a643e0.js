!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){return $.ui=$.ui||{},$.ui.version="1.12.1"}),
/*!
 * jQuery UI Widget 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","./version"],factory):factory(jQuery)}(function($){var orig,widgetUuid=0,widgetSlice=Array.prototype.slice;return $.cleanData=(orig=$.cleanData,function(elems){var events,elem,i;for(i=0;null!=(elem=elems[i]);i++)try{(events=$._data(elem,"events"))&&events.remove&&$(elem).triggerHandler("remove")}catch(e){}orig(elems)}),$.widget=function(name,base,prototype){var existingConstructor,constructor,basePrototype,proxiedPrototype={},namespace=name.split(".")[0],fullName=namespace+"-"+(name=name.split(".")[1]);return prototype||(prototype=base,base=$.Widget),$.isArray(prototype)&&(prototype=$.extend.apply(null,[{}].concat(prototype))),$.expr[":"][fullName.toLowerCase()]=function(elem){return!!$.data(elem,fullName)},$[namespace]=$[namespace]||{},existingConstructor=$[namespace][name],constructor=$[namespace][name]=function(options,element){if(!this._createWidget)return new constructor(options,element);arguments.length&&this._createWidget(options,element)},$.extend(constructor,existingConstructor,{version:prototype.version,_proto:$.extend({},prototype),_childConstructors:[]}),(basePrototype=new base).options=$.widget.extend({},basePrototype.options),$.each(prototype,function(prop,value){$.isFunction(value)?proxiedPrototype[prop]=function(){function _super(){return base.prototype[prop].apply(this,arguments)}function _superApply(args){return base.prototype[prop].apply(this,args)}return function(){var returnValue,__super=this._super,__superApply=this._superApply;return this._super=_super,this._superApply=_superApply,returnValue=value.apply(this,arguments),this._super=__super,this._superApply=__superApply,returnValue}}():proxiedPrototype[prop]=value}),constructor.prototype=$.widget.extend(basePrototype,{widgetEventPrefix:existingConstructor&&basePrototype.widgetEventPrefix||name},proxiedPrototype,{constructor:constructor,namespace:namespace,widgetName:name,widgetFullName:fullName}),existingConstructor?($.each(existingConstructor._childConstructors,function(i,child){var childPrototype=child.prototype;$.widget(childPrototype.namespace+"."+childPrototype.widgetName,constructor,child._proto)}),delete existingConstructor._childConstructors):base._childConstructors.push(constructor),$.widget.bridge(name,constructor),constructor},$.widget.extend=function(target){for(var key,value,input=widgetSlice.call(arguments,1),inputIndex=0,inputLength=input.length;inputIndex<inputLength;inputIndex++)for(key in input[inputIndex])value=input[inputIndex][key],input[inputIndex].hasOwnProperty(key)&&value!==undefined&&($.isPlainObject(value)?target[key]=$.isPlainObject(target[key])?$.widget.extend({},target[key],value):$.widget.extend({},value):target[key]=value);return target},$.widget.bridge=function(name,object){var fullName=object.prototype.widgetFullName||name;$.fn[name]=function(options){var isMethodCall="string"==typeof options,args=widgetSlice.call(arguments,1),returnValue=this;return isMethodCall?this.length||"instance"!==options?this.each(function(){var methodValue,instance=$.data(this,fullName);return"instance"===options?(returnValue=instance,!1):instance?$.isFunction(instance[options])&&"_"!==options.charAt(0)?(methodValue=instance[options].apply(instance,args))!==instance&&methodValue!==undefined?(returnValue=methodValue&&methodValue.jquery?returnValue.pushStack(methodValue.get()):methodValue,!1):void 0:$.error("no such method '"+options+"' for "+name+" widget instance"):$.error("cannot call methods on "+name+" prior to initialization; attempted to call method '"+options+"'")}):returnValue=undefined:(args.length&&(options=$.widget.extend.apply(null,[options].concat(args))),this.each(function(){var instance=$.data(this,fullName);instance?(instance.option(options||{}),instance._init&&instance._init()):$.data(this,fullName,new object(options,this))})),returnValue}},$.Widget=function(){},$.Widget._childConstructors=[],$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(options,element){element=$(element||this.defaultElement||this)[0],this.element=$(element),this.uuid=widgetUuid++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=$(),this.hoverable=$(),this.focusable=$(),this.classesElementLookup={},element!==this&&($.data(element,this.widgetFullName,this),this._on(!0,this.element,{remove:function(event){event.target===element&&this.destroy()}}),this.document=$(element.style?element.ownerDocument:element.document||element),this.window=$(this.document[0].defaultView||this.document[0].parentWindow)),this.options=$.widget.extend({},this.options,this._getCreateOptions(),options),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){var that=this;this._destroy(),$.each(this.classesElementLookup,function(key,value){that._removeClass(value,key)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:$.noop,widget:function(){return this.element},option:function(key,value){var parts,curOption,i,options=key;if(0===arguments.length)return $.widget.extend({},this.options);if("string"==typeof key)if(options={},key=(parts=key.split(".")).shift(),parts.length){for(curOption=options[key]=$.widget.extend({},this.options[key]),i=0;i<parts.length-1;i++)curOption[parts[i]]=curOption[parts[i]]||{},curOption=curOption[parts[i]];if(key=parts.pop(),1===arguments.length)return curOption[key]===undefined?null:curOption[key];curOption[key]=value}else{if(1===arguments.length)return this.options[key]===undefined?null:this.options[key];options[key]=value}return this._setOptions(options),this},_setOptions:function(options){var key;for(key in options)this._setOption(key,options[key]);return this},_setOption:function(key,value){return"classes"===key&&this._setOptionClasses(value),this.options[key]=value,"disabled"===key&&this._setOptionDisabled(value),this},_setOptionClasses:function(value){var classKey,elements,currentElements;for(classKey in value)currentElements=this.classesElementLookup[classKey],value[classKey]!==this.options.classes[classKey]&&currentElements&&currentElements.length&&(elements=$(currentElements.get()),this._removeClass(currentElements,classKey),elements.addClass(this._classes({element:elements,keys:classKey,classes:value,add:!0})))},_setOptionDisabled:function(value){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!value),value&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(options){function processClassString(classes,checkOption){var current,i;for(i=0;i<classes.length;i++)current=that.classesElementLookup[classes[i]]||$(),current=options.add?$($.unique(current.get().concat(options.element.get()))):$(current.not(options.element).get()),that.classesElementLookup[classes[i]]=current,full.push(classes[i]),checkOption&&options.classes[classes[i]]&&full.push(options.classes[classes[i]])}var full=[],that=this;return options=$.extend({element:this.element,classes:this.options.classes||{}},options),this._on(options.element,{remove:"_untrackClassesElement"}),options.keys&&processClassString(options.keys.match(/\S+/g)||[],!0),options.extra&&processClassString(options.extra.match(/\S+/g)||[]),full.join(" ")},_untrackClassesElement:function(event){var that=this;$.each(that.classesElementLookup,function(key,value){-1!==$.inArray(event.target,value)&&(that.classesElementLookup[key]=$(value.not(event.target).get()))})},_removeClass:function(element,keys,extra){return this._toggleClass(element,keys,extra,!1)},_addClass:function(element,keys,extra){return this._toggleClass(element,keys,extra,!0)},_toggleClass:function(element,keys,extra,add){add="boolean"==typeof add?add:extra;var shift="string"==typeof element||null===element,options={extra:shift?keys:extra,keys:shift?element:keys,element:shift?this.element:element,add:add};return options.element.toggleClass(this._classes(options),add),this},_on:function(suppressDisabledCheck,element,handlers){var delegateElement,instance=this;"boolean"!=typeof suppressDisabledCheck&&(handlers=element,element=suppressDisabledCheck,suppressDisabledCheck=!1),handlers?(element=delegateElement=$(element),this.bindings=this.bindings.add(element)):(handlers=element,element=this.element,delegateElement=this.widget()),$.each(handlers,function(event,handler){function handlerProxy(){if(suppressDisabledCheck||!0!==instance.options.disabled&&!$(this).hasClass("ui-state-disabled"))return("string"==typeof handler?instance[handler]:handler).apply(instance,arguments)}"string"!=typeof handler&&(handlerProxy.guid=handler.guid=handler.guid||handlerProxy.guid||$.guid++);var match=event.match(/^([\w:-]*)\s*(.*)$/),eventName=match[1]+instance.eventNamespace,selector=match[2];selector?delegateElement.on(eventName,selector,handlerProxy):element.on(eventName,handlerProxy)})},_off:function(element,eventName){eventName=(eventName||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,element.off(eventName).off(eventName),this.bindings=$(this.bindings.not(element).get()),this.focusable=$(this.focusable.not(element).get()),this.hoverable=$(this.hoverable.not(element).get())},_delay:function(handler,delay){function handlerProxy(){return("string"==typeof handler?instance[handler]:handler).apply(instance,arguments)}var instance=this;return setTimeout(handlerProxy,delay||0)},_hoverable:function(element){this.hoverable=this.hoverable.add(element),this._on(element,{mouseenter:function(event){this._addClass($(event.currentTarget),null,"ui-state-hover")},mouseleave:function(event){this._removeClass($(event.currentTarget),null,"ui-state-hover")}})},_focusable:function(element){this.focusable=this.focusable.add(element),this._on(element,{focusin:function(event){this._addClass($(event.currentTarget),null,"ui-state-focus")},focusout:function(event){this._removeClass($(event.currentTarget),null,"ui-state-focus")}})},_trigger:function(type,event,data){var prop,orig,callback=this.options[type];if(data=data||{},(event=$.Event(event)).type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase(),event.target=this.element[0],orig=event.originalEvent)for(prop in orig)prop in event||(event[prop]=orig[prop]);return this.element.trigger(event,data),!($.isFunction(callback)&&!1===callback.apply(this.element[0],[event].concat(data))||event.isDefaultPrevented())}},$.each({show:"fadeIn",hide:"fadeOut"},function(method,defaultEffect){$.Widget.prototype["_"+method]=function(element,options,callback){var hasOptions;"string"==typeof options&&(options={effect:options});var effectName=options?!0===options||"number"==typeof options?defaultEffect:options.effect||defaultEffect:method;"number"==typeof(options=options||{})&&(options={duration:options}),hasOptions=!$.isEmptyObject(options),options.complete=callback,options.delay&&element.delay(options.delay),hasOptions&&$.effects&&$.effects.effect[effectName]?element[method](options):effectName!==method&&element[effectName]?element[effectName](options.duration,options.easing,callback):element.queue(function(next){$(this)[method](),callback&&callback.call(element[0]),next()})}}),$.widget});