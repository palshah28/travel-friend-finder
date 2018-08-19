var friendData = require("../data/friendData");

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/friends", function(req, res) {
      res.json(friendData);
    });


    app.post("/api/friends", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware
        var friends = friendData;
        var userInput = req.body;
		//console.log('userInput = ' + JSON.stringify(friends));

		var userResponses = userInput.score;
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
		//	console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].score[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friendData.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});


    };