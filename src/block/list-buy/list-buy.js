(function(){
	let listBuyName= document.getElementsByClassName('list-buy__name');
	let formBuy= document.getElementsByClassName('form_buy');

	for(let i= 0; listBuyName.length > i; i++ ){
		listBuyName[i].addEventListener( 'click', ()=>{
			let idForm= listBuyName[i].parentNode.getAttribute('data-id-form');
			// Убрать active у всех пунктов меню
			for(let j= 0; listBuyName.length > j; j++ ){
				listBuyName[j].parentNode.classList.remove('active');
				formBuy[j].classList.remove('active');
				if(formBuy[j].getAttribute('id') == idForm){
					formBuy[j].classList.add('active');
				}
			}
			// Добавить текущему
			listBuyName[i].parentNode.classList.add('active');
		} );
	}
}).call();