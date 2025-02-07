
let list = document.getElementsByClassName("employees-list")[0];

function handleSubmit(){
    let add_btn = document.getElementsByClassName("add-employee")[0];
    let validMsg = document.getElementById("msg");
    let e_name = document.getElementById("e-name").value.trim();
    let p_name = document.getElementById("p-name").value.trim();
    let age = document.getElementById("age").value.trim();
    let empArr = [];

    var id = "id" + Math.random().toString(16).slice(2);

    if(e_name === "" || p_name === "" || age === ""){
        validMsg.textContent = "Error :Please fill all the field before adding in an emplyee";
        validMsg.style.color = "#ff0000";
        return;
    } else{
        validMsg.textContent = "Success : Employee Added";
        validMsg.style.color = "#00ff00";   
    }

    let localItem = JSON.parse(localStorage.getItem("data"));
    empArr.push({ 
        _id: id,
        empName: e_name,
        empPos: p_name,
        empAge: age
    });

    if (localItem){
        localStorage.setItem("data", JSON.stringify([...localItem, ...empArr]));
    } else {
        localStorage.setItem("data", JSON.stringify([...empArr]));
    }

    createElement();

    document.getElementById("e-name").value = "";
    document.getElementById("p-name").value = "";
    document.getElementById("age").value = "";

}

function deleteRow(id){
    let resultData = JSON.parse(localStorage.getItem("data"));
    let res = resultData.filter(item => item._id !== id);
    localStorage.setItem("data", JSON.stringify(res));

    createElement();
}

function createElement(){
    let resultData = JSON.parse(localStorage.getItem("data"));
    
    if(resultData.length > 0){
        list.innerHTML = resultData.map((item, index) => {
            return `
            <div class="item">
                <div class="list-item">
                    <p>${index + 1}</p>
                    <p>${item.empName}</p>
                    <p>${item.empPos}</p>
                    <p>${item.empAge}</p>
                    <p>${item._id}</p>
                </div>
                <button class="delete" onclick="deleteRow('${item._id}')">Delete</button>
            </div>`;
        }).join("");
    } else {
        list.innerHTML = '<div class="no-data">No Data</div>';
    }
}

window.onload = createElement;