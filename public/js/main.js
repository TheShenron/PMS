window.addEventListener("load", async () => {
    const UserID = localStorage.getItem("UserID");

    const response = await fetch("/getData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: UserID
        })
    })

    const Data = await response.json();

    if (Data.length !== 0) {
        document.querySelector("#noresult").classList.remove("d-flex");
        document.querySelector("#noresult").style.display = "none";
        Data.forEach((val, ind) => {
            AddHTML(val.id, val.link, val.password);
        })
    }
})




document.querySelectorAll(".itemContainer")[0].addEventListener("click", (e) => {
  
    let a = document.querySelectorAll(".anim");
    a.forEach((val , ind)=>{
        val.classList.remove("item_content");
        val.classList.add("popUpDis");
    })


    if (e.target.id == "delete") {
        e.composedPath()[3].remove();
        DeleteData(e.target.dataset.deleteid);
        if (e.composedPath()[4].children.length == 1) {
            document.querySelector("#noresult").classList.add("d-flex");
            document.querySelector("#noresult").style.display = "block";
        }
    }



    if (e.target.id == "copy") {
        // el = e.composedPath()[2].children[1];
        // el.removeAttribute("disabled");
        // el.select();
        // document.execCommand("copy");
        // el.setAttribute("disabled", "true");


        el = e.composedPath()[2].children[3]
        el.select();
        document.execCommand("copy");
    }



    if (e.target.id == "Redirect") {
        window.open(e.composedPath()[2].children[1].value, "_blank");
    }





    if (e.target.dataset.deletebox == "showparent") {

        e.composedPath()[0].children[2].classList.contains("popUpDis")
            ? e.composedPath()[0].children[2].classList.replace("popUpDis", "item_content")
            : e.composedPath()[0].children[2].classList.replace("item_content", "popUpDis");

    } else if (e.target.dataset.deletebox == "showchild") {

        e.composedPath()[2].children[2].classList.contains("popUpDis")
            ? e.composedPath()[2].children[2].classList.replace("popUpDis", "item_content")
            : e.composedPath()[2].children[2].classList.replace("item_content", "popUpDis");
    }



});


async function DeleteData(id) {
    const response = await fetch("/deleteData", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: localStorage.getItem("UserID"),
            index: id
        })
    })
    const Data = await response.json();
    console.log(Data, "deleted successfully");
}




document.querySelector(".Search").addEventListener("input", (e) => {
    let input_val = e.target.value;
    let filter = input_val.toUpperCase();
    let items = document.querySelectorAll(".items");
    items.forEach((val) => {
        if (val.children[0].children[1].value.toUpperCase().includes(filter)) {
            val.style.display = "block";
        } else {
            val.style.display = "none";
        }
    })

})



function logout() {
    console.log("Unbelievable");
    localStorage.clear();
    window.location.href = "/";
}


function addItem() {
    document.querySelectorAll(".R")[0].classList.toggle("Rotate");
    document.querySelectorAll(".popUp")[0].classList.toggle("popUpDis");
    document.querySelectorAll(".popupDisable")[0].classList.toggle("popUpDis");
    // document.querySelector("#webLink").value = "";
    // document.querySelector("#webPassword").value = "";

}




function GeneratePass() {
    var length = 15,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    document.querySelector("#webPassword").value = retVal
}


function save() {
    let Link = document.querySelector("#webLink").value;
    let Password = document.querySelector("#webPassword").value;
    let id = "G" + Math.floor(Math.random() * 10) + "_" + Math.floor(Math.random() * 10) + "_" + Math.floor(Math.random() * 10) + "_" + Math.floor(Math.random() * 10) + "_" + Math.floor(Math.random() * 10);
    let _id = localStorage.getItem("UserID");

    if (Link == "" || Password == "") {
        indeicator(0);
    } else {

        document.querySelectorAll(".popUp")[0].classList.toggle("popUpDis");
        document.querySelectorAll(".popupDisable")[0].classList.toggle("popUpDis");

        document.querySelector("#noresult").classList.remove("d-flex");
        document.querySelector("#noresult").style.display = "none";

        AddHTML(id, Link, Password);

        AddData(_id, id, Link, Password);

    }


}


async function AddData(_id, id, link, password) {
    const response = await fetch("/addData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id,
            boxdata: {
                id,
                link,
                password
            }
        })
    })

    const Data = await response.json();

}




function AddHTML(id, Link, Password) {
    const ParentItem = document.querySelectorAll(".itemContainer")[0];
    ParentItem.insertAdjacentHTML("beforeend", `
        <div class="items p-2 m-sm-2 m-1" data-deletebox="showparent">
            <div class="item_content my-1">
                <span class="rounded-0 border p-2 bg-warning" data-deletebox="showchild">Link :</span>
                <input type="text" class="item_content_input px-2 rounded-0 border" disabled value=${Link} data-deletebox="showchild">
                <span class="item_content_icon position-absolute px-2 btn rounded bg-warning text-dark">
                    <i class="bi bi-arrow-up-right-circle" id="Redirect"></i> </span>
            </div>

            <div class="item_content my-1">
                <span class="rounded-0 border p-2 bg-warning" data-deletebox="showchild">Pwd :</span>
                <input type="text" class="z item_content_input px-2 rounded-0 border" disabled value="***********" data-deletebox="showchild">
                <span class="item_content_icon position-absolute px-2 btn rounded bg-warning text-dark"> <i
                        class="bi bi-clipboard-check" id="copy"></i> </span>
                <input type="text" class="position-absolute Z" value=${Password}>       
            </div>

            <div class="popUpDis my-1 anim">
                <span class="rounded-0 p-2 w-100">Delete this Item?  <i class="bi bi-x"></i></span>
                <span class="item_content_icon position-absolute px-2 btn rounded bg-danger text-white"> <i class="bi bi-trash"
                    id="delete" data-deleteId="${id}"></i>  </span>
            </div>

        </div>
    `);
}


function indeicator(i) {
    const ind = document.querySelectorAll("img[alt='biglogo']");
    ind[i].classList.add("transXanim");
    setTimeout(() => {
        ind[i].classList.remove("transXanim");
        ind[i].classList.add("failanim");
    }, 500);
    setTimeout(() => {
        ind[i].classList.remove("failanim");
    }, 5000);
}


async function deleteAccount() {
    const response = await fetch("/deleteAccound", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: localStorage.getItem("UserID")
        })
    })

    const Data = await response.json();
    if (Data.status) {
        console.log("deleted successfully");
        localStorage.clear();
        window.location.href = "/";
    } else {
        console.log(Data);
    }
}


function delete_account_icon_togle() {
    const icon1 = document.querySelector(".bi-trash");
    icon1.classList.toggle("popUpDis");
}



function toglediv() {
    const div1 = document.querySelector("#divOne");
    const div2 = document.querySelector("#divTwo");
    const div3 = document.querySelector("#divThree");

    div1.classList.toggle("popUpDis");
    div2.classList.toggle("popUpDis");

}

