!function(){function Retina(){}function RetinaImagePath(path,at_2x_path){this.path=path,this.perform_check=null!=at_2x_path?(this.at_2x_path=at_2x_path,!1):(this.at_2x_path=path.replace(/\.\w+$/,function(match){return"@2x"+match}),!0)}function RetinaImage(el){this.el=el,this.path=new RetinaImagePath(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var that=this;this.path.check_2x_variant(function(hasVariant){hasVariant&&that.swap()})}var root="undefined"==typeof exports?window:exports,config={check_mime_type:!0};(root.Retina=Retina).configure=function(options){for(var prop in null==options&&(options={}),options)config[prop]=options[prop]},Retina.init=function(context){null==context&&(context=root);var existing_onload=context.onload||new Function;context.onload=function(){var i,image,images=document.getElementsByTagName("img"),retinaImages=[];for(i=0;i<images.length;i++)image=images[i],retinaImages.push(new RetinaImage(image));existing_onload()}},Retina.isRetina=function(){var mediaQuery="(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";return 1<root.devicePixelRatio||!(!root.matchMedia||!root.matchMedia(mediaQuery).matches)},(root.RetinaImagePath=RetinaImagePath).confirmed_paths=[],RetinaImagePath.prototype.is_external=function(){return!(!this.path.match(/^https?\:/i)||this.path.match("//"+document.domain))},RetinaImagePath.prototype.check_2x_variant=function(callback){var http,that=this;return this.is_external()?callback(!1):this.perform_check||"undefined"==typeof this.at_2x_path||null===this.at_2x_path?this.at_2x_path in RetinaImagePath.confirmed_paths?callback(!0):((http=new XMLHttpRequest).open("HEAD",this.at_2x_path),http.onreadystatechange=function(){if(4!=http.readyState)return callback(!1);if(200<=http.status&&http.status<=399){if(config.check_mime_type){var type=http.getResponseHeader("Content-Type");if(null==type||!type.match(/^image/i))return callback(!1)}return RetinaImagePath.confirmed_paths.push(that.at_2x_path),callback(!0)}return callback(!1)},void http.send()):callback(!0)},(root.RetinaImage=RetinaImage).prototype.swap=function(path){function load(){that.el.complete?(that.el.setAttribute("width",that.el.offsetWidth),that.el.setAttribute("height",that.el.offsetHeight),that.el.setAttribute("src",path)):setTimeout(load,5)}void 0===path&&(path=this.path.at_2x_path);var that=this;load()},Retina.isRetina()&&Retina.init(root)}();