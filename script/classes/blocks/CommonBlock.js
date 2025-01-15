class CommonBlock{
	constructor(id){
		this.id = id;
	}
	static name = "Заготовка блока";
	static description = "Используется в качестве прототипа для блоков";

//  #####   ######     ###    ######    ##  ##   ######   #####    #####
// ##   ##   ##  ##   ## ##    ##  ##   ##  ##     ##    ##   ##  ##   ##
// ##        ##  ##  ##   ##   ##  ##   ##  ##     ##    ##       ##
// ## ####   #####   ##   ##   #####    ######     ##    ##        #####
// ##   ##   ## ##   #######   ##       ##  ##     ##    ##            ##
// ##   ##   ## ##   ##   ##   ##       ##  ##     ##    ##   ##  ##   ##
//  #####   #### ##  ##   ##  ####      ##  ##   ######   #####    #####

//	icon[i] = [fill, stroke, onclick, mode]
//  mode: 0-4 - path и его подфункции; 5 - ellipse; 6 - polyline;

	static Icon = [
		[1,1,0,5,0,0,48,48]
	];
//[x, y, liquidId, Pressure, Temperature,]
	nodes = [
		
	]

	KKS = "";
	name = "common";
	liquid = [0];

	static iconPreProcessor(Icon, x, y, scale, quadrant){
		function rotateCordX(x,y,quadrant){
			let cos = [0,1,0,-1];
			let sin = [1,0,-1,0];
			return x * sin[quadrant] - y * cos[quadrant];
		}
		function rotateCordY(x,y,quadrant){
			let cos = [0,1,0,-1];
			let sin = [1,0,-1,0];
			return x * cos[quadrant] + y * sin[quadrant];
		}
		let tmpIcon = [];

		for(let i = 0; i < Icon.length; i++){
			tmpIcon[i] = [];
			tmpIcon[i][0] = Icon[i][0]; //fill-color
			tmpIcon[i][1] = Icon[i][1]; //stroke-color
			tmpIcon[i][2] = Icon[i][2]; //onclick-function
			tmpIcon[i][3] = Icon[i][3]; //mode

			if(Icon[i][3] == 0){
				//path
				let j = 3;
				let shift = 0;
				while (j < Icon[i].length) {

					tmpIcon[i][j] = Icon[i][j]; //mode

					if(Icon[i][j] == 0){
						//M x y
						tmpIcon[i][j+1] = rotateCordX(Icon[i][j+1],Icon[i][j+2],quadrant)*scale+x; //x
						tmpIcon[i][j+2] = rotateCordY(Icon[i][j+1],Icon[i][j+2],quadrant)*scale+y; //y
						shift = 3;
					}

					if(Icon[i][j] == 1){
						//L x y
						tmpIcon[i][j+1] = rotateCordX(Icon[i][j+1],Icon[i][j+2],quadrant)*scale+x; //x
						tmpIcon[i][j+2] = rotateCordY(Icon[i][j+1],Icon[i][j+2],quadrant)*scale+y; //y
						shift = 3;
					}

					if(Icon[i][j] == 2){
						//C x1 y1, x2 y2, x y
						tmpIcon[i][j+1] = rotateCordX(Icon[i][j+1],Icon[i][j+2],quadrant)*scale+x; //x1
						tmpIcon[i][j+2] = rotateCordY(Icon[i][j+1],Icon[i][j+2],quadrant)*scale+y; //y1

						tmpIcon[i][j+3] = rotateCordX(Icon[i][j+3],Icon[i][j+4],quadrant)*scale+x; //x2
						tmpIcon[i][j+4] = rotateCordY(Icon[i][j+3],Icon[i][j+4],quadrant)*scale+y; //y2

						tmpIcon[i][j+5] = rotateCordX(Icon[i][j+5],Icon[i][j+6],quadrant)*scale+x; //x
						tmpIcon[i][j+6] = rotateCordY(Icon[i][j+5],Icon[i][j+6],quadrant)*scale+y; //y
						shift = 7;
					}

					if(Icon[i][j] == 3){
						//Q x1 y1, x y
						tmpIcon[i][j+1] = rotateCordX(Icon[i][j+1],Icon[i][j+2],quadrant)*scale+x; //x1
						tmpIcon[i][j+2] = rotateCordY(Icon[i][j+1],Icon[i][j+2],quadrant)*scale+y; //y1

						tmpIcon[i][j+3] = rotateCordX(Icon[i][j+3],Icon[i][j+4],quadrant)*scale+x; //x
						tmpIcon[i][j+4] = rotateCordY(Icon[i][j+3],Icon[i][j+4],quadrant)*scale+y; //y
						shift = 5;
						
					}

					if(Icon[i][j] == 4){
						//A rx ry x-axis-rotation large-arc-flag sweep-flag x y
						tmpIcon[i][j+1] = Icon[i][j+1]*scale; //rx
						tmpIcon[i][j+2] = Icon[i][j+2]*scale; //ry

						tmpIcon[i][j+3] = Icon[i][j+3]; //x-axis-rotation 
						tmpIcon[i][j+4] = Icon[i][j+4]; //large-arc-flag
						tmpIcon[i][j+5] = Icon[i][j+5]; //sweep-flag

						tmpIcon[i][j+6] = rotateCordX(Icon[i][j+3],Icon[i][j+4],quadrant)*scale+x; //x
						tmpIcon[i][j+7] = rotateCordY(Icon[i][j+3],Icon[i][j+4],quadrant)*scale+y; //y
						shift = 8;
					}
					j += shift;
				}
			}

			if(Icon[i][3] == 5){
				//ellipse
				tmpIcon[i][4] = rotateCordX(Icon[i][4],Icon[i][5],quadrant)+x; //cx
				tmpIcon[i][5] = rotateCordY(Icon[i][4],Icon[i][5],quadrant)+y; //cy
				tmpIcon[i][6] = Icon[i][6]*scale; //rx
				tmpIcon[i][7] = Icon[i][7]*scale; //ry
			}

			if(Icon[i][3] == 6){
				//polyline
				for(let j = 4; j < Icon[i].length; j = j+2){
					tmpIcon[i][j] =   rotateCordX(Icon[i][j],Icon[i][j+1],quadrant)*scale+x; //x[i]
					tmpIcon[i][j+1] = rotateCordY(Icon[i][j],Icon[i][j+1],quadrant)*scale+y; //y[i]
				}
			}
		}
		return tmpIcon;
	}

	static getIcon(iconNum, x, y, scale, quadrant){
		let Icon = this.iconPreProcessor(this.Icon, x, y, scale, quadrant);
		let tmpIcon = "";

		for(let i = 0; i < Icon.length; i++){
			let fill = "";
			let stroke = "";
			if (Icon[i][0] == 0) {
				fill = "none";
			}else{
				if (Icon[i][0] == 1) {
					fill = "#22384d";
				}
			}
			if (Icon[i][1] == 0) {
				stroke = "none";
			}else{
				if (Icon[i][1] == 1) {
					stroke = "#dadada";
				}
			}
			//tmpIcon[i][2] = Icon[i][2]; //onclick-function

			if(Icon[i][3] == 0){
				//path
				let j = 3;
				let shift = 0;
				while (j < Icon[i].length) {
					if(Icon[i][j] == 0){
						//M x y
						tmpIcon += `<path fill="${fill}" stroke="${stroke}" d="M${Icon[i][j+1]},${Icon[i][j+2]}`;
						shift = 3;
					}

					if(Icon[i][j] == 1){
						//L x y
						tmpIcon += `L${Icon[i][j+1]},${Icon[i][j+2]}`;
						shift = 3;
					}

					if(Icon[i][j] == 2){
						//C x1 y1, x2 y2, x y
						tmpIcon += `C${Icon[i][j+1]},${Icon[i][j+2]},${Icon[i][j+3]},${Icon[i][j+4]},${Icon[i][j+5]},${Icon[i][j+6]}`;
						shift = 7;
					}

					if(Icon[i][j] == 3){
						//Q x1 y1, x y
						tmpIcon += `Q${Icon[i][j+1]},${Icon[i][j+2]},${Icon[i][j+3]},${Icon[i][j+4]}`;
						shift = 5;
						
					}

					if(Icon[i][j] == 4){
						//A rx ry x-axis-rotation large-arc-flag sweep-flag x y
						tmpIcon += `A${Icon[i][j+1]},${Icon[i][j+2]},${Icon[i][j+3]},${Icon[i][j+4]},${Icon[i][j+5]},${Icon[i][j+6]},${Icon[i][j+7]}`;
						shift = 8;
					}
					j += shift;
				}
				tmpIcon += '"/>';
			}

			if(Icon[i][3] == 5){
				//ellipse
				tmpIcon += `<ellipse fill="${fill}" stroke="${stroke}" cx="${Icon[i][4]}" cy="${Icon[i][5]}" rx="${Icon[i][6]}" ry="${Icon[i][7]}"/>`;
			}

			if(Icon[i][3] == 6){
				//polyline
				tmpIcon += `<polyline fill="${fill}" stroke="${stroke}" points=`
				for(let j = 4; j < Icon[i].length; j = j+2){
					tmpIcon += `${Icon[i][j]},${Icon[i][j+1]} `;
				}
				tmpIcon += '"/>';
			}
		}
		return tmpIcon;
	}
	getIcon(iconNum, x, y, scale, quadrant){
		return CommonBlock.getIcon(0, x, y, 1, 1);
	}
	static getOption(){

	}
	setOption(Data){
		for(let key in Data){
			this[key] = Data[key];
		}
	}
	getNodes(){
		
	}
	

}