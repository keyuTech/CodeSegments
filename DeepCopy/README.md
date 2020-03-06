## 深拷贝

### JSON序列化与反序列化
```
JSON.parse(JSON.stringify(obj))
```

- 不支持函数
- 不支持JSON不支持的所有类型，如 `undefined`
- 不支持引用，JSON只支持树状结构，不支持环状结构

### 递归深拷贝

#### 功能
1. 拷贝基本类型 `number string boolean undefined null Symbol`
2. 拷贝对象 `object`，包括 `Array Function RegExp`等特殊的对象

#### 实现
1. 实现基本类型的拷贝 `return source`
2. 引用类型拷贝
    - Object - 使用 `new Object` 创建新的空对象，使用  `for 
    in`遍历源对象并对相应的空对象属性赋值，如果源对象属性为基本类型，可直接赋值；如果属性也为引用类型，则再次调用深拷贝，实现递归拷贝
    - Array - 首先使用 `instanceof` 判断源对象是否为数组，是则使用 `new Array` 初始化
    - Function - 同 `Array` 类型，先判断是否为 `Function`，如是，则初始化为函数，并在函数中使用 `apply
    (this, arguments)` 
    调用原函数，保证函数的作用域及参数都相同，并且执行结果也相同
    - RegExp - 首先使用 `instanceof` 判断源对象是否为正则表达式，如是，则使用 `new RegExp()` 初始化，并传入 
    `source.source` 及 `source.flags` 作为参数
    - Date - 首先使用 `instanceof` 判断源对象是否为日期，是则使用 `new Date` 初始化，并传入源数据 `source` 
    作为参数
3. 拷贝环
    - 新建数组cache用于保存已拷贝过的属性 `let cache = []`
    - 在判断源数据为object之后，新建 `cachedResult` 
    作为检测属性是否已拷贝的依据，并在每次遍历赋值之前将源数据的对应属性和已拷贝的对应属性存入cache `cache.push([source, result])`
    - 新建 `findCache` 帮助函数，用于查找属性是否拷贝，使用源数据的属性作为判断，并返回已拷贝的属性
    - 在检测object特殊类型之前，首先判断是否已拷贝，如已拷贝，则返回已拷贝的属性
