const { makePCB, equalsByPID } = require("./pcb");

class ListNode {
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(value, idx = -1) {
    if (!this.tail && !this.head) {
      this.tail = new ListNode(value);
      this.head = this.tail;
    } else if (idx >= 0) {
      if (idx > this.length) {
        console.log("PID not found");
        return;
      }

      let currNode = null;
      for (let i = 0; i < idx; i++) {
        if (!currNode) currNode = this.head;
        else if (currNode) {
          currNode = currNode.next;
        }
      }

      const newNode = new ListNode(value, currNode.next, currNode);
      currNode.next.previous = newNode;
      currNode.next = newNode;
    } else {
      const newTail = new ListNode(value, null, this.tail);
      this.tail.next = newTail;
      this.tail = newTail;
    }

    this.length++;
  }

  delete(idx = -1) {
    if (!this.head) {
      console.log("List is empty");
      return;
    }

    if (idx >= 0) {
      if (idx > this.length) {
        console.log("Index invalid");
        return;
      }

      let currNode = null;
      for (let i = 0; i < idx; i++) {
        if (!currNode) currNode = this.head;
        else if (currNode) {
          currNode = currNode.next;
        }
      }

      currNode.next.previous = currNode.previous;
      currNode.previous.next = currNode.next;
    } else {
      this.head = this.head.next;
      this.head.previous = null;
    }

    this.length--;
  }

  searchBoi(booty, compare) {
    let currNode = null;
    for (let i = 0; i < this.length; i++) {
      if (!currNode) currNode = this.head;
      if (compare && currNode && compare(currNode.value, booty)) {
        return i;
      } else if (currNode && currNode.value === booty) {
        return i;
      } else if (currNode) {
        currNode = currNode.next;
      }
    }

    // -1 means we didn't find it, fuccboi
    return -1;
  }

  traverse(process) {
    let currNode = null;
    for (let i = 0; i < this.length; i++) {
      if (!currNode) currNode = this.head;
      else if (currNode) {
        currNode = currNode.next;
      }

      process(currNode.value);
    }
  }
}

class ScheduleBoi {
  constructor() {
    this.queue = new DoublyLinkedList();
  }

  addPCB(pid, arrivalTime, burst, priority) {
    this.queue.add(makePCB(pid, arrivalTime, burst, priority));
  }

  deletePCB(pid) {
    this.queue.delete(this.queue.searchBoi(pid, equalsByPID));
  }

  printQueue() {
    const printPCB = function(pcb) {
      Object.keys(pcb).forEach(key => console.log(`${key}: ${pcb[key]}`));
      console.log("");
    };

    this.queue.traverse(printPCB);
  }

  FCFS() {
    const sorted = [];

    const addToArray = pcb => {
      sorted.push(pcb);
    };

    this.queue.traverse(addToArray);

    const compareByArrivalTime = (pcb1, pcb2) => {
      return pcb1.arrivalTime < pcb2.arrivalTime;
    };

    sorted.sort(compareByArrivalTime);

    let time = sorted[0].arrivalTime;
    for (let i = 0; i < sorted.length; i++) {
      console.log(
        `Process ${sorted[i].pid} executed from ${time} to ${time +
          sorted[i].burst}\n`);
      time += sorted[i].burst;
    }
  }

  pSchedule() {
    const sorted = [];

    const addToArray = pcb => {
      sorted.push(pcb);
    };

    this.queue.traverse(addToArray);

    const compareByPriority = (pcb1, pcb2) => {
      return pcb1.priority < pcb2.priority;
    };

    sorted.sort(compareByPriority);  

    let time = sorted[0].priority;
    for (let i = 0; i < sorted.length; i++) {
      console.log(
        `Process ${sorted[i].pid} executed from ${time} to ${time +
          sorted[i].burst}\n`);
      time += sorted[i].burst;
    }
  }
}

module.exports = ScheduleBoi;
