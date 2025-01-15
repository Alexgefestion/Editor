class Interface {
	static width = 1000;
	static height = 1000;
	static X = 0;
	static Y = 0;
	static scope = 100;
	static mode = 0;
	//10  БЛОК
	//20 ТРУБА
	//30 ЖИДКОСТЬ
	//0 НАСТРОЙКИ


	//массивы расположения обьектов на экране
	//[id, X, Y, ширина, высота, тип, направление]
	static sxemBlock = [];
	//[id]
	static sxemPipe = [];
	//[id, X, Y, ширина, высота, тип, направление]
	static sxemValve = [];

	//массивы обьектов 
	static Block = [new CommonBlock(0), new NasosElectric(1)];
	static Pipe = [];
	static Valve = [];
	static Liquid = [new CommonLiquid(),new CommonLiquid({'id':1,'name':'Пар','fill':'#dadaff','density':92.7}),new CommonLiquid({'id':2,'name':'Масло','fill':'#daaa20','density':870})];

	static target = 0;
	static targetType = 0;
	static currLiquid = 0;

	//ссылки на классы
	static refBlocks = [
		CommonBlock,
		NasosElectric,
		NasosKinetic
	];
	static refPipes = [];
	static refValves = [];
	static refLiquids = [
		CommonLiquid
	];





	static move(dX, dY){
		let multiplier = 1;
		if(this.scope>150){
			multiplier = 0.5;
		}
		if(this.scope>200){
			multiplier = 0.1;
		}
		this.X = this.X + dX*multiplier;
		this.Y = this.Y + dY*multiplier;
		workSpaceCords.innerHTML = `${this.X},${this.Y}`;
		workSpace.setAttribute("viewBox", `${this.X} ${this.Y } ${this.width/this.scope*100} ${this.height/this.scope*100}`);
	}
	static scale(newScope){
		this.scope += newScope;
		this.scope = Math.round(this.scope);
		scopeInfo.innerHTML = this.scope+'%';
		workSpace.setAttribute("viewBox", `${this.X} ${this.Y } ${this.width/this.scope*100} ${this.height/this.scope*100}`);
	}

// ########   ###    ######    #####   #######  ########          ######   ######    #####     ####   #######   #####    #####    #####   ######
// ## ## ##  ## ##    ##  ##  ##   ##   ##   #  ## ## ##           ##  ##   ##  ##  ### ###   ##  ##   ##   #  ##   ##  ##   ##  ### ###   ##  ##
//    ##    ##   ##   ##  ##  ##        ##         ##              ##  ##   ##  ##  ##   ##  ##        ##      ##       ##       ##   ##   ##  ##
//    ##    ##   ##   #####   ## ####   ####       ##              #####    #####   ##   ##  ##        ####     #####    #####   ##   ##   #####
//    ##    #######   ## ##   ##   ##   ##         ##              ##       ## ##   ##   ##  ##        ##           ##       ##  ##   ##   ## ##
//    ##    ##   ##   ## ##   ##   ##   ##   #     ##              ##       ## ##   ### ###   ##  ##   ##   #  ##   ##  ##   ##  ### ###   ## ##
//   ####   ##   ##  #### ##   #####   #######    ####            ####     #### ##   #####     ####   #######   #####    #####    #####   #### ##

	static setTarget(newType, newTarget){
		//обрабатыевает нажатия на объекты
		let prevTarget = this.target;
		let prevType = this.targetType;
		this.target = newTarget;
		this.targetType = newType;
		console.log("тип:",prevType,"->",newType, "таргет:", prevTarget,"->",newTarget)
		//0 кнопка
		//1 блок на рабочем листе
		//2 нода на рабочем листе
		//3 труба на рабочем листе
		//4 колено на рабочем листе
		//5 задвижка на рабочем листе

		//6 ячейка массива блоков
		//7 ячейка массива труб
		//8 ячейка массива задвижек
		//9 ячейка массива задвижек

		//10 ячейка массива геометрии блоков
		//11 ячейка массива геометрии задвижек

		//12 ячейка массива ссылок классов блоков
		//13 ячейка массива ссылок классов задвижек
		//14 ячейка массива ссылок классов жидкостей

		//15 пустая ячейка массива блоков
		//16 пустая ячейка масива задвижек
		//17 пустая ячейка масива жидкостей

		//  ###   ###   ###  #   #
		//  #  #  #  #  #    #   #
		//  #  #  #  #  ##   #   #
		//  ###   ###   #     # #
		//  #     #  #  ###    # 
		if(prevType == 1){

		}
		//5 ячейка массива блоков
		if(prevType == 6){
			this.setClass(`6_${prevTarget}`,"list list-inact")
		}
		//6 ячейка массива труб
		if(prevType == 7){
			this.setClass(`7_${prevTarget}`,"list list-inact")
		}
		//7 ячейка массива задвижек
		if(prevType == 8){
			this.setClass(`8_${prevTarget}`,"list list-inact")
		}
		//8 ячейка массива жидкостей
		if(prevType == 9){
			this.setClass(`9_${prevTarget}`,"list list-inact")
		}
		//11 ячейка массива ссылок классов блоков
		if(prevType == 12){
			
		}
		//13 ячейка массива ссылок классов жидкостей
		if(prevType == 14){

		}
		//14 пустая ячейка массива блоков
		if(prevType == 15){
			if(newType == 12){
				//предыдущий - ячейка куда записать
				//новый - ссылка на конструктор
				this.createBlock(prevTarget, newTarget);
			}
		}

		//  ###    ##    ##   #####
		//  #  #  #  #  #       #
		//  #  #  #  #   ##     #
		//  ###   #  #     #    #
		//  #      ##    ##     #
		if(newType == 1){
			console.log(this.sxemBlock[newTarget])
			let id = this.sxemBlock[newTarget][0];
			this.sxemBlockMenu(id);
		}
		//5 ячейка массива блоков
		if(newType == 6){
			this.setClass(`6_${newTarget}`,"list list-act");
			this.setMode(3);
		}
		//6 ячейка массива труб
		if(newType == 7){
			this.setClass(`7_${newTarget}`,"list list-act");
		}
		//7 ячейка массива задвижек
		if(newType == 8){
			this.setClass(`8_${newTarget}`,"list list-act");
		}
		//8 ячейка массива жидкостей
		if(newType == 9){
			this.setClass(`9_${newTarget}`,"list list-act");
		}
		//11 ячейка массива ссылок классов блоков
		if(newType == 12){
			if(prevType != 15){
				this.createBlock(this.Block.length, newTarget);
			}	
		}
		//13 ячейка массива ссылок классов жидкостей
		if(newType == 14){
			
		}
		//14 пустая ячейка массива блоков
		if(newType == 15){
			this.setMode(1);
		}
		//15 пустая ячейка масива задвижек
		if(newType == 16){
			this.setMode(21);
		}


	}



	// static create(id, key){
	// 	console.log("create");
	// 	if(this.targetType == 14){
	// 		this.Block[id] = new this.refBlocks[key](id);//создается экземляр класса
	// 		this.target = id;
	// 		this.targetType =5
	// 		this.edit();
			
	// 	}
	// 	if(this.targetType == 6){

	// 	}
	// 	if(this.targetType == 15){

	// 	}
	// 	if(this.targetType == 16){

	// 	}
	// }

	static edit(){
		let pHTML = `<form id="optionForm" class="form-property">`;
		console.log("edit")
		if(this.targetType == 5){
			pHTML += this.Block[this.target].getOption()+'</form>';
		}
		if(this.targetType == 6){
			
		}
		if(this.targetType == 7){
			
		}
		if(this.targetType == 8){
			
		}
		pHTML += `<div class="w-2 but but-inact" onclick="Interface.editBlock(${this.target})">сохранить</div>`;
		pHTML += `<div class="w-2 but but-inact" onclick="Interface.setMode(0)">отмена</div>`;
		property.innerHTML = pHTML;
	}
	static delete(){
		console.log("delete")
		if(this.targetType == 6){
			this.Block[this.target] = null;
			this.list("");
		}
		if(this.targetType == 7){
			this.Pipe[this.target] = null;
			this.list("");
		}
		if(this.targetType == 8){
			this.Valve[this.target] = null;
			this.list("");
		}
		if(this.targetType == 9){
			this.Liquid[this.target] = null;
			this.list("");
		}
	}
// ##   ##   #####   #####    #######           ######   ######    #####     ####   #######   #####    #####    #####   ######
// ### ###  ### ###   ## ##    ##   #            ##  ##   ##  ##  ### ###   ##  ##   ##   #  ##   ##  ##   ##  ### ###   ##  ##
// #######  ##   ##   ##  ##   ##                ##  ##   ##  ##  ##   ##  ##        ##      ##       ##       ##   ##   ##  ##
// ## # ##  ##   ##   ##  ##   ####              #####    #####   ##   ##  ##        ####     #####    #####   ##   ##   #####
// ##   ##  ##   ##   ##  ##   ##                ##       ## ##   ##   ##  ##        ##           ##       ##  ##   ##   ## ##
// ##   ##  ### ###   ## ##    ##   #            ##       ## ##   ### ###   ##  ##   ##   #  ##   ##  ##   ##  ### ###   ## ##
// ### ###   #####   #####    #######           ####     #### ##   #####     ####   #######   #####    #####    #####   #### ##

	static setMode(newMode){
		let modeName = [
			"Блоки", "Создание блока", "Свойства блока", "Размещение блока",4,5,6,7,8,9,
			"Трубы", "Создание трубы", "Свойства трубы", "Колено трубы",14,15,16,17,18,19,
			"Задвижки", "Создание задвижки", "Свойства задвижки",23,24,25,26,27,28,29,
			"Жидкости", "Создание жидкости", "Свойства жидкости"
		]
		this.exitMode();
		this.mode = newMode;
		this.enterMode();
		modeInfo.innerHTML = modeName[newMode];

	}
	static enterMode(){
		if(this.mode == 0){
			//режим с меню блоков
			tool1.className = "tool tool-act";
			listAction.style.display = "flex";
			this.list('');
		}
		if(this.mode == 1){
			//меню Создание блока
			newBtn.style.display = "none"
			this.list('');
		}
		if(this.mode == 2){
			//режим Свойства блока
			newBtn.style.display = "none";
			search.style.display = "none";
		}
		if(this.mode == 3){
			//режим Размещение блока
			tool1.className = "tool tool-act";
			listAction.style.display = "flex";
			workSpace.style.cursor = "url('./style/cur/create.png'), pointer";
			view.addEventListener("click", this.placeBlockEL);
		}

		if(this.mode == 10){
			//режим списков труб
			newBtn.style.display = "none";
			listAction.style.display = "flex"
			tool2.className = "tool tool-act";
			this.list('');
		}
		if(this.mode == 11){
			//создвние трубы
			newBtn.style.display = "none";
			search.style.display = "none";
		}
		if(this.mode == 12){
			//режим свойств труб
			//установить как таргет
			//подсветить 
			newBtn.style.display = "none";
			search.style.display = "none";
		}
		if(this.mode == 13){
			//режим редактирования колен труб
			//установить как таргет
			//подсветить
		}

		if(this.mode == 20){
			//режим списков задвижек
			tool3.className = "tool tool-act";
			listAction.style.display = "flex"
			this.list('');
		}
		if(this.mode == 21){
			newBtn.style.display = "none";
			search.style.display = "none";
			//создание задвижки
			this.list('');
		}
		if(this.mode == 22){
			//режим редактирования задвижек
			//установить как таргет
			//подсветить
			newBtn.style.display = "none";
			search.style.display = "none";
		}

		if(this.mode == 30){
			//режим с меню жидкостей
			tool4.className = "tool tool-act";
			listAction.style.display = "flex"
			this.list('');
		}
		if(this.mode == 31){
			this.createLiquid();
			newBtn.style.display = "none";
			search.style.display = "none";
		}
		if(this.mode == 32){
			newBtn.style.display = "none";
			search.style.display = "none";
		}
	}
	static exitMode(){
		if(this.mode == 0){
			//режим с меню блоков
			tool1.className = "tool tool-inact";
			listAction.style.display = "none";
		}
		if(this.mode == 1){
			//режим установки блока
			//меню создания блока
			newBtn.style.display = "block";
			search.style.display = "flex";
		}
		if(this.mode == 2){
			//режим размещения на рабочем поле блока
			//подсветить размещенный блок
			//установить его как таргет
			newBtn.style.display = "block";
			search.style.display = "flex";
		}
		if(this.mode == 3){
			//режим перемещения и свойств блока
			//установить его как таргет
			tool1.className = "tool tool-inact";
			listAction.style.display = "none";
			workSpace.style.cursor = "url('./style/cur/create.png'), pointer";
			view.removeEventListener("click", this.placeBlockEL);
		}

		if(this.mode == 10){
			//режим списков труб
			newBtn.style.display = "block";
			tool2.className = "tool tool-inact";
		}
		if(this.mode == 11){
			//создвние трубы
			newBtn.style.display = "block";
			search.style.display = "flex";
		}
		if(this.mode == 12){
			//режим свойств труб
			//установить как таргет
			//подсветить 
			newBtn.style.display = "block";
			search.style.display = "flex";
		}
		if(this.mode == 13){
			//режим редактирования колен труб
			//установить как таргет
			//подсветить
		}

		if(this.mode == 20){
			//режим списков задвижек
			tool3.className = "tool tool-inact";
			listAction.style.display = "none";
		}
		if(this.mode == 21){
			//создание задвижки
			newBtn.style.display = "block";
			search.style.display = "flex";
		}
		if(this.mode == 22){
			//режим редактирования задвижек
			//установить как таргет
			//подсветить
			newBtn.style.display = "block";
			search.style.display = "flex";
		}

		if(this.mode == 30){
			//режим с меню блоков
			tool4.className = "tool tool-inact";
			listAction.style.display = "none";
		}
		if(this.mode == 31){
			newBtn.style.display = "block";
			search.style.display = "flex";
		}
		if(this.mode == 32){
			newBtn.style.display = "block";
			search.style.display = "flex";
		}
	}
static keyReplace(string){
	let KeyRepMap = {'q':'й', 'w':'ц', 'e':'у', 'r':'к', 't':'е', 'y':'н', 'u':'г', 'i':'ш', 'o':'щ', 'p':'з', '[':'х', ']':'ъ', 'a':'ф', 's':'ы', 'd':'в', 'f':'а', 'g':'п', 'h':'р', 'j':'о', 'k':'л', 'l':'д', ';':'ж', '\'':'э', 'z':'я', 'x':'ч', 'c':'с', 'v':'м', 'b':'и', 'n':'т', 'm':'ь', ',':'б', '.':'ю'};
	let tmpFlag = false;
	let tmpString = new String;
	for(let i = 0; i < string.length; i++){
		if(KeyRepMap[string[i]] != undefined){
			tmpString += KeyRepMap[string[i]];
			tmpFlag = true;
		}else{
			tmpString += string[i];
		}
	}
	if(tmpFlag){
		return tmpString;
	}
	return "";
}
// ####      ######   #####   ########          ##   ##  #######  ##   ##  ##   ##
//  ##         ##    ##   ##  ## ## ##          ### ###   ##   #  ###  ##  ##   ##
//  ##         ##    ##          ##             #######   ##      #### ##  ##   ##
//  ##         ##     #####      ##             ## # ##   ####    #######  ##   ##
//  ##         ##         ##     ##             ##   ##   ##      ## ####  ##   ##
//  ##  ##     ##    ##   ##     ##             ##   ##   ##   #  ##  ###  ##   ##
// #######   ######   #####     ####            ##   ##  #######  ##   ##   #####
static list(val){
	property.innerHTML = "";
	let Type = ['block','node','pipe','elbow','valve'];
	if(val != ""){
		let value = val.toLowerCase();


		let tmpBlock = this.sortList(this.searchList(value, this.Block),this.Block);
		let tmpPipe = this.sortList(this.searchList(value, this.Pipe),this.Pipe);
		let tmpValve = this.sortList(this.searchList(value, this.Valve),this.Valve);
		let tmpLiquid = this.sortList(this.searchList(value, this.Liquid),this.Liquid);

		let tmpRefBlock = this.sortList(this.searchList(value, this.refBlocks),this.refBlocks);
		let tmpRefPipe = this.sortList(this.searchList(value, this.refPipes),this.refPipes);
		let tmpRefValve = this.sortList(this.searchList(value, this.refValves),this.refValves);


		property.innerHTML = this.blockMenu(tmpBlock);
		property.innerHTML += this.liquidMenu(tmpLiquid);

		property.innerHTML += this.newBlockMenu(tmpRefBlock);

		// this.setClass(`${Type[this.targetType]}${this.currValve}`,"list-act");
		// this.setClass(`liquid${this.currLiquid}`,"list-act");

		//изменение раскладки клавиатуры
		if(property.innerHTML==""){ 
			value = this.keyReplace(value);
			if(value != ""){
				this.list(value);
			}
		}
		
	}else{
		if(this.mode == 0){
			this.blockMenu(this.Block);
		}
		if(this.mode == 1){
			this.newBlockMenu(this.refBlocks);
		}
		if(this.mode == 10){
			property.innerHTML = this.pipeMenu(this.Pipe);
		}

		if(this.mode == 20){
			property.innerHTML = this.valveMenu(this.Valve);
		}
		if(this.mode == 21){
			property.innerHTML = this.newValveMenu(this.refValves);
		}
		if(this.mode == 30){
			property.innerHTML = this.liquidMenu(this.Liquid);
			this.setClass(`liquid${this.currLiquid}`,"list list-act");
		}
	}
}
static searchList(value, arr){
	let index = 0;
	let tmpArr = [];
	if(arr.length > 0){
		let S = "";
		for(let i = 0; i < arr.length; i++){
			if(arr[i].name != undefined){
				S = arr[i].name.toLowerCase();
			}
			if(arr[i].id != undefined){
				S += arr[i].id;
			}
			if(arr[i].description != undefined){
				S += arr[i].description.toLowerCase();
			}

			index = S.indexOf(value);

			if(tmpArr[index] == undefined){
				tmpArr[index] = [];
			}
			tmpArr[index][tmpArr[index].length] = i;
		}
	}
	return tmpArr;
}
static sortList(indexArr, arr){
	let newArr = [];
	for(let i = 0; i < indexArr.length; i++){
		if(indexArr[i] != undefined){
			for(let j = 0; j < indexArr[i].length; j++){
				newArr[newArr.length] = arr[indexArr[i][j]];
			}
		}
	}
	return newArr;
}
static setClass(selector,classNameValue){
	if(document.getElementById(selector) != null){
		document.getElementById(selector).className = classNameValue;
	}
}
// ######   ####      #####     ####   ### ###
//  ##  ##   ##      ### ###   ##  ##   ## ##
//  ##  ##   ##      ##   ##  ##        ####
//  #####    ##      ##   ##  ##        ###
//  ##  ##   ##      ##   ##  ##        ####
//  ##  ##   ##  ##  ### ###   ##  ##   ## ##
// ######   #######   #####     ####   ### ###
	static blockMenu(Arr){	
		for (let key in Arr){
			let elem = document.createElement("div");
			elem.className = "list list-inact";

			if(Arr[key] != null){
				elem.addEventListener("click", (e) => {Interface.setTarget(6,key)})
				elem.id = `6_${key}`;
				elem.innerHTML = `
				<div class="list-info">
					<svg viewBox="-50 -50 100 100">${Arr[key].getIcon(0,0,0,1,0)}</svg>
					${Arr[key].name} #${Arr[key].id}<br>
					${Arr[key].KKS}
				</div>`
			}else{
				elem.addEventListener("click", (e) => {Interface.setTarget(15,key)})
				elem.id = `15_${key}`;
				elem.innerHTML = `
				<div class="list-info">
					Пусто #${key} Нажмите чтобы создать
				</div>`
			}
			property.appendChild(elem);
		}
	}
	static newBlockMenu(Arr){
		for (let key in Arr){
			let elem = document.createElement("div");
			elem.className = "list list-inact";

			elem.addEventListener("click", (e) => {Interface.setTarget(12,key)})
			elem.id = `12_${key}`;
			elem.innerHTML = `
			<div class="list-info">
				<svg viewBox="-50 -50 100 100">${Arr[key].getIcon(0,0,0,1,0)}</svg>
				<b>${Arr[key].name}</b><br>
				${Arr[key].description}
			</div>`

			property.appendChild(elem);
		}
	}
	static createBlock(id, key){
		this.Block[id] = new this.refBlocks[key](id);//создается экземляр класса
		this.target = id;
		this.targetType =5
		this.optionBlockMenu(id);
	}
	static optionBlockMenu(id){
		let pHTML = `<form id="optionForm" class="form-property">`;
		pHTML += this.Block[id].getOption()+'</form>';
		pHTML += `<div class="w-2 but but-inact" onclick="Interface.editBlock(${this.target})">сохранить</div>`;
		pHTML += `<div class="w-2 but but-inact" onclick="Interface.setMode(0)">отмена</div>`;
		property.innerHTML = pHTML;
	}
	static sxemBlockMenu(id){
		let pHTML = `<form id="optionForm" class="form-property">`;
		pHTML += this.Block[id].getOption()+'</form>';
		pHTML += `<div class="w-2 but but-inact" onclick="Interface.editBlock(${this.target})">сохранить</div>`;
		pHTML += `<div class="w-2 but but-inact" onclick="Interface.setMode(0)">отмена</div>`;
		property.innerHTML = pHTML;
	}
	static editBlock(id){
		//id - index
		let formData = new FormData(optionForm);
		let Data = {};
		for (const [id, value] of formData) {
			Data[id] = value;
		}
		this.Block[id].setOption(Data);
		this.setMode(0);
	}
	static placeBlockEL(e){
		Interface.placeBlock(e.clientX,e.clientY);
	}
	static placeBlock(X,Y){
		//[id, X, Y, ширина, высота, тип, направление]
		X = X/this.scope*100+this.X;
		Y = Y/this.scope*100+this.Y;
		let index = this.sxemBlock.length;
		this.sxemBlock[index] = [this.target, X, Y, 100, 100, 0, 1];

		let group = document.createElementNS("http://www.w3.org/2000/svg","g");
		group.innerHTML = this.Block[this.target].getIcon(0,X,Y,1,0);
		group.id = `1_${this.target}`;
		group.addEventListener("click", (e) => {Interface.setTarget(1, index)})
		blockGroup.appendChild(group);
	}

// ######    ######  ######   #######
//  ##  ##     ##     ##  ##   ##   #
//  ##  ##     ##     ##  ##   ##
//  #####      ##     #####    ####
//  ##         ##     ##       ##
//  ##         ##     ##       ##   #
// ####      ######  ####     #######


	static pipeMenu(){
		let pHTML = "";
		for (this.key in this.Pipe){
			pHTML += `
			<div class="liquid">
				<svg viewBox="0 0 78 78">
					<path fill="#55f" d="M66,17v51c0,4.14-3.86,8-8,8H10c-4.14,0-8-3.86-8-8V17s9,3,18,3,11-5,21-5,25,2,25,2Z"/>
					<path d="M2,0v68c0,4.14,3.86,8,8,8h48c4.14,0,8-3.86,8-8V0"/>
					<line y1="28" x2="14" y2="28"/>
					<line x1="2" y1="44" x2="14" y2="44"/>
					<line x1="2" y1="60" x2="14" y2="60"/>
					<line x1="2" y1="36" x2="24" y2="36"/>
					<line x1="2" y1="52" x2="24" y2="52"/>
				</svg>
				<div>
					<br>
				</div>
			</div>`
		}
		return pHTML;
	}

// ##   ##    ###    ####     ##   ##  #######
// ##   ##   ## ##    ##      ##   ##   ##   #
// ##   ##  ##   ##   ##      ##   ##   ##
//  ## ##   ##   ##   ##       ## ##    ####
//  ## ##   #######   ##       ## ##    ##
//   ###    ##   ##   ##  ##    ###     ##   #
//   ###    ##   ##  #######    ###    #######

	static valveMenu(){
		let pHTML = "";
		for (this.key in this.Pipe){
			pHTML += `
			<div class="valve">
				<svg viewBox="0 0 68 78">
					<path fill="#55f" d="M66,17v51c0,4.14-3.86,8-8,8H10c-4.14,0-8-3.86-8-8V17s9,3,18,3,11-5,21-5,25,2,25,2Z"/>
					<path d="M2,0v68c0,4.14,3.86,8,8,8h48c4.14,0,8-3.86,8-8V0"/>
					<line y1="28" x2="14" y2="28"/>
					<line x1="2" y1="44" x2="14" y2="44"/>
					<line x1="2" y1="60" x2="14" y2="60"/>
					<line x1="2" y1="36" x2="24" y2="36"/>
					<line x1="2" y1="52" x2="24" y2="52"/>
				</svg>
				<div>
					<br>
				</div>
			</div>`
		}
		return pHTML;
	}

// ####      ######    ###    ##   ##   ######  #####
//  ##         ##     ## ##   ##   ##     ##     ## ##
//  ##         ##    ##   ##  ##   ##     ##     ##  ##
//  ##         ##    ##   ##  ##   ##     ##     ##  ##
//  ##         ##    ##   ##  ##   ##     ##     ##  ##
//  ##  ##     ##     ## ##   ##   ##     ##     ## ##
// #######   ######    ####    #####    ######  #####
//                        ##

	static liquidMenu(Arr){
		let pHTML = ""; 
		for (let i = 0; i < Arr.length; i++){
			pHTML += `
			<div id="liquid${Arr[i].id}" class="list list-inact">
				<div class="list-info">
					<svg viewBox="0 0 78 78" onclick="Interface.setLiquid(${Arr[i].id})">
						<path fill="${Arr[i].fill}" d="M66,17v51c0,4.14-3.86,8-8,8H10c-4.14,0-8-3.86-8-8V17s9,3,18,3,11-5,21-5,25,2,25,2Z"/>
						<path d="M2,0v68c0,4.14,3.86,8,8,8h48c4.14,0,8-3.86,8-8V0"/>
						<line x1="2" y1="28" x2="14" y2="28"/>
						<line x1="2" y1="44" x2="14" y2="44"/>
						<line x1="2" y1="60" x2="14" y2="60"/>
						<line x1="2" y1="36" x2="24" y2="36"/>
						<line x1="2" y1="52" x2="24" y2="52"/>
					</svg>
					${Arr[i].name} #${Arr[i].id}<br>
					ρ:${Arr[i].density}<br>
					ν:${Arr[i].viscosity*1e4}e-4
				</div>
			</div>`
		}
		return pHTML;
	}
	static createLiquid(){
		this.Liquid[this.Liquid.length] = new CommonLiquid({'id':this.Liquid.length});
		property.innerHTML = `<form class="form-property" oninput="Interface.Liquid[${this.Liquid.length-1}].setOption(this)">`+this.Liquid[this.Liquid.length-1].getOption()+'</form>';
	}
	static editLiquid(id){
		Interface.setMode(Interface.mode+2)
		property.innerHTML = `<form class="form-property" oninput="Interface.Liquid[${id}].setOption(this)">`+this.Liquid[id].getOption()+'</form>';
	}
	static deleteLiquid(id){
		this.Liquid.splice(id, 1);
		if(this.currLiquid == id){
			this.setLiquid(this.Liquid[0].id);
		}
		this.list("");
	}
	static setLiquid(id){
		this.setClass(`liquid${this.currLiquid}`,"list-inact");
		this.currLiquid = id;
		// for(let i = 0; i < this.currLiquid.length; i++){
		// 	if(this.currLiquid[i].id == id){

		// 	}
		// }
		liquidInfo.innerHTML = this.Liquid[id].name+' #'+this.Liquid[id].id;
		this.setClass(`liquid${this.currLiquid}`,"list-act");
	}

}