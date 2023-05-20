const dataItem = (...item) => `
<div class="card">
<div class="card-body">
<div class="row">
<div class="col-md-4">

${item.map((item) => `
    <div class="d-flex justify-content-between">
    <h5 class="card-title">${item[0]}</h5>
    <p class="card-text">${item[1]}</p>
    </div>
    `).join("")

    }

</div>
</div>
</div>
</div>
`

$(document).ready(function () {

    // console.log("ready!");
    var commentData = {}
    var ticketData = {}
    $.ajax({
        type: "GET",
        url: "/data/igexport.json",
        data: {},
        dataType: "json",
        success: function (response) {
            commentData = response;
            console.log("igexport載入資料成功");
        }
    });
    $.ajax({
        type: "GET",
        url: "/data/ticket_num.json",
        data: {},
        dataType: "json",
        success: function (response) {
            ticketData = response;
            console.log("ticket_num載入資料成功");
        }
    });


    $("#ig-search button").click(function (e) {
        e.preventDefault();
        // Search By IG

        var ig = $("#ig-input").val();

        $("#ig-search .output").empty();

        for (data of commentData) {
            if (data["Name"].includes(ig)) {
                $("#ig-search .output").append(dataItem(
                    ["IG", data["Name"]],
                    ["Comment", data["Comment"]],
                    ["Date", data["Date"]]
                ));
            }
        }

    });
    $("#student-id-search button").click(function (e) {
        e.preventDefault();
        // Search By student-id


        // {
        //     "姓名": "蔡淑如",
        //     "IG 帳號": "___lulu0122",
        //     "學號": 1410904022,
        //     "流水號": 402
        //   },
        var studentId = $("#student-id-input").val();
        $("#student-id-search .output").empty();

        for (data of ticketData) {
            if (data["流水號"] == "") {
                continue;
            }
            if (`${data["學號"]}`.includes(studentId)) {
                $("#student-id-search .output").append(dataItem(
                    ["姓名", data["姓名"]],
                    ["IG 帳號", data["IG 帳號"]],
                    ["學號", data["學號"]],
                    ["流水號", data["流水號"]]
                ));
            }
        }


    });

    $("#ticket-search button").click(function (e) {
        e.preventDefault();
        // Search By ticket-id

        var ticketId = $("#ticket-input").val();

        $("#ticket-search .output").empty();

        for (data of ticketData) {
            if (data["流水號"] == "") {
                continue;
            }
            if (`${data["流水號"]}`.includes(ticketId)) {
                $("#ticket-search .output").append(dataItem(
                    ["姓名", data["姓名"]],
                    ["IG 帳號", data["IG 帳號"]],
                    ["學號", data["學號"]],
                    ["流水號", data["流水號"]]
                ));
            }
        }
    });

    // name search

    $("#name-search button").click(function (e) {
        e.preventDefault();
        // Search By name

        var name = $("#name-input").val();

        $("#name-search .output").empty();

        for (data of ticketData) {
            if (data["流水號"] == "") {
                continue;
            }
            if (`${data["姓名"]}`.includes(name)) {
                $("#name-search .output").append(dataItem(
                    ["姓名", data["姓名"]],
                    ["IG 帳號", data["IG 帳號"]],
                    ["學號", data["學號"]],
                    ["流水號", data["流水號"]]
                ));
            }
        }
    }
    );

    // ig-form search

    $("#ig-form-search button").click(function (e) {
        e.preventDefault();
        // Search By ig-form

        var igForm = $("#ig-form-input").val();

        $("#ig-form-search .output").empty();

        for (data of ticketData) {
            if (data["流水號"] == "") {
                continue;
            }
            if (`${data["IG 帳號"]}`.includes(igForm)) {
                $("#ig-form-search .output").append(dataItem(
                    ["姓名", data["姓名"]],
                    ["IG 帳號", data["IG 帳號"]],
                    ["學號", data["學號"]],
                    ["流水號", data["流水號"]]
                ));
            }
        }
    }
    );



});