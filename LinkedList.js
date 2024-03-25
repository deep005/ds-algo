class Node {
  constructor(data, pointer = null) {
    this.data = data;
    this.pointer = pointer
  }
}

class LL {
  constructor() {
    this.head = null;
  }

  insertNode(data) {

    let node = new Node(data);
    let curr = {};
    if (!this.head) {
      this.head = node;
      return true;
    } else {
      curr = this.head;
      while (curr.pointer)
        curr = curr.pointer;
      curr.pointer = node;
      return true;
    }
  }

  printLL() {

    if (!this.head)
      console.log("LL is Empty");

    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.pointer;
    }

  }

  // 1->2->3->4->5
  // 1->5->2->4->3


  printRearranged(){
  	let mid = this.head;
   	let end = this.head;
    
    while(end.next !== null){
    	mid=mid.next;
      if(end.next.next !== null){
      	end=end.next.next
      }else{
      	end=end.next
      } 
    }
        
    let curr = mid;
    let nextNode = curr.next;
    let temp;
    while(nextNode !== null){
    	temp = nextNode.next;
    	nextNode.next = curr;
      curr = nextNode;
      nextNode = temp;
    }
     
    end = curr;
    curr = this.head;
    let flag = false;
    while(curr !== mid){
      console.log(curr.data);
       if(!flag){
        temp = curr.next;
        curr.next=end;
        end = end.next;
        flag = true;
      }else{
        curr.next = temp;
        flag = false
      } 
      curr = curr.next;
    }
    console.log(curr.data);
  }

  searchLL(data, node = this.head, index = 0) {
    if (!node) {
      console.log("not found");
      return;
    }
    if (data === node.data) {
      console.log("found at ", (index + 1));
      return;
    }
    return this.searchLL(data, node.pointer, index + 1);
  }

  reverseLL(current = this.head, prev = null) {
    if (!current) {
      return;
    }
    this.head = current;
    let next = current.pointer;
    current.pointer = prev;
    this.reverseLL(next, current);
  }
  
  printN(n){
  	if(!this.head){
    	console.log("Empty LL");
      return;
    }
    let curr = this.head;
    let count =1;
    while(curr && count < n){
    	curr = curr.pointer;
      count++;
    }
    if(!curr){
    	console.log("N is greater than LL length");
      return;
    }
    console.log("data at Nth node", curr.data);
    
  }
  
  printNFromEnd(n){
  	this.reverseLL();
    this.printN(n);
    this.reverseLL();
  }

  deleteAtN(key) {
    if (!this.head) {
      return "empty LL";
    }
    let count = 0;
    let curr = this.head;
    let prev = {};
    let newNext = {};
    while (curr && count < key) {
      prev = curr;
      curr = curr.pointer;
      count++;
    }
    if (!curr) {
      return "crossed the size of LL"
    }
    if (curr === this.head) {
      newNext = this.head.pointer;
      this.head.data = null;
      this.head.pointer = null;
      this.head = newNext;
    } else {
      let newNext = curr.pointer;
      prev.pointer = newNext;
      curr.data = null;
      curr.pointer = null;
    }
    return "Deleted at N";
  }

  deleteLL() {
    if (!this.head) {
      return "Deleted LL";
    }
    let curr = this.head;
    this.head = this.head.pointer;
    curr = null;
    return this.deleteLL();
  }


}

let newLL = new LL();
console.log(newLL.insertNode("a"));
console.log(newLL.insertNode("b"));
console.log(newLL.insertNode("c"));
console.log(newLL.insertNode("d"));
console.log(newLL.insertNode("e"));
console.log(newLL.insertNode("f"));
//console.log(newLL.deleteAtN(0));

newLL.printNFromEnd(4);
newLL.printLL();
/* newLL.printLL();
console.log(newLL.deleteLL());
newLL.printLL(); */
//newLL.reverseLL();
//newLL.printLL();
//newLL.searchLL('x');




function findIntersectionNode(head1, head2){

	const hs = new Set();
	
  while(head1){
  	hs.add(head1);
    head1 = head1.next;
  }
  while(head2){
  	if(hs.has(head2)){
    	return head2;
    }
    head2 = head2.next;
  }
  return null;
}




class NodeDLL{
	
  constructor(data){
  	this.data = data;
  	this.prev = null;
    this.next = null;
  }
}

class LRUCache {
	
  constructor(maxCount){
  	this.head = null;
    this.hash = {};
    this.count = 0;
    this.maxCount = maxCount;
  }
  
  putLRU(data){
  	if(this.hash[data.toString()]){
      let temp = this.hash[data.toString()];
    	temp.prev.next = temp.next;
      if(temp.next){
      	temp.next.prev = temp.prev;
      }
      temp.next = this.head;
      temp.prev = null;
      this.head.prev = temp;
      this.head = temp;
    }else{
    	if(this.count === this.maxCount) {
        let temp = this.head;
        while(temp.next){
        	temp = temp.next;
        }
        this.hash[temp.data.toString()]= undefined;
        temp.prev.next = null;
        temp = null;
        this.count--;
      }
      const newNode = new NodeDLL(data);
      if(this.head === null){
      	this.head = newNode;
      }else{
      	newNode.next = this.head;
        this.head.prev=newNode;
        this.head = newNode;
      }
      this.hash[data.toString()] = newNode;
      this.count++;
    }
  }
  
  printLRU(){
  	let temp = this.head;
    const resArr = [];
    while(temp){
    	resArr.push(temp.data);
      temp = temp.next;
    }
    console.log(resArr);
  }
}


const lru = new LRUCache(5);
const arr = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3,6];

arr.forEach((elem)=>{
	lru.putLRU(elem);
  lru.printLRU();
})