let screen = document.getElementById('screen') //pegando o canvas do html
let ctx = screen.getContext("2d") //pegando o contexto do canvas

ctx.lineWidth = 2
ctx.strokeStyle = "black"
ctx.fillStyle = 'black'
   
//deseha a carga vertical (Y)
ctx.beginPath()
ctx.moveTo(200, 400)
ctx.lineTo(200, 0)
ctx.moveTo(0,200)
ctx.lineTo(400, 200)
ctx.stroke()
