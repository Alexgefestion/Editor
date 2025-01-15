class NasosElectric extends CommonBlock{
	static name = "Эл. насос";
	static description = "Не требует мотора";

	static Icon = [
		[1,1,0,5,0,0,48,48],
		[1,1,0,0,-24,-22,1,0,-46,1,24,-22]
	];

	nodes = [
		
	]


	name = "Эл. насос";
	KKS = "01AA01D001"
	state = 0;
	P_in = 1;
	H = 0;

	prototype = 'NasosElectric';

	getIcon(iconNum, x, y, scale, quadrant){
		return NasosElectric.getIcon(iconNum, x, y, scale, quadrant);
	}
	getOption(){
		return `
			<div class="w-1"><div>Название</div>           <input name="name" type="text" value="${this.name}"></div>
			<div class="w-2"><div>KKS</div>                <input name="KKS" type="text" value="${this.KKS}"></div>
			<div class="w-2"><div>Состояние</div>          <input name="state" type="text" value="${this.state}"></div>
			<div class="w-2"><div>На всасе</div>           <input name="P_in" type="text" value="${this.P_in}"></div>
			<div class="w-2"><div>Напор</div>              <input name="H" type="text" value="${this.H}"></div>
		`
	}
}