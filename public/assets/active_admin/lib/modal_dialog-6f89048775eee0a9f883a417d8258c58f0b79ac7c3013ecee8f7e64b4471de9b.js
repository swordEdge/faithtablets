(function(){ActiveAdmin.modal_dialog=function(message,inputs,callback){var $elem,elem,form,html,klass,name,opts,ref,ref1,type,v,wrapper;for(name in html='<form id="dialog_confirm" title="'+message+'"><ul>',inputs){if(type=inputs[name],/^(datepicker|checkbox|text|number)$/.test(type))wrapper="input";else if("textarea"===type)wrapper="textarea";else{if(!$.isArray(type))throw new Error("Unsupported input type: {"+name+": "+type+"}");wrapper=(ref=["select","option",type,""])[0],elem=ref[1],opts=ref[2],type=ref[3]}klass="datepicker"===type?type:"",html+="<li>\n<label>"+(name.charAt(0).toUpperCase()+name.slice(1))+"</label>\n<"+wrapper+' name="'+name+'" class="'+klass+'" type="'+type+'">'+(opts?function(){var i,len,results;for(results=[],i=0,len=opts.length;i<len;i++)v=opts[i],$elem=$("<"+elem+"/>"),$.isArray(v)?$elem.text(v[0]).val(v[1]):$elem.text(v),results.push($elem.wrap("<div>").parent().html());return results}().join(""):"")+"</"+wrapper+"></li>",wrapper=(ref1=[])[0],elem=ref1[1],opts=ref1[2],type=ref1[3],klass=ref1[4]}return html+="</ul></form>",form=$(html).appendTo("body"),$("body").trigger("modal_dialog:before_open",[form]),form.dialog({modal:!0,open:function(){return $("body").trigger("modal_dialog:after_open",[form])},dialogClass:"active_admin_dialog",buttons:{OK:function(){return callback($(this).serializeObject()),$(this).dialog("close")},Cancel:function(){return $(this).dialog("close").remove()}}})}}).call(this);