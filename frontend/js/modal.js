const openModalCodec = document.getElementById('add-codec');
const openModalMarkov = document.getElementById('add-markov');

const modalCodec = document.getElementById('codec-modal');
const modalMarkov = document.getElementById('markov-modal');

const closeCodec = document.getElementById('close-codec')
const closeMarkov = document.getElementById('close-markov')

openModalCodec.addEventListener('click', (e)=>{
    e.preventDefault();
    modalCodec.classList.add('modal--show');

});


closeCodec.addEventListener('click', (e)=>{
    e.preventDefault();
    modalCodec.classList.remove('modal--show');

});

openModalMarkov.addEventListener('click', (e)=>{
    e.preventDefault();
    modalMarkov.classList.add('modal--show');

});


closeMarkov.addEventListener('click', (e)=>{
    e.preventDefault();
    modalMarkov.classList.remove('modal--show');

});