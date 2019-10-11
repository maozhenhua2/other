/*
 面向对象
 */
// 判断要检查的对象是否存在于原型对象的原型链
function inPrototype(objPrototype, objExample) {
	return objPrototype.prototype.isPrototypeOf(objExample);
}

// 判断一个对象是否是另一个对象的实例则
function isObjectProptotype(objPrototype, objExample) {
	return objExample instanceof objPrototype;
}

// 判断实例中是否存在指定属性
function propertyFromPrototype(obj, propterty) {
	return obj.hasOwnProperty(propterty);
}

// 判断原型或实例中是否存在指定属性
function hasPproperty(obj, propterty) {
	return propterty in obj;
}

// 判断只有原型中有指定属性
function isInPrototype() {
	return propterty in obj && !obj.hasOwnProperty(propterty);
}

// 深拷贝
function deepCopy(p, c) {
	var c = c || {};
	for (var i in p) {
		if (typeof p[i] === "object") {
			c[i] = p[i].constructor === Array ? [] : {};
			deepCopy(p[i], c[i]);
		} else {
			c[i] = p[i];
		}
	}
	return c;
}

function deepCopy(source) {
	var result = {};
	for (var key in source) {
		result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
	}
	return result;
}

// 判断值的类型
function type(o) {
	var t, c, n;
	if (o === null) {
		return 'null';
	}

	if (o !== o) {
		return 'nan';
	}

	if ((t = typeof o) !== 'object') {
		return t;
	}

	if ((c = classof(o)) !== 'Object') {
		return c;
	}

	if (o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) {
		return n;
	}

	return 'Object';
}

/*
 类属性
 */
function classof(o) {
	if (o === null) {
		return 'Null';
	}
	if (o === undefined) {
		return 'Undefined';
	}
	return Object.prototype.toString.call(o).slice(8, -1);
}


function extend(Child, Parent) {
	var F = function() {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
}

function extend(subClass, superClass) {
	// 利用空对象作为中介来继承
	var F = function() {};
	F.prototype = superClass.prototype;
	// 寄生组合式继承
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;

	subClass.superClass = superClass.prototype;
	if (superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
}

/*
// 使用例子

var Child = function () {
  Parent.call(this);
  this.toString2 = toString2;
}
extend(Child, Parent);
var child1 = new Child();
*/

// 拷贝继承
function extend2(Child, Parent) {
	var p = Parent.prototype;
	var c = Child.prototype;
	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
}

/*
 给Object.prototype添加一个不可枚举的extend()方法
 这个方法继承自调用它的对象，将作为参数传入的对象的属性一一复制
 除了值之外，也复制属性的所有特性，除非在目标对象中存在同名的属性
 参数对象的所有自有对象（包括不可枚举的属性）也会一一复制
 */
Object.defineProperty(Object.prototype, 'extend', {
	writable: true,
	enumerable: false,
	configurable: true,
	value: function(o) {
		var names = Object.getOwnPropertyNames(o);
		for (var i = 0; i < names.length; i++) {
			if (names[i] in this) {
				continue;
			}
			var desc = Object.getOwnPropertyDescriptor(o, names[i]);
			Object.defineProperty(this, names[i], desc);
		}
	}
});

// 通过原型继承创建一个新对象
function inherit(p) {
	if (p == null) {
		throw TypeError();
	}
	if (Object.create) {
		return Object.create(p);
	}
	var t = typeof p;
	if (t !== 'object' && t !== 'function') {
		throw TypeError();
	}

	function f() {};
	f.prototype = p;
	return new f();
}

/*
 将p中的可枚举属性复制到o中， 并返回o
 */
function merge(o, p) {
	for (prop in p) {
		if (o.hasOwnProperty[prop]) continue;
		o[prop] = p[prop];
	}
	return o;
}

/*
 如果o中的属性在p中没有同名属性，则从o中删除这个属性
 */
function restrict(o, p) {
	for (prop in o) {
		if (!(prop in p)) {
			delete o[prop];
		}
	}
	return o;
}

/*
 如果o中的属性在p中有同名属性，则从o中删除这个属性
 */
function substr(o, p) {
	for (prop in o) {
		delete o[prop];
	}
	return o;
}

/*
 返回一个新对象，这个对象同时拥有o的属性和p的属性，如果o和p中有重名属性，使用p中的属性
 */
function union(o, p) {
	function extend(o, p) {
		for (prop in p) {
			o[prop] = p[prop];
		}
		return o;
	}

	return extend(extend({}, o), p);
}

/*
 返回一个新对象，这个对象拥有同时在o和p中出现的属性，
 很像求o和p的交集，但p中属性的值被忽略
 */
function instersection(o, p) {
	return restrict(extend({}, o), p);
}

/*
 判断是否是空对象
 */
function isEmptyObject(o) {
	var hasProp = false;
	for (var key in o) {
		hasProp = true;
		break;
	}
	return hasProp;
}

// 组合继承优化2
function Person(name, age) {
	this.name = name,
		this.age = age
}
Person.prototype.setAge = function() {
	console.log("111")
}

function Student(name, age, price) {
	Person.call(this, name, age)
	this.price = price
	this.setScore = function() {}
}
Student.prototype = Object.create(Person.prototype) //核心代码
Student.prototype.constructor = Student //核心代码
var s1 = new Student('Tom', 20, 15000)
console.log(s1 instanceof Student, s1 instanceof Person) // true true
console.log(s1.constructor) //Student
console.log(s1)

// ES6中class 的继承
class Person {
	//调用类的构造方法
	constructor(name, age) {
		this.name = name
		this.age = age
	}
	//定义一般的方法
	showName() {
		console.log("调用父类的方法")
		console.log(this.name, this.age);
	}
}
let p1 = new Person('kobe', 39)
console.log(p1)
//定义一个子类
class Student extends Person {
	constructor(name, age, salary) {
		super(name, age) //通过super调用父类的构造方法
		this.salary = salary
	}
	showName() { //在子类自身定义方法
		console.log("调用子类的方法")
		console.log(this.name, this.age, this.salary);
	}
}
let s1 = new Student('wade', 38, 1000000000)
console.log(s1)
s1.showName()


// 合并类
function mix(...mixins) {
	class Mix {}
	for (let mixin of mixins) {
		copyProperties(Mix, mixin);
		copyProperties(Mix.prototype, mixin.prototype);
	}
	return Mix;
}

function copyProperties(target, source) {
	for (let key of Reflect.ownKeys(source)) {
		if (key !== "constructor" && key !== "prototype" && key !== "name") {
			let desc = Object.getOwnPropertyDescriptor(source, key);
			Object.defineProperty(target, key, desc);
		}
	}
}

// 使用例子
class Savings {
	saveMoney() {
		console.log("存钱");
	}
	withdrawMoney() {
		console.log("取钱");
	}
}
class Credit {
	overdraft() {
		console.log("透支")
	}
}
const CarMin = mix(Savings, Credit);
class UserCar extends CarMin {
	constructor(num, carUserName) {
		super();
		console.log()
		this.carNum = num;
		this.carUserName = carUserName;
	}
	getCarNum() {
		return this.carNum;
	}
	getCarUserName() {
		return this.carUserName;
	}
}
let myCar = new UserCar(123456798, "Aaron");
console.log(myCar.getCarNum());
console.log(myCar.getCarUserName());
myCar.saveMoney();
myCar.withdrawMoney();
myCar.overdraft();