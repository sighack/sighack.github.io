$(function() {
    $('.clickgif').click(function() {
        var current = $(this).attr('src');
        var name = current.split('.')[0];
        var extension = current.split('.')[1];
        console.log(name + ',' + extension);
        if (extension == 'png') {
            //console.log('switch to gif');
            $(this).attr('src', name + '.gif');
        } else {
            //console.log('switch to png');
            $(this).attr('src', name + '.png');
        }
        return false;
    });
});
