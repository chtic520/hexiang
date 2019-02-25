import axios from 'axios';

const service = axios.create({
	// baseURL: 'http://api.hiera.cn:8090',
	baseURL: 'http://api.hiera.cn:8090',
	timeout: 30000
});

// service.interceptors.request.use(config => {
// 	// config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 	config.headers['Access-Control-Allow-Origin'] = '*';
// 	return config;
// }, error => {
// 	console.log(error);
// 	return Promise.reject(error);
// })

export default service