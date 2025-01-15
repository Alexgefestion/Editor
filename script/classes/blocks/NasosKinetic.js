class NasosKinetic extends CommonBlock{
	static name = "Кин. насос";
	static description = "Требует мотор";
	static Icon = [
		[0,1,0,5,0,0,48,48],
		[0,1,0,0,-24,-22,1,0,-46,1,24,-22]
	];
	getIcon(){
		return NasosKinetic.getIcon(0, 0, 0, 1, 0);
	}
	prototype = "NasosKinetic"
	
}