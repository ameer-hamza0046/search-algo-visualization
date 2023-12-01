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

// Min Priority Queue for objects of the form {key: , ...}
// it pops the object with the minimum key first
class MinPriorityQueue {
  constructor() {
    this.A = [];
  }
  empty() {
    return this.A.length === 0;
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }
  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  heap_decrease_key(i, key) {
    this.A[i].key = key;
    while (i > 0 && this.A[this.parent(i)].key >= this.A[i].key) {
      [this.A[i], this.A[this.parent(i)]] = [this.A[this.parent(i)], this.A[i]];
      i = this.parent(i);
    }
  }
  min_heap_insert({ ...obj }) {
    const { key } = obj;
    obj.key = Infinity;
    this.A.push(obj);
    this.heap_decrease_key(this.A.length - 1, key);
  }
  min_heapify(i) {
    const l = this.left(i);
    const r = this.right(i);
    let smallest;
    if (l < this.A.length && this.A[l].key < this.A[i].key) {
      smallest = l;
    } else {
      smallest = i;
    }
    if (r < this.A.length && this.A[r].key < this.A[smallest].key) {
      smallest = r;
    }
    if (smallest !== i) {
      [this.A[i], this.A[smallest]] = [this.A[smallest], this.A[i]];
      this.min_heapify(smallest);
    }
  }
  heap_extract_min() {
    const min = this.A[0];
    this.A[0] = this.A[this.A.length - 1];
    this.A.length--;
    this.min_heapify(0);
    return min;
  }
  print() {
    console.log(...this.A);
  }
}

export default { Queue, MinPriorityQueue };
