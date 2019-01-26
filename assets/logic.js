var config = {
    apiKey: "AIzaSyC77UWIVETk1xW6kdpZTMEarvsmRttm-7Y",
    authDomain: "train-scheduler-43345.firebaseapp.com",
    databaseURL: "https://train-scheduler-43345.firebaseio.com",
    projectId: "train-scheduler-43345",
    storageBucket: "train-scheduler-43345.appspot.com",
    messagingSenderId: "419493152249"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-button").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTime").val().trim();
    var frequency = $("#frequency").val().trim();


    var newTrain = {
        name: trainName,
        place: destination,
        start: firstTrain,
        mins: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.place);
    console.log(newTrain.start);
    console.log(newTrain.mins);

    alert("Train successfully added");

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTime").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrain = childSnapshot.val().start;
    var frequency = childSnapshot.val().mins;

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );

    $("#train-table > tbody").append(newRow);

});