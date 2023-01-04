let token = localStorage.getItem("token");
let listofgrps = document.querySelector(".listofgrps");
let searchinp=document.querySelector('#searchinp');
let addtogroup=document.querySelector('#addtogroup');
let personemail=document.querySelector('#personemail');
let adminvalue=document.querySelector('#adminvalue');
let groupmessages=document.querySelector('.groupmessages');
let sendmessage=document.querySelector('.sendmsg');
let inptxt=document.querySelector('#inptext');
let groupparticipants=document.querySelector('.grpparticipants');
let pangrpname = document.querySelector("#grpname");
let signout = document.querySelector("#signoutgrp");

let nam = "";
axios
  .get("http://localhost:5555/user", {
    headers: { authorization: token },
  })
  .then((result) => {
    console.log(result);
    nam += result.data[0].name;
    console.log(nam);
  })
  .catch((err) => {
    console.log(err);
  });



function grps() {
  axios
    .get("http://localhost:5555/getallgroups", {
      headers: { authorization: token },
    })
    .then((result) => {
      let gt = "";
      if (result.data.length == 0) {
        listofgrps.innerHTML = "you are not part of any group! ";
      } else {
        for (let i = 0; i < result.data.length; i++) {
    //       gt += `
    // <div style="border-bottom:1px solid black; padding:6px;">
    // <a style="color:blue; text-decoration:none;" href="groupchat.html?g=${result.data[i].groupId}">${result.data[i].groupname}</a>
    // </div>
    // `;
        }
        listofgrps.innerHTML = gt;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

grps();



searchinp.addEventListener('keyup',(e)=>{

    if(e.key=='Enter'){
    let val=searchinp.value;

    window.find(val);
    }
});


addtogroup.addEventListener('click',()=>{

 let id= location.href.split("g=")[1];

 let obj={
  mail:personemail.value,
  admin:adminvalue.value
 }

 axios.post(`http://localhost:5555/addparticipants/${id}`, obj, {
   headers: { authorization: token },
 }).then(result=>{

  alert(result.data);
  personemail.value="";
  location.reload();
 })
 .catch(err=>{
  console.log(err);
 })

});

