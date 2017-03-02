# 容器的属性
## 以下6个属性设置在容器上。

1. flex-direction
2. flex-wrap
3. flex-flow
4. justify-content
5. align-items
6. align-content


### flex
显示方式

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

#### display: flex | inline-flex;

#### 1. flex-direction: row | row-reverse | column | column-reverse;
1. row（默认值）：主轴为水平方向，起点在左端。
2. row-reverse：主轴为水平方向，起点在右端。
3. column：主轴为垂直方向，起点在上沿。
4. column-reverse：主轴为垂直方向，起点在下沿。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)

#### 2. flex-wrap: nowrap | wrap | wrap-reverse;
1. nowrap（默认）：不换行。
2. wrap：换行，第一行在上方。
3. wrap-reverse：换行，第一行在下方。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071006.png)

nowrap

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png)

wrap

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg)

wrap-reverse

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg)

#### 3. flex-flow: \<flex-direction> || \<flex-wrap>;
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

#### 4. justify-content: flex-start | flex-end | center | space-between | space-around;
1. flex-start（默认值）：左对齐
2. flex-end：右对齐
3. center： 居中
4. space-between：两端对齐，项目之间的间隔都相等。
5. space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

#### 5. align-items: flex-start | flex-end | center | baseline | stretch;
1. flex-start：交叉轴的起点对齐。
2. flex-end：交叉轴的终点对齐。
3. center：交叉轴的中点对齐。
4. baseline: 项目的第一行文字的基线对齐。
5. stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png)

#### 6. align-content: flex-start | flex-end | center | space-between | space-around | stretch;
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

1. flex-start：与交叉轴的起点对齐。
2. flex-end：与交叉轴的终点对齐。
3. center：与交叉轴的中点对齐。
4. space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
5. space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
6. stretch（默认值）：轴线占满整个交叉轴。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)

# 项目的属性
## 以下6个属性设置在项目上。

1. order
2. flex-grow
3. flex-shrink
4. flex-basis
5. flex
6. align-self


#### 1. order: \<integer>;
order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071013.png)

#### 2. flex-grow: \<number>; /* default 0 */
flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

#### 3. flex-shrink: \<number>; /* default 1 */
flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

#### 4. flex-basis: \<length> | auto; /* default auto */
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

#### 5. flex: none | \[ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

#### 6. align-self: auto | flex-start | flex-end | center | baseline | stretch;
align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071016.png)