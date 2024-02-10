class DoubleLinkedListNode {
    data;
    next;
    prev;
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
class DoublyLinkedList {
    head;
    tail;
    length;
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    addNodeToTail(data) {
        let newNode = new DoubleLinkedListNode(data);
        this.length += 1;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            if (this.tail) {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
        }
    }
    removeNodeFromTail() {
        if (!this.head)
            return;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            if (this.tail && this.tail.prev) {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
        }
        this.length -= 1;
    }
    addToHead(data) {
        let newNode = new DoubleLinkedListNode(data);
        this.length += 1;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }
    removeFromHead() {
        if (!this.head)
            return;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            if (this.head && this.head.next) {
                this.head = this.head.next;
                this.head.prev = null;
            }
        }
        this.length -= 1;
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
let dll = new DoublyLinkedList();
dll.addNodeToTail(1);
dll.addNodeToTail(2);
dll.addNodeToTail(3);
dll.addNodeToTail(4);
dll.addToHead(8);
dll.printList();
dll.getLength();
