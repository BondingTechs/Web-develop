class chan {
  buf
  getWaiter
  putWaiter: any[]
  size

  constructor(size: any) {
    this.buf = new Map();
    this.getWaiter = new Map();
    this.putWaiter = [];
    this.size = size || 0;
  }

  put(data: any, key = null) {
    var that = this;
    return new Promise(function (resolve, reject) {
      // 如果緩衝區為空，且有通道正在等待get返回
      if (that.buf.size == 0 && that.getWaiter.has(key)) {
        var watch = that.getWaiter.get(key);
        that.getWaiter.delete(key);
        watch(data);
        resolve('');
        return;
      }
      // 如果緩衝區超過設定的大小
      if (that.buf.size >= that.size) {
        that.putWaiter.push({
          resolve: resolve,
          reject: reject,
          data: data,
          key: key
        })
        return;
      } else {
        // 加入函式到緩衝區
        that.buf.set(key, data);
        resolve(data);
        return;
      }
    })
  }

  async get(key = null) {
    var that = this;
    return new Promise(function (resolve, reject) {
      // 如果緩衝區有物件
      if (that.buf.has(key)) {
        var data = that.buf.get(key);
        that.buf.delete(key);
        resolve(data);
        if (that.putWaiter.length > 0) {
          var puter = that.putWaiter.shift();
          that.buf.set(puter.key, puter.data);
          puter.resolve(puter.data);
        }
      } else {
        if (that.putWaiter.length > 0) {
          var puter = that.putWaiter.shift();
          resolve(puter.data);
          that.buf.set(puter.key, puter.data);
          puter.resolve(puter.data);
        } else {
          that.getWaiter.set(key, resolve);
        }
      }
    })
  }
}