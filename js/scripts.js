let setForm=document.querySelector('#setForm');
let inpVl= document.querySelector('#setForm #secVal');
let inpDescr= document.querySelector('#setForm #secDescr');
let inpSb= document.querySelector('#setForm input[type="submit"]');

let dataCont= document.querySelector('.all-data');

/*----------------------------------------------------------------*/

//arr fo storing data:
let pieData=[];

//create svg pie-chart-container
function drawPieCont(){
	const content=document.getElementById('piechart');
	content.innerHTML='';
	let svg= document.createElementNS('http://www.w3.org/2000/svg','svg');
	svg.setAttribute('width', 200);
	svg.setAttribute('height', 200);
	svg.setAttribute('id', 'svgPie');
	svg.setAttribute('viewbox','0 0 200 200');

	content.appendChild(svg);
};
/*----------------------------------------------------------------*/

//get sum of all values in data array
function getSum(){
	return pieData.map(function(a){return +a.val;}).reduce(function(tot,curr){return tot+curr;});

	//return pieData.reduce(function(total,item){return total+(+item.val);},0);
};

/*----------------------------------------------------------------*/
//draw all chart
function drawAll(){
	drawPieCont();

	let x=100;
	let y= 0;
	let val=0;
	let arrLen=pieData.length;

	for(let i=0; i<arrLen; i++){

		let count=arrLen-(i+1);// direction => last data as first

		let dir;

		val0=pieData[count].val*1;
		let ang0=((val0/getSum())*360);
		if(ang0>180){dir=1}else{dir=0}

		val+=pieData[count].val*1;
		let ang=((val/getSum())*360);

		let cc= (ang*(Math.PI/180))-Math.PI/2;

		let prex=100+((Math.cos(cc)) * 100);
		let x2=Math.floor(prex*100)/100;
		let y2=100+((Math.sin(cc)) * 100);

		let path= document.createElementNS('http://www.w3.org/2000/svg','path');
		let svgPath=document.querySelector('#piechart svg');
		svgPath.appendChild(path);

		let d1=`M100 100 L ${x} ${y}  A100 100 0, ${dir} ,1 ${x2} ${y2} Z`;
		path.setAttribute('d', d1);
		let col=`#${i}a3${i}${i}0`;
		path.setAttribute('fill', col);

		x=x2;
		y=y2;
	};
};
/*----------------------------------------------------------------*/

//constr sectorObj
function Sector(val, descr){
	this.val=val;
	this.descr=descr;
};


//sector obj creator
let createSector= function(){
	let c='abc';
	let a=new Sector(inpVl.value, inpDescr.value);
	pieData.push(a);
	console.log(pieData); // test
};


//add data from form
inpSb.addEventListener('click',(e)=>{
	e.preventDefault();
	if(inpVl.checkValidity() && inpDescr.checkValidity()){  //valid
		createSector();//push new data obj into arr
		setForm.reset();//reset form after submit

		drawAll();
		console.log(getSum());
	}else{return false};
});

/*----------------------------------------------------------------*/
