<template>
	<div class="loader-container">
		<span class="loader"></span>
	</div>
</template>

<style lang="scss">
	.loader {
		&-container {
			display:flex;
			justify-content:center;
			align-items:center;
	
			background-color:var(--ow-background);

			&.fill-container,
			&.fullscreen {
				position:absolute;
				inset:50% auto auto 50%;
				transform:translate(-50%, -50%);
			}

			&.fill-container {
				min-width:100%;
				min-height:100%;
			}

			&.fullscreen {
				z-index:999;
				position:fixed;
				min-width:100vh;
				min-height:100vh;
			}
	
			&.loaded {
				filter:opacity(0);
				pointer-events:none;
				animation:FadeOut 250ms ease-in-out;
			}
		}

		width: 48px;
		height: 48px;
		border: 5px solid #FFF;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;

		animation:FadeIn 250ms ease-in-out, LoadingWheelSpin 1s linear infinite;

		@keyframes LoadingWheelSpin {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		} 
	}
</style>