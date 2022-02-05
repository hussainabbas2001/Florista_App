gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true
// });

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  reloadOnContextChange: true,
  touchMultiplier: 2,
  smoothMobile: 0,
  smartphone: {
    smooth: !0,
    breakpoint: 767,
  },
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0): locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the#twodots at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// gsap.set("")
// starting of timeline
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#twodots",
    scroller: "#main",
    // markers: true,
    start: "top 70%",
  },
});
tl.to(".tlt", {
  onstart: function () {
    $(".tlt").textillate({
      in: {
        effect: "fadeInUp",
      },
      out: {
        effect: "fadeoutDown",
      },
    });
  },
});
// starting of .lst
var lsttxt = gsap.timeline({
  scrollTrigger: {
    trigger: "#textelem",
    scroller: "#main",
    // markers: true,
    start: "top 50%",
  },
});
lsttxt.to(".lst, #circle", {
  opacity: 1,
  onstart: function () {
    $(".lst").textillate({
      in: {
        effect: "fadeInUp",
      },
      out: {
        effect: "fadeOutDown",
      },
    });
  },
});

lsttxt.to("#magthings img",{
  opacity: 1,
  
})

var tm = gsap.timeline({
  scrollTrigger: {
    trigger: "#footer",
    scroller: "#main",
    // markers: true,
    start: "top 70%",
  },
});
tm.fromTo(
  "#lsttext",
  {
    opacity: 0,
    y: 100,
    stagger: 1,
    duration: 1,
  },
  {
    opacity: 1,
    y: 10,
    stagger: 0.2,
    duration: 2,
  }
);


var tf = gsap.timeline({
  scrollTrigger: {
    trigger: "#slide",
    scroller: "#main",
    // markers: true,
    start: "top 70%",
  },
})


tf.from("#slide h1, #lft",{
  x: -350,
  ease:Expo.easeInout,
  duration: 1
})
tf.from("#rgt",{
  x: 350,
  ease:Expo.easeInout,
  duration: 1
},"-=1")




var distancePerPoint = 1;
var drawFPS = 60;

var orig = document.querySelector('path'),
    length, timer;

function startDrawingPath() {
    length = 0;
    orig.style.stroke = '#fff';
    timer = setInterval(increaseLength, 600 / drawFPS);
}

function increaseLength() {
    var pathLength = orig.getTotalLength();
    length += distancePerPoint;
    orig.style.strokeDasharray = [length, pathLength].join(' ');
    if (length >= pathLength) clearInterval(timer);
}

function stopDrawingPath() {
    clearInterval(timer);
    orig.style.stroke = '';
    orig.style.strokeDasharray = '';
}



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
