const dataItem = (...item) => `
<div class="card">
<div class="card-body">
<div class="row">
<div class="col-12">

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
        url: "../data/igexport.json",
        data: {},
        dataType: "json",
        success: function (response) {
            commentData = response;
            console.log("igexport載入資料成功");
            $("#load_hint").html(`${$("#load_hint").html()} 留言資料載入成功`);
        }
    });
    $.ajax({
        type: "GET",
        url: "../data/ticket_num.json",
        data: {},
        dataType: "json",
        success: function (response) {
            ticketData = response;
            console.log("ticket_num載入資料成功");
            $("#load_hint").html(`${$("#load_hint").html()} 票號資料載入成功`);
        }
    });

    $("#ticket-search button").click(function (e) {
        e.preventDefault();

        
    })
    // $("#ticket-search input").keyup(function (e) {
    $("#ticket-search button").click(function (e) {
        e.preventDefault();
        // Search By ticket-id

        var ticketId = $("#ticket-input").val();

        $("#ticket-search .output").empty();

        for (data of ticketData) {
            if(data["流水號"] == ""){
                continue;
            }
            if (`${data["流水號"]}`.includes(ticketId)) {

                // 以搜尋到流水號 以流水號去搜尋IG

                let comments = []
                let counter = 0
                for (data2 of commentData) {
                    if (data2["Name"] == data["IG 帳號"]) {
                        counter++;
                        comments.push(
                            [`Comment${counter}`, data2["Comment"].replaceAll("@",`<mark style="background: mark!important">@</mark>`)],

                        );
                        comments.push(
                            [`Date${counter}`,data2["Date"] ],
                        );
                        // if(counter == 1){
                        //     window.open(`https://www.instagram.com/${data["IG 帳號"]}/following/`, '_blank');
                        // }
                    }

                }

                if (counter != 0){
                    // console.log(comments)

                    $("#ticket-search .output").append(dataItem(
                        ["姓名", data["姓名"]],
                        ["IG 帳號", data["IG 帳號"]],
                        ["學號", data["學號"]],
                        ["流水號", data["流水號"]],
                        ["追蹤者列表",`<a href="https://www.instagram.com/${data["IG 帳號"]}/following/" target="_blank">${data["IG 帳號"]}ㄉ列表</a>`],
                        ["留言資料","-----"],
                        ...comments
                    ));
                }

            }
        }
    });
});