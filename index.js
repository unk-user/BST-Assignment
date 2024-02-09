class Node {
    constructor(data = null, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        array = mergeSort(array);
        this.root = this.buildTree(array);
    }

    buildTree(array, start = 0, end = array.length - 1){
        if(end < start) {
            return null;
        } else {
            const mid = Math.floor((start + end) / 2);
            const left = this.buildTree(array, start, mid - 1);
            const right = this.buildTree(array, mid + 1, end);

            const root = new Node(array[mid], left, right);
            return root;
        }
    }
    find(value, root = this.root){
        if (root === null || root === undefined) {
            return null;
        } else if(value === root.data) {
            return root;
        } else if(value < root.data) {
            return this.find(value, root.left);
        } else if(value > root.data){
            return this.find(value, root.right);
        }
    }
    insert(value, node = this.root){
        if(node === null || node === undefined) {
            node = new Node(value);
        } else if(value > node.data){
            node.right = this.insert(value, node.right);
        } else if(value < node.data){
            node.left = this.insert(value, node.left);
        }
        return node;
    }
    delete(value, node = this.root) {
        if (node === null) {
            return null;
        }
    
        if (value < node.data) {
            node.left = this.delete(value, node.left);
        } else if (value > node.data) {
            node.right = this.delete(value, node.right);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                const minNode = this.findMin(node.right);
                node.data = minNode.data;
                node.right = this.delete(minNode.data, node.right);
            }
        }
        
        return node;
    }
    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    levelOrder(callBack) {
        if(!this.root) return [];

        let queue = [this.root];
        let result = [];
        while(queue.length > 0){
            const node = queue.shift();
            if(callBack){
                callBack(node);
            } else {
                result.push(node);
            }
            if(node.left){
                queue.push(node.left);
            }
            if(node.right){
                queue.push(node.right);
            }
        }
        return result;
    }
    inOrder(callBack, node = this.root){
        let result = []
        if(!node) return result = [];
        if (node.left) {
            result = result.concat(this.inOrder(callBack, node.left));
        }
        if(callBack){
            callBack(node);
        } else {
            result.push(node.data);
        }
        if(node.right) {
            result = result.concat(this.inOrder(callBack, node.right));
        }
        return result;
    }
    preOrder(callBack, node = this.root){
        let result = []
        if(!node) return result;
        if(callBack){
            callBack(node);
        } else {
            result.push(node.data);
        }
        if (node.left) {
            result = result.concat(this.preOrder(callBack, node.left));
        }
        if(node.right) {
            result = result.concat(this.preOrder(callBack, node.right));
        }
        return result;
    }
    postOrder(callBack, node = this.root){
        let result = []
        if(!node) return result;
        if (node.left) {
            result = result.concat(this.postOrder(callBack, node.left));
        }
        if(node.right) {
            result = result.concat(this.postOrder(callBack, node.right));
        }
        if(callBack){
            callBack(node);
        } else {
            result.push(node.data);
        }
        return result;
    }
    height(node){
        if(!node) return 0;
        if(!node.right && !node.left)return 0;
        const heightRight = this.height(node.right);
        const heightLeft= this.height(node.left);
        return Math.max(heightRight, heightLeft) + 1;
    }
    depth(node, parent = this.root){
        if(!node || !parent) return null;
        if(node === parent) return 0;
        if(node.data < parent.data){
            return this.depth(node, parent.left) + 1;
        } else {
            return this.depth(node, parent.right) + 1;
        }
    }
    isBalanced(node = this.root){
        if(!node) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        const isBalancedNode = Math.abs(leftHeight - rightHeight) <= 1;
        
        const isBalancedLeft = this.isBalanced(node.left);
        const isBalancedRight = this.isBalanced(node.right);
        
        return isBalancedLeft && isBalancedRight && isBalancedNode;
    }
    reBalance() {
        if(this.isBalanced()) return;
        const array = this.inOrder(false);
        const newRoot = this.buildTree(array);
        this.root = newRoot;
    }


}






const mergeSort = (array) => {
    if(array.length === 1){
        return array;
    } else {
        const midPoint = Math.floor(array.length / 2);
        let firstHalf = array.slice(0, midPoint);
        let secondHalf = array.slice(midPoint);
        const sortedFirst = mergeSort(firstHalf);
        const sortedSecond = mergeSort(secondHalf);
        const firstLength = sortedFirst.length;
        const secondLength = sortedSecond.length;
        let sortedArray = [];
        let i = 0,
            j = 0;
        for(let k = 0; i < firstLength && j < secondLength; k++){
            if(sortedFirst[i] < sortedSecond[j]){
                sortedArray[k] = sortedFirst[i];
                i++;
            } else if(sortedFirst[i] === sortedSecond[j]) {
                sortedArray[k] = sortedFirst[i];
                i++;
                j++;
            } else {
                sortedArray[k] = sortedSecond[j];
                j++;
            }
        }
        if(i >= firstLength){
            sortedArray = sortedArray.concat(sortedSecond.slice(j));
        } else {
            sortedArray = sortedArray.concat(sortedFirst.slice(i));
        }
        return sortedArray;
    }
}

let tree = new Tree([1, 2, 3,4 ,5 ,6, 7]);
console.log(tree.depth(tree.find(2)))
module.exports = {mergeSort, Node, Tree};



