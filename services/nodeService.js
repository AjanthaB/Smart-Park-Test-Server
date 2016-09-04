/**
 * Created by ajantha on 9/3/16.
 */


var Node = require('../models/nodeModel');

function NodeService() {
    this.Node = Node;
}

NodeService.prototype.findOneAndUpdate = function(node,cb) {
    var query = {nodeId: node.nodeId};
    Node.findOneAndUpdate(query, node, {upsert: true}, function (err) {
        cb(err,node);
    });
};

NodeService.prototype.getAll = function(cb) {
    Node.aggregate([
        {$group:{_id:{owner:"$owner"},isActiveCount:{$sum:{$cond:[{$eq:["$isActive",true]},1,0]}},count:{$sum:1}}},
        {$project:{count:1,isActiveCount:1,owner:"$_id.owner",_id:0}}
    ], function (err, docs) {
        cb(err,docs);
    });
};

NodeService.prototype.save = function(node,cb) {
    Node.save(function (err) {
        cb(err,node);
    });
};

module.exports = NodeService;


