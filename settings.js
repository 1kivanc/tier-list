let colors=["#FF7F7F","#FFBF7F","#FFDF7F","#FFFF7F","#BFFF7F","#7FFF7F","#7FFFFF","#7FBFFF","#7F7FFF","#FF7FFF","#BF7FBF","#3B3B3B","#858585","#F7F7F7"]

let chooseColor = document.querySelector(".chooseColor");

for (let i = 0; i < colors.length; i++) {

    let span = document.createElement("span");
  
    span.id = i;
  
    span.className = "color";
  
    span.style.backgroundColor = colors[i];
  
    chooseColor.appendChild(span);
  }
  

settingsBtn = document.querySelectorAll(".settingsBtn")
textArea = document.getElementById("labeltext");
settingsBtn.forEach(function(e){
    e.addEventListener("click",function(){
        document.getElementById("showSettingsPanel").style.display="flex";
        appendedField = e.parentElement.parentElement;
        row=appendedField.firstElementChild.firstElementChild;

        textArea.value = row.firstElementChild.innerHTML;
        textArea.addEventListener("input",function(){
            const inputValue = textArea.value;
            row.firstElementChild.innerHTML = textArea.value;
        })
        
        row.firstElementChild.input
      
        document.getElementById("showSettingsPanel").addEventListener("click",function(b){
            if(b.target.classList[0]=="closePanel"){
                closepanel = b.target;
                document.getElementById("showSettingsPanel").style.display="none";
            }
           
           
                  
            for(let i = 0; i< chooseColor.children.length; i++){
                
                let span = chooseColor.children[i];

                span.onclick = function(){
                    row.firstElementChild.style.backgroundColor = span.style.backgroundColor;
                }

            };

        })
    })
})

