function togleMusic() {
    var music = document.querySelector("#divThree");
    music.classList.toggle("popUpDis");
}


window.addEventListener("load", function () {
    getMusic();
})


async function getMusic() {

    let music = document.querySelector(".addMusicDiv");

    const response = await fetch("/Get_Music", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: localStorage.getItem("UserID")
        })
    });


    const data = await response.json();
    console.log(data.Data);
    data.Data.forEach((val, ind) => {
        if (val.musicID != null || val.musicID != null) {
            music.insertAdjacentHTML("beforeend",
                `
                <div class="item_content my-1" id=${val.musicID}>
                    <input type="text" class="item_content_input p-2 rounded-0 border" disabled value=${val.musicLink}>
                    <span class="item_content_icon position-absolute px-3 btn border rounded-0 bg-white">
                        <i class="bi bi bi-disc fs-3" onClick="PlayMusic(event)"></i>
                        <div class="spinner-border spinner-border-sm position-absolute d-none fs-3" role="status"></div>
                    </span>
                </div>
            `)
        }
    })

}




function addMusic() {
    const musicID = `M${Math.floor(Math.random() * 10)}_${Math.floor(Math.random() * 10)}_${Math.floor(Math.random() * 10)}_${Math.floor(Math.random() * 10)}_${Math.floor(Math.random() * 10)}`;
    let MusicLink = document.querySelector("#MusicLink");
    let music = document.querySelector(".addMusicDiv");
    if (!MusicLink.value == "") {
        let PrperLink = `https://drive.google.com/uc?authuser=0&id=${MusicLink.value}&export=download`;

        music.insertAdjacentHTML("beforeend",
            `
        <div class="item_content my-1" id=${musicID}>
            <input type="text" class="item_content_input p-2 rounded-0 border" disabled value=${PrperLink}>
            <span class="item_content_icon position-absolute px-3 btn border rounded-0 bg-white">
                <i class="bi bi bi-disc fs-3" onClick="PlayMusic(event)"></i>
                <div class="spinner-border spinner-border-sm position-absolute d-none fs-3" role="status"></div>
            </span>
        </div>
    `)

        MusicLink.value = "";

    }

}





function PlayMusic(e) {


    const platpause = document.querySelectorAll(".bi-disc");
    const childs = e.composedPath()[1].children[1];
    childs.classList.toggle("d-none");
    e.target.classList.add("d-none");
    console.log(childs);


    fetch(e.composedPath()[2].children[0].value).then((res) => {
        return res
    }).then((data) => {
        if (data.status == 200) {


            platpause.forEach((val, ind) => {
                val.classList.remove("text-danger");
            })

            const Music = document.querySelector("audio");
            Music.src = e.composedPath()[2].children[0].value;


            Music.play();
            e.target.classList.replace("d-none", "text-danger");
            childs.classList.toggle("d-none");

            AddInBackend(Music.src, e.composedPath()[2].id);
            Durations(Music, e);

        } else {
            alert("This link is not valid");
            e.target.classList.remove("d-none");
            childs.classList.toggle("d-none");
            let element = document.querySelector("#" + e.composedPath()[2].id);
            element.remove();

        }

    })



}



async function AddInBackend(M, ID) {
    console.log("Function call ")
    if (M != null || M != null) {
        const response = await fetch("/User_Music", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: localStorage.getItem("UserID"),
                musicLink: M,
                musicID: ID
            })
        });
        const data = await response.json();
        console.log(data);
    }

}




function Durations(Music, e) {
    Music.addEventListener("timeupdate", function () {
        let duration = Music.duration;
        let currentTime = Music.currentTime;
        let percentage = (currentTime / duration) * 100;
        if (duration == currentTime) {
            console.log("End and re-start");
            Music.currentTime = 0;
            Music.play();
            // console.log(RandMusic());
        }
    })

}


// function RandMusic(){
//     let AllMusic = document.querySelectorAll(".addMusicDiv > .item_content_input");
//     AllMusic.forEach((val, ind) => {
//         let Random = Math.floor(Math.random() * AllMusic.length);
//         // AllMusic[Random].click();
//         return AllMusic[Random].value;
//     })
// }