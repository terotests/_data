var testDataObjects_prototype = function() {
  'use strict';
  var _promise_prototype = function() {
    'use strict';
    var later_prototype = function() {;
      (function(_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;
        _myTrait_.add = function(fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === '[object Array]') {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        }
        _myTrait_.after = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0,
            remove: true
          };
        }
        _myTrait_.asap = function(fn) {
          this.add(fn);

        }
        _myTrait_.every = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(interval, fn) {
          if (!_initDone) {

            this.polyfill();

            var frame, cancelFrame;
            if (typeof(window) != "undefined") {
              var frame = window['requestAnimationFrame'],
                cancelFrame = window['cancelRequestAnimationFrame'];
              ['', 'ms', 'moz', 'webkit', 'o'].forEach(function(x) {
                if (!frame) {
                  frame = window[x + 'RequestAnimationFrame'];
                  cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                }
              });
            }

            if (!frame)
              frame = function(cb) {
                return setTimeout(cb, 16);
              };

            if (!cancelFrame)
              cancelFrame = function(id) {
                clearTimeout(id);
              };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function() {
              var ms = (new Date()).getTime();
              var fn;
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === '[object Array]') {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }

              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    if (v.remove) {
                      if (v.nextTime > 0) {
                        v.fn();
                        delete _everies[n];
                      } else {
                        v.nextTime = ms + v.step;
                      }
                    } else {
                      v.fn();
                      v.nextTime = ms + v.step;
                    }
                  }
                  if (v.until) {
                    if (v.until < ms) {
                      delete _everies[n];
                    }
                  }
                }
              }

              frame(_callQueQue);
              lastMs = ms;
            };
            _callQueQue();
            _initDone = true;
          }
        });
        _myTrait_.once = function(key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        }
        _myTrait_.onFrame = function(fn) {

          _framers.push(fn);
        }
        _myTrait_.polyfill = function(t) {
          // --- let's not ---
        }
        _myTrait_.removeFrameFn = function(fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        }
      }(this));
    }
    var later = function(a, b, c, d, e, f, g, h) {
      if (this instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    later._classInfo = {
      name: 'later'
    };
    later.prototype = new later_prototype();
    if (typeof(window) != 'undefined') window['later'] = later;
    if (typeof(window) != 'undefined') window['later_prototype'] = later_prototype;;
    (function(_myTrait_) {
      _myTrait_.isArray = function(someVar) {
        return Object.prototype.toString.call(someVar) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(obj) {
        return obj === Object(obj);
      }
    }(this));;
    (function(_myTrait_) {
      _myTrait_.all = function(firstArg) {

        var args;
        if (this.isArray(firstArg)) {
          args = firstArg;
        } else {
          args = Array.prototype.slice.call(arguments, 0);
        }
        // console.log(args);
        var targetLen = args.length,
          rCnt = 0,
          myPromises = [],
          myResults = new Array(targetLen);

        return this.then(
          function() {

            var allPromise = _promise();
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function(b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  myResults[index] = v;
                  // console.log("Got a promise...",b, " cnt = ", rCnt);
                  rCnt++;
                  if (rCnt == targetLen) {
                    allPromise.resolve(myResults);
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });





      }
      _myTrait_.collect = function(collectFn, promiseList, results) {

        var args;
        if (this.isArray(promiseList)) {
          args = promiseList;
        } else {
          args = [promiseList];
        }

        // console.log(args);
        var targetLen = args.length,
          isReady = false,
          noMore = false,
          rCnt = 0,
          myPromises = [],
          myResults = results || {};

        return this.then(
          function() {

            var allPromise = _promise();
            args.forEach(function(b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if ((isReady && !noMore) || (noMore == false && targetLen == rCnt)) {
                    allPromise.resolve(myResults);
                    noMore = true;
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });

      }
      _myTrait_.fail = function(fn) {
        return this.then(null, fn);
      }
      _myTrait_.fulfill = function(withValue) {
        // if(this._fulfilled || this._rejected) return;

        if (this._rejected) return;
        if (this._fulfilled && withValue != this._stateValue) {
          return;
        }

        var me = this;
        this._fulfilled = true;
        this._stateValue = withValue;

        var chCnt = this._childPromises.length;

        while (chCnt--) {
          var p = this._childPromises.shift();
          if (p._onFulfill) {
            try {
              var x = p._onFulfill(withValue);
              // console.log("Returned ",x);
              if (typeof(x) != "undefined") {
                p.resolve(x);
              } else {
                p.fulfill(withValue);
              }
            } catch (e) {
              // console.error(e);
              /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
              p.reject(e);
            }
          } else {
            /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
            p.fulfill(withValue);
          }
        };
        // this._childPromises.length = 0;
        this._state = 1;
        this.triggerStateChange();

      }
      _myTrait_.genPlugin = function(fname, fn) {
        var me = this;
        this.plugin(fname,
          function() {
            var args = Array.prototype.slice.call(arguments, 0);
            console.log("Plugin args", args);
            var myPromise = _promise();
            this.then(function(v) {
              var args2 = Array.prototype.slice.call(arguments, 0);
              var z = args.concat(args2);
              var res = fn.apply(this, z);
              myPromise.resolve(res);
            }, function(r) {
              myPromise.reject(r);
            });
            return myPromise;

          }
        );
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(onFulfilled, onRejected) {
        // 0 = pending
        // 1 = fullfilled
        // 2 = error

        this._state = 0;
        this._stateValue = null;
        this._isAPromise = true;
        this._childPromises = [];

        if (this.isFunction(onFulfilled))
          this._onFulfill = onFulfilled;
        if (this.isFunction(onRejected))
          this._onReject = onRejected;

        if (!onRejected && this.isFunction(onFulfilled)) {



          var me = this;
          later().asap(
            function() {
              console.log("--- calling the onFulfilled ");
              onFulfilled(function(v) {
                me.resolve(v)
              }, function(v) {
                me.resolve(v);
              });
            });

        }
      });
      _myTrait_.isFulfilled = function(t) {
        return this._state == 1;
      }
      _myTrait_.isPending = function(t) {
        return this._state == 0;
      }
      _myTrait_.isRejected = function(v) {
        return this._state == 2;
      }
      _myTrait_.nodeStyle = function(fname, fn) {
        var me = this;
        this.plugin(fname,
          function() {
            var args = Array.prototype.slice.call(arguments, 0);
            var last, userCb, cbIndex = 0;
            if (args.length >= 0) {
              last = args[args.length - 1];
              if (Object.prototype.toString.call(last) == '[object Function]') {
                userCb = last;
                cbIndex = args.length - 1;
              }
            }

            var mainPromise = wishes().pending();
            this.then(function() {
              var nodePromise = wishes().pending();
              var args2 = Array.prototype.slice.call(arguments, 0);
              console.log("Orig args", args);
              console.log("Then args", args2);
              var z;
              if (args.length == 0)
                z = args2;
              if (args2.length == 0)
                z = args;
              if (!z) z = args2.concat(args);
              cbIndex = z.length; // 0,fn... 2
              if (userCb) cbIndex--;
              z[cbIndex] = function(err) {
                if (err) {
                  console.log("Got error ", err);
                  nodePromise.reject(err);
                  mainPromise.reject(err);
                  return;
                }
                if (userCb) {
                  var args = Array.prototype.slice.call(arguments);
                  var res = userCb.apply(this, args);
                  mainPromise.resolve(res);
                } else {
                  var args = Array.prototype.slice.call(arguments, 1);
                  mainPromise.resolve.apply(mainPromise, args);
                }
              }
              nodePromise.then(function(v) {
                mainPromise.resolve(v);
              });

              console.log("nodeStyle after concat", z);
              var res = fn.apply(this, z);
              // myPromise.resolve(res);
              // return nodePromise;
              return nodePromise;
            }, function(v) {
              mainPromise.reject(v);
            });
            return mainPromise;
            /*
                      log("..... now waiting "+ms);
                      var p = waitFor(ms);
                      p.then( function(v) {
                          myPromise.resolve(v);
                      });
                  */
          }
        );
      }
      _myTrait_.onStateChange = function(fn) {

        if (!this._listeners)
          this._listeners = [];

        this._listeners.push(fn);
      }
      _myTrait_.plugin = function(n, fn) {

        _myTrait_[n] = fn;

        return this;
      }
      _myTrait_.props = function(obj) {
        var args = [];

        for (var n in obj) {
          if (obj.hasOwnProperty(n)) {
            args.push({
              name: n,
              promise: obj[n]
            });
          }
        }


        // console.log(args);
        var targetLen = args.length,
          rCnt = 0,
          myPromises = [],
          myResults = {};

        return this.then(
          function() {

            var allPromise = wishes().pending();
            args.forEach(function(def) {
              var b = def.promise,
                name = def.name;
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  myResults[name] = v;
                  rCnt++;
                  if (rCnt == targetLen) {
                    allPromise.resolve(myResults);
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });

      }
      _myTrait_.reject = function(withReason) {

        // if(this._rejected || this._fulfilled) return;

        // conso

        if (this._fulfilled) return;
        if (this._rejected && withReason != this._rejectReason) return;


        this._state = 2;
        this._rejected = true;
        this._rejectReason = withReason;
        var me = this;

        var chCnt = this._childPromises.length;
        while (chCnt--) {
          var p = this._childPromises.shift();

          if (p._onReject) {
            try {
              p._onReject(withReason);
              p.reject(withReason);
            } catch (e) {
              /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
              p.reject(e);
            }
          } else {
            /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
            p.reject(withReason);
          }
        };

        // this._childPromises.length = 0;
        this.triggerStateChange();

      }
      _myTrait_.rejectReason = function(reason) {
        if (reason) {
          this._rejectReason = reason;
          return;
        }
        return this._rejectReason;
      }
      _myTrait_.resolve = function(x) {

        // console.log("Resolving ", x);

        // can not do this many times...
        if (this._state > 0) return;

        if (x == this) {
          // error
          this._rejectReason = "TypeError";
          this.reject(this._rejectReason);
          return;
        }

        if (this.isObject(x) && x._isAPromise) {

          // 
          this._state = x._state;
          this._stateValue = x._stateValue;
          this._rejectReason = x._rejectReason;
          // ... 
          if (this._state === 0) {
            var me = this;
            x.onStateChange(function() {
              if (x._state == 1) {
                // console.log("State change");
                me.resolve(x.value());
              }
              if (x._state == 2) {
                me.reject(x.rejectReason());
              }
            });
          }
          if (this._state == 1) {
            // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
            this.fulfill(this._stateValue);
          }
          if (this._state == 2) {
            // console.log("Relved to be Promise was rejected ", x._rejectReason);
            this.reject(this._rejectReason);
          }
          return;
        }
        if (this.isObject(x) && x.then && this.isFunction(x.then)) {
          // console.log("Thenable ", x);
          var didCall = false;
          try {
            // Call the x.then
            var me = this;
            x.then.call(x,
              function(y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              },
              function(r) {
                if (didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
              });
          } catch (e) {
            if (!didCall) this.reject(e);
          }
          return;
        }
        this._state = 1;
        this._stateValue = x;

        // fulfill the promise...
        this.fulfill(x);

      }
      _myTrait_.state = function(newState) {
        if (typeof(newState) != "undefined") {
          this._state = newState;
        }
        return this._state;
      }
      _myTrait_.then = function(onFulfilled, onRejected) {

        if (!onRejected) onRejected = function() {};

        var p = new _promise(onFulfilled, onRejected);
        var me = this;

        if (this._state == 1) {
          later().asap(function() {
            me.fulfill(me.value());
          });
        }
        if (this._state == 2) {
          ater().asap(function() {
            me.reject(me.rejectReason());
          });
        }
        this._childPromises.push(p);
        return p;



      }
      _myTrait_.triggerStateChange = function(t) {
        var me = this;
        if (!this._listeners) return;
        this._listeners.forEach(function(fn) {
          fn(me);
        });
        // one-timer
        this._listeners.length = 0;
      }
      _myTrait_.value = function(v) {
        if (typeof(v) != "undefined") {
          this._stateValue = v;
          return this;
        }
        return this._stateValue;
      }
    }(this));
  }
  var _promise = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _promise) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _promise(a, b, c, d, e, f, g, h);
  };
  _promise._classInfo = {
    name: '_promise'
  };
  _promise.prototype = new _promise_prototype();
  if (typeof(window) != 'undefined') window['_promise'] = _promise;
  if (typeof(window) != 'undefined') window['_promise_prototype'] = _promise_prototype;
  var aceCmdConvert_prototype = function() {
    'use strict';;
    (function(_myTrait_) {
      _myTrait_.fromAce = function(cmdList) {


        var newList = [];

        cmdList.forEach(function(cmd) {

          var range = cmd.range;
          if (cmd.action == "insertText") {
            newList.push([
              1,
              range.start.row,
              range.start.column,
              range.end.row,
              range.end.column,
              cmd.text
            ])
          }
          if (cmd.action == "removeText") {
            newList.push([
              2,
              range.start.row,
              range.start.column,
              range.end.row,
              range.end.column,
              cmd.text
            ])
          }
          if (cmd.action == "insertLines") {
            newList.push([
              3,
              range.start.row,
              range.start.column,
              range.end.row,
              range.end.column,
              cmd.lines
            ])
          }
          if (cmd.action == "removeLines") {
            newList.push([
              4,
              range.start.row,
              range.start.column,
              range.end.row,
              range.end.column,
              cmd.lines,
              cmd.nl
            ])
          }


        });

        return newList;

        /*
           {"action":"insertText","range":{"start":{"row":0,"column":0},
               "end":{"row":0,"column":1}},"text":"d"}
           */
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(onFulfilled, onRejected) {

      });
      _myTrait_.runToAce = function(cmdList) {


        var newList = [],
          _convert = ["",
            "insertText", "removeText", "insertLines", "removeLines"
          ];

        cmdList.forEach(function(cmd) {

          var c = {
            action: _convert[cmd[0]],
            range: {
              start: {
                row: cmd[1],
                column: cmd[2]
              },
              end: {
                row: cmd[3],
                column: cmd[4]
              }
            }
          };
          if (cmd[0] < 3) {
            c.text = cmd[5];
          } else {
            c.lines = cmd[5];
          }
          if (cmd[0] == 4) c.nl = cmd[6] || "\n";
          newList.push(c);

        });

        return newList;

        /*
           {"action":"insertText","range":{"start":{"row":0,"column":0},
               "end":{"row":0,"column":1}},"text":"d"}
           */
      }
      _myTrait_.runToLineObj = function(lines, cmdList) {

        cmdList.forEach(function(cmd) {
          var row = cmd[1],
            col = cmd[2],
            endRow = cmd[3],
            endCol = cmd[4];
          if (cmd[0] == 1) {
            if (cmd[5] == "\n") {
              // add the newline can be a bit tricky
              var line = lines.item(row);
              if (!line) {
                lines.insertAt(row, {
                  text: ""
                });
                lines.insertAt(row + 1, {
                  text: ""
                });
              } else {
                var txt = line.text();
                line.text(txt.slice(0, col));
                var newLine = {
                  text: txt.slice(col) || ""
                };
                lines.insertAt(row + 1, newLine);
              }
              //lines[row] = line.slice(0,col);
              //var newLine = line.slice(col) || "";
              //lines.splice(row+1, 0, newLine);
            } else {
              var line = lines.item(row);
              if (!line) {
                lines.insertAt(row, {
                  text: cmd[5]
                });
              } else {
                var txt = line.text();
                line.text(txt.slice(0, col) + cmd[5] + txt.slice(col));
                // lines[row] = line.slice(0, col) + cmd[5] + line.slice(col);
              }
            }
          }
          if (cmd[0] == 2) {
            if (cmd[5] == "\n") {
              // removing the newline can be a bit tricky
              // lines[row]
              var thisLine = lines.item(row),
                nextLine = lines.item(row + 1);

              // lines[row] = thisLine + nextLine;
              // lines.splice(row+1, 1); // remove the line...
              var txt1 = "",
                txt2 = "";
              if (thisLine) txt1 = thisLine.text();
              if (nextLine) txt2 = nextLine.text();
              if (!thisLine) {
                lines.insertAt(row, {
                  text: ""
                });
              } else {
                thisLine.text(txt1 + txt2);
              }
              if (nextLine) nextLine.remove();
            } else {
              var line = lines.item(row),
                txt = line.text();
              line.text(txt.slice(0, col) + txt.slice(endCol));
              //  str.slice(0, 4) + str.slice(5, str.length))
              // lines[row] = line.slice(0, col) + line.slice(endCol);
            }
          }
          if (cmd[0] == 3) {
            var cnt = endRow - row;
            for (var i = 0; i < cnt; i++) {
              // var line = lines.item(row+i);
              lines.insertAt(row + i, {
                text: cmd[5][i]
              });
              // lines.splice(row+i, 0, cmd[5][i]);
            }
          }
          if (cmd[0] == 4) {
            var cnt = endRow - row;
            for (var i = 0; i < cnt; i++) {
              var line = lines.item(row);
              line.remove();
              // lines.splice(row, 1);
            }
          }

        });
        /*
           tools.button().text("Insert to 1 ").on("click", function() {
               myT.lines.insertAt(1, { text : prompt("text")}); 
           });
           tools.button().text("Insert to 0 ").on("click", function() {
               myT.lines.insertAt(0, { text : prompt("text")}); 
           });
           tools.button().text("Split line 1").on("click", function() {
               var line1 = myT.lines.item(1);
               var txt = line1.text();
               var txt1 = txt.substring(0, 4),
                   txt2 = txt.substring(4);
               line1.text(txt1);
               myT.lines.insertAt(2, { text : txt2 });
           });
           tools.button().text("Insert to N-1 ").on("click", function() {
               myT.lines.insertAt(myT.lines.length()-1, { text : prompt("text")}); 
           });
           tools.button().text("Insert to N ").on("click", function() {
               myT.lines.insertAt(myT.lines.length(), { text : prompt("text")}); 
           });
           */

      }
      _myTrait_.runToString = function(str, cmdList) {

        if (!cmdList || (typeof(str) == "undefined")) {
          return "";
        }
        str = str + "";

        var lines = str.split("\n");

        cmdList.forEach(function(cmd) {
          var row = cmd[1],
            col = cmd[2],
            endRow = cmd[3],
            endCol = cmd[4];
          if (cmd[0] == 1) {
            if (cmd[5] == "\n") {
              // add the newline can be a bit tricky
              var line = lines[row] || "";
              lines[row] = line.slice(0, col);
              var newLine = line.slice(col) || "";
              lines.splice(row + 1, 0, newLine);
            } else {
              var line = lines[row] || "";
              lines[row] = line.slice(0, col) + cmd[5] + line.slice(col);
            }
          }
          if (cmd[0] == 2) {
            if (cmd[5] == "\n") {
              // removing the newline can be a bit tricky
              // lines[row]
              var thisLine = lines[row] || "",
                nextLine = lines[row + 1] || "";
              lines[row] = thisLine + nextLine;
              lines.splice(row + 1, 1); // remove the line...
            } else {
              var line = lines[row] || "";
              // str.slice(0, 4) + str.slice(5, str.length))
              lines[row] = line.slice(0, col) + line.slice(endCol);
            }
          }
          if (cmd[0] == 3) {
            var cnt = endRow - row;
            for (var i = 0; i < cnt; i++) {
              lines.splice(row + i, 0, cmd[5][i]);
            }
          }
          if (cmd[0] == 4) {
            var cnt = endRow - row;
            for (var i = 0; i < cnt; i++) {
              lines.splice(row, 1);
            }
          }

        });

        return lines.join("\n");
      }
      _myTrait_.simplify = function(cmdList) {

        // [[1,0,0,0,1,"a"],[1,0,1,0,2,"b"],[1,0,2,0,3,"c"],[1,0,3,0,4,"e"],[1,0,4,0,5,"d"],
        // [1,0,5,0,6,"e"],[1,0,6,0,7,"f"],[1,0,7,0,8,"g"]]
        var newList = [],
          lastCmd,
          lastCol,
          lastRow,
          collect = null;

        cmdList.forEach(function(cmd) {

          if (lastCmd && (cmd[0] == 1) && (lastCmd[0] == 1) && (cmd[3] == cmd[1]) && (lastCmd[1] == cmd[1]) && (lastCmd[3] == cmd[3]) && (lastCmd[4] == cmd[2])) {
            if (!collect) {
              collect = [];
              collect[0] = 1;
              collect[1] = lastCmd[1];
              collect[2] = lastCmd[2];
              collect[3] = cmd[3];
              collect[4] = cmd[4];
              collect[5] = lastCmd[5] + cmd[5];
            } else {
              collect[3] = cmd[3];
              collect[4] = cmd[4];
              collect[5] = collect[5] + cmd[5];
            }
          } else {
            if (collect) {
              newList.push(collect);
              collect = null;
            }
            if (cmd[0] == 1) {
              collect = cmd.slice();
            } else {
              newList.push(cmd);
            }
          }
          lastCmd = cmd;
        });
        if (collect) newList.push(collect);
        return newList;
      }
    }(this));
  }
  var aceCmdConvert = function(a, b, c, d, e, f, g, h) {
    if (this instanceof aceCmdConvert) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != aceCmdConvert._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new aceCmdConvert(a, b, c, d, e, f, g, h);
  };
  aceCmdConvert._classInfo = {
    name: 'aceCmdConvert'
  };
  aceCmdConvert.prototype = new aceCmdConvert_prototype();
  if (typeof(window) != 'undefined') window['aceCmdConvert'] = aceCmdConvert;
  if (typeof(window) != 'undefined') window['aceCmdConvert_prototype'] = aceCmdConvert_prototype;
  var templatePackage_prototype = function() {
    'use strict';
    var _inputWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj) {

          //console.log("run");
          //console.log(change, obj, targetObj);

          if (!change || !targetObj) return;

          // DOM node... new value to the DOM node...

          //console.log("About to change");

          if (change[0] == 4) {
            //console.log("Creating the SET change");
            var prop = change[1];
            var v = obj.data[prop];
            //console.log(obj);
            //console.log(obj.data);
            //console.log(prop,v);

            var oldVal = targetObj.value;
            if (oldVal != v) targetObj.value = v;
          }

        }
      }(this));
    }
    var _inputWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _inputWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _inputWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _inputWorker(a, b, c, d, e, f, g, h);
    };
    _inputWorker._classInfo = {
      name: '_inputWorker'
    };
    _inputWorker.prototype = new _inputWorker_prototype();
    var _domTextWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj) {

          if (!change || !targetObj) return;

          var dom = targetObj;

          if (!this.bDetected) {

            if (typeof(dom.textContent) != "undefined") {
              this.bFast = true;
            } else {
              this.bFast = false;
              this.tmpDom = document.createElement("div");
            }
            this.bDetected = true;
          }

          if (change[0] == 4) {
            var prop = change[1];
            var v = obj.data[prop];
            if (this.bFast) {
              targetObj.textContent = v;
            } else {
              this.tmpDom.innerHTML = v;
              if (targetObj.innerHTML) {
                targetObj.innerHTML = this.tmpDom.innerText;
              } else {
                targetObj.replaceData(0, targetObj.nodeValue.length, v || "");
                /*
                       var p = targetObj.parentNode;
                       if(p) {
                           p.replaceChild( document.createTextNode(v || ""), targetObj);
                       }
                       */
                // targetObj.nodeValue = this.tmpDom.innerText;
              }

            }

          }

        }
      }(this));
    }
    var _domTextWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _domTextWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _domTextWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _domTextWorker(a, b, c, d, e, f, g, h);
    };
    _domTextWorker._classInfo = {
      name: '_domTextWorker'
    };
    _domTextWorker.prototype = new _domTextWorker_prototype();
    var templateCompiler_prototype = function() {;
      (function(_myTrait_) {
        var _modelTemplates;
        var _viewContent;
        var _viewTemplates;
        var _namedModels;
        var _namedViews;
        var _dataLink;
        var _customDirectives;
        var _viewsById;
        var _aceInstances;
        var _regTypes;
        _myTrait_._addCustomDir = function(name, fn) {

          if (!_customDirectives) _customDirectives = {}
          _customDirectives[name] = fn;

        }
        _myTrait_._addModelTemplate = function(elem, tplObj) {

          var id = this.guid();
          if (!_modelTemplates) _modelTemplates = {};
          _modelTemplates[id] = tplObj;
          if (elem && elem.setAttribute) elem.setAttribute("data-tpl", id);
        }
        _myTrait_._callCustom = function(name, dom, options) {
          if (_customDirectives[name]) {
            _customDirectives[name](dom, options);
          }
        }
        _myTrait_._clearWorkers = function(view) {

          view.workers.forEach(function(ww) {
            _dataLink._removeWorker(ww);
          })
          var me = this;
          view.childViews.forEach(function(w) {
            me._clearWorkers(w);
          });
        }
        _myTrait_._createViewDef = function(dataId, parentView) {


          var viewDef = {
            viewid: this.getGUID(),
            dataid: dataId,
            baseTpl: null,
            dom: null,
            parentView: parentView,
            workers: [],
            childViews: []
          }

          if (!_viewsById) {
            _viewsById = {}
          }
          _viewsById[viewDef.viewid] = viewDef;

          if (parentView && parentView.childViews) {
            parentView.childViews.push(viewDef);
          }

          _dataLink._addModelView(dataId, viewDef);


          return viewDef;
        }
        _myTrait_._eventActionFor = function(event, attributeName, rootData) {
          var elem = event.target;
          if (!elem) return;
          var action = elem.getAttribute(attributeName);
          var me = this;
          if (action) {
            var max = 10,
              dom = elem,
              objid;
            // console.log("Looking action ", action);
            while (dom && !(objid = dom.getAttribute("data-id")) && (max--)) {
              dom = dom.parentNode;
            }
            if (dom && objid) {

              var params = action.split("("),
                action = params.shift();
              var argStr = params.pop(),
                plist = null;
              if (argStr) {
                var prms = argStr.split(")"),
                  plist = prms.shift().split(",");
              }
              // console.log("Found the action");
              var oo = rootData.findFromCache(objid);
              if (me.isFunction(oo[action])) {
                console.log("fires ", action, plist);
                if (me.isArray(plist)) {
                  oo[action].apply(oo, plist);
                } else {
                  oo[action](); // just a test for the sake of easiness...
                }
              }
            }
          }
        }
        _myTrait_._findModelTemplate = function(elem) {

          if (elem && elem.getAttribute) {
            var id = elem.getAttribute("data-tpl");
            if (_modelTemplates) return _modelTemplates[id];
          }
        }
        _myTrait_._getNamedView = function(name) {

          return _namedViews[name];
        }
        _myTrait_._getNamedViews = function(t) {

          return _namedViews;
        }
        _myTrait_._getSvgTagName = function(tag) {

          if (tag == "textpath") return "textPath";

          return tag;
        }
        _myTrait_._getViewsOfModel = function(dataId) {

          // this is needed for example when the view is destroyed...


          return _modelTemplates[dataId];
        }
        _myTrait_._saveViewTemplate = function(name, tplDef) {

          if (!_viewTemplates) {
            _viewTemplates = {};
          }

          _viewTemplates[name] = tplDef;
        }
        _myTrait_._setNamedModel = function(name, model) {

          // The named nodel
          // <div data-model="@topnavi">
          // </div>

          // ********* dynamic view template to be used *********
          // <div data-view="@content">
          // </div>


          _namedModels[name] = model;

          return this;
        }
        _myTrait_._setNamedView = function(name, viewDef) {

          _namedViews[name] = viewDef;

        }
        _myTrait_.clearTheView = function(viewId) {

          if (!_viewsById) return;

          var view = _viewsById[viewId];
          if (view) {

            this._clearWorkers(view);
            var parentView = view.parentView;

            if (parentView) {
              var i = parentView.childViews.indexOf(view);
              if (i >= 0) {
                parentView.childViews.splice(i, 1);
              }
            }

            delete _viewsById[view.viewid];

          }
        }
        _myTrait_.composeModelView = function(dom, dataItem, modelView, renderToView) {
          var m = dataItem,
            me = this,
            t = modelView.baseTpl,
            itemView;

          if (renderToView) {
            itemView = renderToView;
          } else {
            itemView = me._createViewDef(m.__id, modelView);
          }
          if (t.classSwitch) {
            var subC = m.data[t.classSwitch],
              sT;
            if (!subC) {
              sT = t.classTemplates["default"];
            } else {
              sT = t.classTemplates[subC];
              if (!sT) sT = t.classTemplates["default"];
            }
            if (sT) {
              if (sT) {
                var newDom = me.composeTemplate(m, sT, itemView);

                if (renderToView) {
                  // console.log("Using Render to View ...");
                  renderToView.dom.parentNode.replaceChild(newDom, renderToView.dom);
                } else {
                  dom.appendChild(newDom);
                }
                itemView.dom = newDom;

                // Worker to observe changes for the class-switch
                var w = _dataLink._createWorker(m.__id, t.classSwitch, _workers().fetch(5), dom, {
                  view: itemView,
                  template: t,
                  m: m,
                  dom: newDom
                });

                itemView.workers.push(w);
              }
            }
          } else {
            var subTpl = t.children[0];
            var newDom = me.composeTemplate(m, subTpl, modelView);
            dom.appendChild(newDom);
            itemView.dom = newDom;
          }
        }
        _myTrait_.composePartsToTxt = function(tpl, dataItem) {
          var rawText = "";
          var list = tpl.txtParts.list,
            toks = tpl.txtParts.tokens;
          // console.log(list);
          for (var i = 0; i < list.length; i++) {
            var vName;
            if (vName = toks[i]) {
              var val = "";
              if (typeof(dataItem.data[vName]) != "undefined") {
                val = dataItem.data[vName] || "";
              }
              rawText += val;

            } else {
              rawText += list[i] || "";
            }
          }
          return rawText;


        }
        _myTrait_.composeTemplate = function(dataItem, tpl, currentView) {

          var bDoNotInsert = false;
          var me = this;
          if (tpl && tpl.tplData) {
            tpl = tpl.tplData;
          }

          if (tpl && tpl.baseTpl) {
            tpl = tpl.baseTpl;
          }

          // Detect the data-attribute for the template here...
          var bChange = false;
          if (tpl.dataAttrs) {
            var modelURL = tpl.dataAttrs["data-model-url"];
            var modelURL2 = tpl.dataAttrs["data-model-url-confirm"];
            if (modelURL && (modelURL == modelURL2)) {
              // console.log("*** found model url ***");
              // console.log(modelURL);
            }

            var mName;
            if (mName = tpl.dataAttrs["data-selection"]) {
              if (dataItem.data[mName]) {
                _dataLink._addSelectionModel(dataItem.data[mName]);
              }
            }
            // currently only local models:
            var modelName = tpl.dataAttrs["data-use-model"];
            if (modelName) {
              _dataLink.query(modelName, function(newModel) {
                if (newModel) {
                  dataItem = newModel;
                  bChange = true;
                }
              });
            }
          }





          if (!currentView) {
            currentView = this._createViewDef(dataItem.__id);
            currentView.baseTpl = tpl;

            //console.log("The template");
            //console.log(tpl);

            if (tpl.dataAttrs) {
              var viewName = tpl.dataAttrs["data-view"];
              //console.error("Found ", viewName);
              if (viewName) {
                this._setNamedView(viewName, currentView);
              }
            }
          } else {
            if (tpl.dataAttrs) {
              var viewName = tpl.dataAttrs["data-view"];
              //console.error("Found ", viewName);
              if (viewName) {
                // currentView = me._createViewDef( dataItem.__id, currentView );
                currentView = this._createViewDef(dataItem.__id, currentView);
                currentView.baseTpl = tpl;
                this._setNamedView(viewName, currentView);
              }
            }
          }



          if (tpl.type == 3) {
            var dom;

            if (tpl.txtParts && tpl.txtParts.bHas) {

              var dom = document.createDocumentFragment();

              var list = tpl.txtParts.list,
                toks = tpl.txtParts.tokens;
              for (var i = 0; i < list.length; i++) {
                var vName;
                if (vName = toks[i]) {
                  var val = "",
                    bDidAppend = false;
                  var vParts = vName.split(":");
                  if (vParts.length > 1) {
                    vName = vParts[0];
                    var typeName = vParts[1];

                    // Here is the code to create a live template compiler from a variable
                    if (typeName == "aceHTML") {
                      if (typeof(dataItem.data[vName]) != "undefined") {
                        val = dataItem.data[vName] || "";
                      }
                      var docHolder = document.createElement("div");
                      // Then, what do do really... might apply some classes to the editor here
                      docHolder.setAttribute("class", "aceHTML");
                      var inst = me.getAceInstance(dataItem.__id + ":" + vName, docHolder, dataItem, vName, null, currentView);
                      if (inst.dom.parentNode) {
                        inst.dom.parentNode.removeChild(inst.dom);
                      }
                      dom.appendChild(inst.dom);
                      inst.editor._noUpdates = true;
                      inst.editor.setValue(val);
                      inst.editor._noUpdates = false;

                      currentView.workers.push(w);
                      bDidAppend = true;
                    }

                    // Here is the code to create a live template compiler from a variable
                    if (typeName == "aceJS") {
                      if (typeof(dataItem.data[vName]) != "undefined") {
                        val = dataItem.data[vName] || "";
                      }
                      var docHolder = document.createElement("div");
                      // Then, what do do really... might apply some classes to the editor here
                      docHolder.setAttribute("class", "aceHTML");
                      var inst = me.getAceInstance(dataItem.__id + ":" + vName, docHolder, dataItem, vName, "javascript", currentView);
                      if (inst.dom.parentNode) {
                        inst.dom.parentNode.removeChild(inst.dom);
                      }
                      dom.appendChild(inst.dom);
                      inst.editor._noUpdates = true;
                      inst.editor.setValue(val);
                      inst.editor._noUpdates = false;



                      bDidAppend = true;
                    }

                    // Here is the code to create a live template compiler from a variable
                    if (typeName == "template") {
                      if (typeof(dataItem.data[vName]) != "undefined") {
                        val = dataItem.data[vName] || "";
                      }
                      // console.error("Could not handle ", vParts[0], vParts[1]);
                      // Now, we might do something funny here...
                      // Do we have this compiled???
                      var jsTpl = me.compile(val);
                      var subTplDOM = me.composeTemplate(dataItem, jsTpl);
                      // TODO: on value perhaps not necessary?

                      dom.appendChild(subTplDOM);
                      bDidAppend = true;
                      var myView = me.getViewForElem(subTplDOM);
                      var w = _dataLink._createWorker(dataItem.__id, vName, _workers().fetch(9), subTplDOM, {
                        modelid: dataItem.__id,
                        compiler: me,
                        view: myView
                      });
                      myView.workers.push(w);
                    }

                    var custType;
                    if (_regTypes[typeName]) {
                      // console.log("Found the custom type ", typeName);
                      // console.log("Data item ", dataItem.data[vName]);
                    }

                    if ((custType = _regTypes[typeName])) {
                      // console.log("Did have the data item");

                      if (vName == "this") {
                        val = dataItem;
                      } else {
                        if (typeof(dataItem.data[vName]) != "undefined") {
                          val = dataItem.data[vName] || "";
                        }
                      }

                      if (custType.fn && vName) {
                        var newDom = custType.fn(val, {
                          dom: dom,
                          data: dataItem,
                          tpl: tpl,
                          view: currentView
                        });
                        if (newDom) {
                          dom.appendChild(newDom);
                          bDidAppend = true;
                          var ddd = dataItem.data[vName];
                          if (me.isObject(ddd) && me.isArray(ddd.data)) {
                            var w = _dataLink._createWorker(ddd.__id, "*", _workers().fetch(10), newDom, {
                              modelid: ddd.__id,
                              fn: custType.fn,
                              varName: vName,
                              dom: newDom,
                              callOpts: {
                                dom: dom,
                                data: ddd,
                                tpl: tpl,
                                view: currentView
                              }
                            });
                          } else {
                            ddd = dataItem;
                            var w = _dataLink._createWorker(ddd.__id, vName, _workers().fetch(10), newDom, {
                              modelid: ddd.__id,
                              fn: custType.fn,
                              varName: vName,
                              dom: newDom,
                              callOpts: {
                                dom: dom,
                                data: ddd,
                                tpl: tpl,
                                view: currentView
                              }
                            });
                          }

                          currentView.workers.push(w);

                        }
                      }

                    }


                  }

                  if (!bDidAppend) {

                    _dataLink.query(vName, function(val, resolved) {

                      if (!resolved) return;

                      if (!val) val = "";

                      var tn = document.createTextNode(val);
                      dom.appendChild(tn);

                      if (resolved.obj && resolved.name) {

                        // TODO create worker for the item...
                        var w = _dataLink._createWorker(resolved.obj.__id, resolved.name, _workers().fetch(1), tn, null);
                        currentView.workers.push(w);
                      }



                    }, dataItem);

                  }

                } else {
                  dom.appendChild(document.createTextNode(list[i] || ""));

                }
              }

            } else {
              dom = document.createTextNode(tpl.text || "");
            }
          }
          if (tpl.type == 1) {
            var dom, bSvgRoot = false;

            if (tpl.tagName == "svg") {
              // bSvgRoot = true;
              dom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              // xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink"
              dom.setAttribute("xmlns", "http://www.w3.org/2000/svg");
              dom.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            } else {

              if (tpl.ns == "svg") {

                var dom = document.createElementNS("http://www.w3.org/2000/svg", this._getSvgTagName(tpl.tagName));
                dom.setAttributeNS(null, "data-id", dataItem.__id);
                dom.setAttributeNS(null, "data-viewid", currentView.viewid);
              } else {
                var dom = document.createElement(tpl.tagName);
                dom.setAttribute("data-id", dataItem.__id);
                dom.setAttribute("data-viewid", currentView.viewid);
              }
            }
            // if there is a value bind to the node, create worker for it...
            var bHadValue = false;

            if (!currentView.dom) currentView.dom = dom;

            var selClassBase,
              selClass, selClassFilter;
            if (dataItem && (selClassBase = tpl.dataAttrs["data-sel-class"])) {
              var parts = selClassBase.split(":");
              selClassFilter = parts[0];
              var selList = _docUp().findSelection(selClassFilter);
              if (selList.indexOf(dataItem.__id) >= 0) {
                $(dom).addClass(parts[1]);
              }
            }
            var bIsStyleTag = false;
            if (tpl.tagName == "style") {

              bIsStyleTag = true;

              //console.log("***** parsing a style element *****");
              //console.log("***** parsing a style element *****");
              //console.log(tpl);
              //console.log(dataItem);
              // _rawTextWorker

              var subTpl = tpl.children[0];
              var wOpts = {
                tpl: subTpl,
                dom: dom,
                model: dataItem,
                modelid: dataItem.__id
              }

              // Do we use "any" variable in this case or just some variables...
              var worker = _docUp()._createWorker(dataItem.__id,
                "*",
                _workers().fetch(8),
                dom, wOpts);
              currentView.workers.push(worker);

              var rawText = this.composePartsToTxt(subTpl, dataItem);
              // console.log(rawText);

              if (dom.cssText) {
                dom.cssText = rawText;
              } else {
                me.dom_setText(dom, rawText);
                //  dom.textContent = rawText;
              }

            }

            // The last variable...
            var ifVar;

            if (dataItem && (ifVar = tpl.dataAttrs["data-if-not-last"])) {

              // Test...
              try {
                var p = dataItem.__p;
                if (p) {

                  var pData = _dataLink._find(p);
                  if (typeof(pData) != "undefined") {
                    var ii = pData.data.indexOf(dataItem);
                    var len = pData.data.length;
                    if (ii < (len - 1)) {
                      // OK...
                    } else {
                      // Should remove the DOM item actually...
                      dom.style.display = "none";
                      bDoNotInsert = true;
                    }
                  }
                }
              } catch (e) {
                console.error(e.message);
              }

            }


            if (ifVar = tpl.dataAttrs["data-if"]) {
              _dataLink.query(ifVar, function(val) {
                if (!val) {
                  dom.style.display = "none";
                  // bDoNotInsert = true;
                }
                // TODO create worker for the item...
                var w = _dataLink._createWorker(dataItem.__id, ifVar, _workers().fetch(11), dom);
                currentView.workers.push(w);
              }, dataItem);
            }

            if (ifVar = tpl.dataAttrs["data-if-not"]) {
              _dataLink.query(ifVar, function(val) {
                if (val) {
                  dom.style.display = "none";
                  // bDoNotInsert = true;
                }
                // TODO create worker for the item...
                var w = _dataLink._createWorker(dataItem.__id, ifVar, _workers().fetch(11), dom);
                currentView.workers.push(w);
              }, dataItem);
            }

            if (ifVar = tpl.dataAttrs["data-if-then"]) {

              // evaluation worker for some change

              var ifParts = ifVar.split("=>");
              // data-if-then="logged=1 => doSomething"

              var conditionParts = ifParts[0].split("=");
              var varName = conditionParts[0];

              _dataLink.query(varName, function(val, opt) {

                var w = _dataLink._createWorker(opt.obj.__id, opt.name, _workers().fetch(13), dom, {
                  modelid: opt.obj.__id,
                  evalFn: ifVar,
                  thenCtrl: $.trim(ifParts[1])
                });
                currentView.workers.push(w);
              }, dataItem);

            }

            if (!bSvgRoot) {

              var target;
              if (target = tpl.dataAttrs["data-upload-to"]) {
                try {
                  var opts = {
                    vars: {},
                    target: target,
                    autoUpload: true,
                    onComplete: function(v) {
                      console.log("***** GOT FROM UPLOAD ");
                      console.log(v);
                      _dataLink.execCommand(v);
                    }
                  };
                  var nmod = tpl.dataAttrs["data-upload-list"]
                  if (nmod) {
                    _dataLink.query(nmod, function(res, opts) {
                      console.log("---- upload list, to");
                      console.log(res);
                      console.log(opts);
                      opts.vars.responsesTo = opts.obj.__id;
                    }, dataItem);

                  }

                  var fr = _dataLink._createUploadFrame(opts)
                  dom.appendChild(fr._dom);
                } catch (e) {
                  alert(e.message);
                }
              }


              if (tpl.valueParts && tpl.valueParts.bHas) {

                var list = tpl.valueParts.list,
                  toks = tpl.valueParts.tokens;
                for (var i = 0; i < list.length; i++) {
                  var vName;
                  if (vName = toks[i]) {
                    var val = "";

                    _dataLink.query(vName, function(val, resolved) {
                      if (!resolved) return;
                      if (!val) val = "";
                      dom.value = val;
                      if (resolved.obj && resolved.name) {
                        var dataItem = resolved.obj;
                        var vName = resolved.name;
                        var w = _dataLink._createWorker(dataItem.__id, vName, _workers().fetch(2), dom, null);
                        currentView.workers.push(w);
                        me.dom_setAttr(dom, "data-value-id", dataItem.__id + "::" + vName, tpl.ns);
                      }

                    }, dataItem);

                    /*
                               if(typeof(dataItem.data[vName])!="undefined") {
                                   val = dataItem.data[vName] || "";
                               }
                               dom.value = val;
                       
                               // TODO create worker for the item...
                               var w = _dataLink._createWorker( dataItem.__id, vName, _workers().fetch(2), dom, null);
                               currentView.workers.push(w);           
                               
                               me.dom_setAttr(dom, "data-value-id", dataItem.__id+"::"+vName);
                               */

                  } else {
                    // dom.appendChild( document.createTextNode( list[i] || "" ) );
                  }
                }
                bHadValue = true;
              }
              // TODO: data-attributes, are there any binds to them??
              if (tpl.attributes) {
                tpl.attributes.forEach(function(a) {
                  var name = a[0],
                    value = a[1],
                    binds = a[2];
                  if (name == "value") {
                    if (bHadValue) return;
                  }
                  var bHadB = false;

                  if (_customDirectives[name]) {
                    var myVars = {},
                      rawValue;
                    var customOpts = {
                      currentView: currentView,
                      model: dataItem,
                      binds: binds,
                      name: name,
                      vars: myVars,
                      value: rawValue
                    };

                    if (binds) {
                      var list = binds.list,
                        toks = binds.tokens;
                      for (var i = 0; i < list.length; i++) {
                        var vName;
                        if (vName = toks[i]) {
                          var val = "";
                          if (typeof(dataItem.data[vName]) != "undefined") {
                            val = dataItem.data[vName] || "";
                          }
                          myVars[vName] = val;
                          customOpts.vars = myVars;
                          customOpts.value = val;


                          // This worker should remove all the workers for this DOM element
                          var w = _dataLink._createWorker(dataItem.__id, vName, _workers().fetch(6), dom, customOpts);
                          currentView.workers.push(w);

                        }
                      }
                    }


                    _customDirectives[name](dom, customOpts);
                  }

                  if (tpl.dataAttrs[name]) {
                    // might check here the attributes
                    // data-view
                    // data-model
                    // data-select
                    // data-id etc.
                    if (name == "data-attr-fwd") {
                      var varList = value.split(",");

                      varList.forEach(function(vName) {
                        vName = vName.trim();
                        var val = "",
                          name = vName;
                        var parts = vName.split("=>");
                        if (parts.length > 1) {
                          name = parts[1].trim();
                          vName = parts[0].trim();
                        }
                        if (typeof(dataItem.data[vName]) != "undefined") {
                          val = dataItem.data[vName] || "";
                        }
                        // dom.setAttribute(name, val);
                        me.dom_setAttr(dom, name, val, tpl.ns);

                        // TODO create worker for the item...
                        if (tpl.ns == "svg") {
                          var w = _dataLink._createWorker(dataItem.__id, vName, _workers().fetch(4), dom, name);
                        } else {
                          var w = _dataLink._createWorker(dataItem.__id, vName, _workers().fetch(3), dom, name);
                        }
                        currentView.workers.push(w);
                        bHadB = true;
                      });
                    }
                  }


                  // dom.setAttribute(name, value);
                  // Attribute workers... binds.list
                  // => binds.tokens --- >?
                  if (binds) {
                    //console.log("Found binds ", binds);
                    var list = binds.list,
                      toks = binds.tokens;

                    me.composeTokensToTxt(binds, dataItem, function(res) {

                      bHadB = true;
                      me.dom_setAttr(dom, name, res, tpl.ns);
                    });
                    for (var i = 0; i < list.length; i++) {
                      var vName;
                      if (vName = toks[i]) {
                        var val = "";
                        if (typeof(dataItem.data[vName]) != "undefined") {
                          val = dataItem.data[vName] || "";
                        }
                        // TODO create worker for the item...
                        if (tpl.ns == "svg") {
                          var w = _dataLink._createWorker(dataItem.__id, vName, _workers().fetch(4), dom, {
                            attrName: name,
                            binds: binds,
                            compiler: me
                          });
                        } else {
                          var w = _dataLink._createWorker(dataItem.__id, vName, _workers().fetch(3), dom, {
                            attrName: name,
                            binds: binds,
                            compiler: me
                          });
                        }
                        currentView.workers.push(w);
                        bHadB = true;
                      }
                    }
                  }
                  if (!bHadB) {
                    me.dom_setAttr(dom, name, value, tpl.ns);
                  }


                })
              }
            }

            if (tpl.children && !(bIsStyleTag) && !(tpl.tagName == "textarea")) {
              var me = this;
              // data-model change here
              // data-view definitions
              // create a parent view etc....
              // model changes, views and so on should be taken into account here...
              tpl.children.forEach(function(t) {
                // Sub template..
                var modelName = t.dataAttrs["data-model"],
                  viewName = t.dataAttrs["data-view"],
                  cProp; // now undefined

                if (modelName) {


                  _dataLink.query(modelName, function(subModel) {
                    //console.log("The query returned ", subModel);
                    //console.log("Root doc is ");
                    //console.log(_dataLink._findRootDoc( subModel) );
                    if (subModel && subModel.__id) {

                      if (t.ns == "svg") {
                        var childDom = document.createElementNS("http://www.w3.org/2000/svg", tpl.tagName);
                      } else {
                        var childDom = document.createElement(t.tagName);
                      }

                      // TODO, set attributes... 
                      t.attributes.forEach(function(a) {
                        var name = a[0],
                          value = a[1],
                          binds = a[2];
                        me.dom_setAttr(childDom, name, value, tpl.ns);
                      });
                      // And here comes the code from below...
                      var modelView = me._createViewDef(subModel.__id, currentView);

                      modelView.dom = childDom;

                      // if this is actually a model-view, then save the name...
                      if (viewName) me._setNamedView(viewName, modelView);

                      me.dom_setAttr(childDom, "data-id", subModel.__id, tpl.ns);
                      // childDom.setAttribute("data-id", subModel.__id);
                      modelView.tagName = t.tagName;
                      modelView.baseTpl = t;

                      if (me.isArray(subModel.data)) {

                        // This should create a worker for the model view...
                        var w = _dataLink._createWorker(subModel.__id, "*", _workers().fetch(7), modelView);
                        modelView.workers.push(w);

                        if (subModel.data.forEach) {
                          subModel.data.forEach(function(m) {
                            me.composeModelView(childDom, m, modelView);
                          });
                        }
                        dom.appendChild(childDom);
                      } else {

                        // Then, continue...
                        var childDom = me.composeTemplate(subModel, t, modelView);
                        if (childDom) {
                          dom.appendChild(childDom);
                        }
                      }
                    }
                  }, dataItem);



                } else {

                  var childDom = me.composeTemplate(dataItem, t, currentView);
                  if (childDom) {
                    dom.appendChild(childDom);
                  }
                }
              });
            }

          }

          if (bDoNotInsert) {
            dom = document.createDocumentFragment();
            return dom;
          }

          return dom;

        }
        _myTrait_.composeTokensToTxt = function(txtParts, dataItem, fn) {
          var rawText = "";
          var list = txtParts.list,
            toks = txtParts.tokens,
            result = [],
            doneCnt = 0,
            called = false;

          // console.log(list);
          for (var i = 0; i < list.length; i++) {
            var vName;

            // If there is a token assigned to this index...
            if (vName = toks[i]) {
              (function(i) {
                _dataLink.query(vName, function(val) {
                  if (!val) val = "";
                  // Here is then the value, it could be coming even from some
                  // other source, which is not available at this point??? quite
                  // difficult actually to create this totally composable in all
                  // the cases but let's give it a try after all...
                  result[i] = val;
                  doneCnt++;
                  if (!called && (doneCnt == list.length)) {
                    called = true;
                    fn(result.join(""));
                  }
                }, dataItem);
              }(i));

            } else {
              result[i] = list[i] || "";
              doneCnt++;
            }
          }
          if (!called && (doneCnt == list.length)) {
            fn(result.join(""));
          }
        }
        _myTrait_.createElemFromTpl = function(elem, model) {

          /*
                           me._addModelTemplate( elem, {
                               baseTpl : html.trim(),
                               classTpl : templateList,
                               cProp : cProp
                           });
           */

          // if you need to find again the compiled template options for this current
          // view for the template...
          var tpl = this._findModelTemplate(elem);

          console.log("Tpl", tpl);

          var cProp = tpl.cProp,
            html = tpl.baseTpl,
            m = model,
            me = this;

          if (cProp) {
            var templateList = tpl.classTpl;
            if (m.data[cProp]) {
              var subClass = m.data[cProp],
                h = templateList[subClass];
              if (h) {
                h = h.trim();
                var newDom = me.createNewTemplate(m, h, elem.tagName);
                return newDom; // elem.appendChild( newDom );  
              }
            }
          } else {
            var newDom = me.createNewTemplate(m, html, elem.tagName);
            return newDom; // elem.appendChild( newDom );
          }
        }
        _myTrait_.createViewType = function(name, data, options) {

          if (_regTypes[name]) {
            return _regTypes[name].fn(data, options);
          }
        }
        _myTrait_.findTemplateList = function(str) {
          // So, the templates are of form {{firstname}} {{lastname}}

          // parset this list into parts...

          var parts = str.split("{{"),
            len = parts.length,
            hCnt = 0;

          if (len < 2) {
            return [str];
          }

          //console.log("*parts*");
          //console.log(parts);

          var list = [];
          for (var i = 0; i < parts.length; i++) {
            var part = parts[i];

            if (part.length == 0) continue;

            var rest = part.split("}}");
            if (rest.length > 1) {
              list.push("{{" + rest[0] + "}}");
              list.push(rest[1]);
            } else {
              // there was no end
              list.push(part);
            }
          }

          return list;
        }
        _myTrait_.getAceInstance = function(name, domElem, dataItem, varName, type, currentView) {

          if (!type) type = "html";

          if (!_aceInstances) _aceInstances = {};

          if (!_aceInstances[name]) {

            var editor = ace.edit(domElem);
            editor.setTheme("ace/theme/monokai");
            editor.getSession().setMode("ace/mode/" + type);

            var changeList = [];
            // Sending the editing messages is done here... 
            editor.getSession().on('change', function(e) {

              if (editor._noUpdates) return;

              // console.log("Got a change, which can be broadcasted ", e);

              editor._noUpdates = true;

              var conv = aceCmdConvert();
              var listS = aceCmdConvert().fromAce([e.data]);
              var simpleList = conv.simplify(listS);
              var item,
                list = [];
              while (item = simpleList.pop()) {
                list.push(item);

              }
              _dataLink.execCommand([13, varName, list, null, dataItem.__id]);

              editor._noUpdates = false;

            });


            var i = {
              dom: domElem,
              name: name,
              editor: editor
            };
            _aceInstances[name] = i;

            var w = _dataLink._createWorker(dataItem.__id, varName, _workers().fetch(12), domElem, {
              modelid: dataItem.__id,
              editor: editor,
              view: currentView
            });
            currentView.workers.push(w);


            /*
               editor.on("change", function(e) {
                   if(editor._noUpdates) return;
               
                   var conv = aceCmdConvert();
                   var listS = aceCmdConvert().fromAce( [e.data] );
                   var simpleList = conv.simplify(listS);
                   var item;
                   while(item=simpleList.pop()) {
                       list.push(item)
                   }
                   chList.val(JSON.stringify( conv.simplify(list) ) );
               });  
               */



          }

          return _aceInstances[name];


        }
        _myTrait_.getGUID = function(t) {
          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        }
        _myTrait_.getViewForElem = function(elem) {

          var id = elem.getAttribute("data-viewid");
          if (id) {
            return _viewsById[id];
          }
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(t) {


          if (!_namedModels) {
            _namedModels = {};
            _namedViews = {};
            _customDirectives = {};
            _regTypes = {};
            _dataLink = _docUp();
          }
        });
        _myTrait_.registerViewType = function(name, typeDef) {

          _regTypes[name] = typeDef;
        }
      }(this));;
      (function(_myTrait_) {
        var _eventOn;
        var _commands;
        var _authToken;
        var _authRandom;
        var _authUser;
        _myTrait_.guid = function(t) {

          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
        }
        _myTrait_.isArray = function(t) {

          return Object.prototype.toString.call(t) === '[object Array]';
        }
        _myTrait_.isDataTrait = function(obj) {

          if (obj.__dataTr) return true;
        }
        _myTrait_.isFunction = function(fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        }
        _myTrait_.isObject = function(t) {

          if (typeof(t) == "undefined") return this.__isO;

          return t === Object(t);
        }
      }(this));;
      (function(_myTrait_) {
        var _modelTemplates;
        var _viewContent;
        var _viewTemplates;
        var _namedModels;
        var _namedViews;
        var _dataLink;
        var _customDirectives;
        var _viewsById;
        var _aceInstances;
        var _regTypes;
        _myTrait_.dom_setAttr = function(dom, name, value, ns) {

          if (name == "xlink:href") {
            dom.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value);
          } else {
            if (ns) {
              if (dom.setAttributeNS) {
                dom.setAttributeNS(null, name, value);
              }
            } else {
              if (dom.setAttribute) {
                dom.setAttribute(name, value);
              }
            }
          }
        }
        _myTrait_.dom_setText = function(dom, text) {

          if (typeof(dom.textContent) != "undefined") {
            dom.textContent = text;
          } else {
            var div = document.createElement("div");
            div.innerHTML = text;
            var newText = div.textContent || div.innerText || "";
            text.innerHTML = newText;
          }
        }
      }(this));;
      (function(_myTrait_) {
        var domUtil;
        var _svgElems;
        _myTrait_.compile = function(html, startTag) {

          // return this.testData();

          // here is the view definition...
          var currentNode = {
            tagName: "DIV",
            tplData: null
          };

          var ns;

          if (startTag) {
            var dom = document.createElement(startTag);
            dom.innerHTML = html;
            currentNode.tagName = startTag;

            if (_svgElems[currentNode.tagName.toLowerCase()]) {
              ns = "svg";
            }

          } else {
            var dom = document.createElement("DIV");
            dom.innerHTML = html;
          }

          currentNode.tplData = this.parseNode(dom, ns);

          return currentNode;

        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(t) {


          if (!domUtil) {
            domUtil = _e();
            _svgElems = {
              "circle": "true",
              "rect": true,
              "path": true,
              "svg": true,
              "image": true,
              "line": true,
              "text": true,
              "tspan": true,
              "g": true,
              "pattern": true,
              "polygon": true,
              "polyline": true,
              "clippath": true,
              "defs": true,
              "textpath": true,
              "feoffset": true,
              "femerge": true,
              "femergenode": true,
              "fegaussianblur": true,
              "filter": true
            };
          }
        });
        _myTrait_.parseMustache = function(str) {
          var parts = str.split("{{"),
            len = parts.length,
            hCnt = 0;

          if (len < 2) {
            return [str];
          }

          //console.log("*parts*");
          //console.log(parts);

          var list = [];
          for (var i = 0; i < parts.length; i++) {
            var part = parts[i];

            if (part.length == 0) continue;

            var rest = part.split("}}");
            if (rest.length > 1) {
              list.push("{{" + rest[0] + "}}");
              list.push(rest[1]);
            } else {
              // there was no end
              list.push(part);
            }
          }

          return list;
        }
        _myTrait_.parseNode = function(dom, ns) {

          if (dom.nodeType == 8) return null;


          // here is the view definition...
          var currentNode = {
            tagName: dom.tagName,
            type: dom.nodeType,
            children: [],
            attributes: [],
            classTemplates: {},
            dataAttrs: {},
            ns: ns
          };


          if (currentNode.tagName) {
            var tn = currentNode.tagName.toLowerCase();
            if (_svgElems[tn]) {
              ns = "svg";
              if (tn != "svg") {
                currentNode.ns = "svg";
              }

            }
            currentNode.tagName = tn;
          } else {

          }


          var bIsInput = false;
          if (dom.nodeName && dom.nodeName.toLowerCase() == "input") {
            bIsInput = true;
          }

          var vStr, iValue;
          if (bIsInput) {
            if (iValue = dom.getAttribute("data-input-value")) {
              currentNode.value = iValue;
              currentNode.valueParts = this.parseTemplateParts(iValue);
            }
          }
          if (dom.value && (!iValue)) {
            currentNode.value = dom.value;
            currentNode.valueParts = this.parseTemplateParts(currentNode.value);
          }

          if (dom.attributes) {

            for (var i = 0; i < dom.attributes.length; i++) {
              var attrib = dom.attributes[i];
              if (attrib.specified) {
                var name = attrib.name,
                  value = attrib.value;

                if (name.substring(0, 4) == "data") {
                  currentNode.dataAttrs[name] = value;
                }
                currentNode.attributes.push([name, value, this.parseTemplateParts(value)]);
              }
            }
          }




          if (!dom.childNodes || dom.childNodes.length == 0) {
            currentNode.text = dom.textContent;
            currentNode.txtParts = this.parseTemplateParts(currentNode.text);
          }

          var childNodes = dom.childNodes;
          if (childNodes) {
            var len = childNodes.length;
            for (var i = 0; i < len; i++) {
              var child = childNodes[i];

              var newChild = this.parseNode(child, ns);
              if (newChild) currentNode.children.push(newChild);

            }
          }

          var cs;
          if (currentNode && (cs = currentNode.dataAttrs["data-class-switch"])) {
            currentNode.useClass = true;

            currentNode.classSwitch = cs;

            for (var ii = 0; ii < currentNode.children.length; ii++) {
              var tempCandidate = currentNode.children[ii];
              if (tempCandidate.dataAttrs) {
                var cName = tempCandidate.dataAttrs["data-class"];
                if (cName) {
                  currentNode.classTemplates[cName] = tempCandidate;
                }
              }
            }
          }

          return currentNode;
        }
        _myTrait_.parseTemplateParts = function(str) {

          var tplParts = {
            list: null,
            tokens: {},
            bHas: false
          }

          if (!str || str.length == 0) return null;


          var list = tplParts.list = this.parseMustache(str);
          for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.length > 3 && (item.charAt(0) == "{") && (item.charAt(1) == "{")) {
              tplParts.bHas = true;
              var vName = item.substring(2, item.length - 2);
              tplParts.tokens[i] = vName;
            }
          }

          return tplParts;


        }
      }(this));
    }
    var templateCompiler = function(a, b, c, d, e, f, g, h) {
      if (this instanceof templateCompiler) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != templateCompiler._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new templateCompiler(a, b, c, d, e, f, g, h);
    };
    templateCompiler._classInfo = {
      name: 'templateCompiler'
    };
    templateCompiler.prototype = new templateCompiler_prototype();
    if (typeof(window) != 'undefined') window['templateCompiler'] = templateCompiler;
    if (typeof(window) != 'undefined') window['templateCompiler_prototype'] = templateCompiler_prototype;
    var _domAttrWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj, options) {

          if (!change || !targetObj) return;
          if (change[0] == 4) {
            var name = options.attrName,
              binds = options.binds,
              compiler = options.compiler,
              dom = targetObj;

            var prop = change[1];

            console.log("ATTR CHANGE ");
            console.log("Binds ", binds);

            // The old way:
            // targetObj.setAttribute(attrN, v);
            /*
           Object {    
                       list: Array[3], 
                       tokens: Object, 
                       bHas: true
                   }
                   bHas: true
                   list: Array[3]
                       0: "list-group-item "
                       1: "{{selected}}"
                       2: ""
                   length: 3
           */
            console.log("DOM ATTR worker binds ", binds);
            var list = binds.list,
              toks = binds.tokens,
              str = "";

            compiler.composeTokensToTxt(binds, obj, function(res) {
              console.log("Composed new attribute value for ", name);
              console.log(res);
              targetObj.setAttribute(name, res);
            });


          }

        }
      }(this));
    }
    var _domAttrWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _domAttrWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _domAttrWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _domAttrWorker(a, b, c, d, e, f, g, h);
    };
    _domAttrWorker._classInfo = {
      name: '_domAttrWorker'
    };
    _domAttrWorker.prototype = new _domAttrWorker_prototype();
    var _svgAttrWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj, attrN) {


          if (!change || !targetObj) return;
          if (change[0] == 4) {
            var prop = change[1];
            var v = obj.data[prop];
            targetObj.setAttributeNS(null, attrN, v);
          }

        }
      }(this));
    }
    var _svgAttrWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _svgAttrWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _svgAttrWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _svgAttrWorker(a, b, c, d, e, f, g, h);
    };
    _svgAttrWorker._classInfo = {
      name: '_svgAttrWorker'
    };
    _svgAttrWorker.prototype = new _svgAttrWorker_prototype();
    var _classWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj, myData) {


          if (!change || !targetObj) return;
          if (change[0] == 4) {

            var view = myData.view;

            var m = myData.m,
              t = myData.template;


            var subC = m.data[t.classSwitch],
              sT;
            if (!subC) {
              sT = t.classTemplates["default"];
            } else {
              sT = t.classTemplates[subC];
              if (!sT) sT = t.classTemplates["default"];
            }
            if (sT) {
              if (sT) {

                // this view replace does not work right now...

                var el = templateCompiler(); // ???
                //console.log("***** removing old workers *****");
                //console.log(view);

                //console.log("---");
                el._clearWorkers(view);
                //console.log("---");
                var up = _docUp();
                //console.log("---");

                // console.log("Compose template ", view.parentView, view);

                var parentDom = view.dom.parentNode;

                // => 
                // composeModelView( dom, ... da da da...)
                // var newDom = el.composeTemplate( m,  sT, view.parentView, view );
                var newDom = el.composeTemplate(m, sT, view);

                view.dom = newDom;

                //var parentDom = myData.dom.parentNode;
                parentDom.replaceChild(newDom, myData.dom);
                /*    
                      console.log("---");
                      */
                // add new worker to observe class changes to the new DOM instance
                var newWorker = up._createWorker(m.__id, t.classSwitch, _workers().fetch(5), newDom, {
                  view: view,
                  template: t,
                  m: m,
                  dom: newDom
                });
                view.workers.push(newWorker);

              }
            }

          }

        }
      }(this));
    }
    var _classWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _classWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _classWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _classWorker(a, b, c, d, e, f, g, h);
    };
    _classWorker._classInfo = {
      name: '_classWorker'
    };
    _classWorker.prototype = new _classWorker_prototype();
    var _customDirWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj, options) {

          if (!change || !targetObj) return;
          if (change[0] == 4) {

            var tpl = options.tpl,
              binds = options.binds,
              dataItem = options.model,
              name = options.name,
              dom = targetObj;

            var myVars = {},
              rawValue;
            if (binds) {
              var list = binds.list,
                toks = binds.tokens;
              for (var i = 0; i < list.length; i++) {
                var vName;
                if (vName = toks[i]) {
                  var val = "";
                  if (typeof(dataItem.data[vName]) != "undefined") {
                    val = dataItem.data[vName] || "";
                  }
                  myVars[vName] = val;
                  options.value = val
                }
              }
            }
            options.vars = myVars;

            templateCompiler()._callCustom(name, dom, options);

            /*
                  _customDirectives[name](dom, {
                      currentView : currentView,
                      model : dataItem,
                      binds : binds,
                      vars : myVars,
                      value : rawValue
                  });
           */

          }

        }
      }(this));
    }
    var _customDirWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _customDirWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _customDirWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _customDirWorker(a, b, c, d, e, f, g, h);
    };
    _customDirWorker._classInfo = {
      name: '_customDirWorker'
    };
    _customDirWorker.prototype = new _customDirWorker_prototype();
    var _listViewWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, viewObj, arrayDataObj) {

          if (!change || !viewObj) return;

          // insert
          if (change[0] == 7) {
            var tplB = templateCompiler();
            tplB.composeModelView(viewObj.dom, obj, viewObj);
          }

          // remove item from array...
          if (change[0] == 8) {

            var up = _docUp();

            var obj = up._find(change[2]),
              parent = up._find(change[4]),
              childNode = parseInt(change[2]);

            var i = 0,
              len = viewObj.childViews.length;

            console.log("Should remove ", obj);

            for (; i < len; i++) {
              var ww = viewObj.childViews[i];
              if (ww.dataid == change[2]) {
                console.log("Found the view to be removed");
                console.log(ww);
                up._removeView(ww);
                break;
              }
            }

            // The old solution removed ALL the views of the model:
            /*
               var viewOfModel = _docUp()._getModelViews( change[2] );
               console.log("The view model is ", viewOfModel);
               viewOfModel.forEach( function(view) {
                   // Removing all the views
                   console.log("Removing view ", view);
                   up._removeView( view );
               });
               */
          }

          // move object in list
          if (change[0] == 12) {

            var up = _docUp();
            var obj = up._find(change[1]),
              parent = up._find(change[4]),
              toIndex = parseInt(change[2]);

            var oldIndex = parseInt(change[3]);
            var viewDom = viewObj.dom;
            var itemToMove = viewDom.children[oldIndex];
            var itemParent;

            itemParent = itemToMove.parentNode;

            // moving the item...
            itemParent.removeChild(itemToMove);

            var oldItemAtPos = viewDom.children[toIndex];
            itemParent.insertBefore(itemToMove, oldItemAtPos);

            console.log("Moving the item ", viewObj);
            console.log("Old " + oldIndex + " new " + toIndex);
            // move item in the view list...   
            var theV = viewObj.childViews.splice(oldIndex, 1);

            console.log("theV ", theV, theV[0]);

            viewObj.childViews.splice(toIndex, 0, theV[0]);


          }


        }
      }(this));
    }
    var _listViewWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _listViewWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _listViewWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _listViewWorker(a, b, c, d, e, f, g, h);
    };
    _listViewWorker._classInfo = {
      name: '_listViewWorker'
    };
    _listViewWorker.prototype = new _listViewWorker_prototype();
    var _workers_prototype = function() {;
      (function(_myTrait_) {
        var _allWorkers;
        _myTrait_.fetch = function(index) {
          return _allWorkers[index];
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(t) {

          if (!_allWorkers) {

            _allWorkers = [
              null, // 
              _domTextWorker(), // 1
              _inputWorker(), // 2
              _domAttrWorker(), // 3
              _svgAttrWorker(), // 4
              _classWorker(), // 5
              _customDirWorker(), // 6
              _listViewWorker(), // 7
              _rawTextWorker(), // 8
              _templateWorker(), // 9
              _abstractWorker(), // 10
              _domIfWorker(), // 11
              _aceEditorWorker(), // 12
              _ifThenWorker(), // 13,
              _objectEventWorker() // 14
            ];


          }

        });
      }(this));
    }
    var _workers = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _workers) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _workers._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _workers(a, b, c, d, e, f, g, h);
    };
    _workers._classInfo = {
      name: '_workers'
    };
    _workers.prototype = new _workers_prototype();
    var _rawTextWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj, options) {

          if (!change || !targetObj) return;

          // how to create something new...
          if (change[0] == 4) {


            // console.log("*** worker for raw data going on ***");

            var tpl = options.tpl,
              dataItem = options.model,
              dom = targetObj;

            dataItem = _docUp()._find(options.modelid);

            // console.log(dom);
            var rawText = "";

            /*
               This function needs to create a raw text worker.
               
               For example, the contents of the script tag might be:
               
                background-color : {{bgColor}}px;
                font-size : {{smallFont}}px;
               
               */

            var list = tpl.txtParts.list,
              toks = tpl.txtParts.tokens;
            for (var i = 0; i < list.length; i++) {
              var vName;
              if (vName = toks[i]) {
                var val = "";
                if (typeof(dataItem.data[vName]) != "undefined") {
                  val = dataItem.data[vName] || "";
                }
                rawText += val;

              } else {
                rawText += list[i] || "";
              }
            }

            // console.log(rawText);

            if (dom.cssText) {
              dom.cssText = rawText;
            } else {
              // console.log("Should set the text content of style tag");
              dom.textContent = rawText;
            }
          }
        }
      }(this));
    }
    var _rawTextWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _rawTextWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _rawTextWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _rawTextWorker(a, b, c, d, e, f, g, h);
    };
    _rawTextWorker._classInfo = {
      name: '_rawTextWorker'
    };
    _rawTextWorker.prototype = new _rawTextWorker_prototype();
    var _templateWorker_prototype = function() {;
      (function(_myTrait_) {
        var _dataLink;
        _myTrait_.run = function(change, obj, targetObj, options) {

          if (!change || !targetObj) return;

          // how to create something new...
          if (change[0] == 4) {


            //  console.log("*** template worker composes the template again, if the value changes ***");

            var dataItem,
              compiler = options.compiler,
              vName = change[1], // the property that has changed
              newTemplateValue = change[2], // This is what to has to be compiled
              dom = targetObj;

            dataItem = _docUp()._find(options.modelid);

            // Now, there's a new set of workers, the old workers should be released...
            var jsTpl = compiler.compile(newTemplateValue);
            var subTplDOM = compiler.composeTemplate(dataItem, jsTpl);

            compiler._clearWorkers(options.view);

            // And then, you just have to switch the items...
            // TODO: clear all the workers...

            dom.parentNode.replaceChild(subTplDOM, dom);

            // dom.appendChild( subTplDOM );

            if (!_dataLink) _dataLink = _docUp();

            var myView = compiler.getViewForElem(subTplDOM);

            var w = _dataLink._createWorker(dataItem.__id, vName, _workers().fetch(9), subTplDOM, {
              modelid: dataItem.__id,
              compiler: compiler,
              view: myView
            });
            myView.workers.push(w);

          }
        }
      }(this));
    }
    var _templateWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _templateWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _templateWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _templateWorker(a, b, c, d, e, f, g, h);
    };
    _templateWorker._classInfo = {
      name: '_templateWorker'
    };
    _templateWorker.prototype = new _templateWorker_prototype();
    var _abstractWorker_prototype = function() {;
      (function(_myTrait_) {
        var _dataLink;
        _myTrait_.run = function(change, obj, targetObj, options1, options2) {

          if (!change || !targetObj) return;

          var options;
          if (options2) {
            options = options2;
          } else {
            options = options1;
          }

          var dataItem,
            fn = options.fn,
            callOpts = options.callOpts,
            vName = options.varName, // the property that has changed
            dom = options.dom;

          //console.log("---- abstract worker ");
          //console.log("Options ", options);
          //console.log("Options ", options2);
          //console.log("Target ", targetObj);
          //console.log("Old target ",options.dom);

          dataItem = _docUp()._find(options.modelid);

          if (dom.parentNode) {

            //console.log("Data item ", dataItem);
            //console.log("fn ", fn);

            var newDom = fn(dataItem.data[vName], {
              data: dataItem,
              view: callOpts.view,
              dom: dom.parentNode
            });

            dom.parentNode.replaceChild(newDom, dom);

            options.dom = newDom;
          } else {
            // console.log("No parent node!!!!!!!!!");
          }

          // If there is a set of workers but in this case we assume there is not...
          // var myView = compiler.getViewForElem( subTplDOM ); 
          // compiler._clearWorkers( options.view );



        }
      }(this));
    }
    var _abstractWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _abstractWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _abstractWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _abstractWorker(a, b, c, d, e, f, g, h);
    };
    _abstractWorker._classInfo = {
      name: '_abstractWorker'
    };
    _abstractWorker.prototype = new _abstractWorker_prototype();
    var _domIfWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj) {

          if (!change || !targetObj) return;

          var dom = targetObj;


          if (change[0] == 4) {
            var prop = change[1];
            var v = obj.data[prop];

            if (v) {
              var entryClass = dom.getAttribute("data-entry-class");
              dom.style.display = "block";
              if (entryClass) $(dom).addClass(entryClass);
              var exitClass = dom.getAttribute("data-exit-class");
              if (exitClass) $(dom).removeClass(exitClass);
            } else {
              var entryClass = dom.getAttribute("data-entry-class");
              if (entryClass) {
                $(dom).removeClass(entryClass);
              }

              var exitClass = dom.getAttribute("data-exit-class");
              if (exitClass) {
                $(dom).addClass(exitClass);
                setTimeout(function() {
                  dom.style.display = "none";
                }, 500);
              } else {
                dom.style.display = "none";
              }
            }

          }

        }
      }(this));
    }
    var _domIfWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _domIfWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _domIfWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _domIfWorker(a, b, c, d, e, f, g, h);
    };
    _domIfWorker._classInfo = {
      name: '_domIfWorker'
    };
    _domIfWorker.prototype = new _domIfWorker_prototype();
    var _aceEditorWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj, options) {


          if (!change) return;

          // how to create something new...
          if (change[0] == 4) {
            var editor = options.editor,
              dataItem = options.model,
              dom = targetObj;

            // options.modelid

            if (editor._noUpdates) {

            } else {


              var up = _docUp();

              if (!up.isDoingRemote()) {
                console.log("Should update the ACE editor value directly here... ");
                editor._noUpdates = true;
                editor.setValue(change[2], 1);
                editor._noUpdates = false;
              }
              //var s = editor.getSession();
              //var doc = s.getDocument();          

            }
          }

          if (change[0] == 13) {

            // options.modelid

            var editor = options.editor,
              dataItem = options.model,
              dom = targetObj;

            dataItem = _docUp()._find(options.modelid);
            // Deltas should be in the second var.
            /*
               var conv = aceCmdConvert();
               obj.data[prop] = conv.runToString( obj.data[prop], a[2]);    
               */

            var aceList = aceCmdConvert().runToAce(change[2]);

            editor._noUpdates = true;
            var s = editor.getSession();
            var doc = s.getDocument();
            //console.log(change,obj,targetObj);
            //console.log("... applying ... ");
            //console.log(aceList);
            doc.applyDeltas(aceList);
            editor._noUpdates = false;

          }

          /*
           
           */
        }
      }(this));
    }
    var _aceEditorWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _aceEditorWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _aceEditorWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _aceEditorWorker(a, b, c, d, e, f, g, h);
    };
    _aceEditorWorker._classInfo = {
      name: '_aceEditorWorker'
    };
    _aceEditorWorker.prototype = new _aceEditorWorker_prototype();
    var _ifThenWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj, options) {
          //console.log("******* if Then Worker ******");
          //console.log(change);
          //console.log(options);

          if (!change) return;

          // how to create something new...
          if (change[0] == 4) {


            //console.log("... should be doing something");
            // options.modelid
            var dom = targetObj;

            var up = _docUp();
            var dataItem = up._find(options.modelid);
            // Then, we can set the value...

            console.log("******* if Then Worker ******");
            console.log(options);

            if (options.thenCtrl) {

              console.log("==>Calling ctr");
              up._callController(options.thenCtrl, options.modelid, dom)


            }


          }

        }
      }(this));
    }
    var _ifThenWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _ifThenWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _ifThenWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _ifThenWorker(a, b, c, d, e, f, g, h);
    };
    _ifThenWorker._classInfo = {
      name: '_ifThenWorker'
    };
    _ifThenWorker.prototype = new _ifThenWorker_prototype();
    var _objectEventWorker_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.run = function(change, obj, targetObj, options, options2) {
          //console.log("******* if Then Worker ******");
          //console.log(change);
          //console.log(options);

          if (!change) return;

          // how to create something new...
          if (change[0] == 4) {
            // createPropertyUpdateFn

            // console.log("%c  set for objects, property updf ", "background:orange;color:white");

            var dom = targetObj;
            var up = _docUp();

            var dI = _data();
            dI.createPropertyUpdateFn(change[1], null);

            var dataItem = up._find(options.modelid);

            if (dataItem.__undone) return;

            if (options && options.eventObj) {
              if (change[3] != change[2]) {
                options.eventObj.trigger(change[1], change[2]);
              }
            }

          }

          if (options2) {
            var origOptions = options;
            options = options2;
          }


          if (change[0] == 5) {
            var up = _docUp();
            var dataItem = up._find(change[2]),
              dataItem2 = up._find(change[4]);

            if (dataItem.__undone) return;
            if (dataItem2.__undone) return;

            var dc = _data();

            if (dc.findFromCache(change[4])) {

              var dI = _data(change[4]),
                setObj = _data(change[2]),
                prop = change[1];

              if (!dI) return;
              if (!setObj) return;

              dI[prop] = setObj;
            }
            // could trigger some event here perhaps...   
          }

          // __removedAt
          if (change[0] == 8) {

            var dom = targetObj;
            var up = _docUp();
            var dataItem = up._find(change[2]);
            if (dataItem.__undone) return;

            if (options.bListenMVC && options.eventObj) {
              options.eventObj.trigger("remove", dataItem.__removedAt);
            }
          }

          // insert
          if (change[0] == 7) {

            var up = _docUp();

            var parentObj = up._find(change[4]),
              insertedObj = up._find(change[2]);

            if (parentObj.__undone) return;
            if (insertedObj.__undone) return;

            var index = parentObj.data.indexOf(insertedObj);

            if (options.bListenMVC && options.eventObj) {
              options.eventObj.trigger("insert", index);
            }
          }

          if (change[0] == 12) {

            var up = _docUp();

            var parentObj = up._find(change[4]),
              index = parseInt(change[2]),
              len = parentObj.data.length;

            if (parentObj.__undone) return;

            for (var i = 0; i < len; i++) {
              var m = parentObj.data[i];
              if (m.__id == change[1]) {
                targetObj = m;
                break;
              }
            }

            if (targetObj && targetObj.__undone) return;

            // move item, this may not be working as expected...
            var fromIndex = targetObj.__fromIndex; //  up._getExecInfo().fromIndex;

            // console.log("about to trigger move with ", targetObj, change[2], index, len, parentObj );

            if (targetObj) {
              var targetIndex = parseInt(change[2]);
              if (options.bListenMVC && options.eventObj) {
                // console.log("Triggering move ", fromIndex, targetIndex);
                options.eventObj.trigger("move", {
                  from: fromIndex,
                  to: targetIndex
                });
              }
            }
          }

        }
      }(this));
    }
    var _objectEventWorker = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _objectEventWorker) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _objectEventWorker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _objectEventWorker(a, b, c, d, e, f, g, h);
    };
    _objectEventWorker._classInfo = {
      name: '_objectEventWorker'
    };
    _objectEventWorker.prototype = new _objectEventWorker_prototype();
    var _data_prototype = function() {;
      (function(_myTrait_) {
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(t) {

        });
      }(this));;
      (function(_myTrait_) {
        var _eventOn;
        var _commands;
        var _authToken;
        var _authRandom;
        var _authUser;
        var _up;
        var _dataCache;
        var _createdFunctions;
        _myTrait_.__dataTr = function(t) {

        }
        _myTrait_._collectObject = function(me, what, cb) {
          if (!this.isArray(what)) what = what.split(",");

          var myData = {};
          what.forEach(
            function(n) {
              myData[n] = me[n]();
              me.on(n, function() {
                myData[n] = me[n]();
                console.log(n + " = " + me[n]() + " from " + me.getID());
                cb(myData);
              });
            }
          );
          cb(myData);
        }
        _myTrait_._copyAs = function(newFileName) {

          var me = this;

          var chData = me._channelInfo;
          if (!chData) return;

          var raw = this.toData();
          me._reGuidRawData(raw);

          var newCh = {
            ip: chData.ip,
            port: chData.port,
            sandbox: chData.sandbox,
            path: chData.path,
            file: newFileName,
            createWith: raw
          };

          var obj = _data({}, {
            channel: newCh
          });

          return obj;

        }
        _myTrait_._embedFileURL = function(name) {
          var url = name || this._findURL();
          var parts = this._parseURL(url);

          var metaURL = parts.protocol + "://" + parts.ip + ":" + parts.port + "/" + parts.sandbox + "/" + parts.path + "/" + this.getID() + ".embed";

          return metaURL;
        }
        _myTrait_._findActiveChannel = function(t) {

          if (this._activeChannel) {
            if (this._activeChannel) {
              return this._activeChannel;
            }
          }

          var p = this.parent();
          if (p) return p._findActiveChannel();
        }
        _myTrait_._findRootDoc = function(t) {

          if (this._isRootDoc) return this;

          var p = this.parent();
          if (p) return p._findRootDoc();
          return this;


        }
        _myTrait_._findURL = function(t) {

          var o = this;

          while (!o._docData.__radioURL) {
            o = o.parent();
          }

          if (o && o._docData && o._docData.__radioURL) return o._docData.__radioURL;

        }
        _myTrait_._forMembers = function(fn) {
          var me = this;

          if (this.isArray()) {
            for (var i = 0; i < this._data.length; i++) {
              var o = this._data[i];
              if (this.isObject(o)) {
                if (o.__dataTr) {
                  fn(o);
                }
              }
            }
          } else {
            this._members.forEach(function(n) {
              if (me[n]) fn(me[n]);
            });
          }
        }
        _myTrait_._getCommandHistory = function(t) {

          return _up._getCommandHistory(this._findURL());
        }
        _myTrait_._initializeData = function(docData, options) {


          // pointer to the docUp data
          this._data = docData.data;
          this._docData = docData;

          // __removedAt
          var worker = _up._createWorker(this._docData.__id,
            "*",
            _workers().fetch(14),
            null, {
              bListenMVC: true,
              modelid: this._docData.__id,
              eventObj: this
            });

          // The data to be used as initialising
          var data = docData.data;

          if (data instanceof Array) {

            for (var n in data) {

              // Rather dubious way of doing it, but let's try it...
              this[n] = _data(data[n]);

            }

          } else {

            for (var n in data) {

              if (data.hasOwnProperty(n)) {
                var v = data[n];

                //console.log("*** property ", n);

                // functions are here assumed to be variables from another object...
                if (this.isFunction(v)) {
                  // ???? Should we be emitting the function forward in this case, it should not be
                  // possible to have the function as data parameter in this case... maybe?
                  continue;
                }

                // _data

                if (!this.isFunction(v) && (v === Object(v) || (v instanceof Array))) {

                  this[n] = new _data(v, options);
                  continue;

                }

                // just plain member variable function setting 
                if (!this.isFunction(v) && !this.isObject(v) && !this.isArray(v)) {

                  // ....
                  if (!this[n]) {
                    this.createPropertyUpdateFn(n, v);
                  }

                }

              }
            }

          }

        }
        _myTrait_._makeEmbeddable = function(t) {

          // The root doc might just create a meta channel for itself...???? hard to say if this really
          // is working or not... the root doc could perhapse be linked, but right now it's not clear
          // if that works like for the normal documents
          if (!this._docData.__p) {
            console.error("ERROR: Can not make root document embeddable, it already is");
            return;
          }

          if (this._docData.__rid) {
            console.error("ERROR: The object is alrady remoted");
            return;
          }

          var url = this._findURL(),
            me = this;
          var copy = _data(this.serialize());

          copy.then(
            function() {

              var metaURL = copy._metaFileURL(url),
                embedURL = copy._embedFileURL(url);

              console.log("Might be creting");
              console.log("-", metaURL);
              console.log("-", embedURL);

              var simpleObj = _data({});
              simpleObj.then(function() {
                console.log("The command list of this object ");
                console.log(simpleObj._docData.__ctxCmdList);
              })


              return;

              var embedDoc = _data(embedURL, {
                createWith: copy.toData()
              });
              var metaDoc = _data(metaURL, {
                createWith: {
                  items: [{
                    channel: url
                  }]
                }
              });

              // When the embedded document channel has been created...
              embedDoc.then(function() {

              });

            });
        }
        _myTrait_._metaFileURL = function(name) {
          var url = name || this._findURL();
          var parts = this._parseURL(url);

          var metaURL = parts.protocol + "://" + parts.ip + ":" + parts.port + "/" + parts.sandbox + "/" + parts.path + "/" + this.getID() + ".ln";

          return metaURL;

        }
        _myTrait_._moveCmdListTo = function(newParent) {

          if (this.__cmdList && newParent) {
            var root = newParent._findRootDoc();
            if (root) {
              if (!root.__cmdList) root.__cmdList = [];
              if (!root.__ctxCmdList) root.__ctxCmdList = [];
              if (root == this) return;
              if (!root.__cmdList.concat) {
                console.log("*cmdlist*");
                console.log(JSON.stringify(root.__cmdList));
              }
              root.__cmdList = root.__cmdList.concat(this.__cmdList);
              this.__cmdList = [];
              root.__ctxCmdList = root.__ctxCmdList.concat(this.__ctxCmdList);
              this.__ctxCmdList = [];
            }
          }
        }
        _myTrait_._parseURL = function(url) {

          var parts1 = url.split("://");
          var protocol = parts1.shift(),
            rest = parts1.shift();
          var serverParts = rest.split("/"),
            ipAndPort = serverParts.shift(),
            iParts = ipAndPort.split(":"),
            ip = iParts[0],
            port = iParts[1],
            sandbox = serverParts.shift(),
            fileName = serverParts.pop(),
            path = serverParts.join("/");

          return {
            url: url,
            ip: ip,
            port: port,
            sandbox: sandbox,
            path: path,
            file: fileName,
            protocol: protocol
          };
        }
        _myTrait_._reGuidRawData = function(data) {

          console.log("_reGuidRawData");

          if (this.isArray(data)) {
            var me = this;
            data.forEach(function(i) {
              me._reGuidRawData(i)
            });
          } else {
            if (this.isObject(data)) {
              for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                if (n == "__id") {
                  console.log("Changing the __id");
                  data[n] = this.guid();
                  continue;
                }
                if (this.isObject(data[n])) this._reGuidRawData(data[n]);
                if (this.isArray(data[n])) this._reGuidRawData(data[n]);
              }
            }
          }
        }
        _myTrait_._setAuthToken = function(authUser, authPassword) {

          _authUser = authUser;
          _authToken = authPassword;


        }
        _myTrait_._setBroadcastManager = function(mgrObj) {

          this.__bcManager = mgrObj;
        }
        _myTrait_.addController = function(c) {
          if (!this._controllers)
            this._controllers = [];

          if (this._controllers.indexOf(c) >= 0) return;

          this._controllers.push(c);
        }
        _myTrait_.askChannelQuestion = function(question, data, cb) {


          var url = this._findURL();
          console.log("Asking, the URL was " + url);

          var doc = _docUp(url);

          doc.then(function() {
            console.log("Resolved the doc, asking the channel the question " + question);
            doc._ask(question, data, cb);
          });

          // var doc = docRadio(rl)


        }
        _myTrait_.at = function(i) {
          var ii = this._docData.data[i];
          if (ii) return _data(ii);
        }
        _myTrait_.clear = function(t) {
          var len = this.length();
          while (len--) {
            this.pop();
          }
        }
        _myTrait_.clone = function(t) {
          return _data(this.serialize());
        }
        _myTrait_.copyToData = function(t) {

          var raw = this.toData();
          this._reGuidRawData(raw);

          return raw;
        }
        _myTrait_.createArrayField = function(n, v, validators) {

          // ***** basicly, this is all that is required... perhaps...????
          // this[n] = _data(data[n]);

          var df,
            me = this;
          if (v._docData) {
            df = v;
          } else {
            df = _data(v);
          }

          var myPromise = _promise();

          //console.log("Entering the create field ");
          //console.log(df, me, n, v);

          if (me.hasOwn(n)) {
            //console.log("There already was field ", n);
            myPromise.resolve();
            return this;
          } else {
            //console.log("... the field should be created...");
            //console.log(df);
          }

          df.then(function() {
            _up.execCommand([5, n, df.getID(), null, me.getID()]).then(function() {
              myPromise.resolve();
            });
          });

          me[n] = df;

          return myPromise;

        }
        _myTrait_.createField = function(n, defaultValue) {

          this.set(n, defaultValue || null);

        }
        _myTrait_.createObjectField = function(n, v) {
          var df,
            me = this;
          if (v._docData) {
            df = v;
          } else {
            df = _data(v);
          }

          var myPromise = _promise();

          // console.log("Entering the create field ");
          // console.log(df, me, n, v);
          // this.createPropertyUpdateFn(n);

          if (me.hasOwn(n)) {
            //console.log("There already was field ", n);
            myPromise.resolve(false);
            return myPromise;
          } else {
            //console.log("... the field should be created...");
            //console.log(df);
          }

          df.then(function() {
            _up.execCommand([5, n, df.getID(), null, me.getID()]).then(function() {
              myPromise.resolve();
            });
          });

          me[n] = df;

          return myPromise;
        }
        _myTrait_.createPropertyUpdateFn = function(name, value) {

          // ???????? Could you just create the properties according to their prototypal values...???
          // *** The prototype might have room for one function and others could be placed in the upper
          // level functions.... pretty weird but still, possible...

          var me = this;
          if (!_myTrait_[name]) {
            _myTrait_[name] = function(value) {
              // NOTE: does not support delegating the functions anymore with
              // something like this.x = ...

              if (!this._docData) {
                //console.error("Does not have docdata");
                //console.log(this);
                return;
              }

              var d = this._docData.data;
              if (!d) return;

              if (typeof(value) == "undefined") {
                // var o = _up._find( me._data.__id);
                // find the object and return
                return d[name];
              }
              if (d[name] == value) return;
              if (!this._enterCtx(name)) return;
              _up.execCommand([4, name, value, null, this._docData.__id]);
              this._leaveCtx(name)
              return this;
            };
            _createdFunctions[name] = true;
          } else {
            // *** not possible to create the function or property for the object...?

          }


          return;

          // the "real" implementation....


          (function(n, v) {
            var datao = me._data;
            me[n] = function(value, getme) {

              if (getme) {
                return {
                  me: me,
                  name: n
                };
              }
              if (typeof(value) == "undefined") return datao[n];

              if (me.isFunction(value)) {
                if (!value._dataF) {
                  me.on(n, function(o, v) {
                    value(v);
                  });
                  return me;
                } else {
                  me[n] = value;
                  // here you should trigger the update event...
                  var oo = value(null, true);
                  oo.me.on(oo.name, function(o, newV) {
                    lastChange.item = me;
                    lastChange.field = oo.name;
                    lastChange.value = newV;
                    me.emitValue("childChange", lastChange);
                  });
                  return me;
                }
              }

              if (me._validators) {
                if (me._validators[n]) {

                  var msg;
                  if (msg = me._validators[n](value)) {
                    me.trigger("invalid-" + n, msg);
                    return me;
                  } else {
                    me.trigger("valid-" + n, value);
                  }
                }
              }

              if (!me._enterCtx(n)) return;

              var bChange = datao[n] != value;

              datao[n] = value;

              if (typeof(datao[n]) == "undefined" || bChange)
                me.saveCommand("set", n, value, datao[n]);

              // console.log("Setting", n, "on", me, "to ", value);
              if (bChange) {
                me.trigger(n, value);
                me.trigger("change", n);


                lastChange.item = me;
                lastChange.field = n;
                lastChange.value = value;
                me.emitValue("childChange", lastChange);
              }
              me._leaveCtx(n)
              return me;
            }
            me[n]._dataF = true;


          }(name, value));

          me.saveCommand("set", name, value, null);
        }
        _myTrait_.dbDefineSync = function(variables) {
          if (variables) {
            var me = this;
            variables.forEach(function(v) {
              var sv = me.dbFindSyncVar(v.name, true);
              for (var n in v) {
                if (v.hasOwnProperty(n)) {
                  sv[n] = v[n];
                }
              }
            });
          }
        }
        _myTrait_.dbFindSyncVar = function(name, createIfNotFound) {
          if (!this.__dbSync) {
            this.__dbSync = [];
          }

          var found,
            me = this;
          for (var i = 0; i < this.__dbSync.length; i++) {
            var v = this.__dbSync[i];
            if (v.name == name) return v;
          };

          if (createIfNotFound) {
            var v = {
              name: name,
              dirty: false
            };
            this.__dbSync.push(v);

            this.on(name, function(o, value) {
              v.dirty = true;
            });

          }
          return v;
        }
        _myTrait_.dbSync = function(t) {
          var found,
            me = this;

          // Q : how to report errors when saving...???

          for (var i = 0; i < this.__dbSync.length; i++) {
            var v = this.__dbSync[i];
            if (v.dirty) {
              if (v.syncFn) {
                if (!v.promises) v.promises = [];
                console.log("The variable ", v);
                v.promises.push(v.syncFn());
                v.dirty = false;
              }
            }
            // if(v.name==name) return v;
          };
        }
        _myTrait_.emitValue = function(scope, data) {
          if (this._processingEmit) return this;

          this._processingEmit = true;
          // adding controllers to the data...
          if (this._controllers) {
            var cnt = 0;
            for (var i = 0; i < this._controllers.length; i++) {
              var c = this._controllers[i];
              if (c[scope]) {
                c[scope](data);
                cnt++;
              }
            }

            // this._processingEmit = false;
            // Do not stop emitting the value to the parents...
            // if(cnt>0) return this;
          }

          /*
           if(this._controller) {
               if(this._controller[scope]) {
                  this._controller[scope](data);
                  return;
               }
           }
           */

          if (this._valueFn && this._valueFn[scope]) {
            this._valueFn[scope].forEach(function(fn) {
              fn(data);
            });
          }
          if (1) {
            if (this._parent) {
              if (!this._parent.emitValue) {
                // console.log("Strange... no emit value in ", this._parent);
              } else {
                this._parent.emitValue(scope, data);
              }
            }
          }
          this._processingEmit = false;
        }
        _myTrait_.extendWith = function(obj) {


          for (var n in obj) {
            var fn = obj[n];
            if (this.isFunction(fn)) {
              _myTrait_[n] = fn;
            }
          }
        }
        _myTrait_.find = function(path) {
          // should find the item from the path...

          console.log("*** find with " + path);

          var dataObj = _up._getObjectInPath(path, this._docData);

          if (dataObj) return _data(dataObj.__id);

          return null;
        }
        _myTrait_.findRootDocup = function(t) {

          var p = this,
            np;

          while (np = p.parent()) {
            p = np;
          }

          return _docUp(p._docData);
        }
        _myTrait_.forEach = function(fn) {

          // this[n]
          // here is the critical decision, do we keep the _data objects subitems in order or just
          // fetch them from the local index of all objects?

          // this is not safe because of the order may have changed...

          var p = _promise(),
            myProm = _promise(),
            list = [],
            me = this;

          if (this.isFulfilled()) {
            me._docData.data.forEach(function(d) {
              if (d.__undone) return;
              var item = _data(d);
              if (item.isFulfilled()) list.push(item);
            });
            list.forEach(function(i) {
              fn(i);
            })
            myProm.resolve(true);
            return myProm;
          }

          this.then(
            function() {

              me._docData.data.forEach(function(d) {
                if (d.__undone) return;
                list.push(_data(d));
              });

              p.all(list).then(function() {
                me._docData.data.forEach(function(data) {
                  if (data.__undone) return;
                  var d = _data(data);
                  fn(d);
                });
                myProm.resolve(true);
              });
              p.resolve(true);

            });



          return myProm;




        }
        _myTrait_.get = function(name) {

          if (this[name]) {
            if (this.isFunction(this[name]))
              return this[name]();
            return this[name];
          }
        }
        _myTrait_.getID = function(t) {

          return this._docData.__id;
        }
        _myTrait_.getRemoteID = function(t) {

          if (this._docData && this._docData.__rid) return this._docData.__rid;
        }
        _myTrait_.guid = function(t) {

          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
        }
        _myTrait_.hasOwn = function(name) {

          if (typeof(this._docData.data[name]) != "undefined") {
            return true;
          }
          return false;
        }
        _myTrait_.indexOf = function(t) {
          return _up.indexOf(this._docData);
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(data, options, notUsed, notUsed2) {


          if (!_up) _up = _docUp({});
          if (!_dataCache) {
            _dataCache = {};
            _createdFunctions = {};
          }
        });
        _myTrait_.insertAt = function(index, v) {



          this.push(v);
          var lastItem = this.at(this.length() - 1);

          _up.moveItemToPos(lastItem.getID(), index);

          return this;


          /*
               if(a[0]==12) {
                   var obj = this._find( a[4] ),
                       prop = "*",
                       len = obj.data.length,
                       targetObj,
                       i = 0;
                   
                   for(i=0; i< len; i++) {
                       var m = obj.data[i];
                       if(m.__id == a[1]) {
                           targetObj = m;
                           break;
                       }
                   }
                   
                   // Questions here:
                   // - should we move command list only on the parent object, not the child
                   //  =>  this._moveCmdListToParent(targetObj); could be
                   //      this._moveCmdListToParent(obj);
                   // That is... where the command is really saved???
                   // is the command actually written anywhere???
                   //  - where is the writeCommand?
                   // 
                   // Moving the object in the array
                   if(targetObj) {
                       var targetIndex = parseInt(a[2]);
                       
                       //console.log("==== MOVING ==== ", targetObj);
                       //console.log(i + "=> "+targetIndex);
                       
                       obj.data.splice(i, 1);
                       obj.data.splice(targetIndex, 0, targetObj);
                       this._cmd(a, obj, targetObj);
                       
                       if(!(isRemote || _isRemoteUpdate)) {
                           this.writeCommand(a);
                       }           
                       
                   }
               
               }
           */
        }
        _myTrait_.isArray = function(t) {

          if (typeof(t) == "undefined") {
            if (!this._docData) return false;
            if (!this._docData.data) return false;
            return this.isArray(this._docData.data);
          }
          return Object.prototype.toString.call(t) === '[object Array]';
        }
        _myTrait_.isDataTrait = function(obj) {

          if (obj._docData) return true;
        }
        _myTrait_.isFunction = function(fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        }
        _myTrait_.isObject = function(t) {

          if (typeof(t) == "undefined") {
            if (!this._docData) return false;
            if (!this._docData.data) return false;
            return this.isObject(this._docData.data);
          }

          return t === Object(t);
        }
        _myTrait_.item = function(i) {
          var ii = this._docData.data[i];
          if (ii) return _data(ii);
        }
        _myTrait_.keys = function(fn) {
          var i = 0;
          for (var n in this._docData.data) {
            fn(n, this._docData.data[n], this._docData.data);
            // fn( n, i++, this._docData.data );
          }

          return this;
        }
        _myTrait_.length = function(t) {
          if (!this._docData) return 0;
          if (!this._docData.data) return 0;
          return this._docData.data.length;
        }
        _myTrait_.moveDown = function(t) {
          _up.moveItemDown(this._docData.__id);
        }
        _myTrait_.moveToIndex = function(index) {

          _up.moveItemToPos(this._docData.__id, index);
          // moveItemToPos
        }
        _myTrait_.moveUp = function(t) {
          _up.moveItemUp(this._docData.__id);
        }
        _myTrait_.onValue = function(scope, fn) {
          if (!this._valueFn) {
            this._valueFn = {};
          }
          if (!this._valueFn[scope])
            this._valueFn[scope] = [];

          if (this._valueFn[scope].indexOf(fn) < 0)
            this._valueFn[scope].push(fn);
        }
        _myTrait_.parent = function(p) {

          if (typeof(p) != "undefined") {
            console.error("setting parent is not implemented");
            return this;
          }
          if (!this._docData) {
            return;
          }

          var p = this._docData.__p;
          if (p) return _data(p);



        }
        _myTrait_.pick = function(what) {

          var stream = simpleStream();
          var me = this;

          this.then(
            function() {
              console.log("About to collect ", what);

              me._collectObject(me, what, function(data) {
                console.log("Got " + data);
                stream.pushValue(data);
              });
            });

          return stream;
        }
        _myTrait_.pop = function(t) {

          var len = this.length();
          if (len) {
            var it = this.at(len - 1);
            it.remove();
            return it;
          }
        }
        _myTrait_.push = function(newData) {

          var myPromise = _promise();
          if (newData.then) {
            var myDoc = this._docData;
            newData.then(
              function() {
                newData = newData._docData;
                _up.push(myDoc, newData).then(function() {
                  myPromise.resolve(true);
                });
              });
            return myPromise;
            // newData = newData._docData;
          }
          var me = this;
          this.then(
            function() {
              _up.push(me._docData, newData).then(function() {
                myPromise.resolve(true);
              });
            });

          return myPromise;

        }
        _myTrait_.pushRemote = function(URL, objID) {

          if (this.isArray()) {
            var newId = this.guid();
            _docUp().execCommand([16, URL, objID, newId, this.getID()]);
          }
          return this;

        }
        _myTrait_.remove = function(t) {

          console.log("Removing cmd for ", this._docData.__id);
          _up.removeItem(this._docData.__id);

          return this;

          /*
           if(this.isObject(i)) {
               var obj = i;
               i = this._data.indexOf(obj);
               if(i<0) return this;
           }
           
           this._removedItem = this._data[i];
           this._data.splice(i,1);
           this.trigger("remove", i);     
           
           lastChange.item  = this._removedItem;
           lastChange.field = i;
           lastChange.value = null;
           lastChange.type ="remove";
           
           this.emitValue("childChange", lastChange);
           
           return this;
           */
        }
        _myTrait_.removeListener = function(eventName, fn) {
          if (this._events && this._events[eventName]) {
            var i = this._events[eventName].indexOf(fn);
            if (i >= 0) this._events[eventName].splice(i, 1);
            if (this._events[eventName].length == 0) {
              delete this._events[eventName];
            }
          }
        }
        _myTrait_.renderTemplate = function(tplData) {

          var comp = templateCompiler();
          var jsonTplData = comp.compile(tplData);
          var dom = comp.composeTemplate(this._docData, jsonTplData);

          return dom;
        }
        _myTrait_.restackOps = function(input) {
          var cmds = [],
            windowSize = 5;

          function result(dist, data, from, to, parent) {
            return {
              dist: dist,
              data: data,
              from: from,
              to: to,
              parent: parent
            };
          }

          function totalDist(data) {
            return data.reduce(function(previousValue, currentValue, index, array) {
              return previousValue + Math.abs(index - currentValue);
            }, 0);
          }

          // Copyright Otto Chrons, otto@chrons.me
          function restack(input) {
            var data = input.slice(0);
            console.log("data:", data);
            var size = data.length;
            var iterations = size;
            var minDist = totalDist(data);
            var prevResults = [result(minDist, input, 0, 0, null)]

            while (minDist > 0 && iterations > 0) {
              var results = [];
              prevResults.forEach(function(pr) {
                minDist = pr.dist;
                var a = pr.data;
                for (var from = 0; from < size; from++) {
                  for (var to = 0; to < size + 1; to++) {
                    var t = a.slice(0);
                    var x = t.splice(from, 1);
                    if (to < from) t.splice(to, 0, x[0]);
                    else t.splice(to - 1, 0, x[0]);
                    var d = totalDist(t);
                    if (results.length < windowSize || d < minDist) {
                      var r = result(d, t, from, to, pr);
                      results.push(r);
                      if (results.length > windowSize) {
                        results.sort(function(r1, r2) {
                          return r1.dist - r2.dist;
                        });
                        results = results.slice(0, results.length - 1);
                      }
                      minDist = results.reduce(function(md, r) {
                        return Math.max(md, r.dist);
                      }, 0);
                    }
                  }
                }
              });
              //console.log("Results", results);
              prevResults = results;
              iterations--;
              minDist = results.reduce(function(md, r) {
                return Math.min(md, r.dist);
              }, 1);
              //console.log("minDist "+minDist);
            }
            if (!results) return;
            // replay operations
            var bestResult = results.filter(function(r) {
              return r.dist == 0;
            })[0]
            var ops = [bestResult];
            while (bestResult.parent != null) {
              ops.push(bestResult.parent);
              bestResult = bestResult.parent;
            }
            ops.reverse();
            // skip first
            ops.slice(1).forEach(function(op) {
              if (op.to == op.parent.data.length) {
                cmds.push(["b", op.parent.data[op.from], op.parent.data[op.to - 1]]);
                // console.log("cmd", "b " + op.parent.data[op.from] + " " + op.parent.data[op.to - 1]);
              } else {
                cmds.push(["a", op.parent.data[op.from], op.parent.data[op.to]]);
                // console.log("cmd", "a " + op.parent.data[op.from] + " " + op.parent.data[op.to]);
              }
            });
            //console.log("data:", data);
            //console.log("iterations: ", ops.length - 1);
            return data; // actually the return value is not used for anything
          }
          restack(input);

          return cmds;

        }
        _myTrait_.restackOps2 = function(input) {
          var moveCnt = 0,
            cmds = [];

          function restack(input) {
            var data = input.slice(0);
            var dataIn = input.slice(0);
            var goalIn = input.slice(0).sort(function(a, b) {
              return a - b;
            });
            //console.log("data:", data);
            //console.log("goal:", goalIn);

            var mapper = {};
            var indexes = {};
            // Testing this kind of simple system...
            for (var i = 0; i < dataIn.length; i++) {
              var mm = goalIn.indexOf(dataIn[i]);
              mapper[dataIn[i]] = mm;
              indexes[mm] = dataIn[i];
              data[i] = mm;
            }

            var goal = data.slice(0).sort(function(a, b) {
              return a - b;
            });

            var minValue = data[0],
              maxValue = data[0],
              partDiffs = [],
              partCum = 0,
              avgDiff = function() {
                var i = 0;
                len = data.length, df = 0;
                for (; i < len; i++) {
                  var v = data[i];
                  if (v > maxValue) maxValue = v;
                  if (v < minValue) minValue = v;
                  if (i > 0) partDiffs.push(goal[i] - goal[i - 1]);
                  if (i > 0) partCum += Math.abs(goal[i] - goal[i - 1]);
                  df += Math.abs(v - goal[i]);
                }
                partCum = partCum / len;
                return df / len;
              }();

            partDiffs.sort(function(a, b) {
              return a - b;
            });
            var minDelta = partDiffs[0];

            // collects one "acceptable" array 
            var accept = function(fn) {
              var collect = function(i, sx, last) {
                var res = [];
                var len = data.length;
                if (!sx) sx = 0;
                for (; i < len; i++) {
                  var v = data[i];
                  if ((v - last) == 1) {
                    res.push(v);
                    last = v;
                    continue;
                  }
                  var gi = i + sx;
                  if (gi < 0) gi = 0;
                  if (gi >= len) gi = len - 1;
                  if (fn(v, goal[gi], v, last, i, len)) {
                    if ((data[i + 1] && data[i + 1] < v && data[i + 1] > last)) {
                      // skip, if next should be taken instead 
                    } else {
                      res.push(v);
                      last = v;
                    }
                  }
                }
                return res;
              }

              var m = [];
              var ii = 0,
                a = 0;
              // small tricks to improve the algo, just for comp's sake...
              while (a < 0.1) {
                for (var sx = -5; sx <= 5; sx++)
                  m.push(collect(Math.floor(data.length * a), sx, minValue - 1));
                a += 0.05;
              }
              m.sort(function(a, b) {
                return b.length - a.length;
              });
              return m[0];
            };

            // different search agents...
            var test = [
              accept(function(dv, gv, v, last, i, len) {
                // console.log(Math.abs(v-last)+" vs "+partCum);
                if (v < last) return false;
                if (i > 0)
                  if (Math.abs(v - last) > partDiffs[i - 1]) return false;
                if (Math.abs(v - last) > avgDiff) return false;
                if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
                if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v < last) return false;
                if (Math.abs(v - last) > avgDiff) return false;
                if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
                if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v < last) return false;
                if (Math.abs(v - last) > avgDiff) return false;
                if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
                if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v < last) return false;
                if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
                if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v < last) return false;
                if (Math.abs(dv - gv) <= avgDiff && v >= last) return true;
                if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v < last) return false;
                if (Math.abs(v - last) < partCum) return true;
                if (Math.abs(dv - gv) <= partCum && v >= last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v > last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v < last) return false;
                if (Math.abs(v - last) > avgDiff) return false;
                if (Math.abs(dv - gv) <= avgDiff && v >= last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v < last) return false;
                if (i > 0)
                  if (Math.abs(v - last) > avgDiff) return false;
                if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
                if (i > 0)
                  if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
                return false;
              }),
              accept(function(dv, gv, v, last, i, len) {
                if (v < last) return false;
                if (last >= minValue) {
                  if (v >= last) return true;
                } else {
                  if (v == minValue) return true;
                }
                return false;
              })
            ];


            // choose between algorithms
            var okVals = [],
              maxSet = 0;
            for (var i = 0; i < test.length; i++) {
              var set = test[i];
              if (set.length > maxSet) {
                okVals = set;
                maxSet = set.length;
              }
            }
            // if nothing, take something
            if (okVals.length == 0) okVals = [goal[Math.floor(goal.length / 2)]];

            // divide the list to big and small
            var big = [],
              small = [];
            var divide = function() {
              var min = minValue,
                max = okVals[0],
                okLen = okVals.length,
                oki = data.indexOf(max),
                index = 0;

              var i = 0;
              len = data.length;
              for (; i < len; i++) {
                var v = data[i];
                if (v >= min && v <= max && (i <= oki)) {
                  big.push(v);
                  min = v;
                } else {
                  small.push(v);
                }
                if (v == max) {
                  min = v;
                  if (index < okLen - 1) {
                    index++;
                    max = okVals[index];
                    oki = data.indexOf(max);
                  } else {
                    max = maxValue;
                    oki = len + 1;
                  }
                }
              }

            }();

            // sort the small list before joining them
            small.sort(function(a, b) {
              return a - b;
            });

            //console.log(big);
            //console.log(small);

            var joinThem = function() {
              var si = 0,
                bi = 0,
                lastb = big[0],
                slen = small.length;
              while (si < slen) {
                var b = big[bi],
                  s = small[si];
                if (typeof(b) == "undefined") {
                  while (si < slen) {
                    cmds.push(["b", indexes[s], indexes[lastb]]);
                    // restackXBelowY(dataIn, indexes[s], indexes[lastb]);
                    lastb = s;
                    si++;
                    s = small[si]
                  }
                  return;
                }
                if (b < s) {
                  // console.log("B was smaller");
                  lastb = b;
                  bi++;
                } else {
                  cmds.push(["a", indexes[s], indexes[b]]);
                  // restackXAboveY(dataIn, indexes[s], indexes[b]);
                  si++;
                }
              }
            }();

            // console.log(dataIn);
            return data; // actually the return value is not used for anything    

          }
          restack(input);

          return cmds;

        }
        _myTrait_.serialize = function(nonRecursive) {
          var o, me = this,
            data = this._docData.data;
          if (this.isArray(this._data)) {
            o = [];
          } else {
            o = {};
          }

          for (var n in data) {
            if (data.hasOwnProperty(n)) {
              var v = data[n];
              if (typeof(v) == "undefined") continue;
              if (nonRecursive) {
                if (this.isObject(v) || this.isArray(v)) continue;
              }
              if (this.isObject(v)) {
                o[n] = _data(v).serialize();
              } else {
                o[n] = v;
              }
            }
          }

          return o;
        }
        _myTrait_.set = function(name, value) {
          /*
           Replace with _up.set()
           
           */

          var p = _promise();
          // can it 
          if (this.isFunction(value)) {
            // does it work like this???
            var me = this;
            return this.then(function() {
              return me.set(name, value(me.get(name)));
            });
          };



          if (this.isFulfilled()) {
            return _up.execCommand([4, name, value, null, this._docData.__id]);
          }


          var me = this;

          // TODO: check of the value is object or array...
          if (!_createdFunctions[name] && !this.isObject(value)) {
            this.createPropertyUpdateFn(name, value);
          }

          this.then(function() {
            _up.execCommand([4, name, value, null, me._docData.__id]).then(function() {
              p.resolve(true);
            });
          });

          return p;

        }
        _myTrait_.toData = function(nonRecursive) {

          var str = JSON.stringify(this._docData);
          var data = JSON.parse(str);

          if (data.__ctxCmdList) delete data.__ctxCmdList;
          if (data.__cmdList) delete data.__cmdList;

          return data;
        }
        _myTrait_.toPlainData = function(nonRecursive) {
          var o, me = this,
            data = this._docData.data;
          if (this.isArray(this._data)) {
            o = [];
          } else {
            o = {};
          }

          for (var n in data) {
            if (data.hasOwnProperty(n)) {
              var v = data[n];
              if (typeof(v) == "undefined") continue;
              if (nonRecursive) {
                if (this.isObject(v) || this.isArray(v)) continue;
              }
              if (this.isObject(v)) {
                o[n] = _data(v).toPlainData();
              } else {
                o[n] = v;
              }
            }
          }

          return o;
        }
        _myTrait_.unset = function(name) {

          _up.unset(this._docData.__id, name);

          return this;

        }
        _myTrait_.updateData = function(data) {
          var me = this;
          var lastChange = {};
          if (data instanceof Array) {
            //console.log("Updating array with ",data);

            // array update is not trivial task to do.... :/

            // let's try this harder way...

            var bCouldUpdate = true,
              objIndex = {};

            this.forEach(function(i) {
              if (!i.id) {
                bCouldUpdate = false;
              } else {
                objIndex[i.id()] = i;
              }
            });
            data.forEach(function(i) {
              if (!i.id) bCouldUpdate = false;
            });

            if (bCouldUpdate) {
              // console.log("Update is possible for data ", data);
              // NOTE: TODO: there could be a new sort-order... this is not implemented in
              // the update function yet...

              for (var i = 0; i < data.length; i++) {
                var dataObj = data[i];
                var obj = objIndex[dataObj.id];
                if (obj) {
                  obj.updateData(dataObj);
                } else {
                  me.push(dataObj);
                }
              }
            } else {
              console.log("Was not able to update data ", data);
            }

            if (!bCouldUpdate) {
              me.clear();

              for (var n in data) {
                //console.log("Index... ",n);
                var v = data[n];
                //console.log("Object... ",v);
                if (!this.isFunction(v) && (v === Object(v) || (v instanceof Array))) {

                  //console.log("push... and create a new object starts");
                  me.push(v);
                  //console.log("******* Pushed new data, currently I am ", me);
                  /*
                           // The update of array is not this easy...
                           if(me._data[n]) {
                               console.log("Index ",n," with updateData");
                               me._data[n].updateData(v);    
                           } else {
                               console.log("index ",n," creating a new data object " );
                               me._data[n] = new _data(v, me._validators);
                               me._data[n].parent(this);
                               this._members.push(n);
                               console.log(me._data);
                           }
                           */
                } else {
                  //console.log("push...2");
                  // create a new object if necessary...???
                  me.push(v);

                  //console.log("v was not object, currently I am ", me);
                  /*
                           // there is not trigger here if the item changes???
                           if(v != this._data[n]) {
                               this._data[n] = v;
                               this.trigger("replace", n);   
                           }
                           */
                }
              }
            }

          } else {
            //console.log("Updating object");
            for (var n in data) {
              if (data.hasOwnProperty(n)) {
                var v = data[n];

                if (!this.isFunction(v) &&
                  !(v instanceof Array) && v === Object(v) && !(v.constructor === Object)) {
                  // if object but NOT plain object, update date is not used here
                  continue;
                }

                if (!this.isFunction(v) && (v === Object(v) || (v instanceof Array))) {

                  if (this[n]) {
                    if (this[n].updateData)
                      this[n].updateData(v);
                  } else {
                    this[n] = new _data(v);
                    this[n].parent(this);
                    this._members.push(n);
                    this.saveCommand("setMember", n, this[n]._guid, null);
                  }
                } else {
                  // the basic...


                  if (me[n]) {
                    me[n](v);
                  } else {
                    // if no function defined, create it
                    // this._data[n] = v;
                    me.createPropertyUpdateFn(n, v);
                    this[n](v);

                  }
                }
              }
            }

          }
        }
        _myTrait_.validatorFor = function(varName, fn) {
          if (!this._validators) {
            this._validators = {};
          }

          this._validators[varName] = fn
        }
      }(this));;
      (function(_myTrait_) {
        var _callContext;
        _myTrait_._enterCtx = function(fname) {

          if (!_callContext) {
            _callContext = {
              active: {}
            };
          }
          if (!this.__lid) this.__lid = this.guid();

          var id = this.__lid + fname;
          if (!_callContext.active[id]) {
            _callContext.active[id] = 1;
            return true;
          } else {
            // console.error("**** RECURSION PREVENTED **** ", id);
            return false;
          }
        }
        _myTrait_._getCtx = function(t) {
          var o = {},
            a = _callContext.active;
          for (var n in a) {
            if (a.hasOwnProperty(n)) o[n] = a[n];
          }
          return o;
        }
        _myTrait_._leaveCtx = function(fname) {
          var id = this.__lid + fname;
          if (_callContext.active[id]) {
            delete _callContext.active[id];
          }

        }
        _myTrait_._resetCtx = function(t) {
          _callContext.active = {};
        }
        _myTrait_._setCtx = function(ctx) {
          _callContext.active = ctx;
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(t) {

          // create local id
          this.__lid = this.guid();

          if (!_callContext) {
            _callContext = {
              active: {}
            };
          }

        });
      }(this));;
      (function(_myTrait_) {
        var _eventOn;
        var _up;
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(t) {

          if (!_eventOn) _eventOn = [];
          if (!_up) _up = _docUp();
        });
        _myTrait_.on = function(eventName, fn) {
          if (!this._events) this._events = {};
          if (!this._events[eventName]) this._events[eventName] = [];
          this._events[eventName].push(fn);

          // This might remove the old event...
          var me = this;
          fn._unbindEvent = function() {
            // console.log("unbindEvent called");
            me.removeListener(eventName, fn);
          }
          /*
           var worker = _up._createWorker( this._docData.__id,  
                                           eventName, 	
                                           _workers().fetch(14),
                                           null,
                                           {
                                               modelid : this._docData.__id,
                                               eventName : eventName,
                                               eventObj : this
                                           } );
           
           */


        }
        _myTrait_.removeListener = function(eventName, fn) {
          if (this._events && this._events[eventName]) {
            var i = this._events[eventName].indexOf(fn);
            if (i >= 0) this._events[eventName].splice(i, 1);
            if (this._events[eventName].length == 0) {
              delete this._events[eventName];
            }
          }
        }
        _myTrait_.trigger = function(eventName, data) {
          if (_eventOn.indexOf(eventName + this._guid) >= 0) {
            return;
          }

          if (this._events && this._events[eventName]) {
            var el = this._events[eventName],
              me = this;
            _eventOn.push(eventName + this._guid);
            var len = el.length;
            for (var i = 0; i < len; i++) {
              el[i](me, data);
            }

            var mi = _eventOn.indexOf(eventName + this._guid);
            _eventOn.splice(mi, 1);
            // console.log("The event array", _eventOn);
          }
        }
      }(this));;
      (function(_myTrait_) {
        var _commands;
        var _objectCache;
        var _cmdIndex;
        var _lastCmdId;
        var _lastCmdVals;
        var _objSetValCmds;
        var _commandListener;
        var _isRemoteUpdate;
        var _hotObjects;
        var _hotSettings;
        var _hotDocs;
        var _incomingDataFn;
        _myTrait_._askSnapshot = function(bUseRawData) {

          var root = this.findRootDocup();
          root._askSnapshot(true);


        }
        _myTrait_._broadcastToCmdChannels = function(cmdList) {

          if (this._cmdChannels) {
            console.log("Channels", this._cmdChannels);
            this._cmdChannels.forEach(function(ch) {
              ch.broadcast(cmdList);
            });
          } else {
            //console.log("**** NO CHANNELS *****");
            //console.log(this);
          }
        }
        _myTrait_._clearCmdCache = function(t) {
          _objectCache = {};
          _commands = [];

        }
        _myTrait_._removeFromCache = function(obj) {

          console.error("_removeFromCache not implemented ");
          return;

          if (!obj) {
            var me = this;
            this._forMembers(function(m) {
              if (m) m._removeFromCache();
            });
            this._removeFromCache(this);
          } else {

            if (this.isObject(obj)) {
              var g = obj._guid;
              if (g) {
                console.log("*** removing " + g);
                delete _objectCache[g];
              }
            } else {
              if (obj) {
                console.log("*** removing " + obj);
                delete _objectCache[obj];
              }
            }
          }
        }
        _myTrait_._sendToInListeners = function(data) {

          console.error("_sendToInListeners not implemented");
        }
        _myTrait_.addToCache = function(id, obj) {

          if (!_objectCache) _objectCache = {};

          if (id) {
            _objectCache[id] = obj;
          }
        }
        _myTrait_.execCommands = function(cmdList) {
          console.error("execCommands not implemented");
        }
        _myTrait_.findFromCache = function(guid) {

          if (!_objectCache) return;

          return _objectCache[guid];
        }
        _myTrait_.getObjectCache = function(t) {
          return _objectCache;
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(t) {

        });
        _myTrait_.isRecordingCommands = function(t) {
          console.error("isRecordingCommands not implemented");
        }
        _myTrait_.saveCommand = function(action, property, value, oldValue) {

          console.error("saveCommand not implemented");
          return;

        }
        _myTrait_.setCommandRecOnOff = function(b) {
          console.error("setCommandRecOnOff not implemented");
          return;
        }
      }(this));;
      (function(_myTrait_) {
        var _up;
        var _factoryProperties;
        var _registry;
        _myTrait_._addFactoryProperty = function(name) {
          if (!_factoryProperties) _factoryProperties = [];
          _factoryProperties.push(name);
        }
        if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = []
        _myTrait_.__factoryClass.push(function(data) {

          if (this.isObject(data)) {
            if (data.data && data.__id) {
              var oo = this.findFromCache(data.__id);
              if (oo) {
                // console.log("did find object "+data.__id+" from cache");
                return oo;
              }
            }
          } else {
            // console.log("_data classfactory ", data);
            var oo = this.findFromCache(data);
            if (oo) {
              // console.log("_data classfactory did find ", data);
              // console.log("did find object "+data+" from cache (using id)");
              return oo;
            } else {
              //console.log("_data classfactory did NOT find ", data);
            }
          }

          if (_factoryProperties && _registry) {
            for (var i = 0; i < _factoryProperties.length; i++) {
              var pn = _factoryProperties[i];
              var name;

              if (data && data.data) {

                name = data.data[pn];
              } else {
                if (data) name = data[pn];
              }

              if (name) {
                cf = _registry[name];
                if (cf) {
                  return cf;
                }
              }
            }
          }


          if (data && data.__m) {
            var name = data.__m,
              cf = _registry[name];
            return cf;
          }
        });
        _myTrait_.callMe = function(t) {
          alert(t);
        }
        _myTrait_.createSubClass = function(propertyName, className, classConstructor) {


          // resStr+=cName+"_prototype.prototype = "+compileInfo.inheritFrom+".prototype\n";

          var myDataClass_prototype = classConstructor;

          var myDataClass = function(a, b, c, d, e, f, g, h) {
            if (this instanceof myDataClass) {
              console.log("is instance of...");
              console.log(this.__traitInit);
              var args = [a, b, c, d, e, f, g, h];
              if (this.__factoryClass) {
                var m = this;
                var res;
                this.__factoryClass.forEach(function(initF) {
                  res = initF.apply(m, args);
                });
                if (Object.prototype.toString.call(res) == '[object Function]') {
                  if (res._classInfo.name != myDataClass._classInfo.name) return new res(a, b, c, d, e, f, g, h);
                } else {
                  if (res) return res;
                }
              }
              if (this.__traitInit) {
                console.log("Calling the subclass trait init...");
                var m = this;
                this.__traitInit.forEach(function(initF) {
                  initF.apply(m, args);
                })
              } else {
                if (typeof this.init == 'function')
                  this.init.apply(this, args);
              }
            } else {
              console.log("NOT instance of...");
              return new myDataClass(a, b, c, d, e, f, g, h);
            }
          }
          myDataClass._classInfo = {
            name: this.guid()
          };

          myDataClass_prototype.prototype = _data.prototype;
          myDataClass.prototype = new myDataClass_prototype();

          this.registerComponent(className, myDataClass);
          this._addFactoryProperty(propertyName);


          return myDataClass;


        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(data, options) {

          // getting the data from the docup...
          //console.log("_data init ", data);
          //console.trace();

          if (!_up) {
            _up = _docUp({});
          }
          var myData,
            myDoc,
            me = this;

          if (!data) {
            me.resolve(true);
            return;
          }



          if (data && data.__id) {
            if (_up._find(data.__id)) {

              // console.log("**** data found, initializing **** ");
              //console.log(JSON.parse(JSON.stringify( data) ));        
              me._initializeData(data);
              me.addToCache(data.__id, me);
              me.resolve(true);
              return;
            }
          }

          // console.log("**** did not find the "+data.__id+" **** ");

          if (data && data.__rid) {
            var remData = _up._find(data.__rid);
            if (remData) {

              //console.log("**** remData was data found, not yet, initializing **** ");
              //console.log(JSON.parse(JSON.stringify( remData ) ));        
              //me._initializeData(data);
              //me.addToCache( data.__id, me );    
              //me.resolve(true);       
              //return;
            }
          }


          myDoc = _docUp(data, options);

          myDoc.then(function() {

            myData = myDoc.getData();

            // it could be a remote data too
            me._initializeData(myData);
            me.addToCache(myData.__id, me);
            me.resolve(true);
          });



          /*
me.resolve(true); 
*/


        });
        _myTrait_.registerComponent = function(name, classDef) {

          if (!_registry) _registry = {};

          if (!_registry[name]) {
            _registry[name] = classDef;
          }
        }
      }(this));
    }
    _data_prototype.prototype = _promise.prototype
    var _data = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _data) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _data._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _data(a, b, c, d, e, f, g, h);
    };
    _data._classInfo = {
      name: '_data'
    };
    _data.prototype = new _data_prototype();
    if (typeof(window) != 'undefined') window['_data'] = _data;
    if (typeof(window) != 'undefined') window['_data_prototype'] = _data_prototype;;
    (function(_myTrait_) {
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(main) {

      });
    }(this));
  }
  var templatePackage = function(a, b, c, d, e, f, g, h) {
    if (this instanceof templatePackage) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != templatePackage._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new templatePackage(a, b, c, d, e, f, g, h);
  };
  templatePackage._classInfo = {
    name: 'templatePackage'
  };
  templatePackage.prototype = new templatePackage_prototype();
  if (typeof(window) != 'undefined') window['templatePackage'] = templatePackage;
  if (typeof(window) != 'undefined') window['templatePackage_prototype'] = templatePackage_prototype;
  var docRadio_prototype = function() {
    var _promise_prototype = function() {
      'use strict';
      var later_prototype = function() {;
        (function(_myTrait_) {
          var _initDone;
          var _callers;
          var _oneTimers;
          var _everies;
          var _framers;
          _myTrait_.add = function(fn, thisObj, args) {
            if (thisObj || args) {
              var tArgs;
              if (Object.prototype.toString.call(args) === '[object Array]') {
                tArgs = args;
              } else {
                tArgs = Array.prototype.slice.call(arguments, 2);
                if (!tArgs) tArgs = [];
              }
              _callers.push([thisObj, fn, tArgs]);
            } else {
              _callers.push(fn);
            }
          }
          _myTrait_.after = function(seconds, fn, name) {

            if (!name) {
              name = "time" + (new Date()).getTime() + Math.random(10000000);
            }

            _everies[name] = {
              step: Math.floor(seconds * 1000),
              fn: fn,
              nextTime: 0,
              remove: true
            };
          }
          _myTrait_.asap = function(fn) {
            this.add(fn);

          }
          _myTrait_.every = function(seconds, fn, name) {

            if (!name) {
              name = "time" + (new Date()).getTime() + Math.random(10000000);
            }

            _everies[name] = {
              step: Math.floor(seconds * 1000),
              fn: fn,
              nextTime: 0
            };
          }
          if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
            _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
          if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
          _myTrait_.__traitInit.push(function(interval, fn) {
            if (!_initDone) {

              this.polyfill();

              var frame, cancelFrame;
              if (typeof(window) != "undefined") {
                var frame = window['requestAnimationFrame'],
                  cancelFrame = window['cancelRequestAnimationFrame'];
                ['', 'ms', 'moz', 'webkit', 'o'].forEach(function(x) {
                  if (!frame) {
                    frame = window[x + 'RequestAnimationFrame'];
                    cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                  }
                });
              }

              if (!frame)
                frame = function(cb) {
                  return setTimeout(cb, 16);
                };

              if (!cancelFrame)
                cancelFrame = function(id) {
                  clearTimeout(id);
                };

              _callers = [];
              _oneTimers = {};
              _everies = {};
              _framers = [];
              var lastMs = 0;

              var _callQueQue = function() {
                var ms = (new Date()).getTime();
                var fn;
                while (fn = _callers.shift()) {
                  if (Object.prototype.toString.call(fn) === '[object Array]') {
                    fn[1].apply(fn[0], fn[2]);
                  } else {
                    fn();
                  }

                }

                for (var i = 0; i < _framers.length; i++) {
                  var fFn = _framers[i];
                  fFn();
                }

                for (var n in _oneTimers) {
                  if (_oneTimers.hasOwnProperty(n)) {
                    var v = _oneTimers[n];
                    v[0](v[1]);
                    delete _oneTimers[n];
                  }
                }

                for (var n in _everies) {
                  if (_everies.hasOwnProperty(n)) {
                    var v = _everies[n];
                    if (v.nextTime < ms) {
                      if (v.remove) {
                        if (v.nextTime > 0) {
                          v.fn();
                          delete _everies[n];
                        } else {
                          v.nextTime = ms + v.step;
                        }
                      } else {
                        v.fn();
                        v.nextTime = ms + v.step;
                      }
                    }
                    if (v.until) {
                      if (v.until < ms) {
                        delete _everies[n];
                      }
                    }
                  }
                }

                frame(_callQueQue);
                lastMs = ms;
              };
              _callQueQue();
              _initDone = true;
            }
          });
          _myTrait_.once = function(key, fn, value) {
            // _oneTimers

            _oneTimers[key] = [fn, value];
          }
          _myTrait_.onFrame = function(fn) {

            _framers.push(fn);
          }
          _myTrait_.polyfill = function(t) {
            // --- let's not ---
          }
          _myTrait_.removeFrameFn = function(fn) {

            var i = _framers.indexOf(fn);
            if (i >= 0) {
              if (fn._onRemove) {
                fn._onRemove();
              }
              _framers.splice(i, 1);
              return true;
            } else {
              return false;
            }
          }
        }(this));
      }
      var later = function(a, b, c, d, e, f, g, h) {
        if (this instanceof later) {
          var args = [a, b, c, d, e, f, g, h];
          if (this.__factoryClass) {
            var m = this;
            var res;
            this.__factoryClass.forEach(function(initF) {
              res = initF.apply(m, args);
            });
            if (Object.prototype.toString.call(res) == '[object Function]') {
              if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
            } else {
              if (res) return res;
            }
          }
          if (this.__traitInit) {
            var m = this;
            this.__traitInit.forEach(function(initF) {
              initF.apply(m, args);
            })
          } else {
            if (typeof this.init == 'function')
              this.init.apply(this, args);
          }
        } else return new later(a, b, c, d, e, f, g, h);
      };
      later._classInfo = {
        name: 'later'
      };
      later.prototype = new later_prototype();
      if (typeof(window) != 'undefined') window['later'] = later;
      if (typeof(window) != 'undefined') window['later_prototype'] = later_prototype;;
      (function(_myTrait_) {
        _myTrait_.isArray = function(someVar) {
          return Object.prototype.toString.call(someVar) === '[object Array]';
        }
        _myTrait_.isFunction = function(fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        }
        _myTrait_.isObject = function(obj) {
          return obj === Object(obj);
        }
      }(this));;
      (function(_myTrait_) {
        _myTrait_.all = function(firstArg) {

          var args;
          if (this.isArray(firstArg)) {
            args = firstArg;
          } else {
            args = Array.prototype.slice.call(arguments, 0);
          }
          // console.log(args);
          var targetLen = args.length,
            rCnt = 0,
            myPromises = [],
            myResults = new Array(targetLen);

          return this.then(
            function() {

              var allPromise = _promise();
              args.forEach(function(b, index) {
                if (b.then) {
                  // console.log("All, looking for ", b, " state = ", b._state);
                  myPromises.push(b);

                  b.then(function(v) {
                    myResults[index] = v;
                    // console.log("Got a promise...",b, " cnt = ", rCnt);
                    rCnt++;
                    if (rCnt == targetLen) {
                      allPromise.resolve(myResults);
                    }
                  }, function(v) {
                    allPromise.reject(v);
                  });

                } else {
                  allPromise.reject("Not list of promises");
                }
              })

              return allPromise;

            });





        }
        _myTrait_.collect = function(collectFn, promiseList, results) {

          var args;
          if (this.isArray(promiseList)) {
            args = promiseList;
          } else {
            args = [promiseList];
          }

          // console.log(args);
          var targetLen = args.length,
            isReady = false,
            noMore = false,
            rCnt = 0,
            myPromises = [],
            myResults = results || {};

          return this.then(
            function() {

              var allPromise = _promise();
              args.forEach(function(b, index) {
                if (b.then) {
                  // console.log("All, looking for ", b, " state = ", b._state);
                  myPromises.push(b);

                  b.then(function(v) {
                    rCnt++;
                    isReady = collectFn(v, myResults);
                    if ((isReady && !noMore) || (noMore == false && targetLen == rCnt)) {
                      allPromise.resolve(myResults);
                      noMore = true;
                    }
                  }, function(v) {
                    allPromise.reject(v);
                  });

                } else {
                  allPromise.reject("Not list of promises");
                }
              })

              return allPromise;

            });

        }
        _myTrait_.fail = function(fn) {
          return this.then(null, fn);
        }
        _myTrait_.fulfill = function(withValue) {
          // if(this._fulfilled || this._rejected) return;

          if (this._rejected) return;
          if (this._fulfilled && withValue != this._stateValue) return;

          // console.log("Fulfilling", this, " with value ", withValue);
          var me = this;
          this._fulfilled = true;
          this._stateValue = withValue;
          // console.log("Child promises ", this._childPromises);

          this._childPromises.forEach(function(p) {
            if (p._onFulfill) {
              try {
                // console.log("Calling child with ", withValue,p._onFulfill.toString());

                var x = p._onFulfill(withValue);
                // console.log("Returned ",x);
                if (typeof(x) != "undefined") {
                  p.resolve(x);
                } else {
                  p.fulfill(withValue);
                }
              } catch (e) {
                // console.error(e);
                /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
                p.reject(e);
              }
            } else {
              /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
              p.fulfill(withValue);
            }
          });
          this._childPromises = [];
          this._state = 1;
          this.triggerStateChange();

        }
        _myTrait_.genPlugin = function(fname, fn) {
          var me = this;
          this.plugin(fname,
            function() {
              var args = Array.prototype.slice.call(arguments, 0);
              console.log("Plugin args", args);
              var myPromise = _promise();
              this.then(function(v) {
                var args2 = Array.prototype.slice.call(arguments, 0);
                var z = args.concat(args2);
                var res = fn.apply(this, z);
                myPromise.resolve(res);
              }, function(r) {
                myPromise.reject(r);
              });
              return myPromise;
              /*
                      log("..... now waiting "+ms);
                      var p = waitFor(ms);
                      p.then( function(v) {
                          myPromise.resolve(v);
                      });
                  */
            }
          );
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(onFulfilled, onRejected) {
          // 0 = pending
          // 1 = fullfilled
          // 2 = error
          this._state = 0;
          this._stateValue = null;
          this._isAPromise = true;
          this._childPromises = [];

          if (this.isFunction(onFulfilled))
            this._onFulfill = onFulfilled;
          if (this.isFunction(onRejected))
            this._onReject = onRejected;
        });
        _myTrait_.isFulfilled = function(t) {
          return this._state == 1;
        }
        _myTrait_.isPending = function(t) {
          return this._state == 0;
        }
        _myTrait_.isRejected = function(v) {
          return this._state == 2;
        }
        _myTrait_.nodeStyle = function(fname, fn) {
          var me = this;
          this.plugin(fname,
            function() {
              var args = Array.prototype.slice.call(arguments, 0);
              var last, userCb, cbIndex = 0;
              if (args.length >= 0) {
                last = args[args.length - 1];
                if (Object.prototype.toString.call(last) == '[object Function]') {
                  userCb = last;
                  cbIndex = args.length - 1;
                }
              }
              console.log("nodeStyle", args);
              var mainPromise = _promise();
              this.then(function() {
                var nodePromise = _promise();
                var args2 = Array.prototype.slice.call(arguments, 0);
                console.log("Orig args", args);
                console.log("Then args", args2);
                var z;
                if (args.length == 0)
                  z = args2;
                if (args2.length == 0)
                  z = args;
                if (!z) z = args2.concat(args);
                cbIndex = z.length; // 0,fn... 2
                if (userCb) cbIndex--;
                z[cbIndex] = function(err) {
                  if (err) {
                    console.log("Got error ", err);
                    nodePromise.reject(err);
                    mainPromise.reject(err);
                    return;
                  }
                  if (userCb) {
                    var args = Array.prototype.slice.call(arguments);
                    var res = userCb.apply(this, args);
                    mainPromise.resolve(res);
                  } else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    mainPromise.resolve.apply(mainPromise, args);
                  }
                }
                nodePromise.then(function(v) {
                  mainPromise.resolve(v);
                });

                console.log("nodeStyle after concat", z);
                var res = fn.apply(this, z);
                // myPromise.resolve(res);
                // return nodePromise;
                return nodePromise;
              }, function(v) {
                mainPromise.reject(v);
              });
              return mainPromise;
              /*
                      log("..... now waiting "+ms);
                      var p = waitFor(ms);
                      p.then( function(v) {
                          myPromise.resolve(v);
                      });
                  */
            }
          );
        }
        _myTrait_.onStateChange = function(fn) {

          if (!this._listeners)
            this._listeners = [];

          this._listeners.push(fn);
        }
        _myTrait_.plugin = function(n, fn) {

          _myTrait_[n] = fn;

          return this;
        }
        _myTrait_.props = function(obj) {
          var args = [];

          for (var n in obj) {
            if (obj.hasOwnProperty(n)) {
              args.push({
                name: n,
                promise: obj[n]
              });
            }
          }


          // console.log(args);
          var targetLen = args.length,
            rCnt = 0,
            myPromises = [],
            myResults = {};

          return this.then(
            function() {

              var allPromise = _promise();
              args.forEach(function(def) {
                var b = def.promise,
                  name = def.name;
                if (b.then) {
                  // console.log("All, looking for ", b, " state = ", b._state);
                  myPromises.push(b);

                  b.then(function(v) {
                    myResults[name] = v;
                    rCnt++;
                    if (rCnt == targetLen) {
                      allPromise.resolve(myResults);
                    }
                  }, function(v) {
                    allPromise.reject(v);
                  });

                } else {
                  allPromise.reject("Not list of promises");
                }
              })

              return allPromise;

            });

        }
        _myTrait_.reject = function(withReason) {

          // if(this._rejected || this._fulfilled) return;

          // conso

          if (this._fulfilled) return;
          if (this._rejected && withReason != this._rejectReason) return;


          this._state = 2;
          this._rejected = true;
          this._rejectReason = withReason;
          var me = this;

          this._childPromises.forEach(function(p) {

            if (p._onReject) {
              try {
                p._onReject(withReason);
                p.reject(withReason);
              } catch (e) {
                /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
                p.reject(e);
              }
            } else {
              /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
              p.reject(withReason);
            }
          });

          this._childPromises = [];
          this.triggerStateChange();

        }
        _myTrait_.rejectReason = function(reason) {
          if (reason) {
            this._rejectReason = reason;
            return;
          }
          return this._rejectReason;
        }
        _myTrait_.resolve = function(x) {

          // console.log("Resolving ", x);

          // can not do this many times...
          if (this._state > 0) return;

          if (x == this) {
            // error
            this._rejectReason = "TypeError";
            this.reject(this._rejectReason);
            return;
          }

          if (this.isObject(x) && x._isAPromise) {

            // 
            this._state = x._state;
            this._stateValue = x._stateValue;
            this._rejectReason = x._rejectReason;
            // ... 
            if (this._state === 0) {
              var me = this;
              x.onStateChange(function() {
                if (x._state == 1) {
                  // console.log("State change");
                  me.resolve(x.value());
                }
                if (x._state == 2) {
                  me.reject(x.rejectReason());
                }
              });
            }
            if (this._state == 1) {
              // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
              this.fulfill(this._stateValue);
            }
            if (this._state == 2) {
              // console.log("Relved to be Promise was rejected ", x._rejectReason);
              this.reject(this._rejectReason);
            }
            return;
          }
          if (this.isObject(x) && x.then && this.isFunction(x.then)) {
            // console.log("Thenable ", x);
            var didCall = false;
            try {
              // Call the x.then
              var me = this;
              x.then.call(x,
                function(y) {
                  if (didCall) return;
                  // we have now value for the promise...
                  // console.log("Got value from Thenable ", y);
                  me.resolve(y);
                  didCall = true;
                },
                function(r) {
                  if (didCall) return;
                  // console.log("Got reject from Thenable ", r);
                  me.reject(r);
                  didCall = true;
                });
            } catch (e) {
              if (!didCall) this.reject(e);
            }
            return;
          }
          this._state = 1;
          this._stateValue = x;

          // fulfill the promise...
          this.fulfill(x);

        }
        _myTrait_.state = function(newState) {
          if (typeof(newState) != "undefined") {
            this._state = newState;
          }
          return this._state;
        }
        _myTrait_.then = function(onFulfilled, onRejected) {

          var p = new _promise(onFulfilled, onRejected);
          var me = this;
          if (this._state == 1) {
            // console.log("Already done...");
            later().asap(function() {
              // console.log("Fulfilling this promise a bit late with ", me.value());
              me.fulfill(me.value());
            });
          }
          if (this._state == 2) {
            later().asap(function() {
              me.reject(me.rejectReason());
            });
          }

          this._childPromises.push(p);

          return p;



        }
        _myTrait_.triggerStateChange = function(t) {
          var me = this;
          if (!this._listeners) return;
          this._listeners.forEach(function(fn) {
            fn(me);
          });
          // one-timer
          this._listeners = [];
        }
        _myTrait_.value = function(v) {
          if (typeof(v) != "undefined") {
            this._stateValue = v;
            return this;
          }
          return this._stateValue;
        }
      }(this));
    }
    var _promise = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _promise) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _promise(a, b, c, d, e, f, g, h);
    };
    _promise._classInfo = {
      name: '_promise'
    };
    _promise.prototype = new _promise_prototype();
    if (typeof(window) != 'undefined') window['_promise'] = _promise;
    if (typeof(window) != 'undefined') window['_promise_prototype'] = _promise_prototype;
    var _connectManager_prototype = function() {;
      (function(_myTrait_) {
        var _servers;
        _myTrait_.createSocketServer = function(options, port) {

          var sName = options.ip + ":" + options.port;

          if (_servers[sName]) {
            return _servers[sName];
          }

          var socketC = _connSocket({
            url: "http://" + sName + "/",
            ioOptions: {
              'reconnection delay': 500, // defaults to 500
              'reconnection limit': 100, // defaults to Infinity
              'max reconnection attempts': Infinity // defaults to 10
            }
          });
          _servers[sName] = socketC;
          return socketC;



          // var thePath = myDir+_sep_+ctxData.sandbox+_sep_+ctxData.path+_sep_+ctxData.file;







          /*
           {
                sandbox : "f365422c-986c-4630-852b-01871a294a0f",
                path : "objects",
                file : "testSvg2.json"
           }
           */

        }
        _myTrait_.genGUID = function(t) {
          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(dataObj, options) {

          if (!_servers) {
            _servers = {};
          }

        });
      }(this));
    }
    var _connectManager = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _connectManager) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _connectManager._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _connectManager(a, b, c, d, e, f, g, h);
    };
    _connectManager._classInfo = {
      name: '_connectManager'
    };
    _connectManager.prototype = new _connectManager_prototype();
    if (typeof(window) != 'undefined') window['_connectManager'] = _connectManager;
    if (typeof(window) != 'undefined') window['_connectManager_prototype'] = _connectManager_prototype;
    var _connSocket_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.on = function(en, ef) {
          if (!this._ev) this._ev = {};
          if (!this._ev[en]) this._ev[en] = [];

          this._ev[en].push(ef);

          return this;
        }
        _myTrait_.trigger = function(en, data, fn) {

          if (!this._ev) return;
          if (!this._ev[en]) return;
          var me = this;
          this._ev[en].forEach(function(cb) {
            cb(me, data, fn)
          });
          return this;
        }
      }(this));;
      (function(_myTrait_) {
        var _channelIndex;
        var _rootData;
        _myTrait_.createChannel = function(options, url) {

          if (!this._channels) {
            this._channels = [];
          }

          if (!_channelIndex) {
            _channelIndex = {};
          }
          var chStr = options.sandbox + ":" + options.path + ":" + options.file;

          if (_channelIndex[chStr]) {
            return _channelIndex[chStr];
          }

          // create new channel object...
          var chObj = _connChannel(this, options, url);
          _channelIndex[chStr] = chObj;
          return chObj;






        }
        _myTrait_.genGUID = function(t) {
          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(options, no) {

          console.log("_connSocket with ", options);
          // The connection initialization for the specific url
          this._socket = io.connect(options.url, options.ioOptions);
          this._options = options;
          this._connInfo = {
            cnt: 0,
            isConnected: false
          }


          var me = this,
            socket = this._socket;

          socket.on("disconnect", function() {
            me._connInfo.isConnected = false;
            me.trigger("disconnect");
          })

          socket.on("connect", function() {
            // Nothing real here... but
            me._connInfo.isConnected = true;
            me.trigger("connect");
          });



        });
        _myTrait_.localCmdBroadcast = function(cmdList) {

          console.log("Remote commands");
          console.log(cmdList);

          // We might here execute some data...
          _rootData._setCmdRemoteUpdate(true);
          _rootData.execCommands(cmdList);
          _rootData._setCmdRemoteUpdate(false);


        }
        _myTrait_.remoteCmdBroadcast = function(cmd) {

          /*
                       
                   dataObj.addCommandListener( function(cmd) {
                       
                       if(!connInfo.isConnected) {
                           sendLater.push(cmd);
                           console.log("Not connected, adding to 'send later buffer");
                           return;
                       }
                       
                       var cObj = {
                           senderId : myID,
                           line : cmd
                       };
                       if(!socket.connected) {
                           alert("Socket not connected!!!");   
                       } else {
                           socket.emit("update_"+chId, cObj);
                       }
                   });
                   
           */
        }
      }(this));
    }
    var _connSocket = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _connSocket) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _connSocket._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _connSocket(a, b, c, d, e, f, g, h);
    };
    _connSocket._classInfo = {
      name: '_connSocket'
    };
    _connSocket.prototype = new _connSocket_prototype();
    if (typeof(window) != 'undefined') window['_connSocket'] = _connSocket;
    if (typeof(window) != 'undefined') window['_connSocket_prototype'] = _connSocket_prototype;
    var _connChannel_prototype = function() {;
      (function(_myTrait_) {
        _myTrait_.on = function(en, ef) {
          if (!this._ev) this._ev = {};
          if (!this._ev[en]) this._ev[en] = [];

          this._ev[en].push(ef);

          return this;
        }
        _myTrait_.trigger = function(en, data, fn) {

          if (!this._ev) return;
          if (!this._ev[en]) return;
          var me = this;
          this._ev[en].forEach(function(cb) {
            cb(me, data, fn)
          });
          return this;
        }
      }(this));;
      (function(_myTrait_) {
        var _myDoc;
        var _waitingAnswers;
        var _channelNamespace;
        _myTrait_.addAnswerCallback = function(id, fn, cmd) {
          if (!_waitingAnswers) _waitingAnswers = {};

          _waitingAnswers[id] = {
            fn: fn,
            cmd: cmd
          };


        }
        _myTrait_.ask = function(cmdObj, callBackFn) {

          var createQuestion = function() {

          }

          cmdObj.__aid = this.genGUID();

          if (callBackFn) {
            this.addAnswerCallback(cmdObj.__aid,
              function(resData) {
                callBackFn(resData.answer);
                delete _waitingAnswers[cmdObj.__aid];
              },
              cmdObj
            );
          }

          console.log("Asking with " + cmdObj.__aid);

          var sock = this.getSocket();
          sock.emit("ask_" + this._channelId, cmdObj);

          // SERVER WILL HANDLE IT LIKE THIS:
          /*
           socket.on("ask_"+_ctx.channelId, function(cObj) {
               if(cObj.cmd=="versionInfo") {
                   // figure out the version information for the server...
                   console.log("Asking version information from "+_ctx.channelId);
                   
                   // fold.fileInformation
                   
                    var fold = jsFolder(_ctx.relPath);
                    fold.fileInformation(_ctx.validFile, function(err, data) {
                        if(err) {
                            fn("readTheFile had error");
                            return;
                        }
                        _ctx.io.sockets.in(socket.id).emit("answer_"+_ctx.channelId, 
                        {
                           __aid : cObj.__aid,
                           question : cObj.cmd,
                           answer : {
                               modtime : data.data.mtime,
                               filesize : data.data.size
                           }
                        }); 
                    });        
           
               }  
           */


          /*
           socket.on("ask_"+_ctx.channelId, function(cObj) {
               
               if(cObj.cmd=="question") {
                   console.log("Got command 'question' with data to "+_ctx.channelId);
                   console.log(cObj);
               }
               
               if(cObj.cmd=="snapshot") {
                   me.createSnapshot();
               }
               if(cObj.cmd=="journalRecord" && cObj.t) {
                var fold = jsFolder(_ctx.relPath);
                fold.getJournalCommandsSince(_ctx.validFile, cObj.t, function(err, data) {
                   //console.log("****** JOURNAL COMMANDS ****** ");
                   //console.log(data);
                });        
               }
           });
           */
        }
        _myTrait_.genGUID = function(t) {
          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        }
        _myTrait_.getFileData = function(fn) {
          var me = this;
          me._tryCnt = 0;

          var socket = this.getSocket();

          var baseData,
            changeList;

          var feedBackFn = function(d) {
            baseData = JSON.parse(d);
            socket.removeListener("fileData_" + me._channelId, feedBackFn);
          }

          var changeFn = function(d) {
            var chList = [];
            if (d.length > 2) {
              var lines = d.split("\n"),
                len = lines.length;
              for (var i = 0; i < len; i++) {
                var line = lines[i];
                if (!line || line.length < 2) continue;
                //console.log("LINE : "+line);
                chList.push(JSON.parse(line));
              }
            }
            fn(baseData, chList);
            socket.removeListener("changeData_" + me._channelId, changeFn);
          }

          // fetching the filedata...
          socket.on("fileData_" + this._channelId, feedBackFn);
          socket.on("changeData_" + this._channelId, changeFn);

          socket.emit(this._channelId, {
            cmd: "getFile"
          });
        }
        _myTrait_.getID = function(t) {
          return this._channelId;
        }
        _myTrait_.getSocket = function(t) {
          return this._socketObj._socket;
        }
        _myTrait_.getURL = function(t) {

          return this._url;
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(socketObj, options, url) {

          var me = this;

          var socket = socketObj._socket;
          this._socketObj = socketObj;
          this._options = options;
          this._url = url;

          //console.log("***** init channel with options *****");
          //console.log(options);

          if (!_myDoc) _myDoc = _docUp();

          var myGUID = this.genGUID();
          this._options.responseId = myGUID;
          me._tryCnt = 0;
          var respEvent = function(response) {

            var data = response.channelId,
              namespace = response.namespace;

            if (!_channelNamespace) {
              _channelNamespace = {};
            }

            // here are the channel namespace commands, of course the namespaced objects are
            // acting on the local space only
            if (!_channelNamespace[url]) {
              _channelNamespace[url] = namespace;
            }

            var rad = docRadio();
            rad.namespace(url, namespace);

            if (me._tryCnt == 0) {

              // TODO: rewrite 

              socket.on("ctxupd_" + data, function(cObj) {

                if (!_myDoc._enterCtx(me._channelId)) return;

                // --- remote update might be set here on / off
                cObj.forEach(function(c) {
                  _myDoc._setCtx(c.ctx);
                  options.listeners.onCommand.forEach(function(fn) {
                    fn(c.cmd, c.ctx);
                  })
                  // options.onCommand( c.cmd );
                  _myDoc._resetCtx();
                });
                _myDoc._leaveCtx(me._channelId);
              });

              socket.on("answer_" + data, function(cObj) {
                if (!_waitingAnswers) return;
                var w = _waitingAnswers[cObj.__aid];
                if (w) {
                  w.fn(cObj);
                }
              });
              /*
             _ctx.io.sockets.in(socket.id).emit("answer_"+_ctx.channelId, 
             {
                __aid : cObj.__aid,
                question : cObj.cmd,
                answer : {
                    modtime : data.data.mtime,
                    filesize : data.data.size
                }
             });         
        */
            }

            me._channelId = data;
            me._isConnected = true; // => should go false if socket is disconnected
            me._tryCnt++;
            me.trigger("connect");
            me.resolve(me._channelId);
            // socket.removeListener( respEvent );
          };

          socket.on(myGUID, respEvent);

          if (socket.connected) {
            console.log("Sending request for channel ");
            socket.emit("requestChannel", me._options);
          } else {

            // re-submit if not connected already..
            socket.on("connect", function() {
              console.log("Sending request for channel ");
              socket.emit("requestChannel", me._options);
            });

          }



        });
      }(this));
    }
    _connChannel_prototype.prototype = _promise.prototype
    var _connChannel = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _connChannel) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _connChannel._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _connChannel(a, b, c, d, e, f, g, h);
    };
    _connChannel._classInfo = {
      name: '_connChannel'
    };
    _connChannel.prototype = new _connChannel_prototype();
    if (typeof(window) != 'undefined') window['_connChannel'] = _connChannel;
    if (typeof(window) != 'undefined') window['_connChannel_prototype'] = _connChannel_prototype;;
    (function(_myTrait_) {
      var _eventOn;
      var _commands;
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        //return Math.random();
        // return Math.random().toString(36);

        /*    
           return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
           */
        /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _listeners;
      var _channels;
      var _loading;
      var _namespaces;
      var _myDoc;
      _myTrait_.ask = function(url, question, callBack, extraData) {

        var cmdObj = {
          cmd: question
        };
        if (extraData) cmdObj.data = extraData;

        var ch = _channels[url];
        if (!ch) return;

        console.log("About to send question ", cmdObj);

        var ch = ch.channel;
        if (ch) ch.ask(cmdObj, callBack);
      }
      _myTrait_.askPromise = function(url, options) {

        var ch = _channels[url];
        if (!ch) return;

        console.log("Creating ask promise");

        var myPromise = _wish();
        var ch = ch.channel;
        if (ch) ch.ask(options, function(res) {
          myPromise.resolve(res);
        });

        return myPromise;
      }
      _myTrait_.command = function(url, cmdData) {
        var cmdObj = {
          cmd: "cmd",
          data: cmdData
        };

        console.log("radio command called ");

        return _promise(function(resolve, fail) {

          fail("promise with : " + url);

          var ch = _channels[url];
          if (!ch) fail("no such channel : " + url);

          var ch = ch.channel;

          console.log("going to ask ", ch);
          if (ch) ch.ask(cmdObj, resolve);

        });

      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(main) {


        if (!_channels) {
          _channels = {};
          _loading = {};
          _namespaces = {};
          _myDoc = _docUp();
        }
      });
      _myTrait_.listen = function(url, options) {

        var chData = this.parseRemoteUrl(url);
        var channel = chData.channel;

        channel.listeners = {
          onCommand: []
        };

        if (options.onCommand) {
          channel.listeners.onCommand.push(options.onCommand);
        }

        var s = _connectManager().createSocketServer({
          ip: channel.ip,
          port: channel.port
        });

        var me = this;

        if (options && this.isObject(options) && options.createWith) {
          channel.createWith = options.createWith;
        }
        if (options && this.isObject(options) && options.dataNS) {
          channel.dataNS = options.dataNS;
        }

        var chPromise = _promise();

        // connecting to the selected file...
        var ch = s.createChannel(channel, url);

        var myChannel = {
          channel: ch,
          createdTime: (new Date()).getTime(),
          bConnected: false,
          bFileLoaded: false,
          createOptions: channel,
          listenerOptions: [] // The listener options for the channel...
        }

        _channels[url] = myChannel;
        myChannel.listenerOptions.push(options);

        ch.then(function() {
          myChannel.bConnected = true;
          ch.getFileData(function(remoteData, changeList) {

            console.log("*********** CHANNEL ID ", ch.getID());

            var lo = myChannel.listenerOptions;
            myChannel.initData = remoteData;
            myChannel.initChanges = changeList;
            for (var i = 0; i < lo.length; i++) {
              var opts = lo[i];
              if (opts.onFile) {
                opts.onFile(remoteData, changeList, ch.getURL());
              }
            }

            myChannel.bFileLoaded = true;
            chPromise.resolve(true);

          });
        });



        return chPromise;
      }
      _myTrait_.namespace = function(channelId, setValue) {

        if (typeof(setValue) != "undefined") {
          _namespaces[channelId] = setValue;
          return this;
        }

        return _namespaces[channelId] || "";
      }
      _myTrait_.parseRemoteUrl = function(url) {
        console.log("Parsing ", url);
        var parts1 = url.split("://");
        var protocol = parts1.shift(),
          rest = parts1.shift();
        var serverParts = rest.split("/"),
          ipAndPort = serverParts.shift(),
          iParts = ipAndPort.split(":"),
          ip = iParts[0],
          port = iParts[1],
          sandbox = serverParts.shift(),
          fileName = serverParts.pop(),
          path = serverParts.join("/");

        var reqData = {
          channel: {
            ip: ip,
            port: port,
            sandbox: sandbox,
            path: path,
            file: fileName,
            auth: {
              u: "abba",
              p: "nowp"
            }
          }
        };

        return reqData;
      }
      _myTrait_.send = function(url, cmdList) {
        if (_channels && _channels[url]) {

          var ch = _channels[url].channel;
          if (ch) {
            if (!_myDoc._enterCtx(ch._channelId)) return;
            // console.log("Found the channel, ready to broadcast in theory");
            var s = ch.getSocket();
            // list of commands to be sent...
            s.emit("ctxupd_" + ch._channelId, cmdList);
            _myDoc._leaveCtx(ch._channelId);
          }

        }
        /*
            myT._addCommandChannel({
                broadcast : function(obj) {
                    console.log("***** SENDING DATA *****");
                    //console.log(JSON.stringify( obj.__ctxCmdList, null, 2) );
                    
                    var ch = myT._findActiveChannel();
                    if(ch) {
                        if(!myT._enterCtx(ch._channelId)) return;
                        // console.log("Found the channel, ready to broadcast in theory");
                        var s = ch.getSocket();
                        s.emit("ctxupd_"+ch._channelId, obj.__ctxCmdList);
                        myT._leaveCtx(ch._channelId);
                    }
                                  
                }
            })
            
            */

      }
      _myTrait_.snapshot = function(url, data) {

        if (!data) return;

        var ch = _channels[url];
        if (!ch) return;

        var cmdObj = {
          cmd: "snapshot"
        };

        cmdObj.rawData = data;

        var ch = ch.channel;
        if (ch) ch.ask(cmdObj);
      }
    }(this));
  }
  var docRadio = function(a, b, c, d, e, f, g, h) {
    if (this instanceof docRadio) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != docRadio._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new docRadio(a, b, c, d, e, f, g, h);
  };
  docRadio._classInfo = {
    name: 'docRadio'
  };
  docRadio.prototype = new docRadio_prototype();
  if (typeof(window) != 'undefined') window['docRadio'] = docRadio;
  if (typeof(window) != 'undefined') window['docRadio_prototype'] = docRadio_prototype;
  var sequenceStepper_prototype = function() {;
    (function(_myTrait_) {
      var _eventOn;
      var _commands;
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        //return Math.random();
        // return Math.random().toString(36);

        /*    
           return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
           */
        /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _instances;
      if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = []
      _myTrait_.__factoryClass.push(function(id, manual) {

        if (id === false && manual) return;

        if (!_instances) {
          _instances = {};
        }

        if (_instances[id]) {
          return _instances[id];
        } else {
          _instances[id] = this;
        }
      });
      _myTrait_.addCommands = function(cmdFunction, failure) {

        if (this.isArray(cmdFunction)) {
          var me = this;
          cmdFunction.forEach(function(c) {
            me.addCommands(c);
          });
          return this;
        }

        this._commands.push({
          fnCmd: cmdFunction,
          fnFail: failure,
          async: true
        });
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(myId, manual) {

        if (!this._commands) {
          this._commands = [];
          this.waitingList = [];
          this._index = 0;
        }

        var me = this;
        if (!manual) {
          later().every(1 / 30, function() {
            me.step();
          });
        }

      });
      _myTrait_.step = function(t) {
        var i = this._index,
          len = this._commands.length;

        if (i == len) return;

        var first = _promise(),
          currentProm = first,
          myPromise = _promise(),
          me = this;

        while (i < len) {
          var fn = this._commands[i];
          (function(fn) {
            currentProm = currentProm.then(function() {

              var p = _promise();

              // if(fn.async) {

              fn.fnCmd(function(res) {
                p.resolve(true);
              }, function(failReason) {
                p.resolve(true);
                if (fn.fnFail) fn.fnFail(failReason);
              });

              return p;
            }).fail(function(reason) {
              if (fn.fnFail) fn.fnFail(reason);
            });
          }(fn));
          this._index++;
          i++;
        }

        currentProm.then(function() {
          me.waitingList.shift(); // remvoe this promise from the queque
          myPromise.resolve(true);
          if (me.waitingList.length) {
            var newP = me.waitingList[0];
            newP.resolve(true);
          }
        }).fail(function(m) {

        });


        this.waitingList.push(first);
        if (this.waitingList.length == 1) {
          first.resolve(true);
        }
        return myPromise;

      }
    }(this));
  }
  var sequenceStepper = function(a, b, c, d, e, f, g, h) {
    if (this instanceof sequenceStepper) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != sequenceStepper._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new sequenceStepper(a, b, c, d, e, f, g, h);
  };
  sequenceStepper._classInfo = {
    name: 'sequenceStepper'
  };
  sequenceStepper.prototype = new sequenceStepper_prototype();
  if (typeof(window) != 'undefined') window['sequenceStepper'] = sequenceStepper;
  if (typeof(window) != 'undefined') window['sequenceStepper_prototype'] = sequenceStepper_prototype;
  var _docUp_prototype = function() {;
    (function(_myTrait_) {
      var _eventOn;
      var _commands;
      _myTrait_.addController = function(c) {
        if (!this._controllers)
          this._controllers = [];

        if (this._controllers.indexOf(c) >= 0) return;

        this._controllers.push(c);
      }
      _myTrait_.clone = function(t) {
        return _data(this.serialize());
      }
      _myTrait_.emitValue = function(scope, data) {
        if (this._processingEmit) return this;

        this._processingEmit = true;
        // adding controllers to the data...
        if (this._controllers) {
          var cnt = 0;
          for (var i = 0; i < this._controllers.length; i++) {
            var c = this._controllers[i];
            if (c[scope]) {
              c[scope](data);
              cnt++;
            }
          }
          this._processingEmit = false;
          if (cnt > 0) return this;
        }
        /*
           if(this._controller) {
               if(this._controller[scope]) {
                  this._controller[scope](data);
                  return;
               }
           }
           */

        if (this._valueFn && this._valueFn[scope]) {
          this._valueFn[scope](data);
        } else {
          if (this._parent) {
            if (!this._parent.emitValue) {
              // console.log("Strange... no emit value in ", this._parent);
            } else {
              this._parent.emitValue(scope, data);
            }
          }
        }
        this._processingEmit = false;
      }
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        //return Math.random();
        // return Math.random().toString(36);

        /*    
           return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
           */
        /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(data, options, notUsed, notUsed2) {

      });
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _commands;
      var _objectCache;
      var _cmdIndex;
      var _lastCmdId;
      var _lastCmdVals;
      var _objSetValCmds;
      var _commandListener;
      var _isRemoteUpdate;
      var _hotObjects;
      var _hotSettings;
      var _hotDocs;
      var _incomingDataFn;
      var _listeners;
      var _execInfo;
      var _doingRemote;
      var _localReflections;
      var _channelCommands;
      var _channelForks;
      var _cmdNsMap;
      var _nsReverse;
      var _nsIndex;
      var _nsShortcuts;
      _myTrait_._addChannelFork = function(ID, forkCmd) {

        if (!_channelForks[ID]) {
          _channelForks[ID] = [];
        }
        _channelForks[ID].push(forkCmd);
      }
      _myTrait_._addCommandChannel = function(cmdChannel) {
        /* 
             Object which can send the stuff into some other place, whatever it is...
           */

        if (!this._cmdChannels) this._cmdChannels = [];

        if (this._cmdChannels.indexOf(cmdChannel) >= 0) return this;

        // added a new channel for communication...
        this._cmdChannels.push(cmdChannel);
      }
      _myTrait_._addHotDoc = function(doc) {

        var info = _hotDocs[doc._guid];
        if (!info) {
          _hotDocs[doc._guid] = {
            doc: doc,
            ms: (new Date()).getTime()
          }
        } else {
          info.ms = (new Date()).getTime();
        }
      }
      _myTrait_._addReflection = function(objectId, reflectionId) {

        if (!objectId || !reflectionId || (objectId == reflectionId)) return this;

        if (!_localReflections) _localReflections = {};

        if (!_localReflections[objectId]) _localReflections[objectId] = [];

        if (_localReflections[objectId].indexOf(reflectionId) < 0) {
          _localReflections[objectId].push(reflectionId);
        }
        return this;
      }
      _myTrait_._ask = function(question, data, callBackFn) {
        var rootData = this._data;

        var radio = rootData.__radio;
        var url = rootData.__radioURL;

        if (!data) data = {};

        radio.ask(url, question, callBackFn, data);

      }
      _myTrait_._askSnapshot = function(bUseRawData) {

        var data = this._data;

        var radio = data.__radio;
        var url = data.__radioURL,
          data = this._transformObjFromNs(data);

        radio.snapshot(url, data);

      }
      _myTrait_._broadcastToCmdChannels = function(cmdList) {

        if (this._cmdChannels) {
          //console.log("Channels", this._cmdChannels);
          this._cmdChannels.forEach(function(ch) {
            ch.broadcast(cmdList);
          });
        } else {
          //console.log("**** NO CHANNELS *****");
          //console.log(this);
        }
      }
      _myTrait_._clearCmdCache = function(t) {
        _objectCache = {};
        _commands = [];

      }
      _myTrait_._createHotObject = function(obj) {

        var hot = _hotSettings.index[obj._guid],
          me = this;
        if (!hot) {
          // make it hot...
          hot = {
            t: me._getCmdTime(),
            id: obj._guid,
            o: obj
          }
          obj._hotBuffer = [];
          _hotSettings.index[obj._guid] = hot;
          _hotSettings.list.push(hot);
        } else {
          hot.t = me._getCmdTime();
        }
        return hot;
      }
      _myTrait_._debugMode = function(t) {

        if (typeof(t) == "undefined") {
          return _execInfo.debugmode;
        }
        _execInfo.debugmode = t;
        return this;
      }
      _myTrait_._execCommandsPromise = function(listOfCommands, isRemote, reflection, rootDoc, opts) {

        var first = _promise(),
          myPromise = _promise(),
          me = this;

        var createPromise = function(p, cmd) {
          return p.then(
            function() {
              if (isRemote) {
                return me._realExecCmd(cmd, isRemote, reflection, rootDoc, opts);
              } else {
                return me.execCommand(cmd, isRemote, reflection, rootDoc, opts);
              }
            });
        }
        var len = listOfCommands.length,
          p = first;
        for (var i = 0; i < len; i++) {
          p = createPromise(p, listOfCommands[i]);
        }
        p.then(function() {
          myPromise.resolve(true);
        });
        first.resolve(true);

        return myPromise;
      }
      _myTrait_._findParentWithUrl = function(data) {
        if (!data) return data;
        if (!data.__p) return data;

        if (data.__radioURL) return data;

        var pid = data.__p;
        var p = this._find(pid),
          prevP;
        while (p) {
          if (p.__radioURL) return p;
          prevP = p;
          pid = p.__p;
          p = this._find(pid);
        }
        return prevP;
      }
      _myTrait_._findReflections = function(objId) {

        if (_localReflections) return _localReflections[objId];
      }
      _myTrait_._findRootDoc = function(data) {
        if (!data.__p) return data;

        if (data.__virtual) return data;

        var pid = data.__p;
        var p = this._find(pid);
        if (p) {
          return this._findRootDoc(p);
        }
        return data;
      }
      _myTrait_._getCmdTime = function(t) {
        return _hotSettings.time;
      }
      _myTrait_._getExecInfo = function(t) {
        return _execInfo;
      }
      _myTrait_._getNsFromUrl = function(url) {
        if (_nsShortcuts[url]) {
          return _nsShortcuts[url];
        }
        _nsReverse[_nsIndex] = url;
        _nsShortcuts[url] = _nsIndex++;

        return _nsShortcuts[url];
      }
      _myTrait_._getNsShorthand = function(nsName) {

        if (_nsShortcuts[nsName]) {
          return _nsShortcuts[nsName];
        }
        _nsReverse[_nsIndex] = nsName;
        _nsShortcuts[nsName] = _nsIndex++;

        return _nsShortcuts[nsName];
      }
      _myTrait_._getReflections = function(t) {
        return _localReflections;
      }
      _myTrait_._getReflectionsFor = function(objId) {

        if (_localReflections) {
          var list = _localReflections[objId];
          if (list) return list;
        }
        return [];
      }
      _myTrait_._getReverseNs = function(index) {

        return _nsReverse[index];
      }
      _myTrait_._idFromNs = function(id) {
        if (id) {

          var len = id.length;
          if (id[len - 1] == "#") {
            id = id.split("@").shift();
          }
        }
        return id;
      }
      _myTrait_._idToNs = function(id, ns) {

        if (id) {
          var len = id.length;
          // longString

          if (id[len - 1] == "#") {
            var ind = id.indexOf("@");
            var oldNs = id.substring(ind + 1, len - 1);
            if (oldNs != ns) {
              id = id.substring(0, ind) + "@" + ns + "#";
            }
          } else {
            id = id + "@" + ns + "#";
          }
        }
        return id;
      }
      _myTrait_._localExecCmd = function(a, isRemote, reflection, rootDoc, opts) {

        // IF the command is coming from the local execCommand function then this
        // function is called...

        var me = this;
        var myPromise = _promise();

        if (this.isArray(a[0])) {
          console.error("Array of promises NOT implemented.... ");
          /*
               this._execCommandsPromise(a, isRemote).then( function() {
                    myPromise.resolve(true);
               })
               */
          myPromise.resolve(true);
          return myPromise;
        }
        var ctxName = "local::" + a[0] + "::" + a[4]; // i.e 4::x == set, x 

        // var ctxName = "local::"+a.join();
        if (!me._enterCtx(ctxName, true)) {
          myPromise.resolve(true);
          return myPromise;
        }

        var execStatus = this._getExecInfo();
        var cmdCopy = a.slice();

        if (!reflection) {
          var rObj = this._find(a[4]);
          rootDoc = this._findParentWithUrl(rObj);
        }

        try {

          // FORK of the channel, the command structure is still undefined, what is does have???
          if (a[0] == 88) {
            // Forking the channel is just creating a mark in the stream, should you react to it somehow???
            // send this fork information to the remote channels...
            this._pushChannelCommand(rootDoc.__radioURL, cmdCopy.slice(), ctxName, false, rootDoc.__radio);

            myPromise.resolve(true);
          }

          // Create Object command...
          if (a[0] == 1) {
            var newObj = {
              data: {},
              __id: a[1]
            }
            var hash = this._getObjectHash();
            hash[newObj.__id] = newObj;
            this.writeCommand(a);
            myPromise.resolve(true);
          }

          if (a[0] == 2) {
            var newObj = {
              data: [],
              __id: a[1]
            }
            var hash = this._getObjectHash();
            hash[newObj.__id] = newObj;
            this.writeCommand(a);
            myPromise.resolve(true);
          }

          if (a[0] == 3) {
            myPromise.resolve(true);
          }

          if (a[0] == 4) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (obj) {

              if (!reflection) {
                if (obj.__rid) {
                  // send the command to the reflection object...
                  // console.log("Sending to the real document the reflection "+obj.__rid);
                  a[4] = obj.__rid;
                  me._leaveCtx(ctxName);
                  me._localExecCmd(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              if (!a[3]) {
                a[3] = obj.data[prop];
                cmdCopy[3] = obj.data[prop];
              }

              _execInfo.oldValue = obj.data[prop];
              obj.data[prop] = a[2]; // value is now set...
              this._cmd(a, obj, null);

              // local command must be broadcasted to remote listeners
              if (!reflection && !isRemote) {
                //console.log("%c not remote and not reflection", "background:green");
                //console.log("Context here was ", ctxName);
                //console.log("command "+JSON.stringify( cmdCopy ));
                this._pushChannelCommand(rootDoc.__radioURL, cmdCopy.slice(), ctxName, false, rootDoc.__radio);
              }

              if (_listeners) {
                var lName = obj.__id + "::" + prop,
                  eList = _listeners[lName];
                if (eList) {
                  // console.log("**** got", lName);
                  eList.forEach(function(fn) {
                    fn(obj, a[2]);
                  })
                }
              }
              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(cmdCopy, isRemote).then(function() {
                  //console.log("**** ... commands to refs done. **** ");
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                //console.log(".... looks like this was reflection??? ");
                myPromise.resolve(true);
              }
            } else {
              myPromise.resolve(true);
            }
          }

          // There is not the change list coming...
          if (a[0] == 13) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (!reflection) {
              if (obj.__rid) {
                // send the command to the reflection object...
                // the command will then be reflected to all reflected objects...
                //console.log("**** sending ACE update command to the reflected object **** ");
                a[4] = obj.__rid;
                me._leaveCtx(ctxName);
                //console.log(JSON.stringify(a));
                me.execCommand(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              }
            }

            var conv = aceCmdConvert();

            // The string gets updated like this...
            obj.data[prop] = conv.runToString(obj.data[prop], a[2]);

            // ******* this was here but might be moved into the ace editor update ********
            _doingRemote = isRemote || _isRemoteUpdate;

            var tmpCmd = [4, prop, obj.data[prop], null, a[4]];
            this._cmd(tmpCmd, obj, null);

            // But, for the remote stuff, we are going to use this..
            if (!(isRemote || _isRemoteUpdate)) {
              // this.writeCommand(a); 
            } else {
              this._cmd(a, obj, null);
            }

            _doingRemote = false;

            if (!reflection && !isRemote) {
              this._pushChannelCommand(rootDoc.__radioURL, cmdCopy, ctxName, false, rootDoc.__radio);
            }

            if (_listeners) {
              var lName = obj.__id + "::" + prop,
                eList = _listeners[lName];
              if (eList) {
                // console.log("**** got", lName);
                eList.forEach(function(fn) {
                  fn(obj, obj.data[prop]);
                })
              }
            }

            if (!reflection) {
              me._leaveCtx(ctxName);
              me._sendCmdToRefs(a, isRemote).then(function() {
                myPromise.resolve(true);
              });
              return myPromise;
            } else {
              myPromise.resolve(true);
            }



          }

          // Setting the member of ...
          if (a[0] == 5) {

            //console.log("Hash contents");
            //console.log(this._getObjectHash());

            var obj = this._find(a[4]),
              prop = a[1],
              setObj = this._find(a[2]);

            if (!obj || !setObj) {
              me._leaveCtx(ctxName);
              myPromise.resolve(true);
              return;
            }

            // NOTE: there might be some problems with remote objects here too...
            var parentObj = obj;

            if (!reflection) {
              if (parentObj.__rid && (parentObj.__rid != a[4])) {
                // console.log("**** sending INSERT to the reflected object **** ");
                var newCmd = a.slice();
                newCmd[4] = parentObj.__rid;
                me._leaveCtx(ctxName);
                // console.log(JSON.stringify(a));
                me.execCommand(newCmd, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              }
            }

            setObj = this._transformToNsBeforeInsert(setObj, obj);

            obj.data[prop] = setObj; // value is now set...
            setObj.__p = obj.__id; // The parent relationship
            this._cmd(a, obj, setObj);

            // this._moveCmdListToParent(setObj);
            if (!reflection && !isRemote) {
              this._pushCmdListToChannel(setObj, rootDoc, ctxName);
              this._pushChannelCommand(rootDoc.__radioURL, a, ctxName, false, rootDoc.__radio);
            }

            if (!reflection) {
              me._leaveCtx(ctxName);
              me._sendCmdToRefs(a, isRemote).then(function() {
                myPromise.resolve(true);
              });
              return myPromise;
            } else {
              myPromise.resolve(true);
            }
          }


          // Remove the object property....
          if (a[0] == 10) {

            var obj = this._find(a[4]),
              prop = a[1];

            console.log("*** unsetting property ****", prop);

            if (!obj || !prop) {
              me._leaveCtx(ctxName);
              myPromise.resolve(true);
              return;
            }

            // NOTE: there might be some problems with remote objects here too...
            var parentObj = obj;

            if (!reflection) {
              if (obj.__rid) {
                // send the command to the reflection object...
                // console.log("Sending to the real document the reflection "+obj.__rid);
                a[4] = obj.__rid;
                me._leaveCtx(ctxName);
                me._localExecCmd(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              }
            }

            // unsetting a property does not work right now...
            delete obj.data[prop];
            if (setObj) {
              setObj.__oldp = parentObj.__id;
              setObj.__p = null; // The parent relationship
            }
            this._cmd(a, obj, setObj);

            // this._moveCmdListToParent(setObj);
            if (!reflection && !isRemote) {
              // this._pushCmdListToChannel( setObj, rootDoc, ctxName  );
              this._pushChannelCommand(rootDoc.__radioURL, cmdCopy, ctxName, false, rootDoc.__radio);
            }

            if (!reflection) {
              me._leaveCtx(ctxName);
              me._sendCmdToRefs(a, isRemote).then(function() {
                myPromise.resolve(true);
              });
              return myPromise;
            } else {
              myPromise.resolve(true);
            }
          }


          // Insert new object with id...
          // The object should be already created and thus it exists in the
          // object cache of this "domain"
          if (a[0] == 7) {

            var parentObj = this._find(a[4]),
              insertedObj = this._find(a[2]),
              prop = "*",
              index = parentObj.data.length; // might check if valid...

            // Moving the object in the array
            if (parentObj && insertedObj) {

              // console.log(" insert OK ");

              if (!reflection) {
                // usually a plain new object is without _rid, it is usually just object..

                // The insertion of object in cases that there is another __vpid and __vcid

                if (parentObj.__rid && (parentObj.__rid != a[4])) {
                  // console.log("**** sending INSERT to the reflected object **** ");
                  a[4] = parentObj.__rid;
                  me._leaveCtx(ctxName);
                  // console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              insertedObj = this._transformToNsBeforeInsert(insertedObj, parentObj);

              // now the object is in the array...
              parentObj.data.push(insertedObj);
              insertedObj.__p = parentObj.__id;
              this._cmd(a, parentObj, insertedObj);

              // Q: should this be having cmd-list to parent??
              // if(!parentObj.__rid) this._moveCmdListToParent(insertedObj);
              // ==> perhaps should be sending the commands here to the channel URL...
              // unless there is __rid.. available

              if (!reflection && !isRemote) {
                // console.log("%c should be pushing the command list to channel", "background:green;");
                this._pushCmdListToChannel(insertedObj, rootDoc, ctxName);
                this._pushChannelCommand(rootDoc.__radioURL, cmdCopy, ctxName, false, rootDoc.__radio);
              }


              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }


            } else {
              myPromise.resolve(true);
            }

          }



          // Remove object, this might be also NOT from array...???
          if (a[0] == 8) {

            //console.log("%c COMMAND 8 ",  'background: red; color: #bada55');
            //console.log("*** remove item command ");
            //console.log(a);

            // ** skipping this command        
            /*
                   me._leaveCtx(ctxName);
                   myPromise.resolve(true);
                   
                   return myPromise;
           */

            // this.saveCommand("removeItem", i, this._removedItem._guid, null );
            // [8, index, removedid, null, parentid ]
            var parentObj = this._find(a[4]),
              removedItem = this._find(a[2]),
              prop = "*",
              index = parentObj.data.indexOf(removedItem); // might check if valid...

            // Moving the object in the array
            if (parentObj && removedItem) {

              // __radioURL

              var bothReflected = (parentObj.__rid && removedItem.__rid);

              var bSameDomain = true;

              if (removedItem.__vpid && (removedItem.__vpid != removedItem.__pid)) {
                bSameDomain = false;
              }
              // if( removedItem.__radioURL ) bSameDomain = false;



              if (!reflection) {

                if (bSameDomain && (removedItem.__rid && parentObj.__rid)) {
                  //console.log("**** sending remove command to the reflected object **** ");
                  a[4] = parentObj.__rid;
                  a[2] = removedItem.__rid;
                  me._leaveCtx(ctxName);
                  //console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }


                if (!bSameDomain && (removedItem.__rid && parentObj.__rid)) {

                  if (removedItem.__vcid != removedItem.__id) {

                    //console.log("%c --- not doing real delete yet --- ", "background:cyan");
                    //console.log("parent and removed below");
                    //console.log(parentObj);
                    //console.log(removedItem);
                    //console.log("Same domain : ", bSameDomain);
                    //console.log("Both have __rid ", ( removedItem.__rid && parentObj.__rid));

                    a[4] = removedItem.__vpid;
                    a[2] = removedItem.__vcid;

                    // debug code starting here:
                    /*
                                   me._leaveCtx(ctxName);
                                   console.log(JSON.stringify(a));
                                   
                                   myPromise.resolve(true);
                                   return myPromise;                    
                                   
                                   console.log("**** sending remove command to the reflected object **** ");
                                   a[4] = removedItem.__vpid;
                                   a[2] = removedItem.__rid; */

                    me._leaveCtx(ctxName);
                    // console.log(JSON.stringify(a));
                    me.execCommand(a, isRemote).then(function() {
                      myPromise.resolve(true);
                    });
                    return myPromise;
                  }
                }


                /*
                           console.log("*** Was not same domain, exiting...");
                           
                           me._leaveCtx(ctxName);
                           myPromise.resolve(true);
                           
                           return myPromise;  
                           
                           if(removedItem.__rid && parentObj.__pid) {
                                           
                                                 
                               console.log("**** sending remove command to the reflected object **** ");
                               a[4] = removedItem.__vpid || removedItem.__pid;
                               a[2] = removedItem.__rid;
                               me._leaveCtx(ctxName);
                               console.log(JSON.stringify(a));
                               me.execCommand(a, isRemote).then( function() {
                                   myPromise.resolve(true);
                               });
                               return myPromise;
                           }*/
              }

              //console.log("*** was able to find the object to remove ");
              // console.log("The index of the item to be remoed ", index);

              // now the object is in the array...
              parentObj.data.splice(index, 1);

              // Adding extra information to the object about it's removal
              removedItem.__removedAt = index;

              this._cmd(cmdCopy.slice(), parentObj, removedItem);

              if (!reflection && !isRemote) {
                this._pushChannelCommand(rootDoc.__radioURL, cmdCopy, ctxName, false, rootDoc.__radio);
              }

              removedItem.__p = null; // must be set to null...

              if (!reflection) {
                // HERE is a place to think about it...
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });

                return myPromise;

              } else {
                myPromise.resolve(true);
              }


            } else {
              myPromise.resolve(true);
            }

          }



          if (a[0] == 12) {
            var obj = this._find(a[4]),
              prop = "*",
              len = obj.data.length,
              targetObj,
              i = 0;

            for (i = 0; i < len; i++) {
              var m = obj.data[i];
              if (m.__id == a[1]) {
                targetObj = m;
                break;
              }
            }

            // Questions here:
            // - should we move command list only on the parent object, not the child
            //  =>  this._moveCmdListToParent(targetObj); could be
            //      this._moveCmdListToParent(obj);
            // That is... where the command is really saved???
            // is the command actually written anywhere???
            //  - where is the writeCommand?
            // 
            // Moving the object in the array
            if (targetObj) {

              var targetIndex = parseInt(a[2]),
                mObj = this._find(a[1]),
                bBothRemote = obj.__rid && mObj.__rid;

              if (!reflection) {
                if (bBothRemote && (obj.__rid != obj.__id)) {


                  //console.log("%c --- not doing real delete yet --- ", "background:cyan");
                  //console.log("parent and removed below");
                  //console.log(mObj);
                  //console.log(this._find(a[4]));
                  //console.log("Same domain : ", bBothRemote);

                  if (mObj.__vpid && (mObj.__vpid != a[4])) {
                    a[4] = mObj.__vpid;
                    a[1] = mObj.__vcid;
                  } else {
                    a[4] = obj.__rid;
                    a[1] = mObj.__rid;
                  }
                  /*
                               me._leaveCtx(ctxName);
                               console.log(JSON.stringify(a));
                               myPromise.resolve(true);
                               return myPromise;           
                       
                       
                               a[4] = removedItem.__vpid;
                               a[2] = removedItem.__vcid;
                       
                               
                               // send the command to the reflection object...
                               // the command will then be reflected to all reflected objects...
                               // console.log("**** sending moveToIndex CMD to the reflected object **** ");
                               
                               if(mObj.__vpid) {
                                   a[4] = mObj.__vpid;
                                   a[1] = mObj.__vcid;                             
                               } else {
                                   a[4] = obj.__rid;
                                   a[1] = mObj.__rid;                        
                               }*/

                  me._leaveCtx(ctxName);
                  // console.log(JSON.stringify(a));
                  // myPromise.resolve(true);

                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              //console.log("==== MOVING ==== ", targetObj);
              //console.log(i + "=> "+targetIndex);

              obj.__fromIndex = i;
              targetObj.__fromIndex = i;
              //             _execInfo.fromIndex = i;
              obj.data.splice(i, 1);
              obj.data.splice(targetIndex, 0, targetObj);
              this._cmd(cmdCopy, obj, targetObj);

              if (!reflection && !isRemote) {
                this._pushChannelCommand(rootDoc.__radioURL, cmdCopy, ctxName, false, rootDoc.__radio);
              }

              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }

            } else {
              myPromise.resolve(true);
            }

          }


          // push a remote object into array
          if (a[0] == 16) {

            // Object to in
            // _changeToRemote
            // [16, <URL>, <ID>, <LocalID>, <ParentObject> ]
            console.log("%c COMMAND 16 ", 'background: #222; color: #bada55');
            console.log(a);


            var objToChange = this._find(a[4]),
              remoteURL = a[1],
              remoteID = a[2],
              localID = a[3],
              parentID = a[4];

            if (objToChange && objToChange.data) {

              if (!reflection) {
                // usually a plain new object is without _rid, it is usually just object..
                if (objToChange.__rid) {
                  a[4] = objToChange.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              if (!reflection && !isRemote) {
                this._pushChannelCommand(rootDoc.__radioURL, cmdCopy, ctxName, false, rootDoc.__radio);
              }
              // reflection ...

              console.log(" - - - about to insert remote object into array - - - ");
              var isRemoteHere = this._find(remoteID),
                isLocalHere = this._find(localID);

              console.log("Checking if the objects are already here...");
              console.log("Remote object ", isRemoteHere);
              console.log("Local object ", isLocalHere);

              var mm = _data();
              console.log("Data find from cache, local ", mm.findFromCache(localID));

              //console.log(" - - - about to insert remote object into array - - - ");   
              //console.log("changeRemote - remoteID ", remoteID);
              //console.log("changeRemote - localID ", localID);
              //console.log("changeRemote - parentID ", parentID);

              var newRawData = {
                data: {},
                __rid: remoteID,
                __id: localID,
                __undone: true
              };
              var newObj;
              /*
                       var newObj = _data({
                               data : {},
                               __id : localID,
                               __rid : remoteID
                           });
                       */
              if (!me._waitingPromises) {
                me._waitingPromises = [];
              }
              me._waitingPromises.push(myPromise);

              // loading the object and inserting into the other reflections is the hardest thing to do here
              // how to make the insertion visible at the other object at real time...
              //newObj.then(
              //    function() {

              //console.log("%c COMMAND 16, did NEW object ",  'background: #222; color: #bada55');
              //console.log( newObj._docData );

              // adding the new object into the data array of the parent object
              // objToChange.data.push( newObj._docData );   
              objToChange.data.push(newRawData);

              newRawData.__radioURL = remoteURL;

              console.log("--- calling change to remote ---- ");

              var loaderPromise = _docUp()._changeToRemote(newRawData, remoteURL, remoteID);
              // it should now have the data...
              loaderPromise.then(function(d) {

                delete newRawData.__undone;

                console.log("The raw data for the object was ");
                console.log(JSON.parse(JSON.stringify(newRawData)));

                //console.log("%c COMMMAND 16 a "+remoteURL+" new object creation, loader promise Returned with ",  'background: #222; color: #bada55');
                //console.log(d);
                //console.log("The object to be changed is now ", newObj);

                var ff = me._find(localID);
                //console.log("From cache it is ", localID);
                //console.log(ff);

                //console.log("%c ---- checking here now... -----", "background : red");
                newRawData.__p = parentID;
                //console.log(JSON.parse(JSON.stringify(newObj._docData)));

                var oldObj = me._find(remoteID);
                //console.log("the old data was ");
                //console.log(oldObj);

                newRawData.__p = parentID;

                if (reflection && opts) {
                  newRawData.__vpid = opts.__vpid;
                  newRawData.__vcid = opts.__vcid;
                } else {
                  newRawData.__vpid = parentID;
                  newRawData.__vcid = localID;
                }
                me._addReflection(newRawData.__vcid, newRawData.__id);

                //console.log("Parent Id  ", parentID);
                //console.log("Local ID ", localID);
                //console.log(JSON.parse(JSON.stringify(newObj._docData)));


                newObj = _data(newRawData);

                newObj.then(
                  function() {

                    // THIS _cmd may be the problem, ????
                    // newObj
                    // objToChange
                    console.log("Did load remote object... the object is ");
                    console.log(newObj);

                    me._cmd([7, objToChange.data.length, localID, null, parentID], objToChange, newObj);
                    if (!reflection) {

                      me._sendCmdToRefs(a, isRemote).then(function() {
                        myPromise.resolve(d);
                      });

                      // myPromise.resolve(d);
                    } else {
                      myPromise.resolve(d);
                    }

                  });


              })
              //});

              // if this is the real document, then write the command down to the stream
              if (!(isRemote || _isRemoteUpdate)) {
                console.log("Writing the command .... ");
                // this.writeCommand(a);
              }
              me._leaveCtx(ctxName);


            } else {
              myPromise.resolve(true);
            }


          }


        } catch (e) {
          console.error(e.message);
          me._leaveCtx(ctxName);
          myPromise.resolve(e.message);
        }

        me._leaveCtx(ctxName);

        return myPromise;

        // this._virtualCommand( a, isRemote || _isRemoteUpdate );

      }
      _myTrait_._moveCmdListToParent = function(obj) {

        //console.log("Moving command list to parent");

        // _moveCmdListToParent
        if (obj.__ctxCmdList) {

          var root = this._findRootDoc(obj);
          if (root == obj) return;

          if (root) {
            if (!root.__ctxCmdList) root.__ctxCmdList = [];

            // Is _ctxCmdList used in anywhere??
            root.__ctxCmdList = root.__ctxCmdList.concat(obj.__ctxCmdList);
            delete obj.__ctxCmdList;
          }

        }

      }
      _myTrait_._nsFromId = function(id) {
        var ns;
        if (id) {
          id = id + "";
          var len = id.length;
          if (id[len - 1] == "#") {
            ns = id.split("@").pop();
            ns = ns.split("#").shift();
          }
        }
        return ns;
      }
      _myTrait_._pushCmdListToChannel = function(list, rootDoc, ctxName) {


        var cmdList;
        if (this.isObject(list) && list.__ctxCmdList) {
          cmdList = list.__ctxCmdList;
          delete list.__ctxCmdList;
        } else {
          cmdList = list;
        }
        var me = this;

        cmdList.forEach(function(c) {
          me._pushChannelCommand(rootDoc.__radioURL, c.cmd, c.ctx, false, rootDoc.__radio);
        });

      }
      _myTrait_._realExecCmd = function(a, isRemote, reflection, rootDoc, opts) {
        var me = this;
        var myPromise = _promise();

        if (this.isArray(a[0])) {
          // console.log("Array of promises.... ");
          this._execCommandsPromise(a, isRemote).then(function() {
            myPromise.resolve(true);
          });
          return myPromise;
        }



        // var ctxName = "realExec::"+a[0]+"::"+a[1]; // i.e 4::x == set, x 
        var ctxName = "realExec::" + a[0] + "::" + a[4];
        // var ctxName = "local::"+a.join();
        if (!me._enterCtx(ctxName)) {
          // console.log("===> could not enter");
          myPromise.resolve(true);
          return myPromise;
        }

        // console.log("*** execCommand ", a);

        // this object holds the status of the execution
        var execStatus = this._getExecInfo();
        var cmdCopy = a.slice();


        try {


          //console.log("Got command, the context is now");
          //console.log(JSON.stringify( me._getCtx() ));

          if (a[0] == 88) {
            // Currently do nothing...
            myPromise.resolve(true);
          }

          // Create Object command...
          if (a[0] == 1) {
            var newObj = {
              data: {},
              __id: a[1]
            }
            var hash = this._getObjectHash();
            // console.log("Hash ", hash);
            hash[newObj.__id] = newObj;
            // this._cmd(a, obj, null);

            // for remote objects we do not save the writeCommands, because the already
            // are coming from the "stream" of object commands
            // this.writeCommand(a);
            myPromise.resolve(true);
          }

          if (a[0] == 2) {
            var newObj = {
              data: [],
              __id: a[1]
            }
            var hash = this._getObjectHash();
            // console.log("Hash ", hash);
            hash[newObj.__id] = newObj;
            // this._cmd(a, obj, null);

            // for remote objects we do not save the writeCommands, because the already
            // are coming from the "stream" of object commands
            // this.writeCommand(a);

            myPromise.resolve(true);
          }

          if (a[0] == 3) {
            myPromise.resolve(true);
          }

          // console.log("Did execute the command");

          // The actual change of the object based on command "a"
          if (a[0] == 4) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (obj) {

              if (!reflection) {
                if (obj.__rid) {
                  // send the command to the reflection object...
                  // the command will then be reflected to all reflected objects...
                  // console.log("**** sending command to the reflected object **** ");
                  a[4] = obj.__rid;
                  me._leaveCtx(ctxName);
                  //console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }
              // console.log("Was asked to update ", prop, "to ", a[2]);

              _execInfo.oldValue = obj.data[prop];
              obj.data[prop] = a[2]; // value is now set...

              this._cmd(a, obj, null);


              if (_listeners) {
                var lName = obj.__id + "::" + prop,
                  eList = _listeners[lName];
                if (eList) {
                  // console.log("**** got", lName);
                  eList.forEach(function(fn) {
                    fn(obj, a[2]);
                  })
                }
              }
              if (!reflection) {
                me._leaveCtx(ctxName);
                // console.log("**** commands to the refs... **** ");
                me._sendCmdToRefs(a, isRemote).then(function() {
                  //console.log("**** ... commands to refs done. **** ");
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                // console.log(".... looks like this was reflection??? ");
                myPromise.resolve(true);
              }
            } else {
              myPromise.resolve(true);
            }
          }

          // There is not the change list coming...
          if (a[0] == 13) {

            // console.log("13 ... ");

            var obj = this._find(a[4]),
              prop = a[1];

            if (!reflection) {
              if (obj.__rid) {
                // send the command to the reflection object...
                // the command will then be reflected to all reflected objects...
                //console.log("**** sending ACE update command to the reflected object **** ");
                a[4] = obj.__rid;
                me._leaveCtx(ctxName);
                //console.log(JSON.stringify(a));
                me.execCommand(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              }
            }

            //console.log(" initializing aceCmdConvert ");

            var conv = aceCmdConvert();

            // The string gets updated like this...
            obj.data[prop] = conv.runToString(obj.data[prop], a[2]);

            //console.log(" did run aceCmdConvert ");

            // ******* this was here but might be moved into the ace editor update ********
            _doingRemote = isRemote || _isRemoteUpdate;

            var tmpCmd = [4, prop, obj.data[prop], null, a[4]];

            //console.log("sending tmp cmd with ace ");

            this._cmd(tmpCmd, obj, null);

            // But, for the remote stuff, we are going to use this..
            if (!(isRemote || _isRemoteUpdate)) {
              // this.writeCommand(a); 
            } else {
              //console.log("sending the REAL cmd for ace ");
              this._cmd(a, obj, null);
            }

            _doingRemote = false;

            // console.log("finished with cmds ");

            if (_listeners) {
              var lName = obj.__id + "::" + prop,
                eList = _listeners[lName];
              if (eList) {
                // console.log("**** got", lName);
                eList.forEach(function(fn) {
                  fn(obj, obj.data[prop]);
                })
              }
            }

            if (!reflection) {
              me._leaveCtx(ctxName);
              me._sendCmdToRefs(a, isRemote).then(function() {
                myPromise.resolve(true);
              });
              return myPromise;
            } else {
              myPromise.resolve(true);
            }



          }

          // Setting the member of ...
          if (a[0] == 5) {

            //console.log("Hash contents");
            //console.log(this._getObjectHash());

            var obj = this._find(a[4]),
              prop = a[1],
              setObj = this._find(a[2]);

            if (!obj) return;
            if (!setObj) return;

            // NOTE: there might be some problems with remote objects here too...
            var parentObj = obj;

            if (!reflection) {
              if (parentObj.__rid && (parentObj.__rid != a[4])) {
                // console.log("**** sending INSERT to the reflected object **** ");
                var newCmd = a.slice();
                newCmd[4] = parentObj.__rid;
                me._leaveCtx(ctxName);
                // console.log(JSON.stringify(a));
                me.execCommand(newCmd, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              }
            }

            obj.data[prop] = setObj; // value is now set...
            setObj.__p = obj.__id; // The parent relationship
            this._cmd(a, obj, setObj);

            // Q: why do we not move the command list to parent here?
            // A: because the commands are already coming from some remote source and they do not
            // need to re-created here
            // this._moveCmdListToParent(setObj);

            if (!reflection) {
              me._leaveCtx(ctxName);
              me._sendCmdToRefs(a, isRemote).then(function() {
                myPromise.resolve(true);
              });
              return myPromise;
            } else {
              myPromise.resolve(true);
            }
          }

          // Remove the object property....
          if (a[0] == 10) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (!obj) return;
            if (!prop) return;


            if (!reflection) {
              if (obj.__rid) {
                // send the command to the reflection object...
                // the command will then be reflected to all reflected objects...
                // console.log("**** sending command to the reflected object **** ");
                a[4] = obj.__rid;
                me._leaveCtx(ctxName);
                //console.log(JSON.stringify(a));
                me.execCommand(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              }
            }

            delete obj.data[prop];
            // Remove object property 
            /*
                   console.log("--- should have deleted property "+ prop);
                   console.log("from object ", obj);
                   setObj.__oldp = parentObj.__id;
                   setObj.__p = null; // The parent relationship
                   this._cmd(a, obj, setObj);*/

            if (!reflection) {
              me._leaveCtx(ctxName);
              me._sendCmdToRefs(a, isRemote).then(function() {
                myPromise.resolve(true);
              });
              return myPromise;
            } else {
              myPromise.resolve(true);
            }
          }



          // Insert new object with id...
          // The object should be already created and thus it exists in the
          // object cache of this "domain"
          if (a[0] == 7) {

            var parentObj = this._find(a[4]),
              insertedObj = this._find(a[2]),
              prop = "*",
              index = parentObj.data.length; // might check if valid...

            // Moving the object in the array
            if (parentObj && insertedObj) {

              // console.log(" insert OK ");

              if (!reflection) {
                // usually a plain new object is without _rid, it is usually just object..
                if (parentObj.__rid) {
                  // console.log("**** sending INSERT to the reflected object **** ");
                  a[4] = parentObj.__rid;
                  me._leaveCtx(ctxName);
                  // console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              // now the object is in the array...
              parentObj.data.push(insertedObj);
              insertedObj.__p = parentObj.__id;
              this._cmd(a, parentObj, insertedObj);



              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }

            } else {
              // console.error("Did not find the object to be inserted at all");
              myPromise.resolve(true);
            }

          }

          // Remove object, this might be also NOT from array...???
          if (a[0] == 8) {

            // this.saveCommand("removeItem", i, this._removedItem._guid, null );
            // [8, index, removedid, null, parentid ]
            var parentObj = this._find(a[4]),
              removedItem = this._find(a[2]),
              prop = "*",
              index = parentObj.data.indexOf(removedItem); // might check if valid...

            // Moving the object in the array
            if (parentObj && removedItem && (removedItem.__p == parentObj.__id)) {

              // __radioURL

              var bothReflected = (parentObj.__rid && removedItem.__rid);

              var bSameDomain = true;

              if (removedItem.__vpid && (removedItem.__vpid != removedItem.__pid)) {
                bSameDomain = false;
              }
              // if( removedItem.__radioURL ) bSameDomain = false;

              if (!reflection) {

                if (bSameDomain && (removedItem.__rid && parentObj.__rid)) {
                  //console.log("**** sending remove command to the reflected object **** ");
                  a[4] = parentObj.__rid;
                  a[2] = removedItem.__rid;
                  me._leaveCtx(ctxName);
                  // console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }


                if (!bSameDomain && (removedItem.__rid && parentObj.__rid)) {
                  if (removedItem.__vcid != removedItem.__id) {
                    //console.log("**** sending remove command to the reflected object **** ");
                    a[4] = removedItem.__vpid;
                    a[2] = removedItem.__vcid;
                    me._leaveCtx(ctxName);
                    //console.log(JSON.stringify(a));
                    me.execCommand(a, isRemote).then(function() {
                      myPromise.resolve(true);
                    });
                    return myPromise;
                  }
                }

              }

              // console.log("*** was able to find the object to remove ");
              // console.log("The index of the item to be remoed ", index);

              // now the object is in the array...
              parentObj.data.splice(index, 1);

              // Adding extra information to the object about it's removal
              removedItem.__removedAt = index;

              //console.log("Removed item");
              //console.log(removedItem);

              // console.log("===> making the _cmd");

              this._cmd(cmdCopy, parentObj, removedItem);
              removedItem.__p = null; // must be set to null...

              // Saving the write to root document
              if (!(bothReflected || isRemote || _isRemoteUpdate)) {
                // this.writeCommand(a);
              }

              if (!reflection) {

                // overriding a[2] is note really needed in normal case...

                me._leaveCtx(ctxName);
                // a[2] = removedItem.__rid; // just making sure that the reflection is used...
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }


            } else {
              console.error("Could not find the removed object");
              myPromise.resolve(true);
            }

          }



          if (a[0] == 12) {
            var obj = this._find(a[4]),
              prop = "*",
              len = obj.data.length,
              targetObj,
              i = 0;

            for (i = 0; i < len; i++) {
              var m = obj.data[i];
              if (m.__id == a[1]) {
                targetObj = m;
                break;
              }
            }

            // Questions here:
            // - should we move command list only on the parent object, not the child
            //  =>  this._moveCmdListToParent(targetObj); could be
            //      this._moveCmdListToParent(obj);
            // That is... where the command is really saved???
            // is the command actually written anywhere???
            //  - where is the writeCommand?
            // 
            // Moving the object in the array
            if (targetObj) {

              var targetIndex = parseInt(a[2]),
                mObj = this._find(a[1]),
                bBothRemote = obj.__rid && mObj.__rid;

              if (!reflection) {
                if (bBothRemote) {
                  // send the command to the reflection object...
                  // the command will then be reflected to all reflected objects...
                  // console.log("**** sending moveToIndex CMD to the reflected object **** ");

                  if (mObj.__vpid) {
                    a[4] = mObj.__vpid;
                    a[1] = mObj.__vcid;
                  } else {
                    a[4] = obj.__rid;
                    a[1] = mObj.__rid;
                  }

                  //a[4] = obj.__rid;
                  //a[1] = mObj.__rid;
                  me._leaveCtx(ctxName);
                  // console.log(JSON.stringify(a));
                  //myPromise.resolve(true);

                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });

                  return myPromise;
                }
              }

              //console.log("==== MOVING ==== ", targetObj);
              //console.log(i + "=> "+targetIndex);

              _execInfo.fromIndex = i;
              obj.__fromIndex = i;
              targetObj.__fromIndex = i;

              obj.data.splice(i, 1);
              obj.data.splice(targetIndex, 0, targetObj);
              this._cmd(cmdCopy, obj, targetObj, {
                fromIndex: i
              });

              if (!(bBothRemote || isRemote || _isRemoteUpdate)) {
                // this.writeCommand(a);
              }

              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }

            } else {
              // console.error("object with ID "+a[1]+" not found");
              myPromise.resolve(true);
            }

          }



          // push a remote object into array
          if (a[0] == 16) {

            // Object to in
            // _changeToRemote
            // [16, <URL>, <ID>, <LocalID>, <ParentObject> ]
            //console.log("%c COMMAND 16 ",  'background: #222; color: #bada55');
            //console.log(a);


            var objToChange = this._find(a[4]),
              remoteURL = a[1],
              remoteID = a[2],
              localID = a[3],
              parentID = a[4];

            if (objToChange && objToChange.data) {

              // reflection ...

              console.log(" - - - about to insert remote object into array - - - ");

              var isRemoteHere = this._find(remoteID),
                isLocalHere = this._find(localID);

              console.log("Checking if the objects are already here...");
              console.log("Remote object ", isRemoteHere);
              console.log("Local object ", isLocalHere);

              //console.log("changeRemote - remoteID ", remoteID);
              //console.log("changeRemote - localID ", localID);
              //console.log("changeRemote - parentID ", parentID);

              var newRawData = {
                data: {},
                __rid: remoteID,
                __id: localID,
                __undone: true
              };
              var newObj;
              /*
                       var newObj = _data({
                               data : {},
                               __id : localID,
                               __rid : remoteID
                           });
                       */
              if (!me._waitingPromises) {
                me._waitingPromises = [];
              }
              me._waitingPromises.push(myPromise);

              // loading the object and inserting into the other reflections is the hardest thing to do here
              // how to make the insertion visible at the other object at real time...
              //newObj.then(
              //    function() {

              //console.log("%c COMMAND 16, did NEW object ",  'background: #222; color: #bada55');
              //console.log( newObj._docData );

              // adding the new object into the data array of the parent object
              // objToChange.data.push( newObj._docData );   
              objToChange.data.push(newRawData);

              newRawData.__radioURL = remoteURL;

              var loaderPromise = _docUp()._changeToRemote(newRawData, remoteURL, remoteID);
              // it should now have the data...
              loaderPromise.then(function(d) {

                delete newRawData.__undone;
                //console.log("%c COMMMAND 16 a "+remoteURL+" new object creation, loader promise Returned with ",  'background: #222; color: #bada55');
                //console.log(d);
                //console.log("The object to be changed is now ", newObj);

                var ff = me._find(localID);
                //console.log("From cache it is ", localID);
                //console.log(ff);

                //console.log("%c ---- checking here now... -----", "background : red");
                newRawData.__p = parentID;
                //console.log(JSON.parse(JSON.stringify(newObj._docData)));

                var oldObj = me._find(remoteID);
                //console.log("the old data was ");
                //console.log(oldObj);

                newRawData.__p = parentID;

                if (reflection && opts) {
                  newRawData.__vpid = opts.__vpid;
                  newRawData.__vcid = opts.__vcid;
                } else {
                  newRawData.__vpid = parentID;
                  newRawData.__vcid = localID;
                }
                me._addReflection(newRawData.__vcid, newRawData.__id);

                //console.log("Parent Id  ", parentID);
                //console.log("Local ID ", localID);
                //console.log(JSON.parse(JSON.stringify(newObj._docData)));

                console.log("The data before _data()");
                console.log(JSON.parse(JSON.stringify(newRawData)));

                newObj = _data(newRawData);

                newObj.then(
                  function() {

                    // THIS _cmd may be the problem, ????
                    // newObj
                    // objToChange
                    me._cmd([7, objToChange.data.length, localID, null, parentID], objToChange, newObj);
                    if (!reflection) {

                      me._sendCmdToRefs(a, isRemote).then(function() {
                        myPromise.resolve(d);
                      });

                      // myPromise.resolve(d);
                    } else {
                      myPromise.resolve(d);
                    }

                  });


              })
              //});

              // if this is the real document, then write the command down to the stream
              if (!(isRemote || _isRemoteUpdate)) {
                console.log("Writing the command .... ");
                // this.writeCommand(a);
              }
              me._leaveCtx(ctxName);


            }


          }


        } catch (e) {
          console.error(e.message);
          me._leaveCtx(ctxName);
          myPromise.resolve(e.message);
        }

        me._leaveCtx(ctxName);

        return myPromise;

        // this._virtualCommand( a, isRemote || _isRemoteUpdate );

      }
      _myTrait_._removeFromCache = function(obj) {

        if (!obj) {
          var me = this;
          this._forMembers(function(m) {
            if (m) m._removeFromCache();
          });
          this._removeFromCache(this);
        } else {

          if (this.isObject(obj)) {
            var g = obj._guid;
            if (g) {
              console.log("*** removing " + g);
              delete _objectCache[g];
            }
          } else {
            if (obj) {
              console.log("*** removing " + obj);
              delete _objectCache[obj];
            }
          }
        }
      }
      _myTrait_._sendCmdToRefs = function(a, isRemote) {

        // should send command to reflections of the source object

        // _localReflections[objectId] = list of reflections of the object

        var me = this;
        var myPromise = _promise(),
          bWaiting = false;

        // the command is similar but it will be targetted to the virtual instances of the
        // actual object, the problem might be how to keep them in sync - for example if you
        // do create another object under the other object how to inform the other object that
        // this object is now virtual copy etc. but that is perhaps only technical things nothing
        // very difficult in itself??

        // The first test should be quite simple, just setting a value and delegating it.
        if (a[0] == 4) {
          //console.log("***** sending to local reflections **** ");
          //console.log(_localReflections);
          if (_localReflections) {
            var list = _localReflections[a[4]];
            if (list && list.length) {
              _execInfo.reflection = true;
              bWaiting = true;
              var cmdList = [];
              list.forEach(function(objid) {
                a[4] = objid;
                cmdList.push(a.slice());
              });

              me._execCommandsPromise(cmdList, isRemote, true).then(function() {
                // console.log("The 4 command list was processed ");
                _execInfo.reflection = false;
                myPromise.resolve(true);
              });
            }
          }

        }

        if (a[0] == 13) {
          // console.log("***** sending ACE command to local reflections **** ");
          if (_localReflections) {
            var list = _localReflections[a[4]];
            if (list && list.length) {
              /*
                       _execInfo.reflection = true;
                       list.forEach( function(objid) {
                           a[4] = objid; 
                           console.log(JSON.stringify(a));
                           me.execCommand(a, isRemote);
                       });
                       _execInfo.reflection = false;
                       */

              _execInfo.reflection = true;
              bWaiting = true;
              var cmdList = [];
              list.forEach(function(objid) {
                a[4] = objid;
                console.log(JSON.stringify(a));
                cmdList.push(a.slice());
                // me.execCommand(a, isRemote);
              });

              me._execCommandsPromise(cmdList, isRemote, true).then(function() {
                _execInfo.reflection = false;
                myPromise.resolve(true);
              });

            }
          }

        }

        if (a[0] == 7) {
          // console.log("***** sending INSERT OBJECT to local reflections **** ");
          if (_localReflections) {
            var list = _localReflections[a[4]],
              newObjId = a[2];
            // console.log("list length was  ", list.length);
            if (list && list.length) {

              _execInfo.reflection = true;
              bWaiting = true;
              var cmdList = [],
                refProms = [];
              list.forEach(function(objid) {
                var newObj = me._find(newObjId);

                var myCmd = a.slice();
                myCmd[4] = objid;

                // create a reflection of the new object...
                var refProm = me._createReflection(newObj);
                // var refObj = me._createReflection( newObj );
                refProm.then(function(refObj) {
                  myCmd[2] = refObj.__id;
                  console.log(myCmd);
                  cmdList.push(myCmd);
                });
                refProms.push(refProm);
              });

              if (refProms.length) {
                var s = _promise();
                s.all(refProms).then(function() {
                  me._execCommandsPromise(cmdList, isRemote, true).then(function() {
                    _execInfo.reflection = false;
                    myPromise.resolve(true);
                  });
                });
                s.resolve(true);
              } else {
                myPromise.resolve(true);
              }
            }
          }
        }

        if ((a[0] == 5) || (a[0] == 10)) {
          // console.log("***** sending INSERT OBJECT to local reflections **** ");
          if (_localReflections) {
            var list = _localReflections[a[4]],
              newObjId = a[2];
            // console.log("list length was  ", list.length);
            if (list && list.length) {

              _execInfo.reflection = true;
              bWaiting = true;
              var cmdList = [],
                refProms = [];
              list.forEach(function(objid) {
                var newObj = me._find(newObjId);

                var myCmd = a.slice();
                myCmd[4] = objid;

                // create a reflection of the new object...
                var refProm = me._createReflection(newObj);
                // var refObj = me._createReflection( newObj );
                refProm.then(function(refObj) {
                  myCmd[2] = refObj.__id;
                  console.log(myCmd);
                  cmdList.push(myCmd);
                });
                refProms.push(refProm);
              });

              if (refProms.length) {
                var s = _promise();
                s.all(refProms).then(function() {
                  me._execCommandsPromise(cmdList, isRemote, true).then(function() {
                    _execInfo.reflection = false;
                    myPromise.resolve(true);
                  });
                });
                s.resolve(true);
              } else {
                myPromise.resolve(true);
              }
            }
          }
        }


        if (a[0] == 16) {
          // console.log("***** sending INSERT REMOTE OBJECT to local reflections **** ");
          if (_localReflections) {
            var list = _localReflections[a[4]];
            if (list && list.length) {
              /*
                       _execInfo.reflection = true;
                       list.forEach( function(objid) {
                           a[4] = objid; 
                           console.log(JSON.stringify(a));
                           me.execCommand(a, isRemote);                
                       });
                       _execInfo.reflection = false;
                       */
              _execInfo.reflection = true;

              // The real thingie might be here...

              var opts = {
                __vcid: a[3],
                __vpid: a[4]
              };
              //_execInfo.__vcid = a[3];
              //_execInfo.__vpid = a[4];

              bWaiting = true;
              var cmdList = [];
              list.forEach(function(objid) {
                a[4] = objid;
                a[3] = me.guid();
                console.log(JSON.stringify(a));
                cmdList.push(a.slice());
                // me.execCommand(a, isRemote);
              });

              me._execCommandsPromise(cmdList, isRemote, true, null, opts).then(function() {
                _execInfo.reflection = false;
                myPromise.resolve(true);
              });
            }
          }

        }

        if (a[0] == 8) {
          // console.log("***** sending REMOVE local reflections **** ");
          if (_localReflections) {
            // [8,0,"sxq58un8z1tt9e4e1hoeac7toi",null,"anll5dkp95cxfdn9dq9b0s3zhn"]
            /*
                   var list = _localReflections[a[4]];
                   if(list) {
                       _execInfo.reflection = true;
                       list.forEach( function(objid) {
                           a[4] = objid; 
                           var childRefs = _localReflections[a[2]];
                           
                           childRefs.forEach( function(chid) {
                               var theObj = me._find(chid);
                               if(theObj && theObj.__p == objid) {
                                   a[2] = chid;
                                   console.log(JSON.stringify(a));
                                   me.execCommand(a, isRemote);
                               }                    
                           });
                           
           
                       });
                       _execInfo.reflection = false;
                   }
                   */
            // console.log(a);
            var list = _localReflections[a[2]];
            // console.log(list);
            if (list && list.length) {
              /*
                       _execInfo.reflection = true;
                       list.forEach( function(objid) {
                           a[2] = objid; 
                           var theObj = me._find(objid);
                           if(theObj && theObj.__p) {
                               a[4] = theObj.__p;
                               console.log(JSON.stringify(a));
                               me.execCommand(a, isRemote);
                           }
                       });
                       _execInfo.reflection = false;
                       */
              _execInfo.reflection = true;
              bWaiting = true;
              var cmdList = [];
              list.forEach(function(objid) {
                a[2] = objid;
                var theObj = me._find(objid);
                if (theObj && theObj.__p) {
                  a[4] = theObj.__p;
                  // console.log(JSON.stringify(a));
                  cmdList.push(a.slice());
                }
              });

              me._execCommandsPromise(cmdList, isRemote, true).then(function() {
                _execInfo.reflection = false;
                myPromise.resolve(true);
              });

            }



          }

        }

        // move command reflection
        if (a[0] == 12) {
          // console.log("***** sending moveToIndex for local reflections **** ");
          if (_localReflections) {
            var list = _localReflections[a[1]];
            if (list && list.length) {
              /*
                       _execInfo.reflection = true;
                       list.forEach( function(objid) {
                           a[1] = objid; 
                           var theObj = me._find(objid);
                           if(theObj && theObj.__p) {
                               a[4] = theObj.__p;
                               console.log(JSON.stringify(a));
                               me.execCommand(a, isRemote);
                           }
                       });
                       _execInfo.reflection = false;*/

              _execInfo.reflection = true;
              bWaiting = true;
              var cmdList = [];
              list.forEach(function(objid) {
                a[1] = objid;
                var theObj = me._find(objid);
                if (theObj && theObj.__p) {
                  a[4] = theObj.__p;
                  // console.log(JSON.stringify(a));
                  cmdList.push(a.slice());
                }
              });

              me._execCommandsPromise(cmdList, isRemote, true).then(function() {
                _execInfo.reflection = false;
                myPromise.resolve(true);
              });


            }
          }

        }

        if (!bWaiting) myPromise.resolve(true);

        return myPromise;


      }
      _myTrait_._sendToInListeners = function(data) {

        if (_incomingDataFn) {
          _incomingDataFn.forEach(function(fn) {
            fn(data);
          });
        }
      }
      _myTrait_._setCmdRemoteUpdate = function(v) {
        _isRemoteUpdate = v;
      }
      _myTrait_._transformCmdFromNs = function(cmd, ns) {
        var map = _cmdNsMap,
          nextCmd = cmd.slice(),
          swap = map[cmd[0]],
          me = this;
        if (swap) {
          swap.forEach(function(index) {
            nextCmd[index] = me._idFromNs(nextCmd[index], ns);
          });
        }
        return nextCmd;
      }
      _myTrait_._transformCmdToNs = function(cmd, ns) {


        var map = _cmdNsMap,
          nextCmd = cmd.slice(),
          swap = map[cmd[0]],
          me = this;
        if (swap) {
          //console.log("Swap", swap);
          swap.forEach(function(index) {
            nextCmd[index] = me._idToNs(nextCmd[index], ns);
          });
        } else {
          //console.log("Did not have swap");
          //console.log(map);
        }
        return nextCmd;

      }
      _myTrait_._transformObjFromNs = function(obj, ns) {
        if (obj && obj.__id) {
          obj.__id = this._idFromNs(obj.__id, ns);
          for (var n in obj.data) {
            if (obj.data.hasOwnProperty(n)) {
              if (this.isObject(obj.data[n])) this._transformObjFromNs(obj.data[n], ns);
            }
          }
        }
        return obj;

      }
      _myTrait_._transformObjToNs = function(obj, ns) {

        if (obj && obj.__id) {

          var nsNext;
          if (obj.__radioURL) {
            var nsNext = this._getNsShorthand(obj.__radioURL);
          }

          if (!obj.__rid) {
            ns = nsNext || ns;
          }
          // obj = me._transformObjToNs( obj, ns );
          obj.__id = this._idToNs(obj.__id, ns);
          if (obj.__p) {
            obj.__p = this._idToNs(obj.__p, ns);
          }
          for (var n in obj.data) {
            if (obj.data.hasOwnProperty(n)) {
              if (this.isObject(obj.data[n])) this._transformObjToNs(obj.data[n], nsNext || ns);
            }
          }
        }

        return obj;


      }
      _myTrait_._transformToNsBeforeInsert = function(obj, parentObj, parentObj2) {

        // OK, so...

        var cmdList = obj.__ctxCmdList;
        var ns = this._nsFromId(parentObj.__id);

        console.log(" _transformToNsBeforeInsert ");

        var me = this;
        if (ns) {
          console.log("Using namespace " + ns);
          cmdList.forEach(function(c) {
            c.cmd = me._transformCmdToNs(c.cmd, ns);
          });
          obj = me._transformObjToNs(obj, ns);
          obj.__ctxCmdList = cmdList;
          this._addToCache(obj);
          return obj;
        }
        // this._addToCache( obj );
        return obj;



      }
      _myTrait_.addCommandListener = function(fn) {

        _commandListener = fn;
      }
      _myTrait_.addListener = function(path, fn) {

        if (!_listeners) _listeners = {};

        // For example items/0.x listens to first items .x variable jne.

        var parts = path.split(".");

        var pathPart = parts[0],
          mPart;
        if (parts.length > 1) {
          mPart = parts[1];
        }

        var obj = this.fetch(pathPart);

        if (obj && mPart) {
          // The object does exist
          var name = obj.__id + "::" + mPart;
          if (!_listeners[name]) _listeners[name] = [];
          _listeners[name].push(fn);
        } else {
          //console.error("Did not find ", path);
          //console.log(parts);
        }
      }
      _myTrait_.addToCache = function(obj) {

        if (!_objectCache) _objectCache = {};

        if (obj._guid) {
          _objectCache[obj._guid] = obj;
        }
      }
      _myTrait_.compressCmdBuffer = function(cmdList) {

        console.log(JSON.stringify(cmdList));

        // this simple code should compress the cmdBuffer
        var len = cmdList.length,
          setProps = {};

        for (var i = len - 1; i >= 0; i--) {
          var c = cmdList[i];
          // eliminate only set properties
          if (c[0] == 4) {
            var pName = c[1];
            if (!setProps[pName]) {
              setProps[pName] = true;
            } else {
              // should remove this line from the array...
              cmdList.splice(i, 1);
            }
          }
        }
        return cmdList;

      }
      _myTrait_.execCommand = function(a, isRemote, reflection, rootDoc, opts) {

        // The new version of the execCommand could be something like this;
        if (1) {

          // console.log("Exec cmd ", a);

          var obj = this._find(a[4]),
            url,
            cmd = a[0];
          var cmdCopy = a.slice();
          var rootDoc = this._findParentWithUrl(obj);
          var ctxName = "::" + a[0] + "::" + a[1];

          // console.log("Root doc", rootDoc);

          if (rootDoc && rootDoc.__radioURL) {
            url = rootDoc.__radioURL;
          }
          // Then, you have to push the command to the URL of the channel this command really belongs
          // to or no radio / url at all... ???????

          // IF url THEN push the command to the channel 

          // IF there is URL then push this command to the channel
          if (url) {
            // console.log("%c push Channel Command COMMAND "+cmd+" ctx : "+ctxName,  'background: orange; color: #bada55');

            // ** insert object may generate multiple commands here...
            var localP = this._localExecCmd(a, isRemote, reflection, rootDoc, opts);

            // This might be done from the _localExecCmd
            // this._pushChannelCommand( url, a, ctxName, false, rootDoc.__radio );

            return localP;
          } else {
            // ELSE standard write command to command buffer and create change for the
            // object according to the command
            // NOTE: should be the easiest case of all..

            // console.log("%c LOCAL COMMAND "+cmd+" ",  'background: blue; color: #bada55');
            var myPromise = _promise();

            // Create Object command...
            if (a[0] == 1) {
              // console.log("Staring to create the new object");
              var newObj = {
                data: {},
                __id: a[1]
              };
              this._addToCache(newObj);
              this.writeCommand(a);
              console.log("DID create the new object");
            }

            // Create Array command...
            if (a[0] == 2) {
              var newObj = {
                data: [],
                __id: a[1]
              };
              this._addToCache(newObj);
              this.writeCommand(a);
            }

            // console.log("Did execute the command");

            // The actual change of the object based on command "a"
            if (a[0] == 4) {

              var prop = a[1];

              if (obj) {

                // the exec info "oldValue" is only for the _cmd() function                
                _execInfo.oldValue = obj.data[prop];
                obj.data[prop] = a[2]; // value is now set...
                this._cmd(a, obj, null);
                this.writeCommand(a);
                if (_listeners) {
                  var lName = obj.__id + "::" + prop,
                    eList = _listeners[lName];
                  if (eList) {
                    // console.log("**** got", lName);
                    eList.forEach(function(fn) {
                      fn(obj, a[2]);
                    })
                  }
                }
              }
            }

            // There is not the change list coming...
            if (a[0] == 13) {

              var prop = a[1],
                conv = aceCmdConvert();

              // The string gets updated like this...
              obj.data[prop] = conv.runToString(obj.data[prop], a[2]);

              // always "not remote"
              _doingRemote = false;

              // for local entries, a "set" event is delegated, in case some objects are
              // listening for the SET
              var tmpCmd = [4, prop, obj.data[prop], null, a[4]];
              this._cmd(tmpCmd, obj, null);

              // But, for the writes, the ACE write is used
              this.writeCommand(a);

              if (_listeners) {
                var lName = obj.__id + "::" + prop,
                  eList = _listeners[lName];
                if (eList) {
                  // console.log("**** got", lName);
                  eList.forEach(function(fn) {
                    fn(obj, obj.data[prop]);
                  })
                }
              }
            }

            // Setting the member of ...
            if (a[0] == 5) {

              var prop = a[1],
                setObj = this._find(a[2]);

              if (!obj) return;
              if (!setObj) return;

              obj.data[prop] = setObj; // value is now set...
              setObj.__p = obj.__id; // The parent relationship
              this._cmd(a, obj, setObj);
              this._moveCmdListToParent(setObj);
              this.writeCommand(a);

            }


            // Insert new object with id...
            // The object should be already created and thus it exists in the
            // object cache of this "domain"
            if (a[0] == 7) {

              var parentObj = this._find(a[4]),
                insertedObj = this._find(a[2]),
                prop = "*",
                index = parentObj.data.length; // might check if valid...

              // Moving the object in the array
              if (parentObj && insertedObj) {

                // now the object is in the array...
                parentObj.data.push(insertedObj);
                insertedObj.__p = parentObj.__id;
                this._cmd(a, parentObj, insertedObj);

                this._moveCmdListToParent(insertedObj);
                this.writeCommand(a);
              }
            }

            // Remove object, this might be also NOT from array...???
            if (a[0] == 8) {

              var parentObj = this._find(a[4]),
                removedItem = this._find(a[2]),
                prop = "*",
                index = parentObj.data.indexOf(removedItem); // might check if valid...

              // Moving the object in the array
              if (parentObj && removedItem) {

                // now the object is in the array...
                parentObj.data.splice(index, 1);

                // Adding extra information to the object about it's removal
                removedItem.__removedAt = index;



                this._cmd(a, parentObj, removedItem);
                removedItem.__p = null; // must be set to null...
                this.writeCommand(cmdCopy);

              }

            }


            // Remove the object property....
            if (a[0] == 10) {

              var obj = this._find(a[4]),
                prop = a[1];
              console.log("*** unsetting property ****", prop);
              if (obj && prop) {
                // unsetting a property does not work right now...
                delete obj.data[prop];
                this.writeCommand(a);
              }
            }


            if (a[0] == 12) {
              var obj = this._find(a[4]),
                prop = "*",
                len = obj.data.length,
                targetObj,
                i = 0;

              for (i = 0; i < len; i++) {
                var m = obj.data[i];
                if (m.__id == a[1]) {
                  targetObj = m;
                  break;
                }
              }

              // Questions here:
              // - should we move command list only on the parent object, not the child
              //  =>  this._moveCmdListToParent(targetObj); could be
              //      this._moveCmdListToParent(obj);
              // That is... where the command is really saved???
              // is the command actually written anywhere???
              //  - where is the writeCommand?
              // 
              // Moving the object in the array
              if (targetObj) {

                var targetIndex = parseInt(a[2]),
                  mObj = this._find(a[1]);

                _execInfo.fromIndex = i;
                obj.__fromIndex = i;
                targetObj.__fromIndex = i;

                obj.data.splice(i, 1);
                obj.data.splice(targetIndex, 0, targetObj);
                this._cmd(a, obj, targetObj);
                this.writeCommand(cmdCopy);
              }

            }

            // Create a remote object...
            if (a[0] == 16) {

              var objToChange = this._find(a[4]),
                remoteURL = a[1],
                remoteID = a[2],
                localID = a[3],
                parentID = a[4];

              if (objToChange && objToChange.data) {

                var myPromise = _promise();
                var newObj = _data({
                  data: {},
                  __id: localID,
                  __rid: remoteID
                });

                if (!me._waitingPromises) {
                  me._waitingPromises = [];
                }
                me._waitingPromises.push(myPromise);
                me._enterCtx(ctxName);
                newObj.then(
                  function() {
                    // adding the new object into the data array of the parent object
                    objToChange.data.push(newObj._docData);
                    newObj._docData.__radioURL = remoteURL;
                    delete newObj._docData.__ctxCmdList;
                    delete newObj._docData.__cmdList;

                    var loaderPromise = _docUp()._changeToRemote(newObj._docData, remoteURL, remoteID);
                    // it should now have the data...
                    loaderPromise.then(function(d) {
                      var ff = me._find(localID);
                      newObj._docData.__p = parentID;
                      newObj._docData.__vpid = parentID;
                      newObj._initializeData(newObj._docData); // make sure functions do exist
                      var updateObj = _data(localID);
                      updateObj.then(
                        function() {
                          me._cmd([7, objToChange.data.length, localID, null, parentID], objToChange, updateObj);
                          if (!reflection) {
                            me._sendCmdToRefs(a, isRemote).then(function() {
                              myPromise.resolve(d);
                            });
                          } else {
                            myPromise.resolve(d);
                          }

                        });


                    })
                  });

                this.writeCommand(a);
                me._leaveCtx(ctxName);


              } else {
                myPromise.resolve(true);
              }


            } else {
              myPromise.resolve(true);
            }

            return myPromise;
          }
          // after retrun myPromise


        }
        return;

        // perhaps the execCommand is no longer a "remote" call in any case...
        /*
               var url = this._findRadioURL();
               me._pushChannelCommand( url, cmd, {}, true );
           */

        var me = this;
        var myPromise = _promise();

        if (this.isArray(a[0])) {
          console.log("Array of promises.... ");
          this._execCommandsPromise(a, isRemote).then(function() {
            myPromise.resolve(true);
          });
          return myPromise;
        }



        var ctxName = "::" + a[0] + "::" + a[1]; // i.e 4::x == set, x 
        if (!me._enterCtx(ctxName)) {
          console.log("===> could not enter");
          myPromise.resolve(true);
          return myPromise;
        }

        console.log("*** execCommand ", a);

        // this object holds the status of the execution
        var execStatus = this._getExecInfo();



        try {


          //console.log("Got command, the context is now");
          //console.log(JSON.stringify( me._getCtx() ));



          // Create Object command...
          if (a[0] == 1) {
            var newObj = {
              data: {},
              __id: a[1]
            }
            var hash = this._getObjectHash();
            // console.log("Hash ", hash);
            hash[newObj.__id] = newObj;
            // this._cmd(a, obj, null);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            }

            myPromise.resolve(true);
          }

          if (a[0] == 2) {
            var newObj = {
              data: [],
              __id: a[1]
            }
            var hash = this._getObjectHash();
            // console.log("Hash ", hash);
            hash[newObj.__id] = newObj;
            // this._cmd(a, obj, null);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            }
            myPromise.resolve(true);
          }

          // console.log("Did execute the command");

          // The actual change of the object based on command "a"
          if (a[0] == 4) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (obj) {

              if (!reflection) {
                if (obj.__rid) {
                  // send the command to the reflection object...
                  // the command will then be reflected to all reflected objects...
                  console.log("**** sending command to the reflected object **** ");
                  a[4] = obj.__rid;
                  me._leaveCtx(ctxName);
                  //console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }
              // console.log("Was asked to update ", prop, "to ", a[2]);

              _execInfo.oldValue = obj.data[prop];
              obj.data[prop] = a[2]; // value is now set...

              this._cmd(a, obj, null);

              // Saving the write to root document
              if (!obj.__rid && !(isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              } else {
                // console.log("*remote cmd*");
              }

              if (_listeners) {
                var lName = obj.__id + "::" + prop,
                  eList = _listeners[lName];
                if (eList) {
                  // console.log("**** got", lName);
                  eList.forEach(function(fn) {
                    fn(obj, a[2]);
                  })
                }
              }
              if (!reflection) {
                me._leaveCtx(ctxName);
                console.log("**** commands to the refs... **** ");
                me._sendCmdToRefs(a, isRemote).then(function() {
                  console.log("**** ... commands to refs done. **** ");
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                console.log(".... looks like this was reflection??? ");
                myPromise.resolve(true);
              }
            } else {
              myPromise.resolve(true);
            }
          }

          // There is not the change list coming...
          if (a[0] == 13) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (!reflection) {
              if (obj.__rid) {
                // send the command to the reflection object...
                // the command will then be reflected to all reflected objects...
                console.log("**** sending ACE update command to the reflected object **** ");
                a[4] = obj.__rid;
                me._leaveCtx(ctxName);
                console.log(JSON.stringify(a));
                me.execCommand(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              }
            }

            var conv = aceCmdConvert();

            // The string gets updated like this...
            obj.data[prop] = conv.runToString(obj.data[prop], a[2]);

            // ******* this was here but might be moved into the ace editor update ********
            _doingRemote = isRemote || _isRemoteUpdate;

            var tmpCmd = [4, prop, obj.data[prop], null, a[4]];
            this._cmd(tmpCmd, obj, null);

            // But, for the remote stuff, we are going to use this..
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            } else {
              this._cmd(a, obj, null);
            }

            _doingRemote = false;

            if (_listeners) {
              var lName = obj.__id + "::" + prop,
                eList = _listeners[lName];
              if (eList) {
                // console.log("**** got", lName);
                eList.forEach(function(fn) {
                  fn(obj, obj.data[prop]);
                })
              }
            }

            if (!reflection) {
              me._leaveCtx(ctxName);
              me._sendCmdToRefs(a, isRemote).then(function() {
                myPromise.resolve(true);
              });
              return myPromise;
            } else {
              myPromise.resolve(true);
            }



          }

          // Setting the member of ...
          if (a[0] == 5) {

            //console.log("Hash contents");
            //console.log(this._getObjectHash());

            var obj = this._find(a[4]),
              prop = a[1];
            setObj = this._find(a[2]);


            if (!obj) return;
            if (!setObj) return;

            obj.data[prop] = setObj; // value is now set...
            setObj.__p = obj.__id; // The parent relationship
            this._cmd(a, obj, setObj);

            this._moveCmdListToParent(setObj);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            } else {

            }
            myPromise.resolve(true);
          }


          // Insert new object with id...
          // The object should be already created and thus it exists in the
          // object cache of this "domain"
          if (a[0] == 7) {

            var parentObj = this._find(a[4]),
              insertedObj = this._find(a[2]),
              prop = "*",
              index = parentObj.data.length; // might check if valid...

            // Moving the object in the array
            if (parentObj && insertedObj) {

              console.log(" insert OK ");

              if (!reflection) {
                // usually a plain new object is without _rid, it is usually just object..
                if (parentObj.__rid) {
                  console.log("**** sending INSERT to the reflected object **** ");
                  a[4] = parentObj.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              // now the object is in the array...
              parentObj.data.push(insertedObj);
              insertedObj.__p = parentObj.__id;
              this._cmd(a, parentObj, insertedObj);

              if (!parentObj.__rid) this._moveCmdListToParent(insertedObj);

              if (parentObj.__rid) {
                console.log("Can not write command, because parent object has __rid");
              }

              // Saving the write to root document
              if (!(parentObj.__rid || isRemote || _isRemoteUpdate)) {
                console.log(" creating write ");
                this.writeCommand(a);
              }

              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }


            }

          }

          // Remove object, this might be also NOT from array...???
          if (a[0] == 8) {

            console.log("%c COMMAND 8 ", 'background: red; color: #bada55');
            console.log("*** remove item command ");
            console.log(a);

            // ** skipping this command        
            /*
                   me._leaveCtx(ctxName);
                   myPromise.resolve(true);
                   
                   return myPromise;
           */

            // this.saveCommand("removeItem", i, this._removedItem._guid, null );
            // [8, index, removedid, null, parentid ]
            var parentObj = this._find(a[4]),
              removedItem = this._find(a[2]),
              prop = "*",
              index = parentObj.data.indexOf(removedItem); // might check if valid...

            // Moving the object in the array
            if (parentObj && removedItem) {

              // __radioURL

              var bothReflected = (parentObj.__rid && removedItem.__rid);

              var bSameDomain = true;

              if (removedItem.__vpid && (removedItem.__vpid != removedItem.__pid)) {
                bSameDomain = false;
              }
              // if( removedItem.__radioURL ) bSameDomain = false;

              if (!reflection) {

                if (bSameDomain && (removedItem.__rid && parentObj.__rid)) {
                  console.log("**** sending remove command to the reflected object **** ");
                  a[4] = parentObj.__rid;
                  a[2] = removedItem.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }


                if (!bSameDomain && (removedItem.__rid && parentObj.__rid)) {
                  console.log("**** sending remove command to the reflected object **** ");
                  a[4] = removedItem.__vpid;
                  a[2] = removedItem.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }


                /*
                           console.log("*** Was not same domain, exiting...");
                           
                           me._leaveCtx(ctxName);
                           myPromise.resolve(true);
                           
                           return myPromise;  
                           
                           if(removedItem.__rid && parentObj.__pid) {
                                           
                                                 
                               console.log("**** sending remove command to the reflected object **** ");
                               a[4] = removedItem.__vpid || removedItem.__pid;
                               a[2] = removedItem.__rid;
                               me._leaveCtx(ctxName);
                               console.log(JSON.stringify(a));
                               me.execCommand(a, isRemote).then( function() {
                                   myPromise.resolve(true);
                               });
                               return myPromise;
                           }*/
              }

              console.log("*** was able to find the object to remove ");
              // console.log("The index of the item to be remoed ", index);

              // now the object is in the array...
              parentObj.data.splice(index, 1);

              // Adding extra information to the object about it's removal
              removedItem.__removedAt = index;

              //console.log("Removed item");
              //console.log(removedItem);

              // console.log("===> making the _cmd");

              this._cmd(a, parentObj, removedItem);
              removedItem.__p = null; // must be set to null...

              // Saving the write to root document
              if (!(bothReflected || isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              }

              if (!reflection) {
                me._leaveCtx(ctxName);
                // a[2] = removedItem.__rid; // just making sure that the reflection is used...
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }


            }

          }



          if (a[0] == 12) {
            var obj = this._find(a[4]),
              prop = "*",
              len = obj.data.length,
              targetObj,
              i = 0;

            for (i = 0; i < len; i++) {
              var m = obj.data[i];
              if (m.__id == a[1]) {
                targetObj = m;
                break;
              }
            }

            // Questions here:
            // - should we move command list only on the parent object, not the child
            //  =>  this._moveCmdListToParent(targetObj); could be
            //      this._moveCmdListToParent(obj);
            // That is... where the command is really saved???
            // is the command actually written anywhere???
            //  - where is the writeCommand?
            // 
            // Moving the object in the array
            if (targetObj) {

              var targetIndex = parseInt(a[2]),
                mObj = this._find(a[1]),
                bBothRemote = obj.__rid && mObj.__rid;

              if (!reflection) {
                if (bBothRemote) {
                  // send the command to the reflection object...
                  // the command will then be reflected to all reflected objects...
                  console.log("**** sending moveToIndex CMD to the reflected object **** ");
                  a[4] = obj.__rid;
                  a[1] = mObj.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  myPromise.resolve(true);
                  /*
                               me.execCommand(a, isRemote).then( function() {
                                   myPromise.resolve(true);
                               });
                               */
                  return myPromise;
                }
              }

              //console.log("==== MOVING ==== ", targetObj);
              //console.log(i + "=> "+targetIndex);

              _execInfo.fromIndex = i;

              obj.data.splice(i, 1);
              obj.data.splice(targetIndex, 0, targetObj);
              this._cmd(a, obj, targetObj);

              if (!(bBothRemote || isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              }

              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }

            }

          }



          // push a remote object into array
          if (a[0] == 16) {

            // Object to in
            // _changeToRemote
            // [16, <URL>, <ID>, <LocalID>, <ParentObject> ]
            console.log("%c COMMAND 16 ", 'background: #222; color: #bada55');
            console.log(a);


            var objToChange = this._find(a[4]),
              remoteURL = a[1],
              remoteID = a[2],
              localID = a[3],
              parentID = a[4];

            if (objToChange && objToChange.data) {

              if (!reflection) {
                // usually a plain new object is without _rid, it is usually just object..
                if (objToChange.__rid) {
                  a[4] = objToChange.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              console.log(" - - - about to insert remote object into array - - - ");
              var newObj = _data({
                data: {},
                __id: localID,
                __rid: remoteID
              });

              if (!me._waitingPromises) {
                me._waitingPromises = [];
              }
              me._waitingPromises.push(myPromise);

              newObj.then(
                function() {

                  console.log("%c COMMAND 16, did NEW object ", 'background: #222; color: #bada55');
                  console.log(newObj._docData);

                  // adding the new object into the data array of the parent object
                  objToChange.data.push(newObj._docData);
                  newObj._docData.__radioURL = remoteURL;
                  delete newObj._docData.__ctxCmdList;
                  delete newObj._docData.__cmdList;

                  var loaderPromise = _docUp()._changeToRemote(newObj._docData, remoteURL, remoteID);
                  // it should now have the data...
                  loaderPromise.then(function(d) {
                    console.log("%c COMMMAND 16 a new object creation, loader promise Returned with ", 'background: #222; color: #bada55');
                    console.log(d);
                    console.log("The object to be changed is now ", newObj);

                    var ff = me._find(localID);
                    console.log("From cache it is ", localID);
                    console.log(ff);

                    newObj._docData.__p = parentID;
                    newObj._docData.__vpid = parentID;

                    newObj._initializeData(newObj._docData);

                    var updateObj = _data(localID);
                    // updateObj._initializeData( newObj._docData );

                    updateObj.then(
                      function() {
                        me._cmd([7, objToChange.data.length, localID, null, parentID], objToChange, updateObj);
                        if (!reflection) {
                          me._sendCmdToRefs(a, isRemote).then(function() {
                            myPromise.resolve(d);
                          });
                        } else {
                          myPromise.resolve(d);
                        }

                      });


                  })
                });

              // if this is the real document, then write the command down to the stream
              if (!(isRemote || _isRemoteUpdate)) {
                console.log("Writing the command .... ");
                this.writeCommand(a);
              }
              me._leaveCtx(ctxName);


            }


          }


        } catch (e) {
          console.error(e.message);
          myPromise.resolve(e.message);
        }

        me._leaveCtx(ctxName);

        return myPromise;

        // this._virtualCommand( a, isRemote || _isRemoteUpdate );

      }
      _myTrait_.execCommandBackup = function(a, isRemote) {
        var me = this;

        if (this.isArray(a[0])) {
          a.forEach(function(cmd) {
            me.execCommand(cmd, isRemote);
          });
          return;
        }

        var ctxName = "::" + a[0] + "::" + a[1]; // i.e 4::x == set, x 
        if (!me._enterCtx(ctxName)) return;



        try {
          // console.log("*** execCommand ", a);

          //console.log("Got command, the context is now");
          //console.log(JSON.stringify( me._getCtx() ));



          // Create Object command...
          if (a[0] == 1) {
            var newObj = {
              data: {},
              __id: a[1]
            }
            var hash = this._getObjectHash();
            // console.log("Hash ", hash);
            hash[newObj.__id] = newObj;
            // this._cmd(a, obj, null);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            }
          }

          if (a[0] == 2) {
            var newObj = {
              data: [],
              __id: a[1]
            }
            var hash = this._getObjectHash();
            // console.log("Hash ", hash);
            hash[newObj.__id] = newObj;
            // this._cmd(a, obj, null);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            }
          }

          // console.log("Did execute the command");

          // The actual change of the object based on command "a"
          if (a[0] == 4) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (obj) {
              // console.log("Was asked to update ", prop);
              obj.data[prop] = a[2]; // value is now set...
              this._cmd(a, obj, null);

              // Saving the write to root document
              if (!obj.__rid && !(isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              } else {
                // console.log("*remote cmd*");
              }

              if (_listeners) {
                var lName = obj.__id + "::" + prop,
                  eList = _listeners[lName];
                if (eList) {
                  // console.log("**** got", lName);
                  eList.forEach(function(fn) {
                    fn(obj, a[2]);
                  })
                }
              }
            }
          }

          // There is not the change list coming...
          if (a[0] == 13) {

            // console.log("*** remote 13 ****", a);
            // var conv = aceCmdConvert();
            // conv.runToString(origString, commands);

            var obj = this._find(a[4]),
              prop = a[1];

            var conv = aceCmdConvert();

            // The string gets updated like this...
            obj.data[prop] = conv.runToString(obj.data[prop], a[2]);

            // Now the data has the correct value...

            // The command for the local workers could be just updating the string...

            // ******* this was here but might be moved into the ace editor update ********
            _doingRemote = isRemote || _isRemoteUpdate;

            var tmpCmd = [4, prop, obj.data[prop], null, a[4]];
            this._cmd(tmpCmd, obj, null);

            // But, for the remote stuff, we are going to use this..
            if (!(isRemote || _isRemoteUpdate)) {

              this.writeCommand(a); // ?????????
              //console.log("Writing the command as 'set' to the object ");
              //console.log(JSON.stringify(a));
            } else {
              //console.log("*** remote 13 => _cmd ****", a);
              //console.log("*remote cmd*");
              this._cmd(a, obj, null);
            }

            _doingRemote = false;

            if (_listeners) {
              var lName = obj.__id + "::" + prop,
                eList = _listeners[lName];
              if (eList) {
                // console.log("**** got", lName);
                eList.forEach(function(fn) {
                  fn(obj, obj.data[prop]);
                })
              }
            }
          }

          // Setting the member of ...
          if (a[0] == 5) {

            //console.log("Hash contents");
            //console.log(this._getObjectHash());

            var obj = this._find(a[4]),
              prop = a[1];
            setObj = this._find(a[2]);


            if (!obj) return;
            if (!setObj) return;

            obj.data[prop] = setObj; // value is now set...
            setObj.__p = obj.__id; // The parent relationship
            this._cmd(a, obj, setObj);

            this._moveCmdListToParent(setObj);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            } else {

            }
          }


          // Insert new object with id...
          // The object should be already created and thus it exists in the
          // object cache of this "domain"
          if (a[0] == 7) {

            var parentObj = this._find(a[4]),
              insertedObj = this._find(a[2]),
              prop = "*",
              index = parentObj.data.length; // might check if valid...

            // Moving the object in the array
            if (parentObj && insertedObj) {

              // now the object is in the array...
              parentObj.data.push(insertedObj);
              insertedObj.__p = parentObj.__id;
              this._cmd(a, parentObj, insertedObj);

              this._moveCmdListToParent(insertedObj);

              // Saving the write to root document
              if (!(isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              }



            }

          }

          // Remove object, this might be also NOT from array...???
          if (a[0] == 8) {

            // this.saveCommand("removeItem", i, this._removedItem._guid, null );
            // [8, index, removedid, null, parentid ]
            var parentObj = this._find(a[4]),
              removedItem = this._find(a[2]),
              prop = "*",
              index = parentObj.data.indexOf(removedItem); // might check if valid...

            // Moving the object in the array
            if (parentObj && removedItem) {

              // console.log("The index of the item to be remoed ", index);

              // now the object is in the array...
              parentObj.data.splice(index, 1);

              // Adding extra information to the object about it's removal
              removedItem.__removedAt = index;

              //console.log("Removed item");
              //console.log(removedItem);

              // console.log("===> making the _cmd");

              this._cmd(a, parentObj, removedItem);
              removedItem.__p = null; // must be set to null...

              // Saving the write to root document
              if (!(isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              }

            }

          }



          if (a[0] == 12) {
            var obj = this._find(a[4]),
              prop = "*",
              len = obj.data.length,
              targetObj,
              i = 0;

            for (i = 0; i < len; i++) {
              var m = obj.data[i];
              if (m.__id == a[1]) {
                targetObj = m;
                break;
              }
            }

            // Questions here:
            // - should we move command list only on the parent object, not the child
            //  =>  this._moveCmdListToParent(targetObj); could be
            //      this._moveCmdListToParent(obj);
            // That is... where the command is really saved???
            // is the command actually written anywhere???
            //  - where is the writeCommand?
            // 
            // Moving the object in the array
            if (targetObj) {
              var targetIndex = parseInt(a[2]);

              //console.log("==== MOVING ==== ", targetObj);
              //console.log(i + "=> "+targetIndex);

              _execInfo.fromIndex = i;

              obj.data.splice(i, 1);
              obj.data.splice(targetIndex, 0, targetObj);
              this._cmd(a, obj, targetObj);

              if (!(isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              }

            }

          }
        } catch (e) {
          console.error(e.message);
        }

        me._leaveCtx(ctxName);

        this._virtualCommand(a, isRemote || _isRemoteUpdate);

      }
      _myTrait_.execCommandBackup2 = function(t) {
        var me = this;
        var myPromise = _promise();

        if (this.isArray(a[0])) {
          console.log("Array of promises.... ");
          this._execCommandsPromise(a, isRemote).then(function() {
            myPromise.resolve(true);
          });
          return myPromise;
        }



        var ctxName = "::" + a[0] + "::" + a[1]; // i.e 4::x == set, x 
        if (!me._enterCtx(ctxName)) {
          console.log("===> could not enter");
          myPromise.resolve(true);
          return myPromise;
        }

        console.log("*** execCommand ", a);

        // this object holds the status of the execution
        var execStatus = this._getExecInfo();



        try {


          //console.log("Got command, the context is now");
          //console.log(JSON.stringify( me._getCtx() ));



          // Create Object command...
          if (a[0] == 1) {
            var newObj = {
              data: {},
              __id: a[1]
            }
            var hash = this._getObjectHash();
            // console.log("Hash ", hash);
            hash[newObj.__id] = newObj;
            // this._cmd(a, obj, null);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            }

            myPromise.resolve(true);
          }

          if (a[0] == 2) {
            var newObj = {
              data: [],
              __id: a[1]
            }
            var hash = this._getObjectHash();
            // console.log("Hash ", hash);
            hash[newObj.__id] = newObj;
            // this._cmd(a, obj, null);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            }
            myPromise.resolve(true);
          }

          // console.log("Did execute the command");

          // The actual change of the object based on command "a"
          if (a[0] == 4) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (obj) {

              if (!reflection) {
                if (obj.__rid) {
                  // send the command to the reflection object...
                  // the command will then be reflected to all reflected objects...
                  console.log("**** sending command to the reflected object **** ");
                  a[4] = obj.__rid;
                  me._leaveCtx(ctxName);
                  //console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }
              // console.log("Was asked to update ", prop, "to ", a[2]);

              _execInfo.oldValue = obj.data[prop];
              obj.data[prop] = a[2]; // value is now set...

              this._cmd(a, obj, null);

              // Saving the write to root document
              if (!obj.__rid && !(isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              } else {
                // console.log("*remote cmd*");
              }

              if (_listeners) {
                var lName = obj.__id + "::" + prop,
                  eList = _listeners[lName];
                if (eList) {
                  // console.log("**** got", lName);
                  eList.forEach(function(fn) {
                    fn(obj, a[2]);
                  })
                }
              }
              if (!reflection) {
                me._leaveCtx(ctxName);
                console.log("**** commands to the refs... **** ");
                me._sendCmdToRefs(a, isRemote).then(function() {
                  console.log("**** ... commands to refs done. **** ");
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                console.log(".... looks like this was reflection??? ");
                myPromise.resolve(true);
              }
            } else {
              myPromise.resolve(true);
            }
          }

          // There is not the change list coming...
          if (a[0] == 13) {

            var obj = this._find(a[4]),
              prop = a[1];

            if (!reflection) {
              if (obj.__rid) {
                // send the command to the reflection object...
                // the command will then be reflected to all reflected objects...
                console.log("**** sending ACE update command to the reflected object **** ");
                a[4] = obj.__rid;
                me._leaveCtx(ctxName);
                console.log(JSON.stringify(a));
                me.execCommand(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              }
            }

            var conv = aceCmdConvert();

            // The string gets updated like this...
            obj.data[prop] = conv.runToString(obj.data[prop], a[2]);

            // ******* this was here but might be moved into the ace editor update ********
            _doingRemote = isRemote || _isRemoteUpdate;

            var tmpCmd = [4, prop, obj.data[prop], null, a[4]];
            this._cmd(tmpCmd, obj, null);

            // But, for the remote stuff, we are going to use this..
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            } else {
              this._cmd(a, obj, null);
            }

            _doingRemote = false;

            if (_listeners) {
              var lName = obj.__id + "::" + prop,
                eList = _listeners[lName];
              if (eList) {
                // console.log("**** got", lName);
                eList.forEach(function(fn) {
                  fn(obj, obj.data[prop]);
                })
              }
            }

            if (!reflection) {
              me._leaveCtx(ctxName);
              me._sendCmdToRefs(a, isRemote).then(function() {
                myPromise.resolve(true);
              });
              return myPromise;
            } else {
              myPromise.resolve(true);
            }



          }

          // Setting the member of ...
          if (a[0] == 5) {

            //console.log("Hash contents");
            //console.log(this._getObjectHash());

            var obj = this._find(a[4]),
              prop = a[1];
            setObj = this._find(a[2]);


            if (!obj) return;
            if (!setObj) return;

            obj.data[prop] = setObj; // value is now set...
            setObj.__p = obj.__id; // The parent relationship
            this._cmd(a, obj, setObj);

            this._moveCmdListToParent(setObj);

            // Saving the write to root document
            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            } else {

            }
            myPromise.resolve(true);
          }


          // Insert new object with id...
          // The object should be already created and thus it exists in the
          // object cache of this "domain"
          if (a[0] == 7) {

            var parentObj = this._find(a[4]),
              insertedObj = this._find(a[2]),
              prop = "*",
              index = parentObj.data.length; // might check if valid...

            // Moving the object in the array
            if (parentObj && insertedObj) {

              console.log(" insert OK ");

              if (!reflection) {
                // usually a plain new object is without _rid, it is usually just object..
                if (parentObj.__rid) {
                  console.log("**** sending INSERT to the reflected object **** ");
                  a[4] = parentObj.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              // now the object is in the array...
              parentObj.data.push(insertedObj);
              insertedObj.__p = parentObj.__id;
              this._cmd(a, parentObj, insertedObj);

              if (!parentObj.__rid) this._moveCmdListToParent(insertedObj);

              if (parentObj.__rid) {
                console.log("Can not write command, because parent object has __rid");
              }

              // Saving the write to root document
              if (!(parentObj.__rid || isRemote || _isRemoteUpdate)) {
                console.log(" creating write ");
                this.writeCommand(a);
              }

              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }


            }

          }

          // Remove object, this might be also NOT from array...???
          if (a[0] == 8) {

            console.log("%c COMMAND 8 ", 'background: red; color: #bada55');
            console.log("*** remove item command ");
            console.log(a);

            // ** skipping this command        
            /*
                   me._leaveCtx(ctxName);
                   myPromise.resolve(true);
                   
                   return myPromise;
           */

            // this.saveCommand("removeItem", i, this._removedItem._guid, null );
            // [8, index, removedid, null, parentid ]
            var parentObj = this._find(a[4]),
              removedItem = this._find(a[2]),
              prop = "*",
              index = parentObj.data.indexOf(removedItem); // might check if valid...

            // Moving the object in the array
            if (parentObj && removedItem) {

              // __radioURL

              var bothReflected = (parentObj.__rid && removedItem.__rid);

              var bSameDomain = true;

              if (removedItem.__vpid && (removedItem.__vpid != removedItem.__pid)) {
                bSameDomain = false;
              }
              // if( removedItem.__radioURL ) bSameDomain = false;

              if (!reflection) {

                if (bSameDomain && (removedItem.__rid && parentObj.__rid)) {
                  console.log("**** sending remove command to the reflected object **** ");
                  a[4] = parentObj.__rid;
                  a[2] = removedItem.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }


                if (!bSameDomain && (removedItem.__rid && parentObj.__rid)) {
                  console.log("**** sending remove command to the reflected object **** ");
                  a[4] = removedItem.__vpid;
                  a[2] = removedItem.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }


                /*
                           console.log("*** Was not same domain, exiting...");
                           
                           me._leaveCtx(ctxName);
                           myPromise.resolve(true);
                           
                           return myPromise;  
                           
                           if(removedItem.__rid && parentObj.__pid) {
                                           
                                                 
                               console.log("**** sending remove command to the reflected object **** ");
                               a[4] = removedItem.__vpid || removedItem.__pid;
                               a[2] = removedItem.__rid;
                               me._leaveCtx(ctxName);
                               console.log(JSON.stringify(a));
                               me.execCommand(a, isRemote).then( function() {
                                   myPromise.resolve(true);
                               });
                               return myPromise;
                           }*/
              }

              console.log("*** was able to find the object to remove ");
              // console.log("The index of the item to be remoed ", index);

              // now the object is in the array...
              parentObj.data.splice(index, 1);

              // Adding extra information to the object about it's removal
              removedItem.__removedAt = index;

              //console.log("Removed item");
              //console.log(removedItem);

              // console.log("===> making the _cmd");

              this._cmd(a, parentObj, removedItem);
              removedItem.__p = null; // must be set to null...

              // Saving the write to root document
              if (!(bothReflected || isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              }

              if (!reflection) {
                me._leaveCtx(ctxName);
                a[2] = removedItem.__rid; // just making sure that the reflection is used...
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }


            }

          }



          if (a[0] == 12) {
            var obj = this._find(a[4]),
              prop = "*",
              len = obj.data.length,
              targetObj,
              i = 0;

            for (i = 0; i < len; i++) {
              var m = obj.data[i];
              if (m.__id == a[1]) {
                targetObj = m;
                break;
              }
            }

            // Questions here:
            // - should we move command list only on the parent object, not the child
            //  =>  this._moveCmdListToParent(targetObj); could be
            //      this._moveCmdListToParent(obj);
            // That is... where the command is really saved???
            // is the command actually written anywhere???
            //  - where is the writeCommand?
            // 
            // Moving the object in the array
            if (targetObj) {

              var targetIndex = parseInt(a[2]),
                mObj = this._find(a[1]),
                bBothRemote = obj.__rid && mObj.__rid;

              if (!reflection) {
                if (bBothRemote) {
                  // send the command to the reflection object...
                  // the command will then be reflected to all reflected objects...
                  console.log("**** sending moveToIndex CMD to the reflected object **** ");
                  a[4] = obj.__rid;
                  a[1] = mObj.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  myPromise.resolve(true);
                  /*
                               me.execCommand(a, isRemote).then( function() {
                                   myPromise.resolve(true);
                               });
                               */
                  return myPromise;
                }
              }

              //console.log("==== MOVING ==== ", targetObj);
              //console.log(i + "=> "+targetIndex);

              _execInfo.fromIndex = i;

              obj.data.splice(i, 1);
              obj.data.splice(targetIndex, 0, targetObj);
              this._cmd(a, obj, targetObj);

              if (!(bBothRemote || isRemote || _isRemoteUpdate)) {
                this.writeCommand(a);
              }

              if (!reflection) {
                me._leaveCtx(ctxName);
                me._sendCmdToRefs(a, isRemote).then(function() {
                  myPromise.resolve(true);
                });
                return myPromise;
              } else {
                myPromise.resolve(true);
              }

            }

          }



          // push a remote object into array
          if (a[0] == 16) {

            // Object to in
            // _changeToRemote
            // [16, <URL>, <ID>, <LocalID>, <ParentObject> ]
            console.log("%c COMMAND 16 ", 'background: #222; color: #bada55');
            console.log(a);


            var objToChange = this._find(a[4]),
              remoteURL = a[1],
              remoteID = a[2],
              localID = a[3],
              parentID = a[4];

            if (objToChange && objToChange.data) {

              if (!reflection) {
                // usually a plain new object is without _rid, it is usually just object..
                if (objToChange.__rid) {
                  a[4] = objToChange.__rid;
                  me._leaveCtx(ctxName);
                  console.log(JSON.stringify(a));
                  me.execCommand(a, isRemote).then(function() {
                    myPromise.resolve(true);
                  });
                  return myPromise;
                }
              }

              console.log(" - - - about to insert remote object into array - - - ");
              var newObj = _data({
                data: {},
                __id: localID,
                __rid: remoteID
              });

              if (!me._waitingPromises) {
                me._waitingPromises = [];
              }
              me._waitingPromises.push(myPromise);

              newObj.then(
                function() {

                  console.log("%c COMMAND 16, did NEW object ", 'background: #222; color: #bada55');
                  console.log(newObj._docData);

                  // adding the new object into the data array of the parent object
                  objToChange.data.push(newObj._docData);
                  newObj._docData.__radioURL = remoteURL;
                  delete newObj._docData.__ctxCmdList;
                  delete newObj._docData.__cmdList;

                  var loaderPromise = _docUp()._changeToRemote(newObj._docData, remoteURL, remoteID);
                  // it should now have the data...
                  loaderPromise.then(function(d) {
                    console.log("%c COMMMAND 16 a new object creation, loader promise Returned with ", 'background: #222; color: #bada55');
                    console.log(d);
                    console.log("The object to be changed is now ", newObj);

                    var ff = me._find(localID);
                    console.log("From cache it is ", localID);
                    console.log(ff);

                    newObj._docData.__p = parentID;
                    newObj._docData.__vpid = parentID;

                    newObj._initializeData(newObj._docData);

                    var updateObj = _data(localID);
                    // updateObj._initializeData( newObj._docData );

                    updateObj.then(
                      function() {
                        me._cmd([7, objToChange.data.length, localID, null, parentID], objToChange, updateObj);
                        if (!reflection) {
                          me._sendCmdToRefs(a, isRemote).then(function() {
                            myPromise.resolve(d);
                          });
                        } else {
                          myPromise.resolve(d);
                        }

                      });


                  })
                });

              // if this is the real document, then write the command down to the stream
              if (!(isRemote || _isRemoteUpdate)) {
                console.log("Writing the command .... ");
                this.writeCommand(a);
              }
              me._leaveCtx(ctxName);


            }


          }


        } catch (e) {
          console.error(e.message);
          myPromise.resolve(e.message);
        }

        me._leaveCtx(ctxName);

        return myPromise;

        // this._virtualCommand( a, isRemote || _isRemoteUpdate );

      }
      _myTrait_.findFromCache = function(guid) {

        if (!_objectCache) return;

        return _objectCache[guid];
      }
      _myTrait_.getCommands = function(t) {
        return _commands;
      }
      _myTrait_.getObjectCache = function(t) {
        return _objectCache;
      }
      _myTrait_.getSetvalCmd = function(id, property) {

        if (!_objSetValCmds[id]) {
          _objSetValCmds[id] = {};
        }
        if (!_objSetValCmds[id][property]) {
          var a = _objSetValCmds[id][property] = [];
          // _commands.push(a);
        }

        return _objSetValCmds[id][property];
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(t) {

        if (!_cmdIndex) {
          this.initCmdIndex();
          _execInfo = {};
          _channelCommands = {};
          _channelForks = {};

          _nsIndex = 1;

          _cmdNsMap = {
            1: [1],
            2: [1],
            4: [4],
            5: [2, 4],
            7: [2, 4],
            8: [2, 4],
            10: [2, 4],
            12: [4],
            13: [4],
            16: [3, 4]
          };

          _nsShortcuts = {};
          _nsReverse = {};

        }

      });
      _myTrait_.initCmdIndex = function(t) {
        _cmdIndex = {};
        _cmdIndex["createObject"] = 1;
        _cmdIndex["createArray"] = 2;
        _cmdIndex["initProp"] = 3;
        _cmdIndex["set"] = 4;
        _cmdIndex["setMember"] = 5;
        _cmdIndex["push"] = 6;
        _cmdIndex["pushObj"] = 7;
        _cmdIndex["removeItem"] = 8;

        // reserved 9 for optimizations
        _cmdIndex["last"] = 9;

        _cmdIndex["removeProperty"] = 10;
        _cmdIndex["insertObjectAt"] = 11;
        _cmdIndex["moveToIndex"] = 12;




        _lastCmdVals = [null, null, null, null, null];

        _objSetValCmds = {};

        _hotObjects = {};
        _hotDocs = {};
        _hotSettings = {
          time: (new Date()).getTime(),
          list: [],
          index: {}
        }

        later().every(1 / 20, function() {
          return; // remove this... does it still work???
          // console.log("Checking the hot docs");
          var t = _hotSettings.time = (new Date()).getTime();

          for (var id in _hotDocs) {
            if (_hotDocs.hasOwnProperty(id)) {
              var info = _hotDocs[id];

              var theDoc = info.doc._findRootDoc();
              // if has channel...???

              //console.log("** hotDoc **");
              //console.log(JSON.stringify(theDoc.__ctxCmdList));

              theDoc._broadcastToCmdChannels(theDoc, t - info.ms);
              theDoc.__ctxCmdList.length = 0;
              theDoc.__cmdList.length = 0;
              delete _hotDocs[id];
              delete _hotDocs[theDoc._guid];
              /*
                           if( t - info.ms > 2000) {
                               console.log("Might save document");
                               console.log(info.doc.__cmdList);
                               // broadcast & reset, should we reset?
                               info.doc._broadcastToCmdChannels(info.doc.__cmdList);
                               info.doc.__cmdList.length = 0;
                               delete _hotDocs[id];
                           }
                           */
            }
          }


        });

        // Disabled the "hot buffer" from this field
        /*
               setInterval( function() {
                   // console.log("Checking the hot buffer");
                   var t = _hotSettings.time = (new Date()).getTime();
                   
                   var list = _hotSettings.list,
                       len = list.length;
                   for(var i=len-1; i>=0;i--) {
                       var item = list[i];
                       // two seconds now the limit...
                       if(t - item.t > 2000) {
                           
                           if(item.o._hotBuffer) {
                               console.log("Compressing the buffer");
                               console.log(item.o.compressCmdBuffer(item.o._hotBuffer));
                               item.o._writeHotToDisk();
                               item.o._hotBuffer = null;
                               delete item.o._hotBuffer;
                           }
                           console.log("The item "+item.id+"age over 2 seconds, removing from hot buffer");
                           list.splice(i,1);
                           delete _hotSettings.index[item.id];
                           // TODO: compress and write to journal
                       }
                   }
                   
               },100);    
               */


      }
      _myTrait_.isDoingRemote = function(t) {
        return _doingRemote;
      }
      _myTrait_.isRecordingCommands = function(t) {
        return !this._isRecordCommandsOff;
      }
      _myTrait_.reverseCommand = function(cmd) {

        var newCmd = cmd.slice();

        if (cmd[0] == 4) {
          newCmd[2] = cmd[3];
          newCmd[3] = cmd[2];
        }


        return newCmd;
      }
      _myTrait_.saveCommand = function(action, property, value, oldValue) {


        if (!_commands) _commands = [];

        //console.log("** saveCommand ");
        if (_isRemoteUpdate) {
          //console.log("remote update is on");
          return;
        }

        /*
           if(this._isRecordCommandsOff)  {
               console.log("** recordCommands is off ");
               return this;
           }
           */

        // if legal command...
        var cmdPath = property;
        if (!_cmdIndex) {
          this.initCmdIndex();
        }
        var idx = _cmdIndex[action];
        if (!idx) {
          return;
        }

        var actionName = idx + ":" + property,
          me = this;

        if (!me._enterCtx(actionName)) return;

        // console.log("---- recording commands for "+this._guid);

        var useId = this._guid;
        // if(_lastCmdId && ( useId == _lastCmdId ) ) useId = "L";

        var a;
        if (idx == 4) {
          var hot = this._createHotObject(this);
          a = [];
          a[0] = idx;
          a[1] = property;
          a[2] = value;
          a[3] = oldValue;
          a[4] = this._guid;
        } else {
          a = [];
          // _commands.push(a);
          a[0] = idx;
          a[1] = property;
          a[2] = value;
          a[3] = oldValue;
          a[4] = useId;
        }

        if (this._hotBuffer) {
          this._hotBuffer.push(a);
        }

        if (_commandListener) _commandListener(a);


        var doc = this._findRootDoc();
        if (doc) {
          if (!doc.__cmdList)
            doc.__cmdList = [];

          if (!doc.__ctxCmdList)
            doc.__ctxCmdList = [];
          doc.__cmdList.push(a);
          doc.__ctxCmdList.push({
            ctx: this._getCtx(),
            cmd: a
          });
          //console.log("Just about to stringify the list");
          // console.log(JSON.stringify( doc.__ctxCmdList) );
          this._addHotDoc(doc);
          if (idx == 5) {
            //console.log('Root has currently this:');
            //     console.log(doc.__ctxCmdList);
            //console.log(JSON.stringify( doc.__ctxCmdList));
          }
        }

        //console.log("Save Command ", JSON.stringify( a ));


        me._leaveCtx(actionName);

        return this;


      }
      _myTrait_.setCommandRecOnOff = function(b) {

        if (b) {
          this._isRecordCommandsOff = false;
        } else {
          this._isRecordCommandsOff = true;
        }
        return this;
      }
      _myTrait_.writeCommand = function(a, obj) {

        if (!obj) obj = this._find(a[4]);

        a[5] = (new Date()).getTime();

        var myRoot = this._findRootDoc(obj);
        var rootData = myRoot;

        if (!rootData.__cmdList)
          rootData.__cmdList = [];
        // rootData.__cmdList.push(a);

        if (!rootData.__ctxCmdList)
          rootData.__ctxCmdList = [];

        if (rootData.__radio) {
          console.error("**** the RADIO should not be used with WRITE COMMAND ***** ");
          return;
          rootData.__ctxCmdList.push({
            ctx: this._getCtx(),
            cmd: a
          });

          console.log("RADIO");
          console.log("Sending", JSON.stringify(rootData.__ctxCmdList));
          rootData.__radio.send(rootData.__radioURL, rootData.__ctxCmdList);

          rootData.__ctxCmdList.length = 0;
          //            me._data.__radioURL = data;
          //            me._data.__radio = radio;    
        } else {
          rootData.__ctxCmdList.push({
            ctx: this._getCtx(),
            cmd: a
          });
        }

        //console.log("writeCmd, root data now");    
        //console.log(rootData)
      }
    }(this));;
    (function(_myTrait_) {
      var _callContext;
      var _localId;
      _myTrait_._createContextVar = function(withValue) {
        var v = {};

        if (!_localId) _localId = this.guid();

        var id = _localId + "" + withValue;

        v[id] = 1;

        return v;

      }
      _myTrait_._enterCtx = function(fname, allow) {

        if (!_callContext) {
          _callContext = {
            active: {}
          };
        }
        if (!_localId) _localId = this.guid();


        var id = _localId + fname;

        if (!_callContext.active[id]) {
          _callContext.active[id] = 1;
          return true;
        } else {
          if (allow) return true;
          // console.error("**** RECURSION PREVENTED **** ", id);
          return false;
        }
      }
      _myTrait_._getContextId = function(t) {

        return _localId;
      }
      _myTrait_._getCtx = function(t) {
        var o = {},
          a = _callContext.active;
        for (var n in a) {
          if (a.hasOwnProperty(n)) o[n] = a[n];
        }
        return o;
      }
      _myTrait_._leaveCtx = function(fname) {
        var id = _localId + fname;
        if (_callContext.active[id]) {
          delete _callContext.active[id];
        }

      }
      _myTrait_._resetCtx = function(t) {
        _callContext.active = {};
      }
      _myTrait_._setCtx = function(ctx) {
        _callContext.active = ctx;
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(t) {

        // create local id
        if (!_localId) _localId = this.guid();

        if (!_callContext) {
          _callContext = {
            active: {}
          };
        }

        /*
    enter_call_ctx();
*/
      });
    }(this));;
    (function(_myTrait_) {
      var _commands;
      var _objectCache;
      var _cmdIndex;
      var _lastCmdId;
      var _lastCmdVals;
      var _objSetValCmds;
      var _commandListener;
      var _isRemoteUpdate;
      var _hotObjects;
      var _hotSettings;
      var _hotDocs;
      var _incomingDataFn;
      _myTrait_.forEach = function(filter, fn, obj) {


        if (filter) {

          var rawData, m, oo = this;
          if (obj) {
            if (!obj._data) return;
            m = obj.data[filter];
            if (m) rawData = m.data;
          } else {
            if (!this._data) return;
            m = this._data.data[filter];
            if (m) rawData = m.data;
          }
          if (rawData) {

            if (this.isArray(rawData)) {
              var i = 0,
                len = rawData.length;
              for (; i < len; i++) {
                var o = rawData[i];
                fn(o);
              }
            } else {

              if (this.isObject(rawData)) {
                for (n in rawData) {
                  if (rawData.hasOwnProperty(n)) {
                    var o = rawData[n];
                    fn(o);
                  }
                }
              }
            }



          }

        }
      }
    }(this));;
    (function(_myTrait_) {
      var _templateCompiler;
      var _views;
      var _eViews;
      var _controllers;
      var _isTransforming;
      var _transitionStatus;
      var _later;
      var _selectedItems;
      var _pushViews;
      var _clipBoard;
      var _dragState;
      var _oldViews;
      var _settingHash;
      var _uiCommands;
      _myTrait_._callController = function(ctrlId, dataId, domElem) {
        var pList = ctrlId.split("/");

        ctrlId = pList[0];
        pList.shift();

        console.log("Looking for '" + ctrlId + "' ");

        if (_controllers && _controllers[ctrlId]) {

          var model;
          console.log("Found it, data =  ", dataId);
          console.log(_controllers);
          if (dataId) {

            var model = this._find(dataId);
            _controllers[ctrlId](model, domElem, pList);
          }

        }
      }
      _myTrait_._clickResponder = function(event) {

        console.log("**** AT CLICK RESPONDER **** ");

        if (!_templateCompiler) {
          _templateCompiler = templateCompiler();
        }

        var ms = (new Date()).getTime();

        if (_dragState.hasClick) {
          if (ms - _dragState.hasClick < 80) return;
        }

        _dragState.hasClick = (new Date()).getTime();

        var me = this;
        var comp = _templateCompiler;

        var elem = event.target || event.srcElement;
        if (!elem) return;

        var popView = elem.getAttribute("data-click-pop");

        var bHadSomething = false;

        if (popView) {
          var vid = me.findPushId(elem);
          if (vid) {
            // console.log("The view was ", vid);
            me.popView(vid);

          }
        }

        var clickSel = elem.getAttribute("data-click-compile");
        if (clickSel) {
          var parts = clickSel.split("=>");
          console.log("Compiling", parts);
          var from = parts[0],
            to = parts[1];
          var dataId = elem.getAttribute("data-id");
          var d = me._find(dataId);
          if (d && from && to) {
            if (!_templateCompiler) {
              _templateCompiler = templateCompiler();
            }
            var comp = _templateCompiler, ///_getNamedViews
              me = this;
            var theData = comp.compile(d.data[from]);
            me.set(d, to, JSON.stringify(theData));
            var str = JSON.stringify(templateCompiler2().compile(d.data[from]));

            console.log(str);
            console.log("LENGTH", str.length)
            console.log("HTML size", d.data[from].length);
            console.log("Orig data size", JSON.stringify(theData).length);
          }

        }

        var clickSel = elem.getAttribute("data-click-set");
        if (clickSel) {
          var parts = clickSel.split("=");
          var varName = parts[0],
            varValue = parts[1];
          var dataId = elem.getAttribute("data-id");
          var d = me._find(dataId);

          me.query(varName, function(v, opts) {
            var d = opts.obj,
              varName = opts.name;
            console.log("Calling set for ", d, varName);
            if (d.data[varName] != varValue) {
              me.set(d, varName, varValue);
              // console.log("Setting to ", onVal);
            }
          }, d);

        }

        var clickSel = elem.getAttribute("data-click-clear");
        if (clickSel) {
          var list = clickSel.split(",");
          // data-click-clear="muuPalaute"
          list.forEach(
            function(varName) {
              var dataId = elem.getAttribute("data-id");
              var d = me._find(dataId);
              me.set(d, varName, "");
            });;
        }

        var clickSel = elem.getAttribute("data-toggle-this");
        if (clickSel) {
          var parts = clickSel.split("/");
          console.log("Data Toggle This ", parts);
          var varName = parts[0],
            onVal = parts[1],
            offVal = parts[2];
          var dataId = elem.getAttribute("data-id");
          var d = me._find(dataId);
          console.log("Calling set for ", d);
          if (d.data[varName] != onVal) {
            me.set(d, varName, onVal);
            // console.log("Setting to ", onVal);
          } else {
            me.set(d, varName, offVal);
          }
        }

        var clickSel = elem.getAttribute("data-toggle-sublevels");
        if (clickSel) {
          var parts = clickSel.split("/");
          //console.log(parts);
          var clickSel = parts[0],
            varName = parts[1],
            onVal = parts[2],
            offVal = parts[3];
          //console.log("***** MIGHT TOGGLE SUBLEVELS *****");
          var dataId = elem.getAttribute("data-id");
          var obj = me._find(dataId);
          //console.log(obj);
          if (obj && obj.data[clickSel]) {
            var tobble = obj.data[clickSel];
            if (tobble.data.length) {
              tobble.data.forEach(function(d) {

                if (d.data[varName] != onVal) {
                  me.set(d, varName, onVal);
                  console.log("Setting to ", onVal);
                } else {
                  me.set(d, varName, offVal);
                }
                console.log(d);
              })
            }
          }
        }

        var clickSel = elem.getAttribute("data-click-select");
        if (clickSel) {
          // then select this item into some model
          var dataId = elem.getAttribute("data-id"),
            model;
          if (dataId) {
            var model = me._find(dataId);

            if (!_selectedItems) _selectedItems = {};
            if (!_selectedItems[clickSel]) _selectedItems[clickSel] = [];

            var theList = _selectedItems[clickSel],
              theParentList;
            if (model.__p) {
              var parent = me._find(model.__p);
              if (parent) {
                if (!parent.__selected)
                  parent.__selected = {};
                if (!parent.__selected[clickSel])
                  parent.__selected[clickSel] = [];
                theParentList = parent.__selected[clickSel];
              }
            }
            var selClassBase = elem.getAttribute("data-sel-class"),
              selClass, selClassFilter,
              itemIndex;
            if (selClassBase) {
              var parts = selClassBase.split(":");
              selClassFilter = parts[0];
              if (selClassFilter == clickSel) selClass = parts[1];
            }

            if ((itemIndex = theList.indexOf(dataId)) >= 0) {
              // unselect the item...
              if (selClass) $(elem).removeClass(selClass);
              theList.splice(itemIndex, 1);
              if (theParentList) {
                var pid;
                if ((pid = theParentList.indexOf(dataId)) > 0) {
                  theParentList.splice(pid, 1);
                }
              }
            } else {
              // select the item...
              if (selClass) $(elem).addClass(selClass);
              theList.push(dataId);
              if (theParentList) {
                var pid;
                if (!((pid = theParentList.indexOf(dataId)) > 0)) {
                  theParentList.push(dataId);
                }
              }
            }

            bHadSomething = true;

          }
        }


        // clicking may start also a controller....
        var ctrlId = elem.getAttribute("data-click-ctrl");
        if (ctrlId) {

          var pList = ctrlId.split("/");

          ctrlId = pList[0];
          pList.shift();

          if (_controllers && _controllers[ctrlId]) {

            var dataId = elem.getAttribute("data-id"),
              model;
            if (dataId) {
              var model = me._find(dataId);
              bHadSomething = true;
            }
            _controllers[ctrlId](model, elem, pList);
          }

        }

        // send post data to URL

        var dataURL = elem.getAttribute("data-click-post-url");
        if (dataURL) {

          var dataId = elem.getAttribute("data-id"),
            model;
          if (dataId) {
            bHadSomething = true;
            var model = me._find(dataId);

            if (elem.getAttribute("data-post-only-id")) {
              if (me.isArray(model.data)) {
                model = {
                  __id: model.__id,
                  data: []
                };
              } else {
                model = {
                  __id: model.__id,
                  data: {}
                };
              }
            }
            $.ajax({
              type: "POST",
              url: dataURL,
              data: JSON.stringify(model),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data) {
                // might get the response stream here, but not this time...
                console.log(data);
                if (data.__sCmds) me.execCommand(data.__sCmds, true);

                if (data.__uiCmds) {
                  data.__uiCmds.forEach(function(uiC) {
                    var fn = _uiCommands[uiC.cmd];
                    if (fn) {
                      fn.apply(me, uiC.data);
                    }
                  })
                }

              },
              failure: function(errMsg) {

              }
            });
          }

        }

        // Adding a new data -item as variable does not work as expected...
        var createItem = elem.getAttribute("data-click-create");
        if (createItem) {
          var str = "{" + createItem + "}";
          var dataObj = JSON.parse(str);
          console.log(str);
          console.log("To create ", JSON.stringify(dataObj));

          for (var n in dataObj) {
            var dataId = elem.getAttribute("data-id");
            if (dataId) {
              bHadSomething = true;
              // Then, how to add a document object
              var model = me._find(dataId);
              me.push(model.data[n], dataObj[n]);
            }
          }
        }

        var createItem = elem.getAttribute("data-click-copy");
        if (createItem) {

          var dataId = elem.getAttribute("data-id");
          if (dataId) {
            // Then, how to add a document object
            var model = me._find(dataId);
            var parent = me._find(model.__p);

            var theCopy = me.duplicate(model);

            me.push(parent, theCopy);
            bHadSomething = true;
          }

        }

        // _clipBoard

        var createItem = elem.getAttribute("data-click-to-clipboard");
        if (createItem) {

          var dataId = elem.getAttribute("data-id");
          if (dataId) {
            // Then, how to add a document object
            var model = me._find(dataId);
            var parent = me._find(model.__p);

            var theCopy = me.toPlainData(model);

            _clipBoard = theCopy;
            bHadSomething = true;
          }

        }

        var createItem = elem.getAttribute("data-click-from-clipboard");
        if (createItem) {

          var dataId = elem.getAttribute("data-id");
          if (dataId) {
            // Then, how to add a document object
            var mainModel = me._find(dataId);

            if (mainModel && mainModel.data) {
              var model = mainModel.data[createItem];
              if (model && _clipBoard && model.data && me.isArray(model.data)) {
                me.push(model, _clipBoard);
                bHadSomething = true;
              }
            }

          }

        }



        // clicking may start also a controller....
        var removeItem = elem.getAttribute("data-click-remove");
        if (removeItem) {
          var dataId = elem.getAttribute("data-id");
          if (dataId) {
            bHadSomething = true;
            if (confirm("Remove item?")) me.removeItem(dataId);
          }
        }

        // clicking may start also a controller....
        var moveItem = elem.getAttribute("data-click-moveup");
        if (moveItem) {
          var dataId = elem.getAttribute("data-id");
          if (dataId) {
            bHadSomething = true;
            me.moveItemUp(dataId);
          }
        }

        // clicking may start also a controller....
        var moveItem = elem.getAttribute("data-click-movedown");
        if (moveItem) {
          var dataId = elem.getAttribute("data-id");
          if (dataId) {
            bHadSomething = true;
            me.moveItemDown(dataId);
          }
        }





        var routeId = elem.getAttribute("data-click-view");


        if (routeId) {

          var routeList = routeId.split(",");

          routeList.forEach(
            function(routeId) {

              var parts = routeId.split("/"),
                itemId;
              if (parts.length > 1) {
                var defViewName = parts[1];
                routeId = parts[0];
              }
              var firstChar = routeId.charAt(0),
                whereTo;

              if (firstChar == ".") {
                itemId = routeId.substring(1);
                var par = elem.parentNode;
                while (par) {

                  if (!par.getAttribute) {
                    par = par.parentNode;
                    continue;
                  }
                  console.log("Looking for ", itemId);
                  if (par.getAttribute("data-viewclass") == itemId) {
                    whereTo = par;
                    break;
                  }
                  var cc;
                  if (cc = par.getAttribute("class")) {
                    if (cc.match(itemId)) {
                      whereTo = par;
                      break;
                    }
                  }
                  par = par.parentNode;
                }

              }
              if (firstChar == "#") {
                itemId = routeId.substring(1);
                var whereTo = document.getElementById(itemId);
              }

              if (!whereTo) console.log("Did not find ", routeId);

              if (whereTo) {
                bHadSomething = true;
                // data-id o
                var dataId = elem.getAttribute("data-id");
                console.log("data-id ", dataId);
                if (dataId) {
                  var model = me._find(dataId);
                  var bSet = false;
                  var eV = whereTo.getAttribute("data-e-view");
                  if (eV) {
                    if (_eViews && _eViews[eV]) {
                      // Then this is the function to create the view definitely...
                      var newView = _eViews[eV](model);
                      me.pushView(itemId, newView._dom, {
                        sourceElem: elem
                      });
                      bSet = true;
                    }
                  }

                  if (!bSet) {
                    var viewName;

                    if (defViewName) {
                      viewName = defViewName;
                    } else {
                      viewName = whereTo.getAttribute("data-use-view");
                    }

                    console.log("looking view ", viewName);
                    if (viewName) {
                      var w = me.findNamedView(viewName);
                      // still stupid way to do it...
                      console.log("found view ", w, "composing with", model);
                      if (w) {

                        var dd = comp.composeTemplate(model, w);
                        me.pushView(whereTo, dd, {
                          sourceElem: elem,
                          animMs: 400,
                          animFn: function(dom, ms) {
                            $(dom).addClass("bounceOut");
                          },
                          animEnd: function(dom) {
                            $(dom).removeClass("bounceOut");
                          }
                        });
                        //whereTo.innerHTML = "";
                        //whereTo.appendChild(dd);
                      }
                    }
                  }
                }
              }

            });

          // var dd = comp.composeTemplate( me._data,  jsonTplData );
        }

        return bHadSomething;
      }
      _myTrait_._createUploadFrame = function(options) {
        var o = _e();

        var form = o.form("", {
          "action": options.target,
          "enctype": "multipart/form-data",
          "method": "POST",
          "name": o.guid()
        });

        var maxCnt = options.maxCnt || 20;

        var onComplete = function(v) {
          if (options.onComplete) {
            options.onComplete(v);
          }
        };

        var chStr = "complete" + ((new Date()).getTime());
        window[chStr] = onComplete;
        form.input("", {
          type: "hidden",
          value: chStr,
          name: "onComplete"
        });
        form.label("control-label").text(options.title || "Valitse tiedostot");

        if (options.vars) {
          for (var n in options.vars) {
            if (options.vars.hasOwnProperty(n)) {
              form.input("", {
                type: "hidden",
                value: options.vars[n],
                name: n
              });
            }
          }
        }
        var uplFields = form.div("form-group");

        var maxFileCnt = options.maxFileCnt || 5,
          fileCnt = 0;

        var createUploadField = function() {
          if (fileCnt >= maxFileCnt) return;
          // <label for="exampleInputFile">File input</label>
          var inp = uplFields.input("", {
            type: "file",
            name: "file_" + fileCnt
          });
          inp.on("value", function() {
            if (options.autoUpload) {
              o.uploadFiles();
            } else {
              if (fileCnt < maxCnt) createUploadField();
            }
          });

          fileCnt++;
        }

        createUploadField();
        var iFrame = _e("iframe");
        var frame_id = o.guid();
        iFrame.q.attr("id", frame_id);
        iFrame.q.attr("name", frame_id);
        iFrame.absolute().x(-4000).y(-4000);

        o.add(iFrame);



        o.uploadFiles = function(vars) {
          if (vars) {
            for (var n in vars) {
              if (vars.hasOwnProperty(n)) {
                form.input("", {
                  type: "hidden",
                  value: vars[n],
                  name: n
                });
              }
            }
          }
          var targetForUpload = options.tElem.getAttribute("data-upload-to");
          if (targetForUpload) {
            form.attr({
              action: targetForUpload
            })
          }

          form._dom.target = frame_id; //'my_iframe' is the name of the iframe
          form._dom.submit();
          uplFields.clear();
          fileCnt = 0;
          createUploadField();

        }

        if (options.getUploader) {
          options.getUploader(o.uploadFiles);
        }


        return o;
      }
      _myTrait_._initUiCommands = function(t, dataId) {

        var me = this;
        if (!_templateCompiler) {
          _templateCompiler = templateCompiler();
        }
        var comp = _templateCompiler;


        _uiCommands["openView"] = function(routeId, dataId) {


          var bHadSomething = false;

          if (routeId) {

            var routeList = routeId.split(",");

            routeList.forEach(
              function(routeId) {

                var parts = routeId.split("/"),
                  itemId;
                if (parts.length > 1) {
                  var defViewName = parts[1];
                  routeId = parts[0];
                }
                var firstChar = routeId.charAt(0),
                  whereTo;

                // Simple method, OK?
                if (firstChar == "#") {
                  itemId = routeId.substring(1);
                  var whereTo = document.getElementById(itemId);
                }

                if (!whereTo) return; // console.log("Did not find ", routeId);

                if (whereTo) {
                  bHadSomething = true;
                  if (dataId) {
                    var model = me._find(dataId);
                    var bSet = false;
                    var eV = whereTo.getAttribute("data-e-view");
                    if (eV) {
                      if (_eViews && _eViews[eV]) {
                        // Then this is the function to create the view definitely...
                        var newView = _eViews[eV](model);
                        me.pushView(itemId, newView._dom, {
                          sourceElem: elem
                        });
                        bSet = true;
                      }
                    }

                    if (!bSet) {
                      var viewName;

                      if (defViewName) {
                        viewName = defViewName;
                      } else {
                        viewName = whereTo.getAttribute("data-use-view");
                      }

                      if (viewName) {
                        var w = me.findNamedView(viewName);
                        if (w) {
                          var dd = comp.composeTemplate(model, w);
                          me.pushView(whereTo, dd, {

                          });
                        }
                      }
                    }
                  }
                }

              });

            return bHadSomething;

            // var dd = comp.composeTemplate( me._data,  jsonTplData );
          }


        }


      }
      _myTrait_._mouseDownHandler = function(t) {


        _dragState.items = [];
        _dragState.itemsHash = {};
      }
      _myTrait_._mouseMoveHandler = function(event) {

        var elem = event.target;
        if (!elem) return;

        if (!elem.getAttribute) return;

        // return;

        // EXAMPLE of how to implement dragging etc. using this system...

        var dataId = elem.getAttribute("data-id"),
          model;
        if (dataId) {

          if (!_dragState.itemsHash[dataId]) {
            _dragState.itemsHash[dataId] = dataId;
            _dragState.items.push(dataId);
          }

          //         var model = me._find(dataId);
          //         console.log("Moving the mouse over ", dataId);
        }
      }
      _myTrait_._mouseUpHandler = function(event) {

        //    _dragState.itemsHash[dataId] = dataId;
        //    _dragState.items.push(dataId);

        console.log("Drag results");
        console.log(_dragState);
      }
      _myTrait_._valueResponder = function(obj, prop, value, elem) {

        var oldValue = obj.data[prop];
        obj.data[prop] = value;

        console.log("_valueResponder with ", prop, value);

        // AND emit then change event...
        _docUp()._emitEvent(obj.__id, "change", [4, prop, value, oldValue, obj.__id]);

        if (elem.getAttribute) {

          var f;
          if (f = elem.getAttribute("data-value-filter")) {
            // #model => x => result/on/off 

            var parts = f.split("=>"),
              me = this;

            var vName = $.trim(parts[1]),
              toggle = $.trim(parts[2]);

            var toggleParts = toggle.split("/"),
              toogleVar = toggleParts[0],
              toggleOn = toggleParts[1],
              toggleOff = toggleParts[2];

            var maxCnt = 50,
              mr;

            if (mr = elem.getAttribute("data-filter-maxcnt")) {
              maxCnt = mr;
            }

            this.query($.trim(parts[0]), function(model) {

              if (model && model.data && model.data.forEach) {
                model.data.forEach(function(m) {
                  if (maxCnt < 0) {
                    me.set(m, toogleVar, toggleOff);
                    return;
                  }
                  if (m.data[vName] && m.data[vName].toLowerCase().match(value.toLowerCase())) {
                    me.set(m, toogleVar, toggleOn);
                    maxCnt--;
                  } else {
                    me.set(m, toogleVar, toggleOff);
                  }
                });
              }

            });




          }
        }
      }
      _myTrait_.bindBaseEvents = function(elem) {

        if (!_templateCompiler) {
          _templateCompiler = templateCompiler();
        }

        // document.location.hash = "a=30,b=30,c=40";
        // console.log(document.location.hash);


        if (!_dragState) _dragState = {};

        _dragState.touchEnabled = false;
        var me = this;
        var comp = _templateCompiler;
        var o = {};

        if (!elem.addEventListener) {

          var ieStatus = {
            activeInput: null
          };

          elem.attachEvent("onkeyup", function(e) {

            if (ieStatus.activeInput && ieStatus.routeId) {
              var routeId = ieStatus.routeId;
              var elem = ieStatus.activeInput;
              var parts = routeId.split("::");
              var objid = parts[0];
              var obj = _docUp()._find(objid),
                prop = parts[1];

              if (!obj) {
                return;
              }

              // Change the object value...
              if (1) {
                //         if(typeof( obj.data[prop]) != "undefined") {
                var v = elem.value,
                  oldValue = obj.data[prop];
                if (v != oldValue) {
                  me._valueResponder(obj, prop, v, elem);
                }
              }
            }
            ieStatus.activeInput = window.event.srcElement;
          });

          elem.attachEvent("onfocusin", function(e) {
            var e = e || window.event;
            var elem = e.srcElement;
            ieStatus.activeInput = elem;
            ieStatus.routeId = elem.getAttribute("data-value-id");
            if (ieStatus.routeId) {
              // alert("Focus!!!");
            }
          });

          elem.attachEvent("onfocusout", function(e) {

            var e = e || window.event;
            var elem = e.srcElement;
            var r_id = elem.getAttribute("data-value-id");

            if (ieStatus.activeInput && (ieStatus.routeId == r_id)) {
              ieStatus.activeInput = null;
              ieStatus.routeId = 0;
            }
          })

          elem.attachEvent("onclick", function(event) {

            event = window.event;

            var timeNow = (new Date()).getTime();
            if (o.clickFired && ((timeNow - o.clickFired) < 600)) {
              return;
            }
            if (me._clickResponder(event)) {
              o.clickFired = timeNow;
            }
            o.clickFired = timeNow;
          });

          return;
        }

        // Might be mousedown handler separately....
        elem.addEventListener("mousedown", function(event) {
          me._mouseDownHandler(event);
        });

        elem.addEventListener("mousemove", function(event) {
          me._mouseMoveHandler(event);
        });

        elem.addEventListener("mouseup", function(event) {
          me._mouseUpHandler(event);
        });

        elem.addEventListener("click", function(event) {

          if (_dragState.touchEnabled) return;

          var timeNow = (new Date()).getTime();

          if (o.clickFired && ((timeNow - o.clickFired) < 200)) {
            return;
          }

          if (me._clickResponder(event)) {
            o.clickFired = timeNow;
          }

          return;
          var elem = event.target;
          if (!elem) return;

          var popView = elem.getAttribute("data-click-pop");

          if (popView) {
            var vid = me.findPushId(elem);
            if (vid) {
              console.log("The view was ", vid);
              me.popView(vid);
            }
          }

          var clickSel = elem.getAttribute("data-click-select");
          if (clickSel) {
            // then select this item into some model
            var dataId = elem.getAttribute("data-id"),
              model;
            if (dataId) {
              var model = me._find(dataId);

              if (!_selectedItems) _selectedItems = {};
              if (!_selectedItems[clickSel]) _selectedItems[clickSel] = [];

              var theList = _selectedItems[clickSel],
                theParentList;
              if (model.__p) {
                var parent = me._find(model.__p);
                if (parent) {
                  if (!parent.__selected)
                    parent.__selected = {};
                  if (!parent.__selected[clickSel])
                    parent.__selected[clickSel] = [];
                  theParentList = parent.__selected[clickSel];
                }
              }
              var selClassBase = elem.getAttribute("data-sel-class"),
                selClass, selClassFilter,
                itemIndex;
              if (selClassBase) {
                var parts = selClassBase.split(":");
                selClassFilter = parts[0];
                if (selClassFilter == clickSel) selClass = parts[1];
              }

              if ((itemIndex = theList.indexOf(dataId)) >= 0) {
                // unselect the item...
                if (selClass) $(elem).removeClass(selClass);
                theList.splice(itemIndex, 1);
                if (theParentList) {
                  var pid;
                  if ((pid = theParentList.indexOf(dataId)) > 0) {
                    theParentList.splice(pid, 1);
                  }
                }
              } else {
                // select the item...
                if (selClass) $(elem).addClass(selClass);
                theList.push(dataId);
                if (theParentList) {
                  var pid;
                  if (!((pid = theParentList.indexOf(dataId)) > 0)) {
                    theParentList.push(dataId);
                  }
                }
              }

              console.log("SELECT EVENT");
              console.log(_selectedItems);
              console.log(parent);

            }
          }


          // clicking may start also a controller....
          var ctrlId = elem.getAttribute("data-click-ctrl");
          if (ctrlId) {
            if (_controllers && _controllers[ctrlId]) {

              var dataId = elem.getAttribute("data-id"),
                model;
              if (dataId) {
                var model = me._find(dataId);
              }
              _controllers[ctrlId](model, elem);
            }

          }

          // send post data to URL

          var dataURL = elem.getAttribute("data-click-post-url");
          if (dataURL) {

            var dataId = elem.getAttribute("data-id"),
              model;
            if (dataId) {
              var model = me._find(dataId);
              $.ajax({
                type: "POST",
                url: dataURL,
                data: JSON.stringify(model),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                  // might get the response stream here, but not this time...
                  console.log(data);
                  if (data.__sCmds) me.execCommand(data.__sCmds, true);
                },
                failure: function(errMsg) {

                }
              });
            }

          }

          // Adding a new data -item as variable does not work as expected...
          var createItem = elem.getAttribute("data-click-create");
          if (createItem) {
            var str = "{" + createItem + "}";
            var dataObj = JSON.parse(str);

            for (n in dataObj) {
              var dataId = elem.getAttribute("data-id");
              if (dataId) {
                // Then, how to add a document object
                var model = me._find(dataId);
                me.push(model.data[n], dataObj[n], n);
              }
            }
          }

          var createItem = elem.getAttribute("data-click-copy");
          if (createItem) {

            var dataId = elem.getAttribute("data-id");
            if (dataId) {
              // Then, how to add a document object
              var model = me._find(dataId);
              var parent = me._find(model.__p);

              var theCopy = me.duplicate(model);

              me.push(parent, theCopy);
            }

          }

          // _clipBoard

          var createItem = elem.getAttribute("data-click-to-clipboard");
          if (createItem) {

            var dataId = elem.getAttribute("data-id");
            if (dataId) {
              // Then, how to add a document object
              var model = me._find(dataId);
              var parent = me._find(model.__p);

              var theCopy = me.duplicate(model);

              _clipBoard = theCopy;

            }

          }

          var createItem = elem.getAttribute("data-click-from-clipboard");
          if (createItem) {

            var dataId = elem.getAttribute("data-id");
            if (dataId) {
              // Then, how to add a document object
              var mainModel = me._find(dataId);

              if (mainModel && mainModel.data) {
                var model = mainModel.data[createItem];
                if (model && _clipBoard && model.data && me.isArray(model.data)) {
                  me.push(model, _clipBoard);
                }
              }

            }

          }



          // clicking may start also a controller....
          var removeItem = elem.getAttribute("data-click-remove");
          if (removeItem) {
            var dataId = elem.getAttribute("data-id");
            if (dataId) {
              if (confirm("Remove item?")) me.removeItem(dataId);
            }
          }

          // clicking may start also a controller....
          var moveItem = elem.getAttribute("data-click-moveup");
          if (moveItem) {
            var dataId = elem.getAttribute("data-id");
            if (dataId) {
              me.moveItemUp(dataId);
            }
          }

          // clicking may start also a controller....
          var moveItem = elem.getAttribute("data-click-movedown");
          if (moveItem) {
            var dataId = elem.getAttribute("data-id");
            if (dataId) {
              me.moveItemDown(dataId);
            }
          }





          var routeId = elem.getAttribute("data-click-view");


          if (routeId) {

            var routeList = routeId.split(",");

            routeList.forEach(
              function(routeId) {

                var parts = routeId.split("/"),
                  itemId;
                if (parts.length > 1) {
                  var defViewName = parts[1];
                  routeId = parts[0];
                }
                var firstChar = routeId.charAt(0),
                  whereTo;

                if (firstChar == ".") {
                  itemId = routeId.substring(1);
                  var par = elem.parentNode;
                  while (par) {

                    if (!par.getAttribute) {
                      par = par.parentNode;
                      continue;
                    }
                    console.log("Looking for ", itemId);
                    if (par.getAttribute("data-viewclass") == itemId) {
                      whereTo = par;
                      break;
                    }
                    var cc;
                    if (cc = par.getAttribute("class")) {
                      if (cc.match(itemId)) {
                        whereTo = par;
                        break;
                      }
                    }
                    par = par.parentNode;
                  }

                }
                if (firstChar == "#") {
                  itemId = routeId.substring(1);
                  var whereTo = document.getElementById(itemId);
                }

                if (!whereTo) console.log("Did not find ", routeId);

                if (whereTo) {
                  // data-id o
                  var dataId = elem.getAttribute("data-id");
                  console.log("data-id ", dataId);
                  if (dataId) {
                    var model = me._find(dataId);
                    var bSet = false;
                    var eV = whereTo.getAttribute("data-e-view");
                    if (eV) {
                      if (_eViews && _eViews[eV]) {
                        // Then this is the function to create the view definitely...
                        var newView = _eViews[eV](model);
                        me.pushView(itemId, newView._dom, {
                          sourceElem: elem
                        });
                        bSet = true;
                      }
                    }

                    if (!bSet) {
                      var viewName;

                      if (defViewName) {
                        viewName = defViewName;
                      } else {
                        viewName = whereTo.getAttribute("data-use-view");
                      }

                      console.log("looking view ", viewName);
                      if (viewName) {
                        var w = me.findNamedView(viewName);
                        // still stupid way to do it...
                        console.log("found view ", w, "composing with", model);
                        if (w) {

                          var dd = comp.composeTemplate(model, w);
                          me.pushView(whereTo, dd, {
                            sourceElem: elem,
                            animMs: 400,
                            animFn: function(dom, ms) {
                              $(dom).addClass("bounceOut");
                            },
                            animEnd: function(dom) {
                              $(dom).removeClass("bounceOut");
                            }
                          });
                          //whereTo.innerHTML = "";
                          //whereTo.appendChild(dd);
                        }
                      }
                    }
                  }
                }

              });

            // var dd = comp.composeTemplate( me._data,  jsonTplData );
          }
        });


        window.addEventListener("hashchange", function() {
          if (_transitionStatus.hashSet) {
            console.log("In the middle of the hash setting");
            return;
          }

          var newHash = document.location.hash;
          console.log("We have a new hash " + newHash);
          console.log("No react is ", _transitionStatus.noReactOn);

          if (_transitionStatus.noReactOn) {
            if ("#" + _transitionStatus.noReactOn == newHash) {
              console.log("Should not react on ", newHash);
              return;
            }
          }

          var oldV = _oldViews.length;
          if (oldV > 0) {
            var ww = _oldViews[oldV - 1];
            me.popView(ww.pushId);
          }
        });

        elem.addEventListener("input", function(event) {
          var elem = event.target;
          if (!elem) return;
          var routeId = elem.getAttribute("data-value-id");

          // console.log("Input", routeId);

          if (routeId) {
            var parts = routeId.split("::");
            var objid = parts[0];
            var obj = _docUp()._find(objid),
              prop = parts[1];

            if (!obj) {
              return;
            }

            // Change the object value...
            if (1) {
              //         if(typeof( obj.data[prop]) != "undefined") {
              var v = elem.value,
                oldValue = obj.data[prop];
              if (v != oldValue) {
                me._valueResponder(obj, prop, v, elem);
              }
            }
          }
        }, true);

        // Problem: does not delegate for the lower levels...
        elem.addEventListener("change", function(event) {

          console.log("**** GOT CHANGE EVENT ****");

          var elem = event.target;
          if (!elem) return;
          var routeId = elem.getAttribute("data-value-id");

          console.log("**** TARGET FOR CHANGE EVENT ****");
          console.log(event.target);
          console.log(event.target.value);
          console.log(routeId);

          if (routeId) {
            var parts = routeId.split("::");
            var objid = parts[0];
            var obj = _docUp()._find(objid),
              prop = parts[1];

            if (!obj) {
              console.log("Could not find object with id ", objid);
              return;
            }

            // Change the object value...
            if (1) {
              console.log("==> value responder");
              //         if(typeof( obj.data[prop]) != "undefined") {
              var v = elem.value,
                oldValue = obj.data[prop];
              if (v != oldValue) {
                me._valueResponder(obj, prop, v, elem);
              }
            }
          }
        }, false);







        var touchStart = function(e) {

          _dragState.touchEnabled = true;
          // NOTE: Removed the windows lines below when looking for touch events
          // if (window.navigator.msPointerEnabled && !e.isPrimary) return;
          o._touchItems = [];
          var allTouches = e.touches;
          if (e.targetTouches) allTouches = e.targetTouches;
          o._touchCount = allTouches.length;
          for (var i = 0; i < allTouches.length; i++) {
            var item = {};

            item.startX = allTouches[0].pageX;
            item.startY = allTouches[0].pageY;
            o._touchItems[i] = item;
          }

          o.touchStartMs = (new Date()).getTime();
          o.bTouchOn = true;
          o.didMove = false;

          // o.trigger("touchstart");
          /*
                                 if(e.preventDefault) e.preventDefault();
                                 if(e.stopPropagation) e.stopPropagation();
                                 e.returnValue = false;
                                 */

        };

        var touchMove = function(e) {
          // TODO: windows specific things here....                      
          // var off = o.q.offset();
          var allTouches = e.touches;
          if (e.targetTouches) allTouches = e.targetTouches; // [0].pageX;)
          o._touchCount = allTouches.length;
          for (var i = 0; i < allTouches.length; i++) {
            var item = o._touchItems[i];
            item.dx = e.touches[i].pageX - item.startX;
            item.dy = e.touches[i].pageY - item.startY;
          }
          o.didMove = true;
          // TODO: EVENT TRIGGER TOUCH MOVE...
          // if(e.preventDefault) e.preventDefault();
        };

        var touchEnd = function(e) {
          // TODO: TRIGGER TOUCH END
          o.bTouchOn = false;
          var timeNow = (new Date()).getTime();
          var ms = timeNow - o.touchStartMs,
            cfDelta = timeNow - (o.clickFired || 0);

          //alert(ms);   
          //alert(cfDelta);  

          var dist = 0;
          if (o.didMove) {
            var dx = o._touchItems[0].dx,
              dy = o._touchItems[0].dy;

            dist = Math.sqrt(dx * dx + dy * dy);
          }


          if ((ms < 500) && (cfDelta > 100) && (dist < 20)) {

            o.clickFired = timeNow;
            if (me._clickResponder(e)) {
              if (e.preventDefault) e.preventDefault();
              if (e.stopPropagation) e.stopPropagation();
              e.returnValue = false;
              o.clickFired = timeNow;
            }
          }


        };


        var msHandler = function(event) {
          // o.trigger("mstouch",event);
          switch (event.type) {
            case "touchstart":
            case "MSPointerDown":
              touchStart(event);
              break;
            case "touchmove":
            case "MSPointerMove":
              touchMove(event);
              break;
            case "touchend":
            case "MSPointerUp":
              touchEnd(event);
              break;
          }
          event.returnValue = false;
        }

        // NOTE: Removed the windows lines below when looking at touch events
        /*
           if (window.navigator.msPointerEnabled) {
             elem.addEventListener("MSPointerDown", msHandler, false);
             elem.addEventListener("MSPointerMove", msHandler, false);
             elem.addEventListener("MSPointerUp", msHandler, false);
           } 
           */

        elem.addEventListener("touchstart", touchStart, false);
        elem.addEventListener("touchmove", touchMove, false);
        elem.addEventListener("touchend", touchEnd, false);

      }
      _myTrait_.createController = function(name, fn) {

        if (!_controllers) _controllers = {};

        _controllers[name] = fn;



      }
      _myTrait_.createView = function(viewName, viewFn) {

        if (!_eViews) {
          _eViews = {};
        }

        _eViews[viewName] = viewFn;
      }
      _myTrait_.findPushId = function(dom) {


        // newViewDOM.setAttribute("data-pushid", pushId);

        if (dom) {
          if (dom.getAttribute) {
            var id = dom.getAttribute("data-pushid");
            if (id && _pushViews) {
              var a = _pushViews[id];
              if (a) return id;
            }
          }
          if (dom.parentNode) {
            return this.findPushId(dom.parentNode);
          }
        }
      }
      _myTrait_.findSelection = function(name) {

        if (_selectedItems) {
          if (_selectedItems[name]) {
            return _selectedItems[name];
          }
        }
        return [];
      }
      _myTrait_.findViewElement = function(dom) {

        if (dom) {
          var id = dom.getAttribute("id");
          if (id) {
            var a = _views[id];
            if (a) return id;
          }
          if (dom.parentNode) {
            return this.findViewElement(dom.parentNode);
          }
        }
      }
      _myTrait_.findViewIdFromElem = function(dom) {
        if (dom) {
          if (dom.getAttribute) {
            var id = dom.getAttribute("id");
            if (id && _views) {
              var a = _views[id];
              if (a) return id;
            }
          }
          if (dom.parentNode) {
            return this.findViewIdFromElem(dom.parentNode);
          }
        }
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(t) {

        if (!_transitionStatus) {
          _transitionStatus = {
            bTransform: false,
            hashSet: false
          }

          _oldViews = [];

          _dragState = {
            itemsHash: {},
            items: []
          };

          _uiCommands = {

          };

          this._initUiCommands();
          _templateCompiler = templateCompiler();

        }

        if (!_later)
          _later = later();
      });
      _myTrait_.popView = function(viewId) {

        if (_transitionStatus.on) return;

        if (this.isObject(viewId)) {
          var dom = viewId;
          viewId = this.findPushId(viewId);
        }

        // 
        if (_pushViews && _pushViews[viewId]) {

          _oldViews.pop();

          var saveViewDef = _pushViews[viewId].pop();
          if (saveViewDef) {
            // remove the old view...
            /*
                     var saveViewDef = {
               viewFrag : frag,
               parentDOM : dom
           }
                     */
            // don't know if this works with SVG elements
            var d = saveViewDef.parentDOM;
            while (d.firstChild) d.removeChild(d.firstChild);
            d.appendChild(saveViewDef.viewFrag);

            console.log(saveViewDef);

            if (saveViewDef.sourceElem) {
              // console.log("Should scroll to ", saveViewDef.sourceElem);
              this.scrollTo(saveViewDef.sourceElem);
            } else {
              this.scrollTo(d);
            }
            _transitionStatus.hashSet = true;
            _transitionStatus.noReactOn = (new Date()).getTime();
            document.location.hash = _transitionStatus.noReactOn;

            later().add(function() {
              _transitionStatus.hashSet = false;
            });
          }

        }
      }
      _myTrait_.pushView = function(viewId, newViewDOM, options) {

        console.log("pushView called ", viewId);


        var realViewId,
          dom,
          me = this;
        if (this.isObject(viewId)) {
          dom = viewId;
          viewId = dom.getAttribute("data-viewid");
          console.log("pushView with ", dom, viewId);
          if (!viewId) return;
        } else {
          realViewId = viewId;
          dom = document.getElementById(viewId);
        }
        if (_transitionStatus.on) return;

        if (!dom) return;
        if (!options) options = {};

        if (!_oldViews) {
          _oldViews = [];
        }

        _transitionStatus.hashSet = true;
        _transitionStatus.noReactOn = (new Date()).getTime();
        document.location.hash = _transitionStatus.noReactOn;

        later().add(function() {
          _transitionStatus.hashSet = false;
        });

        if (!_views) _views = {};
        if (!_views[viewId]) _views[viewId] = [];

        var pushId = this.guid();

        if (!_pushViews) _pushViews = {};
        if (!_pushViews[pushId]) _pushViews[pushId] = [];



        newViewDOM.setAttribute("data-pushid", pushId);

        if (options.animFn && options.animMs && 0) {

          _transitionStatus.on = true;

          console.log("About the create transform");
          // Switch the view to it's place...
          options.animFn(dom, options.animMs);

          _later.after(options.animMs / 1000, function() {


            // to remove the old view to invisible fragment...
            var frag = document.createDocumentFragment();

            while (dom.firstChild) {
              var fc = dom.firstChild;
              dom.removeChild(fc);
              frag.appendChild(fc);
            }

            // just position the view into the list of views...
            var saveViewDef = {
              viewFrag: frag,
              parentDOM: dom,
              sourceElem: options.sourceElem || null,
              pushId: pushId
            }
            _views[viewId].push(saveViewDef);
            _pushViews[pushId].push(saveViewDef);
            _oldViews.push(saveViewDef);

            dom.appendChild(newViewDOM);
            me.scrollTo(newViewDOM);

            _transitionStatus.on = false;

            options.animEnd(dom);


          });
          return;
        }

        // to remove the old view to invisible fragment...
        var frag = document.createDocumentFragment();

        while (dom.firstChild) {
          var fc = dom.firstChild;
          dom.removeChild(fc);
          frag.appendChild(fc);
        }

        // just position the view into the list of views...
        var saveViewDef = {
          viewFrag: frag,
          parentDOM: dom,
          sourceElem: options.sourceElem || null,
          pushId: pushId
        }
        _oldViews.push(saveViewDef);

        _views[viewId].push(saveViewDef);
        _pushViews[pushId].push(saveViewDef);
        me.scrollTo(newViewDOM);

        dom.appendChild(newViewDOM);

        return this;
      }
      _myTrait_.scrollTo = function(elem) {
        if (window) {

          var box = {
            left: 0,
            top: 0,
            width: 800,
            height: 800
          };

          try {
            // BlackBerry 5, iOS 3 (original iPhone)
            if (typeof elem.getBoundingClientRect !== "undefined") {
              box = elem.getBoundingClientRect();
            }
          } catch (e) {
            // for IE having this bg
            box = {
              left: 0,
              top: 0,
              width: 800,
              height: 800
            };
          }

          var currLeft = window.pageXOffset;

          var toY = box.top;
          if (toY < window.innerHeight / 2) return;
          if (box.top < window.innerHeight) {
            toY = toY / 2;
          } else {
            toY = toY - window.innerHeight * 0.2
          }

          window.scrollTo(currLeft || 0, parseInt(toY));
          // console.log(box);
          // alert((currLeft || 0)+","+ parseInt(box.top))
        }
      }
      _myTrait_.touchEvents = function(t) {

        // NOTE
        // http://blogs.msdn.com/b/davrous/archive/2013/02/20/handling-touch-in-your-html5-apps-thanks-to-the-pointer-events-of-ie10-and-windows-8.aspx
        // http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx
        // https://coderwall.com/p/egbgdw
        // http://jessefreeman.com/articles/from-webkit-to-windows-8-touch-events/

        var elem = this._dom;

        // No hope...
        if (!elem.addEventListener) return;

        var o = this;
        this._touchItems = [];

        var touchStart = function(e) {
          // NOTE: Removed the windows lines below when looking for touch events
          // if (window.navigator.msPointerEnabled && !e.isPrimary) return;
          o._touchItems = [];

          // NOTE: Removed the windows lines below when looking for touch events
          /*
                                 if(window.navigator.msPointerEnabled && e.pageX) {
                                    var item = {};
                                   
                                   item.startX = e.pageX;
                                   item.startY = e.pageY;
                                   o.trigger("touchstart");
                                   o._touchItems.push(item);
                                   if(e.preventDefault) e.preventDefault();
                                   return;
                               }*/
          // o.debug("touchStart");
          var allTouches = e.touches;
          if (e.targetTouches) allTouches = e.targetTouches;
          o._touchCount = allTouches.length;
          for (var i = 0; i < allTouches.length; i++) {
            var item = {};

            item.startX = allTouches[0].pageX;
            item.startY = allTouches[0].pageY;
            o._touchItems[i] = item;
          }

          o.trigger("touchstart");
          if (e.preventDefault) e.preventDefault();

          if (e.stopPropagation) e.stopPropagation();

          e.returnValue = false;


        };

        var touchMove = function(e) {
          // NOTE: Removed the windows lines below when looking at touch events
          /*
                               if (window.navigator.msPointerEnabled && !e.isPrimary) return;
                               if(window.navigator.msPointerEnabled && e.pageX) {
                                   //if(!o._touchItems) o._touchItems = [];
                                   //if(!o._touchItems[0]) o._touchItems[0] = {};
                                   var item = o._touchItems[0];
                                   item.dx = e.pageX - item.startX;
                                   item.dy = e.pageY - item.startY;
                                   o.trigger("touchmove");
                                   if(e.preventDefault) e.preventDefault();
                                   return;
                               }*/

          // var off = o.q.offset();
          var allTouches = e.touches;
          if (e.targetTouches) allTouches = e.targetTouches; // [0].pageX;)
          o._touchCount = allTouches.length;
          for (var i = 0; i < allTouches.length; i++) {
            var item = o._touchItems[i];

            item.dx = e.touches[i].pageX - item.startX;
            item.dy = e.touches[i].pageY - item.startY;
            //item.x = e.touches[i].pageX - off.left;
            //item.y = e.touches[i].pageY - off.top;
          }

          o.trigger("touchmove");


          if (e.preventDefault) e.preventDefault();
        };

        var touchEnd = function(e) {
          // o.q.css("transform", "rotate(20deg)");
          o.trigger("touchend");
          if (e.preventDefault) e.preventDefault();
          e.returnValue = false;
        };

        /*elem.addEventListener("touchcancel", function(e) {
                                 o.trigger("touchcancel");
                                 e.preventDefault();
                                 }, false);*/


        var msHandler = function(event) {
          // o.trigger("mstouch",event);
          switch (event.type) {
            case "touchstart":
            case "MSPointerDown":
              touchStart(event);
              break;
            case "touchmove":
            case "MSPointerMove":
              touchMove(event);
              break;
            case "touchend":
            case "MSPointerUp":
              touchEnd(event);
              break;
          }
          // if(event.preventDefault) event.preventDefault();
          event.returnValue = false;
          //                     event.preventDefault();
        }

        // NOTE: Removed the windows lines below when looking at touch events
        /*
           if (window.navigator.msPointerEnabled) {
             elem.addEventListener("MSPointerDown", msHandler, false);
             elem.addEventListener("MSPointerMove", msHandler, false);
             elem.addEventListener("MSPointerUp", msHandler, false);
           } 
           */

        elem.addEventListener("touchstart", touchStart, false);

        elem.addEventListener("touchmove", touchMove, false);

        elem.addEventListener("touchend", touchEnd, false);
        /*
           elem.addEventListener("touchcancel", function(e) {
                                 o.trigger("touchcancel");
                                 e.preventDefault();
                                 },                
           */

        return;
      }
    }(this));;
    (function(_myTrait_) {
      var _defaultSettings;
      _myTrait_.getDataAccessMethods = function(url) {

        // console.log("Parsing ", url);        


        // remove spaces from the start
        while (url && url.length && (url.charAt(0) == " ")) {
          url = url.substring(1);
        }

        var parts1 = url.split("://");

        var info = {
          bRemote: false
        };

        var dataQuery,
          rest;

        // **** examples of the remote URL methods...
        // http://someserver.com:1234/sandbox/path/fileName FETCH items/0/2 AS basedata
        // 
        // SELECT items/0 AS basedata
        // ----
        // --- > something like SQL query or similar

        // it could be also
        // SELECT ../items as mainPath



        if (parts1.length > 1) {

          var protocol = parts1.shift(),
            rest = parts1.shift();

          // The first space counts here a bit...
          var itemPaths = rest.split(" ");

          if (itemPaths.length > 0) {
            // There is something like "SELECT or similar"
            rest = itemPaths.shift();
            dataQuery = itemPaths.join(" ");
            info.dataQuery = dataQuery;
            info.queryInfo = this.getQueryInfo(dataQuery);
          }

          info.remoteUrl = protocol + "://" + rest;


          info.protocol = protocol;
          info.bRemote = true;

          var serverParts = rest.split("/"),
            ipAndPort = serverParts.shift(),
            iParts = ipAndPort.split(":"),
            ip = iParts[0],
            port = iParts[1];

          info.port = port;
          info.ip = ip;

          var sandbox = serverParts.shift(),
            fileName = serverParts.pop(),
            path = serverParts.join("/");

          info.remoteSandbox = sandbox;
          info.removeFileName = fileName;
          info.remotePath = path;

        } else {
          info.bCurrentData = true;
          info.dataQuery = parts1[0];
          info.queryInfo = this.getQueryInfo(info.dataQuery);
        }
        return info;
      }
      _myTrait_.getQueryInfo = function(query) {

        // console.log("getQueryInfo");
        // console.log(query);
        var info = {};

        // remove spaces from the start
        while (query && query.length && (query.charAt(0) == " ")) {
          query = query.substring(1);
        }

        var oneSpaceOnly = function(arr) {
          var len = arr.length;
          var bIsSpace = false;

          var i = len - 1;

          while (i >= 0) {
            // console.log(i, arr);
            // console.log(arr[i]);
            if (!arr[i] || arr[i].length == 0) {
              arr.splice(i, 1);
              i--;
              continue;
            }
            if (arr[i] == " ") {
              if (bIsSpace) {
                arr.splice(i, 1);
              } else {
                bIsSpace = true;
              }
            } else {
              bIsSpace = false;
            }
            i--;
          }
          // console.log(arr);
          return arr;
        }

        if (query) {
          var rest = query;
          var tokens = query.split(" ");

          tokens = oneSpaceOnly(tokens);

          if (rest.charAt(0) == "#") {
            var name = tokens.shift();
            info.bNamedView = true;
            info.viewName = name.substring(1);
            rest = tokens.join(" ");
          }

          if (rest.charAt(0) == "@") {
            var name = tokens.shift();
            info.bMetaData = true;
            info.metaName = name.substring(1);
            rest = tokens.join(" ");
          }

          if (tokens[0]) {
            if (tokens[0].toLowerCase() == "select") {
              info.selectCmd = tokens.shift();
              info.pathQuery = tokens.shift();
            } else {
              info.pathQuery = tokens.shift();
            }

            if (tokens[0]) {
              // can't do anything else now
              if (tokens[0].toLowerCase() == "as") {
                info.asCmd = tokens.shift();
                info.asName = tokens.shift();
              }
            }
          }

        }

        if (info.pathQuery) {
          var pp = info.pathQuery.split(":");
          if (pp.length > 1) {
            info.pathQuery = pp[0];
            info.customType = pp[1];
          }
        }

        return info;
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(t) {

        if (!_defaultSettings) {
          _defaultSettings = {};
        }
      });
      _myTrait_.query = function(query, fn, baseData) {

        // console.log(query);
        var info = this.getDataAccessMethods(query);



        var me = this;

        if (info.bRemote) {

          var theData = _docUp(info.remoteUrl);

          theData.then(function() {

            var model = theData.fetch(info.queryInfo.pathQuery);
            // console.log("Fetch returned ", model);

            if (info.queryInfo.asName) {
              me.setNamedModel(info.queryInfo.asName, model);
            }

            fn(model);
          });

        } else {

          // console.log(info);

          // TODO: also the metadata query
          if (info.queryInfo.bNamedView) {
            baseData = me.getNamedModel(info.queryInfo.viewName);
            if (!baseData) {
              fn(null, null);
              return;
            }
          }

          if (!baseData) {
            baseData = me.getData();
          }

          if (info.queryInfo.bMetaData && baseData) {
            // console.log("Looking meta");
            baseData = me.getMeta(baseData, info.queryInfo.metaName);
            if (!baseData) {
              fn(null, null);
              return;
            }
          }

          if (!info.queryInfo.pathQuery)
            info.queryInfo.pathQuery = "/";


          var model = me.fetch(info.queryInfo.pathQuery, baseData);
          if (info.queryInfo.asName) {
            me.setNamedModel(info.queryInfo.asName, model);
          }

          if (info.queryInfo.customType) {
            var cType = templateCompiler().createViewType(info.queryInfo.customType, model, {});
            if (cType) {
              model = cType.textContent || cType.innerText || "";
            }
          }


          fn(model, {
            obj: me._lastQueryObj,
            name: me._lastQueryVar
          });
        }
        /*
           
           {
             "bRemote": false,
             "bCurrentData": true,
             "dataQuery": "#myChannel @theMeta items/0/html as basedata",
             "queryInfo": {
               "bNamedView": true,
               "viewName": "#myChannel",
               "bMetaData": true,
               "metaName": "@theMeta",
               "pathQuery": "items/0/html",
               "asCmd": "as",
               "asName": "basedata"
             }
           }
           
           
           {
             "bRemote": true,
             "dataQuery": "select items/0/html as basedata",
             "queryInfo": {
               "selectCmd": "select",
               "pathQuery": "items/0/html",
               "asCmd": "as",
               "asName": "basedata"
             },
             "remoteUrl": "http://someserver.com:1234/sandbox/path/fileName",
             "protocol": "http",
             "port": "1234",
             "ip": "someserver.com",
             "remoteSandbox": "sandbox",
             "removeFileName": "fileName",
             "remotePath": "path"
           }
           */


      }
    }(this));;
    (function(_myTrait_) {
      var _commands;
      var _cmdPoints;
      var _channelLoops;
      _myTrait_._disableChannel = function(chid) {

        var ch = this._getChannelPoints(chid);
        if (!ch.disabled) {
          ch.disableIndex = ch.i;
        }
        ch.disabled = true;
      }
      _myTrait_._enableChannel = function(chid) {
        var ch = this._getChannelPoints(chid);
        ch.disabled = false;
      }
      _myTrait_._getChannelPoints = function(id) {


        if (!_cmdPoints[id]) _cmdPoints[id] = {
          i: 0,
          o: 0,
          currentPointer: 0,
          currentPromise: null,
          currentMainPromise: null,
          waitingList: []
        };
        return _cmdPoints[id];
      }
      _myTrait_._getCommandCnt = function(channelId) {
        if (!_commands) return 0;
        if (!_commands[channelId]) return 0;

        var _cmdPoints = this._getChannelPoints(channelId);

        var i = _cmdPoints.i,
          ch = _commands[channelId];

        return ch.length - i;
      }
      _myTrait_._getCommandHistory = function(channelId) {
        if (!_commands) return [];
        if (!_commands[channelId]) return [];

        return _commands[channelId];
      }
      _myTrait_._getCommandPointer = function(t) {
        return _cmdPoints.i;
      }
      _myTrait_._hasNewCommands = function(channelID) {
        if (!_commands) return;
        if (!_commands[channelID]) return;

        var _cmdPoints = this._getChannelPoints(channelID);

        var i = _cmdPoints.i,
          ch = _commands[channelID],
          c = ch[i];

        if (!c) return false;

        return true;
      }
      _myTrait_._isAtEndNoWaiting = function(channelID) {

        var cInfo = this._getChannelPoints(channelID);

        if ((this._getCommandCnt(channelID) == 0) && cInfo.waitingList.length == 0) {

          if (!cInfo.currentMainPromise) {
            return true;
          }
        }
        return false;
      }
      _myTrait_._isChannelDisabled = function(chid) {
        var ch = this._getChannelPoints(chid);
        return ch.disabled;
      }
      _myTrait_._popChannelCommand = function(channelID) {
        if (!_commands) return;
        if (!_commands[channelID]) return;

        var _cmdPoints = this._getChannelPoints(channelID);

        var i = _cmdPoints.i,
          ch = _commands[channelID],
          c = ch[i];

        if (!c) return;

        _cmdPoints.i++;

        return c;
      }
      _myTrait_._pushChannelCommand = function(channelId, cmd, ctx, isRemote, radio) {

        if (!_commands[channelId]) {
          _commands[channelId] = [];
        }
        // console.log("Push channel command ", JSON.stringify( cmd ));
        cmd = cmd.slice();

        // set the command number...
        cmd[5] = _commands[channelId].length;

        if (this._isChannelDisabled(channelId)) {

          _commands[channelId].push({
            cmd: cmd,
            ctx: ctx,
            r: isRemote,
            radio: radio
          });
          return;
        }

        // write the set commands immediately, no promise based thingie if all is clear to run...
        if (isRemote && this._isAtEndNoWaiting(channelId) && (cmd[0] == 4)) {

          //console.log("---- passing through command to channel ----- ");
          //console.log(cmd);
          this._realExecCmd(cmd, true);
          _commands[channelId].push({
            cmd: cmd,
            ctx: ctx,
            r: isRemote,
            radio: radio,
            done: true
          });
          var _cmdPoints = this._getChannelPoints(channelId);
          _cmdPoints.i++;
        } else {
          cmd[6] = (new Date()).getTime();
          // console.log("---- can not pass thorugh command ----- ");
          _commands[channelId].push({
            cmd: cmd,
            ctx: ctx,
            r: isRemote,
            radio: radio
          });
        }



      }
      _myTrait_._startChannelLoop = function(url) {

        if (!_channelLoops[url]) {

          _channelLoops[url] = true;
          var me = this;
          later().every(1 / 30, function() {
            // Then, get the channel commands from the buffer...  
            if (me._isChannelDisabled(url)) return;
            if (me._hasNewCommands(url)) {

              me._stepCommandList(url);
            }
          });

        }
      }
      _myTrait_._stepCommandList = function(channelID) {

        var _cmdPoints = this._getChannelPoints(channelID);
        var bAddWaiting = false;
        if (_cmdPoints.currentMainPromise) {
          bAddWaiting = true;
        }

        var rad = docRadio();

        var ns = rad.namespace(channelID);

        var first = _promise(),
          myPromise = _promise(),
          me = this;

        var createPromise = function(p, cmd) {
          return p.then(
            function() {

              var reflection = false;
              if (cmd.ctx) {
                if (me.isObject(cmd.ctx)) {
                  me._setCtx(cmd.ctx);
                } else {
                  me._enterCtx(cmd.ctx);
                }
              }

              var pp;
              if (cmd.r) {
                // console.log(cmd.cmd);
                pp = me._realExecCmd(cmd.cmd, cmd.r, reflection);
              } else {
                pp = _promise();
              }

              if (!pp) {
                pp = _promise();
                pp.resolve(true);
                return pp;
              }
              cmd.cmd = me._transformCmdFromNs(cmd.cmd);

              _cmdPoints.currentPromise = pp;
              _cmdPoints.currentPromiseMs = (new Date()).getTime();

              pp.then(function() {
                //console.log("resolved command ", cmd);
                if (cmd.ctx) {
                  if (me.isObject(cmd.ctx)) {
                    me._resetCtx();
                  } else {
                    me._leaveCtx(cmd.ctx);
                  }
                }
              })
                .fail(function() {
                  console.error("FAILED command ", cmd);
                  if (cmd.ctx) {
                    if (me.isObject(cmd.ctx)) {
                      me._resetCtx();
                    } else {
                      me._leaveCtx(cmd.ctx);
                    }
                  }
                });

              return pp;
            });
        }

        // collect remote commands to list to be sent immediately...
        var p = first,
          cnt = 0,
          c,
          remoteCmdList = [],
          chRadio;

        while (c = this._popChannelCommand(channelID)) {

          if (c.done) continue;

          // Push remote commands to the remote list...
          if ((!c.r) && c.radio) {
            chRadio = c.radio; // NOTE! There is only one channel in this function
            remoteCmdList.push(this._wrapRemoteCmd(c));
          } else {
            // console.log(c);
            p = createPromise(p, c);
            cnt++;
          }
        }

        if (remoteCmdList.length) {
          chRadio.send(channelID, remoteCmdList);
        }

        p.then(function() {
          myPromise.resolve(true);
        }).fail(function(m) {
          console.error("*** _stepCommandList failed " + m);
        });
        //#ifdef DEBUG

        //#endif

        // here you could push the code into debug data, if not the production release...
        myPromise.then(function() {
          _cmdPoints.currentMainPromise = null;
          _cmdPoints.currentPromise = null;
          // console.log(" --- end --- all "+cnt+" commands resolved for "+channelID);

          if (_cmdPoints.waitingList.length) {
            // console.log("shifting a new promise");
            var newFirst = _cmdPoints.waitingList.shift();
            newFirst.resolve(true);
          }
        });

        if (bAddWaiting) {
          _cmdPoints.waitingList.push(first);
          first.then(function() {
            _cmdPoints.currentMainPromise = myPromise;
          });
        } else {
          _cmdPoints.currentMainPromise = myPromise;
          first.resolve(true);
        }

        return myPromise;


      }
      _myTrait_._wrapRemoteCmd = function(cmd) {

        var ctx;

        if (cmd.ctx) {
          if (this.isObject(cmd.ctx)) {
            ctx = cmd.ctx;
          } else {
            ctx = this._createContextVar(cmd.ctx);
          }
        }
        cmd.cmd = this._transformCmdFromNs(cmd.cmd.slice());
        return {
          ctx: ctx,
          cmd: cmd.cmd
        };
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(t) {


        if (!_commands) {
          _commands = {};
          _cmdPoints = {};
          _channelLoops = {};

        }

      });
    }(this));;
    (function(_myTrait_) {
      var _commands;
      var _objectCache;
      var _cmdIndex;
      var _lastCmdId;
      var _lastCmdVals;
      var _objSetValCmds;
      var _commandListener;
      var _isRemoteUpdate;
      var _hotObjects;
      var _hotSettings;
      var _hotDocs;
      var _incomingDataFn;
      _myTrait_.createForkedObject = function(obj, theParent) {
        if (!this.isObject(obj) && (!this.isArray(obj))) return obj;

        var plain;

        if (this.isArray(obj.data)) {
          plain = [];
        } else {
          plain = {};
        }

        // create the new container object...
        var newObj = {
          data: plain,
          __id: this.guid(),
          __fork: obj.__id
        }

        if (theParent) {
          newObj.__p = theParent.__id;
        } else {
          if (obj.__radioURL) {
            newObj.__forkURL = obj.__radioURL;
          }
        }

        if (this.isArray(obj.data)) {
          var len = obj.data.length;
          for (var i = 0; i < len; i++) {
            plain[i] = this.createForkedObject(obj.data[i], newObj);
          }
        } else {
          for (var n in obj.data) {
            if (obj.data.hasOwnProperty(n)) {
              plain[n] = this.createForkedObject(obj.data[n], newObj);
            }
          }
        }


        return newObj;
      }
      _myTrait_.fork = function(obj) {

        // 
      }
    }(this));;
    (function(_myTrait_) {
      var _objectHash;
      var _eventListeners;
      var _workers;
      var _modelViews;
      var _hasRemoted;
      var _templateCompiler;
      var _valueBinded;
      var _namedModels;
      var _instanceCache;
      var _channelCommands;
      var _commandsIn;
      var _commandsOut;
      var _cmdPoints;
      var _commands;
      _myTrait_._addModelView = function(modelId, view, notUsed) {

        if (!_modelViews)
          _modelViews = {};
        if (!_modelViews[modelId])
          _modelViews[modelId] = [];

        _modelViews[modelId].push(view);
      }
      _myTrait_._addToCache = function(data) {

        if (data && data.__id) {
          _objectHash[data.__id] = data;
        }
      }
      _myTrait_._atPath = function(path, data) {

        if (!path) return;

        var arr = path.split("/");
        if (!data) data = this._data;

        if (path.charAt(0) == "/") {
          arr.unshift();
          while (data.__p) {
            data = this._find(data.__p);
          }
        }

        var lastObj = data,
          lastName = path;

        var res = {
          obj: null,
          name: "",
          type: ""
        };

        while (arr.length > 0) {

          var pathName = arr.shift();
          if (pathName.length == 0) break;

          if (data.data) {

            // Then we go to the parent model...
            if (pathName == "..") {
              var pObj = this._find(data.__p);
              if (pObj) {
                data = pObj;
                lastObj = data;
                continue;
              } else {
                res.obj == null;
                return res;
              }
            }

            var sub = data.data[pathName];
            if (typeof(sub) == "undefined") {
              res.obj == null;
              return res;
            } else {
              if (this.isObject(sub)) {
                res.obj = sub;
                res.type = "obj";
                res.name = null;
                data = sub;
                if (this.isArray) res.type = "array";
              } else {
                res.obj = data;
                res.name = pathName;
              }
            }
          }
        }
        return res;
      }
      _myTrait_._changeToRemote = function(obj, remoteURL, remoteID) {

        if (obj) {
          console.log("change to remote called " + remoteURL);
          var loaderPromise = _promise();

          var alreadyLoaded = _docUp()._find(remoteID);
          var me = this;

          if (alreadyLoaded) {

            var refP = me._createReflection(alreadyLoaded, remoteURL, obj);

            refP.then(function(ref) {

              console.log("reflection done");

              obj.data = ref.data;

              if (ref.__vpid) obj.__vpid = ref.__vpid;
              if (ref.__vcid) obj.__vcid = ref.__vcid;

              loaderPromise.resolve(alreadyLoaded);
            });
            return loaderPromise;

          }

          var myDataLoader = _docUp(remoteURL, {});


          console.log("starting loader ");

          // Loading the data and after thet
          myDataLoader.then(function() {
            console.log("finished loader ");

            // This is the original object
            var origObj = myDataLoader._find(remoteID);
            if (origObj) {

              console.log("Remote data ");
              console.log(JSON.parse(JSON.stringify(origObj)));

              console.log("creating reflection ");

              var refP = me._createReflection(origObj, remoteURL, obj);

              refP.then(function(ref) {

                console.log("reflection done");

                obj.data = ref.data;

                if (ref.__vpid) obj.__vpid = ref.__vpid;
                if (ref.__vcid) obj.__vcid = ref.__vcid;

                loaderPromise.resolve(origObj);
              });

            } else {
              console.error(" did not find " + remoteURL + "/" + remoteID);
              loaderPromise.fail(" did not find " + remoteURL + "/" + remoteID);
            }


          });
          return loaderPromise;
        }
      }
      if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = []
      _myTrait_.__factoryClass.push(function(data) {

        if (!this.isObject(data)) {
          if (data) {
            var o;
            if (o = this._myClassCache(data)) {
              return o;
            }
            this._myClassCache(data, this);
          }
        } else {
          /*
    if(data && data.__radioURL) {
        var o;
        if(o = this._myClassCache( data.__radioURL )) {
            return o;
        }
        this._myClassCache( data.__radioURL, this );        
    }*/
        }
      });
      _myTrait_._clearWorkers = function(view) {
        var me = this;

        //console.log("at _clearWorkers ");

        view.workers.forEach(function(ww) {
          //    console.log("calling _removeWorker ");
          me._removeWorker(ww);
        })

        view.childViews.forEach(function(ww) {
          //    console.log("calling child views _clearWorkers ", ww);
          me._clearWorkers(ww);
        });
      }
      _myTrait_._cmd = function(cmd, obj, targetObj) {


        // console.log("Got _cmd", cmd);

        // var testCommand = [4, 'cx', 30,20, '8vsngfc0rpe3i4wsoy63ydwxht']; 

        // Push object:
        // var pushCmd = [7, 3, '<insertedObjectId>', null, <parentGUID>]; 

        var objid = cmd[4],
          w = _workers;

        if (!obj) obj = this._find(objid);

        if (w && obj) {
          var ww;
          if (ww = w[objid]) {

            // property change, for example obj.x = 30
            if (cmd[0] == 4 || (cmd[0] == 13)) {
              var list;
              if (list = ww[cmd[1]]) {
                list = list.slice();
                var len = list.length;
                for (var i = 0; i < len; i++) {
                  var worker = list[i][0],
                    target = list[i][1],
                    propN = list[i][2];
                  worker.run(cmd, obj, target, propN);
                }
              }
              // if listening to changes to all variables
              if (list = ww["*"]) {
                list = list.slice();
                var len = list.length;
                for (var i = 0; i < len; i++) {
                  var worker = list[i][0],
                    target = list[i][1],
                    propN = list[i][2];
                  worker.run(cmd, obj, target, propN);
                }
              }
            }

            // is the "*" as the array modifications tag???
            if (cmd[0] == 12 || cmd[0] == 7 || cmd[0] == 8) {
              var list;
              if (list = ww["*"]) {
                list = list.slice();
                var len = list.length;
                for (var i = 0; i < len; i++) {
                  var worker = list[i][0],
                    target = list[i][1],
                    propN = list[i][2];

                  // IF there is array observer then it will be called...
                  // cmd = [...]
                  // targetObj = dataItem to be inserted
                  // target = information about the list
                  // obj = parent object id...
                  worker.run(cmd, targetObj, target, obj, propN);
                }
              }
            }
          }
        }

        /***********************************************
         * Design consideration: should the array commands to be set into different
         * variable than the _workers current
         *
         *   _workers[<objid>][<propertyid>]
         *
         * The property idea is to connect "x" => to some DOM elements attribute or
         * other kind of detail with a simple array
         *
         * _workers[<objid>][<propertyid>] =  [worker, target, targetProp]
         *
         * However, the array is slightly different, the commands are more like funtions
         *
         * _functionWorkers[objid]["arraycmd"] => execute the moveup, movedown
         *
         * It could also be something like
         *
         * _workers[objid][".functionName"]
         *
         * up._createWorker( objid, "*", ... array worker ... );
         *
         * OR....
         *
         * _workers[objid][4][cx] =>
         * _workers[objid][12] => run...
         *
         */
      }
      _myTrait_._createModelCommands = function(obj, parentObj, intoList) {

        /*
               _cmdIndex = {}; 
               _cmdIndex["createObject"] = 1;
               _cmdIndex["createArray"]  = 2;
               _cmdIndex["initProp"]  = 3;
               _cmdIndex["set"]  = 4;
               _cmdIndex["setMember"]  = 5;
               _cmdIndex["push"]  = 6;
               _cmdIndex["pushObj"]  = 7;
               _cmdIndex["removeItem"]  = 8;
               
               // reserved 9 for optimizations
               _cmdIndex["last"]  = 9;
               
               _cmdIndex["removeProperty"]  = 10;
               _cmdIndex["insertObjectAt"]  = 11;
               _cmdIndex["moveToIndex"]  = 12;
           */

        if (!intoList) intoList = [];

        var data;

        if (obj.data && obj.__id) {
          data = obj.data;
        } else {
          data = obj;
        }

        if (this.isObject(data) || this.isArray(data)) {

          var newObj;

          if (obj.__id) {
            newObj = obj;
          } else {
            newObj = {
              data: data,
              __id: this.guid()
            }
          }

          if (this.isArray(data)) {
            var cmd = [2, newObj.__id, [], null, newObj.__id];
          } else {
            var cmd = [1, newObj.__id, {},
              null, newObj.__id
            ];
          }
          if (parentObj) {
            newObj.__p = parentObj.__id;
            // this._moveCmdListToParent( newObj );
          }
          intoList.push(cmd);

          // Then, check for the member variables...
          for (var n in data) {
            if (data.hasOwnProperty(n)) {
              var value = data[n];
              if (this.isObject(value) || this.isArray(value)) {
                // Then create a new...
                var oo = this._createModelCommands(value, newObj, intoList);
                var cmd = [5, n, oo.__id, null, newObj.__id];
                intoList.push(cmd);
              } else {
                var cmd = [4, n, value, null, newObj.__id];
                intoList.push(cmd);
              }
            }
          }

          return newObj;
        } else {

        }



        /*
           var newObj = {
               data : data,
               __id : this.guid()
           }
           */
      }
      _myTrait_._createNewModel = function(data, parentObj) {

        /*
               _cmdIndex = {}; 
               _cmdIndex["createObject"] = 1;
               _cmdIndex["createArray"]  = 2;
               _cmdIndex["initProp"]  = 3;
               _cmdIndex["set"]  = 4;
               _cmdIndex["setMember"]  = 5;
               _cmdIndex["push"]  = 6;
               _cmdIndex["pushObj"]  = 7;
               _cmdIndex["removeItem"]  = 8;
               
               // reserved 9 for optimizations
               _cmdIndex["last"]  = 9;
               
               _cmdIndex["removeProperty"]  = 10;
               _cmdIndex["insertObjectAt"]  = 11;
               _cmdIndex["moveToIndex"]  = 12;
           */

        if (this.isObject(data) || this.isArray(data)) {

          var newObj = {
            data: data,
            __id: this.guid()
          }

          _objectHash[newObj.__id] = newObj;

          if (this.isArray(data)) {
            var cmd = [2, newObj.__id, [], null, newObj.__id];
          } else {
            var cmd = [1, newObj.__id, {},
              null, newObj.__id
            ];
          }

          if (parentObj) {
            newObj.__p = parentObj.__id;
            // this._moveCmdListToParent( newObj );
          }
          this.writeCommand(cmd, newObj);

          // Then, check for the member variables...
          for (var n in data) {
            if (data.hasOwnProperty(n)) {
              var value = data[n];
              if (this.isObject(value) || this.isArray(value)) {
                // Then create a new...
                var oo = this._createNewModel(value, newObj);
                newObj.data[n] = oo;
                var cmd = [5, n, oo.__id, null, newObj.__id];
                this.writeCommand(cmd, newObj);
                this._moveCmdListToParent(oo);
              } else {
                var cmd = [4, n, value, null, newObj.__id];
                this.writeCommand(cmd, newObj);
              }
            }
          }

          return newObj;

        } else {

        }


        /*
           var newObj = {
               data : data,
               __id : this.guid()
           }
           */
      }
      _myTrait_._createReflection = function(data, radioURL, useObj) {


        var refObj,
          refPromise = _promise(),
          me = this,
          refList = [];

        if (!radioURL && data.__radioURL && data.__rid) {
          // we should load the data first if the object does not exist
          var o = me._find(data.__rid);
          if (o) {
            // the object has been loaded, no need to create loader
          } else {
            var loader = _docUp(data.__radioURL);
            loader.then(function() {
              var p = me._createReflection(data, radioURL, useObj);
              p.then(function(refData) {
                refPromise.resolve(refData);
              });
            });
            return refPromise;
          }
        }

        // at this point we should have the data available...

        if (useObj) {
          refObj = useObj;
          if (data.__rid) {
            refObj.__rid = data.__rid;
          } else {
            refObj.__rid = data.__id;
          }

          // if data has virtual parent id, use it
          if (useObj.__vpid) {
            refObj.__vpid = useObj.__vpid;
            refObj.__vcid = useObj.__vcid;
          } else {
            refObj.__vpid = useObj.__p;
            refObj.__vcid = useObj.__id;
          }

        } else {
          refObj = {
            __id: this.guid(),
            __rid: data.__id,
            __radioURL: radioURL
          }
          if (data.__rid) {
            refObj.__rid = data.__rid;
          }
        }

        // if data has virtual parent id, use it
        if (data.__vpid) {
          refObj.__vpid = data.__vpid;
          refObj.__vcid = data.__vcid;
        }


        // register to the memory
        if (data.__rid) {
          this._addReflection(refObj.__rid, refObj.__id);
        } else {
          this._addReflection(refObj.__rid, refObj.__id);
        }

        // in case the object with __vcid is removed...
        if (refObj.__vcid) {
          this._addReflection(refObj.__vcid, refObj.__id);
        }

        _objectHash[refObj.__id] = refObj;

        if (radioURL) refObj.__radioURL = radioURL;
        if (data.__radioURL) refObj.__radioURL = data.__radioURL;

        if (this.isArray(data.data)) {
          refObj.data = [];
          var len = data.data.length;
          for (var i = 0; i < len; i++) {
            var v = data.data[i];
            if (this.isObject(v)) {
              var rp = this._createReflection(v);
              refList.push(rp);
              (function(i) {
                rp.then(function(refData) {
                  refObj.data[i] = refData;
                  refObj.data[i].__p = refObj.__id;
                });
              }(i));
            } else {
              refObj.data[i] = v;
            }

          }
        } else {
          refObj.data = {};
          for (var n in data.data) {
            if (data.data.hasOwnProperty(n)) {
              var v = data.data[n];
              if (this.isObject(v)) {
                var rp = this._createReflection(v);
                refList.push(rp);
                (function(n) {
                  rp.then(function(refData) {
                    refObj.data[n] = refData;
                    refObj.data[n].__p = refObj.__id;
                  });
                }(n));
              } else {
                refObj.data[n] = v;
              }
            }
          }
        }

        if (refList.length) {
          var s = _promise();
          s.all(refList).then(function() {
            refPromise.resolve(refObj);
          });
          s.resolve(true);
        } else {
          refPromise.resolve(refObj);
        }

        return refPromise;
      }
      _myTrait_._createWorker = function(objid, prop, worker, target, targetProp) {

        // console.log("**** called create workers ****");

        // ARRAY Worker:
        // m._createWorker( dataItem.__id, "*", <arrayWorker>, view, ???? );

        var a = _workers[objid];
        if (!a) {
          a = _workers[objid] = {};
        }
        var b = a[prop];
        if (!b) {
          b = _workers[objid][prop] = [];
        }
        var wDef = [worker, target, targetProp];
        b.push(wDef);

        // this is quite important, worker definition is 
        // 1. array of the objectid + property workers...
        // 2. the actual worker definition array with semantics
        // TODO: how to actually remove a worker using this def???

        return [b, wDef];

      }
      _myTrait_._emitEvent = function(objid, eventName, eventData) {

        var obj = _objectHash[objid];

        // console.log("emit", objid, eventName, eventData);

        if (obj) {

          // console.log("Found object to be emitted", obj);    
          // 
          var ev;
          if (_eventListeners && (ev = _eventListeners[objid])) {
            // console.log("The object had event listeners!!!");
            if (ev[eventName]) {
              ev[eventName].forEach(function(fn) {
                fn(eventData);
              });
            }
          }

          if (obj.__p) {
            this._emitEvent(obj.__p, eventName, eventData);
          } else {
            console.log("did not find the parent object...");
            if (eventName == "change" && !_eventListeners[objid]) {
              console.log("Might trigger the change for this object");
              if (obj.__rid) {
                console.log("it was also reflected object");
                console.log(obj);
                console.log(eventData);
                this.execCommand(eventData);
              }
            }
            // console.log("Found a parent object");
            // console.log(obj);
          }

          // Listeners for the object...

        }
      }
      _myTrait_._find = function(id) {


        return _objectHash[id];
      }
      _myTrait_._findObjects = function(data, parentId, whenReady) {

        var myPromise = _promise();

        if (!this.isObject(data)) {
          myPromise.resolve(data);
          return myPromise;
        }
        //     myPromise = _promise();

        data = this._wrapData(data);
        if (data.__id) {
          _objectHash[data.__id] = data;
        }

        var me = this;

        // the data has a remote ID, 
        if (data.__rid && data.__radioURL) {

          var myDataLoader = _docUp(data.__radioURL, {});
          var me = this;
          // Loading the data and after thet
          myDataLoader.then(function() {
            // console.log("%c *** find is looking at "+data.__radioURL+" ***", "background:cyan; ");
            var origObj = myDataLoader._find(data.__rid);
            if (origObj) {
              //console.log("%c *** should start reflecting "+data.__radioURL+" ***", "background:blue;color:white;");
              // creating the reflection of this object here...
              var refP = me._createReflection(origObj, data.__radioURL, data);
              refP.then(function(ref) {

                // console.log("%c *** reflection promise returned "+data.__radioURL+" ***", "background:blue;color:white;");

                data.__p = parentId; // virtual parent
                _objectHash[data.__id] = data;
                // The data has been loaded...
                myPromise.resolve(data);
              });

            } else {
              // console.error(" *** could not resolve the remote data from "+data.__radioURL+" ***", "background:red;color:white;");
              myPromise.resolve(data);
            }

          });

          return myPromise;
        }

        // setting the parentid for the object
        if (parentId) {
          data.__p = parentId;
        }

        var subPromises = [];

        if (data.data) {
          var sub = data.data;
          for (var n in sub) {
            if (sub.hasOwnProperty(n)) {
              var p = sub[n];
              if (this.isObject(p)) {
                var subP = this._findObjects(p, data.__id);
                subPromises.push(subP);
                (function(n, p) {
                  subP.then(function(newData) {
                    if (newData !== p) {
                      data.data[n] = newData;
                    }
                  });
                }(n, p))
              }
            }
          }
        }
        if (subPromises.length) {
          //console.log("%c ***waitinf for s.all *** "+data.__id, "backgorund:blue");
          var s = _promise();
          s.all(subPromises).then(function() {
            //console.log("%c *** s.all returned *** "+data.__id, "backgorund:cyan");
            //console.log("%c *** s.all returned *** "+data.__id, "backgorund:cyan");
            myPromise.resolve(data);
          });
          s.resolve(true);
        } else {
          myPromise.resolve(data);
        }

        return myPromise;
      }
      _myTrait_._findObjects2 = function(t) {

        if (!this.isObject(data)) {
          if (whenReady) whenReady.resolve(data);
          return data;
        }
        //     myPromise = _promise();

        data = this._wrapData(data);

        if (data.__id) {
          _objectHash[data.__id] = data;
        }

        var me = this;


        // the data has a remote ID, 
        if (data.__rid && data.__radioURL) {

          console.log("_findObjects with ", data);

          var myDataLoader = _docUp(data.__radioURL, {});
          var me = this;
          // me._unresolved.push(myDataLoader);

          // may cause system halt... problem!!!!
          if (!me._waitingPromises) me._waitingPromises = [];
          me._waitingPromises.push(myDataLoader)

          // Loading the data and after thet
          myDataLoader.then(function() {

            console.log("Finding ", data.__rid);
            // This is the original object
            var origObj = myDataLoader._find(data.__rid);
            if (origObj) {
              console.log("Creating reflection ", origObj, data.__radioURL, data);

              var ref = me._createReflection(origObj, data.__radioURL, data);

              console.log(ref);

              //data.data = ref.data;
              //data.__rid = ref.__rid;
              //data.__id = ref.__id;  

              // *** adding the parent link may cause problems ***
              data.__p = parentId; // virtual parent

              _objectHash[data.__id] = data;
              var i = me._unresolved.indexOf(myDataLoader);
              me._unresolved.splice(i, 1);
              if (me._unresolved.length == 0 && (me._waitingPromises.length == 0)) {
                // if we are ready...
                console.log("**** unresolved == 0 ****, resolving this ");
                me.resolve(me._data);
              }

            }

          });

          return data;
        }

        if (data.__virtual) {
          //console.log("***** found virtual data ******");
          //console.log(data.__radioURL);
          // Here it is now...
          var myDataLoader = _docUp(data.__radioURL, {});

          var me = this;
          me._unresolved.push(myDataLoader);

          // Loading the data and after thet
          myDataLoader.then(function() {
            console.log("Got remote data");
            console.log(myDataLoader);
            data.data = myDataLoader._data.data;
            data.__radio = myDataLoader._data.__radio;
            data.__id = myDataLoader._data.__id; // This is quite important perhaps here???
            _objectHash[data.__id] = data;
            var i = me._unresolved.indexOf(myDataLoader);
            me._unresolved.splice(i, 1);
            if (me._unresolved.length == 0) {
              // if we are ready...
              me.resolve(me._data);
            }
          });

          return data;


          // We should be getting a new docup object...
          // this._unresolved.push(); // something

        }

        // setting the parentid for the object
        if (parentId) {
          data.__p = parentId;
        }

        if (data.data) {
          var sub = data.data;
          for (var n in sub) {
            if (sub.hasOwnProperty(n)) {
              var p = sub[n];
              if (this.isObject(p)) {
                var newData = this._findObjects(p, data.__id);
                if (newData !== p) {
                  data.data[n] = newData;
                }
              }
            }
          }
        }
        return data;
      }
      _myTrait_._findRadioURL = function(o) {
        if (!o) o = this._data;

        while (0 && !o.__radioURL) {
          o = this._find(o.__p);
        }

        if (o && o.__radioURL) return o.__radioURL;
      }
      _myTrait_._getAllWorkers = function(t) {


        return _workers;
      }
      _myTrait_._getChannelCommands = function(url) {

        if (_channelCommands) {
          return _channelCommands[url];
        }
      }
      _myTrait_._getCommandsFor = function(channelId) {

      }
      _myTrait_._getModelViews = function(id) {

        return _modelViews[id];
      }
      _myTrait_._getObjectHash = function(t) {
        return _objectHash;
      }
      _myTrait_._getObjectInPath = function(path, data) {

        if (!path) return;

        var arr = path.split("/");
        if (!data) data = this._data;


        // children

        var lastObj = data,
          lastName = path;

        this._lastQueryObj = lastObj;
        this._lastQueryVar = lastName;

        while (arr.length > 0) {
          var pathName = arr.shift();
          if (pathName.length == 0) break;

          if (data.data) {

            // Then we go to the parent model...
            if (pathName == "..") {
              var pObj = this._find(data.__p);
              if (pObj) {
                data = pObj;
                lastObj = data;
                continue;
              } else {
                return;
              }
            }

            var sub = data.data[pathName];
            if (this.isObject(sub)) lastObj = sub;
            if (sub) {
              lastName = pathName;
              data = sub;
              continue;
            } else {
              return;
            }
          }
        }

        this._lastQueryObj = lastObj;
        this._lastQueryVar = lastName;

        if (this.isObject(data)) return data;

        return data;
      }
      _myTrait_._iterate = function(name) {

      }
      _myTrait_._myClassCache = function(url, obj) {

        if (!_instanceCache) _instanceCache = {};

        if (typeof(obj) == "undefined") {
          return _instanceCache[url];
        }

        _instanceCache[url] = obj;
      }
      _myTrait_._onValue = function(objid, eventName, callbackFn) {

        var list;

        if (!_eventListeners) _eventListeners = {};
        if (!_eventListeners[objid])
          _eventListeners[objid] = {};
        if (!_eventListeners[objid][eventName]) {
          _eventListeners[objid][eventName] = [];
        }

        list = _eventListeners[objid][eventName];

        // ...
        if (list.indexOf(callbackFn) < 0) {
          list.push(callbackFn);
          // Listeners for the object...

        }
      }
      _myTrait_._prepareData = function(data) {


        var d = this._wrapData(data);

        if (!_objectHash[d.__id]) {
          // it is a new object that should be added to the current model...
          d = this._findObjects(d);
        }

        return d;
      }
      _myTrait_._removeView = function(viewDef) {

        var dom = viewDef.dom;

        console.log("_removeView called ");

        if (dom.parentNode) {
          dom.parentNode.removeChild(dom);
        }

        var parent;
        if (parent = viewDef.parentView) {
          var i = parent.childViews.indexOf(viewDef);
          parent.childViews.splice(i, 1);
        }

        console.log("calling _clearWorkers ");
        this._clearWorkers(viewDef);
      }
      _myTrait_._removeWorker = function(wDefArray) {

        // var wDef = [worker, target, targetProp];
        // b.push(wDef);
        // return [b, wDef];

        if (!wDefArray) return;

        var b = wDefArray[0],
          wDef = wDefArray[1];

        if (!b || !wDef) return;

        var i = b.indexOf(wDef);
        if (i >= 0) b.splice(i, 1);

      }
      _myTrait_._triggerEvent = function(objId, eventName, eventData) {

        var obj = _objectHash[objid];

        if (obj) {


        }
      }
      _myTrait_._wrapData = function(data, parent) {

        // if instance of this object...
        if (data && data._wrapData) {
          // we can use the same pointer to this data
          return data._data;
        }

        // if the data is "well formed"
        if (data.__id && data.data) return data;

        // if new data, then we must create a new object and return it

        var newObj = this._createNewModel(data);
        /*
           var newObj = {
               data : data,
               __id : this.guid()
           }
           */
        return newObj;
      }
      _myTrait_.duplicate = function(obj) {

        var p = this.toPlainData(obj);

        var up = _docUp(p);

        return up.getData();
      }
      _myTrait_.fetch = function(str, baseData) {

        var o = this._getObjectInPath(str, baseData);

        if (o) return o;
      }
      _myTrait_.findNamedView = function(name) {

        if (!_templateCompiler) _templateCompiler = templateCompiler();

        return _templateCompiler._getNamedView(name);
      }
      _myTrait_.forTree = function(data, fn) {

        if (this.isFunction(data)) {
          fn = data;
          data = this._data;
        } else {
          if (this.isObject(data) && this.isFunction(fn)) {

          } else {
            return;
          }
        }

        fn(data);

        if (data.data) {
          var sub = data.data;
          for (var n in sub) {
            if (sub.hasOwnProperty(n)) {
              var p = sub[n];
              if (this.isObject(p)) {
                this.forTree(p, fn);
              }
            }
          }
        }

        return this;
      }
      _myTrait_.getData = function(t) {


        return this._data;
      }
      _myTrait_.getMeta = function(obj, name) {



        if (this.isObject(obj)) {

          if (!obj.__meta) {
            return;
          }

          var dd = obj.__meta[name];

          if (dd) {
            var mo = _docUp(dd);
            return mo.getData();
          }

        }
      }
      _myTrait_.getNamedModel = function(name) {

        if (_namedModels) return _namedModels[name];
      }
      _myTrait_.getNamedViews = function(t) {

        if (_templateCompiler) {
          return _templateCompiler._getNamedViews();
        }
      }
      _myTrait_.indexOf = function(item) {

        if (!item) item = this._data;

        if (!this.isObject(item)) {
          item = this._find(item);
        }
        if (!item) return;

        var parent = this._find(item.__p);

        if (!parent) return;
        if (!this.isArray(parent.data)) return;

        return parent.data.indexOf(item);

      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(data, options) {

        // which object hash has the data...10.000 object hashes, there might be
        // some problems to re-allocate the objects if they are not directly placed
        // under the correct hash...???

        if (!this._unresolved)
          this._unresolved = [];

        if (!_objectHash) {
          _objectHash = {};
          _workers = {};
        }

        var me = this;

        // Fetching the remote objects inside the object tree is a bit more difficult opertaion than
        // originally though...
        var bRemote = false;
        if (data && !this.isObject(data) && (data.substring(0, 7) == "http://")) {

          console.log("##### Fetching data from ", data);

          var myUrl = data;

          var chOptions = {
            onCommand: function(cmd, ctx) {

              cmd = me._transformCmdToNs(cmd, me._getNsFromUrl(myUrl));
              me._pushChannelCommand(myUrl, cmd, ctx, true);
            },
            onFile: function(remoteData, changeList, url) {

              console.log("---- ON FILE ---- ");

              // Try conversion to the namespaces
              remoteData = me._transformObjToNs(remoteData, me._getNsFromUrl(url));
              me._data = remoteData;

              // find objects is run here so that the commands can find their targets
              var findPromise = me._findObjects(remoteData);
              findPromise.then(
                function(d) {

                  //console.log("%c ======= FIND PROMISE DID RETURN!!!!! ====== "+myUrl, "background:yellow;");
                  //console.log(d);

                  if (me._data != d) {
                    me._data = d;
                  }
                  if (changeList && changeList.length) {

                    changeList.forEach(function(cmd) {
                      cmd = me._transformCmdToNs(cmd, me._getNsFromUrl(url));
                      me._pushChannelCommand(url, cmd, {}, true);
                    });

                    var p = me._stepCommandList(url);
                    if (p) {
                      p.then(function() {

                        me._data.__radioURL = data;
                        me._data.__radio = radio;

                        me._startChannelLoop(me._data.__radioURL);
                        me.resolve(me._data);
                      })
                        .fail(function() {

                        });
                    } else {

                    }
                  } else {
                    me._data.__radioURL = data;
                    me._data.__radio = radio;

                    if (me._data._cmdList) delete me._data._cmdList;
                    if (me._data._ctxCmdList) delete me._data._ctxCmdList;

                    me._startChannelLoop(me._data.__radioURL);
                    me.resolve(me._data);

                  }

                }
              )
                .fail(function(m) {
                  console.error("Failed for " + data);
                  console.error(m);
                });

              // bind for the _emitEvent "change" signal here... 
              if (!_valueBinded) _valueBinded = {};
              if (!_valueBinded[me._data.__id]) {
                _valueBinded[me._data.__id] = true;
                me.onValue(function(v) {
                  me.execCommand(v);
                });
              }

            }
          };

          if (options && this.isObject(options) && options.createWith) {
            chOptions.createWith = options.createWith;
          }
          if (options && this.isObject(options) && options.dataNS) {
            chOptions.dataNS = options.dataNS;
          }
          var radio = docRadio(),
            me = this;
          radio.listen(data, chOptions);

          return;
        }

        // Just testing this...
        // var remoteUrls = this.loadRemoteUrls();
        // console.log("Loading remote urls from the tpl");
        // onsole.log(remoteUrls);

        if (!data) {
          return;
        }

        this._data = data;


        var findPr = this._findObjects(data);

        findPr.then(
          function(d) {
            if (data != d) {
              me._data = d;
            }
            if (me._data) {
              if (!_valueBinded) _valueBinded = {};
              if (!_valueBinded[me._data.__id]) {
                _valueBinded[me._data.__id] = true;
                me.onValue(function(v) {
                  console.log("onValue ", JSON.stringify(v));
                  me.execCommand(v);
                });
              }
            }
            me.resolve(me._data);
          });

      });
      _myTrait_.listNamedModels = function(t) {

        return _namedModels;
      }
      _myTrait_.loadRemoteData = function(channel) {


        var s = _connectManager().createSocketServer({
          ip: channel.ip,
          port: channel.port
        });

        var me = this;

        // connecting to the selected file...
        var ch = s.createChannel(channel);
        ch.then(function() {
          ch.getFileData(function(remoteData, changeList) {

            me._data = remoteData;
            var d = me._findObjects(remoteData);
            if (me._data != d) {
              this._data = d;
            }
            if (changeList && changeList.length) {
              changeList.forEach(function(cmd) {
                me.execCommand(cmd, true);
              });
            }

            me.resolve(me._data);

            // TODO: think, might set the onChange here.... onValue( ... exec l... )

          });
        });
      }
      _myTrait_.loadRemoteUrls = function(t) {

        if (_hasRemoted) return _hasRemoted;

        _hasRemoted = true;

        var results = [];

        // just get all remote URL channels...
        var all = document.querySelectorAll("[data-src]");

        console.log("Data src list", all);

        for (var i = 0; i < all.length; i++) {
          var domWithData = all[i];

          var getTheFish = function(domWithData) {

            var url = domWithData.getAttribute("data-src");
            var reqData = this.parseRemoteUrl(url);
            results.push(reqData);

          }
          getTheFish(domWithData);
        }

        _hasRemoted = results;
        return results;
      }
      _myTrait_.moveItemDown = function(itemId) {
        var oldPos;

        var item = this._find(itemId);
        if (!item) return;

        var parent = this._find(item.__p);

        if (!parent) return;
        if (!this.isArray(parent.data)) return;

        oldPos = parent.data.indexOf(item);
        var newPos = oldPos - 1;
        var pLen = parent.data.length;
        if (newPos >= 0 && newPos < pLen) {
          this.execCommand([12, item.__id, newPos, oldPos, item.__p]);
        }

        // p.saveCommand("moveToIndex", myGUID, newPos, null );

        return this;
      }
      _myTrait_.moveItemToPos = function(itemId, newPos) {
        var oldPos;

        var item = this._find(itemId);
        if (!item) return;

        var parent = this._find(item.__p);

        if (!parent) return;
        if (!this.isArray(parent.data)) return;

        oldPos = parent.data.indexOf(item);

        var pLen = parent.data.length;
        if (newPos >= 0 && newPos < pLen) {
          this.execCommand([12, item.__id, newPos, oldPos, item.__p]);
        }

        return this;
      }
      _myTrait_.moveItemUp = function(itemId) {
        var oldPos;

        var item = this._find(itemId);
        if (!item) return;

        var parent = this._find(item.__p);

        if (!parent) return;
        if (!this.isArray(parent.data)) return;

        oldPos = parent.data.indexOf(item);
        var newPos = oldPos + 1;
        var pLen = parent.data.length;
        if (newPos >= 0 && newPos < pLen) {
          console.log("Got item up into ", newPos);
          this.execCommand([12, item.__id, newPos, oldPos, item.__p]);
        }

        // p.saveCommand("moveToIndex", myGUID, newPos, null );

        return this;
      }
      _myTrait_.onValue = function(objid, eventName, callbackFn) {

        if (this.isFunction(objid)) {
          if (this._data) {
            this._onValue(this._data.__id, "change", objid);
          }
          return this;
        }

        if (this.isFunction(eventName)) {
          if (this._data) {
            this._onValue(this._data.__id, objid, eventName);
          }
          return this;
        }

        return this._onValue(objid, eventName, callbackFn);
      }
      _myTrait_.parseRemoteUrl = function(url) {

        // console.log("Parsing ", url);        
        var parts1 = url.split("://");
        var protocol = parts1.shift(),
          rest = parts1.shift();
        var serverParts = rest.split("/"),
          ipAndPort = serverParts.shift(),
          iParts = ipAndPort.split(":"),
          ip = iParts[0],
          port = iParts[1],
          sandbox = serverParts.shift(),
          fileName = serverParts.pop(),
          path = serverParts.join("/");

        var reqData = {
          channel: {
            ip: ip,
            port: port,
            sandbox: sandbox,
            path: path,
            file: fileName,
            auth: {
              u: "abba",
              p: "nowp"
            }
          }
        };

        return reqData;
      }
      _myTrait_.push = function(path, newData, propName) {
        var me = this,
          myPromise = _promise();
        if (this.isObject(path) && this.isObject(path.data) && !this.isArray(path.data)) {
          var o = path;
          var tmpDoc = _docUp(newData);
          tmpDoc.then(function() {
            var data = tmpDoc._data;
            // tmpDoc._moveCmdListToParent( data );
            me.execCommand([5, propName, data.__id, null, o.__id]).then(function() {
              myPromise.resolve(true);
            });
            tmpDoc._moveCmdListToParent(data);
          });

          return myPromise;
        }

        if (this.isObject(path) && this.isArray(path.data)) {

          var o = path;

          var tmpDoc = _docUp(newData);

          tmpDoc.then(function() {
            var data = tmpDoc._data;
            // tmpDoc._moveCmdListToParent( data );
            me.execCommand([7, o.data.length, data.__id, null, o.__id]).then(function() {
              myPromise.resolve(true);
            });
            tmpDoc._moveCmdListToParent(data);
          });

          return myPromise;
        }

        // console.log("Push ", path, newData, propName);

        var o = this._getObjectInPath(path);
        if (o) {
          if (this.isArray(o.data)) {

            var tmpDoc = _docUp(newData);
            tmpDoc.then(function() {
              var data = tmpDoc._data;
              // tmpDoc._moveCmdListToParent( data );
              me.execCommand([7, o.data.length, data.__id, null, o.__id]).then(function() {
                myPromise.resolve(true);
              });
              tmpDoc._moveCmdListToParent(data);
            });


          }
        }

        return myPromise;

      }
      _myTrait_.removeItem = function(itemId) {

        var o = this._find(itemId);
        console.log("removeItem", o);
        if (o && o.__id) {
          var p = this._find(o.__p);
          if (this.isObject(p) && this.isArray(p.data)) {
            // 8 = remove item from array
            /*
                       var parentObj = this._find( a[4] ),
                   removedItem = this._find( a[2] ),
                   */
            this.execCommand([8, 0, o.__id, null, p.__id]);

          }
        }
      }
      _myTrait_.render = function(withTemplate) {

        if (!_templateCompiler) {
          _templateCompiler = templateCompiler();
        }

        var comp = _templateCompiler, ///_getNamedViews
          me = this;

        // dkl2rb2foek7ft7xwxo2y8g33o

        var jsonTplData;

        if (this.isObject(withTemplate)) {
          jsonTplData = withTemplate;
        } else {
          jsonTplData = comp.compile(withTemplate);
        }

        var dd = comp.composeTemplate(me._data, jsonTplData);

        if (!_valueBinded) _valueBinded = {};

        if (!_valueBinded[me._data.__id]) {
          _valueBinded[me._data.__id] = true;
          me.onValue(function(v) {
            me.execCommand(v);
          });
        }

        return dd;
      }
      _myTrait_.renderFrom = function(url, path, varName, intoDOM) {

        var newDoc = _docUp(url),
          me = this;


        var loadTime2 = new Date();
        newDoc.then(
          function() {

            console.log("Got the DOC!");
            console.log(newDoc);

            // alert("Tpl load took "+ ( (new Date()).getTime()-(loadTime2.getTime()))+"ms");

            var pName = "";
            if (me.isFunction(path)) {
              pName = path();
            } else {
              pName = path;
            }

            var itemZero = newDoc.fetch(pName);

            // compiledTemplate

            var tplData;

            var bCompiled = false;

            // render using compiled template
            if (itemZero.data["compiledTemplate"]) {
              tplData = JSON.parse(itemZero.data["compiledTemplate"]);
              bCompiled = true;
            } else {
              tplData = itemZero.data[varName];
            }

            var loadTime = new Date();
            // Now, here is the channel for something, but what if we create a template channel to modify this data???
            var oldDom = me.render(tplData);

            if (intoDOM) {
              intoDOM.appendChild(oldDom);
            }

            // Not working really now... :/
            if (me.isFunction(path)) {
              path(function() {
                var pName = path();
                var itemZero = newDoc.fetch(pName);
                var html = itemZero.data[varName];

                var comp = templateCompiler();
                comp.clearTheView(oldDom.getAttribute("data-viewid"));
                var newDOM = me.render(html);
                if (oldDom.parentNode) {
                  oldDom.parentNode.replaceChild(newDOM, oldDom);
                  oldDom = newDOM;
                }
              });
            }

            // alert("Render took "+ ( (new Date()).getTime()-(loadTime.getTime()))+"ms");

            if (bCompiled) {

              newDoc.addListener(pName + ".compiledTemplate", function(a, html) {
                var comp = templateCompiler();
                comp.clearTheView(oldDom.getAttribute("data-viewid"));
                var newDOM = me.render(JSON.parse(html));
                if (oldDom.parentNode) {
                  oldDom.parentNode.replaceChild(newDOM, oldDom);
                  oldDom = newDOM;
                }
              });
            } else {
              newDoc.addListener(pName + "." + varName, function(a, html) {
                var comp = templateCompiler();
                comp.clearTheView(oldDom.getAttribute("data-viewid"));
                var newDOM = me.render(html);
                if (oldDom.parentNode) {
                  oldDom.parentNode.replaceChild(newDOM, oldDom);
                  oldDom = newDOM;
                }
              });
            }
          });
      }
      _myTrait_.set = function(obj, name, value) {

        // Now, try to implement here the setting of object property
        if (this.isObject(value)) {

          // load the document data and if necessary, creates also the commands required
          // to build the object, I suppose...
          var up = _docUp(value),
            me = this;
          up.then(function() {
            // loaded all items inside the object...
            var o = up.getData();

            console.log("set has now data ");
            console.log(o);

            // NOW, the data might be already set or there could be 
            // a member variable with the same name
            //   1. check if the object position is free
            //   2. check that the object does not have this data

            if (!obj.data[name] && (!o.__p)) {
              console.log("going to run the command now");
              console.log([5, name, o.__id, null, obj.__id]);
              // two very basic conditions seem to be now ok, lets go on
              me.execCommand([5, name, o.__id, null, obj.__id]);
            }


          })
            .fail(function(v) {
              console.log("creating the object failed ");
              console.log(v);
            })

        } else {

          // Executing the command to change the value...
          if (obj && obj.data && (obj.data[name] != value)) {
            var oldValue = obj.data[name];
            this.execCommand([4, name, value, oldValue, obj.__id]);
          }

        }

        return this;
      }
      _myTrait_.setMeta = function(intoObj, name, metaObj) {

        if (this.isObject(intoObj)) {

          if (!intoObj.__meta) {
            intoObj.__meta = {};
          }

          var mo = _docUp(metaObj);

          intoObj.__meta[name] = mo.getData();

        }
      }
      _myTrait_.setNamedModel = function(name, model) {


        if (!_namedModels) _namedModels = {};

        // TODO if overwriting a named model, you might as well update the views
        // that do correspond to this model...

        _namedModels[name] = model;
      }
      _myTrait_.toPlainData = function(obj) {

        if (!this.isObject(obj)) return obj;

        var plain;

        if (obj.getData) obj = obj.getData();

        if (this.isArray(obj.data)) {
          plain = [];
          var len = obj.data.length;
          for (var i = 0; i < len; i++) {
            plain[i] = this.toPlainData(obj.data[i]);
          }
        } else {
          plain = {};
          for (var n in obj.data) {
            if (obj.data.hasOwnProperty(n)) {
              plain[n] = this.toPlainData(obj.data[n]);
            }
          }
        }

        return plain;
      }
      _myTrait_.treeToList = function(fn, targetList) {

        var myList = _docUp({
          list: []
        });

        this.forTree(function(o) {
          if (fn(o)) {
            targetList.data.push(o);
          }
        });

        return targetList;
      }
      _myTrait_.unset = function(obj, propName) {

        if (!this.isObject(obj)) {
          obj = this._find(obj);
        }

        if (obj && obj.data && propName) {
          this.execCommand([10, propName, null, null, obj.__id]);
        }


        return this;
      }
    }(this));
  }
  _docUp_prototype.prototype = _promise.prototype
  var _docUp = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _docUp) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _docUp._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _docUp(a, b, c, d, e, f, g, h);
  };
  _docUp._classInfo = {
    name: '_docUp'
  };
  _docUp.prototype = new _docUp_prototype();
  if (typeof(window) != 'undefined') window['_docUp'] = _docUp;
  if (typeof(window) != 'undefined') window['_docUp_prototype'] = _docUp_prototype;
  var simpleStream_prototype = function() {
    'use strict';
    var _promise_prototype = function() {
      'use strict';
      var later_prototype = function() {;
        (function(_myTrait_) {
          var _initDone;
          var _callers;
          var _oneTimers;
          var _everies;
          var _framers;
          _myTrait_.add = function(fn, thisObj, args) {
            if (thisObj || args) {
              var tArgs;
              if (Object.prototype.toString.call(args) === '[object Array]') {
                tArgs = args;
              } else {
                tArgs = Array.prototype.slice.call(arguments, 2);
                if (!tArgs) tArgs = [];
              }
              _callers.push([thisObj, fn, tArgs]);
            } else {
              _callers.push(fn);
            }
          }
          _myTrait_.after = function(seconds, fn, name) {

            if (!name) {
              name = "time" + (new Date()).getTime() + Math.random(10000000);
            }

            _everies[name] = {
              step: Math.floor(seconds * 1000),
              fn: fn,
              nextTime: 0,
              remove: true
            };
          }
          _myTrait_.asap = function(fn) {
            this.add(fn);

          }
          _myTrait_.every = function(seconds, fn, name) {

            if (!name) {
              name = "time" + (new Date()).getTime() + Math.random(10000000);
            }

            _everies[name] = {
              step: Math.floor(seconds * 1000),
              fn: fn,
              nextTime: 0
            };
          }
          if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
            _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
          if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
          _myTrait_.__traitInit.push(function(interval, fn) {
            if (!_initDone) {

              this.polyfill();

              var frame, cancelFrame;
              if (typeof(window) != "undefined") {
                var frame = window['requestAnimationFrame'],
                  cancelFrame = window['cancelRequestAnimationFrame'];
                ['', 'ms', 'moz', 'webkit', 'o'].forEach(function(x) {
                  if (!frame) {
                    frame = window[x + 'RequestAnimationFrame'];
                    cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                  }
                });
              }

              if (!frame)
                frame = function(cb) {
                  return setTimeout(cb, 16);
                };

              if (!cancelFrame)
                cancelFrame = function(id) {
                  clearTimeout(id);
                };

              _callers = [];
              _oneTimers = {};
              _everies = {};
              _framers = [];
              var lastMs = 0;

              var _callQueQue = function() {
                var ms = (new Date()).getTime();
                var fn;
                while (fn = _callers.shift()) {
                  if (Object.prototype.toString.call(fn) === '[object Array]') {
                    fn[1].apply(fn[0], fn[2]);
                  } else {
                    fn();
                  }

                }

                for (var i = 0; i < _framers.length; i++) {
                  var fFn = _framers[i];
                  fFn();
                }

                for (var n in _oneTimers) {
                  if (_oneTimers.hasOwnProperty(n)) {
                    var v = _oneTimers[n];
                    v[0](v[1]);
                    delete _oneTimers[n];
                  }
                }

                for (var n in _everies) {
                  if (_everies.hasOwnProperty(n)) {
                    var v = _everies[n];
                    if (v.nextTime < ms) {
                      if (v.remove) {
                        if (v.nextTime > 0) {
                          v.fn();
                          delete _everies[n];
                        } else {
                          v.nextTime = ms + v.step;
                        }
                      } else {
                        v.fn();
                        v.nextTime = ms + v.step;
                      }
                    }
                    if (v.until) {
                      if (v.until < ms) {
                        delete _everies[n];
                      }
                    }
                  }
                }

                frame(_callQueQue);
                lastMs = ms;
              };
              _callQueQue();
              _initDone = true;
            }
          });
          _myTrait_.once = function(key, fn, value) {
            // _oneTimers

            _oneTimers[key] = [fn, value];
          }
          _myTrait_.onFrame = function(fn) {

            _framers.push(fn);
          }
          _myTrait_.polyfill = function(t) {
            // --- let's not ---
          }
          _myTrait_.removeFrameFn = function(fn) {

            var i = _framers.indexOf(fn);
            if (i >= 0) {
              if (fn._onRemove) {
                fn._onRemove();
              }
              _framers.splice(i, 1);
              return true;
            } else {
              return false;
            }
          }
        }(this));
      }
      var later = function(a, b, c, d, e, f, g, h) {
        if (this instanceof later) {
          var args = [a, b, c, d, e, f, g, h];
          if (this.__factoryClass) {
            var m = this;
            var res;
            this.__factoryClass.forEach(function(initF) {
              res = initF.apply(m, args);
            });
            if (Object.prototype.toString.call(res) == '[object Function]') {
              if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
            } else {
              if (res) return res;
            }
          }
          if (this.__traitInit) {
            var m = this;
            this.__traitInit.forEach(function(initF) {
              initF.apply(m, args);
            })
          } else {
            if (typeof this.init == 'function')
              this.init.apply(this, args);
          }
        } else return new later(a, b, c, d, e, f, g, h);
      };
      later._classInfo = {
        name: 'later'
      };
      later.prototype = new later_prototype();
      if (typeof(window) != 'undefined') window['later'] = later;
      if (typeof(window) != 'undefined') window['later_prototype'] = later_prototype;;
      (function(_myTrait_) {
        _myTrait_.isArray = function(someVar) {
          return Object.prototype.toString.call(someVar) === '[object Array]';
        }
        _myTrait_.isFunction = function(fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        }
        _myTrait_.isObject = function(obj) {
          return obj === Object(obj);
        }
      }(this));;
      (function(_myTrait_) {
        _myTrait_.all = function(firstArg) {

          var args;
          if (this.isArray(firstArg)) {
            args = firstArg;
          } else {
            args = Array.prototype.slice.call(arguments, 0);
          }
          // console.log(args);
          var targetLen = args.length,
            rCnt = 0,
            myPromises = [],
            myResults = new Array(targetLen);

          return this.then(
            function() {

              var allPromise = _promise();
              if (args.length == 0) {
                allPromise.resolve([]);
              }
              args.forEach(function(b, index) {
                if (b.then) {
                  // console.log("All, looking for ", b, " state = ", b._state);
                  myPromises.push(b);

                  b.then(function(v) {
                    myResults[index] = v;
                    // console.log("Got a promise...",b, " cnt = ", rCnt);
                    rCnt++;
                    if (rCnt == targetLen) {
                      allPromise.resolve(myResults);
                    }
                  }, function(v) {
                    allPromise.reject(v);
                  });

                } else {
                  allPromise.reject("Not list of promises");
                }
              })

              return allPromise;

            });





        }
        _myTrait_.collect = function(collectFn, promiseList, results) {

          var args;
          if (this.isArray(promiseList)) {
            args = promiseList;
          } else {
            args = [promiseList];
          }

          // console.log(args);
          var targetLen = args.length,
            isReady = false,
            noMore = false,
            rCnt = 0,
            myPromises = [],
            myResults = results || {};

          return this.then(
            function() {

              var allPromise = _promise();
              args.forEach(function(b, index) {
                if (b.then) {
                  // console.log("All, looking for ", b, " state = ", b._state);
                  myPromises.push(b);

                  b.then(function(v) {
                    rCnt++;
                    isReady = collectFn(v, myResults);
                    if ((isReady && !noMore) || (noMore == false && targetLen == rCnt)) {
                      allPromise.resolve(myResults);
                      noMore = true;
                    }
                  }, function(v) {
                    allPromise.reject(v);
                  });

                } else {
                  allPromise.reject("Not list of promises");
                }
              })

              return allPromise;

            });

        }
        _myTrait_.fail = function(fn) {
          return this.then(null, fn);
        }
        _myTrait_.fulfill = function(withValue) {
          // if(this._fulfilled || this._rejected) return;

          if (this._rejected) return;
          if (this._fulfilled && withValue != this._stateValue) {
            return;
          }

          var me = this;
          this._fulfilled = true;
          this._stateValue = withValue;

          var chCnt = this._childPromises.length;

          while (chCnt--) {
            var p = this._childPromises.shift();
            if (p._onFulfill) {
              try {
                var x = p._onFulfill(withValue);
                // console.log("Returned ",x);
                if (typeof(x) != "undefined") {
                  p.resolve(x);
                } else {
                  p.fulfill(withValue);
                }
              } catch (e) {
                // console.error(e);
                /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
                p.reject(e);
              }
            } else {
              /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
              p.fulfill(withValue);
            }
          };
          // this._childPromises.length = 0;
          this._state = 1;
          this.triggerStateChange();

        }
        _myTrait_.genPlugin = function(fname, fn) {
          var me = this;
          this.plugin(fname,
            function() {
              var args = Array.prototype.slice.call(arguments, 0);
              console.log("Plugin args", args);
              var myPromise = _promise();
              this.then(function(v) {
                var args2 = Array.prototype.slice.call(arguments, 0);
                var z = args.concat(args2);
                var res = fn.apply(this, z);
                myPromise.resolve(res);
              }, function(r) {
                myPromise.reject(r);
              });
              return myPromise;

            }
          );
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(onFulfilled, onRejected) {
          // 0 = pending
          // 1 = fullfilled
          // 2 = error

          this._state = 0;
          this._stateValue = null;
          this._isAPromise = true;
          this._childPromises = [];

          if (this.isFunction(onFulfilled))
            this._onFulfill = onFulfilled;
          if (this.isFunction(onRejected))
            this._onReject = onRejected;

          if (!onRejected && this.isFunction(onFulfilled)) {



            var me = this;
            later().asap(
              function() {
                console.log("--- calling the onFulfilled ");
                onFulfilled(function(v) {
                  me.resolve(v)
                }, function(v) {
                  me.resolve(v);
                });
              });

          }
        });
        _myTrait_.isFulfilled = function(t) {
          return this._state == 1;
        }
        _myTrait_.isPending = function(t) {
          return this._state == 0;
        }
        _myTrait_.isRejected = function(v) {
          return this._state == 2;
        }
        _myTrait_.nodeStyle = function(fname, fn) {
          var me = this;
          this.plugin(fname,
            function() {
              var args = Array.prototype.slice.call(arguments, 0);
              var last, userCb, cbIndex = 0;
              if (args.length >= 0) {
                last = args[args.length - 1];
                if (Object.prototype.toString.call(last) == '[object Function]') {
                  userCb = last;
                  cbIndex = args.length - 1;
                }
              }

              var mainPromise = wishes().pending();
              this.then(function() {
                var nodePromise = wishes().pending();
                var args2 = Array.prototype.slice.call(arguments, 0);
                console.log("Orig args", args);
                console.log("Then args", args2);
                var z;
                if (args.length == 0)
                  z = args2;
                if (args2.length == 0)
                  z = args;
                if (!z) z = args2.concat(args);
                cbIndex = z.length; // 0,fn... 2
                if (userCb) cbIndex--;
                z[cbIndex] = function(err) {
                  if (err) {
                    console.log("Got error ", err);
                    nodePromise.reject(err);
                    mainPromise.reject(err);
                    return;
                  }
                  if (userCb) {
                    var args = Array.prototype.slice.call(arguments);
                    var res = userCb.apply(this, args);
                    mainPromise.resolve(res);
                  } else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    mainPromise.resolve.apply(mainPromise, args);
                  }
                }
                nodePromise.then(function(v) {
                  mainPromise.resolve(v);
                });

                console.log("nodeStyle after concat", z);
                var res = fn.apply(this, z);
                // myPromise.resolve(res);
                // return nodePromise;
                return nodePromise;
              }, function(v) {
                mainPromise.reject(v);
              });
              return mainPromise;
              /*
                      log("..... now waiting "+ms);
                      var p = waitFor(ms);
                      p.then( function(v) {
                          myPromise.resolve(v);
                      });
                  */
            }
          );
        }
        _myTrait_.onStateChange = function(fn) {

          if (!this._listeners)
            this._listeners = [];

          this._listeners.push(fn);
        }
        _myTrait_.plugin = function(n, fn) {

          _myTrait_[n] = fn;

          return this;
        }
        _myTrait_.props = function(obj) {
          var args = [];

          for (var n in obj) {
            if (obj.hasOwnProperty(n)) {
              args.push({
                name: n,
                promise: obj[n]
              });
            }
          }


          // console.log(args);
          var targetLen = args.length,
            rCnt = 0,
            myPromises = [],
            myResults = {};

          return this.then(
            function() {

              var allPromise = wishes().pending();
              args.forEach(function(def) {
                var b = def.promise,
                  name = def.name;
                if (b.then) {
                  // console.log("All, looking for ", b, " state = ", b._state);
                  myPromises.push(b);

                  b.then(function(v) {
                    myResults[name] = v;
                    rCnt++;
                    if (rCnt == targetLen) {
                      allPromise.resolve(myResults);
                    }
                  }, function(v) {
                    allPromise.reject(v);
                  });

                } else {
                  allPromise.reject("Not list of promises");
                }
              })

              return allPromise;

            });

        }
        _myTrait_.reject = function(withReason) {

          // if(this._rejected || this._fulfilled) return;

          // conso

          if (this._fulfilled) return;
          if (this._rejected && withReason != this._rejectReason) return;


          this._state = 2;
          this._rejected = true;
          this._rejectReason = withReason;
          var me = this;

          var chCnt = this._childPromises.length;
          while (chCnt--) {
            var p = this._childPromises.shift();

            if (p._onReject) {
              try {
                p._onReject(withReason);
                p.reject(withReason);
              } catch (e) {
                /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
                p.reject(e);
              }
            } else {
              /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
              p.reject(withReason);
            }
          };

          // this._childPromises.length = 0;
          this.triggerStateChange();

        }
        _myTrait_.rejectReason = function(reason) {
          if (reason) {
            this._rejectReason = reason;
            return;
          }
          return this._rejectReason;
        }
        _myTrait_.resolve = function(x) {

          // console.log("Resolving ", x);

          // can not do this many times...
          if (this._state > 0) return;

          if (x == this) {
            // error
            this._rejectReason = "TypeError";
            this.reject(this._rejectReason);
            return;
          }

          if (this.isObject(x) && x._isAPromise) {

            // 
            this._state = x._state;
            this._stateValue = x._stateValue;
            this._rejectReason = x._rejectReason;
            // ... 
            if (this._state === 0) {
              var me = this;
              x.onStateChange(function() {
                if (x._state == 1) {
                  // console.log("State change");
                  me.resolve(x.value());
                }
                if (x._state == 2) {
                  me.reject(x.rejectReason());
                }
              });
            }
            if (this._state == 1) {
              // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
              this.fulfill(this._stateValue);
            }
            if (this._state == 2) {
              // console.log("Relved to be Promise was rejected ", x._rejectReason);
              this.reject(this._rejectReason);
            }
            return;
          }
          if (this.isObject(x) && x.then && this.isFunction(x.then)) {
            // console.log("Thenable ", x);
            var didCall = false;
            try {
              // Call the x.then
              var me = this;
              x.then.call(x,
                function(y) {
                  if (didCall) return;
                  // we have now value for the promise...
                  // console.log("Got value from Thenable ", y);
                  me.resolve(y);
                  didCall = true;
                },
                function(r) {
                  if (didCall) return;
                  // console.log("Got reject from Thenable ", r);
                  me.reject(r);
                  didCall = true;
                });
            } catch (e) {
              if (!didCall) this.reject(e);
            }
            return;
          }
          this._state = 1;
          this._stateValue = x;

          // fulfill the promise...
          this.fulfill(x);

        }
        _myTrait_.state = function(newState) {
          if (typeof(newState) != "undefined") {
            this._state = newState;
          }
          return this._state;
        }
        _myTrait_.then = function(onFulfilled, onRejected) {

          if (!onRejected) onRejected = function() {};

          var p = new _promise(onFulfilled, onRejected);
          var me = this;

          if (this._state == 1) {
            later().asap(function() {
              me.fulfill(me.value());
            });
          }
          if (this._state == 2) {
            ater().asap(function() {
              me.reject(me.rejectReason());
            });
          }
          this._childPromises.push(p);
          return p;



        }
        _myTrait_.triggerStateChange = function(t) {
          var me = this;
          if (!this._listeners) return;
          this._listeners.forEach(function(fn) {
            fn(me);
          });
          // one-timer
          this._listeners.length = 0;
        }
        _myTrait_.value = function(v) {
          if (typeof(v) != "undefined") {
            this._stateValue = v;
            return this;
          }
          return this._stateValue;
        }
      }(this));
    }
    var _promise = function(a, b, c, d, e, f, g, h) {
      if (this instanceof _promise) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new _promise(a, b, c, d, e, f, g, h);
    };
    _promise._classInfo = {
      name: '_promise'
    };
    _promise.prototype = new _promise_prototype();
    if (typeof(window) != 'undefined') window['_promise'] = _promise;
    if (typeof(window) != 'undefined') window['_promise_prototype'] = _promise_prototype;
    var later_prototype = function() {;
      (function(_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;
        _myTrait_.add = function(fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === '[object Array]') {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        }
        _myTrait_.after = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0,
            remove: true
          };
        }
        _myTrait_.asap = function(fn) {
          this.add(fn);

        }
        _myTrait_.every = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(interval, fn) {
          if (!_initDone) {

            this.polyfill();

            var frame, cancelFrame;
            if (typeof(window) != "undefined") {
              var frame = window['requestAnimationFrame'],
                cancelFrame = window['cancelRequestAnimationFrame'];
              ['', 'ms', 'moz', 'webkit', 'o'].forEach(function(x) {
                if (!frame) {
                  frame = window[x + 'RequestAnimationFrame'];
                  cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                }
              });
            }

            if (!frame)
              frame = function(cb) {
                return setTimeout(cb, 16);
              };

            if (!cancelFrame)
              cancelFrame = function(id) {
                clearTimeout(id);
              };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function() {
              var ms = (new Date()).getTime();
              var fn;
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === '[object Array]') {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }

              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    if (v.remove) {
                      if (v.nextTime > 0) {
                        v.fn();
                        delete _everies[n];
                      } else {
                        v.nextTime = ms + v.step;
                      }
                    } else {
                      v.fn();
                      v.nextTime = ms + v.step;
                    }
                  }
                  if (v.until) {
                    if (v.until < ms) {
                      delete _everies[n];
                    }
                  }
                }
              }

              frame(_callQueQue);
              lastMs = ms;
            };
            _callQueQue();
            _initDone = true;
          }
        });
        _myTrait_.once = function(key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        }
        _myTrait_.onFrame = function(fn) {

          _framers.push(fn);
        }
        _myTrait_.polyfill = function(t) {
          // --- let's not ---
        }
        _myTrait_.removeFrameFn = function(fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        }
      }(this));
    }
    var later = function(a, b, c, d, e, f, g, h) {
      if (this instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    later._classInfo = {
      name: 'later'
    };
    later.prototype = new later_prototype();
    if (typeof(window) != 'undefined') window['later'] = later;
    if (typeof(window) != 'undefined') window['later_prototype'] = later_prototype;
    var sequenceStepper_prototype = function() {;
      (function(_myTrait_) {
        var _eventOn;
        var _commands;
        _myTrait_.guid = function(t) {

          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          //return Math.random();
          // return Math.random().toString(36);

          /*    
           return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
           */
          /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
        }
        _myTrait_.isArray = function(t) {

          if (typeof(t) == "undefined") return this.__isA;

          return Object.prototype.toString.call(t) === '[object Array]';
        }
        _myTrait_.isFunction = function(fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        }
        _myTrait_.isObject = function(t) {

          if (typeof(t) == "undefined") return this.__isO;

          return t === Object(t);
        }
      }(this));;
      (function(_myTrait_) {
        var _instances;
        if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = []
        _myTrait_.__factoryClass.push(function(id, manual) {

          if (id === false && manual) return;

          if (!_instances) {
            _instances = {};
          }

          if (_instances[id]) {
            return _instances[id];
          } else {
            _instances[id] = this;
          }
        });
        _myTrait_.addCommands = function(cmdFunction, failure) {

          if (this.isArray(cmdFunction)) {
            var me = this;
            cmdFunction.forEach(function(c) {
              me.addCommands(c);
            });
            return this;
          }

          this._commands.push({
            fnCmd: cmdFunction,
            fnFail: failure,
            async: true
          });
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(myId, manual) {

          if (!this._commands) {
            this._commands = [];
            this.waitingList = [];
            this._index = 0;
          }

          var me = this;
          if (!manual) {
            later().every(1 / 30, function() {
              me.step();
            });
          }

        });
        _myTrait_.step = function(t) {
          var i = this._index,
            len = this._commands.length;

          if (i == len) return;

          var first = _promise(),
            currentProm = first,
            myPromise = _promise(),
            me = this;

          while (i < len) {
            var fn = this._commands[i];
            (function(fn) {
              currentProm = currentProm.then(function() {

                var p = _promise();

                // if(fn.async) {

                fn.fnCmd(function(res) {
                  p.resolve(true);
                }, function(failReason) {
                  p.resolve(true);
                  if (fn.fnFail) fn.fnFail(failReason);
                });

                return p;
              }).fail(function(reason) {
                if (fn.fnFail) fn.fnFail(reason);
              });
            }(fn));
            this._index++;
            i++;
          }

          currentProm.then(function() {
            me.waitingList.shift(); // remvoe this promise from the queque
            myPromise.resolve(true);
            if (me.waitingList.length) {
              var newP = me.waitingList[0];
              newP.resolve(true);
            }
          }).fail(function(m) {

          });


          this.waitingList.push(first);
          if (this.waitingList.length == 1) {
            first.resolve(true);
          }
          return myPromise;

        }
      }(this));
    }
    var sequenceStepper = function(a, b, c, d, e, f, g, h) {
      if (this instanceof sequenceStepper) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != sequenceStepper._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new sequenceStepper(a, b, c, d, e, f, g, h);
    };
    sequenceStepper._classInfo = {
      name: 'sequenceStepper'
    };
    sequenceStepper.prototype = new sequenceStepper_prototype();
    if (typeof(window) != 'undefined') window['sequenceStepper'] = sequenceStepper;
    if (typeof(window) != 'undefined') window['sequenceStepper_prototype'] = sequenceStepper_prototype;
    var streamProcessor_prototype = function() {
      'use strict';;
      (function(_myTrait_) {
        _myTrait_.guid = function(t) {

          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

        }
        _myTrait_.isArray = function(t) {

          if (typeof(t) == "undefined") return this.__isA;

          return Object.prototype.toString.call(t) === '[object Array]';
        }
        _myTrait_.isFunction = function(fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        }
        _myTrait_.isObject = function(t) {

          if (typeof(t) == "undefined") return this.__isO;

          return t === Object(t);
        }
      }(this));;
      (function(_myTrait_) {
        _myTrait_.cont = function(withValue) {

          if (this.isArray(withValue)) {

            var me = this;
            var newList = this._list.slice(this._index + 1);

            if (newList.length == 0) {
              this.step();
              return;
            }

            var all = [];
            withValue.forEach(
              function(v) {
                var newList = me._list.slice(me._index + 1);
                var stream = simpleStream(me);
                me._subStreams.push(stream);
                stream.addObserver(newList);
                all.push(stream.pushValue(v));
              });

            var wait = _promise();
            wait.all(all).then(function() {
              var r = [];
              me._subStreams.length = 0;
              all.forEach(function(p) {
                r.push(p.value());
              });
              me.resolve(r);
            });
            wait.resolve(true);


          } else {

            if (typeof(withValue) != "undefined") {
              this._context.value = withValue;
            }

            this.step();

          }

        }
        _myTrait_.ctxVar = function(name, value) {

          if (typeof(value) == "undefined") {
            var v = this._contextVars[name];
            if (typeof(v) == "undefined") {
              if (this._parent) {
                return this._parent.ctxVar(name);
              }
            }
            return v;
          }

          this._contextVars[name] = value;


        }
        _myTrait_.get = function(name) {

          if (this._closure) {
            var v = this._contextVars[name];
            if (typeof(v) == "undefined") {
              return this._parent.get(name);
            }
            return v;
          }

          var v = this._contextVars[name];
          if (typeof(v) == "undefined") {
            if (this._parent) {
              return this._parent.get(name);
            }
          }
          return v;
        }
        _myTrait_.getRest = function(t) {

        }
        _myTrait_.getState = function(t) {


          return this._stopState;
        }
        _myTrait_.getValue = function(t) {

          // simple value processor

          if (!this._context && this._parent) {
            return this._parent.getValue();
          }

          if (this._context && !this._context.value && !this._context.initWith && this._parent) {
            return this._parent.getValue();
          }

          return this._context.value || this._context.initWith;
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(parentProcessor, isClosure) {

          // The context of the processor
          this._context = {};
          this._contextVars = {};

          // should we kill all the substreams too...?
          this._subStreams = [];

          this._stopState = 0;

          if (parentProcessor) {
            this._parent = parentProcessor;
          }

          if (isClosure) this._closure = true;



        });
        _myTrait_.killAll = function(t) {

          if (this._subStreams) {
            this._subStreams.forEach(function(s) {
              s.killAll();
            });
          }
        }
        _myTrait_.run = function(withValue) {

          if (this._closure) {
            if (this._parent) {
              this._parent.run(withValue);
              return;
            } else {
              console.error("No parent for closure");
              //console.trace();
            }
          }
          this._stopState = 1;
          this.cont(withValue);
          return;

        }
        _myTrait_.set = function(name, value) {
          if (typeof(value) != "undefined") {

            if (this._closure) {
              if (typeof(this._contextVars[name]) != "undefined") {
                this._contextVars[name] = value;
              } else {
                if (this._parent) {
                  this._parent.set(name, value);
                  return this;
                }
              }
            }

            if (typeof(this._contextVars[name]) == "undefined") {
              if (this._parent) {
                this._parent.set(name, value);
                return this;
              }
            }

            this._contextVars[name] = value;
            return this;
          }

        }
        _myTrait_.setContext = function(ctx) {
          this._context = ctx;
        }
        _myTrait_.setParent = function(newParent) {
          this._parent = newParent;
        }
        _myTrait_.start = function(list) {

          this._list = list;
          this._index = -1;

          this.step();

        }
        _myTrait_.step = function(t) {

          this._index++;
          var i = this._index,
            me = this;

          if (this._list[i]) {

            var obs = this._list[i];
            // Call the observer

            if (this.isObject(obs) && !this.isFunction(obs)) {

              if (obs.closure) {
                obs.closure.setParent(this);
                obs.fn.apply(obs.closure, [obs.closure]);
              } else {
                // var ctx = streamProcessor()
                obs.fn.apply(this, [this]);
              }
            } else {
              obs.apply(this, [this]);
            }

          } else {
            if (typeof(this._context.value) == "undefined") {
              this._context.value = this._context.initWith;
            }
            if (this._stopState < 2) {
              this._stopState = 7;
            }
            this.resolve(this._context.value);
          }


        }
        _myTrait_.stopStream = function(t) {
          if (!this._context.value) {
            this._context.value = this._context.initWith;
          }
          this._stopState = 3;
          this.resolve(this._context.value);
        }
      }(this));
    }
    streamProcessor_prototype.prototype = _promise.prototype
    var streamProcessor = function(a, b, c, d, e, f, g, h) {
      if (this instanceof streamProcessor) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != streamProcessor._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new streamProcessor(a, b, c, d, e, f, g, h);
    };
    streamProcessor._classInfo = {
      name: 'streamProcessor'
    };
    streamProcessor.prototype = new streamProcessor_prototype();
    if (typeof(window) != 'undefined') window['streamProcessor'] = streamProcessor;
    if (typeof(window) != 'undefined') window['streamProcessor_prototype'] = streamProcessor_prototype;;
    (function(_myTrait_) {
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _streams;
      _myTrait_.addObserver = function(obs, closure) {

        if (this.isArray(obs)) {
          var m = this;
          obs.forEach(function(o) {
            m.addObserver(o, closure);
          })
          return;
        }

        if (this.isObject(obs) && !this.isFunction(obs)) {
          this._observers.push(obs);
          return;
        }

        // marching through the stream...
        // this._observers.push(obs);

        this._observers.push({
          fn: obs,
          closure: closure
        });

        return this;
      }
      _myTrait_.branch = function(fn, ms) {

        var me = this;
        var lastMs = (new Date()).getTime();

        me._lastBranch = lastMs;

        this.addObserver(function(m) {
          var nowTime = (new Date()).getTime(),
            value = m.getValue();
          setTimeout(function() {

            var currTime = (new Date()).getTime();
            if (currTime - lastMs < ms) return;

            var cnt = 0;
            if (cnt = me.isActiveRunning()) {
              return;
            }

            m = me.getLastProcess();
            if (m.getState() == 3) {
              me._lastBranch = currTime;
              lastMs = currTime;
              fn(value);
            }
          }, ms);
          m.run();
        });

        return this;
      }
      _myTrait_.branchIfOk = function(fn, ms) {

        var me = this;
        var lastMs = (new Date()).getTime();

        me._lastBranch = lastMs;

        this.addObserver(function(m) {
          var nowTime = (new Date()).getTime(),
            value = m.getValue();
          setTimeout(function() {
            var currTime = (new Date()).getTime();
            if (currTime - lastMs < ms) return;
            var cnt = 0;
            if (cnt = me.isActiveRunning()) {
              return;
            }
            m = me.getLastProcess();
            if (m.getState() == 7) {
              me._lastBranch = currTime;
              lastMs = currTime;
              fn(value);
            }
          }, ms);
          m.run();
        });
        return this;

      }
      _myTrait_.collectValuesFor = function(ms) {
        var me = this;
        var lastMs = (new Date()).getTime();

        me._lastBranch = lastMs;

        this.addObserver(function(m) {
          var nowTime = (new Date()).getTime(),
            value = m.getValue();

          setTimeout(function() {
            var currTime = (new Date()).getTime();

            if (currTime - lastMs < ms) return;

            var cnt = me.isActiveRunning();
            var lastProcess = me.getLastProcess();
            // stop if there is something in there...
            if (cnt > 1 && m != lastProcess) {
              m.stopStream(m.getValue()); // don't allow to go any further...
              return;
            }
            lastProcess.run(); // continue the process...
          }, ms);
          // m.run();
        });
        return this;
      }
      _myTrait_.combineLatest = function(streams, fn) {
        var me = this;

        var myRes = [],
          cnt = streams.length;

        var allHasValue = function() {
          var b = true;
          for (var i = 0; i < cnt; i++) {
            if (typeof(myRes[i]) == "undefined") b = false;
          }
          return b;
        }

        streams.forEach(function(s, index) {
          s.addObserver(function(myProcess) {
            myRes[index] = myProcess.getValue();
            if (allHasValue()) {
              me.pushValue(myRes);
            }
            myProcess.run();
          });
        });

        return this;

      }
      _myTrait_.filter = function(fn) {

        var me = this;

        this.addObserver(function(m) {
          var arr = m.getValue();
          var res = [];

          if (me.isArray(arr)) {
            arr.forEach(function(v) {
              if (fn(v)) res.push(v);
            });
          } else {
            if (fn(arr)) {
              m.run(arr);
              return;
            } else {
              m.stopStream();
            }
            return;
          }

          if (res.length) {
            m.run(res);
          } else {
            m.stopStream();
          }
        });

        return this;
      }
      _myTrait_.forContext = function(fn) {
        var me = this;
        me.addObserver(function(m) {
          var arr = m.getValue();
          var res = [];

          if (me.isArray(arr)) {
            arr.forEach(function(v, i) {
              res.push(fn(v, i, m));
            });
          } else {
            res.push(fn(arr, 0, m));
          }
          m.run(arr);
        });
      }
      _myTrait_.forEach = function(fn) {
        var me = this;
        me.addObserver(function(m) {
          var arr = m.getValue();
          var res = [];

          if (me.isArray(arr)) {
            arr.forEach(function(v) {
              res.push(fn(v));
            });
          } else {
            res.push(fn(arr));
          }
          m.run(arr);
        });
        return this;
      }
      _myTrait_.getLastProcess = function(t) {

        var i = this._active.length;
        if (i > 0) return this._active[i - 1];

        return this._lastProcess;
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(parentProcessor) {
        this._childIndex = 0;
        this._childStreams = [];
        this._values = [];
        this._active = [];

        this._lastProcess;

        // start these observers when a value arrives...
        this._observers = [];

        this._id = this.guid();
        if (!_streams) {
          _streams = {};
        }

        _streams[this._id] = this;

        if (parentProcessor) {
          this._parentProcessor = parentProcessor;
        }

      });
      _myTrait_.isActiveRunning = function(t) {
        return this._active.length;
      }
      _myTrait_.killAll = function(t) {

        this._active.forEach(function(p) {
          p.killAll();
          p.stopStream();
        });
      }
      _myTrait_.map = function(fn) {
        var me = this;
        me.addObserver(function(m) {
          var arr = m.getValue();
          var res = [];

          if (me.isArray(arr)) {
            arr.forEach(function(v) {
              res.push(fn(v));
            });
          } else {
            res.push(fn(arr));
          }
          m.run(res);
        });
        return this;
      }
      _myTrait_.pushValue = function(val) {


        var myProm = _promise();
        this.startProcess({
          initWith: val
        }, myProm);
        return myProm;
      }
      _myTrait_.reduce = function(fn, initWith) {
        var me = this;
        me.addObserver(function(m) {
          var arr = m.getValue();
          var res = [];

          if (me.isArray(arr)) {
            res = arr.reduce(fn, initWith);
          } else {
            res = [arr].reduce(fn, initWith);
          }
          m.run(res);
        });
        return this;
      }
      _myTrait_.startProcess = function(context, myProm) {


        // create copy of the observers...
        var list = this._observers.slice();

        var process = streamProcessor(this._parentProcessor);
        process.setContext(context);
        process.start(list);

        process._streamPromise = myProm;

        this._active.push(process);

        var me = this;
        // The process exits, all done...
        process.then(function(v) {
          // Should remove the process    
          var i = me._active.indexOf(process);
          me._active.splice(i, 1);
          myProm.resolve(v);
          me._lastProcess = process;
        });



      }
      _myTrait_.step = function(t) {

      }
    }(this));
  }
  var simpleStream = function(a, b, c, d, e, f, g, h) {
    if (this instanceof simpleStream) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != simpleStream._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new simpleStream(a, b, c, d, e, f, g, h);
  };
  simpleStream._classInfo = {
    name: 'simpleStream'
  };
  simpleStream.prototype = new simpleStream_prototype();
  if (typeof(window) != 'undefined') window['simpleStream'] = simpleStream;
  if (typeof(window) != 'undefined') window['simpleStream_prototype'] = simpleStream_prototype;;
  (function(_myTrait_) {
    if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
      _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
    if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
    _myTrait_.__traitInit.push(function(t) {

    });
  }(this));
}
var testDataObjects = function(a, b, c, d, e, f, g, h) {
  if (this instanceof testDataObjects) {
    var args = [a, b, c, d, e, f, g, h];
    if (this.__factoryClass) {
      var m = this;
      var res;
      this.__factoryClass.forEach(function(initF) {
        res = initF.apply(m, args);
      });
      if (Object.prototype.toString.call(res) == '[object Function]') {
        if (res._classInfo.name != testDataObjects._classInfo.name) return new res(a, b, c, d, e, f, g, h);
      } else {
        if (res) return res;
      }
    }
    if (this.__traitInit) {
      var m = this;
      this.__traitInit.forEach(function(initF) {
        initF.apply(m, args);
      })
    } else {
      if (typeof this.init == 'function')
        this.init.apply(this, args);
    }
  } else return new testDataObjects(a, b, c, d, e, f, g, h);
};
testDataObjects._classInfo = {
  name: 'testDataObjects'
};
testDataObjects.prototype = new testDataObjects_prototype();
if (typeof(window) != 'undefined') window['testDataObjects'] = testDataObjects;
if (typeof(window) != 'undefined') window['testDataObjects_prototype'] = testDataObjects_prototype;