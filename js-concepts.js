// function currying in js

function Sum(...initialArr){
    let finalSumArr = [];
      const currySum = (...args) => {
          if(!args.length){
            return finalSumArr.reduce((acc, curr) => {
              return curr + acc;
          }, 0);
        }
        else{
            args.forEach((elem)=>{
              finalSumArr.push(elem);
          });
          return currySum;
        }
      }
      return currySum(...initialArr);
    }
    let x = Sum(2,3,4);
    let y = x(16);
    console.log(y());
    

// Array.reduce polyfill

Array.prototype.myReduce = function(cb, initialValue){
	let result = initialValue;
  if(result){	
    for(let i=0; i<this.length; i++){
    	result = cb(result, this[i], i, this);
    }
  }else{
  	result = this[0];
    for(let i=1; i<this.length; i++){
    	result = cb(result, this[i], i, this);
    }
  }
  return result;
} 

const x = [1,2,3,4,5];

const y = x.myReduce((acc, curr)=>{
	return acc + curr;
}, undefined)
    
    const sum = [1,2,3,4,5,6,7,8,9,10].myReduce((acc, curr) => {
            return acc + curr;
    }, 0);
    
    console.log(sum);

//Array.forEach polyfill

    Array.prototype.forEachCopy = function(cb){

        for(let i=0; i< this.length; i++){
          cb(this[i]);
      }
    }
    
   [1,2,3,4,5,6,7,8,9,10].forEachCopy((elem) => {
            console.log(elem);
    });
    
    // bind polyfill
Function.prototype.myBind = function(context = {}, ...args){
	if(typeof this !== 'function'){
  	throw new Error("this is not a function");
  }
  context.fn = this;
  return function(){
  	return context.fn(...args);
  }
}

// apply polyfill
Function.prototype.myApply = function(context = {}, args = []){
	if(typeof this !== 'function'){
  	throw new Error("this is not a function");
  }
  if(!Array.isArray(args)){
 	 throw new Error("args is not an array");
  }
  context.fn = this;
  return context.fn(...args);
}

// call polyfill
Function.prototype.myCall = function(context = {}, ...args){
	if(typeof this !== 'function'){
  	throw new Error("this is not a function");
  }
  context.fn = this;
  return context.fn(...args);
  
}

//promise polyfill 

const customPromiseState = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
}

class myPromise {

  constructor(executor) {
    this.state = customPromiseState.PENDING;
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.thenFns = [];
    this.resolvedValue = null;
    this.rejectedValue = null;
    this.catchfn = null;
    this.called = false;
    this.finallyFn = null;
    executor(this.resolve, this.reject);
  }

  resolve(data) {
    this.resolvedValue = data;
    this.state = customPromiseState.RESOLVED;
    this.thenFns.forEach((func) => {
      this.called = true;
      this.resolvedValue = func(this.resolvedValue);
    })
    if (this.finallyFn) {
      this.finallyFn()
    }
  }
  reject(err) {
    this.rejectedValue = err;
    this.state = customPromiseState.REJECTED;

    if (this.catchfn !== null) {
      this.called = true;
      this.catchfn(err);
      if (this.finallyFn) {
        this.finallyFn()
      }
    }

  }
  then(func) {
    if (!this.called && this.state === customPromiseState.RESOLVED) {
      this.resolvedValue = func(this.resolvedValue);
    } else {
      this.thenFns.push(func);
    }
    return this;
  }
  catch (func) {
    if (!this.called && this.state === customPromiseState.REJECTED) {
      func(this.rejectedValue);
      this.called = true;
    } else {
      this.catchfn = func;
    }
    return this;
  } 
  
  finally(cb) {
    
    if (this.state !== customPromiseState.PENDING) {
      cb();
    }else{
    	this.finallyFn = cb;
    }
    return this;
  }

}

const prom = new myPromise((res, rej) => {
   setTimeout(()=>{
     rej("Deep");
   },0)   

  //res("Deep");

})

