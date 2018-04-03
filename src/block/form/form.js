(function(){
	let ajax= (url, formData, callback) =>{
		let cb= callback || function(){};
		let xhr= new XMLHttpRequest()
		xhr.open('POST', url, true);
		//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(formData);
		xhr.onreadystatechange= ()=>{
			if(xhr.readyState == 4 && xhr.status == 200){
				if(xhr.responseText != '')
					cb( JSON.parse(xhr.responseText) );
			}else{

			}
		}
	}

	// РАЗДЕЛ С ПРОДУКЦИЕЙ
	ajax( 'http://podlogkafood.ua-ix.biz/server/production.php', '', (data)=>{
		let templateCircle_1= [],
				templateCircle_2= [],
				templateSquare_1= [],
				templateSquare_2= [];
		let templateBase= (size, price_layer_1, price_layer_1_3000, square, layer, shape, shapeIcon)=> {
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
			`<div class="form__row form__row_product" data-shape="${shape}" data-shape-icon="${shapeIcon}">
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
				templateCircle_1.push( templateBase(data[i].diameter, data[i].price_layer_1, data[i].price_layer_1_3000, data[i].square, 1, 'Круглая', 'glyphicon glyphicon-record') );
				templateCircle_2.push( templateBase(data[i].diameter, data[i].price_layer_2, data[i].price_layer_2_3000, data[i].square, 2, 'Круглая', 'glyphicon glyphicon-record') );
			} else{
				templateSquare_1.push( templateBase(data[i].dimensions, data[i].price_layer_1, data[i].price_layer_1_3000, data[i].square, 1, 'Прямоугольная', 'glyphicon glyphicon-stop') );
				templateSquare_2.push( templateBase(data[i].dimensions, data[i].price_layer_2, data[i].price_layer_2_3000, data[i].square, 2, 'Прямоугольная', 'glyphicon glyphicon-stop') );
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


	// РАЗДЕЛ С ПРОДУКЦИЕЙ
	document.querySelector('#formCart .btn_cart').addEventListener('click', (e)=>{
		e.preventDefault();
		let notice= document.querySelectorAll('#formCart .notice');

		for(let i= 0; notice.length > i; i++){
			notice[i].classList.remove('active');
		}

		let form= document.getElementById('formCart');
		let formData = new FormData(form);
		let formRequired= document.querySelectorAll('#formCart [required="required"]');
		let valid= true;
		for(let i= 0; formRequired.length > i; i++){

			if( ( formRequired[i].getAttribute('name') == 'mail' && !formRequired[1].value.match(/\w{1,}@\w{1,}/gi) ) || formRequired[i].value == '' ){
				valid= false;
				break;
			}
		}

		if(valid){
			ajax('http://podlogkafood.ua-ix.biz/server/mail.php?action=send', formData, (data)=>{
				if(data == 'success'){
					document.querySelector('#formCart .notice_success').classList.add('active');
				}else{
					document.querySelector('#formCart .notice_error').classList.add('active');
				}
			});
		}else{
			document.querySelector('#formCart .notice_warning').classList.add('active');
		}
	})
}).call();