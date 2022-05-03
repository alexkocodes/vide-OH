document.querySelector("#h2title").addEventListener("click", () => {
  let myTitleChnge = document.querySelector("#h2title");
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
    var outerHolder = document.getElementById('outerHolder');
    var innerHolder = document.getElementById('innerHolder');
    var allImgList = document.querySelectorAll('#innerHolder img');
    // global variables for applying the transform change
    var changeX = 0, changeY = 0, transInX = 0, transInY = 10;
    var myRippleEff; // global interval

    const init = (delayTime) => {
      // inital setup for the Images to setup in position
      for (let i = 0; i < allImgList.length; i++) {
        // Inital move by calculating positions
        allImgList[i].style.transform = "rotateY(" + (i * (360 / allImgList.length)) + "deg) translateZ(330px)";
        allImgList[i].style.transition = "transform 1s";
        allImgList[i].style.transitionDelay = delayTime || (allImgList.length - i) / 4 + "s";
        // play pause on hover
        allImgList[i].onmouseover = (e) => {
          innerHolder.style.animationPlayState = 'paused';
        }
        allImgList[i].onmouseout = (e) => {
          innerHolder.style.animationPlayState = 'running';
        }
        // click events
        allImgList[i].addEventListener('click', () => {
          if (i === 0) {
            console.log("Zaaem clicked");
            $(".dummy").text("Zaaem");
            // todo video for zaem
          } else if (i === 1) {
            console.log("Dhurba clicked");
            $(".dummy").text("Dhurba");

            // todo video for Dhurba

          } else if (i === 2) {
            console.log("Alex clicked");
            $(".dummy").text("Alex");

            // todo video for Alex

          } else if (i === 3) {
            console.log("Keji clicked");
            // todo video for Keji
            $(".dummy").text("Keji");

          }
          var showVideoDiv = document.querySelector(".showIndivStory");

          showVideoDiv.classList.add("animate__animated");
          showVideoDiv.classList.add("animate__zoomInUp");
          showVideoDiv.style.display = "block";
          $(".closeX").on("click", () => {
            showVideoDiv.classList.add("animate__zoomOutDown");
            setTimeout(() => {
              showVideoDiv.classList.remove("animate__zoomOutDown");
              showVideoDiv.classList.remove("animate__zoomInUp");
              showVideoDiv.classList.remove("animate__animated");
              showVideoDiv.style.display = "none";

              // showVideoDiv.classList.remove("animate__animated");

            }, 2000);
          });

        });
      }
    }
    setTimeout(init, 1000);

    // function that changes the position
    const dragHolder = () => {
      // Prevent the angle
      if (transInY > 60) transInY = 60;
      if (transInY < -30) transInY = -30;
      outerHolder.style.transform = "rotateX(" + (-transInY) + "deg) rotateY(" + (transInX) + "deg)";
    }

    // rotating divs as mouse moved
    document.onpointerdown = (e) => {
      if (myRippleEff) clearInterval(myRippleEff);
      var itmXpos = e.clientX, itmYpos = e.clientY;
      // move the div according to te mouse position
      document.onpointermove = (e) => {
        let itmX = e.clientX, itmY = e.clientY;
        changeX = itmX - itmXpos;
        changeY = itmY - itmYpos;
        // calculate the difference and move it there 0.1 = speed
        transInX += changeX * 0.1;
        transInY += changeY * 0.1;
        dragHolder();
        // new positions
        itmXpos = itmX;
        itmYpos = itmY;
      };

      document.onpointerup = (e) => {
        // for ripple effect
        myRippleEff = setInterval(() => {
          changeX *= 0.95;
          changeY *= 0.95;
          transInX += changeX * 0.1;
          transInY += changeY * 0.1;
          dragHolder();
          // stop ripple when the speed decreases to a value
          if (Math.abs(changeX) < 0.6 && Math.abs(changeY) < 0.6) {
            clearInterval(myRippleEff);
          }
        }, 10);
        // reset
        document.onpointermove = document.onpointerup = null;
      };

      // to prevent selection 
      return false;
    };


    // end
  }, 700);
});
