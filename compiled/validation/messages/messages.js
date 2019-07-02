"use strict";

module.exports = function () {
  return {
    required: "The :field field is required",
    number: "The :field field must be a number",
    integer: "The :field field must be an integer",
    digits: "The :field field must have digits only",
    email: "The :field field must be a valid email address",
    date: "The :field field must be a valid date according to the :format format",
    daterange: "The :field field must be a valid date range",
    between: {
      string: "The field :field must contain between {0} and {1} characters",
      number: "The field :field must be a number between {0} and {1}",
      date: "The field :field must be a date between {0} and {1}"
    },
    min: {
      string: "The :field field must contain at least {0} characters",
      number: "The :field field must be equal to or greater than {0}",
      date: "The field :field must be a date equal to or greater than {0}"
    },
    max: {
      string: "The field :field must contain no more than {0} characters",
      number: "The field :field must be equal to or smaller than {0}",
      date: "The field :field must be a date equal to or smaller than {0}"
    },
    exactly: {
      string: "The field :field must contain {0} characters",
      number: "The field :field must be equal to {0}",
      date: "The field :field must be a date equal to {0}"
    },
    remote: "Remote Error",
    requiredIf: "The field :field is required",
    requiredAndShownIf: "The field :field is required",
    url: "Please enter a valid URL",
    greaterThan: "The field :field must be greater than :relatedField",
    smallerThan: "The field :field must be smaller than :relatedField",
    matches: "The field :field must be match the field :relatedField"
  };
};