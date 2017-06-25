/**
 * Created by Kawnayeen on 10/18/16.
 */
"use strict";

export default class Login {
    constructor(qtController) {
        this.qtController = qtController;
        this.formId = 'qtLoginForm';
        this.emailInputField = 'lgEmail';
        this.passwordInputField = 'lgPassword';
        this.loginForm = null;
        this.emailInput = null;
        this.passwordInput = null;
        this.initialize();
    }

    initialize() {
        this.loginForm = document.getElementById(this.formId);
        this.emailInput = document.getElementById(this.emailInputField);
        this.passwordInput = document.getElementById(this.passwordInputField);
        this.loginForm.addEventListener('submit', event => this.submitLoginForm(event));
    }

    submitLoginForm(event) {
        event.preventDefault();
        let email = this.emailInput.value;
        let password = this.passwordInput.value;
        console.log(email + " : " + password);
        this.qtController.loadDashboardPage();
    }
}