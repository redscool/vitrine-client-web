import QuestionCardEdit from "../components/class/exercise/form/QuestionCardEdit";
let count = 0;
export class FormNode {
  constructor() {
    this.element = null;
    this.next = null;
  }
  deleteNode() {
    delete this;
  }
}

export function insertAt(prev, setInsert) {
  var node = new FormNode();
  node.element = (
    <QuestionCardEdit
      cur={node}
      setInsert={setInsert}
      key={count}
      value={count}
    />
  );
  node.next = prev.next;
  count += 1;
  prev.next = node;
}

export function remove(node) {
  var nextNode = node.next;
  if (nextNode.element) {
    const ob = nextNode.element;
    node.element = (
      <QuestionCardEdit
        cur={node}
        setInsert={nextNode.element.props.setInsert}
        key={nextNode.element.props.value}
        value={nextNode.element.props.value}
        childrens={nextNode.element.props.childrens}
      />
    );
  } else {
    node.element = null;
  }
  node.next = nextNode.next;
}

export function traverse(head) {
  var p = head;
  let res = [];
  while (p) {
    res.push(p.element);
    p = p.next;
  }
  console.log(res);
  return res;
}
