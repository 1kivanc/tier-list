let colors=["#FF7F7F","#FFBF7F","#FFDF7F","#FFFF7F","#BFFF7F","#7FFF7F","#7FFFFF","#7FBFFF","#7F7FFF","#FF7FFF","#BF7FBF","#3B3B3B","#858585","#F7F7F7"]
let rowName = ["S","A","B","C","D","F"]
const rows = document.querySelectorAll(".row");



tableBody = document.getElementById("tableBody")

function createRow(){
    for(let i = 0 ; i<rowName.length ;i++){
        
        
        
        tableBody.innerHTML += `

        <tr class="draggable"  draggable="true" > 
        <td> 
            <div class="row" >
                <div style="background-color:${colors[i]};" class="label">${rowName[i]}</div>
                
            </div>
         </td>
        
       
         <td>
            <button  class='settingsBtn'><i class="fa fa-gear" aria-hidden="true"></i>  </button>

        </td>
          
        <td>
            <button class='moveUpBtn'> <i class="fa fa-chevron-up" aria-hidden="true"></i></button> <br>
            <button class='moveDownBtn'><i class="fa fa-chevron-down" aria-hidden="true"></i></button>
        </td>
            
        </tr>
        
        `
    }
}

createRow();



onClickMove();

function onClickMove(){
    var moveUpBtn = [...document.getElementsByClassName("moveUpBtn")]
    var moveDownBtn = [...document.getElementsByClassName("moveDownBtn")]

    moveUpBtn.forEach(e => {
        e.addEventListener("click",ChangePositionUp)
    })

    moveDownBtn.forEach(e=> {
        e.addEventListener("click",ChangePositionDown)
    })

}

function ChangePositionUp(){
    currentElement = this.parentElement.parentElement;
    previousElement = currentElement.previousElementSibling;
    if(previousElement != null){
        tableBody.insertBefore(currentElement,previousElement);
    }

}

function ChangePositionDown(){
    currentElement = this.parentElement.parentElement;
    nextElement = currentElement.nextElementSibling;
    if(nextElement != null){
        tableBody.insertBefore(nextElement,currentElement);
    }
}

