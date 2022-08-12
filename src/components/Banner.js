import React, { useEffect, useState } from "react";
import axios from '../api/axios';
import requests from "../api/requests";
import './Banner.css';
import styled from 'styled-components';


export default function Banner() {
	const [movie, setMovie] = useState([]);
	const [isClicked, setIsClicked] = useState(false);

	// 페이지가 로드될때 영화 정보를 가지고 있어야 하기 때문에 fetchData 함수를 호출
	useEffect(() => {
		fetchData();
	},[]);

	const fetchData = async () => {
		// 현재 상영중인 영화 정보를 가져오기 (여러영화)
		// await을 하는 이유는 해당 결과를 받기 위해 일정 시간 기다리기 위함
		// await을 하지 않으면, 결과가 pending 상태가 되어버림
		const request = await axios.get(requests.fetchNowPlaying);
		// console.log(request);
		// 여러 영화 중 영화 하나의 ID를 가져오기
		const movieId =
			request.data.results[
				// javascript에서 random하게 숫자를 가져오는 방법
				// Math.floor(Math.random() * max넘버)
				Math.floor(Math.random() * request.data.results.length)
			].id;

		// 특정 영화의 더 상세한 정보를 가져오기 (비디오 정보 포함)
		const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
			params: { append_to_response: 'videos' },
		});
		setMovie(movieDetail);
	}

	// 특정 길이에서 자르기
	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n-1) + "..." : str;
	};

	// console.log('movie', movie);

	if(!isClicked) {
		return (
			<header
				className="banner"
				style={{
					backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
					backgroundPosition: 'top center',
					backgroundSize: 'cover',
				}}
			>
				<div className="banner__contents">
					<h1 className="banner__title">
						{movie.title || movie.name || movie.original_name}
					</h1>
					<div className="banner__buttons">
						<button	className="banner__button play" onClick={() => setIsClicked(true)}>Play</button>
						<button className="banner__button info">
							More Information
						</button>
					</div>

					<h1 className="banner__description">
						{truncate(movie.overview, 100)}
					</h1>
				</div>
				<div className="banner--fadeBottom" />
			</header>
		)
	} else {
		return (
			<Container>
				<HomeContainer>
					<Iframe
						src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
						width="640"
						height="360"
						frameborder="0"
						allow="autoplay; fullscreen"
						allowFullScreen
					></Iframe>
				</HomeContainer>
			</Container>
		)
	}

	
}

const Iframe = styled.iframe`
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: 0.65;
	border: none;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
`;

const HomeContainer = styled.div`
	width: 100%;
	height: 100%;
`;