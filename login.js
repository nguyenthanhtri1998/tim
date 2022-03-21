document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault()
})
document.getElementById("loginForm2").addEventListener("submit", (event) => {
  event.preventDefault()
})
function createUserCollection(user) {
  firebase.firestore().collection('users')
    .doc(user.uid)
    .set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      phone: "",
      specialty: "",
      portfolioUrl: "",
      experience: ""
    })
}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("user").innerHTML ="Hi," + user.email.substring(0,user.email.indexOf('@'));
    document.getElementById('id01').style.display='none'
    console.log(user)
    // getuserInfo(user.uid)
    if (user.email == "admin@admin.com") {
      document.getElementById("adminpage").style.display = "block"
    }
    document.getElementById("th").style.display = "block"
    document.getElementById("th2").style.display = "none"
    document.getElementById("ha").style.display = "block"
    document.getElementById("ha2").style.display = "none"
    document.getElementById("testdrop").style.display = "block"
    document.getElementById("regis").style.display = "none"
    document.getElementById("cardlg").style.display = "none"
    document.getElementById("about-page3").style.display = "none"
   
    document.getElementById("about-page").style.display = "block"
    
    getuserInfoRealtime(user.uid)
    if(user.uid=='TSS0ckznnpM2UkjxHIxp2Y8ivFc2'){
      allUserDetails()
    }
  } 
  // if (user.email == "admin@admin.com") {
  //   location.replace("admin.html")
  // }
  // else if (user) {
  //   location.replace("welcome.html");
  // }
  // if (user) {
  //   if (user.uid == 'TSS0ckznnpM2UkjxHIxp2Y8ivFc2') {
  //     allUserDetails()
  //   }
  // }
})

function login() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      document.getElementById("error").innerHTML = error.message
    })
    
}
function loginS() {
  const email = document.getElementById("email2").value
  const password = document.getElementById("password2").value
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      document.getElementById("error").innerHTML = error.message
    })
    
}
async function signUp() {
  
  const email = document.getElementById("email2").value
  const password = document.getElementById("password2").value
  const name = document.getElementById("name").value
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
  if (!filter.test(email)) { 
           alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
           email.focus; 
           return false; 
  }
  if(password.length < 6) {
    alert('Minimum length = 6');
}
  const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
  if (name==""){
    await result.user.updateProfile({
      displayName: "User"
    })
  }
  else{
    await result.user.updateProfile({
      displayName: name
    })
  }
  
  createUserCollection(result.user)
    .catch((error) => {
      document.getElementById("error").innerHTML = error.message
    });
}

function forgotPass() {
  const email = document.getElementById("email").value
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset link sent to your email id")
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.message
    });
}
 
 
function logout(){
  firebase.auth().signOut()
}

// an hien mat khau
const passField = document.getElementById("password2");
const showBtn = document.querySelector("span i");
showBtn.onclick = (()=>{
  if(passField.type === "password"){
    passField.type = "text";
    showBtn.classList.add("hide-btn");
  }else{
    passField.type = "password";
    showBtn.classList.remove("hide-btn");
  }
});
