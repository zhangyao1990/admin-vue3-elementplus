<template>
	<div class="zy-upload" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)" :style="style">
		<div v-if="tempImg || img" class="zy-upload-file">
			<div class="mask">
				<span class="del" @click.stop="del"><i class="el-icon-delete"></i></span>
			</div>
			<el-image v-if="fileIsImg" class="image" :src="tempImg || img" :preview-src-list="[img]" fit="cover" hide-on-click-modal append-to-body :z-index="9999"></el-image>
			<a v-else :href="img" class="file" target="_blank"><i class="el-icon-document"></i></a>
		</div>
		<div v-else class="zy-upload-uploader" @click="fileSelect && showfileSelect()">
			<el-upload ref="upload" class="uploader" :disabled="fileSelect" :auto-upload="!cropper" :on-change="change" :accept="accept" :action="action" :show-file-list="false" :before-upload="before" :on-success="success" :on-error="error" :http-request="request">
				<slot>
					<div class="file-empty">
						<i :class="icon"></i>
						<h4 v-if="title">{{title}}</h4>
					</div>
				</slot>
			</el-upload>
		</div>
		<el-dialog title="剪裁" v-model="cropperDialogVisible" :width="580" destroy-on-close>
<!--			<zy-cropper :src="cropperImg" :compress="compress" :aspectRatio="aspectRatio" ref="cropper"></zy-cropper>-->
			<template #footer>
				<el-button @click="cropperDialogVisible=false" >取 消</el-button>
				<el-button type="primary" @click="cropperSave">确 定</el-button>
			</template>
		</el-dialog>
		<el-dialog title="打开" v-model="fileSelectDialogVisible" :width="880" destroy-on-close>
			<zy-file-select @submit="fileSelectSubmit">
				<template #do>
					<el-button @click="fileSelectDialogVisible=false" >取 消</el-button>
				</template>
			</zy-file-select>
		</el-dialog>
		<el-input v-model="img" style="display:none"></el-input>
	</div>
</template>

