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
