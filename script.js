let screen = document.getElementById('screen') //pegando o canvas do html
let ctx = screen.getContext("2d") //pegando o contexto do canvas

let WIDTH = screen.width
let HEIGHT  = screen.height

ctx.lineWidth = 2
ctx.strokeStyle = "black"
ctx.fillStyle = 'black'

function drawAxis(xOrigin, yOrigin, wScreen, hScreen, fatorEscalaX, FatorEscalaY, gradX, gradY) {
  //deseha os eixos
  //xOrigin e yOrigin distância que os eixos estarão da origen do canvas(canto superior esquerdo)
  //hScreen e wScreen são a lagura e a altura da tela
  //eixo y terá que ser invertido
  //FatorEscala dado em pixels por unidade de comprimento
  //grad em unidade de comprimento
  
  ctx.font = "10px arial"

  let register
  for (let i = 0; i < Math.round(wScreen / (fatorEscalaX*gradX)) ; i++) {
    if( xOrigin + gradX*fatorEscalaX*i < wScreen){
      ctx.beginPath()
      ctx.moveTo(xOrigin + gradX*fatorEscalaX*i, yOrigin-5)
      ctx.lineTo(xOrigin + gradX*fatorEscalaX*i, yOrigin+5)
      ctx.fillText(gradX* i, xOrigin + gradX*fatorEscalaX*i, yOrigin + 15)
      ctx.stroke()

      register = gradX*fatorEscalaX*i
    }else{
      ctx.beginPath()
      ctx.moveTo(xOrigin + register - gradX*fatorEscalaX*i, yOrigin-5)
      ctx.lineTo(xOrigin + register - gradX*fatorEscalaX*i, yOrigin+5)
      ctx.fillText((register/fatorEscalaX - gradX * i).toFixed(1), xOrigin + register - gradX*fatorEscalaX*i, yOrigin + 15)
      ctx.stroke()
    }
  }

  for (let i = 0; i < Math.round(hScreen / (FatorEscalaY * gradY)) ; i++) {
    if( yOrigin + gradY*FatorEscalaY*i < hScreen){
      ctx.beginPath()
      ctx.moveTo(xOrigin - 5, yOrigin + gradY*FatorEscalaY*i)
      ctx.lineTo(xOrigin + 5, yOrigin + gradY*FatorEscalaY*i)
      ctx.fillText( - gradY* i, xOrigin + 5, yOrigin + gradY*FatorEscalaY*i)
      ctx.stroke()

      register = gradY*FatorEscalaY*i
    }else{
      ctx.beginPath()
      ctx.moveTo(xOrigin-5, yOrigin + register - gradY*FatorEscalaY*i)
      ctx.lineTo(xOrigin+5, yOrigin + register - gradY*FatorEscalaY*i)
      ctx.fillText((gradY* i - (register/FatorEscalaY)).toFixed(1), xOrigin + 5, yOrigin + register - gradY*FatorEscalaY*i)
      ctx.stroke()
    }
  }

  ctx.beginPath()
  //desenha o eixo x 
  ctx.moveTo(0, yOrigin)
  ctx.lineTo(wScreen, yOrigin)
  //desenha o eixo y
  ctx.moveTo(xOrigin, 0)
  ctx.lineTo(xOrigin, hScreen)
  ctx.stroke() 
}

function result1g(wScreen, hScreen){
  let a = Number(document.getElementById("a-1g").value)
  let b = Number(document.getElementById("b-1g").value)
  let raiz1g = document.getElementById("raiz-1g")
  let cres1g = document.getElementById("crescimento-1g")
  let raiz
  let x0
  let y0
  let fsX, fsY //fator de escala para o gráfico

  if(a != 0){
    raiz = - b/a

    raiz1g.innerText += raiz

    if(a < 0){
      cres1g.innerText += 'decrescente'
    }else{
      cres1g.innerText += 'crecente'
    }
  }else{
    raiz1g.innerText += '-'
    cres1g.innerText += 'constante'
  }

  //calculando a origen do gráfico
  if (raiz > 0) {
    x0 = wScreen/6
  }else if (raiz < 0) {
    x0 = wScreen * 5/6
  } else {
    x0 = wScreen/2
  }

  if (b > 0) {
    y0 = hScreen * 5/6
  }else if (b < 0) {
    y0 = hScreen /6
  } else {
    y0 = hScreen/2
  }

  //calculando os fatores de escala
  fsX = (wScreen*2/3) / Math.abs(raiz)
  fsY = (hScreen*2/3) / Math.abs(b)
  
  drawAxis(x0,y0, wScreen, hScreen, fsX, fsY, 0.1 , 100)
  
  //desenhando a reta
  let xg, yg, xsI, xsF, ysI, ysF //xg e yg -> coodenadas do gráfico; ys -> coordenada do canvas

  //regra de translação de gráfico: xg = xs - xo; yg = -(ys - yo)

  xg = (0 - x0)/fsX
  xsI = xg*fsX + x0
  yg = a*xg + b
  ysI = y0 - yg*fsY
  
  xg = (wScreen - x0)/fsX
  xsF = xg*fsX + x0
  yg = a*xg + b
  console.log(xg)
  console.log(yg)
  ysF = y0 - yg*fsY
  
  console.log('fsx:' + fsX)
  console.log('xi:' + xsI)
  console.log('xf:' + xsF)
  console.log('fsy:' + fsY)
  console.log('yi:' + ysI)
  console.log('yf:' + ysF)

  ctx.strokeStyle = "blue"
  ctx.beginPath()
  ctx.moveTo(xsI, ysI)
  ctx.lineTo(xsF, ysF)
  ctx.stroke()
}

result1g(WIDTH, HEIGHT)















