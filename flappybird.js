
var canvas= document.getElementById('gamezone');
var context= canvas.getContext('2d');
var scoreshow=document.getElementById('score');
let dom_replay = document.querySelector("#replay");


var chickenimg= new Image();
var hinhnenchinh=new Image();
var ongtren= new Image();
var ongduoi=new Image();
chickenimg.src="asset/bird.png";
hinhnenchinh.src="asset/nenchinh.png";
ongtren.src="asset/ongtren.png";
ongduoi.src="asset/ongduoi.png";
//nạp các hình vô

//tạo 1 số biến cần thiết

var score=0;
var khoangcachhaiong=140; 
var khoangcachdenongduoi; // biến này là khoảng cách từ đầu ống trên đến vị trí đầu ống dưới
// tạo ra 1 object chim với tọa độ x y là 1 nữa canvas
var chicken={
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
}
var ong=[]; //tạo mảng ống để chứa các ống di chuỷen
ong[0]={
    x:canvas.width,
    y:0 // khởi tạo ống đầu tiên nằm bên phải ngoài cùng và y=0;
}

function run(){
    // load hình ảnh vào
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(chickenimg,chicken.x,chicken.y);

    for(var i=0;i<ong.length;i++){
        khoangcachdenongduoi=ongtren.height+khoangcachhaiong;
        context.drawImage(ongtren,ong[i].x,ong[i].y);
        // vẽ ống trên theo tọa độ của ống đó
        //  ống dưới phụ thuộc ống trên
        context.drawImage(ongduoi,ong[i].x,ong[i].y+khoangcachdenongduoi);
        //  lấy vị trí ống trên cộng khoảng cách đến
        // ống dưới vì tí nữa mình random nó lên xuống
        ong[i].x-=5; //để ống di chuyển

        // lập trình thêm ống khi ống di chuyển đến giữa
        // nó sẽ tạo thêm 1 ống nữa
        if(ong[i].x ==canvas.width/2){
            ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height
        
                // random 
            })
        }
        if(ong[i].x ==0 )ong.splice(0,1);
        // nếu ống đụng lề trái thì xóa nó đi để tránh mảng ống
        //  bị đầy làm chậm       
        if(ong[i].x==chicken.x)score++;  
        // giờ làm cái khó nhất là thua  
        if(chicken.y+chickenimg.height==canvas.height||
        chicken.x+chickenimg.width>= ong[i].x && chicken.x <= ong[i].x +ongtren.width
        && (chicken.y<=ong[i].y+ongtren.height||
        chicken.y +chickenimg.height>= ong[i].y+ khoangcachdenongduoi)    
        ){
            return;
        }                   
    }
    // điều kiện đầu tiên là đụng đất
    //  tính tọa độ y cộng với độ cao con ga
    //  điều kiện thứ hai là so sánh vị trí x con ga với cái ống 
    //  so sánh vị trí y



    scoreshow.innerHTML="SCORE: "+score;
    // cho chicken rơi xuống
    //y = y0 + v0t + 0.5gt2
    //v = v0 + gt
    //cho cac khoang thoi gian deu bang 1
    chicken.y+=3;
    requestAnimationFrame(run);
}
//thêm function cho nó bay lên khi nhấn
document.addEventListener("keydown",function(){
    chicken.y-=60;   
})
//tọa độ trên máy tính là ở gốc trên trái đi xuống dưới là chiều dương 
run();