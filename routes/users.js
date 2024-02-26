const express = require("express"),
	router = express.Router();

// get user lists
router.get("/list", function (req, res) {
	console.log("get user list");
	let sql = `SELECT NodeStatus FROM \`NW-1\`.NodeStatus WHERE NodeID = ? AND TimeStamp > date_sub(now(), interval 2 hour)`;
	db.query(sql,req.body.nodeid,function (err, data, fields) {
		if (err) throw err;
		res.json(data);
		console.log("sending");
		console.log(data);
	});
});

router.get("/list1", function (req, res) {
	let sql = `SELECT DISTINCT NodeID FROM \`NW-1\`.NWG WHERE SlotID=? AND (TimeStamp > date_sub(now(), interval 1 hour))`;
	db.query(sql,req.body.slotid, function (err, data, fields) {
		if (err) throw err;
		res.json(data);
		console.log("sending");
		console.log(data);
	});
});

router.get("/list2", function (req, res) {
	let sql = `SELECT TGS2620, TGS2602, TGS2600 FROM \`NW-1\`.NWG WHERE NodeID=? ORDER BY TimeStamp DESC LIMIT 1`;
	db.query(sql, req.body.nodeid,function (err, data, fields) {
		if (err) throw err;
		res.json(data);
		console.log("sending");
		console.log(data);
	});
});

router.get("/list3", function (req, res) {
	let sql = `SELECT StatusUpdate FROM \`NW-1\`.NodeStatus WHERE NodeID=? ORDER BY TimeStamp DESC LIMIT 1`;
	db.query(sql, req.body.nodeid,function (err, data, fields) {
		if (err) throw err;
		res.json(data);
		console.log("sending");
		console.log(data);
	});
});

router.get("/list4", function (req, res) {
	let sql = `SELECT CO2, Moisture FROM \`NW-1\`.co2_node_data WHERE NodeID=? ORDER BY TimeStamp DESC LIMIT 1`;
	db.query(sql,req.body.nodeid, function (err, data, fields) {
		if (err) throw err;
		res.json(data);
		console.log("sending");
		console.log(data);
	});
});
router.get("/test", function (req, res) {
    console.log(db);
	let sql = `SELECT * FROM \`NW-3\`.User`;
	db.query(sql, function (err, data, fields) {
        console.log(".....");
		if (err) throw err;
		res.json(data);
	});
});

