            $(document).keydown(function(e){
                if (e.keyCode == 27) { 
                    $('div#lightbox').fadeOut('slow', function(){
                        $('div#lightbox_panel').fadeIn('slow');
                    });
                }
            });

            $(document).ready(function() {  
            $('.lightbox_button').click(function(e) {
                e.preventDefault();  
                     $('#lightbox').fadeIn('slow');
                     $('#lightbox_panel').fadeIn('slow');
                });
                $('#close_lightbox').click(function() {
                    
                    $('#lightbox').fadeOut('slow');
                    $('#lightbox_panel').fadeOut('slow');
                
                    });
            });

