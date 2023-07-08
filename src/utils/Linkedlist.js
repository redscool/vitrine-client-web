export class QuestionNode {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

export class LinkedList {
  constructor(head) {
    this.head = head;
    this.size = 0;
  }

  insertAt(element, prev) {
    var node = new QuestionNode(element);
    node.next = prev.next;
    prev.next = node;
  }

  removeFrom(node) {
    var nextNode = node.next;
    node.element = nextNode.element;
    node.next = nextNode.next;
  }

  traverse() {
    var p = this.head;
    const res = [];
    while (p) {
      res.push(p.element);
      p = p.next;
    }
    return res;
  }
}
