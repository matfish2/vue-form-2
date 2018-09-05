export default function (h) {
  return <div class="loqate-address-finder">
    <input type="text" class="form-control search-field" id={this.id("search")} domPropsValue={this.getAddressComponent('Label')} placeholder="Type an address..."/>
    <hr/>
      {/* <input type="text" id={this.id("address_line_1")} placeholder="Address Line 1"/>
      <input type="text" id={this.id("address_line_2")} placeholder="Address Line 2"/> */}
      <input type="text" id={this.id("city")} domPropsValue={this.getAddressComponent('City')} placeholder="City"/>
      <input type="text" id={this.id("postcode")} domPropsValue={this.getAddressComponent('PostalCode')} placeholder="Postcode"/>
      <input type="text" id={this.id("state")} domPropsValue={this.getAddressComponent('ProvinceCode')} placeholder="State"/>
      <input type="text" id={this.id("country")} domPropsValue={this.getAddressComponent('CountryName')} placeholder="Country"/>
    </div>
}

