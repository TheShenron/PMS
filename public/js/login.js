function tglaccount() {
    document.querySelectorAll(".popUp")[1].classList.toggle("popUpDis");
}


async function sinlog(ind, roots) {
    const email = document.querySelector(`#webLink${ind}`).value;
    const password = document.querySelector(`#webPassword${ind}`).value;
    if (email == "" || password == "") {
        indeicator(ind)
        console.log("OMG! You forgot something!");
        return;
    }
    const response = await fetch(`/${roots}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_email: email,
            user_password: password
        })
    })

    const data = await response.json();
    console.log(data);
    if (!data.code) {
        if (data.status == 201) {
            console.log("Ooo You Did it!");
            localStorage.setItem("UserID", data.UserID);
            window.location.href = "/index";
        } else {
            console.log("Ooo Fucking Error!");
            indeicator(ind)

        }
    } else {
        console.log("Oo Fuck! Email exist");
        indeicator(ind)
    }

}


function indeicator(i) {
    const ind = document.querySelectorAll("img[alt='biglogo']");
    // console.log(ind[i]);
    ind[i].classList.add("transXanim");
    setTimeout(() => {
        ind[i].classList.remove("transXanim");
        ind[i].classList.add("failanim");
    }, 500);
    setTimeout(() => {
        ind[i].classList.remove("failanim");
    }, 5000);
}
