document.addEventListener('DOMContentLoaded', function()  {
    console.log(2);
    let modal_choice_view = document.querySelector("#modal-choice");
    modal_choice_view.style.display = "block";

    let modal_close_btn = document.querySelector("#close");
    modal_close_btn.addEventListener("click", () => {
        modal_choice_view.style.display = "none";
    });
});