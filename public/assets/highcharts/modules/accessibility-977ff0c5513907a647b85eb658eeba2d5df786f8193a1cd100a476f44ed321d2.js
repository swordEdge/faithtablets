"use strict";!function(factory){"object"==typeof module&&module.exports?module.exports=factory:factory(Highcharts)}(function(Highcharts){!function(H){function htmlencode(html){return html.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")}function stripTags(s){return"string"==typeof s?s.replace(/<\/?[^>]+(>|$)/g,""):s}function reverseChildNodes(node){for(var i=node.childNodes.length;i--;)node.appendChild(node.childNodes[i])}var doc=H.win.document,each=H.each,erase=H.erase,addEvent=H.addEvent,dateFormat=H.dateFormat,merge=H.merge,hiddenStyle={position:"absolute",left:"-9999px",top:"auto",width:"1px",height:"1px",overflow:"hidden"},typeToSeriesMap={"default":["series","data point","data points"],line:["line","data point","data points"],spline:["line","data point","data points"],area:["line","data point","data points"],areaspline:["line","data point","data points"],pie:["pie","slice","slices"],column:["column series","column","columns"],bar:["bar series","bar","bars"],scatter:["scatter series","data point","data points"],boxplot:["boxplot series","box","boxes"],arearange:["arearange series","data point","data points"],areasplinerange:["areasplinerange series","data point","data points"],bubble:["bubble series","bubble","bubbles"],columnrange:["columnrange series","column","columns"],errorbar:["errorbar series","errorbar","errorbars"],funnel:["funnel","data point","data points"],pyramid:["pyramid","data point","data points"],waterfall:["waterfall series","column","columns"],map:["map","area","areas"],mapline:["line","data point","data points"],mappoint:["point series","data point","data points"],mapbubble:["bubble series","bubble","bubbles"]},typeDescriptionMap={boxplot:" Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile and maximum. ",arearange:" Arearange charts are line charts displaying a range between a lower and higher value for each point. ",areasplinerange:" These charts are line charts displaying a range between a lower and higher value for each point. ",bubble:" Bubble charts are scatter charts where each data point also has a size value. ",columnrange:" Columnrange charts are column charts displaying a range between a lower and higher value for each point. ",errorbar:" Errorbar series are used to display the variability of the data. ",funnel:" Funnel charts are used to display reduction of data in stages. ",pyramid:" Pyramid charts consist of a single pyramid with item heights corresponding to each point value. ",waterfall:" A waterfall chart is a column chart where each column contributes towards a total end value. "};H.Series.prototype.commonKeys=["name","id","category","x","value","y"],H.Series.prototype.specialKeys=["z","open","high","q3","median","q1","low","close"],H.seriesTypes.pie&&(H.seriesTypes.pie.prototype.specialKeys=[]),H.setOptions({accessibility:{enabled:!0,pointDescriptionThreshold:30}}),H.wrap(H.Series.prototype,"render",function(proceed){proceed.apply(this,Array.prototype.slice.call(arguments,1)),this.chart.options.accessibility.enabled&&this.setA11yDescription()}),H.Series.prototype.setA11yDescription=function(){var a11yOptions=this.chart.options.accessibility,firstPointEl=this.points&&this.points.length&&this.points[0].graphic&&this.points[0].graphic.element,seriesEl=firstPointEl&&firstPointEl.parentNode||this.graph&&this.graph.element||this.group&&this.group.element;seriesEl&&(seriesEl.lastChild===firstPointEl&&reverseChildNodes(seriesEl),this.points&&(this.points.length<a11yOptions.pointDescriptionThreshold||!1===a11yOptions.pointDescriptionThreshold)&&each(this.points,function(point){point.graphic&&(point.graphic.element.setAttribute("role","img"),point.graphic.element.setAttribute("tabindex","-1"),point.graphic.element.setAttribute("aria-label",stripTags(point.series.options.pointDescriptionFormatter&&point.series.options.pointDescriptionFormatter(point)||a11yOptions.pointDescriptionFormatter&&a11yOptions.pointDescriptionFormatter(point)||point.buildPointInfoString())))}),(1<this.chart.series.length||a11yOptions.describeSingleSeries)&&(seriesEl.setAttribute("role",this.options.exposeElementToA11y?"img":"region"),seriesEl.setAttribute("tabindex","-1"),seriesEl.setAttribute("aria-label",stripTags(a11yOptions.seriesDescriptionFormatter&&a11yOptions.seriesDescriptionFormatter(this)||this.buildSeriesInfoString()))))},H.Series.prototype.buildSeriesInfoString=function(){var typeInfo=typeToSeriesMap[this.type]||typeToSeriesMap["default"],description=this.description||this.options.description;return(this.name?this.name+", ":"")+(1===this.chart.types.length?typeInfo[0]:"series")+" "+(this.index+1)+" of "+this.chart.series.length+(1===this.chart.types.length?" with ":". "+typeInfo[0]+" with ")+this.points.length+" "+(1===this.points.length?typeInfo[1]:typeInfo[2])+(description?". "+description:"")+(1<this.chart.yAxis.length&&this.yAxis?". Y axis, "+this.yAxis.getDescription():"")+(1<this.chart.xAxis.length&&this.xAxis?". X axis, "+this.xAxis.getDescription():"")},H.Point.prototype.buildPointInfoString=function(){var point=this,series=point.series,a11yOptions=series.chart.options.accessibility,infoString="",dateTimePoint=series.xAxis&&series.xAxis.isDatetimeAxis,timeDesc=dateTimePoint&&dateFormat(a11yOptions.pointDateFormatter&&a11yOptions.pointDateFormatter(point)||a11yOptions.pointDateFormat||H.Tooltip.prototype.getXDateFormat(point,series.chart.options.tooltip,series.xAxis),point.x);return H.find(series.specialKeys,function(key){return point[key]!==undefined})?(dateTimePoint&&(infoString=timeDesc),each(series.commonKeys.concat(series.specialKeys),function(key){point[key]===undefined||dateTimePoint&&"x"===key||(infoString+=(infoString?". ":"")+key+", "+point[key])})):infoString=(this.name||timeDesc||this.category||this.id||"x, "+this.x)+", "+(this.value!==undefined?this.value:this.y),this.index+1+". "+infoString+"."+(this.description?" "+this.description:"")},H.Axis.prototype.getDescription=function(){return this.userOptions&&this.userOptions.description||this.axisTitle&&this.axisTitle.textStr||this.options.id||this.categories&&"categories"||"values"},H.wrap(H.Series.prototype,"init",function(proceed){proceed.apply(this,Array.prototype.slice.call(arguments,1));var chart=this.chart;chart.options.accessibility.enabled&&(chart.types=chart.types||[],chart.types.indexOf(this.type)<0&&chart.types.push(this.type),addEvent(this,"remove",function(){var removedSeries=this,hasType=!1;each(chart.series,function(s){s!==removedSeries&&chart.types.indexOf(removedSeries.type)<0&&(hasType=!0)}),hasType||erase(chart.types,removedSeries.type)}))}),H.Chart.prototype.getTypeDescription=function(){var firstType=this.types&&this.types[0],mapTitle=this.series[0]&&this.series[0].mapTitle;return firstType?"map"===firstType?mapTitle?"Map of "+mapTitle:"Map of unspecified region.":1<this.types.length?"Combination chart.":-1<["spline","area","areaspline"].indexOf(firstType)?"Line chart.":firstType+" chart."+(typeDescriptionMap[firstType]||""):"Empty chart."},H.Chart.prototype.getAxesDescription=function(){var i,numXAxes=this.xAxis.length,numYAxes=this.yAxis.length,desc={};if(numXAxes)if(desc.xAxis="The chart has "+numXAxes+(1<numXAxes?" X axes":" X axis")+" displaying ",numXAxes<2)desc.xAxis+=this.xAxis[0].getDescription()+".";else{for(i=0;i<numXAxes-1;++i)desc.xAxis+=(i?", ":"")+this.xAxis[i].getDescription();desc.xAxis+=" and "+this.xAxis[i].getDescription()+"."}if(numYAxes)if(desc.yAxis="The chart has "+numYAxes+(1<numYAxes?" Y axes":" Y axis")+" displaying ",numYAxes<2)desc.yAxis+=this.yAxis[0].getDescription()+".";else{for(i=0;i<numYAxes-1;++i)desc.yAxis+=(i?", ":"")+this.yAxis[i].getDescription();desc.yAxis+=" and "+this.yAxis[i].getDescription()+"."}return desc},H.Chart.prototype.addAccessibleContextMenuAttribs=function(){var exportList=this.exportDivElements;exportList&&(each(exportList,function(item){"DIV"!==item.tagName||item.children&&item.children.length||(item.setAttribute("role","menuitem"),item.setAttribute("tabindex",-1))}),exportList[0].parentNode.setAttribute("role","menu"),exportList[0].parentNode.setAttribute("aria-label","Chart export"))},H.Chart.prototype.addScreenReaderRegion=function(id,tableId){var chart=this,series=chart.series,options=chart.options,a11yOptions=options.accessibility,hiddenSection=chart.screenReaderRegion=doc.createElement("div"),tableShortcut=doc.createElement("h4"),tableShortcutAnchor=doc.createElement("a"),chartHeading=doc.createElement("h4"),chartTypes=chart.types||[],axesDesc=(1===chartTypes.length&&"pie"===chartTypes[0]||"map"===chartTypes[0])&&{}||chart.getAxesDescription(),chartTypeInfo=series[0]&&typeToSeriesMap[series[0].type]||typeToSeriesMap["default"];hiddenSection.setAttribute("id",id),hiddenSection.setAttribute("role","region"),hiddenSection.setAttribute("aria-label","Chart screen reader information."),hiddenSection.innerHTML=a11yOptions.screenReaderSectionFormatter&&a11yOptions.screenReaderSectionFormatter(chart)||"<div>Use regions/landmarks to skip ahead to chart"+(1<series.length?" and navigate between data series":"")+".</div><h3>"+(options.title.text?htmlencode(options.title.text):"Chart")+(options.subtitle&&options.subtitle.text?". "+htmlencode(options.subtitle.text):"")+"</h3><h4>Long description.</h4><div>"+(options.chart.description||"No description available.")+"</div><h4>Structure.</h4><div>Chart type: "+(options.chart.typeDescription||chart.getTypeDescription())+"</div>"+(1===series.length?"<div>"+chartTypeInfo[0]+" with "+series[0].points.length+" "+(1===series[0].points.length?chartTypeInfo[1]:chartTypeInfo[2])+".</div>":"")+(axesDesc.xAxis?"<div>"+axesDesc.xAxis+"</div>":"")+(axesDesc.yAxis?"<div>"+axesDesc.yAxis+"</div>":""),chart.getCSV&&(tableShortcutAnchor.innerHTML="View as data table.",tableShortcutAnchor.href="#"+tableId,tableShortcutAnchor.setAttribute("tabindex","-1"),tableShortcutAnchor.onclick=a11yOptions.onTableAnchorClick||function(){chart.viewData(),doc.getElementById(tableId).focus()},tableShortcut.appendChild(tableShortcutAnchor),hiddenSection.appendChild(tableShortcut)),chartHeading.innerHTML="Chart graphic.",chart.renderTo.insertBefore(chartHeading,chart.renderTo.firstChild),chart.renderTo.insertBefore(hiddenSection,chart.renderTo.firstChild),merge(!0,chartHeading.style,hiddenStyle),merge(!0,hiddenSection.style,hiddenStyle)},H.Chart.prototype.callbacks.push(function(chart){var options=chart.options;if(options.accessibility.enabled){var titleElement=doc.createElementNS("http://www.w3.org/2000/svg","title"),exportGroupElement=doc.createElementNS("http://www.w3.org/2000/svg","g"),descElement=chart.container.getElementsByTagName("desc")[0],textElements=chart.container.getElementsByTagName("text"),titleId="highcharts-title-"+chart.index,tableId="highcharts-data-table-"+chart.index,hiddenSectionId="highcharts-information-region-"+chart.index,chartTitle=options.title.text||"Chart",oldColumnHeaderFormatter=options.exporting&&options.exporting.csv&&options.exporting.csv.columnHeaderFormatter,topLevelColumns=[];if(titleElement.textContent=htmlencode(chartTitle),titleElement.id=titleId,descElement.parentNode.insertBefore(titleElement,descElement),chart.renderTo.setAttribute("role","region"),chart.renderTo.setAttribute("aria-label",stripTags("Interactive chart. "+chartTitle+". Use up and down arrows to navigate with most screen readers.")),chart.exportSVGElements&&chart.exportSVGElements[0]&&chart.exportSVGElements[0].element){var oldExportCallback=chart.exportSVGElements[0].element.onclick,parent=chart.exportSVGElements[0].element.parentNode;chart.exportSVGElements[0].element.onclick=function(){oldExportCallback.apply(this,Array.prototype.slice.call(arguments)),chart.addAccessibleContextMenuAttribs(),chart.highlightExportItem(0)},chart.exportSVGElements[0].element.setAttribute("role","button"),chart.exportSVGElements[0].element.setAttribute("aria-label","View export menu"),exportGroupElement.appendChild(chart.exportSVGElements[0].element),exportGroupElement.setAttribute("role","region"),exportGroupElement.setAttribute("aria-label","Chart export menu"),parent.appendChild(exportGroupElement)}chart.rangeSelector&&each(["minInput","maxInput"],function(key,i){chart.rangeSelector[key]&&(chart.rangeSelector[key].setAttribute("tabindex","-1"),chart.rangeSelector[key].setAttribute("role","textbox"),chart.rangeSelector[key].setAttribute("aria-label","Select "+(i?"end":"start")+" date."))}),each(textElements,function(el){el.setAttribute("aria-hidden","true")}),chart.addScreenReaderRegion(hiddenSectionId,tableId),merge(!0,options.exporting,{csv:{columnHeaderFormatter:function(item,key,keyLength){if(!item)return"Category";if(item instanceof H.Axis)return item.options.title&&item.options.title.text||(item.isDatetimeAxis?"DateTime":"Category");var prevCol=topLevelColumns[topLevelColumns.length-1];return 1<keyLength&&(prevCol&&prevCol.text)!==item.name&&topLevelColumns.push({text:item.name,span:keyLength}),oldColumnHeaderFormatter?oldColumnHeaderFormatter.call(this,item,key,keyLength):1<keyLength?key:item.name}}}),H.wrap(chart,"getTable",function(proceed){return proceed.apply(this,Array.prototype.slice.call(arguments,1)).replace("<table>",'<table id="'+tableId+'" summary="Table representation of chart"><caption>'+chartTitle+"</caption>")}),H.wrap(chart,"viewData",function(proceed){if(!this.dataTableDiv){proceed.apply(this,Array.prototype.slice.call(arguments,1));var cell,newCell,table=doc.getElementById(tableId),head=table.getElementsByTagName("thead")[0],body=table.getElementsByTagName("tbody")[0],firstRow=head.firstChild.children,columnHeaderRow="<tr><td></td>";table.setAttribute("tabindex","-1"),each(body.children,function(el){cell=el.firstChild,(newCell=doc.createElement("th")).setAttribute("scope","row"),newCell.innerHTML=cell.innerHTML,cell.parentNode.replaceChild(newCell,cell)}),each(firstRow,function(el){"TH"===el.tagName&&el.setAttribute("scope","col")}),topLevelColumns.length&&(each(topLevelColumns,function(col){columnHeaderRow+='<th scope="col" colspan="'+col.span+'">'+col.text+"</th>"}),head.insertAdjacentHTML("afterbegin",columnHeaderRow))}})}})}(Highcharts),function(H){function stripTags(s){return"string"==typeof s?s.replace(/<\/?[^>]+(>|$)/g,""):s}function KeyboardNavigationModule(chart,options){this.chart=chart,this.id=options.id,this.keyCodeMap=options.keyCodeMap,this.validate=options.validate,this.init=options.init,this.terminate=options.terminate}function fakeClickEvent(element){var fakeEvent;element&&element.onclick&&doc.createEvent&&((fakeEvent=doc.createEvent("Events")).initEvent("click",!0,!1),element.onclick(fakeEvent))}function isSkipPoint(point){return point.isNull&&point.series.chart.options.accessibility.keyboardNavigation.skipNullPoints||point.series.options.skipKeyboardNavigation||!point.series.visible}function getClosestPoint(point,series,xWeight,yWeight){var dPoint,minIx,distance,minDistance=Infinity,i=series.points.length;if(point.plotX!==undefined&&point.plotY!==undefined){for(;i--;){if((dPoint=series.points[i]).plotX===undefined||dPoint.plotY===undefined)return;(distance=(point.plotX-dPoint.plotX)*(point.plotX-dPoint.plotX)*(xWeight||1)+(point.plotY-dPoint.plotY)*(point.plotY-dPoint.plotY)*(yWeight||1))<minDistance&&(minDistance=distance,minIx=i)}return series.points[minIx||0]}}var win=H.win,doc=win.document,each=H.each,addEvent=H.addEvent,fireEvent=H.fireEvent,merge=H.merge,pick=H.pick;H.extend(H.SVGElement.prototype,{addFocusBorder:function(margin,style){this.focusBorder&&this.removeFocusBorder();var bb=this.getBBox(),pad=pick(margin,3);this.focusBorder=this.renderer.rect(bb.x-pad,bb.y-pad,bb.width+2*pad,bb.height+2*pad,style&&style.borderRadius).addClass("highcharts-focus-border").attr({stroke:style&&style.stroke,"stroke-width":style&&style.strokeWidth}).attr({zIndex:99}).add(this.parentGroup)},removeFocusBorder:function(){this.focusBorder&&(this.focusBorder.destroy(),delete this.focusBorder)}}),H.Series.prototype.keyboardMoveVertical=!0,each(["column","pie"],function(type){H.seriesTypes[type]&&(H.seriesTypes[type].prototype.keyboardMoveVertical=!1)}),H.setOptions({accessibility:{keyboardNavigation:{enabled:!0,focusBorder:{enabled:!0,style:{color:"#000000",lineWidth:1,borderRadius:2},margin:2}}}}),KeyboardNavigationModule.prototype={run:function(e){var navModule=this,keyCode=e.which||e.keyCode,found=!1,handled=!1;return each(this.keyCodeMap,function(codeSet){-1<codeSet[0].indexOf(keyCode)&&(handled=!(found=!0)!==codeSet[1].call(navModule,keyCode,e))}),found||9!==keyCode||(handled=this.move(e.shiftKey?-1:1)),handled},move:function(direction){var chart=this.chart;this.terminate&&this.terminate(direction),chart.keyboardNavigationModuleIndex+=direction;var newModule=chart.keyboardNavigationModules[chart.keyboardNavigationModuleIndex];if(chart.focusElement&&chart.focusElement.removeFocusBorder(),newModule){if(newModule.validate&&!newModule.validate())return this.move(direction);if(newModule.init)return newModule.init(direction),!0}return(chart.keyboardNavigationModuleIndex=0)<direction?(this.chart.exiting=!0,this.chart.tabExitAnchor.focus()):this.chart.renderTo.focus(),!1}},H.Axis.prototype.panStep=function(direction,granularity){var gran=granularity||3,extremes=this.getExtremes(),step=(extremes.max-extremes.min)/gran*direction,newMax=extremes.max+step,newMin=extremes.min+step,size=newMax-newMin;direction<0&&newMin<extremes.dataMin?newMax=(newMin=extremes.dataMin)+size:0<direction&&newMax>extremes.dataMax&&(newMin=(newMax=extremes.dataMax)-size),this.setExtremes(newMin,newMax)},H.Chart.prototype.setFocusToElement=function(svgElement,focusElement){var focusBorderOptions=this.options.accessibility.keyboardNavigation.focusBorder;focusBorderOptions.enabled&&svgElement!==this.focusElement&&(this.focusElement&&this.focusElement.removeFocusBorder(),focusElement&&focusElement.element&&focusElement.element.focus?focusElement.element.focus():svgElement.element.focus&&svgElement.element.focus(),svgElement.addFocusBorder(focusBorderOptions.margin,{stroke:focusBorderOptions.style.color,strokeWidth:focusBorderOptions.style.lineWidth,borderRadius:focusBorderOptions.style.borderRadius}),this.focusElement=svgElement)},H.Point.prototype.highlight=function(){var chart=this.series.chart;return this.isNull?chart.tooltip&&chart.tooltip.hide(0):this.onMouseOver(),this.graphic&&chart.setFocusToElement(this.graphic),chart.highlightedPoint=this},H.Chart.prototype.highlightAdjacentPoint=function(next){var newSeries,newPoint,chart=this,series=chart.series,curPoint=chart.highlightedPoint,curPointIndex=curPoint&&curPoint.index||0,curPoints=curPoint&&curPoint.series.points,lastSeries=chart.series&&chart.series[chart.series.length-1],lastPoint=lastSeries&&lastSeries.points&&lastSeries.points[lastSeries.points.length-1],forwardSkipAmount=curPoint&&curPoint.series.connectEnds&&curPointIndex>curPoints.length-3?2:1;if(!series[0]||!series[0].points)return!1;if(curPoint){if(curPoints[curPointIndex]!==curPoint)for(var i=0;i<curPoints.length;++i)if(curPoints[i]===curPoint){curPointIndex=i;break}if(newSeries=series[curPoint.series.index+(next?1:-1)],(newPoint=curPoints[curPointIndex+(next?forwardSkipAmount:-1)]||newSeries&&newSeries.points[next?0:newSeries.points.length-(newSeries.connectEnds?2:1)])===undefined)return!1}else newPoint=next?series[0].points[0]:lastPoint;return isSkipPoint(newPoint)?(chart.highlightedPoint=newPoint,chart.highlightAdjacentPoint(next)):newPoint.highlight()},H.Series.prototype.highlightFirstValidPoint=function(){for(var curPoint=this.chart.highlightedPoint,start=curPoint.series===this?curPoint.index:0,points=this.points,i=start,len=points.length;i<len;++i)if(!isSkipPoint(points[i]))return points[i].highlight();for(var j=start;0<=j;--j)if(!isSkipPoint(points[j]))return points[j].highlight();return!1},H.Chart.prototype.highlightAdjacentSeries=function(down){var newSeries,newPoint,chart=this,curPoint=chart.highlightedPoint,lastSeries=chart.series&&chart.series[chart.series.length-1],lastPoint=lastSeries&&lastSeries.points&&lastSeries.points[lastSeries.points.length-1];return chart.highlightedPoint?!!(newSeries=chart.series[curPoint.series.index+(down?-1:1)])&&(!!(newPoint=getClosestPoint(curPoint,newSeries,4))&&(newSeries.visible?(newPoint.highlight(),newPoint.series.highlightFirstValidPoint()):(newPoint.highlight(),chart.highlightAdjacentSeries(down)||(curPoint.highlight(),!1)))):(newSeries=down?chart.series&&chart.series[0]:lastSeries,!!(newPoint=down?newSeries&&newSeries.points&&newSeries.points[0]:lastPoint)&&newPoint.highlight())},H.Chart.prototype.highlightAdjacentPointVertical=function(down){var bestPoint,curPoint=this.highlightedPoint,minDistance=Infinity;return curPoint.plotX!==undefined&&curPoint.plotY!==undefined&&(each(this.series,function(series){each(series.points,function(point){if(point.plotY!==undefined&&point.plotX!==undefined&&point!==curPoint){var yDistance=point.plotY-curPoint.plotY,width=Math.abs(point.plotX-curPoint.plotX),distance=Math.abs(yDistance)*Math.abs(yDistance)+width*width*4;series.yAxis.reversed&&(yDistance*=-1),yDistance<0&&down||0<yDistance&&!down||distance<5||isSkipPoint(point)||distance<minDistance&&(minDistance=distance,bestPoint=point)}})}),!!bestPoint&&bestPoint.highlight())},H.Chart.prototype.showExportMenu=function(){this.exportSVGElements&&this.exportSVGElements[0]&&(this.exportSVGElements[0].element.onclick(),this.highlightExportItem(0))},H.Chart.prototype.hideExportMenu=function(){var exportList=this.exportDivElements;exportList&&(each(exportList,function(el){fireEvent(el,"mouseleave")}),exportList[this.highlightedExportItem]&&exportList[this.highlightedExportItem].onmouseout&&exportList[this.highlightedExportItem].onmouseout(),this.highlightedExportItem=0,this.renderTo.focus())},H.Chart.prototype.highlightExportItem=function(ix){var listItem=this.exportDivElements&&this.exportDivElements[ix],curHighlighted=this.exportDivElements&&this.exportDivElements[this.highlightedExportItem];if(listItem&&"DIV"===listItem.tagName&&(!listItem.children||!listItem.children.length))return listItem.focus&&listItem.focus(),curHighlighted&&curHighlighted.onmouseout&&curHighlighted.onmouseout(),listItem.onmouseover&&listItem.onmouseover(),this.highlightedExportItem=ix,!0},H.Chart.prototype.highlightRangeSelectorButton=function(ix){var buttons=this.rangeSelector.buttons;return buttons[this.highlightedRangeSelectorItemIx]&&buttons[this.highlightedRangeSelectorItemIx].setState(this.oldRangeSelectorItemState||0),!!buttons[this.highlightedRangeSelectorItemIx=ix]&&(this.setFocusToElement(buttons[ix].box,buttons[ix]),this.oldRangeSelectorItemState=buttons[ix].state,buttons[ix].setState(2),!0)},H.Chart.prototype.highlightLegendItem=function(ix){var items=this.legend.allItems,oldIx=this.highlightedLegendItemIx;return!!items[ix]&&(items[oldIx]&&fireEvent(items[oldIx].legendGroup.element,"mouseout"),this.highlightedLegendItemIx=ix,this.setFocusToElement(items[ix].legendItem,items[ix].legendGroup),fireEvent(items[ix].legendGroup.element,"mouseover"),!0)},H.Chart.prototype.addKeyboardNavigationModules=function(){function navModuleFactory(id,keyMap,options){return new KeyboardNavigationModule(chart,merge({keyCodeMap:keyMap},{id:id},options))}var chart=this;chart.keyboardNavigationModules=[navModuleFactory("entry",[]),navModuleFactory("points",[[[37,39],function(keyCode){return chart.highlightAdjacentPoint(39===keyCode),!0}],[[38,40],function(keyCode){var highlightMethod=chart.highlightedPoint&&chart.highlightedPoint.series.keyboardMoveVertical?"highlightAdjacentPointVertical":"highlightAdjacentSeries";return chart[highlightMethod](38!==keyCode),!0}],[[13,32],function(){chart.highlightedPoint&&chart.highlightedPoint.firePointEvent("click")}]],{init:function(){delete chart.highlightedPoint;for(var i=0;i<chart.series.length;++i)for(var j=0,len=chart.series[i].points&&chart.series[i].points.length;j<len;++j)if(!isSkipPoint(chart.series[i].points[j]))return chart.series[i].points[j].highlight()},terminate:function(){chart.tooltip&&chart.tooltip.hide(0),delete chart.highlightedPoint}}),navModuleFactory("exporting",[[[37,38],function(){for(var i=chart.highlightedExportItem||0,reachedEnd=!0;i--;)if(chart.highlightExportItem(i)){reachedEnd=!1;break}if(reachedEnd)return chart.hideExportMenu(),this.move(-1)}],[[39,40],function(){for(var reachedEnd=!0,i=(chart.highlightedExportItem||0)+1;i<chart.exportDivElements.length;++i)if(chart.highlightExportItem(i)){reachedEnd=!1;break}if(reachedEnd)return chart.hideExportMenu(),this.move(1)}],[[13,32],function(){fakeClickEvent(chart.exportDivElements[chart.highlightedExportItem])}]],{validate:function(){return chart.exportChart&&!(chart.options.exporting&&!1===chart.options.exporting.enabled)},init:function(direction){if(chart.highlightedPoint=null,chart.showExportMenu(),direction<0&&chart.exportDivElements)for(var i=chart.exportDivElements.length;-1<i&&!chart.highlightExportItem(i);--i);},terminate:function(){chart.hideExportMenu()}}),navModuleFactory("mapZoom",[[[38,40,37,39],function(keyCode){chart[38===keyCode||40===keyCode?"yAxis":"xAxis"][0].panStep(keyCode<39?-1:1)}],[[9],function(keyCode,e){var button;if(chart.mapNavButtons[chart.focusedMapNavButtonIx].setState(0),e.shiftKey&&!chart.focusedMapNavButtonIx||!e.shiftKey&&chart.focusedMapNavButtonIx)return chart.mapZoom(),this.move(e.shiftKey?-1:1);chart.focusedMapNavButtonIx+=e.shiftKey?-1:1,button=chart.mapNavButtons[chart.focusedMapNavButtonIx],chart.setFocusToElement(button.box,button),button.setState(2)}],[[13,32],function(){fakeClickEvent(chart.mapNavButtons[chart.focusedMapNavButtonIx].element)}]],{validate:function(){return chart.mapZoom&&chart.mapNavButtons&&2===chart.mapNavButtons.length},init:function(direction){var zoomIn=chart.mapNavButtons[0],zoomOut=chart.mapNavButtons[1],initialButton=0<direction?zoomIn:zoomOut;each(chart.mapNavButtons,function(button,i){button.element.setAttribute("tabindex",-1),button.element.setAttribute("role","button"),button.element.setAttribute("aria-label","Zoom "+(i?"out ":"")+"chart")}),chart.setFocusToElement(initialButton.box,initialButton),initialButton.setState(2),chart.focusedMapNavButtonIx=0<direction?0:1}}),navModuleFactory("rangeSelector",[[[37,39,38,40],function(keyCode){var direction=37===keyCode||38===keyCode?-1:1;if(!chart.highlightRangeSelectorButton(chart.highlightedRangeSelectorItemIx+direction))return this.move(direction)}],[[13,32],function(){3!==chart.oldRangeSelectorItemState&&fakeClickEvent(chart.rangeSelector.buttons[chart.highlightedRangeSelectorItemIx].element)}]],{validate:function(){return chart.rangeSelector&&chart.rangeSelector.buttons&&chart.rangeSelector.buttons.length},init:function(direction){each(chart.rangeSelector.buttons,function(button){button.element.setAttribute("tabindex","-1"),button.element.setAttribute("role","button"),button.element.setAttribute("aria-label","Select range "+(button.text&&button.text.textStr))}),chart.highlightRangeSelectorButton(0<direction?0:chart.rangeSelector.buttons.length-1)}}),navModuleFactory("rangeSelectorInput",[[[9,38,40],function(keyCode,e){var direction=9===keyCode&&e.shiftKey||38===keyCode?-1:1,newIx=chart.highlightedInputRangeIx=chart.highlightedInputRangeIx+direction;if(1<newIx||newIx<0)return this.move(direction);chart.rangeSelector[newIx?"maxInput":"minInput"].focus()}]],{validate:function(){return chart.rangeSelector&&chart.rangeSelector.inputGroup&&"hidden"!==chart.rangeSelector.inputGroup.element.getAttribute("visibility")&&!1!==chart.options.rangeSelector.inputEnabled&&chart.rangeSelector.minInput&&chart.rangeSelector.maxInput},init:function(direction){chart.highlightedInputRangeIx=0<direction?0:1,chart.rangeSelector[chart.highlightedInputRangeIx?"maxInput":"minInput"].focus()}}),navModuleFactory("legend",[[[37,39,38,40],function(keyCode){var direction=37===keyCode||38===keyCode?-1:1;if(!chart.highlightLegendItem(chart.highlightedLegendItemIx+direction))return this.move(direction)}],[[13,32],function(){fakeClickEvent(chart.legend.allItems[chart.highlightedLegendItemIx].legendItem.element.parentNode)}]],{validate:function(){return chart.legend&&chart.legend.allItems&&chart.legend.display&&!(chart.colorAxis&&chart.colorAxis.length)&&!1!==(chart.options.legend&&chart.options.legend.keyboardNavigation&&chart.options.legend.keyboardNavigation.enabled)},init:function(direction){each(chart.legend.allItems,function(item){item.legendGroup.element.setAttribute("tabindex","-1"),item.legendGroup.element.setAttribute("role","button"),item.legendGroup.element.setAttribute("aria-label",stripTags("Toggle visibility of series "+item.name))}),chart.highlightLegendItem(0<direction?0:chart.legend.allItems.length-1)}})]},H.Chart.prototype.addExitAnchor=function(){var chart=this;return chart.tabExitAnchor=doc.createElement("div"),chart.tabExitAnchor.setAttribute("tabindex","0"),merge(!0,chart.tabExitAnchor.style,{position:"absolute",left:"-9999px",top:"auto",width:"1px",height:"1px",overflow:"hidden"}),chart.renderTo.appendChild(chart.tabExitAnchor),addEvent(chart.tabExitAnchor,"focus",function(ev){var curModule,e=ev||win.event;chart.exiting?chart.exiting=!1:(chart.renderTo.focus(),e.preventDefault(),chart.keyboardNavigationModuleIndex=chart.keyboardNavigationModules.length-1,(curModule=chart.keyboardNavigationModules[chart.keyboardNavigationModuleIndex]).validate&&!curModule.validate()?curModule.move(-1):curModule.init(-1))})},H.Chart.prototype.callbacks.push(function(chart){var a11yOptions=chart.options.accessibility;a11yOptions.enabled&&a11yOptions.keyboardNavigation.enabled&&(chart.addKeyboardNavigationModules(),chart.keyboardNavigationModuleIndex=0,chart.container.hasAttribute&&!chart.container.hasAttribute("tabIndex")&&chart.container.setAttribute("tabindex","0"),chart.tabExitAnchor||(chart.unbindExitAnchorFocus=chart.addExitAnchor()),chart.unbindKeydownHandler=addEvent(chart.renderTo,"keydown",function(ev){var e=ev||win.event,curNavModule=chart.keyboardNavigationModules[chart.keyboardNavigationModuleIndex];curNavModule&&curNavModule.run(e)&&e.preventDefault()}),addEvent(chart,"destroy",function(){chart.unbindExitAnchorFocus&&chart.tabExitAnchor&&chart.unbindExitAnchorFocus(),chart.unbindKeydownHandler&&chart.renderTo&&chart.unbindKeydownHandler()}))})}(Highcharts)});