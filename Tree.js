class Tree {
    //initialize properties.
    constructor() {
        this.nodes = [];
        this.id = 0;
    }

    //method that returns copy of current stored nodes
    getCurrentNodes() {
        let clone = [...this.nodes];
        return clone;
    }

    //method that adds new node to Tree
    addNode(name, parentID = 0) {
        if (this.validateName(name)) {
            this.id += 1;
            let newNode = new Node(this.id, name, parentID);
            this.nodes.push(newNode);
            return true;
        } else return false;
    }

    //method that prepares nodes to be displayed
    displayTree(parentID = 0) {
        let result = [];
        for (let node of this.nodes) {
            if (node.getparentID() == parentID) {
                result.push(node);
            }
        } //end of for loop

        let output = [];
        for (let node of result) {
            let subArray = {
                text: undefined,
                nodes: [],
            };
            subArray["text"] = node.getName();

            subArray["nodes"] = this.displayTree(node.getID());

            output.push(subArray);
        }
        return output;
    }

    //method returning all nodes in proper format to display in bootstrap-treeview
    display() {
        let data;
        for (let node of this.nodes) {
            if (node.getparentID() == 0) {
                data = this.displayTree(node.getparentID());
                break;
            }
        }
        return data;
    }

    //method that deletes node
    deleteNode(id) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].getID() == id) {
                this.nodes.splice(i, 1);
            }
        }
        return true;
        //this.nodes = this.nodes.filter((value) => value != id);
    }

    //method that look for childs of node
    lookForChilds(id) {
        for (let node of this.nodes) {
            if (node.getparentID() == id) return true;
        }
        return false;
    }

    //method that returns childs of node
    getChilds(id) {
        let result = [];
        for (let node of this.nodes) {
            if (node.getparentID() == id) result.push(node);
        }
        return result;
    }

    //method that deletes nodes and its childs
    deleteIfPossible(idToDelete) {
        if (!this.lookForChilds(idToDelete)) {
            this.deleteNode(idToDelete);
            return "the category has been deleted";
        } else {
            let nodes = [];
            nodes = this.getChilds(idToDelete);

            for (let node of nodes) {
                this.deleteNode(idToDelete);
                this.deleteIfPossible(node.getID());
            }
        }
    }

    //method that moves node to other branch
    moveCategoryTo(idToMove, destinationID) {
        var nodeToMove;
        var destination;
        nodeToMove = this.findNode(idToMove);
        destination = this.findNode(destinationID);
        if (
            nodeToMove.getparentID() == destinationID ||
            nodeToMove.getID() == destination.getparentID()
        ) {
            return;
        }
        if (idToMove == destination.getID()) {
            return;
        }
        nodeToMove.setparentID(destinationID);
        return true;
    }

    //changing order method
    changeOrder(idToChangeOrder, up, toWhichMoveDown = null) {
        var nodeToChange;
        for (let node of this.nodes) {
            if (node.getID() == idToChangeOrder) {
                nodeToChange = node;
                break;
            }
        }
        if (nodeToChange.getparentID() == 0 && up)
            return "sorry but seem like the category is already on the top";

        if (!this.lookForChilds(idToChangeOrder) && !up)
            return "sorry but this category cannot go anymore down";

        let parent = nodeToChange.getparentID();

        for (let node of this.nodes) {
            if (node.getID() == parent) {
                parent = node;
                break;
            }
        }
        if (up) nodeToChange.setparentID(parent.getparentID());
        else {
            let childs = this.getChilds(idToChangeOrder);

            if (childs != undefined) {
                for (let child of childs) {
                    child.getID() != toWhichMoveDown ?
                        child.setparentID(toWhichMoveDown) :
                        child.setparentID(nodeToChange.getparentID());
                }
                nodeToChange.setparentID(toWhichMoveDown);
            } else return "cannot move anymore down";
        }
    }

    //method that maps whole branch of selected node
    findTheBranchOfSelected(id) {
            let chosenNode;
            let branch = [];
            let resultDown = [];
            var arr = [];
            var resultUp = [];

            for (let node of this.nodes) {
                if (node.getID() == id) {
                    chosenNode = node;
                }
            }
            if (this.lookForChilds(id)) {
                branch = this.getChilds(id);
                for (let element of branch) {
                    resultDown = this.mapTheBranchDown(element.getID(), arr);
                }
            }
            var wholeBranch = [];
            if (chosenNode.getparentID() == 0) {
                resultUp.push(0, chosenNode.getID());
                wholeBranch = resultUp.concat(resultDown);
            } else {
                resultUp.push(chosenNode.getID());
                resultUp.push(this.mapTheBranchUp(chosenNode.getparentID(), resultUp));
            }

            if (wholeBranch) return (wholeBranch = resultUp.concat(resultDown));
            else return resultDown;
        }
        //function that maps whole branch moving down from chosen element
    mapTheBranchDown(id, arr) {
            arr.push(id);
            if (this.lookForChilds(id)) {
                var childs = this.getChilds(id);
                for (let child of childs) {
                    this.mapTheBranchDown(child.getID(), arr);
                }
            }
            return arr;
        }
        //function that maps whole branch moving up from chosen element
    mapTheBranchUp(id, arr) {
        arr.push(id);
        let node = this.findNode(id);
        if (node.getparentID == 0) {
            arr.push(0, node.getparentID());
            return arr;
        } else {
            arr.push(node.getparentID());
            return arr;
        }
    }

    //find one single node
    findNode(id) {
        for (let node of this.nodes) {
            if (node.getID() == id) {
                return node;
            }
        }
    }

    //checks if name is unique
    validateName(name) {
        for (let node of this.nodes) {
            if (name === node.getName()) {
                return false;
            }
        }
        return true;
    }
}

/*
 *
 **
 *
 *
 *
 */