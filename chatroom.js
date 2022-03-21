var firebaseConfig = {
    apiKey: "AIzaSyDt6OVBwvPvAEAFpokPRXpfnA3zoYtI5hk",
    authDomain: "do-an-6aec8.firebaseapp.com",
    databaseURL: "https://do-an-6aec8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "do-an-6aec8",
    storageBucket: "do-an-6aec8.appspot.com",
    messagingSenderId: "331078682754",
    appId: "1:331078682754:web:f5a532ba8d77a0fffe4c9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var name;
  firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }
    
    else {
        name = user.email.substring(0,user.email.indexOf('@'));
       
        document.getElementById("user").innerHTML ="Hi," + user.email.substring(0,user.email.indexOf('@'));
        document.getElementById("user2").innerHTML =user.email;
     
    }
    // else if (user.email == "admin@admin.com") {
    //     document.getElementById("adminpage").style.display = "block"
    //     document.getElementById("user").innerHTML ="Hi," + user.email.substring(0,user.email.indexOf('@'));
    //   }
    
  })
  
  
  function logout(){
    firebase.auth().signOut()
  }
var db = firebase.firestore();

console.log("Firebase connected");



// Getting all message and listeing real time chat

db.collection("chats").orderBy("date").onSnapshot(function(snapshot){

    snapshot.docChanges().forEach(function(change,ind){
        var data = change.doc.data();
        // if new message added
        
        if(change.type == "added"){

            if(data.senderName == name && data.deleted!="true"){ //Which message i sent 
               

                var html = `<li class="left clearfix">
                    <span class="chat-img pull-left">
                        <img src="${firebase.auth().currentUser.photoURL}" alt="User Avatar" class="img-circle" />
                    </span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <strong class="primary-font">${data.senderName}</strong> <small class="pull-right text-muted">
                                <span class="glyphicon glyphicon-time"></span>${data.date}</small>
                        </div>
                        <p id="${change.doc.id}-message">
                            ${data.message}
                        </p>
                        <span onclick="deleteMessage('${change.doc.id}')" class="glyphicon glyphicon-trash" > <img class="trash" src="./asset/trash.svg">
                        </span> 
                    </div>
                </li>`;

                $('.chat').append(html);

            }else if(data.senderName != name && data.deleted !="true"){

                var html = `<li class="right clearfix">
                    <span class="chat-img pull-right">
                        <img src="http://placehold.it/50/FA6F57/fff&text=${data.senderName}" alt="User Avatar" class="img-circle" />
                        
                    </span>
                    <div class="chat-body clearfix" style="background-color:#f1eff1;">
                        <div class="header">
                            <small class=" text-muted">
                                <span class="glyphicon glyphicon-time"></span>${data.date}
                                
                            </small>
                            <strong class="pull-right primary-font">${data.senderName}</strong>
                           
                        </div>
                        <p id="${change.doc.id}-message">
                            ${data.message}
                          
                    
                        </p>
                        <span class="glyphicon glyphicon-trash" >
                        
                        <img onclick="softDelete('${change.doc.id}')" class="trash" id="tra" src="./asset/trash.svg">
                        <img  onclick="updates('${change.doc.id}')" class="restore" id="res" src="./asset/restore.svg">

                        
                        </span> 
                       
                        
                    </div>
                </li>`;

                $('.chat').append(html);

            }
            if(snapshot.docChanges().length - 1 == ind){ // we will scoll down on last message
                // auto scroll
                $(".panel-body").animate({ scrollTop: $('.panel-body').prop("scrollHeight")}, 1000);
            }
        }

        if(change.type == "modified"){
            test=$("#"+change.doc.id+"-message").html("this message has been soft deleted")
            
        }

        if(change.type == "removed"){

            $("#"+change.doc.id+"-message").html("this message has been deleted")

        }
      

    })  

})

function sendMessage(object){
    console.log(object)
    db.collection("chats").add(object).then(added => {
        console.log("message sent ",added)
    }).catch(err => {
        console.err("Error occured",err)
    })

}

function deleteMessage(doc_id){
    var flag = window.confirm("Are you sure to want delete ?")

    if(flag){

        db.collection("chats").doc(doc_id).delete();
        console.log("Deleted");
        

    }
}
function softDelete(doc_id){

    var flag = window.confirm("Are you sure to want delete ?")
    
    if(flag){

        db.collection("chats").doc(doc_id).update({
            deleted:"true"
        });
       
       
     
    }
   
}
function updates(doc_id){

    var flag = window.confirm("Do you want restore this message ?")
   
    if(flag){

        db.collection("chats").doc(doc_id).update({
            deleted:"false"
        });
       
        window.location.reload();
       
       
       
    }

}

// on click function
$('.send-button').click(function(){

    var message = $('#btn-input').val();

    if(message){
        
        sendMessage({
            senderName : name,
            message : message,
            date : moment().format("YYYY-MM-DD HH:mm"),
            deleted : deleted
            
        })
       
        $('#btn-input').val("")
    }

})

// also we will send message when user enter key
$('#btn-input').keyup(function(event) {

    // get key code of enter
    if(event.keyCode == 13){ // enter
       var message = $('#btn-input').val();
       
        if(message){
            // insert message 

            sendMessage({
                
                senderName : name,
                message : message,
                date : moment().format("YYYY-MM-DD HH:mm")
               
            })

            $('#btn-input').val("")
        }
    }
    // console.log("Key pressed");
})

