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
    "title": "javascriptȨ��ָ��",
    "type": "it",
    "createTime": new Date(startTime),
    "authorsId": ObjectId("5c404a2c23d3116547de93c7")
},
{
    "title": "Node.jsȨ��ָ��",
    "type": "it",
    "createTime": new Date( startTime + 100),
    "authorsId": ObjectId("5c404a2c23d3116547de93c7")
},
{
    "title": "΢�۾�ѧ����",
    "type": "economic",
    "createTime": new Date( startTime + 200),
    "authorsId": ObjectId("5c404a2c23d3116547de93c8")
}
])