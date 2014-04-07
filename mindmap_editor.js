/**
 * Created with IntelliJ IDEA.
 * User: admin
 * Date: 4/7/14
 * Time: 7:59 PM
 * To change this template use File | Settings | File Templates.
 */

var eventBus = require('vertx/event_bus');

function findNodeByKey(root, key) {
    if (root.key === key) {
        return root;
    } else if (root.children) {
        for (var i = 0; i < root.children.length; i++) {
            var match = findNodeByKey(root.children[i], key);
            if (match) {
                return root;
            }
        }
    }
};

function newNodeKey() {
    return java.util.UUID.randomUUID().toString();
}


eventBus.registerHandler('mindMaps.editor.addNode', function (args) {

});

eventBus.registerHandler('mindMaps.editor.renameNode', function (args) {

});

eventBus.registerHandler('mindMaps.editor.deleteNode', function (args) {

});
