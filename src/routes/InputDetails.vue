<template>
	<transition name="route-loader" appear>
		<container class="input-details my-3" v-if="storedInfoValidity.valid">

			<div class="col-12 col-md-8 mx-auto">

				<div class="row mb-4">
					<h2 class="header-animation">You are booking a slot on <b>{{ $store.state.booking?.date?.format("DD/MM/YYYY") }}</b> at <b>{{ $store.state.booking?.time?.format("hh:mm a") }}</b></h2>
				</div>

				<form class="col-12" ref="userForm" @submit="formSubmitted($event)" novalidate>

					<fieldset class="col-12 mb-4">
						<div class="row mb-3">
							<div class="col-12 col-sm-6 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('first-name')?.errors">
									<input type="text" id="first-name" name="first-name" placeholder="First name" data-required data-display-name="First name">
								</FormField>
							</div>
							<div class="col-12 col-sm-6 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('last-name')?.errors">
									<input type="text" id="last-name" name="last-name" placeholder="Last name" data-required data-display-name="Last name">
								</FormField>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-12 col-sm-6 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('email')?.errors">
									<input type="email" id="email" name="email" placeholder="Email address" data-required data-display-name="Email" data-regex='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'>
								</FormField>
							</div>
							<div class="col-12 col-sm-6 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('phone')?.errors">
									<input type="tel" id="phone" name="phone" placeholder="Phone number" data-required data-display-name="Phone number" data-regex='^(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}$'>
								</FormField>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-12 col-sm-6 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('date')?.errors">
									<input type="date" id="date" name="date" data-required data-display-name="Date" disabled>
								</FormField>
							</div>
							<div class="col-12 col-sm-6 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('time')?.errors">
									<input type="time" id="time" name="time" data-required data-display-name="Time" disabled>
								</FormField>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-12 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('reason')?.errors">
									<textarea name="reason" placeholder="Reason for appointment" data-required data-display-name="Reason for appointment"></textarea>
								</FormField>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-12 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('terms-and-conditions')?.errors">
									<div class="checkbox-and-label">
										<input type="checkbox" id="terms-and-conditions" name="terms-and-conditions" data-required data-display-name="Terms & Conditions">
										<label for="terms-and-conditions">I understand that this is a private consultation and I will be either responsible for payment or arranging for payment through my insurer.</label>         
									</div>
								</FormField>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-12 col-sm-6 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('temp1')?.errors">
									<input type="text" id="temp1" name="temp1" placeholder="confirmation of test" data-required data-display-name="confirmation of test" data-confirmation="temp2">
								</FormField>
							</div>
							<div class="col-12 col-sm-6 m-0 d-flex">
								<FormField :errors="formValidatorHelper.fields.get('temp2')?.errors">
									<input type="text" id="temp2" name="temp2" placeholder="test" data-required data-display-name="test">
								</FormField>
							</div>
						</div>

					</fieldset>

					<div class="row mb-3">
						<div class="col-12 d-flex justify-content-center">
							<button type="submit" class="user-form__submit" v-if="! submitted">Submit</button>

							<transition name="element-loader">
								<LoadingSpinner :inline="true" v-if="submitted" />
							</transition>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-12 d-flex justify-content-center">
							<span class="user-form__status" v-if="! formValidatorHelper.valid">Please ensure all fields are valid and complete!</span>
						</div>
					</div>
				</form>

			</div>
			
		</container>

		<LoadingSpinner v-else />
	</transition>
</template>

<script setup lang="ts">
import FormField from "@/components/InputDetails/FormField.vue";

import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import StoreState from "@/models/StoreState.interface";
import $errorDialog from "@/services/errorDialog.service";

import FormValidatorHelper from "@/helpers/FormValidator.helper";


/* DATA */

const $store = useStore<StoreState>();

const userForm = ref<HTMLFormElement>();

const submitted = ref(false);
const formValidatorHelper = reactive<FormValidatorHelper>(new FormValidatorHelper());


/* COMPUTED */

const storedInfoValidity = computed(() =>
	$store.state.request === null ? { valid: false, message: "Request is not set!" } : 
	$store.state.requestItem === null ? { valid: false, message: "Request item is not set!" } :
	$store.state.booking?.date === undefined ? { valid: false, message: "Date is not set!" } : 
	$store.state.booking?.time === undefined ? { valid: false, message: "Time is not set!" } : 
	{ valid: true });

	
/* METHODS */

const formSubmitted = (ev: Event) => {
		ev.preventDefault();

		formValidatorHelper.listenToFields();
		formValidatorHelper.checkValidityOfFields();

		//if any fields are marked as invalid, do not proceed
		console.log(formValidatorHelper.fields);
		if (! formValidatorHelper.valid) return;

		formValidatorHelper.disableFields();

		submitted.value = true;

		$errorDialog.open();

		//const fd = new FormData(form.value);
		//save user data here
};


/* RUNTIME */

(async () => {
	try {
    	if (! storedInfoValidity.value.valid) throw storedInfoValidity.value.message;
	} catch(e) {
		$errorDialog.open(e as string);
	}
})();

onMounted(() => {
	if (! storedInfoValidity.value.valid) return;
	formValidatorHelper.init(userForm.value!)
});
</script>

<style lang="scss">
@import "@/scss/views/input-details";
</style>