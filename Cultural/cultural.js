const sidebar=document.getElementById('sidebar');
const mobileMenu=document.getElementById('mobileMenu');
const modal=document.getElementById('cultureModal');
const modalTitle=document.getElementById('modalTitle');
const modalText=document.getElementById('modalText');

mobileMenu.addEventListener('click',()=>sidebar.classList.toggle('open'));

document.querySelectorAll('.sidebar-nav a').forEach(link=>link.addEventListener('click',()=>sidebar.classList.remove('open')));

document.getElementById('notification').addEventListener('click',()=>{
    openModal('Cultural Updates','You have new cultural events, local experiences and artisan recommendations waiting for you.');
});

const search=document.getElementById('cultureSearch');
search.addEventListener('keydown',e=>{
    if(e.key!=='Enter') return;
    const q=search.value.trim().toLowerCase();
    if(!q){alert('Please enter a culture, place or experience to search.');return;}
    const cards=[...document.querySelectorAll('.culture-item')];
    let found=0;
    cards.forEach(card=>{
        const text=card.innerText.toLowerCase();
        const match=text.includes(q);
        card.classList.toggle('hidden',!match);
        if(match) found++;
    });
    if(!found) alert(`No cultural result found for "${search.value.trim()}".`);
});

document.querySelectorAll('#cultureTabs button').forEach(button=>{
    button.addEventListener('click',()=>{
        document.querySelectorAll('#cultureTabs button').forEach(b=>b.classList.remove('active'));
        button.classList.add('active');
        const filter=button.dataset.filter;
        document.querySelectorAll('.culture-item').forEach(card=>{
            card.classList.toggle('hidden',filter!=='all' && card.dataset.category!==filter);
        });
    });
});

function openModal(title,text){
    modalTitle.textContent=title;
    modalText.textContent=text;
    modal.classList.add('show');
}
function closeModal(){modal.classList.remove('show')}
function confirmAction(){
    closeModal();
    alert('Great! This action can be connected to your backend/database next.');
}
function openExperience(name){openModal(name,`Explore ${name}, learn directly from local practitioners, and help increase visibility for the region's cultural heritage.`)}
function bookExperience(name){openModal(`Book: ${name}`,`This cultural experience can be connected to your booking system. Local providers can receive the booking and benefit directly.`)}
function bookFirstExperience(){openExperience('Cultural Experiences')}
function visitShop(name){openModal(name,`View location, products, opening hours and community impact for ${name}.`)}
function openSkill(name){openModal(`${name} Tradition`,`Learn how this regional skill is practiced, meet local creators, view workshops and discover products made by the community.`)}
function showEvents(){openModal('Cultural Events','Explore festivals, theatre performances, folk programs, workshops and local celebrations happening across the destination.')}
function showAllHighlights(){openModal('All Culture Highlights','Browse dance, music, crafts, theatre, food, unique shops, architecture, traditions, local stories and community experiences.')}
function exploreCulture(){document.getElementById('cultureHighlights').scrollIntoView({behavior:'smooth'})}
function supportCulture(){openModal('Support Local Culture','Choose local guides, artists, artisans, restaurants, workshops and community-run businesses so more tourism value stays within the region.')}

window.addEventListener('click',e=>{if(e.target===modal)closeModal()});
