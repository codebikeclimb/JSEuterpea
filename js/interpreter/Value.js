/*
 This is the Interface for all Value Types
 */
var valueVar = {};
function createValue() {
    return Object.create(valueVar, {
        // Methods
        getType: {
            value: function () {
                // does nothing -- this is the interface
            },
        },
        apply: {
            value: function (thunk) {
                // interface       
            },
        },
    });
}

var valNumVar = createValue();
function createNumValue(val) {
    var ret = Object.create(valNumVar, {
        getType: {
            value: function () {
                return "Num";
            },
        },
        apply: {
            value: function (thunk) {
                if (thunk) {
                    console.log("ERROR: token not valid for numberValue");
                    console.log(thunk);
                    return;
                }
                return val;
            },
        },
    });
    ret.val = val;
    return ret;
}

var valFunPVar = createValue();
function createFunPValue(n, fn) {
    var ret = Object.create(valFunPVar, {
        getType: {
            value: function () {
                return "FunP";
            },
        },
        apply: {
            value: function (thunk) {
                var tempArgs = this.args.concat([thunk]);
                if (tempArgs.length == ret.n) {
                    return ret.fn.apply(null, tempArgs);
                }
                return createFunPValue(ret, tempArgs);
            },
        },
    });
    if (typeof n == "number") {
        ret.n = n;
        ret.fn = fn;
        ret.args = [];
        return ret;
    }
    var copy = n;
    ret.n = copy.n;
    ret.fn = copy.fn;
    ret.args = fn;
    return ret;
}

var valMusVar = createValue();
function createMusValue(val) {
    var ret = Object.create(valMusVar, {
        getType: {
            value: function() {
                return "Music";
            },
        },
        apply: {
            value: function (thunk) {
                if (thunk) {
                    console.log("Cannont apply Music to token")
                    console.log(thunk);
                    return;
                }
                return val;
            }
        }
    });
    ret.val = val;
    return ret;
}
/*
 ValNums are Values that hard holding a known Value.
 These could be things like Intergers, Strings, or Booleans
 */
// var ValNum = function(n) {
//     this.n = n;
// };
// ValNum.prototype = Object.create(Value.prototype);
// ValNum.prototype.constructor = ValNum;

// ValNum.prototype.isNum = function () {
//     return true;
// };

// /*
//     These are Values that hold Primative Functions
//     For now Primative Functions are going to be things like add and subtract
//  */
// var ValFunP = function(n, fn) {
//     if (n.isFunc()) {
//         copy = n;
//         this.n = copy.n;
//         this.fn = copy.fn;
//         this.args = fn;
//     }
//     else {
//         this.n = n;
//         this.fn = fn;
//         this.args = [];
//     }
// };
// ValFunP.prototype = Object.create(Value.prototype);
// ValFunP.prototype.constructor = ValFunP;

// ValFunP.isFunc = function() {
//     return true;
// };

// ValFunP.prototype.apply = function (t) {
//     var tempArgs = this.args.concat(t);
//     if (tempArgs.size() == this.n) {
//         return this.fn.apply(temp.args);
//     }
//     return new ValFunP(this, tempArgs);
// };
