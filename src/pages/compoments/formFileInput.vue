<template>
	<div class="form-item">
		<label>{{label}}</label>
		<div class="form-file-control">
			<label class="file-item" v-for="file in fileList" 
				:key="file.id"
				:ref="file.id + 'Label'">
				<input type="file" accept="image/*" :ref="file.id" @change="onSelect(file.id, $event.target)">
			</label>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		label: String,
		accept: String,
		fileList: Array
	},
	methods: {
		onSelect(id, target){
			this.$emit('upload', target.files[0], id);

			if(typeof FileReader==='undefined'){
                alert('您的设备不支持图片上传，请更换您的设备');
                return false;
            }

			let reader = new FileReader();

			reader.onload = e => {
				this.$refs[id + 'Label'][0].style.backgroundImage = "url("+e.target.result+")";
				this.$refs[id + 'Label'][0].className += " has-file";
				
			}
			reader.readAsDataURL(target.files[0]);
		}
	}
}
</script>