//SELECT THE ELEMENTS

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//CLASS NAME
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

//VARIABLES
let LIST, id;

//GET FROM LOCAL STORAGE
let data = localStorage.getItem("TODO");

//IF DATA IS EMPTY
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one of the list
    loadList(LIST); // load the list
}else{
    //IF DATA IS NOT EMPTY
    LIST = [];
    id = 0;
}

//LOAD THE LIST
function loadList(items){
    items.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


//SHOW TODAY'S DATE
const options = { weekday : "long", month : "short", day : "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//ADD TO_DO FUNCTION

function addToDo(toDo, id, done, trash){
    if(trash){
        return;
    }

    const DONE = done ? check : uncheck;
    const LINE = done ? line_through : "";

    const item = `
            <li class = "item">
                <i class="fa ${DONE} co" job="complete" id=${id}></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id=${id}></i>
            </li>`;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//ADD AN ITEM
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        //If the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //ADD TO LOCAL STORAGE
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

//COMEPLETE TODO
function completeTodo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//REMOVE TODO
function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true;
}

//TARGET THE ITEMS CREATED DYNAMICALLY
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeTodo(element);
    }else if(elementJob == "delete"){
        removeTodo(element);
    }

    //ADD TO LOCAL STORAGE
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

//REFRESH THE WHOLE LIST

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})
