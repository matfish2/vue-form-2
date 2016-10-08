import merge from 'merge';
import Input from './input';

export default function() {
 return merge.recursive(Input(), {
  data:function() {
    return {
      fieldType:'password'
    }
  }
});

}
