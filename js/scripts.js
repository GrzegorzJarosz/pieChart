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

//draw all chart
function drawAll(){
	drawPieCont();
};

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

	}else{return false};
});

/*----------------------------------------------------------------*/
