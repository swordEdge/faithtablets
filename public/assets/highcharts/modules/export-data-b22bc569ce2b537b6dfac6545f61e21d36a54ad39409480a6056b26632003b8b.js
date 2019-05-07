"use strict";!function(factory){"object"==typeof module&&module.exports?module.exports=factory:factory(Highcharts)}(function(Highcharts){!function(Highcharts){var each=Highcharts.each,pick=Highcharts.pick,win=Highcharts.win,doc=win.document,seriesTypes=Highcharts.seriesTypes,downloadAttrSupported=doc.createElement("a").download!==undefined;Highcharts.setOptions({exporting:{csv:{columnHeaderFormatter:null,dateFormat:"%Y-%m-%d %H:%M:%S",itemDelimiter:",",lineDelimiter:"\n"},showTable:!1},lang:{downloadCSV:"Download CSV",downloadXLS:"Download XLS",viewData:"View data table"}}),Highcharts.addEvent(Highcharts.Chart.prototype,"render",function(){this.options&&this.options.exporting&&this.options.exporting.showTable&&this.viewData()}),Highcharts.Chart.prototype.setUpKeyToAxis=function(){seriesTypes.arearange&&(seriesTypes.arearange.prototype.keyToAxis={low:"y",high:"y"})},Highcharts.Chart.prototype.getDataRows=function(){var xAxis,dataRows,i,x,xTitle,xAxisIndex,column,csvOptions=this.options.exporting&&this.options.exporting.csv||{},xAxes=this.xAxis,rows={},rowArr=[],names=[],columnHeaderFormatter=function(item,key,keyLength){if(csvOptions.columnHeaderFormatter){var s=csvOptions.columnHeaderFormatter(item,key,keyLength);if(!1!==s)return s}return item instanceof Highcharts.Axis?item.options.title&&item.options.title.text||(item.isDatetimeAxis?"DateTime":"Category"):item?item.name+(1<keyLength?" ("+key+")":""):"Category"},xAxisIndices=[];for(x in i=0,this.setUpKeyToAxis(),each(this.series,function(series){var j,pointArrayMap=series.options.keys||series.pointArrayMap||["y"],valueCount=pointArrayMap.length,xTaken=!series.requireSorting&&{},categoryMap={},datetimeValueAxisMap={},xAxisIndex=Highcharts.inArray(series.xAxis,xAxes);if(each(pointArrayMap,function(prop){var axisName=(series.keyToAxis&&series.keyToAxis[prop]||prop)+"Axis";categoryMap[prop]=series[axisName]&&series[axisName].categories||[],datetimeValueAxisMap[prop]=series[axisName]&&series[axisName].isDatetimeAxis}),!1!==series.options.includeInCSVExport&&!1!==series.visible){for(Highcharts.find(xAxisIndices,function(index){return index[0]===xAxisIndex})||xAxisIndices.push([xAxisIndex,i]),j=0;j<valueCount;)names.push(columnHeaderFormatter(series,pointArrayMap[j],pointArrayMap.length)),j++;each(series.points,function(point,pIdx){var prop,val,key=point.x;for(xTaken&&(xTaken[key]&&(key+="|"+pIdx),xTaken[key]=!0),j=0,rows[key]||(rows[key]=[],rows[key].xValues=[]),rows[key].x=point.x,rows[key].xValues[xAxisIndex]=point.x,series.xAxis&&"name"!==series.exportKey||(rows[key].name=point.name);j<valueCount;)val=point[prop=pointArrayMap[j]],rows[key][i+j]=pick(categoryMap[prop][val],datetimeValueAxisMap[prop]?Highcharts.dateFormat(csvOptions.dateFormat,val):null,val),j++}),i+=j}}),rows)rows.hasOwnProperty(x)&&rowArr.push(rows[x]);for(dataRows=[names],i=xAxisIndices.length;i--;)xAxisIndex=xAxisIndices[i][0],column=xAxisIndices[i][1],xAxis=xAxes[xAxisIndex],rowArr.sort(function(a,b){return a.xValues[xAxisIndex]-b.xValues[xAxisIndex]}),xTitle=columnHeaderFormatter(xAxis),dataRows[0].splice(column,0,xTitle),each(rowArr,function(row){var category=row.name;category||(category=xAxis.isDatetimeAxis?(row.x instanceof Date&&(row.x=row.x.getTime()),Highcharts.dateFormat(csvOptions.dateFormat,row.x)):xAxis.categories?pick(xAxis.names[row.x],xAxis.categories[row.x],row.x):row.x),row.splice(column,0,category)});return dataRows=dataRows.concat(rowArr)},Highcharts.Chart.prototype.getCSV=function(useLocalDecimalPoint){var csv="",rows=this.getDataRows(),csvOptions=this.options.exporting.csv,itemDelimiter=csvOptions.itemDelimiter,lineDelimiter=csvOptions.lineDelimiter;return each(rows,function(row,i){for(var val="",j=row.length,n=useLocalDecimalPoint?1.1.toLocaleString()[1]:".";j--;)"string"==typeof(val=row[j])&&(val='"'+val+'"'),"number"==typeof val&&","===n&&(val=val.toString().replace(".",",")),row[j]=val;csv+=row.join(itemDelimiter),i<rows.length-1&&(csv+=lineDelimiter)}),csv},Highcharts.Chart.prototype.getTable=function(useLocalDecimalPoint){var html="<table><thead>",rows=this.getDataRows();return each(rows,function(row,i){var val,j,tag=i?"td":"th",n=useLocalDecimalPoint?1.1.toLocaleString()[1]:".";for(html+="<tr>",j=0;j<row.length;j+=1)"number"==typeof(val=row[j])?(val=val.toString(),","===n&&(val=val.replace(".",n)),html+="<"+tag+' class="number">'+val+"</"+tag+">"):html+="<"+tag+' class="text">'+(val===undefined?"":val)+"</"+tag+">";html+="</tr>",i||(html+="</thead><tbody>")}),html+="</tbody></table>"},Highcharts.Chart.prototype.fileDownload=function(href,extension,content){var a,blobObject,name;name=this.options.exporting.filename?this.options.exporting.filename:this.title&&this.title.textStr?this.title.textStr.replace(/ /g,"-").toLowerCase():"chart",win.Blob&&win.navigator.msSaveOrOpenBlob?(blobObject=new win.Blob(["\ufeff"+content],{type:"text/csv"}),win.navigator.msSaveOrOpenBlob(blobObject,name+"."+extension)):downloadAttrSupported?((a=doc.createElement("a")).href=href,a.download=name+"."+extension,this.container.appendChild(a),a.click(),a.remove()):Highcharts.error("The browser doesn't support downloading files")},Highcharts.Chart.prototype.downloadCSV=function(){var csv=this.getCSV(!0);this.fileDownload("data:text/csv,\ufeff"+encodeURIComponent(csv),"csv",csv,"text/csv")},Highcharts.Chart.prototype.downloadXLS=function(){var uri="data:application/vnd.ms-excel;base64,",template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>'+this.getTable(!0)+"</body></html>",base64=function(s){return win.btoa(unescape(encodeURIComponent(s)))};this.fileDownload(uri+base64(template),"xls",template,"application/vnd.ms-excel")},Highcharts.Chart.prototype.viewData=function(){this.dataTableDiv||(this.dataTableDiv=doc.createElement("div"),this.dataTableDiv.className="highcharts-data-table",this.renderTo.parentNode.insertBefore(this.dataTableDiv,this.renderTo.nextSibling)),this.dataTableDiv.innerHTML=this.getTable()};var exportingOptions=Highcharts.getOptions().exporting;exportingOptions&&(Highcharts.extend(exportingOptions.menuItemDefinitions,{downloadCSV:{textKey:"downloadCSV",onclick:function(){this.downloadCSV()}},downloadXLS:{textKey:"downloadXLS",onclick:function(){this.downloadXLS()}},viewData:{textKey:"viewData",onclick:function(){this.viewData()}}}),exportingOptions.buttons.contextButton.menuItems.push("separator","downloadCSV","downloadXLS","viewData")),seriesTypes.map&&(seriesTypes.map.prototype.exportKey="name"),seriesTypes.mapbubble&&(seriesTypes.mapbubble.prototype.exportKey="name"),seriesTypes.treemap&&(seriesTypes.treemap.prototype.exportKey="name")}(Highcharts)});