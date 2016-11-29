function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}
function LList() {
    this.head = new Node("head");
    this.head.next = this.head;
    this.currNodes = this.head; //当前为头节点
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    //this.findPrevious = findPrevious;
    this.dispReverse = dispReverse;
    this.findLast = findLast;
    this.advance = advance;
    this.show = show;
    this.kill = kill;
    this.dodisplay = dodisplay;
    this.findnow = findnow;
}

function insert(newElment, item) {
    var newNode = new Node(newElment);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    newNode.previous = currNode;
    currNode.next = newNode;
}
function display() {
    var currNode = this.head;
    while (!(currNode.next == null) && !(currNode.next.element == 'head')) {
        console.log(currNode.next.element + '\n');
        currNode = currNode.next;
    }
}
function dodisplay() {
    var currNode = this.head.next;
    do {
        console.log(currNode.element + '\n');
        currNode = currNode.next;
    } while (!(currNode.next == null) && !(currNode.element == 'head'));
}
function dispReverse() {
    var currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
        console.log(currNode.element + '\n');
        currNode = currNode.previous;
    }
}
function advance(n) {
    var i = 0;
    var currNode = this.currNodes.next;
    while (i < n && currNode.next != null) {
        currNode = currNode.next;
        this.currNodes = currNode;
        i++;
    }
}

function show() {
    console.log(this.currNodes);
}
//function findPrevious(item) {
//    var currNode = this.head;
//    while (!(currNode.next == null) && (currNode.next.element != item)) {
//        currNode = currNode.next;
//    }
//    return currNode;
//}
function findLast() {
    var currNode = this.head;
    while (!(currNode.next == null) && !(currNode.next.element == 'head')) {
        currNode = currNode.next;
    }
    return currNode;
}
function remove(item) {
    var currNode = this.findnow(item);
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        this.currNodes = currNode.next;
        currNode.next = null;
        currNode.previous = null
    }
    //
}
function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}
function findnow(item) {
    var currNode = this.currNodes;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}
function kill(n, m) {

    for (var i = 1; i < n; i++) {
        var now = "位置";
        if (i == 1) {
            this.insert("位置" + i, "head");
        }
        else {
            this.insert("位置" + i, now + (i - 1));
        }
    }
    while (this.currNodes.element != this.currNodes.next.next.next.element) {

        this.advance(2);
        this.remove(this.currNodes.element);
        //       console.log("11");
    }
    this.show();
    this.dodisplay();

}
$(function () {
    var city = new LList();
    city.kill(10, 0);
    //   city.dodisplay();
    //var city = new LList();
    //for (var i = 1; i < 41; i++) {
    //    var now = "位置";
    //    if (i == 1) {
    //        city.insert("位置" + i, "head");
    //    }
    //    else {
    //        city.insert("位置" + i, now + (i - 1));
    //    }

    //}
    //  city.display();
    //   city.show();
    ////city.insert("北京", "head");
    ////city.insert("上海", "北京");
    ////city.insert("广州", "上海");
    ////city.insert("南京", "广州");
    ////city.insert("沈阳", "南京");
    ////city.insert("江苏", "沈阳");
    //city.insert("1", "head");
    //city.insert("2", "1");
    //city.insert("3", "2");
    //city.insert("4", "3");
    //city.insert("5", "4");
    //city.insert("6", "5");
    ////   city.display();
    //console.log("---------------------------------");
    //city.advance(2);
    //city.show();
    //city.advance(5);
    //city.show();
    //    city.display();
    //city.remove("广州");
    //   city.dispReverse();
});