let elements = []
var addButton = document.getElementById("add_button");
var tableRow = document.getElementsByClassName("row");
let priorityButton = document.getElementsByClassName("priority_button");
let completeButton = document.getElementsByClassName("complete_button");
let removeButton = document.getElementsByClassName("remove_button");
let listItem = document.getElementsByClassName("to_do")

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

      elements.push(to_do);
      let index = elements.indexOf(to_do);

      elements[index].htmlRow = document.createElement("tr");
      elements[index].htmlRow.setAttribute("class", "row");
      document.getElementById("table").append(elements[index].htmlRow);

      elements[index].htmlPriorityButton = document.createElement("td");
      elements[index].htmlPriorityButton.setAttribute("class", "priority_button");
      elements[index].htmlPriorityButton.innerHTML = "!";

      tableRow[index].append(elements[index].htmlPriorityButton);

      elements[index].htmlText = document.createElement("td");
      elements[index].htmlText.innerHTML = elements[index].task;
      elements[index].htmlText.setAttribute("class", "to_do");

      tableRow[index].append(elements[index].htmlText);

      elements[index].htmlCompleteButton = document.createElement("td");
      elements[index].htmlCompleteButton.innerHTML = "&#x2713;";
      elements[index].htmlCompleteButton.setAttribute("class", "complete_button");

      tableRow[index].append(elements[index].htmlCompleteButton);

      elements[index].htmlRemoveButton = document.createElement("td");
      elements[index].htmlRemoveButton.setAttribute("class", "remove_button");
      elements[index].htmlRemoveButton.innerHTML = "X";

      tableRow[index].append(elements[index].htmlRemoveButton);
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
        elements.splice(i, 1);
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
       if (elements[x].complete == false) {
         finish = true;
         listItem[x].style.setProperty("text-decoration", "line-through");
         listItem[x].style.backgroundColor = "#baff66";
         completeButton[x].style.backgroundColor = "#baff66";
         listItem[x].style.color = "black";
         completeButton[x].style.color = "black";
         completeButton[x].style.borderColor = "black";
         elements[x].complete = true;
       }
       else if (elements[x].complete == true) {
         completeButton[x].style.backgroundColor = "black";
         completeButton[x].style.color = "#A4FFA4"
         completeButton[x].style.borderColor = "#A4FFA4"
         listItem[x].style.setProperty("text-decoration", "none");
         listItem[x].style.backgroundColor = "black";
         listItem[x].style.color = "#A4FFA4";
         elements[x].complete = false;
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
      if (elements[z].priority == false) {
        element_prioritize = tableRow[z]
        prioritize = true;
        priorityButton[z].style.backgroundColor = "#fff98a";
        priorityButton[z].style.color = "black";
        priorityButton[z].style.borderColor = "black";
        tableRow[0].before(element_prioritize);
        elements[z].priority = true;

        const objectToMove = elements[z];

        elements.splice(z, 1);
        elements.unshift(objectToMove);
        prioritize = true;
      }
      else if (elements[z].priority) {
        element_prioritize = tableRow[z]
        priorityButton[z].style.backgroundColor = "black";
        priorityButton[z].style.color = "#A4FFA4";
        priorityButton[z].style.borderColor = "#A4FFA4";
        tableRow[elements.length - 1].after(element_prioritize);
        elements[z].priority = false;

        let element_move = elements[z];
        elements.splice(z, 1);
        elements.push(element_move);
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
