!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){return $.ui=$.ui||{},$.ui.version="1.12.1"}),
/*!
 * jQuery UI Widget 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","./version"],factory):factory(jQuery)}(function($){var orig,widgetUuid=0,widgetSlice=Array.prototype.slice;return $.cleanData=(orig=$.cleanData,function(elems){var events,elem,i;for(i=0;null!=(elem=elems[i]);i++)try{(events=$._data(elem,"events"))&&events.remove&&$(elem).triggerHandler("remove")}catch(e){}orig(elems)}),$.widget=function(name,base,prototype){var existingConstructor,constructor,basePrototype,proxiedPrototype={},namespace=name.split(".")[0],fullName=namespace+"-"+(name=name.split(".")[1]);return prototype||(prototype=base,base=$.Widget),$.isArray(prototype)&&(prototype=$.extend.apply(null,[{}].concat(prototype))),$.expr[":"][fullName.toLowerCase()]=function(elem){return!!$.data(elem,fullName)},$[namespace]=$[namespace]||{},existingConstructor=$[namespace][name],constructor=$[namespace][name]=function(options,element){if(!this._createWidget)return new constructor(options,element);arguments.length&&this._createWidget(options,element)},$.extend(constructor,existingConstructor,{version:prototype.version,_proto:$.extend({},prototype),_childConstructors:[]}),(basePrototype=new base).options=$.widget.extend({},basePrototype.options),$.each(prototype,function(prop,value){$.isFunction(value)?proxiedPrototype[prop]=function(){function _super(){return base.prototype[prop].apply(this,arguments)}function _superApply(args){return base.prototype[prop].apply(this,args)}return function(){var returnValue,__super=this._super,__superApply=this._superApply;return this._super=_super,this._superApply=_superApply,returnValue=value.apply(this,arguments),this._super=__super,this._superApply=__superApply,returnValue}}():proxiedPrototype[prop]=value}),constructor.prototype=$.widget.extend(basePrototype,{widgetEventPrefix:existingConstructor&&basePrototype.widgetEventPrefix||name},proxiedPrototype,{constructor:constructor,namespace:namespace,widgetName:name,widgetFullName:fullName}),existingConstructor?($.each(existingConstructor._childConstructors,function(i,child){var childPrototype=child.prototype;$.widget(childPrototype.namespace+"."+childPrototype.widgetName,constructor,child._proto)}),delete existingConstructor._childConstructors):base._childConstructors.push(constructor),$.widget.bridge(name,constructor),constructor},$.widget.extend=function(target){for(var key,value,input=widgetSlice.call(arguments,1),inputIndex=0,inputLength=input.length;inputIndex<inputLength;inputIndex++)for(key in input[inputIndex])value=input[inputIndex][key],input[inputIndex].hasOwnProperty(key)&&value!==undefined&&($.isPlainObject(value)?target[key]=$.isPlainObject(target[key])?$.widget.extend({},target[key],value):$.widget.extend({},value):target[key]=value);return target},$.widget.bridge=function(name,object){var fullName=object.prototype.widgetFullName||name;$.fn[name]=function(options){var isMethodCall="string"==typeof options,args=widgetSlice.call(arguments,1),returnValue=this;return isMethodCall?this.length||"instance"!==options?this.each(function(){var methodValue,instance=$.data(this,fullName);return"instance"===options?(returnValue=instance,!1):instance?$.isFunction(instance[options])&&"_"!==options.charAt(0)?(methodValue=instance[options].apply(instance,args))!==instance&&methodValue!==undefined?(returnValue=methodValue&&methodValue.jquery?returnValue.pushStack(methodValue.get()):methodValue,!1):void 0:$.error("no such method '"+options+"' for "+name+" widget instance"):$.error("cannot call methods on "+name+" prior to initialization; attempted to call method '"+options+"'")}):returnValue=undefined:(args.length&&(options=$.widget.extend.apply(null,[options].concat(args))),this.each(function(){var instance=$.data(this,fullName);instance?(instance.option(options||{}),instance._init&&instance._init()):$.data(this,fullName,new object(options,this))})),returnValue}},$.Widget=function(){},$.Widget._childConstructors=[],$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(options,element){element=$(element||this.defaultElement||this)[0],this.element=$(element),this.uuid=widgetUuid++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=$(),this.hoverable=$(),this.focusable=$(),this.classesElementLookup={},element!==this&&($.data(element,this.widgetFullName,this),this._on(!0,this.element,{remove:function(event){event.target===element&&this.destroy()}}),this.document=$(element.style?element.ownerDocument:element.document||element),this.window=$(this.document[0].defaultView||this.document[0].parentWindow)),this.options=$.widget.extend({},this.options,this._getCreateOptions(),options),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){var that=this;this._destroy(),$.each(this.classesElementLookup,function(key,value){that._removeClass(value,key)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:$.noop,widget:function(){return this.element},option:function(key,value){var parts,curOption,i,options=key;if(0===arguments.length)return $.widget.extend({},this.options);if("string"==typeof key)if(options={},key=(parts=key.split(".")).shift(),parts.length){for(curOption=options[key]=$.widget.extend({},this.options[key]),i=0;i<parts.length-1;i++)curOption[parts[i]]=curOption[parts[i]]||{},curOption=curOption[parts[i]];if(key=parts.pop(),1===arguments.length)return curOption[key]===undefined?null:curOption[key];curOption[key]=value}else{if(1===arguments.length)return this.options[key]===undefined?null:this.options[key];options[key]=value}return this._setOptions(options),this},_setOptions:function(options){var key;for(key in options)this._setOption(key,options[key]);return this},_setOption:function(key,value){return"classes"===key&&this._setOptionClasses(value),this.options[key]=value,"disabled"===key&&this._setOptionDisabled(value),this},_setOptionClasses:function(value){var classKey,elements,currentElements;for(classKey in value)currentElements=this.classesElementLookup[classKey],value[classKey]!==this.options.classes[classKey]&&currentElements&&currentElements.length&&(elements=$(currentElements.get()),this._removeClass(currentElements,classKey),elements.addClass(this._classes({element:elements,keys:classKey,classes:value,add:!0})))},_setOptionDisabled:function(value){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!value),value&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(options){function processClassString(classes,checkOption){var current,i;for(i=0;i<classes.length;i++)current=that.classesElementLookup[classes[i]]||$(),current=options.add?$($.unique(current.get().concat(options.element.get()))):$(current.not(options.element).get()),that.classesElementLookup[classes[i]]=current,full.push(classes[i]),checkOption&&options.classes[classes[i]]&&full.push(options.classes[classes[i]])}var full=[],that=this;return options=$.extend({element:this.element,classes:this.options.classes||{}},options),this._on(options.element,{remove:"_untrackClassesElement"}),options.keys&&processClassString(options.keys.match(/\S+/g)||[],!0),options.extra&&processClassString(options.extra.match(/\S+/g)||[]),full.join(" ")},_untrackClassesElement:function(event){var that=this;$.each(that.classesElementLookup,function(key,value){-1!==$.inArray(event.target,value)&&(that.classesElementLookup[key]=$(value.not(event.target).get()))})},_removeClass:function(element,keys,extra){return this._toggleClass(element,keys,extra,!1)},_addClass:function(element,keys,extra){return this._toggleClass(element,keys,extra,!0)},_toggleClass:function(element,keys,extra,add){add="boolean"==typeof add?add:extra;var shift="string"==typeof element||null===element,options={extra:shift?keys:extra,keys:shift?element:keys,element:shift?this.element:element,add:add};return options.element.toggleClass(this._classes(options),add),this},_on:function(suppressDisabledCheck,element,handlers){var delegateElement,instance=this;"boolean"!=typeof suppressDisabledCheck&&(handlers=element,element=suppressDisabledCheck,suppressDisabledCheck=!1),handlers?(element=delegateElement=$(element),this.bindings=this.bindings.add(element)):(handlers=element,element=this.element,delegateElement=this.widget()),$.each(handlers,function(event,handler){function handlerProxy(){if(suppressDisabledCheck||!0!==instance.options.disabled&&!$(this).hasClass("ui-state-disabled"))return("string"==typeof handler?instance[handler]:handler).apply(instance,arguments)}"string"!=typeof handler&&(handlerProxy.guid=handler.guid=handler.guid||handlerProxy.guid||$.guid++);var match=event.match(/^([\w:-]*)\s*(.*)$/),eventName=match[1]+instance.eventNamespace,selector=match[2];selector?delegateElement.on(eventName,selector,handlerProxy):element.on(eventName,handlerProxy)})},_off:function(element,eventName){eventName=(eventName||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,element.off(eventName).off(eventName),this.bindings=$(this.bindings.not(element).get()),this.focusable=$(this.focusable.not(element).get()),this.hoverable=$(this.hoverable.not(element).get())},_delay:function(handler,delay){function handlerProxy(){return("string"==typeof handler?instance[handler]:handler).apply(instance,arguments)}var instance=this;return setTimeout(handlerProxy,delay||0)},_hoverable:function(element){this.hoverable=this.hoverable.add(element),this._on(element,{mouseenter:function(event){this._addClass($(event.currentTarget),null,"ui-state-hover")},mouseleave:function(event){this._removeClass($(event.currentTarget),null,"ui-state-hover")}})},_focusable:function(element){this.focusable=this.focusable.add(element),this._on(element,{focusin:function(event){this._addClass($(event.currentTarget),null,"ui-state-focus")},focusout:function(event){this._removeClass($(event.currentTarget),null,"ui-state-focus")}})},_trigger:function(type,event,data){var prop,orig,callback=this.options[type];if(data=data||{},(event=$.Event(event)).type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase(),event.target=this.element[0],orig=event.originalEvent)for(prop in orig)prop in event||(event[prop]=orig[prop]);return this.element.trigger(event,data),!($.isFunction(callback)&&!1===callback.apply(this.element[0],[event].concat(data))||event.isDefaultPrevented())}},$.each({show:"fadeIn",hide:"fadeOut"},function(method,defaultEffect){$.Widget.prototype["_"+method]=function(element,options,callback){var hasOptions;"string"==typeof options&&(options={effect:options});var effectName=options?!0===options||"number"==typeof options?defaultEffect:options.effect||defaultEffect:method;"number"==typeof(options=options||{})&&(options={duration:options}),hasOptions=!$.isEmptyObject(options),options.complete=callback,options.delay&&element.delay(options.delay),hasOptions&&$.effects&&$.effects.effect[effectName]?element[method](options):effectName!==method&&element[effectName]?element[effectName](options.duration,options.easing,callback):element.queue(function(next){$(this)[method](),callback&&callback.call(element[0]),next()})}}),$.widget}),
/*!
 * jQuery UI Controlgroup 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","../widget"],factory):factory(jQuery)}(function($){var controlgroupCornerRegex=/ui-corner-([a-z]){2,6}/g;return $.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var that=this,childWidgets=[];$.each(this.options.items,function(widget,selector){var labels,options={};if(selector)return"controlgroupLabel"===widget?((labels=that.element.find(selector)).each(function(){var element=$(this);element.children(".ui-controlgroup-label-contents").length||element.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),that._addClass(labels,null,"ui-widget ui-widget-content ui-state-default"),void(childWidgets=childWidgets.concat(labels.get()))):void($.fn[widget]&&(options=that["_"+widget+"Options"]?that["_"+widget+"Options"]("middle"):{classes:{}},that.element.find(selector).each(function(){var element=$(this),instance=element[widget]("instance"),instanceOptions=$.widget.extend({},options);if("button"!==widget||!element.parent(".ui-spinner").length){instance||(instance=element[widget]()[widget]("instance")),instance&&(instanceOptions.classes=that._resolveClassesValues(instanceOptions.classes,instance)),element[widget](instanceOptions);var widgetElement=element[widget]("widget");$.data(widgetElement[0],"ui-controlgroup-data",instance||element[widget]("instance")),childWidgets.push(widgetElement[0])}})))}),this.childWidgets=$($.unique(childWidgets)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(method){this.childWidgets.each(function(){var data=$(this).data("ui-controlgroup-data");data&&data[method]&&data[method]()})},_updateCornerClass:function(element,position){var remove="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",add=this._buildSimpleOptions(position,"label").classes.label;this._removeClass(element,null,remove),this._addClass(element,null,add)},_buildSimpleOptions:function(position,key){var direction="vertical"===this.options.direction,result={classes:{}};return result.classes[key]={middle:"",first:"ui-corner-"+(direction?"top":"left"),last:"ui-corner-"+(direction?"bottom":"right"),only:"ui-corner-all"}[position],result},_spinnerOptions:function(position){var options=this._buildSimpleOptions(position,"ui-spinner");return options.classes["ui-spinner-up"]="",options.classes["ui-spinner-down"]="",options},_buttonOptions:function(position){return this._buildSimpleOptions(position,"ui-button")},_checkboxradioOptions:function(position){return this._buildSimpleOptions(position,"ui-checkboxradio-label")},_selectmenuOptions:function(position){var direction="vertical"===this.options.direction;return{width:!!direction&&"auto",classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(direction?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(direction?"top":"left")},last:{"ui-selectmenu-button-open":direction?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(direction?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[position]}},_resolveClassesValues:function(classes,instance){var result={};return $.each(classes,function(key){var current=instance.options.classes[key]||"";current=$.trim(current.replace(controlgroupCornerRegex,"")),result[key]=(current+" "+classes[key]).replace(/\s+/g," ")}),result},_setOption:function(key,value){"direction"===key&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(key,value),"disabled"!==key?this.refresh():this._callChildMethod(value?"disable":"enable")},refresh:function(){var children,that=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),children=this.childWidgets,this.options.onlyVisible&&(children=children.filter(":visible")),children.length&&($.each(["first","last"],function(index,value){var instance=children[value]().data("ui-controlgroup-data");if(instance&&that["_"+instance.widgetName+"Options"]){var options=that["_"+instance.widgetName+"Options"](1===children.length?"only":value);options.classes=that._resolveClassesValues(options.classes,instance),instance.element[instance.widgetName](options)}else that._updateCornerClass(children[value](),value)}),this._callChildMethod("refresh"))}})}),
/*!
 * jQuery UI Controlgroup 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","../widget"],factory):factory(jQuery)}(function($){var controlgroupCornerRegex=/ui-corner-([a-z]){2,6}/g;return $.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var that=this,childWidgets=[];$.each(this.options.items,function(widget,selector){var labels,options={};if(selector)return"controlgroupLabel"===widget?((labels=that.element.find(selector)).each(function(){var element=$(this);element.children(".ui-controlgroup-label-contents").length||element.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),that._addClass(labels,null,"ui-widget ui-widget-content ui-state-default"),void(childWidgets=childWidgets.concat(labels.get()))):void($.fn[widget]&&(options=that["_"+widget+"Options"]?that["_"+widget+"Options"]("middle"):{classes:{}},that.element.find(selector).each(function(){var element=$(this),instance=element[widget]("instance"),instanceOptions=$.widget.extend({},options);if("button"!==widget||!element.parent(".ui-spinner").length){instance||(instance=element[widget]()[widget]("instance")),instance&&(instanceOptions.classes=that._resolveClassesValues(instanceOptions.classes,instance)),element[widget](instanceOptions);var widgetElement=element[widget]("widget");$.data(widgetElement[0],"ui-controlgroup-data",instance||element[widget]("instance")),childWidgets.push(widgetElement[0])}})))}),this.childWidgets=$($.unique(childWidgets)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(method){this.childWidgets.each(function(){var data=$(this).data("ui-controlgroup-data");data&&data[method]&&data[method]()})},_updateCornerClass:function(element,position){var remove="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",add=this._buildSimpleOptions(position,"label").classes.label;this._removeClass(element,null,remove),this._addClass(element,null,add)},_buildSimpleOptions:function(position,key){var direction="vertical"===this.options.direction,result={classes:{}};return result.classes[key]={middle:"",first:"ui-corner-"+(direction?"top":"left"),last:"ui-corner-"+(direction?"bottom":"right"),only:"ui-corner-all"}[position],result},_spinnerOptions:function(position){var options=this._buildSimpleOptions(position,"ui-spinner");return options.classes["ui-spinner-up"]="",options.classes["ui-spinner-down"]="",options},_buttonOptions:function(position){return this._buildSimpleOptions(position,"ui-button")},_checkboxradioOptions:function(position){return this._buildSimpleOptions(position,"ui-checkboxradio-label")},_selectmenuOptions:function(position){var direction="vertical"===this.options.direction;return{width:!!direction&&"auto",classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(direction?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(direction?"top":"left")},last:{"ui-selectmenu-button-open":direction?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(direction?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[position]}},_resolveClassesValues:function(classes,instance){var result={};return $.each(classes,function(key){var current=instance.options.classes[key]||"";current=$.trim(current.replace(controlgroupCornerRegex,"")),result[key]=(current+" "+classes[key]).replace(/\s+/g," ")}),result},_setOption:function(key,value){"direction"===key&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(key,value),"disabled"!==key?this.refresh():this._callChildMethod(value?"disable":"enable")},refresh:function(){var children,that=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),children=this.childWidgets,this.options.onlyVisible&&(children=children.filter(":visible")),children.length&&($.each(["first","last"],function(index,value){var instance=children[value]().data("ui-controlgroup-data");if(instance&&that["_"+instance.widgetName+"Options"]){var options=that["_"+instance.widgetName+"Options"](1===children.length?"only":value);options.classes=that._resolveClassesValues(options.classes,instance),instance.element[instance.widgetName](options)}else that._updateCornerClass(children[value](),value)}),this._callChildMethod("refresh"))}})}),
/*!
 * jQuery UI Keycode 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","./version"],factory):factory(jQuery)}(function($){return $.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),
/*!
 * jQuery UI Button 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(factory){"function"==typeof define&&define.amd?define(["jquery","./controlgroup","./checkboxradio","../keycode","../widget"],factory):factory(jQuery)}(function($){var orig;return $.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var disabled,options=this._super()||{};return this.isInput=this.element.is("input"),null!=(disabled=this.element[0].disabled)&&(options.disabled=disabled),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(options.label=this.originalLabel),options},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(event){event.keyCode===$.ui.keyCode.SPACE&&(event.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(option,value){var icon="iconPosition"!==option,position=icon?this.options.iconPosition:value,displayBlock="top"===position||"bottom"===position;this.icon?icon&&this._removeClass(this.icon,null,this.options.icon):(this.icon=$("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),icon&&this._addClass(this.icon,null,value),this._attachIcon(position),displayBlock?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=$("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(position))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(iconPosition){this.icon[/^(?:end|bottom)/.test(iconPosition)?"before":"after"](this.iconSpace)},_attachIcon:function(iconPosition){this.element[/^(?:end|bottom)/.test(iconPosition)?"append":"prepend"](this.icon)},_setOptions:function(options){var newShowLabel=options.showLabel===undefined?this.options.showLabel:options.showLabel,newIcon=options.icon===undefined?this.options.icon:options.icon;newShowLabel||newIcon||(options.showLabel=!0),this._super(options)},_setOption:function(key,value){"icon"===key&&(value?this._updateIcon(key,value):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===key&&this._updateIcon(key,value),"showLabel"===key&&(this._toggleClass("ui-button-icon-only",null,!value),this._updateTooltip()),"label"===key&&(this.isInput?this.element.val(value):(this.element.html(value),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(key,value),"disabled"===key&&(this._toggleClass(null,"ui-state-disabled",value),(this.element[0].disabled=value)&&this.element.blur())},refresh:function(){var isDisabled=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");isDisabled!==this.options.disabled&&this._setOptions({disabled:isDisabled}),this._updateTooltip()}}),!1!==$.uiBackCompat&&($.widget("ui.button",$.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(key,value){"text"!==key?("showLabel"===key&&(this.options.text=value),"icon"===key&&(this.options.icons.primary=value),"icons"===key&&(value.primary?(this._super("icon",value.primary),this._super("iconPosition","beginning")):value.secondary&&(this._super("icon",value.secondary),this._super("iconPosition","end"))),this._superApply(arguments)):this._super("showLabel",value)}}),$.fn.button=(orig=$.fn.button,function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?orig.apply(this,arguments):($.ui.checkboxradio||$.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}),$.fn.buttonset=function(argument_0,argument_1,argument_2){return $.ui.controlgroup||$.error("Controlgroup widget missing"),"option"===argument_0&&"items"===argument_1&&argument_2?this.controlgroup.apply(this,[argument_0,"items.button",argument_2]):"option"===argument_0&&"items"===argument_1?this.controlgroup.apply(this,[argument_0,"items.button"]):("object"==typeof argument_0&&argument_0.items&&(argument_0.items={button:argument_0.items}),this.controlgroup.apply(this,arguments))}),$.ui.button});