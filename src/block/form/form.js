(function(){
	let ajax= (url, callback) =>{
		let cb= callback || function(){};
		let xhr= new XMLHttpRequest()
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send();
		xhr.onreadystatechange= ()=>{
			if(xhr.readyState == 4 && xhr.status == 200){
				if(xhr.responseText != '')
					cb( JSON.parse(xhr.responseText) );
			}else{
				//console.log('err');	
			}
		}
	}

	ajax( '../server/production.php', (data)=>{


		let templateCircle_1= [],
				templateCircle_2= [],
				templateSquare_1= [],
				templateSquare_2= [];
		let templateBase= (size, price_layer_1, price_layer_1_3000, square, layer, shape)=> {
			let colorTemplate;
			if(layer == 1){
				colorTemplate= `<select class="form__select form__select_color" name="color">
													<option class="form__option" value="Белый">Белый
													</option>
												</select>`;
			}else{
				colorTemplate= `<select class="form__select form__select_color" name="color">
													<option class="form__option" value="Золото / Серебро">Золото / Серебро
													</option>
													<option class="form__option" value="Золото / Золото">Золото / Золото
													</option>
													<option class="form__option" value="Серебро / Серебро">Серебро / Серебро
													</option>
												</select>`;
			}

			return(
			`<div class="form__row form__row_product" data-shape="${shape}">
				<div class="form__size" data-size="${size}">
					${size}
				</div>
				<div class="form__color"> 
					${colorTemplate}
				</div>
				<div class="form__price form__price_1" data-price="${price_layer_1}">
					${price_layer_1}
				</div>
				<div class="form__price form__price_2" data-price="${price_layer_1_3000}">
					${price_layer_1_3000}
				</div>
				<div class="form__square" data-square="${square}">
					${square}
				</div>
				<div class="form__count"><input type="text" pattern="^[0-9]+$" class="form__field form__field_count" name="count" placeholder="0" type="text"/>
				</div>
				<div class="form__sum">
					0.00
				</div>
			</div>`);
		}

		// Вставка шаблона в DOM
		for(let i= 0; data.length > i; i++){
			if(data[i].diameter != 0){
				templateCircle_1.push( templateBase(data[i].diameter, data[i].price_layer_1, data[i].price_layer_1_3000, data[i].square, 1, 'Круглая') );
				templateCircle_2.push( templateBase(data[i].diameter, data[i].price_layer_2, data[i].price_layer_2_3000, data[i].square, 2, 'Круглая') );
			} else{
				templateSquare_1.push( templateBase(data[i].dimensions, data[i].price_layer_1, data[i].price_layer_1_3000, data[i].square, 1, 'Прямоугольная') );
				templateSquare_2.push( templateBase(data[i].dimensions, data[i].price_layer_2, data[i].price_layer_2_3000, data[i].square, 2, 'Прямоугольная') );
			}
		}
		document.getElementById('formBuyCircleListLayer1').innerHTML= templateCircle_1.join('');
		document.getElementById('formBuyCircleListLayer2').innerHTML= templateCircle_2.join('');
		document.getElementById('formBuySquareListLayer1').innerHTML= templateSquare_1.join('');
		document.getElementById('formBuySquareListLayer2').innerHTML= templateSquare_2.join('');

		//Добавить слушатель на количество
		let formRowProduct= document.querySelectorAll('.form__row_product');

		for(let i= 0; formRowProduct.length > i; i++){
			let formFieldCount= formRowProduct[i].querySelector('.form__field_count');
			let formSum= formRowProduct[i].querySelector('.form__sum');
			let formPrice1= formRowProduct[i].querySelector('.form__price_1').getAttribute('data-price');
			let formPrice2= formRowProduct[i].querySelector('.form__price_2').getAttribute('data-price');

			formFieldCount.addEventListener( 'change', ()=>{

				formFieldCount.value= isNaN(formFieldCount.value) || formFieldCount.value == '' ? 0 : parseInt( formFieldCount.value );
				// Пересчёт суммы в зависимости от количества
				if(formFieldCount.value >= 3000){
					formSum.innerText= Number(formFieldCount.value * formPrice1 ).toFixed(2);
				} else{
					formSum.innerText= ( formFieldCount.value * formPrice2 ).toFixed(2);
				}

			} );
		}

		// Создаём событие для Корзины
		var event = new Event('ajax:production');
		document.dispatchEvent(event);
	} );
	

}).call();