(window.webpackJsonp=window.webpackJsonp||[]).push([["setting-user-save"],{"113d":function(e,t,o){"use strict";o.r(t);var a=o("f7fc");const r=Object(a.createTextVNode)("取 消"),l=Object(a.createTextVNode)("保 存");var s={emits:["success","closed"],data(){return{mode:"add",titleMap:{add:"新增用户",edit:"编辑用户",show:"查看"},visible:!1,isSaveing:!1,form:{id:"",userName:"",avatar:"",name:"",group:""},rules:{avatar:[{required:!0,message:"请上传头像"}],userName:[{required:!0,message:"请输入登录账号"}],name:[{required:!0,message:"请输入真实姓名"}],password:[{required:!0,message:"请输入登录密码"},{validator:(e,t,o)=>{""!==this.form.password2&&this.$refs.dialogForm.validateField("password2"),o()}}],password2:[{required:!0,message:"请再次输入密码"},{validator:(e,t,o)=>{t!==this.form.password?o(new Error("两次输入密码不一致!")):o()}}],group:[{required:!0,message:"请选择所属角色"}]},groups:[],groupsProps:{value:"id",multiple:!0,checkStrictly:!0}}},mounted(){this.getGroup()},methods:{open(e="add"){return this.mode=e,this.visible=!0,this},async getGroup(){var e=await this.$API.system.role.list.get();this.groups=e.data},submit(){this.$refs.dialogForm.validate(async e=>{if(!e)return!1;this.isSaveing=!0;var t=await this.$API.system.post.post(this.form);this.isSaveing=!1,200==t.code?(this.$emit("success",this.form,this.mode),this.visible=!1,this.$message.success("操作成功")):this.$alert(t.message,"提示",{type:"error"})})},setData(e){this.form.id=e.id,this.form.userName=e.userName,this.form.avatar=e.avatar,this.form.name=e.name,this.form.group=e.group}}},d=o("b3f2");const i=o.n(d)()(s,[["render",function(e,t,o,s,d,i){const m=Object(a.resolveComponent)("zy-upload"),c=Object(a.resolveComponent)("el-form-item"),u=Object(a.resolveComponent)("el-input"),p=Object(a.resolveComponent)("el-cascader"),n=Object(a.resolveComponent)("el-form"),b=Object(a.resolveComponent)("el-button"),h=Object(a.resolveComponent)("el-dialog");return Object(a.openBlock)(),Object(a.createBlock)(h,{title:d.titleMap[d.mode],modelValue:d.visible,"onUpdate:modelValue":t[8]||(t[8]=e=>d.visible=e),width:500,"destroy-on-close":"",onClosed:t[9]||(t[9]=t=>e.$emit("closed"))},{footer:Object(a.withCtx)(()=>[Object(a.createVNode)(b,{onClick:t[6]||(t[6]=e=>d.visible=!1)},{default:Object(a.withCtx)(()=>[r]),_:1}),"show"!=d.mode?(Object(a.openBlock)(),Object(a.createBlock)(b,{key:0,type:"primary",loading:d.isSaveing,onClick:t[7]||(t[7]=e=>i.submit())},{default:Object(a.withCtx)(()=>[l]),_:1},8,["loading"])):Object(a.createCommentVNode)("",!0)]),default:Object(a.withCtx)(()=>[Object(a.createVNode)(n,{model:d.form,rules:d.rules,disabled:"show"==d.mode,ref:"dialogForm","label-width":"100px","label-position":"left"},{default:Object(a.withCtx)(()=>[Object(a.createVNode)(c,{label:"头像",prop:"avatar"},{default:Object(a.withCtx)(()=>[Object(a.createVNode)(m,{modelValue:d.form.avatar,"onUpdate:modelValue":t[0]||(t[0]=e=>d.form.avatar=e),title:"上传头像"},null,8,["modelValue"])]),_:1}),Object(a.createVNode)(c,{label:"登录账号",prop:"userName"},{default:Object(a.withCtx)(()=>[Object(a.createVNode)(u,{modelValue:d.form.userName,"onUpdate:modelValue":t[1]||(t[1]=e=>d.form.userName=e),placeholder:"用于登录系统",clearable:""},null,8,["modelValue"])]),_:1}),Object(a.createVNode)(c,{label:"姓名",prop:"name"},{default:Object(a.withCtx)(()=>[Object(a.createVNode)(u,{modelValue:d.form.name,"onUpdate:modelValue":t[2]||(t[2]=e=>d.form.name=e),placeholder:"请输入完整的真实姓名",clearable:""},null,8,["modelValue"])]),_:1}),"add"==d.mode?(Object(a.openBlock)(),Object(a.createElementBlock)(a.Fragment,{key:0},[Object(a.createVNode)(c,{label:"登录密码",prop:"password"},{default:Object(a.withCtx)(()=>[Object(a.createVNode)(u,{type:"password",modelValue:d.form.password,"onUpdate:modelValue":t[3]||(t[3]=e=>d.form.password=e),clearable:"","show-password":""},null,8,["modelValue"])]),_:1}),Object(a.createVNode)(c,{label:"确认密码",prop:"password2"},{default:Object(a.withCtx)(()=>[Object(a.createVNode)(u,{type:"password",modelValue:d.form.password2,"onUpdate:modelValue":t[4]||(t[4]=e=>d.form.password2=e),clearable:"","show-password":""},null,8,["modelValue"])]),_:1})],64)):Object(a.createCommentVNode)("",!0),Object(a.createVNode)(c,{label:"所属角色",prop:"group"},{default:Object(a.withCtx)(()=>[Object(a.createVNode)(p,{modelValue:d.form.group,"onUpdate:modelValue":t[5]||(t[5]=e=>d.form.group=e),options:d.groups,props:d.groupsProps,"show-all-levels":!1,clearable:"",style:{width:"100%"}},null,8,["modelValue","options","props"])]),_:1})]),_:1},8,["model","rules","disabled"])]),_:1},8,["title","modelValue"])}]]);t.default=i}}]);