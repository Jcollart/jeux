function faire(){
	now = new Date().getTime()/1000
	sh.move(now)
	t = setTimeout("faire()", 100) 
}

a = new armee() 
a.draw()
a.run()
faire()