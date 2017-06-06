/**
 * Created by admin on 2017/6/5.
 */
export function deepAssign(...objects){
  console.log(objects);
  return objects.reduce((a,b) => {
    if(b instanceof Object){
      return merge(a, b);
    }else{
      return a;
    }
  },{});
}

function merge(a, b){
  let keys = Object.keys(b);
  keys.forEach(e => {
    if(b[e] instanceof Object){
      a[e] = merge(a[e] instanceof Object ? a[e] : {},b[e]);
    } else {
      a[e] = b[e];
    }
  });
  return a;
}
