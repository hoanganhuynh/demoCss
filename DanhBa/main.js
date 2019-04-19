var addPlace = document.getElementById('add-place');
var contents = document.getElementById('contents');
var items;
var url = 'http://localhost:3000/list/'

addPlace.addEventListener('click', place);
contents.addEventListener('click', run);

function place() {
    var newPlace = document.getElementById('place');
    newPlace.innerHTML = '<span>Name: </span><input id = "new-name"/></br><span>Phonenumbers: </span><input id="new-phonenumbers"/></br><button onclick="addData()">add</button>'
};

function run() {
    var button = event.target;
    var id = button.dataset.id;
    if(button.textContent == 'delete') {
        deleted(id)
    } else if (button.textContent == 'fix') {
        fix(id)
    }
}

function deleted(id) {
    axios.delete(url + id).then(function() {
        loadList();
    });
    return items;
};

function fix(id) {
    var selectId = 'add' + id;
    var result = document.getElementById(selectId);
    var item = items.filter(function(item) {
        return item.id == id
    });
    console.log(item)
    return result.innerHTML = "<input type='text' id='inputName" + id + "' value = " + item[0].name + "></br><input type='text' id='inputPhonenumbers" + id + "' value = " + item[0].phoneNumber + "> <button onclick='newAdd(" + id + ")'>update</button>" 
};

function newAdd(id) {
    var inputNameId = 'inputName' + id;
    var inputPhonenumbersId = 'inputPhonenumbers' + id
    var name = document.getElementById(inputNameId).value;
    var phoneNumber = document.getElementById(inputPhonenumbersId).value;
    var newObj = {
        name: name,
        phoneNumber: phoneNumber
    }
    axios.put(url + id, newObj).then(function() {
        loadList()
    });
    return items
}

function addData() {
    var data = {
        name: document.getElementById('new-name').value,
        phoneNumber: document.getElementById('new-phonenumbers').value
    }
    axios.post(url, data).then(function() {
        loadList();
        return items
    });
    document.getElementById('place').innerHTML = '<span>Find</span><input type="text" id="find" placeholder="search by phone numbers..."><button id = "add-place">add</button>'
    return items
}

function loadList() {
    axios.get(url).then(function(res) {
        items = res.data
        render(items);
        return items;
    });
    return items;
};

loadList();

function render(items) {
    result = items.map(function(item) {
        return '<li' + item.id + '>' + item.name + ': ' + item.phoneNumber 
        + " <button data-id = " + item.id + ">delete</button>"
        + " <button data-id = " + item.id + ">fix</button>"
        + "<div id='add" + item.id + "'></div>"
        + '</li>' 
    });
    return contents.innerHTML = result.join('')
}
