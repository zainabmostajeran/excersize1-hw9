let btnSubmit = document.getElementById("btnSubmit");
let inputUrl = document.getElementById("input");
let method = document.getElementById("method");
let root = document.getElementById("root");
let req = document.getElementById("req");
let text = document.getElementById("status");
let label = document.getElementById("label");
let label1 = document.getElementById("label1");

req.style.display = "none";
label1.style.display = "none";

btnSubmit.addEventListener("click", send);

async function send() {
  try {
    let options = {
      method: method.value,
    };

    if (method.value === "Post") {
      let requestBody = req.value;
      options.body = requestBody;

      options.headers = {
        "Content-Type": "application/json",
      };
    }

    let response = await fetch(inputUrl.value, options);
    let result = await response.json();

    if (method.value === "Get") {
      methodGet(result, response);
    } else if (method.value === "Post") {
      methodPost(result, response);
    }

    console.log(response.headers.get("content-type"));
  } catch (error) {
    console.error(error);
  }
}

function methodGet(result, response) {
  root.innerText = JSON.stringify(result);
  root.style.display = "block";
  req.style.display = "none";
  label1.style.display = "none";
  label.style.display = "block";
  text.style.display = "block";
  text.innerHTML = `plainText: ${response.headers
    .get("content-type")
    .split("")
    .splice(12, 4)
    .join("")}, status: ${response.status}`;
}

function methodPost(result, response) {
  root.style.display = "block";
  label.style.display = "block";
  label1.style.display = "block";
  text.style.display = "block";
  root.innerText = JSON.stringify(result);

  // Display the sent request body
  req.value = JSON.stringify(JSON.parse(req.value));
  req.style.display = "block";

  text.innerHTML =` plainText: ${response.headers
    .get("content-type")
    .split("")
    .splice(12, 4)
    .join("")}, status: ${response.status}`;
}

method.addEventListener("change", showBody);

function showBody() {
  if (method.value === "Post") {
    label1.style.display = "block";
    req.style.display = "block";
  } else {
    label1.style.display = "none";
    req.style.display = "none";
  }
}