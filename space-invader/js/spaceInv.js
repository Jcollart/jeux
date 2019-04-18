nm = 0
m = new Array()
var tm = new Array()
var lastFire = 0

/*****************Gestion missile******************** */

function missile(x,y,ord) {
	this.ord = ord
	this.x=x
	this.y=y
	this.v=-120
	this.t0 = new Date().getTime()/1000
	this.miss = "<div id='mis_"+this.ord+"' class='mis'><img src=img/missile.bmp'/></div>"


	document.getElementById("contenant").innerHTML+= this.miss
	document.getElementById("mis_"+this.ord).style.top=y
	document.getElementById("mis_"+this.ord).style.left=x
	this.tire = function() {
		if(this.y>-24){
			now = new Date().getTime()/1000
			var dt = now-this.t0	
			var yaux = this.y
			this.y = this.v*dt+this.y
			document.getElementById("mis_"+this.ord).style.top=this.y
			for( var i=4 ; i>=0 ; i--){
				if (this.y<a.y0+60*i+30 && yaux>a.y0+60*i){
					for( var j=0 ; j<6 ; j++){
						if (this.x<(a.x0+75*j+58) && this.x+8>(a.x0+75*j)){
							var id = "vas_"+(i*6+j)
							if(document.getElementById(id)!=null){
								document.getElementById("contenant").removeChild(document.getElementById("mis_"+this.ord))
								document.getElementById("armee").removeChild(document.getElementById(id))
								if (a.battle.length==1){
									alert("Vous avez gagnés")
								} else {
									a.heigh=0	
									for( var p = 0 ; p<a.battle.length ; p++){
										if (a.battle[p].id == id){
											a.battle.splice(p,1)
										} else {
											a.heigh=Math.max(a.battle[p].y+30, a.heigh)
										}
									}
								}	
								return true
							}
							
						}
					}
				}
			}
			tm[this.ord]=setTimeout("m["+this.ord+"].tire()", 100) 
		} else {
			document.getElementById("contenant").removeChild(document.getElementById("mis_"+this.ord))
		}
	} 	
}

function vassel(x, y, id){
	this.x = x 
	this.y = y
	this.id = id
}

function armee(){
	this.nVas = 30
	this.vy = 20
	this.Xorig = 185
	this.x0 = 185
	this.y0 = 0
	this.nax = 0
	this.t0 = new Date().getTime()/1000
	this.battle = new Array()
	this.heigh = 300
	for( i = 0 ; i<this.nVas ; i++){
		this.battle[i] = new vassel((i%6)*75, Math.floor(i/6)*60, "vas_"+i) 
	}
	this.draw = function(){
		for( i = 0 ; i<this.nVas ; i++){
			document.getElementById("armee").innerHTML += "<div id='vas_"+i+"' class='vas' style='left:"+this.battle[i].x+"px; top: "+this.battle[i].y+"px'><img src='img/invader.bmp'/></div>"
		}
	}
	this.run = function() {
		this.nax++
		var now = new Date().getTime()/1000 
		var dt = now-this.t0
		this.x0 = 60*Math.sin(2*3.1416*dt/5)+this.Xorig
		document.getElementById("armee").style.left = this.x0
		this.y0=this.vy*dt
		document.getElementById("armee").style.top = this.y0
		if (a.heigh+a.y0>600){
			alert("Vous avez perdu !!!!!")
		} else {
 			setTimeout("a.run()", 100) 
		}
	}
}






function Ship(){
	this.x0=374
	this.y0=550
	this.accel=0
	this.speed=0
	this.frot=.8
	this.t0 = new Date().getTime()/1000
	this.move = function (now){
		this.x0 = Math.min(778,Math.max(0, this.x0))
		if (this.x0 > 778 || this.x0 < 0){
			this.accel=0 
			this.speed=0
		}
		dt = now-this.t0
		this.x0 = this.accel*dt*dt/2+this.frot*this.speed*dt+this.x0
		this.speed = this.accel*dt+this.frot*this.speed
		this.t0=now
		document.getElementById("ship").style.left = this.x0 
	}
}

sh = new Ship()

function keypress(e) {
// 	alert("keypress")
	if (window.event){
		e = window.event
		if (e.keyCode==108){
			sh.accel+=70
		} else if (e.keyCode==106){
			sh.accel-=70
		} else if (e.keyCode==105) {
			var now = new Date().getTime()/1000
			if (nm==0 || now-lastFire>.3){
				lastFire = now
				nm++
				m[nm] = new missile(sh.x0+12,sh.y0,nm)
				m[nm].tire()
			}
		} else if (e.keyCode==113){
			clearTimeout(t)
		} 
	} else {
		if (e.keyCode==39){
			sh.accel+=70
		} else if (e.keyCode==37){
			sh.accel-=70
		} else if (e.keyCode==38) {
			var now = new Date().getTime()/1000
			if (nm==0 || now-lastFire>.3){
				lastFire = now
				nm++
				m[nm] = new missile(sh.x0+12,sh.y0,nm)
				m[nm].tire()
			}
		} else if (e.keyCode==0 && e.charCode==113){
			clearTimeout(t)
		} 
	return true;
	}
}

function release(e) {
// 	alert("release")
	if (window.event){
		e = window.event
		if (e.keyCode==74||e.keyCode==76){
			sh.accel=0
		}
	} else {
		if (e.keyCode==39 || e.keyCode==37){
			sh.accel=0
		}
		return true;
	}
	
}
