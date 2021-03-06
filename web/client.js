/**
 * Created with IntelliJ IDEA.
 * User: admin
 * Date: 3/30/14
 * Time: 8:11 PM
 * To change this template use File | Settings | File Templates.
 */

var eb = new vertx.EventBus(window.location.protocol + '//' + window.location.hostname + ':' +
    window.location.port + '/eventbus');
eb.onopen = function () {

    var renderListItem = function (mindMap) {
        var li = $('<li>');
        var deleteMindMap = function(){
            eb.send('mindMaps.delete', {id: mindMap._id}, function() {
                li.remove();
            });
            return false;
        };

        $('<span>').text(mindMap.name).appendTo(li);
        $('<button>').text('delete').on('click', deleteMindMap).appendTo(li);

        li.appendTo('.mind-maps');
    };

    $('.create-form').submit(function () {
        var nameInput = $('[name=name]', this);
        eb.send('mindMaps.save', {name: nameInput.val()}, function (result) {
            renderListItem(result);
            nameInput.val('');
        });
        return false;
    });


    eb.send('mindMaps.list', {}, function (res) {
        $.each(res.mindMaps, function () {
            renderListItem(this);
        });
    });
};
