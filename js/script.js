const loadPhone=async(searchText,datalimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res=await fetch(url);
    const data=await res.json();
    displayPhone(data.data,datalimit) 
}

const displayPhone=(phones,dataLimit)=>{
    const phoneContainer=document.getElementById('phone-container')
    phoneContainer.textContent='';

    //display 10 Phone Only
    const showAll=document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        phones=phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    //display no phone found 
    const noPhone=document.getElementById('no-found-message');
    if(phones.length===0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none');
    }   

    //display all Phone
    phones.forEach(phone => {
        const phoneDiv=document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML=`
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showPhoneModal">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });

    //stop spinner
    toggleSpinner(false);
}

const processSearch=(datalimit)=>{
    //start loader
    toggleSpinner(true);
    const inputField=document.getElementById('input-field');
    const searchValue=inputField.value;
    loadPhone(searchValue,datalimit);
}


//handle search button click
document.getElementById('btn-search').addEventListener('click',function(){
    //start loader
    processSearch(10);
})

//search input field enter key handler
document.getElementById('input-field').addEventListener('keypress',function(e){
    if(e.key==='Enter'){
        processSearch(10);
    }
})


const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click',function(){
    //start loader
    processSearch();
})

const loadPhoneDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails=(phone)=>{
    const modalTitle=document.getElementById('showPhoneModalLabel');
    modalTitle.innerText=phone.name;
    const phoneDetails=document.getElementById('phone-details');
    phoneDetails.innerHTML=`
        <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No release Date Found'}</p>
        <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage :'No Info Found'} </p>
        <p>Others : ${phone.others ? phone.others.Bluetooth : 'No BlueTooth Info'}

    `
}

// loadPhone('')