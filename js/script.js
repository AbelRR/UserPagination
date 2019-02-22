/******************************************
 List Filter and Pagination
 ******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

document.addEventListener("DOMContentLoaded", function(event) {
  /***
     Add your global variables that store the DOM elements you will
     need to reference and/or manipulate.
  ***/

 // page => (page-header[[student-search]], student-list, [pagination])
 const pageContainer = document.querySelector('.page');
 const studentList = pageContainer.querySelector('div > ul[class="student-list"]');
 const studentListItems = studentList.children;
 let pageNum = 1;

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.
***/
function showPage(pageNum) {
  function getPageList(arr, pageNum, resultArr = []) {
    let start = (pageNum * 10) - 10;

    for (let i = 0; i < arr.length; i++){
      let DOMListItem = arr[i];
      if (i >= start && i <= (start + 10)) {
        DOMListItem.style.display = "";
      } else {
        DOMListItem.style.display = "none";
      }
    }
   }

   getPageList(studentListItems, pageNum);
}

showPage(1);
/***
 Create the `appendPageLinks function` to generate, append, and add
 functionality to the pagination buttons.
 ***/

function handlePageClick(e) {
  const pageLabel = e.target;
  const pageLabelList = pageLabel.parentNode.parentNode;
  if (pageLabel.tagName === "A") {
    // remove class of previos page of active
    console.log(pageLabelList);
    pageLabelList.querySelector(`li:nth-child(${pageNum}) a`).className = "";
    // get pageLabel textContent as a number
    pageNum = Number(pageLabel.textContent);
    // call showPage function to display corresponding student items
    showPage(pageNum);
    // set class of current pageLabel to active
    pageLabel.className = 'active';
  }
}

// pagination div will contain pagination labels
let paginationDiv = document.createElement('div')
paginationDiv.className = 'pagination';
pageContainer.appendChild(paginationDiv);
let paginationLabelList = document.createElement('ul');
paginationLabelList.addEventListener('click', handlePageClick);
paginationDiv.appendChild(paginationLabelList);

function appendPageLinks() {
   // number of pages:
  const numOfPages = Math.ceil(studentListItems.length / 10);

  //dynamically append num of page labels to paginationDiv;
  for (let i = 0; i < numOfPages; i++) {
    const paginationLabelItem = document.createElement('li');
    const pageLink = document.createElement('a');
    pageLink.textContent = i+1;
    if (i === 0) pageLink.className = "active";

    paginationLabelItem.appendChild(pageLink);
    paginationLabelList.appendChild(paginationLabelItem);
  }

}
appendPageLinks();

});