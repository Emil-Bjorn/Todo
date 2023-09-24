  $(document).ready(function () {
    //itemIndex used to connect label and checkbox
    let itemIndex = 0;
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
        let newListItem = document.createElement("label");
        let newCheckBox = document.createElement("input");
        //Creates a dividing line under each list item
        let newLineBreak = document.createElement("hr")
        //Links the label and checkbox together making the label clickable
        newCheckBox.setAttribute("id", itemIndex);
        newListItem.setAttribute("for", itemIndex);
        itemIndex++;
        newCheckBox.setAttribute("type", "checkbox");
        newLineBreak.classList.add("lineBreak");
        newListItem.textContent = $("#new").val();
        $("#list").append(newCheckBox);
        $("#list").append(newListItem);
        $("#list").append(newLineBreak);

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

  });

  