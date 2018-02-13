let setForm=document.querySelector('#setForm');
let inpVl= document.querySelector('#setForm #secVal');
let inpDescr= document.querySelector('#setForm #secDescr');
let inpSb= document.querySelector('#setForm input[type="submit"]');
let keyChartCont=document.querySelector('#key');


/*----------------------------------------------------------------*/

//arr fo storing data:
let pieData=[];

//constr sectorObj
function Sector(val, descr){
	this.val=val;
	this.descr=descr;
};

/*----------------------------------------------------------------*/

//sector obj creator
let createSector= function(){
	let c='abc';
	let a=new Sector(inpVl.value, inpDescr.value);
	pieData.push(a);
	console.log(pieData); // ******test*******
};

/*----------------------------------------------------------------*/
//get sum of all values in data array
function getSum(){
	return pieData.reduce(function(total,item){return total+(+item.val);},0);
};

/*----------------------------------------------------------------*/

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
//color generator
function colorMaker(num, sum){
	let w=4;
	let q=10;
	if(num%2===0){w=2}
	if(num%3===0){w=3}
	if(num%4===0){q=8}
	let col='hsl('+num*(360/sum)+', '+q*10+'%, '+w*10+'%)';
	return col;
};
/*----------------------------------------------------------------*/
//keyChart generator
function keyChartGen(col, val, descr){

	let color=col;
	let value=val;
	let description=descr;

	//sub-cont
	let k=document.createElement('div')
	k.setAttribute('class','key-sub');

	//colorblock
	let sc=document.createElement('div')
	sc.setAttribute('class','key-sub-col');
	sc.setAttribute('style','background-color:'+color);
	//addtext
	let txtval = document.createTextNode(value);
	sc.appendChild(txtval);

	//textblock
	let st=document.createElement('span')
	st.setAttribute('class','key-sub-txt');
	//addtext
	let txt = document.createTextNode(description);
	st.appendChild(txt);

	//
	k.appendChild(sc);
	k.appendChild(st);
	keyChartCont.appendChild(k);
};

/*----------------------------------------------------------------*/

//---draw all -- chart---
function drawAll(){

	drawPieCont();
	keyChartCont.innerHTML='';
	//init values
	let x=100;
	let y= 0;
	let val=0;

	let arrLen=pieData.length;

	for(let i=0; i<arrLen; i++){

		let count=arrLen-(i+1);// direction => last data as first
		let dir;//svg var

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

		let col=colorMaker(i, arrLen);
		path.setAttribute('fill', col);
		keyChartGen(col, pieData[count].val, pieData[count].descr)

		x=x2;
		y=y2;
	};
};
/*----------------------------------------------------------------*/


//get data from form into arr
inpSb.addEventListener('click',(e)=>{
	e.preventDefault();
	if(inpVl.checkValidity() && inpDescr.checkValidity()){  //valid
		createSector();//push new data obj into arr
		setForm.reset();//reset form after submit

		drawAll();
		console.log(getSum()); // ******test*******
	}else{return false};
});
