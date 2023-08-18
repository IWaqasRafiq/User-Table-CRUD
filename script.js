const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyAgI_RgKuZnbSwRhC6qkbqyquxSOh4UEPI",
    authDomain: "usre-table.firebaseapp.com",
    databaseURL: "https://usre-table-default-rtdb.firebaseio.com",
    projectId: "usre-table",
    storageBucket: "usre-table.appspot.com",
    messagingSenderId: "289710010510",
    appId: "1:289710010510:web:0dc072b341ba87d84659df"
  });
const db = firebaseApp.firestore();
const database = firebaseApp.database();

let body = document.getElementsByTagName('body')[0];
let main = document.getElementsByTagName('main')[0];
let postW = document.getElementsByClassName('pop-up')[0];
let caption = document.getElementById('caption');
let postBtn = document.getElementsByClassName('post')[0];


function post(e) {
  e.classList.toggle('pop-show');
  main.classList.toggle('main-block');
}

caption.addEventListener('keyup', function () {
  if (caption.value) {
    postBtn.classList.add('post-valued');
  } else {
    postBtn.classList.remove('post-valued');
  }
});


function linky(text) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return text.replace(urlRegex, function (url, b, c) {
    var url2 = (c == 'www.') ? 'http://' + url : url;
    return '<a href="' + url2 + '" target="_blank">' + url + '</a>';
  })
}

let pstForm = document.getElementById('post-form');
function posted() {
  let text = linky(caption.value);
  let username = document.getElementById('post-user').value;
  let price = document.getElementById('post-price').value;

  if (!username) {
    useDefaultUsername();
  }

  document.getElementsByClassName(".usernameD").innerHTML = username;

  pstForm.reset();
  postBtn.classList.remove('post-valued');


  let postContainer = '\
  <table class="table">\
    <tbody>\
      <tr>\
        <td>\
          <div>\
            <div>\
              <h5 class="mb-0">' + username + '</h5>\
            </div>\
          </div>\
        </td>\
        <td>' + price + '</td>\
        <td>\
        ' + text + '</td>\
        <td>\
          <div class="dropdown open">\
            <a href="#!" class="px-2" id="triggerId1" data-toggle="dropdown" aria-haspopup="true"\
              aria-expanded="false">\
              <i class="fa fa-ellipsis-v"></i>\
            </a>\
            <div class="dropdown-menu" aria-labelledby="triggerId1">\
              <a class="dropdown-item" href="#"><i class="fa fa-pencil mr-1"></i> Edit</a>\
              <a class="dropdown-item text-danger" href="#"><i class="fa fa-trash mr-1"></i> Delete</a>\
            </div>\
          </div>\
        </td>\
      </tr>\
    </tbody>\
  </table>\
'

  let threadData = {
    user: username,
    Price: price,
    post: text,
  };

  let newThreadRef = database.ref("threads").push();
  let ThreadId = newThreadRef.key;
  newThreadRef.set(threadData);
  console.log(threadData);

  document.getElementsByClassName('result')[0].innerHTML += postContainer;
}


function displayPostedData() {
  database.ref("threads").once("value")
    .then(snapshot => {
      const resultContainer = document.getElementsByClassName('result')[0];
      resultContainer.innerHTML = ''; // Clear existing data
      
      snapshot.forEach(childSnapshot => {
        let threadData = childSnapshot.val();
        let postContainer = createPostContainer(threadData.user, threadData.post, threadData.Price);
        resultContainer.appendChild(postContainer); // Append to the result container
      });
    })
    .catch(error => {
      console.log("Error retrieving posted data:", error);
    });
}


function createPostContainer(username, text, price) {
  const postContainer = document.createElement('div');
  postContainer.innerHTML = `\
  <table class="table">\
    <tbody>
      <tr>
        <td>
          <div>
            <div>
              <h5 class="mb-0">${username}</h5>
            </div>
          </div>
        </td>
        <td>${price}</td>
        <td>
        ${text}
        </td>
        <td>
          <div class="dropdown open">
            <a href="#!" class="px-2" id="triggerId1" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <i class="fa fa-ellipsis-v"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="triggerId1">
              <a class="dropdown-item" href="#"><i class="fa fa-pencil mr-1"></i> Edit</a>
              <a class="dropdown-item text-danger" href="#"><i class="fa fa-trash mr-1"></i> Delete</a>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
    </table>
  `;
  
  return postContainer;
}

document.getElementById('post-form').addEventListener('submit', function(event) {
  event.preventDefault();


  database.ref("threads").push(threadData)
    .then(() => {
      document.getElementsByClassName('result')[0].innerHTML = '';

      displayPostedData();

      document.getElementById('post-form').reset();
    })
    .catch(error => {
      console.log("Error saving posted data:", error);
    });
  });

displayPostedData();

    const formWrapper = document.querySelector(".formbold-form-wrapper");
    const formActionButton = document.querySelector(".formbold-action-btn");
    function chatboxToogleHandler() {
      formWrapper.classList.toggle("active");
      formActionButton.classList.toggle("active");
    }
    document.addEventListener("DOMContentLoaded", function () {
      displayPostedData();
    });