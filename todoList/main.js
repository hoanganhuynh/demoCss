var contents = document.getElementById('contents');
var newTodo = document.getElementById('new-todo');
var addNew = document.getElementById('add');
var url = 'http://localhost:3000/todo/';
var items;

function loadMenu() {
    axios.get(url).then(function(res) {
        items = res.data;
        console.log(items);
        render(items);
        return items;
    });
    return items
};

loadMenu();

addNew.addEventListener('click', add);
contents.addEventListener('click', runEffect);

function add() {
    var newContent = newTodo.value;
    obj = {
        content: newContent
    };
    items.push(obj);
    render(items);
    newTodo.value = '';
    axios.post(url, obj).then(function(res) {
        console.log(res.data)
    });
};

function runEffect() {
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
        loadMenu()
    });
    return items
};

function fix(id) {
    var selectId = 'add' + id
    var result = document.getElementById(selectId);
    return result.innerHTML = "<input type='text' id='input" + id + "'> <button onclick='newAdd(" + id + ")'>update</button>" 
};

function newAdd(id) {
    var inputId = 'input' + id;
    var value = document.getElementById(inputId).value;
    var newObj = {
        content: value
    }
    axios.put(url + id, newObj).then(function() {
        loadMenu()
    });
    return items
}

function render(items) {
    var result = items.map(function(item) {
        return "<li>" + item.content 
        + " <button data-id = " + item.id + ">delete</button>" 
        + " <button data-id = " + item.id + ">fix</button>" 
        + "<div id='add" + item.id + "'></div>"
        +"</li>"
    });
    return contents.innerHTML = result.join('')
};


