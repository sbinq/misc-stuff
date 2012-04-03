var replica_1_cmd = { addShard : "localhost:30000" };
var replica_2_cmd = { addShard : "localhost:30100" };
print('Executing ' + tojson(replica_1_cmd) + ' and ' + tojson(replica_2_cmd));
print(tojson( db.adminCommand(replica_1_cmd) ));
print(tojson( db.adminCommand(replica_2_cmd) ));
