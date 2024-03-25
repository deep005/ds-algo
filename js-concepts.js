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

Array.prototype.myReduce = function(...args){
let result;
let cb = args[0];
if(args.length === 2){
  result = args[1];
  for(let i=0; i< this.length; i++){
    result = cb(result, this[i], i, this);
  }
}else{
  if(!this.length){
    throw new Error("Reduce of empty array with no initial value")
  }
  result = this[0];
  for(let i = 1; i< this.length; i++){
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

class myPromise{

constructor(executor){
  this.state= customPromiseState.PENDING;
  this.resolvedValue = null;
  this.thenFunctions = [];
  this.catchFunction = null;
  this.finallyFunction = null;
  this.resolve = this.resolve.bind(this);
  this.reject = this.reject.bind(this);
  this.catchCalled = false;
  this.thenFunctionsPostcatch = [];
  executor(this.resolve, this.reject);
  
}

resolve(data){
  if(this.state === customPromiseState.PENDING){
      this.state = customPromiseState.RESOLVED;
      this.resolvedValue = data;
      this.thenFunctions.forEach((func)=>{
        this.resolvedValue= func(this.resolvedValue);
      })
    if(this.finallyFunction){
      this.finallyFunction()
    } 
  }
}

reject(err){
    if(this.state === customPromiseState.PENDING){
      this.state = customPromiseState.REJECTED;
      this.resolvedValue = err;
      if(this.catchFunction){
        this.resolvedValue = this.catchFunction(this.resolvedValue)
      
        this.thenFunctionsPostcatch.forEach((func)=>{
            this.resolvedValue = func(this.resolvedValue)
          })
        }
      if(this.finallyFunction){
      this.finallyFunction()
    }
  }
}

then(func){
  if((this.state === customPromiseState.RESOLVED) || 
  (this.state === customPromiseState.REJECTED && 
  this.catchCalled === true)){
    this.resolvedValue = func(this.resolvedValue)
  }else{
    this.thenFunctions.push(func)
    if(this.catchCalled === true){
      this.thenFunctionsPostcatch.push(func)
    }
  }
  return this;
}

catch(func){
  this.catchCalled = true;
  if(this.state === customPromiseState.REJECTED){
    this.resolvedValue = func(this.resolvedValue);
    
  }else{
    this.catchFunction = func
  }
  return this;
}
finally(cb){
if(this.state !== customPromiseState.PENDING){
    cb();
  }else{
    this.finallyFunction = cb;
  }
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


const tasksContainer = [
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

const executeTaskOrder =(taskOrder, done) =>{
const promiseArr = []
taskOrder.forEach((taskObj)=>{
  const prom = Promise.resolve(taskObj.func())
  promiseArr.push(prom);
});
Promise.allSettled(promiseArr).then((result)=>{
  console.log("Final resolution", result);
  done();
}).catch((err) => {
    console.log("Error in promise resolution", err);
})
}

const taskRunner = (taskArr, done) =>  {

const generatedOrder = [];

const generateTaskOrder = (taskId) => {
  
  const taskObject = tasksContainer.find((taskObj)=>{
    return taskObj.id === taskId;
  })
  
  while(taskObject.deps.length){
    const depId = taskObject.deps.shift();
    generateTaskOrder(depId);
  }
  
  const seen = generatedOrder.findIndex((taskObj)=>{
    return taskObject.id === taskObj.id
  })
  
  if(seen < 0){
    generatedOrder.push(taskObject);
  }
  
}

taskArr.forEach((taskId)=>{
  generateTaskOrder(taskId)
})

executeTaskOrder(generatedOrder, done)

console.log("generatedOrder", generatedOrder)

}

taskRunner(['a'], () => {
console.log("All tasks Done")
})


// memoization function
const memoize = function (functionMemoized){
  
  const cache = [];
  
  return function(...args){
    let cachedIndex = -1;
    let cached = false;
    for(let i=0; i<cache.length; i++){
      cached = true;
      for(let j = 0; j<cache[i].params.length; j++){
        if(cache[i].params[j] !== args[j]){
          cached = false;
          break;
        }
      }
      if(cached === true){
        cachedIndex = i;
        break;
      }
    }
    
    if(cached === true){
      console.log("value was cached");
      return cache[cachedIndex].value;
    }else{
      const cachedObject = {
        params: [...args],
        value: functionMemoized(...args)
      }
      cache.push(cachedObject);
      console.log("value was executed");
      return cachedObject.value;
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

// React N-ary tree for diffing algorithm

node = {
	value: "xyz",
  children: [
    {
			value: "A",
      children: []
    },
    {
			value: "B",
      children: []
    },
    {
			value: "C",
      children: []
    }
  ]
}

node2 = {
	value: "xyz",
  children: [
    {
			value: "A",
      children: []
    },
    {
			value: "B",
      children: []
    },
    {
			value: "D",
      children: []
    }
  ]
}



const deepCopyNode = function(input){
	if(input === null || typeof input !== 'object'){
  	return input;
  }
  const output = Array.isArray(input) ? [] : {};
  
  for(let prop in input){
  	output[prop] = deepCopyNode(input[prop]);
  }
  return output;
}



class Node {
	constructor(_value, _children){
  	this.value= _value;
    this.children= [..._children];
  }
}

class Tree {
	constructor(_root){
  	this.root= _root;
  }
  
  static diffMethod(node1, node2){
  	
    if(node1.value !== node2.value){
    	const newNode = deepCopyNode(node2);
      return newNode;
    }
    
    node1.children.forEach((childNode, index)=>{
    	const newNode = Tree.diffMethod(childNode, node2.children[index]);
      if(newNode !== childNode ){
      	node1.children[index] = newNode
      } 
    })
    return node1;
  }
  
  render(){
  	
    function renderTree(node){
    	console.log(node.value);
      if(Array.isArray(node.children)){
      	node.children.forEach((childNode)=>{
        	renderTree(childNode)
        })
      }
    }
    renderTree(this.root);
  }
}

const nodeChild1 = new Node ("A", [])
const nodeChild2 = new Node ("L", [])
const nodeChild3 = new Node ("C", [])
const nodeChild4 = new Node ("A", [])
const nodeChild5 = new Node ("B", [])
const nodeChild6 = new Node ("D", [])

const rootNode1 = new Node("XYZ", [nodeChild1,nodeChild2,nodeChild3])
const rootNode2 = new Node("XYZ", [nodeChild4,nodeChild5,nodeChild6])


const TreeNode1 = new Tree(rootNode1);
const TreeNode2 = new Tree(rootNode2);
TreeNode1.root = Tree.diffMethod(TreeNode1.root,TreeNode2.root);
TreeNode1.render();

// create a cancellable promise 

function cancellablePromise(delay){
	const ret = {};
  const signal = new Promise((resolve, reject)=>{
  	ret.cancel = () =>{
    	reject("cancelled Promise");
    }
  })
  
  ret.prom = new Promise((res,rej)=>{
  	const timer = setTimeout(()=>{
    	res("Deep Shanker")
    },delay)
    
      signal.catch(err => {
      	clearTimeout(timer);
        console.log("******");
      	rej(err);
    })
  })
	return ret;  
}

const {prom, cancel} = cancellablePromise(1000);

prom.then((data)=> console.log(data)).catch((err)=> console.log(err));
setTimeout(()=>{
	cancel();
},1000)

