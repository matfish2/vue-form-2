import submit from "../templates/submit";

export default {
  render: submit,
  props: {
    text: {
      type: String,
      required: false,
      default: "Submit"
    }
  },
  methods: {
    getForm: require("./methods/get-form")
  },
  computed: {
    sending: function() {
      return this.getForm().sending;
    },
    disabled: function() {
      return (
        this.getForm().sending ||
        (this.getForm().options.sendOnlyDirtyFields &&
          this.getForm().pristine())
      );
    }
  }
};
