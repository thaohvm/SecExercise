/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;

    let total = this.root.val;
    function sumHelper(node) {
      for (let child of node.children) {
        total += child.val;
        if (child.children.length > 0) {
          sumHelper(child);
        }
      }
    }
    sumHelper(this.root);
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    let counter = 0;
    function countHelper(node) {
      for (let child of node.children) {
        if (child.val % 2 === 0) {
          counter++;
        }
        if (child.children.length > 0) {
          countHelper(child);
        }
      }
    }
    countHelper(this.root);
    return counter;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    let counter = 0;
    if (this.root.val > lowerBound) {
      counter = 1;
    }
    function greaterHelper(node) {
      for (let child of node.children) {
        if (child.val > lowerBound) {
          counter++;
        }
        if (child.children.length > 0) {
          greaterHelper(child);
        }
      }
    }
    greaterHelper(this.root);
    return counter
  }
}

module.exports = { Tree, TreeNode };
