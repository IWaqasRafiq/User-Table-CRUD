const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyDydCU0Fe2_TcJVB98idMF45dyz6423gxQ",
    authDomain: "threads-clone-web.firebaseapp.com",
    databaseURL: "https://threads-clone-web-default-rtdb.firebaseio.com",
    projectId: "threads-clone-web",
    storageBucket: "threads-clone-web.appspot.com",
    messagingSenderId: "1093836480632",
    appId: "1:1093836480632:web:4d9db806c2b1bb7a490d8d"
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
              <h5 class="mb-0">Necklace</h5>\
            </div>\
          </div>\
        </td>\
        <td>50$</td>\
        <td>\
          Our necklace is made with high quality jewelry and is 17cm long</td>\
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
    post: text,
  };

  let newThreadRef = database.ref("threads").push();
  let ThreadId = newThreadRef.key;
  newThreadRef.set(threadData);
  console.log(threadData);

  document.getElementsByClassName('result')[0].innerHTML += postContainer;
}

let current = new Date();
let options = { hour: 'numeric', minute: 'numeric', hour12: true };
let time = current.toLocaleTimeString(undefined, options);
console.log(time);
document.getElementsByClassName('time')[0].innerHTML = time;

function displayPostedData() {
  database.ref("threads").once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const threadData = childSnapshot.val();
       
        const postContainer = createPostContainer(threadData.user, threadData.post, time);

        document.getElementsByClassName('result').appendChild(postContainer);
      });
    })
    .catch(error => {
      console.log("Error retrieving posted data:", error);
    });
}

function createPostContainer(username, text, time) {
  const postContainer = document.createElement('div');
  postContainer.innerHTML = `\
  <table class="table">\
    <tbody>
      <tr>
        <td>
          <div class="user-info">
            <div class="user-info__basic">
              <h5 class="mb-0">Necklace</h5>
            </div>
          </div>
        </td>
        <td>50$</td>
        <td>
          Our necklace is made with high quality jewelry and is 17cm
          long
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
      document.getElementsByClassName('mid-col')[0].innerHTML = '';

      displayPostedData();

      document.getElementById('post-form').reset();
    })
    .catch(error => {
      console.log("Error saving posted data:", error);
    });
  });

displayPostedData();

    // Check the current state of the media query on page load
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    handleMediaQuery(mediaQuery);

    // Add an event listener to track changes in the media query state
    mediaQuery.addListener(handleMediaQuery);

    // Function to handle media query changes
    function handleMediaQuery(mediaQuery) {
      if (mediaQuery.matches) {
        console.log('Media query matched! Screen width is 600px or less.');
        // Perform actions specific to small screens
        const element = document.querySelector(".main")
        element.classList.remove("grid");
      } else {
        console.log('Media query not matched! Screen width is larger than 600px.');
        // Perform actions specific to larger screens
        const element = document.querySelector(".main")
        element.classList.add("grid");
      }
    }
    const formWrapper = document.querySelector(".formbold-form-wrapper");
    const formActionButton = document.querySelector(".formbold-action-btn");
    function chatboxToogleHandler() {
      formWrapper.classList.toggle("active");
      formActionButton.classList.toggle("active");
    }