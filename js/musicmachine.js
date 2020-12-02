$(document).ready(function () {
    var organ = Synth.createInstrument("organ");
    var allColors = ["#99CC00", "#0099FF", "#9933CC", "#CC0066", "#CC0033", "#FF3300", "#FF6600"];
    var allNotes = ["C", "D", "E", "F", "G", "A", "B"];
    const MIN_OCTAVE = 3, MAX_OCTAVE = 5;
    for (var octave = MIN_OCTAVE; octave <= MAX_OCTAVE; octave++) {
        var row = $("<div>").addClass("row");
        $("#keyboard").append(row);
        for (var i = 0; i < allColors.length; i++) {
            var col = $("<div>").addClass("col");
            row.append(col);
            var keyboardKey = $("<span>").addClass("key");
            col.append(keyboardKey);
            var color = allColors[i];
            keyboardKey.css("background-color", color);
            var note = allNotes[i];
            keyboardKey.data("note", note);
            keyboardKey.data("octave", octave);
            keyboardKey.click(keyClicked);
            keyboardKey.text(`${note}${octave}`);
            keyboardKey.attr("id", `${note}${octave}`);
        }
    }
    var isRecording = false;
    var recordedNotes = [];
    $("#playButton").click(function () {
        playRecording(recordedNotes);
    });
    $("#recordButton").click(toggleRecording);
    $("#clearButton").click(clearRecording);
    function clearRecording() {
        recordedNotes = [];
    }
    function toggleRecording() {
        isRecording = !isRecording;
        $("#recordButton").toggleClass("btn-dark btn-light")
            .text(isRecording ? "Stop Recording" : "Start Recording");
        if (isRecording) {
            clearRecording();
        }
    }
    function recordNote(note, octave) {
        var entry = note + "," + octave;
        recordedNotes.push(entry);
    }
    function playRecordedNote(recordedNote) {
        var pieces = recordedNote.split(",");
        var note = pieces[0]; 
        var octave = pieces[1]; 
        $("#keyPlaying").text(note + octave);
        $("span.key").removeClass("playing")
            .filter(`#${note}${octave}`)
            .addClass("playing");
        playNote(note, octave);
    }
    function playRecording(arrayOfNotes) {
        arrayOfNotes.forEach(function (entry, index) {
            setTimeout(function () {
                playRecordedNote(entry);
            }, index * 500); 
        });
        setTimeout(function () {
            $("span.key").removeClass("playing");
            $("#keyPlaying").html("&nbsp;");
        }, arrayOfNotes.length * 500);
    }
    function keyClicked() {
        var keyPlayed = $(this);
        var notePlayed = keyPlayed.data("note");
        var octavePlayed = keyPlayed.data("octave");
        playNote(notePlayed, octavePlayed);
        if (isRecording)
            recordNote(notePlayed, octavePlayed);
    }
    function playNote(note, octave) {
        organ.play(note, octave, 0.5);
    }
    $("#songTwoButton").click(function(e) {
        e.preventDefault();
        var song =    ["C,5", "C,5", "G,5", "G,5", "A,5", "A,5", "G,5", ",", "F,5", "F,5", "E,5", "E,5", "D,5", "D,5", "C,5"];
        
        playRecording(song);
    })
    $("#songOneButton").click(function(e) {
        e.preventDefault();
    var song =    ["C,5", "C,5", "F,5", "F,5", "F,5", "F,5", "F,5", "F,5", "E,5", "F,5", "G,5"];
        
        playRecording(song);
    })
});