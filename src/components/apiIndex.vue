<template>
	<div id="search">
		<div class="inputdiv">
			<div class="form-control">
				<input
					class="input input-alt"
					placeholder="Search for trending reviews"
					required=""
					type="text"
				/>
				<span class="input-border input-border-alt"></span>
			</div>
		</div>

		<div
			style="
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 76%;
			"
		>
			<div
				style="
					flex-direction: column;
					width: 80%;
					height: 90%;
					background-color: white;
					border-radius: 10px;
					padding: 10px;
					border-radius: 2em;
				"
			>
				<div
					style="
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
					"
				>
					<h2 style="color: rgb(249 73 73)">网易云音乐热评墙</h2>
				</div>

				<div
					style="width: 100%; height: 80%; overflow: hidden; padding-top: 2px"
				>
					<div class="card">
						<div class="header">
							<div class="top">
								<div class="circle">
									<span class="red circle2"></span>
								</div>
								<div class="circle">
									<span class="yellow circle2"></span>
								</div>
								<div
									class="circle"
									@click="fetchData()"
								>
									<span
										class="green circle2"
										style="
											width: 27px;
											color: white;
											font-size: 10px;
											display: flex;
											justify-content: center;
											align-content: center;
											text-align: center;
										"
										>刷新</span
									>
								</div>
								<div
									class="title"
									style="
										display: flex;
										justify-content: center;
										width: 100%;
										margin-right: 86px;
									"
								>
									<p id="title2">{{ wyydata.name }}</p>
								</div>
							</div>
						</div>
						<div class="code-container">
							<div
								id="code"
								class="area"
							>
								<div style="display: flex; justify-content: center">
									<input
										type="checkbox"
										id="checkboxInput"
									/>
									<label
										for="checkboxInput"
										class="toggleSwitch"
										:style="{ backgroundImage: 'url(' + wyydata.picUrl + ')' }"
									>
										<div class="speaker">
											<svg
												t="1702452734748"
												class="icon"
												viewBox="0 0 1024 1024"
												version="1.1"
												xmlns="http://www.w3.org/2000/svg"
												p-id="4233"
												width="16"
												height="16"
											>
												<path
													d="M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z"
													p-id="4234"
													fill="#ffffff"
												></path>
											</svg>
										</div>

										<div class="mute-speaker">
											<svg
												t="1702452821679"
												class="icon"
												viewBox="0 0 1024 1024"
												version="1.1"
												xmlns="http://www.w3.org/2000/svg"
												p-id="6590"
												width="16"
												height="16"
											>
												<path
													d="M305.92 128.426667h85.333333v767.146666h-85.333333zM632.746667 128.426667h85.333333v767.146666h-85.333333z"
													p-id="6591"
													fill="#ffffff"
												></path>
											</svg>
										</div>
									</label>
								</div>

								<div
									style="
										width: 100%;
										display: flex;
										justify-content: center;
										flex-direction: column;
									"
								>
									<h2 style="margin: 0 0 0 20px">作者：{{ wyydata.auther }}</h2>
									<div>
										<p>{{ wyydata.content }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';

	// 创建axios实例
	const instance = axios.create({
		baseURL: ' http://localhost:8088',
	});

	// 添加请求拦截器
	instance.interceptors.request.use(
		(config) => {
			// 在发送请求之前做
			console.log('请求拦截器：', config);
			return config;
		},
		(error) => {
			// 对请求错误做
			return Promise.reject(error);
		}
	);

	// 添加响应拦截器
	instance.interceptors.response.use(
		(response) => {
			// 对响应数据做
			console.log('响应拦截器：', response);
			return response.data;
		},
		(error) => {
			// 对响应错误做
			return Promise.reject(error);
		}
	);

	export default {
		name: 'apiIndex',
		data() {
			return {
				wyydata: {},
			};
		},
		computed: {},
		methods: {
			fetchData() {
				instance
					.get('/users')
					.then((response) => {
						console.log(response);
						console.log(response.data);
						// console.log(response.data.data);
						this.wyydata = response.data;
					})
					.catch((error) => {
						console.error('Error fetching data:', error);
					});
			},
			// 调用五次接口
			// callAPIFiveTimes() {
			// 	for (let i = 0; i < 5; i++) {
			// 		this.fetchData();
			// 	}
			// },
		},
		mounted() {
			// this.callAPIFiveTimes();
			this.fetchData();
		},
	};
</script>
<style scoped>
	#search {
		background-color: rgb(255, 208, 0);
		background-image: url('../assets/img/Default1.jpg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: absolute;
		padding: 0px;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.inputdiv {
		display: flex;
		justify-content: center;
		align-content: center;
		margin-top: 100px;
		padding: 10px;
	}

	.input {
		color: #fff;
		font-size: 0.9rem;
		background-color: transparent;
		width: 100%;
		box-sizing: border-box;
		padding-inline: 0.5em;
		padding-block: 0.7em;
		border: none;
		border-bottom: var(--border-height) solid var(--border-before-color);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.input-border {
		position: absolute;
		background: var(--border-after-color);
		width: 0%;
		height: 2px;
		bottom: 0;
		left: 0;
		transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
	}

	.input:focus {
		outline: none;
	}

	.input:focus + .input-border {
		width: 100%;
	}

	.form-control {
		position: relative;
		width: 500px;
		--width-of-input: 300px;
	}

	.input-alt {
		font-size: 1.2rem;
		padding-inline: 1em;
		padding-block: 0.8em;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.input-border-alt {
		height: 3px;
		background: linear-gradient(90deg, #ff6464 0%, #ffbf59 50%, #47c9ff 100%);
		transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1);
	}

	.input-alt:focus + .input-border-alt {
		width: 100%;
	}

	.card {
		width: 100%;
		height: 98%;
		background-color: rgb(249 73 73);
		border-radius: 8px;
		z-index: 1;
		transition: 0.5s;
	}

	.card:hover {
		transform: translateY(-7px);
		box-shadow: 0px 10px 10px black;
	}

	.top {
		display: flex;
		align-items: center;
		padding-left: 10px;
	}

	.circle {
		padding: 0 4px;
	}

	.circle2 {
		display: inline-block;
		align-items: center;
		width: 10px;
		height: 10px;
		padding: 1px;
		border-radius: 5px;
	}

	.red {
		background-color: #ff605c;
	}

	.yellow {
		background-color: #ffbd44;
	}

	.green {
		background-color: #00ca4e;
	}

	.header {
		margin: 5px;
		margin-top: 5px;
		border-radius: 5px;
		height: 42px;
	}

	#title2 {
		color: white;
		text-align: center;
		font-size: 15px;
	}

	.code-container {
		display: flex;
		justify-content: center;
		text-align: center;
	}
	#code {
		width: 100%;
		height: 100%;
		resize: none;
		background-color: rgb(255 135 135);
		border-radius: 5px;
		border: none;
		color: white;
		padding: 5px;
	}
	#code:focus {
		outline: none !important;
	}

	/* The switch - the box around the speaker*/
	.toggleSwitch {
		width: 240px;
		height: 240px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(39, 39, 39);
		cursor: pointer;
		transition-duration: 0.3s;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.13);
		overflow: hidden;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	/* Hide default HTML checkbox */
	#checkboxInput {
		display: none;
	}

	.bell {
		width: 18px;
	}

	.bell path {
		fill: white;
	}

	.speaker {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		transition-duration: 0.3s;
	}

	.speaker svg {
		width: 18px;
	}

	.mute-speaker {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		z-index: 3;
		transition-duration: 0.3s;
	}

	.mute-speaker svg {
		width: 18px;
	}

	#checkboxInput:checked + .toggleSwitch .speaker {
		opacity: 0;
		transition-duration: 0.3s;
	}

	#checkboxInput:checked + .toggleSwitch .mute-speaker {
		opacity: 1;
		transition-duration: 0.3s;
	}

	#checkboxInput:active + .toggleSwitch {
		transform: scale(0.7);
	}

	#checkboxInput:hover + .toggleSwitch {
		background-color: rgb(61, 61, 61);
	}
</style>
