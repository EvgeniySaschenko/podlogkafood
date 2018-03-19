(function(){
	document.addEventListener('ajax:production', ()=>{
		let color, size, count, price, square, shape, shapeIcon;
		let formRowProduct= document.querySelectorAll('.buy .form__row_product');
		
		// При изменение поля формируются товары для корзины
		let addCart= (el_1)=>{
			el_1.addEventListener('change', ()=>{
				let cart= [];
				for(let j= 0; formRowProduct.length > j; j++){
					color= formRowProduct[j].querySelector('.form__select_color').value;
					count= formRowProduct[j].querySelector('.form__field_count').value;
					size= formRowProduct[j].querySelector('.form__size').getAttribute('data-size');
					square= formRowProduct[j].querySelector('.form__square').getAttribute('data-square');
					shape= formRowProduct[j].getAttribute('data-shape');
					shapeIcon= formRowProduct[j].getAttribute('data-shape-icon');
					if( count >= 3000 ){
						price= formRowProduct[j].querySelector('.form__price_1').getAttribute('data-price');
					} else{
						price= formRowProduct[j].querySelector('.form__price_2').getAttribute('data-price');
					}
					if(count > 0){
						cart.push({ 
							color: color, 
							count: count, 
							size: size, 
							square: square, 
							price: price, 
							shape: shape,
							shapeIcon: shapeIcon});
					}
				}
				
				// Изменить количество товароа в корзине в шапке
				document.getElementById('header__icon_cart-counter').innerText= cart.length;
				
				// Сформировать таблицу в корзине
				let formCartList= document.getElementById('formCartList');
				let cartTemplate= [];
				let totalSum= 0;
				for(let i= 0; cart.length > i; i++){
					totalSum+= ( parseFloat( ( cart[i].count * cart[i].price ).toFixed(2) ) );
					cartTemplate.push(
														`<div class="form__row form__row_product">
															<div class="form__size">
																${cart[i].size}
																<input type="hidden" name="size[]" value="${cart[i].size}">
															</div>
															<div class="form__color"> 
																${cart[i].color}
																<input type="hidden" name="color[]" value="${cart[i].color}">
															</div>
															<div class="form__shape"> 
																<span class="form__text">${cart[i].shape}</span>
																<span class="form__icon ${cart[i].shapeIcon}" title="${cart[i].shape}"></span>
																<input type="hidden" name="shape[]" value="${cart[i].shape}">
															</div>
															<div class="form__price">
																${cart[i].price}
																<input type="hidden" name="price[]" value="${cart[i].price}">
															</div>
															<div class="form__square">
																${cart[i].square}
																<input type="hidden" name="square[]" value="${cart[i].square}">
															</div>
															<div class="form__count">
																${cart[i].count}
																<input type="hidden" name="count[]" value="${cart[i].count}">
															</div>
															<div class="form__sum">
																${( cart[i].count * cart[i].price ).toFixed(2)}
																<input type="hidden" name="sum[]" value="${( cart[i].count * cart[i].price ).toFixed(2)}">
															</div>
														</div>`
					)
				}
				cartTemplate.push(
					`<div class="form__row form__row_product">
						<div class="form__total-sum-text">
							Общая сумма:
						</div>
						<div class="form__total-sum">
							${totalSum.toFixed(2)}
							<input type="hidden" name="sum_total" value="${totalSum.toFixed(2)}">
						</div>
					</div>`
				)
	
				formCartList.innerHTML= cartTemplate.join('');
	
			});
		}
	
	
		for(let i=0; formRowProduct.length > i; i++){
			let formSelectColor= formRowProduct[i].querySelector('.form__select_color');
			let formFieldCount= formRowProduct[i].querySelector('.form__field_count');
			addCart(formSelectColor);
			addCart(formFieldCount);
		}
	
	});

	// При нажаатии появляеться модальное окно корзины
	let callModalCart= document.getElementsByClassName('call-modal-cart');
	for(let i= 0; callModalCart.length > i; i++){
		callModalCart[i].addEventListener('click', (e)=>{
			document.getElementById('cart').classList.add('active');
		});
	}


	// Выйти из корзины
	document.querySelector('.cart__close').addEventListener('click', (e)=>{
		document.getElementById('cart').classList.remove('active');
	});
}).call();