window.addEventListener("load", onLoadHandler);

//here I create the user array and fill it with a couple users
let userListElement;
let selectedUser;

function onLoadHandler() {
  if (localStorage.userArray === undefined) {
    localStorage.userArray = JSON.stringify([
      {
        name: "Stella",
        tasks: [
          {
            title: "feed the dog",
            completed: false,
          },
          {
            title: "Pet the dog",
            completed: false,
          },
          {
            title: "Take out the dog",
            completed: false,
          },
          {
            title: "Harvest the dog",
            completed: false,
          },
        ],
      },
      {
        name: "Bella",
        tasks: [
          {
            title: "Find a dog",
            completed: false,
          },
          {
            title: "Eat the dog",
            completed: false,
          },
        ],
      },
      {
        name: "Cruella Devilla",
        tasks: [
          {
            title: "Find a Bella",
            completed: false,
          },
          {
            title: "Eat the Bella",
            completed: false,
          },
        ],
      },
    ]);
  }
  renderUserList();
}

//renders all users in the user bar
function renderUserList() {
  userListElement = document.getElementById("user-selector-grid");
  let sessionUserArray = JSON.parse(localStorage.userArray);

  //fills user list with users
  for (let userObject of sessionUserArray) {
    let userElement = document.createElement("div");
    userElement.classList.add("user");
    userElement.innerText = userObject.name;

    //makes a user selected upon click and deselects previous user
    userElement.addEventListener("click", () => {
      if (selectedUser !== undefined) {
        removePreviousTaskList();
      }
      userElement.id = "selected";
      renderTaskList(userObject);
      selectedUser = userObject;
    });

    userListElement.appendChild(userElement);
  }

  //Remove add user button and readd it to the end
  let addUserElement = document.getElementById("add-user");
  console.log(addUserElement);
  addUserElement.parentNode.removeChild(addUserElement);
  userListElement.appendChild(addUserElement);
}

//takes selected user and renders all their tasks
function renderTaskList(userobject) {
  let selectedUserTaskListElement = document.getElementById("task-list-grid");

  for (let task of userobject.tasks) {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");

    let taskCheckboxElement = document.createElement("input");
    taskCheckboxElement.type = "checkbox";
    if (task.completed) {
      taskCheckboxElement.checked = true;
    }
    taskCheckboxElement.addEventListener("click", () => {
      if (task.completed) {
        task.completed = false;
      } else {
        task.completed = true;
      }
    });
    taskElement.appendChild(taskCheckboxElement);

    let taskTitleElement = document.createElement("span");
    taskTitleElement.innerText = task.title;
    taskElement.appendChild(taskTitleElement);

    selectedUserTaskListElement.appendChild(taskElement);
  }

  //moves the add-task button to the end of the list
  let addTaskElement = document.getElementById("add-task");
  addTaskElement.parentNode.removeChild(addTaskElement);
  selectedUserTaskListElement.appendChild(addTaskElement);
}

//removes the previous task list and deselects the user
function removePreviousTaskList() {
  let previousUserElement = document.getElementById("selected");
  previousUserElement.removeAttribute("id");
  let previousUserTaskList = document.getElementsByClassName("task");

  for (let i = previousUserTaskList.length - 1; i >= 0; i--) {
    let task = previousUserTaskList[i];
    task.parentNode.removeChild(task);
  }
}
