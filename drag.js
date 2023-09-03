  
  const items = document.querySelectorAll('#items .item'); 
  const tableBodyx = document.querySelector('#tableBody'); 
  const itemsDiv = document.querySelector('#items'); 
  
  let sourceContainer; 
  

  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        var image = data.results[i].image;
  
        // itemsDiv içine itemleri ekle
        itemsDiv.innerHTML += `
      <div class="item" id="${i}" draggable="true" style="background-image:url('${[image]}')" >
      </div>
      `;
      }
    });
  

  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    sourceContainer = event.target.parentNode; // itemin çıktığı konteyneri kaydet
  }
  
  
  function handleDragOver(event) {
    event.preventDefault();
  }
  

  function handleDrop(event) {
    event.preventDefault();
    const itemId = event.dataTransfer.getData('text/plain');
    const targetContainer = event.target.closest('.draggable, #items'); 
  
    if (targetContainer) {
      if (targetContainer.id === 'items') {

        targetContainer.appendChild(document.getElementById(itemId));
    
      } else {
        
        const itemContainer = targetContainer.querySelector('.row'); 
        itemContainer.appendChild(document.getElementById(itemId));
      }
    }
  
    
  }
  
  
  document.addEventListener('dragstart', (event) => {
    if (event.target.classList.contains('item')) {
      event.target.classList.add('dragging');
    }
  });
  
  
  document.addEventListener('dragend', (event) => {
    if (event.target.classList.contains('item')) {
      event.target.classList.remove('dragging');
    }
  });
  
  
  tableBodyx.addEventListener('dragstart', handleDragStart);
  tableBodyx.addEventListener('dragover', handleDragOver);
  tableBodyx.addEventListener('drop', handleDrop);
  
  
  itemsDiv.addEventListener('dragstart', handleDragStart);
  itemsDiv.addEventListener('dragover', handleDragOver);
  itemsDiv.addEventListener('drop', handleDrop);
  
  
  items.forEach((item) => {
    item.setAttribute('draggable', 'true');
    item.addEventListener('dragstart', handleDragStart); 
  });
  
