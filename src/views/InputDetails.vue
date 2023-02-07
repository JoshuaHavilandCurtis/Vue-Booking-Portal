<template>
	<div class="fadein my-3" v-if="$store.state.request !== null">
		
		<container class="user-form">
			<form class="col-12 col-md-8 mx-auto" ref="form" @submit="formSubmitted" novalidate>
				<fieldset>
					<legend>User details form [consultant name]</legend>
	
					<div class="row mb-3">
						<div class="col-12 col-sm-6">
							<div class="user-form--column">
								<input type="text" id="first-name" name="first-name" placeholder="First name" data-required data-display-name="First name">
							</div>
						</div>
						<div class="col-12 col-sm-6">
							<div class="user-form--column">
								<input type="text" id="last-name" name="last-name" placeholder="Last name" data-required data-display-name="Last name">
							</div>
						</div>
					</div>
	
					<div class="row mb-3">
						<div class="col-12 col-sm-6">
							<div class="user-form--column">
								<input type="email" id="email" name="email" placeholder="Email address" data-required data-display-name="Email" data-regex='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'>
							</div>
						</div>
						<div class="col-12 col-sm-6">
							<div class="user-form--column">
								<input type="tel" id="phone" name="phone" placeholder="Phone number" data-required data-display-name="Phone number" data-regex='^(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}$'>
							</div>
						</div>
					</div>
	
					<div class="row mb-3">
						<div class="col-12 col-sm-6">
							<div class="user-form--column">
								<input type="date" id="date" name="date" data-required data-display-name="Date" disabled>
							</div>
						</div>
						<div class="col-12 col-sm-6">
							<div class="user-form--column">
								<input type="time" id="time" name="time" data-required data-display-name="Time" disabled>
							</div>
						</div>
					</div>
	
					<div class="row mb-3">
						<div class="col-12">
							<textarea name="reason" placeholder="Reason for appointment" data-required data-display-name="Reason for appointment"></textarea>
						</div>
					</div>
	
					<div class="row mb-4">
						<div class="col-12">
							<div class="user-form--row">
								<input type="checkbox" id="terms-and-conditions" name="terms-and-conditions" data-required data-display-name="Terms & Conditions">
								<label for="terms-and-conditions">I understand that this is a private consultation and I will be either responsible for payment or arranging for payment through my insurer.</label>         
							</div>
						</div>
					</div>
	
				</fieldset>
	
				<div class="row mb-3">
					<div class="col-12 d-flex justify-content-center position-relative">
						<button type="submit" class="user-form--submit" v-if="! submitted">Submit</button>
						<loading-wheel v-else></loading-wheel>
					</div>
				</div>
	
				<div class="row mb-3">
					<div class="col-12 d-flex justify-content-center">
						<span class="user-form--status" v-if="userFormValidator?.invalidFields.size > 0">Please ensure all fields are valid and complete!</span>
					</div>
				</div>
			</form>
		</container>

	</div>
</template>

<script>
import FormValidator from "@/classes/form-validator.class";

export default {
	data() {
		return {
            userFormValidator: null,
            submitted: false
		}
	},
	created() {
        this.checkRequestAndBooking(); //check that we have a valid request and booking object still
	},
	mounted() {
		this.userFormValidator = new FormValidator(this.$refs.form);
	},
	methods: {

        checkRequestAndBooking() {
            try {
                if (this.$store.state.request === null) throw new Error("Request is not set!");
                if (! this.$request.validateRequest(this.$store.state.request)) throw new Error("Request is not valid!");
                if (this.$store.state.booking?.date === null) throw new Error("Date is not set!");
				if (this.$store.state.booking?.time === null) throw new Error("Time is not set!");
            } catch (e) {
				this.$store.commit("openErrorDialog", e);
				throw e;
            }
        },

		formSubmitted(ev) {
            ev.preventDefault();

            this.userFormValidator.validateAllFields();
            this.userFormValidator.listenToFieldChanges();

            //if any fields are marked as invalid, do not proceed
            if (this.userFormValidator.invalidFields.size > 0) return;

            this.submitted = true;

            this.$store.commit("openErrorDialog");

            const fd = new FormData(this.$refs.form);
            //save user data here
            console.log([...fd.entries()]);
        }

	}
}
</script>

<style lang="scss">
@import "@/scss/views/input-details";
</style>