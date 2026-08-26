//#region \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), t = /* @__PURE__ */ e(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, T());
			else {
				var t = n(l);
				t !== null && ae(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, ee = -1;
	function te() {
		return g ? !0 : !(e.unstable_now() - ee < w);
	}
	function ne() {
		if (g = !1, S) {
			var t = e.unstable_now();
			ee = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && te());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ae(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
				}
			} finally {
				i ? T() : S = !1;
			}
		}
	}
	var T;
	if (typeof y == "function") T = function() {
		y(ne);
	};
	else if (typeof MessageChannel < "u") {
		var re = new MessageChannel(), ie = re.port2;
		re.port1.onmessage = ne, T = function() {
			ie.postMessage(null);
		};
	} else T = function() {
		_(ne, 0);
	};
	function ae(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, ae(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, T()))), r;
	}, e.unstable_shouldYield = te, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), n = /* @__PURE__ */ e(((e, n) => {
	n.exports = t();
})), r = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ee = Object.prototype.hasOwnProperty;
	function te(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ne(e, t) {
		return te(e.type, t, e.props);
	}
	function T(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function re(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ie = /\/+/g;
	function ae(e, t) {
		return typeof e == "object" && e && e.key != null ? re("" + e.key) : t.toString(36);
	}
	function oe(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function se(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, se(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ae(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(ie, "$&/") + "/"), se(o, r, i, "", function(e) {
			return e;
		})) : o != null && (T(o) && (o = ne(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ie, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ae(a, u), c += se(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ae(a, u++), c += se(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return se(oe(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ce(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return se(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function le(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var E = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, D = {
		map: ce,
		forEach: function(e, t, n) {
			ce(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ce(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ce(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!T(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = D, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ee.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return te(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ee.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return te(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = T, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: le
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, E);
		} catch (e) {
			E(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.8";
})), i = /* @__PURE__ */ e(((e, t) => {
	t.exports = r();
})), a = /* @__PURE__ */ e(((e) => {
	var t = i();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var a = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, o = Symbol.for("react.portal");
	function s(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: o,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function l(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return s(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = c.T, n = a.p;
		try {
			if (c.T = null, a.p = 2, e) return e();
		} finally {
			c.T = t, a.p = n, a.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, a.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && a.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin), i = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? a.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: i,
				fetchPriority: o
			}) : n === "script" && a.d.X(e, {
				crossOrigin: r,
				integrity: i,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = l(t.as, t.crossOrigin);
					a.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0
					});
				}
			} else t ?? a.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin);
			a.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = l(t.as, t.crossOrigin);
				a.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0
				});
			} else a.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		a.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return c.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return c.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), o = /* @__PURE__ */ e(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = a();
})), s = /* @__PURE__ */ e(((e) => {
	var t = n(), r = i(), a = o();
	function s(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function c(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function l(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function u(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function d(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function f(e) {
		if (l(e) !== e) throw Error(s(188));
	}
	function p(e) {
		var t = e.alternate;
		if (!t) {
			if (t = l(e), t === null) throw Error(s(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var i = n.return;
			if (i === null) break;
			var a = i.alternate;
			if (a === null) {
				if (r = i.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (i.child === a.child) {
				for (a = i.child; a;) {
					if (a === n) return f(i), e;
					if (a === r) return f(i), t;
					a = a.sibling;
				}
				throw Error(s(188));
			}
			if (n.return !== r.return) n = i, r = a;
			else {
				for (var o = !1, c = i.child; c;) {
					if (c === n) {
						o = !0, n = i, r = a;
						break;
					}
					if (c === r) {
						o = !0, r = i, n = a;
						break;
					}
					c = c.sibling;
				}
				if (!o) {
					for (c = a.child; c;) {
						if (c === n) {
							o = !0, n = a, r = i;
							break;
						}
						if (c === r) {
							o = !0, r = a, n = i;
							break;
						}
						c = c.sibling;
					}
					if (!o) throw Error(s(189));
				}
			}
			if (n.alternate !== r) throw Error(s(190));
		}
		if (n.tag !== 3) throw Error(s(188));
		return n.stateNode.current === n ? e : t;
	}
	function m(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = m(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), re = Symbol.for("react.activity"), ie = Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
	function oe(e) {
		return typeof e != "object" || !e ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var se = Symbol.for("react.client.reference");
	function ce(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === se ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ee: return "Suspense";
			case te: return "SuspenseList";
			case re: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ne: return t = e.displayName || null, t === null ? ce(e.type) || "Memo" : t;
			case T:
				t = e._payload, e = e._init;
				try {
					return ce(e(t));
				} catch {}
		}
		return null;
	}
	var le = Array.isArray, E = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ue = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, de = [], fe = -1;
	function pe(e) {
		return { current: e };
	}
	function O(e) {
		0 > fe || (e.current = de[fe], de[fe] = null, fe--);
	}
	function k(e, t) {
		fe++, de[fe] = e.current, e.current = t;
	}
	var me = pe(null), he = pe(null), A = pe(null), ge = pe(null);
	function _e(e, t) {
		switch (k(A, t), k(he, e), k(me, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		O(me), k(me, e);
	}
	function ve() {
		O(me), O(he), O(A);
	}
	function ye(e) {
		e.memoizedState !== null && k(ge, e);
		var t = me.current, n = Hd(t, e.type);
		t !== n && (k(he, e), k(me, n));
	}
	function be(e) {
		he.current === e && (O(me), O(he)), ge.current === e && (O(ge), Qf._currentValue = ue);
	}
	var xe, Se;
	function Ce(e) {
		if (xe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			xe = t && t[1] || "", Se = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + xe + e + Se;
	}
	var we = !1;
	function Te(e, t) {
		if (!e || we) return "";
		we = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			we = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ce(n) : "";
	}
	function Ee(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ce(e.type);
			case 16: return Ce("Lazy");
			case 13: return e.child !== t && t !== null ? Ce("Suspense Fallback") : Ce("Suspense");
			case 19: return Ce("SuspenseList");
			case 0:
			case 15: return Te(e.type, !1);
			case 11: return Te(e.type.render, !1);
			case 1: return Te(e.type, !0);
			case 31: return Ce("Activity");
			default: return "";
		}
	}
	function De(e) {
		try {
			var t = "", n = null;
			do
				t += Ee(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Oe = Object.prototype.hasOwnProperty, ke = t.unstable_scheduleCallback, Ae = t.unstable_cancelCallback, je = t.unstable_shouldYield, Me = t.unstable_requestPaint, Ne = t.unstable_now, Pe = t.unstable_getCurrentPriorityLevel, Fe = t.unstable_ImmediatePriority, Ie = t.unstable_UserBlockingPriority, Le = t.unstable_NormalPriority, Re = t.unstable_LowPriority, ze = t.unstable_IdlePriority, Be = t.log, Ve = t.unstable_setDisableYieldValue, He = null, Ue = null;
	function We(e) {
		if (typeof Be == "function" && Ve(e), Ue && typeof Ue.setStrictMode == "function") try {
			Ue.setStrictMode(He, e);
		} catch {}
	}
	var Ge = Math.clz32 ? Math.clz32 : Je, Ke = Math.log, qe = Math.LN2;
	function Je(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ke(e) / qe | 0) | 0;
	}
	var Ye = 256, Xe = 262144, Ze = 4194304;
	function Qe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function $e(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Qe(n))) : i = Qe(o) : i = Qe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Qe(n))) : i = Qe(o)) : i = Qe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function et(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function tt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function nt() {
		var e = Ze;
		return Ze <<= 1, !(Ze & 62914560) && (Ze = 4194304), e;
	}
	function rt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function it(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function at(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ge(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ot(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ot(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ge(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function st(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ge(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function ct(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : lt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function lt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function ut(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function dt() {
		var e = D.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function ft(e, t) {
		var n = D.p;
		try {
			return D.p = e, t();
		} finally {
			D.p = n;
		}
	}
	var pt = Math.random().toString(36).slice(2), mt = "__reactFiber$" + pt, ht = "__reactProps$" + pt, gt = "__reactContainer$" + pt, _t = "__reactEvents$" + pt, vt = "__reactListeners$" + pt, yt = "__reactHandles$" + pt, bt = "__reactResources$" + pt, xt = "__reactMarker$" + pt;
	function St(e) {
		delete e[mt], delete e[ht], delete e[_t], delete e[vt], delete e[yt];
	}
	function Ct(e) {
		var t = e[mt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[gt] || n[mt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[mt]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function wt(e) {
		if (e = e[mt] || e[gt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Tt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(s(33));
	}
	function Et(e) {
		var t = e[bt];
		return t ||= e[bt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function j(e) {
		e[xt] = !0;
	}
	var Dt = /* @__PURE__ */ new Set(), Ot = {};
	function kt(e, t) {
		At(e, t), At(e + "Capture", t);
	}
	function At(e, t) {
		for (Ot[e] = t, e = 0; e < t.length; e++) Dt.add(t[e]);
	}
	var jt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Mt = {}, Nt = {};
	function Pt(e) {
		return Oe.call(Nt, e) ? !0 : Oe.call(Mt, e) ? !1 : jt.test(e) ? Nt[e] = !0 : (Mt[e] = !0, !1);
	}
	function Ft(e, t, n) {
		if (Pt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, "" + n);
			}
		}
	}
	function It(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Lt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Rt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function zt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Bt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Vt(e) {
		if (!e._valueTracker) {
			var t = zt(e) ? "checked" : "value";
			e._valueTracker = Bt(e, t, "" + e[t]);
		}
	}
	function Ht(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = zt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Ut(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Wt = /[\n"\\]/g;
	function Gt(e) {
		return e.replace(Wt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Kt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Rt(t)) : e.value !== "" + Rt(t) && (e.value = "" + Rt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Jt(e, o, Rt(n)) : Jt(e, o, Rt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Rt(s) : e.removeAttribute("name");
	}
	function qt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Vt(e);
				return;
			}
			n = n == null ? "" : "" + Rt(n), t = t == null ? n : "" + Rt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Vt(e);
	}
	function Jt(e, t, n) {
		t === "number" && Ut(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Yt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Rt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Xt(e, t, n) {
		if (t != null && (t = "" + Rt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Rt(n);
	}
	function Zt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(s(92));
				if (le(r)) {
					if (1 < r.length) throw Error(s(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Rt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Vt(e);
	}
	function Qt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var $t = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function en(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || $t.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function tn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(s(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var i in t) r = t[i], t.hasOwnProperty(i) && n[i] !== r && en(e, i, r);
		} else for (var a in t) t.hasOwnProperty(a) && en(e, a, t[a]);
	}
	function nn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var rn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), an = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function on(e) {
		return an.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function sn() {}
	var cn = null;
	function ln(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var un = null, dn = null;
	function fn(e) {
		var t = wt(e);
		if (t && (e = t.stateNode)) {
			var n = e[ht] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Kt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Gt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var i = r[ht] || null;
								if (!i) throw Error(s(90));
								Kt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Ht(r);
					}
					break a;
				case "textarea":
					Xt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Yt(e, !!n.multiple, t, !1);
			}
		}
	}
	var pn = !1;
	function mn(e, t, n) {
		if (pn) return e(t, n);
		pn = !0;
		try {
			return e(t);
		} finally {
			if (pn = !1, (un !== null || dn !== null) && (bu(), un && (t = un, e = dn, dn = un = null, fn(t), e))) for (t = 0; t < e.length; t++) fn(e[t]);
		}
	}
	function hn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ht] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(s(231, t, typeof n));
		return n;
	}
	var gn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), _n = !1;
	if (gn) try {
		var vn = {};
		Object.defineProperty(vn, "passive", { get: function() {
			_n = !0;
		} }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn);
	} catch {
		_n = !1;
	}
	var yn = null, bn = null, xn = null;
	function Sn() {
		if (xn) return xn;
		var e, t = bn, n = t.length, r, i = "value" in yn ? yn.value : yn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return xn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Cn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function wn() {
		return !0;
	}
	function Tn() {
		return !1;
	}
	function En(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? wn : Tn, this.isPropagationStopped = Tn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = wn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = wn);
			},
			persist: function() {},
			isPersistent: wn
		}), t;
	}
	var Dn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, On = En(Dn), kn = h({}, Dn, {
		view: 0,
		detail: 0
	}), An = En(kn), jn, Mn, Nn, Pn = h({}, kn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Gn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Nn && (Nn && e.type === "mousemove" ? (jn = e.screenX - Nn.screenX, Mn = e.screenY - Nn.screenY) : Mn = jn = 0, Nn = e), jn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Mn;
		}
	}), Fn = En(Pn), In = En(h({}, Pn, { dataTransfer: 0 })), Ln = En(h({}, kn, { relatedTarget: 0 })), Rn = En(h({}, Dn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), zn = En(h({}, Dn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Bn = En(h({}, Dn, { data: 0 })), Vn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Hn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Un = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Wn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Un[e]) ? !!t[e] : !1;
	}
	function Gn() {
		return Wn;
	}
	var Kn = En(h({}, kn, {
		key: function(e) {
			if (e.key) {
				var t = Vn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Cn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Hn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Gn,
		charCode: function(e) {
			return e.type === "keypress" ? Cn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Cn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), qn = En(h({}, Pn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Jn = En(h({}, kn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Gn
	})), Yn = En(h({}, Dn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Xn = En(h({}, Pn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Zn = En(h({}, Dn, {
		newState: 0,
		oldState: 0
	})), Qn = [
		9,
		13,
		27,
		32
	], $n = gn && "CompositionEvent" in window, er = null;
	gn && "documentMode" in document && (er = document.documentMode);
	var tr = gn && "TextEvent" in window && !er, nr = gn && (!$n || er && 8 < er && 11 >= er), rr = " ", ir = !1;
	function ar(e, t) {
		switch (e) {
			case "keyup": return Qn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function or(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var sr = !1;
	function cr(e, t) {
		switch (e) {
			case "compositionend": return or(t);
			case "keypress": return t.which === 32 ? (ir = !0, rr) : null;
			case "textInput": return e = t.data, e === rr && ir ? null : e;
			default: return null;
		}
	}
	function lr(e, t) {
		if (sr) return e === "compositionend" || !$n && ar(e, t) ? (e = Sn(), xn = bn = yn = null, sr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return nr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var ur = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function dr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!ur[e.type] : t === "textarea";
	}
	function fr(e, t, n, r) {
		un ? dn ? dn.push(r) : dn = [r] : un = r, t = Ed(t, "onChange"), 0 < t.length && (n = new On("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var pr = null, mr = null;
	function hr(e) {
		yd(e, 0);
	}
	function gr(e) {
		if (Ht(Tt(e))) return e;
	}
	function _r(e, t) {
		if (e === "change") return t;
	}
	var vr = !1;
	if (gn) {
		var yr;
		if (gn) {
			var br = "oninput" in document;
			if (!br) {
				var xr = document.createElement("div");
				xr.setAttribute("oninput", "return;"), br = typeof xr.oninput == "function";
			}
			yr = br;
		} else yr = !1;
		vr = yr && (!document.documentMode || 9 < document.documentMode);
	}
	function Sr() {
		pr && (pr.detachEvent("onpropertychange", Cr), mr = pr = null);
	}
	function Cr(e) {
		if (e.propertyName === "value" && gr(mr)) {
			var t = [];
			fr(t, mr, e, ln(e)), mn(hr, t);
		}
	}
	function wr(e, t, n) {
		e === "focusin" ? (Sr(), pr = t, mr = n, pr.attachEvent("onpropertychange", Cr)) : e === "focusout" && Sr();
	}
	function Tr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return gr(mr);
	}
	function Er(e, t) {
		if (e === "click") return gr(t);
	}
	function Dr(e, t) {
		if (e === "input" || e === "change") return gr(t);
	}
	function Or(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var kr = typeof Object.is == "function" ? Object.is : Or;
	function Ar(e, t) {
		if (kr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Oe.call(t, i) || !kr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function jr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Mr(e, t) {
		var n = jr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = jr(n);
		}
	}
	function Nr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Nr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Pr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ut(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ut(e.document);
		}
		return t;
	}
	function Fr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Ir = gn && "documentMode" in document && 11 >= document.documentMode, Lr = null, Rr = null, zr = null, Br = !1;
	function Vr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Br || Lr == null || Lr !== Ut(r) || (r = Lr, "selectionStart" in r && Fr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), zr && Ar(zr, r) || (zr = r, r = Ed(Rr, "onSelect"), 0 < r.length && (t = new On("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Lr)));
	}
	function Hr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Ur = {
		animationend: Hr("Animation", "AnimationEnd"),
		animationiteration: Hr("Animation", "AnimationIteration"),
		animationstart: Hr("Animation", "AnimationStart"),
		transitionrun: Hr("Transition", "TransitionRun"),
		transitionstart: Hr("Transition", "TransitionStart"),
		transitioncancel: Hr("Transition", "TransitionCancel"),
		transitionend: Hr("Transition", "TransitionEnd")
	}, Wr = {}, Gr = {};
	gn && (Gr = document.createElement("div").style, "AnimationEvent" in window || (delete Ur.animationend.animation, delete Ur.animationiteration.animation, delete Ur.animationstart.animation), "TransitionEvent" in window || delete Ur.transitionend.transition);
	function Kr(e) {
		if (Wr[e]) return Wr[e];
		if (!Ur[e]) return e;
		var t = Ur[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Gr) return Wr[e] = t[n];
		return e;
	}
	var qr = Kr("animationend"), Jr = Kr("animationiteration"), Yr = Kr("animationstart"), Xr = Kr("transitionrun"), Zr = Kr("transitionstart"), Qr = Kr("transitioncancel"), $r = Kr("transitionend"), ei = /* @__PURE__ */ new Map(), ti = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ti.push("scrollEnd");
	function ni(e, t) {
		ei.set(e, t), kt(t, [e]);
	}
	var ri = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ii = [], ai = 0, oi = 0;
	function si() {
		for (var e = ai, t = oi = ai = 0; t < e;) {
			var n = ii[t];
			ii[t++] = null;
			var r = ii[t];
			ii[t++] = null;
			var i = ii[t];
			ii[t++] = null;
			var a = ii[t];
			if (ii[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && di(n, i, a);
		}
	}
	function ci(e, t, n, r) {
		ii[ai++] = e, ii[ai++] = t, ii[ai++] = n, ii[ai++] = r, oi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function li(e, t, n, r) {
		return ci(e, t, n, r), fi(e);
	}
	function ui(e, t) {
		return ci(e, null, null, t), fi(e);
	}
	function di(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ge(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function fi(e) {
		if (50 < du) throw du = 0, fu = null, Error(s(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var pi = {};
	function mi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function hi(e, t, n, r) {
		return new mi(e, t, n, r);
	}
	function gi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function _i(e, t) {
		var n = e.alternate;
		return n === null ? (n = hi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function vi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function yi(e, t, n, r, i, a) {
		var o = 0;
		if (r = e, typeof e == "function") gi(e) && (o = 1);
		else if (typeof e == "string") o = Uf(e, n, me.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case re: return e = hi(31, n, t, i), e.elementType = re, e.lanes = a, e;
			case y: return bi(n.children, i, a, t);
			case b:
				o = 8, i |= 24;
				break;
			case x: return e = hi(12, n, t, i | 2), e.elementType = x, e.lanes = a, e;
			case ee: return e = hi(13, n, t, i), e.elementType = ee, e.lanes = a, e;
			case te: return e = hi(19, n, t, i), e.elementType = te, e.lanes = a, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						o = 10;
						break a;
					case S:
						o = 9;
						break a;
					case w:
						o = 11;
						break a;
					case ne:
						o = 14;
						break a;
					case T:
						o = 16, r = null;
						break a;
				}
				o = 29, n = Error(s(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = hi(o, n, t, i), t.elementType = e, t.type = r, t.lanes = a, t;
	}
	function bi(e, t, n, r) {
		return e = hi(7, e, r, t), e.lanes = n, e;
	}
	function xi(e, t, n) {
		return e = hi(6, e, null, t), e.lanes = n, e;
	}
	function Si(e) {
		var t = hi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Ci(e, t, n) {
		return t = hi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var wi = /* @__PURE__ */ new WeakMap();
	function Ti(e, t) {
		if (typeof e == "object" && e) {
			var n = wi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: De(t)
			}, wi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: De(t)
		};
	}
	var Ei = [], Di = 0, Oi = null, ki = 0, Ai = [], ji = 0, Mi = null, Ni = 1, Pi = "";
	function Fi(e, t) {
		Ei[Di++] = ki, Ei[Di++] = Oi, Oi = e, ki = t;
	}
	function Ii(e, t, n) {
		Ai[ji++] = Ni, Ai[ji++] = Pi, Ai[ji++] = Mi, Mi = e;
		var r = Ni;
		e = Pi;
		var i = 32 - Ge(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ge(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ni = 1 << 32 - Ge(t) + i | n << i | r, Pi = a + e;
		} else Ni = 1 << a | n << i | r, Pi = e;
	}
	function Li(e) {
		e.return !== null && (Fi(e, 1), Ii(e, 1, 0));
	}
	function Ri(e) {
		for (; e === Oi;) Oi = Ei[--Di], Ei[Di] = null, ki = Ei[--Di], Ei[Di] = null;
		for (; e === Mi;) Mi = Ai[--ji], Ai[ji] = null, Pi = Ai[--ji], Ai[ji] = null, Ni = Ai[--ji], Ai[ji] = null;
	}
	function zi(e, t) {
		Ai[ji++] = Ni, Ai[ji++] = Pi, Ai[ji++] = Mi, Ni = t.id, Pi = t.overflow, Mi = e;
	}
	var Bi = null, M = null, N = !1, Vi = null, Hi = !1, Ui = Error(s(519));
	function Wi(e) {
		throw Xi(Ti(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ui;
	}
	function Gi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[mt] = e, t[ht] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), qt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Zt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = sn), t = !0) : t = !1, t || Wi(e, !0);
	}
	function Ki(e) {
		for (Bi = e.return; Bi;) switch (Bi.tag) {
			case 5:
			case 31:
			case 13:
				Hi = !1;
				return;
			case 27:
			case 3:
				Hi = !0;
				return;
			default: Bi = Bi.return;
		}
	}
	function qi(e) {
		if (e !== Bi) return !1;
		if (!N) return Ki(e), N = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && M && Wi(e), Ki(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(317));
			M = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(317));
			M = uf(e);
		} else t === 27 ? (t = M, Zd(e.type) ? (e = lf, lf = null, M = e) : M = t) : M = Bi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ji() {
		M = Bi = null, N = !1;
	}
	function Yi() {
		var e = Vi;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Vi = null), e;
	}
	function Xi(e) {
		Vi === null ? Vi = [e] : Vi.push(e);
	}
	var Zi = pe(null), Qi = null, $i = null;
	function ea(e, t, n) {
		k(Zi, t._currentValue), t._currentValue = n;
	}
	function ta(e) {
		e._currentValue = Zi.current, O(Zi);
	}
	function na(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ra(e, t, n, r) {
		var i = e.child;
		for (i !== null && (i.return = e); i !== null;) {
			var a = i.dependencies;
			if (a !== null) {
				var o = i.child;
				a = a.firstContext;
				a: for (; a !== null;) {
					var c = a;
					a = i;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), na(a.return, n, e), r || (o = null);
						break a;
					}
					a = c.next;
				}
			} else if (i.tag === 18) {
				if (o = i.return, o === null) throw Error(s(341));
				o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), na(o, n, e), o = null;
			} else o = i.child;
			if (o !== null) o.return = i;
			else for (o = i; o !== null;) {
				if (o === e) {
					o = null;
					break;
				}
				if (i = o.sibling, i !== null) {
					i.return = o.return, o = i;
					break;
				}
				o = o.return;
			}
			i = o;
		}
	}
	function ia(e, t, n, r) {
		e = null;
		for (var i = t, a = !1; i !== null;) {
			if (!a) {
				if (i.flags & 524288) a = !0;
				else if (i.flags & 262144) break;
			}
			if (i.tag === 10) {
				var o = i.alternate;
				if (o === null) throw Error(s(387));
				if (o = o.memoizedProps, o !== null) {
					var c = i.type;
					kr(i.pendingProps.value, o.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (i === ge.current) {
				if (o = i.alternate, o === null) throw Error(s(387));
				o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			i = i.return;
		}
		e !== null && ra(t, e, n, r), t.flags |= 262144;
	}
	function aa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!kr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function oa(e) {
		Qi = e, $i = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function sa(e) {
		return la(Qi, e);
	}
	function ca(e, t) {
		return Qi === null && oa(e), la(e, t);
	}
	function la(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, $i === null) {
			if (e === null) throw Error(s(308));
			$i = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else $i = $i.next = t;
		return n;
	}
	var ua = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, da = t.unstable_scheduleCallback, fa = t.unstable_NormalPriority, P = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function pa() {
		return {
			controller: new ua(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ma(e) {
		e.refCount--, e.refCount === 0 && da(fa, function() {
			e.controller.abort();
		});
	}
	var ha = null, ga = 0, _a = 0, va = null;
	function ya(e, t) {
		if (ha === null) {
			var n = ha = [];
			ga = 0, _a = dd(), va = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ga++, t.then(ba, ba), t;
	}
	function ba() {
		if (--ga === 0 && ha !== null) {
			va !== null && (va.status = "fulfilled");
			var e = ha;
			ha = null, _a = 0, va = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function xa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Sa = E.S;
	E.S = function(e, t) {
		eu = Ne(), typeof t == "object" && t && typeof t.then == "function" && ya(e, t), Sa !== null && Sa(e, t);
	};
	var Ca = pe(null);
	function wa() {
		var e = Ca.current;
		return e === null ? K.pooledCache : e;
	}
	function Ta(e, t) {
		t === null ? k(Ca, Ca.current) : k(Ca, t.pool);
	}
	function Ea() {
		var e = wa();
		return e === null ? null : {
			parent: P._currentValue,
			pool: e
		};
	}
	var Da = Error(s(460)), Oa = Error(s(474)), ka = Error(s(542)), Aa = { then: function() {} };
	function ja(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ma(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(sn, sn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ia(e), e;
			default:
				if (typeof t.status == "string") t.then(sn, sn);
				else {
					if (e = K, e !== null && 100 < e.shellSuspendCounter) throw Error(s(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Ia(e), e;
				}
				throw Pa = t, Da;
		}
	}
	function Na(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Pa = e, Da) : e;
		}
	}
	var Pa = null;
	function Fa() {
		if (Pa === null) throw Error(s(459));
		var e = Pa;
		return Pa = null, e;
	}
	function Ia(e) {
		if (e === Da || e === ka) throw Error(s(483));
	}
	var La = null, Ra = 0;
	function za(e) {
		var t = Ra;
		return Ra += 1, La === null && (La = []), Ma(La, e, t);
	}
	function Ba(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Va(e, t) {
		throw t.$$typeof === g ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ha(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function i(e, t) {
			return e = _i(e, t), e.index = 0, e.sibling = null, e;
		}
		function a(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function o(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = xi(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var a = n.type;
			return a === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === T && Na(a) === t.type) ? (t = i(t, n.props), Ba(t, n), t.return = e, t) : (t = yi(n.type, n.key, n.props, null, e.mode, r), Ba(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Ci(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, a) {
			return t === null || t.tag !== 7 ? (t = bi(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = xi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = yi(t.type, t.key, t.props, null, e.mode, n), Ba(n, t), n.return = e, n;
					case v: return t = Ci(t, e.mode, n), t.return = e, t;
					case T: return t = Na(t), f(e, t, n);
				}
				if (le(t) || oe(t)) return t = bi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, za(t), n);
				if (t.$$typeof === C) return f(e, ca(e, t), n);
				Va(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case T: return n = Na(n), p(e, t, n, r);
				}
				if (le(n) || oe(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, za(n), r);
				if (n.$$typeof === C) return p(e, t, ca(e, n), r);
				Va(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case T: return r = Na(r), m(e, t, n, r, i);
				}
				if (le(r) || oe(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, za(r), i);
				if (r.$$typeof === C) return m(e, t, n, ca(t, r), i);
				Va(t, r);
			}
			return null;
		}
		function h(i, o, s, c) {
			for (var l = null, u = null, d = o, h = o = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), N && Fi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (o = a(d, o, h), u === null ? l = d : u.sibling = d, u = d);
				return N && Fi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), o = a(g, o, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), N && Fi(i, h), l;
		}
		function g(i, o, c, l) {
			if (c == null) throw Error(s(151));
			for (var u = null, d = null, h = o, g = o = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(i, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(i, h), o = a(y, o, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(i, h), N && Fi(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (o = a(v, o, g), d === null ? u = v : d.sibling = v, d = v);
				return N && Fi(i, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), o = a(v, o, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), N && Fi(i, g), u;
		}
		function b(e, r, a, c) {
			if (typeof a == "object" && a && a.type === y && a.key === null && (a = a.props.children), typeof a == "object" && a) {
				switch (a.$$typeof) {
					case _:
						a: {
							for (var l = a.key; r !== null;) {
								if (r.key === l) {
									if (l = a.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = i(r, a.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === T && Na(l) === r.type) {
										n(e, r.sibling), c = i(r, a.props), Ba(c, a), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							a.type === y ? (c = bi(a.props.children, e.mode, c, a.key), c.return = e, e = c) : (c = yi(a.type, a.key, a.props, null, e.mode, c), Ba(c, a), c.return = e, e = c);
						}
						return o(e);
					case v:
						a: {
							for (l = a.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === a.containerInfo && r.stateNode.implementation === a.implementation) {
										n(e, r.sibling), c = i(r, a.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Ci(a, e.mode, c), c.return = e, e = c;
						}
						return o(e);
					case T: return a = Na(a), b(e, r, a, c);
				}
				if (le(a)) return h(e, r, a, c);
				if (oe(a)) {
					if (l = oe(a), typeof l != "function") throw Error(s(150));
					return a = l.call(a), g(e, r, a, c);
				}
				if (typeof a.then == "function") return b(e, r, za(a), c);
				if (a.$$typeof === C) return b(e, r, ca(e, a), c);
				Va(e, a);
			}
			return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (a = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, a), c.return = e, e = c) : (n(e, r), c = xi(a, e.mode, c), c.return = e, e = c), o(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ra = 0;
				var i = b(e, t, n, r);
				return La = null, i;
			} catch (t) {
				if (t === Da || t === ka) throw t;
				var a = hi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ua = Ha(!0), Wa = Ha(!1), Ga = !1;
	function Ka(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function qa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ja(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ya(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, G & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = fi(e), di(e, null, n), t;
		}
		return ci(e, r, t, n), fi(e);
	}
	function Xa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	function Za(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Qa = !1;
	function $a() {
		if (Qa) {
			var e = va;
			if (e !== null) throw e;
		}
	}
	function eo(e, t, n, r) {
		Qa = !1;
		var i = e.updateQueue;
		Ga = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (J & f) === f : (r & f) === f) {
					f !== 0 && f === _a && (Qa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ga = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function to(e, t) {
		if (typeof e != "function") throw Error(s(191, e));
		e.call(t);
	}
	function no(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) to(n[e], t);
	}
	var ro = pe(null), io = pe(0);
	function ao(e, t) {
		e = Wl, k(io, e), k(ro, t), Wl = e | t.baseLanes;
	}
	function oo() {
		k(io, Wl), k(ro, ro.current);
	}
	function so() {
		Wl = io.current, O(ro), O(io);
	}
	var co = pe(null), lo = null;
	function uo(e) {
		var t = e.alternate;
		k(F, F.current & 1), k(co, e), lo === null && (t === null || ro.current !== null || t.memoizedState !== null) && (lo = e);
	}
	function fo(e) {
		k(F, F.current), k(co, e), lo === null && (lo = e);
	}
	function po(e) {
		e.tag === 22 ? (k(F, F.current), k(co, e), lo === null && (lo = e)) : mo(e);
	}
	function mo() {
		k(F, F.current), k(co, co.current);
	}
	function ho(e) {
		O(co), lo === e && (lo = null), O(F);
	}
	var F = pe(0);
	function go(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var _o = 0, I = null, L = null, R = null, vo = !1, yo = !1, bo = !1, xo = 0, So = 0, Co = null, wo = 0;
	function z() {
		throw Error(s(321));
	}
	function To(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!kr(e[n], t[n])) return !1;
		return !0;
	}
	function Eo(e, t, n, r, i, a) {
		return _o = a, I = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = e === null || e.memoizedState === null ? Hs : Us, bo = !1, a = n(r, i), bo = !1, yo && (a = Oo(t, n, r, i)), Do(e), a;
	}
	function Do(e) {
		E.H = Vs;
		var t = L !== null && L.next !== null;
		if (_o = 0, R = L = I = null, vo = !1, So = 0, Co = null, t) throw Error(s(300));
		e === null || V || (e = e.dependencies, e !== null && aa(e) && (V = !0));
	}
	function Oo(e, t, n, r) {
		I = e;
		var i = 0;
		do {
			if (yo && (Co = null), So = 0, yo = !1, 25 <= i) throw Error(s(301));
			if (i += 1, R = L = null, e.updateQueue != null) {
				var a = e.updateQueue;
				a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
			}
			E.H = Ws, a = t(n, r);
		} while (yo);
		return a;
	}
	function ko() {
		var e = E.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Fo(t) : t, e = e.useState()[0], (L === null ? null : L.memoizedState) !== e && (I.flags |= 1024), t;
	}
	function Ao() {
		var e = xo !== 0;
		return xo = 0, e;
	}
	function jo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Mo(e) {
		if (vo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			vo = !1;
		}
		_o = 0, R = L = I = null, yo = !1, So = xo = 0, Co = null;
	}
	function No() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return R === null ? I.memoizedState = R = e : R = R.next = e, R;
	}
	function B() {
		if (L === null) {
			var e = I.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = L.next;
		var t = R === null ? I.memoizedState : R.next;
		if (t !== null) R = t, L = e;
		else {
			if (e === null) throw I.alternate === null ? Error(s(467)) : Error(s(310));
			L = e, e = {
				memoizedState: L.memoizedState,
				baseState: L.baseState,
				baseQueue: L.baseQueue,
				queue: L.queue,
				next: null
			}, R === null ? I.memoizedState = R = e : R = R.next = e;
		}
		return R;
	}
	function Po() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Fo(e) {
		var t = So;
		return So += 1, Co === null && (Co = []), e = Ma(Co, e, t), t = I, (R === null ? t.memoizedState : R.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? Hs : Us), e;
	}
	function Io(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Fo(e);
			if (e.$$typeof === C) return sa(e);
		}
		throw Error(s(438, String(e)));
	}
	function Lo(e) {
		var t = null, n = I.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = I.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Po(), I.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ie;
		return t.index++, n;
	}
	function Ro(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function zo(e) {
		return Bo(B(), L, e);
	}
	function Bo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(s(311));
		r.lastRenderedReducer = n;
		var i = e.baseQueue, a = r.pending;
		if (a !== null) {
			if (i !== null) {
				var o = i.next;
				i.next = a.next, a.next = o;
			}
			t.baseQueue = i = a, r.pending = null;
		}
		if (a = e.baseState, i === null) e.memoizedState = a;
		else {
			t = i.next;
			var c = o = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (_o & f) === f : (J & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === _a && (d = !0);
					else if ((_o & p) === p) {
						u = u.next, p === _a && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, o = a) : l = l.next = f, I.lanes |= p, Gl |= p;
					f = u.action, bo && n(a, f), a = u.hasEagerState ? u.eagerState : n(a, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, o = a) : l = l.next = p, I.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? o = a : l.next = c, !kr(a, e.memoizedState) && (V = !0, d && (n = va, n !== null))) throw n;
			e.memoizedState = a, e.baseState = o, e.baseQueue = l, r.lastRenderedState = a;
		}
		return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Vo(e) {
		var t = B(), n = t.queue;
		if (n === null) throw Error(s(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, a = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var o = i = i.next;
			do
				a = e(a, o.action), o = o.next;
			while (o !== i);
			kr(a, t.memoizedState) || (V = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
		}
		return [a, r];
	}
	function Ho(e, t, n) {
		var r = I, i = B(), a = N;
		if (a) {
			if (n === void 0) throw Error(s(407));
			n = n();
		} else n = t();
		var o = !kr((L || i).memoizedState, n);
		if (o && (i.memoizedState = n, V = !0), i = i.queue, ps(Go.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || R !== null && R.memoizedState.tag & 1) {
			if (r.flags |= 2048, cs(9, { destroy: void 0 }, Wo.bind(null, r, i, n, t), null), K === null) throw Error(s(349));
			a || _o & 127 || Uo(r, t, n);
		}
		return n;
	}
	function Uo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = I.updateQueue, t === null ? (t = Po(), I.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Wo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Ko(t) && qo(e);
	}
	function Go(e, t, n) {
		return n(function() {
			Ko(t) && qo(e);
		});
	}
	function Ko(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !kr(e, n);
		} catch {
			return !0;
		}
	}
	function qo(e) {
		var t = ui(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Jo(e) {
		var t = No();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), bo) {
				We(!0);
				try {
					n();
				} finally {
					We(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ro,
			lastRenderedState: e
		}, t;
	}
	function Yo(e, t, n, r) {
		return e.baseState = n, Bo(e, L, typeof r == "function" ? r : Ro);
	}
	function Xo(e, t, n, r, i) {
		if (Rs(e)) throw Error(s(485));
		if (e = t.action, e !== null) {
			var a = {
				payload: i,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					a.listeners.push(e);
				}
			};
			E.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, Zo(t, a)) : (a.next = n.next, t.pending = n.next = a);
		}
	}
	function Zo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = E.T, o = {};
			E.T = o;
			try {
				var s = n(i, r), c = E.S;
				c !== null && c(o, s), Qo(e, t, s);
			} catch (n) {
				es(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), E.T = a;
			}
		} else try {
			a = n(i, r), Qo(e, t, a);
		} catch (n) {
			es(e, t, n);
		}
	}
	function Qo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			$o(e, t, n);
		}, function(n) {
			return es(e, t, n);
		}) : $o(e, t, n);
	}
	function $o(e, t, n) {
		t.status = "fulfilled", t.value = n, ts(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Zo(e, n)));
	}
	function es(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, ts(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function ts(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function ns(e, t) {
		return t;
	}
	function rs(e, t) {
		if (N) {
			var n = K.formState;
			if (n !== null) {
				a: {
					var r = I;
					if (N) {
						if (M) {
							b: {
								for (var i = M, a = Hi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								M = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Wi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = No(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ns,
			lastRenderedState: t
		}, n.queue = r, n = Fs.bind(null, I, r), r.dispatch = n, r = Jo(!1), a = Ls.bind(null, I, !1, r.queue), r = No(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Xo.bind(null, I, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function is(e) {
		return as(B(), L, e);
	}
	function as(e, t, n) {
		if (t = Bo(e, t, ns)[0], e = zo(Ro)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Fo(t);
		} catch (e) {
			throw e === Da ? ka : e;
		}
		else r = t;
		t = B();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (I.flags |= 2048, cs(9, { destroy: void 0 }, os.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function os(e, t) {
		e.action = t;
	}
	function ss(e) {
		var t = B(), n = L;
		if (n !== null) return as(t, n, e);
		B(), t = t.memoizedState, n = B();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function cs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = I.updateQueue, t === null && (t = Po(), I.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ls() {
		return B().memoizedState;
	}
	function us(e, t, n, r) {
		var i = No();
		I.flags |= e, i.memoizedState = cs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ds(e, t, n, r) {
		var i = B();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		L !== null && r !== null && To(r, L.memoizedState.deps) ? i.memoizedState = cs(t, a, n, r) : (I.flags |= e, i.memoizedState = cs(1 | t, a, n, r));
	}
	function fs(e, t) {
		us(8390656, 8, e, t);
	}
	function ps(e, t) {
		ds(2048, 8, e, t);
	}
	function ms(e) {
		I.flags |= 4;
		var t = I.updateQueue;
		if (t === null) t = Po(), I.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function hs(e) {
		var t = B().memoizedState;
		return ms({
			ref: t,
			nextImpl: e
		}), function() {
			if (G & 2) throw Error(s(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function gs(e, t) {
		return ds(4, 2, e, t);
	}
	function _s(e, t) {
		return ds(4, 4, e, t);
	}
	function vs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function ys(e, t, n) {
		n = n == null ? null : n.concat([e]), ds(4, 4, vs.bind(null, t, e), n);
	}
	function bs() {}
	function xs(e, t) {
		var n = B();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && To(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Ss(e, t) {
		var n = B();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && To(t, r[1])) return r[0];
		if (r = e(), bo) {
			We(!0);
			try {
				e();
			} finally {
				We(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Cs(e, t, n) {
		return n === void 0 || _o & 1073741824 && !(J & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), I.lanes |= e, Gl |= e, n);
	}
	function ws(e, t, n, r) {
		return kr(n, t) ? n : ro.current === null ? !(_o & 42) || _o & 1073741824 && !(J & 261930) ? (V = !0, e.memoizedState = n) : (e = mu(), I.lanes |= e, Gl |= e, t) : (e = Cs(e, n, r), kr(e, t) || (V = !0), e);
	}
	function Ts(e, t, n, r, i) {
		var a = D.p;
		D.p = a !== 0 && 8 > a ? a : 8;
		var o = E.T, s = {};
		E.T = s, Ls(e, !1, t, n);
		try {
			var c = i(), l = E.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Is(e, t, xa(c, r), pu(e)) : Is(e, t, r, pu(e));
		} catch (n) {
			Is(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			D.p = a, o !== null && s.types !== null && (o.types = s.types), E.T = o;
		}
	}
	function Es() {}
	function Ds(e, t, n, r) {
		if (e.tag !== 5) throw Error(s(476));
		var i = Os(e).queue;
		Ts(e, i, t, ue, n === null ? Es : function() {
			return ks(e), n(r);
		});
	}
	function Os(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ue,
			baseState: ue,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ro,
				lastRenderedState: ue
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ro,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ks(e) {
		var t = Os(e);
		t.next === null && (t = e.alternate.memoizedState), Is(e, t.next.queue, {}, pu());
	}
	function As() {
		return sa(Qf);
	}
	function js() {
		return B().memoizedState;
	}
	function Ms() {
		return B().memoizedState;
	}
	function Ns(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Ja(n);
					var r = Ya(t, e, n);
					r !== null && (hu(r, t, n), Xa(r, t, n)), t = { cache: pa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ps(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Rs(e) ? zs(t, n) : (n = li(e, t, n, r), n !== null && (hu(n, e, r), Bs(n, t, r)));
	}
	function Fs(e, t, n) {
		Is(e, t, n, pu());
	}
	function Is(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Rs(e)) zs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, kr(s, o)) return ci(e, t, i, 0), K === null && si(), !1;
			} catch {}
			if (n = li(e, t, i, r), n !== null) return hu(n, e, r), Bs(n, t, r), !0;
		}
		return !1;
	}
	function Ls(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Rs(e)) {
			if (t) throw Error(s(479));
		} else t = li(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Rs(e) {
		var t = e.alternate;
		return e === I || t !== null && t === I;
	}
	function zs(e, t) {
		yo = vo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Bs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	var Vs = {
		readContext: sa,
		use: Io,
		useCallback: z,
		useContext: z,
		useEffect: z,
		useImperativeHandle: z,
		useLayoutEffect: z,
		useInsertionEffect: z,
		useMemo: z,
		useReducer: z,
		useRef: z,
		useState: z,
		useDebugValue: z,
		useDeferredValue: z,
		useTransition: z,
		useSyncExternalStore: z,
		useId: z,
		useHostTransitionStatus: z,
		useFormState: z,
		useActionState: z,
		useOptimistic: z,
		useMemoCache: z,
		useCacheRefresh: z
	};
	Vs.useEffectEvent = z;
	var Hs = {
		readContext: sa,
		use: Io,
		useCallback: function(e, t) {
			return No().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: sa,
		useEffect: fs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), us(4194308, 4, vs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return us(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			us(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = No();
			t = t === void 0 ? null : t;
			var r = e();
			if (bo) {
				We(!0);
				try {
					e();
				} finally {
					We(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = No();
			if (n !== void 0) {
				var i = n(t);
				if (bo) {
					We(!0);
					try {
						n(t);
					} finally {
						We(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ps.bind(null, I, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = No();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Jo(e);
			var t = e.queue, n = Fs.bind(null, I, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: bs,
		useDeferredValue: function(e, t) {
			return Cs(No(), e, t);
		},
		useTransition: function() {
			var e = Jo(!1);
			return e = Ts.bind(null, I, e.queue, !0, !1), No().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = I, i = No();
			if (N) {
				if (n === void 0) throw Error(s(407));
				n = n();
			} else {
				if (n = t(), K === null) throw Error(s(349));
				J & 127 || Uo(r, t, n);
			}
			i.memoizedState = n;
			var a = {
				value: n,
				getSnapshot: t
			};
			return i.queue = a, fs(Go.bind(null, r, a, e), [e]), r.flags |= 2048, cs(9, { destroy: void 0 }, Wo.bind(null, r, a, n, t), null), n;
		},
		useId: function() {
			var e = No(), t = K.identifierPrefix;
			if (N) {
				var n = Pi, r = Ni;
				n = (r & ~(1 << 32 - Ge(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = xo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = wo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: As,
		useFormState: rs,
		useActionState: rs,
		useOptimistic: function(e) {
			var t = No();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ls.bind(null, I, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Lo,
		useCacheRefresh: function() {
			return No().memoizedState = Ns.bind(null, I);
		},
		useEffectEvent: function(e) {
			var t = No(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (G & 2) throw Error(s(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Us = {
		readContext: sa,
		use: Io,
		useCallback: xs,
		useContext: sa,
		useEffect: ps,
		useImperativeHandle: ys,
		useInsertionEffect: gs,
		useLayoutEffect: _s,
		useMemo: Ss,
		useReducer: zo,
		useRef: ls,
		useState: function() {
			return zo(Ro);
		},
		useDebugValue: bs,
		useDeferredValue: function(e, t) {
			return ws(B(), L.memoizedState, e, t);
		},
		useTransition: function() {
			var e = zo(Ro)[0], t = B().memoizedState;
			return [typeof e == "boolean" ? e : Fo(e), t];
		},
		useSyncExternalStore: Ho,
		useId: js,
		useHostTransitionStatus: As,
		useFormState: is,
		useActionState: is,
		useOptimistic: function(e, t) {
			return Yo(B(), L, e, t);
		},
		useMemoCache: Lo,
		useCacheRefresh: Ms
	};
	Us.useEffectEvent = hs;
	var Ws = {
		readContext: sa,
		use: Io,
		useCallback: xs,
		useContext: sa,
		useEffect: ps,
		useImperativeHandle: ys,
		useInsertionEffect: gs,
		useLayoutEffect: _s,
		useMemo: Ss,
		useReducer: Vo,
		useRef: ls,
		useState: function() {
			return Vo(Ro);
		},
		useDebugValue: bs,
		useDeferredValue: function(e, t) {
			var n = B();
			return L === null ? Cs(n, e, t) : ws(n, L.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Vo(Ro)[0], t = B().memoizedState;
			return [typeof e == "boolean" ? e : Fo(e), t];
		},
		useSyncExternalStore: Ho,
		useId: js,
		useHostTransitionStatus: As,
		useFormState: ss,
		useActionState: ss,
		useOptimistic: function(e, t) {
			var n = B();
			return L === null ? (n.baseState = e, [e, n.queue.dispatch]) : Yo(n, L, e, t);
		},
		useMemoCache: Lo,
		useCacheRefresh: Ms
	};
	Ws.useEffectEvent = hs;
	function Gs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ks = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ja(r);
			i.payload = t, n != null && (i.callback = n), t = Ya(e, i, r), t !== null && (hu(t, e, r), Xa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ja(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ya(e, i, r), t !== null && (hu(t, e, r), Xa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Ja(n);
			r.tag = 2, t != null && (r.callback = t), t = Ya(e, r, n), t !== null && (hu(t, e, n), Xa(t, e, n));
		}
	};
	function qs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Ar(n, r) || !Ar(i, a) : !0;
	}
	function Js(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ks.enqueueReplaceState(t, t.state, null);
	}
	function Ys(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Xs(e) {
		ri(e);
	}
	function Zs(e) {
		console.error(e);
	}
	function Qs(e) {
		ri(e);
	}
	function $s(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function ec(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function tc(e, t, n) {
		return n = Ja(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			$s(e, t);
		}, n;
	}
	function nc(e) {
		return e = Ja(e), e.tag = 3, e;
	}
	function rc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				ec(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			ec(t, n, r), typeof i != "function" && (ru === null ? ru = /* @__PURE__ */ new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function ic(e, t, n, r, i) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ia(t, n, i, !0), n = co.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return lo === null ? Du() : n.alternate === null && X === 0 && (X = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Aa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Gu(e, r, i)), !1;
					case 22: return n.flags |= 65536, r === Aa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Gu(e, r, i)), !1;
				}
				throw Error(s(435, n.tag));
			}
			return Gu(e, r, i), Du(), !1;
		}
		if (N) return t = co.current, t === null ? (r !== Ui && (t = Error(s(423), { cause: r }), Xi(Ti(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Ti(r, n), i = tc(e.stateNode, r, i), Za(e, i), X !== 4 && (X = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== Ui && (e = Error(s(422), { cause: r }), Xi(Ti(e, n)))), !1;
		var a = Error(s(520), { cause: r });
		if (a = Ti(a, n), Xl === null ? Xl = [a] : Xl.push(a), X !== 4 && (X = 2), t === null) return !0;
		r = Ti(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = tc(n.stateNode, r, e), Za(n, e), !1;
				case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (ru === null || !ru.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = nc(i), rc(i, e, n, r), Za(n, i), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ac = Error(s(461)), V = !1;
	function oc(e, t, n, r) {
		t.child = e === null ? Wa(t, null, n, r) : Ua(t, e.child, n, r);
	}
	function sc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return oa(t), r = Eo(e, t, n, o, a, i), s = Ao(), e !== null && !V ? (jo(e, t, i), jc(e, t, i)) : (N && s && Li(t), t.flags |= 1, oc(e, t, r, i), t.child);
	}
	function cc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !gi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, lc(e, t, a, r, i)) : (e = yi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Mc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Ar : n, n(o, r) && e.ref === t.ref) return jc(e, t, i);
		}
		return t.flags |= 1, e = _i(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function lc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Ar(a, r) && e.ref === t.ref) {
				if (V = !1, t.pendingProps = r = a, Mc(e, i)) e.flags & 131072 && (V = !0);
				else return t.lanes = e.lanes, jc(e, t, i);
			}
		}
		return _c(e, t, n, r, i);
	}
	function uc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return fc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ta(t, a === null ? null : a.cachePool), a === null ? oo() : ao(t, a), po(t);
			else return r = t.lanes = 536870912, fc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ta(t, null), oo(), mo(t)) : (Ta(t, a.cachePool), ao(t, a), mo(t), t.memoizedState = null);
		return oc(e, t, i, n), t.child;
	}
	function dc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function fc(e, t, n, r, i) {
		var a = wa();
		return a = a === null ? null : {
			parent: P._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ta(t, null), oo(), po(t), e !== null && ia(e, t, r, !0), t.childLanes = i, null;
	}
	function pc(e, t) {
		return t = Ec({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function mc(e, t, n) {
		return Ua(t, e.child, null, n), e = pc(t, t.pendingProps), e.flags |= 2, ho(t), t.memoizedState = null, e;
	}
	function hc(e, t, n) {
		var r = t.pendingProps, i = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (N) {
				if (r.mode === "hidden") return e = pc(t, r), t.lanes = 536870912, dc(null, e);
				if (fo(t), (e = M) ? (e = rf(e, Hi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Si(e), n.return = t, t.child = n, Bi = t, M = null)) : e = null, e === null) throw Wi(t);
				return t.lanes = 536870912, null;
			}
			return pc(t, r);
		}
		var a = e.memoizedState;
		if (a !== null) {
			var o = a.dehydrated;
			if (fo(t), i) {
				if (t.flags & 256) t.flags &= -257, t = mc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(s(558));
			} else if (V || ia(e, t, n, !1), i = (n & e.childLanes) !== 0, V || i) {
				if (r = K, r !== null && (o = ct(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, ui(e, o), hu(r, e, o), ac;
				Du(), t = mc(e, t, n);
			} else e = a.treeContext, M = cf(o.nextSibling), Bi = t, N = !0, Vi = null, Hi = !1, e !== null && zi(t, e), t = pc(t, r), t.flags |= 4096;
			return t;
		}
		return e = _i(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function gc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(s(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function _c(e, t, n, r, i) {
		return oa(t), n = Eo(e, t, n, r, void 0, i), r = Ao(), e !== null && !V ? (jo(e, t, i), jc(e, t, i)) : (N && r && Li(t), t.flags |= 1, oc(e, t, n, i), t.child);
	}
	function vc(e, t, n, r, i, a) {
		return oa(t), t.updateQueue = null, n = Oo(t, r, n, i), Do(e), r = Ao(), e !== null && !V ? (jo(e, t, a), jc(e, t, a)) : (N && r && Li(t), t.flags |= 1, oc(e, t, n, a), t.child);
	}
	function yc(e, t, n, r, i) {
		if (oa(t), t.stateNode === null) {
			var a = pi, o = n.contextType;
			typeof o == "object" && o && (a = sa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ks, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ka(t), o = n.contextType, a.context = typeof o == "object" && o ? sa(o) : pi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Gs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ks.enqueueReplaceState(a, a.state, null), eo(t, r, a, i), $a(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ys(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = pi, typeof u == "object" && u && (o = sa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Js(t, a, r, o), Ga = !1;
			var f = t.memoizedState;
			a.state = f, eo(t, r, a, i), $a(), l = t.memoizedState, s || f !== l || Ga ? (typeof d == "function" && (Gs(t, n, d, r), l = t.memoizedState), (c = Ga || qs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, qa(e, t), o = t.memoizedProps, u = Ys(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = pi, typeof l == "object" && l && (c = sa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Js(t, a, r, c), Ga = !1, f = t.memoizedState, a.state = f, eo(t, r, a, i), $a();
			var p = t.memoizedState;
			o !== d || f !== p || Ga || e !== null && e.dependencies !== null && aa(e.dependencies) ? (typeof s == "function" && (Gs(t, n, s, r), p = t.memoizedState), (u = Ga || qs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && aa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, gc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ua(t, e.child, null, i), t.child = Ua(t, null, n, i)) : oc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = jc(e, t, i), e;
	}
	function bc(e, t, n, r) {
		return Ji(), t.flags |= 256, oc(e, t, n, r), t.child;
	}
	var xc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Sc(e) {
		return {
			baseLanes: e,
			cachePool: Ea()
		};
	}
	function Cc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function wc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(F.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (N) {
				if (i ? uo(t) : mo(t), (e = M) ? (e = rf(e, Hi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Si(e), n.return = t, t.child = n, Bi = t, M = null)) : e = null, e === null) throw Wi(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, i ? (mo(t), i = t.mode, c = Ec({
				mode: "hidden",
				children: c
			}, i), r = bi(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = Sc(n), r.childLanes = Cc(e, o, n), t.memoizedState = xc, dc(null, r)) : (uo(t), Tc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (a) t.flags & 256 ? (uo(t), t.flags &= -257, t = Dc(e, t, n)) : t.memoizedState === null ? (mo(t), c = r.fallback, i = t.mode, r = Ec({
				mode: "visible",
				children: r.children
			}, i), c = bi(c, i, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ua(t, e.child, null, n), r = t.child, r.memoizedState = Sc(n), r.childLanes = Cc(e, o, n), t.memoizedState = xc, t = dc(null, r)) : (mo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (uo(t), of(c)) {
				if (o = c.nextSibling && c.nextSibling.dataset, o) var u = o.dgst;
				o = u, r = Error(s(419)), r.stack = "", r.digest = o, Xi({
					value: r,
					source: null,
					stack: null
				}), t = Dc(e, t, n);
			} else if (V || ia(e, t, n, !1), o = (n & e.childLanes) !== 0, V || o) {
				if (o = K, o !== null && (r = ct(o, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ui(e, r), hu(o, e, r), ac;
				af(c) || Du(), t = Dc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, M = cf(c.nextSibling), Bi = t, N = !0, Vi = null, Hi = !1, e !== null && zi(t, e), t = Tc(t, r.children), t.flags |= 4096);
			return t;
		}
		return i ? (mo(t), c = r.fallback, i = t.mode, l = e.child, u = l.sibling, r = _i(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = bi(c, i, n, null), c.flags |= 2) : c = _i(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, dc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = Sc(n) : (i = c.cachePool, i === null ? i = Ea() : (l = P._currentValue, i = i.parent === l ? i : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: i
		}), r.memoizedState = c, r.childLanes = Cc(e, o, n), t.memoizedState = xc, dc(e.child, r)) : (uo(t), n = e.child, e = n.sibling, n = _i(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Tc(e, t) {
		return t = Ec({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Ec(e, t) {
		return e = hi(22, e, null, t), e.lanes = 0, e;
	}
	function Dc(e, t, n) {
		return Ua(t, e.child, null, n), e = Tc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Oc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), na(e.return, t, n);
	}
	function kc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Ac(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = F.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, k(F, o), oc(e, t, r, n), r = N ? ki : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Oc(e, n, t);
			else if (e.tag === 19) Oc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && go(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), kc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && go(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				kc(t, !0, n, null, a, r);
				break;
			case "together":
				kc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function jc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ia(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(s(153));
		if (t.child !== null) {
			for (e = t.child, n = _i(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = _i(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Mc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && aa(e)));
	}
	function Nc(e, t, n) {
		switch (t.tag) {
			case 3:
				_e(t, t.stateNode.containerInfo), ea(t, P, e.memoizedState.cache), Ji();
				break;
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				_e(t, t.stateNode.containerInfo);
				break;
			case 10:
				ea(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, fo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (uo(t), e = jc(e, t, n), e === null ? null : e.sibling) : wc(e, t, n) : (uo(t), t.flags |= 128, null);
				uo(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (ia(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Ac(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), k(F, F.current), r) break;
				return null;
			case 22: return t.lanes = 0, uc(e, t, n, t.pendingProps);
			case 24: ea(t, P, e.memoizedState.cache);
		}
		return jc(e, t, n);
	}
	function Pc(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) V = !0;
			else {
				if (!Mc(e, n) && !(t.flags & 128)) return V = !1, Nc(e, t, n);
				V = !!(e.flags & 131072);
			}
		} else V = !1, N && t.flags & 1048576 && Ii(t, ki, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Na(t.elementType), t.type = e, typeof e == "function") gi(e) ? (r = Ys(e, r), t.tag = 1, t = yc(null, t, e, r, n)) : (t.tag = 0, t = _c(null, t, e, r, n));
					else {
						if (e != null) {
							var i = e.$$typeof;
							if (i === w) {
								t.tag = 11, t = sc(null, t, e, r, n);
								break a;
							}
							if (i === ne) {
								t.tag = 14, t = cc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ce(e) || e, Error(s(306, t, ""));
					}
				}
				return t;
			case 0: return _c(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, i = Ys(r, t.pendingProps), yc(e, t, r, i, n);
			case 3:
				a: {
					if (_e(t, t.stateNode.containerInfo), e === null) throw Error(s(387));
					r = t.pendingProps;
					var a = t.memoizedState;
					i = a.element, qa(e, t), eo(t, r, null, n);
					var o = t.memoizedState;
					if (r = o.cache, ea(t, P, r), r !== a.cache && ra(t, [P], n, !0), $a(), r = o.element, a.isDehydrated) {
						if (a = {
							element: r,
							isDehydrated: !1,
							cache: o.cache
						}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							t = bc(e, t, r, n);
							break a;
						}
						if (r !== i) {
							i = Ti(Error(s(424)), t), Xi(i), t = bc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (M = cf(e.firstChild), Bi = t, N = !0, Vi = null, Hi = !0, n = Wa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Ji(), r === i) {
							t = jc(e, t, n);
							break a;
						}
						oc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return gc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : N || (n = t.type, e = t.pendingProps, r = Bd(A.current).createElement(n), r[mt] = t, r[ht] = e, Pd(r, n, e), j(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ye(t), e === null && N && (r = t.stateNode = ff(t.type, t.pendingProps, A.current), Bi = t, Hi = !0, i = M, Zd(t.type) ? (lf = i, M = cf(r.firstChild)) : M = i), oc(e, t, t.pendingProps.children, n), gc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && N && ((i = r = M) && (r = tf(r, t.type, t.pendingProps, Hi), r === null ? i = !1 : (t.stateNode = r, Bi = t, M = cf(r.firstChild), Hi = !1, i = !0)), i || Wi(t)), ye(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Ud(i, a) ? r = null : o !== null && Ud(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = Eo(e, t, ko, null, null, n), Qf._currentValue = i), gc(e, t), oc(e, t, r, n), t.child;
			case 6: return e === null && N && ((e = n = M) && (n = nf(n, t.pendingProps, Hi), n === null ? e = !1 : (t.stateNode = n, Bi = t, M = null, e = !0)), e || Wi(t)), null;
			case 13: return wc(e, t, n);
			case 4: return _e(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ua(t, null, r, n) : oc(e, t, r, n), t.child;
			case 11: return sc(e, t, t.type, t.pendingProps, n);
			case 7: return oc(e, t, t.pendingProps, n), t.child;
			case 8: return oc(e, t, t.pendingProps.children, n), t.child;
			case 12: return oc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, ea(t, t.type, r.value), oc(e, t, r.children, n), t.child;
			case 9: return i = t.type._context, r = t.pendingProps.children, oa(t), i = sa(i), r = r(i), t.flags |= 1, oc(e, t, r, n), t.child;
			case 14: return cc(e, t, t.type, t.pendingProps, n);
			case 15: return lc(e, t, t.type, t.pendingProps, n);
			case 19: return Ac(e, t, n);
			case 31: return hc(e, t, n);
			case 22: return uc(e, t, n, t.pendingProps);
			case 24: return oa(t), r = sa(P), e === null ? (i = wa(), i === null && (i = K, a = pa(), i.pooledCache = a, a.refCount++, a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
				parent: r,
				cache: i
			}, Ka(t), ea(t, P, i)) : ((e.lanes & n) !== 0 && (qa(e, t), eo(t, null, null, n), $a()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, ea(t, P, r), r !== i.cache && ra(t, [P], n, !0)) : (i = {
				parent: r,
				cache: r
			}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), ea(t, P, r))), oc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(s(156, t.tag));
	}
	function Fc(e) {
		e.flags |= 4;
	}
	function Ic(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (wu()) e.flags |= 8192;
				else throw Pa = Aa, Oa;
			}
		} else e.flags &= -16777217;
	}
	function Lc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) {
			if (wu()) e.flags |= 8192;
			else throw Pa = Aa, Oa;
		}
	}
	function Rc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : nt(), e.lanes |= t, Yl |= t);
	}
	function zc(e, t) {
		if (!N) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function H(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Bc(e, t, n) {
		var r = t.pendingProps;
		switch (Ri(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return H(t), null;
			case 1: return H(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ta(P), ve(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (qi(t) ? Fc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Yi())), H(t), null;
			case 26:
				var i = t.type, a = t.memoizedState;
				return e === null ? (Fc(t), a === null ? (H(t), Ic(t, i, null, r, n)) : (H(t), Lc(t, a))) : a ? a === e.memoizedState ? (H(t), t.flags &= -16777217) : (Fc(t), H(t), Lc(t, a)) : (e = e.memoizedProps, e !== r && Fc(t), H(t), Ic(t, i, e, r, n)), null;
			case 27:
				if (be(t), n = A.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Fc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(s(166));
						return H(t), null;
					}
					e = me.current, qi(t) ? Gi(t, e) : (e = ff(i, r, n), t.stateNode = e, Fc(t));
				}
				return H(t), null;
			case 5:
				if (be(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Fc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(s(166));
						return H(t), null;
					}
					if (a = me.current, qi(t)) Gi(t, a);
					else {
						var o = Bd(A.current);
						switch (a) {
							case 1:
								a = o.createElementNS("http://www.w3.org/2000/svg", i);
								break;
							case 2:
								a = o.createElementNS("http://www.w3.org/1998/Math/MathML", i);
								break;
							default: switch (i) {
								case "svg":
									a = o.createElementNS("http://www.w3.org/2000/svg", i);
									break;
								case "math":
									a = o.createElementNS("http://www.w3.org/1998/Math/MathML", i);
									break;
								case "script":
									a = o.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
									break;
								case "select":
									a = typeof r.is == "string" ? o.createElement("select", { is: r.is }) : o.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
									break;
								default: a = typeof r.is == "string" ? o.createElement(i, { is: r.is }) : o.createElement(i);
							}
						}
						a[mt] = t, a[ht] = r;
						a: for (o = t.child; o !== null;) {
							if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
							else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
								o.child.return = o, o = o.child;
								continue;
							}
							if (o === t) break a;
							for (; o.sibling === null;) {
								if (o.return === null || o.return === t) break a;
								o = o.return;
							}
							o.sibling.return = o.return, o = o.sibling;
						}
						t.stateNode = a;
						a: switch (Pd(a, i, r), i) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Fc(t);
					}
				}
				return H(t), Ic(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Fc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
					if (e = A.current, qi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, i = Bi, i !== null) switch (i.tag) {
							case 27:
							case 5: r = i.memoizedProps;
						}
						e[mt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Wi(t, !0);
					} else e = Bd(e).createTextNode(r), e[mt] = t, t.stateNode = e;
				}
				return H(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = qi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(s(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(557));
							e[mt] = t;
						} else Ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						H(t), e = !1;
					} else n = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (ho(t), t) : (ho(t), null);
					if (t.flags & 128) throw Error(s(558));
				}
				return H(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (i = qi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!i) throw Error(s(318));
							if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(s(317));
							i[mt] = t;
						} else Ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						H(t), i = !1;
					} else i = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
					if (!i) return t.flags & 256 ? (ho(t), t) : (ho(t), null);
				}
				return ho(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Rc(t, t.updateQueue), H(t), null);
			case 4: return ve(), e === null && Sd(t.stateNode.containerInfo), H(t), null;
			case 10: return ta(t.type), H(t), null;
			case 19:
				if (O(F), r = t.memoizedState, r === null) return H(t), null;
				if (i = !!(t.flags & 128), a = r.rendering, a === null) {
					if (i) zc(r, !1);
					else {
						if (X !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (a = go(e), a !== null) {
								for (t.flags |= 128, zc(r, !1), e = a.updateQueue, t.updateQueue = e, Rc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) vi(n, e), n = n.sibling;
								return k(F, F.current & 1 | 2), N && Fi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ne() > tu && (t.flags |= 128, i = !0, zc(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!i) {
						if (e = go(a), e !== null) {
							if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Rc(t, e), zc(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !N) return H(t), null;
						} else 2 * Ne() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, i = !0, zc(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
				}
				return r.tail === null ? (H(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ne(), e.sibling = null, n = F.current, k(F, i ? n & 1 | 2 : n & 1), N && Fi(t, r.treeForkCount), e);
			case 22:
			case 23: return ho(t), so(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (H(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : H(t), n = t.updateQueue, n !== null && Rc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && O(Ca), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ta(P), H(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(s(156, t.tag));
	}
	function Vc(e, t) {
		switch (Ri(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ta(P), ve(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return be(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (ho(t), t.alternate === null) throw Error(s(340));
					Ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (ho(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(s(340));
					Ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return O(F), null;
			case 4: return ve(), null;
			case 10: return ta(t.type), null;
			case 22:
			case 23: return ho(t), so(), e !== null && O(Ca), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ta(P), null;
			case 25: return null;
			default: return null;
		}
	}
	function Hc(e, t) {
		switch (Ri(t), t.tag) {
			case 3:
				ta(P), ve();
				break;
			case 26:
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				ve();
				break;
			case 31:
				t.memoizedState !== null && ho(t);
				break;
			case 13:
				ho(t);
				break;
			case 19:
				O(F);
				break;
			case 10:
				ta(t.type);
				break;
			case 22:
			case 23:
				ho(t), so(), e !== null && O(Ca);
				break;
			case 24: ta(P);
		}
	}
	function Uc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Wc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Gc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				no(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Kc(e, t, n) {
		n.props = Ys(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function qc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Jc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Z(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Z(e, t, n);
			}
			else n.current = null;
		}
	}
	function Yc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Xc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[ht] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Zc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Qc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Zc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function $c(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = sn));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for ($c(e, t, n), e = e.sibling; e !== null;) $c(e, t, n), e = e.sibling;
	}
	function el(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (el(e, t, n), e = e.sibling; e !== null;) el(e, t, n), e = e.sibling;
	}
	function tl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[mt] = e, t[ht] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var nl = !1, U = !1, rl = !1, il = typeof WeakSet == "function" ? WeakSet : Set, al = null;
	function ol(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Pr(e), Fr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var i = r.anchorOffset, a = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, a.nodeType;
					} catch {
						n = null;
						break a;
					}
					var o = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = o + i), f !== a || r !== 0 && f.nodeType !== 3 || (l = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === i && (c = o), p === a && ++d === r && (l = o), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, al = t; al !== null;) if (t = al, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, al = e;
		else for (; al !== null;) {
			switch (t = al, a = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && a !== null) {
						e = void 0, n = t, i = a.memoizedProps, a = a.memoizedState, r = n.stateNode;
						try {
							var h = Ys(n.type, i);
							e = r.getSnapshotBeforeUpdate(h, a), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(s(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, al = e;
				break;
			}
			al = t.return;
		}
	}
	function sl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, n), r & 4 && Uc(5, n);
				break;
			case 1:
				if (xl(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Z(n, n.return, e);
					}
					else {
						var i = Ys(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Z(n, n.return, e);
						}
					}
				}
				r & 64 && Gc(n), r & 512 && qc(n, n.return);
				break;
			case 3:
				if (xl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						no(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && tl(n);
			case 26:
			case 5:
				xl(e, n), t === null && r & 4 && Yc(n), r & 512 && qc(n, n.return);
				break;
			case 12:
				xl(e, n);
				break;
			case 31:
				xl(e, n), r & 4 && fl(e, n);
				break;
			case 13:
				xl(e, n), r & 4 && pl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || nl, !r) {
					t = t !== null && t.memoizedState !== null || U, i = nl;
					var a = U;
					nl = r, (U = t) && !a ? Cl(e, n, !!(n.subtreeFlags & 8772)) : xl(e, n), nl = i, U = a;
				}
				break;
			case 30: break;
			default: xl(e, n);
		}
	}
	function cl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, cl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && St(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var W = null, ll = !1;
	function ul(e, t, n) {
		for (n = n.child; n !== null;) dl(e, t, n), n = n.sibling;
	}
	function dl(e, t, n) {
		if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
			Ue.onCommitFiberUnmount(He, n);
		} catch {}
		switch (n.tag) {
			case 26:
				U || Jc(n, t), ul(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				U || Jc(n, t);
				var r = W, i = ll;
				Zd(n.type) && (W = n.stateNode, ll = !1), ul(e, t, n), pf(n.stateNode), W = r, ll = i;
				break;
			case 5: U || Jc(n, t);
			case 6:
				if (r = W, i = ll, W = null, ul(e, t, n), W = r, ll = i, W !== null) {
					if (ll) try {
						(W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
					else try {
						W.removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
				}
				break;
			case 18:
				W !== null && (ll ? (e = W, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(W, n.stateNode));
				break;
			case 4:
				r = W, i = ll, W = n.stateNode.containerInfo, ll = !0, ul(e, t, n), W = r, ll = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Wc(2, n, t), U || Wc(4, n, t), ul(e, t, n);
				break;
			case 1:
				U || (Jc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Kc(n, t, r)), ul(e, t, n);
				break;
			case 21:
				ul(e, t, n);
				break;
			case 22:
				U = (r = U) || n.memoizedState !== null, ul(e, t, n), U = r;
				break;
			default: ul(e, t, n);
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function pl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function ml(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new il()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new il()), t;
			default: throw Error(s(435, e.tag));
		}
	}
	function hl(e, t) {
		var n = ml(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function gl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r], a = e, o = t, c = o;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							W = c.stateNode, ll = !1;
							break a;
						}
						break;
					case 5:
						W = c.stateNode, ll = !1;
						break a;
					case 3:
					case 4:
						W = c.stateNode.containerInfo, ll = !0;
						break a;
				}
				c = c.return;
			}
			if (W === null) throw Error(s(160));
			dl(a, o, i), W = null, ll = !1, a = i.alternate, a !== null && (a.return = null), i.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) vl(t, e), t = t.sibling;
	}
	var _l = null;
	function vl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				gl(t, e), yl(e), r & 4 && (Wc(3, e, e.return), Uc(3, e), Wc(5, e, e.return));
				break;
			case 1:
				gl(t, e), yl(e), r & 512 && (U || n === null || Jc(n, n.return)), r & 64 && nl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var i = _l;
				if (gl(t, e), yl(e), r & 512 && (U || n === null || Jc(n, n.return)), r & 4) {
					var a = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) {
						if (r === null) {
							if (e.stateNode === null) {
								a: {
									r = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
									b: switch (r) {
										case "title":
											a = i.getElementsByTagName("title")[0], (!a || a[xt] || a[mt] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = i.createElement(r), i.head.insertBefore(a, i.querySelector("head > title"))), Pd(a, r, n), a[mt] = e, j(a), r = a;
											break a;
										case "link":
											var o = Vf("link", "href", i).get(r + (n.href || ""));
											if (o) {
												for (var c = 0; c < o.length; c++) if (a = o[c], a.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && a.getAttribute("rel") === (n.rel == null ? null : n.rel) && a.getAttribute("title") === (n.title == null ? null : n.title) && a.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
													o.splice(c, 1);
													break b;
												}
											}
											a = i.createElement(r), Pd(a, r, n), i.head.appendChild(a);
											break;
										case "meta":
											if (o = Vf("meta", "content", i).get(r + (n.content || ""))) {
												for (c = 0; c < o.length; c++) if (a = o[c], a.getAttribute("content") === (n.content == null ? null : "" + n.content) && a.getAttribute("name") === (n.name == null ? null : n.name) && a.getAttribute("property") === (n.property == null ? null : n.property) && a.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && a.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
													o.splice(c, 1);
													break b;
												}
											}
											a = i.createElement(r), Pd(a, r, n), i.head.appendChild(a);
											break;
										default: throw Error(s(468, r));
									}
									a[mt] = e, j(a), r = a;
								}
								e.stateNode = r;
							} else Hf(i, e.type, e.stateNode);
						} else e.stateNode = If(i, r, e.memoizedProps);
					} else a === r ? r === null && e.stateNode !== null && Xc(e, e.memoizedProps, n.memoizedProps) : (a === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : a.count--, r === null ? Hf(i, e.type, e.stateNode) : If(i, r, e.memoizedProps));
				}
				break;
			case 27:
				gl(t, e), yl(e), r & 512 && (U || n === null || Jc(n, n.return)), n !== null && r & 4 && Xc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (gl(t, e), yl(e), r & 512 && (U || n === null || Jc(n, n.return)), e.flags & 32) {
					i = e.stateNode;
					try {
						Qt(i, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (i = e.memoizedProps, Xc(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (rl = !0);
				break;
			case 6:
				if (gl(t, e), yl(e), r & 4) {
					if (e.stateNode === null) throw Error(s(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, i = _l, _l = gf(t.containerInfo), gl(t, e), _l = i, yl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				rl && (rl = !1, bl(e));
				break;
			case 4:
				r = _l, _l = gf(e.stateNode.containerInfo), gl(t, e), yl(e), _l = r;
				break;
			case 12:
				gl(t, e), yl(e);
				break;
			case 31:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 13:
				gl(t, e), yl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = Ne()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 22:
				i = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = nl, d = U;
				if (nl = u || i, U = d || l, gl(t, e), U = d, nl = u, yl(e), r & 8192) a: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || l || nl || U || Sl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (a = l.stateNode, i) o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = i ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								i ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, hl(e, n))));
				break;
			case 19:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: gl(t, e), yl(e);
		}
	}
	function yl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Zc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(s(160));
				switch (n.tag) {
					case 27:
						var i = n.stateNode;
						el(e, Qc(e), i);
						break;
					case 5:
						var a = n.stateNode;
						n.flags & 32 && (Qt(a, ""), n.flags &= -33), el(e, Qc(e), a);
						break;
					case 3:
					case 4:
						var o = n.stateNode.containerInfo;
						$c(e, Qc(e), o);
						break;
					default: throw Error(s(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function bl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			bl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function xl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) sl(e, t.alternate, t), t = t.sibling;
	}
	function Sl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Wc(4, t, t.return), Sl(t);
					break;
				case 1:
					Jc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Kc(t, t.return, n), Sl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Jc(t, t.return), Sl(t);
					break;
				case 22:
					t.memoizedState === null && Sl(t);
					break;
				case 30:
					Sl(t);
					break;
				default: Sl(t);
			}
			e = e.sibling;
		}
	}
	function Cl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Cl(i, a, n), Uc(4, a);
					break;
				case 1:
					if (Cl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) to(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Gc(a), qc(a, a.return);
					break;
				case 27: tl(a);
				case 26:
				case 5:
					Cl(i, a, n), n && r === null && o & 4 && Yc(a), qc(a, a.return);
					break;
				case 12:
					Cl(i, a, n);
					break;
				case 31:
					Cl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 13:
					Cl(i, a, n), n && o & 4 && pl(i, a);
					break;
				case 22:
					a.memoizedState === null && Cl(i, a, n), qc(a, a.return);
					break;
				case 30: break;
				default: Cl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ma(n));
	}
	function Tl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ma(e));
	}
	function El(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Dl(e, t, n, r), t = t.sibling;
	}
	function Dl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				El(e, t, n, r), i & 2048 && Uc(9, t);
				break;
			case 1:
				El(e, t, n, r);
				break;
			case 3:
				El(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ma(e)));
				break;
			case 12:
				if (i & 2048) {
					El(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else El(e, t, n, r);
				break;
			case 31:
				El(e, t, n, r);
				break;
			case 13:
				El(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? El(e, t, n, r) : (a._visibility |= 2, Ol(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? El(e, t, n, r) : kl(e, t), i & 2048 && wl(o, t);
				break;
			case 24:
				El(e, t, n, r), i & 2048 && Tl(t.alternate, t);
				break;
			default: El(e, t, n, r);
		}
	}
	function Ol(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ol(a, o, s, c, i), Uc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ol(a, o, s, c, i)) : u._visibility & 2 ? Ol(a, o, s, c, i) : kl(a, o), i && l & 2048 && wl(o.alternate, o);
					break;
				case 24:
					Ol(a, o, s, c, i), i && l & 2048 && Tl(o.alternate, o);
					break;
				default: Ol(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function kl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					kl(n, r), i & 2048 && wl(r.alternate, r);
					break;
				case 24:
					kl(n, r), i & 2048 && Tl(r.alternate, r);
					break;
				default: kl(n, r);
			}
			t = t.sibling;
		}
	}
	var Al = 8192;
	function jl(e, t, n) {
		if (e.subtreeFlags & Al) for (e = e.child; e !== null;) Ml(e, t, n), e = e.sibling;
	}
	function Ml(e, t, n) {
		switch (e.tag) {
			case 26:
				jl(e, t, n), e.flags & Al && e.memoizedState !== null && Gf(n, _l, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				jl(e, t, n);
				break;
			case 3:
			case 4:
				var r = _l;
				_l = gf(e.stateNode.containerInfo), jl(e, t, n), _l = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Al, Al = 16777216, jl(e, t, n), Al = r) : jl(e, t, n));
				break;
			default: jl(e, t, n);
		}
	}
	function Nl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Fl(e), e = e.sibling;
	}
	function Fl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Pl(e), e.flags & 2048 && Wc(9, e, e.return);
				break;
			case 3:
				Pl(e);
				break;
			case 12:
				Pl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Il(e)) : Pl(e);
				break;
			default: Pl(e);
		}
	}
	function Il(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Wc(8, t, t.return), Il(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Il(t));
					break;
				default: Il(t);
			}
			e = e.sibling;
		}
	}
	function Ll(e, t) {
		for (; al !== null;) {
			var n = al;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Wc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ma(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, al = r;
			else a: for (n = e; al !== null;) {
				r = al;
				var i = r.sibling, a = r.return;
				if (cl(r), r === n) {
					al = null;
					break a;
				}
				if (i !== null) {
					i.return = a, al = i;
					break a;
				}
				al = a;
			}
		}
	}
	var Rl = {
		getCacheForType: function(e) {
			var t = sa(P), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return sa(P).controller.signal;
		}
	}, zl = typeof WeakMap == "function" ? WeakMap : Map, G = 0, K = null, q = null, J = 0, Y = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, X = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return G & 2 && J !== 0 ? J & -J : E.T === null ? dt() : dd();
	}
	function mu() {
		if (Jl === 0) {
			if (!(J & 536870912) || N) {
				var e = Xe;
				Xe <<= 1, !(Xe & 3932160) && (Xe = 262144), Jl = e;
			} else Jl = 536870912;
		}
		return e = co.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === K && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, J, Jl, !1)), it(e, n), (!(G & 2) || e !== K) && (e === K && (!(G & 2) && (Kl |= n), X === 4 && yu(e, J, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (G & 6) throw Error(s(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || et(e, t), i = r ? Au(e, t) : Ou(e, t, !0), a = r;
		do {
			if (i === 0) {
				Hl && !r && yu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, a && !vu(n)) {
				i = Ou(e, t, !1), a = !1;
				continue;
			}
			if (i === 2) {
				if (a = t, e.errorRecoveryDisabledLanes & a) var o = 0;
				else o = e.pendingLanes & -536870913, o = o === 0 ? o & 536870912 ? 536870912 : 0 : o;
				if (o !== 0) {
					t = o;
					a: {
						var c = e;
						i = Xl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Su(c, o).flags |= 256), o = Ou(c, o, !1), o !== 2) {
							if (Ul && !l) {
								c.errorRecoveryDisabledLanes |= a, Kl |= a, i = 4;
								break a;
							}
							a = Zl, Zl = i, a !== null && (Zl === null ? Zl = a : Zl.push.apply(Zl, a));
						}
						i = o;
					}
					if (a = !1, i !== 2) continue;
				}
			}
			if (i === 1) {
				Su(e, 0), yu(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, a = i, a) {
					case 0:
					case 1: throw Error(s(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						yu(r, t, Jl, !Vl);
						break a;
					case 2:
						Zl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(s(329));
				}
				if ((t & 62914560) === t && (i = $l + 300 - Ne(), 10 < i)) {
					if (yu(r, t, Jl, !Vl), $e(r, 0, !0) !== 0) break a;
					su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, a, "Throttled", -0, 0), i);
					break a;
				}
				_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, a, null, -0, 0);
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: sn
			}, Ml(t, a, d);
			var m = (a & 62914560) === a ? $l - Ne() : (a & 4194048) === a ? eu - Ne() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!kr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ge(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ot(e, n, t);
	}
	function bu() {
		return G & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (q !== null) {
			if (Y === 0) var e = q.return;
			else e = q, $i = Qi = null, Mo(e), La = null, Ra = 0, e = q;
			for (; e !== null;) Hc(e.alternate, e), e = e.return;
			q = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), K = e, q = n = _i(e.current, null), J = t, Y = 0, Bl = null, Vl = !1, Hl = et(e, t), Ul = !1, Yl = Jl = ql = Kl = Gl = X = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ge(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, si(), n;
	}
	function Cu(e, t) {
		I = null, E.H = Vs, t === Da || t === ka ? (t = Fa(), Y = 3) : t === Oa ? (t = Fa(), Y = 4) : Y = t === ac ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, q === null && (X = 1, $s(e, Ti(t, e.current)));
	}
	function wu() {
		var e = co.current;
		return e === null ? !0 : (J & 4194048) === J ? lo === null : (J & 62914560) === J || J & 536870912 ? e === lo : !1;
	}
	function Tu() {
		var e = E.H;
		return E.H = Vs, e === null ? Vs : e;
	}
	function Eu() {
		var e = E.A;
		return E.A = Rl, e;
	}
	function Du() {
		X = 4, Vl || (J & 4194048) !== J && co.current !== null || (Hl = !0), !(Gl & 134217727) && !(Kl & 134217727) || K === null || yu(K, J, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = G;
		G |= 2;
		var i = Tu(), a = Eu();
		(K !== e || J !== t) && (nu = null, Su(e, t)), t = !1;
		var o = X;
		a: do
			try {
				if (Y !== 0 && q !== null) {
					var s = q, c = Bl;
					switch (Y) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							co.current === null && (t = !0);
							var l = Y;
							if (Y = 0, Bl = null, Pu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = Y, Y = 0, Bl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = X;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, $i = Qi = null, G = r, E.H = i, E.A = a, q === null && (K = null, J = 0, si()), o;
	}
	function ku() {
		for (; q !== null;) Mu(q);
	}
	function Au(e, t) {
		var n = G;
		G |= 2;
		var r = Tu(), i = Eu();
		K !== e || J !== t ? (nu = null, tu = Ne() + 500, Su(e, t)) : Hl = et(e, t);
		a: do
			try {
				if (Y !== 0 && q !== null) {
					t = q;
					var a = Bl;
					b: switch (Y) {
						case 1:
							Y = 0, Bl = null, Pu(e, t, a, 1);
							break;
						case 2:
						case 9:
							if (ja(a)) {
								Y = 0, Bl = null, Nu(t);
								break;
							}
							t = function() {
								Y !== 2 && Y !== 9 || K !== e || (Y = 7), rd(e);
							}, a.then(t, t);
							break a;
						case 3:
							Y = 7;
							break a;
						case 4:
							Y = 5;
							break a;
						case 7:
							ja(a) ? (Y = 0, Bl = null, Nu(t)) : (Y = 0, Bl = null, Pu(e, t, a, 7));
							break;
						case 5:
							var o = null;
							switch (q.tag) {
								case 26: o = q.memoizedState;
								case 5:
								case 27:
									var c = q;
									if (o ? Wf(o) : c.stateNode.complete) {
										Y = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) q = l;
										else {
											var u = c.return;
											u === null ? q = null : (q = u, Fu(u));
										}
										break b;
									}
							}
							Y = 0, Bl = null, Pu(e, t, a, 5);
							break;
						case 6:
							Y = 0, Bl = null, Pu(e, t, a, 6);
							break;
						case 8:
							xu(), X = 6;
							break a;
						default: throw Error(s(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return $i = Qi = null, E.H = r, E.A = i, G = n, q === null ? (K = null, J = 0, si(), X) : 0;
	}
	function ju() {
		for (; q !== null && !je();) Mu(q);
	}
	function Mu(e) {
		var t = Pc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = vc(n, t, t.pendingProps, t.type, void 0, J);
				break;
			case 11:
				t = vc(n, t, t.pendingProps, t.type.render, t.ref, J);
				break;
			case 5: Mo(t);
			default: Hc(n, t), t = q = vi(t, Wl), t = Pc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Pu(e, t, n, r) {
		$i = Qi = null, Mo(t), La = null, Ra = 0;
		var i = t.return;
		try {
			if (ic(e, i, t, n, J)) {
				X = 1, $s(e, Ti(n, e.current)), q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw q = i, t;
			X = 1, $s(e, Ti(n, e.current)), q = null;
			return;
		}
		t.flags & 32768 ? (N || r === 1 ? e = !0 : Hl || J & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = co.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Vl);
				return;
			}
			e = t.return;
			var n = Bc(t.alternate, t, Wl);
			if (n !== null) {
				q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				q = t;
				return;
			}
			q = t = e;
		} while (t !== null);
		X === 0 && (X = 5);
	}
	function Iu(e, t) {
		do {
			var n = Vc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				q = e;
				return;
			}
			q = e = n;
		} while (e !== null);
		X = 6, q = null;
	}
	function Lu(e, t, n, r, i, a, o, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (G & 6) throw Error(s(327));
		if (t !== null) {
			if (t === e.current) throw Error(s(177));
			if (a = t.lanes | t.childLanes, a |= oi, at(e, n, a, o, c, l), e === K && (q = K = null, J = 0), ou = t, au = e, su = n, cu = a, lu = i, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Le, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = E.T, E.T = null, i = D.p, D.p = 2, o = G, G |= 4;
				try {
					ol(e, t, n);
				} finally {
					G = o, D.p = i, E.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = G;
				G |= 4;
				try {
					vl(t, e);
					var a = zd, o = Pr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Nr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Fr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Mr(s, h), v = Mr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					G = i, D.p = r, E.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = G;
				G |= 4;
				try {
					sl(e, t.alternate, t);
				} finally {
					G = i, D.p = r, E.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, Me();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), ut(n), t = t.stateNode, Ue && typeof Ue.onCommitFiberRoot == "function") try {
				Ue.onCommitFiberRoot(He, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = E.T, i = D.p, D.p = 2, E.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					E.T = t, D.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ma(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = ut(su), r = E.T, i = D.p;
		try {
			D.p = 32 > n ? 32 : n, E.T = null, n = lu, lu = null;
			var a = au, o = su;
			if (iu = 0, ou = au = null, su = 0, G & 6) throw Error(s(331));
			var c = G;
			if (G |= 4, Fl(a.current), Dl(a, a.current, o, n), G = c, id(0, !1), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
				Ue.onPostCommitFiberRoot(He, a);
			} catch {}
			return !0;
		} finally {
			D.p = i, E.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = Ti(n, t), t = tc(e.stateNode, t, 2), e = Ya(e, t, 2), e !== null && (it(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = Ti(n, e), n = nc(2), r = Ya(t, n, 2), r !== null && (rc(n, r, t, e), it(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new zl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, K === e && (J & n) === n && (X === 4 || X === 3 && (J & 62914560) === J && 300 > Ne() - $l ? !(G & 2) && Su(e, 0) : ql |= n, Yl === J && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = nt()), e = ui(e, t), e !== null && (it(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, i = e.memoizedState;
				i !== null && (n = i.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(s(314));
		}
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return ke(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Ge(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, ld(r, a));
						} else a = J, a = $e(r, r === K ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || et(r, a) || (n = !0, ld(r, a));
					}
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = Ne(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ge(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = tt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = K, n = J, n = $e(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ae(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || et(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ae(r), ut(n)) {
				case 2:
				case 8:
					n = Ie;
					break;
				case 32:
					n = Le;
					break;
				case 268435456:
					n = ze;
					break;
				default: n = Le;
			}
			return r = cd.bind(null, e), n = ke(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ae(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = J;
		return r = $e(e, e === K ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, Ne()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			G & 6 ? ke(Fe, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = _a;
			e === 0 && (e = Ye, Ye <<= 1, !(Ye & 261888) && (Ye = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : on("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[ht] || null).action), o = r.submitter;
			o && (t = (t = o[ht] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new On("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								Ds(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), Ds(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var hd = 0; hd < ti.length; hd++) {
		var gd = ti[hd];
		ni(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	ni(qr, "onAnimationEnd"), ni(Jr, "onAnimationIteration"), ni(Yr, "onAnimationStart"), ni("dblclick", "onDoubleClick"), ni("focusin", "onFocus"), ni("focusout", "onBlur"), ni(Xr, "onTransitionRun"), ni(Zr, "onTransitionStart"), ni(Qr, "onTransitionCancel"), ni($r, "onTransitionEnd"), At("onMouseEnter", ["mouseout", "mouseover"]), At("onMouseLeave", ["mouseout", "mouseover"]), At("onPointerEnter", ["pointerout", "pointerover"]), At("onPointerLeave", ["pointerout", "pointerover"]), kt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), kt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), kt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), kt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), kt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), kt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ri(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ri(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[_t];
		n === void 0 && (n = t[_t] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, Dt.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !_n || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var c = o.tag;
					if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = Ct(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		mn(function() {
			var r = a, i = ln(n), o = [];
			a: {
				var s = ei.get(e);
				if (s !== void 0) {
					var c = On, u = e;
					switch (e) {
						case "keypress": if (Cn(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = Kn;
							break;
						case "focusin":
							u = "focus", c = Ln;
							break;
						case "focusout":
							u = "blur", c = Ln;
							break;
						case "beforeblur":
						case "afterblur":
							c = Ln;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							c = Fn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = In;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = Jn;
							break;
						case qr:
						case Jr:
						case Yr:
							c = Rn;
							break;
						case $r:
							c = Yn;
							break;
						case "scroll":
						case "scrollend":
							c = An;
							break;
						case "wheel":
							c = Xn;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = zn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							c = qn;
							break;
						case "toggle":
						case "beforetoggle": c = Zn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? s === null ? null : s + "Capture" : s;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = hn(m, p), g != null && d.push(Td(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (s = new c(s, u, null, n, i), o.push({
						event: s,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== cn && (u = n.relatedTarget || n.fromElement) && (Ct(u) || u[gt])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (u = n.relatedTarget || n.toElement, c = r, u = u ? Ct(u) : null, u !== null && (f = l(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (c = null, u = r), c !== u)) {
						if (d = Fn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = qn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? s : Tt(c), h = u == null ? s : Tt(u), s = new d(g, m + "leave", c, n, i), s.target = f, s.relatedTarget = h, g = null, Ct(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, c && u) b: {
							for (d = Dd, p = c, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						c !== null && Od(o, s, c, d, !1), u !== null && f !== null && Od(o, f, u, d, !0);
					}
				}
				a: {
					if (s = r ? Tt(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var v = _r;
					else if (dr(s)) {
						if (vr) v = Dr;
						else {
							v = Tr;
							var y = wr;
						}
					} else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && nn(r.elementType) && (v = _r) : v = Er;
					if (v &&= v(e, r)) {
						fr(o, v, n, i);
						break a;
					}
					y && y(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && Jt(s, "number", s.value);
				}
				switch (y = r ? Tt(r) : window, e) {
					case "focusin":
						(dr(y) || y.contentEditable === "true") && (Lr = y, Rr = r, zr = null);
						break;
					case "focusout":
						zr = Rr = Lr = null;
						break;
					case "mousedown":
						Br = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Br = !1, Vr(o, n, i);
						break;
					case "selectionchange": if (Ir) break;
					case "keydown":
					case "keyup": Vr(o, n, i);
				}
				var b;
				if ($n) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else sr ? ar(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (nr && n.locale !== "ko" && (sr || x !== "onCompositionStart" ? x === "onCompositionEnd" && sr && (b = Sn()) : (yn = i, bn = "value" in yn ? yn.value : yn.textContent, sr = !0)), y = Ed(r, x), 0 < y.length && (x = new Bn(x, e, null, n, i), o.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = or(n), b !== null && (x.data = b)))), (b = tr ? cr(e, n) : lr(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new Bn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: y,
					listeners: x
				}), y.data = b)), md(o, e, r, n, i);
			}
			yd(o, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = hn(e, n), i != null && r.unshift(Td(e, i, a)), i = hn(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = hn(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = hn(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, i, a) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Qt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Qt(e, "" + r);
				break;
			case "className":
				It(e, "class", r);
				break;
			case "tabIndex":
				It(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				It(e, n, r);
				break;
			case "style":
				tn(e, r, a);
				break;
			case "data": if (t !== "object") {
				It(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = on("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof a == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", i.name, i, null), $(e, t, "formEncType", i.formEncType, i, null), $(e, t, "formMethod", i.formMethod, i, null), $(e, t, "formTarget", i.formTarget, i, null)) : ($(e, t, "encType", i.encType, i, null), $(e, t, "method", i.method, i, null), $(e, t, "target", i.target, i, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = on("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = sn);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(s(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(s(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = on("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), Ft(e, "popover", r);
				break;
			case "xlinkActuate":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Ft(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = rn.get(n) || n, Ft(e, n, r));
		}
	}
	function Nd(e, t, n, r, i, a) {
		switch (n) {
			case "style":
				tn(e, r, a);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(s(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(s(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Qt(e, r) : (typeof r == "number" || typeof r == "bigint") && Qt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = sn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Ot.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[ht] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
					typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Ft(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, i = !1, a;
				for (a in n) if (n.hasOwnProperty(a)) {
					var o = n[a];
					if (o != null) switch (a) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							i = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(s(137, t));
						default: $(e, t, a, o, n, null);
					}
				}
				i && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = a = o = i = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							i = d;
							break;
						case "type":
							o = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							a = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(s(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				qt(e, a, c, l, u, o, i, !1);
				return;
			case "select":
				for (i in Q("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
					case "value":
						a = c;
						break;
					case "defaultValue":
						o = c;
						break;
					case "multiple": r = c;
					default: $(e, t, i, c, n, null);
				}
				t = a, n = o, e.multiple = !!r, t == null ? n != null && Yt(e, !!r, n, !0) : Yt(e, !!r, t, !1);
				return;
			case "textarea":
				for (o in Q("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (c = n[o], c != null)) switch (o) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						i = c;
						break;
					case "children":
						a = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(s(91));
						break;
					default: $(e, t, o, c, n, null);
				}
				Zt(e, r, i, a);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(s(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (nn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var i = null, a = null, o = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							a = m;
							break;
						case "name":
							i = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							o = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(s(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Kt(e, o, c, l, u, d, a, i);
				return;
			case "select":
				for (a in m = o = c = p = null, n) if (l = n[a], n.hasOwnProperty(a) && l != null) switch (a) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(a) || $(e, t, a, null, r, l);
				}
				for (i in r) if (a = r[i], l = n[i], r.hasOwnProperty(i) && (a != null || l != null)) switch (i) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						c = a;
						break;
					case "multiple": o = a;
					default: a !== l && $(e, t, i, a, r, l);
				}
				t = c, n = o, r = m, p == null ? !!r != !!n && (t == null ? Yt(e, !!n, n ? [] : "", !1) : Yt(e, !!n, t, !0)) : Yt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, i);
				}
				for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
					case "value":
						p = i;
						break;
					case "defaultValue":
						m = i;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (i != null) throw Error(s(91));
						break;
					default: i !== a && $(e, t, o, i, r, a);
				}
				Xt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(s(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (nn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Wd && (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Np(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") pf(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, pf(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[xt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && pf(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), St(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[xt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(s(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(s(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(s(454));
				return e;
			default: throw Error(s(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		St(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = D.d;
	D.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = wt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ks(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Gt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), j(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Gt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Gt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Gt(n.imageSizes) + "\"]")) : i += "[href=\"" + Gt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), j(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Gt(r) + "\"][href=\"" + Gt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), j(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = Et(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					j(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = Et(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), j(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = Et(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), j(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var i = (i = A.current) ? gf(i) : null;
		if (!i) throw Error(s(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = Et(i).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var a = Et(i).hoistableStyles, o = a.get(e);
					if (o || (i = i.ownerDocument || i, o = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, a.set(e, o), (a = i.querySelector(jf(e))) && !a._p && (o.instance = a, o.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), a || Nf(i, e, n, o.state))), t && r === null) throw Error(s(528, ""));
					return o;
				}
				if (t && r !== null) throw Error(s(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = Et(i).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(s(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + Gt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), j(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Gt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Gt(n.href) + "\"]");
				if (r) return t.instance = r, j(r), r;
				var i = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), j(r), Pd(r, "style", i), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				i = Af(n.href);
				var a = e.querySelector(jf(i));
				if (a) return t.state.loading |= 4, t.instance = a, j(a), a;
				r = Mf(n), (i = mf.get(i)) && Rf(r, i), a = (e.ownerDocument || e).createElement("link"), j(a);
				var o = a;
				return o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), t.state.loading |= 4, Lf(a, n.precedence, e), t.instance = a;
			case "script": return a = Pf(n.src), (i = e.querySelector(Ff(a))) ? (t.instance = i, j(i), i) : (r = n, (i = mf.get(a)) && (r = h({}, n), zf(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), j(i), Pd(i, "link", r), e.head.appendChild(i), t.instance = i);
			case "void": return null;
			default: throw Error(s(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[xt] || a[mt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, j(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), j(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: ue,
		_currentValue2: ue,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rt(0), this.hiddenUpdates = rt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = hi(3, null, null, t), e.current = a, a.stateNode = e, t = pa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ka(a), e;
	}
	function tp(e) {
		return e ? (e = pi, e) : pi;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ja(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ya(e, r, t), n !== null && (hu(n, e, t), Xa(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ui(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = lt(t);
			var n = ui(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 2, up(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 8, up(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = wt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Qe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ge(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(G & 6) && (tu = Ne() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ui(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = ln(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = Ct(e), e !== null) {
			var t = l(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = u(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = d(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Pe()) {
				case Fe: return 2;
				case Ie: return 8;
				case Le:
				case Re: return 32;
				case ze: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = wt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = Ct(e.target);
		if (t !== null) {
			var n = l(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = u(n), t !== null) {
						e.blockedOn = t, ft(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = d(n), t !== null) {
						e.blockedOn = t, ft(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				cn = r, n.target.dispatchEvent(r), cn = null;
			} else return t = wt(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = wt(n);
				a !== null && (e.splice(t, 3), t -= 3, Ds(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ht] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ht] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(s(409));
		var n = t.current;
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[gt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = dt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = r.version;
	if (Lp !== "19.2.8") throw Error(s(527, Lp, "19.2.8"));
	D.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
		return e = p(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: E,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			He = zp.inject(Rp), Ue = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!c(e)) throw Error(s(299));
		var n = !1, r = "", i = Xs, a = Zs, o = Qs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, i, a, o, Pp), e[gt] = t.current, Sd(e), new Fp(t);
	};
})), c = /* @__PURE__ */ e(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = s();
})), l = i(), u = c(), d = null, f = 0, p = /* @__PURE__ */ new Set();
function m() {
	for (let e of p) e();
}
function h(e, t = 6e3) {
	clearTimeout(f), d = {
		...e,
		durata: t
	}, m(), f = setTimeout(g, t);
}
function g() {
	clearTimeout(f), d && (d = null, m());
}
function _() {
	return d;
}
function v(e) {
	return p.add(e), () => p.delete(e);
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var y = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), b = (/* @__PURE__ */ e(((e, t) => {
	t.exports = y();
})))(), x = (0, l.createContext)(null);
function S({ store: e, children: t }) {
	return /* @__PURE__ */ (0, b.jsx)(x.Provider, {
		value: e,
		children: t
	});
}
function C() {
	let e = (0, l.useContext)(x);
	if (!e) throw Error("useStore va usato dentro <FornitoreStore>");
	return e;
}
function w(e) {
	let t = C(), n = (0, l.useCallback)((n) => e ? t.iscriviEntita(e, n) : () => {}, [t, e]), r = (0, l.useCallback)(() => e ? t.entita(e) : void 0, [t, e]);
	return (0, l.useSyncExternalStore)(n, r);
}
function ee(e) {
	let t = C(), n = (e || []).join(","), r = (0, l.useMemo)(() => n ? n.split(",") : [], [n]), i = (0, l.useCallback)((e) => {
		let n = r.map((n) => t.iscriviEntita(n, e));
		return () => {
			for (let e of n) e();
		};
	}, [t, r]), a = (0, l.useCallback)(() => {
		let e = 0, n = 0;
		for (let i of r) {
			let r = t.entita(i);
			r?.state === "on" && (e += 1, n += r.attributes?.brightness ? r.attributes.brightness / 255 : 1);
		}
		return `${e}|${r.length}|${e ? (n / e).toFixed(2) : "0"}`;
	}, [t, r]), o = (0, l.useSyncExternalStore)(i, a);
	return (0, l.useMemo)(() => {
		let [e, t, n] = o.split("|");
		return {
			accese: Number(e),
			totale: Number(t),
			intensita: Number(n)
		};
	}, [o]);
}
function te() {
	return (0, l.useSyncExternalStore)(v, _);
}
function ne() {
	let e = C();
	return (0, l.useSyncExternalStore)(e.iscriviConfig, e.configurazione);
}
function T() {
	let e = C();
	return (0, l.useSyncExternalStore)(e.iscriviSessione, e.sessione);
}
function re() {
	let e = C();
	return (0, l.useSyncExternalStore)(e.iscriviSessione, e.attivita);
}
function ie() {
	let e = C();
	return (0, l.useMemo)(() => ({
		chiama: (t, n, r, i) => e.chiama(t, n, r, i),
		commuta(t, n) {
			let r = t.split(".")[0];
			return e.chiama(r, n ? "turn_off" : "turn_on", { entity_id: t }, { state: n ? "off" : "on" });
		},
		luminosita(t, n) {
			return e.chiama("light", "turn_on", {
				entity_id: t,
				brightness: n
			}, { state: "on" });
		},
		scena(t) {
			return e.chiama("scene", "turn_on", { entity_id: t });
		},
		temperatura(t, n) {
			return e.chiama("climate", "set_temperature", {
				entity_id: t,
				temperature: n
			}, { attributes: void 0 });
		}
	}), [e]);
}
//#endregion
//#region src/componenti/Sovrapposizione.jsx
var ae = o();
function oe({ children: e }) {
	let t = (0, l.useRef)(null), [n, r] = (0, l.useState)(null);
	return (0, l.useEffect)(() => {
		let e = t.current?.getRootNode?.();
		r(e?.querySelector?.(".casaos-mount") ?? null);
	}, []), /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("span", {
		ref: t,
		hidden: !0
	}), n ? (0, ae.createPortal)(e, n) : null] });
}
//#endregion
//#region src/componenti/DettaglioLuce.jsx
function se(e) {
	let t = e?.attributes?.supported_color_modes ?? [];
	return {
		intensita: t.length !== 1 || t[0] !== "onoff",
		colore: t.some((e) => [
			"hs",
			"rgb",
			"rgbw",
			"rgbww",
			"xy"
		].includes(e)),
		temperatura: t.includes("color_temp"),
		effetti: (e?.attributes?.effect_list ?? []).filter((e) => e && e !== "none"),
		minK: e?.attributes?.min_color_temp_kelvin ?? 2200,
		maxK: e?.attributes?.max_color_temp_kelvin ?? 6500
	};
}
function ce(e) {
	let t = se(e);
	return t.intensita || t.colore || t.temperatura || t.effetti.length > 0;
}
var le = [
	{
		nome: "Bianco caldo",
		hs: [30, 25]
	},
	{
		nome: "Ambra",
		hs: [35, 85]
	},
	{
		nome: "Arancione",
		hs: [20, 100]
	},
	{
		nome: "Rosso",
		hs: [0, 100]
	},
	{
		nome: "Rosa",
		hs: [320, 70]
	},
	{
		nome: "Viola",
		hs: [275, 100]
	},
	{
		nome: "Blu",
		hs: [225, 100]
	},
	{
		nome: "Verde",
		hs: [120, 100]
	}
], E = ([e, t], n = 50) => `hsl(${e} ${t}% ${n}%)`;
function D(e) {
	if (!e) return null;
	let [t, n] = e;
	for (let e of le) if (Math.min(Math.abs(e.hs[0] - t), 360 - Math.abs(e.hs[0] - t)) <= 12 && Math.abs(e.hs[1] - n) <= 20) return e.nome;
	return null;
}
function ue(e) {
	let t = Math.max(0, Math.min(1, (e - 2e3) / 7e3));
	return `hsl(${30 + t * 180} ${70 - t * 45}% ${72 + t * 10}%)`;
}
function de({ etichetta: e, valore: t, min: n, max: r, passo: i = 1, sfondo: a, formato: o, onFine: s }) {
	let [c, u] = (0, l.useState)(t);
	return (0, l.useEffect)(() => u(t), [t]), /* @__PURE__ */ (0, b.jsxs)("label", {
		className: "cursore",
		children: [/* @__PURE__ */ (0, b.jsxs)("span", {
			className: "cursore-testa",
			children: [/* @__PURE__ */ (0, b.jsx)("span", {
				className: "cursore-nome",
				children: e
			}), /* @__PURE__ */ (0, b.jsx)("span", {
				className: "cursore-valore",
				children: o(c)
			})]
		}), /* @__PURE__ */ (0, b.jsx)("input", {
			type: "range",
			min: n,
			max: r,
			step: i,
			value: c,
			style: a ? { "--traccia": a } : void 0,
			onChange: (e) => u(Number(e.target.value)),
			onPointerUp: () => s(c),
			onKeyUp: () => s(c)
		})]
	});
}
function fe({ entity_id: e, nome: t, onChiudi: n }) {
	let r = w(e), { chiama: i, commuta: a } = ie();
	(0, l.useEffect)(() => {
		let e = (e) => e.key === "Escape" && n();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [n]);
	let o = se(r), s = r?.state === "on", c = r?.attributes ?? {}, u = Math.round((c.brightness ?? 0) / 255 * 100), d = c.color_temp_kelvin ?? Math.round((o.minK + o.maxK) / 2), f = c.hs_color ?? [30, 60], p = c.color_mode && c.color_mode !== "color_temp" && c.color_mode !== "onoff", m = p ? D(c.hs_color) : null, h = c.effect && c.effect !== "none" ? c.effect : null;
	function g() {
		let e = [];
		return o.intensita && c.brightness && e.push(`${u}%`), h ? e.push(`effetto ${h}`) : p ? e.push(m ? m.toLowerCase() : "colore") : c.color_mode === "color_temp" && c.color_temp_kelvin && e.push(`${c.color_temp_kelvin} K`), e.length ? `Accesa · ${e.join(" · ")}` : "Accesa";
	}
	let _ = (t) => i("light", "turn_on", {
		entity_id: e,
		...t
	}, { state: "on" });
	return /* @__PURE__ */ (0, b.jsx)(oe, { children: /* @__PURE__ */ (0, b.jsx)("div", {
		className: "velo-luce",
		onClick: n,
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "scheda-luce",
			role: "dialog",
			"aria-label": t,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, b.jsxs)("header", {
					className: "scheda-luce-testa",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", {
						className: "scheda-luce-nome",
						children: t
					}), /* @__PURE__ */ (0, b.jsx)("span", {
						className: "scheda-luce-stato",
						children: s ? g() : "Spenta"
					})] }), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "scheda-luce-azioni",
						children: [/* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "btn btn-conferma tap-target",
							onClick: () => a(e, s),
							children: s ? "Spegni" : "Accendi"
						}), /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "btn tap-target",
							onClick: n,
							children: "Chiudi"
						})]
					})]
				}),
				o.intensita && /* @__PURE__ */ (0, b.jsx)(de, {
					etichetta: "Intensità",
					valore: u,
					min: 1,
					max: 100,
					sfondo: "linear-gradient(90deg, #2b2b2b, #ffe9b8)",
					formato: (e) => `${e}%`,
					onFine: (e) => _({ brightness_pct: e })
				}),
				o.temperatura && /* @__PURE__ */ (0, b.jsx)(de, {
					etichetta: "Bianco",
					valore: d,
					min: o.minK,
					max: o.maxK,
					passo: 50,
					sfondo: `linear-gradient(90deg, ${ue(o.minK)}, ${ue((o.minK + o.maxK) / 2)}, ${ue(o.maxK)})`,
					formato: (e) => `${e} K`,
					onFine: (e) => _({ color_temp_kelvin: e })
				}),
				o.colore && /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "gruppo-colore",
					children: [
						/* @__PURE__ */ (0, b.jsxs)("span", {
							className: "cursore-testa",
							children: [/* @__PURE__ */ (0, b.jsx)("span", {
								className: "cursore-nome",
								children: "Colore"
							}), p && /* @__PURE__ */ (0, b.jsxs)("span", {
								className: "colore-adesso",
								children: [/* @__PURE__ */ (0, b.jsx)("span", {
									className: "colore-campione",
									style: { background: E(f) }
								}), m ?? "personalizzato"]
							})]
						}),
						/* @__PURE__ */ (0, b.jsx)("div", {
							className: "colori-pronti",
							children: le.map((e) => /* @__PURE__ */ (0, b.jsx)("button", {
								type: "button",
								className: "colore-pronto tap-target",
								"data-scelto": m === e.nome ? "si" : "no",
								style: { background: E(e.hs) },
								title: e.nome,
								"aria-label": e.nome,
								"aria-pressed": m === e.nome,
								onClick: () => _({ hs_color: e.hs })
							}, e.nome))
						}),
						/* @__PURE__ */ (0, b.jsx)(de, {
							etichetta: "Tinta",
							valore: Math.round(f[0]),
							min: 0,
							max: 360,
							sfondo: "linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
							formato: () => "",
							onFine: (e) => _({ hs_color: [e, Math.max(40, f[1] || 100)] })
						})
					]
				}),
				o.effetti.length > 0 && /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "gruppo-colore",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "cursore-nome",
						children: "Effetti"
					}), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "effetti",
						children: [o.effetti.map((e) => /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "effetto tap-target",
							"data-scelto": c.effect === e ? "si" : "no",
							onClick: () => _({ effect: e }),
							children: e
						}, e)), /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "effetto tap-target",
							"data-scelto": h ? "no" : "si",
							"aria-pressed": !h,
							onClick: () => _({ effect: "none" }),
							children: "nessuno"
						})]
					})]
				})
			]
		})
	}) });
}
//#endregion
//#region src/componenti/Luci.jsx
function pe({ accesa: e }) {
	return /* @__PURE__ */ (0, b.jsxs)("svg", {
		className: "lampadina",
		viewBox: "0 0 24 26",
		"data-accesa": e ? "si" : "no",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, b.jsx)("circle", {
				className: "lampadina-alone",
				cx: "12",
				cy: "10",
				r: "10"
			}),
			/* @__PURE__ */ (0, b.jsx)("path", {
				className: "lampadina-vetro",
				d: "M12 2.6a6.4 6.4 0 0 0-3.7 11.6c.5.4.9 1 .9 1.7v.6h5.6v-.6c0-.7.4-1.3.9-1.7A6.4 6.4 0 0 0 12 2.6Z"
			}),
			/* @__PURE__ */ (0, b.jsx)("path", {
				className: "lampadina-base",
				d: "M9.8 19.4h4.4M10.6 21.8h2.8"
			})
		]
	});
}
function O({ acceso: e, indisponibile: t }) {
	return /* @__PURE__ */ (0, b.jsx)("span", {
		className: "interruttore",
		"data-acceso": e ? "si" : "no",
		"data-off": t ? "si" : "no",
		children: /* @__PURE__ */ (0, b.jsx)("span", { className: "interruttore-pallino" })
	});
}
function k({ entity_id: e, nome: t }) {
	let n = w(e), { commuta: r } = ie(), i = !n || n.state === "unavailable" || n.state === "unknown", a = n?.state === "on", o = !!n?._previsto, s = n?.attributes?.brightness, c = a ? s ? Math.max(.35, s / 255) : 1 : 0, u = i ? "Non disponibile" : a ? s ? `Accesa · ${Math.round(s / 255 * 100)}%` : "Accesa" : "Spenta", [d, f] = (0, l.useState)(!1), p = !i && ce(n);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "voce",
		"data-stato": i ? "assente" : a ? "on" : "off",
		"data-previsto": o ? "si" : "no",
		style: { "--intensita": c },
		children: [
			/* @__PURE__ */ (0, b.jsxs)("button", {
				type: "button",
				className: "voce-principale tap-target",
				disabled: i,
				onClick: () => p ? f(!0) : r(e, a),
				"aria-label": p ? `${t}, ${u}. Tocca per regolare.` : `${t}, ${u}`,
				children: [
					/* @__PURE__ */ (0, b.jsx)(pe, { accesa: a }),
					/* @__PURE__ */ (0, b.jsxs)("span", {
						className: "voce-testo",
						children: [/* @__PURE__ */ (0, b.jsx)("span", {
							className: "voce-nome",
							children: t
						}), /* @__PURE__ */ (0, b.jsx)("span", {
							className: "voce-stato",
							children: u
						})]
					}),
					p && /* @__PURE__ */ (0, b.jsxs)("svg", {
						className: "voce-regolabile",
						viewBox: "0 0 24 24",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, b.jsx)("path", { d: "M5 8h9M17 8h2M5 16h3M11 16h8" }),
							/* @__PURE__ */ (0, b.jsx)("circle", {
								cx: "15",
								cy: "8",
								r: "2.2"
							}),
							/* @__PURE__ */ (0, b.jsx)("circle", {
								cx: "9.5",
								cy: "16",
								r: "2.2"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "voce-interruttore tap-target",
				disabled: i,
				onClick: () => r(e, a),
				"aria-label": a ? `Spegni ${t}` : `Accendi ${t}`,
				"aria-pressed": a,
				children: /* @__PURE__ */ (0, b.jsx)(O, {
					acceso: a,
					indisponibile: i
				})
			}),
			d && /* @__PURE__ */ (0, b.jsx)(fe, {
				entity_id: e,
				nome: t,
				onChiudi: () => f(!1)
			})
		]
	});
}
function me({ nome: e, dispositivi: t }) {
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "gruppo",
		children: [/* @__PURE__ */ (0, b.jsx)("h3", {
			className: "gruppo-titolo",
			children: e
		}), /* @__PURE__ */ (0, b.jsx)("div", {
			className: "gruppo-corpo",
			children: t.map((e) => /* @__PURE__ */ (0, b.jsx)(k, { ...e }, e.entity_id))
		})]
	});
}
function he({ casa: e }) {
	let t = [...e.luci || [], ...e.prese || []], n = e.stanze || [], r = n.map((e) => ({
		...e,
		dispositivi: t.filter((t) => t.stanza === e.id)
	})).filter((e) => e.dispositivi.length > 0), i = new Set(n.map((e) => e.id)), a = t.filter((e) => !e.stanza || !i.has(e.stanza));
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "elenco-stanze",
		children: [r.map((e) => /* @__PURE__ */ (0, b.jsx)(me, {
			nome: e.nome,
			dispositivi: e.dispositivi
		}, e.id)), a.length > 0 && /* @__PURE__ */ (0, b.jsx)(me, {
			nome: "Senza stanza",
			dispositivi: a
		})]
	});
}
//#endregion
//#region src/componenti/SegniStanza.jsx
var A = "segno-nucleo", ge = {
	salone: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M6 20v-5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 20h24v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" }),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M9 12v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M8 27v2M24 27v2" })
	] }),
	cucina: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("rect", {
			x: "5",
			y: "9",
			width: "22",
			height: "16",
			rx: "3"
		}),
		/* @__PURE__ */ (0, b.jsx)("circle", {
			className: A,
			cx: "11.5",
			cy: "15",
			r: "3"
		}),
		/* @__PURE__ */ (0, b.jsx)("circle", {
			className: A,
			cx: "20.5",
			cy: "15",
			r: "3"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M9 21h14" })
	] }),
	lavanderia: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("rect", {
			x: "7",
			y: "4",
			width: "18",
			height: "24",
			rx: "3"
		}),
		/* @__PURE__ */ (0, b.jsx)("circle", {
			className: A,
			cx: "16",
			cy: "18",
			r: "6"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M12.5 18a3.5 3.5 0 0 1 7 0" }),
		/* @__PURE__ */ (0, b.jsx)("circle", {
			cx: "11",
			cy: "8.5",
			r: "1"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M18 8.5h4" })
	] }),
	doccia: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M16 4v6" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M8 12a8 8 0 0 1 16 0z" }),
		/* @__PURE__ */ (0, b.jsxs)("g", {
			className: A,
			children: [/* @__PURE__ */ (0, b.jsx)("path", { d: "M11 17v2M16 18v2.5M21 17v2" }), /* @__PURE__ */ (0, b.jsx)("path", { d: "M12.5 23v2M19.5 23v2" })]
		})
	] }),
	lavabo: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M6 16h20a10 10 0 0 1-10 10 10 10 0 0 1-10-10z" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M16 16v-4a4 4 0 0 1 4-4h2" }),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M22 6v4"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 16h24" })
	] }),
	letto: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 24v-9a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v9" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 20h24" }),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M8 13v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 24v3M28 24v3" })
	] }),
	cameretta: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M5 25v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M5 22h18" }),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M9 16v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M27 6v10" }),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M27 6l-5 2 5 2z"
		})
	] }),
	armadio: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("path", {
		className: A,
		d: "M16 7a2.5 2.5 0 1 1 2.5 2.5c-1.4 0-2.5.9-2.5 2.5"
	}), /* @__PURE__ */ (0, b.jsx)("path", { d: "M16 12L5 21a1.5 1.5 0 0 0 1 2.6h20a1.5 1.5 0 0 0 1-2.6z" })] }),
	ingresso: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M7 28V13a9 9 0 0 1 18 0v15" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 28h24" }),
		/* @__PURE__ */ (0, b.jsx)("circle", {
			className: A,
			cx: "20.5",
			cy: "18",
			r: "1.4"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M16 4v-1" })
	] }),
	bbq: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M6 12h20a10 10 0 0 1-10 10A10 10 0 0 1 6 12z" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 12h24" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M11 21l-3 7M21 21l3 7" }),
		/* @__PURE__ */ (0, b.jsxs)("g", {
			className: A,
			children: [/* @__PURE__ */ (0, b.jsx)("path", { d: "M12 8c0-2 2-2 2-4 1.5 1.5 1 3 0 4" }), /* @__PURE__ */ (0, b.jsx)("path", { d: "M18 8c0-2 2-2 2-4 1.5 1.5 1 3 0 4" })]
		})
	] }),
	giochi: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 27L16 5l12 22" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M9 16h14" }),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M12 16v7M20 16v7"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M11 23h10"
		})
	] }),
	cucina_esterna: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 12L16 5l12 7" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M7 12v4" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M25 12v4" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M8 19h16a8 8 0 0 1-8 8 8 8 0 0 1-8-8z" }),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M6 19h20"
		})
	] }),
	piscina: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M4 13h24v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" }),
		/* @__PURE__ */ (0, b.jsxs)("g", {
			className: A,
			children: [/* @__PURE__ */ (0, b.jsx)("path", { d: "M6 18c2.5-2 4.5 2 7 0s4.5 2 7 0 4.5 2 6 0" }), /* @__PURE__ */ (0, b.jsx)("path", { d: "M6 23c2.5-2 4.5 2 7 0s4.5 2 7 0 4.5 2 6 0" })]
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M21 13V8a3 3 0 0 1 3-3M24 13V8" })
	] }),
	viale: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M12 28L14.5 8h3L20 28" }),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: A,
			d: "M14 22h4M14.6 17h2.8M15 12h2"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M6 26v-4M6 22a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M26 26v-5M26 21a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" })
	] }),
	stanza: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("path", { d: "M5 27V9l11-5 11 5v18z" }), /* @__PURE__ */ (0, b.jsx)("path", {
		className: A,
		d: "M13 27v-8h6v8"
	})] })
};
function _e(e = "", t = "") {
	let n = `${e} ${t}`.toLowerCase();
	return /salone|soggiorno|salotto/.test(n) ? ge.salone : /cucina.*ester|ester.*cucina/.test(n) ? ge.cucina_esterna : /lavanderia|lavatrice/.test(n) ? ge.lavanderia : /cucina/.test(n) ? ge.cucina : /cabina|armadio|guardaroba/.test(n) ? ge.armadio : /cameretta|bimb|bambin/.test(n) ? ge.cameretta : /camera|letto/.test(n) ? ge.letto : /bagno.*(camera|padronale)/.test(n) ? ge.lavabo : /bagno|doccia|wc/.test(n) ? ge.doccia : /bbq|barbecue|griglia|brace/.test(n) ? ge.bbq : /gioch|altalena|play/.test(n) ? ge.giochi : /piscina|pool/.test(n) ? ge.piscina : /viale|vialetto|giardino|verde/.test(n) ? ge.viale : /ingresso|entrata|portone/.test(n) ? ge.ingresso : ge.stanza;
}
function ve({ id: e, nome: t }) {
	return /* @__PURE__ */ (0, b.jsx)("svg", {
		className: "segno-stanza",
		viewBox: "0 0 32 32",
		"aria-hidden": "true",
		children: _e(e, t)
	});
}
//#endregion
//#region src/famiglie.js
var ye = /\b(luc[ei]|lucer|led|lamp|lampad|lampion|lume|faret|fanal|illumin|plafon|appliqu|abat|neon|spot|strisci|segna.?pass|piantana|candel|lanterna)/i, be = /\b(motion|detection|rileva|sensor|allarm|sirena|presa|socket|caric)/i, xe = /* @__PURE__ */ new Set([
	"switch",
	"fan",
	"vacuum",
	"media_player",
	"humidifier",
	"water_heater",
	"climate"
]);
function Se(e) {
	if (e?.categoria) return e.categoria;
	let t = String(e?.entity_id || "").split(".")[0];
	if (t === "light") return "luci";
	if (t === "cover" || t === "valve") return "infissi";
	if (t === "switch") {
		let t = `${e?.nome || ""} ${e?.entity_id || ""}`;
		if (ye.test(t) && !be.test(t)) return "luci";
	}
	return xe.has(t) ? "elettrodomestici" : "altro";
}
var Ce = {
	luci: "Luci",
	elettrodomestici: "Elettrodomestici",
	infissi: "Infissi",
	altro: "Altro"
}, we = [{
	id: "interno",
	nome: "Interno"
}, {
	id: "esterno",
	nome: "Esterno"
}], Te = [
	{
		id: "luci",
		nome: "Luci"
	},
	{
		id: "elettrodomestici",
		nome: "Elettrodomestici"
	},
	{
		id: "infissi",
		nome: "Infissi"
	},
	{
		id: "altro",
		nome: "Altro"
	}
];
function Ee(e) {
	let t = (e.luci || []).map((e) => ({
		...e,
		famiglia: Se(e)
	})), n = (e.prese || []).map((e) => ({
		...e,
		famiglia: "elettrodomestici"
	})), r = (e.dispositivi || []).map((e) => ({
		...e,
		famiglia: Se(e)
	}));
	return [
		...t,
		...n,
		...r
	];
}
function De({ entity_id: e, nome: t }) {
	let n = w(e), { chiama: r } = ie(), i = String(e).split(".")[0], a = !n || n.state === "unavailable" || n.state === "unknown", o = n?.state === "on" || n?.state === "open", s = !!n?._previsto, c = a ? "Non disponibile" : i === "cover" ? n.state === "open" ? "Aperto" : n.state === "closed" ? "Chiuso" : n.state : o ? "Acceso" : "Spento";
	return /* @__PURE__ */ (0, b.jsx)("button", {
		type: "button",
		className: "voce tap-target",
		"data-stato": a ? "assente" : o ? "on" : "off",
		"data-previsto": s ? "si" : "no",
		disabled: a,
		onClick: () => {
			if (i === "cover") {
				r("cover", o ? "close_cover" : "open_cover", { entity_id: e });
				return;
			}
			r(i, o ? "turn_off" : "turn_on", { entity_id: e }, { state: o ? "off" : "on" });
		},
		"aria-pressed": o,
		children: /* @__PURE__ */ (0, b.jsxs)("span", {
			className: "voce-testo",
			children: [/* @__PURE__ */ (0, b.jsx)("span", {
				className: "voce-nome",
				children: t
			}), /* @__PURE__ */ (0, b.jsx)("span", {
				className: "voce-stato",
				children: c
			})]
		})
	});
}
function Oe({ stanza: e, oggetti: t, onChiudi: n }) {
	let { chiama: r } = ie(), i = t.filter((e) => e.famiglia === "luci"), { accese: a } = ee(i.map((e) => e.entity_id));
	return (0, l.useEffect)(() => {
		let e = (e) => e.key === "Escape" && n();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [n]), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "velo-stanza",
		onClick: n,
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "dettaglio-stanza",
			role: "dialog",
			"aria-label": e.nome,
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, b.jsxs)("header", {
				className: "dettaglio-testa",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "dettaglio-identita",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "dettaglio-segno",
						"data-accesa": a > 0 ? "si" : "no",
						children: /* @__PURE__ */ (0, b.jsx)(ve, {
							id: e.id,
							nome: e.nome
						})
					}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", {
						className: "dettaglio-nome",
						children: e.nome
					}), /* @__PURE__ */ (0, b.jsxs)("span", {
						className: "dettaglio-zona",
						children: [e.zona === "esterno" ? "Esterno" : "Interno", a > 0 && ` · ${a} ${a === 1 ? "luce accesa" : "luci accese"}`]
					})] })]
				}), /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "dettaglio-azioni",
					children: [i.length > 0 && /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: "btn tap-target",
						onClick: () => r("light", "turn_off", { entity_id: i.map((e) => e.entity_id) }, { state: "off" }),
						disabled: a === 0,
						children: "Spegni tutte"
					}), /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: "btn tap-target",
						onClick: n,
						children: "Chiudi"
					})]
				})]
			}), /* @__PURE__ */ (0, b.jsx)("div", {
				className: "dettaglio-corpo",
				children: Te.map((e) => {
					let n = t.filter((t) => t.famiglia === e.id);
					return /* @__PURE__ */ (0, b.jsxs)("section", {
						className: "famiglia",
						children: [/* @__PURE__ */ (0, b.jsxs)("h3", {
							className: "famiglia-titolo",
							children: [e.nome, n.length > 0 && /* @__PURE__ */ (0, b.jsx)("span", {
								className: "famiglia-conto",
								children: n.length
							})]
						}), /* @__PURE__ */ (0, b.jsx)("div", {
							className: "famiglia-corpo",
							children: n.length === 0 ? /* @__PURE__ */ (0, b.jsx)("p", {
								className: "famiglia-vuota",
								children: "Ancora niente qui"
							}) : n.map((t) => e.id === "luci" ? /* @__PURE__ */ (0, b.jsx)(k, {
								entity_id: t.entity_id,
								nome: t.nome
							}, t.entity_id) : /* @__PURE__ */ (0, b.jsx)(De, {
								entity_id: t.entity_id,
								nome: t.nome
							}, t.entity_id))
						})]
					}, e.id);
				})
			})]
		})
	});
}
function ke({ stanza: e, oggetti: t, onApri: n, indice: r }) {
	let { accese: i, intensita: a } = ee((0, l.useMemo)(() => t.filter((e) => e.famiglia === "luci").map((e) => e.entity_id), [t])), o = i > 0;
	return /* @__PURE__ */ (0, b.jsxs)("button", {
		type: "button",
		className: "tessera-stanza tap-target anima-entrata",
		"data-accesa": o ? "si" : "no",
		style: {
			"--intensita": o ? Math.max(.55, a) : 0,
			"--i": r
		},
		onClick: () => n(e),
		"aria-label": `${e.nome}${o ? `, ${i} luci accese` : ""}`,
		children: [
			/* @__PURE__ */ (0, b.jsx)(ve, {
				id: e.id,
				nome: e.nome
			}),
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "tessera-nome",
				children: e.nome
			}),
			o && /* @__PURE__ */ (0, b.jsx)("span", {
				className: "tessera-conto",
				children: i
			})
		]
	});
}
function Ae({ casa: e }) {
	let [t, n] = (0, l.useState)(null), r = e.stanze || [], i = (0, l.useMemo)(() => Ee(e), [e]);
	if (r.length === 0) return /* @__PURE__ */ (0, b.jsx)("p", {
		className: "testo-secondario",
		children: "Nessuna stanza in configurazione."
	});
	let a = (e) => i.filter((t) => t.stanza === e);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "zone",
		children: [we.map((e) => {
			let t = r.filter((t) => (t.zona || "interno") === e.id);
			return t.length === 0 ? null : /* @__PURE__ */ (0, b.jsxs)("section", {
				className: "zona",
				children: [/* @__PURE__ */ (0, b.jsx)("h3", {
					className: "zona-titolo",
					children: e.nome
				}), /* @__PURE__ */ (0, b.jsx)("div", {
					className: "griglia-stanze",
					style: { "--colonne": Math.min(t.length, 10) },
					children: t.map((e, t) => /* @__PURE__ */ (0, b.jsx)(ke, {
						stanza: e,
						oggetti: a(e.id),
						onApri: n,
						indice: t
					}, e.id))
				})]
			}, e.id);
		}), t && /* @__PURE__ */ (0, b.jsx)(Oe, {
			stanza: t,
			oggetti: a(t.id),
			onChiudi: () => n(null)
		})]
	});
}
//#endregion
//#region src/componenti/Ingressi.jsx
var je = 4e3;
function Me({ entity_id: e, nome: t, tipo: n }) {
	let r = w(e), { chiama: i } = ie(), [a, o] = (0, l.useState)(!1), [s, c] = (0, l.useState)(!1);
	(0, l.useEffect)(() => {
		if (!s) return;
		let e = setTimeout(() => c(!1), je);
		return () => clearTimeout(e);
	}, [s]);
	let u = !r || r.state === "unavailable", d = r?.state === "open" || r?.state === "opening", f = u ? "Non disponibile" : n === "impulso" ? r.state === "on" ? "Attivo" : "Pronto" : d ? "Aperto" : "Chiuso", p = n === "impulso" ? "Apri" : d ? "Chiudi" : "Apri";
	async function m() {
		o(!1), c(!0), h({
			tipo: "cancello",
			nome: t,
			azione: n === "impulso" ? "apertura" : d ? "chiusura" : "apertura"
		}), navigator.vibrate?.([
			12,
			40,
			12
		]), n === "impulso" ? await i("switch", "turn_on", { entity_id: e }) : await i("cover", d ? "close_cover" : "open_cover", { entity_id: e }, { state: d ? "closing" : "opening" });
	}
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "cancello",
		"data-stato": u ? "assente" : d ? "aperto" : "chiuso",
		children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "voce-testo",
			children: [/* @__PURE__ */ (0, b.jsx)("span", {
				className: "voce-nome",
				children: t
			}), /* @__PURE__ */ (0, b.jsx)("span", {
				className: "voce-stato",
				children: f
			})]
		}), a ? /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "conferma",
			children: [/* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "btn btn-annulla tap-target",
				onClick: () => o(!1),
				children: "Annulla"
			}), /* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "btn btn-conferma tap-target",
				onClick: m,
				children: "Conferma"
			})]
		}) : /* @__PURE__ */ (0, b.jsx)("button", {
			type: "button",
			className: "btn btn-azione tap-target",
			disabled: u || s,
			onClick: () => o(!0),
			children: s ? "In corso…" : p
		})]
	});
}
function Ne({ entity_id: e, nome: t }) {
	let n = w(e), r = n?.state === "on", i = !n || n.state === "unavailable";
	return /* @__PURE__ */ (0, b.jsxs)("span", {
		className: "porta",
		"data-stato": i ? "assente" : r ? "aperta" : "chiusa",
		children: [
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "porta-segno",
				"aria-hidden": "true"
			}),
			t,
			r && " · aperta"
		]
	});
}
function Pe({ casa: e }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "ingressi",
		children: [/* @__PURE__ */ (0, b.jsx)("div", {
			className: "gruppo-corpo",
			children: e.ingressi.cancelli.map((e) => /* @__PURE__ */ (0, b.jsx)(Me, { ...e }, e.entity_id))
		}), /* @__PURE__ */ (0, b.jsx)("div", {
			className: "porte",
			children: e.ingressi.porte.map((e) => /* @__PURE__ */ (0, b.jsx)(Ne, { ...e }, e.entity_id))
		})]
	});
}
//#endregion
//#region src/componenti/ScenaEnergia.jsx
var Fe = .05, Ie = typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("offset-path", "path('M 0 0 L 10 10')"), Le = {
	solare: {
		percorso: "M 316 378 Q 388 424 452 468",
		colore: "var(--cs-energy-solar)"
	},
	casa: {
		percorso: "M 574 460 Q 640 420 702 380",
		colore: "var(--cs-energy-house)"
	},
	batteria: {
		percorso: "M 456 554 Q 380 602 302 650",
		colore: "var(--cs-energy-battery)"
	},
	rete: {
		percorso: "M 578 558 Q 668 606 764 654",
		colore: "var(--cs-energy-grid)"
	}
};
function Re(e) {
	return Math.min(4.5, Math.max(1.6, 4.5 - Math.abs(e) * .5));
}
function ze({ nome: e, potenza: t, comete: n, indietro: r }) {
	let { percorso: i, colore: a } = Le[e], o = t !== null && Math.abs(t) >= Fe, s = Re(t ?? 0);
	return o ? /* @__PURE__ */ (0, b.jsx)("g", {
		className: "flusso",
		style: { "--flusso-colore": a },
		children: Ie ? Array.from({ length: n }, (t, a) => /* @__PURE__ */ (0, b.jsxs)("g", {
			className: "cometa",
			style: {
				offsetPath: `path('${i}')`,
				offsetRotate: r ? "auto 180deg" : "auto",
				"--dur": `${s.toFixed(2)}s`,
				animationDelay: `${-a * s / n}s`,
				animationDirection: r ? "reverse" : "normal"
			},
			children: [
				/* @__PURE__ */ (0, b.jsx)("ellipse", {
					className: "cometa-scia",
					cx: "-30",
					rx: "34",
					ry: "7",
					fill: `url(#scia-${e})`
				}),
				/* @__PURE__ */ (0, b.jsx)("circle", {
					className: "cometa-alone",
					r: "17",
					fill: `url(#bagliore-${e})`
				}),
				/* @__PURE__ */ (0, b.jsx)("circle", {
					className: "cometa-testa",
					r: "5"
				})
			]
		}, a)) : /* @__PURE__ */ (0, b.jsx)("path", {
			className: "flusso-freccia",
			d: "M -10 -8 L 9 0 L -10 8 Z",
			style: {
				offsetPath: `path('${i}')`,
				offsetRotate: r ? "auto 180deg" : "auto"
			}
		})
	}) : null;
}
function Be({ posizione: e, titolo: t, valore: n, nota: r, tono: i }) {
	let [a, o] = n.split(" ");
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "lettura",
		"data-pos": e,
		"data-tono": i,
		children: [
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "lettura-titolo",
				children: t
			}),
			/* @__PURE__ */ (0, b.jsxs)("span", {
				className: "lettura-valore",
				children: [a, o && /* @__PURE__ */ (0, b.jsx)("span", {
					className: "lettura-unita",
					children: o
				})]
			}),
			r && /* @__PURE__ */ (0, b.jsx)("span", {
				className: "lettura-nota",
				children: r
			})
		]
	});
}
function Ve({ solare: e, consumo: t, batteria: n, carica: r, rete: i, regime: a = "strumento" }) {
	let { statico: o } = T(), s = a === "scena" ? 1 : 3, c = (e) => e === null ? "—" : `${Math.abs(e).toFixed(1)} kW`, l = n !== null && n > 0, u = i !== null && i > 0, d = (e) => e === null || Math.abs(e) < Fe, f = d(n) ? r === null ? "a riposo" : `a riposo · ${r}%` : `${l ? "in carica" : "in scarica"}${r === null ? "" : ` · ${r}%`}`, p = d(i) ? "a riposo" : u ? "cessione" : "prelievo";
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "scena-3d",
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "scena-quadro",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("svg", {
					className: "scena-energia",
					viewBox: "0 0 1024 1024",
					role: "img",
					"aria-label": `Solare ${c(e)}, casa ${c(t)}, batteria ${f}, rete ${p}`,
					children: [
						/* @__PURE__ */ (0, b.jsxs)("defs", { children: [Object.entries(Le).map(([e, { colore: t }]) => /* @__PURE__ */ (0, b.jsxs)("radialGradient", {
							id: `bagliore-${e}`,
							children: [
								/* @__PURE__ */ (0, b.jsx)("stop", {
									offset: "0%",
									stopColor: t,
									stopOpacity: "0.95"
								}),
								/* @__PURE__ */ (0, b.jsx)("stop", {
									offset: "32%",
									stopColor: t,
									stopOpacity: "0.45"
								}),
								/* @__PURE__ */ (0, b.jsx)("stop", {
									offset: "100%",
									stopColor: t,
									stopOpacity: "0"
								})
							]
						}, e)), Object.entries(Le).map(([e, { colore: t }]) => /* @__PURE__ */ (0, b.jsxs)("linearGradient", {
							id: `scia-${e}`,
							x1: "0",
							x2: "1",
							children: [/* @__PURE__ */ (0, b.jsx)("stop", {
								offset: "0%",
								stopColor: t,
								stopOpacity: "0"
							}), /* @__PURE__ */ (0, b.jsx)("stop", {
								offset: "100%",
								stopColor: t,
								stopOpacity: "0.6"
							})]
						}, `s-${e}`))] }),
						/* @__PURE__ */ (0, b.jsx)("image", {
							className: "sfondo-3d",
							href: `${o}/energia-3d.webp`,
							x: "0",
							y: "0",
							width: "1024",
							height: "1024"
						}),
						/* @__PURE__ */ (0, b.jsx)(ze, {
							nome: "solare",
							potenza: e,
							comete: s,
							indietro: !1
						}),
						/* @__PURE__ */ (0, b.jsx)(ze, {
							nome: "casa",
							potenza: t,
							comete: s,
							indietro: !1
						}),
						/* @__PURE__ */ (0, b.jsx)(ze, {
							nome: "batteria",
							potenza: n,
							comete: s,
							indietro: !l
						}),
						/* @__PURE__ */ (0, b.jsx)(ze, {
							nome: "rete",
							potenza: i,
							comete: s,
							indietro: !u
						})
					]
				}),
				/* @__PURE__ */ (0, b.jsx)(Be, {
					posizione: "solare",
					titolo: "Solare",
					valore: c(e),
					tono: "solare"
				}),
				/* @__PURE__ */ (0, b.jsx)(Be, {
					posizione: "casa",
					titolo: "Casa",
					valore: c(t),
					tono: "casa"
				}),
				/* @__PURE__ */ (0, b.jsx)(Be, {
					posizione: "batteria",
					titolo: "Batteria",
					valore: c(n),
					nota: f,
					tono: "batteria"
				}),
				/* @__PURE__ */ (0, b.jsx)(Be, {
					posizione: "rete",
					titolo: "Rete",
					valore: c(i),
					nota: p,
					tono: "rete"
				})
			]
		})
	});
}
//#endregion
//#region src/componenti/Valore.jsx
var He = () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
function Ue({ valore: e, unita: t, decimali: n = 1, className: r = "" }) {
	let i = (0, l.useRef)(null), a = (0, l.useRef)(null), o = (0, l.useRef)(0);
	return (0, l.useEffect)(() => {
		let t = i.current;
		if (!t) return;
		if (e == null) {
			t.textContent = "—", a.current = null;
			return;
		}
		let r = a.current, s = r == null, c = s ? 700 : 260;
		if (!s && e !== r && (t.parentElement?.setAttribute("data-verso", e > r ? "su" : "giu"), t.parentElement?.classList.remove("respira"), t.parentElement?.offsetWidth, t.parentElement?.classList.add("respira")), He()) {
			t.textContent = e.toFixed(n), a.current = e;
			return;
		}
		let l = s ? 0 : r, u = performance.now();
		cancelAnimationFrame(o.current);
		let d = (r) => {
			let i = Math.min(1, (r - u) / c), a = 1 - (1 - i) ** 3;
			t.textContent = (l + (e - l) * a).toFixed(n), i < 1 && (o.current = requestAnimationFrame(d));
		};
		return o.current = requestAnimationFrame(d), a.current = e, () => cancelAnimationFrame(o.current);
	}, [e, n]), /* @__PURE__ */ (0, b.jsxs)("span", {
		className: `valore ${r}`.trim(),
		children: [/* @__PURE__ */ (0, b.jsx)("span", {
			className: "valore-cifre",
			ref: i,
			children: "—"
		}), t && /* @__PURE__ */ (0, b.jsx)("span", {
			className: "valore-unita",
			children: t
		})]
	});
}
//#endregion
//#region src/componenti/Energia.jsx
function We(e) {
	let t = Number(e?.state);
	return Number.isFinite(t) ? e?.attributes?.unit_of_measurement === "W" ? t / 1e3 : t : null;
}
function Ge(e) {
	let t = Number(e?.state);
	return Number.isFinite(t) ? t : null;
}
function Ke({ casa: e, regime: t }) {
	let n = e.energia || {}, r = We(w(n.solare)), i = We(w(n.casa)), a = We(w(n.batteria)), o = Ge(w(n.batteria_carica)), s = We(w(n.rete)), c = Ge(w(n.prodotta_oggi)), l = Ge(w(n.consumata_oggi)), u = Ge(w(n.importata_oggi)), d = l && l > 0 && u !== null ? Math.max(0, Math.min(100, Math.round((1 - u / l) * 100))) : null;
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "energia",
		children: [/* @__PURE__ */ (0, b.jsx)(Ve, {
			solare: r,
			consumo: i,
			batteria: a,
			carica: o,
			rete: s,
			regime: t
		}), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "energia-giornata",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "misura",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "misura-k",
						children: "prodotta"
					}), /* @__PURE__ */ (0, b.jsx)(Ue, {
						className: "misura-v",
						valore: c,
						unita: "kWh",
						decimali: 1
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "misura",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "misura-k",
						children: "consumata"
					}), /* @__PURE__ */ (0, b.jsx)(Ue, {
						className: "misura-v",
						valore: l,
						unita: "kWh",
						decimali: 1
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "misura misura-larga",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", {
							className: "misura-k",
							children: "autosufficienza"
						}),
						/* @__PURE__ */ (0, b.jsx)(Ue, {
							className: "misura-v",
							valore: d,
							unita: "%",
							decimali: 0
						}),
						d !== null && /* @__PURE__ */ (0, b.jsx)("span", {
							className: "misura-barra",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, b.jsx)("span", { style: { inlineSize: `${d}%` } })
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/componenti/AvvisoCancello.jsx
function qe({ chiusura: e }) {
	return /* @__PURE__ */ (0, b.jsxs)("svg", {
		className: "scena-cancello",
		viewBox: "0 0 260 120",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, b.jsx)("defs", { children: /* @__PURE__ */ (0, b.jsx)("clipPath", {
				id: "varco-cancello",
				children: /* @__PURE__ */ (0, b.jsx)("rect", {
					x: "30",
					y: "20",
					width: "200",
					height: "80"
				})
			}) }),
			/* @__PURE__ */ (0, b.jsx)("path", {
				className: "cancello-guida",
				d: "M 8 96 L 252 96"
			}),
			/* @__PURE__ */ (0, b.jsxs)("g", {
				className: "cancello-pilastri",
				children: [/* @__PURE__ */ (0, b.jsx)("rect", {
					x: "14",
					y: "24",
					width: "16",
					height: "72",
					rx: "4"
				}), /* @__PURE__ */ (0, b.jsx)("rect", {
					x: "230",
					y: "24",
					width: "16",
					height: "72",
					rx: "4"
				})]
			}),
			/* @__PURE__ */ (0, b.jsx)("rect", {
				className: "cancello-passaggio",
				x: "30",
				y: "30",
				width: "200",
				height: "66",
				rx: "3"
			}),
			/* @__PURE__ */ (0, b.jsxs)("g", {
				className: "cancello-anta",
				"data-chiusura": e ? "si" : "no",
				clipPath: "url(#varco-cancello)",
				children: [
					/* @__PURE__ */ (0, b.jsx)("rect", {
						className: "anta-telaio",
						x: "34",
						y: "30",
						width: "192",
						height: "66",
						rx: "5"
					}),
					Array.from({ length: 11 }, (e, t) => /* @__PURE__ */ (0, b.jsx)("line", {
						className: "anta-stecca",
						x1: 46 + t * 17,
						y1: "36",
						x2: 46 + t * 17,
						y2: "90"
					}, t)),
					/* @__PURE__ */ (0, b.jsx)("line", {
						className: "anta-traversa",
						x1: "34",
						y1: "52",
						x2: "226",
						y2: "52"
					}),
					/* @__PURE__ */ (0, b.jsx)("line", {
						className: "anta-traversa",
						x1: "34",
						y1: "74",
						x2: "226",
						y2: "74"
					})
				]
			})
		]
	});
}
var Je = 800;
function Ye() {
	let e = te(), t = (0, l.useRef)(0);
	if ((0, l.useEffect)(() => {
		t.current = Date.now();
	}, [e]), !e || e.tipo !== "cancello") return null;
	let n = e.azione === "chiusura";
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "velo-avviso",
		role: "status",
		"aria-live": "polite",
		onClick: () => {
			Date.now() - t.current >= Je && g();
		},
		style: { "--durata-avviso": `${e.durata}ms` },
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "avviso",
			children: [
				/* @__PURE__ */ (0, b.jsx)(qe, { chiusura: n }),
				/* @__PURE__ */ (0, b.jsx)("p", {
					className: "avviso-titolo",
					children: n ? "Chiusura in corso" : "Apertura in corso"
				}),
				/* @__PURE__ */ (0, b.jsx)("p", {
					className: "avviso-nome",
					children: e.nome
				}),
				/* @__PURE__ */ (0, b.jsx)("span", {
					className: "avviso-tempo",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, b.jsx)("span", {})
				})
			]
		})
	});
}
//#endregion
//#region src/hass/camera.js
var Xe = 15e3, Ze = 1500, Qe = 2e3, $e = [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun.home-assistant.io:3478" }];
function et(e) {
	return new Promise((t) => {
		if (e.iceGatheringState === "complete") return t();
		let n = () => {
			e.iceGatheringState === "complete" && (e.removeEventListener("icegatheringstatechange", n), t());
		};
		e.addEventListener("icegatheringstatechange", n), setTimeout(() => {
			e.removeEventListener("icegatheringstatechange", n), t();
		}, 3e3);
	});
}
function tt(e, t, n) {
	let r = t?.connection ?? null, i = e?.solo_fotogrammi === !0, a = e?.solo_webrtc === !0, [o, s] = (0, l.useState)("inattivo"), [c, u] = (0, l.useState)(!1), [d, f] = (0, l.useState)(() => Date.now()), p = (0, l.useRef)(null), m = (0, l.useRef)(null), h = (0, l.useRef)(null), g = (0, l.useRef)(null), _ = (0, l.useCallback)(() => {
		if (g.current) {
			try {
				g.current.destroy();
			} catch {}
			g.current = null;
		}
		if (m.current &&= (m.current.close(), null), h.current) {
			try {
				h.current();
			} catch {}
			h.current = null;
		}
		p.current && (p.current.srcObject = null);
	}, []);
	(0, l.useEffect)(() => {
		if (!n) {
			_(), s("inattivo");
			return;
		}
		return s(i ? "fotogrammi" : "connessione"), _;
	}, [
		n,
		i,
		_
	]), (0, l.useEffect)(() => {
		if (o !== "connessione") return;
		let e = setTimeout(() => s("hls"), Xe);
		return () => clearTimeout(e);
	}, [o]), (0, l.useEffect)(() => {
		if (o !== "fotogrammi") return;
		let e = setInterval(() => f(Date.now()), Ze);
		return () => clearInterval(e);
	}, [o]);
	let v = o === "connessione" || o === "flusso";
	return (0, l.useEffect)(() => {
		if (!v || !r || i || m.current) return;
		let t = !1, n = [];
		return (async () => {
			try {
				let i = new RTCPeerConnection({ iceServers: $e });
				m.current = i, i.ontrack = (e) => {
					p.current && e.streams[0] && (p.current.srcObject = e.streams[0], p.current.play?.().catch(() => {}));
				};
				let a = () => {
					if (t) return;
					let e = i.connectionState, n = i.iceConnectionState;
					e === "connected" || n === "connected" || n === "completed" ? s((e) => e === "connessione" ? "flusso" : e) : (e === "failed" || n === "failed") && s((e) => e === "connessione" || e === "flusso" ? "hls" : e);
				};
				i.onconnectionstatechange = a, i.oniceconnectionstatechange = a, i.addTransceiver("video", { direction: "recvonly" }), i.addTransceiver("audio", { direction: "recvonly" });
				let o = await i.createOffer();
				if (await i.setLocalDescription(o), await et(i), t) return;
				h.current = await r.subscribeMessage(async (e) => {
					if (!t) {
						if (e.type === "session") {
							e.session_id;
							return;
						}
						if (e.type === "answer") {
							try {
								await i.setRemoteDescription({
									type: "answer",
									sdp: e.answer
								});
								for (let e of n) try {
									await i.addIceCandidate(e);
								} catch {}
								n.length = 0;
							} catch {
								s("hls");
							}
							return;
						}
						if (e.type === "candidate") {
							let t = {
								candidate: e.candidate?.candidate ?? e.candidate,
								sdpMid: e.candidate?.sdpMid ?? e.sdpMid,
								sdpMLineIndex: e.candidate?.sdpMLineIndex ?? e.sdpMLineIndex
							};
							if (i.remoteDescription) try {
								await i.addIceCandidate(t);
							} catch {}
							else n.push(t);
							return;
						}
						e.type === "error" && s("hls");
					}
				}, {
					type: "camera/webrtc/offer",
					entity_id: e.entity_id,
					offer: i.localDescription.sdp
				});
			} catch {
				t || s("hls");
			}
		})(), () => {
			t = !0, _();
		};
	}, [
		v,
		r,
		e.entity_id,
		i,
		_
	]), (0, l.useEffect)(() => {
		if (o !== "flusso") return;
		let e = {
			byte: -1,
			fotogrammi: -1
		}, t = 0, n = 0, r = setInterval(async () => {
			let r = m.current;
			if (!r) return;
			let i = 0, a = 0;
			try {
				(await r.getStats()).forEach((e) => {
					e.type === "inbound-rtp" && (e.kind === "video" || e.mediaType === "video") && (typeof e.bytesReceived == "number" && (i = e.bytesReceived), typeof e.framesDecoded == "number" && (a = e.framesDecoded));
				});
			} catch {
				return;
			}
			n += 1, e.byte >= 0 && (t = i > e.byte || a > e.fotogrammi ? 0 : t + 1, (a > 0 && t >= 3 || a === 0 && n >= 12) && s("hls")), e = {
				byte: i,
				fotogrammi: a
			};
		}, Qe);
		return () => clearInterval(r);
	}, [o]), (0, l.useEffect)(() => {
		if (o !== "hls") return;
		if (a) {
			_(), s("fotogrammi");
			return;
		}
		let t = !1;
		_(), u(!1);
		let n = p.current;
		return (async () => {
			try {
				let { url: i } = await r.sendMessagePromise({
					type: "camera/stream",
					entity_id: e.entity_id,
					format: "hls"
				});
				if (t || !n) return;
				let a = (await import("./hls-CJ-SqwmL.js")).default;
				if (!a.isSupported()) {
					s("fotogrammi");
					return;
				}
				let o = new a({
					lowLatencyMode: !0,
					backBufferLength: 10
				});
				g.current = o, o.loadSource(i), o.attachMedia(n), o.on(a.Events.MANIFEST_PARSED, () => n.play?.().catch(() => {})), o.on(a.Events.ERROR, (e, t) => {
					t.fatal && s("fotogrammi");
				});
			} catch {
				t || s("fotogrammi");
			}
		})(), () => {
			if (t = !0, g.current) {
				try {
					g.current.destroy();
				} catch {}
				g.current = null;
			}
		};
	}, [
		o,
		r,
		e.entity_id,
		a,
		_
	]), {
		stato: o,
		video: p,
		inRiproduzione: c,
		segnalaRiproduzione: () => u(!0),
		istante: d
	};
}
function nt(e, t) {
	let n = e?.attributes?.entity_picture;
	return n ? `${n}${n.includes("?") ? "&" : "?"}t=${t}` : null;
}
//#endregion
//#region src/componenti/Telecamere.jsx
var rt = 15e3;
function it(e, t) {
	switch (e) {
		case "connessione": return "Connessione…";
		case "flusso": return "Diretta";
		case "hls": return "Diretta (compatibilità)";
		case "fotogrammi": return t ? "In attesa" : "Fotogrammi";
		default: return t ? "In attesa" : "";
	}
}
function at() {
	return /* @__PURE__ */ (0, b.jsxs)("svg", {
		className: "camera-glifo",
		viewBox: "0 0 48 48",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, b.jsx)("rect", {
				x: "6",
				y: "14",
				width: "27",
				height: "20",
				rx: "4"
			}),
			/* @__PURE__ */ (0, b.jsx)("path", { d: "M33 22.5 L42 18 v12 l-9 -4.5 z" }),
			/* @__PURE__ */ (0, b.jsx)("circle", {
				className: "camera-glifo-occhio",
				cx: "19.5",
				cy: "24",
				r: "5"
			})
		]
	});
}
function ot({ camera: e, onApri: t }) {
	let n = w(e.entity_id), [r, i] = (0, l.useState)(() => Date.now()), [a, o] = (0, l.useState)(!1);
	(0, l.useEffect)(() => {
		let e = setInterval(() => {
			o(!1), i(Date.now());
		}, rt);
		return () => clearInterval(e);
	}, []);
	let s = nt(n, r), c = !n || n.state === "unavailable" || !s;
	return /* @__PURE__ */ (0, b.jsxs)("button", {
		type: "button",
		className: "riquadro-camera tap-target",
		"data-vuoto": c || a ? "si" : "no",
		onClick: () => t(e),
		children: [!c && !a ? /* @__PURE__ */ (0, b.jsx)("img", {
			className: "camera-fotogramma",
			src: s,
			alt: "",
			onError: () => o(!0)
		}) : /* @__PURE__ */ (0, b.jsxs)("span", {
			className: "camera-riposo",
			children: [/* @__PURE__ */ (0, b.jsx)(at, {}), /* @__PURE__ */ (0, b.jsx)("span", {
				className: "camera-invito",
				children: "Tocca per la diretta"
			})]
		}), /* @__PURE__ */ (0, b.jsx)("span", {
			className: "camera-nome",
			children: e.nome
		})]
	});
}
function st({ camera: e, onChiudi: t }) {
	let { stato: n, video: r, segnalaRiproduzione: i, istante: a } = tt(e, C().hass(), !0), o = w(e.entity_id), s = !o || o.state === "unavailable", c = n === "flusso" || n === "hls", l = nt(o, a);
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "velo-camera",
		onClick: t,
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "diretta",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "diretta-immagine",
				children: [/* @__PURE__ */ (0, b.jsx)("video", {
					ref: r,
					className: "diretta-video",
					"data-visibile": c ? "si" : "no",
					autoPlay: !0,
					playsInline: !0,
					muted: !0,
					onPlaying: i
				}), !c && (l && !s ? /* @__PURE__ */ (0, b.jsx)("img", {
					className: "diretta-fotogramma",
					src: l,
					alt: ""
				}) : /* @__PURE__ */ (0, b.jsx)("span", {
					className: "camera-assente",
					children: n === "connessione" ? "Connessione in corso…" : "Camera in standby"
				}))]
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "diretta-piede",
				children: [
					/* @__PURE__ */ (0, b.jsx)("span", {
						className: "diretta-nome",
						children: e.nome
					}),
					/* @__PURE__ */ (0, b.jsx)("span", {
						className: "pastiglia",
						"data-stato": n === "flusso" ? "ok" : "neutro",
						children: it(n, s)
					}),
					/* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: "btn tap-target",
						onClick: t,
						children: "Chiudi"
					})
				]
			})]
		})
	});
}
function ct({ casa: e }) {
	let { narrow: t } = T(), [n, r] = (0, l.useState)(null), i = e.telecamere || [];
	if (i.length === 0) return /* @__PURE__ */ (0, b.jsx)("p", {
		className: "testo",
		children: "Nessuna telecamera in configurazione."
	});
	let a = t ? 1 : i.length <= 2 ? i.length : i.length <= 6 ? 3 : 4;
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("div", {
		className: "griglia-camere",
		style: { "--colonne": a },
		children: i.map((e) => /* @__PURE__ */ (0, b.jsx)(ot, {
			camera: e,
			onApri: r
		}, e.entity_id))
	}), n && /* @__PURE__ */ (0, b.jsx)(st, {
		camera: n,
		onChiudi: () => r(null)
	})] });
}
//#endregion
//#region src/componenti/Meteo.jsx
var lt = () => /* @__PURE__ */ (0, b.jsxs)("g", {
	className: "meteo-caldo",
	children: [/* @__PURE__ */ (0, b.jsx)("circle", {
		cx: "24",
		cy: "24",
		r: "8"
	}), [
		0,
		45,
		90,
		135,
		180,
		225,
		270,
		315
	].map((e) => /* @__PURE__ */ (0, b.jsx)("line", {
		x1: "24",
		y1: "10",
		x2: "24",
		y2: "5",
		transform: `rotate(${e} 24 24)`
	}, e))]
}), ut = () => /* @__PURE__ */ (0, b.jsx)("g", {
	className: "meteo-notte",
	children: /* @__PURE__ */ (0, b.jsx)("path", { d: "M30 12a13 13 0 1 0 8 20 14 14 0 0 1-8-20z" })
}), dt = ({ x: e = 0, y: t = 0, scala: n = 1 }) => /* @__PURE__ */ (0, b.jsx)("path", {
	transform: `translate(${e} ${t}) scale(${n})`,
	d: "M14 34a7 7 0 0 1 .8-13.9 10 10 0 0 1 19 2.2A6.5 6.5 0 0 1 33 34z"
}), ft = ({ quante: e = 3 }) => /* @__PURE__ */ (0, b.jsx)("g", {
	className: "meteo-freddo",
	children: Array.from({ length: e }, (e, t) => /* @__PURE__ */ (0, b.jsx)("line", {
		x1: 16 + t * 8,
		y1: "37",
		x2: 13 + t * 8,
		y2: "44"
	}, t))
});
function pt({ condizione: e }) {
	let t = e || "", n = t.includes("night"), r;
	return r = t === "sunny" ? /* @__PURE__ */ (0, b.jsx)(lt, {}) : t === "clear-night" ? /* @__PURE__ */ (0, b.jsx)(ut, {}) : t === "partlycloudy" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [n ? /* @__PURE__ */ (0, b.jsx)(ut, {}) : /* @__PURE__ */ (0, b.jsx)(lt, {}), /* @__PURE__ */ (0, b.jsx)(dt, {
		x: 6,
		y: 6,
		scala: .8
	})] }) : t === "fog" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(dt, { y: -4 }),
		/* @__PURE__ */ (0, b.jsx)("line", {
			x1: "10",
			y1: "38",
			x2: "38",
			y2: "38"
		}),
		/* @__PURE__ */ (0, b.jsx)("line", {
			x1: "14",
			y1: "43",
			x2: "34",
			y2: "43"
		})
	] }) : t === "windy" || t === "windy-variant" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("path", { d: "M8 20h20a5 5 0 1 0-5-5" }), /* @__PURE__ */ (0, b.jsx)("path", { d: "M8 28h26a5 5 0 1 1-5 5" })] }) : t === "rainy" || t === "hail" || t === "snowy-rainy" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(dt, { y: -4 }), /* @__PURE__ */ (0, b.jsx)(ft, { quante: 3 })] }) : t === "pouring" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(dt, { y: -4 }), /* @__PURE__ */ (0, b.jsx)(ft, { quante: 4 })] }) : t === "lightning" || t === "lightning-rainy" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(dt, { y: -4 }), /* @__PURE__ */ (0, b.jsx)("path", {
		className: "meteo-caldo",
		d: "M25 34l-5 8h6l-3 7"
	})] }) : t === "snowy" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(dt, { y: -4 }), /* @__PURE__ */ (0, b.jsx)("g", {
		className: "meteo-freddo",
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ (0, b.jsx)("circle", {
			cx: 17 + e * 8,
			cy: "41",
			r: "1.8"
		}, e))
	})] }) : /* @__PURE__ */ (0, b.jsx)(dt, { y: -2 }), /* @__PURE__ */ (0, b.jsx)("svg", {
		className: "meteo-segno",
		viewBox: "0 0 48 48",
		"aria-hidden": "true",
		children: r
	});
}
var mt = {
	"clear-night": "sereno",
	cloudy: "nuvoloso",
	exceptional: "eccezionale",
	fog: "nebbia",
	hail: "grandine",
	lightning: "temporale",
	"lightning-rainy": "temporale",
	partlycloudy: "poco nuvoloso",
	pouring: "pioggia forte",
	rainy: "pioggia",
	snowy: "neve",
	"snowy-rainy": "nevischio",
	sunny: "sereno",
	windy: "ventoso",
	"windy-variant": "ventoso"
};
function ht(e) {
	let t = C(), [n, r] = (0, l.useState)(null);
	return (0, l.useEffect)(() => {
		let n = t.hass()?.connection;
		if (!n || !e) return;
		let i = !0, a = null;
		return n.subscribeMessage((e) => {
			if (!i) return;
			let t = e?.forecast?.[0];
			t && r({
				max: t.temperature,
				min: t.templow
			});
		}, {
			type: "weather/subscribe_forecast",
			entity_id: e,
			forecast_type: "daily"
		}).then((e) => {
			i ? a = e : e();
		}).catch(() => {}), () => {
			i = !1, a?.();
		};
	}, [t, e]), n;
}
var gt = (e) => Number.isFinite(Number(e)) ? Math.round(Number(e)) : null;
function _t({ entityId: e }) {
	let t = w(e), n = ht(e);
	if (!t) return null;
	let r = gt(t.attributes?.temperature), i = t.state, a = gt(n?.max), o = gt(n?.min);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "meteo",
		title: mt[i] ?? i,
		children: [/* @__PURE__ */ (0, b.jsx)(pt, { condizione: i }), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "meteo-testo",
			children: [/* @__PURE__ */ (0, b.jsx)("span", {
				className: "meteo-ora",
				children: r === null ? "—" : `${r}°`
			}), /* @__PURE__ */ (0, b.jsxs)("span", {
				className: "meteo-dettaglio",
				children: [mt[i] ?? i, o !== null && a !== null && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
					" · ",
					/* @__PURE__ */ (0, b.jsxs)("span", {
						className: "meteo-min",
						children: [o, "°"]
					}),
					" / ",
					/* @__PURE__ */ (0, b.jsxs)("span", {
						className: "meteo-max",
						children: [a, "°"]
					})
				] })]
			})]
		})]
	});
}
//#endregion
//#region src/componenti/SceltaTema.jsx
var vt = {
	auto: "chiaro",
	chiaro: "scuro",
	scuro: "auto"
}, yt = {
	auto: "Tema automatico",
	chiaro: "Tema chiaro",
	scuro: "Tema scuro"
};
function bt({ tema: e }) {
	return e === "chiaro" ? /* @__PURE__ */ (0, b.jsxs)("svg", {
		className: "tema-segno",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, b.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "4.5"
		}), [
			0,
			45,
			90,
			135,
			180,
			225,
			270,
			315
		].map((e) => /* @__PURE__ */ (0, b.jsx)("line", {
			x1: "12",
			y1: "4",
			x2: "12",
			y2: "1.5",
			transform: `rotate(${e} 12 12)`
		}, e))]
	}) : e === "scuro" ? /* @__PURE__ */ (0, b.jsx)("svg", {
		className: "tema-segno",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, b.jsx)("path", { d: "M15.5 3.5a8.5 8.5 0 1 0 5 12.7 9 9 0 0 1-5-12.7z" })
	}) : /* @__PURE__ */ (0, b.jsxs)("svg", {
		className: "tema-segno",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, b.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "8"
		}), /* @__PURE__ */ (0, b.jsx)("path", {
			className: "tema-meta",
			d: "M12 4a8 8 0 0 1 0 16z"
		})]
	});
}
function xt() {
	let e = C(), { tema: t } = T(), n = t ?? "auto";
	return /* @__PURE__ */ (0, b.jsx)("button", {
		type: "button",
		className: "scelta-tema tap-target",
		"data-tema": n,
		"aria-label": `${yt[n]}. Tocca per cambiare.`,
		title: yt[n],
		onClick: () => e.impostaTema(vt[n]),
		children: /* @__PURE__ */ (0, b.jsx)(bt, { tema: n })
	});
}
//#endregion
//#region src/rifiuti.js
var St = {
	organico: {
		nome: "Organico",
		colore: "#8A5A34",
		contenitore: "mastello"
	},
	plastica: {
		nome: "Plastica e metalli",
		colore: "#E8B32C",
		contenitore: "mastello"
	},
	carta: {
		nome: "Carta e cartone",
		colore: "#1E7FC2",
		contenitore: "mastello"
	},
	vetro: {
		nome: "Vetro",
		colore: "#3FA34D",
		contenitore: "mastello"
	},
	secco: {
		nome: "Secco residuo",
		colore: "#98A2AD",
		contenitore: "sacchetto"
	}
};
function Ct(e) {
	let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
	return `${e.getFullYear()}-${t}-${n}`;
}
var wt = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()), Tt = (e, t) => Math.round((wt(e) - wt(t)) / 864e5);
function Et(e, t) {
	if (!e?.settimana) return null;
	let n = e.eccezioni || {}, r = Ct(t);
	if (Object.hasOwn(n, r)) return n[r] || null;
	let i = e.settimana[String(t.getDay())];
	if (!i) return null;
	if (typeof i == "string") return i;
	if (Array.isArray(i.alterna) && i.alterna.length > 0) {
		let e = /* @__PURE__ */ new Date(`${i.da}T00:00:00`);
		if (Number.isNaN(e.getTime())) return null;
		let n = Math.round(Tt(t, e) / 7), r = i.alterna.length;
		return i.alterna[(n % r + r) % r];
	}
	return null;
}
function j(e, t = /* @__PURE__ */ new Date(), n = 6) {
	if (!e?.settimana) return null;
	let r = (e) => {
		let n = new Date(t);
		return n.setDate(n.getDate() + e), n;
	};
	if (t.getHours() >= n) {
		let t = Et(e, r(1));
		if (t) return {
			tipo: t,
			quando: "stasera",
			giorno: r(1)
		};
	} else {
		let n = Et(e, t);
		if (n) return {
			tipo: n,
			quando: "oggi",
			giorno: t
		};
	}
	for (let t = 1; t <= 8; t += 1) {
		let n = r(t), i = Et(e, n);
		if (i) return {
			tipo: i,
			quando: t === 1 ? "domani" : "poi",
			giorno: n
		};
	}
	return null;
}
function Dt(e, t = 7, n = /* @__PURE__ */ new Date()) {
	let r = [];
	for (let i = 0; i < t; i += 1) {
		let t = new Date(n);
		t.setDate(t.getDate() + i), r.push({
			giorno: t,
			tipo: Et(e, t)
		});
	}
	return r;
}
var Ot = [
	"domenica",
	"lunedì",
	"martedì",
	"mercoledì",
	"giovedì",
	"venerdì",
	"sabato"
];
function kt(e, t = /* @__PURE__ */ new Date()) {
	let n = Tt(e, t);
	return n === 0 ? "oggi" : n === 1 ? "domani" : Ot[e.getDay()];
}
//#endregion
//#region src/componenti/SegniRifiuti.jsx
function At({ colore: e }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: "rifiuti-coperchio",
			d: "M9 15h30a2 2 0 0 1 2 2v3H7v-3a2 2 0 0 1 2-2z",
			fill: e
		}),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: "rifiuti-maniglia",
			d: "M19 15v-2.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V15"
		}),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: "rifiuti-corpo",
			d: "M9.5 21h29l-2.4 18.2a2.6 2.6 0 0 1-2.6 2.3H14.5a2.6 2.6 0 0 1-2.6-2.3z",
			fill: e
		}),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: "rifiuti-nervature",
			d: "M19 25v13M29 25v13"
		})
	] });
}
function jt({ colore: e }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: "rifiuti-corpo",
			d: "M17 17c-3.5 3.5-5.5 9-5.5 15.5C11.5 39 16 42.5 24 42.5s12.5-3.5 12.5-10c0-6.5-2-12-5.5-15.5z",
			fill: e
		}),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: "rifiuti-nodo",
			d: "M19 17l3-5.5 2 3 2-3 3 5.5",
			fill: e
		}),
		/* @__PURE__ */ (0, b.jsx)("path", {
			className: "rifiuti-nervature",
			d: "M20 25c2 3 2 7 0 10M28 25c-2 3-2 7 0 10"
		})
	] });
}
function Mt({ tipo: e, colore: t, contenitore: n }) {
	return /* @__PURE__ */ (0, b.jsx)("svg", {
		className: "rifiuti-segno",
		viewBox: "0 0 48 48",
		"aria-hidden": "true",
		"data-tipo": e,
		children: n === "sacchetto" ? /* @__PURE__ */ (0, b.jsx)(jt, { colore: t }) : /* @__PURE__ */ (0, b.jsx)(At, { colore: t })
	});
}
var Nt = {
	organico: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("path", { d: "M25.5 7.5C15 8 8.5 14 8.5 22.5c0 3 1 5.6 2.7 7.5C18 30 25.5 24 25.5 7.5z" }), /* @__PURE__ */ (0, b.jsx)("path", { d: "M8 30c4-6 9-10.5 14.5-13.5" })] }),
	plastica: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M13.5 5.5h5v3.5c0 1.5 3 2.5 3 6v10.5a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3V15c0-3.5 3-4.5 3-6z" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M13 5.5V4h6v1.5" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M10.5 17h11" })
	] }),
	carta: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M8.5 4.5h11l4.5 4.5v18.5a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 7 27.5V6a1.5 1.5 0 0 1 1.5-1.5z" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M19 4.5V9h5" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M11 15h10M11 20h10M11 25h6" })
	] }),
	vetro: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M9.5 10.5h13v16a2.5 2.5 0 0 1-2.5 2.5h-8a2.5 2.5 0 0 1-2.5-2.5z" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M8.5 6.5h15v4h-15z" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M13 16v8" })
	] }),
	secco: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("path", { d: "M11 12c-2.5 3-4 7.5-4 12 0 4.5 3.5 7 9 7s9-2.5 9-7c0-4.5-1.5-9-4-12z" }), /* @__PURE__ */ (0, b.jsx)("path", { d: "M12.5 12l2-5 1.5 2.5L17.5 7l2 5" })] })
};
function Pt({ tipo: e }) {
	return /* @__PURE__ */ (0, b.jsx)("svg", {
		className: "rifiuti-simbolo",
		viewBox: "0 0 32 34",
		"aria-hidden": "true",
		children: Nt[e] ?? Nt.secco
	});
}
//#endregion
//#region src/componenti/Rifiuti.jsx
function Ft(e = 6e4) {
	let [t, n] = (0, l.useState)(() => /* @__PURE__ */ new Date());
	return (0, l.useEffect)(() => {
		let t = setInterval(() => n(/* @__PURE__ */ new Date()), e);
		return () => clearInterval(t);
	}, [e]), t;
}
var It = {
	stasera: "stasera esponi",
	oggi: "oggi si raccoglie",
	domani: "domani",
	poi: "prossima raccolta"
};
function Lt({ rifiuti: e, adesso: t, onChiudi: n }) {
	let r = Dt(e, 8, t), i = j(e, t);
	return (0, l.useEffect)(() => {
		let e = (e) => e.key === "Escape" && n();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [n]), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "velo-rifiuti",
		onClick: n,
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "settimana-rifiuti",
			role: "dialog",
			"aria-label": "Calendario della raccolta",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, b.jsxs)("header", {
					className: "settimana-testa",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("h2", {
						className: "settimana-titolo",
						children: [
							It[i?.quando] ?? "Prossima raccolta",
							": ",
							St[i?.tipo]?.nome ?? "—"
						]
					}), e.comune && /* @__PURE__ */ (0, b.jsxs)("span", {
						className: "settimana-sottotitolo",
						children: [e.comune, e.gestore ? ` · ${e.gestore}` : ""]
					})] }), /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: "btn tap-target",
						onClick: n,
						children: "Chiudi"
					})]
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "settimana-corpo",
					children: r.map(({ giorno: e, tipo: n }) => {
						let r = n ? St[n] : null;
						return /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "giorno-rifiuti",
							"data-vuoto": r ? "no" : "si",
							style: r ? { "--tinta": r.colore } : void 0,
							children: [
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "giorno-nome",
									children: kt(e, t)
								}),
								/* @__PURE__ */ (0, b.jsxs)("span", {
									className: "giorno-data",
									children: [
										e.getDate(),
										"/",
										e.getMonth() + 1
									]
								}),
								r ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(Mt, {
									tipo: n,
									colore: r.colore,
									contenitore: r.contenitore
								}), /* @__PURE__ */ (0, b.jsx)("span", {
									className: "giorno-tipo",
									children: r.nome
								})] }) : /* @__PURE__ */ (0, b.jsx)("span", {
									className: "giorno-tipo giorno-niente",
									children: "nessuna raccolta"
								})
							]
						}, e.toISOString());
					})
				}),
				e.esposizione && /* @__PURE__ */ (0, b.jsx)("p", {
					className: "settimana-nota",
					children: e.esposizione
				})
			]
		})
	});
}
function Rt({ rifiuti: e, grande: t = !1, compatto: n = !1 }) {
	let r = Ft(), [i, a] = (0, l.useState)(!1), o = j(e, r);
	if (!o) return null;
	let s = St[o.tipo];
	if (!s) return null;
	let c = o.quando === "poi" ? kt(o.giorno, r) : It[o.quando], u = `${c}: ${s.nome}. Tocca per il calendario.`;
	return n ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("button", {
		type: "button",
		className: "pastiglia-rifiuti tap-target",
		style: { "--tinta": s.colore },
		onClick: () => a(!0),
		"aria-label": u,
		title: `${c}: ${s.nome}`,
		children: /* @__PURE__ */ (0, b.jsx)(Pt, { tipo: o.tipo })
	}), i && /* @__PURE__ */ (0, b.jsx)(Lt, {
		rifiuti: e,
		adesso: r,
		onChiudi: () => a(!1)
	})] }) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("button", {
		type: "button",
		className: "tasto-rifiuti tap-target",
		"data-grande": t ? "si" : "no",
		style: { "--tinta": s.colore },
		onClick: (e) => {
			e.stopPropagation(), a(!0);
		},
		"aria-label": u,
		children: [/* @__PURE__ */ (0, b.jsx)(Mt, {
			tipo: o.tipo,
			colore: s.colore,
			contenitore: s.contenitore
		}), /* @__PURE__ */ (0, b.jsxs)("span", {
			className: "rifiuti-testo",
			children: [/* @__PURE__ */ (0, b.jsx)("span", {
				className: "rifiuti-quando",
				children: c
			}), /* @__PURE__ */ (0, b.jsx)("span", {
				className: "rifiuti-tipo",
				children: s.nome
			})]
		})]
	}), i && /* @__PURE__ */ (0, b.jsx)(Lt, {
		rifiuti: e,
		adesso: r,
		onChiudi: () => a(!1)
	})] });
}
//#endregion
//#region src/componenti/Mappa.jsx
var zt = 256, Bt = 15;
function Vt(e, t, n) {
	let r = 2 ** n, i = (t + 180) / 360 * r, a = e * Math.PI / 180, o = (1 - Math.log(Math.tan(a) + 1 / Math.cos(a)) / Math.PI) / 2 * r;
	return {
		x: i * zt,
		y: o * zt
	};
}
function Ht(e, t) {
	let n = (t.lat - e.lat) * Math.PI / 180, r = (t.lon - e.lon) * Math.PI / 180, i = e.lat * Math.PI / 180, a = t.lat * Math.PI / 180, o = Math.sin(n / 2) ** 2 + Math.cos(i) * Math.cos(a) * Math.sin(r / 2) ** 2;
	return 12742e3 * Math.asin(Math.sqrt(o));
}
function Ut(e) {
	return e < 950 ? `${Math.round(e / 10) * 10} m` : `${(e / 1e3).toFixed(+(e < 9500))} km`;
}
function Wt() {
	let e = (0, l.useRef)(null), [t, n] = (0, l.useState)({
		w: 0,
		h: 0
	});
	return (0, l.useEffect)(() => {
		let t = e.current;
		if (!t) return;
		let r = new ResizeObserver(([e]) => {
			let t = e.contentRect;
			n({
				w: Math.round(t.width),
				h: Math.round(t.height)
			});
		});
		return r.observe(t), () => r.disconnect();
	}, []), [e, t];
}
function Gt({ posizione: e, casa: t, etichetta: n }) {
	let [r, { w: i, h: a }] = Wt(), [o, s] = (0, l.useState)(!1), c = Vt(e.lat, e.lon, Bt), u = c.x - i / 2, d = c.y - a / 2, f = [];
	if (i > 0 && a > 0) {
		let e = Math.floor(u / zt), t = Math.floor(d / zt), n = Math.floor((u + i) / zt), r = Math.floor((d + a) / zt), o = 2 ** Bt;
		for (let i = t; i <= r; i += 1) for (let t = e; t <= n; t += 1) {
			if (i < 0 || i >= o) continue;
			let e = (t % o + o) % o;
			f.push({
				chiave: `${t},${i}`,
				url: `https://tile.openstreetmap.org/${Bt}/${e}/${i}.png`,
				sinistra: t * zt - u,
				alto: i * zt - d
			});
		}
	}
	let p = null, m = null;
	if (t) {
		let n = Vt(t.lat, t.lon, Bt);
		p = {
			x: n.x - u,
			y: n.y - d
		}, m = Ht(e, t);
	}
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "mappa",
		children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "mappa-tela",
			ref: r,
			"data-vuota": o ? "si" : "no",
			children: [
				!o && f.map((e) => /* @__PURE__ */ (0, b.jsx)("img", {
					className: "mappa-tassello",
					src: e.url,
					alt: "",
					loading: "eager",
					style: {
						left: `${e.sinistra}px`,
						top: `${e.alto}px`
					},
					onError: () => s(!0)
				}, e.chiave)),
				p && /* @__PURE__ */ (0, b.jsx)("span", {
					className: "mappa-casa",
					style: {
						left: `${p.x}px`,
						top: `${p.y}px`
					},
					title: "Casa",
					children: /* @__PURE__ */ (0, b.jsx)("svg", {
						viewBox: "0 0 16 16",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, b.jsx)("path", { d: "M2 7.5 8 2.5l6 5V14H2z" })
					})
				}),
				/* @__PURE__ */ (0, b.jsxs)("span", {
					className: "mappa-punto",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, b.jsx)("span", { className: "mappa-punto-alone" }), /* @__PURE__ */ (0, b.jsx)("span", { className: "mappa-punto-nucleo" })]
				})
			]
		}), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "mappa-piede",
			children: [
				/* @__PURE__ */ (0, b.jsx)("span", {
					className: "mappa-dove",
					children: n
				}),
				m !== null && m >= 60 && /* @__PURE__ */ (0, b.jsxs)("span", {
					className: "mappa-distanza",
					children: [Ut(m), " da casa"]
				}),
				/* @__PURE__ */ (0, b.jsx)("span", {
					className: "mappa-fonte",
					children: "© OpenStreetMap"
				})
			]
		})]
	});
}
//#endregion
//#region src/componenti/Persone.jsx
function Kt(e) {
	if (!e) return "—";
	let t = e.state;
	return t === "home" ? "a casa" : t === "not_home" ? "fuori" : t === "unknown" || t === "unavailable" ? "—" : t;
}
var qt = (e) => String(e || "?").trim().split(/\s+/).slice(0, 2).map((e) => e[0]).join("").toUpperCase();
function Jt({ nome: e, presenza: t, casa: n, onChiudi: r }) {
	(0, l.useEffect)(() => {
		let e = (e) => e.key === "Escape" && r();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [r]);
	let i = Number(t?.attributes?.latitude), a = Number(t?.attributes?.longitude), o = Number.isFinite(i) && Number.isFinite(a), s = Number(n?.attributes?.latitude), c = Number(n?.attributes?.longitude), u = Number.isFinite(s) && Number.isFinite(c) ? {
		lat: s,
		lon: c
	} : null;
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "velo-persona",
		onClick: r,
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "scheda-persona",
			role: "dialog",
			"aria-label": `Posizione di ${e}`,
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, b.jsxs)("header", {
				className: "scheda-persona-testa",
				children: [/* @__PURE__ */ (0, b.jsx)("h2", {
					className: "scheda-persona-nome",
					children: e
				}), /* @__PURE__ */ (0, b.jsx)("button", {
					type: "button",
					className: "btn tap-target",
					onClick: r,
					children: "Chiudi"
				})]
			}), o ? /* @__PURE__ */ (0, b.jsx)(Gt, {
				posizione: {
					lat: i,
					lon: a
				},
				casa: u,
				etichetta: Kt(t)
			}) : /* @__PURE__ */ (0, b.jsx)("p", {
				className: "testo-secondario",
				children: "Nessuna posizione disponibile. Il telefono potrebbe essere spento o senza permesso di localizzazione."
			})]
		})
	});
}
function Yt({ persona: e, interattivo: t, casa: n }) {
	let r = w(e.presenza), i = w(e.batteria), a = w(e.stato_batteria), o = e.nome || r?.attributes?.friendly_name || "—", s = e.foto || r?.attributes?.entity_picture || null, c = r?.state === "home", u = Number(i?.state), d = Number.isFinite(u) ? Math.round(u) : null, f = a?.state === "charging", p = d !== null && d <= 20 && !f, [m, h] = (0, l.useState)(!1);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "persona",
		"data-casa": c ? "si" : "no",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("span", {
				className: "persona-volto",
				children: [s ? /* @__PURE__ */ (0, b.jsx)("img", {
					className: "persona-foto",
					src: s,
					alt: ""
				}) : /* @__PURE__ */ (0, b.jsx)("span", {
					className: "persona-iniziali",
					children: qt(o)
				}), /* @__PURE__ */ (0, b.jsx)("span", {
					className: "persona-spia",
					"aria-hidden": "true"
				})]
			}),
			t ? /* @__PURE__ */ (0, b.jsxs)("button", {
				type: "button",
				className: "persona-testo persona-tasto tap-target",
				onClick: () => h(!0),
				"aria-label": `${o}, ${Kt(r)}. Tocca per vedere dov'è sulla mappa.`,
				children: [/* @__PURE__ */ (0, b.jsx)("span", {
					className: "persona-nome",
					children: o
				}), /* @__PURE__ */ (0, b.jsx)("span", {
					className: "persona-dove",
					children: Kt(r)
				})]
			}) : /* @__PURE__ */ (0, b.jsxs)("span", {
				className: "persona-testo",
				children: [/* @__PURE__ */ (0, b.jsx)("span", {
					className: "persona-nome",
					children: o
				}), /* @__PURE__ */ (0, b.jsx)("span", {
					className: "persona-dove",
					children: Kt(r)
				})]
			}),
			d !== null && /* @__PURE__ */ (0, b.jsxs)("span", {
				className: "persona-batteria",
				"data-scarica": p ? "si" : "no",
				"data-carica": f ? "si" : "no",
				title: f ? "In carica" : "Batteria del telefono",
				children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
					className: "persona-pila",
					viewBox: "0 0 26 14",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, b.jsx)("rect", {
							x: "0.75",
							y: "0.75",
							width: "21.5",
							height: "12.5",
							rx: "3"
						}),
						/* @__PURE__ */ (0, b.jsx)("path", { d: "M24 5v4" }),
						/* @__PURE__ */ (0, b.jsx)("rect", {
							className: "persona-pila-carica",
							x: "2.75",
							y: "2.75",
							height: "8.5",
							rx: "1.5",
							width: Math.max(1, d / 100 * 17.5)
						})
					]
				}), /* @__PURE__ */ (0, b.jsxs)("span", {
					className: "persona-percento",
					children: [d, "%"]
				})]
			}),
			m && /* @__PURE__ */ (0, b.jsx)(Jt, {
				nome: o,
				presenza: r,
				casa: n,
				onChiudi: () => h(!1)
			})
		]
	});
}
function Xt({ persone: e, interattivo: t = !1 }) {
	let n = w("zone.home");
	return e?.length ? /* @__PURE__ */ (0, b.jsx)("div", {
		className: "elenco-persone",
		children: e.map((e) => /* @__PURE__ */ (0, b.jsx)(Yt, {
			persona: e,
			interattivo: t,
			casa: n
		}, e.presenza))
	}) : null;
}
//#endregion
//#region src/componenti/Scorciatoie.jsx
var Zt = {
	pozzo: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M6 13.5 16 7l10 6.5" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M9.5 13.5h13" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M11 13.5v5M21 13.5v5" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M8 20h16v7.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 8 27.5z" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M8 23.5h16" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M16 13.5v3.5" }),
		/* @__PURE__ */ (0, b.jsx)("path", { d: "M14 17h4v3h-4z" })
	] }),
	acqua: /* @__PURE__ */ (0, b.jsx)(b.Fragment, { children: /* @__PURE__ */ (0, b.jsx)("path", { d: "M16 5c-4.5 5.5-7 9.8-7 13a7 7 0 0 0 14 0c0-3.2-2.5-7.5-7-13z" }) }),
	generico: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("circle", {
		cx: "16",
		cy: "16",
		r: "9"
	}), /* @__PURE__ */ (0, b.jsx)("circle", {
		cx: "16",
		cy: "16",
		r: "2.5"
	})] })
};
function Qt({ icona: e }) {
	return /* @__PURE__ */ (0, b.jsx)("svg", {
		className: "scorciatoia-segno",
		viewBox: "0 0 32 34",
		"aria-hidden": "true",
		children: Zt[e] ?? Zt.generico
	});
}
function $t({ nome: e, stato: t, entity_id: n, onChiudi: r }) {
	let { chiama: i } = ie(), [a, o] = (0, l.useState)(!1);
	(0, l.useEffect)(() => {
		let e = (e) => e.key === "Escape" && r();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [r]);
	let s = !t || t.state === "unavailable" || t.state === "unknown", c = t?.state === "on", u = String(n).split(".")[0];
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "velo-scorciatoia",
		onClick: r,
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "scheda-scorciatoia",
			role: "dialog",
			"aria-label": e,
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "scheda-scorciatoia-testa",
				children: [/* @__PURE__ */ (0, b.jsx)("h2", {
					className: "scheda-scorciatoia-nome",
					children: e
				}), /* @__PURE__ */ (0, b.jsx)("span", {
					className: "scheda-scorciatoia-stato",
					"data-acceso": c ? "si" : "no",
					children: s ? "Non disponibile" : c ? "Acceso" : "Spento"
				})]
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "scheda-scorciatoia-azioni",
				children: [/* @__PURE__ */ (0, b.jsx)("button", {
					type: "button",
					className: "btn btn-conferma tap-target",
					disabled: s || a,
					onClick: () => {
						i(u, c ? "turn_off" : "turn_on", { entity_id: n }, { state: c ? "off" : "on" }), o(!0);
					},
					children: a ? "Fatto" : c ? "Spegni" : "Accendi"
				}), /* @__PURE__ */ (0, b.jsx)("button", {
					type: "button",
					className: "btn tap-target",
					onClick: r,
					children: "Chiudi"
				})]
			})]
		})
	});
}
function en({ voce: e }) {
	let t = w(e.entity_id), [n, r] = (0, l.useState)(!1), i = !t || t.state === "unavailable" || t.state === "unknown", a = t?.state === "on", o = e.nome || t?.attributes?.friendly_name || e.entity_id;
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("button", {
		type: "button",
		className: "pastiglia-scorciatoia tap-target",
		"data-acceso": a ? "si" : "no",
		"data-assente": i ? "si" : "no",
		"data-previsto": t?._previsto ? "si" : "no",
		onClick: () => r(!0),
		"aria-label": `${o}: ${i ? "non disponibile" : a ? "acceso" : "spento"}`,
		title: `${o} · ${i ? "non disponibile" : a ? "acceso" : "spento"}`,
		children: /* @__PURE__ */ (0, b.jsx)(Qt, { icona: e.icona })
	}), n && /* @__PURE__ */ (0, b.jsx)($t, {
		nome: o,
		stato: t,
		entity_id: e.entity_id,
		onChiudi: () => r(!1)
	})] });
}
function tn({ scorciatoie: e }) {
	return e?.length ? e.map((e) => /* @__PURE__ */ (0, b.jsx)(en, { voce: e }, e.entity_id)) : null;
}
//#endregion
//#region src/hass/statistiche.js
var nn = [
	"produzione",
	"consumo",
	"prelievo",
	"immissione"
], rn = (e) => ({
	produzione: e?.prodotta_oggi,
	consumo: e?.consumata_oggi,
	prelievo: e?.importata_oggi,
	immissione: e?.esportata_oggi
});
function an(e, t) {
	let n = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), i = String(e.getDate()).padStart(2, "0");
	return t === "mese" ? `${n}-${r}` : t === "giorno" ? `${n}-${r}-${i}` : `${n}-${r}-${i} ${String(e.getHours()).padStart(2, "0")}`;
}
function on(e, t = /* @__PURE__ */ new Date()) {
	let n = new Date(t), r = new Date(t);
	return e === "giorno" ? (n.setHours(0, 0, 0, 0), r.setHours(23, 59, 59, 999), {
		da: n,
		a: r,
		periodoHA: "hour",
		raggruppa: "ora"
	}) : e === "mese" ? (n.setDate(1), n.setHours(0, 0, 0, 0), r.setMonth(r.getMonth() + 1, 0), r.setHours(23, 59, 59, 999), {
		da: n,
		a: r,
		periodoHA: "day",
		raggruppa: "giorno"
	}) : (n.setMonth(0, 1), n.setHours(0, 0, 0, 0), r.setMonth(11, 31), r.setHours(23, 59, 59, 999), {
		da: n,
		a: r,
		periodoHA: "day",
		raggruppa: "mese"
	});
}
async function sn(e, t, n, r = /* @__PURE__ */ new Date()) {
	let i = rn(t), a = Object.values(i).filter(Boolean);
	if (a.length === 0) return {
		punti: [],
		totali: {}
	};
	let { da: o, a: s, periodoHA: c, raggruppa: l } = on(n, r), u = await e.sendMessagePromise({
		type: "recorder/statistics_during_period",
		start_time: o.toISOString(),
		end_time: s.toISOString(),
		statistic_ids: a,
		period: c,
		types: ["change"]
	}), d = /* @__PURE__ */ new Map();
	for (let [e, t] of Object.entries(i)) if (t) for (let n of u[t] ?? []) {
		let t = new Date(n.start), r = an(t, l);
		d.has(r) || d.set(r, {
			chiave: r,
			quando: t,
			produzione: 0,
			consumo: 0,
			prelievo: 0,
			immissione: 0
		});
		let i = Number(n.change);
		Number.isFinite(i) && i > 0 && (d.get(r)[e] += i);
	}
	let f = [...d.values()].sort((e, t) => e.quando - t.quando), p = {
		produzione: 0,
		consumo: 0,
		prelievo: 0,
		immissione: 0
	};
	for (let e of f) for (let t of nn) p[t] += e[t];
	return {
		punti: f,
		totali: p
	};
}
function cn({ consumo: e, prelievo: t }) {
	return !e || e <= 0 ? null : Math.max(0, Math.min(100, Math.round((e - t) / e * 100)));
}
function ln({ produzione: e, immissione: t }) {
	return !e || e <= 0 ? null : Math.max(0, Math.min(100, Math.round((e - t) / e * 100)));
}
function un({ prelievo: e, immissione: t }, n, r = /* @__PURE__ */ new Date()) {
	let i = (e, t = 0) => Number.isFinite(Number(e)) ? Number(e) : t, a = i(n?.energia), o = i(n?.rete);
	if (a <= 0 && o <= 0) return null;
	let s = i(n?.accisa), c = i(n?.iva, 10) / 100, l = i(n?.quota_fissa), u = i(n?.quota_potenza), d = i(n?.potenza_impegnata), f = i(n?.canone_tv), p = i(n?.vendita), m = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate(), h = Math.min(r.getDate(), m), g = (e, t) => {
		let n = e * (a + o), r = (l + u * d) * (t / 30), i = e * s, f = n + r + i;
		return {
			consumi: n,
			fissi: r,
			accise: i,
			imponibile: f,
			totale: f * (1 + c)
		};
	}, _ = g(e, h), v = e * m / Math.max(1, h), y = g(v, m), b = r.getMonth() <= 9 ? f : 0;
	return {
		..._,
		totale: _.totale + b,
		proiezione: y.totale + b,
		kwhAttesi: v,
		canone: b,
		venduta: t * p,
		giorniPassati: h,
		giorniNelMese: m
	};
}
function dn(e, t, n = /* @__PURE__ */ new Date()) {
	let r = t === "giorno" ? "ora" : t === "mese" ? "giorno" : "mese", i = new Map(e.map((e) => [e.chiave, e])), a = [];
	if (t === "giorno") for (let e = 0; e < 24; e += 1) {
		let t = new Date(n);
		t.setHours(e, 0, 0, 0), a.push(t);
	}
	else if (t === "mese") {
		let e = new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate();
		for (let t = 1; t <= e; t += 1) a.push(new Date(n.getFullYear(), n.getMonth(), t));
	} else for (let e = 0; e < 12; e += 1) a.push(new Date(n.getFullYear(), e, 1));
	return a.map((e) => {
		let t = an(e, r), n = i.get(t);
		return n ? {
			chiave: t,
			quando: e,
			...n
		} : {
			chiave: t,
			quando: e,
			produzione: null,
			consumo: null,
			prelievo: null,
			immissione: null
		};
	});
}
//#endregion
//#region src/componenti/PannelloEnergia.jsx
var fn = [
	{
		id: "produzione",
		nome: "Prodotta",
		colore: "var(--cs-energy-solar)"
	},
	{
		id: "consumo",
		nome: "Consumata",
		colore: "var(--cs-accent)"
	},
	{
		id: "immissione",
		nome: "Venduta",
		colore: "var(--cs-energy-battery)"
	}
], pn = [
	{
		id: "giorno",
		nome: "Giorno"
	},
	{
		id: "mese",
		nome: "Mese"
	},
	{
		id: "anno",
		nome: "Anno"
	}
], mn = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate(), hn = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth();
function gn(e, t, n) {
	return e === "giorno" ? mn(t, n) ? "oggi" : t.toLocaleDateString("it-IT", {
		weekday: "long",
		day: "numeric",
		month: "long"
	}) : e === "mese" ? t.toLocaleDateString("it-IT", {
		month: "long",
		year: "numeric"
	}) : String(t.getFullYear());
}
function _n(e, t, n, r) {
	let i = new Date(t);
	return e === "giorno" ? i.setDate(i.getDate() + n) : e === "mese" ? i.setMonth(i.getMonth() + n, 1) : i.setFullYear(i.getFullYear() + n, 0, 1), i > r ? new Date(r) : i;
}
function vn(e, t, n) {
	return e === "giorno" ? mn(t, n) : e === "mese" ? hn(t, n) : t.getFullYear() === n.getFullYear();
}
var yn = (e) => String(e).padStart(2, "0"), bn = (e, t) => t === "giorno" ? `${e.getFullYear()}-${yn(e.getMonth() + 1)}-${yn(e.getDate())}` : `${e.getFullYear()}-${yn(e.getMonth() + 1)}`;
function xn({ vista: e, rif: t, adesso: n, onCambia: r }) {
	let i = (t) => {
		if (!t) return;
		if (e === "anno") return r(new Date(Number(t), 0, 1));
		let [n, i, a] = t.split("-").map(Number);
		r(new Date(n, i - 1, a || 1));
	}, a = [];
	for (let e = n.getFullYear(); e >= n.getFullYear() - 5; --e) a.push(e);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "periodo",
		children: [
			/* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "periodo-freccia tap-target",
				onClick: () => r(_n(e, t, -1, n)),
				"aria-label": "Periodo precedente",
				children: "‹"
			}),
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "periodo-nome",
				children: gn(e, t, n)
			}),
			/* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "periodo-freccia tap-target",
				onClick: () => r(_n(e, t, 1, n)),
				disabled: vn(e, t, n),
				"aria-label": "Periodo successivo",
				children: "›"
			}),
			/* @__PURE__ */ (0, b.jsxs)("span", {
				className: "periodo-calendario tap-target",
				title: "Scegli il periodo",
				children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
					viewBox: "0 0 24 24",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, b.jsx)("rect", {
							x: "3.5",
							y: "5",
							width: "17",
							height: "15.5",
							rx: "2.5"
						}),
						/* @__PURE__ */ (0, b.jsx)("path", { d: "M3.5 9.5h17M8 3v4M16 3v4" }),
						/* @__PURE__ */ (0, b.jsx)("circle", {
							cx: "8.5",
							cy: "13.5",
							r: "1.1"
						}),
						/* @__PURE__ */ (0, b.jsx)("circle", {
							cx: "12",
							cy: "13.5",
							r: "1.1"
						}),
						/* @__PURE__ */ (0, b.jsx)("circle", {
							cx: "15.5",
							cy: "13.5",
							r: "1.1"
						})
					]
				}), e === "anno" ? /* @__PURE__ */ (0, b.jsx)("select", {
					className: "periodo-campo",
					value: t.getFullYear(),
					onChange: (e) => i(e.target.value),
					"aria-label": "Scegli l'anno",
					children: a.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
						value: e,
						children: e
					}, e))
				}) : /* @__PURE__ */ (0, b.jsx)("input", {
					className: "periodo-campo",
					type: e === "giorno" ? "date" : "month",
					value: bn(t, e),
					max: bn(n, e),
					onChange: (e) => i(e.target.value),
					"aria-label": e === "giorno" ? "Scegli il giorno" : "Scegli il mese"
				})]
			})
		]
	});
}
var Sn = [
	"gen",
	"feb",
	"mar",
	"apr",
	"mag",
	"giu",
	"lug",
	"ago",
	"set",
	"ott",
	"nov",
	"dic"
];
function Cn(e, t) {
	let n = e.quando;
	return t === "oggi" ? String(n.getHours()).padStart(2, "0") : t === "mese" ? String(n.getDate()) : Sn[n.getMonth()];
}
var wn = (e) => e >= 100 ? e.toFixed(0) : e.toFixed(1), Tn = (e) => `${e < 0 ? "−" : ""}${Math.abs(e).toFixed(2).replace(".", ",")} €`;
function En() {
	let e = (0, l.useRef)(null), [t, n] = (0, l.useState)({
		w: 0,
		h: 0
	});
	return (0, l.useEffect)(() => {
		let t = e.current;
		if (!t) return;
		let r = new ResizeObserver(([e]) => n({
			w: Math.round(e.contentRect.width),
			h: Math.round(e.contentRect.height)
		}));
		return r.observe(t), () => r.disconnect();
	}, []), [e, t];
}
function Dn(e, t) {
	return Math.max(1, Math.ceil(e / Math.max(2, Math.floor(t / 34))));
}
function On({ punti: e, vista: t }) {
	let [n, { w: r, h: i }] = En(), a = (0, l.useMemo)(() => {
		let t = 0;
		for (let n of e) for (let e of fn) n[e.id] > t && (t = n[e.id]);
		return Math.max(.1, t);
	}, [e]), o = {
		sx: 42,
		dx: 12,
		alto: 14,
		basso: 24
	}, s = Math.max(1, r - o.sx - o.dx), c = Math.max(1, i - o.alto - o.basso), u = (t) => o.sx + (e.length > 1 ? t * s / (e.length - 1) : s / 2), d = (e) => o.alto + c - e / a * c, f = (t) => {
		let n = [], r = [];
		return e.forEach((e, i) => {
			let a = e[t];
			if (a == null) {
				r.length && n.push(r), r = [];
				return;
			}
			r.push(`${r.length ? "L" : "M"} ${u(i).toFixed(1)} ${d(a).toFixed(1)}`);
		}), r.length && n.push(r), n.map((e) => e.join(" "));
	}, p = (t) => {
		for (let n = e.length - 1; n >= 0; --n) {
			let r = e[n][t];
			if (r != null) return {
				x: u(n),
				y: d(r)
			};
		}
		return null;
	}, m = Dn(e.length, s);
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "grafico",
		ref: n,
		children: r > 0 && i > 0 && /* @__PURE__ */ (0, b.jsxs)("svg", {
			className: "grafico-tela",
			width: r,
			height: i,
			role: "img",
			"aria-label": "Andamento di produzione, consumo e vendita nel periodo",
			children: [
				[
					0,
					.5,
					1
				].map((e) => /* @__PURE__ */ (0, b.jsxs)("g", { children: [/* @__PURE__ */ (0, b.jsx)("line", {
					className: "grafico-griglia",
					x1: o.sx,
					x2: r - o.dx,
					y1: d(a * e),
					y2: d(a * e)
				}), /* @__PURE__ */ (0, b.jsx)("text", {
					className: "grafico-scala-testo",
					x: o.sx - 6,
					y: d(a * e),
					textAnchor: "end",
					dominantBaseline: "middle",
					children: wn(a * e)
				})] }, e)),
				fn.map((e) => f(e.id).map((t, n) => /* @__PURE__ */ (0, b.jsx)("path", {
					className: "grafico-linea",
					d: t,
					style: { stroke: e.colore }
				}, `${e.id}-${n}`))),
				fn.map((e) => {
					let t = p(e.id);
					return t ? /* @__PURE__ */ (0, b.jsx)("circle", {
						className: "grafico-punto",
						cx: t.x,
						cy: t.y,
						r: "3.5",
						style: { fill: e.colore }
					}, `p-${e.id}`) : null;
				}),
				e.map((e, n) => n % m === 0 ? /* @__PURE__ */ (0, b.jsx)("text", {
					className: "grafico-asse",
					x: u(n),
					y: i - 6,
					textAnchor: "middle",
					children: Cn(e, t)
				}, e.chiave) : null)
			]
		})
	});
}
function kn({ titolo: e, valore: t, unita: n, nota: r, tono: i, barra: a }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "tessera-energia",
		"data-tono": i,
		children: [
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "tessera-titolo",
				children: e
			}),
			/* @__PURE__ */ (0, b.jsxs)("span", {
				className: "tessera-valore",
				children: [t, n && /* @__PURE__ */ (0, b.jsx)("span", {
					className: "tessera-unita",
					children: n
				})]
			}),
			a != null && /* @__PURE__ */ (0, b.jsx)("span", {
				className: "tessera-barra",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, b.jsx)("span", { style: { inlineSize: `${a}%` } })
			}),
			r && /* @__PURE__ */ (0, b.jsx)("span", {
				className: "tessera-nota",
				children: r
			})
		]
	});
}
function An({ casa: e }) {
	let t = C(), n = T(), [r, i] = (0, l.useState)("mese"), [a, o] = (0, l.useState)(() => /* @__PURE__ */ new Date()), [s, c] = (0, l.useState)(null), [u, d] = (0, l.useState)(null), [f, p] = (0, l.useState)(null), m = (0, l.useMemo)(() => /* @__PURE__ */ new Date(), []), h = e?.energia;
	if ((0, l.useEffect)(() => {
		let e = t.hass()?.connection;
		if (!e || !h) return;
		let n = !0;
		return c(null), d(null), sn(e, h, r, a).then((e) => n && c(e)).catch((e) => n && d(e.message)), sn(e, h, "mese", a).then((e) => n && p(e.totali)).catch(() => {}), () => {
			n = !1;
		};
	}, [
		t,
		h,
		r,
		a,
		n.connesso
	]), !h || Object.keys(h).length === 0) return /* @__PURE__ */ (0, b.jsx)("p", {
		className: "testo-secondario",
		children: "Il fotovoltaico non è configurato."
	});
	let g = s?.totali, _ = g ? cn(g) : null, v = g ? ln(g) : null, y = hn(a, m), x = new Date(a.getFullYear(), a.getMonth() + 1, 0), S = f ? un(f, e?.tariffe, y ? m : x) : null;
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "energia-sezione",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "energia-testa",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "energia-comandi",
					children: [/* @__PURE__ */ (0, b.jsx)("nav", {
						className: "viste",
						"aria-label": "Periodo",
						children: pn.map((e) => /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "vista tap-target",
							"data-scelta": r === e.id ? "si" : "no",
							"aria-pressed": r === e.id,
							onClick: () => i(e.id),
							children: e.nome
						}, e.id))
					}), /* @__PURE__ */ (0, b.jsx)(xn, {
						vista: r,
						rif: a,
						adesso: m,
						onCambia: o
					})]
				}), /* @__PURE__ */ (0, b.jsx)("div", {
					className: "legenda",
					children: fn.map((e) => /* @__PURE__ */ (0, b.jsx)("span", {
						className: "legenda-voce",
						style: { "--tinta": e.colore },
						children: e.nome
					}, e.id))
				})]
			}),
			u && /* @__PURE__ */ (0, b.jsxs)("p", {
				className: "imp-errore",
				children: ["Non riesco a leggere le statistiche: ", u]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "energia-grafico",
				children: s ? /* @__PURE__ */ (0, b.jsx)(On, {
					punti: dn(s.punti, r, a),
					vista: r
				}) : /* @__PURE__ */ (0, b.jsx)("p", {
					className: "testo-secondario",
					children: "Leggo lo storico…"
				})
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "energia-numeri",
				children: [
					/* @__PURE__ */ (0, b.jsx)(kn, {
						titolo: "Prodotta",
						valore: g ? wn(g.produzione) : "—",
						unita: "kWh",
						tono: "produzione"
					}),
					/* @__PURE__ */ (0, b.jsx)(kn, {
						titolo: "Consumata",
						valore: g ? wn(g.consumo) : "—",
						unita: "kWh",
						tono: "consumo"
					}),
					/* @__PURE__ */ (0, b.jsx)(kn, {
						titolo: "Presa dalla rete",
						valore: g ? wn(g.prelievo) : "—",
						unita: "kWh",
						tono: "prelievo"
					}),
					/* @__PURE__ */ (0, b.jsx)(kn, {
						titolo: "Venduta alla rete",
						valore: g ? wn(g.immissione) : "—",
						unita: "kWh",
						tono: "immissione"
					}),
					/* @__PURE__ */ (0, b.jsx)(kn, {
						titolo: "Autosufficienza",
						valore: _ ?? "—",
						unita: "%",
						barra: _,
						nota: "quanta corrente è venuta dal tetto",
						tono: "produzione"
					}),
					/* @__PURE__ */ (0, b.jsx)(kn, {
						titolo: "Autoconsumo",
						valore: v ?? "—",
						unita: "%",
						barra: v,
						nota: "quanta prodotta è restata in casa",
						tono: "consumo"
					})
				]
			}),
			S ? /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "bolletta",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "bolletta-cifre",
						children: [y ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "bolletta-voce",
							children: [
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "tessera-titolo",
									children: "Maturato finora"
								}),
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "bolletta-valore",
									children: Tn(S.totale)
								}),
								/* @__PURE__ */ (0, b.jsxs)("span", {
									className: "tessera-nota",
									children: [
										S.giorniPassati,
										" giorni su ",
										S.giorniNelMese,
										" ·",
										" ",
										wn(f.prelievo),
										" kWh presi dalla rete"
									]
								})
							]
						}), /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "bolletta-voce",
							"data-forte": "si",
							children: [
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "tessera-titolo",
									children: "Prossima bolletta, stimata"
								}),
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "bolletta-valore",
									children: Tn(S.proiezione)
								}),
								/* @__PURE__ */ (0, b.jsxs)("span", {
									className: "tessera-nota",
									children: [
										"al ritmo di adesso, ~",
										wn(S.kwhAttesi),
										" kWh nel mese"
									]
								})
							]
						})] }) : /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "bolletta-voce",
							"data-forte": "si",
							children: [
								/* @__PURE__ */ (0, b.jsxs)("span", {
									className: "tessera-titolo",
									children: [
										"Costo stimato di",
										" ",
										a.toLocaleDateString("it-IT", {
											month: "long",
											year: "numeric"
										})
									]
								}),
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "bolletta-valore",
									children: Tn(S.totale)
								}),
								/* @__PURE__ */ (0, b.jsxs)("span", {
									className: "tessera-nota",
									children: [
										"mese completo · ",
										wn(f.prelievo),
										" kWh presi dalla rete"
									]
								})
							]
						}), /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "bolletta-dettaglio",
							children: [
								/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Consumi ", /* @__PURE__ */ (0, b.jsx)("b", { children: Tn(S.consumi) })] }),
								/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Quote fisse ", /* @__PURE__ */ (0, b.jsx)("b", { children: Tn(S.fissi) })] }),
								/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Accise ", /* @__PURE__ */ (0, b.jsx)("b", { children: Tn(S.accise) })] }),
								/* @__PURE__ */ (0, b.jsxs)("span", { children: ["IVA ", /* @__PURE__ */ (0, b.jsx)("b", { children: Tn(S.totale - S.canone - S.imponibile) })] }),
								S.canone > 0 && /* @__PURE__ */ (0, b.jsxs)("span", { children: ["Canone TV ", /* @__PURE__ */ (0, b.jsx)("b", { children: Tn(S.canone) })] })
							]
						})]
					}),
					S.venduta > 0 && /* @__PURE__ */ (0, b.jsxs)("p", {
						className: "bolletta-gse",
						children: [
							"A parte, dal fotovoltaico: ",
							/* @__PURE__ */ (0, b.jsx)("b", { children: Tn(S.venduta) }),
							" di energia immessa in rete questo mese (",
							wn(f.immissione),
							" kWh). Il GSE la liquida separatamente, non scende dalla bolletta."
						]
					}),
					/* @__PURE__ */ (0, b.jsx)("p", {
						className: "bolletta-nota",
						children: "Calcolata come la bolletta vera: consumi al kWh, quote fisse sui giorni, accise e IVA. Conguagli e cambi di prezzo restano imprevedibili."
					})
				]
			}) : /* @__PURE__ */ (0, b.jsx)("p", {
				className: "testo-secondario",
				children: "Per la stima della bolletta servono i prezzi dell'energia: si impostano nell'ingranaggio, sezione Energia."
			})
		]
	});
}
//#endregion
//#region src/componenti/Salvaschermo.jsx
var jn = (e) => String(e).padStart(2, "0");
function Mn() {
	let [e, t] = (0, l.useState)(() => /* @__PURE__ */ new Date());
	return (0, l.useEffect)(() => {
		let e = setInterval(() => t(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "riposo-ora",
		children: [/* @__PURE__ */ (0, b.jsxs)("span", {
			className: "riposo-cifre",
			children: [
				jn(e.getHours()),
				/* @__PURE__ */ (0, b.jsx)("span", {
					className: "riposo-duepunti",
					children: ":"
				}),
				jn(e.getMinutes())
			]
		}), /* @__PURE__ */ (0, b.jsx)("span", {
			className: "riposo-data",
			children: e.toLocaleDateString("it-IT", {
				weekday: "long",
				day: "numeric",
				month: "long"
			})
		})]
	});
}
function Nn({ onSveglia: e }) {
	let t = ne(), n = T();
	(0, l.useEffect)(() => {
		let t = [
			"pointerdown",
			"keydown",
			"wheel",
			"touchstart"
		];
		for (let n of t) window.addEventListener(n, e, { passive: !0 });
		return () => {
			for (let n of t) window.removeEventListener(n, e);
		};
	}, [e]);
	let r = Object.keys(t?.energia || {}).length > 0;
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "riposo",
		"data-theme": n.scuro ? "dark" : "light",
		role: "presentation",
		"aria-label": "Schermata di riposo. Tocca per tornare al pannello.",
		children: [
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "riposo-alone",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "riposo-sinistra",
				children: [
					/* @__PURE__ */ (0, b.jsx)(Mn, {}),
					t?.meteo && /* @__PURE__ */ (0, b.jsx)("div", {
						className: "riposo-meteo",
						children: /* @__PURE__ */ (0, b.jsx)(_t, { entityId: t.meteo })
					}),
					t?.rifiuti && /* @__PURE__ */ (0, b.jsx)("div", {
						className: "riposo-rifiuti",
						children: /* @__PURE__ */ (0, b.jsx)(Rt, {
							rifiuti: t.rifiuti,
							grande: !0
						})
					}),
					t?.persone?.length > 0 && /* @__PURE__ */ (0, b.jsx)("div", {
						className: "riposo-persone",
						children: /* @__PURE__ */ (0, b.jsx)(Xt, { persone: t.persone })
					})
				]
			}),
			r && /* @__PURE__ */ (0, b.jsx)("div", {
				className: "riposo-energia",
				children: /* @__PURE__ */ (0, b.jsx)(Ke, {
					casa: t,
					regime: "scena"
				})
			})
		]
	});
}
//#endregion
//#region src/hass/registri.js
var Pn = [
	"light",
	"switch",
	"cover",
	"fan",
	"vacuum",
	"media_player",
	"lock",
	"climate",
	"humidifier",
	"water_heater",
	"valve"
];
function Fn(e) {
	return !!(e?.entity_category || e?.hidden_by || e?.disabled_by);
}
var In = {
	quot: "\"",
	amp: "&",
	apos: "'",
	"#39": "'",
	lt: "<",
	gt: ">",
	nbsp: " "
}, Ln = (e) => String(e || "").replace(/&(quot|amp|apos|#39|lt|gt|nbsp);/g, (e, t) => In[t] ?? e);
async function Rn(e) {
	let [t, n, r, i] = await Promise.all([
		e.sendMessagePromise({ type: "get_states" }),
		e.sendMessagePromise({ type: "config/entity_registry/list" }).catch(() => []),
		e.sendMessagePromise({ type: "config/device_registry/list" }).catch(() => []),
		e.sendMessagePromise({ type: "config/area_registry/list" }).catch(() => [])
	]), a = new Map(n.map((e) => [e.entity_id, e])), o = new Map(r.map((e) => [e.id, e])), s = new Map(i.map((e) => [e.area_id, e.name])), c = [];
	for (let e of t) {
		let t = e.entity_id.split(".")[0], n = a.get(e.entity_id);
		if (Fn(n)) continue;
		let r = n?.area_id ?? (n?.device_id ? o.get(n.device_id)?.area_id : null);
		c.push({
			entity_id: e.entity_id,
			dominio: t,
			nome: Ln(e.attributes?.friendly_name) || e.entity_id,
			stato: e.state,
			areaHA: r ? s.get(r) ?? null : null,
			dispositivo: n?.device_id ? o.get(n.device_id) : null
		});
	}
	return c.sort((e, t) => e.nome.localeCompare(t.nome, "it")), {
		elenco: c,
		aree: i.map((e) => e.name)
	};
}
var zn = (e) => String(e || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
function Bn(e, t) {
	if (!e) return null;
	let n = zn(e), r = t.find((e) => zn(e.nome) === n || zn(e.id) === n);
	if (r) return r.id;
	let i = t.find((e) => zn(e.nome).startsWith(n) || n.startsWith(zn(e.nome)));
	return i ? i.id : null;
}
function Vn(e, t) {
	let n = zn(t).trim();
	if (!n) return e;
	let r = n.split(/\s+/);
	return e.filter((e) => {
		let t = zn(`${e.nome} ${e.entity_id} ${e.areaHA || ""}`);
		return r.every((e) => t.includes(e));
	});
}
//#endregion
//#region src/componenti/Impostazioni.jsx
var Hn = [
	{
		id: "luci",
		nome: "Luci"
	},
	{
		id: "elettrodomestici",
		nome: "Elettrodomestici"
	},
	{
		id: "infissi",
		nome: "Infissi"
	},
	{
		id: "altro",
		nome: "Altro"
	}
], Un = [{
	id: "interno",
	nome: "Interno"
}, {
	id: "esterno",
	nome: "Esterno"
}];
function Wn(e) {
	let t = {};
	for (let n of e?.luci || []) t[n.entity_id] = {
		stanza: n.stanza || "",
		categoria: "",
		nome: n.nome || ""
	};
	for (let n of e?.prese || []) t[n.entity_id] = {
		stanza: n.stanza || "",
		categoria: "elettrodomestici",
		nome: n.nome || ""
	};
	for (let n of e?.dispositivi || []) t[n.entity_id] = {
		stanza: n.stanza || "",
		categoria: n.categoria || "",
		nome: n.nome || ""
	};
	return {
		stanze: (e?.stanze || []).map((e) => ({
			...e,
			zona: e.zona || "interno"
		})),
		tariffe: e?.tariffe ? { ...e.tariffe } : {},
		perEntita: t
	};
}
function Gn(e, t, n) {
	let r = new Map(n.map((e) => [e.entity_id, e])), i = [], a = [];
	for (let [e, n] of Object.entries(t.perEntita)) {
		if (!n.stanza) continue;
		let t = r.get(e), o = e.split(".")[0], s = n.nome?.trim() || t?.nome?.trim() || e;
		if (o === "light" && !n.categoria) i.push({
			entity_id: e,
			nome: s,
			stanza: n.stanza
		});
		else {
			let t = {
				entity_id: e,
				nome: s,
				stanza: n.stanza
			};
			n.categoria && (t.categoria = n.categoria), a.push(t);
		}
	}
	return {
		...e,
		stanze: t.stanze,
		tariffe: t.tariffe,
		luci: i,
		prese: [],
		dispositivi: a
	};
}
function Kn({ voce: e, assegnazione: t, stanze: n, suggerita: r, bloccato: i, onCambia: a }) {
	let o = t || {
		stanza: "",
		categoria: "",
		nome: ""
	}, s = Se({
		entity_id: e.entity_id,
		nome: o.nome || e.nome
	});
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "riga-dispositivo",
		"data-assegnato": o.stanza ? "si" : "no",
		children: [
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "riga-dominio",
				"data-dominio": e.dominio,
				children: e.dominio
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "riga-identita",
				children: [/* @__PURE__ */ (0, b.jsx)("input", {
					className: "riga-nome",
					type: "text",
					value: o.nome || e.nome,
					disabled: i,
					onChange: (e) => a({
						...o,
						nome: e.target.value
					}),
					"aria-label": `Nome di ${e.entity_id}`
				}), /* @__PURE__ */ (0, b.jsx)("span", {
					className: "riga-id",
					children: e.entity_id
				})]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "riga-scelte",
				children: [/* @__PURE__ */ (0, b.jsxs)("select", {
					className: "riga-select",
					value: o.stanza,
					disabled: i,
					onChange: (e) => a({
						...o,
						stanza: e.target.value
					}),
					"aria-label": `Stanza di ${e.nome}`,
					children: [/* @__PURE__ */ (0, b.jsx)("option", {
						value: "",
						children: "— nessuna stanza —"
					}), n.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
						value: e.id,
						children: e.nome
					}, e.id))]
				}), /* @__PURE__ */ (0, b.jsxs)("select", {
					className: "riga-select riga-select-piccola",
					value: o.categoria,
					disabled: i || !o.stanza,
					onChange: (e) => a({
						...o,
						categoria: e.target.value
					}),
					"aria-label": `Famiglia di ${e.nome}`,
					children: [/* @__PURE__ */ (0, b.jsxs)("option", {
						value: "",
						children: ["automatica · ", Ce[s]]
					}), Hn.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
						value: e.id,
						children: e.nome
					}, e.id))]
				})]
			}),
			!o.stanza && r && !i && /* @__PURE__ */ (0, b.jsxs)("button", {
				type: "button",
				className: "riga-suggerita tap-target",
				onClick: () => a({
					...o,
					stanza: r.id
				}),
				title: `In Home Assistant è in «${e.areaHA}»`,
				children: ["→ ", r.nome]
			}),
			o.stanza && e.areaHA && /* @__PURE__ */ (0, b.jsxs)("span", {
				className: "riga-area",
				children: ["HA: ", e.areaHA]
			})
		]
	});
}
function qn(e, t) {
	let n = e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "stanza", r = n, i = 2;
	for (; t.has(r);) r = `${n}_${i}`, i += 1;
	return r;
}
function Jn({ bozza: e, bloccato: t, conta: n, onCambia: r }) {
	let [i, a] = (0, l.useState)(""), o = () => {
		let t = i.trim();
		if (!t) return;
		let n = qn(t, new Set(e.stanze.map((e) => e.id)));
		r({
			...e,
			stanze: [...e.stanze, {
				id: n,
				nome: t,
				zona: "interno"
			}]
		}), a("");
	}, s = (t, n) => r({
		...e,
		stanze: e.stanze.map((e) => e.id === t ? {
			...e,
			...n
		} : e)
	}), c = (t) => {
		let n = { ...e.perEntita };
		for (let [e, r] of Object.entries(n)) r.stanza === t && (n[e] = {
			...r,
			stanza: ""
		});
		r({
			...e,
			stanze: e.stanze.filter((e) => e.id !== t),
			perEntita: n
		});
	};
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "elenco-stanze-imp",
		children: [Un.map((r) => /* @__PURE__ */ (0, b.jsxs)("section", {
			className: "gruppo-stanze",
			children: [
				/* @__PURE__ */ (0, b.jsx)("h3", {
					className: "gruppo-stanze-titolo",
					children: r.nome
				}),
				e.stanze.filter((e) => e.zona === r.id).length === 0 && /* @__PURE__ */ (0, b.jsx)("p", {
					className: "famiglia-vuota",
					children: "Nessuna stanza in questa zona"
				}),
				e.stanze.filter((e) => e.zona === r.id).map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "riga-stanza",
					children: [
						/* @__PURE__ */ (0, b.jsx)("input", {
							className: "riga-nome",
							type: "text",
							value: e.nome,
							disabled: t,
							onChange: (t) => s(e.id, { nome: t.target.value }),
							"aria-label": `Nome della stanza ${e.nome}`
						}),
						/* @__PURE__ */ (0, b.jsx)("span", {
							className: "riga-conta",
							children: n[e.id] ? `${n[e.id]} dispositivi` : "vuota"
						}),
						/* @__PURE__ */ (0, b.jsx)("select", {
							className: "riga-select riga-select-piccola",
							value: e.zona,
							disabled: t,
							onChange: (t) => s(e.id, { zona: t.target.value }),
							"aria-label": `Zona di ${e.nome}`,
							children: Un.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
								value: e.id,
								children: e.nome
							}, e.id))
						}),
						/* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "btn btn-quieto tap-target",
							disabled: t,
							onClick: () => c(e.id),
							children: "Elimina"
						})
					]
				}, e.id))
			]
		}, r.id)), !t && /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "riga-stanza riga-nuova",
			children: [/* @__PURE__ */ (0, b.jsx)("input", {
				className: "riga-nome",
				type: "text",
				placeholder: "Nome della nuova stanza",
				value: i,
				onChange: (e) => a(e.target.value),
				onKeyDown: (e) => e.key === "Enter" && o(),
				"aria-label": "Nome della nuova stanza"
			}), /* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "btn tap-target",
				onClick: o,
				disabled: !i.trim(),
				children: "Aggiungi stanza"
			})]
		})]
	});
}
var Yn = [
	{
		gruppo: "Al kWh consumato",
		campi: [
			{
				id: "energia",
				nome: "Spesa per la vendita di energia",
				nota: "€/kWh. Sullo scontrino: «di cui spesa per la vendita di energia elettrica».",
				passo: "0.000001"
			},
			{
				id: "rete",
				nome: "Spesa per la rete e gli oneri di sistema",
				nota: "€/kWh. Sullo scontrino, la riga subito sotto.",
				passo: "0.000001"
			},
			{
				id: "accisa",
				nome: "Accisa sull'energia elettrica",
				nota: "€/kWh. Nel dettaglio fiscale della bolletta.",
				passo: "0.0001"
			}
		]
	},
	{
		gruppo: "Al mese, indipendenti dai consumi",
		campi: [
			{
				id: "quota_fissa",
				nome: "Quota fissa",
				nota: "€/mese. Si paga anche a consumo zero.",
				passo: "0.01"
			},
			{
				id: "quota_potenza",
				nome: "Quota potenza",
				nota: "€ per kW impegnato al mese.",
				passo: "0.01"
			},
			{
				id: "potenza_impegnata",
				nome: "Potenza impegnata",
				nota: "kW del contatore. Di solito 3 o 4,5.",
				passo: "0.5"
			},
			{
				id: "canone_tv",
				nome: "Canone TV",
				nota: "€/mese, addebitati in bolletta da gennaio a ottobre. Zero se non dovuto.",
				passo: "0.5"
			}
		]
	},
	{
		gruppo: "Altro",
		campi: [{
			id: "iva",
			nome: "IVA",
			nota: "Percentuale. Per uso domestico residente è il 10%.",
			passo: "1"
		}, {
			id: "vendita",
			nome: "Energia venduta al GSE",
			nota: "€/kWh immesso in rete. Non scende dalla bolletta: si mostra a parte.",
			passo: "0.01"
		}]
	}
];
function Xn({ bozza: e, bloccato: t, onCambia: n }) {
	let r = e.tariffe || {}, i = (t, i) => {
		let a = i === "" ? null : Number(String(i).replace(",", "."));
		n({
			...e,
			tariffe: {
				...r,
				[t]: Number.isFinite(a) ? a : null
			}
		});
	};
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "elenco-stanze-imp",
		children: [Yn.map((e) => /* @__PURE__ */ (0, b.jsxs)("section", {
			className: "gruppo-stanze",
			children: [/* @__PURE__ */ (0, b.jsx)("h3", {
				className: "gruppo-stanze-titolo",
				children: e.gruppo
			}), e.campi.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "riga-stanza riga-preferenza",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "riga-identita",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "riga-nome-fisso",
						children: e.nome
					}), /* @__PURE__ */ (0, b.jsx)("span", {
						className: "riga-id",
						children: e.nota
					})]
				}), /* @__PURE__ */ (0, b.jsx)("input", {
					className: "riga-numero",
					type: "number",
					inputMode: "decimal",
					step: e.passo,
					min: "0",
					value: r[e.id] ?? "",
					disabled: t,
					onChange: (t) => i(e.id, t.target.value),
					"aria-label": e.nome
				})]
			}, e.id))]
		}, e.gruppo)), /* @__PURE__ */ (0, b.jsx)("p", {
			className: "famiglia-vuota",
			children: "La stima riproduce la struttura della bolletta: consumi al kWh, quote fisse sui giorni, accise e IVA. Con questi numeri presi da una fattura vera il conto torna al centesimo — ma conguagli, cambi di prezzo e ricalcoli del distributore restano imprevedibili."
		})]
	});
}
function Zn() {
	let e = C(), { barraHA: t } = T();
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "elenco-stanze-imp",
		children: /* @__PURE__ */ (0, b.jsxs)("section", {
			className: "gruppo-stanze",
			children: [/* @__PURE__ */ (0, b.jsx)("h3", {
				className: "gruppo-stanze-titolo",
				children: "Questo dispositivo"
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "riga-stanza riga-preferenza",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "riga-identita",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "riga-nome-fisso",
						children: "Barra laterale di Home Assistant"
					}), /* @__PURE__ */ (0, b.jsx)("span", {
						className: "riga-id",
						children: "Nascosta, CasaOS occupa tutta la larghezza dello schermo."
					})]
				}), /* @__PURE__ */ (0, b.jsxs)("select", {
					className: "riga-select",
					value: t === "visibile" ? "visibile" : "nascosta",
					onChange: (t) => e.impostaBarraHA(t.target.value),
					"aria-label": "Barra laterale di Home Assistant",
					children: [/* @__PURE__ */ (0, b.jsx)("option", {
						value: "nascosta",
						children: "Nascosta"
					}), /* @__PURE__ */ (0, b.jsx)("option", {
						value: "visibile",
						children: "Visibile"
					})]
				})]
			})]
		})
	});
}
function Qn({ onChiudi: e }) {
	let t = C(), n = ne(), r = !T().amministratore, [i, a] = (0, l.useState)("dispositivi"), [o, s] = (0, l.useState)(null), [c, u] = (0, l.useState)(null), [d, f] = (0, l.useState)(!1), [p, m] = (0, l.useState)(""), [h, g] = (0, l.useState)(!0), [_, v] = (0, l.useState)(!1), [y, x] = (0, l.useState)(() => Wn(n)), S = (0, l.useRef)(JSON.stringify(Wn(n))), w = JSON.stringify(y) !== S.current;
	(0, l.useEffect)(() => {
		let e = !0, n = t.hass()?.connection;
		if (n) return Rn(n).then((t) => e && s(t)).catch((t) => e && u(`Non riesco a leggere le entità: ${t.message}`)), () => {
			e = !1;
		};
	}, [t]), (0, l.useEffect)(() => {
		let t = (t) => t.key === "Escape" && e();
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [e]);
	let ee = (0, l.useMemo)(() => {
		if (!o) return [];
		let e = o.elenco;
		return _ || (e = e.filter((e) => Pn.includes(e.dominio))), h && (e = e.filter((e) => !y.perEntita[e.entity_id]?.stanza)), Vn(e, p);
	}, [
		o,
		_,
		h,
		p,
		y.perEntita
	]), te = (0, l.useMemo)(() => {
		let e = {};
		for (let t of Object.values(y.perEntita)) t.stanza && (e[t.stanza] = (e[t.stanza] || 0) + 1);
		return e;
	}, [y.perEntita]), re = (0, l.useMemo)(() => {
		if (!o) return /* @__PURE__ */ new Map();
		let e = /* @__PURE__ */ new Map();
		for (let t of o.elenco) {
			if (y.perEntita[t.entity_id]?.stanza) continue;
			let n = Bn(t.areaHA, y.stanze);
			n && e.set(t.entity_id, y.stanze.find((e) => e.id === n));
		}
		return e;
	}, [
		o,
		y.stanze,
		y.perEntita
	]), ie = (0, l.useCallback)(() => {
		let e = { ...y.perEntita };
		for (let t of ee) {
			let n = re.get(t.entity_id);
			n && (e[t.entity_id] = {
				...e[t.entity_id] || {
					categoria: "",
					nome: ""
				},
				stanza: n.id
			});
		}
		x({
			...y,
			perEntita: e
		});
	}, [
		y,
		ee,
		re
	]), ae = ee.filter((e) => re.has(e.entity_id)).length;
	async function oe() {
		f(!0), u(null);
		try {
			await t.salvaConfigurazione(Gn(n, y, o?.elenco || [])), S.current = JSON.stringify(y), e();
		} catch (e) {
			u(/rev/i.test(e.message) ? "Qualcun altro ha modificato la configurazione nel frattempo. Chiudi e riapri le impostazioni per ripartire da quella aggiornata." : `Salvataggio non riuscito: ${e.message}`);
		} finally {
			f(!1);
		}
	}
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "velo-impostazioni",
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "impostazioni",
			role: "dialog",
			"aria-label": "Impostazioni di CasaOS",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("header", {
					className: "imp-testa",
					children: [
						/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", {
							className: "imp-titolo",
							children: "Impostazioni"
						}), /* @__PURE__ */ (0, b.jsx)("span", {
							className: "imp-sotto",
							children: r ? "Sola lettura: per modificare serve un utente amministratore di Home Assistant." : `${Object.values(y.perEntita).filter((e) => e.stanza).length} dispositivi assegnati · ${y.stanze.length} stanze`
						})] }),
						/* @__PURE__ */ (0, b.jsx)("nav", {
							className: "viste",
							"aria-label": "Sezioni delle impostazioni",
							children: [
								["dispositivi", "Dispositivi"],
								["stanze", "Stanze"],
								["energia", "Energia"],
								["pannello", "Pannello"]
							].map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("button", {
								type: "button",
								className: "vista tap-target",
								"data-scelta": i === e ? "si" : "no",
								"aria-pressed": i === e,
								onClick: () => a(e),
								children: t
							}, e))
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "imp-azioni",
							children: [!r && /* @__PURE__ */ (0, b.jsx)("button", {
								type: "button",
								className: "btn btn-forte tap-target",
								onClick: oe,
								disabled: !w || d,
								children: d ? "Salvo…" : w ? "Salva" : "Salvato"
							}), /* @__PURE__ */ (0, b.jsx)("button", {
								type: "button",
								className: "btn tap-target",
								onClick: e,
								children: "Chiudi"
							})]
						})
					]
				}),
				c && /* @__PURE__ */ (0, b.jsx)("p", {
					className: "imp-errore",
					children: c
				}),
				i === "dispositivi" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "imp-filtri",
					children: [
						/* @__PURE__ */ (0, b.jsx)("input", {
							className: "imp-cerca",
							type: "search",
							placeholder: "Cerca un dispositivo…",
							value: p,
							onChange: (e) => m(e.target.value),
							"aria-label": "Cerca un dispositivo"
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "imp-interruttore",
							children: [/* @__PURE__ */ (0, b.jsx)("input", {
								type: "checkbox",
								checked: h,
								onChange: (e) => g(e.target.checked)
							}), "Solo da assegnare"]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "imp-interruttore",
							children: [/* @__PURE__ */ (0, b.jsx)("input", {
								type: "checkbox",
								checked: _,
								onChange: (e) => v(e.target.checked)
							}), "Tutte le entità"]
						}),
						ae > 0 && !r && /* @__PURE__ */ (0, b.jsxs)("button", {
							type: "button",
							className: "btn tap-target",
							onClick: ie,
							children: [
								"Usa le stanze di Home Assistant (",
								ae,
								")"
							]
						})
					]
				}), /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "imp-corpo",
					children: [
						!o && !c && /* @__PURE__ */ (0, b.jsx)("p", {
							className: "testo-secondario",
							children: "Leggo le entità…"
						}),
						o && ee.length === 0 && /* @__PURE__ */ (0, b.jsx)("p", {
							className: "testo-secondario",
							children: h ? "Niente da assegnare: tutti i dispositivi visibili sono già in una stanza." : "Nessun dispositivo corrisponde alla ricerca."
						}),
						ee.map((e) => /* @__PURE__ */ (0, b.jsx)(Kn, {
							voce: e,
							assegnazione: y.perEntita[e.entity_id],
							stanze: y.stanze,
							suggerita: re.get(e.entity_id),
							bloccato: r,
							onCambia: (t) => x((n) => ({
								...n,
								perEntita: {
									...n.perEntita,
									[e.entity_id]: t
								}
							}))
						}, e.entity_id))
					]
				})] }) : i === "stanze" ? /* @__PURE__ */ (0, b.jsx)("div", {
					className: "imp-corpo",
					children: /* @__PURE__ */ (0, b.jsx)(Jn, {
						bozza: y,
						bloccato: r,
						conta: te,
						onCambia: x
					})
				}) : i === "energia" ? /* @__PURE__ */ (0, b.jsx)("div", {
					className: "imp-corpo",
					children: /* @__PURE__ */ (0, b.jsx)(Xn, {
						bozza: y,
						bloccato: r,
						onCambia: x
					})
				}) : /* @__PURE__ */ (0, b.jsx)("div", {
					className: "imp-corpo",
					children: /* @__PURE__ */ (0, b.jsx)(Zn, {})
				})
			]
		})
	});
}
//#endregion
//#region src/App.jsx
var $n = (e) => String(e).padStart(2, "0"), er = 6e4, tr = 9e4, nr = 1200;
function rr(e) {
	if (!e) return [];
	let t = [
		...(e.luci || []).map((e) => e.entity_id),
		...(e.prese || []).map((e) => e.entity_id),
		...(e.dispositivi || []).map((e) => e.entity_id),
		...(e.ingressi?.cancelli || []).map((e) => e.entity_id),
		...(e.ingressi?.porte || []).map((e) => e.entity_id),
		...(e.telecamere || []).map((e) => e.entity_id),
		...(e.scorciatoie || []).map((e) => e.entity_id),
		...(e.persone || []).flatMap((e) => [
			e.presenza,
			e.batteria,
			e.stato_batteria
		]),
		(e.persone || []).length > 0 ? "zone.home" : null,
		...(e.scene || []).map((e) => e.entity_id),
		...(e.clima?.raffrescamento || []).map((e) => e.entity_id),
		...(e.sensori || []).map((e) => e.entity_id),
		...Object.values(e.energia || {}),
		e.meteo
	];
	return e.clima?.riscaldamento?.entity_id && t.push(e.clima.riscaldamento.entity_id), [...new Set(t.filter((e) => typeof e == "string" && e.includes(".")))];
}
var ir = (e) => !!(e && ((e.luci || []).length || (e.prese || []).length || (e.stanze || []).length || (e.dispositivi || []).length || (e.ingressi?.cancelli || []).length || Object.keys(e.energia || {}).length));
function ar() {
	let [e, t] = (0, l.useState)("strumento"), [n, r] = (0, l.useState)(!1), i = (0, l.useRef)(0), a = (0, l.useRef)(0), o = (0, l.useCallback)(() => {
		t("strumento"), r(!1), clearTimeout(i.current), clearTimeout(a.current), i.current = setTimeout(() => t("scena"), er), a.current = setTimeout(() => r(!0), tr);
	}, []);
	return (0, l.useEffect)(() => {
		let e = [
			"pointerdown",
			"keydown",
			"wheel",
			"touchstart"
		];
		for (let t of e) window.addEventListener(t, o, { passive: !0 });
		return o(), () => {
			clearTimeout(i.current), clearTimeout(a.current);
			for (let t of e) window.removeEventListener(t, o);
		};
	}, [o]), {
		regime: e,
		inRiposo: n,
		risveglia: o
	};
}
function or({ onApri: e }) {
	return /* @__PURE__ */ (0, b.jsx)("button", {
		type: "button",
		className: "scelta-tema tap-target",
		onClick: e,
		"aria-label": "Impostazioni di CasaOS",
		title: "Impostazioni",
		children: /* @__PURE__ */ (0, b.jsxs)("svg", {
			className: "tema-segno",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, b.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "3.2"
			}), /* @__PURE__ */ (0, b.jsx)("path", { d: "M12 2.6v2.6M12 18.8v2.6M21.4 12h-2.6M5.2 12H2.6M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9M18.6 18.6l-1.9-1.9M7.3 7.3 5.4 5.4" })]
		})
	});
}
function sr() {
	let [e, t] = (0, l.useState)(() => /* @__PURE__ */ new Date());
	return (0, l.useEffect)(() => {
		let e = setInterval(() => t(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "ora",
		children: [/* @__PURE__ */ (0, b.jsxs)("span", {
			className: "ora-cifre",
			children: [
				$n(e.getHours()),
				":",
				$n(e.getMinutes())
			]
		}), /* @__PURE__ */ (0, b.jsx)("span", {
			className: "ora-data",
			children: e.toLocaleDateString("it-IT", {
				weekday: "long",
				day: "numeric",
				month: "long"
			})
		})]
	});
}
function cr({ titolo: e, indice: t, espandi: n, children: r }) {
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "carta anima-entrata",
		"data-espandi": n ? "si" : "no",
		style: { "--i": t },
		children: [/* @__PURE__ */ (0, b.jsx)("h2", {
			className: "carta-titolo",
			children: e
		}), /* @__PURE__ */ (0, b.jsx)("div", {
			className: "carta-corpo",
			children: r
		})]
	});
}
function lr() {
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "carta anima-entrata",
		style: { "--i": 0 },
		children: [/* @__PURE__ */ (0, b.jsx)("h2", {
			className: "carta-titolo",
			children: "Casa da configurare"
		}), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "carta-corpo",
			children: [/* @__PURE__ */ (0, b.jsx)("p", {
				className: "testo",
				children: "CasaOS è installato ma non sa ancora cosa c'è in questa casa: quali luci, quali cancelli, quali sensori del fotovoltaico."
			}), /* @__PURE__ */ (0, b.jsxs)("p", {
				className: "testo-secondario",
				children: [
					"La schermata di configurazione arriva nella prossima fase. Per ora la configurazione si carica con ",
					/* @__PURE__ */ (0, b.jsx)("code", { children: "dev/importa-config.mjs" }),
					"."
				]
			})]
		})]
	});
}
function ur({ config: e, regime: t }) {
	let n = T(), r = re();
	return /* @__PURE__ */ (0, b.jsxs)("details", {
		className: "diagnostica",
		children: [/* @__PURE__ */ (0, b.jsx)("summary", { children: "Stato del collegamento" }), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "diagnostica-corpo",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("span", { children: [
					"Utente: ",
					n.utente ?? "—",
					n.amministratore ? " (amministratore)" : ""
				] }),
				/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Aggiornamenti: ", r.aggiornamenti] }),
				/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Entità seguite: ", rr(e).length] }),
				/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Configurazione: revisione ", e?.rev ?? "—"] }),
				/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Regime: ", t] }),
				/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Versione: ", n.versione ?? "—"] })
			]
		})]
	});
}
function dr() {
	let e = C(), t = T(), n = ne(), { regime: r, inRiposo: i, risveglia: a } = ar(), [o, s] = (0, l.useState)("casa"), [c, u] = (0, l.useState)(!1), [d, f] = (0, l.useState)(!0);
	(0, l.useEffect)(() => {
		let e = setTimeout(() => f(!1), nr);
		return () => clearTimeout(e);
	}, []), (0, l.useEffect)(() => {
		e.collegaConfigurazione();
	}, [e, t.connesso]), (0, l.useEffect)(() => {
		e.sottoscrivi(rr(n));
	}, [
		e,
		n,
		t.connesso
	]);
	let p = ir(n), m = Object.keys(n?.energia || {}).length > 0, h = (n?.telecamere || []).length > 0;
	return (0, l.useEffect)(() => {
		!h && o === "telecamere" && s("casa"), !m && o === "energia" && s("casa");
	}, [
		h,
		m,
		o
	]), /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "casaos-root",
		"data-theme": t.scuro ? "dark" : "light",
		"data-density": t.narrow ? "hand" : "wall",
		"data-regime": r,
		"data-avvio": d ? "si" : "no",
		"data-vista": o,
		style: n?.casa?.accento ? { "--cs-accent-h": n.casa.accento } : void 0,
		children: [
			/* @__PURE__ */ (0, b.jsxs)("header", {
				className: "intestazione anima-entrata",
				style: { "--i": 0 },
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "barra-sinistra",
					children: [/* @__PURE__ */ (0, b.jsx)(sr, {}), n?.meteo && /* @__PURE__ */ (0, b.jsx)(_t, { entityId: n.meteo })]
				}), /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "barra-destra",
					children: [
						(h || m) && /* @__PURE__ */ (0, b.jsx)("nav", {
							className: "viste",
							"aria-label": "Sezioni",
							children: [
								["casa", "Casa"],
								...h ? [["telecamere", "Telecamere"]] : [],
								...m ? [["energia", "Energia"]] : []
							].map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("button", {
								type: "button",
								className: "vista tap-target",
								"data-scelta": o === e ? "si" : "no",
								"aria-pressed": o === e,
								onClick: () => s(e),
								children: t
							}, e))
						}),
						!t.connesso && /* @__PURE__ */ (0, b.jsx)("span", {
							className: "stato-collegamento",
							"data-stato": "ko",
							children: "Disconnesso"
						}),
						/* @__PURE__ */ (0, b.jsx)(xt, {}),
						/* @__PURE__ */ (0, b.jsx)(or, { onApri: () => u(!0) })
					]
				})]
			}),
			o === "casa" && p && n.stanze?.length > 0 && /* @__PURE__ */ (0, b.jsx)("div", {
				className: "fascia-stanze anima-entrata",
				style: { "--i": 1 },
				children: /* @__PURE__ */ (0, b.jsx)(Ae, { casa: n })
			}),
			o === "telecamere" ? /* @__PURE__ */ (0, b.jsxs)("section", {
				className: "pannello-telecamere anima-entrata",
				style: { "--i": 1 },
				children: [/* @__PURE__ */ (0, b.jsx)("h2", {
					className: "pannello-titolo",
					children: "Telecamere"
				}), /* @__PURE__ */ (0, b.jsx)(ct, { casa: n })]
			}) : o === "energia" ? /* @__PURE__ */ (0, b.jsxs)("section", {
				className: "pannello-telecamere anima-entrata",
				style: { "--i": 1 },
				children: [/* @__PURE__ */ (0, b.jsx)("h2", {
					className: "pannello-titolo",
					children: "Energia"
				}), /* @__PURE__ */ (0, b.jsx)(An, { casa: n })]
			}) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [p && m && /* @__PURE__ */ (0, b.jsxs)("section", {
				className: "pannello-energia anima-entrata",
				style: { "--i": 1 },
				children: [/* @__PURE__ */ (0, b.jsx)("h2", {
					className: "pannello-titolo",
					children: "Fotovoltaico"
				}), /* @__PURE__ */ (0, b.jsx)(Ke, {
					casa: n,
					regime: r
				})]
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "colonna",
				children: [
					!p && /* @__PURE__ */ (0, b.jsx)(lr, {}),
					p && !n.stanze?.length && (n.luci?.length > 0 || n.prese?.length > 0) && /* @__PURE__ */ (0, b.jsx)(cr, {
						titolo: "Illuminazione",
						indice: 2,
						espandi: !0,
						children: /* @__PURE__ */ (0, b.jsx)(he, { casa: n })
					}),
					n?.persone?.length > 0 && /* @__PURE__ */ (0, b.jsx)(cr, {
						titolo: "In casa",
						indice: 2,
						children: /* @__PURE__ */ (0, b.jsx)(Xt, {
							persone: n.persone,
							interattivo: !0
						})
					}),
					p && (n.ingressi?.cancelli?.length > 0 || n.ingressi?.porte?.length > 0) && /* @__PURE__ */ (0, b.jsx)(cr, {
						titolo: "Ingressi",
						indice: 3,
						children: /* @__PURE__ */ (0, b.jsx)(Pe, { casa: n })
					})
				]
			})] }),
			/* @__PURE__ */ (0, b.jsx)("footer", {
				className: "pie-pagina",
				children: /* @__PURE__ */ (0, b.jsx)(ur, {
					config: n,
					regime: r
				})
			}),
			(n?.rifiuti || n?.scorciatoie?.length > 0) && /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "pastiglie",
				children: [/* @__PURE__ */ (0, b.jsx)(tn, { scorciatoie: n?.scorciatoie }), n?.rifiuti && /* @__PURE__ */ (0, b.jsx)(Rt, {
					rifiuti: n.rifiuti,
					compatto: !0
				})]
			}),
			c && /* @__PURE__ */ (0, b.jsx)(Qn, { onChiudi: () => u(!1) }),
			/* @__PURE__ */ (0, b.jsx)(Ye, {}),
			i && !c && /* @__PURE__ */ (0, b.jsx)(Nn, { onSveglia: a })
		]
	});
}
function fr({ store: e }) {
	return /* @__PURE__ */ (0, b.jsx)(S, {
		store: e,
		children: /* @__PURE__ */ (0, b.jsx)(dr, {})
	});
}
//#endregion
//#region src/hass/store.js
var pr = 5e3, mr = 2e4, hr = /* @__PURE__ */ new Set(["cover"]);
function gr() {
	let e = null, t = !1, n = null, r = "/casaos_static", i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), c = null, l = "", u = null, d = null, f = /* @__PURE__ */ new Set(), p = null, m = "casaos_tema";
	function h() {
		try {
			let e = globalThis.localStorage?.getItem(m);
			return e === "chiaro" || e === "scuro" ? e : "auto";
		} catch {
			return "auto";
		}
	}
	let g = h(), _ = "casaos_barra_ha", v = "nascosta";
	try {
		globalThis.localStorage?.getItem(_) === "visibile" && (v = "visibile");
	} catch {}
	let y = null, b = !0, x = () => g === "auto" ? b : g === "scuro", S = 0, C = ne(), w = {
		aggiornamenti: 0,
		ultimoAggiornamento: null
	}, ee = 0, te = !1;
	function ne() {
		return {
			utente: null,
			amministratore: !1,
			connesso: !1,
			scuro: x(),
			tema: g,
			barraHA: v,
			lingua: null,
			narrow: !1,
			versione: null,
			statico: "/casaos_static"
		};
	}
	function T(e) {
		return [
			e.utente,
			e.amministratore,
			e.connesso,
			e.scuro,
			e.tema,
			e.barraHA,
			e.lingua,
			e.narrow,
			e.versione
		].join("|");
	}
	function re() {
		for (let e of s) e();
	}
	function ie(e) {
		let t = a.get(e);
		if (t) for (let e of t) e();
	}
	function ae(e, t) {
		return {
			entity_id: e,
			state: t.s,
			attributes: t.a || {},
			last_changed: t.lc,
			last_updated: t.lu ?? t.lc,
			context: typeof t.c == "string" ? { id: t.c } : t.c || {}
		};
	}
	function oe(e) {
		let t = [];
		if (e.a) for (let [n, r] of Object.entries(e.a)) i.set(n, ae(n, r)), t.push(n);
		if (e.c) for (let [n, r] of Object.entries(e.c)) {
			let e = i.get(n);
			if (!e) continue;
			let a = {
				...e,
				attributes: { ...e.attributes }
			}, o = r["+"];
			o && (o.s !== void 0 && (a.state = o.s), o.a && Object.assign(a.attributes, o.a), o.lc !== void 0 && (a.last_changed = o.lc), o.lu !== void 0 && (a.last_updated = o.lu), o.c !== void 0 && (a.context = typeof o.c == "string" ? {
				...e.context,
				id: o.c
			} : o.c));
			let s = r["-"];
			if (s?.a) {
				let e = Array.isArray(s.a) ? s.a : Object.keys(s.a);
				for (let t of e) delete a.attributes[t];
			}
			i.set(n, a), t.push(n);
		}
		if (e.r) for (let n of e.r) i.delete(n), t.push(n);
		for (let e of t) se(e), ie(e);
		E();
	}
	function se(e) {
		let t = o.get(e);
		if (!t) return;
		let n = i.get(e)?.context?.id;
		if (!n || t.contesti.has(n) || t.contesti.size === 0) {
			o.delete(e);
			return;
		}
		o.delete(e);
	}
	function ce(e, t, n) {
		let r = i.get(e);
		r && (o.set(e, {
			precedente: r,
			scadenza: Date.now() + (n ? mr : pr),
			contesti: /* @__PURE__ */ new Set()
		}), i.set(e, {
			...r,
			...t,
			_previsto: !0
		}), ie(e));
	}
	function le(e) {
		let t = o.get(e);
		t && (i.set(e, t.precedente), o.delete(e), ie(e));
	}
	setInterval(() => {
		let e = Date.now();
		for (let [t, n] of o) n.scadenza <= e && le(t);
	}, 1e3);
	function E() {
		S += 1, !te && (te = !0, ee = setTimeout(() => {
			te = !1, w = {
				aggiornamenti: S,
				ultimoAggiornamento: /* @__PURE__ */ new Date()
			}, re();
		}, 1e3));
	}
	function D(t) {
		if (!e?.connection) return;
		let n = [...t].sort().join(",");
		(n !== l || u !== e.connection) && (u = e.connection, c &&= (c(), null), l = n, t.length && e.connection.subscribeMessage(oe, {
			type: "subscribe_entities",
			entity_ids: t
		}).then((e) => {
			c = e;
		}).catch(() => {
			l = "";
		}));
	}
	async function ue() {
		if (!(!e?.connection || p)) {
			try {
				d = await e.connection.sendMessagePromise({ type: "casaos/config/get" }), de();
			} catch {
				d = { errore: "La configurazione non è raggiungibile." }, de();
				return;
			}
			try {
				p = await e.connection.subscribeMessage((e) => {
					d = e, de();
				}, { type: "casaos/config/subscribe" });
			} catch {}
		}
	}
	function de() {
		for (let e of f) e();
	}
	return {
		collegaConfigurazione: ue,
		configurazione: () => d,
		iscriviConfig(e) {
			return f.add(e), () => f.delete(e);
		},
		async salvaConfigurazione(t) {
			return e.connection.sendMessagePromise({
				type: "casaos/config/set",
				config: t,
				base_rev: d?.rev ?? null
			});
		},
		async entitaMancanti() {
			return e.connection.sendMessagePromise({ type: "casaos/config/entita_mancanti" });
		},
		collega(i) {
			e = i, b = typeof e?.themes?.darkMode == "boolean" ? e.themes.darkMode : globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches !== !1;
			let a = {
				utente: e?.user?.name ?? null,
				amministratore: !!e?.user?.is_admin,
				connesso: e?.connected !== !1,
				scuro: x(),
				tema: g,
				barraHA: v,
				lingua: e?.language ?? null,
				narrow: t,
				versione: n,
				statico: r
			};
			T(a) !== T(C) && (C = a, re());
		},
		collegaBarraHA(e) {
			y = e, y(v === "nascosta" ? "always_hidden" : "docked");
		},
		impostaBarraHA(e) {
			let t = e === "visibile" ? "visibile" : "nascosta";
			if (t !== v) {
				v = t;
				try {
					globalThis.localStorage?.setItem(_, t);
				} catch {}
				y?.(t === "nascosta" ? "always_hidden" : "docked"), C = {
					...C,
					barraHA: v
				}, re();
			}
		},
		impostaTema(e) {
			let t = e === "chiaro" || e === "scuro" ? e : "auto";
			if (t !== g) {
				g = t;
				try {
					t === "auto" ? globalThis.localStorage?.removeItem(m) : globalThis.localStorage?.setItem(m, t);
				} catch {}
				C = {
					...C,
					tema: g,
					scuro: x()
				}, re();
			}
		},
		setNarrow(e) {
			e !== t && (t = e, C = {
				...C,
				narrow: t
			}, re());
		},
		setPannello(e) {
			n = e?.version ?? n, r = e?.static ?? r, C = {
				...C,
				versione: n,
				statico: r
			};
		},
		sottoscrivi: D,
		entita: (e) => i.get(e),
		iscriviEntita(e, t) {
			let n = a.get(e);
			return n || (n = /* @__PURE__ */ new Set(), a.set(e, n)), n.add(t), () => {
				n.delete(t), n.size || a.delete(e);
			};
		},
		iscriviSessione(e) {
			return s.add(e), () => s.delete(e);
		},
		sessione: () => C,
		attivita: () => w,
		hass: () => e,
		async chiama(t, n, r, i) {
			let a = [].concat(r?.entity_id ?? []), s = hr.has(t);
			if (i) for (let e of a) ce(e, i, s);
			try {
				let i = await e.callService(t, n, r), s = i?.context?.id;
				if (s) for (let e of a) o.get(e)?.contesti.add(s);
				return i;
			} catch (e) {
				for (let e of a) le(e);
				throw e;
			}
		},
		distruggi() {
			clearTimeout(ee), c && c(), c = null, p && p(), p = null, f.clear(), d = null, s.clear(), a.clear(), i.clear(), o.clear(), e = null;
		}
	};
}
//#endregion
//#region src/panel.jsx
var _r = ":host{--cs-scale:1;--cs-tap:44px;--cs-tap-primario:56px;--cs-accent-h:210;--cs-accent-s:100%;--cs-accent:hsl(var(--cs-accent-h) var(--cs-accent-s) 65%);--cs-accent-hover:hsl(var(--cs-accent-h) var(--cs-accent-s) 72%);--cs-accent-quiet:hsl(var(--cs-accent-h) var(--cs-accent-s) 65% / .14);--cs-accent-line:hsl(var(--cs-accent-h) var(--cs-accent-s) 65% / .36);--cs-text-on-accent:#05121f;--cs-bg-base:#0a0e14;--cs-bg-sunken:#070a0f;--cs-surface-1:#121821;--cs-surface-2:#1a2230;--cs-surface-3:#232d3d;--cs-scrim:#06090eb8;--cs-text-1:#eaf0f7;--cs-text-2:#9fb0c3;--cs-text-3:#7c8ea3;--cs-line-1:#ffffff12;--cs-line-2:#ffffff21;--cs-line-strong:#ffffff3d;--cs-on:#ffc24b;--cs-on-quiet:#ffc24b1a;--cs-on-line:#ffc24b4d;--cs-ok:#34d399;--cs-ok-quiet:#34d3991f;--cs-ok-line:#34d39952;--cs-alert:#ff5a6e;--cs-alert-quiet:#ff5a6e1f;--cs-alert-line:#ff5a6e57;--cs-cool:#5bc8ff;--cs-cool-quiet:#5bc8ff1f;--cs-unavail:#55606e;--cs-energy-solar:#f59e0b;--cs-energy-house:#fbbf24;--cs-energy-battery:#34d399;--cs-energy-grid:#5bc8ff;--cs-sp-1:4px;--cs-sp-2:8px;--cs-sp-3:12px;--cs-sp-4:16px;--cs-sp-5:20px;--cs-sp-6:24px;--cs-sp-8:32px;--cs-sp-10:40px;--cs-sp-12:48px;--cs-sp-16:64px;--cs-r-xs:6px;--cs-r-sm:10px;--cs-r-md:16px;--cs-r-lg:20px;--cs-r-xl:28px;--cs-r-full:999px;--cs-el-0:none;--cs-el-1:0 1px 2px #00000047, 0 4px 12px #0000002e;--cs-el-2:0 2px 4px #00000052, 0 10px 28px #0000003d;--cs-el-3:0 4px 8px #0000005c, 0 24px 56px #00000057;--cs-el-focus:0 0 0 3px var(--cs-bg-base), 0 0 0 6px var(--cs-accent);--cs-glass-bg:var(--cs-scrim);--cs-glass-blur:blur(20px) saturate(140%);--cs-font-ui:\"Inter\", system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif;--cs-font-display:\"Syne\", var(--cs-font-ui);--cs-font-numeric:\"Space Mono\", ui-monospace, \"Cascadia Mono\", monospace;--cs-fw-regular:400;--cs-fw-medium:500;--cs-fw-semibold:600;--cs-fw-bold:700;--cs-fw-black:800;--cs-t-hero:clamp(48px, 13vw, calc(74px * var(--cs-scale)));--cs-t-display:calc(32px * var(--cs-scale));--cs-t-title:calc(20px * var(--cs-scale));--cs-t-subtitle:calc(17px * var(--cs-scale));--cs-t-body:calc(15px * var(--cs-scale));--cs-t-label:calc(13px * var(--cs-scale));--cs-t-caption:calc(12px * var(--cs-scale));--cs-t-eyebrow:calc(11px * var(--cs-scale));--cs-t-value:calc(28px * var(--cs-scale));--cs-lh-hero:.92;--cs-lh-display:1.1;--cs-lh-title:1.25;--cs-lh-body:1.5;--cs-lh-tight:1.3;--cs-ls-eyebrow:.08em;--cs-ls-tight:-.015em;--cs-icon-stroke:1.75;--cs-icon-sm:20px;--cs-icon-md:24px;--cs-icon-lg:32px;--cs-icon-xl:44px;--cs-dur-instant:90ms;--cs-dur-fast:.16s;--cs-dur-base:.24s;--cs-dur-slow:.42s;--cs-dur-ambient:.9s;--cs-dur-scene:90s;--cs-stagger:40ms;--cs-ease-out:cubic-bezier(.22, 1, .36, 1);--cs-ease-inout:cubic-bezier(.65, 0, .35, 1);--cs-ease-spring:cubic-bezier(.34, 1.56, .64, 1);--cs-motion:1;--cs-z-base:0;--cs-z-raised:10;--cs-z-sticky:100;--cs-z-dropdown:200;--cs-z-sheet:300;--cs-z-modal:400;--cs-z-toast:500;--cs-z-rest:900;--cs-z-critical:1000;background:var(--cs-bg-base);block-size:100%;color:var(--cs-text-1);font-family:var(--cs-font-ui);font-size:var(--cs-t-body);font-weight:var(--cs-fw-regular);line-height:var(--cs-lh-body);letter-spacing:normal;text-transform:none;font-variant-numeric:tabular-nums;font-feature-settings:\"tnum\" 1, \"cv05\" 1;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%;--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark;overscroll-behavior:contain;display:block}:host([data-theme=light]),.casaos-root[data-theme=light]{--cs-bg-base:#f2f5f8;--cs-bg-sunken:#e7ecf2;--cs-surface-1:#fff;--cs-surface-2:#f4f7fa;--cs-surface-3:#fff;--cs-scrim:#ffffffd1;--cs-text-1:#0e1620;--cs-text-2:#4a5a6b;--cs-text-3:#5d6e82;--cs-text-on-accent:#fff;--cs-line-1:#10182814;--cs-line-2:#10182824;--cs-line-strong:#10182847;--cs-accent:hsl(var(--cs-accent-h) 90% 44%);--cs-accent-hover:hsl(var(--cs-accent-h) 90% 38%);--cs-accent-quiet:hsl(var(--cs-accent-h) 90% 44% / .1);--cs-accent-line:hsl(var(--cs-accent-h) 90% 44% / .28);--cs-on:#8a5300;--cs-on-quiet:#f59e0b24;--cs-on-line:#b46e0052;--cs-ok:#0e7c5a;--cs-ok-quiet:#0e7c5a1a;--cs-ok-line:#0e7c5a4d;--cs-alert:#c42b3c;--cs-alert-quiet:#c42b3c17;--cs-alert-line:#c42b3c4d;--cs-cool:#0a6fa8;--cs-cool-quiet:#0a6fa81a;--cs-unavail:#8a97a6;--cs-el-1:0 1px 2px #1018280d, 0 2px 8px #1018280d;--cs-el-2:0 2px 4px #10182812, 0 8px 20px #10182814;--cs-el-3:0 6px 12px #10182817, 0 20px 48px #10182824;--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light}:host([data-density=wall]){--cs-scale:1.3;--cs-tap:64px;--cs-tap-primario:80px;--cs-icon-stroke:2}:host([data-density=hand]){--cs-scale:1}@media (pointer:coarse) and (min-width:1000px){:host(:not([data-density])){--cs-scale:1.3;--cs-tap:64px;--cs-tap-primario:80px;--cs-icon-stroke:2}}@media (prefers-reduced-motion:reduce){:host{--cs-motion:0;--cs-dur-instant:1ms;--cs-dur-fast:1ms;--cs-dur-base:1ms;--cs-dur-slow:1ms;--cs-dur-ambient:1ms;--cs-stagger:0s}:host,*,:before,:after{scroll-behavior:auto!important;transition-duration:1ms!important;animation-duration:1ms!important;animation-iteration-count:1!important}}:host([data-motion=ridotto]){--cs-motion:0;--cs-dur-instant:1ms;--cs-dur-fast:1ms;--cs-dur-base:1ms;--cs-dur-slow:1ms;--cs-dur-ambient:1ms;--cs-stagger:0s}:host([data-motion=ridotto]) *,:host([data-motion=ridotto]) :before,:host([data-motion=ridotto]) :after{transition-duration:1ms!important;animation-duration:1ms!important;animation-iteration-count:1!important}*,:before,:after{box-sizing:border-box}.casaos-mount{block-size:100%}.casaos-root{block-size:100%;min-block-size:var(--cs-viewport-h,100dvh);background:var(--cs-bg-base);color:var(--cs-text-1);padding:var(--cs-sp-6);padding-inline:max(var(--cs-sp-6), env(safe-area-inset-left), env(safe-area-inset-right));-webkit-tap-highlight-color:transparent;justify-content:center;align-items:flex-start;padding-block-end:max(var(--cs-sp-6), env(safe-area-inset-bottom));display:flex;container:casaos/inline-size}:host(:focus-visible),.casaos-root :focus-visible{box-shadow:var(--cs-el-focus);border-radius:var(--cs-r-sm);outline:none}.tap-target{min-block-size:var(--cs-tap);min-inline-size:var(--cs-tap);touch-action:manipulation}.casaos-root :where(h1,h2,h3,p,span){overflow-wrap:anywhere}.casaos-root :where(h1,h2,h3){text-wrap:balance}img,svg,video{max-inline-size:100%;display:block}button{font:inherit;color:inherit}.scheda{background:var(--cs-surface-1);border-radius:var(--cs-r-lg);inline-size:100%;max-inline-size:640px;box-shadow:var(--cs-el-1);padding:var(--cs-sp-6);animation:cs-entra var(--cs-dur-slow) var(--cs-ease-out) both;margin-block-start:var(--cs-sp-8)}@keyframes cs-entra{0%{opacity:0;transform:translateY(14px)scale(.985)}to{opacity:1;transform:none}}.testata{justify-content:space-between;align-items:flex-start;gap:var(--cs-sp-4);margin-block-end:var(--cs-sp-4);display:flex}.occhiello{margin:0 0 var(--cs-sp-1);font-family:var(--cs-font-numeric);font-size:var(--cs-t-eyebrow);line-height:var(--cs-lh-tight);letter-spacing:var(--cs-ls-eyebrow);text-transform:uppercase;color:var(--cs-accent)}.testata h1{font-size:var(--cs-t-display);font-weight:var(--cs-fw-bold);letter-spacing:var(--cs-ls-tight);line-height:var(--cs-lh-display);margin:0}.pillola{font-family:var(--cs-font-numeric);font-size:var(--cs-t-caption);font-weight:var(--cs-fw-bold);line-height:var(--cs-lh-tight);letter-spacing:.06em;text-transform:uppercase;padding:var(--cs-sp-1) var(--cs-sp-3);border-radius:var(--cs-r-full);border:1px solid #0000;flex-shrink:0}.pillola[data-stato=ok]{background:var(--cs-ok-quiet);color:var(--cs-ok);border-color:var(--cs-ok-line)}.pillola[data-stato=ko]{background:var(--cs-alert-quiet);color:var(--cs-alert);border-color:var(--cs-alert-line)}.intro{margin:0 0 var(--cs-sp-5);color:var(--cs-text-2);font-size:var(--cs-t-body);line-height:var(--cs-lh-body)}.intro code{font-family:var(--cs-font-numeric);background:var(--cs-surface-2);border:1px solid var(--cs-line-1);border-radius:var(--cs-r-xs);padding:1px var(--cs-sp-1);font-size:.9em}.griglia{border-block-start:1px solid var(--cs-line-1);flex-direction:column;display:flex}.riga{justify-content:space-between;align-items:baseline;gap:var(--cs-sp-4);padding-block:var(--cs-sp-3);border-block-end:1px solid var(--cs-line-1);display:flex}.riga-k{font-size:var(--cs-t-label);color:var(--cs-text-2)}.riga-v{font-family:var(--cs-font-numeric);font-size:var(--cs-t-label);color:var(--cs-text-1);text-align:end;transition:color var(--cs-dur-ambient) var(--cs-ease-out)}.riga-v[data-tono=forte]{font-size:var(--cs-t-subtitle);font-weight:var(--cs-fw-bold)}.riga-v[data-tono=ok]{color:var(--cs-ok)}.pie{font-size:var(--cs-t-label);line-height:var(--cs-lh-body);color:var(--cs-text-3);margin-block-start:var(--cs-sp-5)}@container casaos (width<=600px){.casaos-root{padding:var(--cs-sp-3)}.scheda{padding:var(--cs-sp-4);margin-block-start:var(--cs-sp-3)}}@supports not (container-type:inline-size){@media (max-width:700px){.casaos-root{padding:var(--cs-sp-3)}.scheda{padding:var(--cs-sp-4);margin-block-start:var(--cs-sp-3)}}}\n.casaos-mount{block-size:100%;container:casaos/inline-size}.casaos-root{block-size:var(--cs-viewport-h,100dvh);max-block-size:var(--cs-viewport-h,100dvh);gap:var(--cs-sp-5);grid-template:\"testa testa\"\"stanze stanze\"\"energia colonna\"minmax(0,1fr)\"piede piede\"/minmax(0,1.55fr) minmax(300px,1fr);align-items:stretch;display:grid;position:relative;overflow:hidden;container-type:normal}.intestazione{justify-content:space-between;align-items:baseline;gap:var(--cs-sp-5);border-block-end:1px solid var(--cs-line-1);flex-wrap:wrap;grid-area:testa;padding-block-end:var(--cs-sp-3);display:flex}.ora{align-items:baseline;gap:var(--cs-sp-4);min-inline-size:0;display:flex}.ora-cifre{font-family:var(--cs-font-display);letter-spacing:-.03em;color:var(--cs-text-1);font-variant-numeric:tabular-nums;font-size:clamp(40px,7cqi,76px);font-weight:800;line-height:.86}.ora-data{font-size:var(--cs-t-subtitle);color:var(--cs-text-2);text-transform:lowercase}.barra-sinistra{align-items:baseline;gap:var(--cs-sp-5);flex-wrap:wrap;min-inline-size:0;display:flex}.meteo{align-items:center;gap:var(--cs-sp-3);align-self:flex-end;min-inline-size:0;padding-block-end:.15em;display:flex}.meteo-segno{fill:none;block-size:auto;inline-size:clamp(1.75rem,3.2cqi,2.6rem);stroke:var(--cs-text-2);stroke-width:1.7px;stroke-linecap:round;stroke-linejoin:round;flex:none}.meteo-segno .meteo-caldo{stroke:var(--cs-on)}.meteo-segno .meteo-freddo{stroke:var(--cs-cool)}.meteo-segno .meteo-notte{stroke:var(--cs-text-2)}.meteo-testo{flex-direction:column;gap:.1em;min-inline-size:0;display:flex}.meteo-ora{font-family:var(--cs-font-display);color:var(--cs-text-1);font-variant-numeric:tabular-nums;font-size:clamp(18px,2.4cqi,28px);font-weight:700;line-height:1}.meteo-dettaglio{font-size:var(--cs-t-label);color:var(--cs-text-2);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.meteo-min{color:var(--cs-cool)}.meteo-max{color:var(--cs-on)}.scelta-tema{padding:var(--cs-sp-2);border:1px solid var(--cs-line-1);color:var(--cs-text-2);cursor:pointer;background:0 0;border-radius:999px;place-items:center;display:inline-grid}.scelta-tema:hover{color:var(--cs-text-1);border-color:var(--cs-line-2,var(--cs-line-1))}.scelta-tema:active{scale:.94}.tema-segno{fill:none;stroke:currentColor;stroke-width:1.7px;stroke-linecap:round;stroke-linejoin:round;block-size:1.35rem;inline-size:1.35rem}.tema-meta,.scelta-tema[data-tema=scuro] .tema-segno{fill:currentColor;stroke:none}@container (width<=640px){.meteo-dettaglio{display:none}}.stato-collegamento{align-items:center;gap:var(--cs-sp-2);font-size:var(--cs-t-label);color:var(--cs-text-2);display:inline-flex}.stato-collegamento:before{content:\"\";background:var(--cs-ok);border-radius:50%;block-size:7px;inline-size:7px}.stato-collegamento[data-stato=ko]{color:var(--cs-alert)}.stato-collegamento[data-stato=ko]:before{background:var(--cs-alert)}.pannello-energia{gap:var(--cs-sp-4);min-block-size:0;padding:var(--cs-sp-5);border-radius:var(--cs-r-xl);background:var(--cs-surface-1);box-shadow:var(--cs-el-1);flex-direction:column;grid-area:energia;min-inline-size:0;display:flex;position:relative;overflow:hidden}.pannello-energia:before{content:\"\";z-index:0;pointer-events:none;background:radial-gradient(42% 42% at 28% 22%, color-mix(in srgb, var(--cs-energy-solar) 22%, transparent), transparent 70%), radial-gradient(46% 46% at 76% 78%, color-mix(in srgb, var(--cs-accent) 18%, transparent), transparent 70%);opacity:.5;animation:deriva var(--cs-dur-scene,90s) var(--cs-ease-inout) infinite alternate;will-change:transform;position:absolute;inset:-20%}@keyframes deriva{0%{transform:translate(-3%,-2%)rotate(-2deg)}to{transform:translate(3%,2%)rotate(2deg)}}.casaos-root[data-regime=strumento] .pannello-energia:before{opacity:.32}.pannello-energia>*{z-index:1;position:relative}.pannello-titolo,.carta-titolo{font-size:var(--cs-t-eyebrow);font-weight:var(--cs-fw-bold);letter-spacing:var(--cs-ls-eyebrow);text-transform:uppercase;color:var(--cs-text-3);margin:0}.energia{align-items:stretch;gap:var(--cs-sp-4);flex:1;grid-template-columns:minmax(0,1fr) minmax(7rem,auto);min-block-size:0;display:grid}.scena-3d{flex:auto;place-items:center;min-block-size:130px;min-inline-size:0;display:grid;position:relative;container:scena/size}.scena-quadro{block-size:min(100cqi,100cqh);inline-size:min(100cqi,100cqh);position:relative}@supports not (inline-size:1cqi){.scena-quadro{block-size:100%;inline-size:100%}}.scena-energia{block-size:100%;inline-size:100%}.sfondo-3d{filter:invert()hue-rotate(180deg)brightness(1.15)saturate(.9);mix-blend-mode:screen;opacity:.92}.casaos-root[data-theme=light] .sfondo-3d{filter:brightness(1.12)contrast(1.03)saturate(.95);mix-blend-mode:darken;opacity:1}.lettura{pointer-events:none;border-radius:var(--cs-r-md);background:color-mix(in srgb, var(--cs-surface-1) 62%, transparent);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);flex-direction:column;gap:1px;max-inline-size:40%;padding:.3em .55em;display:flex;position:absolute}.lettura[data-pos=solare]{inset-block-start:6%;inset-inline-start:0}.lettura[data-pos=casa]{text-align:end;align-items:flex-end;inset-block-start:4%;inset-inline-end:0}.lettura[data-pos=batteria]{inset-block-end:8%;inset-inline-start:0}.lettura[data-pos=rete]{text-align:end;align-items:flex-end;inset-block-end:8%;inset-inline-end:0}.lettura-titolo{font-size:var(--cs-t-eyebrow);letter-spacing:var(--cs-ls-eyebrow);text-transform:uppercase;color:var(--cs-text-3)}.lettura-valore{font-family:var(--cs-font-numeric);font-size:var(--cs-t-value);font-weight:var(--cs-fw-bold);align-items:baseline;gap:5px;line-height:1.05;display:inline-flex}.lettura-unita{font-size:var(--cs-t-label);font-weight:var(--cs-fw-regular);color:var(--cs-text-3)}.lettura-nota{font-size:var(--cs-t-caption);color:var(--cs-text-3)}.lettura[data-tono=solare] .lettura-valore{color:var(--cs-energy-solar)}.lettura[data-tono=casa] .lettura-valore{color:var(--cs-energy-house)}.lettura[data-tono=batteria] .lettura-valore{color:var(--cs-energy-battery)}.lettura[data-tono=rete] .lettura-valore{color:var(--cs-energy-grid)}.flusso-freccia{fill:color-mix(in srgb, var(--flusso-colore) 75%, transparent);offset-distance:40%}.cometa{animation-name:scorri;animation-duration:calc(var(--dur,3s) * var(--fattore-movimento,1));animation-timing-function:linear;animation-iteration-count:infinite}.cometa-testa{fill:color-mix(in srgb, var(--flusso-colore) 35%, white)}.cometa-alone{opacity:.92}.cometa-scia{opacity:.9}@keyframes scorri{0%{offset-distance:0%;opacity:0}12%{opacity:1}88%{opacity:1}to{offset-distance:100%;opacity:0}}.energia-giornata{justify-content:center;gap:var(--cs-sp-4);border-inline-start:1px solid var(--cs-line-1);flex-direction:column;flex:none;min-inline-size:0;padding-inline-start:var(--cs-sp-4);display:flex}.misura{flex-direction:column;gap:2px;min-inline-size:0;display:flex}.misura-k{font-size:var(--cs-t-eyebrow);letter-spacing:var(--cs-ls-eyebrow);text-transform:uppercase;color:var(--cs-text-3)}.misura-barra{block-size:3px;border-radius:var(--cs-r-full);background:var(--cs-surface-3);margin-block-start:var(--cs-sp-2);display:block;overflow:hidden}.misura-barra>span{background:var(--cs-accent);block-size:100%;transition:inline-size var(--cs-dur-ambient) var(--cs-ease-out);display:block}.valore{font-family:var(--cs-font-numeric);color:var(--cs-text-1);align-items:baseline;gap:4px;display:inline-flex}.valore-cifre{font-size:var(--cs-t-value);font-weight:var(--cs-fw-bold);font-variant-numeric:tabular-nums;line-height:1.05}.valore-unita{font-size:var(--cs-t-label);color:var(--cs-text-3)}.misura-v .valore-cifre{font-size:calc(var(--cs-t-value) * .86)}.respira{animation:respiro var(--cs-dur-base) var(--cs-ease-out)}.respira[data-verso=giu]{animation-name:respiro-giu}@keyframes respiro{0%{opacity:.35;transform:translateY(6px)}to{opacity:1;transform:none}}@keyframes respiro-giu{0%{opacity:.35;transform:translateY(-6px)}to{opacity:1;transform:none}}.fascia-stanze{grid-area:stanze;min-inline-size:0}.colonna{justify-content:flex-start;gap:var(--cs-sp-5);flex-direction:column;grid-area:colonna;min-block-size:0;min-inline-size:0;display:flex}.carta{background:var(--cs-surface-1);border-radius:var(--cs-r-lg);box-shadow:var(--cs-el-1);padding:var(--cs-sp-5);gap:var(--cs-sp-4);flex-direction:column;flex:none;min-block-size:0;min-inline-size:0;display:flex}.carta[data-espandi=si]{flex:auto;min-block-size:0}.carta-corpo{gap:var(--cs-sp-4);overscroll-behavior:contain;flex-direction:column;min-block-size:0;min-inline-size:0;display:flex;overflow-y:auto}.casaos-root[data-avvio=si] .anima-entrata{animation:entra .36s var(--cs-ease-out) backwards;animation-delay:calc(.12s + var(--i,0) * var(--cs-stagger,40ms))}@keyframes entra{0%{opacity:0;transform:translateY(14px)scale(.985)}to{opacity:1;transform:none}}.elenco-stanze{gap:var(--cs-sp-5);flex-direction:column;display:flex}.gruppo-titolo{margin:0 0 var(--cs-sp-2);font-size:var(--cs-t-eyebrow);letter-spacing:var(--cs-ls-eyebrow);text-transform:uppercase;font-weight:var(--cs-fw-bold);color:var(--cs-text-3)}.gruppo-corpo{flex-direction:column;gap:1px;display:flex}.voce{justify-content:space-between;align-items:center;gap:var(--cs-sp-3);inline-size:100%;min-block-size:var(--cs-tap);padding:var(--cs-sp-3) var(--cs-sp-3);border-radius:var(--cs-r-sm);text-align:start;cursor:pointer;transition:background var(--cs-dur-fast) var(--cs-ease-out), opacity var(--cs-dur-fast) var(--cs-ease-out);background:0 0;border:0;display:flex;position:relative;overflow:hidden}.voce+.voce{box-shadow:0 -1px 0 var(--cs-line-1)}.voce:hover:not(:disabled){background:var(--cs-surface-2)}.voce:active:not(:disabled){transition-duration:var(--cs-dur-instant);scale:.985}.lampadina{flex-shrink:0;block-size:28px;inline-size:26px;overflow:visible}.lampadina-vetro{fill:none;stroke:var(--cs-text-3);stroke-width:1.6px;stroke-linejoin:round;transition:fill var(--cs-dur-base) var(--cs-ease-out), stroke var(--cs-dur-base) var(--cs-ease-out)}.lampadina-base{fill:none;stroke:var(--cs-text-3);stroke-width:1.6px;stroke-linecap:round;transition:stroke var(--cs-dur-base) var(--cs-ease-out)}.lampadina-alone{fill:var(--cs-on);opacity:0;transform-origin:12px 10px;transition:opacity var(--cs-dur-base) var(--cs-ease-out), scale var(--cs-dur-slow) var(--cs-ease-spring);scale:.4}.lampadina[data-accesa=si] .lampadina-vetro{fill:color-mix(in srgb, var(--cs-on) 82%, transparent);stroke:var(--cs-on)}.lampadina[data-accesa=si] .lampadina-base{stroke:color-mix(in srgb, var(--cs-on) 70%, var(--cs-text-3))}.lampadina[data-accesa=si] .lampadina-alone{opacity:.22;scale:1}.voce[data-stato=on]{background:color-mix(in srgb, var(--cs-on-quiet) calc(40% + 60% * var(--intensita,1)), transparent)}.voce[data-stato=on]:before{content:\"\";pointer-events:none;background:radial-gradient(140px 90px at 26px 50%, color-mix(in srgb, var(--cs-on) 26%, transparent), transparent 72%);animation:sboccia .62s var(--cs-ease-out);position:absolute;inset:0}@keyframes sboccia{0%{opacity:0;transform:scale(.55)}45%{opacity:1}to{opacity:1;transform:none}}.voce[data-stato=on]:after{content:\"\";border-radius:var(--cs-r-full);background:var(--cs-on);inline-size:3px;animation:barra-cresce var(--cs-dur-base) var(--cs-ease-out);position:absolute;inset-block:8px;inset-inline-start:0}@keyframes barra-cresce{0%{transform:scaleY(0)}to{transform:scaleY(1)}}.voce[data-stato=assente]{opacity:.45;cursor:not-allowed}.voce[data-previsto=si]{opacity:.68}.voce-testo{flex-direction:column;flex:1;gap:1px;min-inline-size:0;display:flex}.voce-nome{font-size:var(--cs-t-subtitle);color:var(--cs-text-1)}.voce-stato{font-size:var(--cs-t-label);color:var(--cs-text-3)}.interruttore{border-radius:var(--cs-r-full);background:color-mix(in srgb, var(--cs-text-3) 30%, transparent);block-size:26px;inline-size:44px;transition:background var(--cs-dur-fast) var(--cs-ease-out);flex-shrink:0;position:relative}.interruttore[data-acceso=si]{background:var(--cs-on)}.interruttore[data-off=si]{opacity:.4}.interruttore-pallino{background:var(--cs-surface-1);block-size:20px;inline-size:20px;transition:translate var(--cs-dur-fast) var(--cs-ease-spring);border-radius:50%;position:absolute;inset-block-start:3px;inset-inline-start:3px;box-shadow:0 1px 2px #0000004d}.interruttore[data-acceso=si] .interruttore-pallino{translate:18px}.interruttore[data-acceso=si]{animation:anello .52s var(--cs-ease-out)}@keyframes anello{0%{box-shadow:0 0 0 0 color-mix(in srgb, var(--cs-on) 45%, transparent)}to{box-shadow:0 0 0 12px #0000}}.ingressi{gap:var(--cs-sp-4);flex-direction:column;display:flex}.cancello{justify-content:space-between;align-items:center;gap:var(--cs-sp-3);padding:var(--cs-sp-3) 0;min-block-size:var(--cs-tap);display:flex}.cancello+.cancello{box-shadow:0 -1px 0 var(--cs-line-1)}.conferma{gap:var(--cs-sp-2);display:flex}.btn{min-block-size:var(--cs-tap);padding:0 var(--cs-sp-4);border:1px solid var(--cs-line-2);border-radius:var(--cs-r-full);color:var(--cs-text-1);font-size:var(--cs-t-label);font-weight:var(--cs-fw-bold);cursor:pointer;white-space:nowrap;transition:background var(--cs-dur-fast) var(--cs-ease-out), scale var(--cs-dur-instant) var(--cs-ease-out);background:0 0}.btn:hover:not(:disabled){background:var(--cs-surface-2)}.btn:active:not(:disabled){scale:.94}.btn:disabled{opacity:.4;cursor:not-allowed}.btn-conferma{background:var(--cs-accent);color:var(--cs-text-on-accent);border-color:#0000}.btn-conferma:hover:not(:disabled){background:var(--cs-accent-hover)}.porte{gap:var(--cs-sp-2);flex-wrap:wrap;display:flex}.porta{align-items:center;gap:var(--cs-sp-2);padding:var(--cs-sp-2) var(--cs-sp-3);border-radius:var(--cs-r-full);background:var(--cs-surface-2);font-size:var(--cs-t-label);display:inline-flex}.porta[data-stato=aperta]{background:var(--cs-alert-quiet);color:var(--cs-alert)}.porta-segno{background:var(--cs-ok);border-radius:50%;block-size:6px;inline-size:6px}.porta[data-stato=aperta] .porta-segno{background:var(--cs-alert)}.porta[data-stato=assente] .porta-segno{background:var(--cs-unavail)}.pie-pagina{grid-area:piede}.diagnostica{font-size:var(--cs-t-caption);color:var(--cs-text-3)}.diagnostica summary{cursor:pointer;min-block-size:var(--cs-tap);align-items:center;display:flex}.diagnostica-corpo{gap:var(--cs-sp-1) var(--cs-sp-5);font-family:var(--cs-font-numeric);flex-wrap:wrap;padding-block-end:var(--cs-sp-2);display:flex}.testo{color:var(--cs-text-2);margin:0}.testo-secondario{color:var(--cs-text-3);font-size:var(--cs-t-label);margin:0}@container casaos (width<=900px){.casaos-root{gap:var(--cs-sp-4);grid-template:\"testa\"\"stanze\"\"energia\"\"colonna\"\"piede\"/minmax(0,1fr);block-size:auto;max-block-size:none;overflow-y:auto}.colonna{grid-template-rows:auto auto}.carta,.carta-corpo{min-block-size:auto;overflow:visible}.scena-energia{min-block-size:240px}}@container casaos (width<=560px){.casaos-root{padding:var(--cs-sp-3);gap:var(--cs-sp-3)}.pannello-energia,.carta{padding:var(--cs-sp-4)}}@container casaos (width<=900px){.energia{grid-template-rows:minmax(0,1fr) auto;grid-template-columns:minmax(0,1fr)}.energia-giornata{border-inline-start:0;border-block-start:1px solid var(--cs-line-1);flex-flow:wrap;justify-content:space-between;align-items:flex-start;padding-block-start:var(--cs-sp-4);padding-inline-start:0}.misura{flex:6rem}}@supports not (container-type:inline-size){@media (max-width:1000px){.casaos-root{grid-template-columns:minmax(0,1fr);grid-template-areas:\"testa\"\"stanze\"\"energia\"\"colonna\"\"piede\"}}}@media (prefers-reduced-motion:reduce){.pannello-energia:before,.voce[data-stato=on]:before,.interruttore[data-acceso=si]{animation:none}.casaos-root .cometa{--fattore-movimento:1.8;animation-duration:calc(var(--dur,3s) * var(--fattore-movimento))!important;animation-iteration-count:infinite!important}.casaos-root[data-avvio=si] .anima-entrata{animation:none}}.velo-avviso{z-index:var(--cs-z-critical,1000);padding:var(--cs-sp-6);background:var(--cs-scrim,#06090eb8);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);animation:velo-entra var(--cs-dur-base) var(--cs-ease-out);cursor:pointer;place-items:center;display:grid;position:fixed;inset:0}@keyframes velo-entra{0%{opacity:0}to{opacity:1}}.avviso{inline-size:min(440px,100%);padding:var(--cs-sp-8) var(--cs-sp-6) var(--cs-sp-6);border-radius:var(--cs-r-xl);background:var(--cs-surface-1);box-shadow:var(--cs-el-3);text-align:center;animation:avviso-entra var(--cs-dur-slow) var(--cs-ease-spring)}@keyframes avviso-entra{0%{opacity:0;transform:translateY(16px)scale(.94)}to{opacity:1;transform:none}}.scena-cancello{block-size:auto;inline-size:100%;margin-block-end:var(--cs-sp-5)}.cancello-guida{stroke:var(--cs-line-2);stroke-width:2px;stroke-linecap:round}.cancello-pilastri rect{fill:var(--cs-surface-3);stroke:var(--cs-line-2);stroke-width:1.5px}.cancello-passaggio{fill:var(--cs-bg-sunken);opacity:.7}.cancello-anta{animation:anta-apre 3.2s var(--cs-ease-inout) forwards}.cancello-anta[data-chiusura=si]{animation-name:anta-chiude}.anta-telaio{fill:color-mix(in srgb, var(--cs-surface-2) 90%, transparent);stroke:var(--cs-accent);stroke-width:2px}.anta-stecca,.anta-traversa{stroke:color-mix(in srgb, var(--cs-accent) 55%, transparent);stroke-width:1.6px;stroke-linecap:round}@keyframes anta-apre{0%{transform:translate(0)}to{transform:translate(-152px)}}@keyframes anta-chiude{0%{transform:translate(-152px)}to{transform:translate(0)}}.avviso-titolo{font-size:var(--cs-t-title);font-weight:var(--cs-fw-bold);color:var(--cs-text-1);margin:0}.avviso-nome{margin:var(--cs-sp-1) 0 0;font-size:var(--cs-t-body);color:var(--cs-text-2)}.avviso-tempo{block-size:3px;inline-size:100%;border-radius:var(--cs-r-full);background:var(--cs-surface-3);margin-block-start:var(--cs-sp-5);display:block;overflow:hidden}.avviso-tempo>span{background:var(--cs-accent);transform-origin:0;block-size:100%;animation:tempo-cala var(--durata-avviso,6s) linear forwards;display:block}@keyframes tempo-cala{0%{transform:scaleX(1)}to{transform:scaleX(0)}}@media (prefers-reduced-motion:reduce){.velo-avviso .cancello-anta{animation-duration:3.6s!important;animation-iteration-count:1!important}.velo-avviso .avviso-tempo>span{animation-duration:var(--durata-avviso,6s)!important;animation-iteration-count:1!important}}.barra-destra{align-items:center;gap:var(--cs-sp-4);flex-wrap:wrap;display:flex}.viste{border-radius:var(--cs-r-full);background:var(--cs-surface-2);gap:2px;padding:3px;display:flex}.vista{border-radius:var(--cs-r-full);padding:0 var(--cs-sp-4);min-block-size:calc(var(--cs-tap) * .72);color:var(--cs-text-2);font:inherit;font-size:var(--cs-t-label);font-weight:var(--cs-fw-bold);cursor:pointer;white-space:nowrap;transition:background var(--cs-dur-fast) var(--cs-ease-out), color var(--cs-dur-fast) var(--cs-ease-out);background:0 0;border:0}.vista:hover{color:var(--cs-text-1)}.vista[data-scelta=si]{background:var(--cs-surface-1);color:var(--cs-text-1);box-shadow:var(--cs-el-1)}.casaos-root[data-vista=telecamere],.casaos-root[data-vista=energia]{grid-template-columns:minmax(0,1fr);grid-template-areas:\"testa\"\"energia\"\"piede\"}.pannello-telecamere{gap:var(--cs-sp-4);min-block-size:0;min-inline-size:0;padding:var(--cs-sp-5);border-radius:var(--cs-r-xl);background:var(--cs-surface-1);box-shadow:var(--cs-el-1);flex-direction:column;grid-area:energia;display:flex;overflow:hidden}.griglia-camere{grid-template-columns:repeat(var(--colonne,3), minmax(0, 1fr));gap:var(--cs-sp-3);flex:1;grid-auto-rows:minmax(0,1fr);min-block-size:0;display:grid}.riquadro-camera{border-radius:var(--cs-r-md);background:var(--cs-bg-sunken);cursor:pointer;min-block-size:0;min-inline-size:0;transition:box-shadow var(--cs-dur-fast) var(--cs-ease-out);border:0;place-items:center;padding:0;display:grid;position:relative;overflow:hidden}.riquadro-camera:hover{box-shadow:var(--cs-el-2)}.riquadro-camera:active{scale:.99}.camera-fotogramma{object-fit:cover;block-size:100%;inline-size:100%;display:block}.camera-assente{font-size:var(--cs-t-label);color:var(--cs-text-3);text-align:center;padding:var(--cs-sp-3)}.camera-riposo{justify-content:center;align-items:center;gap:var(--cs-sp-3);padding:var(--cs-sp-3);background:radial-gradient(ellipse at center, color-mix(in srgb, var(--cs-text-3) 7%, transparent), transparent 70%);flex-direction:column;display:flex}.camera-glifo{fill:none;block-size:auto;inline-size:clamp(2rem,22%,3.25rem);stroke:var(--cs-text-3);stroke-width:2.25px;stroke-linejoin:round;opacity:.75}.camera-glifo-occhio{stroke-width:2px;opacity:.85}.camera-invito{font-size:var(--cs-t-label);color:var(--cs-text-3);text-align:center;letter-spacing:.01em}@container (width<=700px){.camera-invito{display:none}}.riquadro-camera:hover .camera-glifo,.riquadro-camera:focus-visible .camera-glifo{opacity:1;stroke:var(--cs-accent)}.camera-nome{font-size:var(--cs-t-label);font-weight:var(--cs-fw-bold);color:#fff;text-shadow:0 1px 3px #000000bf;pointer-events:none;position:absolute;inset-block-end:var(--cs-sp-2);inset-inline-start:var(--cs-sp-3)}.riquadro-camera[data-vuoto=si] .camera-nome{color:var(--cs-text-2);text-shadow:none}.velo-camera{z-index:var(--cs-z-modal,400);padding:var(--cs-sp-5);background:var(--cs-scrim,#06090ed1);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);animation:velo-entra var(--cs-dur-base) var(--cs-ease-out);place-items:center;display:grid;position:fixed;inset:0}.diretta{gap:var(--cs-sp-3);cursor:default;flex-direction:column;max-block-size:100%;inline-size:min(1100px,100%);display:flex}.diretta-immagine{aspect-ratio:16/9;border-radius:var(--cs-r-lg);min-block-size:0;box-shadow:var(--cs-el-3);background:#000;place-items:center;display:grid;position:relative;overflow:hidden}.diretta-video,.diretta-fotogramma{object-fit:contain;background:#000;block-size:100%;inline-size:100%;position:absolute;inset:0}.diretta-video[data-visibile=no]{opacity:0}.diretta-piede{align-items:center;gap:var(--cs-sp-3);display:flex}.diretta-nome{font-size:var(--cs-t-title);font-weight:var(--cs-fw-bold);color:var(--cs-text-1);flex:1;min-inline-size:0}.pastiglia[data-stato=neutro]{background:var(--cs-surface-2);color:var(--cs-text-2)}@container casaos (width<=900px){.casaos-root[data-vista=telecamere],.casaos-root[data-vista=energia]{grid-template-rows:auto}.griglia-camere{grid-auto-rows:minmax(160px,auto)}.riquadro-camera{aspect-ratio:16/9}}.zone{gap:var(--cs-sp-5);grid-template-columns:1.1fr 1fr;min-block-size:0;display:grid}.zona{gap:var(--cs-sp-3);flex-direction:column;min-inline-size:0;display:flex}.zona-titolo{font-size:var(--cs-t-label);font-weight:var(--cs-fw-bold);letter-spacing:.08em;text-transform:uppercase;color:var(--cs-text-3);margin:0}.griglia-stanze{grid-template-columns:repeat(var(--colonne,6), minmax(0, 1fr));gap:var(--cs-sp-2);display:grid}.tessera-stanza{justify-content:center;align-items:center;gap:var(--cs-sp-2);padding:var(--cs-sp-3) 3px;border:1px solid var(--cs-line-1);border-radius:var(--cs-r-md);background:var(--cs-surface-2);min-block-size:0;color:var(--cs-text-2);cursor:pointer;transition:border-color var(--cs-motion,.2s) ease, background-color var(--cs-motion,.2s) ease, color var(--cs-motion,.2s) ease;flex-direction:column;display:flex;position:relative;overflow:hidden}.tessera-stanza:before{content:\"\";pointer-events:none;opacity:var(--intensita,0);background:radial-gradient(125% 95% at 50% -12%, color-mix(in srgb, var(--cs-on) 62%, transparent), color-mix(in srgb, var(--cs-on) 16%, transparent) 55%, transparent 78%);transition:opacity var(--cs-motion,.26s) ease;position:absolute;inset:0}.tessera-stanza[data-accesa=si]{border-color:color-mix(in srgb, var(--cs-on) 70%, transparent);color:var(--cs-text-1);box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--cs-on) 22%, transparent), 0 0 18px -6px color-mix(in srgb, var(--cs-on) 55%, transparent)}.tessera-stanza:hover{border-color:var(--cs-line-2,var(--cs-accent))}.tessera-stanza:active{scale:.97}.segno-stanza{fill:none;stroke:currentColor;stroke-width:1.6px;stroke-linecap:round;stroke-linejoin:round;opacity:.82;block-size:auto;inline-size:clamp(1.7rem,3.4cqi,2.4rem);transition:stroke var(--cs-motion,.26s) ease, opacity var(--cs-motion,.26s) ease;flex:none;position:relative}.segno-nucleo{transition:fill var(--cs-motion,.26s) ease, stroke var(--cs-motion,.26s) ease}.tessera-stanza[data-accesa=si] .segno-stanza,.dettaglio-segno[data-accesa=si] .segno-stanza{stroke:var(--cs-on);opacity:1}.tessera-stanza[data-accesa=si] .segno-nucleo,.dettaglio-segno[data-accesa=si] .segno-nucleo{fill:color-mix(in srgb, var(--cs-on) 26%, transparent);stroke:var(--cs-on)}.tessera-nome{font-size:var(--cs-t-label);font-weight:var(--cs-fw-bold);text-align:center;line-height:1.15;font-size:calc(var(--cs-t-label) * .82);-webkit-hyphens:auto;hyphens:auto;overflow-wrap:break-word;position:relative}.tessera-conto{background:var(--cs-on);min-inline-size:1.35em;color:var(--cs-text-on-accent,#05121f);font-size:calc(var(--cs-t-label) * .85);font-weight:var(--cs-fw-bold);font-variant-numeric:tabular-nums;text-align:center;border-radius:999px;padding:.1em .35em;position:absolute;inset-block-start:var(--cs-sp-2);inset-inline-end:var(--cs-sp-2)}.velo-stanza{z-index:var(--cs-z-modal,400);padding:var(--cs-sp-5);background:var(--cs-scrim,#0009);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);place-items:center;display:grid;position:fixed;inset:0}.dettaglio-stanza{gap:var(--cs-sp-4);max-block-size:100%;inline-size:min(100%,62rem);padding:var(--cs-sp-5);border-radius:var(--cs-r-lg);background:var(--cs-surface-1);box-shadow:var(--cs-el-3,var(--cs-el-2));flex-direction:column;min-block-size:0;display:flex}.dettaglio-testa{justify-content:space-between;align-items:center;gap:var(--cs-sp-4);flex-wrap:wrap;display:flex}.dettaglio-identita{align-items:center;gap:var(--cs-sp-4);min-inline-size:0;display:flex}.dettaglio-segno{border-radius:var(--cs-r-md);background:var(--cs-surface-2);block-size:3.4rem;inline-size:3.4rem;color:var(--cs-text-2);flex:none;place-items:center;display:grid}.dettaglio-segno .segno-stanza{inline-size:2.1rem}.dettaglio-nome{font-family:var(--cs-font-display);font-size:var(--cs-t-title);color:var(--cs-text-1);margin:0;font-weight:700}.dettaglio-zona{font-size:var(--cs-t-label);color:var(--cs-text-2)}.dettaglio-azioni{align-items:center;gap:var(--cs-sp-3);display:flex}.dettaglio-corpo{gap:var(--cs-sp-4);grid-template-columns:repeat(4,minmax(0,1fr));min-block-size:0;display:grid}.famiglia{gap:var(--cs-sp-3);flex-direction:column;min-block-size:0;min-inline-size:0;display:flex}.famiglia-titolo{align-items:center;gap:var(--cs-sp-2);border-block-end:1px solid var(--cs-line-1);font-size:var(--cs-t-label);font-weight:var(--cs-fw-bold);letter-spacing:.06em;text-transform:uppercase;color:var(--cs-text-3);margin:0;padding-block-end:var(--cs-sp-2);display:flex}.famiglia-conto{background:var(--cs-surface-3,var(--cs-surface-2));color:var(--cs-text-2);font-variant-numeric:tabular-nums;border-radius:999px;padding:0 .4em}.famiglia-corpo{gap:var(--cs-sp-2);overscroll-behavior:contain;flex-direction:column;min-block-size:0;display:flex;overflow-y:auto}.famiglia-vuota{padding:var(--cs-sp-3) 0;font-size:var(--cs-t-label);color:var(--cs-text-3);margin:0;font-style:italic}@container (width<=900px){.zone{grid-template-columns:1fr}.griglia-stanze{grid-template-columns:repeat(auto-fit,minmax(4.6rem,1fr))}}@container (width<=780px){.dettaglio-corpo{grid-template-columns:1fr;overflow-y:auto}.velo-stanza{padding:var(--cs-sp-3)}.famiglia-corpo{overflow:visible}}\n.tasto-rifiuti{align-items:center;gap:var(--cs-sp-4);inline-size:100%;padding:var(--cs-sp-3) var(--cs-sp-4);border:1px solid color-mix(in srgb, var(--tinta) 45%, transparent);border-radius:var(--cs-r-md);background:linear-gradient(100deg, color-mix(in srgb, var(--tinta) 20%, transparent), color-mix(in srgb, var(--tinta) 5%, transparent) 60%, transparent), var(--cs-surface-2);color:var(--cs-text-1);text-align:start;cursor:pointer;display:flex}.tasto-rifiuti:hover{border-color:color-mix(in srgb, var(--tinta) 75%, transparent)}.tasto-rifiuti:active{scale:.99}.rifiuti-segno{block-size:auto;inline-size:clamp(2.4rem,5cqi,3.2rem);stroke:color-mix(in srgb, #000 35%, var(--tinta,#888));stroke-width:1.4px;stroke-linejoin:round;flex:none}.rifiuti-corpo{filter:brightness(1.06)}.rifiuti-coperchio{filter:brightness(.9)}.rifiuti-maniglia,.rifiuti-nervature{fill:none;stroke:#0000004d;stroke-width:1.6px;stroke-linecap:round}.rifiuti-testo{flex-direction:column;gap:.1em;min-inline-size:0;display:flex}.rifiuti-quando{font-size:var(--cs-t-label);letter-spacing:.06em;text-transform:uppercase;color:var(--cs-text-3)}.rifiuti-tipo{font-family:var(--cs-font-display);font-size:var(--cs-t-subtitle);color:var(--cs-text-1);font-weight:700;line-height:1.1}.tasto-rifiuti[data-grande=si]{gap:var(--cs-sp-5);padding:var(--cs-sp-4) var(--cs-sp-5);border-radius:var(--cs-r-lg)}.tasto-rifiuti[data-grande=si] .rifiuti-segno{inline-size:clamp(3.4rem,7vw,5rem)}.tasto-rifiuti[data-grande=si] .rifiuti-tipo{font-size:clamp(1.4rem,3vw,2.2rem)}.velo-rifiuti{z-index:var(--cs-z-modal,400);padding:var(--cs-sp-5);background:var(--cs-scrim,#0009);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);place-items:center;display:grid;position:fixed;inset:0}.settimana-rifiuti{gap:var(--cs-sp-4);max-block-size:100%;inline-size:min(100%,62rem);padding:var(--cs-sp-5);border-radius:var(--cs-r-lg);background:var(--cs-surface-1);box-shadow:var(--cs-el-3,var(--cs-el-2));flex-direction:column;display:flex}.settimana-testa{justify-content:space-between;align-items:flex-start;gap:var(--cs-sp-4);display:flex}.settimana-titolo{font-family:var(--cs-font-display);font-size:var(--cs-t-title);color:var(--cs-text-1);margin:0;font-weight:700}.settimana-sottotitolo{font-size:var(--cs-t-label);color:var(--cs-text-2)}.settimana-corpo{gap:var(--cs-sp-3);overscroll-behavior:contain;grid-template-columns:repeat(4,minmax(0,1fr));min-block-size:0;display:grid;overflow-y:auto}.giorno-rifiuti{padding:var(--cs-sp-3);border-radius:var(--cs-r-md);border:1px solid color-mix(in srgb, var(--tinta,var(--cs-line-1)) 35%, transparent);background:color-mix(in srgb, var(--tinta,transparent) 8%, var(--cs-surface-2));text-align:center;flex-direction:column;align-items:center;gap:4px;display:flex}.giorno-rifiuti[data-vuoto=si]{border-style:dashed;border-color:var(--cs-line-1);background:0 0}.giorno-nome{font-size:var(--cs-t-label);font-weight:var(--cs-fw-bold);color:var(--cs-text-1)}.giorno-data{font-size:calc(var(--cs-t-label) * .85);color:var(--cs-text-3);font-variant-numeric:tabular-nums}.giorno-rifiuti .rifiuti-segno{inline-size:2.6rem;margin-block:var(--cs-sp-2)}.giorno-tipo{font-size:calc(var(--cs-t-label) * .95);color:var(--cs-text-2);line-height:1.2}.giorno-niente{color:var(--cs-text-3);margin-block:var(--cs-sp-4);font-style:italic}.settimana-nota{font-size:var(--cs-t-label);color:var(--cs-text-3);margin:0}@container (width<=780px){.settimana-corpo{grid-template-columns:repeat(2,minmax(0,1fr))}}.riposo{z-index:var(--cs-z-rest,900);background:var(--cs-bg-base);color:var(--cs-text-1);grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);align-items:center;gap:clamp(1rem,3vw,2.5rem);padding:clamp(1.25rem,4vw,3.5rem);animation:.9s both riposo-entra;display:grid;position:fixed;inset:0;overflow:hidden}@keyframes riposo-entra{0%{opacity:0}to{opacity:1}}.riposo-alone{pointer-events:none;background:radial-gradient(38% 38% at 22% 28%, color-mix(in srgb, var(--cs-energy-solar) 20%, transparent), transparent 70%), radial-gradient(42% 42% at 78% 72%, color-mix(in srgb, var(--cs-accent) 18%, transparent), transparent 72%);animation:40s ease-in-out infinite alternate riposo-deriva;position:absolute;inset:-25%}@keyframes riposo-deriva{0%{transform:translate(-2%,-1.5%)scale(1)}to{transform:translate(2.5%,2%)scale(1.08)}}.riposo-sinistra,.riposo-energia{min-inline-size:0;position:relative}.riposo-sinistra{flex-direction:column;gap:clamp(.75rem,2vw,1.75rem);display:flex}.riposo-ora{gap:var(--cs-sp-2);flex-direction:column;display:flex}.riposo-cifre{font-family:var(--cs-font-display);letter-spacing:-.045em;font-variant-numeric:tabular-nums;color:var(--cs-text-1);font-size:clamp(5rem,16vw,14rem);font-weight:800;line-height:.82}.riposo-duepunti{animation:2s step-end infinite riposo-battito}@keyframes riposo-battito{0%,50%{opacity:1}50.01%,to{opacity:.28}}.riposo-data{color:var(--cs-text-2);text-transform:lowercase;font-size:clamp(1rem,2.2vw,1.7rem)}.riposo-meteo .meteo-segno{inline-size:clamp(2.2rem,4vw,3.4rem)}.riposo-meteo .meteo-ora{font-size:clamp(1.4rem,3vw,2.4rem)}.riposo-meteo .meteo-dettaglio{font-size:clamp(.8rem,1.4vw,1.05rem);display:block}.riposo-rifiuti{max-inline-size:34rem}.riposo-energia{block-size:100%;min-block-size:0;display:flex}.riposo-energia .energia{flex:1;min-block-size:0}.riposo-energia .energia-giornata{border-block-start-color:color-mix(in srgb, var(--cs-text-3) 25%, transparent)}@media (max-width:860px),(orientation:portrait){.riposo{grid-template-rows:auto minmax(0,1fr);grid-template-columns:minmax(0,1fr);align-content:start;align-items:start;gap:clamp(1rem,4vw,2rem)}.riposo-cifre{font-size:clamp(4.5rem,25vw,11rem)}}@media (prefers-reduced-motion:reduce){.riposo-alone,.riposo-duepunti{animation:none!important}}.pastiglie{z-index:var(--cs-z-raised,10);align-items:center;gap:var(--cs-sp-3);display:flex;position:absolute;inset-block-end:var(--cs-sp-4);inset-inline-end:var(--cs-sp-4)}.pastiglia-rifiuti{border:1px solid color-mix(in srgb, #000 25%, var(--tinta));background:var(--tinta);block-size:3.4rem;inline-size:3.4rem;box-shadow:var(--cs-el-2), 0 0 0 4px color-mix(in srgb, var(--tinta) 18%, transparent);cursor:pointer;transition:scale var(--cs-motion,.16s) ease, box-shadow var(--cs-motion,.16s) ease;border-radius:50%;place-items:center;padding:0;display:grid}.pastiglia-rifiuti:hover{box-shadow:var(--cs-el-3,var(--cs-el-2)), 0 0 0 7px color-mix(in srgb, var(--tinta) 22%, transparent)}.pastiglia-rifiuti:active{scale:.94}.rifiuti-simbolo{fill:none;block-size:auto;inline-size:58%;stroke:color-mix(in srgb, #000 72%, var(--tinta));stroke-width:2px;stroke-linecap:round;stroke-linejoin:round}.elenco-persone{gap:var(--cs-sp-3);flex-direction:column;display:flex}.persona{align-items:center;gap:var(--cs-sp-3);min-inline-size:0;display:flex}.persona-volto{background:var(--cs-surface-3,color-mix(in srgb, var(--cs-text-3) 16%, transparent));filter:grayscale(.85);opacity:.65;block-size:clamp(2.6rem,6cqi,3.4rem);inline-size:clamp(2.6rem,6cqi,3.4rem);transition:filter var(--cs-motion,.26s) ease, opacity var(--cs-motion,.26s) ease;border-radius:50%;flex:none;place-items:center;display:grid;position:relative;overflow:visible}.persona[data-casa=si] .persona-volto{filter:none;opacity:1}.persona-foto{object-fit:cover;object-position:50% 22%;border-radius:50%;block-size:100%;inline-size:100%;display:block}.persona-iniziali{font-family:var(--cs-font-display);color:var(--cs-text-2);font-size:.95rem;font-weight:700}.persona-spia{border:2px solid var(--cs-surface-1);background:var(--cs-unavail);border-radius:50%;block-size:.78rem;inline-size:.78rem;position:absolute;inset-block-end:0;inset-inline-end:0}.persona[data-casa=si] .persona-spia{background:var(--cs-ok)}.persona-testo{flex-direction:column;flex:1;gap:1px;min-inline-size:0;display:flex}.persona-nome{font-size:var(--cs-t-body);font-weight:var(--cs-fw-bold);color:var(--cs-text-1);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.persona-dove{font-size:var(--cs-t-label);color:var(--cs-text-2)}.persona-batteria{align-items:center;gap:var(--cs-sp-2);flex:none;display:flex}.persona-pila{fill:none;block-size:auto;inline-size:1.6rem;stroke:var(--cs-text-3);stroke-width:1.4px}.persona-pila-carica{fill:var(--cs-text-2);stroke:none}.persona-percento{font-size:var(--cs-t-label);color:var(--cs-text-2);font-variant-numeric:tabular-nums;text-align:end;min-inline-size:2.4em}.persona-batteria[data-scarica=si] .persona-pila-carica{fill:var(--cs-alert)}.persona-batteria[data-scarica=si] .persona-percento{color:var(--cs-alert)}.persona-batteria[data-carica=si] .persona-pila-carica{fill:var(--cs-ok)}.persona-batteria[data-carica=si] .persona-percento{color:var(--cs-ok)}.persona-tasto{padding:var(--cs-sp-2) var(--cs-sp-2);border-radius:var(--cs-r-md);color:inherit;text-align:start;cursor:pointer;background:0 0;border:1px solid #0000;align-items:flex-start;margin-inline-start:calc(var(--cs-sp-2) * -1)}.persona-tasto:hover{border-color:var(--cs-line-1);background:var(--cs-surface-2)}.persona-tasto:active{scale:.99}.velo-persona{z-index:var(--cs-z-modal,400);padding:var(--cs-sp-5);background:var(--cs-scrim,#000000a6);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);place-items:center;display:grid;position:fixed;inset:0}.scheda-persona{gap:var(--cs-sp-4);inline-size:min(100%,40rem);padding:var(--cs-sp-5);border-radius:var(--cs-r-lg);background:var(--cs-surface-1);box-shadow:var(--cs-el-3,var(--cs-el-2));flex-direction:column;display:flex}.scheda-persona-testa{justify-content:space-between;align-items:center;gap:var(--cs-sp-4);display:flex}.scheda-persona-nome{font-family:var(--cs-font-display);font-size:var(--cs-t-title);color:var(--cs-text-1);margin:0;font-weight:700}.mappa{gap:var(--cs-sp-3);flex-direction:column;display:flex}.mappa-tela{border-radius:var(--cs-r-md);border:1px solid var(--cs-line-1);background:var(--cs-surface-2);block-size:clamp(13rem,42vh,22rem);inline-size:100%;position:relative;overflow:hidden}.mappa-tassello{filter:none;block-size:256px;inline-size:256px;display:block;position:absolute}.casaos-root[data-theme=dark] .mappa-tassello,:host([data-theme=dark]) .mappa-tassello{filter:invert()hue-rotate(180deg)brightness(.88)contrast(.92)saturate(.7)}.mappa-punto{pointer-events:none;place-items:center;display:grid;position:absolute;inset-block-start:50%;inset-inline-start:50%;translate:-50% -50%}.mappa-punto-nucleo{background:var(--cs-accent);border:2px solid #fff;border-radius:50%;block-size:.95rem;inline-size:.95rem;box-shadow:0 1px 4px #00000073}.mappa-punto-alone{background:color-mix(in srgb, var(--cs-accent) 28%, transparent);border-radius:50%;block-size:2.6rem;inline-size:2.6rem;animation:2.6s ease-in-out infinite mappa-respiro;position:absolute}@keyframes mappa-respiro{0%,to{opacity:.9;scale:.75}50%{opacity:.35;scale:1.15}}.mappa-casa{background:var(--cs-surface-1);border:1px solid var(--cs-line-1);pointer-events:none;border-radius:50%;place-items:center;block-size:1.5rem;inline-size:1.5rem;display:grid;position:absolute;translate:-50% -50%}.mappa-casa svg{inline-size:.9rem;fill:var(--cs-text-2)}.mappa-piede{align-items:baseline;gap:var(--cs-sp-3);font-size:var(--cs-t-label);flex-wrap:wrap;display:flex}.mappa-dove{font-weight:var(--cs-fw-bold);color:var(--cs-text-1)}.mappa-distanza{color:var(--cs-text-2)}.mappa-fonte{color:var(--cs-text-3);font-size:calc(var(--cs-t-label) * .85);margin-inline-start:auto}@media (prefers-reduced-motion:reduce){.mappa-punto-alone{animation:none}}.riposo-persone{max-inline-size:34rem}.riposo-persone .persona-volto{block-size:clamp(3rem,5.5vw,4.2rem);inline-size:clamp(3rem,5.5vw,4.2rem)}.riposo-persone .persona-nome{font-size:clamp(1rem,1.9vw,1.4rem)}.riposo-persone .persona-dove,.riposo-persone .persona-percento{font-size:clamp(.8rem,1.3vw,1.05rem)}.riposo-persone .persona-pila{inline-size:2rem}.pastiglia-scorciatoia{border:1px solid var(--cs-line-1);background:var(--cs-surface-2);block-size:3.4rem;inline-size:3.4rem;color:var(--cs-text-2);box-shadow:var(--cs-el-1);cursor:pointer;transition:background-color var(--cs-motion,.2s) ease, border-color var(--cs-motion,.2s) ease, color var(--cs-motion,.2s) ease, box-shadow var(--cs-motion,.2s) ease, scale var(--cs-motion,.16s) ease;border-radius:50%;place-items:center;padding:0;display:grid}.pastiglia-scorciatoia[data-acceso=si]{border-color:color-mix(in srgb, var(--cs-ok) 70%, transparent);background:color-mix(in srgb, var(--cs-ok) 22%, var(--cs-surface-2));color:var(--cs-ok);box-shadow:var(--cs-el-2), 0 0 0 4px color-mix(in srgb, var(--cs-ok) 16%, transparent)}.pastiglia-scorciatoia[data-assente=si]{opacity:.45;border-style:dashed}.pastiglia-scorciatoia[data-previsto=si]{opacity:.75}.pastiglia-scorciatoia:hover{box-shadow:var(--cs-el-2)}.pastiglia-scorciatoia:active{scale:.94}.scorciatoia-segno{fill:none;stroke:currentColor;stroke-width:1.9px;stroke-linecap:round;stroke-linejoin:round;block-size:auto;inline-size:58%}.velo-scorciatoia{z-index:var(--cs-z-modal,400);padding:var(--cs-sp-5);background:var(--cs-scrim,#0009);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);place-items:center;display:grid;position:fixed;inset:0}.scheda-scorciatoia{gap:var(--cs-sp-4);inline-size:min(100%,24rem);padding:var(--cs-sp-5);border-radius:var(--cs-r-lg);background:var(--cs-surface-1);box-shadow:var(--cs-el-3,var(--cs-el-2));flex-direction:column;display:flex}.scheda-scorciatoia-testa{flex-direction:column;gap:2px;display:flex}.scheda-scorciatoia-nome{font-family:var(--cs-font-display);font-size:var(--cs-t-title);color:var(--cs-text-1);margin:0;font-weight:700}.scheda-scorciatoia-stato{font-size:var(--cs-t-label);color:var(--cs-text-2)}.scheda-scorciatoia-stato[data-acceso=si]{color:var(--cs-ok);font-weight:var(--cs-fw-bold)}.scheda-scorciatoia-azioni{gap:var(--cs-sp-3);display:flex}.scheda-scorciatoia-azioni .btn{flex:1}.energia-sezione{gap:var(--cs-sp-4);flex-direction:column;flex:1;min-block-size:0;display:flex}.energia-testa{justify-content:space-between;align-items:center;gap:var(--cs-sp-4);flex-wrap:wrap;display:flex}.legenda{gap:var(--cs-sp-4);font-size:var(--cs-t-label);color:var(--cs-text-2);display:flex}.legenda-voce{align-items:center;gap:var(--cs-sp-2);display:inline-flex}.legenda-voce:before{content:\"\";background:var(--tinta,var(--cs-text-2));border-radius:999px;block-size:3px;inline-size:1.1rem}.energia-grafico{flex:1;min-block-size:9rem;display:flex}.grafico{flex:1;min-block-size:0;inline-size:100%}.grafico-tela{display:block;overflow:visible}.grafico-griglia{stroke:var(--cs-line-1);stroke-width:1px}.grafico-scala-testo,.grafico-asse{fill:var(--cs-text-3);font-size:calc(var(--cs-t-label) * .82);font-variant-numeric:tabular-nums}.grafico-linea{fill:none;stroke-width:2.25px;stroke-linecap:round;stroke-linejoin:round}.grafico-punto{stroke:var(--cs-surface-1);stroke-width:2px}.energia-numeri{gap:var(--cs-sp-3);grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));display:grid}.tessera-energia{padding:var(--cs-sp-3) var(--cs-sp-4);border-radius:var(--cs-r-md);background:var(--cs-surface-2);border:1px solid var(--cs-line-1);flex-direction:column;gap:2px;min-inline-size:0;display:flex}.tessera-titolo{font-size:var(--cs-t-eyebrow);letter-spacing:var(--cs-ls-eyebrow);text-transform:uppercase;color:var(--cs-text-3)}.tessera-valore{font-family:var(--cs-font-numeric);font-size:var(--cs-t-value);font-weight:var(--cs-fw-bold);color:var(--cs-text-1);align-items:baseline;gap:4px;line-height:1.05;display:inline-flex}.tessera-unita{font-size:var(--cs-t-label);font-weight:var(--cs-fw-regular);color:var(--cs-text-3)}.tessera-nota{font-size:calc(var(--cs-t-label) * .9);color:var(--cs-text-3)}.tessera-barra{background:color-mix(in srgb, var(--cs-text-3) 25%, transparent);border-radius:999px;block-size:4px;margin-block:3px;display:block;overflow:hidden}.tessera-barra>span{background:var(--cs-accent);border-radius:999px;block-size:100%;display:block}.tessera-energia[data-tono=produzione] .tessera-valore{color:var(--cs-energy-solar)}.tessera-energia[data-tono=consumo] .tessera-valore{color:var(--cs-text-1)}.tessera-energia[data-tono=prelievo] .tessera-valore{color:var(--cs-energy-grid)}.tessera-energia[data-tono=immissione] .tessera-valore{color:var(--cs-energy-battery)}.tessera-energia[data-tono=produzione] .tessera-barra>span{background:var(--cs-energy-solar)}.tessera-energia[data-tono=consumo] .tessera-barra>span{background:var(--cs-text-2)}.bolletta{gap:var(--cs-sp-2);padding:var(--cs-sp-4);border-radius:var(--cs-r-md);border:1px solid var(--cs-line-1);background:var(--cs-surface-2);flex-direction:column;display:flex}.bolletta-cifre{gap:var(--cs-sp-6,2rem);flex-wrap:wrap;display:flex}.bolletta-voce{flex-direction:column;gap:2px;display:flex}.bolletta-valore{font-family:var(--cs-font-numeric);font-size:var(--cs-t-value);font-weight:var(--cs-fw-bold);color:var(--cs-text-2)}.bolletta-voce[data-forte=si] .bolletta-valore{font-size:calc(var(--cs-t-value) * 1.25);color:var(--cs-text-1)}.bolletta-nota{font-size:calc(var(--cs-t-label) * .9);color:var(--cs-text-3);max-inline-size:none;margin:0}.bolletta-dettaglio{gap:var(--cs-sp-2) var(--cs-sp-4);font-size:var(--cs-t-label);color:var(--cs-text-3);border-inline-start:1px solid var(--cs-line-1);flex-wrap:wrap;align-self:center;max-inline-size:22rem;padding-inline-start:var(--cs-sp-4);display:flex}.bolletta-dettaglio b{color:var(--cs-text-2);font-variant-numeric:tabular-nums}.bolletta-gse{border-block-start:1px solid var(--cs-line-1);font-size:var(--cs-t-label);color:var(--cs-text-2);margin:0;padding-block-start:var(--cs-sp-3)}.bolletta-gse b{color:var(--cs-energy-battery)}@container casaos (width<=900px){.bolletta-dettaglio{border-inline-start:0;max-inline-size:none;padding-inline-start:0}}.energia-comandi{align-items:center;gap:var(--cs-sp-4);flex-wrap:wrap;display:flex}.periodo{align-items:center;gap:var(--cs-sp-2);display:flex}.periodo-nome{text-align:center;min-inline-size:9.5rem;font-size:var(--cs-t-body);font-weight:var(--cs-fw-bold);color:var(--cs-text-1);text-transform:none}.periodo-nome:first-letter{text-transform:uppercase}.periodo-freccia{border:1px solid var(--cs-line-1);block-size:2.2rem;inline-size:2.2rem;color:var(--cs-text-2);cursor:pointer;background:0 0;border-radius:50%;padding:0;font-size:1.2rem;line-height:1}.periodo-freccia:hover:not(:disabled){color:var(--cs-text-1);background:var(--cs-surface-2)}.periodo-freccia:disabled{opacity:.3;cursor:default}.periodo-calendario{border:1px solid var(--cs-line-1);border-radius:var(--cs-r-md);block-size:2.2rem;inline-size:2.2rem;color:var(--cs-text-2);cursor:pointer;place-items:center;display:grid;position:relative}.periodo-calendario:hover{color:var(--cs-text-1);background:var(--cs-surface-2)}.periodo-calendario svg{fill:none;stroke:currentColor;stroke-width:1.7px;stroke-linecap:round;inline-size:1.2rem}.periodo-calendario circle{fill:currentColor;stroke:none}.periodo-campo{opacity:0;cursor:pointer;block-size:100%;inline-size:100%;font:inherit;color-scheme:inherit;border:0;padding:0;position:absolute;inset:0}.voce-principale{align-items:center;gap:var(--cs-sp-3);min-inline-size:0;color:inherit;text-align:start;cursor:pointer;font:inherit;background:0 0;border:0;flex:1;padding:0;display:flex}.voce-interruttore{padding:var(--cs-sp-2);border-radius:var(--cs-r-sm);cursor:pointer;background:0 0;border:0;flex:none;place-items:center;margin-inline-end:calc(var(--cs-sp-2) * -1);display:grid}.voce-interruttore:hover:not(:disabled){background:color-mix(in srgb, var(--cs-text-3) 12%, transparent)}.voce-principale:active:not(:disabled),.voce-interruttore:active:not(:disabled){scale:.97}.voce-regolabile{fill:none;block-size:1.05rem;inline-size:1.05rem;stroke:var(--cs-text-3);stroke-width:1.7px;stroke-linecap:round;opacity:.7;flex:none}.voce-principale:hover .voce-regolabile{stroke:var(--cs-accent);opacity:1}.velo-luce{z-index:var(--cs-z-modal,400);padding:var(--cs-sp-5);background:var(--cs-scrim,#000000a6);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);place-items:center;display:grid;position:fixed;inset:0}.scheda-luce{gap:var(--cs-sp-5);overscroll-behavior:contain;max-block-size:100%;inline-size:min(100%,32rem);padding:var(--cs-sp-5);border-radius:var(--cs-r-lg);background:var(--cs-surface-1);box-shadow:var(--cs-el-3,var(--cs-el-2));flex-direction:column;display:flex;overflow-y:auto}.scheda-luce-testa{justify-content:space-between;align-items:flex-start;gap:var(--cs-sp-4);flex-wrap:wrap;display:flex}.scheda-luce-nome{font-family:var(--cs-font-display);font-size:var(--cs-t-title);color:var(--cs-text-1);margin:0;font-weight:700}.scheda-luce-stato{font-size:var(--cs-t-label);color:var(--cs-text-2)}.scheda-luce-azioni{gap:var(--cs-sp-3);display:flex}.cursore{gap:var(--cs-sp-2);flex-direction:column;display:flex}.cursore-testa{justify-content:space-between;align-items:baseline;gap:var(--cs-sp-3);display:flex}.cursore-nome{font-size:var(--cs-t-eyebrow);letter-spacing:var(--cs-ls-eyebrow);text-transform:uppercase;color:var(--cs-text-3)}.cursore-valore{font-size:var(--cs-t-label);color:var(--cs-text-2);font-variant-numeric:tabular-nums}.cursore input[type=range]{appearance:none;cursor:pointer;background:0 0;block-size:2.4rem;inline-size:100%;margin:0}.cursore input[type=range]::-webkit-slider-runnable-track{background:var(--traccia,var(--cs-surface-3,#555));border:1px solid var(--cs-line-1);border-radius:999px;block-size:1.5rem}.cursore input[type=range]::-moz-range-track{background:var(--traccia,var(--cs-surface-3,#555));border:1px solid var(--cs-line-1);border-radius:999px;block-size:1.5rem}.cursore input[type=range]::-webkit-slider-thumb{appearance:none;background:#fff;border:2px solid #00000059;border-radius:50%;block-size:1.6rem;inline-size:1.6rem;margin-block-start:-.1rem;box-shadow:0 1px 4px #0006}.cursore input[type=range]::-moz-range-thumb{background:#fff;border:2px solid #00000059;border-radius:50%;block-size:1.6rem;inline-size:1.6rem}.gruppo-colore{gap:var(--cs-sp-3);flex-direction:column;display:flex}.colori-pronti{gap:var(--cs-sp-3);flex-wrap:wrap;display:flex}.colore-pronto{border:2px solid var(--cs-line-1);cursor:pointer;border-radius:50%;block-size:2.6rem;inline-size:2.6rem;padding:0}.colore-pronto:hover{border-color:var(--cs-text-2)}.colore-pronto:active{scale:.92}.effetti{gap:var(--cs-sp-2);flex-wrap:wrap;display:flex}.effetto{padding:var(--cs-sp-2) var(--cs-sp-3);border:1px solid var(--cs-line-1);color:var(--cs-text-2);font-size:var(--cs-t-label);cursor:pointer;background:0 0;border-radius:999px}.effetto:hover{color:var(--cs-text-1);border-color:var(--cs-text-3)}.effetto[data-scelto=si]{background:color-mix(in srgb, var(--cs-accent) 22%, transparent);border-color:var(--cs-accent);color:var(--cs-text-1)}.colore-adesso{align-items:center;gap:var(--cs-sp-2);font-size:var(--cs-t-label);color:var(--cs-text-2);display:inline-flex}.colore-campione{border:1px solid var(--cs-line-1);border-radius:50%;block-size:1rem;inline-size:1rem}.colore-pronto[data-scelto=si]{border-color:var(--cs-text-1);box-shadow:0 0 0 3px var(--cs-surface-1), 0 0 0 5px var(--cs-text-1)}\n.velo-impostazioni{z-index:var(--cs-z-modal,400);padding:var(--cs-sp-4);background:var(--cs-scrim,#000000a6);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);place-items:center;display:grid;position:fixed;inset:0}.impostazioni{gap:var(--cs-sp-4);block-size:min(100%,56rem);inline-size:min(100%,78rem);padding:var(--cs-sp-5);border-radius:var(--cs-r-lg);background:var(--cs-surface-1);box-shadow:var(--cs-el-3,var(--cs-el-2));flex-direction:column;min-block-size:0;display:flex}.imp-testa{justify-content:space-between;align-items:center;gap:var(--cs-sp-4);flex-wrap:wrap;display:flex}.imp-titolo{font-family:var(--cs-font-display);font-size:var(--cs-t-title);color:var(--cs-text-1);margin:0;font-weight:700}.imp-sotto{font-size:var(--cs-t-label);color:var(--cs-text-2)}.imp-azioni{align-items:center;gap:var(--cs-sp-3);display:flex}.imp-errore{padding:var(--cs-sp-3) var(--cs-sp-4);border-radius:var(--cs-r-md);border:1px solid color-mix(in srgb, var(--cs-alert) 45%, transparent);background:color-mix(in srgb, var(--cs-alert) 12%, transparent);color:var(--cs-text-1);font-size:var(--cs-t-label);margin:0}.imp-filtri{align-items:center;gap:var(--cs-sp-3);flex-wrap:wrap;display:flex}.imp-cerca{min-inline-size:0;padding:var(--cs-sp-3) var(--cs-sp-4);border:1px solid var(--cs-line-1);border-radius:var(--cs-r-md);background:var(--cs-surface-2);color:var(--cs-text-1);font:inherit;font-size:var(--cs-t-body);flex:14rem}.imp-cerca::placeholder{color:var(--cs-text-3)}.imp-cerca:focus-visible{outline:2px solid var(--cs-accent);outline-offset:1px}.imp-interruttore{align-items:center;gap:var(--cs-sp-2);font-size:var(--cs-t-label);color:var(--cs-text-2);cursor:pointer;white-space:nowrap;display:inline-flex}.imp-interruttore input{block-size:1.15rem;inline-size:1.15rem;accent-color:var(--cs-accent)}.imp-corpo{overscroll-behavior:contain;gap:var(--cs-sp-2);min-block-size:0;flex-direction:column;flex:1;padding-inline-end:var(--cs-sp-2);display:flex;overflow-y:auto}.riga-dispositivo{align-items:center;gap:var(--cs-sp-3);padding:var(--cs-sp-2) var(--cs-sp-3);border:1px solid var(--cs-line-1);border-radius:var(--cs-r-md);background:var(--cs-surface-2);grid-template-columns:7.5rem minmax(0,1fr) auto auto;display:grid}.riga-dispositivo[data-assegnato=si]{border-inline-start:3px solid var(--cs-ok)}.riga-dominio{font-family:var(--cs-font-mono,monospace);font-size:calc(var(--cs-t-label) * .85);color:var(--cs-text-3);text-align:center;background:var(--cs-surface-3,color-mix(in srgb, var(--cs-text-3) 12%, transparent));white-space:nowrap;text-overflow:ellipsis;border-radius:999px;padding:2px 6px;overflow:hidden}.riga-identita{flex-direction:column;gap:2px;min-inline-size:0;display:flex}.riga-nome{border-radius:var(--cs-r-sm,6px);inline-size:100%;color:var(--cs-text-1);font:inherit;font-size:var(--cs-t-body);font-weight:var(--cs-fw-bold);background:0 0;border:1px solid #0000;padding:4px 6px}.riga-nome:hover:not(:disabled){border-color:var(--cs-line-1)}.riga-nome:focus-visible{outline:2px solid var(--cs-accent);outline-offset:0;background:var(--cs-surface-1)}.riga-id{font-family:var(--cs-font-mono,monospace);font-size:calc(var(--cs-t-label) * .85);color:var(--cs-text-3);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.riga-scelte{align-items:center;gap:var(--cs-sp-2);display:flex}.riga-select{padding:var(--cs-sp-2) var(--cs-sp-3);border:1px solid var(--cs-line-1);border-radius:var(--cs-r-md);background:var(--cs-surface-1);color:var(--cs-text-1);font:inherit;font-size:var(--cs-t-label);min-inline-size:9rem}.riga-select-piccola{min-inline-size:7.5rem}.riga-select:disabled{opacity:.5}.riga-suggerita{padding:var(--cs-sp-2) var(--cs-sp-3);border:1px dashed color-mix(in srgb, var(--cs-accent) 60%, transparent);border-radius:var(--cs-r-md);background:color-mix(in srgb, var(--cs-accent) 10%, transparent);color:var(--cs-text-1);font-size:var(--cs-t-label);white-space:nowrap;cursor:pointer}.riga-suggerita:hover{background:color-mix(in srgb, var(--cs-accent) 20%, transparent)}.riga-area{font-size:calc(var(--cs-t-label) * .85);color:var(--cs-text-3);white-space:nowrap}.elenco-stanze-imp{gap:var(--cs-sp-5);flex-direction:column;display:flex}.gruppo-stanze{gap:var(--cs-sp-2);flex-direction:column;display:flex}.gruppo-stanze-titolo{font-size:var(--cs-t-label);font-weight:var(--cs-fw-bold);letter-spacing:.08em;text-transform:uppercase;color:var(--cs-text-3);margin:0}.riga-stanza{align-items:center;gap:var(--cs-sp-3);padding:var(--cs-sp-2) var(--cs-sp-3);border:1px solid var(--cs-line-1);border-radius:var(--cs-r-md);background:var(--cs-surface-2);grid-template-columns:minmax(0,1fr) auto auto auto;display:grid}.riga-nuova{background:0 0;border-style:dashed;grid-template-columns:minmax(0,1fr) auto}.riga-conta{font-size:var(--cs-t-label);color:var(--cs-text-3);white-space:nowrap}.btn-quieto{color:var(--cs-text-2)}.btn-quieto:hover:not(:disabled){color:var(--cs-alert);border-color:color-mix(in srgb, var(--cs-alert) 55%, transparent)}.btn-forte{border-color:color-mix(in srgb, var(--cs-accent) 70%, transparent);background:color-mix(in srgb, var(--cs-accent) 18%, transparent)}.btn-forte:disabled{opacity:.45}@container (width<=900px){.riga-dispositivo{grid-template-columns:5rem minmax(0,1fr)}.riga-scelte,.riga-suggerita,.riga-area{grid-column:1/-1}.riga-scelte{flex-wrap:wrap}.riga-select{flex:8rem}.riga-stanza{grid-template-columns:minmax(0,1fr) auto}}.riga-preferenza{grid-template-columns:minmax(0,1fr) auto}.riga-nome-fisso{font-size:var(--cs-t-body);font-weight:var(--cs-fw-bold);color:var(--cs-text-1)}.riga-numero{inline-size:7rem;padding:var(--cs-sp-2) var(--cs-sp-3);border:1px solid var(--cs-line-1);border-radius:var(--cs-r-md);background:var(--cs-surface-1);color:var(--cs-text-1);font:inherit;font-size:var(--cs-t-body);font-variant-numeric:tabular-nums;text-align:end}.riga-numero:focus-visible{outline:2px solid var(--cs-accent);outline-offset:1px}", vr = class extends HTMLElement {
	constructor() {
		super(), this._store = gr(), this._root = null, this._montato = !1, this._smontaggio = 0;
	}
	connectedCallback() {
		if (clearTimeout(this._smontaggio), !this.shadowRoot) {
			let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
			t.textContent = _r;
			let n = document.createElement("div");
			n.className = "casaos-mount", e.append(t, n);
		}
		this._osservatore || (this._osservatore = new ResizeObserver(([e]) => {
			let t = e.contentRect.height;
			t > 0 && this.style.setProperty("--cs-viewport-h", `${Math.round(t)}px`);
		}), this._osservatore.observe(this)), this._root ||= (0, u.createRoot)(this.shadowRoot.querySelector(".casaos-mount")), this._montato ||= (this._root.render(/* @__PURE__ */ (0, b.jsx)(fr, { store: this._store })), !0), this._store.collegaBarraHA((e) => {
			this.dispatchEvent(new CustomEvent("hass-dock-sidebar", {
				detail: { dock: e },
				bubbles: !0,
				composed: !0
			}));
		});
	}
	disconnectedCallback() {
		clearTimeout(this._smontaggio), this._smontaggio = setTimeout(() => this._smonta(), 1500), this._osservatore &&= (this._osservatore.disconnect(), null);
	}
	_smonta() {
		if (this._root) {
			let e = this._root;
			this._root = null, this._montato = !1, queueMicrotask(() => e.unmount());
		}
		this._store.distruggi(), this._store = gr();
	}
	set hass(e) {
		this._store.collega(e);
	}
	set narrow(e) {
		this._store.setNarrow(!!e);
	}
	set route(e) {
		this._route = e;
	}
	set panel(e) {
		this._store.setPannello(e?.config);
	}
};
customElements.get("casaos-panel") || customElements.define("casaos-panel", vr);
//#endregion
