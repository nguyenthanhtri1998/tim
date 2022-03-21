firebase.auth().onAuthStateChanged((user)=>{
    if(user.email!="admin@admin.com"){
        location.replace("index.html")
    }
    else{
        document.getElementById("user").innerHTML ="Hi," + user.email.substring(0,user.email.indexOf('@'));
    }
    
  })
  
  
  function logout(){
    firebase.auth().signOut()
  }