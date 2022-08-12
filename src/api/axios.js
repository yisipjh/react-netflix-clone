import axios from 'axios';

const instance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: "1fc9ea9cfb941698189954be05805e67",
		language: "ko-KR",
	},
});

export default instance;