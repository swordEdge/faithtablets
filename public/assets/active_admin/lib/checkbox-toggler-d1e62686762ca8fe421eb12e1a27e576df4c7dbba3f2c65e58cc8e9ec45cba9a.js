(function(){ActiveAdmin.CheckboxToggler=function(){function CheckboxToggler(options,container){var defaults;this.options=options,this.container=container,defaults={},this.options=$.extend(defaults,this.options),this._init(),this._bind()}return CheckboxToggler.prototype._init=function(){if(!this.container)throw new Error("Container element not found");if(this.$container=$(this.container),!this.$container.find(".toggle_all").length)throw new Error('"toggle all" checkbox not found');return this.toggle_all_checkbox=this.$container.find(".toggle_all"),this.checkboxes=this.$container.find(":checkbox").not(this.toggle_all_checkbox)},CheckboxToggler.prototype._bind=function(){var _this;return this.checkboxes.change((_this=this,function(e){return _this._didChangeCheckbox(e.target)})),this.toggle_all_checkbox.change(function(_this){return function(){return _this._didChangeToggleAllCheckbox()}}(this))},CheckboxToggler.prototype._didChangeCheckbox=function(){var allChecked,numChecked,someChecked;return allChecked=(numChecked=this.checkboxes.filter(":checked").length)===this.checkboxes.length,someChecked=0<numChecked&&numChecked<this.checkboxes.length,this.toggle_all_checkbox.prop({checked:allChecked,indeterminate:someChecked})},CheckboxToggler.prototype._didChangeToggleAllCheckbox=function(){var setting;return setting=this.toggle_all_checkbox.prop("checked"),this.checkboxes.prop({checked:setting}),setting},CheckboxToggler.prototype.option=function(key,value){return $.isPlainObject(key)?this.options=$.extend(!0,this.options,key):null!=key?this.options[key]:this.options[key]=value},CheckboxToggler}(),$.widget.bridge("checkboxToggler",ActiveAdmin.CheckboxToggler)}).call(this);