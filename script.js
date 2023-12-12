  $(document).ready(function () {
    //itemIndex used to connect label and checkbox
    let itemIndex = 0;
    if (localStorage.getItem("itemIndex") != null) {
      itemIndex = localStorage.getItem("itemIndex");
    };

    //taskArray used to save and retrieve tasks from local storage
    let taskArray = [];
    if (localStorage.getItem("taskArray") != null) {
      taskArray = JSON.parse(localStorage.getItem("taskArray"));
    }

    //Loops through taskArray and adds saved tasks to list
    function initializeList() {
      taskArray.forEach((task) => {
        //Creates all the elements needed for a new row
        let newListRow = document.createElement("div");
        let newListItem = document.createElement("label");
        let newCheckBox = document.createElement("input");
        let newTrash = document.createElement("button");
        let newLineBreak = document.createElement("hr")
        newListRow.classList.add("listRow");

        //Links the label and checkbox together making the label clickable
        newCheckBox.setAttribute("id", task.id);
        newListItem.setAttribute("for", task.id);
        newCheckBox.setAttribute("type", "checkbox");
        newListItem.textContent = task.label;
        newTrash.classList.add("trashCan");
        newLineBreak.classList.add("lineBreak");
        $(newListRow).append(newCheckBox);
        $(newListRow).append(newListItem);
        $(newListRow).append(newTrash);
        $(newListRow).append(newLineBreak);
        $("#list").append(newListRow);
      })
    }

    //Listens for ENTER to be pressed in input field, if ENTER is pressed the addTask function is run
    $("#new").keydown(function (e) {
        if (e.which == 13){
          addTask();
        }
    });

    //If button addTask is pressed the addTask function is run
    $("#addTask").click(function (e) {
      addTask(); 
      e.preventDefault();
      
    });

    //Creates a <label> element with text from the input field and a checkbox then appends it to div "list"
    function addTask(){
      if ((checkIfEmpty($("#new").val()))) {
        //Creates all the elements needed for a new row
        let newListRow = document.createElement("div");
        let newListItem = document.createElement("label");
        let newCheckBox = document.createElement("input");
        let newTrash = document.createElement("button");
        let newLineBreak = document.createElement("hr")
        newListRow.classList.add("listRow");

        //Links the label and checkbox together making the label clickable
        newCheckBox.setAttribute("id", itemIndex);
        newListItem.setAttribute("for", itemIndex);
        itemIndex++;
        localStorage.setItem("itemIndex",itemIndex);
        newCheckBox.setAttribute("type", "checkbox");
        newListItem.textContent = $("#new").val();
        newTrash.classList.add("trashCan");
        newLineBreak.classList.add("lineBreak");
        $(newListRow).append(newCheckBox);
        $(newListRow).append(newListItem);
        $(newListRow).append(newTrash);
        $(newListRow).append(newLineBreak);
        $("#list").append(newListRow);

        //Saves new task to local storage
        let taskObj = {"id":newCheckBox.getAttribute("id"), "label":newListItem.textContent};
        taskArray.push(taskObj);
        localStorage.setItem("taskArray", JSON.stringify(taskArray));

        //Clears input field after inputting a new list item
        document.getElementById("new").value = "";
      } else {
        alert("Task can not be empty, please fill in a task.");
      }
    }

    //Checks if string is empty or just whitespace
    function checkIfEmpty(str) {
      return str.trim().length;
    }

    //Deletes row when trash can is clicked and removes task from taskArray
    $(document).on("click", ".trashCan", function() {
      let deletedTaskID = this.parentNode.firstChild.id
      taskArray = taskArray.filter(function(task) {
        return task.id != deletedTaskID;
      })
      localStorage.setItem("taskArray", JSON.stringify(taskArray));
      this.parentNode.remove();
    });

    //Function that returns a string with the date using javascript's date object
    function getDate(){
      let currentDate = new Date();
      let currentDay = currentDate.getDate();
      const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      let currentDayOfTheWeek = weekDays[currentDate.getDay()];
      let currentMonth = currentDate.getMonth() + 1;
      let currentYear = currentDate.getFullYear();
      let dateString = currentDayOfTheWeek + ", " + currentDay + "/" + currentMonth + "/" + currentYear;
      document.getElementById("currentDate").innerHTML = dateString;
    }
    //Calls the getDate function when the page loads and then continues to call the function every second so that the date will update when it changes
    getDate();
    setInterval(getDate, 1000);

    initializeList();

  });

  