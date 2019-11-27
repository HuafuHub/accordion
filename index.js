
//配置
var config = {
  menu1: {
    name: "服装",
    lists: ["男装", "女装", "童装", "孕妇", "睡衣"]
  },
  menu2: {
    name: "家居",
    lists: ["家电", "家具", "厨房", "卫生间"]
  },
  menu3: {
    name: "药品",
    lists: ["处方", "非处方", "兽用"]
  },
  menu4: {
    name: "零食",
    lists: ["大陆食品", "澳洲进口", "美洲进口", "欧洲进口", "东南亚风味"]
  }
}
//容器
var box = document.querySelector('.container');

//生成列表
function createMenus(){
  var frag = document.createDocumentFragment();
  for(var prop in config){//生成标题
    var title = document.createElement("h3");
    title.className = "title";
    title.innerHTML = config[prop].name;
    frag.appendChild(title);
    if(config[prop].lists.length){//生成菜单
      var ul = document.createElement("ul");
      ul.className = "list";
      config[prop].lists.forEach(item=>{
        var li = document.createElement("li");
        li.className = "option";
        li.innerHTML = item;
        animateForOption(li)//给菜单绑定动画事件
        ul.appendChild(li);
      })
      frag.appendChild(ul);
    }
  }
  box.appendChild(frag);//添加至页面
}

//菜单动画
function animateForOption(ele){
  ele.onmouseenter = function(){
      var animate = new Animate({
        totalTime: 100,
        origin: {
          marginLeft:30,
          rgbR:255,
          rgbG:255,
          rgbB:255,
        },
        target: {
          marginLeft:10,
          rgbR:150,
          rgbG:200,
          rgbB:250,
        },
        onchange(){
          ele.style.marginLeft = this.current.marginLeft + "px";
          ele.style.backgroundColor = `rgb(${this.current.rgbR},${this.current.rgbG},${this.current.rgbB})`;
        }
      })
      animate.start();
    }
  ele.onmouseleave = function(){
      var animate = new Animate({
        totalTime: 500,
        target: {
          marginLeft:30,
          rgbR:255,
          rgbG:255,
          rgbB:255,
        },
        origin: {
          marginLeft:10,
          rgbR:150,
          rgbG:200,
          rgbB:250,
        },
        onchange(){
          ele.style.marginLeft = this.current.marginLeft + "px";
          ele.style.backgroundColor = `rgb(${this.current.rgbR},${this.current.rgbG},${this.current.rgbB})`;
        }
      })
      animate.start();
    }
}

//标题动画
function animateForTitle(ele){
  var dom = ele.nextElementSibling;//记录该标题的菜单列表
  var height = dom.clientHeight;//记录菜单列表的高度
  dom.style.height = 0;//菜单列表默认隐藏
  ele.hide = function () {//隐藏动画
    if(ele.className.includes("active")){
      var animate = new Animate({
        totalTime: 100,
        origin: {
          height: height
        },
        target: {
          height: 0
        },
        onchange(){
          dom.style.height = this.current.height + "px";
        },
        onstop(){
          ele.classList.remove("active");//切换状态为隐藏
        }
      })
      animate.start();
    }
  }
  ele.show = function(){//显示动画
    var animate = new Animate({
      totalTime: 100,
      origin: {
        height: 0
      },
      target: {
        height: height
      },
      onchange(){
        dom.style.height = this.current.height + "px";
      },
      onstop(){
        ele.classList.add("active");//切换状态为显示
      }
    })
    animate.start();
  }
  ele.onclick = function (){//标题点击事件
    if(ele.className.includes("active")){
      //若当前标题的菜单列表为显示状态，则隐藏它
      ele.hide();
    }else{
      //若当前标题的菜单列表为隐藏状态，则显示它
      ele.show();
      //当前标题的菜单列表显示的同时，若存在其他标题的菜单列表显示，则隐藏他
      var active = document.querySelector(".active");
      if(active){
        active.hide();
      }
    }

    
  }
}

//给标题绑定动画
function bindTitleAnimate(){
  var titles = document.getElementsByClassName("title");
  titles = Array.from(titles);
  titles.forEach(item=>{
    animateForTitle(item);
  })
}

createMenus();
bindTitleAnimate();