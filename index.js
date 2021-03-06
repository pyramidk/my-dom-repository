var MDOM = (function () {
    var MDOM = function (arr) {
        var _this = this, i = 0;
        // 创建类数组对象
        for(i = 0; i < arr.length; i++) {
            _this[i] = arr[i];
        }
        _this.length = arr.length;
        // 返回带方法的集合
        return this;
    };
    var $ = function (selector, context) {
        // arr保存选择器选择的数组对象
        var arr = [], i =0;
        // 如果已经是MDOM的内置对象（的实例），就可以直接返回
        if (selector && !context) {
            if (selector instanceof MDOM) {
                return selector;
            }
        }
        if (selector) {
            // String
            if (typeof selector === 'string') {
                // els保存selector数组
                var els, temParent, html;
                selector = html = selector.trim();
                // 创建标签
                if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                    var toCreate = 'div';
                    if (html.indexOf('<li') === 0) toCreate = 'ul';
                    if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                    if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                    if (html.indexOf('<tbody') === 0) toCreate = 'table';
                    if (html.indexOf('<option') === 0) toCreate = 'select';

                    temParent = document.createElement(toCreate);
                    temParent.innerHTML = html;
                    for (i = 0; i < temParent.childNodes.length; i++) {
                        arr.push(temParent.childNodes[i]);
                    }
                } else {
                    if (!context && selector[0] ==='#' && !selector.match(/[ .<>:~]/)) {
                        // 选择id
                        els = [document.getElementById(selector.split('#')[1])];
                        console.log(els);
                    }
                    // 选择class
                    else {
                        els = (context || document).querySelectorAll(selector);
                    }
                    for (i = 0; i < els.length; i++) {
                        if (els[i]) arr.push(els[i]);
                    }
                }
            }
            // 节点
            else if (selector.nodeType || selector === window || selector === document) {
                arr.push(selector);
            }
            // 数组节点 或者 MDOM的类数组对象
            else if (selector.length > 0 && selector[0].nodeType) {
                for (i = 0; i < selector.length; i++) {
                    arr.push(selector[i]);
                }
            }
        }
        return new MDOM(arr);
    }

    MDOM.prototype = {
    	// this 指代的选取创建的类数组对象 ex: MDOM {0: p, length: 1}
    	// 添加class
    	addClass: function (className) {
    		console.log(this);
    		if (typeof className === 'undefined') {
    			return this;
    		}
    		var classes = className.split(' ');
    		for (var i = 0; i < classes.length; i++) {
    			for (var j = 0; j < this.length; j++) {
    				// classList 属性返回元素的类名，作为 DOMTokenList 对象(h5)
    				if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
    			}
    		}
    	},
    	// 移除class
    	removeClass: function (className) {
    		var classes = className.split(' ');
    		for (var i = 0; i < classes.length; i++) {
    			for (var j = 0; j < this.length; j++) {
    				if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
    			}
    		}
    	},
    	// 获取属性值, 设置属性值
    	attr: function (attrs, value) {
    		// get attr
    		if (arguments.length === 1 && typeof attrs === 'string') {
    			if (this[0]) return this[0].getAttribute(attrs);
    			else return undefined;
    		}
    		else {
    			// set attr
    			for (var i = 0; i < this.length; i++) {
    				// attrs String
    				if (arguments.length === 2) {
    					this[i].setAttribute(attrs, value)
    				} 
    				else {
    					// attrs Object
    					for (var attrName in attrs) {
    						this[i][attrName] = attrs[attrName];
    						this[i].setAttribute(attrName, attrs[attrName]);
    					}
    				}
    			}
    		}
    		return this;
    	},
    	// 移除属性值
    	removeAttr: function (attr) {
    		for (var i = 0; i < this.length; i++) {
    			this[i].removeAttribut(attr);
    		}
    		return this;
    	},
    	// 给元素绑定数据，相当于h5的data-
    	data: function (key, value)	{
    		if (typeof value === 'undefined') {
    			// get value
    			if (this[0]) {
						if (this[0].dataStorage && (key in this[0].dataStorage)) {
							return this[0].dataStorage[key];
						} else {
							// data-
							var dataKey = this[0].getAttribute('data-' + key);
							if (dataKey) {
								return dataKey;
							}
							else return undefined;
						}
    			}
    			else return undefined;
    		} else {
    			// set value
    			for (var i = 0; i < this.length; i++) {
    				var el = this[i];
    				if (!el.dataStorage) el.dataStorage = {};
    				el.dataStorage[key] = value;
    			}
    		}
    	}

    }
    return $;

})()

window.MDOM = MDOM;

