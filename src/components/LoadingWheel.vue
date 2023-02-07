<template>
	<section class="loader-container">
		<span class="loader"></span>
	</section>
</template>

<style lang="scss">
	.loader {
		&-container {
			display:flex;
			justify-content:center;
			align-items:center;
	
			background-color:var(--ow-background);

			&.fill-container {
				position:absolute;
				inset:50% auto auto 50%;
				transform:translate(-50%, -50%);
				min-width:100%;
				min-height:100%;
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