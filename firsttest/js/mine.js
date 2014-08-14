var myViewModel = {
    personName: 'Bob',
    personAge: 123
};

var initialData = [
    { tableName: "first Table", numFields: "3"
    },
    { tableName: "Xref2_x_tbl", numFields: "4"
    }
];

var leftPaneListsModel = function(initData){
    /**
     * Handles the left listing of items
     */
    var self = this;
    self.tableslist = ko.observableArray(ko.utils.arrayMap(initData, function(tbl) {
        return { 
            tableName: tbl.tableName,
            numFields: tbl.numFields
        };
    }));
    
    self.addToList = function(tblObj){
        self.tableslist.push({
            tableName: tblObj.tableName,
            numFields: tblObj.numFields
        });
        self.tableslist.sort(self.sortLogic);
        
        console.debug(self.tableslist.length);
    };
    
    self.sortLogic = function(l, r){
        return l.tableName.toLowerCase() > r.tableName.toLowerCase() ? 1 : -1;
    }
    
    self.removeFromList = function(){
    
    };
    self.save = function() {
        self.lastSavedJson(JSON.stringify(ko.toJS(self.tableslist), null, 2));
    };
 
    self.lastSavedJson = ko.observable("");
};

var leftPaneInstance = new leftPaneListsModel(initialData);

var tableModel = function(){
    var self = this;
    
    this.tableName = '';
    this.numFields = 3;
    this.createdWhen = '';
    
    this.fields = ko.observableArray(ko.utils.arrayMap(null, function(field) {
        return { 
            name: field.name,
            value: field.value
        };
    }));
        
    this.addTable = function(){
        console.debug( this.tableName );
        var ntm = new tableModel();
        //ntm.tableName = 'new shit';
        leftPaneInstance.addToList(this);
        console.debug(leftPaneListsModel)//.addToList(ntm);
        //leftPaneListsModel
    }
};

