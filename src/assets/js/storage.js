/**
 * Created by admin on 2017/5/24.
 */

const storageKey = 'listItems';
export default({
  get: function(){
    return JSON.parse(window.localStorage.getItem(storageKey));
  },
  set: function(items){
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }
});
