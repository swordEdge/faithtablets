"use strict";!function(factory){"object"==typeof module&&module.exports?module.exports=factory:factory(Highcharts)}(function(Highcharts){var H,destroyLoadingDiv,doc,noop,Color,Series,seriesTypes,each,extend,addEvent,fireEvent,isNumber,merge,pick,wrap,CHUNK_SIZE;doc=(H=Highcharts).win.document,noop=function(){},Color=H.Color,Series=H.Series,seriesTypes=H.seriesTypes,each=H.each,extend=H.extend,addEvent=H.addEvent,fireEvent=H.fireEvent,isNumber=H.isNumber,merge=H.merge,pick=H.pick,wrap=H.wrap,CHUNK_SIZE=5e4,H.initCanvasBoost=function(){H.seriesTypes.heatmap&&H.wrap(H.seriesTypes.heatmap.prototype,"drawPoints",function(){var ctx=this.getContext();ctx?(each(this.points,function(point){var shapeArgs,pointAttr,plotY=point.plotY;plotY===undefined||isNaN(plotY)||null===point.y||(shapeArgs=point.shapeArgs,pointAttr=point.series.pointAttribs(point),ctx.fillStyle=pointAttr.fill,ctx.fillRect(shapeArgs.x,shapeArgs.y,shapeArgs.width,shapeArgs.height))}),this.canvasToSVG()):this.chart.showLoading("Your browser doesn't support HTML5 canvas, <br>please use a modern browser")}),H.extend(Series.prototype,{getContext:function(){var ctx,chart=this.chart,width=chart.chartWidth,height=chart.chartHeight,targetGroup=chart.seriesGroup||this.group,target=this,swapXY=function(proceed,x,y,a,b,c,d){proceed.call(this,y,x,a,b,c,d)};return chart.isChartSeriesBoosting()&&(targetGroup=(target=chart).seriesGroup),ctx=target.ctx,target.canvas?H.Chart:(target.canvas=doc.createElement("canvas"),target.renderTarget=chart.renderer.image("",0,0,width,height).add(targetGroup),target.ctx=ctx=target.canvas.getContext("2d"),chart.inverted&&each(["moveTo","lineTo","rect","arc"],function(fn){wrap(ctx,fn,swapXY)}),target.boostClear=function(){ctx.clearRect(0,0,target.canvas.width,target.canvas.height),target.renderTarget&&target.renderTarget.attr({href:""})},target.boostClipRect=chart.renderer.clipRect(),target.renderTarget.clip(target.boostClipRect)),target.canvas.width!==width&&(target.canvas.width=width),target.canvas.height!==height&&(target.canvas.height=height),target.renderTarget.attr({x:0,y:0,width:width,height:height,style:"pointer-events: none",href:""}),target.boostClipRect.attr(chart.getBoostClipRect(target)),ctx},canvasToSVG:function(){this.chart.isChartSeriesBoosting()?this.boostClear():this.renderTarget.attr({href:this.canvas.toDataURL("image/png")})},cvsLineTo:function(ctx,clientX,plotY){ctx.lineTo(clientX,plotY)},renderCanvas:function(){var ctx,lastClientX,points,lastPoint,wasNull,minVal,maxVal,minI,maxI,kdIndex,series=this,options=series.options,chart=series.chart,xAxis=this.xAxis,yAxis=this.yAxis,activeBoostSettings=chart.options.boost||{},boostSettings={timeRendering:activeBoostSettings.timeRendering||!1,timeSeriesProcessing:activeBoostSettings.timeSeriesProcessing||!1,timeSetup:activeBoostSettings.timeSetup||!1},c=0,xData=series.processedXData,yData=series.processedYData,rawData=options.data,xExtremes=xAxis.getExtremes(),xMin=xExtremes.min,xMax=xExtremes.max,yExtremes=yAxis.getExtremes(),yMin=yExtremes.min,yMax=yExtremes.max,pointTaken={},sampling=!!series.sampling,r=options.marker&&options.marker.radius,cvsDrawPoint=this.cvsDrawPoint,cvsLineTo=!!options.lineWidth&&this.cvsLineTo,cvsMarker=r&&r<=1?this.cvsMarkerSquare:this.cvsMarkerCircle,strokeBatch=this.cvsStrokeBatch||1e3,enableMouseTracking=!1!==options.enableMouseTracking,threshold=options.threshold,yBottom=yAxis.getThreshold(threshold),hasThreshold=isNumber(threshold),translatedThreshold=yBottom,doFill=this.fill,isRange=series.pointArrayMap&&"low,high"===series.pointArrayMap.join(","),isStacked=!!options.stacking,cropStart=series.cropStart||0,loadingOptions=chart.options.loading,requireSorting=series.requireSorting,connectNulls=options.connectNulls,useRaw=!xData,sdata=isStacked?series.data:xData||rawData,fillColor=series.fillOpacity?new Color(series.color).setOpacity(pick(options.fillOpacity,.75)).get():series.color,stroke=function(){doFill?(ctx.fillStyle=fillColor,ctx.fill()):(ctx.strokeStyle=series.color,ctx.lineWidth=options.lineWidth,ctx.stroke())},drawPoint=function(clientX,plotY,yBottom,i){0===c&&(ctx.beginPath(),cvsLineTo&&(ctx.lineJoin="round")),chart.scroller&&"highcharts-navigator-series"===series.options.className?(plotY+=chart.scroller.top,yBottom&&(yBottom+=chart.scroller.top)):plotY+=chart.plotTop,clientX+=chart.plotLeft,wasNull?ctx.moveTo(clientX,plotY):cvsDrawPoint?cvsDrawPoint(ctx,clientX,plotY,yBottom,lastPoint):cvsLineTo?cvsLineTo(ctx,clientX,plotY):cvsMarker&&cvsMarker.call(series,ctx,clientX,plotY,r,i),(c+=1)===strokeBatch&&(stroke(),c=0),lastPoint={clientX:clientX,plotY:plotY,yBottom:yBottom}},addKDPoint=function(clientX,plotY,i){kdIndex=clientX+","+plotY,enableMouseTracking&&!pointTaken[kdIndex]&&(pointTaken[kdIndex]=!0,chart.inverted&&(clientX=xAxis.len-clientX,plotY=yAxis.len-plotY),points.push({clientX:clientX,plotX:clientX,plotY:plotY,i:cropStart+i}))};(this.points||this.graph)&&this.destroyGraphics(),series.plotGroup("group","series",series.visible?"visible":"hidden",options.zIndex,chart.seriesGroup),series.markerGroup=series.group,addEvent(series,"destroy",function(){series.markerGroup=null}),points=this.points=[],ctx=this.getContext(),series.buildKDTree=noop,ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.visible&&(99999<rawData.length&&(chart.options.loading=merge(loadingOptions,{labelStyle:{backgroundColor:H.color("#ffffff").setOpacity(.75).get(),padding:"1em",borderRadius:"0.5em"},style:{backgroundColor:"none",opacity:1}}),clearTimeout(destroyLoadingDiv),chart.showLoading("Drawing..."),chart.options.loading=loadingOptions),boostSettings.timeRendering&&console.time("canvas rendering"),H.eachAsync(sdata,function(d,i){var x,y,clientX,plotY,isNull,low,isNextInside=!1,isPrevInside=!1,nx=!1,px=!1,chartDestroyed="undefined"==typeof chart.index,isYInside=!0;return chartDestroyed||(useRaw?(x=d[0],y=d[1],sdata[i+1]&&(nx=sdata[i+1][0]),sdata[i-1]&&(px=sdata[i-1][0])):(x=d,y=yData[i],sdata[i+1]&&(nx=sdata[i+1]),sdata[i-1]&&(px=sdata[i-1])),nx&&xMin<=nx&&nx<=xMax&&(isNextInside=!0),px&&xMin<=px&&px<=xMax&&(isPrevInside=!0),isRange?(useRaw&&(y=d.slice(1,3)),low=y[0],y=y[1]):isStacked&&(x=d.x,low=(y=d.stackY)-d.y),requireSorting||(isYInside=yMin<=y&&y<=yMax),!(isNull=null===y)&&(xMin<=x&&x<=xMax&&isYInside||isNextInside||isPrevInside)&&(clientX=Math.round(xAxis.toPixels(x,!0)),sampling?(minI!==undefined&&clientX!==lastClientX||(isRange||(low=y),(maxI===undefined||maxVal<y)&&(maxVal=y,maxI=i),(minI===undefined||low<minVal)&&(minVal=low,minI=i)),clientX!==lastClientX&&(minI!==undefined&&(plotY=yAxis.toPixels(maxVal,!0),yBottom=yAxis.toPixels(minVal,!0),drawPoint(clientX,hasThreshold?Math.min(plotY,translatedThreshold):plotY,hasThreshold?Math.max(yBottom,translatedThreshold):yBottom,i),addKDPoint(clientX,plotY,maxI),yBottom!==plotY&&addKDPoint(clientX,yBottom,minI)),minI=maxI=undefined,lastClientX=clientX)):(plotY=Math.round(yAxis.toPixels(y,!0)),drawPoint(clientX,plotY,yBottom,i),addKDPoint(clientX,plotY,i))),wasNull=isNull&&!connectNulls,i%CHUNK_SIZE==0&&series.canvasToSVG()),!chartDestroyed},function(){var loadingDiv=chart.loadingDiv,loadingShown=chart.loadingShown;stroke(),series.canvasToSVG(),boostSettings.timeRendering&&console.timeEnd("canvas rendering"),fireEvent(series,"renderedCanvas"),loadingShown&&(extend(loadingDiv.style,{transition:"opacity 250ms",opacity:0}),chart.loadingShown=!1,destroyLoadingDiv=setTimeout(function(){loadingDiv.parentNode&&loadingDiv.parentNode.removeChild(loadingDiv),chart.loadingDiv=chart.loadingSpan=null},250)),delete series.buildKDTree,series.buildKDTree()},chart.renderer.forExport?Number.MAX_VALUE:undefined))}}),seriesTypes.scatter.prototype.cvsMarkerCircle=function(ctx,clientX,plotY,r){ctx.moveTo(clientX,plotY),ctx.arc(clientX,plotY,r,0,2*Math.PI,!1)},seriesTypes.scatter.prototype.cvsMarkerSquare=function(ctx,clientX,plotY,r){ctx.rect(clientX-r,plotY-r,2*r,2*r)},seriesTypes.scatter.prototype.fill=!0,seriesTypes.bubble&&(seriesTypes.bubble.prototype.cvsMarkerCircle=function(ctx,clientX,plotY,r,i){ctx.moveTo(clientX,plotY),ctx.arc(clientX,plotY,this.radii&&this.radii[i],0,2*Math.PI,!1)},seriesTypes.bubble.prototype.cvsStrokeBatch=1),extend(seriesTypes.area.prototype,{cvsDrawPoint:function(ctx,clientX,plotY,yBottom,lastPoint){lastPoint&&clientX!==lastPoint.clientX&&(ctx.moveTo(lastPoint.clientX,lastPoint.yBottom),ctx.lineTo(lastPoint.clientX,lastPoint.plotY),ctx.lineTo(clientX,plotY),ctx.lineTo(clientX,yBottom))},fill:!0,fillOpacity:!0,sampling:!0}),extend(seriesTypes.column.prototype,{cvsDrawPoint:function(ctx,clientX,plotY,yBottom){ctx.rect(clientX-1,plotY,1,yBottom-plotY)},fill:!0,sampling:!0}),H.Chart.prototype.callbacks.push(function(chart){function canvasToSVG(){chart.renderTarget&&chart.canvas&&chart.renderTarget.attr({href:chart.canvas.toDataURL("image/png")})}function clear(){chart.renderTarget&&chart.renderTarget.attr({href:""}),chart.canvas&&chart.canvas.getContext("2d").clearRect(0,0,chart.canvas.width,chart.canvas.height)}addEvent(chart,"predraw",clear),addEvent(chart,"render",canvasToSVG)})}});