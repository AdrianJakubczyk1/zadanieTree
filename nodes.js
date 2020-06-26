class Node {
    constructor(id, name, parentID) {
        //private property name
        var _name = name;
        this.setName = function(name) {
            _name = name;
        };
        this.getName = function() {
            return _name;
        };

        //private property id

        var _id = id;
        this.setID = function(id) {
            _id = id;
        };
        this.getID = function() {
            return _id;
        };
        //private property parentID
        var _parentID = parentID;

        this.setparentID = function(parentID) {
            _parentID = parentID;
        };

        this.getparentID = function() {
            return _parentID;
        };
    }
}