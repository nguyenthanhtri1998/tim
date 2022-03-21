firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }
   
    else {
        document.getElementById("user").innerHTML ="Hi," + user.email.substring(0,user.email.indexOf('@'));
        document.getElementById("user2").innerHTML =user.email;
   
        
    }
  })
  
  function logout(){
    firebase.auth().signOut()
  }