
var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.computed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);
};

var myViewModel = {
    personName: 'Bob',
    personAge: 123
};


//ko.applyBindings(new ViewModel("Planet", "Earth")); // This makes Knockout get to work

//ko.applyBindings(myViewModel); // This makes Knockout get to work

var people = [
    { firstName: 'Bert', lastName: 'Bertington' },
    { firstName: 'Charles', lastName: 'Charlesforth' },
    { firstName: 'Denise', lastName: 'Dentiste' }
];

