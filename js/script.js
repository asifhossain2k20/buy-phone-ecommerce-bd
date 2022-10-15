const loadPhone=async(searchText)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res=await fetch(url);
    const data=await res.json();
    displayPhone(data.data)
    
}

const displayPhone=phones=>{
    const phoneContainer=document.getElementById('phone-container')
    phoneContainer.textContent='';
    phones.forEach(phone => {
        const phoneDiv=document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML=`
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-4" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.slug}</p>
            </div>
        </div>
        
        `
        phoneContainer.appendChild(phoneDiv)
    });
}

document.getElementById('btn-search').addEventListener('click',function(){
    const inputField=document.getElementById('input-field');
    const searchValue=inputField.value;
    loadPhone(searchValue);
})

loadPhone('')