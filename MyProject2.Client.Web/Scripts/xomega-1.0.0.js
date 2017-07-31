var xomega;
(function (xomega) {
    var FieldCriteria = (function () {
        function FieldCriteria(label, op, data) {
            this.Label = label;
            this.Operator = op;
            this.Data = data;
        }
        return FieldCriteria;
    })();
    xomega.FieldCriteria = FieldCriteria;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var ErrorList = (function () {
        function ErrorList() {
            var _this = this;
            this.Errors = ko.observableArray();
            this.ErrorsText = ko.computed(function () {
                return _this.Errors().map(function (err) {
                    return err.Message;
                }).join("\n");
            }, this);
        }
        ErrorList.fromError = function (err) {
            var errList = err["__errors__"];
            if (errList !== null)
                return errList;
            errList = new ErrorList();
            errList.addError(err.name, err.message);
            return errList;
        };
        ErrorList.fromJSON = function (obj) {
            var data = obj.Errors.map(function (val, idx, arr) { return xomega.ErrorMessage.fromJSON(val); });
            var lst = new ErrorList();
            ko.utils.arrayPushAll(lst.Errors, data);
            return lst;
        };
        ErrorList.fromErrorResponse = function (jqXHR, errorThrow) {
            var json = jqXHR.responseJSON;
            if (json && json.Errors)
                return ErrorList.fromJSON(json);
            var errLst = new ErrorList();
            if (errLst.fromExceptionJSON(json))
                return errLst;
            errLst.Errors.push(new xomega.ErrorMessage(errorThrow, json && json.Message ? json.Message : (jqXHR.responseText ? jqXHR.responseText : errorThrow), 1 /* Error */));
            return errLst;
        };
        ErrorList.prototype.fromExceptionJSON = function (json) {
            if (json && json.ExceptionType) {
                this.Errors.push(new xomega.ErrorMessage(json.ExceptionType, json.ExceptionMessage, 1 /* Error */));
                if (json.InnerException)
                    this.fromExceptionJSON(json.InnerException);
                return true;
            }
            return false;
        };
        ErrorList.prototype.getMessage = function (code) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            return xomega.format(code, params);
        };
        ErrorList.prototype.addError = function (code) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            this.Errors.push(new xomega.ErrorMessage(code, this.getMessage(code, params), 1 /* Error */));
        };
        ErrorList.prototype.addWarning = function (code) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            this.Errors.push(new xomega.ErrorMessage(code, this.getMessage(code, params), 0 /* Warning */));
        };
        ErrorList.prototype.criticalError = function (code, abort) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            var errMsg = new xomega.ErrorMessage(code, this.getMessage(code, params), 2 /* Critical */);
            this.Errors.push(errMsg);
            if (abort)
                this.abort(errMsg.Message);
        };
        ErrorList.prototype.abort = function (reason) {
            var err = new Error(reason);
            err["__errors__"] = this.Errors();
            throw err;
        };
        ErrorList.prototype.hasErrors = function () {
            return this.Errors().some(function (err) {
                return err.Severity > 0 /* Warning */;
            });
        };
        ErrorList.prototype.abortIfHasErrors = function () {
            if (this.hasErrors())
                this.abort(this.ErrorsText());
        };
        ErrorList.prototype.mergeWith = function (otherList) {
            if (otherList != null)
                ko.utils.arrayPushAll(this.Errors, otherList.Errors());
        };
        return ErrorList;
    })();
    xomega.ErrorList = ErrorList;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var ErrorMessage = (function () {
        function ErrorMessage(code, message, severity) {
            this.Code = code;
            this.Message = message;
            this.Severity = severity;
        }
        ErrorMessage.fromJSON = function (obj) {
            return new ErrorMessage(obj.Code, obj.Message, obj.Severity);
        };
        return ErrorMessage;
    })();
    xomega.ErrorMessage = ErrorMessage;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    (function (ErrorSeverity) {
        ErrorSeverity[ErrorSeverity["Warning"] = 0] = "Warning";
        ErrorSeverity[ErrorSeverity["Error"] = 1] = "Error";
        ErrorSeverity[ErrorSeverity["Critical"] = 2] = "Critical";
    })(xomega.ErrorSeverity || (xomega.ErrorSeverity = {}));
    var ErrorSeverity = xomega.ErrorSeverity;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    function format(str) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var p = getParams(params);
        return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m == "{{") {
                return "{";
            }
            if (m == "}}") {
                return "}";
            }
            return p[n];
        });
    }
    xomega.format = format;
    function getParams(params) {
        return (params && params.length == 1 && $.isArray(params[0])) ? getParams(params[0]) : params;
    }
    xomega.getParams = getParams;
    function urlParam(url, param) {
        if (param = (new RegExp('[?&]' + encodeURIComponent(param) + '=([^&]*)')).exec(url))
            return decodeURIComponent(param[1]);
    }
    xomega.urlParam = urlParam;
    function toCamelCase(str) {
        return str.replace(/(^| |\.|-|_|\/)(.)/g, function (match, g1, g2) {
            return g2.toUpperCase();
        });
    }
    xomega.toCamelCase = toCamelCase;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var Header = (function () {
        function Header(type, id, text) {
            this.isValid = true;
            this.isActive = true;
            this.defaultFormat = Header.fieldId;
            this.attr = {};
            this.type = type;
            this.id = id;
            this.text = text;
        }
        Header.fromJSON = function (obj) {
            var h = new Header(obj.Type, obj.Id, obj.Text);
            h.defaultFormat = obj.DefaultFormat;
            h.isActive = obj.IsActive;
            if ($.isArray(obj.attributes)) {
                for (var i = 0; i < obj.attributes.length; i++) {
                    h.attr[obj.attributes[i].Key] = obj.attributes[i].Value;
                }
            }
            else
                h.attr = obj.attributes;
            return h;
        };
        Header.prototype.toString = function (fmt) {
            if (fmt === void 0) { fmt = this.defaultFormat; }
            if (fmt === Header.fieldId || !this.isValid)
                return this.id;
            if (fmt === Header.fieldText)
                return this.text;
            var hdr = this;
            return fmt.replace(/\[\[|\]\]|\[(i|t|a:)(.*?)\]/g, function (m) {
                var n = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    n[_i - 1] = arguments[_i];
                }
                if (m === "[[")
                    return "[";
                if (m === "]]")
                    return "]";
                if (n[1] == null || n[1] == "") {
                    if (n[0] === "i")
                        return hdr.id;
                    if (n[0] === "t")
                        return hdr.text;
                }
                else if (n[0] === "a:") {
                    var res = "";
                    var attr = hdr.getAttribute(n[1]);
                    if ($.isArray(attr)) {
                        return attr.join(", ");
                    }
                    return attr;
                }
                return m;
            });
        };
        Header.prototype.clone = function () {
            var h = new Header(this.type, this.id, this.text);
            return $.extend(true, h, this);
        };
        Header.prototype.getAttribute = function (attribute) {
            return this.attr[attribute];
        };
        Header.prototype.addToAttribute = function (attribute, value) {
            var curVal = this.attr[attribute];
            if (curVal == null && value != null) {
                this.attr[attribute] = value;
                return;
            }
            if (value == null || value == curVal)
                return;
            var lst;
            if ($.isArray(curVal))
                lst = curVal;
            else {
                lst = new Array();
                if (curVal != null)
                    lst.push(curVal);
                this.attr[attribute] = lst;
            }
            if (lst.indexOf(value) < 0)
                lst.push(value);
        };
        Header.fieldId = "[i]";
        Header.fieldText = "[t]";
        Header.attrPattern = "[a:{0}]";
        return Header;
    })();
    xomega.Header = Header;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var LookupCache = (function () {
        function LookupCache() {
            this.cache = {};
            this.notifyQueues = {};
        }
        LookupCache.prototype.loadLookupTable = function (type, onReadyCallback) {
            if (LookupCache.cacheLoaders.every(function (cl) { return !cl.isSupported(type); })) {
                delete this.notifyQueues[type];
                return;
            }
            var notify = this.notifyQueues[type];
            if (notify != null) {
                if (onReadyCallback != null && notify.indexOf(onReadyCallback) < 0)
                    notify.push(onReadyCallback);
            }
            else {
                notify = new Array();
                if (onReadyCallback != null)
                    notify.push(onReadyCallback);
                this.notifyQueues[type] = notify;
                for (var i = 0; i < LookupCache.cacheLoaders.length; i++)
                    LookupCache.cacheLoaders[i].load(this, type);
            }
        };
        LookupCache.prototype.getLookupTable = function (type, onReadyCallback) {
            if (type == null)
                return null;
            var tbl = this.cache[type];
            if (tbl == null) {
                this.loadLookupTable(type, onReadyCallback);
                tbl = this.cache[type];
            }
            return tbl;
        };
        LookupCache.prototype.removeLookupTable = function (type) {
            delete this.cache[type];
            delete this.notifyQueues[type];
        };
        LookupCache.prototype.cacheLookupTable = function (table) {
            if (table == null || table.type == null)
                return;
            this.cache[table.type] = table;
            var notify = this.notifyQueues[table.type];
            if (notify != null) {
                for (var i = 0; i < notify.length; i++)
                    notify[i](table.type);
            }
            delete this.notifyQueues[table.type];
        };
        LookupCache.current = new LookupCache();
        LookupCache.cacheLoaders = new Array();
        return LookupCache;
    })();
    xomega.LookupCache = LookupCache;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var LookupTable = (function () {
        function LookupTable(type, data, caseSensitive) {
            this.errors = new xomega.ErrorList();
            this.indexedData = {};
            this.type = type;
            this.data = data;
            this.caseSensitive = caseSensitive;
            for (var i = 0; i < data.length; i++)
                data[i].type = type;
        }
        LookupTable.fromErrors = function (type, errors) {
            var res = new LookupTable(type, [], false);
            res.errors = errors;
            return res;
        };
        LookupTable.fromJSON = function (obj) {
            var data = obj.data.map(function (val, idx, arr) { return xomega.Header.fromJSON(val); });
            var tbl = new LookupTable(obj.Type, data, obj.caseSensitive);
            return tbl;
        };
        LookupTable.prototype.getValues = function (filterFunc, thisArg) {
            if (filterFunc === void 0) { filterFunc = null; }
            if (thisArg === void 0) { thisArg = null; }
            var lst = this.data;
            if (filterFunc != null)
                lst = lst.filter(filterFunc, thisArg);
            return lst.map(function (h) { return h.clone(); });
        };
        LookupTable.prototype.lookupById = function (id) {
            return this.lookupByFormat(xomega.Header.fieldId, id);
        };
        LookupTable.prototype.lookupByFormat = function (fmt, value) {
            var tbl = this.indexedData[fmt];
            if (typeof tbl === "undefined")
                tbl = this.buildIndexedTable(fmt);
            var res = tbl[this.caseSensitive ? value : value.toUpperCase()];
            if (res != null)
                return res.clone();
            return null;
        };
        LookupTable.prototype.resetIndexes = function () {
            this.indexedData = {};
        };
        LookupTable.prototype.clearIndex = function (fmt) {
            delete this.indexedData[fmt];
        };
        LookupTable.prototype.buildIndexedTable = function (format) {
            var tbl = {};
            for (var i = 0; i < this.data.length; i++) {
                var h = this.data[i];
                if (h == null)
                    continue;
                var key = h.toString(format);
                if (!this.caseSensitive)
                    key = key.toLocaleUpperCase();
                var h1 = tbl[key];
                if (typeof h1 !== "undefined")
                    h1.addToAttribute("_grp:" + format, h);
                else
                    tbl[key] = h;
            }
            this.indexedData[format] = tbl;
            return tbl;
        };
        return LookupTable;
    })();
    xomega.LookupTable = LookupTable;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var XomegaCacheLoader = (function () {
        function XomegaCacheLoader() {
        }
        XomegaCacheLoader.prototype.isSupported = function (tableType) {
            return true;
        };
        XomegaCacheLoader.prototype.load = function (cache, tableType) {
            $.ajax(xomega.format(XomegaCacheLoader.uriTemplate, tableType), {
                success: function (data, textStatus, jqXHR) {
                    var json = jqXHR.responseJSON;
                    var tbl;
                    if (json == null) {
                        if (cache.getLookupTable(tableType) != null)
                            return;
                        var err = new xomega.ErrorList();
                        err.addError(xomega.format("Lookup table '{0}' is not found.", tableType));
                        tbl = xomega.LookupTable.fromErrors(tableType, err);
                    }
                    else
                        tbl = xomega.LookupTable.fromJSON(json);
                    cache.cacheLookupTable(tbl);
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    if (cache.getLookupTable(tableType) != null)
                        return;
                    var errLst = new xomega.ErrorList();
                    errLst.Errors.push(new xomega.ErrorMessage(errorThrow, jqXHR.responseText, 1 /* Error */));
                    console.error(jqXHR.responseText);
                    cache.cacheLookupTable(xomega.LookupTable.fromErrors(tableType, errLst));
                }
            });
        };
        XomegaCacheLoader.uriTemplate = "/api/lookuptable/{0}";
        return XomegaCacheLoader;
    })();
    xomega.XomegaCacheLoader = XomegaCacheLoader;
    xomega.LookupCache.cacheLoaders.push(new XomegaCacheLoader());
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var BaseProperty = (function () {
        function BaseProperty() {
            var _this = this;
            this.editable = ko.observable(true);
            this.visible = ko.observable(true);
            this.required = ko.observable(false);
            this.Parent = ko.observable();
            this.AccessLevel = ko.observable(2 /* Full */);
            this.Editable = ko.computed({
                read: function () {
                    var al = _this.AccessLevel();
                    return _this.editable() && (_this.Parent() == null || _this.Parent().isPropertyEditable(_this)) && (al > 1 /* ReadOnly */);
                },
                write: function (value) {
                    _this.editable(value);
                },
                owner: this
            });
            this.Visible = ko.computed({
                read: function () {
                    var al = _this.AccessLevel();
                    return _this.visible() && (_this.Parent() == null || _this.Parent().isPropertyVisible(_this)) && (al > 0 /* None */);
                },
                write: function (value) {
                    _this.visible(value);
                },
                owner: this
            });
            this.Required = ko.computed({
                read: function () {
                    return _this.required() && _this.Editable() && _this.Visible() && (_this.Parent() == null || _this.Parent().isPropertyVisible(_this));
                },
                write: function (value) {
                    _this.required(value);
                },
                owner: this
            });
        }
        BaseProperty.prototype.onInitialized = function () {
        };
        BaseProperty.prototype.setName = function (name) {
            this.Name = name;
        };
        BaseProperty.prototype.toString = function () {
            if (this.Label != null)
                return this.Label;
            var res = this.Name.replace(/([a-z])([A-Z])/, "$1 $2");
            res = res.replace(/([A-Z][A-Z])([A-Z])([a-z])/, "$1 $2$3");
            return res;
        };
        return BaseProperty;
    })();
    xomega.BaseProperty = BaseProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    (function (AccessLevel) {
        AccessLevel[AccessLevel["None"] = 0] = "None";
        AccessLevel[AccessLevel["ReadOnly"] = 1] = "ReadOnly";
        AccessLevel[AccessLevel["Full"] = 2] = "Full";
    })(xomega.AccessLevel || (xomega.AccessLevel = {}));
    var AccessLevel = xomega.AccessLevel;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    (function (ValueFormat) {
        ValueFormat[ValueFormat["Internal"] = 0] = "Internal";
        ValueFormat[ValueFormat["Transport"] = 1] = "Transport";
        ValueFormat[ValueFormat["EditString"] = 2] = "EditString";
        ValueFormat[ValueFormat["DisplayString"] = 3] = "DisplayString";
    })(xomega.ValueFormat || (xomega.ValueFormat = {}));
    var ValueFormat = xomega.ValueFormat;
})(xomega || (xomega = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var xomega;
(function (xomega) {
    var DataProperty = (function (_super) {
        __extends(DataProperty, _super);
        function DataProperty() {
            var _this = this;
            _super.call(this);
            this.Modified = ko.observable();
            this.IsMultiValued = false;
            this.NullString = "";
            this.RestrictedString = "";
            this.ParseListSeparators = /;|,|\r\n/;
            this.DisplayListSeparator = ", ";
            this.ValidationErrors = new xomega.ErrorList();
            this.Validated = false;
            this.Validators = new Array(DataProperty.validateRequired);
            this.PossibleValues = ko.observableArray();
            this.waitingFor = [];
            this.value = ko.observable();
            this.InternalValue = ko.computed({
                read: function () {
                    return _this.value();
                },
                write: function (value) {
                    var newVal = _this.resolveValue(value, 0 /* Internal */);
                    _this.value(newVal);
                },
                owner: this
            });
            this.DisplayStringValue = ko.computed({
                read: function () {
                    return _this.resolveValue(_this.InternalValue(), 3 /* DisplayString */);
                },
                write: function (value) {
                    _this.InternalValue(value);
                },
                owner: this
            });
            this.EditStringValue = ko.computed({
                read: function () {
                    return _this.resolveValue(_this.InternalValue(), 2 /* EditString */);
                },
                write: function (value) {
                    _this.InternalValue(value);
                },
                owner: this
            });
            this.TransportValue = ko.computed({
                read: function () {
                    return _this.resolveValue(_this.InternalValue(), 1 /* Transport */);
                },
                write: function (value) {
                    _this.InternalValue(value);
                },
                owner: this
            });
            this.value.subscribe(function (newVal) {
                if (_this.Modified() == null)
                    _this.Modified(false);
                else {
                    _this.Modified(true);
                    _this.validate(true);
                }
            }, this);
        }
        DataProperty.isStringFormat = function (format) {
            return format === 2 /* EditString */ || format === 3 /* DisplayString */;
        };
        DataProperty.isTypedFormat = function (format) {
            return format === 0 /* Internal */ || format === 1 /* Transport */;
        };
        DataProperty.prototype.onInitialized = function () {
            this.InternalValue.notifySubscribers(this.value());
            this.updateValueList();
        };
        DataProperty.prototype.reset = function () {
            this.InternalValue(null);
        };
        DataProperty.prototype.isValueNull = function (value, format) {
            if (value == null)
                return true;
            if ($.isArray(value)) {
                return value.length === 0;
            }
            var str = value.toString().trim();
            return str == "" || str === this.NullString;
        };
        DataProperty.prototype.isNull = function () {
            return this.isValueNull(this.value(), 0 /* Internal */);
        };
        DataProperty.prototype.resolveValue = function (value, format) {
            var _this = this;
            if (this.AccessLevel() === 0 /* None */)
                return format == 3 /* DisplayString */ ? this.RestrictedString : value;
            if (this.isValueNull(value, format))
                return format == 3 /* DisplayString */ ? this.NullString : null;
            if (this.IsMultiValued) {
                var lst;
                if ($.isArray(value))
                    lst = value;
                else if (typeof value === "string") {
                    lst = value.split(this.ParseListSeparators);
                    lst = lst.map(function (str) {
                        return ko.utils.stringTrim(str);
                    });
                    lst = lst.filter(function (str) {
                        return str !== "";
                    });
                }
                else
                    lst = [value];
                lst = lst.map(function (val) { return _this.convertValue(val, format); }, this);
                return this.convertList(lst, format);
            }
            else {
                return this.convertValue(value, format);
            }
        };
        DataProperty.prototype.convertValue = function (value, format) {
            return value;
        };
        DataProperty.prototype.convertList = function (list, format) {
            if (DataProperty.isTypedFormat(format))
                return list;
            return list.join(this.DisplayListSeparator);
        };
        DataProperty.prototype.isValid = function (validate) {
            if (validate === void 0) { validate = true; }
            if (validate)
                this.validate();
            return this.ValidationErrors && !this.ValidationErrors.hasErrors();
        };
        DataProperty.prototype.validate = function (force) {
            var _this = this;
            if (force === void 0) { force = false; }
            if (force)
                this.Validated = false;
            if (this.Validated)
                return;
            this.ValidationErrors.Errors().length = 0;
            var value = this.InternalValue();
            if ($.isArray(value)) {
                var lst = value;
                lst.forEach(function (val) {
                    _this.Validators.forEach(function (validator) {
                        validator(_this, val);
                    }, _this);
                }, this);
            }
            else
                this.Validators.forEach(function (validator) {
                    validator(_this, value);
                }, this);
            this.Validated = true;
            this.ValidationErrors.Errors.valueHasMutated();
        };
        DataProperty.validateRequired = function (dp, value) {
            if (dp != null && dp.Required() && dp.isValueNull(value, 0 /* Internal */))
                dp.ValidationErrors.addError("{0} is required.", dp);
        };
        DataProperty.prototype.getPossibleValues = function () {
            return null;
        };
        DataProperty.prototype.updateValueList = function () {
            this.PossibleValues(this.getPossibleValues());
        };
        DataProperty.prototype.isReady = function () {
            return this.waitingFor.length == 0;
        };
        DataProperty.prototype.addWaitItem = function (item) {
            if (this.waitingFor.indexOf(item) < 0)
                this.waitingFor.push(item);
        };
        DataProperty.prototype.removeWaitItem = function (item) {
            var idx = this.waitingFor.indexOf(item);
            if (idx >= 0)
                this.waitingFor.splice(idx, 1);
            if (this.isReady() && this.Parent())
                this.Parent().checkIfReady();
        };
        return DataProperty;
    })(xomega.BaseProperty);
    xomega.DataProperty = DataProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var DataObject = (function () {
        function DataObject() {
            var _this = this;
            this.Parent = ko.observable();
            this.AccessLevel = ko.observable(2 /* Full */);
            this.editable = ko.observable(true);
            this.modified = ko.observable();
            this.ValidationErrors = new xomega.ErrorList();
            this.Validated = false;
            this.readyCallbacks = [];
            this.Editable = ko.computed({
                read: function () {
                    var al = _this.AccessLevel();
                    return _this.editable() && (_this.Parent() == null || _this.Parent().Editable()) && (al > 1 /* ReadOnly */);
                },
                write: function (value) {
                    _this.editable(value);
                },
                owner: this
            });
            this.init();
            this.onInitialized();
            this.Modified = ko.computed({
                read: function () {
                    var res = _this.modified();
                    for (var prop in _this) {
                        if (_this.hasOwnProperty(prop) && _this[prop].Modified) {
                            var p = _this[prop];
                            if (p.Modified() != null)
                                res = res || p.Modified();
                        }
                    }
                    return res;
                },
                write: function (value) {
                    _this.modified(value);
                    if (value === false) {
                        for (var prop in _this) {
                            if (_this.hasOwnProperty(prop) && _this[prop].Modified) {
                                var p = _this[prop];
                                p.Modified(false);
                            }
                        }
                    }
                },
                owner: this
            });
        }
        DataObject.prototype.init = function () {
        };
        DataObject.prototype.onInitialized = function () {
            for (var prop in this) {
                if (this.hasOwnProperty(prop) && this[prop].onInitialized) {
                    var p = this[prop];
                    p.setName(prop);
                    p.Parent(this);
                    p.onInitialized();
                }
            }
        };
        DataObject.prototype.setName = function (name) {
            this.NameInParent = name;
        };
        DataObject.prototype.reset = function () {
            for (var prop in this) {
                var dp = this[prop];
                if (this.hasOwnProperty(prop) && dp && dp.reset)
                    dp.reset();
            }
            this.ValidationErrors.Errors.removeAll();
        };
        DataObject.prototype.fromJSON = function (obj) {
            for (var prop in obj) {
                var dp = this[prop];
                if (obj.hasOwnProperty(prop) && dp) {
                    if (dp instanceof xomega.DataProperty)
                        dp.InternalValue(obj[prop]);
                    else if (dp instanceof DataObject)
                        dp.fromJSON(obj[prop]);
                }
            }
        };
        DataObject.prototype.toJSON = function (contract) {
            var res = {};
            for (var prop in this) {
                if (this.hasOwnProperty(prop) && (!contract || contract.hasOwnProperty(prop))) {
                    if (this[prop] instanceof xomega.DataProperty)
                        res[prop] = this[prop].TransportValue();
                    else if (this[prop] instanceof DataObject)
                        res[prop] = this[prop].toJSON();
                }
            }
            return res;
        };
        DataObject.prototype.formatUrl = function (url) {
            var self = this;
            return url.replace(/\{(.*?)\}/, function (param, p1) {
                var prop = xomega.toCamelCase(p1);
                return (self.hasOwnProperty(prop) && self[prop] instanceof xomega.DataProperty) ? self[prop].TransportValue() : param;
            });
        };
        DataObject.prototype.toUrlParams = function () {
            var url = "";
            for (var prop in this) {
                if (this.hasOwnProperty(prop)) {
                    if (this[prop] instanceof xomega.DataProperty) {
                        var val = this[prop].TransportValue();
                        if ($.isArray(val))
                            for (var i = 0; i < val.length; i++)
                                url += "&" + prop + "=" + val[i];
                        else if (val)
                            url += "&" + prop + "=" + val;
                    }
                    else if (this[prop] instanceof DataObject)
                        url += this[prop].toUrlParams();
                }
            }
            return url;
        };
        DataObject.prototype.fromQueryDict = function (query) {
            if (query) {
                for (var key in query) {
                    var prop = this[key];
                    if (prop)
                        prop.InternalValue(query[key]);
                }
            }
        };
        Object.defineProperty(DataObject.prototype, "Properties", {
            get: function () {
                var res = new Array();
                for (var prop in this) {
                    if (this.hasOwnProperty(prop) && this[prop] instanceof xomega.BaseProperty)
                        res.push(this[prop]);
                }
                return res;
            },
            enumerable: true,
            configurable: true
        });
        DataObject.prototype.isPropertyEditable = function (prop) {
            return this.Editable() && (this.Parent() == null || this.Parent().isPropertyEditable(prop));
        };
        DataObject.prototype.isPropertyVisible = function (prop) {
            return this.Parent() == null || this.Parent().isPropertyVisible(prop);
        };
        DataObject.prototype.isPropertyRequired = function (prop) {
            return this.Parent() == null || this.Parent().isPropertyRequired(prop);
        };
        DataObject.prototype.validate = function (force) {
            if (force === void 0) { force = false; }
            if (force)
                this.Validated = false;
            if (this.Validated)
                return;
            this.ValidationErrors.Errors.removeAll();
            for (var prop in this) {
                if (this.hasOwnProperty(prop) && this[prop].validate) {
                    var p = this[prop];
                    p.validate(force);
                    this.ValidationErrors.mergeWith(p.ValidationErrors);
                }
            }
            this.validateSelf();
            this.Validated = true;
        };
        DataObject.prototype.validateSelf = function () {
        };
        DataObject.prototype.onReady = function (callback) {
            if (this.isReady())
                callback();
            else if (this.readyCallbacks.indexOf(callback) < 0)
                this.readyCallbacks.push(callback);
        };
        DataObject.prototype.isReady = function () {
            for (var prop in this) {
                if (this.hasOwnProperty(prop) && this[prop].isReady) {
                    if (!this[prop].isReady())
                        return false;
                }
            }
            return true;
        };
        DataObject.prototype.checkIfReady = function () {
            if (this.Parent() != null)
                this.Parent().checkIfReady();
            else if (this.isReady()) {
                this.readyCallbacks.forEach(function (cb) { return cb(); });
                this.readyCallbacks.length = 0;
            }
        };
        DataObject.prototype.getFieldsCriteria = function () {
            var map = {};
            for (var prop in this) {
                var p = this[prop];
                if (this.hasOwnProperty(prop) && p instanceof xomega.BaseProperty)
                    map[p.Name] = p;
            }
            for (var prop in map) {
                var p = map[prop];
                if (!(p instanceof xomega.OperatorProperty))
                    continue;
                var op = p;
                if (op.AdditionalPropertyName)
                    map[op.AdditionalPropertyName] = null;
                if (op.AdditionalPropertyName2)
                    map[op.AdditionalPropertyName2] = null;
            }
            var res = new Array();
            for (var prop in map) {
                var p = map[prop];
                if (p instanceof xomega.OperatorProperty) {
                    var op = p;
                    if (op.isNull())
                        continue;
                    var data = new Array();
                    var dp1 = op.AdditionalPropertyName ? this[op.AdditionalPropertyName] : null;
                    if (dp1 && !dp1.isNull() && dp1.Visible())
                        data.push(dp1.DisplayStringValue());
                    var dp2 = op.AdditionalPropertyName2 ? this[op.AdditionalPropertyName2] : null;
                    if (dp2 && !dp2.isNull() && dp2.Visible())
                        data.push(dp2.DisplayStringValue());
                    res.push(new xomega.FieldCriteria(op.toString(), op.DisplayStringValue(), data));
                }
                else if (p instanceof xomega.DataProperty) {
                    var dp = p;
                    if (dp.isNull())
                        continue;
                    res.push(new xomega.FieldCriteria(dp.toString(), null, [dp.DisplayStringValue()]));
                }
            }
            return res;
        };
        return DataObject;
    })();
    xomega.DataObject = DataObject;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var DataRow = (function () {
        function DataRow(list) {
            this.List = list;
        }
        DataRow.prototype.fromJSON = function (obj) {
            for (var prop in obj) {
                var dp = this.List[prop];
                if (obj.hasOwnProperty(prop) && dp instanceof xomega.DataProperty) {
                    this[prop] = dp.resolveValue(obj[prop], 0 /* Internal */);
                }
            }
        };
        DataRow.prototype.toJSON = function (contract) {
            var res = {};
            for (var prop in this.List) {
                var dp = this.List[prop];
                if (this.hasOwnProperty(prop) && dp instanceof xomega.DataProperty && (!contract || contract.hasOwnProperty(prop))) {
                    res[prop] = dp.resolveValue(this[prop], 1 /* Transport */);
                }
            }
            return res;
        };
        return DataRow;
    })();
    xomega.DataRow = DataRow;
    var DataListObject = (function (_super) {
        __extends(DataListObject, _super);
        function DataListObject() {
            _super.call(this);
            this.List = ko.observableArray();
            this.CriteriaObject = null;
            this.AppliedCriteria = ko.observableArray();
            this.listModified = ko.observable();
        }
        DataListObject.prototype.reset = function () {
            this.List.removeAll();
            this.AppliedCriteria(null);
        };
        DataListObject.prototype.fromJSON = function (obj) {
            if (!$.isArray(obj))
                return;
            this.List.removeAll();
            var objects = new Array();
            for (var i = 0; i < obj.length; i++) {
                var dr = new DataRow(this);
                dr.fromJSON(obj[i]);
                objects.push(dr);
            }
            this.List(objects);
            this.AppliedCriteria(this.CriteriaObject ? this.CriteriaObject.getFieldsCriteria() : []);
        };
        DataListObject.prototype.toJSON = function (contract) {
            var res = [];
            var data = this.List();
            var itemContract;
            if (contract instanceof Array && contract.length > 0)
                itemContract = contract[0];
            for (var i = 0; i < data.length; i++) {
                res.push(data[i].toJSON(itemContract));
            }
            return res;
        };
        return DataListObject;
    })(xomega.DataObject);
    xomega.DataListObject = DataListObject;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var DataObjectList = (function (_super) {
        __extends(DataObjectList, _super);
        function DataObjectList(objectCreator) {
            var _this = this;
            _super.call(this);
            this.List = ko.observableArray();
            this.listModified = ko.observable();
            this.objectCreator = objectCreator;
            this.Template = objectCreator();
            this.Parent = ko.computed({
                read: function () {
                    return _this.Template.Parent();
                },
                write: function (value) {
                    _this.Template.Parent(value);
                },
                owner: this
            });
            this.Editable = ko.computed({
                read: function () {
                    return _this.Template.Editable();
                },
                write: function (value) {
                    _this.Template.Editable(value);
                },
                owner: this
            });
            this.Modified = ko.computed({
                read: function () {
                    var obj, res = _this.listModified();
                    for (var i = 0; i < _this.List().length; i++) {
                        obj = _this.List()[i];
                        if (obj.Modified() != null)
                            res = res || obj.Modified();
                    }
                    return res;
                },
                write: function (value) {
                    _this.listModified(value);
                },
                owner: this
            });
            this.List.subscribe(function (changes) {
                var modified = false;
                var obj;
                for (var i = 0; i < changes.length; i++) {
                    var change = changes[i];
                    obj = change.value;
                    if (change.status == "added") {
                        obj.Parent(_this);
                        if (obj.Modified() == null)
                            modified = true;
                    }
                    if (change.status == "deleted") {
                        obj.Parent(null);
                        modified = true;
                    }
                }
                if (modified)
                    _this.Modified(true);
            }, this, "arrayChange");
        }
        DataObjectList.prototype.onInitialized = function () {
        };
        DataObjectList.prototype.reset = function () {
            this.List.removeAll();
        };
        DataObjectList.prototype.fromJSON = function (obj) {
            if (!$.isArray(obj))
                return;
            this.List.removeAll();
            var objects = new Array();
            for (var i = 0; i < obj.length; i++) {
                var dobj = this.objectCreator();
                dobj.fromJSON(obj[i]);
                objects.push(dobj);
            }
            this.List(objects);
        };
        DataObjectList.prototype.isPropertyEditable = function (prop) {
            var p = this.Template[prop.Name];
            return p == null || p.Editable();
        };
        DataObjectList.prototype.isPropertyVisible = function (prop) {
            var p = this.Template[prop.Name];
            return p == null || p.Visible();
        };
        DataObjectList.prototype.isPropertyRequired = function (prop) {
            var p = this.Template[prop.Name];
            return p == null || p.Required();
        };
        DataObjectList.prototype.validate = function (force) {
            if (force === void 0) { force = false; }
            if (force)
                this.Validated = false;
            if (this.Validated)
                return;
            this.ValidationErrors.Errors.removeAll();
            var obj;
            for (var i = 0; i < this.List().length; i++) {
                obj = this.List()[i];
                obj.validate(force);
                this.ValidationErrors.mergeWith(obj.ValidationErrors);
            }
            this.validateSelf();
            this.Validated = true;
        };
        return DataObjectList;
    })(xomega.DataObject);
    xomega.DataObjectList = DataObjectList;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var Bindings = (function () {
        function Bindings() {
        }
        Bindings.init = function () {
            ko.bindingHandlers['property'] = {
                init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var binding = Bindings.findBinding(element, valueAccessor());
                    if (binding != null)
                        binding.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                },
            };
        };
        Bindings.register = function (binding) {
            Bindings.registered.push(binding);
        };
        Bindings.findBinding = function (element, property) {
            for (var i = Bindings.registered.length - 1; i >= 0; i--)
                if (Bindings.registered[i].appliesTo(element, property))
                    return Bindings.registered[i];
            return null;
        };
        Bindings.registered = new Array();
        return Bindings;
    })();
    xomega.Bindings = Bindings;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var PropertyBinding = (function () {
        function PropertyBinding() {
        }
        PropertyBinding.prototype.appliesTo = function (element, property) {
            return false;
        };
        PropertyBinding.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            if (viewModel instanceof xomega.DataRow) {
                this.handleEditable(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                this.handleVisible(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                this.handleValue(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            }
            else {
                ko.computed(function () {
                    this.handleEditable(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                }, this, { disposeWhenNodeIsRemoved: element });
                ko.computed(function () {
                    this.handleVisible(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                }, this, { disposeWhenNodeIsRemoved: element });
                ko.computed(function () {
                    this.handleValidationErrors(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                }, this, { disposeWhenNodeIsRemoved: element });
                ko.computed(function () {
                    this.handleRequired(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                }, this, { disposeWhenNodeIsRemoved: element });
                ko.computed(function () {
                    this.handleValue(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                }, this, { disposeWhenNodeIsRemoved: element });
                this.setLabel(element, valueAccessor);
            }
        };
        PropertyBinding.prototype.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        };
        PropertyBinding.prototype.handleValidationErrors = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            this.setErrorText(element, valueAccessor().ValidationErrors.ErrorsText());
            ko.bindingHandlers.css.update(element, function () {
                return {
                    invalid: !valueAccessor().isValid(false)
                };
            }, allBindingsAccessor, viewModel, bindingContext);
        };
        PropertyBinding.prototype.setErrorText = function (element, errorText) {
            element.title = errorText;
        };
        PropertyBinding.prototype.handleEditable = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.enable.update(element, function () { return valueAccessor().Editable; }, allBindingsAccessor, viewModel, bindingContext);
        };
        PropertyBinding.prototype.handleVisible = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.visible.update(element, function () { return valueAccessor().Visible; }, allBindingsAccessor, viewModel, bindingContext);
        };
        PropertyBinding.prototype.handleRequired = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var label = this.getLabel(element);
            if (label)
                ko.bindingHandlers.css.update(label, function () {
                    return {
                        required: valueAccessor().Required()
                    };
                }, allBindingsAccessor, viewModel, bindingContext);
        };
        PropertyBinding.prototype.handleValue = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        };
        PropertyBinding.prototype.getLabel = function (element) {
            var qry = 'label[for="' + element.id + '"]';
            var label = $(qry);
            if (label.length <= 0)
                label = $(element).closest("label");
            else if (label.length > 1)
                label = $(element).closest(':has(> ' + qry + ')').find(qry);
            return label.length > 0 ? label.get(0) : null;
        };
        PropertyBinding.prototype.setLabel = function (element, valueAccessor) {
            var label = this.getLabel(element);
            if (label && label.innerText && valueAccessor().Label == null) {
                var text = label.innerText.replace('_', '').trim();
                if (text[text.length - 1] === ':')
                    text = text.substring(0, text.length - 1);
                valueAccessor().Label = text;
            }
        };
        return PropertyBinding;
    })();
    xomega.PropertyBinding = PropertyBinding;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var OutputTextBinding = (function (_super) {
        __extends(OutputTextBinding, _super);
        function OutputTextBinding() {
            _super.apply(this, arguments);
        }
        OutputTextBinding.prototype.appliesTo = function (element, property) {
            return true;
        };
        OutputTextBinding.prototype.handleValue = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.text.update(element, function () { return viewModel instanceof xomega.DataRow ? valueAccessor().resolveValue(viewModel[valueAccessor().Name], 3 /* DisplayString */) : valueAccessor().DisplayStringValue; }, allBindingsAccessor, viewModel, bindingContext);
        };
        return OutputTextBinding;
    })(xomega.PropertyBinding);
    xomega.OutputTextBinding = OutputTextBinding;
    xomega.Bindings.register(new OutputTextBinding());
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var InputTextBinding = (function (_super) {
        __extends(InputTextBinding, _super);
        function InputTextBinding() {
            _super.apply(this, arguments);
        }
        InputTextBinding.prototype.appliesTo = function (element, property) {
            return element.tagName.toLowerCase() == "textarea" || element.tagName.toLowerCase() == "input" && element.type == "text";
        };
        InputTextBinding.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            _super.prototype.init.call(this, element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            ko.bindingHandlers.value.init(element, function () {
                return valueAccessor().Editable() ? valueAccessor().EditStringValue : valueAccessor().DisplayStringValue;
            }, allBindingsAccessor, viewModel, bindingContext);
        };
        InputTextBinding.prototype.handleValue = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.value.update(element, function () {
                return valueAccessor().Editable() ? valueAccessor().EditStringValue : valueAccessor().DisplayStringValue;
            }, allBindingsAccessor, viewModel, bindingContext);
        };
        return InputTextBinding;
    })(xomega.PropertyBinding);
    xomega.InputTextBinding = InputTextBinding;
    xomega.Bindings.register(new InputTextBinding());
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var CheckboxBinding = (function (_super) {
        __extends(CheckboxBinding, _super);
        function CheckboxBinding() {
            _super.apply(this, arguments);
        }
        CheckboxBinding.prototype.appliesTo = function (element, property) {
            return element.tagName.toLowerCase() == "input" && element.type == "checkbox" && !property.IsMultiValued;
        };
        CheckboxBinding.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            _super.prototype.init.call(this, element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            ko.bindingHandlers.checked.init(element, function () { return valueAccessor().DisplayStringValue; }, allBindingsAccessor, viewModel, bindingContext);
        };
        return CheckboxBinding;
    })(xomega.PropertyBinding);
    xomega.CheckboxBinding = CheckboxBinding;
    xomega.Bindings.register(new CheckboxBinding());
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var SelectBinding = (function (_super) {
        __extends(SelectBinding, _super);
        function SelectBinding() {
            _super.apply(this, arguments);
        }
        SelectBinding.prototype.appliesTo = function (element, property) {
            return element.tagName.toLowerCase() == "select";
        };
        SelectBinding.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            _super.prototype.init.call(this, element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            if (valueAccessor().IsMultiValued) {
                element.multiple = true;
                ko.bindingHandlers.selectedOptions.init(element, function () { return valueAccessor().InternalValue; }, allBindingsAccessor, viewModel, bindingContext);
            }
            else {
                ko.bindingHandlers.value.init(element, function () { return valueAccessor().InternalValue; }, allBindingsAccessor, viewModel, bindingContext);
            }
        };
        SelectBinding.prototype.handleValue = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var tmpl = '<option value="{0}">{1}</option>';
            var value = valueAccessor().TransportValue();
            $(element).empty();
            if (!valueAccessor().IsMultiValued && (valueAccessor().isNull() || !valueAccessor().Required())) {
                var opt = xomega.format(tmpl, "", valueAccessor().Required() ? SelectBinding.DefaultSelectOption : valueAccessor().NullString);
                $(opt).appendTo(element).prop("selected", valueAccessor().isNull());
            }
            var vals = valueAccessor().PossibleValues();
            if (vals != null) {
                ko.utils.arrayForEach(vals, function (item) {
                    var val = valueAccessor().convertValue(item, 1 /* Transport */);
                    var opt = xomega.format(tmpl, val, valueAccessor().convertValue(item, 3 /* DisplayString */));
                    var selected = valueAccessor().IsMultiValued ? value && ko.utils.arrayIndexOf(value, val) >= 0 : val == value;
                    $(opt).appendTo(element).prop("selected", selected);
                });
            }
        };
        SelectBinding.DefaultSelectOption = "Select...";
        return SelectBinding;
    })(xomega.PropertyBinding);
    xomega.SelectBinding = SelectBinding;
    xomega.Bindings.register(new SelectBinding());
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var OptionsBinding = (function (_super) {
        __extends(OptionsBinding, _super);
        function OptionsBinding() {
            _super.apply(this, arguments);
        }
        OptionsBinding.prototype.appliesTo = function (element, property) {
            return element.dataset.control == "options";
        };
        OptionsBinding.prototype.handleValue = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var tmpl = '<div><label><input type="{0}" name="{1}" value="{2}"/>{3}</label></div>';
            var type = valueAccessor().IsMultiValued ? "checkbox" : "radio";
            var name = element.dataset.name;
            var value = valueAccessor().TransportValue();
            $(element).empty();
            if (!valueAccessor().IsMultiValued && !valueAccessor().Required()) {
                var opt = xomega.format(tmpl, type, name, "", valueAccessor().NullString);
                $(opt).appendTo(element).find("input").click(updateModel).prop("checked", valueAccessor().isNull());
            }
            var vals = valueAccessor().PossibleValues();
            if (vals != null) {
                ko.utils.arrayForEach(valueAccessor().PossibleValues(), function (item) {
                    var val = valueAccessor().convertValue(item, 1 /* Transport */);
                    var opt = xomega.format(tmpl, type, name, val, valueAccessor().convertValue(item, 3 /* DisplayString */));
                    var checked = valueAccessor().IsMultiValued ? value && ko.utils.arrayIndexOf(value, val) >= 0 : val == value;
                    $(opt).appendTo(element).find("input").click(updateModel).prop("checked", checked);
                });
            }
            function updateModel(evt) {
                if (valueAccessor().IsMultiValued) {
                    var arr = valueAccessor().TransportValue() || [];
                    var koUtils = ko.utils;
                    koUtils.addOrRemoveItem(arr, evt.target.value, evt.target.checked);
                    valueAccessor().InternalValue(arr);
                }
                else
                    valueAccessor().InternalValue(evt.target.value);
            }
        };
        return OptionsBinding;
    })(xomega.PropertyBinding);
    xomega.OptionsBinding = OptionsBinding;
    xomega.Bindings.register(new OptionsBinding());
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var EnumProperty = (function (_super) {
        __extends(EnumProperty, _super);
        function EnumProperty() {
            var _this = this;
            _super.call(this);
            this.KeyFormat = xomega.Header.fieldId;
            this.DisplayFormat = xomega.Header.fieldText;
            this.cascadingProperties = new Object();
            this.compare = function (h1, h2) {
                var s1 = _this.convertValue(h1, 3 /* DisplayString */);
                var s2 = _this.convertValue(h2, 3 /* DisplayString */);
                if (s1 != null && s1.localeCompare)
                    return s1.localeCompare(s2);
                else
                    return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
            };
            this.updateValue = function (type) {
                var mod = _this.Modified();
                _this.Modified(null);
                var h = _this.InternalValue();
                if (h instanceof xomega.Header && !h.isValid)
                    _this.InternalValue(h.id);
                _this.Modified(mod);
            };
            this.updateList = function (type) {
                _this.updateValueList();
                _this.removeWaitItem(_this.updateList);
            };
        }
        EnumProperty.prototype.filter = function (h) {
            return h != null && h.isActive && this.matchesCascadingProperties(h);
        };
        EnumProperty.prototype.convertValue = function (value, format) {
            var h = value;
            if (format == 0 /* Internal */) {
                if (value instanceof xomega.Header && h.type == this.EnumType)
                    return value;
                var str = ("" + value).trim();
                var tbl = xomega.LookupCache.current.getLookupTable(this.EnumType, this.updateValue);
                if (tbl != null) {
                    h = null;
                    if (this.KeyFormat != xomega.Header.fieldId)
                        h = tbl.lookupByFormat(this.KeyFormat, str);
                    if (h == null)
                        h = tbl.lookupById(str);
                    if (h != null) {
                        h.defaultFormat = this.KeyFormat;
                        return h;
                    }
                }
                h = new xomega.Header(this.EnumType, str, null);
                h.isValid = false;
                return h;
            }
            else if (value instanceof xomega.Header) {
                if (format == 1 /* Transport */)
                    return h.id;
                if (format == 2 /* EditString */)
                    return h.toString(this.KeyFormat);
                if (format == 3 /* DisplayString */)
                    return h.toString(this.DisplayFormat);
            }
            return _super.prototype.convertValue.call(this, value, format);
        };
        EnumProperty.prototype.getPossibleValues = function () {
            var res;
            if (this.EnumType == null)
                return res;
            var tbl = xomega.LookupCache.current.getLookupTable(this.EnumType, this.updateList);
            if (tbl != null) {
                res = tbl.getValues(this.filter, this);
                if (this.compare)
                    res = res.sort(this.compare);
            }
            else {
                this.addWaitItem(this.updateList);
            }
            return res;
        };
        EnumProperty.prototype.setCascadingProperty = function (attribute, prop) {
            var _this = this;
            var oldProp = this.cascadingProperties[attribute];
            if (oldProp) {
                oldProp.subscription.dispose();
                delete this.cascadingProperties[attribute];
            }
            if (prop != null) {
                this.cascadingProperties[attribute] = new CascadingProperty(prop, prop.InternalValue.subscribe(function (newVal) {
                    if (!_this.isNull() && _this.filter) {
                        if (_this.IsMultiValued) {
                            var lst = _this.InternalValue();
                            _this.InternalValue(lst.filter(_this.filter, _this));
                        }
                        else if (!_this.filter(_this.InternalValue()))
                            _this.InternalValue(null);
                    }
                    _this.updateValueList();
                }, this));
            }
        };
        EnumProperty.prototype.matchesCascadingProperties = function (h) {
            for (var attr in this.cascadingProperties) {
                if (!this.cascadingProperties.hasOwnProperty(attr) || !(this.cascadingProperties[attr] instanceof CascadingProperty))
                    continue;
                var p = this.cascadingProperties[attr].property;
                var pv = p.TransportValue();
                var hv = p.resolveValue(h.attr[attr], 0 /* Internal */);
                hv = p.resolveValue(hv, 1 /* Transport */);
                if (p.isNull() || p.isValueNull(hv, 1 /* Transport */))
                    continue;
                var match;
                if ($.isArray(hv)) {
                    if ($.isArray(pv)) {
                        match = $.grep(pv, function (v) {
                            return $.inArray(v, hv) > -1;
                        }).length > 0;
                    }
                    else
                        match = $.inArray(pv, hv) > -1;
                }
                else
                    match = $.isArray(pv) ? $.inArray(hv, pv) > -1 : (hv == pv);
                if (!match)
                    return false;
            }
            return true;
        };
        return EnumProperty;
    })(xomega.DataProperty);
    xomega.EnumProperty = EnumProperty;
    var CascadingProperty = (function () {
        function CascadingProperty(prop, subscr) {
            this.property = prop;
            this.subscription = subscr;
        }
        return CascadingProperty;
    })();
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var OperatorProperty = (function (_super) {
        __extends(OperatorProperty, _super);
        function OperatorProperty() {
            var _this = this;
            _super.call(this);
            this.AttributeAddlProps = "addl props";
            this.AttributeMultival = "multival";
            this.AttributeType = "type";
            this.AttributeExcludeType = "exclude type";
            this.AttributeSortOrder = "sort order";
            this.AttributeNullCheck = "null check";
            this.HasNullCheck = false;
            this.filter = this.isApplicable;
            this.compare = function (h1, h2) {
                var s1 = h1.attr[_this.AttributeSortOrder];
                var s2 = h2.attr[_this.AttributeSortOrder];
                return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
            };
            this.InternalValue.subscribe(this.onValueChanged, this);
        }
        OperatorProperty.prototype.onInitialized = function () {
            if (this.AdditionalPropertyName == null && this.Name.match(/Operator$/))
                this.AdditionalPropertyName = this.Name.substring(0, this.Name.length - 8);
            if (this.AdditionalPropertyName2 == null && this.AdditionalPropertyName != null)
                this.AdditionalPropertyName2 = this.AdditionalPropertyName + "2";
            _super.prototype.onInitialized.call(this);
        };
        OperatorProperty.prototype.isApplicable = function (oper) {
            var addlProp = this.Parent ? this.Parent()[this.AdditionalPropertyName] : null;
            var multiVal = oper.attr[this.AttributeMultival];
            if (addlProp == null && multiVal != null || addlProp != null && (multiVal == "0" && addlProp.IsMultiValued || multiVal == "1" && !addlProp.IsMultiValued))
                return false;
            var nullCheck = oper.attr[this.AttributeNullCheck];
            if (nullCheck == "1" && !this.HasNullCheck)
                return false;
            var type = oper.attr[this.AttributeType];
            var exclType = oper.attr[this.AttributeExcludeType];
            if (type == null && exclType == null)
                return true;
            if (addlProp == null)
                return false;
            if ($.isArray(exclType)) {
                for (var i = 0; i < exclType.length; i++)
                    if (this.typeMatches(addlProp, exclType[i]))
                        return false;
            }
            else if (this.typeMatches(addlProp, exclType))
                return false;
            if ($.isArray(type)) {
                for (i = 0; i < type.length; i++)
                    if (this.typeMatches(addlProp, type[i]))
                        return true;
                return false;
            }
            return this.typeMatches(addlProp, type);
        };
        OperatorProperty.prototype.typeMatches = function (prop, name) {
            var propClass = /(\w+)\(/.exec(prop.constructor.toString())[1];
            return (propClass == name) || prop.__proto__ != null && this.typeMatches(prop.__proto__, name);
        };
        OperatorProperty.prototype.onValueChanged = function (newVal) {
            var addlProp = this.Parent()[this.AdditionalPropertyName];
            var addlProp2 = this.Parent()[this.AdditionalPropertyName2];
            if (addlProp == null)
                return;
            var depCnt = 0;
            if (!this.isNull())
                depCnt = newVal.attr[this.AttributeAddlProps];
            addlProp.Visible(this.Visible() && depCnt > 0);
            addlProp.Required(addlProp.Visible());
            if (addlProp2 != null) {
                addlProp2.Visible(this.Visible() && depCnt > 1);
                addlProp2.Required(addlProp2.Visible());
            }
        };
        return OperatorProperty;
    })(xomega.EnumProperty);
    xomega.OperatorProperty = OperatorProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var TextProperty = (function (_super) {
        __extends(TextProperty, _super);
        function TextProperty() {
            _super.call(this);
            this.Validators.push(TextProperty.validateSize);
        }
        TextProperty.prototype.convertValue = function (value, format) {
            if (xomega.DataProperty.isTypedFormat(format))
                return '' + value;
            return _super.prototype.convertValue.call(this, value, format);
        };
        TextProperty.validateSize = function (dp, value) {
            if (dp != null && !dp.isValueNull(value, 0 /* Internal */) && dp.Size > 0 && ('' + value).length > dp.Size)
                dp.ValidationErrors.addError("{0} cannot be longer than {1} characters. Invalid value: {2}.", dp, dp.Size, value);
        };
        return TextProperty;
    })(xomega.DataProperty);
    xomega.TextProperty = TextProperty;
    var GuidProperty = (function (_super) {
        __extends(GuidProperty, _super);
        function GuidProperty() {
            _super.call(this);
        }
        return GuidProperty;
    })(TextProperty);
    xomega.GuidProperty = GuidProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var BooleanProperty = (function (_super) {
        __extends(BooleanProperty, _super);
        function BooleanProperty() {
            _super.call(this);
        }
        BooleanProperty.prototype.convertValue = function (value, format) {
            if (xomega.DataProperty.isTypedFormat(format)) {
                if (typeof value === 'boolean')
                    return value;
                if (1 == value)
                    return true;
                if (0 == value)
                    return false;
                if (this.isValueNull(value, format))
                    return null;
                var str = ('' + value).trim().toLowerCase();
                if (BooleanProperty.TrueStrings.indexOf(str) > -1)
                    return true;
                if (BooleanProperty.FalseStrings.indexOf(str) > -1)
                    return false;
            }
            return _super.prototype.convertValue.call(this, value, format);
        };
        BooleanProperty.TrueStrings = ["true", "1", "yes", "y"];
        BooleanProperty.FalseStrings = ["false", "0", "no", "n"];
        return BooleanProperty;
    })(xomega.DataProperty);
    xomega.BooleanProperty = BooleanProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var DecimalProperty = (function (_super) {
        __extends(DecimalProperty, _super);
        function DecimalProperty() {
            _super.call(this);
            this.Validators.push(DecimalProperty.validateNumber, DecimalProperty.validateMinimum, DecimalProperty.validateMaximum);
        }
        DecimalProperty.prototype.convertValue = function (value, fmt) {
            if (xomega.DataProperty.isTypedFormat(fmt)) {
                if (typeof value === 'number')
                    return value;
                if (this.isValueNull(value, fmt))
                    return null;
                return isNaN(value) ? value : parseFloat('' + value);
            }
            if (fmt == 3 /* DisplayString */ && typeof value === 'number' && !this.isValueNull(value, fmt)) {
                var s = this.FractionDigits ? value.toFixed(this.FractionDigits) : value;
                if (this.DisplayFormat)
                    s = xomega.format(this.DisplayFormat, s);
                return s;
            }
            return _super.prototype.convertValue.call(this, value, fmt);
        };
        DecimalProperty.validateNumber = function (dp, value) {
            if (dp != null && !dp.isValueNull(value, 0 /* Internal */) && typeof value !== 'number')
                dp.ValidationErrors.addError("{0} must be a number.", dp);
        };
        DecimalProperty.validateMinimum = function (dp, value) {
            if (dp.MinimumValue && (typeof value === 'number') && value < dp.MinimumValue)
                dp.ValidationErrors.addError("{0} cannot be less than {1}.", dp, dp.MinimumValue);
        };
        DecimalProperty.validateMaximum = function (dp, value) {
            if (dp.MaximumValue && (typeof value === 'number') && value > dp.MaximumValue)
                dp.ValidationErrors.addError("{0} cannot be greater than {1}.", dp, dp.MaximumValue);
        };
        return DecimalProperty;
    })(xomega.DataProperty);
    xomega.DecimalProperty = DecimalProperty;
    var PositiveDecimalProperty = (function (_super) {
        __extends(PositiveDecimalProperty, _super);
        function PositiveDecimalProperty() {
            _super.call(this);
            this.MinimumValue = 0;
        }
        return PositiveDecimalProperty;
    })(DecimalProperty);
    xomega.PositiveDecimalProperty = PositiveDecimalProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var MoneyProperty = (function (_super) {
        __extends(MoneyProperty, _super);
        function MoneyProperty() {
            _super.call(this);
            this.FractionDigits = 2;
            this.DisplayFormat = MoneyProperty.DefaultMoneyFormat;
        }
        MoneyProperty.DefaultMoneyFormat = "${0}";
        return MoneyProperty;
    })(xomega.DecimalProperty);
    xomega.MoneyProperty = MoneyProperty;
    var PositiveMoneyProperty = (function (_super) {
        __extends(PositiveMoneyProperty, _super);
        function PositiveMoneyProperty() {
            _super.call(this);
            this.MinimumValue = 0;
        }
        return PositiveMoneyProperty;
    })(MoneyProperty);
    xomega.PositiveMoneyProperty = PositiveMoneyProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var IntegerProperty = (function (_super) {
        __extends(IntegerProperty, _super);
        function IntegerProperty() {
            _super.call(this);
        }
        IntegerProperty.prototype.convertValue = function (value, fmt) {
            if (xomega.DataProperty.isTypedFormat(fmt)) {
                if (typeof value === 'number')
                    return value;
                if (this.isValueNull(value, fmt))
                    return null;
                return isNaN(value) ? value : parseInt('' + value);
            }
            return _super.prototype.convertValue.call(this, value, fmt);
        };
        return IntegerProperty;
    })(xomega.DecimalProperty);
    xomega.IntegerProperty = IntegerProperty;
    var PositiveIntegerProperty = (function (_super) {
        __extends(PositiveIntegerProperty, _super);
        function PositiveIntegerProperty() {
            _super.call(this);
            this.MinimumValue = 0;
        }
        return PositiveIntegerProperty;
    })(IntegerProperty);
    xomega.PositiveIntegerProperty = PositiveIntegerProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var DateTimeProperty = (function (_super) {
        __extends(DateTimeProperty, _super);
        function DateTimeProperty() {
            _super.call(this);
            this.valueType = "date/time";
            this.Validators.push(DateTimeProperty.validateDateTime);
            this.FormatOptions = $.extend(DateTimeProperty.DefaultFormatOptions);
            this.EditFormat = DateTimeProperty.DefaultEditFormat;
        }
        DateTimeProperty.prototype.convertValue = function (value, fmt) {
            if (fmt === 0 /* Internal */) {
                if (value instanceof Date)
                    return value;
                if (moment.isMoment(value))
                    return value.toDate();
                if (this.isValueNull(value, fmt))
                    return null;
                var m = moment(value, DateTimeProperty.JsonFormat, true);
                if (!m.isValid()) {
                    m = moment(value, this.EditFormat);
                    if (!m.isValid())
                        return value;
                }
                if (m.year() < 100) {
                    var baseYear = ((moment().year() / 100) | 0) * 100;
                    if (m.year() >= 50)
                        baseYear = baseYear - 100;
                    m.year(m.year() + baseYear);
                }
                return m.toDate();
            }
            if (fmt === 1 /* Transport */) {
                var str = JSON.stringify(value).replace(/^"/, "").replace(/"$/, "");
                return str;
            }
            if (xomega.DataProperty.isStringFormat(fmt) && value instanceof Date && !this.isValueNull(value, fmt)) {
                if (fmt === 2 /* EditString */)
                    return moment(value).format(this.EditFormat);
                if (!this.Format) {
                    var dtFmt = new Intl.DateTimeFormat([], this.FormatOptions);
                    this.Format = dtFmt;
                }
                return this.Format.format(value);
            }
            return _super.prototype.convertValue.call(this, value, fmt);
        };
        DateTimeProperty.validateDateTime = function (dp, value) {
            if (dp != null && !dp.isValueNull(value, 0 /* Internal */) && !(value instanceof Date))
                dp.ValidationErrors.addError("{0} has an invalid " + dp.valueType + ": {1}. Please use the correct format, e.g. {2}.", dp, value, dp.convertValue(new Date(), 2 /* EditString */));
        };
        DateTimeProperty.DefaultEditFormat = 'YYYY-MM-DD HH:mm';
        DateTimeProperty.DefaultFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour12: false,
            hour: '2-digit',
            minute: 'numeric'
        };
        DateTimeProperty.JsonFormat = ['YYYY-MM-DDTHH:mm:ss.SSS', 'YYYY-MM-DDTHH:mm:ss'];
        return DateTimeProperty;
    })(xomega.DataProperty);
    xomega.DateTimeProperty = DateTimeProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var DateProperty = (function (_super) {
        __extends(DateProperty, _super);
        function DateProperty() {
            _super.call(this);
            this.valueType = "date";
            this.FormatOptions = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour12: false,
            };
            this.EditFormat = DateProperty.DefaultEditFormat;
        }
        DateProperty.prototype.convertValue = function (value, fmt) {
            if (xomega.DataProperty.isTypedFormat(fmt)) {
                var dt = _super.prototype.convertValue.call(this, value, fmt);
                if (dt instanceof Date) {
                    dt.setHours(0);
                    dt.setMinutes(0);
                    dt.setSeconds(0);
                    dt.setMilliseconds(0);
                }
                return dt;
            }
            return _super.prototype.convertValue.call(this, value, fmt);
        };
        DateProperty.DefaultEditFormat = 'YYYY-MM-DD';
        return DateProperty;
    })(xomega.DateTimeProperty);
    xomega.DateProperty = DateProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    var TimeProperty = (function (_super) {
        __extends(TimeProperty, _super);
        function TimeProperty() {
            _super.call(this);
            this.MinutesCentric = false;
            this.valueType = "time";
            this.FormatOptions = {
                hour12: false,
                hour: '2-digit',
                minute: 'numeric'
            };
            this.EditFormat = TimeProperty.DefaultEditFormat;
        }
        TimeProperty.prototype.convertValue = function (value, fmt) {
            if (fmt === 0 /* Internal */) {
                var dt = new Date(0, 0, 0, 0, 0, 0, 0);
                var s = ('' + value).trim();
                var i = parseInt(s);
                var valid = true;
                if (/^\d+$/.test(s) && i >= 0) {
                    if (s.length == 4) {
                        i = parseInt(s.substr(0, 2));
                        if (i < 24)
                            dt.setHours(i);
                        else
                            valid = false;
                        i = parseInt(s.substr(2));
                        if (i < 59)
                            dt.setMinutes(i);
                        else
                            valid = false;
                    }
                    else if (i > 23 && i < 60 || i < 24 && this.MinutesCentric)
                        dt.setMinutes(i);
                    else if (i < 24)
                        dt.setHours(i);
                    else
                        valid = false;
                }
                else {
                    var m = moment(s, TimeProperty.JsonFormat, true);
                    if (m.isValid())
                        dt = m.toDate();
                    else
                        dt = _super.prototype.convertValue.call(this, value, fmt);
                    valid = dt instanceof Date;
                }
                return valid ? dt : value;
            }
            if (fmt === 1 /* Transport */) {
                var str = value instanceof Date ? moment(value).format(TimeProperty.JsonFormat[0]) : value;
                return str;
            }
            return _super.prototype.convertValue.call(this, value, fmt);
        };
        TimeProperty.DefaultEditFormat = 'HH:mm';
        TimeProperty.JsonFormat = ['HH:mm:ss.SSS', 'HH:mm:ss'];
        return TimeProperty;
    })(xomega.DateTimeProperty);
    xomega.TimeProperty = TimeProperty;
})(xomega || (xomega = {}));
var xomega;
(function (xomega) {
    function init(knockout, jQuery, momentjs) {
        ko = knockout;
        $ = jQuery;
        moment = momentjs;
        xomega.Bindings.init();
    }
    xomega.init = init;
})(xomega || (xomega = {}));
if (typeof module === "object" && module.exports) {
    module.exports = xomega;
}
else if (typeof define === "function" && define['amd']) {
    define(["knockout", "jquery", "moment"], function (knockout, jquery, momentjs) {
        xomega.init(knockout, jquery, momentjs);
        return xomega;
    });
}
