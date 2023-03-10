let txt = document.querySelector('#inptext');
let sendmsg = document.querySelector('.sendmsg');
let allmsgs = document.querySelector('.messages');
let token = localStorage.getItem('token');
let signout = document.querySelector('#signout');
let welc = document.querySelector('#welcomeuser');
let nam = '';

//getting all user 

axios.get('http://localhost:5555/user', {
  headers: { authorization: token },
})
  .then(result => {
    nam += result.data[0].name;
    // console.log("nam");
    console.log(nam);

    welc.innerHTML = `${result.data[0].name}`;

  })
  .catch(err => {
    console.log(err);
  })


//sending message 

sendmsg.addEventListener('click', (e) => {
  let token = localStorage.getItem('token');
  let msg = txt.value;
  let obj = {
    message: msg
  }
  axios.post("http://localhost:5555/chatmessage", obj, {
    headers: { authorization: token },
  }).then(result => {
    console.log(result);
    txt.value = "";
  })
    .catch(err => {
      console.log(err);
    })
})

//get new message is by continuously calling the API from the frontend every 1 second.

setInterval(() => {
  axios
    .get("http://localhost:5555/getmessages", {
      headers: { authorization: token },
    })
    .then((result) => {
      let res = "";

      for (let i = 0; i < result.data.result.length; i++) {
        // console.log(result.data.result[i].username == nam);
        if (result.data.result[i].username == nam) {
          res += `
            <div class="p-2 indimsg " style="background:blue;border-bottom:4px solid green; color:white; ">
            <span style="margin-left:80%;" >you : 
        </span>
            <span>${result.data.result[i].msg}</span>
            </div> `;
        }
        else {
          res += `
            <div class="p-2 indimsg " style="background:yellow; color:blue; border-bottom:4px solid red; ">
            <span  >${result.data.result[i].username} : 
        </span>
            <span>${result.data.result[i].msg}</span>
            </div>
            `;
        }
      }
      allmsgs.innerHTML = res;
    })
    .catch((err) => {
      console.log(err);
    });

}, 800);


//signout event

signout.addEventListener('click', () => {

  localStorage.clear();
  location.replace('login.html')
})