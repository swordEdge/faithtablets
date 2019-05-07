!function($,undefined){"use strict";var rails;$.rails!==undefined&&$.error("jquery-ujs has already been loaded!");var $document=$(document);$.rails=rails={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",buttonClickSelector:"button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",disableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",requiredInputSelector:"input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",fileInputSelector:"input[name][type=file]:not([disabled])",linkDisableSelector:"a[data-disable-with], a[data-disable]",buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]",csrfToken:function(){return $("meta[name=csrf-token]").attr("content")},csrfParam:function(){return $("meta[name=csrf-param]").attr("content")},CSRFProtection:function(xhr){var token=rails.csrfToken();token&&xhr.setRequestHeader("X-CSRF-Token",token)},refreshCSRFTokens:function(){$('form input[name="'+rails.csrfParam()+'"]').val(rails.csrfToken())},fire:function(obj,name,data){var event=$.Event(name);return obj.trigger(event,data),!1!==event.result},confirm:function(message){return confirm(message)},ajax:function(options){return $.ajax(options)},href:function(element){return element[0].href},isRemote:function(element){return element.data("remote")!==undefined&&!1!==element.data("remote")},handleRemote:function(element){var method,url,data,withCredentials,dataType,options;if(rails.fire(element,"ajax:before")){if(withCredentials=element.data("with-credentials")||null,dataType=element.data("type")||$.ajaxSettings&&$.ajaxSettings.dataType,element.is("form")){method=element.data("ujs:submit-button-formmethod")||element.attr("method"),url=element.data("ujs:submit-button-formaction")||element.attr("action"),data=$(element[0]).serializeArray();var button=element.data("ujs:submit-button");button&&(data.push(button),element.data("ujs:submit-button",null)),element.data("ujs:submit-button-formmethod",null),element.data("ujs:submit-button-formaction",null)}else element.is(rails.inputChangeSelector)?(method=element.data("method"),url=element.data("url"),data=element.serialize(),element.data("params")&&(data=data+"&"+element.data("params"))):element.is(rails.buttonClickSelector)?(method=element.data("method")||"get",url=element.data("url"),data=element.serialize(),element.data("params")&&(data=data+"&"+element.data("params"))):(method=element.data("method"),url=rails.href(element),data=element.data("params")||null);return options={type:method||"GET",data:data,dataType:dataType,beforeSend:function(xhr,settings){if(settings.dataType===undefined&&xhr.setRequestHeader("accept","*/*;q=0.5, "+settings.accepts.script),!rails.fire(element,"ajax:beforeSend",[xhr,settings]))return!1;element.trigger("ajax:send",xhr)},success:function(data,status,xhr){element.trigger("ajax:success",[data,status,xhr])},complete:function(xhr,status){element.trigger("ajax:complete",[xhr,status])},error:function(xhr,status,error){element.trigger("ajax:error",[xhr,status,error])},crossDomain:rails.isCrossDomain(url)},withCredentials&&(options.xhrFields={withCredentials:withCredentials}),url&&(options.url=url),rails.ajax(options)}return!1},isCrossDomain:function(url){var originAnchor=document.createElement("a");originAnchor.href=location.href;var urlAnchor=document.createElement("a");try{return urlAnchor.href=url,urlAnchor.href=urlAnchor.href,!((!urlAnchor.protocol||":"===urlAnchor.protocol)&&!urlAnchor.host||originAnchor.protocol+"//"+originAnchor.host==urlAnchor.protocol+"//"+urlAnchor.host)}catch(e){return!0}},handleMethod:function(link){var href=rails.href(link),method=link.data("method"),target=link.attr("target"),csrfToken=rails.csrfToken(),csrfParam=rails.csrfParam(),form=$('<form method="post" action="'+href+'"></form>'),metadataInput='<input name="_method" value="'+method+'" type="hidden" />';csrfParam===undefined||csrfToken===undefined||rails.isCrossDomain(href)||(metadataInput+='<input name="'+csrfParam+'" value="'+csrfToken+'" type="hidden" />'),target&&form.attr("target",target),form.hide().append(metadataInput).appendTo("body"),form.submit()},formElements:function(form,selector){return form.is("form")?$(form[0].elements).filter(selector):form.find(selector)},disableFormElements:function(form){rails.formElements(form,rails.disableSelector).each(function(){rails.disableFormElement($(this))})},disableFormElement:function(element){var method,replacement;method=element.is("button")?"html":"val",(replacement=element.data("disable-with"))!==undefined&&(element.data("ujs:enable-with",element[method]()),element[method](replacement)),element.prop("disabled",!0),element.data("ujs:disabled",!0)},enableFormElements:function(form){rails.formElements(form,rails.enableSelector).each(function(){rails.enableFormElement($(this))})},enableFormElement:function(element){var method=element.is("button")?"html":"val";element.data("ujs:enable-with")!==undefined&&(element[method](element.data("ujs:enable-with")),element.removeData("ujs:enable-with")),element.prop("disabled",!1),element.removeData("ujs:disabled")},allowAction:function(element){var callback,message=element.data("confirm"),answer=!1;if(!message)return!0;if(rails.fire(element,"confirm")){try{answer=rails.confirm(message)}catch(e){(console.error||console.log).call(console,e.stack||e)}callback=rails.fire(element,"confirm:complete",[answer])}return answer&&callback},blankInputs:function(form,specifiedSelector,nonBlank){var input,radiosForNameWithNoneSelected,radioName,foundInputs=$(),selector=specifiedSelector||"input,textarea",requiredInputs=form.find(selector),checkedRadioButtonNames={};return requiredInputs.each(function(){(input=$(this)).is("input[type=radio]")?(radioName=input.attr("name"),checkedRadioButtonNames[radioName]||(0===form.find('input[type=radio]:checked[name="'+radioName+'"]').length&&(radiosForNameWithNoneSelected=form.find('input[type=radio][name="'+radioName+'"]'),foundInputs=foundInputs.add(radiosForNameWithNoneSelected)),checkedRadioButtonNames[radioName]=radioName)):(input.is("input[type=checkbox],input[type=radio]")?input.is(":checked"):!!input.val())===nonBlank&&(foundInputs=foundInputs.add(input))}),!!foundInputs.length&&foundInputs},nonBlankInputs:function(form,specifiedSelector){return rails.blankInputs(form,specifiedSelector,!0)},stopEverything:function(e){return $(e.target).trigger("ujs:everythingStopped"),e.stopImmediatePropagation(),!1},disableElement:function(element){var replacement=element.data("disable-with");replacement!==undefined&&(element.data("ujs:enable-with",element.html()),element.html(replacement)),element.bind("click.railsDisable",function(e){return rails.stopEverything(e)}),element.data("ujs:disabled",!0)},enableElement:function(element){element.data("ujs:enable-with")!==undefined&&(element.html(element.data("ujs:enable-with")),element.removeData("ujs:enable-with")),element.unbind("click.railsDisable"),element.removeData("ujs:disabled")}},rails.fire($document,"rails:attachBindings")&&($.ajaxPrefilter(function(options,originalOptions,xhr){options.crossDomain||rails.CSRFProtection(xhr)}),$(window).on("pageshow.rails",function(){$($.rails.enableSelector).each(function(){var element=$(this);element.data("ujs:disabled")&&$.rails.enableFormElement(element)}),$($.rails.linkDisableSelector).each(function(){var element=$(this);element.data("ujs:disabled")&&$.rails.enableElement(element)})}),$document.on("ajax:complete",rails.linkDisableSelector,function(){rails.enableElement($(this))}),$document.on("ajax:complete",rails.buttonDisableSelector,function(){rails.enableFormElement($(this))}),$document.on("click.rails",rails.linkClickSelector,function(e){var link=$(this),method=link.data("method"),data=link.data("params"),metaClick=e.metaKey||e.ctrlKey;if(!rails.allowAction(link))return rails.stopEverything(e);if(!metaClick&&link.is(rails.linkDisableSelector)&&rails.disableElement(link),rails.isRemote(link)){if(metaClick&&(!method||"GET"===method)&&!data)return!0;var handleRemote=rails.handleRemote(link);return!1===handleRemote?rails.enableElement(link):handleRemote.fail(function(){rails.enableElement(link)}),!1}return method?(rails.handleMethod(link),!1):void 0}),$document.on("click.rails",rails.buttonClickSelector,function(e){var button=$(this);if(!rails.allowAction(button)||!rails.isRemote(button))return rails.stopEverything(e);button.is(rails.buttonDisableSelector)&&rails.disableFormElement(button);var handleRemote=rails.handleRemote(button);return!1===handleRemote?rails.enableFormElement(button):handleRemote.fail(function(){rails.enableFormElement(button)}),!1}),$document.on("change.rails",rails.inputChangeSelector,function(e){var link=$(this);return rails.allowAction(link)&&rails.isRemote(link)?(rails.handleRemote(link),!1):rails.stopEverything(e)}),$document.on("submit.rails",rails.formSubmitSelector,function(e){var blankRequiredInputs,nonBlankFileInputs,form=$(this),remote=rails.isRemote(form);if(!rails.allowAction(form))return rails.stopEverything(e);if(form.attr("novalidate")===undefined)if(form.data("ujs:formnovalidate-button")===undefined){if((blankRequiredInputs=rails.blankInputs(form,rails.requiredInputSelector,!1))&&rails.fire(form,"ajax:aborted:required",[blankRequiredInputs]))return rails.stopEverything(e)}else form.data("ujs:formnovalidate-button",undefined);if(remote){if(nonBlankFileInputs=rails.nonBlankInputs(form,rails.fileInputSelector)){setTimeout(function(){rails.disableFormElements(form)},13);var aborted=rails.fire(form,"ajax:aborted:file",[nonBlankFileInputs]);return aborted||setTimeout(function(){rails.enableFormElements(form)},13),aborted}return rails.handleRemote(form),!1}setTimeout(function(){rails.disableFormElements(form)},13)}),$document.on("click.rails",rails.formInputClickSelector,function(event){var button=$(this);if(!rails.allowAction(button))return rails.stopEverything(event);var name=button.attr("name"),data=name?{name:name,value:button.val()}:null,form=button.closest("form");0===form.length&&(form=$("#"+button.attr("form"))),form.data("ujs:submit-button",data),form.data("ujs:formnovalidate-button",button.attr("formnovalidate")),form.data("ujs:submit-button-formaction",button.attr("formaction")),form.data("ujs:submit-button-formmethod",button.attr("formmethod"))}),$document.on("ajax:send.rails",rails.formSubmitSelector,function(event){this===event.target&&rails.disableFormElements($(this))}),$document.on("ajax:complete.rails",rails.formSubmitSelector,function(event){this===event.target&&rails.enableFormElements($(this))}),$(function(){rails.refreshCSRFTokens()}))}(jQuery);