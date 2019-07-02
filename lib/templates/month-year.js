export default function(h) {
  return (
    <div>
      <select
        domPropsValue={this.selected.month}
        onInput={e => this.updateValue(e.target.value, "month")}
      >
        <option value="">Month</option>
        {this.months.map(month => (
          <option value={month}>{month}</option>
        ))}
      </select>
      <select
        domPropsValue={this.selected.year}
        onInput={e => this.updateValue(e.target.value, "year")}
      >
        <option value="">Year</option>
        {this.years.map(year => (
          <option value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}
