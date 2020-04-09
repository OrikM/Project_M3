
const addToList = () => {                   // function that adds the created and 'designed' li to the end of UL    
  const li = document.createElement("li");  //variable that creates element li inside of HTML document;
  li.innerHTML = inputLine;                 // putting the value of global variable 'inputLine' into the li element that was created;

  li.querySelector('.gray-delete')                      // selecting the element with the class 'gray-delete' 
  .addEventListener('click', deleteFromList);           // and calling the function deleteFormList() in case of the event 'click'

  li.querySelector('div:first-child div:first-child')   // selecting the first child of the first child of the element li  
  .setAttribute('draggable', true);                     // and setting the attribute 'draggable', which is set as true.

  li.classList.add('list-hover');                       //adding the class to the element li
  li.addEventListener('dragstart', (e) => {     //in case of start of the drag 
      const dragLi = e.target.parentElement.parentElement; 
      dragLi.classList.add('dragging');         //the class 'dragging' is added to the parent's parent element of the targeted element
  });
  li.addEventListener('dragend', (e) => {   //in case of end of the drag 
    const dragLi = e.target.parentElement.parentElement;
    dragLi.classList.remove('dragging');    //the class 'dragging' is removed from the parent's parent element of the targeted element 
  });
  ul.appendChild(li);                       //li is appended as the last child of ul
}

// processing the movement of li inside of Ul 
const dragOver = (event) => {
    event.preventDefault();             // preventing default action of prohibition of dropping element outside the border of the element
    const afterElement = getDragAfterElement(event.clientY);        //getting  nearest element;
    const draggingElement = document.querySelector('.dragging');    // variable that equals to the element with the class dragging
    if(afterElement == null) {          //if there is no element after the element with te classname dragging is putted at the end of list
        ul.appendChild(draggingElement);
    }  else {                           // otherwise its inserted before the 'afterelement';
        ul.insertBefore(draggingElement, afterElement);
    }
}


const getDragAfterElement = (y) => {
    /*getting all ul child elements except the one with an id 'dragging' and creating an array in order to proceed the reduce function afterwards;*/
    const draggableElements = [...ul.querySelectorAll('.list-hover:not(.dragging)')]
    
    //determine which element is directly after the mouse cursor based on "y" position;
    return draggableElements.reduce((closest, child) => { //each of child element of UL;
      const box = child.getBoundingClientRect();  // determine the actual position of the elements on our screen in relation to our mouse;
      const offset = y - box.top - box.height / 2;  //the distance between the actual mouse cursor and the center of the box of element;

      //if the the offset is negative and is closer to 0, it means the cursor is above the element;
      if (offset < 0 && offset > closest.offset) { 
        return { offset: offset, element: child };      //returning the object with the current offset and element which is the child;
      } else {
        return closest; // return the closest offset for now;
      }
    }, { offset: Number.NEGATIVE_INFINITY /* the smallest possible number*/}).element
}

const sortList = (event) => {
    let inputList = ul.querySelectorAll('input');
    let array = [];
    inputList.forEach(element => {
        array.push(element.value);
    });

    let i = 0;
    let sortButtonClass = event.target.classList;
    if (sortButtonClass.contains('s-button-down')) {
        sortButtonClass.remove('s-button-down');
        sortButtonClass.add('s-button-up');
        array.sort();

        inputList.forEach(element => {
            element.value = array[i++];
        });
    } else {
        sortButtonClass.remove('s-button-up');
        sortButtonClass.add('s-button-down');
        array.sort().reverse();

        inputList.forEach(element => {
            element.value = array[i++];
        });
    }
}

//deleting the element from the list;
const deleteFromList  = (e) => {
    let li = e.target.parentElement.parentElement;
    let deleteButton = e.target;
    deleteButton.addEventListener('click', deleteFromList);
    ul.removeChild(li);
}



/*creating variable with an HTML elements for input line inside of li in order to use it in the following function addToList(); */
const inputLine =                
`
<div class="main-text-block">
    <div class="drag-img">&#8759;</div>                                 
    <input id="input" class="input" type="text" />              
    <div class="gray-delete">
    </div>
</div>
`;

const ul = document.querySelector("#container-list");   //creating the global variable for UL element finding it's ID. 
ul.addEventListener('dragover', dragOver);//afterwards we use the variable to realize the function dragOver() in case of event "dragover";

/*global variable for selecting the DIV of sort png(you could see in CSS line 38).
Afterwards we us the variable to realize the function sortList() in case of event 'click';*/
const sortButton = document.querySelector('#sort-button');
sortButton.addEventListener('click', sortList);

/* global variable that finds the DIV with the class 'submit-button' that contains the svg file of Submit button. 
afterwards it realizes the function addToList() in case of event "click";*/
const button = document.querySelector('.submit-button');
button.addEventListener('click', addToList);

addToList(); // adding the first empty input line