// create new api
router.post("/newf", function (req, res) {
	var istOffset = 5 * 60 + 30;
var adjustedTime = new Date(new Date().getTime() + istOffset * 60000);

var formattedMysqlString = adjustedTime.toISOString().slice(0, 19).replace('T', ' ');
	let sql = `INSERT INTO \`NW-3\`.NWF( w_id, s_id, n_id, SV1, SV2,SV3, Timestamp) VALUES (?)`;
	let values = [
		req.body.warehouseID,
		req.body.SlotID,
		req.body.NodeID,
		req.body.TGS2600,
		req.body.TGS2602,
		req.body.TGS2620,
		// req.body.TGS822,
		// req.body.TGS826,
		// req.body.TGS880,
		// req.body.NodeStatus,
		// req.body.StatusUpdate,
		// req.body.Suggestion,
		formattedMysqlString,
	];
	console.log(values);
	db.query(sql, [values], function (err, data, fields) {
		if (err) throw err;
		res.status(200).json({
			status: 200,
			message: "New data added successfully",
		});
	});
	console.log("commited into fixed nodes...");
});
router.post("/newc", function (req, res) {
	var istOffset = 5 * 60 + 30;
var adjustedTime = new Date(new Date().getTime() + istOffset * 60000);

var formattedMysqlString = adjustedTime.toISOString().slice(0, 19).replace('T', ' ');
	let sql = `INSERT INTO \`NW-3\`.NWC( w_id, s_id, n_id, CO2, Humidity,Temperature, Timescltamp) VALUES (?)`;
	let values = [
		req.body.warehouseID,
		req.body.SlotID,
		req.body.NodeID,
		req.body.CO2,
		req.body.Humidity,
		req.body.Temperature,
		// req.body.TGS822,
		// req.body.TGS826,
		// req.body.TGS880,
		// req.body.NodeStatus,
		// req.body.StatusUpdate,
		// req.body.Suggestion,
		formattedMysqlString,
	];
	console.log(values);
	db.query(sql, [values], function (err, data, fields) {
		if (err) throw err;
		res.status(200).json({
			status: 200,
			message: "New data added successfully",
		});
	});
	console.log("commited into co2 nodes...");
});
router.post("/new1", function (req, res) {
	const dt = new Date();
	const d = dt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
	let sql = `INSERT INTO \`NW-1\`.Slot_Status( SlotID, AverageTGS2620, AverageTGS2602, AverageTGS2600, SlotStatus, Suggestion, QualityRating, TimeStamp) VALUES (?)`;
	let values = [
		// req.body.warehouseID,
		req.body.SlotID,
		// req.body.NodeID,
		req.body.AverageTGS2620,
		req.body.AverageTGS2602,
		req.body.AverageTGS2600,
		// req.body.TGS822,
		// req.body.TGS826,
		// req.body.TGS880,
		req.body.SlotStatus,
		req.body.Suggestion,
		req.body.QualityRating,
		d,
	];
	console.log(values);
	db.query(sql, [values], function (err, data, fields) {
		if (err) throw err;
		res.status(200).json({
			status: 200,
			message: "New data added successfully",
		});
	});
	console.log("commited into slotstatus");
});
router.post("/new2", function (req, res) {
	const dt = new Date();
	const d = dt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
	let sql = `INSERT INTO \`NW-1\`.NWG(WarehouseID, NodeID, SlotID, TGS2620, TGS2602, TGS2600, TimeStamp) VALUES (?)`;
	let values = [
		req.body.WarehouseID,
		req.body.NodeID,
		req.body.SlotID,
		req.body.TGS2620,
		req.body.TGS2602,
		req.body.TGS2600,
		// req.body.TGS822,
		// req.body.TGS826,
		// req.body.TGS880,
		// req.body.SlotStatus,
		// req.body.Suggestion,
		// req.body.QualityRating,
		d,
	];
	console.log(values);
	db.query(sql, [values], function (err, data, fields) {
		if (err) throw err;
		res.status(200).json({
			status: 200,
			message: "New data added successfully",
		});
	});
	console.log("commited into nwg");
});
router.post("/new3", function (req, res) {
	const dt = new Date();
	const d = dt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
	let sql = `INSERT INTO \`NW-1\`.co2_node_data(WarehouseID, NodeID, SlotID, CO2, Moisture, Inference, AlertLevel, TimeStamp) VALUES (?)`;
	let values = [
		req.body.WarehouseID,
		req.body.NodeID,
		req.body.SlotID,
		req.body.CO2,
		req.body.Moisture,
		req.body.Inference,
		req.body.AlertLevel,
		// req.body.TGS826,
		// req.body.TGS880,
		// req.body.SlotStatus,
		// req.body.Suggestion,
		// req.body.QualityRating,
		d,
	];
	console.log(values);
	db.query(sql, [values], function (err, data, fields) {
		if (err) throw err;
		res.status(200).json({
			status: 200,
			message: "New data added successfully",
		});
	});
	console.log("commited into co2node");
});
router.post("/new4", function (req, res) {
	const dt = new Date();
	const d = dt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
	let sql = `INSERT INTO \`NW-1\`.co2_slot_data(WarehouseID, SlotID, AverageCO2, AverageMoisture, SlotStatus, AlertLevel, TimeStamp) VALUES (?)`;
	let values = [
		req.body.WarehouseID,
		req.body.SlotID,
		req.body.AverageCO2,
		req.body.AverageMoisture,
		req.body.SlotStatus,
		// req.body.Inference,
		req.body.AlertLevel,
		// req.body.TGS826,
		// req.body.TGS880,
		// req.body.SlotStatus,
		// req.body.Suggestion,
		// req.body.QualityRating,
		d,
	];
	console.log(values);
	db.query(sql, [values], function (err, data, fields) {
		if (err) throw err;
		res.status(200).json({
			status: 200,
			message: "New data added successfully",
		});
	});
	console.log("commited into co2slot");
});
router.post("/mlapi", function (req, res) {
	const dt = new Date();
	const d = dt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
	pred = ""

    if (req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.0"
    else if (req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600>1355)
        pred = "C1.1"
    else if(req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600<695)
        pred = "C1.2"
    else if(req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602>2070 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.3"
    else if(req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602<1230 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.4"
    else if(req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602>2070 && req.body.TGS2600<695)
        pred = "C1.5"
    else if(req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602<1230 && req.body.TGS2600>1355)
        pred = "C1.6"
    else if(req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602>2070 && req.body.TGS2600>1355)
        pred = "C1.7"
    else if(req.body.TGS2620<=2270 && req.body.TGS2620>=1430 && req.body.TGS2602<1230 && req.body.TGS2600<695)
        pred = "C1.8"
    else if(req.body.TGS2620>2270 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.9"
    else if(req.body.TGS2620<1430 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.10"
    else if(req.body.TGS2620>2270 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600<695)
        pred = "C1.11"
    else if(req.body.TGS2620 >2270 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600>1355)
        pred = "C1.12"
    else if(req.body.TGS2620<1430 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600>1355)
        pred = "C1.13"
    else if(req.body.TGS2620<1430 && req.body.TGS2602<=2070 && req.body.TGS2602>=1230 && req.body.TGS2600<695)
        pred = "C1.14"
    else if(req.body.TGS2620>2270 && req.body.TGS2602<1230 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.15"
    else if(req.body.TGS2620>2270 && req.body.TGS2602>2070 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.16"
    else if(req.body.TGS2620<1430 && req.body.TGS2602<1230 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.17"
    else if(req.body.TGS2620<1430 && req.body.TGS2602>2070 && req.body.TGS2600<=1355 && req.body.TGS2600>=695)
        pred = "C1.18"
    else if(req.body.TGS2620<1430 && req.body.TGS2602<1230 && req.body.TGS2600<695)
        pred = "C1.19"
    else if(req.body.TGS2620<1430 && req.body.TGS2602<1230 && req.body.TGS2600>1355)
        pred = "C1.20"
    else if(req.body.TGS2620<1430 && req.body.TGS2602>2070 && req.body.TGS2600>1355)
        pred = "C1.21"
    else if(req.body.TGS2620>2270 && req.body.TGS2602<1230 && req.body.TGS2600>1355)
        pred = "C1.22"
    else if(req.body.TGS2620>2270 && req.body.TGS2602>2070 && req.body.TGS2600<695)
        pred = "C1.23"
    else if(req.body.TGS2620>2270 && req.body.TGS2602>2070 && req.body.TGS2600>1355)
        pred = "C1.24"
    else if(req.body.TGS2620<1430 && req.body.TGS2602>2070 && req.body.TGS2600<695)
        pred = "C1.25"
    else if(req.body.TGS2620>2270 && req.body.TGS2602<1230 && req.body.TGS2600<695)
        pred = "C1.26"

    // time = (datetime.now() - timedelta(hours=0, minutes=0)).strftime("%H)%M)%S")
    // date = datetime.today().strftime('%Y-%m-%d')
    // timestamp = date+ " " +time
        
    // # Quality sttatus of Node at that instance
    sttatus = ""
    node_suggestion = ""

    if (pred=="C1.0"){
        sttatus="Good"
        node_suggestion = "Normal"
	}
    else if(pred in ["C1.5", "C1.6", "C1.7", "C1.8", "C1.11", "C1.12", "C1.13", "C1.14", "C1.15", "C1.16", "C1.17", "C1.18", "C1.19", "C1.20", "C1.21", "C1.22", "C1.23", "C1.24", "C1.25", "C1.26"]){
        sttatus="Quality Check"
        node_suggestion = "Check the quality of paddy"
        if (pred=="C1.5")
            node_suggestion+=" & Check sensor G3 in Node "+str(node_id[-2])
        else if(pred=="C1.6" || pred=="C1.22")
            node_suggestion+=" & Check sensor G2 in Node "+str(node_id[-2])
        else if(pred=="C1.8" || pred=="C1.26")
            node_suggestion+=" & Check sensor G2 & G3 in Node "+str(node_id[-2])
        else if(pred=="C1.11" || pred=="C1.23")
            node_suggestion+=" & Check sensor G3 in Node "+str(node_id[-2])
        else if(pred=="C1.13" || pred=="C1.21")
            node_suggestion+=" & Check sensor G1 in Node "+str(node_id[-2])
        else if(pred=="C1.14" || pred=="C1.25")
            node_suggestion+=" & Check sensor G1 & G3 in Node "+str(node_id[-2])
        else if(pred=="C1.15")
            node_suggestion+=" & Check sensor G2 in Node "+str(node_id[-2])
        else if(pred=="C1.17" || pred=="C1.20")
            node_suggestion+=" & Check sensor G1 & G2 in Node "+str(node_id[-2])
        else if(pred=="C1.18")
            node_suggestion+=" & Check sensor G1 in Node "+str(node_id[-2])
        else if(pred=="C1.19")
            node_suggestion+=" & Check sensor G1, G2 & G3 in Node "+str(node_id[-2])
	}      
    else if(pred in ["C1.1", "C1.3", "C1.9"]){
        sttatus="Good & Quality Check"
        node_suggestion = "Normal & Need to Check"
	}
    else if(pred in ["C1.2", "C1.4", "C1.10"]){
        sttatus="Good & Sensor Check"
        node_suggestion = "Normal & Need to Check sensor "
        if (pred == "C1.2")
            node_suggestion += "G3 in Node "+str(node_id[-2])
        else if(pred=="C1.4")
            node_suggestion += "G2 in Node "+str(node_id[-2])
        else if(pred =="C1.10")
            node_suggestion += "G1 in Node "+str(node_id[-2])
	}
    // ## Using SQL Query to grab data in last 2 hours of that particular node to calculate sttatus using Decaying Window Algorithm
    
    let sql = `INSERT INTO \`NW-1\`.NWG(WarehouseID, NodeID, SlotID, TGS2620, TGS2602, TGS2600, TimeStamp) VALUES (?)`;
	let values = [
		req.body.WarehouseID,
		req.body.NodeID,
		req.body.SlotID,
		req.body.TGS2620,
		req.body.TGS2602,
		req.body.TGS2600,
		// req.body.TGS822,
		// req.body.TGS826,
		// req.body.TGS880,
		// req.body.SlotStatus,
		// req.body.Suggestion,
		// req.body.QualityRating,
		d,
	];
	console.log(values);
	db.query(sql, [values]);
    let sql1 = `INSERT INTO \`NW-1\`.NodeStatus( SlotID, NodeID, NodeStatus, StatusUpdate, Suggestion, TimeStamp) VALUES (?)`;
	let values2 = [
		// req.body.warehouseID,
		req.body.SlotID,
		req.body.NodeID,
		// req.body.TGS2600,
		// req.body.TGS2602,
		// req.body.TGS2620,
		// req.body.TGS822,
		// req.body.TGS826,
		// req.body.TGS880,
		sttatus,
		sttatus,
		node_suggestion,
		d,
	];
	console.log(values);
	db.query(sql1, [values2]);
	res.status(200).json({
		status: 200,
		message: "New data added successfully",
	});
});

router.post("/new5", function (req, res) {
	const dt = new Date();
	const d = dt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
	let sql = `INSERT INTO \`NW-1\`.NWG(WarehouseID, NodeID, SlotID, CO2, Temperature, Humidity, TimeStamp) VALUES (?)`;
	let values = [
		req.body.WarehouseID,
		req.body.NodeID,
		req.body.SlotID,
		req.body.CO2,
		req.body.Temperature,
		// req.body.Inference,
		req.body.Humidity,
		// req.body.TGS826,
		// req.body.TGS880,
		// req.body.SlotStatus,
		// req.body.Suggestion,
		// req.body.QualityRating,
		d,
	];
	console.log(values);
	db.query(sql, [values], function (err, data, fields) {
		if (err) throw err;
		res.status(200).json({
			status: 200,
			message: "New data added successfully",
		});
	});
});
module.exports = router;