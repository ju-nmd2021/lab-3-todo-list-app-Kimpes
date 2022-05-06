window.addEventListener("load", onLoadHandler);

let userListElement;
let selectedUser;
let sessionUserArray;
let actionHalt = false;

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
    console.log(localStorage.userArray);
  }
  renderUserList();
}

//renders all users in the user bar
function renderUserList() {
  userListElement = document.getElementById("user-selector-grid");
  sessionUserArray = JSON.parse(localStorage.userArray);
  let addUserElement = document.getElementById("add-user");
  let deleteUserElement = document.getElementById("delete-user");

  //clear all previous elements to render them anew
  userListElement.innerHTML = "";

  //readd the delete button
  userListElement.appendChild(deleteUserElement);

  //fills user list with users
  for (let userObject of sessionUserArray) {
    let userElement = document.createElement("div");
    userElement.classList.add("user");
    userElement.innerText = userObject.name;

    //makes a user selected upon click and deselects previous user
    userElement.addEventListener("click", () => {
      if (selectedUser !== undefined) {
        let previouslySelectedUser = document.getElementById("selected");
        previouslySelectedUser.removeAttribute("id");
      }
      userElement.id = "selected";
      selectedUser = userElement;
      renderTaskList(userObject);
    });

    userListElement.appendChild(userElement);
  }

  //Remove add user button and re-add it to the end
  userListElement.appendChild(addUserElement);
  addUserElement.addEventListener("click", () => {
    spawnUserTypeField(addUserElement);
    updateLocalStorage();
  });

  updateLocalStorage();
}

function spawnUserTypeField(addUserElement) {
  if (actionHalt === false) {
    actionHalt = true;
    let newUserTextField = document.createElement("input");
    newUserTextField.placeholder = "Enter Name";
    let parentElement = addUserElement.parentNode;
    parentElement.appendChild(newUserTextField);
    parentElement.removeChild(addUserElement);

    let confirmNewUser = addUserElement;
    parentElement.appendChild(addUserElement);
    confirmNewUser.addEventListener("click", () => {
      let newUser;
      if (newUserTextField.value != "") {
        newUser = {
          name: newUserTextField.value,
          tasks: [],
        };
        sessionUserArray.push(newUser);
      }
      newUserTextField.value = "";
      updateLocalStorage();
      selectedUser = undefined;
      actionHalt = false;
      renderUserList();
    });
  }
}

//takes selected user and renders all their tasks
function renderTaskList(userobject) {
  let selectedUserTaskListElement = document.getElementById("task-list-grid");
  let addTaskElement = document.getElementById("add-task");
  selectedUserTaskListElement.innerHTML = "";

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
      updateLocalStorage();
    });
    taskElement.appendChild(taskCheckboxElement);

    let taskTitleElement = document.createElement("span");
    taskTitleElement.innerText = task.title;
    taskElement.appendChild(taskTitleElement);

    selectedUserTaskListElement.appendChild(taskElement);
  }

  //moves the add-task button to the end of the list
  selectedUserTaskListElement.appendChild(addTaskElement);

  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.userArray = JSON.stringify(sessionUserArray);
}
