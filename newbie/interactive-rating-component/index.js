const btn = document.querySelectorAll('.marker');
const btnsubmit = document.querySelector('.btn');
const error = document.querySelector('.error');
var rate = null;

function ativado(event){
    btn.forEach(btn => {
        btn.classList.remove('ativado');
    });
    event.target.classList.add('ativado');

    rate = event.target.getAttribute('data-note');
}

function submit(){
    !rate ? error.style.display = 'flex' : thankyou();
}

btn.forEach(element => {
    element.addEventListener('click', ativado);
});

btnsubmit.addEventListener('click', submit);

function thankyou(){
    let main = document.querySelector('.rating');
    let newm = document.querySelector('.thankyou');
    let rating = document.querySelector('.rate');
    
    main.style.display = 'none';
    newm.style.display = 'flex';

    rating.innerHTML = "You selected " + rate + " out of 5";

}


