$(function() {
    $('.clickgif').click(function() {
        var current = $(this).attr('src');
        var name = current.split('.')[0];
        var extension = current.split('.')[1];
        if (extension == 'png') {
            name = name + '.gif';
        } else {
            name = name + '.png';
        }
        $(this).css('opacity', '0.4');
        $(this).attr('src', name).on('load', function() {
            console.log('image loaded');
            $(this).css('opacity', '1.0');
        });
        return false;
    });
});
