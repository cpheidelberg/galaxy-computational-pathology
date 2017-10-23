define(["exports","layout/generic-nav-view","mvc/webhooks","utils/localization","utils/utils"],function(t,e,l,i,a){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var s=o(e),r=o(l),d=o(i),n=o(a),u=Backbone.Collection.extend({model:Backbone.Model.extend({defaults:{visible:!0,target:"_parent"}}),fetch:function(t){t=t||{},this.reset();var e=new s.default.GenericNavView;this.add(e.render()),this.add({id:"analysis",title:(0,d.default)("Analyze Data"),url:"",tooltip:(0,d.default)("Analysis home view")}),this.add({id:"workflow",title:(0,d.default)("Workflow"),tooltip:(0,d.default)("Chain tools into workflows"),disabled:!Galaxy.user.id,url:"workflow"}),this.add({id:"shared",title:(0,d.default)("Shared Data"),url:"library/index",tooltip:(0,d.default)("Access published resources"),menu:[{title:(0,d.default)("Data Libraries"),url:"library/list"},{title:(0,d.default)("Histories"),url:"histories/list_published"},{title:(0,d.default)("Workflows"),url:"workflows/list_published"},{title:(0,d.default)("Visualizations"),url:"visualizations/list_published"},{title:(0,d.default)("Pages"),url:"pages/list_published"}]}),t.user_requests&&this.add({id:"lab",title:"Lab",menu:[{title:"Sequencing Requests",url:"requests/index"},{title:"Find Samples",url:"requests/find_samples_index"},{title:"Help",url:t.lims_doc_url}]}),this.add({id:"visualization",title:(0,d.default)("Visualization"),url:"visualizations/list",tooltip:(0,d.default)("Visualize datasets"),disabled:!Galaxy.user.id,menu:[{title:(0,d.default)("New Track Browser"),url:"visualization/trackster",target:"_frame"},{title:(0,d.default)("Saved Visualizations"),url:"visualizations/list",target:"_frame"},{title:(0,d.default)("Interactive Environments"),url:"visualization/gie_list",target:"galaxy_main"}]}),r.default.add({url:"api/webhooks/masthead/all",callback:function(t){$(document).ready(function(){$.each(t.models,function(t,e){var l=e.toJSON();if(l.activate){var i={id:l.name,icon:l.config.icon,url:l.config.url,tooltip:l.config.tooltip,onclick:l.config.function&&new Function(l.config.function)};Galaxy.page?Galaxy.page.masthead.collection.add(i):Galaxy.masthead&&Galaxy.masthead.collection.add(i),n.default.appendScriptStyle(l)}})})}}),Galaxy.user.get("is_admin")&&this.add({id:"admin",title:(0,d.default)("Admin"),url:"admin",tooltip:(0,d.default)("Administer this Galaxy"),cls:"admin-only"});var l={id:"help",title:(0,d.default)("Help"),tooltip:(0,d.default)("Support, contact, and community"),menu:[{title:(0,d.default)("Support"),url:t.support_url,target:"_blank"},{title:(0,d.default)("Search"),url:t.search_url,target:"_blank"},{title:(0,d.default)("Mailing Lists"),url:t.mailing_lists,target:"_blank"},{title:(0,d.default)("Videos"),url:t.screencasts_url,target:"_blank"},{title:(0,d.default)("Wiki"),url:t.wiki_url,target:"_blank"},{title:(0,d.default)("How to Cite Galaxy"),url:t.citation_url,target:"_blank"},{title:(0,d.default)("Interactive Tours"),url:"tours"}]};t.terms_url&&l.menu.push({title:(0,d.default)("Terms and Conditions"),url:t.terms_url,target:"_blank"}),t.biostar_url&&l.menu.unshift({title:(0,d.default)("Ask a question"),url:"biostar/biostar_question_redirect",target:"_blank"}),t.biostar_url&&l.menu.unshift({title:(0,d.default)("Galaxy Biostar"),url:t.biostar_url_redirect,target:"_blank"}),this.add(l);var i={};i=Galaxy.user.id?{id:"user",title:(0,d.default)("User"),cls:"loggedin-only",tooltip:(0,d.default)("Account and saved data"),menu:[{title:(0,d.default)("Logged in as")+" "+Galaxy.user.get("email")},{title:(0,d.default)("Preferences"),url:"user"},{title:(0,d.default)("Custom Builds"),url:"custom_builds"},{title:(0,d.default)("Logout"),url:"user/logout?session_csrf_token="+Galaxy.session_csrf_token,target:"_top",divider:!0},{title:(0,d.default)("Saved Histories"),url:"histories/list",target:"_top"},{title:(0,d.default)("Saved Datasets"),url:"datasets/list",target:"_top"},{title:(0,d.default)("Saved Pages"),url:"pages/list",target:"_top"}]}:t.allow_user_creation?{id:"user",title:(0,d.default)("Login or Register"),cls:"loggedout-only",tooltip:(0,d.default)("Account registration or login"),menu:[{title:(0,d.default)("Login"),url:"user/login",target:"galaxy_main",noscratchbook:!0},{title:(0,d.default)("Register"),url:"user/create",target:"galaxy_main",noscratchbook:!0}]}:{id:"user",title:(0,d.default)("Login"),cls:"loggedout-only",tooltip:(0,d.default)("Login"),url:"user/login",target:"galaxy_main",noscratchbook:!0},this.add(i);var a=this.get(t.active_view);return a&&a.set("active",!0),(new jQuery.Deferred).resolve().promise()}}),c=Backbone.View.extend({initialize:function(t){this.model=t.model,this.setElement(this._template()),this.$dropdown=this.$(".dropdown"),this.$toggle=this.$(".dropdown-toggle"),this.$menu=this.$(".dropdown-menu"),this.$note=this.$(".dropdown-note"),this.listenTo(this.model,"change",this.render,this)},events:{"click .dropdown-toggle":"_toggleClick"},render:function(){var t=this;return $(".tooltip").remove(),this.$el.attr("id",this.model.id).css({visibility:this.model.get("visible")&&"visible"||"hidden"}),this.model.set("url",this._formatUrl(this.model.get("url"))),this.$note.html(this.model.get("note")||"").removeClass().addClass("dropdown-note").addClass(this.model.get("note_cls")).css({display:this.model.get("show_note")&&"block"||"none"}),this.$toggle.html(this.model.get("title")||"").removeClass().addClass("dropdown-toggle").addClass(this.model.get("cls")).addClass(this.model.get("icon")&&"dropdown-icon fa "+this.model.get("icon")).addClass(this.model.get("toggle")&&"toggle").attr("target",this.model.get("target")).attr("href",this.model.get("url")).attr("title",this.model.get("tooltip")).tooltip("destroy"),this.model.get("tooltip")&&this.$toggle.tooltip({placement:"bottom"}),this.$dropdown.removeClass().addClass("dropdown").addClass(this.model.get("disabled")&&"disabled").addClass(this.model.get("active")&&"active"),this.model.get("menu")&&this.model.get("show_menu")?(this.$menu.show(),$("#dd-helper").show().off().on("click",function(){$("#dd-helper").hide(),t.model.set("show_menu",!1)})):(t.$menu.hide(),$("#dd-helper").hide()),this.$menu.empty().removeClass("dropdown-menu"),this.model.get("menu")&&(_.each(this.model.get("menu"),function(e){t.$menu.append(t._buildMenuItem(e)),e.divider&&t.$menu.append($("<li/>").addClass("divider"))}),t.$menu.addClass("dropdown-menu"),t.$toggle.append($("<b/>").addClass("caret"))),this},_buildMenuItem:function(t){var e=this;return t=_.defaults(t||{},{title:"",url:"",target:"_parent",noscratchbook:!1}),t.url=e._formatUrl(t.url),$("<li/>").append($("<a/>").attr("href",t.url).attr("target",t.target).html(t.title).on("click",function(l){l.preventDefault(),e.model.set("show_menu",!1),t.onclick?t.onclick():Galaxy.frame.add(t)}))},_toggleClick:function(t){var e=this,l=this.model;if(t.preventDefault(),$(".tooltip").hide(),l.trigger("dispatch",function(t){l.id!==t.id&&t.get("menu")&&t.set("show_menu",!1)}),l.get("disabled")){var i=function(t,e){return $("<div/>").append($("<a/>").attr("href",Galaxy.root+e).html(t)).html()};this.$toggle.popover&&this.$toggle.popover("destroy"),this.$toggle.popover({html:!0,placement:"bottom",content:"Please "+i("login","user/login?use_panels=True")+" or "+i("register","user/create?use_panels=True")+" to use this feature."}).popover("show"),setTimeout(function(){e.$toggle.popover("destroy")},5e3)}else l.get("menu")?l.set("show_menu",!0):l.get("onclick")?l.get("onclick")():Galaxy.frame.add(l.attributes)},_formatUrl:function(t){return"string"==typeof t&&-1===t.indexOf("//")&&"/"!=t.charAt(0)?Galaxy.root+t:t},_template:function(){return'<ul class="nav navbar-nav"><li class="dropdown"><a class="dropdown-toggle"/><ul class="dropdown-menu"/><div class="dropdown-note"/></li></ul>'}});t.default={Collection:u,Tab:c}});
//# sourceMappingURL=../../maps/layout/menu.js.map
