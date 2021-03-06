/******************************************
 List Filter and Pagination
 ******************************************/

// let DOM to load entirely before running JavaScript
document.addEventListener("DOMContentLoaded", function(event) {
  // page => (page-header[[student-search]], student-list, [pagination])
  const pageContainer = document.querySelector('.page');
  const studentList = pageContainer.querySelector('div > ul[class="student-list"]');
  const studentListItems = studentList.children;
  const studentListCopy = [...studentListItems];
  const pageHeader = studentList.previousElementSibling;
  let numOfPages = Math.ceil(studentListItems.length / 10);
  let pageNum = 1;
  let searchQuery = '';
  let studentSubList = [];

  /* Search Input */
  const studentSearch = document.createElement('div');
  studentSearch.className = 'student-search';
  const studentSearchInput = document.createElement('input');
  studentSearchInput.placeholder = 'Search for students...';
  const studentSearchButton = document.createElement('button');
  studentSearchButton.textContent = 'Search';
  studentSearch.appendChild(studentSearchInput);
  studentSearch.appendChild(studentSearchButton);
  studentSearch.addEventListener('click', handleSearchButton);
  pageHeader.appendChild(studentSearch);

  // paginationDiv will contain pagination labels
  let paginationDiv = document.createElement('div')
  paginationDiv.className = 'pagination';
  pageContainer.appendChild(paginationDiv);

  // paginationLabelList is UL holding dynamically created page labels
  let paginationLabelList = document.createElement('ul');
  paginationLabelList.addEventListener('click', handlePageClick);

  paginationDiv.appendChild(paginationLabelList);

  function appendPageLinks(numOfPages) {
    paginationLabelList.innerHTML = '';
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

  function getPageList(pageNum, arr) {
    let start = (pageNum * 10) - 10;
    // per each page, display range from: pageNum*10 - 10 ==> pageNum*10 - 1
      // eg. pageNum = 4; 4*10-10 = 30 ===> 4*10-1 = 39 || pageNum = 4, [30 => 39]

    for (let i = 0; i < arr.length; i++){
      const studentListItem = arr[i];

      if (i >= start && i <= (start + 10)) {
        studentListItem.style.display = "";
      } else {
        studentListItem.style.display = "none";
      }
    }
  }

  function showPage(pageNum = 1, sublist = studentListCopy) {
    // filter students into sublist based on searchQuery
    let newList = sublist.filter(student => {
      const studentName = student.querySelector('li h3').textContent;
      const studentEmail = student.querySelector('li .email').textContent;
      // keep students whose studentName||studentEmail includes search query
      if (studentName.includes(searchQuery) || studentEmail.includes(searchQuery)){
        return student;
      }
    })

    studentList.innerHTML = '';
    if (newList.length > 0) {
      // if list is not empty
      newList.forEach(student => studentList.appendChild(student));
      // paginate search filtered list
      getPageList(pageNum, studentList.children);
      studentSubList = studentListItems;
      numOfPages = Math.ceil(studentSubList.length / 10);
      appendPageLinks(numOfPages);
    } else {
      // if list is empty display an on-screen notification to update search query
      const emptyListItem = document.createElement("li");
      emptyListItem.innerHTML = `
      <li class="empty-list">
        <div class="empty-list-div">
            <h3>Try another search query!</h3>
            <p>There are no names containing what you're looking for!</p>
        </div>
      </li>`;
      studentList.appendChild(emptyListItem);
      appendPageLinks(0);
    }
  }
  // initial call: show the first page of students
  showPage(1);

  function handleSearchButton(e) {
    if (e.target.tagName === 'BUTTON'){
      const button = e.target
      const searchInputValue = button.previousElementSibling.value;
      searchQuery = searchInputValue
      // show results with new searchQuery
      showPage()
    };
  }

  function handlePageClick(e) {
    const pageLabel = e.target;
    const pageLabelList = pageLabel.parentNode.parentNode;
    if (pageLabel.tagName === "A") {
      // remove class of previos page of active
      pageLabelList.querySelector(`li:nth-child(${pageNum}) a`).className = "";
      // get pageLabel textContent as a number
      pageNum = Number(pageLabel.textContent);
      // call showPage function to display corresponding student items
      getPageList(pageNum, studentSubList);
      // set class of current pageLabel to active
      pageLabel.className = 'active';
    }
  }

});