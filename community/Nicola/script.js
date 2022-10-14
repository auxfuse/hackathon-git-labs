$('.card').click(function(){
    $(this).toggleClass('flipped');
  });

  jQuery('.x-face-button').each(function() {
    var theHref = jQuery(this).attr('href');
    jQuery(this).closest('.x-face-outer.back').on('click', function() {
      window.location.href= theHref;
    });
  });