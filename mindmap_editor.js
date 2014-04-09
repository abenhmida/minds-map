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
};

function publishMindMapEvent(mindMap, event) {
    eventBus.publish('mindsMaps.events.' + mindMap._id, event);
};


eventBus.registerHandler('mindMaps.editor.addNode', function (args) {
    eventBus.send('mindMaps.find', {_id: args.mindMapId}, function (res) {
        if (res.mindMap) {
            var mindMap = res.mindMap;
            var parent = findNodeByKey(mindMap, args.parentKey);
            var newNode = {key: newNodeKey()};
            if (args.name) {
                newNode.name = args.name;
            } else {
                newNode.name = args.name;
            }
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(newNode);
            eventBus.send('mindMaps.save', mindMap, function () {
                publishMindMapEvent(mindMap, {event: 'nodeAdded',
                    parentKey: args.parentKey, node: newNode});
            });
        }
    });
});

eventBus.registerHandler('mindMaps.editor.renameNode', function (args) {

});

eventBus.registerHandler('mindMaps.editor.deleteNode', function (args) {

});
