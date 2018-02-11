let setForm=document.querySelector('#setForm');
let inpVl= document.querySelector('#setForm #secVal');
let inpDescr= document.querySelector('#setForm #secDescr');
let inpSb= document.querySelector('#setForm input[type="submit"]');

let dataCont= document.querySelector('.all-data');

/*------------------------*/

let pieData=[];

let Sector= function(val, descr, col,  path){
	this.val=val;
	this.color=col;
	this.descr=descr;
	this.pathStr=path;
};

/*------------*/

let createSector= function(){
	let c='abc';
	let p='cba';
	let a=new Sector(inpVl.value, inpDescr.value, c, p);
	pieData.push(a);
	console.log(pieData);
};

/*------------*/

inpSb.addEventListener('click',(e)=>{
	e.preventDefault();
	if(inpVl.checkValidity() && inpDescr.checkValidity()){
		createSector();
		setForm.reset();
	}else{return false};
});

/*--------------------------------------------------------------------*/
