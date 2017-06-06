// 判断图片加载完成
let mulitImg = [
  'http://www.daqianduan.com/wp-content/uploads/2017/03/IMG_0119.jpg',
  'http://www.daqianduan.com/wp-content/uploads/2017/01/1.jpg',
  'http://www.daqianduan.com/wp-content/uploads/2015/11/jquery.jpg',
  'http://www.daqianduan.com/wp-content/uploads/2015/10/maid.jpg'
];
let promiseAll = [],
  img = [],
  imgTotal = mulitImg.length;
for (let i = 0; i < imgTotal; i++) {
  promiseAll[i] = new Promise((resolve, reject) => {
    img[i] = new Image()
    img[i].src = mulitImg[i]
    img[i].onload = function() {
      //第i张加载完成
      resolve(img[i])
    }
  })
}
Promise.all(promiseAll).then((img) => {
  //全部加载完成
})
