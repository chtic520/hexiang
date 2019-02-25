<template>
  <f7-page>
    <f7-navbar navbar-through title="和享购经理人申请" back-link=" " sliding></f7-navbar>
    <div class="container">
    	<div class="scroll-bg">
	    	<div class="form">
	    		<form-text-input type="textInput" label="手机号码" v-model="formData.mobile" :errMsg="tel.errMsg" :inputParam="tel.inputParam" />

	    		<form-text-input type="addonInput" label="验证码" v-model="formData.smsCode" :errMsg="code.errMsg" :addonText="code.inputParam.addonText" :inputParam="code.inputParam" @onAddon="getCode" />

	    		<form-text-input type="textInput" label="设置密码" v-model="formData.password" :errMsg="password.errMsg" :inputParam="password.inputParam" tipMsg="英文字母或数字，限6-32个字符" />

	    		<form-text-input type="textInput" label="城市" @onClick="openCity(true)" :errMsg="city.errMsg" :inputParam="city.inputParam" :value="city.inputParam.value"/>

	    		<form-text-input type="textInput" label="姓名" v-model="formData.realname" :errMsg="name.errMsg" :inputParam="name.inputParam" />

	    		<form-file-input label="身份证上传" :fileList="fileList"  @upload="uploadLicense"/>
	    		<div class="form-item">
	    			<label for="remarks">备注</label>
	    			<textarea class="form-textarea-control" v-model="formData.remark" id="remarks" rows="3">
	    			</textarea>
	    		</div>
	    		<div class="form-info">
	    			<f7-list class="list-block" no-hairlines>
	    				<f7-list-item checkbox checked>
	    					<div class="item-title">已阅读并同意协议内容
	    						<f7-link @click="openPopup(true)">点击查看协议</f7-link>
	    					</div>
	    				</f7-list-item>
	    			</f7-list>
	    		</div>
	    		<div class="form-button">
	    			<f7-button fill color="orange" @click="onSubmit">提交</f7-button>
	    		</div>
	    	</div>
    	</div>
    </div>
    <f7-popup :opened="popupOpen">
    	<f7-navbar theme="custom" navbar-through title="协议">
    		<f7-nav-left>
			    <f7-link @click="openPopup(false)">关闭</f7-link>
			  </f7-nav-left>
    	</f7-navbar>
    	<f7-block>协议内容</f7-block>
		</f7-popup>
		<f7-popup :opened="popupCity">
    	<f7-navbar theme="custom" navbar-through title="选择城市">
    		<f7-nav-left>
			    <f7-link @click="openCity(false)">关闭</f7-link>
			  </f7-nav-left>
    	</f7-navbar>
    	<f7-searchbar
      placeholder="搜索城市名"
      search-list="#search-list"
    	></f7-searchbar>
    	<f7-list class="searchbar-not-found">
	      <f7-list-item title="没有相应的城市" class="cityList"></f7-list-item>
	    </f7-list>
	    <f7-list contacts id="search-list">
	      <f7-list-group v-for="(group, key) in cityList" :key="key">
	        <f7-list-item :title="key" group-title></f7-list-item>
	        <f7-list-item v-for="city in group" :title="city.name" :key="city.code" @click="selectCity(city)" class="cityList"></f7-list-item>
	      </f7-list-group>
	    </f7-list>
		</f7-popup>
		<f7-popup :opened="popupSuccess">
			<f7-navbar class="successTitle" theme="custom" navbar-through title="和享购经理人申请" />
			<div class="successPage">
				<div class="icon"></div>
				<h3>提交成功</h3>
				<p>感谢你申请成功和享购的【经理人】</p>
				<p>我们工作人员会尽快为您审核，请您耐心等待...</p>
			</div>
		</f7-popup>
  </f7-page>
</template>

<script>
import FormTextInput from './compoments/formTextInput';
import FormFileInput from './compoments/formFileInput';
import { getQueryString } from '@/utils/index.js';
import API from '@/api';
import { fetchPost, fetchGet, fetchFile } from '@/fetch';

