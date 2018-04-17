let setForm = document.querySelector('#setForm');
let inpVl = document.querySelector('#setForm #secVal');
let inpDescr = document.querySelector('#setForm #secDescr');
let inpSb = document.querySelector('#setForm input[type="submit"]');
let keyChartCont = document.querySelector('#key');


/*----------------------------------------------------------------*/
//data for chart
const pieHeight = 300;


/*----------------------------------------------------------------*/
//arr fo storing data:
let pieData=[
	{val:102,descr:'buraki'},
	{val:33,descr:'orzechy'},
	{val:81,descr:'pietruszka'},
	{val:62,descr:'salata'},
	{val:21,descr:'kalafior'},
	{val:99,descr:'rzodkiewka'},
	{val:34,descr:'fasola'},
	{val:345,descr:'brokul'},
	{val:234,descr:'ziemniaki'}
];

//constr sectorObj
function Sector(val, descr){
	this.val = val;
	this.descr = descr;
};

/*----------------------------------------------------------------*/

//sector obj creator
let createSector = function(){
	let c ='abc';
	let a = new Sector(inpVl.value, inpDescr.value);
	pieData.push(a);
	//test
	//console.log(pieData);
};

/*----------------------------------------------------------------*/
//get sum of all values in data array
function getSum(){
	return pieData.reduce(function(total,item){return total+(+item.val);},0);
};

/*----------------------------------------------------------------*/

//create svg pie-chart-container
function drawPieCont(){
	const content = document.getElementById('piechart');
	content.innerHTML = '';
	let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
	svg.setAttribute('width', pieHeight);
	svg.setAttribute('height', pieHeight);
	svg.setAttribute('id', 'svgPie');
	svg.setAttribute('viewbox','0 0 '+pieHeight+' '+pieHeight);

	content.appendChild(svg);
};
/*----------------------------------------------------------------*/
//color generator
function colorMaker(num, sum){
	let w = 4;
	let q = 10;
	if(num%2 === 0){w = 2}
	if(num%3 === 0){w = 3}
	if(num%4 === 0){q = 8}
	let col = 'hsl('+num*(360/sum)+', '+q*10+'%, '+w*10+'%)';
	return col;
};
/*----------------------------------------------------------------*/
//keyChart generator
function keyChartGen(col, val, descr, no){

	let color = col;
	let value = val;
	let description = descr;

	//sub-cont
	let k = document.createElement('div')
	k.setAttribute('class','key-sub');
	k.setAttribute('data-id', no);

	//colorblock
	let sc = document.createElement('div')
	sc.setAttribute('class','key-sub-col');
	sc.setAttribute('style','background-color:'+color);

	//textblock
	let st = document.createElement('span')
	st.setAttribute('class','key-sub-txt');
	//addtext
	let txt = document.createTextNode(description+', '+value);
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
	keyChartCont.innerHTML = '';
	//init values
	let halfH = (pieHeight / 2) -5;
	let x = halfH ;
	let y = 0;
	let val = 0;
	let totalAng = 0;
	partId = 0;


	let arrLen = pieData.length;

	for(let i = 0; i < arrLen; i++){

		let count = arrLen - (i + 1);// direction => last data as first
		let dir;//svg var

		val0 = pieData[count].val * 1;
		let ang0 = ((val0 / getSum()) * 360);
		if(ang0 > 180){ dir = 1 } else { dir = 0 }

		val += pieData[count].val * 1;
		let ang = ((val / getSum()) * 360);

		let cc = (ang * (Math.PI / 180)) - Math.PI/2;

		let prex =  halfH + ((Math.cos(cc)) *  halfH);
		let x2 = Math.floor(prex *  halfH) /  halfH;
		let y2 =  halfH + ((Math.sin(cc)) *  halfH);

		let path = document.createElementNS('http://www.w3.org/2000/svg','path');
		let svgPath = document.querySelector('#piechart svg');
		svgPath.appendChild(path);

		let d1 =`M${halfH} ${halfH} L ${x+5} ${y+5}  A${halfH} ${halfH} 0, ${dir} ,1 ${x2+5} ${y2+5} Z`;
		path.setAttribute('d', d1);

		let col = colorMaker(i, arrLen);
		path.setAttribute('fill', col);
		keyChartGen(col, pieData[count].val, pieData[count].descr, partId)

//--------------------------------forhover-------------------------------------->

		let alpha = (totalAng) + (ang0/2);
		let xprim = 5 * ((Math.sin(alpha * (Math.PI / 180))));
		let yprim = -5 * ((Math.cos(alpha * (Math.PI / 180))));
		let keyForThis = document.querySelector('.key-sub[data-id="'+partId+'"]');

		path.addEventListener('mouseenter', (el)=>{
			el.target.style.transform = `translate(${xprim}px, ${yprim}px)`;
			keyForThis.classList.add('key-marked');
		});

		path.addEventListener('mouseleave', (el)=>{
			el.target.style.transform = `translate(0px, 0px)`;
			keyForThis.classList.remove('key-marked');
		});

		//
		totalAng = totalAng + ang0;
//<--------------------------------forhover--end--------------------------------------

		x = x2;
		y = y2;
		partId ++;
	};
};
/*----------------------------------------------------------------*/


//get data from form into arr
inpSb.addEventListener('click',(e) => {
	e.preventDefault();
	if(inpVl.checkValidity() && inpDescr.checkValidity()){  //valid
		createSector();//push new data obj into arr
		setForm.reset();//reset form after submit

		drawAll();
		//test
		//console.log(getSum());
	}else{ return false };
});


drawAll();