prom.then((data) => {
  console.log(data);
  return "Shanker";
}).then((data) => {
  console.log(data);
  return "Guha";
}).then((data) => {
  console.log(data);
  return 29
}).catch((err) => {
  console.log("Error", err);
  return err;
}).then((data) => {
  console.log(data);
}).finally(() => {
  console.log("Done");
})

//promise.all implementation

Promise.myAll = function(arr){
	const resArr = [];
  let count = 0;
  arr.forEach((ele) => {
  	resArr.push({});
  })
  return new Promise((res, rej) => {
  	arr.forEach((prom, index) => {
    	Promise.resolve(prom).then((data) => {
      	resArr.splice(index, 1, data);
        count++;
        if(count === arr.length){
        	res(resArr);
        }
      }).catch((err)=>{
      	rej(err);
      })
    })
  })
}

  const prom1 = new Promise((res, rej) => {
  	setTimeout(()=>{
     console.log("1")
    	res("Prom1")
    }, 3000)
  })

const prom2 =  new Promise((res, rej) => {
  	setTimeout(()=>{
     console.log("2")
    	res("Prom2")
    }, 1000)
  })

const prom3 =  new Promise((res, rej) => {
  	setTimeout(()=>{
    console.log("3")
    	res("Prom3")
    }, 10)
  })

const a = Promise.myAll([prom1, prom3, prom2])
a.then(result => {
  console.log("DDDDDDD", result);
}).catch((er) => {
  console.log(er)
})

// Promise.race polyfill

Promise.myRace = function(arr) {
  return new Promise((res, rej) => {
    arr.forEach((prom, index) => {
      Promise.resolve(prom).then((data) => {
        res(data);
      }).catch((err) => {
        rej(err);
      })
    })
  })
}

// Promise.allsettled 

Promise.myAllSettled = function(arr) {
  const resArr = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    resArr.push({});
  }
  return new Promise((res, rej) => {
    arr.forEach((prom, i) => {
      Promise.resolve(prom).then((data) => {
        resArr.splice(i, 1, {
          value: data,
          status: 'fulfilled'
        })
      }).catch((err) => {
        resArr.splice(i, 1, {
          value: err,
          status: 'rejected'
        })
      }).finally(() => {
      	count++;
        if(count === arr.length){
        	res(resArr);
        }
      })
    })
  })
}

Promise.myAllSettled([prom1, prom2, prom3]).then(data=> {
	console.log(data);
});


// throttle and debounce in vanilla js

function throttle(func, delay) {

  let inthrottle = false;
  return function(...args) {
    if (!inthrottle) {
      inthrottle = true;
      func.call(this,...args);
      setTimeout(() => {
        inthrottle = false;
      }, delay)
    }
  }
}

const callback = () => {
  console.log("throttled button click");
}

document.getElementById("name").addEventListener('click', throttle(callback.bind(this), 1000));

function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this,...args);
    }, delay)
  }
}

const callback2 = () => {
	console.log("Inside debounced callback")
}

document.getElementById("name").addEventListener('click', debounce(callback2.bind(this), 1000));


//debounce in react using useEffect

// useEffect(()=>{
//   const timer = setTimeOut(()=>{
//     sideEffectFunc()
//   }, delay)

//   return()=>{
//     clearTimeout(timer);
//   }
// }, [stateSlice])

// custom Hook for http request

import {
  useState
} from 'react';

const useHttp = () => {
  const [isLoading, , setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  const sendRequest = async (requestConfig, transformFunction) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {}
      })

      if (!response.ok) {
        throw new Error("error in making api call");
      }
      transformFunction(response);
    } catch (err) {
      setIsError(err);
    }
    setIsLoading(false);
  }
  return {
    isLoading,
    error,
    sendRequest
  }
}

export default useHttp;

const requestConfig = {
  url: "hello.com"
}
const transformFn = (response) => {
	// transformData 
}
const {
  isLoading,
  error,
  sendRequest: fetchData
} = useHttp();


//flatten a multidimensional array

const flatten = (arr) => {
	return arr.reduce((flat, toFlatten) => {
  	return flat.concat(!Array.isArray(toFlatten) ? toFlatten: flatten(toFlatten))
  },[])
};

