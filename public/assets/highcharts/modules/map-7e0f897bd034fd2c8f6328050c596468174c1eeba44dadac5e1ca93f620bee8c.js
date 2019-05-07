!function(H){function tweenColors(from,to,pos){for(var val,i=4,rgba=[];i--;)val=to.rgba[i]+(from.rgba[i]-to.rgba[i])*(1-pos),rgba[i]=3===i?val:Math.round(val);return"rgba("+rgba.join(",")+")"}function selectiveRoundedRect(attr,x,y,w,h,rTopLeft,rTopRight,rBottomRight,rBottomLeft){var normalize=attr["stroke-width"]%2/2;return x-=normalize,y-=normalize,["M",x+rTopLeft,y,"L",x+w-rTopRight,y,"C",x+w-rTopRight/2,y,x+w,y+rTopRight/2,x+w,y+rTopRight,"L",x+w,y+h-rBottomRight,"C",x+w,y+h-rBottomRight/2,x+w-rBottomRight/2,y+h,x+w-rBottomRight,y+h,"L",x+rBottomLeft,y+h,"C",x+rBottomLeft/2,y+h,x,y+h-rBottomLeft/2,x,y+h-rBottomLeft,"L",x,y+rTopLeft,"C",x,y+rTopLeft/2,x+rTopLeft/2,y,x+rTopLeft,y,"Z"]}var UNDEFINED,Axis=H.Axis,Chart=H.Chart,Color=H.Color,Point=H.Point,Pointer=H.Pointer,Legend=H.Legend,Series=H.Series,SVGRenderer=H.SVGRenderer,VMLRenderer=H.VMLRenderer,symbols=SVGRenderer.prototype.symbols,each=H.each,extend=H.extend,extendClass=H.extendClass,merge=H.merge,pick=H.pick,numberFormat=H.numberFormat,defaultOptions=H.getOptions(),seriesTypes=H.seriesTypes,plotOptions=defaultOptions.plotOptions,wrap=H.wrap,noop=function(){};extend(defaultOptions.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"}),defaultOptions.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,style:{fontSize:"15px",fontWeight:"bold",textAlign:"center"},theme:{"stroke-width":1}},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)},text:"-",y:28}}},H.splitPath=function(path){var i;for(path=path.replace(/([A-Za-z])/g," $1 "),path=path.replace(/^\s*/,"").replace(/\s*$/,""),path=path.split(/[ ,]+/),i=0;i<path.length;i++)/[a-zA-Z]/.test(path[i])||(path[i]=parseFloat(path[i]));return path},H.maps={},wrap(Axis.prototype,"getSeriesExtremes",function(proceed){var dataMin,dataMax,isXAxis=this.isXAxis,xData=[];isXAxis&&each(this.series,function(series,i){series.useMapGeometry&&(xData[i]=series.xData,series.xData=[])}),proceed.call(this),isXAxis&&(dataMin=pick(this.dataMin,Number.MAX_VALUE),dataMax=pick(this.dataMax,Number.MIN_VALUE),each(this.series,function(series,i){series.useMapGeometry&&(dataMin=Math.min(dataMin,pick(series.minX,dataMin)),dataMax=Math.max(dataMax,pick(series.maxX,dataMin)),series.xData=xData[i])}),this.dataMin=dataMin,this.dataMax=dataMax)}),wrap(Axis.prototype,"setAxisTranslation",function(proceed){var mapRatio,adjustedAxisLength,padAxis,fixTo,fixDiff,chart=this.chart,plotRatio=chart.plotWidth/chart.plotHeight,xAxis=chart.xAxis[0];proceed.call(this),chart.options.chart.preserveAspectRatio&&"yAxis"===this.coll&&xAxis.transA!==UNDEFINED&&(this.transA=xAxis.transA=Math.min(this.transA,xAxis.transA),mapRatio=chart.mapRatio=plotRatio/((xAxis.max-xAxis.min)/(this.max-this.min)),padAxis=1>mapRatio?this:xAxis,adjustedAxisLength=(padAxis.max-padAxis.min)*padAxis.transA,padAxis.pixelPadding=padAxis.len-adjustedAxisLength,padAxis.minPixelPadding=padAxis.pixelPadding/2,fixTo=padAxis.fixTo,fixTo&&(fixDiff=fixTo[1]-padAxis.toValue(fixTo[0],!0),fixDiff*=padAxis.transA,Math.abs(fixDiff)>padAxis.minPixelPadding&&(fixDiff=0),padAxis.minPixelPadding-=fixDiff))}),wrap(Axis.prototype,"render",function(proceed){proceed.call(this),this.fixTo=null}),extend(Pointer.prototype,{onContainerDblClick:function(e){var chart=this.chart;e=this.normalize(e),chart.options.mapNavigation.enableDoubleClickZoomTo?chart.pointer.inClass(e.target,"highcharts-tracker")&&chart.hoverPoint.zoomTo():chart.isInsidePlot(e.chartX-chart.plotLeft,e.chartY-chart.plotTop)&&chart.mapZoom(.5,chart.xAxis[0].toValue(e.chartX),chart.yAxis[0].toValue(e.chartY),e.chartX,e.chartY)},onContainerMouseWheel:function(e){var delta,chart=this.chart;e=this.normalize(e),delta=e.detail||-(e.wheelDelta/120),chart.isInsidePlot(e.chartX-chart.plotLeft,e.chartY-chart.plotTop)&&chart.mapZoom(delta>0?2:.5,chart.xAxis[0].toValue(e.chartX),chart.yAxis[0].toValue(e.chartY),delta>0?void 0:e.chartX,delta>0?void 0:e.chartY)}}),wrap(Pointer.prototype,"init",function(proceed,chart,options){proceed.call(this,chart,options),pick(options.mapNavigation.enableTouchZoom,options.mapNavigation.enabled)&&(this.pinchX=this.pinchHor=this.pinchY=this.pinchVert=!0)}),wrap(Pointer.prototype,"pinchTranslate",function(proceed,zoomHor,zoomVert,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch){var xBigger;proceed.call(this,zoomHor,zoomVert,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch),"map"===this.chart.options.chart.type&&(xBigger=transform.scaleX>transform.scaleY,this.pinchTranslateDirection(!xBigger,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch,xBigger?transform.scaleX:transform.scaleY))});var ColorAxis=H.ColorAxis=function(){this.init.apply(this,arguments)};extend(ColorAxis.prototype,Axis.prototype),extend(ColorAxis.prototype,{defaultColorAxisOptions:{lineWidth:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},color:"gray",width:.01},labels:{overflow:"justify"},minColor:"#EFEFFF",maxColor:"#102d4c"},init:function(chart,userOptions){var options,horiz="vertical"!==chart.options.legend.layout;options=merge(this.defaultColorAxisOptions,{side:horiz?2:1,reversed:!horiz},userOptions,{isX:horiz,opposite:!horiz,showEmpty:!1,title:null}),Axis.prototype.init.call(this,chart,options),userOptions.dataClasses&&this.initDataClasses(userOptions),this.isXAxis=!0,this.horiz=horiz},initDataClasses:function(userOptions){var dataClasses,chart=this.chart,colorCounter=0,options=this.options;this.dataClasses=dataClasses=[],each(userOptions.dataClasses,function(dataClass,i){var colors;dataClass=merge(dataClass),dataClasses.push(dataClass),dataClass.color||("category"===options.dataClassColor?(colors=chart.options.colors,dataClass.color=colors[colorCounter++],colorCounter===colors.length&&(colorCounter=0)):dataClass.color=tweenColors(Color(options.minColor),Color(options.maxColor),i/(userOptions.dataClasses.length-1)))})},setOptions:function(userOptions){Axis.prototype.setOptions.call(this,userOptions),this.options.crosshair=this.options.marker,this.stops=userOptions.stops||[[0,this.options.minColor],[1,this.options.maxColor]],each(this.stops,function(stop){stop.color=Color(stop[1])}),this.coll="colorAxis"},setAxisSize:function(){var symbol=this.legendSymbol,chart=this.chart;symbol&&(this.left=symbol.x,this.top=symbol.y,this.width=symbol.width,this.height=symbol.height,this.right=chart.chartWidth-this.left-this.width,this.bottom=chart.chartHeight-this.top-this.height,this.len=this.horiz?this.width:this.height,this.pos=this.horiz?this.left:this.top)},toColor:function(value,point){var pos,from,to,color,dataClass,i,stops=this.stops,dataClasses=this.dataClasses;if(dataClasses){for(i=dataClasses.length;i--;)if(dataClass=dataClasses[i],from=dataClass.from,to=dataClass.to,(from===UNDEFINED||value>=from)&&(to===UNDEFINED||to>=value)){color=dataClass.color,point&&(point.dataClass=i);break}}else{for(this.isLog&&(value=this.val2lin(value)),pos=1-(this.max-value)/(this.max-this.min),i=stops.length;i--&&!(pos>stops[i][0]););from=stops[i]||stops[i+1],to=stops[i+1]||from,pos=1-(to[0]-pos)/(to[0]-from[0]||1),color=tweenColors(from.color,to.color,pos)}return color},getOffset:function(){var group=this.legendGroup;group&&(Axis.prototype.getOffset.call(this),this.axisGroup.parentGroup||(this.axisGroup.add(group),this.gridGroup.add(group),this.labelGroup.add(group),this.added=!0))},setLegendColor:function(){var grad,horiz=this.horiz,options=this.options;grad=horiz?[0,0,1,0]:[0,0,0,1],this.legendColor={linearGradient:{x1:grad[0],y1:grad[1],x2:grad[2],y2:grad[3]},stops:options.stops||[[0,options.minColor],[1,options.maxColor]]}},drawLegendSymbol:function(legend,item){var box,padding=legend.padding,legendOptions=legend.options,horiz=this.horiz,width=pick(legendOptions.symbolWidth,horiz?200:12),height=pick(legendOptions.symbolHeight,horiz?12:200),labelPadding=pick(legendOptions.labelPadding,horiz?10:30);this.setLegendColor(),item.legendSymbol=this.chart.renderer.rect(0,legend.baseline-11,width,height).attr({zIndex:1}).add(item.legendGroup),box=item.legendSymbol.getBBox(),this.legendItemWidth=width+padding+(horiz?0:labelPadding),this.legendItemHeight=height+padding+(horiz?labelPadding:0)},setState:noop,visible:!0,setVisible:noop,getSeriesExtremes:function(){var series;this.series.length&&(series=this.series[0],this.dataMin=series.valueMin,this.dataMax=series.valueMax)},drawCrosshair:function(e,point){var crossPos,newCross=!this.cross,plotX=point&&point.plotX,plotY=point&&point.plotY,axisPos=this.pos,axisLen=this.len;point&&(crossPos=this.toPixels(point.value),axisPos>crossPos?crossPos=axisPos-2:crossPos>axisPos+axisLen&&(crossPos=axisPos+axisLen+2),point.plotX=crossPos,point.plotY=this.len-crossPos,Axis.prototype.drawCrosshair.call(this,e,point),point.plotX=plotX,point.plotY=plotY,!newCross&&this.cross&&this.cross.attr({fill:this.crosshair.color}).add(this.labelGroup))},getPlotLinePath:function(a,b,c,d,pos){return pos?this.horiz?["M",pos-4,this.top-6,"L",pos+4,this.top-6,pos,this.top,"Z"]:["M",this.left,pos,"L",this.left-6,pos+6,this.left-6,pos-6,"Z"]:Axis.prototype.getPlotLinePath.call(this,a,b,c,d)},update:function(newOptions,redraw){Axis.prototype.update.call(this,newOptions,redraw),this.legendItem&&(this.setLegendColor(),this.chart.legend.colorizeItem(this,!0))},getDataClassLegendSymbols:function(){var name,axis=this,chart=this.chart,legendItems=[],legendOptions=chart.options.legend,valueDecimals=legendOptions.valueDecimals,valueSuffix=legendOptions.valueSuffix||"";return each(this.dataClasses,function(dataClass,i){var vis=!0,from=dataClass.from,to=dataClass.to;name="",from===UNDEFINED?name="< ":to===UNDEFINED&&(name="> "),from!==UNDEFINED&&(name+=numberFormat(from,valueDecimals)+valueSuffix),from!==UNDEFINED&&to!==UNDEFINED&&(name+=" - "),to!==UNDEFINED&&(name+=numberFormat(to,valueDecimals)+valueSuffix),legendItems.push(H.extend({chart:chart,name:name,options:{},drawLegendSymbol:H.LegendSymbolMixin.drawRectangle,visible:!0,setState:noop,setVisible:function(){vis=this.visible=!vis,each(axis.series,function(series){each(series.points,function(point){point.dataClass===i&&point.setVisible(vis)})}),chart.legend.colorizeItem(this,vis)}},dataClass))}),legendItems}}),wrap(Legend.prototype,"getAllItems",function(proceed){var allItems=[],colorAxis=this.chart.colorAxis[0];return colorAxis&&(colorAxis.options.dataClasses?allItems=allItems.concat(colorAxis.getDataClassLegendSymbols()):allItems.push(colorAxis),each(colorAxis.series,function(series){series.options.showInLegend=!1})),allItems.concat(proceed.call(this))}),extend(Chart.prototype,{renderMapNavigation:function(){var n,button,buttonOptions,attr,states,chart=this,options=this.options.mapNavigation,buttons=options.buttons,outerHandler=function(){this.handler.call(chart)};if(pick(options.enableButtons,options.enabled)&&!chart.renderer.forExport)for(n in buttons)buttons.hasOwnProperty(n)&&(buttonOptions=merge(options.buttonOptions,buttons[n]),attr=buttonOptions.theme,states=attr.states,button=chart.renderer.button(buttonOptions.text,0,0,outerHandler,attr,states&&states.hover,states&&states.select,0,"zoomIn"===n?"topbutton":"bottombutton").attr({width:buttonOptions.width,height:buttonOptions.height,title:chart.options.lang[n],zIndex:5}).css(buttonOptions.style).add(),button.handler=buttonOptions.onclick,button.align(extend(buttonOptions,{width:button.width,height:2*button.height}),null,buttonOptions.alignTo))},fitToBox:function(inner,outer){return each([["x","width"],["y","height"]],function(dim){var pos=dim[0],size=dim[1];inner[pos]+inner[size]>outer[pos]+outer[size]&&(inner[size]>outer[size]?(inner[size]=outer[size],inner[pos]=outer[pos]):inner[pos]=outer[pos]+outer[size]-inner[size]),inner[size]>outer[size]&&(inner[size]=outer[size]),inner[pos]<outer[pos]&&(inner[pos]=outer[pos])}),inner},mapZoom:function(howMuch,centerXArg,centerYArg,mouseX,mouseY){var chart=this,xAxis=chart.xAxis[0],xRange=xAxis.max-xAxis.min,centerX=pick(centerXArg,xAxis.min+xRange/2),newXRange=xRange*howMuch,yAxis=chart.yAxis[0],yRange=yAxis.max-yAxis.min,centerY=pick(centerYArg,yAxis.min+yRange/2),newYRange=yRange*howMuch,fixToX=mouseX?(mouseX-xAxis.pos)/xAxis.len:.5,fixToY=mouseY?(mouseY-yAxis.pos)/yAxis.len:.5,newXMin=centerX-newXRange*fixToX,newYMin=centerY-newYRange*fixToY,newExt=chart.fitToBox({x:newXMin,y:newYMin,width:newXRange,height:newYRange},{x:xAxis.dataMin,y:yAxis.dataMin,width:xAxis.dataMax-xAxis.dataMin,height:yAxis.dataMax-yAxis.dataMin});mouseX&&(xAxis.fixTo=[mouseX-xAxis.pos,centerXArg]),mouseY&&(yAxis.fixTo=[mouseY-yAxis.pos,centerYArg]),void 0!==howMuch?(xAxis.setExtremes(newExt.x,newExt.x+newExt.width,!1),yAxis.setExtremes(newExt.y,newExt.y+newExt.height,!1)):(xAxis.setExtremes(void 0,void 0,!1),yAxis.setExtremes(void 0,void 0,!1)),chart.redraw()}}),wrap(Chart.prototype,"getAxes",function(proceed){var options=this.options,colorAxisOptions=options.colorAxis;proceed.call(this),this.colorAxis=[],colorAxisOptions&&(proceed=new ColorAxis(this,colorAxisOptions))}),wrap(Chart.prototype,"render",function(proceed){var chart=this,mapNavigation=chart.options.mapNavigation;proceed.call(chart),chart.renderMapNavigation(),(pick(mapNavigation.enableDoubleClickZoom,mapNavigation.enabled)||mapNavigation.enableDoubleClickZoomTo)&&H.addEvent(chart.container,"dblclick",function(e){chart.pointer.onContainerDblClick(e)}),pick(mapNavigation.enableMouseWheelZoom,mapNavigation.enabled)&&H.addEvent(chart.container,void 0===document.onmousewheel?"DOMMouseScroll":"mousewheel",function(e){return chart.pointer.onContainerMouseWheel(e),!1})}),plotOptions.map=merge(plotOptions.scatter,{allAreas:!0,animation:!1,nullColor:"#F8F8F8",borderColor:"silver",borderWidth:1,marker:null,stickyTracking:!1,dataLabels:{format:"{point.value}",verticalAlign:"middle"},turboThreshold:0,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}<br/>"},states:{normal:{animation:!0},hover:{brightness:.2}}});var MapAreaPoint=extendClass(Point,{applyOptions:function(options,x){var mapPoint,point=Point.prototype.applyOptions.call(this,options,x),series=this.series,seriesOptions=series.options,joinBy=seriesOptions.joinBy;return seriesOptions.mapData&&(mapPoint=joinBy?series.getMapData(joinBy,point[joinBy]):seriesOptions.mapData[point.x],mapPoint?(series.xyFromShape&&(point.x=mapPoint._midX,point.y=mapPoint._midY),extend(point,mapPoint)):point.value=point.value||null),point},setVisible:function(vis){var point=this,method=vis?"show":"hide";each(["graphic","dataLabel"],function(key){point[key]&&point[key][method]()})},onMouseOver:function(e){clearTimeout(this.colorInterval),Point.prototype.onMouseOver.call(this,e)},onMouseOut:function(){var point=this,start=+new Date,normalColor=Color(point.options.color),hoverColor=Color(point.pointAttr.hover.fill),animation=point.series.options.states.normal.animation,duration=animation&&(animation.duration||500);duration&&4===normalColor.rgba.length&&4===hoverColor.rgba.length&&"select"!==point.state&&(delete point.pointAttr[""].fill,clearTimeout(point.colorInterval),point.colorInterval=setInterval(function(){var pos=(new Date-start)/duration,graphic=point.graphic;pos>1&&(pos=1),graphic&&graphic.attr("fill",tweenColors(hoverColor,normalColor,pos)),pos>=1&&clearTimeout(point.colorInterval)},13)),Point.prototype.onMouseOut.call(point)},zoomTo:function(){var point=this,series=point.series;series.xAxis.setExtremes(point._minX,point._maxX,!1),series.yAxis.setExtremes(point._minY,point._maxY,!1),series.chart.redraw()}});seriesTypes.map=extendClass(seriesTypes.scatter,{type:"map",pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",dashstyle:"dashStyle"},pointClass:MapAreaPoint,pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:noop,supportsDrilldown:!0,getExtremesFromAll:!0,useMapGeometry:!0,parallelArrays:["x","y","value"],getBox:function(paths){var hasBox,maxX=Number.MIN_VALUE,minX=Number.MAX_VALUE,maxY=Number.MIN_VALUE,minY=Number.MAX_VALUE;each(paths||[],function(point){if(point.path){"string"==typeof point.path&&(point.path=H.splitPath(point.path));var path=point.path||[],i=path.length,even=!1,pointMaxX=Number.MIN_VALUE,pointMinX=Number.MAX_VALUE,pointMaxY=Number.MIN_VALUE,pointMinY=Number.MAX_VALUE;if(!point._foundBox){for(;i--;)"number"!=typeof path[i]||isNaN(path[i])||(even?(pointMaxX=Math.max(pointMaxX,path[i]),pointMinX=Math.min(pointMinX,path[i])):(pointMaxY=Math.max(pointMaxY,path[i]),pointMinY=Math.min(pointMinY,path[i])),even=!even);point._midX=pointMinX+(pointMaxX-pointMinX)*(point.middleX||.5),point._midY=pointMinY+(pointMaxY-pointMinY)*(point.middleY||.5),point._maxX=pointMaxX,point._minX=pointMinX,point._maxY=pointMaxY,point._minY=pointMinY,point._foundBox=!0}maxX=Math.max(maxX,point._maxX),minX=Math.min(minX,point._minX),maxY=Math.max(maxY,point._maxY),minY=Math.min(minY,point._minY),hasBox=!0}}),hasBox&&(this.minY=Math.min(minY,pick(this.minY,Number.MAX_VALUE)),this.maxY=Math.max(maxY,pick(this.maxY,Number.MIN_VALUE)),this.minX=Math.min(minX,pick(this.minX,Number.MAX_VALUE)),this.maxX=Math.max(maxX,pick(this.maxX,Number.MIN_VALUE)))},getExtremes:function(){Series.prototype.getExtremes.call(this,this.valueData),this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data),this.valueMin=this.dataMin,this.valueMax=this.dataMax,this.dataMin=this.minY,this.dataMax=this.maxY},translatePath:function(path){var i,series=this,even=!1,xAxis=series.xAxis,yAxis=series.yAxis,xMin=xAxis.min,xTransA=xAxis.transA,xMinPixelPadding=xAxis.minPixelPadding,yMin=yAxis.min,yTransA=yAxis.transA,yMinPixelPadding=yAxis.minPixelPadding,ret=[];if(path)for(i=path.length;i--;)"number"==typeof path[i]?(ret[i]=even?(path[i]-xMin)*xTransA+xMinPixelPadding:(path[i]-yMin)*yTransA+yMinPixelPadding,even=!even):ret[i]=path[i];return ret},setData:function(data,redraw){var options=this.options,mapData=options.mapData,joinBy=options.joinBy,dataUsed=[];this.getBox(data),this.getBox(mapData),options.allAreas&&mapData&&(data=data||[],joinBy&&each(data,function(point){dataUsed.push(point[joinBy])}),dataUsed="|"+dataUsed.join("|")+"|",each(mapData,function(mapPoint){joinBy&&-1!==dataUsed.indexOf("|"+mapPoint[joinBy]+"|")||data.push(merge(mapPoint,{value:null}))})),Series.prototype.setData.call(this,data,redraw)},getMapData:function(key,value){var options=this.options,mapData=options.mapData,mapMap=this.mapMap,i=mapData.length;if(mapMap||(mapMap=this.mapMap={}),void 0!==mapMap[value])return mapData[mapMap[value]];if(void 0!==value)for(;i--;)if(mapData[i][key]===value)return mapMap[value]=i,mapData[i]},translateColors:function(){var series=this,nullColor=this.options.nullColor,colorAxis=this.colorAxis;each(this.data,function(point){var color,value=point.value;color=null===value?nullColor:colorAxis?colorAxis.toColor(value,point):point.color||series.color,color&&(point.color=point.options.color=color)})},drawGraph:noop,drawDataLabels:noop,translate:function(){var series=this,xAxis=series.xAxis,yAxis=series.yAxis;series.generatePoints(),each(series.data,function(point){point.plotX=xAxis.toPixels(point._midX,!0),point.plotY=yAxis.toPixels(point._midY,!0),(series.isDirtyData||series.chart.renderer.isVML)&&(point.shapeType="path",point.shapeArgs={d:series.translatePath(point.path),"vector-effect":"non-scaling-stroke"})}),series.translateColors()},drawPoints:function(){var scale,translateX,translateY,series=this,xAxis=series.xAxis,yAxis=series.yAxis,group=series.group,chart=series.chart,renderer=chart.renderer,getTranslate=function(axis,mapRatio){var dataMin=axis.dataMin,dataMax=axis.dataMax,fullDataMin=dataMin-(dataMax-dataMin)*(mapRatio-1)/2,fullMin=axis.min-axis.minPixelPadding/axis.transA,minOffset=fullMin-fullDataMin,centerOffset=(dataMax-dataMin-axis.max+axis.min)*mapRatio,center=minOffset/centerOffset;return axis.len*(1-scale)*center};series.transformGroup||(series.transformGroup=renderer.g().attr({scaleX:1,scaleY:1}).add(group)),series.isDirtyData||renderer.isVML?(series.group=series.transformGroup,seriesTypes.column.prototype.drawPoints.apply(series),series.group=group,each(series.points,function(point){chart.hasRendered&&point.graphic&&point.graphic.attr("fill",point.options.color)}),this.transA=xAxis.transA):(scale=xAxis.transA/this.transA,scale>.99&&1.01>scale?(translateX=0,translateY=0,scale=1):(translateX=getTranslate(xAxis,Math.max(1,series.chart.mapRatio)),translateY=getTranslate(yAxis,1/Math.min(1,series.chart.mapRatio))),this.transformGroup.animate({translateX:translateX,translateY:translateY,scaleX:scale,scaleY:scale})),Series.prototype.drawDataLabels.call(series)},render:function(){var series=this,render=Series.prototype.render;series.chart.renderer.isVML&&series.data.length>3e3?setTimeout(function(){render.call(series)}):render.call(series)},animate:function(init){var chart=this.chart,animation=this.options.animation,group=this.group,xAxis=this.xAxis,yAxis=this.yAxis,left=xAxis.pos,top=yAxis.pos;chart.renderer.isSVG&&(animation===!0&&(animation={duration:1e3}),init?group.attr({translateX:left+xAxis.len/2,translateY:top+yAxis.len/2,scaleX:.001,scaleY:.001}):(group.animate({translateX:left,translateY:top,scaleX:1,scaleY:1},animation),this.animate=null))},animateDrilldown:function(init){var scale,toBox=this.chart.plotBox,level=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],fromBox=level.bBox,animationOptions=this.chart.options.drilldown.animation;init||(scale=Math.min(fromBox.width/toBox.width,fromBox.height/toBox.height),level.shapeArgs={scaleX:scale,scaleY:scale,translateX:fromBox.x,translateY:fromBox.y},each(this.points,function(point){point.graphic.attr(level.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},animationOptions)}),this.animate=null)},drawLegendSymbol:H.LegendSymbolMixin.drawRectangle,animateDrillupFrom:function(level){seriesTypes.column.prototype.animateDrillupFrom.call(this,level)},animateDrillupTo:function(init){seriesTypes.column.prototype.animateDrillupTo.call(this,init)}}),plotOptions.mapline=merge(plotOptions.map,{lineWidth:1,fillColor:"none"}),seriesTypes.mapline=extendClass(seriesTypes.map,{type:"mapline",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth",fill:"fillColor"},drawLegendSymbol:seriesTypes.line.prototype.drawLegendSymbol}),plotOptions.mappoint=merge(plotOptions.scatter,{dataLabels:{enabled:!0,format:"{point.name}",color:"black",style:{textShadow:"0 0 5px white"}}}),seriesTypes.mappoint=extendClass(seriesTypes.scatter,{type:"mappoint"}),seriesTypes.bubble&&(plotOptions.mapbubble=merge(plotOptions.bubble,{tooltip:{pointFormat:"{point.name}: {point.z}"}}),seriesTypes.mapbubble=extendClass(seriesTypes.bubble,{pointClass:extendClass(Point,{applyOptions:MapAreaPoint.prototype.applyOptions}),xyFromShape:!0,type:"mapbubble",pointArrayMap:["z"],getMapData:seriesTypes.map.prototype.getMapData,getBox:seriesTypes.map.prototype.getBox,setData:seriesTypes.map.prototype.setData})),symbols.topbutton=function(x,y,w,h,attr){return selectiveRoundedRect(attr,x,y,w,h,attr.r,attr.r,0,0)},symbols.bottombutton=function(x,y,w,h,attr){return selectiveRoundedRect(attr,x,y,w,h,0,0,attr.r,attr.r)},H.Renderer===VMLRenderer&&each(["topbutton","bottombutton"],function(shape){VMLRenderer.prototype.symbols[shape]=symbols[shape]}),H.Map=function(options,callback){var seriesOptions,hiddenAxis={endOnTick:!1,gridLineWidth:0,lineWidth:0,minPadding:0,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};return seriesOptions=options.series,options.series=null,options=merge({chart:{panning:"xy",type:"map"},xAxis:hiddenAxis,yAxis:merge(hiddenAxis,{reversed:!0})},options,{chart:{inverted:!1,alignTicks:!1,preserveAspectRatio:!0}}),options.series=seriesOptions,new Chart(options,callback)}}(Highcharts);