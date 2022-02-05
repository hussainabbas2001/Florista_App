var menu = document.querySelector("#menu");
menu.addEventListener("click", function () {
  document.querySelector("#fullwindow").style.left = "0%";
});

var clse = document.querySelector("#cross");
clse.addEventListener("click", function () {
  document.querySelector("#fullwindow").style.left = "-100%";
});

var slidemainpar = document.querySelector("#slideparent");
var slidepar = document.querySelector("#slideshow");
var slideschld = document.querySelectorAll(".slides");

slidepar.style.width = (slideschld[0].getBoundingClientRect().left - slidepar.getBoundingClientRect().left ) * ( slideschld.length + 1 ) + slideschld[0].getBoundingClientRect().width * slideschld.length + "px";
var current = slideschld[0].getBoundingClientRect().left;
slidemainpar.addEventListener("scroll", () => {


  var newpos = slideschld[0].getBoundingClientRect().left;
  var diff = newpos - current;
  var speed = diff * 0.3;
  current = newpos;
  slideschld.forEach((elem) => {
    console.log(slidepar.getBoundingClientRect().left, slidemainpar.getBoundingClientRect().left);
    if(slidepar.getBoundingClientRect().left == slidemainpar.getBoundingClientRect().left){
      elem.style.transform = `skewX(0deg)`;
    }else{
      elem.style.transform = `skewX(${speed}deg)`;
    }
  });
});

var link = document.querySelectorAll(".link ");
var photo = document.querySelector(".link .photo");
// var lstphoto = document.querySelector("#lstphto")

link.forEach(function(elem){
  elem.addEventListener("mousemove", function(dets){
    elem.children[0].style.display = "flex"
    elem.children[0].style.transform = `translate(${dets.clientX - 400}px, ${dets.clientY/4- 200}px) rotate(${dets.clientX/8-50}deg)`;
      var overimg = elem.children[0].getElementsByTagName("img")[0].src
      document.getElementById("myimg").setAttribute("src", overimg)

  })
  elem.addEventListener("mouseout", function(dets){
    elem.children[0].style.display = "none"
    document.getElementById("myimg").src  = "https://images.unsplash.com/photo-1602542212524-7290828a4ede?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
  })
})



