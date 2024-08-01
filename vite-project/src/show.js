function show() {
  let element1 = document.getElementById("add_todo");
  let element2 = document.getElementById("form");
  if (element1.classList.contains("hidden")) {
    element1.classList.remove("hidden");
    element2.classList.add("hidden");
  } else {
    element2.classList.remove("hidden");
    element1.classList.add("hidden");
  }
}
export default show;
