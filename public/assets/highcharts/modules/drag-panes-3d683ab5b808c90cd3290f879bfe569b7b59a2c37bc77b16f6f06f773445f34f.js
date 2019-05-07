"use strict";!function(factory){"object"==typeof module&&module.exports?module.exports=factory:factory(Highcharts)}(function(Highcharts){var H,hasTouch,merge,wrap,each,isNumber,addEvent,relativeLength,objectEach,Axis,Pointer,resizerOptions;hasTouch=(H=Highcharts).hasTouch,merge=H.merge,wrap=H.wrap,each=H.each,isNumber=H.isNumber,addEvent=H.addEvent,relativeLength=H.relativeLength,objectEach=H.objectEach,Axis=H.Axis,Pointer=H.Pointer,resizerOptions={minLength:"10%",maxLength:"100%",resize:{controlledAxis:{next:[],prev:[]},enabled:!1,cursor:"ns-resize",lineColor:"#cccccc",lineDashStyle:"Solid",lineWidth:4,x:0,y:0}},merge(!0,Axis.prototype.defaultYAxisOptions,resizerOptions),H.AxisResizer=function(axis){this.init(axis)},H.AxisResizer.prototype={init:function(axis,update){this.axis=axis,this.options=axis.options.resize,this.render(),update||this.addMouseEvents()},render:function(){var lineWidth,resizer=this,axis=resizer.axis,chart=axis.chart,options=resizer.options,x=options.x,y=options.y,pos=Math.min(Math.max(axis.top+axis.height+y,chart.plotTop),chart.plotTop+chart.plotHeight),attr={};attr={cursor:options.cursor,stroke:options.lineColor,"stroke-width":options.lineWidth,dashstyle:options.lineDashStyle},resizer.lastPos=pos-y,resizer.controlLine||(resizer.controlLine=chart.renderer.path().addClass("highcharts-axis-resizer")),resizer.controlLine.add(axis.axisGroup),lineWidth=options.lineWidth,attr.d=chart.renderer.crispLine(["M",axis.left+x,pos,"L",axis.left+axis.width+x,pos],lineWidth),resizer.controlLine.attr(attr)},addMouseEvents:function(){var mouseMoveHandler,mouseUpHandler,mouseDownHandler,resizer=this,ctrlLineElem=resizer.controlLine.element,container=resizer.axis.chart.container,eventsToUnbind=[];resizer.mouseMoveHandler=mouseMoveHandler=function(e){resizer.onMouseMove(e)},resizer.mouseUpHandler=mouseUpHandler=function(e){resizer.onMouseUp(e)},resizer.mouseDownHandler=mouseDownHandler=function(e){resizer.onMouseDown(e)},eventsToUnbind.push(addEvent(container,"mousemove",mouseMoveHandler),addEvent(container.ownerDocument,"mouseup",mouseUpHandler),addEvent(ctrlLineElem,"mousedown",mouseDownHandler)),hasTouch&&eventsToUnbind.push(addEvent(container,"touchmove",mouseMoveHandler),addEvent(container.ownerDocument,"touchend",mouseUpHandler),addEvent(ctrlLineElem,"touchstart",mouseDownHandler)),resizer.eventsToUnbind=eventsToUnbind},onMouseMove:function(e){e.touches&&0===e.touches[0].pageX||this.grabbed&&(this.hasDragged=!0,this.updateAxes(this.axis.chart.pointer.normalize(e).chartY-this.options.y))},onMouseUp:function(e){this.hasDragged&&this.updateAxes(this.axis.chart.pointer.normalize(e).chartY-this.options.y),this.grabbed=this.hasDragged=this.axis.chart.activeResizer=null},onMouseDown:function(){this.axis.chart.pointer.reset(!1,0),this.grabbed=this.axis.chart.activeResizer=!0},updateAxes:function(chartY){var yDelta,resizer=this,chart=resizer.axis.chart,axes=resizer.options.controlledAxis,nextAxes=0===axes.next.length?[H.inArray(resizer.axis,chart.yAxis)+1]:axes.next,prevAxes=[resizer.axis].concat(axes.prev),axesConfigs=[],stopDrag=!1,plotTop=chart.plotTop,plotHeight=chart.plotHeight,plotBottom=plotTop+plotHeight,normalize=function(val,min,max){return Math.round(Math.min(Math.max(val,min),max))};chartY=Math.max(Math.min(chartY,plotBottom),plotTop),(yDelta=chartY-resizer.lastPos)*yDelta<1||(each([prevAxes,nextAxes],function(axesGroup,isNext){each(axesGroup,function(axisInfo,i){var height,top,minLength,maxLength,axis=isNumber(axisInfo)?chart.yAxis[axisInfo]:isNext||i?chart.get(axisInfo):axisInfo,axisOptions=axis&&axis.options,optionsToUpdate={},hDelta=0;axisOptions&&(top=axis.top,minLength=Math.round(relativeLength(axisOptions.minLength,plotHeight)),maxLength=Math.round(relativeLength(axisOptions.maxLength,plotHeight)),isNext?(yDelta=chartY-resizer.lastPos,height=normalize(axis.len-yDelta,minLength,maxLength),top=axis.top+yDelta,plotBottom<top+height&&(chartY+=hDelta=plotBottom-height-top,top+=hDelta),top<plotTop&&plotBottom<(top=plotTop)+height&&(height=plotHeight),height===minLength&&(stopDrag=!0),axesConfigs.push({axis:axis,options:{top:Math.round(top),height:height}})):((height=normalize(chartY-top,minLength,maxLength))===maxLength&&(stopDrag=!0),chartY=top+height,axesConfigs.push({axis:axis,options:{height:height}})),optionsToUpdate.height=height)})}),stopDrag||(each(axesConfigs,function(config){config.axis.update(config.options,!1)}),chart.redraw(!1)))},destroy:function(){var resizer=this;delete resizer.axis.resizer,this.eventsToUnbind&&each(this.eventsToUnbind,function(unbind){unbind()}),resizer.controlLine.destroy(),objectEach(resizer,function(val,key){resizer[key]=null})}},Axis.prototype.keepProps.push("resizer"),wrap(Axis.prototype,"render",function(proceed){proceed.apply(this,Array.prototype.slice.call(arguments,1));var enabled,axis=this,resizer=axis.resizer,resizerOptions=axis.options.resize;resizerOptions&&(enabled=!1!==resizerOptions.enabled,resizer?enabled?resizer.init(axis,!0):resizer.destroy():enabled&&(axis.resizer=new H.AxisResizer(axis)))}),wrap(Axis.prototype,"destroy",function(proceed,keepEvents){!keepEvents&&this.resizer&&this.resizer.destroy(),proceed.apply(this,Array.prototype.slice.call(arguments,1))}),wrap(Pointer.prototype,"runPointActions",function(proceed){this.chart.activeResizer||proceed.apply(this,Array.prototype.slice.call(arguments,1))})});