var myViewModel = {
    personName: 'Tables',
    personAge: 123
};

var initialData = [
    { tableId: "1", tableName: "XREF_C_COST_TYPES", numFields: "9",
        datafields: [{dFieldName: 'Field001 Head', dFieldValue: 'value 1 (hidden)'},{dFieldName: 'Field002 Head', dFieldValue: 'sdf'}]
    },
    { tableId: "2", tableName: "XREF_C_ICMP", numFields: "3"},
    { tableId: "3", tableName: "XREF_T_B_UNITS", numFields: "4", 
        datafields: [{dFieldName: 'Lagerenhet', dFieldValue: 'value 1 (hidden)'}, {dFieldName: 'Field2 Header', dFieldValue: 'sdf'}]
    }
];

var leftPaneListsModel = function(initData){
    /**
     * Handles the left listing of items
     */
    var self = this;
    self.tableslist = ko.observableArray(ko.utils.arrayMap(initData, function(tbl) {
        return { 
            tableId: tbl.tableId,
            tableName: tbl.tableName,
            numFields: tbl.numFields,
            datafields: tbl.datafields
        };
    }));
    
    // Add the form to the left table list
    self.addToList = function(obj){
        var _data_fields_list = [];
        console.debug( obj.datafields().length );
        for(var key in obj.datafields() ){
            if( obj.datafields().hasOwnProperty(key) ) {
                _data_fields_list.push( {dFieldName: obj.datafields()[key].dFieldName, dFieldValue: obj.datafields()[key].dFieldValue} );
            }
        }
        
        self.tableslist.sort(self.sortById);
        var lastId;
        // If tableId exists, please perform deletion logic on it before.
        for(var key in self.tableslist() ){
            if( obj.tableId() == self.tableslist()[key].tableId){
                // Manually removing by key.
                self.tableslist().splice(key, 1);
            }
            lastId = self.tableslist()[key].tableId;
        }
        
        if(obj.tableId() == ''){
            var insertTableId = (++lastId);
        } else {
            var insertTableId = obj.tableId();
        }
    
        self.tableslist.push({
            tableId: insertTableId,
            tableName: obj.tableName(),
            numFields: obj.numFields_selected(),
            datafields: _data_fields_list
        });
        self.tableslist.sort(self.sortLogic);
        
        //obj.tableName('');
    };
    
    self.removeFromList = function(obj) {
        self.tableslist.remove(obj);
    }
    
    self.sortLogic = function(l, r){
        return l.tableName.toLowerCase() > r.tableName.toLowerCase() ? 1 : -1;
    }
    self.sortById = function(l, r){
        return l.tableId > r.tableId ? 1 : -1;
    }
    
    
    self.editTable = function(obj){
        //console.debug('Edit Table.' + obj);
        //console.debug(obj);
        
        tableModelInstance.tableId(obj.tableId);
        tableModelInstance.tableName(obj.tableName);
        tableModelInstance.numFields_selected(obj.numFields);
        
        
        tableModelInstance.datafields.removeAll();
        // Load the field data
        for(key in obj.datafields){
            //console.debug(obj.datafields[key])
            tableModelInstance.datafields.push({
                dFieldName: obj.datafields[key].dFieldName,
                dFieldValue: obj.datafields[key].dFieldValue
            });
        }
        
        
        //console.debug(obj.datafields);
    };
    self.save = function() {
        self.lastSavedJson(JSON.stringify(ko.toJS(self.tableslist), null, 2));
    };
 
    self.lastSavedJson = ko.observable("");
};

var leftPaneInstance = new leftPaneListsModel(initialData);


/**
 * New Table Add/Edit Form
 */
var tableModel = function(){
    var self = this;
    
    this.tableId = ko.observable("");
    this.tableName = ko.observable("");
    //this.numFields = ko.observable("3");
    this.numFields = ko.observableArray(['1','2','3','4','5','6','7','8','9','10','11']);
    this.numFields_selected = ko.observable("");
    this.createdWhen = '';

    // Field headers, Column Names.
    this.datafields = ko.observableArray(ko.utils.arrayMap(null, function(field) {
        return { 
            dFieldName: field.name,
            dFieldValue: field.value
        };
    }));
    
    this.tableRows = ko.observableArray();
    this.tableRows = [
        {cells:[
            {cellval:'free1'},
            {cellval:'free2'},
            {cellval:'free4'},
        ]},
        {cells:[
            {cellval:'2free1'},
            {cellval:'2free2'},
            {cellval:'2free4'},
        ]}
    ];
    
    // Use this when loading a table
    //this.datafields([{dFieldName: 'Name Test 1', dFieldValue: 'sdf'},{dFieldName: 'Name Test 2', dFieldValue: 'sdf'}]);
    
    self.appendField = function(){
        
        self.datafields.push({
            dFieldName: 'testset',
            dFieldValue: '3'
        });
    };
    
    self.appendRow = function(){
        console.debug('Adding a row');
    };
        
    this.addTable = function(){
        console.debug( this.tableName() );
        var ntm = new tableModel();
        //ntm.tableName = 'new shit';
        leftPaneInstance.addToList(self);
        
        // Reset the form
        self.tableId('');
        self.tableName('');
        self.numFields_selected('');
        tableModelInstance.datafields.removeAll();
        //console.debug(  );
    }
    
};

var tableModelInstance = new tableModel();