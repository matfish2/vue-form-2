Note: Users of Vue.js version 1 please use [this package](https://www.npmjs.com/package/vue-formular) instead.

Breaking Change: As of version 1.0 this package uses controlled components, which means the value is no longer persisted on the field component but rather on the parent consumer component. This makes all fields behave like normal vue inputs, using `v-model` (instead of `value`) to maintain two-way View-Model Binding. If you were using the old package you need to install version 0.4.0 (also tagged in Github), although it is highly recommended to make the transition to the new version.

[![npm version](https://badge.fury.io/js/vue-form-2.svg)](https://badge.fury.io/js/vue-form-2)

This vue.js package offers a comperhensive solution for HTML form management, including presentation, validation and (optional) AJAX submission.
The presentation is based on [Bootstrap's form component](http://v4-alpha.getbootstrap.com/components/forms/).

* [Documentation](https://matfish2.gitbooks.io/vue-form-2/content/)

