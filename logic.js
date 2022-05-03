window.addEventListener("load", onLoadHandler);

//here I create the user array and fill it with a couple users
let userListElement;
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
  for (let user of userArray) {
    let userElement = document.createElement("div");
    userElement.classList.add("user");
    userElement.innerText = user.name;
    // userElement.addEventListener("click", () => {
    //     userElement.id.add("selected");
    // });
    userListElement.appendChild(userElement);
  }

  //Remove add user button and readd it to the end
  let addUserElement = document.getElementById("add-user");
  console.log(addUserElement);
  addUserElement.parentNode.removeChild(addUserElement);
  userListElement.appendChild(addUserElement);
}

function renderTaskList(user) {}
