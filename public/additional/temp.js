$(document).ready(function () {
    load();
});


function load() {
    // alert("Working...");
    $("#noOfAbout").focus();
    $("#noOfBatches").focus();
    $("#noOfExams").focus();
    $("#btnNoOfRec").click(function () {
        $("#dynamicText").empty();
        var NoOfRec = $("#noOfAbout").val();

        // alert("" + NoOfRec);

        if (NoOfRec > 0) {
            createControll(NoOfRec);
        }
    });  
    
    $("#batchesBtn").click(function(){
        $('#batchText').empty();
        var noOfBatch = $("#noOfBatches").val();

        if(noOfBatch > 0){
            createBatch(noOfBatch);
        }
    })
    $("#btnExams").click(function(){
        $('#examText').empty();
        var noOfExam = $("#noOfExams").val();

        if(noOfExam > 0){
            createExam(noOfExam);
        }
    })

}

function createControll(NoOfRec) {
    var tbl = "";

    for (var i = 1; i <= NoOfRec; i++) {
        tbl += "<div class='form-group'>" 
               + "<label for='QuestionName" + i +
                "'>Question " + i +  "</label>" + 
                "<textarea id='QuestionName" + i + "' class='form-control' name='Question-" + i + "' rows='4'></textarea>" +
                "</div>";
        $("#dynamicText").append(tbl);
        tbl = "";
        tbl += "<div class='form-group'>" 
        + "<label for='AnswerName" + i +
         "'>Answer " + i +  "</label>" + 
         "<textarea id='AnswerName" + i + "' class='form-control' name='Answer-" + i + "' rows='4'></textarea>" +
         "</div>";
        $("#dynamicText").append(tbl);
        tbl = "";
    }

    
}
function createBatch(noOfBatch) {
    var tbl = "";

    for (var i = 1; i <= noOfBatch; i++) {
        tbl += "<div class='form-group'>" 
               + "<label for='Batch" + i +
                "'>Batch " + i +  "</label>" + 
                "<textarea id='Batch" + i + "' class='form-control' name='Batch-" + i + "' rows='4'></textarea>" +
                "</div>";
        
        $("#batchText").append(tbl);
        tbl = "";
        for(var j = 1 ; j <= 2 ; j++){
            tbl += "<div class='form-group'>" 
            + "<label for='Timing" + i + "-" + j +
             "'>Timing " + i + "-" + j + "</label>" + 
             "<textarea id='Timing" + i + "-" + j +  "' class='form-control' name='Timing-" + i + "-" +  j + "' rows='4'></textarea>" +
             "</div>";
             $("#batchText").append(tbl);
             tbl = "";
        }
        

    }

    
}

function createExam(NoOfRec) {
    var tbl = "";

    for (var i = 1; i <= NoOfRec; i++) {
        tbl += "<div class='form-group'>" 
               + "<label for='ExamQuestionName" + i +
                "'>Exam Question " + i +  "</label>" + 
                "<textarea id='ExamQuestionName" + i + "' class='form-control' name='ExamQuestion-" + i + "' rows='4'></textarea>" +
                "</div>";
        $("#examText").append(tbl);
        tbl = "";
        tbl += "<div class='form-group'>" 
        + "<label for='ExamAnswerName" + i +
         "'>Exam Answer " + i +  "</label>" + 
         "<textarea id='ExamAnswerName" + i + "' class='form-control' name='ExamAnswer-" + i + "' rows='4'></textarea>" +
         "</div>";
        $("#examText").append(tbl);
        tbl = "";
    }

    
}