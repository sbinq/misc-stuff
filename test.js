function printQueryResult(query) {
  print("Collection content:");
  query.forEach(function(val){ printjson(val); })
}

function printLastError() {
  print("getLastErrorObj:");
  printjson( db.getLastErrorObj() );
}

db.docs.drop(); // cleanup just in case this script is re-launched separately

printjson( db.adminCommand({"enablesharding": "test"}) );
printjson( db.adminCommand({"shardcollection": "test.docs", "key": {"shard": 1}}) );

print("\nInserting object into collection..");
db.docs.insert({_id: 1, version: 1, shard: "boo", value: 10});
printQueryResult( db.docs.find() );

print("\nUpdating object by _id (no version, just _id)..");
db.docs.update({_id: 1}, {version: 2, shard: "boo", value: 20});
printLastError();
printQueryResult( db.docs.find() );

print("\nUpdating object by _id with version (it is going to fail)..");
db.docs.update({_id: 1, version: 2}, {version: 3, shard: "boo", value: 30});
printLastError();
printQueryResult( db.docs.find() );
