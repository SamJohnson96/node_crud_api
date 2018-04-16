// Require the library express
var express = require("express");
// Assign library to app variable
var app = express();

// Require body parser
var bodyParser = require("body-parser");
// Express use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set port and create router using express.
var port = process.env.port || 3000;
var router = express.Router();

// Use router and set address
app.use('/api/contacts', router);

// Validation method that checks to see if contact is valid.
function isValidContact(contact){
    if(!contact.Id){
        return false;
    }
    if(!contact.FirstName){
        return false;
    }
    if(!contact.LastName){
        return false;
    }
    if(!contact.Job){
        return false;
    }
    return true;
}

// Get all contacts using a GET request.
router.get("/",function (req,res){
    res.json(contacts);
});

// Get a specific contact using GET request and use an ID as a parameter in a URL.
router.get("/:Id",function(req,res){
    var contactId = parseInt(req.params.Id);
    var currentContact = contacts.filter(c=>c.Id==contactId)[0];

    if(currentContact){
        res.json(currentContact);
    }else{
        res.sendStatus(404);
    }
});

// Add a contact to the contact book
router.post("/", function (req,res) {
    var contact = req.body;
    var isValid = isValidContact(contact);
    if(isValid){
        contacts.push(contact);
        res.send(contact);
    } else{
        res.sendStatus(500);
    }
});

// Edit a contact in the contact book
router.put("/:Id",function (req,res) {
    var contactId = parseInt(req.params.Id);
    var currentContact = contacts.filter(c=>c.Id==contactId)[0];
    if(currentContact){
        let contact = req.body;
        var isValid = isValidContact(contact);
        if(isValid){
            currentContact.FirstName = contact.FirstName;
            currentContact.LastName = contact.FirstName;
            currentContact.Job = contact.Job;
            res.sendStatus(204);
        }else{
            res.sendStatus(500);
        }
    }else{
        res.sendStatus(404);
    }
});

// Delete a contact
router.delete("/:Id", function(req,res){
    var contactId = parseInt(req.params.Id);
    var currentContact = contacts.filter(c=>c.Id==contactId)[0];
    if(currentContact){
        contacts = contacts.filter(e=>e.Id!=contactId);
        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
});


var contacts= [
    {
        Id: 1,
        FirstName: "Foo",
        LastName: "Bar",
        Job: "Foo-Bar"
    }
];


console.log('Listening to port 3000')
app.listen(port);
