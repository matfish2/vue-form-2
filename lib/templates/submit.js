export default function(h) {
  let disabled = this.disabled ? "disabled" : "";
  let sendingIndicator = this.sending ? (
    <i class="ckspin fa fa-fw fa-spinner fa-spin fa-lg" />
  ) : (
    ""
  );

  return (
    <button
      type="submit"
      class={"VF-Submit__button btn btn-primary pull-right " + disabled}
    >
      {sendingIndicator}
      {this.text}
    </button>
  );
}
