const todoApp = () => {
  const todo_input = document.getElementById("todo_input");
  const todo_container = document.getElementById("todo_container");

  //# Checking Todos in local storage ?
  if (!localStorage.getItem("Todos")) {
    localStorage.setItem("Todos", JSON.stringify(new Array())); // if local storage empty, then add a empty array to local storage
  }

  //# Add Todos in local storage
  const addBtnFunc = () => {
    const addBtn = document.getElementById("addBtn");
    addBtn.addEventListener("click", () => {
      if (todo_input.length == 0) {
      }
      let currentTodos = JSON.parse(localStorage.getItem("Todos"));
      todo_input.value.length === 0
        ? todo_input.setAttribute("placeholder", "Add new tasks, please") &
          todo_input.focus() &
          todo_input.classList.add("newColor")
        : currentTodos.push({
            Title: todo_input.value,
          });
      todo_input.addEventListener("focusout", () => {
        todo_input.classList.remove("newColor");
        todo_input.placeholder = "Add your notes";
      });

      // const Elements = document.querySelectorAll("#singleElement");
      // console.log(Elements);
      localStorage.setItem("Todos", JSON.stringify(currentTodos));
      todo_input.value = "";

      loopTodos(); // after add a todo in local storage then again run loopTodos function
    });
  };

  //# Adding Todo in document from local storage
  const loopTodos = function () {
    let serial = 1;
    todo_container.innerHTML = "";
    let currentItems = JSON.parse(localStorage.getItem("Todos")); // geting Todos from local storage
    if (currentItems.length === 0) {
      todo_container.innerHTML = `
      
<div id="no-task-message" class="no-task-message">
  You currently have no tasks added. <br/> Please add a new task to get started.
</div>
`;
    }
    currentItems.forEach((element, index) => {
      console.log(element);

      // loop todos at local storage then add todos in document
      todo_container.innerHTML += `<div data-i=${index} class="" id="singleElement">
                        <div id="divText" class="">
                    <p class="taskNumber">Task number ${serial++} </p>
                    <div>${
                      element.Title.length === 0
                        ? (element.Title = "empty task")
                        : element.Title
                    } </div>               
                    </div>
                     <div class="" id="editDelete">
                       <button id="editBtn" >edit</button>
                       <button id="updateBtn" hidden>update</button>
                       <button id="cancelBtn" hidden>cancel</button>
                       <button id="delete2Btn">delete</button>
                     </div>
                     
                   </div>`;
    });

    deleteBtnFunc();
    editBtnFunc();
  };

  //# Delete all todos from local storge
  const deleteAllBtnFunc = () => {
    const deleteAllBtn = document.getElementById("deleteAll");
    deleteAllBtn.addEventListener("click", () => {
      let getLocal = localStorage.getItem("Todos");
      if (getLocal == "[]") {
        alert("Empty Storage, please add some tasks");
      }
      getLocal = [];
      localStorage.setItem("Todos", JSON.stringify(getLocal));
      loopTodos(); // again loop Todos in document
    });
  };

  //# edit Todos
  const editBtnFunc = () => {
    const singleElements = document.querySelectorAll("#singleElement");
    singleElements.forEach((singleElement) => {
      if (singleElement.innerText.length > 80) {
        singleElement.style.overflowX = "scroll";
      } else {
        singleElement.style.overflowX = "unset";
      }
      const updateBtns = singleElement.querySelectorAll("#updateBtn");
      const editBtns = singleElement.querySelectorAll("#editBtn");
      let getLocal = JSON.parse(localStorage.getItem("Todos"));
      let clickIndex = Number(singleElement.getAttribute("data-i"));
      updateBtns.forEach((updateBtn) => {
        editBtns.forEach((editBtn) => {
          editBtn.addEventListener("click", (e) => {
            todo_input.value = getLocal[clickIndex].Title;
            editBtn.style.display = "none";
            updateBtn.style.display = "block";
          });
        });
        updateBtn.addEventListener("click", () => {
          getLocal[clickIndex].Title = todo_input.value;
          localStorage.clear();
          localStorage.setItem("Todos", JSON.stringify(getLocal));
          loopTodos();
          todo_input.value = "";
        });
      });
    });
  };

  //# Delete Todos
  function deleteBtnFunc() {
    const singleElements = document.querySelectorAll("#singleElement");
    singleElements.forEach((singleElement) => {
      const deleteBtns = singleElement.querySelectorAll("#delete2Btn");
      deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", (e) => {
          let clickIndex = Number(singleElement.getAttribute("data-i"));
          let getLocal = JSON.parse(localStorage.getItem("Todos"));

          let newTodos = getLocal.filter((item, index) => {
            // why filter ? Ans : new array return kore and experience er shate shatee amra eta bujte parbo why filter
            return index !== clickIndex; // clickIndex badee baki index gulu return kore
          });

          localStorage.clear();
          localStorage.setItem("Todos", JSON.stringify(newTodos));
          loopTodos();
        });
      });
    });
  }

  //# Invoking all functions
  loopTodos();
  addBtnFunc();
  deleteAllBtnFunc();
  editBtnFunc();
};

todoApp();