export default {
	components: { FormTextInput, FormFileInput },
	data(){
		return {
			cityList: {},
			formData: {
				mobile: '',
				smsCode: '',
				password: '',
				cityCode: '',
				cardUrl: '',
				inviteCode: getQueryString('ref'),
				ref: getQueryString('ref'),
				remark: '',
				realname: ''
			},
			tel: {
				errMsg: "",
				inputParam: {
					id: 'tel',
					type: 'tel'
				},
				status: false
			},
			code: {
				errMsg: "",
				inputParam: {
					id: 'code',
					type: 'text',
					addonStatus: false,
					addonText: '获取验证码'
				},
				timer: null
			},
			password: {
				errMsg: "",
				inputParam: {
					id: 'password',
					type: 'password'
				}
			},
			city: {
				errMsg: "",
				inputParam: {
					id: 'city',
					value: '选择城市',
					type: 'select',
					readonly: true
				}
			},
			name: {
				errMsg: "",
				inputParam: {
					id: 'name',
					type: 'text'
				},
			},
			fileList: [
				{
					id: 'idCardFront'
				},{
					id: 'idCardBack'
				}
			],
			popupOpen: false,
			popupCity: false,
			popupSuccess: false,
			idCardBack: '',
      idCardFront: ''
		}
	},
	mounted(){
		this.getCity();
	},
	methods: {
		checkTel(tel){
			if(tel.length < 11){
				this.tel.errMsg = "请输入正确的手机号码";
				this.tel.status = false;
				return Promise.reject('false');
			}else{
				this.tel.errMsg = "";
				return fetchGet(API.CHECK_MOBILE + this.formData.mobile, {});
			}
		},
		checkCode(){
			let vcode = this.formData.smsCode;
			let mobile = this.formData.mobile;
			if(vcode != '' && mobile != ''){
				let data = {
					vcode,
					mobile
				}
				return fetchPost(API.CHECK_CODE, data)
			}else{
				this.$f7.alert('缺失手机或验证码', 'warning');
				return Promise.reject(false);
			}
		},
		onSubmit(){
			this.checkCode()
				.then(result => {
					let data = result.data;

					if(data.code == 1){
						
						this.formData.cardUrl = [this.idCardFront, this.idCardBack].join(',');

						let flag = true;
						let msg = '';

						for(let key in this.formData){
								switch(key){
									case 'mobile':
										if(this.formData[key] == ''){
											flag = false;
											msg = '请输入正确的手机号码';
										};
										break;
									case 'smsCode':
										if(this.formData[key] == ''){
											flag = false;
											msg = '请输入验证码';
										};
										break;
									case 'password':
										if(this.formData[key] == ''){
											flag = false;
											msg = '请输入密码';
										};
										break;
									case 'cityCode':
										if(this.formData[key] == ''){
											flag = false;
											msg = '请选择城市';
										};
										break;
									case 'cardUrl':
										if(this.idCardFront == '' || this.idCardBack == ''){
											flag = false;
											msg = '请上传法人身份证正背面照';
										};
										break;
									case 'inviteCode':
										if(this.formData[key] == ''){
											flag = false;
											msg = '请输入邀请码';
										};
										break;
									case 'remark':
										if(this.formData[key] == ''){
											flag = false;
											msg = '请输入备注';
										};
										break;
									default:
										if(this.formData[key] == ''){
											flag = false;
											msg = '请选择ref码';
										};
										break;
								}

								if(!flag) break;
						}

						if(!flag){
							this.$f7.alert(msg, '警告');
							return
						}else{

							fetchPost(API.INVITE_MANAGER, this.formData)
								.then(result => {
									let data = result.data;

									if(data.code == 1){
										this.openSuccess(true);
									}else{
										this.$f7.alert('申请遇到问题，请重试', '提示');
									}
								})
						}
					}else{
						this.$f7.alert('验证码不正确或已过期', '提示');
					}
				})
		},
		getCode(status){
			this.checkTel(this.formData.mobile)
				.then(result => {
					let data = result.data;

					if(data.code != 1){
						this.tel.errMsg = data.message;
						this.tel.status = false;
					}else{
						this.tel.status = true;
						if(!status){
							this._getCode(this.formData.mobile);
						}
					}
				})
				.catch(err => {
					console.log('==getCode catch==', err);
				})
		},
		_getCode(tel){
			fetchGet(API.GET_CODE + tel, {});

			this.code.inputParam.addonStatus = true;
			this.code.inputParam.addonText = '60秒后重新获取';

			let s = 60;

			this.code.timer = setInterval(() => {
				--s;
				this.code.inputParam.addonText = s + '秒后重新获取';

				if(s == -1){
					this.code.inputParam.addonStatus = false;
					this.code.inputParam.addonText = '获取验证码';

					clearInterval(this.code.timer);
				}
			}, 1000)
		},
		openPopup(flag){
			this.popupOpen = flag;
		},
		openSuccess(flag){
			this.popupSuccess = flag;
		},
		openCity(flag){
			this.popupCity = flag;
		},
		getCity(){
			fetchGet(API.GET_CITY)
				.then(result => {
					let cityList = result.data;
					this.cityList = cityList;
				})
				.catch(err => {
					console.log(err);
				});
		},
		selectCity(city){
			this.popupCity = false;

			this.city.inputParam.value = city.name;
			this.formData.cityCode = city.code;
		},
		uploadLicense(image, id){
			let formData = new FormData();
			formData.append('file', image);

			fetchFile(API.UPLOAD_FILE, formData)
				.then(result => {
					switch (id){
						case 'idCardFront':
							this.idCardFront = result.data;
							break;
						case 'idCardBack':
							this.idCardBack = result.data;
							break;
					}
				})
				.catch(err => {
					this.$f7.alert('图片上传失败，请重试', '提示');
					console.log(err);
				})
		},
	}
}
</script>

<style lang="less">
.container{
	height: 100%;
  background-color: #fff;
}
.list-block{
	margin: 0;
	font-size: 1rem;

  .item-content{
  	min-height: auto;
  }

  .item-media,
  .item-inner{
  	padding-top: 0;
  	padding-bottom: 0;
  	min-height: auto;
  }
  .item-inner{

  }
}
label.label-checkbox input[type=checkbox]:checked+.item-media i.icon-form-checkbox{
	background-color: #ff9122;
}
</style>