<script>
	import { defineAsyncComponent } from 'vue'
	import config from "@/config/upload"
	const scCropper = defineAsyncComponent(() => import('@/components/zyCropper'))
	const zyFileSelect = defineAsyncComponent(() => import('@/components/zyFileSelect'))

	export default {
		props: {
			height: {type: Number, default: 120},
			width: {type: Number, default: 120},
			modelValue: { type: String, default: "" },
			action: { type: String, default: "" },
			apiObj: { type: Object, default: () => {} },
			accept: { type: String, default: "images/gif, images/jpeg, images/png" },
			maxSize: { type: Number, default: config.maxSize },
			title: { type: String, default: "" },
			icon: { type: String, default: "el-icon-plus" },
			fileSelect: { type: Boolean, default: false },
			cropper: { type: Boolean, default: false },
			compress: {type: Number, default: 1},
			aspectRatio:  {type: Number, default: NaN},
			onSuccess: { type: Function, default: () => { return true } }
		},
		components: {
			scCropper,
			zyFileSelect
		},
		data() {
			return {
				loading: false,
				fileIsImg: true,
				img: "",
				tempImg: "",
				style: {
					width: this.width + "px",
					height: this.height + "px"
				},
				cropperDialogVisible: false,
				cropperImg: "",
				cropperUploadFile: null,
				fileSelectDialogVisible: false,
			}
		},
		watch:{
			modelValue(){
				this.isImg(this.modelValue)
				this.img = this.modelValue;
			},
			img(){
				this.$emit('update:modelValue', this.img);
			}
		},
		mounted() {
			this.isImg(this.modelValue)
			this.img = this.modelValue;
		},
		methods: {
			showfileSelect(){
				this.fileSelectDialogVisible = true
			},
			fileSelectSubmit(val){
				this.img = val
				this.fileSelectDialogVisible = false
			},
			cropperSave(){
				var uploadFile = this.$refs.upload.uploadFiles[0].raw
				this.$refs.cropper.getCropFile(file => {
					this.cropperUploadFile = file
					this.$refs.upload.submit()
				}, uploadFile.name, uploadFile.type)
				this.cropperDialogVisible = false
			},
			isImg(fileUrl){
				var strRegex = "(.jpg|.png|.gif|.jpeg)$";
				var re = new RegExp(strRegex);
				if (re.test(fileUrl.toLowerCase())){
					this.fileIsImg=true;
				}else{
					this.fileIsImg=false;
				}
			},
			change(file){
				if(this.cropper && file.status=='ready'){
					this.isImg(file.name)
					if(!this.fileIsImg){
						this.$notify.warning({
							title: '上传文件警告',
							message: '选择的文件非图像类文件'
						})
						return false
					}
					this.cropperDialogVisible = true
					this.cropperImg = URL.createObjectURL(file.raw)
				}
			},
			before(file){
				file = this.cropper ? this.cropperUploadFile : file
				const maxSize = file.size / 1024 / 1024 < this.maxSize;
				if (!maxSize) {
					this.$message.warning(`上传文件大小不能超过 ${this.maxSize}MB!`);
					return false;
				}
				this.isImg(file.name)
				this.tempImg = URL.createObjectURL(file);
				this.loading = true;
			},
			success(res){
				this.loading = false;
				this.tempImg = "";
				var os = this.onSuccess(res);
				if(os!=undefined && os==false){
					return false;
				}
				var response = config.parseData(res);
				if(response.code != config.successCode){
					this.$message.warning(response.msg || "上传文件未知错误")
				}else{
					this.img = response.src;
				}
			},
			error(err){
				this.$notify.error({
					title: '上传文件错误',
					message: err
				})
				this.loading = false;
				this.tempImg = "";
				this.img = ""
			},
			del(){
				this.img = ""
			},
			request(param){
				var apiObj = config.apiObj;
				if(this.apiObj){
					apiObj = this.apiObj;
				}
				const data = new FormData();
				var file = this.cropper ? this.cropperUploadFile : param.file
				data.append("file", file);
				apiObj.post(data).then(res => {
					param.onSuccess(res)
				}).catch(err => {
					param.onError(err)
				})
			}
		}
	}
</script>

<style>
	.zy-upload+.zy-upload {margin-left: 10px;}
</style>

<style scoped>
	.el-form-item.is-error .zy-upload-uploader {border: 1px dashed #F56C6C;}

	.zy-upload {width: 120px;height: 120px;display: inline-block;vertical-align: top;box-sizing: border-box;}

	.zy-upload-file {position: relative;width: 100%;height: 100%;}
	.zy-upload-file .mask {display: none;position: absolute;top:0px;right:0px;line-height: 1;z-index: 1;}
	.zy-upload-file .mask span {display: inline-block;width: 25px;height:25px;line-height: 23px;text-align: center;cursor: pointer;color: #fff;}
	.zy-upload-file .mask span i {font-size: 12px;}
	.zy-upload-file .mask .del {background: #F56C6C;}
	.zy-upload-file .image {width: 100%;height: 100%;}
	.zy-upload-file .image img {vertical-align: bottom;}
	.zy-upload-file .file {width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;border: 1px solid #DCDFE6;}
	.zy-upload-file .file i {font-size: 30px;color: #409EFF;}
	.zy-upload-file:hover .mask {display: inline-block;}

	.zy-upload-uploader {border: 1px dashed #d9d9d9;box-sizing: border-box;width: 100%;height: 100%;}
	.zy-upload-uploader:hover {border: 1px dashed #409eff;}
	.zy-upload-uploader .uploader {width: 100%;height: 100%;}
	.zy-upload-uploader:deep(.el-upload) {width: 100%;height: 100%;}

	.zy-upload-uploader .file-empty {width: 100%;height: 100%;line-height: 1;display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.zy-upload-uploader .file-empty i {font-size: 28px;color: #8c939d;}
	.zy-upload-uploader .file-empty h4 {font-size: 12px;font-weight: normal;color: #8c939d;margin-top: 10px;}
</style>
