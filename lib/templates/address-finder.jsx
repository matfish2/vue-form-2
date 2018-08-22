export default function (h) {
  var addressTable = this.curValue ? <table id="address">
    <tr>
      <td class="label">Street address</td>
      <td class="slimField"><input class="field" id="street_number" v-model={this.curValue.street_number} disabled="true"></input>
      </td>
      <td class="wideField" colspan="2"><input class="field" v-model={this.curValue.route} id="route" disabled="true"></input>
      </td>
    </tr>
    <tr>
      <td class="label">City</td>
      <td class="wideField" colspan="3">
        <input class="field" id="locality" v-model={this.curValue.locality} disabled="true"></input>
      </td>
    </tr>
    <tr>
      <td class="label">State</td>
      <td class="slimField"><input class="field" v-model={this.curValue.administrative_area_level_1} id="administrative_area_level_1" disabled="true"></input>
      </td>
      <td class="label">Zip code</td>
      <td class="wideField"><input class="field" v-model={this.curValue.postal_code} id="postal_code" disabled="true"></input>
      </td>
    </tr>
    <tr>
      <td class="label">Country</td>
      <td class="wideField" colspan="3"><input class="field" v-model={this.curValue.country} id="country" disabled="true"></input>
      </td>
    </tr>
  </table> : '';

  return <div class="address-finder">
    <div id="locationField">
      <input class="autocomplete" on-focus={this.geolocate} />
    </div>
    {addressTable}
  </div>
}

