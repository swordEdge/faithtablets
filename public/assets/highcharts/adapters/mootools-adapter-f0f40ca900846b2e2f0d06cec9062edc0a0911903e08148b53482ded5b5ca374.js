!function(){var win=window,doc=document,mooVersion=win.MooTools.version.substring(0,3),legacy="1.2"===mooVersion||"1.1"===mooVersion,legacyEvent=legacy||"1.3"===mooVersion,$extend=win.$extend||function(){return Object.append.apply(Object,arguments)};win.HighchartsAdapter={init:function(pathAnim){var fxProto=Fx.prototype,fxStart=fxProto.start,morphProto=Fx.Morph.prototype,morphCompute=morphProto.compute;fxProto.start=function(from){var fx=this,elem=fx.element;return from.d&&(fx.paths=pathAnim.init(elem,elem.d,fx.toD)),fxStart.apply(fx,arguments),this},morphProto.compute=function(from,to,delta){var fx=this,paths=fx.paths;return paths?void fx.element.attr("d",pathAnim.step(paths[0],paths[1],delta,fx.toD)):morphCompute.apply(fx,arguments)}},adapterRun:function(el,method){return"width"===method||"height"===method?parseInt(document.id(el).getStyle(method),10):void 0},getScript:function(scriptLocation,callback){var head=doc.getElementsByTagName("head")[0],script=doc.createElement("script");script.type="text/javascript",script.src=scriptLocation,script.onload=callback,head.appendChild(script)},animate:function(el,params,options){var effect,isSVGElement=el.attr,complete=options&&options.complete;isSVGElement&&!el.setStyle&&(el.getStyle=el.attr,el.setStyle=function(){var args=arguments;this.attr.call(this,args[0],args[1][0])},el.$family=function(){return!0},el.getComputedStyle=function(){return el.element.getComputedStyle.apply(el.element,arguments)}),win.HighchartsAdapter.stop(el),effect=new Fx.Morph(isSVGElement?el:document.id(el),$extend({transition:Fx.Transitions.Quad.easeInOut},options)),isSVGElement&&(effect.element=el),params.d&&(effect.toD=params.d),complete&&effect.addEvent("complete",complete),effect.start(params),el.fx=effect},each:function(arr,fn){return legacy?$each(arr,fn):Array.each(arr,fn)},map:function(arr,fn){return arr.map(fn)},grep:function(arr,fn){return arr.filter(fn)},inArray:function(item,arr,from){return arr?arr.indexOf(item,from):-1},offset:function(el){var offsets=el.getPosition();return{left:offsets.x,top:offsets.y}},extendWithEvents:function(el){el.addEvent||(el.nodeName?el=document.id(el):$extend(el,new Events))},addEvent:function(el,type,fn){"string"==typeof type&&("unload"===type&&(type="beforeunload"),win.HighchartsAdapter.extendWithEvents(el),el.addEvent(type,fn))},removeEvent:function(el,type,fn){"string"!=typeof el&&el.addEvent&&(type?("unload"===type&&(type="beforeunload"),fn?el.removeEvent(type,fn):el.removeEvents&&el.removeEvents(type)):el.removeEvents())},fireEvent:function(el,event,eventArguments,defaultFunction){var eventArgs={type:event,target:el};event=legacyEvent?new Event(eventArgs):new DOMEvent(eventArgs),event=$extend(event,eventArguments),!event.target&&event.event&&(event.target=event.event.target),event.preventDefault=function(){defaultFunction=null},el.fireEvent&&el.fireEvent(event.type,event),defaultFunction&&defaultFunction(event)},washMouseEvent:function(e){return e.page&&(e.pageX=e.page.x,e.pageY=e.page.y),e},stop:function(el){el.fx&&el.fx.cancel()}}}();