const arr = flatten([[1], [[2]], [3,[4,[5]]]]);
console.log(arr);

//deepclone in js

function deepCopy(input, ctx){
  
  if(typeof(input) === 'function'){
  	return input.bind(ctx);
  }
  if(input === null || typeof(input) !== 'object'){
    return input;
  }
  
  const output = Array.isArray(input) ? [] : {};
  
  for(let prop in input){
  	output[prop] = deepCopy(input[prop], output);
  }
  return output;
} 

const obj = {
	a: "Deep",
  b: function(){
  	console.log(this.c);
  },
  c: [1,2,3,4,5],
  d: {
  	e: function(){
    	console.log(this.f);
    },
    f: "Shanker"
  }
}
const l = deepCopy(obj);
obj.d.e();
console.log(l.d.e === obj.d.e);


//document.getElementByClassName polyfill

document.getElementByClass  = function(requiredClass){
	const root = this.body;
  const result = [];
  
  function search(node) {
  
  	
    if(node.classList.contains(requiredClass)){
    	 result.push(node);
    }
    for(let element of node.children)  {
    	search(element);
    }
    
   
  }
  search(root);
   return result;
}

// retry function
function retrial(func, retries) {

  const retrialClosure = (char) => {
    return func(char).then((data) => {
      return data;
    }).catch((err) => {
      if (!retries) {
        throw err;
      } else {
        console.log(retries, char);
        retries--;
        return retrialClosure(char);
      }
    })
  }
  return retrialClosure;
}

const promFunc = (char) => {
  return new Promise((res, rej)=>{
   setTimeout(()=>{
       rej("not done" + " " + char)
   },1500)
 })
}

const x = retrial(promFunc, 3);
const z = retrial(promFunc, 1)
x('x').then((data) => {
  console.log(data)
}).catch((err)=>{
  console.log(err);
})

z('z').then((data) => {
  console.log(data)
}).catch((err)=>{
  console.log(err);
})


const tasksArr = [
	{
  	deps: ['b', 'c'],
    func: () => {
    	return new Promise((res, rej)=>{
          setTimeout(()=>{
            console.log('Resolved a')
            res('Resolved a')
            }, 1000)
        })
      
    },
    id: 'a',
    prom: null
  },
  {
  	deps: ['c', 'd'],
    func:  () => {
    	return new Promise((res, rej)=>{
          setTimeout(()=>{
            console.log('Resolved b')
            res('Resolved b')
            }, 1000)
        })
      
    },
    id: 'b',
    prom: null
  },
  {
  	deps: [],
    func:() => {
      	return new Promise((res, rej)=>{
          setTimeout(()=>{
            console.log('Resolved c')
            res('Resolved c')
            }, 1000)
        })
    },
    id: 'c',
    prom: null
  },
  {
  	deps: ['c'],
    func:() => {
    	return new Promise((res, rej)=>{
          setTimeout(()=>{
            console.log('Resolved d')
            res('Resolved d')
            }, 1000)
        })
    },
    id: 'd',
    prom: null
  }
];

function taskRunner(taskArr, done) {

  const taskOrder = [];
  const doneArr = [];
  const generateTaskOrder = (taskId) => {
    const taskObj = tasksCotainer.find((obj) => {
      return obj.id === taskId;
    })
    while (taskObj.deps.length) {
      const depId = taskObj.deps.shift();
      generateTaskOrder(depId)
    }
    const seen = taskOrder.find((task) => {
      return taskObj.id === task.id
    })
    if (!seen) {
      taskOrder.push(taskObj);
    }
  }
  taskArr.forEach((id) => {
    generateTaskOrder(id)
  });
  //console.log(taskOrder)

  taskOrder.forEach((taskObj) => {
    if (!taskObj.deps.length) {
      taskObj.prom = taskObj.func().then((data) => {
        return data;
      })
      doneArr.push(taskObj.prom);
    } else {
      const depArray = []
      while (taskObj.deps.length) {
        const depId = taskObj.deps.shift();
        const depObj = taskOrder.find((task) => {
          return depId === task.id
        })
        depArray.push(depObj.prom);

      }
      taskObj.prom = Promise.allSettled(depArray).then(() => {
        return taskObj.func().then((d) => {
          return d;
        });
      })
      doneArr.push(taskObj.prom);
    }
    if (doneArr.length === taskOrder.length) {
      Promise.allSettled(doneArr).then(() => {
        done();
      })
    }
  })

}

