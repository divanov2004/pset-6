let element = []
var addButton = document.getElementById("add_button");
var tableRow = document.getelementByClassName("row");
let priorityButton = document.getelementByClassName("priority_button");
let completeButton = document.getelementByClassName("complete_button");
let removeButton = document.getelementByClassName("remove_button");
let listToDo = document.getelementByClassName("to_do")

let element_prioritize;

window.onload = function() {
  document.getElementById("table").onmouseover = startup;
}

const create_item = function() {
  let input = document.getElementById("input_item").value;
  if (input === "") {

  }
  else {
      let to_do = {
          task: input,
          priority: false,
          complete: false,
          html_row: null,
          html_priority_button: null,
          html_text: null,
          html_remove_button: null
      }

      element.push(to_do);
      let index = element.indexOf(to_do);

      element[index].htmlRow = document.createElement("tr");
      element[index].htmlRow.setAttribute("class", "row");
      document.getElementById("table").append(element[index].htmlRow);

      element[index].htmlPriorityButton = document.createElement("td");
      element[index].htmlPriorityButton.setAttribute("class", "priority_button");
      element[index].htmlPriorityButton.innerHTML = "!";

      tableRow[index].append(element[index].htmlPriorityButton);

      element[index].htmlText = document.createElement("td");
      element[index].htmlText.innerHTML = element[index].task;
      element[index].htmlText.setAttribute("class", "to_do");

      tableRow[index].append(element[index].htmlText);

      element[index].htmlCompleteButton = document.createElement("td");
      element[index].htmlCompleteButton.innerHTML = "&#x2713;";
      element[index].htmlCompleteButton.setAttribute("class", "complete_button");

      tableRow[index].append(element[index].htmlCompleteButton);

      element[index].htmlRemoveButton = document.createElement("td");
      element[index].htmlRemoveButton.setAttribute("class", "remove_button");
      element[index].htmlRemoveButton.innerHTML = "X";

      tableRow[index].append(element[index].htmlRemoveButton);
    }
    document.getElementById("input_item").value = "";
};

const remove_item = function() {
  var removed = false;
  for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].onclick = function() {
        removed = true;
        let remove_element = tableRow[i];
        remove_element.remove();
        element.splice(i, 1);
    };
    if (removed) {
        break;
    }
  }
}

const finish_item = function() {
  var finish = false;
  for (let x = 0; x < completeButton.length; x++) {
    completeButton[x].onclick = function() {
       if (element[x].complete == false) {
         finish = true;
         listToDo[x].style.setProperty("text-decoration", "line-through");
         listToDo[x].style.backgroundColor = "#baff66";
         completeButton[x].style.backgroundColor = "#baff66";
         listToDo[x].style.color = "black";
         completeButton[x].style.color = "black";
         completeButton[x].style.borderColor = "black";
         element[x].complete = true;
       }
       else if (element[x].complete == true) {
         completeButton[x].style.backgroundColor = "black";
         completeButton[x].style.color = "#FC766AFF"
         completeButton[x].style.borderColor = "#FC766AFF"
         listToDo[x].style.setProperty("text-decoration", "none");
         listToDo[x].style.backgroundColor = "black";
         listToDo[x].style.color = "#FC766AFF";
         element[x].complete = false;
       }
     };
     if (finish) {
       break;
     }
  }
}

const prioritize_item = function() {
  var prioritize = false;
  for (let z = 0; z < priorityButton.length; z++) {
    priorityButton[z].onclick = function() {
      if (element[z].priority == false) {
        element_prioritize = tableRow[z]
        prioritize = true;
        priorityButton[z].style.backgroundColor = "#fff98a";
        priorityButton[z].style.color = "black";
        priorityButton[z].style.borderColor = "black";
        tableRow[0].before(element_prioritize);
        element[z].priority = true;

        const objectToMove = element[z];

        element.splice(z, 1);
        element.unshift(objectToMove);
        prioritize = true;
      }
      else if (element[z].priority) {
        element_prioritize = tableRow[z]
        priorityButton[z].style.backgroundColor = "black";
        priorityButton[z].style.color = "#FC766AFF";
        priorityButton[z].style.borderColor = "#FC766AFF";
        tableRow[element.length - 1].after(element_prioritize);
        element[z].priority = false;

        let element_move = element[z];
        element.splice(z, 1);
        element.push(element_move);
        prioritize = true;
      }
    };
    if (prioritize) {
      break;
    }
  }
}

const startup = function() {
  remove_item();
  finish_item();
  prioritize_item();
}

addButton.onclick = create_item

document.getElementById("input_item").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    document.getElementById("add_button").click();
  }
});
