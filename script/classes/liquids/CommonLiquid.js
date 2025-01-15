class CommonLiquid{
	constructor(option){
		option = Object.assign({}, this.defaultOptions, option);
		this.id = option.id;
		this.name = option.name;			//название жидкости
		this.viscosity = option.viscosity;	//вязкость
		this.fill = option.fill;			//цвет
		this.density = option.density;  	//плотность
	}
	defaultOptions = {
		id: 0,
		name: 'Вода',
		viscosity: 8.90e-4,
		fill: '#5fafff',
		density: 997
	}
	getOption(){
		return `
			<div class="w-1"><div>Название</div>           <input name="name" type="text" value="${this.name}"></div>
			<div class="w-3"><div>Цвет</div>               <input name="fill" type="color" value="${this.fill}"></div>
			<div class="w-3"><div>Плотность</div>          <input name="density" type="text" value="${this.density}"></div>
			<div class="w-3"><div>Вязкость</div>           <input name="viscosity" type="text" value="${this.viscosity}"></div>
		`
	}
	setOption(Data){
		for(let key in Data){
			this[key] = Data[key];
		}
	}
}
