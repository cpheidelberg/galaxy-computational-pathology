define(["exports","jquery","libs/underscore","libs/backbone"],function(e,t,i,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(t),d=a(i),l=a(n),h=160,o=800,r=l.default.View.extend({initialize:function(e){this.view=e.view,this.hidden=!1,this.saved_size=null,this.hiddenByTool=!1},$center:function(){return this.$el.siblings("#center")},$toggleButton:function(){return this.$(".unified-panel-footer > .panel-collapse")},render:function(){var e=this,t=this.view,i=this.view.model.attributes||{};this.$el.html(this._templatePanel(this.id)),d.default.each(i.buttons,function(t){e.$(".panel-header-buttons").append(t.$el)}),this.$el.addClass(i.cls),this.$(".panel-header-text").html(d.default.escape(i.title)),this.$(".unified-panel-body").append(t.$el),t.render()},_templatePanel:function(){return[this._templateHeader(),this._templateBody(),this._templateFooter()].join("")},_templateHeader:function(e){return['<div class="unified-panel-header" unselectable="on">','<div class="unified-panel-header-inner">','<div class="panel-header-buttons" style="float: right"/>','<div class="panel-header-text"/>',"</div>","</div>"].join("")},_templateBody:function(e){return'<div class="unified-panel-body"/>'},_templateFooter:function(e){return['<div class="unified-panel-footer">','<div class="panel-collapse ',d.default.escape(this.id),'"/>','<div class="drag"/>',"</div>"].join("")},events:{"mousedown .unified-panel-footer > .drag":"_mousedownDragHandler","click .unified-panel-footer > .panel-collapse":"toggle"},_mousedownDragHandler:function(e){function t(e){var t=e.pageX-a;a=e.pageX;var s=i.$el.width(),d=n?s+t:s-t;d=Math.min(o,Math.max(h,d)),i.resize(d)}var i=this,n="left"===this.id,a=e.pageX;(0,s.default)("#dd-helper").show().on("mousemove",t).one("mouseup",function(e){(0,s.default)(this).hide().off("mousemove",t)})},resize:function(e){return this.$el.css("width",e),this.$center().css(this.id,e),this},show:function(){if(this.hidden){var e=this,t={},i=this.id;return t[i]=0,e.$el.css(i,-this.saved_size).show().animate(t,"fast",function(){e.resize(e.saved_size)}),e.hidden=!1,e.$toggleButton().removeClass("hidden"),this}},hide:function(){if(!this.hidden){var e={},t=this.id;return this.saved_size=this.$el.width(),e[t]=-this.saved_size,this.$el.animate(e,"fast"),this.$center().css(t,0),this.hidden=!0,this.$toggleButton().addClass("hidden"),this}},toggle:function(e){return this.hidden?this.show():this.hide(),this.hiddenByTool=!1,this},handle_minwidth_hint:function(e){return this.$center().width()-(this.hidden?this.saved_size:0)<e?this.hidden||(this.toggle(),this.hiddenByTool=!0):this.hiddenByTool&&(this.toggle(),this.hiddenByTool=!1),self},force_panel:function(e){return"show"==e?this.show():"hide"==e?this.hide():self},toString:function(){return"SidePanel("+this.id+")"}}),u=r.extend({id:"left"}),f=r.extend({id:"right"}),c=l.default.View.extend({initialize:function(e){this.setElement((0,s.default)(this.template())),this.$frame=this.$(".center-frame"),this.$panel=this.$(".center-panel"),this.$frame.on("load",d.default.bind(this._iframeChangeHandler,this))},_iframeChangeHandler:function(e){var t=e.currentTarget,i=t.contentWindow&&t.contentWindow.location;i&&i.host&&((0,s.default)(t).show(),this.$panel.empty().hide(),Galaxy.trigger("center-frame:load",{fullpath:i.pathname+i.search+i.hash,pathname:i.pathname,search:i.search,hash:i.hash}))},display:function(e){var t=this.$frame[0].contentWindow||{},i=t.onbeforeunload&&t.onbeforeunload();i&&!confirm(i)||(t.onbeforeunload=void 0,this.$frame.attr("src","about:blank").hide(),this.$panel.empty().scrollTop(0).append(e.$el).show(),Galaxy.trigger("center-panel:load",e))},template:function(){return'<div class="center-container"><iframe id="galaxy_main" name="galaxy_main" frameborder="0" class="center-frame" /><div class="center-panel" /></div>'},toString:function(){return"CenterPanel"}});e.default={SidePanel:r,LeftPanel:u,RightPanel:f,CenterPanel:c}});
//# sourceMappingURL=../../maps/layout/panel.js.map