taskRunner(['a'], () => {
  console.log("All tasks Done")
})


// memoization function

function memoize(cb){
	const cache = [];
  
	return (...args) => {
  	let cached = false;
    let cacheIndex = -1;
    for(let i = 0; i<cache.length; i++){
    	cached= false;
      cacheIndex = -1;
    	for(let j = 0; j<cache[i].params.length; j++){
      	if(cache[i].params[j] === args[j]){
        	cached= true;
        }else{
        	cached= false;
          break;
        }
      }
      if(cached){
      	cacheIndex = i;
        break;
      }
    }
    if(cached){
    	console.log('cached');
      console.log(cache[cacheIndex].value);
      return cache[cacheIndex].value;
    }else{
    	console.log('executed');
      const cahchedObj = {
      	params: args,
        value: cb(...args)
      }
      cache.push(cahchedObj);
      return cahchedObj.value;
    }
  }
}

const memoizedSum = memoize(sum);
memoizedSum(1, 2, 3);
memoizedSum(1, 2, 3);

memoizedSum(1, 2, '3');
memoizedSum(1, 2, '3');

const obj1 = {
  a: 123
};

memoizedSum(obj1, 2, 3);
memoizedSum(obj1, 2, 3);

memoizedSum({
  a: 123
}, 2, 3);
memoizedSum({
  a: 123
}, 2, 3);




// what is the difference between === and == ----> 
// https://www.scaler.com/topics/javascript/difference-between-double-equals-and-triple-equals-in-javascript/

// promise.allSettled polyfill
// write a timer custom hook in react 
// what is the use of semantic tags in html
// what are the different meta tags
// how to achieve higher seo?
// useRef vs useState -> https://plainenglish.io/blog/the-difference-between-usestate-and-useref-in-react-fa3ccd9aeda5
// requestAnimationFrame
// Render tree and steps involved in rendering the page
// html parsing
// how is css compiled and put in the main js in react
// HOC with functional components in React

// revise react.context
// css specificity
// implement react error boundries
// cors issues, how to resolve it
// infinite scroll with intersection Observer
// useCallback, useRef, useEffect, useMemo, Pure Components.



// CRP optimizations ----->

// Cache the vendor files, static assets and main bundle on CDN 
// Code splitting and lazy Loading 
// Defer the download of non-essential things like analytics files 
// Minify and tree-shake the code


// ComponentDidMount, ComponentDidUpdate, ComponentWillUnmount -> useEffect
// ComponentWillMount, componentWillUpdate -> useLayoutEffect
// shouldComponentUpdate -> const Modal = React.memo(
//   props => {...},
//   (prevProps, nextProps) => prevProps.show === nextProps.show
// );

// How to improve seo ---> 

// 1) Use Semantic Html tags.
// 2) use meta tags like title and description.
// 3) the url of the website needs to be clean
// 4) make the website mobile friendly
// 5)make sure the page loads fast ->
//   a) optimize CRP
//   b) optimize images and serve static assets from cdn cache

import { useRef } from "react";

const useCustomMemo = (cb, dependencies) => {
  const memoRef = useRef(null);
  let result = useRef(null);
  let flag = false;

  if (memoRef.current === null) {
    memoRef.current = dependencies;
    result.current = cb();
  } else {
    memoRef.current.forEach((dep, index) => {
      if (dep !== dependencies[index]) {
        flag = true;
      }
    });
    if (flag) {
      result.current = cb();
      memoRef.current = dependencies;
    }
    console.log(result.current);
  }
  return result.current;
};

export default useCustomMemo;
