/* <div class="notes">
        <div class="tool">
          <button class="material-symbols-outlined">save</button>
          <button class="material-symbols-outlined">delete</button>
        </div>
        <textarea></textarea>
      </div> */

const addbtn_el = document.querySelector("#add-btn");

const main = document.querySelector("#main");

const saveNodes = () => {
  const notes_el = document.querySelectorAll(".notes textarea");
  console.log(notes_el);
  const data = [];
  notes_el.forEach((notesDiv) => {
    data.push(notesDiv.value);
  });

  //   console.log(data);

  if (data.length === 0) {
    localStorage.removeItem("notes_el");
  } else {
    localStorage.setItem("notes_el", JSON.stringify(data));
  }
};

addbtn_el.addEventListener("click", function () {
  addNote();
});

const addNote = (text = "") => {
  // Create the outer div with class "notes"
  const notesDiv = document.createElement("div");
  notesDiv.classList.add("notes");

  notesDiv.innerHTML = `
    <div class="tool">
        <button class="savebtn material-symbols-outlined">save</button>
        <button class="trashbtn material-symbols-outlined">delete</button>
    </div>
    <textarea>${text}</textarea>
            `;

  notesDiv.querySelector(".trashbtn").addEventListener("click", function () {
    notesDiv.remove();
    saveNodes();
  });

  notesDiv.querySelector(".savebtn").addEventListener("click", function () {
    saveNodes();
  });

  notesDiv.querySelector("textarea").addEventListener("focusout", function () {
    saveNodes();
  });

  main.appendChild(notesDiv);
  saveNodes();
};

(function () {
  const lsnotes_el = JSON.parse(localStorage.getItem("notes_el"));
  if (lsnotes_el === null) {
    addNote();
  } else {
    lsnotes_el.forEach((lsnotes_el) => {
      addNote(lsnotes_el);
    });
  }
})();
