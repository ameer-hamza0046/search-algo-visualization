////////////////// Queue ///////////////////
class QueueNode {
  constructor(val = 0) {
    this.val = val;
    this.next = null;
    return this;
  }
}
class Queue {
  constructor() {
    this.head = this.tail = null;
    this.sz = 0;
  }
  push(val) {
    if (this.head === null) {
      this.head = this.tail = new QueueNode(val);
    } else {
      this.tail.next = new QueueNode(val);
      this.tail = this.tail.next;
    }
    this.sz++;
  }
  pop() {
    const val = this.head.val;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.sz--;
    return val;
  }
  empty() {
    return this.head === null;
  }
  size() {
    return this.sz;
  }
  print() {
    const cur = [];
    for (let i = this.head; i !== null; i = i.next) {
      cur.push(i.val);
    }
    console.log(cur);
  }
}

export default { Queue };
