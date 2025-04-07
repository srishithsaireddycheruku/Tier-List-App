const tierInput=document.getElementById('tier');

const submitBtn=document.getElementById('submit');

const imageForm=document.getElementById('image-form');

const imageInput=document.getElementById('image-item');

const itemContainers=document.getElementsByClassName('item-container');

const tierLists=document.querySelectorAll('.tier-list');

let currentDragItem;
for(const itemContainer of itemContainers){
    setUpItemContainerForDrag(itemContainer);
}

imageForm.addEventListener(('submit'),(event)=>{
    event.preventDefault(); // Prevents the default action of the form, which is to submit and refresh the page
    if(imageInput.value==''){
        alert('Please enter an image URL!');
        return; // Exit the function if the input is empty
    }
    const imageItemInput=document.getElementById('image-item');
    const imageUrl=imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value=''; // Clear the input field after submission
});

submitBtn.addEventListener('click',(event)=>{
    console.log('button is clicked');
    // console.log(event);
    event.preventDefault(); // Prevents the default action of the button, which is to submit the form
    if(tierInput.value==''){
        alert('Please enter a tier list name!');
        return; // Exit the function if the input is empty
    }
    createTierList(tierInput.value);
    tierInput.value=''; // Clear the input field after submission
});
 

function createTierList(tierListName){
    const newTierList=document.createElement('div');
    newTierList.classList.add('tier-list');

    const heading=document.createElement('h1');
    heading.textContent=tierListName;

    const newTierListItems=document.createElement('div');
    newTierListItems.classList.add('tier-list-items');

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierListItem(newTierList); // Set up the drop zone for the new tier list

    const tierSection=document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);
}

function createTierListItem(imageUrl){
    const newTierListItem=document.createElement('div');
    newTierListItem.setAttribute('draggable','true');
    newTierListItem.classList.add('item-container');

    const image=document.createElement('img');
    image.src=imageUrl;

    const nontierSection=document.getElementById('non-tier-section');
    nontierSection.appendChild(newTierListItem);
    newTierListItem.appendChild(image);
    setUpItemContainerForDrag(newTierListItem); // Enable dragging for the new item
    
}

function setUpItemContainerForDrag(itemContainer){
    itemContainer.addEventListener('dragstart',(event)=>{
        currentDragItem=event.target.parentNode; 
        console.log('drag started');
    });
    itemContainer.addEventListener('dblclick',(event)=>{
        const parentNode=event.target.parentNode; // Get the parent node of the clicked item
        const nontierSection=document.getElementById('non-tier-section');
        nontierSection.appendChild(parentNode); // Append the item back to the non-tier section
    });
}

function setUpDropZoneInTierListItem(tierList){
    tierList.addEventListener('drop',(event)=>{
        event.preventDefault(); // Prevent the default action of dropping the item
        event.target.appendChild(currentDragItem); // Append the dragged item to the target tier list
    });

    tierList.addEventListener('dragover',(event)=>{
        event.preventDefault(); // Prevent the default action of dragging over the item
        console.log('drag over');
    });
}