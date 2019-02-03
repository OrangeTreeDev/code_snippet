// cursor = db.authors.find();
// while (cursor.hasNext()) {
//     printjson(cursor.next());
// }

db.authors.insertMany([
{
    "_id" : ObjectId("5c404a2c23d3116547de93c7"),
    "name" : "jerry"
},
{
    "_id" : ObjectId("5c404a2c23d3116547de93c8"),
    "name" : "tom"
},
{
    "_id" : ObjectId("5c404a2c23d3116547de93c9"),
    "name" : "bob"
}
]);

var startTime = new Date().getTime();
db.topics.insertMany([
{
    "title": "javascript权威指南",
    "type": "it",
    "createTime": new Date(startTime),
    "authorsId": ObjectId("5c404a2c23d3116547de93c7")
},
{
    "title": "Node.js权威指南",
    "type": "it",
    "createTime": new Date( startTime + 100),
    "authorsId": ObjectId("5c404a2c23d3116547de93c7")
},
{
    "title": "微观经学入门",
    "type": "economic",
    "createTime": new Date( startTime + 200),
    "authorsId": ObjectId("5c404a2c23d3116547de93c8")
}
])