import fetch from './fetch';
import qs from 'qs';

export function fetchPost(url, data={}){
	return fetch({
		method: 'post',
		url,
		data: qs.stringify(data)
	})
}

export function fetchGet(url, data={}){
	return fetch({
		method: 'get',
		url,
		data
	})
}

export function fetchFile(url, data){
	return fetch({
		method: 'post',
		url,
		data
	})
}