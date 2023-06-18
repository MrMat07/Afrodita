const form = document.querySelector("#formContact");
const pStatusForm = document.querySelector("#statusForm");

const submitForm = async (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
  fetch(e.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        pStatusForm.innerHTML = `<p class="text-success">Gracias por enviarnos tu mensaje!</p>`;
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            pStatusForm.innerHTML = `<p class="text-danger">${data["errors"]
              .map((error) => error["message"])
              .join(", ")}</p>`;
          } else {
            pStatusForm.innerHTML = `<p class="text-danger">Oops! Ha habido un problema al enviar el formulario</p>`;
          }
        });
      }
    })
    .catch((error) => {
      pStatusForm.innerHTML = `<p class="text-danger">Oops! Ha habido un problema al enviar el formulario</p>`;
    });
};

form.addEventListener("submit", submitForm);
