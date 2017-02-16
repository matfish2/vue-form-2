import {input,span} from './dates'

export default function(h) {

  let dates = {input,span}
  let classes = '';

  if (this.isTimepicker) classes+=' VF-Field--Date__timepicker';
  classes+=(this.type=='input')?' date__input':' date__span';

return <div class={'VF-Field--Date__date' + classes }>
  {dates[this.type].apply(this, [h])}
</div>

}
