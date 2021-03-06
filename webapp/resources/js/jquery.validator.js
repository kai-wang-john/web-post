/*! nice Validator 0.6.6
 * (c) 2012-2013 Jony Zhang <zj86@live.cn>, MIT Licensed
 * http://niceue.com/validator/
 */
!function (e, t) {
    "use strict";
    function i(s, a) {
        var l, u, o = this;
        return!o instanceof i ? new i(s, a) : (D(a) && (a = {valid: a}), a = a || {}, u = U(s, "data-" + h + "-option"), u = u && "{" === u.charAt(0) ? Function("return " + u)() : {}, l = X[a.theme || u.theme || B.theme], o.options = e.extend({}, B, l, u, a), o.$el = e(s), o.rules = new r(o.options.rules, !0), o.messages = new n(o.options.messages, !0), o.elements = {}, o.fields = {}, o.deferred = {}, o.errors = {}, o._init(), t)
    }

    function r(e, t) {
        var i = t ? t === !0 ? this : t : r.prototype;
        if (W(e))for (var n in e)i[n] = s(e[n])
    }

    function n(e, t) {
        var i = t ? t === !0 ? this : t : n.prototype;
        if (W(e))for (var r in e) {
            if (!e[r])return;
            i[r] = e[r]
        }
    }

    function s(t) {
        switch (e.type(t)) {
            case"function":
                return t;
            case"array":
                return function (e) {
                    return t[0].test(e.value) || t[1] || !1
                };
            case"regexp":
                return function (e) {
                    return t.test(e.value)
                }
        }
    }

    function a(t) {
        var i = "";
        return e.map(t.split(" "), function (e) {
            i += "," + ("#" === e.charAt(0) ? e : '[name="' + e + '"]')
        }), i.substring(1)
    }

    function l(t) {
        var i;
        if (t && t.tagName) {
            switch (t.tagName) {
                case"INPUT":
                case"SELECT":
                case"TEXTAREA":
                case"BUTTON":
                case"FIELDSET":
                    i = t.form || e(t).closest(".n-" + h);
                    break;
                case"FORM":
                    i = t;
                    break;
                default:
                    i = e(t).closest(".n-" + h)
            }
            return e(i).data(h) || e(i)[h]().data(h)
        }
    }

    function u(t, i) {
        if (t.form && null === U(t.form, T)) {
            var r = l(t);
            r ? (r._parse(t), e(t).trigger(i)) : U(t, O, null)
        }
    }

    function o(i, r) {
        var n = e.trim(U(i, O + "-" + r));
        if (n)return n = Function("return " + n)(), n ? s(n) : t
    }

    function d(e, t, i) {
        var r = t.msg;
        return W(r) && i && (r = r[i]), L(r) || (r = U(e, "data-msg-" + i) || U(e, "data-msg") || ""), r
    }

    function f(e) {
        var t;
        return e && (t = S.exec(e)), t ? t[1] : ""
    }

    function c(e) {
        return"INPUT" === e.tagName && "checkbox" === e.type || "radio" === e.type
    }

    function g(e) {
        return Date.parse(e.replace(/\.|\-/g, "/"))
    }

    var p, h = "validator", m = "n-ok", v = "n-error", y = "n-tip", b = "n-loading", k = "n-valid", _ = "n-invalid", w = "msg-box", M = "aria-invalid", O = "data-rule", x = "data-target", $ = "data-tip", A = "data-inputstatus", T = "novalidate", V = ":verifiable", C = /(\w+)(?:\[(.*)\]$|\((.*)\)$)?/, F = /(?:([^:;\(\[]*):)?(.*)/, R = /[^\x00-\xff]/g, S = /^.*(top|right|bottom|left).*$/, N = /(?:(post|get):)?(.+)/i, E = /<|>/g, q = e.noop, j = e.proxy, D = e.isFunction, I = e.isArray, L = function (e) {
        return"string" == typeof e
    }, W = function (e) {
        return e && "[object Object]" === Object.prototype.toString.call(e)
    }, P = !window.XMLHttpRequest, U = function (e, i, r) {
        return r === t ? e.getAttribute(i) : (null === r ? e.removeAttribute(i) : e.setAttribute(i, "" + r), t)
    }, H = window.console || {log: q, info: q}, B = {debug: 0, timely: 1, theme: "default", stopOnError: !1, ignore: "", msgWrapper: "span", msgMaker: function (e) {
        var t, i = {error: v, ok: m, tip: y, loading: b}[e.type];
        return t = '<span class="msg-wrap ' + i + '" role="alert">', t += (e.arrow || "") + (e.icon || "") + '<span class="n-msg">' + e.msg + "</span>", t += "</span>"
    }, msgIcon: '<span class="n-icon"></span>', msgArrow: "", msgClass: "", defaultMsg: "{0} is not valid.", loadingMsg: "Validating..."}, X = {"default": {formClass: "n-default", msgClass: "n-right", showOk: ""}};
    e.fn[h] = function (t) {
        var r = this, n = arguments;
        return r.is(":input") ? r : (!r.is("form") && (r = this.find("form")), !r.length && (r = this), r.each(function () {
            if (L(t)) {
                if ("_" === t.charAt(0))return;
                var r = e(this).data(h);
                r && r[t].apply(r, Array.prototype.slice.call(n, 1))
            } else new i(this, t)
        }), this)
    }, e.fn.isValid = function (e, i) {
        var r, n, s = l(this[0]);
        return s ? (i === t && (i = !0), s.checkOnly = i, r = this.is(":input") ? this : this.find(V), n = s._multiValidate(r, function (t) {
            D(e) && e.call(null, t), s.checkOnly = !1
        }), D(e) ? this : n) : !0
    }, e.expr[":"].verifiable = function (e) {
        var t = e.nodeName.toLowerCase();
        return("input" === t && "submit" !== e.type && "button" !== e.type && "reset" !== e.type || "select" === t || "textarea" === t) && e.disabled === !1 && null === U(e, T)
    }, i.prototype = {_init: function () {
        var t = this, i = t.options, r = t.fields, n = t.$el[0];
        if (W(i.fields) && e.each(i.fields, function (e, t) {
            t && (r[e] = L(t) ? {rule: t} : t)
        }), I(i.groups) && e.map(i.groups, function (i) {
            if (!L(i.fields) || !D(i.callback))return null;
            var n = t.$el.find(a(i.fields)), s = function () {
                return i.callback.call(t, n)
            };
            e.extend(s, i), e.map(i.fields.split(" "), function (e) {
                r[e] = r[e] || {}, r[e].group = s
            })
        }), t.$el.find(V).each(function () {
            t._parse(this)
        }), t.msgOpt = {type: "error", pos: f(i.msgClass), wrapper: i.msgWrapper, cls: i.msgClass, style: i.msgStyle, icon: i.msgIcon, arrow: i.msgArrow, show: i.msgShow, hide: i.msgHide}, i.valid || null === U(n, "action"))t.isAjaxSubmit = !0; else {
            var s = e[e._data ? "_data" : "data"](n, "events");
            t.isAjaxSubmit = s && s.valid && e.map(s.valid,function (e) {
                return-1 !== e.namespace.indexOf("form") ? 1 : null
            }).length ? !0 : !1
        }
        t.$el.data(h) || (t.$el.on("submit." + h + " validate." + h, j(t, "_submit")).on("reset." + h, j(t, "_reset")).on("showtip." + h, j(t, "_showTip")).on("validated.field." + h, V, j(t, "_validatedField")).on("validated.rule." + h, V, j(t, "_validatedRule")).on("focusin." + h + " click." + h + " showtip." + h, V, j(t, "_focus")).on("focusout." + h + " validate." + h, V, j(t, "_blur")).on("click." + h, "input:radio,input:checkbox", j(t, "_click")), i.timely >= 2 && t.$el.on("keyup." + h + " paste." + h, V, j(t, "_blur")).on("change." + h, "select", j(t, "_click")), t.$el.data(h, t).addClass("n-" + h + " " + i.formClass), t.NOVALIDATE = U(n, T), U(n, T, T))
    }, _multiValidate: function (i, r) {
        var n = this, s = n.options;
        return n.isValid = !0, n.deferred = {}, s.ignore && (i = i.not(s.ignore)), i.each(function (e, i) {
            var r = n.getField(i);
            if (r)return n._validate(i, r), !n.isValid && s.stopOnError ? !1 : t
        }), e.when.apply(null, e.map(n.deferred, function (e) {
            return e
        })).done(function () {
            r.call(n, n.isValid)
        }), e.isEmptyObject(n.deferred) ? n.isValid : t
    }, _submit: function (i, r) {
        var n = this, s = n.options, a = i.target;
        if (p)return p = !1, t;
        if ("only" !== r && ("validate" !== i.type || n.$el[0] === a))return i.preventDefault(), n.submiting ? (D(n.submiting) && n.submiting.call(n), t) : (D(s.beforeSubmit) && s.beforeSubmit.call(n, a) === !1 || (n._reset(), n.submiting = !0, s.debug && H.log("\n" + i.type + " form"), n._multiValidate(n.$el.find(V), function (t) {
            var i, r = "focus.field", l = t || 2 === s.debug ? "valid" : "invalid";
            if (!t) {
                var u = n.$el.find(":input." + _ + ":first");
                u.trigger(r), P && u.trigger(r), i = e.map(n.errors, function (e) {
                    return e
                })
            }
            n.submiting = !1, D(s[l]) && s[l].call(n, a, i), n.$el.trigger(l + ".form", [a, i]), t && !n.isAjaxSubmit && (p = !0, a.submit())
        })), t)
    }, _reset: function (t) {
        var i = this;
        i.errors = {}, t && i.$el.find(V).each(function (t, r) {
            i.hideMsg(r), U(r, A, null), U(r, M, null), e(r).removeClass(k + " " + _)
        })
    }, _focus: function (e) {
        var t, i = e.target;
        if ("showtip" !== e.type) {
            if (e.isTrigger || this.submiting)return;
            if ("" !== i.value && ("false" === U(i, M) || "tip" === U(i, A)))return
        }
        t = U(i, $), t && this.showMsg(i, {msg: t, type: "tip"})
    }, _blur: function (t, i) {
        var r, n, s = this, a = s.options, l = t.target, u = t.type, o = 150;
        if (!i && "paste" !== u) {
            if ("validate" === u)n = !0, o = 0; else {
                if (U(l, "notimely"))return;
                if (a.timely >= 2 && "keyup" !== u)return
            }
            if (a.ignore && e(l).is(a.ignore))return;
            if ("keyup" === u) {
                var d = t.keyCode, f = {8: 1, 9: 1, 16: 1, 32: 1, 46: 1};
                if (9 === d && !l.value)return;
                if (48 > d && !f[d])return;
                o = a.timely >= 100 ? a.timely : 500
            }
        }
        r = s.getField(l), r && (o ? (r.timeout && clearTimeout(r.timeout), r.timeout = setTimeout(function () {
            s._validate(l, r, n)
        }, o)) : s._validate(l, r, n))
    }, _click: function (e) {
        this._blur(e, !0)
    }, _showTip: function (e) {
        var t = this;
        t.$el[0] === e.target && t.$el.find(V + "[" + $ + "]").each(function () {
            t.showMsg(this, {msg: U(this, $), type: "tip"})
        })
    }, _parse: function (e) {
        var t, i = this, r = e.name, n = U(e, O);
        n && U(e, O, null), (e.id && "#" + e.id in i.fields || !e.name) && (r = "#" + e.id), r && (t = i.fields[r] || {}, t.old = {}, t.rule = t.rule || n || "", t.rule && (t.key = r, t.required = -1 !== t.rule.indexOf("required"), t.must = t.must || !!t.rule.match(/match|checked/), t.required && U(e, "aria-required", !0), ("timely"in t && !t.timely || !i.options.timely) && U(e, "notimely", !0), L(t.target) && U(e, x, t.target), L(t.tip) && U(e, $, t.tip), i.fields[r] = i._parseRule(t)))
    }, _parseRule: function (i) {
        var r, n = F.exec(i.rule);
        if (n)return i.display = n[1], i.rules = [], r = (n[2] || "").split(";"), e.map(r, function (r) {
            var n = C.exec(r);
            return n ? (n[3] && (n[2] = n[3]), i.rules.push({method: n[1], params: n[2] ? e.trim(n[2]).split(", ") : t}), t) : null
        }), i.vid = 0, i.rid = i.rules[0].method, i
    }, _validatedField: function (t, i, r) {
        var n = this, s = n.options, a = t.target, l = r.isValid = i.isValid = !!r.isValid, u = l ? "valid" : "invalid";
        r.key = i.key, r.rule = i.rid, l ? r.type = "ok" : (n.submiting && (n.errors[i.key] = r.msg), n.isValid = !1), i.old.value = a.value, i.old.id = a.id, n.elements[i.key] = a, n.checkOnly || (D(i[u]) && i[u].call(n, a, r), e(a).attr(M, !l).addClass(l ? k : _).removeClass(l ? _ : k).trigger(u + ".field", [r, n]), (i.msgMaker || s.msgMaker) && (!r.showOk && r.msg || r.showOk && s.showOk !== !1 ? n.showMsg(a, r, i) : n.hideMsg(a, r, i)))
    }, _validatedRule: function (i, r, n, s) {
        var a, l = this, u = l.options, o = i.target, f = "", c = !1, g = !1;
        if (s = s || {}, r = r || l.getField(o), a = r.rid, null === n ? e(o).trigger("validated.field", [r, {isValid: !0}]) : n === !0 || n === t ? c = !0 : (f = d(o, r, a), f || (L(n) ? (f = n, n = {error: f}) : W(n) && (n.error ? f = n.error : (c = !0, n.ok && L(n.ok) && (g = !0), f = n.ok))), s.msg = (c ? f : f || l.messages[a] || B.defaultMsg).replace("{0}", r.display || "")), u.debug && H.log("   " + r.vid + ": " + a + " => " + (s.msg || !0)), c) {
            if (s.isValid = !0, !g) {
                var p = r.ok || U(o, "data-ok");
                p ? (g = !0, s.msg = p) : L(u.showOk) && (g = !0, s.msg = u.showOk)
            }
            s.showOk = g, e(o).trigger("valid.rule", [a, s.msg])
        } else e(o).trigger("invalid.rule", [a, s.msg]);
        c && r.vid < r.rules.length - 1 ? (r.vid++, l._checkRule(o, r)) : (r.vid = 0, e(o).trigger("validated.field", [r, s]))
    }, _checkRule: function (i, r) {
        var n, s, a = this, l = r.key, u = r.rules[r.vid], d = u.method, f = u.params;
        if (!a.submiting || !a.deferred[l])if (s = r.old, r.rid = d, n = !r.must && s.ret !== t && s.rule === u && s.id === i.id && i.value && s.value === i.value ? s.ret : (o(i, d) || a.rules[d] || function () {
            return!0
        }).call(a, i, f, r), W(n) && D(n.then)) {
            var c = function (e) {
                return L(e) || W(e) && ("error"in e || "ok"in e) ? e : t
            };
            a.deferred[l] = n, !a.checkOnly && a.showMsg(i, {type: "loading", msg: a.options.loadingMsg}, r), n.then(function (n, l, o) {
                var d, f = o.responseText, g = r.dataFilter || a.options.dataFilter;
                "json" === this.dataType ? f = n : "{" === f.charAt(0) && (f = e.parseJSON(f) || {}), D(g) ? f = g(f) : "" === f ? f = !0 : (d = c(f), d === t && (d = c(f.data)), f = d || !0), s.rule = u, s.ret = f, e(i).trigger("validated.rule", [r, f])
            }, function (t, n) {
                e(i).trigger("validated.rule", [r, n])
            }), r.isValid = t
        } else e(i).trigger("validated.rule", [r, n])
    }, _validate: function (i, r) {
        if (!i.disabled && null === U(i, T)) {
            r.rules || this._parse(i);
            var n, s = this, a = s.options, l = e(i), u = {}, o = r.group, d = r.isValid = !0;
            if (a.debug && H.info(r.key), o && (n = o.call(s), n === !0 || n === t ? n = t : (L(n) && (n = {error: n}), r.vid = 0, r.rid = "group", d = !1, s.hideMsg(i, {}, r), e.extend(u, o))), d && !r.required && !r.must && !i.value) {
                if ("tip" === U(i, A))return;
                if (!c(i))return l.trigger("validated.field", [r, {isValid: !0}]), t
            }
            n !== t ? l.trigger("validated.rule", [r, n, u]) : r.rule && s._checkRule(i, r)
        }
    }, _getMsgOpt: function (t) {
        return e.extend({}, this.msgOpt, L(t) ? {msg: t} : t)
    }, getField: function (e) {
        var t, i = this;
        return t = e.id && "#" + e.id in i.fields || !e.name ? "#" + e.id : e.name, U(e, O) && i._parse(e), i.fields[t]
    }, test: function (i, r) {
        var n, s, a, l = this, u = C.exec(r);
        return u ? (u[3] && (u[2] = u[3]), s = u[1], a = u[2] ? e.trim(u[2]).split(", ") : t, s in l.rules && (n = l.rules[s].call(l, i, a)), n === !0 || n === t || null === n || !1) : !0
    }, getRangeMsg: function (e, t, i, r) {
        if (t) {
            var n = this, s = n.messages[i] || "", a = t[0].split("~"), l = a[0], u = a[1], o = "rg", d = [""], f = +e === +e;
            if (2 === a.length) {
                if (l && u) {
                    if (f && e >= +l && +u >= e)return!0;
                    d = d.concat(a)
                } else if (l && !u) {
                    if (f && e >= +l)return!0;
                    d.push(l), o = "gt"
                } else if (!l && u) {
                    if (f && +u >= e)return!0;
                    d.push(u), o = "lt"
                }
            } else {
                if (e === +l)return!0;
                d.push(l), o = "eq"
            }
            return s && (r && s[o + r] && (o += r), d[0] = s[o]), n.renderMsg.apply(null, d)
        }
    }, renderMsg: function () {
        var e = arguments, t = e[0], i = e.length;
        if (t) {
            for (; --i;)t = t.replace("{" + i + "}", e[i]);
            return t
        }
    }, _getMsgDOM: function (t, i) {
        var r, n, s, a = e(t);
        if (a.is(":input") ? (s = i.target || U(t, x), s && (s = this.$el.find(s), s.length && (s.is(":input") ? t = s.get(0) : r = s)), r || (n = !c(t) && t.id ? t.id : t.name, r = this.$el.find(i.wrapper + "." + w + '[for="' + n + '"]'))) : r = a, !r.length)if (a = this.$el.find(s || t), r = e("<" + i.wrapper + ">").attr({"class": w + (i.cls ? " " + i.cls : ""), style: i.style || "", "for": n}), c(t)) {
            var l = a.parent();
            r.appendTo(l.is("label") ? l.parent() : l)
        } else r[i.pos && "right" !== i.pos ? "insertBefore" : "insertAfter"](a);
        return r
    }, showMsg: function (t, i, r) {
        if (i = this._getMsgOpt(i), i.msg || i.showOk) {
            t = e(t).get(0), e(t).is(V) && (U(t, A, i.type), r = r || this.getField(t), r && (r.msgStyle && (i.style = r.msgStyle), r.msgClass && (i.cls = r.msgClass), r.msgWrapper && (i.wrapper = r.msgWrapper)));
            var n = this._getMsgDOM(t, i), s = n[0].className;
            !S.test(s) && n.addClass(i.cls), P && "bottom" === i.pos && (n[0].style.marginTop = e(t).outerHeight() + "px"), n.html(((r || {}).msgMaker || this.options.msgMaker).call(this, i)), n[0].style.display = "", D(i.show) && i.show.call(this, n, i.type)
        }
    }, hideMsg: function (t, i, r) {
        t = e(t).get(0), i = this._getMsgOpt(i), e(t).is(V) && (r = r || this.getField(t), r && r.msgWrapper && (i.wrapper = r.msgWrapper));
        var n = this._getMsgDOM(t, i);
        n.length && (D(i.hide) ? i.hide.call(this, n, i.type) : n[0].style.display = "none")
    }, mapMsg: function (t) {
        var i = this;
        e.each(t, function (e, t) {
            var r = i.elements[e] || i.$el.find(':input[name="' + e + '"]')[0];
            i.showMsg(r, t)
        })
    }, setMsg: function (e) {
        new n(e, this.messages)
    }, setRule: function (t) {
        new r(t, this.rules), e.map(this.fields, function (e) {
            e.old = {}
        })
    }, setField: function (i, r) {
        var n = this, s = {};
        if (L(i)) {
            if (null === r)return e.map(i.split(" "), function (e) {
                e && n.fields[e] && (n.fields[e] = null)
            }), t;
            r && (s[i] = r)
        } else W(i) && (s = i);
        n.options.fields ? e.extend(n.options.fields, s) : n.options.fields = s, n._init()
    }, holdSubmit: function (e) {
        e === t && (e = !0), this.submiting = e
    }, destroy: function () {
        this._reset(!0), this.$el.off("." + h).removeData(h), U(this.$el[0], T, this.NOVALIDATE)
    }}, e(document).on("focusin", ":input[" + O + "]",function () {
        u(this, "focusin")
    }).on("click", "input,button",function () {
        if (this.form)if ("submit" === this.type)null !== U(this, T) && (p = !0); else if (this.name && c(this)) {
            var e = this.form.elements[this.name];
            e.length && (e = e[0]), U(e, O) && u(e, "validate")
        }
    }).on("submit", "form", function (t) {
        if (null === U(this, T)) {
            var i, r = e(this);
            r.data(h) || (i = r[h]().data(h), e.isEmptyObject(i.fields) ? (U(this, T, T), r.off("." + h).removeData(h)) : "submit" === t.type && i._submit(t))
        }
    }), new r({required: function (t, i) {
        var r = e.trim(t.value), n = !0;
        if (i)if (1 === i.length) {
            if (!r && !this.test(t, i[0]))return null
        } else"not" === i[0] && e.map(i.slice(1), function (t) {
            r === e.trim(t) && (n = !1)
        });
        return n && !!r
    }, integer: function (e, t) {
        var i, r = "0|", n = "[1-9]\\d*", s = t ? t[0] : "*";
        switch (s) {
            case"+":
                i = n;
                break;
            case"-":
                i = "-" + n;
                break;
            case"+0":
                i = r + n;
                break;
            case"-0":
                i = r + "-" + n;
                break;
            default:
                i = r + "-?" + n
        }
        return i = "^(?:" + i + ")$", RegExp(i).test(e.value) || this.messages.integer[s]
    }, match: function (t, i, r) {
        if (i) {
            var n, s, a, l, u, o, d, f = "eq";
            if (1 === i.length ? a = i[0] : (f = i[0], a = i[1]), u = "#" === a.charAt(0) ? a : ':input[name="' + a + '"]', o = this.$el.find(u)[0]) {
                if (d = this.getField(o), n = t.value, s = o.value, r.init_match || (this.$el.on("valid.field." + h, u, function () {
                    e(t).trigger("validate")
                }), r.init_match = d.init_match = 1), !r.required && "" === n && "" === s)return null;
                if (i[2] && ("date" === i[2] ? (n = g(n), s = g(s)) : "time" === i[2] && (n = +n.replace(":", ""), s = +s.replace(":", ""))), "eq" !== f && !isNaN(+n) && isNaN(+s))return!0;
                switch (l = this.messages.match[f].replace("{1}", d.display || a), f) {
                    case"lt":
                        return+s > +n || l;
                    case"lte":
                        return+s >= +n || l;
                    case"gte":
                        return+n >= +s || l;
                    case"gt":
                        return+n > +s || l;
                    case"neq":
                        return n !== s || l;
                    default:
                        return n === s || l
                }
            }
        }
    }, range: function (e, t) {
        return this.getRangeMsg(+e.value, t, "range")
    }, checked: function (t, i, r) {
        if (c(t)) {
            var n, s;
            return s = this.$el.find('input[name="' + t.name + '"]').filter(function () {
                return!n && c(this) && (n = this), !this.disabled && this.checked && e(this).is(":visible")
            }).length, i ? this.getRangeMsg(s, i, "checked") : !!s || d(n, r, "checked") || this.messages.required
        }
    }, length: function (e, t) {
        var i = e.value, r = (t[1] ? i.replace(R, "xx") : i).length;
        return t && "~" === t[0].charAt(0) && (t[0] = "0" + t[0]), this.getRangeMsg(r, t, "length", t[1] ? "_2" : "")
    }, remote: function (t, i) {
        if (i) {
            var r, n = this, s = N.exec(i[0]), a = s[2], l = (s[1] || "POST").toUpperCase(), u = {};
            return u[t.name] = t.value, i[1] && e.map(i.slice(1), function (t) {
                u[e.trim(t)] = n.$el.find(':input[name="' + t + '"]').val()
            }), u = e.param(u), "POST" === l && (r = a.indexOf("?"), -1 !== r && (u += "&" + a.substring(r + 1, a.length), a = a.substring(0, r))), e.ajax({url: a, type: l, data: u, async: !0, cache: !1})
        }
    }, filter: function (e, t) {
        e.value = e.value.replace(t ? RegExp("[" + t[0] + "]", "g") : E, "")
    }}), i.config = function (t) {
        e.each(t, function (e, t) {
            "rules" === e ? new r(t) : "messages" === e ? new n(t) : B[e] = t
        })
    }, i.setTheme = function (t, i) {
        W(t) ? e.each(t, function (e, t) {
            X[e] = t
        }) : L(t) && W(i) && (X[t] = i)
    }, e[h] = i
}(jQuery);
