firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }
   else if (user.email == "admin@admin.com") {
      document.getElementById("adminpage").style.display = "block"
      document.getElementById("user").innerHTML ="Hi," + user.email.substring(0,user.email.indexOf('@'));
      
    }
    else {
        document.getElementById("user").innerHTML ="Hi," + user.email.substring(0,user.email.indexOf('@'));
        document.getElementById("user2").innerHTML =user.email;
   
        
    }
  })
  
  function logout(){
    firebase.auth().signOut()
  }
  
