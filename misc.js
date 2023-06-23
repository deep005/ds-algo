// wap to merge all overlapping intervals

class Interval{
	constructor(start, end){
  	this.start = start;
    this.end = end;
  }
}

function comparator(i1,i2){
	return i1.start-i2.start;
}

function mergeInterval(arr){
	
  if(!arr.length)
  	return 'No elements';
	
  arr.sort(comparator);
  
  const s = [];
  
  s.push(arr[0]);
  
  for(let i = 1; i< arr.length; i++){
  	const top = s[s.length-1];
    
    if(top.end < arr[i].start){
    	s.push(arr[i]);
    }else if(top.end < arr[i].end){
    	top.end = arr[i].end;
      s.pop();
      s.push(top);
    }
  }
  
  for(let i = 0; i<s.length;i++){
  	console.log("[" + s[i].start + "," + s[i].end + "]");
  }
  
}

const arr = [new Interval(1,3), new Interval(2,4), new Interval(6,8), new Interval(9,10)];
mergeInterval(arr);