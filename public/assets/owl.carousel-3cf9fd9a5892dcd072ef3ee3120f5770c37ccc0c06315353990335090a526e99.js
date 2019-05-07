/*
 *	jQuery OwlCarousel v1.31
 *
 *	Copyright (c) 2013 Bartosz Wojciechowski
 *	http://www.owlgraphic.com/owlcarousel/
 *
 *	Licensed under MIT
 *
 */
"function"!=typeof Object.create&&(Object.create=function(obj){function F(){}return F.prototype=obj,new F}),function($,window,document,undefined){var Carousel={init:function(options,el){var base=this;base.$elem=$(el),base.options=$.extend({},$.fn.owlCarousel.options,base.$elem.data(),options),base.userOptions=options,base.loadContent()},loadContent:function(){function getData(data){if("function"==typeof base.options.jsonSuccess)base.options.jsonSuccess.apply(this,[data]);else{var content="";for(var i in data.owl)content+=data.owl[i].item;base.$elem.html(content)}base.logIn()}var base=this;if("function"==typeof base.options.beforeInit&&base.options.beforeInit.apply(this,[base.$elem]),"string"==typeof base.options.jsonPath){var url=base.options.jsonPath;$.getJSON(url,getData)}else base.logIn()},logIn:function(){var base=this;base.$elem.data("owl-originalStyles",base.$elem.attr("style")).data("owl-originalClasses",base.$elem.attr("class")),base.$elem.css({opacity:0}),base.orignalItems=base.options.items,base.checkBrowser(),base.wrapperWidth=0,base.checkVisible,base.setVars()},setVars:function(){var base=this;return 0===base.$elem.children().length?!1:(base.baseClass(),base.eventTypes(),base.$userItems=base.$elem.children(),base.itemsAmount=base.$userItems.length,base.wrapItems(),base.$owlItems=base.$elem.find(".owl-item"),base.$owlWrapper=base.$elem.find(".owl-wrapper"),base.playDirection="next",base.prevItem=0,base.prevArr=[0],base.currentItem=0,base.customEvents(),void base.onStartup())},onStartup:function(){var base=this;base.updateItems(),base.calculateAll(),base.buildControls(),base.updateControls(),base.response(),base.moveEvents(),base.stopOnHover(),base.owlStatus(),base.options.transitionStyle!==!1&&base.transitionTypes(base.options.transitionStyle),base.options.autoPlay===!0&&(base.options.autoPlay=5e3),base.play(),base.$elem.find(".owl-wrapper").css("display","block"),base.$elem.is(":visible")?base.$elem.css("opacity",1):base.watchVisibility(),base.onstartup=!1,base.eachMoveUpdate(),"function"==typeof base.options.afterInit&&base.options.afterInit.apply(this,[base.$elem])},eachMoveUpdate:function(){var base=this;base.options.lazyLoad===!0&&base.lazyLoad(),base.options.autoHeight===!0&&base.autoHeight(),base.onVisibleItems(),"function"==typeof base.options.afterAction&&base.options.afterAction.apply(this,[base.$elem])},updateVars:function(){var base=this;"function"==typeof base.options.beforeUpdate&&base.options.beforeUpdate.apply(this,[base.$elem]),base.watchVisibility(),base.updateItems(),base.calculateAll(),base.updatePosition(),base.updateControls(),base.eachMoveUpdate(),"function"==typeof base.options.afterUpdate&&base.options.afterUpdate.apply(this,[base.$elem])},reload:function(){var base=this;setTimeout(function(){base.updateVars()},0)},watchVisibility:function(){var base=this;return base.$elem.is(":visible")!==!1?!1:(base.$elem.css({opacity:0}),clearInterval(base.autoPlayInterval),clearInterval(base.checkVisible),void(base.checkVisible=setInterval(function(){base.$elem.is(":visible")&&(base.reload(),base.$elem.animate({opacity:1},200),clearInterval(base.checkVisible))},500)))},wrapItems:function(){var base=this;base.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),base.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),base.wrapperOuter=base.$elem.find(".owl-wrapper-outer"),base.$elem.css("display","block")},baseClass:function(){var base=this,hasBaseClass=base.$elem.hasClass(base.options.baseClass),hasThemeClass=base.$elem.hasClass(base.options.theme);hasBaseClass||base.$elem.addClass(base.options.baseClass),hasThemeClass||base.$elem.addClass(base.options.theme)},updateItems:function(){var base=this;if(base.options.responsive===!1)return!1;if(base.options.singleItem===!0)return base.options.items=base.orignalItems=1,base.options.itemsCustom=!1,base.options.itemsDesktop=!1,base.options.itemsDesktopSmall=!1,base.options.itemsTablet=!1,base.options.itemsTabletSmall=!1,base.options.itemsMobile=!1,!1;var width=$(base.options.responsiveBaseWidth).width();if(width>(base.options.itemsDesktop[0]||base.orignalItems)&&(base.options.items=base.orignalItems),"undefined"!=typeof base.options.itemsCustom&&base.options.itemsCustom!==!1){base.options.itemsCustom.sort(function(a,b){return a[0]-b[0]});for(var i in base.options.itemsCustom)"undefined"!=typeof base.options.itemsCustom[i]&&base.options.itemsCustom[i][0]<=width&&(base.options.items=base.options.itemsCustom[i][1])}else width<=base.options.itemsDesktop[0]&&base.options.itemsDesktop!==!1&&(base.options.items=base.options.itemsDesktop[1]),width<=base.options.itemsDesktopSmall[0]&&base.options.itemsDesktopSmall!==!1&&(base.options.items=base.options.itemsDesktopSmall[1]),width<=base.options.itemsTablet[0]&&base.options.itemsTablet!==!1&&(base.options.items=base.options.itemsTablet[1]),width<=base.options.itemsTabletSmall[0]&&base.options.itemsTabletSmall!==!1&&(base.options.items=base.options.itemsTabletSmall[1]),width<=base.options.itemsMobile[0]&&base.options.itemsMobile!==!1&&(base.options.items=base.options.itemsMobile[1]);base.options.items>base.itemsAmount&&base.options.itemsScaleUp===!0&&(base.options.items=base.itemsAmount)},response:function(){var smallDelay,base=this;if(base.options.responsive!==!0)return!1;var lastWindowWidth=$(window).width();base.resizer=function(){$(window).width()!==lastWindowWidth&&(base.options.autoPlay!==!1&&clearInterval(base.autoPlayInterval),clearTimeout(smallDelay),smallDelay=setTimeout(function(){lastWindowWidth=$(window).width(),base.updateVars()},base.options.responsiveRefreshRate))},$(window).resize(base.resizer)},updatePosition:function(){var base=this;base.jumpTo(base.currentItem),base.options.autoPlay!==!1&&base.checkAp()},appendItemsSizes:function(){var base=this,roundPages=0,lastItem=base.itemsAmount-base.options.items;base.$owlItems.each(function(index){var $this=$(this);$this.css({width:base.itemWidth}).data("owl-item",Number(index)),(index%base.options.items===0||index===lastItem)&&(index>lastItem||(roundPages+=1)),$this.data("owl-roundPages",roundPages)})},appendWrapperSizes:function(){var base=this,width=0,width=base.$owlItems.length*base.itemWidth;base.$owlWrapper.css({width:2*width,left:0}),base.appendItemsSizes()},calculateAll:function(){var base=this;base.calculateWidth(),base.appendWrapperSizes(),base.loops(),base.max()},calculateWidth:function(){var base=this;base.itemWidth=Math.round(base.$elem.width()/base.options.items)},max:function(){var base=this,maximum=-1*(base.itemsAmount*base.itemWidth-base.options.items*base.itemWidth);return base.options.items>base.itemsAmount?(base.maximumItem=0,maximum=0,base.maximumPixels=0):(base.maximumItem=base.itemsAmount-base.options.items,base.maximumPixels=maximum),maximum},min:function(){return 0},loops:function(){var base=this;base.positionsInArray=[0],base.pagesInArray=[];for(var prev=0,elWidth=0,i=0;i<base.itemsAmount;i++)if(elWidth+=base.itemWidth,base.positionsInArray.push(-elWidth),base.options.scrollPerPage===!0){var item=$(base.$owlItems[i]),roundPageNum=item.data("owl-roundPages");roundPageNum!==prev&&(base.pagesInArray[prev]=base.positionsInArray[i],prev=roundPageNum)}},buildControls:function(){var base=this;(base.options.navigation===!0||base.options.pagination===!0)&&(base.owlControls=$('<div class="owl-controls"/>').toggleClass("clickable",!base.browser.isTouch).appendTo(base.$elem)),base.options.pagination===!0&&base.buildPagination(),base.options.navigation===!0&&base.buildButtons()},buildButtons:function(){var base=this,buttonsWrapper=$('<div class="owl-buttons"/>');base.owlControls.append(buttonsWrapper),base.buttonPrev=$("<div/>",{"class":"owl-prev",html:base.options.navigationText[0]||""}),base.buttonNext=$("<div/>",{"class":"owl-next",html:base.options.navigationText[1]||""}),buttonsWrapper.append(base.buttonPrev).append(base.buttonNext),buttonsWrapper.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(event){event.preventDefault()}),buttonsWrapper.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(event){event.preventDefault(),$(this).hasClass("owl-next")?base.next():base.prev()})},buildPagination:function(){var base=this;base.paginationWrapper=$('<div class="owl-pagination"/>'),base.owlControls.append(base.paginationWrapper),base.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(event){event.preventDefault(),Number($(this).data("owl-page"))!==base.currentItem&&base.goTo(Number($(this).data("owl-page")),!0)})},updatePagination:function(){var base=this;if(base.options.pagination===!1)return!1;base.paginationWrapper.html("");for(var counter=0,lastPage=base.itemsAmount-base.itemsAmount%base.options.items,i=0;i<base.itemsAmount;i++)if(i%base.options.items===0){if(counter+=1,lastPage===i)var lastItem=base.itemsAmount-base.options.items;var paginationButton=$("<div/>",{"class":"owl-page"}),paginationButtonInner=$("<span></span>",{text:base.options.paginationNumbers===!0?counter:"","class":base.options.paginationNumbers===!0?"owl-numbers":""});paginationButton.append(paginationButtonInner),paginationButton.data("owl-page",lastPage===i?lastItem:i),paginationButton.data("owl-roundPages",counter),base.paginationWrapper.append(paginationButton)}base.checkPagination()},checkPagination:function(){var base=this;return base.options.pagination===!1?!1:void base.paginationWrapper.find(".owl-page").each(function(){$(this).data("owl-roundPages")===$(base.$owlItems[base.currentItem]).data("owl-roundPages")&&(base.paginationWrapper.find(".owl-page").removeClass("active"),$(this).addClass("active"))})},checkNavigation:function(){var base=this;return base.options.navigation===!1?!1:void(base.options.rewindNav===!1&&(0===base.currentItem&&0===base.maximumItem?(base.buttonPrev.addClass("disabled"),base.buttonNext.addClass("disabled")):0===base.currentItem&&0!==base.maximumItem?(base.buttonPrev.addClass("disabled"),base.buttonNext.removeClass("disabled")):base.currentItem===base.maximumItem?(base.buttonPrev.removeClass("disabled"),base.buttonNext.addClass("disabled")):0!==base.currentItem&&base.currentItem!==base.maximumItem&&(base.buttonPrev.removeClass("disabled"),base.buttonNext.removeClass("disabled"))))},updateControls:function(){var base=this;base.updatePagination(),base.checkNavigation(),base.owlControls&&(base.options.items>=base.itemsAmount?base.owlControls.hide():base.owlControls.show())},destroyControls:function(){var base=this;base.owlControls&&base.owlControls.remove()},next:function(speed){var base=this;if(base.isTransition)return!1;if(base.currentItem+=base.options.scrollPerPage===!0?base.options.items:1,base.currentItem>base.maximumItem+(1==base.options.scrollPerPage?base.options.items-1:0)){if(base.options.rewindNav!==!0)return base.currentItem=base.maximumItem,!1;base.currentItem=0,speed="rewind"}base.goTo(base.currentItem,speed)},prev:function(speed){var base=this;if(base.isTransition)return!1;if(base.options.scrollPerPage===!0&&base.currentItem>0&&base.currentItem<base.options.items?base.currentItem=0:base.currentItem-=base.options.scrollPerPage===!0?base.options.items:1,base.currentItem<0){if(base.options.rewindNav!==!0)return base.currentItem=0,!1;base.currentItem=base.maximumItem,speed="rewind"}base.goTo(base.currentItem,speed)},goTo:function(position,speed,drag){var base=this;if(base.isTransition)return!1;if("function"==typeof base.options.beforeMove&&base.options.beforeMove.apply(this,[base.$elem]),position>=base.maximumItem?position=base.maximumItem:0>=position&&(position=0),base.currentItem=base.owl.currentItem=position,base.options.transitionStyle!==!1&&"drag"!==drag&&1===base.options.items&&base.browser.support3d===!0)return base.swapSpeed(0),base.browser.support3d===!0?base.transition3d(base.positionsInArray[position]):base.css2slide(base.positionsInArray[position],1),base.afterGo(),base.singleItemTransition(),!1;var goToPixel=base.positionsInArray[position];base.browser.support3d===!0?(base.isCss3Finish=!1,speed===!0?(base.swapSpeed("paginationSpeed"),setTimeout(function(){base.isCss3Finish=!0},base.options.paginationSpeed)):"rewind"===speed?(base.swapSpeed(base.options.rewindSpeed),setTimeout(function(){base.isCss3Finish=!0},base.options.rewindSpeed)):(base.swapSpeed("slideSpeed"),setTimeout(function(){base.isCss3Finish=!0},base.options.slideSpeed)),base.transition3d(goToPixel)):speed===!0?base.css2slide(goToPixel,base.options.paginationSpeed):"rewind"===speed?base.css2slide(goToPixel,base.options.rewindSpeed):base.css2slide(goToPixel,base.options.slideSpeed),base.afterGo()},jumpTo:function(position){var base=this;"function"==typeof base.options.beforeMove&&base.options.beforeMove.apply(this,[base.$elem]),position>=base.maximumItem||-1===position?position=base.maximumItem:0>=position&&(position=0),base.swapSpeed(0),base.browser.support3d===!0?base.transition3d(base.positionsInArray[position]):base.css2slide(base.positionsInArray[position],1),base.currentItem=base.owl.currentItem=position,base.afterGo()},afterGo:function(){var base=this;base.prevArr.push(base.currentItem),base.prevItem=base.owl.prevItem=base.prevArr[base.prevArr.length-2],base.prevArr.shift(0),base.prevItem!==base.currentItem&&(base.checkPagination(),base.checkNavigation(),base.eachMoveUpdate(),base.options.autoPlay!==!1&&base.checkAp()),"function"==typeof base.options.afterMove&&base.prevItem!==base.currentItem&&base.options.afterMove.apply(this,[base.$elem])},stop:function(){var base=this;base.apStatus="stop",clearInterval(base.autoPlayInterval)},checkAp:function(){var base=this;"stop"!==base.apStatus&&base.play()},play:function(){var base=this;return base.apStatus="play",base.options.autoPlay===!1?!1:(clearInterval(base.autoPlayInterval),void(base.autoPlayInterval=setInterval(function(){base.next(!0)},base.options.autoPlay)))},swapSpeed:function(action){var base=this;"slideSpeed"===action?base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed)):"paginationSpeed"===action?base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed)):"string"!=typeof action&&base.$owlWrapper.css(base.addCssSpeed(action))},addCssSpeed:function(speed){return{"-webkit-transition":"all "+speed+"ms ease","-moz-transition":"all "+speed+"ms ease","-o-transition":"all "+speed+"ms ease",transition:"all "+speed+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(pixels){return{"-webkit-transform":"translate3d("+pixels+"px, 0px, 0px)","-moz-transform":"translate3d("+pixels+"px, 0px, 0px)","-o-transform":"translate3d("+pixels+"px, 0px, 0px)","-ms-transform":"translate3d("+pixels+"px, 0px, 0px)",transform:"translate3d("+pixels+"px, 0px,0px)"}},transition3d:function(value){var base=this;base.$owlWrapper.css(base.doTranslate(value))},css2move:function(value){var base=this;base.$owlWrapper.css({left:value})},css2slide:function(value,speed){var base=this;base.isCssFinish=!1,base.$owlWrapper.stop(!0,!0).animate({left:value},{duration:speed||base.options.slideSpeed,complete:function(){base.isCssFinish=!0}})},checkBrowser:function(){var base=this,translate3D="translate3d(0px, 0px, 0px)",tempElem=document.createElement("div");tempElem.style.cssText="  -moz-transform:"+translate3D+"; -ms-transform:"+translate3D+"; -o-transform:"+translate3D+"; -webkit-transform:"+translate3D+"; transform:"+translate3D;var regex=/translate3d\(0px, 0px, 0px\)/g,asSupport=tempElem.style.cssText.match(regex),support3d=null!==asSupport&&1===asSupport.length,isTouch="ontouchstart"in window||navigator.msMaxTouchPoints;base.browser={support3d:support3d,isTouch:isTouch}},moveEvents:function(){var base=this;(base.options.mouseDrag!==!1||base.options.touchDrag!==!1)&&(base.gestures(),base.disabledEvents())},eventTypes:function(){var base=this,types=["s","e","x"];base.ev_types={},base.options.mouseDrag===!0&&base.options.touchDrag===!0?types=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:base.options.mouseDrag===!1&&base.options.touchDrag===!0?types=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:base.options.mouseDrag===!0&&base.options.touchDrag===!1&&(types=["mousedown.owl","mousemove.owl","mouseup.owl"]),base.ev_types.start=types[0],base.ev_types.move=types[1],base.ev_types.end=types[2]},disabledEvents:function(){var base=this;base.$elem.on("dragstart.owl",function(event){event.preventDefault()}),base.$elem.on("mousedown.disableTextSelect",function(e){return $(e.target).is("input, textarea, select, option")})},gestures:function(){function getTouches(event){return event.touches?{x:event.touches[0].pageX,y:event.touches[0].pageY}:event.pageX!==undefined?{x:event.pageX,y:event.pageY}:{x:event.clientX,y:event.clientY}}function swapEvents(type){"on"===type?($(document).on(base.ev_types.move,dragMove),$(document).on(base.ev_types.end,dragEnd)):"off"===type&&($(document).off(base.ev_types.move),$(document).off(base.ev_types.end))}function dragStart(event){var event=event.originalEvent||event||window.event;if(3===event.which)return!1;if(!(base.itemsAmount<=base.options.items)){if(base.isCssFinish===!1&&!base.options.dragBeforeAnimFinish)return!1;if(base.isCss3Finish===!1&&!base.options.dragBeforeAnimFinish)return!1;base.options.autoPlay!==!1&&clearInterval(base.autoPlayInterval),base.browser.isTouch===!0||base.$owlWrapper.hasClass("grabbing")||base.$owlWrapper.addClass("grabbing"),base.newPosX=0,base.newRelativeX=0,$(this).css(base.removeTransition());var position=$(this).position();locals.relativePos=position.left,locals.offsetX=getTouches(event).x-position.left,locals.offsetY=getTouches(event).y-position.top,swapEvents("on"),locals.sliding=!1,locals.targetElement=event.target||event.srcElement}}function dragMove(event){var event=event.originalEvent||event||window.event;base.newPosX=getTouches(event).x-locals.offsetX,base.newPosY=getTouches(event).y-locals.offsetY,base.newRelativeX=base.newPosX-locals.relativePos,"function"==typeof base.options.startDragging&&locals.dragging!==!0&&0!==base.newRelativeX&&(locals.dragging=!0,base.options.startDragging.apply(base,[base.$elem])),(base.newRelativeX>8||base.newRelativeX<-8&&base.browser.isTouch===!0)&&(event.preventDefault?event.preventDefault():event.returnValue=!1,locals.sliding=!0),(base.newPosY>10||base.newPosY<-10)&&locals.sliding===!1&&$(document).off("touchmove.owl");var minSwipe=function(){return base.newRelativeX/5},maxSwipe=function(){return base.maximumPixels+base.newRelativeX/5};base.newPosX=Math.max(Math.min(base.newPosX,minSwipe()),maxSwipe()),base.browser.support3d===!0?base.transition3d(base.newPosX):base.css2move(base.newPosX)}function dragEnd(event){var event=event.originalEvent||event||window.event;if(event.target=event.target||event.srcElement,locals.dragging=!1,base.browser.isTouch!==!0&&base.$owlWrapper.removeClass("grabbing"),base.dragDirection=base.owl.dragDirection=base.newRelativeX<0?"left":"right",0!==base.newRelativeX){var newPosition=base.getNewPosition();if(base.goTo(newPosition,!1,"drag"),locals.targetElement===event.target&&base.browser.isTouch!==!0){$(event.target).on("click.disable",function(ev){ev.stopImmediatePropagation(),ev.stopPropagation(),ev.preventDefault(),$(event.target).off("click.disable")});var handlers=$._data(event.target,"events").click,owlStopEvent=handlers.pop();handlers.splice(0,0,owlStopEvent)}}swapEvents("off")}var base=this,locals={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};base.isCssFinish=!0,base.$elem.on(base.ev_types.start,".owl-wrapper",dragStart)},getNewPosition:function(){var newPosition,base=this;return newPosition=base.closestItem(),newPosition>base.maximumItem?(base.currentItem=base.maximumItem,newPosition=base.maximumItem):base.newPosX>=0&&(newPosition=0,base.currentItem=0),newPosition},closestItem:function(){var base=this,array=base.options.scrollPerPage===!0?base.pagesInArray:base.positionsInArray,goal=base.newPosX,closest=null;return $.each(array,function(i,v){goal-base.itemWidth/20>array[i+1]&&goal-base.itemWidth/20<v&&"left"===base.moveDirection()?(closest=v,base.currentItem=base.options.scrollPerPage===!0?$.inArray(closest,base.positionsInArray):i):goal+base.itemWidth/20<v&&goal+base.itemWidth/20>(array[i+1]||array[i]-base.itemWidth)&&"right"===base.moveDirection()&&(base.options.scrollPerPage===!0?(closest=array[i+1]||array[array.length-1],base.currentItem=$.inArray(closest,base.positionsInArray)):(closest=array[i+1],base.currentItem=i+1))}),base.currentItem},moveDirection:function(){var direction,base=this;return base.newRelativeX<0?(direction="right",base.playDirection="next"):(direction="left",base.playDirection="prev"),direction},customEvents:function(){var base=this;base.$elem.on("owl.next",function(){base.next()}),base.$elem.on("owl.prev",function(){base.prev()}),base.$elem.on("owl.play",function(event,speed){base.options.autoPlay=speed,base.play(),base.hoverStatus="play"}),base.$elem.on("owl.stop",function(){base.stop(),base.hoverStatus="stop"}),base.$elem.on("owl.goTo",function(event,item){base.goTo(item)}),base.$elem.on("owl.jumpTo",function(event,item){base.jumpTo(item)})},stopOnHover:function(){var base=this;base.options.stopOnHover===!0&&base.browser.isTouch!==!0&&base.options.autoPlay!==!1&&(base.$elem.on("mouseover",function(){base.stop()}),base.$elem.on("mouseout",function(){"stop"!==base.hoverStatus&&base.play()}))},lazyLoad:function(){var base=this;if(base.options.lazyLoad===!1)return!1;for(var i=0;i<base.itemsAmount;i++){var $item=$(base.$owlItems[i]);if("loaded"!==$item.data("owl-loaded")){var follow,itemNumber=$item.data("owl-item"),$lazyImg=$item.find(".lazyOwl");"string"==typeof $lazyImg.data("src")?($item.data("owl-loaded")===undefined&&($lazyImg.hide(),$item.addClass("loading").data("owl-loaded","checked")),follow=base.options.lazyFollow===!0?itemNumber>=base.currentItem:!0,follow&&itemNumber<base.currentItem+base.options.items&&$lazyImg.length&&base.lazyPreload($item,$lazyImg)):$item.data("owl-loaded","loaded")}}},lazyPreload:function($item,$lazyImg){function checkLazyImage(){iterations+=1,base.completeImg($lazyImg.get(0))||isBackgroundImg===!0?showImage():100>=iterations?setTimeout(checkLazyImage,100):showImage()}function showImage(){$item.data("owl-loaded","loaded").removeClass("loading"),$lazyImg.removeAttr("data-src"),"fade"===base.options.lazyEffect?$lazyImg.fadeIn(400):$lazyImg.show(),"function"==typeof base.options.afterLazyLoad&&base.options.afterLazyLoad.apply(this,[base.$elem])}var base=this,iterations=0;if("DIV"===$lazyImg.prop("tagName")){$lazyImg.css("background-image","url("+$lazyImg.data("src")+")");var isBackgroundImg=!0}else $lazyImg[0].src=$lazyImg.data("src");checkLazyImage()},autoHeight:function(){function checkImage(){iterations+=1,base.completeImg($currentimg.get(0))?addHeight():100>=iterations?setTimeout(checkImage,100):base.wrapperOuter.css("height","")}function addHeight(){var $currentItem=$(base.$owlItems[base.currentItem]).height();base.wrapperOuter.css("height",$currentItem+"px"),base.wrapperOuter.hasClass("autoHeight")||setTimeout(function(){base.wrapperOuter.addClass("autoHeight")},0)}var base=this,$currentimg=$(base.$owlItems[base.currentItem]).find("img");if($currentimg.get(0)!==undefined){var iterations=0;checkImage()}else addHeight()},completeImg:function(img){return img.complete?"undefined"!=typeof img.naturalWidth&&0==img.naturalWidth?!1:!0:!1},onVisibleItems:function(){var base=this;base.options.addClassActive===!0&&base.$owlItems.removeClass("active"),base.visibleItems=[];for(var i=base.currentItem;i<base.currentItem+base.options.items;i++)base.visibleItems.push(i),base.options.addClassActive===!0&&$(base.$owlItems[i]).addClass("active");base.owl.visibleItems=base.visibleItems},transitionTypes:function(className){var base=this;base.outClass="owl-"+className+"-out",base.inClass="owl-"+className+"-in"},singleItemTransition:function(){function transStyles(prevPos){return{position:"relative",left:prevPos+"px"}}var base=this;base.isTransition=!0;var outClass=base.outClass,inClass=base.inClass,$currentItem=base.$owlItems.eq(base.currentItem),$prevItem=base.$owlItems.eq(base.prevItem),prevPos=Math.abs(base.positionsInArray[base.currentItem])+base.positionsInArray[base.prevItem],origin=Math.abs(base.positionsInArray[base.currentItem])+base.itemWidth/2;base.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":origin+"px","-moz-perspective-origin":origin+"px","perspective-origin":origin+"px"});var animEnd="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";$prevItem.css(transStyles(prevPos,10)).addClass(outClass).on(animEnd,function(){base.endPrev=!0,$prevItem.off(animEnd),base.clearTransStyle($prevItem,outClass)}),$currentItem.addClass(inClass).on(animEnd,function(){base.endCurrent=!0,$currentItem.off(animEnd),base.clearTransStyle($currentItem,inClass)})},clearTransStyle:function(item,classToRemove){var base=this;item.css({position:"",left:""}).removeClass(classToRemove),base.endPrev&&base.endCurrent&&(base.$owlWrapper.removeClass("owl-origin"),base.endPrev=!1,base.endCurrent=!1,base.isTransition=!1)},owlStatus:function(){var base=this;base.owl={userOptions:base.userOptions,baseElement:base.$elem,userItems:base.$userItems,owlItems:base.$owlItems,currentItem:base.currentItem,prevItem:base.prevItem,visibleItems:base.visibleItems,isTouch:base.browser.isTouch,browser:base.browser,dragDirection:base.dragDirection}},clearEvents:function(){var base=this;base.$elem.off(".owl owl mousedown.disableTextSelect"),$(document).off(".owl owl"),$(window).off("resize",base.resizer)},unWrap:function(){var base=this;0!==base.$elem.children().length&&(base.$owlWrapper.unwrap(),base.$userItems.unwrap().unwrap(),base.owlControls&&base.owlControls.remove()),base.clearEvents(),base.$elem.attr("style",base.$elem.data("owl-originalStyles")||"").attr("class",base.$elem.data("owl-originalClasses"))},destroy:function(){var base=this;base.stop(),clearInterval(base.checkVisible),base.unWrap(),base.$elem.removeData()},reinit:function(newOptions){var base=this,options=$.extend({},base.userOptions,newOptions);base.unWrap(),base.init(options,base.$elem)},addItem:function(htmlString,targetPosition){var position,base=this;return htmlString?0===base.$elem.children().length?(base.$elem.append(htmlString),base.setVars(),!1):(base.unWrap(),position=targetPosition===undefined||-1===targetPosition?-1:targetPosition,position>=base.$userItems.length||-1===position?base.$userItems.eq(-1).after(htmlString):base.$userItems.eq(position).before(htmlString),void base.setVars()):!1},removeItem:function(targetPosition){var position,base=this;return 0===base.$elem.children().length?!1:(position=targetPosition===undefined||-1===targetPosition?-1:targetPosition,base.unWrap(),base.$userItems.eq(position).remove(),void base.setVars())}};$.fn.owlCarousel=function(options){return this.each(function(){if($(this).data("owl-init")===!0)return!1;$(this).data("owl-init",!0);var carousel=Object.create(Carousel);carousel.init(options,this),$.data(this,"owlCarousel",carousel)})},$.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:300,paginationSpeed:1e3,rewindSpeed:300,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:window,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}}(jQuery,window,document);