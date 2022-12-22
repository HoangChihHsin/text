// 监控浏览器缩放是否100%显示，否则alert提醒
let rate = ChangeRatio();
console.log("sr" + rate);
if(rate != 100){
   alert('当前页面显示不是100%。为防显示错乱，请调整系统缩放或浏览器恢复100%标准');
}
function ChangeRatio() {
    let ratio = 0;
    let screen = window.screen;
    let ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    return ratio;
}


// 引入实时时间
let time = document.getElementById('time'); /* 获取ID */
let dates = document.getElementById('dates');
dates.innerHTML = getDate();
// 时间 
function getTime(){
    let date = new Date();
    let hour = date.getHours();
    hour = hour < 10 ?  '0' + hour : hour;
    let minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second = date.getSeconds();
    second = second < 10 ? '0' + second : second;
    time.innerHTML =  hour + ':' + minute + ':' + second;
}
setInterval(getTime,1000);
// 日期
function getDate(){
    let date = new Date();
    let month = date.getMonth();
    let dater = date.getDate();
    let day = date.getDay();
    let arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    return(month + 1) + '月' + dater + '日' + ' ' + arr[day];
}

// 滚动到首页诗句动效
// 1.获取所有的box
 let poem = document.querySelectorAll('.poem');
 // 2.监听滚动
 window.addEventListener('scroll',scrollLoad);
 // 3.滚动加载函数
 function scrollLoad(){
     // 1.定义一个目标值。innerHeight:内高度
     let poemHeight = window.innerHeight * 0.6;
     // 2.获取每个box距离浏览器顶部的值
     poem.forEach(poem =>{
         let poemTop = window.scrollY;
         console.log(poemTop);
         console.log("file:index method:line:20 -----",);
         if(poemTop <= poemHeight){
             poem.classList.add('poem-animation');
         }else{
             poem.classList.remove('poem-animation');
         }
     })
 }

// 滚动到section1诗句1动效
const poemOne = document.querySelector(".poemOne");
window.addEventListener("scroll",function(){
    //滚动条高度+视窗高度 = 可见区域底部高度
    const poemOneOffsetTop = poemOne.offsetTop;
    const poemOneClientHeight  = poemOne.clientHeight;
    const visibleBottom = poemOneOffsetTop + document.documentElement.clientHeight + poemOneClientHeight;
    // 可见区域顶部高度
    const visibleTop = window.scrollY;
    // 判断是否在可视区
    if(poemOneOffsetTop < visibleTop && visibleTop < visibleBottom){
      poemOne.classList.add('poemOne-animation')
    }else{
      poemOne.classList.remove('poemOne-animation')
    }
})

// 第五页卡片组点击展开动效
// 获取所有.item元素
let items=document.querySelectorAll('.item');

// 设置选中态样式
function setActive(){
    // 遍历所有.item元素，移出active样式
    items.forEach((item)=>{
        item.classList.remove('active');
    })
    // 为当前选中项添加active样式
    this.classList.add('active');
}
// 遍历所有.item元素，分别为其设置点击事件
items.forEach((item)=>{
    item.addEventListener('click',setActive);
})

// 第六页游戏
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 480
var blocks = [] //砖块数组
var board = { //反弹板
    x: 350,
    y: 460,
    long: 100
}
var cRect = canvas.getBoundingClientRect() //画布位置
var ball = { //定义弹球对象
    color: "white"
}
var score = 0 //分数
var rungame = false //默认运行状态
var colors = [ //颜色数组
    "#eccc68",
    "#ff7f50",
    "#ff6b81",
    "#7bed9f",
    "#5352ed",
    "#70a1ff"
]
var speed = 0.5 //弹球移动速度
var run = document.getElementById("start")
var fires = [] //烟火数组
function start() {
    newgame()
    rungame = true
    run.style.display = "none"
    canvas.style.cursor = "none"
}
window.addEventListener("mousemove", function(evt) { //移动鼠标变更反弹板位置
    var x = evt.clientX - cRect.left
    if (x < 50) {
        board.x = 0
    } else if (x > 750) {
        board.x = 700
    } else {
        board.x = x - 50
    }
    console.log(x)
})

