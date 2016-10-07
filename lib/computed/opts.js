import merge from 'merge'
import defaultOptions from '../options/options'

export default function() {

 let options = merge.recursive(defaultOptions(), this.globalOptions);

 return merge.recursive(options, this.options);

}
