(function() {
    var popupCurrent = function(user_data) {
        var current = new Ractive({
            template: $('#current-template').text().replace(/\{/g,'{{').replace(/\}/g,'}}'),
            data: user_data
        });
        $.magnificPopup.open({
            items: [{
                src: $(current.toHTML()),
                type: 'inline'
            }],
            closeMarkup: '<div class="close-bg"><button title="%title%" type="button" class="mfp-close">&times;</button></div>'
        });
    };

    $('#members').on('click', '.profile', function(e) {
        $.ajax({
            url: '/user/' + $(e.currentTarget).data('email'),
            dataType: 'json',
            success: popupCurrent
        });
    });

    var toggleActionLink = function(){
        var existing = $('#members').data('exist');
        
        if (existing) {
            $(".edit-profile").removeClass("hidden");
        }else{
            $(".new-profile").removeClass("hidden");
        }
    }

    toggleActionLink();
})();
