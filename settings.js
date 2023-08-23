let showColors=["#FF7F7F","#FFBF7F","#FFDF7F","#FFFF7F","#BFFF7F","#7FFF7F","#7FFFFF","#7FBFFF","#7F7FFF","#FF7FFF","#BF7FBF","#3B3B3B","#858585","#F7F7F7"]

let chooseColor = document.querySelector(".chooseColor");

for (let i = 0; i < showColors.length; i++) {

    let span = document.createElement("span");
  
    span.id = i;
  
    span.className = "color";
  
    span.style.backgroundColor = showColors[i];
  
    chooseColor.appendChild(span);
}



  


var selectedColor;
   
settingsBtn = [...document.getElementsByClassName("settingsBtn")]
moveUpBtn = [...document.getElementsByClassName("moveUpBtn")]
moveDownBtn = [...document.getElementsByClassName("moveDownBtn")]
tableBody =  document.querySelector("#tableBody")
textArea = document.getElementById("labeltext")
addRowAbove = document.getElementById("addRowAbove");

settingsBtn.forEach(function(e){
    e.addEventListener("click",function(){
        document.getElementById("showSettingsPanel").style.display="flex";
        appendedField = e.parentElement.parentElement;
        row=appendedField.firstElementChild.firstElementChild;

        textArea.value = row.firstElementChild.innerHTML;
        selectedColor = row.firstElementChild.style.backgroundColor;
        
        textArea.addEventListener("input",function(){
            const inputValue = textArea.value;
            row.firstElementChild.innerHTML = textArea.value;
        })
        
    
        document.getElementById("showSettingsPanel").addEventListener("click",function(b){
            if(b.target.classList[0]=="closePanel"){
                closepanel = b.target;
                document.getElementById("showSettingsPanel").style.display="none";
            }
            else if(b.target.id=="deleteBtn"){
                appendedField.classList.add("remove")
                tableBody.deleteRow(row.rowIndex);
                setTimeout(function() {
                    appendedField.addEventListener('transitionend', function() {
                        appendedField.remove();

                    })

                }, 500)
               
                document.getElementById('showSettingsPanel').style.display = 'none';

            }else if(b.target.id=="addRowAbove"){
                

                tableBody.innerHTML += `
                <tr class="draggable"  draggable="true" > 
                <td> 
                    <div class="row" >
                        <div style="background-color:${selectedColor};" class="label">New</div>
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
                    

        })
        for(let i = 0; i< chooseColor.children.length; i++){
                
            let span = chooseColor.children[i];
            if(span.style.backgroundColor == selectedColor){
                span.classList.add("activeColor");
            }else{
                span.classList.remove("activeColor");
            }
            span.onclick = function(){

            
                for(let j = 0; j < chooseColor.children.length; j++){
                    chooseColor.children[j].classList.remove("activeColor");
                }
             
                row.firstElementChild.style.backgroundColor = span.style.backgroundColor;
                span.classList.add("activeColor");
                
            }
            

        };
    })
})








