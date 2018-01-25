function imgChange() {

    var i = true;

    if(i) {
       
        document.getElementByClass("IdleImage").src = process.env.PUBLIC_URL +  "/images/idle2.png", 2000;

    } else {

       document.getElementByClass("IdleImage").src = process.env.PUBLIC_URL +  "/images/jump1.png";
    }};

    // else if {

    //     document.getElementByClass("IdleImage").src = process.env.PUBLIC_URL +  "/images/jump2.png";
    // } else if {

    //     document.getElementByClass("IdleImage").src = process.env.PUBLIC_URL +  "/images/jump3.png";
    // } else {

    //     document.getElementByClass("IdleImage").src = process.env.PUBLIC_URL +  "/images/jump4.png";

    // }
   
    // $(document).on('keyup', function(e){
    //     var key = e.which;
    //     if(key == 13)  
    //     {
    //       imageChange();
    //     }
    // });
