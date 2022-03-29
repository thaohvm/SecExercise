/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0) {
      throw new Error("Invalid index.")
    } else {
      let currNode = this.head;
      let secondLastNode = this.head;
      while (currNode.next) {
        secondLastNode = currNode;
        currNode = currNode.next;
      }
      secondLastNode.next = null;
      this.tail = secondLastNode;
      this.length--;
      if (!this.length) {
        this.head = null;
        this.tail = null;
      }
      return currNode.val
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) {
      return null;
    }
    let removeNode = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length < 2) this.tail = this.head;
    return removeNode.val
  }

  /** getAt(idx): get val at idx. */

  _get(idx) {
    let currNode = this.head;
    let count = 0;

    while (currNode !== null && count !== idx) {
      count++;
      currNode = currNode.next;
    }
    return currNode;
  }

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    let currNode = this.head;
    let count = 0;
    while (currNode !== null && count !== idx) {
      currNode = currNode.next;
      count++;
    }
    return currNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index");
    }
    let currNode = this.head;
    let count = 0;
    while (currNode !== null && count !== idx) {
      currNode = currNode.next;
      count++;
    }
    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    // remove last item
    if (idx === this.length - 1) {
      this.pop()

      //remove first item
    } else if (idx === 0) {
      this.shift()
    } else {
          // remove middle item
      let prev = this._get(idx - 1);
      prev.next = prev.next.next;
      return prev.next.val
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
