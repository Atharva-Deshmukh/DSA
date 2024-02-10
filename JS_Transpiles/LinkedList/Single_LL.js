class ListNode {
    data;
    next;
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
;
class LinkedList {
    head;
    tail;
    length;
    constructor() {
        this.head = null;
        this.tail = this.head;
        this.length = 0;
    }
    addNodeToTail(data) {
        let newNode = new ListNode(data);
        this.length += 1;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            if (this.tail) {
                this.tail.next = newNode;
                this.tail = newNode;
            }
        }
    }
    removeNodeFromTail() {
        // LL is empty
        if (!this.head)
            return;
        // LL has only one node
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        // Normally, traverse till second last node and then delete the last node
        let current = this.head;
        while (current && current.next !== this.tail)
            current = current.next;
        current.next = null;
        this.tail = current;
    }
    addToHead(data) {
        let newNode = new ListNode(data);
        this.length += 1;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        newNode.next = this.head;
        this.head = newNode;
    }
    removeFromHead() {
        // if LL is empty
        if (!this.head)
            return;
        // if LL has single node
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        // Normally, move head to the second node and delete first node
        let newHead = this.head.next;
        this.head = null;
        this.head = newHead;
    }
    getLength() {
        console.warn(' Length of LL -> ', this.length);
    }
    printList() {
        let current = this.head;
        while (current) {
            console.warn(current.data + ' -> ');
            current = current.next;
        }
        console.warn(' null ');
    }
}
let ll = new LinkedList();
ll.addNodeToTail(1);
ll.addNodeToTail(2);
ll.addNodeToTail(3);
ll.addNodeToTail(4);
ll.addToHead(8);
ll.getLength();
ll.printList();
