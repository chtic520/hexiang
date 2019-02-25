<template>
	<div class="form-item">
		<template v-if="type == 'checkboxItem' || type == 'radioItem'">
			<label style="margin-right: 5px;">{{label}}</label>
			<f7-input type="switch" @change="onChange($event.target.checked)"></f7-input>
		</template>
		<template v-else>
			<label :for="inputParam.id">{{label}}</label>
			<template v-if="type == 'textInput'">
				<div class="form-control">
					<input 
					:type="inputParam.type == 'text' || inputParam.type == 'tel' ? 'text' : inputParam.type" 
					:pattern="inputParam.type == 'tel' ? '[0-9]*' : ''" 
					:id="inputParam.id" 
					:value="value" 
					:disabled="inputParam.disabled"
					:readonly="inputParam.readonly"
					@input="onBind($event.target.value)"
    				@blur="onBlur($event.target.value)"
    				@click="onClick($event)">
					<span class="error-msg">{{errMsg}}</span>
				</div>
			</template>
			<template v-else-if="type == 'addonInput'">
				<div class="input-group">
  				<div class="input-group-control">
  					<div class="form-control">
	    				<input 
	    				:type="inputParam.type == 'text' || inputParam.type == 'tel' ? 'text' : inputParam.type"  
	    				:id="inputParam.id"
	    				:value="value"
	    				:disabled="inputParam.disabled"
						:readonly="inputParam.readonly"
	    				@input="onBind($event.target.value)"
	    				@blur="onBlur($event.target.value)"
	    				@click="onClick($event)">
	    				<span class="error-msg">{{errMsg}}</span>
	    			</div>
  				</div>
    			<span class="input-group-addon">
    				<f7-button round color="orange"
    					:icon-f7="addonIcon"
    					:disabled="inputParam.addonStatus"
    					@click="onAddon">{{addonText}}</f7-button>
    			</span>
  			</div>
			</template>
			<template v-else-if="type == 'selectInput'">
				<div class="form-control">
					<select :id="inputParam.id" @change="onChange($event.target.value)">
						<option v-for="option in inputParam.selectList" :key="option.value" :value="option.value">{{option.label}}</option>
					</select>
				</div>
			</template>
			<span class="tipMsg" v-if="tipMsg">{{tipMsg}}</span>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		type: String,
		label: String,
		errMsg: String,
		addonText: String,
		addonIcon: String,
		tipMsg: String,
		inputParam: Object,
		value: String
	},
	data(){
		return {}
	},
	methods: {
		onBind(value){
			this.$emit('input', value);
		},
		onBlur(value){
			this.$emit('onBlur', value);
		},
		onClick($event){
			this.$emit('onClick', $event);
		},
		onChange(value){
			this.$emit('change', value);
		},
		onAddon(){
			this.$emit('onAddon', this.inputParam.addonStatus);
		}
	}
}
</script>

<style lang="less">
.tipMsg{
	color: #bbb;
}
</style>