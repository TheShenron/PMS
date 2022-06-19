const date = new Date();
const TodayDate = "D" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
const doc = document.querySelectorAll(".btn.m-0.p-0");
var GlobleUserData;  // to store the userdata when page is load
let DataLength = 0;  //this should be the last index; if undefine 0 and length one is also 0



window.addEventListener("load", () => {
    MainGraphDataReload();

})



function MainGraphDataReload() {

    UserData().then((res) => {     //userdata is a function at 122 and it return the UserDAta ! 
        GlobleUserData = res;
        const Ary = [];



        if (res.Data.DSAP[0] == undefined) {
            console.log("undefined | Length", DataLength)
        } else {
            DataLength = (res.Data.DSAP.length) - 1
            console.log("Not undefined | length", DataLength);
        }

        for (let key in res.Data) {

            if (res.Data[key] != 0) { //this shoe your DSA has empty array
                if (res.Data[key][DataLength] != undefined) {
                    if (res.Data[key][DataLength].date == undefined) {  //this shoe your DSA has array but at index its empty
                        Ary.push(.01);
                    } else {
                        if (res.Data[key][DataLength].data == 0) {
                            // console.log(res.Data[key][DataLength].data)
                            Ary.push(0.1);
                        } else {
                            // console.log(res.Data[key][DataLength].data , "when data is 1")
                            if (Ary[Ary.length - 1] == undefined) {
                                Ary.push(res.Data[key][DataLength].data);
                            } else {
                                Ary.push(res.Data[key][DataLength].data + Ary[Ary.length - 1]);
                            }
                        }
                    }
                }

            } else {
                Ary.push(.01)
            }

        }

        chart2(Ary);
        Allclicked(Ary);
        AllDisabledOrNot()
        Calendar()
    })

}



function Calendar() {
    let = list = GlobleUserData.Data.DSAP;
    let Calendarbtn = document.querySelectorAll(".calendar")[0];
    Calendarbtn.innerHTML = "";
    for (let x = 0; x < list.length; x++) {
        let D = list[x].date.split("-")[0]
        if(x == (list.length)-1 ){
            Calendarbtn.insertAdjacentHTML("beforeend",
            `
            <button class="btn position-relative border-0">
                <span class="position-absolute node bg-danger text-white border">${D}</span>
                <i class="bi bi-calendar2 navButton2"></i>
            </button>
        `)
        }else{
            Calendarbtn.insertAdjacentHTML("beforeend",
            `
            <button class="btn position-relative border-0">
                <span class="position-absolute node bg-white border">${D}</span>
                <i class="bi bi-calendar2 navButton"></i>
            </button>
        `)
        }

    }
}




function AllDisabledOrNot() {
    let AllDis = true
    for (let i = 0; i < doc.length; i++) {
        if (doc[i].classList.contains("disabled") == true) {
            console.log("All disabled");
        } else {
            console.log("Not All disabled");
            AllDis = false;
            break;
        }
    }

    let dates = GlobleUserData.Data.DSAP[DataLength].date
    console.log(dates)
    if (AllDis == true && dates !== TodayDate) {
        for (let i = 0; i < doc.length; i++) {
            doc[i].classList.remove("disabled");
            console.log("done!");
        }
    }
}



async function UserData() {

    const userData = await fetch("/getUserData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: localStorage.getItem("UserID")
        })

    })

    return await userData.json();

}


function Allclicked(Ary) {
    for (let i = 0; i < Ary.length; i++) {
        if (Ary[i] != "0.01") {
            doc[i].classList.add("disabled");
        }

    }


}



async function DoneAssig(e, val, path) {
    e.composedPath()[1].classList.add("disabled")

    if (GlobleUserData.Data[path][DataLength] == undefined || GlobleUserData.Data[path][DataLength].date != TodayDate) {
        const response = await fetch("/addTrack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: localStorage.getItem("UserID"),
                Usertrack_path: path,
                trackdata: {
                    date: TodayDate,
                    data: val
                }
            })
        })
        const Data = await response.json();
        console.log(Data);

        MainGraphDataReload();
    } else {
        console.log("Data Not Inserted :- Data Already Exist or New Data Inserting");
    }


}


function chart2(newAry) {
    var yValues2 = newAry;
    var xValues2 = ["DS1", "DS2", "DS3", "DS4", "DS5", "DS6", "DS7", "DS8", "DS9", "DS10", "DS11", "DS12", "DS13"];
    const max = Math.max(...newAry);

    new Chart("myChart2", {
        type: "bar",
        data: {
            labels: xValues2,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "black",
                borderColor: "black",
                stepped: true,
                data: yValues2,
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false,
                        max: max + 1,
                        min: 0,
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: false,
                    }
                }]
            },
            tooltips: {
                enabled: false,
            }

        }
    });

}