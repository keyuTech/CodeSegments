## 深拷贝

#### JSON序列化与反序列化
```
JSON.parse(JSON.stringify(obj))
```

- 不支持函数
- 不支持JSON不支持的所有类型，如 `undefined`
- 不支持引用，JSON只支持树状结构，不支持环状结构
