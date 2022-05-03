window.addEventListener("load", onLoadHandler);

//here I create the user array and fill it with a couple users
let userListElement;
let selectedUser;
let userArray = [
  {
    name: "Stella",
    tasks: [
      "Feed the dog",
      "Pet the dog",
      "Take out the dog",
      "Harvest the dog",
    ],
  },
  {
    name: "Bella",
    tasks: ["Find a dog", "Eat the dog"],
  },
  (user3 = {
    name: "Cruella Devilla",
    tasks: ["Find a Bella", "Eat the Bella"],
  }),
];

function onLoadHandler() {
  renderUserList();
  console.log(userListElement);
}

function renderUserList() {
  userListElement = document.getElementById("user-selector-grid");

  //fills user list with users
  for (let userObject of userArray) {
    let userElement = document.createElement("div");
    userElement.classList.add("user");
    userElement.innerText = userObject.name;
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

function renderTaskList(userobject) {
  let selectedUserTaskListElement = document.getElementById("task-list-grid");

  for (let task of userobject.tasks) {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");

    let taskCheckboxElement = document.createElement("input");
    taskCheckboxElement.type = "checkbox";
    taskElement.appendChild(taskCheckboxElement);

    let taskTitleElement = document.createElement("span");
    taskTitleElement.innerText = task;
    taskElement.appendChild(taskTitleElement);

    selectedUserTaskListElement.appendChild(taskElement);
  }

  let addTaskElement = document.getElementById("add-task");
  addTaskElement.parentNode.removeChild(addTaskElement);
  selectedUserTaskListElement.appendChild(addTaskElement);
}

function removePreviousTaskList() {
  let previousUserElement = document.getElementById("selected");
  previousUserElement.removeAttribute("id");
  let previousUserTaskList = document.getElementsByClassName("task");
  console.log(previousUserTaskList);

  for (let i = previousUserTaskList.length - 1; i >= 0; i--) {
    let task = previousUserTaskList[i];
    task.parentNode.removeChild(task);
  }
}
