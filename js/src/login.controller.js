/**
 * Created by KK on 10/18/16.
 */
(function () {
    "use strict";

    // login view element ids
    var formId = 'qtLoginForm';
    var emailInputFieldId = 'lgEmail';
    var passwordInputFieldId = 'lgPassword';

    var loginForm;
    var emailInput;
    var passwordInput;
    var questtagController;

    function initialize(controller) {
        loginForm = document.getElementById(formId);
        emailInput = document.getElementById(emailInputFieldId);
        passwordInput = document.getElementById(passwordInputFieldId);
        questtagController = controller;
        loginForm.addEventListener('submit',loginFormSubmitted);
    }

    function loginFormSubmitted(event) {
        event.preventDefault();
        var email = emailInput.value;
        var password = passwordInput.value;
        console.log(email+" "+password);
        questtagController.loadDashboardPage();
    }

    exports.intialize = initialize;
}());