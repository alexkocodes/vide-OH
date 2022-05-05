document.querySelector("#h2title").addEventListener("click", () => {
  // variable to keep track of which video is played
  var curVideONum = 0;
  // to check if the image is clicked
  var clicked = false;
  let myTitleChnge = document.querySelector("#h2title");
  // for animating the hear their stories text
  document.querySelector(".initialTitleHOlder").style.top = "10px";
  myTitleChnge.style.fontSize = "56px";
  myTitleChnge.innerText = "Hear their stories . . .";
  myTitleChnge.style.background = "none";
  document.querySelector(".whodoYouthinkTitle").style.visibility = "hidden";
  setTimeout(() => {

    var showElemNow = document.querySelector(".showImagesList");
    showElemNow.classList.add("animate__animated");
    showElemNow.classList.add("animate__fadeInUp");
    showElemNow.style.display = "block";
    var innerHolder = document.getElementById('innerHolder');
    var allImgList = document.querySelectorAll('#innerHolder img');
    // allImgList = allImgList.reverse();
    // global variables for applying the transform change
    var changeX = 0, changeY = 0, transInX = 0, transInY = 10;
    var myRippleEff; // global interval

    const setupImgs = () => {
      // inital setup for the Images to setup in position
      for (let i = 0; i < allImgList.length; i++) {
        // Inital move by calculating positions
        if (i === allImgList.length) {
          allImgList[i].style.filter = "grayscale(0%)";
        } else {
          allImgList[i].style.filter = "grayscale(100%)";
        }
        allImgList[i].style.transform = "rotateY(" + (i * (360 / allImgList.length)) + "deg) translateZ(380px)";
        allImgList[i].style.transition = "transform 1s";
        allImgList[i].style.transitionDelay = (allImgList.length - i) / 4 + "s";
        // play pause on hover
        allImgList[i].onmouseover = (e) => {
          if (clicked || curVideONum != (allImgList.length - i - 1)) {
            return;
          }
          innerHolder.style.animationPlayState = 'paused';
        }
        allImgList[i].onmouseout = (e) => {
          if (clicked || curVideONum != (allImgList.length - i - 1)) {
            return;
          }
          innerHolder.style.animationPlayState = 'running';
        }
        // click events
        allImgList[i].addEventListener('click', () => {
          // only make click work when it is their turn
          if ((allImgList.length - i - 1) != curVideONum) {
            return;
          }
          // greyscale the prev and color the new one
          curVideONum++;


          setTimeout(() => {
            allImgList[i].style.filter = "grayscale(100%)";
            if (curVideONum < allImgList.length) {
              allImgList[allImgList.length - curVideONum - 1].style.filter = "grayscale(0%)";
            }
          }, 1000);

          innerHolder.style.animationPlayState = 'paused';
          clicked = true;
          if (i === 0) {
            console.log("Keji clicked");
            // todo video for Keji
            $(".dummy").text("Keji");
          } else if (i === 1) {
            console.log("Alex clicked");
            $(".dummy").text("Alex");

            // todo video for Alex

          } else if (i === 2) {
            console.log("Dhurba clicked");
            $(".dummy").text("Dhurba");

            // todo video for Dhurba

          } else if (i === 3) {
            console.log("Zaeem clicked");
            $(".dummy").text("Zaeem");
            // todo video for zaem

          }
          var showVideoDiv = document.querySelector(".showIndivStory");

          showVideoDiv.classList.add("animate__animated");
          showVideoDiv.classList.add("animate__zoomInUp");
          showVideoDiv.style.display = "block";
          // when the close button is clicked 
          $(".closeX").on("click", () => {
            showVideoDiv.classList.add("animate__zoomOutDown");
            clicked = false;
            setTimeout(() => {
              showVideoDiv.classList.remove("animate__zoomOutDown");
              showVideoDiv.classList.remove("animate__zoomInUp");
              showVideoDiv.classList.remove("animate__animated");
              showVideoDiv.style.display = "none";
              innerHolder.style.animationPlayState = 'running';


              // showVideoDiv.classList.remove("animate__animated");

            }, 1300);
          });

        });
      }
      // color the first image
      allImgList[allImgList.length - 1].style.filter = "grayscale(0%)";

    }
    setTimeout(setupImgs, 1000);

    // function that changes the position
    const dragHolder = () => {
      // Prevent the angle
      if (transInY > 60) transInY = 60;
      if (transInY < -30) transInY = -30;
      document.getElementById('outerHolder').style.transform = "rotateX(" + (-transInY) + "deg) rotateY(" + (transInX) + "deg)";
    }

    // rotating divs as mouse moved
    var itmXpos, itmYpos;
    document.onpointerdown = (e) => {
      if (myRippleEff) clearInterval(myRippleEff);
      itmXpos = e.clientX;
      itmYpos = e.clientY;
      // move the div according to te mouse position
      document.addEventListener("pointermove", moveElem);
      document.addEventListener("pointerup", moveStopped);
      // to prevent selection 
      return false;
    };
    const moveElem = (e) => {
      let itmX = e.clientX, itmY = e.clientY;
      changeX = itmX - itmXpos;
      changeY = itmY - itmYpos;
      // calculate the difference and move it there 0.1 = speed
      transInX += changeX * 0.12;
      transInY += changeY * 0.12;
      dragHolder();
      // new positions
      itmXpos = itmX;
      itmYpos = itmY;
    };
    const moveStopped = (e) => {
      // for ripple effect
      myRippleEff = setInterval(() => {
        changeX *= 0.95;
        changeY *= 0.95;
        transInX += changeX * 0.12;
        transInY += changeY * 0.12;
        dragHolder();
        // stop ripple when the speed decreases to a value
        if (Math.abs(changeX) < 0.6 && Math.abs(changeY) < 0.6) {
          clearInterval(myRippleEff);
        }
      }, 10);
      // reset
      document.removeEventListener("pointermove", moveElem);
      document.removeEventListener("pointerup", moveStopped);
    };


    // end
  }, 1000);
});