function newgame() { //初始化游戏
    ball = { //默认的弹球位置，随机方向
        sx: 400,
        sy: 300,
    }
    ball.vx = (0.5 - Math.random()) * speed
    ball.vy = Math.sqrt(speed * speed - ball.vx * ball.vx)
    score = 0
    blocks = []
    for (var i = 0; i < 10; i++) { //生成砖块
        for (var j = 0; j < 6; j++) {
            blocks.push({
                x: i,
                y: j,
                color: colors[parseInt(Math.random() * colors.length)]
            })
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, 800, 600)


    for (var i = 0; i < blocks.length; i++) { //绘制砖块
        block = blocks[i]
        ctx.fillStyle = block.color
        ctx.fillRect(block.x * 80 + 1, block.y * 30 + 1, 79, 29)
        if (ball.sx + 10 > block.x * 80 + 1 && ball.sx - 10 < block.x * 80 + 80 && ball.sy + 10 > block.y * 30 + 1 && ball.sy - 10 < block.y * 30 + 30) { //砖块碰撞判断

            if (ball.sx > block.x * 80 + 80 || ball.sx < block.x * 80) { //左右方向碰撞则改变x轴运行方向
                ball.vx = -ball.vx
            } else if (ball.sy > block.y * 30 + 30 || ball.sy < block.y * 30) { //垂直方向碰撞则改变Y轴运行方向
                ball.vy = -ball.vy
            }
            if (ball.color == block.color) { //同色碰撞则加10分
                score += 10
            } else { //非同色碰撞加1分
                score++
            }
            ball.color = block.color //撞击后球的颜色变成砖块颜色
            blocks.splice(i, 1) //碰撞后砖块消失
            for (var f = 0; f < 50; f++) { //生成火花
                fires.push({
                    sx: block.x * 80 + 40,
                    sy: block.y * 30 + 15,
                    color: block.color,
                    vx: 0.5 - Math.random(),
                    vy: 0.5 - Math.random(),
                    age: 100
                })
            }
        }
    }
    ctx.fillStyle = "white" //绘制分数
    ctx.font = "20px sans-serif"
    ctx.fillText(score, 5, 25)
    ctx.fillRect(board.x, board.y, board.long, 20) //绘制反弹板
    ctx.beginPath() //绘制小球
    ctx.fillStyle = ball.color
    ctx.arc(ball.sx, ball.sy, 10, 0, 2 * Math.PI)
    ctx.fill()

    if (rungame) { //判断游戏运行状态，并刷新球的位置
        ball.sx += ball.vx * 5
        ball.sy += ball.vy * 5
        if (ball.sy < 10) { //上边缘碰撞判断
            ball.vy = -ball.vy
        }
        if (ball.sx < 10 || ball.sx > 797) { //左右碰撞判断
            ball.vx = -ball.vx
        }
        if (ball.sy > 448 && ball.sx > board.x && ball.sx < board.x + board.long) { //反弹板碰撞判断
            ball.vx = (ball.sx - (board.x + board.long / 2)) / board.long / 2 * speed * 3
            ball.vy = -Math.sqrt(speed * speed - ball.vx * ball.vx)
            speed = speed * 1.001
            for (var f = 0; f < 20; f++) {
                fires.push({
                    sx: ball.sx,
                    sy: ball.sy + 10,
                    color: colors[parseInt(Math.random() * colors.length)],
                    vx: 0.5 - Math.random(),
                    vy: Math.random() - 1,
                    age: 60
                })
            }

        }
        if (ball.sy > 468 || blocks.length <= 0) { //碰撞到底部或所有砖块都消失则游戏停止运行
            rungame = false
            run.style.display = "flex"
            canvas.style.cursor = "default"
            for (var f = 0; f < 150; f++) {
                fires.push({
                    sx: 400,
                    sy: 300,
                    color: colors[parseInt(Math.random() * colors.length)],
                    vx: 0.5 - Math.random(),
                    vy: 0.5 - Math.random(),
                    age: 560
                })
            }
        }
    }
    for (var i = 0; i < fires.length; i++) {
        fire = fires[i]
        ctx.fillStyle = fire.color
        ctx.fillRect(fire.sx, fire.sy, 2, 2)
        fire.age--
            if (fire.age < 0) {
                fires.splice(i, 1)
            }
        fire.sx += fire.vx * 2
        fire.sy += fire.vy * 2

    }
}
newgame()
setInterval(draw, 1);