(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-06217a13"],{"6eb0":function(e,t,s){},9382:function(e,t,s){"use strict";s.r(t);var c=s("f7fc");const o={class:"zy-cropper"},p={class:"zy-cropper__img"},r=["src"],i={class:"zy-cropper__preview"},a=(e=>(Object(c.pushScopeId)("data-v-21d9b2d2"),e=e(),Object(c.popScopeId)(),e))(()=>Object(c.createElementVNode)("h4",null,"图像预览",-1)),n={class:"zy-cropper__preview__img",ref:"preview"};var d=s("5e06"),l=s.n(d),m=(s("4db8"),{props:{src:{type:String,default:""},compress:{type:Number,default:1},aspectRatio:{type:Number,default:NaN}},data:()=>({crop:null}),watch:{aspectRatio(e){this.crop.setAspectRatio(e)}},mounted(){this.init()},methods:{init(){this.crop=new l.a(this.$refs.img,{viewMode:2,dragMode:"move",responsive:!1,aspectRatio:this.aspectRatio,preview:this.$refs.preview})},setAspectRatio(e){this.crop.setAspectRatio(e)},getCropData(e,t="images/jpeg"){e(this.crop.getCroppedCanvas().toDataURL(t,this.compress))},getCropBlob(e,t="images/jpeg"){this.crop.getCroppedCanvas().toBlob(t=>{e(t)},t,this.compress)},getCropFile(e,t="fileName.jpg",s="images/jpeg"){this.crop.getCroppedCanvas().toBlob(c=>{let o=new File([c],t,{type:s});e(o)},s,this.compress)}}}),b=(s("e3f7"),s("b3f2"));const u=s.n(b)()(m,[["render",function(e,t,s,d,l,m){return Object(c.openBlock)(),Object(c.createElementBlock)("div",o,[Object(c.createElementVNode)("div",p,[Object(c.createElementVNode)("img",{src:s.src,ref:"img"},null,8,r)]),Object(c.createElementVNode)("div",i,[a,Object(c.createElementVNode)("div",n,null,512)])])}],["__scopeId","data-v-21d9b2d2"]]);t.default=u},e3f7:function(e,t,s){"use strict";s("6eb0")}}]);