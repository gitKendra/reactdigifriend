import pics from '../../../public/images';

var currentImageIndex = -1,
        maxImageIndex = 0,
        images = ['idle2.png','jump1.png', 'jump2.png', 'jump3.png', 'jump4.png'],
        changeInterval = 1500;

    var setUp = function() {
        images = document.images;
        maxImageIndex = images.length;
        currentImageIndex = 0;
    };
    
    var jump = function() {
        var i;

        currentImageIndex = (currentImageIndex >= maxImageIndex - 1) ? 0 : currentImageIndex += 1;

        for (i = 0; i < maxImageIndex; i += 1) {
            images[i].hidden = (i !== currentImageIndex);
        }
    };

    this.onload = function() {
        setUp();

        images[currentImageIndex].hidden = false; 

        setInterval(changeBanner, changeInterval); 
    };

    
]
$(document).on('keyup', function(e){
    var key = e.which;
    if(key == 13)  // the enter key ascii code
    {
      jump();
    }
});