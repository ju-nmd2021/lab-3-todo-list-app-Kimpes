window.addEventListener("load", onLoadHandler);

let userListElement;
let selectedUserObject;
let sessionUserArray;
let actionHalt = false;
let addTaskElement;

function onLoadHandler() {
  if (localStorage.userArray === undefined) {
    localStorage.userArray = JSON.stringify([
      { name: "All Users", tasks: [] },
      {
        name: "Stella",
        tasks: [
          {
            title: "Feed the dog",
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
  addTaskElement = document.getElementById("add-task");
  renderUserList();
}

//renders all users in the user bar
function renderUserList() {
  userListElement = document.getElementById("user-selector-grid");
  sessionUserArray = JSON.parse(localStorage.userArray);
  let addUserElement = document.getElementById("add-user");
  let deleteUserElement = document.getElementById("delete-user");
  // let viewAllUsersElement = document.getElementById("all-users");

  //clear all previous elements to render them anew
  userListElement.innerHTML = "";

  //re-add the delete button
  userListElement.appendChild(deleteUserElement);
  deleteUserElement.addEventListener("click", () => {
    if (
      selectedUserObject !== undefined &&
      selectedUserObject.name !== "All Users"
    ) {
      deleteSelectedUser(selectedUserObject);
      renderUserList();
    }
  });

  //re-add the view all users button
  // userListElement.appendChild(viewAllUsersElement);

  //fills user list with users
  for (let userObject of sessionUserArray) {
    let userElement = document.createElement("div");
    userElement.classList.add("user");
    if (userObject.name === "All Users") {
      userElement.classList.add("all-users");
    }
    userElement.innerText = userObject.name;

    //makes a user selected upon click and deselects previous user
    userElement.addEventListener("click", () => {
      if (selectedUserObject !== undefined) {
        let previouslySelectedUser = document.getElementById("selected");
        previouslySelectedUser.removeAttribute("id");
      }
      userElement.id = "selected";
      selectedUserObject = userObject;
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

//deleting a selected user. removing it from the user array
function deleteSelectedUser(user) {
  if (user.name !== "All Users") {
    selectedUserObject = undefined;
    let userIndex = sessionUserArray.indexOf(user);
    sessionUserArray.splice(userIndex, 1);
    updateLocalStorage();
  }
}

//spawns a name input for new user and also confirms the new user
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

    //event for confirming new user and adding them to the array
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
      selectedUserObject = undefined;
      actionHalt = false;
      renderUserList();
    });
  }
}

//takes selected user and renders all their tasks
function renderTaskList(userObject) {
  let selectedUserTaskListElement = document.getElementById("task-list-grid");
  selectedUserTaskListElement.innerHTML = "";

  let usersToRender = [];
  let isAllUsers = false;

  if (userObject.name !== "All Users") {
    usersToRender.push(userObject);
  } else {
    usersToRender = sessionUserArray;
    isAllUsers = true;
  }

  //cycles through all tasks and makes an element for each of them
  for (let userToRender of usersToRender) {
    for (let task of userToRender.tasks) {
      let taskElement = document.createElement("div");
      taskElement.classList.add("task");

      let taskCheckboxElement = document.createElement("input");
      taskCheckboxElement.type = "checkbox";
      if (task.completed) {
        taskCheckboxElement.checked = true;
      }

      //updates the value of the tickbox in the user object
      taskCheckboxElement.addEventListener("click", () => {
        if (task.completed) {
          task.completed = false;
        } else {
          task.completed = true;
        }
        updateLocalStorage();
      });
      taskElement.appendChild(taskCheckboxElement);

      //adds the title of the task
      let taskTitleElement = document.createElement("span");
      taskTitleElement.innerText = task.title;
      if (isAllUsers) {
        taskTitleElement.innerText += " (" + userToRender.name + ")";
      }
      taskElement.appendChild(taskTitleElement);

      //removes the task if you press it

      taskTitleElement.addEventListener("click", () => {
        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1);
        renderTaskList(userToRender);
      });

      selectedUserTaskListElement.appendChild(taskElement);
    }
  }

  //Spawns a new input for task title input
  if (userObject.name !== "All Users") {
    addTaskElement.addEventListener("click", () => {
      spawnTaskTypeField(addTaskElement);
      updateLocalStorage();
    });
    selectedUserTaskListElement.appendChild(addTaskElement);
  }
  updateLocalStorage();
}

//Spawns the text field for the new task
function spawnTaskTypeField(addTaskElement) {
  if (actionHalt === false) {
    actionHalt = true;
    let newTaskFieldElement = document.createElement("input");
    newTaskFieldElement.placeholder = "Enter task";
    let parentElement = addTaskElement.parentNode;
    parentElement.appendChild(newTaskFieldElement);
    parentElement.removeChild(addTaskElement);
    let confirmNewTask = addTaskElement;
    parentElement.appendChild(addTaskElement);

    //when you press the plus again, you confirm the task
    confirmNewTask.addEventListener("click", () => {
      let newTask;
      if (newTaskFieldElement.value != "") {
        newTask = {
          title: newTaskFieldElement.value,
          completed: false,
        };
        selectedUserObject.tasks.push(newTask);
      }
      newTaskFieldElement.value = "";
      actionHalt = false;
      updateLocalStorage();
      renderTaskList(selectedUserObject);
    });
  }
}

//updates local storage so that it can be the one source of truth
function updateLocalStorage() {
  localStorage.userArray = JSON.stringify(sessionUserArray);
}
