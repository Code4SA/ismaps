var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat &&
      self._wb_wombat.local_init &&
      self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

  (function () {
    (function () {
      if (!this.ovi || !this.ovi.win) {
        var f = {},
          e = e || this.oviConfig || {},
          e = {
            win: e.win || this,
            doc: e.doc || this.document,
            modulePaths: e.modulePaths || {},
            version: "1.0.0.$REPOSITORY_REVISION$",
            buildNS: function (b) {
              var h;
              for (var b = b.split("."), a = 0, g = ovi.win, d; (d = b[a++]); )
                (h = g[d] = g[d] || { isNs: !0 }), (g = h);
              return g;
            },
            provide: function (b) {
              f[b] = 1;
              return ovi.buildNS(b);
            },
            isLoaded: function (b) {
              return f[b];
            },
            require: function (b, a) {
              if (f[b]) return this;
              var g = ovi.getLoadPath(b);
              try {
                ovi.Pr(g);
              } catch (d) {
                throw Error("Could not load " + b + ", reason: " + d.message);
              }
              if (!f[b]) {
                if (a !== !1)
                  throw Error("Namespace " + b + " was not provided by " + g);
                f[b] = 1;
              }
              return this;
            },
            wk: function () {
              return ovi.win.ActiveXObject
                ? new ActiveXObject("Microsoft.XMLHTTP")
                : new XMLHttpRequest();
            },
            $xhr: function () {
              return this.wk();
            },
            pj: function (b) {
              b = b.status;
              try {
                return (
                  (!b && location.protocol === "file:") ||
                  (b >= 200 && b < 300) ||
                  b === 304 ||
                  b === 1223 ||
                  b === 0
                );
              } catch (a) {}
              return !1;
            },
            $isXHRSuccess: function (b) {
              return this.pj(b);
            },
            Pr: function (b) {
              var a = ovi.wk();
              a.open("GET", b, !1);
              a.send(null);
              if (!ovi.pj(a))
                throw Error("Unable to load " + b + " status: " + a.status);
              return ovi.win.eval(
                a.responseText + "\n//@ sourceURL=" + b + "\n"
              );
            },
            getLoadPath: function (b, a) {
              var g = ovi.modulePaths[b];
              if (!g)
                for (var d = b.split("."), i = d.pop(), j = []; d.length; ) {
                  g = d.join(".");
                  if ((g = ovi.modulePaths[g])) {
                    g += j.join("/");
                    g += g.charAt(g.length - 1) !== "/" ? "/" + i : i;
                    break;
                  }
                  j.splice(0, 0, d.pop());
                }
              g += "." + (a || "js");
              return g;
            },
          };
        if (this.ovi)
          for (var c in e) e.hasOwnProperty(c) && (this.ovi[c] = e[c]);
        else this.ovi = ovi = e;
        ovi.modulePaths.ovi =
          ovi.modulePaths.ovi ||
          (function () {
            for (
              var b = document.getElementsByTagName("script"),
                a = 0,
                g = /(^|\/|\\)ovi[\.\w]*?\.js$/i,
                d = "",
                i,
                j,
                h;
              (i = b[a++]);

            )
              if (((i = i.ie8_src || i.src || ""), (j = i.match(g)))) {
                if (i.indexOf("://") === -1) {
                  d = ovi.win.location.href;
                  h = d.indexOf("#");
                  var c = d.indexOf("?");
                  h = h > c && c > -1 ? c : h;
                  d = h > -1 ? d.substring(0, h) : d;
                  d = d.substring(0, d.lastIndexOf("/") + 1);
                }
                h = d + i.substring(0, j.index);
                h = h.charAt(h.length - 1) === "/" ? h : h + "/";
              }
            return h;
          })();
        ovi.basePath = "";
      }
    }.call(this));
    ovi.provide("ovi.browser");
    var ta = ovi,
      Ba = navigator,
      Fa = Ba.userAgent.toLowerCase(),
      db = Ba.appVersion;
    ta.platform = {
      windows: /Windows/.test(db),
      mac: /MacIntel/.test(Ba.platform),
      linux: /X11/.test(db) && !/tablet/.test(Fa) && !/armv7/.test(Fa),
      maemo: /apple/.test(Fa) && /linux/.test(Fa) && /armv7/.test(Ba.platform),
      s60_v3: /Series60\/3/.test(db),
      s60_v5_touch: /Nokia5800|NokiaN97/.test(db) || /browserng/.test(Fa),
    };
    var eb = ta.platform;
    ta.browser = {
      version: (Fa.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
      chrome: /chrome/.test(Fa),
      safari: /Apple/.test(navigator.vendor) && !/browserng/.test(Fa),
      opera: /opera/.test(Fa),
      mozilla: /firefox/.test(Fa) && !/Apple/.test(navigator.vendor),
      s60: /series60/.test(Fa),
      cp: /browserng/.test(Fa),
      s60_v3: eb.s60_v3,
      snc: eb.s60_v3 || eb.s60_v5_snc,
      touch: eb.maemo || eb.s60_v5_touch,
      web: !(eb.s60_v3 || eb.s60_v5_snc || eb.maemo || eb.s60_v5_touch),
      language: Ba.language || Ba.userLanguage,
    };
    ovi.browser.msie = eval("/*@cc_on!@*/!1");
    ovi.provide("ovi.lang");
    (function (f) {
      f.bind = function (a, d) {
        if (arguments.length > 2) {
          var b = [].slice.call(arguments, 2);
          return function () {
            return d.apply(a, b.concat(f.splat(arguments)));
          };
        } else
          return function () {
            return d.apply(a, arguments);
          };
      };
      f.each = function (a, d, b) {
        if (!a) return a;
        var i = 0,
          g = a.length,
          j;
        if (
          typeof g !== "number" ||
          (Object.prototype.toString.call(a) === "[object Object]" &&
            !(g - 1 in a))
        )
          for (j in a) {
            if (a.hasOwnProperty(j) && d.call(b || a, a[j], j, a) === !1) break;
          }
        else
          for (j = a[0]; i < g && d.call(b || a, j, i, a) !== !1; j = a[++i]);
        return a;
      };
      f.extend = function () {
        var a =
            "constructor toString valueOf toLocaleString isPrototypeOf propertyIsEnumerable hasOwnProperty unique".split(
              " "
            ),
          d,
          b = { constructor: function () {} },
          i;
        for (d in b) i = null;
        i === void 0 &&
          (i = function (d, b) {
            for (var i = a.length, k; i--; )
              if (b.hasOwnProperty((k = a[i]))) d[k] = b[k];
          });
        f.extend = function (a, d) {
          for (
            var h = Array.prototype.slice.call(arguments, 1),
              b = 0,
              g = h.length;
            b < g;
            b++
          ) {
            var d = h[b],
              j;
            for (j in d) d.hasOwnProperty(j) && (a[j] = d[j]);
            i && d && i(a, d, 1);
          }
          return a;
        };
        return f.extend.apply(null, arguments);
      };
      f.splat = function (a) {
        var d = f.type(a);
        return d === "undefined"
          ? []
          : d === "arguments"
          ? Array.prototype.slice.call(a)
          : d === "array"
          ? a
          : [a];
      };
      for (
        var e = Object.prototype.toString,
          c = {},
          b = { 1: "element", 3: "textnode", 9: "document", 11: "fragment" },
          a =
            "Arguments Array Boolean Date Document Element Error Fragment Function NodeList Null Number Object RegExp String TextNode Undefined Window".split(
              " "
            ),
          g = 0,
          d,
          i;
        (d = a[g++]);

      )
        if ((i = f.win[d]))
          try {
            c[e.call(new i())] = d.toLowerCase();
          } catch (j) {}
      f.type = function (a) {
        return (
          (a === null && "null") ||
          (a === void 0 && "undefined") ||
          (a.nodeType && b[a.nodeType]) ||
          (a.length !== void 0 &&
            (typeof a.length == "number" || a.length.tagName) &&
            ((a.callee && "arguments") ||
              (a.alert && "window") ||
              (a.item && "nodelist"))) ||
          c[e.call(a)]
        );
      };
    })(ovi);
    ovi.provide("ovi.Class");
    (function (f) {
      function e(a) {
        function b() {
          var d = this.nk;
          this.nk = b;
          var i;
          try {
            i = this instanceof b ? new a(arguments) : a.apply(this, arguments);
          } finally {
            this.nk = d;
          }
          return i;
        }
        return b;
      }
      function c() {
        var a = this.nk;
        delete this.nk;
        return a.Cn.apply(this, arguments);
      }
      function b() {}
      f.Class = function (a) {
        function g() {
          this.ij && this.ij();
          return this.initialize
            ? this.initialize.apply(this, arguments)
            : this;
        }
        a = a || {};
        if (!(this instanceof f.Class)) return new f.Class(a);
        var d;
        if (a.Mixins) {
          var i = [].concat(a.Mixins),
            j = [],
            h = 0,
            m;
          for (delete a.Mixins; (m = i[h++]); )
            for (d in (m = m.prototype || m))
              typeof m[d] === "function" &&
                (d !== "initialize"
                  ? a[d] || (a[d] = m[d])
                  : j.push(m.initialize));
          if (j.length > 0)
            a.ij = function () {
              l.ij.Cn && l.ij.Cn.call(this);
              for (var a = 0, d; (d = j[a++]); ) d.call(this);
            };
        }
        i = a.Extends;
        delete a.Extends;
        h = a.Statics;
        delete a.Statics;
        var l;
        if (typeof i === "function") {
          b.prototype = i.prototype;
          l = new b();
          for (d in a)
            if (a.hasOwnProperty(d)) {
              if (typeof l[d] === "function" && typeof a[d] === "function")
                (a[d] = e(a[d])), (a[d].Cn = l[d]);
              l[d] = a[d];
            }
          l._super = c;
          l.ok = i;
        } else l = a;
        if (a.Name) (l.className = a.Name), (g.Name = l.className);
        delete l.Name;
        g.constructor = f.Class;
        g.prototype = l;
        g.prototype.constructor = g;
        h && f.extend(g, h);
        return g;
      };
    })(ovi);
    ovi.provide("ovi.Array");
    (function (f) {
      var e =
          "forEach indexOf lastIndexOf map filter every some reduce reduceRight".split(
            " "
          ),
        c =
          /^\s*function\s+\w+\s*\(\s*\)\s*\{\s*\[\s*native\s+code\s*\]\s*\}\s*$/,
        b = {
          forEach: function (a, d, h) {
            for (var b = a.length >>> 0, g = 0; g < b; g++)
              g in a && d.call(h, a[g], g, a);
          },
          lastIndexOf: function (a, d, h) {
            return this.Mo(a, d, h, -1);
          },
          Mo: function (a, d, h, b) {
            var b = b || 1,
              g = a.length >>> 0;
            isNaN(h)
              ? (h = b > 0 ? 0 : g - 1)
              : ((h = Math[h < 0 ? "ceil" : "floor"](h)),
                h < 0 ? (h += g) : b < 0 && h >= g && (h = g - 1));
            for (; h > -1 && h < g; h += b) if (h in a && a[h] === d) return h;
            return -1;
          },
        },
        a = { isOviArray: 1 },
        g = e.length;
      for (b.indexOf = b.Mo; g--; ) {
        var d = e[g];
        typeof e[d] === "function" &&
        c.test(e[d]) &&
        (!e[d].toString || c.test(e[d].toString))
          ? (e.splice(g, 1),
            (b[d] =
              Array[d] ||
              new Function(
                "var ap = Array.prototype; return ap." +
                  d +
                  ".apply(arguments[0], ap.slice.call(arguments, 1));"
              )))
          : (a[d] = new Function(
              "return ovi.Array." +
                d +
                ".apply(ovi.Array, [this].concat(ovi.splat(arguments)));"
            ));
      }
      f.Array = e.length
        ? function (d) {
            return (d = arguments.length ? d : []).isOviArray
              ? d
              : f.extend(d, a);
          }
        : function (a) {
            return arguments.length ? a : [];
          };
      f.extend(f.Array, b);
    })(ovi);
    ovi.provide("nokia.maps.heatmap._packaging.base");
    ovi.provide("nokia.maps.util");
    (function (f) {
      function e(a) {
        return function (d) {
          return h.call(d) === a;
        };
      }
      function c(a) {
        this.message = a;
        this.name = "ParserError";
      }
      var b = {},
        a = Math,
        g = a.min,
        d = a.max,
        a = document,
        i = a.createElement("p"),
        j = i.appendChild(a.createTextNode("")),
        h = {}.toString,
        a =
          "Array Boolean Date Error Function Number Object RegExp String".split(
            " "
          ),
        m = a.length;
      for (f.isArguments = e(h.call(arguments)); m--; )
        f["is" + a[m]] = e(h.call(new this[a[m]]()));
      ovi.extend(f, {
        Tb: function (a, d) {
          throw arguments.length > 1 && d !== b ? a + ": " + d : a;
        },
        f: function (a) {
          f.Tb("IllegalArgument", arguments.length ? a : b);
        },
        Za: function (a) {
          f.Tb("IllegalState", arguments.length ? a : b);
        },
        Hn: function (a) {
          f.Tb("UnsupportedOperation", arguments.length ? a : b);
        },
        Xt: function (a) {
          f.Tb("InternalError", arguments.length ? a : b);
        },
        hn: function (a, d) {
          var a = ("" + a).split("."),
            h = a.length,
            b = 0;
          for (
            arguments.length < 2 && (d = window);
            b < h && d !== void 0 && d !== null;
            b++
          )
            d = d[a[b]];
          return d;
        },
        now:
          Date.now ||
          function () {
            return +new Date();
          },
        flatMerge: function (a, d, h, b) {
          var i, g;
          for (i in d)
            if (
              ((g = d[i]),
              d.hasOwnProperty(i) &&
                (h || !a.hasOwnProperty(i)) &&
                (!b || b(i, g)))
            )
              a[i] = g;
          return a;
        },
        Q: function () {},
        Oe: function (a, d) {
          return ((a % d) + d) % d;
        },
        lb: function (a, h, b) {
          return g(d(+a, +h), +b);
        },
        Ek: function (a) {
          return function (d) {
            return (a && a[d]) || null;
          };
        },
        Er: self.XPathResult
          ? function (a, d, h) {
              a = (a.ownerDocument || a).evaluate(
                d,
                a,
                new nokia.maps.util.Ek(h),
                XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                null
              );
              for (d = []; (h = a.iterateNext()); ) d.push(h);
              return d || [];
            }
          : function (a, d, h) {
              var b = a.ownerDocument || a,
                i = b.getProperty("SelectionLanguage"),
                g = b.getProperty("SelectionNamespaces"),
                j,
                c = "";
              for (j in h)
                h.hasOwnProperty(j) && (c += "xmlns:" + j + '="' + h[j] + '" ');
              b.setProperty("SelectionLanguage", "XPath");
              b.setProperty("SelectionNamespaces", c);
              a = a.selectNodes(d);
              b.setProperty("SelectionLanguage", i);
              b.setProperty("SelectionNamespaces", g);
              return a;
            },
        Hm: function (a) {
          var d, h;
          if (window.ActiveXObject)
            (d = new ActiveXObject("Microsoft.XMLDOM")),
              (d.async = !1),
              (d.resolveExternals = !1),
              (d.validateOnParse = !1),
              d.loadXML(a),
              d.parseError.errorCode &&
                (h = "error on line ".concat(
                  d.parseError.line,
                  ": ",
                  d.parseError.reason
                ));
          else if (
            self.DOMParser &&
            ((d = new DOMParser()),
            (d = d.parseFromString(a, "text/xml")),
            ovi.Array.indexOf(
              [
                d.documentElement.nodeName,
                (d.documentElement.firstChild || {}).nodeName,
              ],
              "parsererror"
            ) >= 0)
          )
            (a = d.getElementsByTagName("parsererror")[0]),
              (h =
                (a.childNodes[0].nodeType === 3
                  ? a.childNodes[0].nodeValue + "\n"
                  : "") + a.childNodes[1].firstChild.nodeValue);
          if (h) throw new c(h);
          return d || null;
        },
        getConstructor: function (a) {
          try {
            return !a.isNs ? a : null;
          } catch (d) {
            return null;
          }
        },
        sanitizeText: function (a) {
          j.nodeValue = a;
          return i.innerHTML;
        },
        Vq: function () {
          var a = document.createElement("div"),
            d = "";
          a.innerHTML = "<svg></svg>";
          if (!a.firstChild) return !0;
          d = a.firstChild.toString();
          return (
            this.Uk ||
            (this.Uk = !(
              !window.SVGSVGElement ||
              !(d === "[object HTMLElement]" || d === "[object SVGSVGElement]")
            ))
          );
        },
        lc: function (a, d) {
          for (var h = (a = a.split(" ")).length, b = {}; h--; ) b[a[h]] = d;
          return b;
        },
      });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.OObject");
    (function (f) {
      var e = {},
        c = 0;
      f.OObject = new ovi.Class({
        initialize: function (b) {
          for (var a in b) this.set(a, b[a]);
        },
        set: function (b, a, g) {
          var d;
          if (a === void 0 && g === void 0 && typeof b !== "string")
            for (d in b) this.kf(d, b[d]);
          else this.kf(b, a, g);
          return this;
        },
        kf: function (b, a, g) {
          var d = this[b],
            i = this[e[b] || (++c && (e[b] = b + "Setter"))];
          c > 5e3 && ((e = {}), (c = 0));
          if (g || a !== d)
            i && (a = i.call(this, a)), d !== a && this.af(b, (this[b] = a), d);
        },
        get: function (b) {
          return this[b];
        },
        remove: function (b) {
          var a = this[b];
          this.hasOwnProperty(b) &&
            (delete this[b], a !== this[b] && this.af(b, this[b], a));
        },
        af: function (b, a, g) {
          var d = this.Qe,
            i,
            j,
            h = 1,
            c;
          if (d) {
            c = d["*"];
            do
              if (c) {
                c = c.slice(0);
                i = c.length;
                for (j = 0; j < i; )
                  if ((c[j++].call(c[j++], this, b, a, g), this[b] !== a))
                    return;
              }
            while (h-- && (c = d[b]));
          }
        },
        addObserver: function (b, a, g) {
          var d = this.Qe || (this.Qe = {});
          (d[b] || (d[b] = [])).push(a, g);
          return this;
        },
        removeObserver: function (b, a, g) {
          var d = this.Qe,
            i,
            j,
            h = 0;
          if (d && (i = d[b]))
            for (j = i.length; h < j; )
              i[h] === a &&
                i[h + 1] === g &&
                (i.splice(h, 2), j === 2 && delete d[b]),
                (h += 2);
          return this;
        },
        observersSetter: function (b) {
          for (var a in b) this.addObserver(a, b[a]);
        },
      });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.ResourceLoader");
    (function (f) {
      var e = {
        css: function (c) {
          /###RESOURCE_START###/im.test(c) &&
            ((c = c.replace(/[\s\S]*###RESOURCE_START###\*\//im, "")),
            (c = c.replace(/\/\*###RESOURCE_END###[\s\S]*/im, "")));
          return c;
        },
        html: function (c) {
          /###RESOURCE_START###/im.test(c) &&
            ((c = c.replace(/[\s\S]*###RESOURCE_START###--\>/im, "")),
            (c = c.replace(/<\!--###RESOURCE_END###[\s\S]*/im, "")));
          return c;
        },
      };
      f.requireString = function (c) {
        var b = c.split("."),
          c = b.pop(),
          a = b.join("."),
          g = ovi.getLoadPath(a, c),
          b = ovi.wk();
        b.open("GET", g, !1);
        b.send(null);
        if (ovi.pj(b))
          (a = ovi.provide("" + a)),
            (b = b.responseText),
            b.replace(/\n/g, ""),
            e[c] && (b = e[c](b)),
            (a[c] = b);
        else throw "Unable to load " + this.Vr + " status: " + b.status;
      };
      f.requireI18n = function (c) {
        for (
          var b = f.config.packages.language,
            a = b.length,
            g = c || "nokia.maps";
          a--;

        )
          (c = b[a].split("-")),
            f.requireString(
              g +
                ".resources.ui.i18n." +
                (c.length === 2 ? c[0] + "." + c[1] : c[0]) +
                ".translation.json"
            );
      };
    })(nokia.maps);
    ovi.provide("nokia.maps.Config");
    (function (f) {
      function e(a, d) {
        b(d) !== "string" && (d = "");
        return d + (d && d.substr(-1) !== "." ? "." : "") + a;
      }
      var c = {},
        b = ovi.type,
        a = (f.Config = new ovi.Class({
          initialize: function () {
            this.Oa = {};
          },
          Statics: {
            setDefault: function (a, d, b) {
              if (!b || !c[a])
                d === void 0 || d === null ? delete c[a] : (c[a] = d);
            },
            setDefaultNS: function (b, d, i, j) {
              a.setDefault(e(d, b), i, j);
            },
            setDefaults: function (a, d) {
              var b, j;
              for (b in a)
                if (!d || !c[b])
                  (j = a[b]),
                    j === void 0 || j === null ? delete c[b] : (c[b] = j);
            },
            setDefaultsNS: function (a, d, b) {
              var j, h, m;
              for (j in d)
                if (((m = e(j, a)), !b || !c[m]))
                  (h = d[j]),
                    h === void 0 || h === null ? delete c[m] : (c[m] = h);
            },
            getDefault: function (a) {
              return c[a];
            },
            getDefaultNS: function (a, d) {
              return c[e(d, a)];
            },
          },
          get: function (a) {
            return a in this.Oa ? this.Oa[a] : c[a];
          },
          getNS: function (a, d) {
            d = e(d, a);
            return d in this.Oa ? this.Oa : c[d];
          },
          set: function (a, d) {
            this.Oa[a] = d;
            return this;
          },
          setNS: function (a, d, b) {
            this.Oa[e(d, a)] = b;
            return this;
          },
          reset: function (a) {
            delete this.Oa[a];
            return this;
          },
          resetNS: function (a, d) {
            d = e(d, a);
            delete this.Oa[d];
            return this;
          },
        }));
    })(nokia.maps);
    ovi && ovi.provide("nokia.maps.Detector");
    nokia.maps = nokia.maps || {};
    (function (f) {
      function e(c, b) {
        for (var a = b.length, g = null; a--; )
          if (b[a][0] === c) {
            g = b[a];
            break;
          }
        return g;
      }
      f.Detector = function (c, b) {
        this.definitions = c;
        this.omitted = b;
      };
      f.Detector.prototype = {
        detect: function (c) {
          switch (c) {
            case void 0:
              return this.detect(this.omitted);
            case "auto":
              return this.autoDetect();
            case "none":
              return null;
            default:
              return e(c, this.definitions) === null ? null : c;
          }
        },
        autoDetect: function () {
          for (var c = this.definitions, b = c.length, a = 0; a < b; a++)
            if (this.isCapable(c[a][0])) return c[a][0];
        },
        isCapable: function (c) {
          return (c = e(c, this.definitions)) && c[1]();
        },
      };
    })(nokia.maps);
    ovi.provide("nokia.maps.util.LinkedList");
    (function (f) {
      var e = !e,
        c = !e,
        b = (f.LinkedList = Function()),
        a = (f.LinkedList.Element = function (a) {
          this.data = a;
        });
      ovi.extend(b.prototype, {
        l: null,
        m: null,
        length: 0,
        first: function () {
          return this.l;
        },
        last: function () {
          return this.m;
        },
        elementOf: function (a, d) {
          for (var b = d || this.l; b && b.data !== a; ) b = b.next;
          return b || null;
        },
        lastElementOf: function (a, d) {
          for (var b = d || this.m; b && b.data !== a; ) b = b.prev;
          return b || null;
        },
        toArray: function (a) {
          for (var d = this.l, b = []; d; )
            a ? b.push(d) : b.push(d.data), (d = d.next);
          return b;
        },
        indexOf: function (b) {
          var d = b instanceof a,
            i = 0,
            j = this.l;
          if (this.length > 0)
            for (; j; ) {
              if (d) {
                if (j === b) return i;
              } else if (j.data === b) return i;
              i++;
              j = j.next;
            }
          return -1;
        },
        lastIndexOf: function (b) {
          var d = b instanceof a,
            i = this.length - 1,
            j = this.m;
          if (this.length > 0)
            for (; j; ) {
              if (d) {
                if (j === b) return i;
              } else if (j.data === b) return i;
              i--;
              j = j.prev;
            }
          return -1;
        },
        get: function (b) {
          var d = this.l;
          if (b instanceof a) return b;
          if ((b = +b) < 0) for (d = this.m; d && ++b; ) d = d.prev;
          else for (; d && b--; ) d = d.next;
          return d;
        },
        set: function (b, d) {
          var i = this.l;
          if (b instanceof a) {
            if (((i = b), i.list !== this)) throw "Invalid index!";
          } else if ((b = +b) < 0) {
            for (i = this.m; i && ++b; ) i = i.prev;
            if (!i) return this.unshift(d);
          } else if (b !== b) throw "Invalid index!";
          else {
            for (; i && b--; ) i = i.next;
            if (!i) return this.push(d);
          }
          if (d instanceof a) return this.splice(b, 1, d) && this;
          i.data = d;
          return this;
        },
        remove: function (b) {
          var d, i;
          b instanceof a || (b = this.elementOf(b));
          if (!b || b.list !== this) return c;
          if (--this.length === 0) this.l = this.m = null;
          else if (this.l === b) {
            if ((this.l = b.next)) this.l.prev = null;
          } else if (this.m === b) {
            if ((this.m = b.prev)) this.m.next = null;
          } else (d = b.prev), (i = b.next), (d.next = i), (i.prev = d);
          b.list = b.prev = b.next = null;
          return e;
        },
        sort: function (a, d) {
          var b = this.l,
            j;
          if (!b) return this;
          this.l = this.m = null;
          for (this.length = 0; b; )
            (j = b.next),
              (b.list = b.prev = b.next = null),
              this.addSorted(a, d, b),
              (b = j);
          return this;
        },
        addSorted: function (b, d) {
          var i = arguments,
            j = i.length,
            d = d || this,
            h = 1,
            c,
            l,
            k;
          a: for (; ++h < j; )
            if (
              ((l = i[h]),
              l instanceof a ? l.list && l.list.remove(l) : (l = new a(l)),
              (l.list = this),
              (k = this.l),
              ++this.length === 1)
            )
              this.l = this.m = l;
            else {
              for (; k; ) {
                c = b.call(d, l.data, k.data, l, k);
                if (c <= 0) {
                  l.next = k;
                  k === this.l
                    ? (this.l = k.prev = l)
                    : ((l.prev = k.prev), (l.prev.next = l), (k.prev = l));
                  continue a;
                }
                k = k.next;
              }
              l.prev = this.m;
              this.m = this.m.next = l;
            }
          return this;
        },
        shift: function () {
          var a;
          if (this.length <= 0) return null;
          this.length--;
          a = this.l;
          if (this.l.next) {
            if ((this.l = this.l.next)) this.l.prev = null;
          } else this.l = this.m = null;
          a.list = a.prev = a.next = null;
          return a;
        },
        unshift: function () {
          for (var b = arguments, d = b.length, i, j = -1; ++j < d; )
            (i = b[j]),
              i instanceof a ? i.list && i.list.remove(i) : (i = new a(i)),
              (i.list = this),
              ++this.length === 1
                ? (this.l = this.m = i)
                : ((this.l.prev = i), (i.next = this.l), (this.l = i));
          return this.length;
        },
        next: function (b) {
          b !== void 0 &&
            b !== null &&
            !(b instanceof a) &&
            (b = this.elementOf(b));
          if (!b) return this.l;
          return b.next;
        },
        prev: function (b) {
          b !== void 0 &&
            b !== null &&
            !(b instanceof a) &&
            (b = this.elementOf(b));
          if (!b) return this.m;
          return b.prev;
        },
        push: function () {
          for (var b = arguments, d = b.length, i, j = -1; ++j < d; )
            (i = b[j]),
              i instanceof a ? i.list && i.list.remove(i) : (i = new a(i)),
              (i.list = this),
              ++this.length === 1
                ? (this.l = this.m = i)
                : ((this.m.next = i), (i.prev = this.m), (this.m = i));
          return this.length;
        },
        pop: function () {
          var a = this.m;
          if (!a) return null;
          --this.length === 0
            ? (this.l = this.m = null)
            : ((this.m = this.m.prev), (this.m.next = null));
          a.list = a.prev = a.list = null;
          return a;
        },
        splice: function (b, d) {
          var i = arguments,
            j = i.length,
            h = 1,
            c = this.l,
            l,
            k = [],
            e;
          if (ovi.type(b) !== "number")
            if (b instanceof a) {
              if (((c = b), !c.list === this))
                throw "Invalid index given to LinkedList.splice!";
            } else {
              if (((c = this.elementOf(b)), !c))
                throw "Invalid index given to LinkedList.splice!";
            }
          else if (b >= 0) for (; --b >= 0 && c; ) c = c.next;
          else {
            for (c = this.m; ++b < 0 && c; ) c = c.prev;
            if (!c) c = this.l;
          }
          if (c)
            for (; --d >= 0 && c; ) {
              l = c.next;
              k[k.length] = c;
              if (--this.length === 0) this.l = this.m = c.list = null;
              else if (c === this.l) {
                if ((this.l = c.next)) this.l.prev = null;
                c.next = c.list = null;
              } else
                c === this.m
                  ? ((this.m = c.prev), (this.m.next = c.prev = c.list = null))
                  : ((e = c.prev),
                    (e.next = c.next),
                    (e.next.prev = e),
                    (c.prev = c.next = c.list = null));
              c = l;
            }
          else c = this.m;
          if (!c) c = this.m;
          for (; ++h < j; )
            (e = i[h]) instanceof a
              ? e.list && e.list.remove(e)
              : (e = new a(e)),
              ++this.length === 1
                ? (c = this.l = this.m = e)
                : c === this.m
                ? ((c.next = e), (e.prev = c), (c = this.m = e))
                : ((e.next = c.next),
                  (e.next.prev = e),
                  (e.prev = c),
                  (c = c.next = e));
          return k;
        },
      });
      ovi.extend(a.prototype, { list: null, next: null, prev: null });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.OList");
    (function (f) {
      var e = f.f;
      f.OList = new ovi.Class({
        initialize: function (c) {
          this.X = ovi.Array(c || []);
        },
        qa: function (c, b, a) {
          this.X.splice(b, 0, c);
          if ((c = this.Fa("add", c, b, a)))
            return a && f.Za(), this.Ed(b, c), c;
        },
        add: function (c, b) {
          if (arguments.length < 2) b = this.X.length;
          b !== +b && e();
          this.qa(c, b);
          return this;
        },
        addAll: function (c, b) {
          var a = c.length,
            g = this.X.length,
            d = 0,
            i = Math;
          arguments.length < 2 && (b = g);
          b !== +b && e();
          for (g = b < 0 ? i.max(0, g + b) : i.min(g, b); d < a; d++)
            this.qa(c[d], g + d);
          return this;
        },
        remove: function (c) {
          c = this.indexOf(c);
          return c < 0 ? null : this.removeAt(c);
        },
        removeAll: function (c) {
          for (var b = c.length, a = 0; a < b; a++) this.remove(c[a]);
          return this;
        },
        Ed: function (c, b) {
          var a = this.X.splice(c, 1)[0],
            g;
          if ((g = this.Fa("remove", a, c, b)))
            return b && f.Za(), this.qa(a, c, g), g;
        },
        removeAt: function (c) {
          var b = this.get(c);
          return this.Ed(c) ? null : b;
        },
        clear: function () {
          for (var c = this.X.length; c--; ) this.Ed(c);
        },
        set: function (c, b) {
          var a;
          a = this.get(b);
          if (!this.Ed(b))
            if (this.qa(c, b)) this.qa(a, b);
            else return a;
        },
        indexOf: function (c) {
          return this.X.indexOf(c);
        },
        get: function (c) {
          var b = this.X;
          (c !== +c >>> 0 || c >= b.length) && e();
          return b[c];
        },
        getLength: function () {
          return this.X.length;
        },
        asArray: function () {
          return [].concat(this.X);
        },
        Fa: function (c, b, a, g) {
          var d = this.U,
            i,
            j;
          g || (g = 1 / 0);
          if (d)
            for (j = 0; j in d && j < g; )
              if (d[j++].call(d[j++], this, c, b, a)) {
                i = j;
                break;
              }
          return i;
        },
        addObserver: function (c, b) {
          !f.isFunction(c) && e("callback");
          var a = this.U || (this.U = []),
            g = a.length;
          a[g++] = c;
          b && (a[g] = b);
          a.length = ++g;
        },
        removeObserver: function (c, b) {
          var a,
            g = 0,
            d;
          if ((a = this.U))
            for (d = a.length; g < d; )
              a[g] === c &&
                a[g + 1] === b &&
                (a.splice(g, 2), d === 2 && delete this.U),
                (g += 2);
          return this;
        },
      });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.Point");
    (function (f) {
      var e = Math,
        c = e.abs,
        b = e.sqrt,
        a = e.pow,
        g = e.round,
        d = e.floor,
        i = e.ceil,
        j = e.min,
        h = e.max,
        m = f.f,
        l = (f.Point = function (a, d) {
          this.x = +a;
          this.y = +d;
        });
      ovi.extend(l.prototype, {
        validate: function () {
          return this.x === +this.x && this.y === +this.y;
        },
        equals: function (a) {
          return a && this.x === a.x && this.y === a.y;
        },
        clone: function () {
          return new l(this.x, this.y);
        },
        toString: function () {
          return this.x + ", " + this.y;
        },
        add: function (a) {
          return new l(this.x + a.x, this.y + a.y);
        },
        sub: function (a) {
          return new l(this.x - a.x, this.y - a.y);
        },
        multiply: function (a) {
          return new l(this.x * a, this.y * a);
        },
        divide: function (a) {
          a === 0 && m("divisor can not be Zero");
          return new l(this.x / a, this.y / a);
        },
        modulo: function (a) {
          a === 0 && m("divisor can not be Zero");
          return new l(this.x % a, this.y % a);
        },
        round: function () {
          return new l(g(this.x), g(this.y));
        },
        floor: function () {
          return new l(d(this.x), d(this.y));
        },
        ceil: function () {
          return new l(i(this.x), i(this.y));
        },
        len: function () {
          return b(this.x * this.x + this.y * this.y);
        },
        min: function (a) {
          return new l(j(this.x, a.x), j(this.y, a.y));
        },
        max: function (a) {
          return new l(h(this.x, a.x), h(this.y, a.y));
        },
        span: function (a) {
          return new l(c(this.x - a.x), c(this.y - a.y));
        },
        distance: function (d) {
          return b(a(this.x - d.x, 2) + a(this.y - d.y, 2));
        },
        getNearest: function (a, d) {
          var b = d.x - a.x,
            h = d.y - a.y,
            i;
          i = a;
          if (b || h)
            (i = ((this.x - a.x) * b + (this.y - a.y) * h) / (b * b + h * h)),
              (i = i <= 0 ? a : i >= 1 ? d : new l(a.x + i * b, a.y + i * h));
          return i;
        },
        ld: function (a, d, b) {
          return a >= d - b && a <= d + b;
        },
        ze: function (a, d, b, h) {
          h = h || 0;
          return (d - h <= a && b + h >= a) || (d + h >= a && b - h <= a);
        },
        eh: function (d, h, i, c, j, g) {
          return b(
            a((d - j) * (c - g) - (h - g) * (i - j), 2) /
              (a(i - j, 2) + a(c - g, 2))
          );
        },
        isCoveredBy: function (a, d, b) {
          for (
            var h = this.x,
              i = this.y,
              c = a.length,
              j = c,
              g,
              l,
              m,
              e = a[0],
              f,
              E = 0,
              G = 0,
              L = d / 2 || 0,
              F = b ? 1 : 3;
            f != "V" && j > F;

          ) {
            g = a[--j];
            d = a[--j];
            m = a[j ? j - 1 : (c + (j - 1)) % c];
            l = a[j ? j - 2 : (c + (j - 2)) % c];
            if (
              (this.ld(d, h, L) && this.ld(g, i, L)) ||
              (this.ld(l, h, L) && this.ld(m, i, L))
            )
              f = "V";
            else if (!f && d === h)
              (l === h && ((g < i && m > i) || (g > i && m < i))) ||
                (((e <= h && l > h) || (e >= h && l < h)) &&
                  (g >= i ? ++E : ++G)),
                (f =
                  this.ze(i, g, m, L) && this.eh(h, i, d, g, l, m) <= L && "E");
            else if (!f && this.ze(h, d, l, L)) {
              if ((d < h && l > h) || (d > h && l < h))
                (e = g + (m - g) * ((h - d) / (l - d))),
                  (E += e > i),
                  (G += e < i);
              f = this.ze(i, g, m, L) && this.eh(h, i, d, g, l, m) <= L && "E";
            }
            e = d;
          }
          return (b && f === "S" && f) || f || (b && G && E % 2 && "S") || !1;
        },
      });
      l.fromObject = function (a) {
        var d, b;
        return a instanceof l
          ? a
          : a &&
            (("x" in a && "y" in a && ((d = a.x), (b = a.y), 1)) ||
              (a.length === 2 && ((d = a[0]), (b = a[1]), 1)))
          ? new l(d, b)
          : null;
      };
      l.prototype.toString = function () {
        return this.x + ", " + this.y;
      };
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.Rectangle");
    (function (f) {
      var e = Math.max,
        c = f.Point,
        b = (f.Rectangle = function (a) {
          for (
            var b = a.length,
              d = (this.topLeft = a[0].clone()),
              i = (this.bottomRight = d.clone()),
              c,
              h;
            --b >= 0;

          ) {
            h = (c = a[b]).x;
            c = c.y;
            if (h < d.x) d.x = h;
            else if (h > i.x) i.x = h;
            if (c < d.y) d.y = c;
            else if (c > i.y) i.y = c;
          }
          return this;
        });
      ovi.extend(b.prototype, {
        equals: function (a) {
          var b, d, i, c;
          return (
            !!a &&
            (b = this.topLeft).x === (i = a.topLeft).x &&
            b.y === i.y &&
            (d = this.bottomRight).x === (c = a.bottomRight).x &&
            d.y === c.y
          );
        },
        addPoint: function (a) {
          return new b([this.topLeft, this.bottomRight, a]);
        },
        addPoints: function (a) {
          return a.length
            ? new b(a.concat(this.topLeft, this.bottomRight))
            : this;
        },
        getCenter: function () {
          var a = this.topLeft,
            b = this.bottomRight;
          return new c((a.x + b.x) / 2, (a.y + b.y) / 2);
        },
        centerTo: function (a) {
          var g = this.bottomRight,
            d = a.span(this.topLeft),
            i = a.span(g),
            g = e(d.x, i.x),
            d = e(d.y, i.y);
          return new b([new c(a.x - g, a.y - d), new c(a.x + g, a.y + d)]);
        },
        intersection: function (a) {
          var c, d;
          return a &&
            (c = this.topLeft.max(a.topLeft || a)).x <=
              (d = this.bottomRight.min(a.bottomRight || a)).x &&
            c.y <= d.y
            ? new b([c, d])
            : null;
        },
        merge: function (a) {
          return a
            ? new b([
                this.topLeft.min(a.topLeft || a),
                this.bottomRight.max(a.bottomRight || a),
              ])
            : this.clone();
        },
        pad: function (a) {
          return a
            ? new b([
                this.topLeft.sub(new c(a, a)),
                this.bottomRight.add(new c(a, a)),
              ])
            : this.clone();
        },
        getWidth: function () {
          return this.bottomRight.x - this.topLeft.x;
        },
        getHeight: function () {
          return this.bottomRight.y - this.topLeft.y;
        },
        toString: function () {
          return "{ " + this.topLeft + ", " + this.bottomRight + " }";
        },
        contains: function (a) {
          if (a)
            var b = this.topLeft,
              d = this.bottomRight,
              i = (i = a.topLeft || a),
              c = a.bottomRight || a;
          return !!a && b.x <= i.x && b.y <= i.y && d.x >= c.x && d.y >= c.y;
        },
        clone: function () {
          return new b([this.topLeft, this.bottomRight]);
        },
        initialize: b,
      });
      b.prototype.toString = function () {
        return "{ " + this.topLeft + ", " + this.bottomRight + " }";
      };
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.RTreeNode");
    (function (f) {
      var e = Math.max,
        c = Math.min;
      f.RTreeNode = new ovi.Class({
        initialize: function (b, a) {
          this.Leaf = b;
          this.ParentNode = a || null;
          this.Entries = [];
        },
        Leaf: null,
        Root: null,
        ParentNode: null,
        ParentEntry: null,
        Entries: null,
        X1: 0,
        X2: 0,
        Y1: 0,
        Y2: 0,
        Volume: null,
        addChild: function (b) {
          this.Entries.push(b);
          this.Leaf = !1;
          b.ParentNode = this;
          b.ParentEntry = this.Entries.length - 1;
          this.updateBoundingBox(b.X1, b.X2, b.Y1, b.Y2);
        },
        removeChild: function (b, a) {
          for (
            var c = this.Entries, d = c.splice(b, 1)[0], i = b, j = c.length;
            i < j;
            i++
          )
            c[i].ParentEntry--;
          (!f.isBoolean(a) || a != !1) && this.calculateBoundingBox();
          return d;
        },
        calculateBoundingBox: function () {
          this.X1 = Infinity;
          this.X2 = -Infinity;
          this.Y1 = Infinity;
          this.Y2 = -Infinity;
          this.Z1 = Infinity;
          this.Z2 = -Infinity;
          for (var b = 0, a = this.Entries.length; b < a; b++) {
            if (this.Entries[b].X1 < this.X1) this.X1 = this.Entries[b].X1;
            if (this.Entries[b].Y1 < this.Y1) this.Y1 = this.Entries[b].Y1;
            if (this.Entries[b].Z1 < this.Z1) this.Z1 = this.Entries[b].Z1;
            if (this.Entries[b].X2 > this.X2) this.X2 = this.Entries[b].X2;
            if (this.Entries[b].Y2 > this.Y2) this.Y2 = this.Entries[b].Y2;
            if (this.Entries[b].Z2 > this.Z2) this.Z2 = this.Entries[b].Z2;
          }
          this.Volume =
            (this.X2 - this.X1) * (this.Y2 - this.Y1) * (this.Z2 - this.Z1);
        },
        updateBoundingBox: function (b, a, g, d) {
          this.Volume === null
            ? ((this.X1 = b), (this.X2 = a), (this.Y1 = g), (this.Y2 = d))
            : ((this.X1 = c(b, this.X1)),
              (this.X2 = e(a, this.X2)),
              (this.Y1 = c(g, this.Y1)),
              (this.Y2 = e(d, this.Y2)));
          this.Volume = (this.X2 - this.X1) * (this.Y2 - this.Y1);
        },
        getEnlargement: function (b, a, g, d) {
          return (
            (e(this.X2, a) - c(this.X1, b)) * (e(this.Y2, d) - c(this.Y1, g)) -
            this.Volume
          );
        },
        overlaps: function (b, a, c, d) {
          return b < this.X2 && a > this.X1 && c < this.Y2 && d > this.Y1;
        },
      });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.RTreeRecord");
    (function (f) {
      var e = Math.max,
        c = Math.min,
        b = (f.RTreeRecord = new ovi.Class({
          initialize: function (a, b, d, i) {
            var c;
            a > d && ((c = a), (a = d), (d = c));
            b > i && ((c = b), (b = i), (i = c));
            this.X1 = a || 0;
            this.Y1 = b || 0;
            this.X2 = d || 0;
            this.Y2 = i || 0;
          },
          Id: null,
          X1: 0,
          X2: 0,
          Y1: 0,
          Y2: 0,
          Volume: null,
          Leaf: !0,
          Priority: 32,
          getEnlargement: function (a, b, d, i) {
            return (
              (e(this.X2, b) - c(this.X1, a)) *
                (e(this.Y2, i) - c(this.Y1, d)) -
              this.Volume
            );
          },
          overlaps: function (a, c, d, i) {
            if (a instanceof b)
              (i = a), (a = i.X1), (c = i.X2), (d = i.Y1), (i = i.Y2);
            return a < this.X2 && c > this.X1 && d < this.Y2 && i > this.Y1;
          },
        }));
    })(nokia.maps.util);
    ovi.provide("ovi.Logger");
    (function (f) {
      function e(a, c) {
        for (var d = b.length - 1; d > -1; --d)
          try {
            b[d][a].apply(b[d], c);
          } catch (i) {}
      }
      var c = !0,
        b = [];
      f.Logger = {
        addLogger: function (a) {
          if (
            a === null ||
            typeof a !== "object" ||
            typeof a.debug !== "function" ||
            typeof a.info !== "function" ||
            typeof a.warn !== "function" ||
            typeof a.error !== "function"
          )
            throw new TypeError("Illegal logger object");
          for (var c = b.length - 1; c > -1; --c)
            if (b[c] === a)
              return e("warn", ["The logger is already attached"]), !1;
          typeof a.initLogger === "function" && a.initLogger();
          b.push(a);
          return !0;
        },
        removeLogger: function (a) {
          for (var c = b.length - 1; c > -1; --c)
            if (b[c] === a)
              return (
                b.splice(c, 1),
                typeof a.cleanupLogger === "function" && a.cleanupLogger(),
                !0
              );
          e("warn", ["The passed logger wasn't attached"]);
          return !1;
        },
        removeAllLoggers: function () {
          var a = b;
          b = [];
          for (var c = a.length - 1; c > -1; --c)
            if (typeof a[c].cleanupLogger === "function")
              try {
                a[c].cleanupLogger();
              } catch (d) {}
        },
        isEnabled: function () {
          return c;
        },
        enable: function () {
          c = !0;
        },
        disable: function () {
          c = !1;
        },
        debug: function () {
          c && e("debug", arguments);
        },
        info: function () {
          c && e("info", arguments);
        },
        warn: function () {
          c && e("warn", arguments);
        },
        error: function () {
          c && e("error", arguments);
        },
      };
      f.debug = function () {
        f.Logger.debug.apply(this, arguments);
      };
      f.info = function () {
        f.Logger.info.apply(this, arguments);
      };
      f.warn = function () {
        f.Logger.warn.apply(this, arguments);
      };
      f.error = function () {
        f.Logger.error.apply(this, arguments);
      };
    })(ovi);
    ovi.provide("nokia.maps.util.Vector3D");
    (function (f) {
      var e = Math,
        c = f.f,
        b = e.sqrt,
        a = e.acos,
        g = 180 / Math.PI,
        d = (f.Vector3D = function (a, d, b) {
          this.x = +a;
          this.y = +d;
          this.z = +b;
        });
      ovi.extend(d.prototype, {
        add: function (a) {
          return new d(this.x + a.x, this.y + a.y, this.z + a.z);
        },
        subtract: function (a) {
          return new d(this.x - a.x, this.y - a.y, this.z - a.z);
        },
        multiply: function (a) {
          a instanceof d ||
            c("Parameter should be an instanceof nokia.maps.util.Vector3D");
          return new d(this.x * a.x, this.y * a.y, this.z * a.z);
        },
        divide: function (a) {
          (a.x === 0 || a.y === 0 || a.z === 0) &&
            c("Vectors should not be divided by zero");
          return new d(this.x / a.x, this.y / a.y, this.z / a.z);
        },
        angle: function (d, c, h, m) {
          d = +d || 0;
          h = h ? d - this.x : this.x - d;
          d = m ? d - this.y : this.y - (+c || 0);
          d = !h && !d ? 0 : a(d / b(h * h + d * d)) * g;
          h < 0 && (d = 360 - d);
          return d;
        },
        dot: function (a) {
          a = this.multiply(a);
          return a.x + a.y + a.z;
        },
        magnitude: function () {
          return b(this.dot(this));
        },
        normal: function (a) {
          var b = this.x,
            h = this.y,
            c = this.z,
            l = a.x,
            k = a.y,
            a = a.z;
          return new d(h * a - c * k, -(b * a - c * l), b * k - h * l);
        },
        normalize: function () {
          var a = this.magnitude();
          return new d(this.x / a, this.y / a, this.z / a);
        },
      });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.Matrix3D");
    (function (f) {
      var e = Math,
        c = e.sqrt,
        b = e.sin,
        a = e.cos,
        g = e.tan,
        d = f.Point,
        i = f.Vector3D,
        j = (f.Matrix3D = function (a) {
          this.rows = a || [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
          ];
        });
      ovi.extend(j.prototype, {
        Da: function (a) {
          for (
            var d = this.rows,
              b = [[], [], []],
              i = a[0],
              c = a[1],
              a = a[2],
              g,
              e,
              f,
              r,
              s,
              w = 3;
            w--;

          )
            (g = b[w]),
              (e = d[w]),
              (f = e[0]),
              (r = e[1]),
              (s = e[2]),
              (g[0] = f * i[0] + r * c[0] + s * a[0]),
              (g[1] = f * i[1] + r * c[1] + s * a[1]),
              (g[2] = f * i[2] + r * c[2] + s * a[2]),
              (g[3] = f * i[3] + r * c[3] + s * a[3] + e[3]);
          return new j(b);
        },
        concat: function (a) {
          return this.Da(a.rows);
        },
        scale: function (a, d, b) {
          return this.Da([
            [a, 0, 0, 0],
            [0, d, 0, 0],
            [0, 0, b, 0],
          ]);
        },
        getScale: function () {
          var a = this.rows[0],
            d = this.rows[1],
            b = this.rows[2];
          return new i(
            c(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]),
            c(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]),
            c(b[0] * b[0] + b[1] * b[1] + b[2] * b[2])
          );
        },
        translate: function (a, d, b) {
          return this.Da([
            [1, 0, 0, a],
            [0, 1, 0, d],
            [0, 0, 1, b],
          ]);
        },
        getTranslate: function () {
          return new i(this.rows[0][3], this.rows[1][3], this.rows[2][3]);
        },
        rotateX: function (d) {
          var i = b(d),
            d = a(d);
          return this.Da([
            [1, 0, 0, 0],
            [0, d, i, 0],
            [0, -i, d, 0],
          ]);
        },
        rotateY: function (d) {
          var i = b(d),
            d = a(d);
          return this.Da([
            [d, 0, -i, 0],
            [0, 1, 0, 0],
            [i, 0, d, 0],
          ]);
        },
        rotateZ: function (d) {
          var i = b(d),
            d = a(d);
          return this.Da([
            [d, i, 0, 0],
            [-i, d, 0, 0],
            [0, 0, 1, 0],
          ]);
        },
        skewX: function (a) {
          return this.Da([
            [1, g(a), 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
          ]);
        },
        skewY: function (a) {
          return this.Da([
            [1, 0, 0, 0],
            [g(a), 1, 0, 0],
            [0, 0, 1, 0],
          ]);
        },
        transformVector: function (a) {
          var d = this.rows,
            b = d[0],
            c = d[1],
            d = d[2],
            j = a.x,
            g = a.y,
            a = a.z;
          return new i(
            b[0] * j + b[1] * g + b[2] * a + b[3],
            c[0] * j + c[1] * g + c[2] * a + c[3],
            d[0] * j + d[1] * g + d[2] * a + d[3]
          );
        },
        transformPoint: function (a) {
          var b = this.rows,
            i = b[0],
            b = b[1],
            c = a.x,
            a = a.y;
          return new d(i[0] * c + i[1] * a + i[3], b[0] * c + b[1] * a + b[3]);
        },
        transformVectors: function (a, d) {
          var b = this.rows,
            i = b[0],
            c = b[1],
            b = b[2],
            j,
            g,
            e,
            f,
            s = a.length;
          for (f = 0; f < s; )
            (j = +a[f++]),
              (g = +a[f++]),
              (e = +a[f++]),
              d.splice.apply(d, [
                d.length,
                0,
                i[0] * j + i[1] * g + i[2] * e + i[3],
                c[0] * j + c[1] * g + c[2] * e + c[3],
                b[0] * j + b[1] * g + b[2] * e + b[3],
              ]);
        },
        transformPoints: function (a, d) {
          var b = this.rows,
            i = b[0],
            b = b[1],
            c,
            j,
            g,
            e = a.length;
          for (g = 0; g < e; )
            (c = +a[g++]),
              (j = +a[g++]),
              d.splice.apply(d, [
                d.length,
                0,
                i[0] * c + i[1] * j + i[3],
                b[0] * c + b[1] * j + b[3],
              ]);
        },
        clone: function () {
          for (var a = this.rows, d = [], b = -1; ++b < 3; )
            d.push([].concat(a[b]));
          return ovi.extend(new j(d), this);
        },
      });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.clipping");
    (function () {
      var f = Math.sqrt,
        e = Math.random,
        c = (nokia.maps.util.clipping = {
          INTERSECTION: 0,
          UNION: 1,
          COMPONENT_SHAPE: 2,
          COMPONENT_WINDOW: 3,
          Kl: function (b) {
            var a = 1,
              c = 1;
            switch (~~(1 * b)) {
              case 1:
                c = a = 0;
                break;
              case 2:
                a = 0;
                c = 1;
                break;
              case 3:
                (a = 1), (c = 0);
            }
            return { pS: a, pC: c };
          },
          create: function (b, a, c, d, i, j, h, m, l, k) {
            var e = {};
            e.x = b;
            e.y = a;
            e.next = c;
            if ((e.prev = d)) e.prev.next = e;
            if (c) e.next.prev = e;
            e.nextPoly = i;
            e.neighbor = j;
            e.intersect = h;
            e.entry = m;
            e.visited = l;
            e.alpha = k;
            return e;
          },
          pd: function (b) {
            for (; b && b.intersect; ) b = b.next;
            return b;
          },
          De: function (b) {
            if (b) for (; b.next; ) b = b.next;
            return b;
          },
          Dl: function (b) {
            var a = b;
            if (a) {
              do a = a.next;
              while (a != b && (!a.intersect || (a.intersect && a.visited)));
            }
            return a;
          },
          xg: function (b) {
            var a = c.De(b);
            a.prev.next = b;
            b.prev = a.prev;
          },
          dist: function (b, a, c, d) {
            return f((b - c) * (b - c) + (a - d) * (a - d));
          },
          intersect: function (b, a, g, d, i) {
            function j() {
              h = b.x + l * (a.x - b.x);
              m = b.y + l * (a.y - b.y);
              n = c.dist(b.x, b.y, h, m) / c.dist(b.x, b.y, a.x, a.y);
              f = c.dist(g.x, g.y, h, m) / c.dist(g.x, g.y, d.x, d.y);
              o = 1 * h;
              q = 1 * m;
              i.alpha_p = n;
              i.alpha_q = f;
              i.xi = o;
              i.yi = q;
            }
            var h, m, l, k, n, f, o, q;
            k = (a.x - b.x) * (d.y - g.y) - (a.y - b.y) * (d.x - g.x);
            if (
              !k &&
              ((b.origx = b.x),
              (b.origy = b.y),
              (b.x += (e() - 0.5) / 1e4),
              (b.y += (e() - 0.5) / 1e4),
              (k = (a.x - b.x) * (d.y - g.y) - (a.y - b.y) * (d.x - g.x)),
              !k)
            )
              return 0;
            l = ((g.x - b.x) * (d.y - g.y) - (g.y - b.y) * (d.x - g.x)) / k;
            k = ((a.y - b.y) * (g.x - b.x) - (a.x - b.x) * (g.y - b.y)) / k;
            if (l < 0 || l > 1 || k < 0 || k > 1) return 0;
            j();
            if (n == 0 && f >= 0 && f <= 1) {
              if (!b.origx) (b.origx = b.x), (b.origy = b.y);
              b.x += (e() - 0.5) / 1e4;
              b.y += (e() - 0.5) / 1e4;
              j();
            }
            return 1;
          },
          mi: function (b, a) {
            var g,
              d,
              i = 0,
              j;
            c.create(0, b.y, null, null, null, null, 0, 0, 0, 0);
            d = c.create(-2147483648, b.y, null, null, null, null, 0, 0, 0, 0);
            for (g = a; g.next; g = g.next)
              (j = c.intersect(d, b, g, g.next, {})) && i++;
            return i % 2;
          },
          sb: function (b, a, c) {
            for (; a != c && a.alpha < b.alpha; ) a = a.next;
            b.next = a;
            b.prev = a.prev;
            b.next.prev = b;
            b.prev.next = b;
          },
          clip: function (b, a, g) {
            var d, i, j, h, m, l, k;
            l = {};
            d = c.Kl(g);
            var g = d.pS,
              e = d.pC,
              f;
            if (a && b) {
              d = c.De(a);
              c.create(a.x, a.y, null, d, null, null, 0, 0, 0, 0);
              i = c.De(b);
              c.create(b.x, b.y, null, i, null, null, 0, 0, 0, 0);
              for (d = a; d.next; d = d.next)
                if (!d.intersect)
                  for (i = b; i.next; i = i.next)
                    if (
                      !i.intersect &&
                      (j = c.intersect(d, c.pd(d.next), i, c.pd(i.next), l))
                    )
                      (j = l.alpha_p),
                        (k = l.alpha_q),
                        (h = l.xi),
                        (m = l.yi),
                        (j = c.create(
                          h,
                          m,
                          null,
                          null,
                          null,
                          null,
                          1,
                          0,
                          0,
                          j
                        )),
                        (h = c.create(
                          h,
                          m,
                          null,
                          null,
                          null,
                          null,
                          1,
                          0,
                          0,
                          k
                        )),
                        (j.neighbor = h),
                        (h.neighbor = j),
                        c.sb(j, d, c.pd(d.next)),
                        c.sb(h, i, c.pd(i.next));
              l = c.mi(a, b);
              g && (l = 1 - l);
              for (d = a; d.next; d = d.next)
                if (d.intersect) (d.entry = l), (l = 1 - l);
              l = c.mi(b, a);
              e && (l = 1 - l);
              for (i = b; i.next; i = i.next)
                if (i.intersect) (i.entry = l), (l = 1 - l);
              c.xg(a);
              for (c.xg(b); (b = c.Dl(a)) != a; ) {
                for (g = null; !b.visited; b = b.neighbor)
                  for (l = b.entry; ; )
                    if (
                      ((g = c.create(
                        b.x,
                        b.y,
                        g,
                        null,
                        null,
                        null,
                        0,
                        0,
                        0,
                        0
                      )),
                      (b.visited = 1),
                      (b = l ? b.next : b.prev),
                      b.intersect)
                    ) {
                      b.visited = 1;
                      break;
                    }
                g.nextPoly = f;
                f = g;
              }
              return f;
            }
          },
          Tn: function (b) {
            b
              ? console.log(
                  b.intersect ? "I" : " ",
                  b.entry ? "E" : " ",
                  b.visited ? "X" : " ",
                  "(",
                  b.origx ? b.origx : b.x,
                  ",",
                  b.origy ? b.origy : b.y,
                  ")",
                  "alpha:",
                  b.alpha,
                  "point:",
                  b,
                  "neighbor:",
                  b.neighbor,
                  "nextPoly:",
                  b.nextPoly
                )
              : console.log("NULL");
          },
          hu: function (b) {
            var a = b;
            if (a) {
              do c.Tn(a), (a = a.next);
              while (a && a != b);
            }
          },
          prepareList: function (b) {
            for (var a, g, d = 0, i = b.length; d < i; d++) {
              a = c.create(b[d].x, b[d].y, g, null, null, null, 0, 0, 0, 0);
              if ((a.next = g)) g.prev = a;
              g = a;
            }
            return g;
          },
        });
    })();
    ovi.provide("nokia.maps.util.IBox");
    ovi.provide("nokia.maps.gfx.Color");
    (function () {
      var f = Math,
        e = f.round,
        c = f.min,
        b = f.max,
        a = ovi.type,
        g = RegExp(
          "^\\s*(maroon|red|orange|yellow|olive|purple|fuchsia|white|lime|green|navy|blue|aqua|teal|black|silver|gray)\\s*$|^\\s*[#]?([0-9a-f]{8,8})\\s*$|^\\s*[#]?([0-9a-f]{6,6})\\s*$|^\\s*[#]?([0-9a-f]{4,4})\\s*$|^\\s*[#]?([0-9a-f]{3,3})\\s*$|^\\s*(rgb[a]?)\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,?\\s*(\\d*[.]{0,1}\\d*)?\\s*\\)\\s*$",
          "i"
        ),
        d = {
          maroon: "800000",
          red: "ff0000",
          orange: "ffa500",
          yellow: "ffff00",
          olive: "808000",
          purple: "800080",
          fuchsia: "ff00ff",
          white: "ffffff",
          lime: "00ff00",
          green: "008000",
          navy: "000080",
          blue: "0000ff",
          aqua: "00ffff",
          teal: "008080",
          black: "000000",
          silver: "c0c0c0",
          gray: "808080",
        },
        i = (nokia.maps.gfx.Color = new ovi.Class({
          Statics: {
            byteOf: function (a) {
              return e(+a * 255) & 255;
            },
            percentOf: function (a) {
              a = +a * 0.003921569;
              return a > 1 ? 1 : a < 0 ? 0 : a;
            },
            compress: function (a, d, b, i) {
              return (
                ((+a & 255) << 24) |
                ((+d & 255) << 16) |
                ((+b & 255) << 8) |
                (+i & 255)
              );
            },
            red: function (a) {
              return +a >>> 24;
            },
            green: function (a) {
              return (+a >>> 16) & 255;
            },
            blue: function (a) {
              return (+a >>> 8) & 255;
            },
            alpha: function (a) {
              return +a & 255;
            },
            parseCss: function (j, h) {
              var m = a(h) === "number" ? e(h * 255) & 255 : 255,
                l = m.toString(16).toLowerCase(),
                k,
                n,
                f,
                o = g.exec(j);
              if (!o || o.length < 2) return null;
              l.length < 2 && (l = "0" + l);
              if (o[1]) n = d[o[1]] + l;
              else if (o[2]) n = o[2];
              else if (o[3]) n = o[3] + l;
              else if ((k = o[4]) || (k = o[5]))
                n =
                  k.charAt(0) +
                  k.charAt(0) +
                  k.charAt(1) +
                  k.charAt(1) +
                  k.charAt(2) +
                  k.charAt(2) +
                  (k.length === 4 ? k.charAt(3) + k.charAt(3) : l);
              else if (o[6])
                return (
                  (l = +o[7] & 255),
                  (k = +o[8] & 255),
                  (n = +o[9] & 255),
                  (f = isNaN((f = c(1, b(0, o[10])))) ? m : i.byteOf(f) & 255),
                  i.compress(l, k, n, f)
                );
              if (n && n.length === 8)
                return parseInt("0x" + n, 16) & 4294967295;
              return null;
            },
            getCssRGBA: function (a) {
              return i.getCssRGB(a, !0);
            },
            getCssRGB: function (a, d) {
              return (
                "rgb" +
                (d = d === !0 ? "a" : "") +
                "(" +
                i.red(a) +
                ", " +
                i.green(a) +
                ", " +
                i.blue(a) +
                (d ? ", " + e(i.percentOf(i.alpha(a)) * 1e10) / 1e10 : "") +
                ")"
              );
            },
            getCssHex: function (d, b, i) {
              d = +d;
              (b = a(b) === "boolean" ? b : !1) || (d >>>= 8);
              d < 0 && (d = 4294967296 + d);
              i = i || "#";
              d = d.toString(16);
              for (b = b ? 8 : 6; d.length < b; ) d = "0" + d;
              return i + d;
            },
          },
        }));
    })();
    ovi.provide("nokia.maps.util.Brush");
    (function (f) {
      var e = nokia.maps.gfx.Color;
      f.Brush = new ovi.Class({
        color: "#05A6",
        fill: "solid",
        initialize: function (c, b) {
          var a,
            g,
            d = f.f;
          c &&
            ("color" in c &&
              ((a = e.parseCss(c.color)),
              a === null && d("Invalid color set!")),
            "fill" in c &&
              c.fill !== "solid" &&
              c.fill !== "none" &&
              d("Invalid fill set!"));
          if (b instanceof nokia.maps.util.Brush) for (g in b) this[g] = b[g];
          for (g in c) this[g] = c[g];
        },
      });
    })(nokia.maps.util);
    ovi.provide("ovi.dom.common");
    ovi.dom.addEvent = function (f, e, c, b) {
      f.addEventListener
        ? f.addEventListener(e, c, b !== void 0 ? b : !1)
        : f.attachEvent && f.attachEvent("on" + e, c);
    };
    ovi.dom.removeEvent = function (f, e, c, b) {
      f.removeEventListener
        ? f.removeEventListener(e, c, b !== void 0 ? b : !1)
        : f.detachEvent && f.detachEvent("on" + e, c);
    };
    ovi.dom.addClass = function (f) {
      for (
        var e = Array.prototype.slice.call(arguments, 1),
          c = f.className,
          b = " " + c + " ",
          a = 0,
          g;
        (g = e[a++]);

      )
        b.indexOf(" " + g + " ") === -1 && (c += (c ? " " : "") + g);
      return (f.className = c);
    };
    ovi.dom.removeClass = function (f) {
      for (
        var e = Array.prototype.slice.call(arguments, 1),
          c = f.className.split(" "),
          b = 0,
          a = 0,
          g = c.length,
          d;
        (d = e[b++]);

      )
        for (a = g; a--; ) d === c[a] && c.splice(a, 1);
      return (f.className = c.join(" "));
    };
    ovi.dom.hasClass = function (f) {
      for (
        var e = Array.prototype.slice.call(arguments, 1),
          c = " " + f.className + " ",
          b = e.length,
          a = 0,
          g;
        b && (g = e[a++]);

      )
        b = c.indexOf(" " + g + " ") > -1;
      return b;
    };
    ovi.dom.toggleClass = function (f) {
      for (
        var e = Array.prototype.slice.call(arguments, 1),
          c = " " + f.className + " ",
          b,
          a = 0,
          g = e.length;
        a < g;
        a++
      )
        (b = e[a]),
          (c.indexOf(" " + b + " ") > -1
            ? ovi.dom.removeClass
            : ovi.dom.addClass)(f, b);
    };
    ovi.dom.offset = function (f, e) {
      var c = f.getBoundingClientRect(),
        b = f.ownerDocument,
        a = b.documentElement,
        g = b.body,
        b = c.top + (a.scrollTop || g.scrollTop) - a.clientTop,
        c = c.left + (a.scrollLeft || g.scrollLeft) - a.clientLeft;
      e && ((a = ovi.dom.offset(e)), (b -= a.top), (c -= a.left));
      return { top: b, left: c };
    };
    ovi.dom.dimensions = function (f) {
      if ("scrollTo" in f && f.document)
        return (
          (f = f.document.documentElement),
          { width: f.clientWidth, height: f.clientHeight }
        );
      return { width: f.offsetWidth, height: f.offsetHeight };
    };
    ovi.dom.getStyle = function () {
      if (window.getComputedStyle) {
        var f = ["moz", "ms", "webkit"];
        ovi.dom.getStyle = function (b, a) {
          var c = b.ownerDocument.defaultView;
          if (!c) return null;
          var c = c.getComputedStyle(b, null),
            d = c.getPropertyValue(a);
          if (d) return d;
          for (var i = 0, j = f.length; i < j; i++)
            if ((d = c.getPropertyValue("-" + f[i] + "-" + a))) return d;
          return null;
        };
      } else {
        var e = /-([a-z])/gi,
          c = function (b, a) {
            return a.toUpperCase();
          };
        ovi.dom.getStyle = function (b, a) {
          a = a === "float" ? "styleFloat" : a.replace(e, c);
          return (
            b.currentStyle[a] ||
            b.currentStyle["Ms" + a.charAt(0).toUpperCase() + a.slice(1)] ||
            null
          );
        };
      }
      return ovi.dom.getStyle.apply(null, arguments);
    };
    ovi.provide("nokia.maps.advsearch._packaging.base");
    ovi.provide("nokia.maps.map.component.Component");
    nokia.maps.map.component.Component = new ovi.Class({
      Extends: nokia.maps.util.OObject,
      getId: function () {
        if (window) return this.d;
      },
      getVersion: function () {
        return this.A;
      },
      queryReference: function () {
        this.Th++;
        return this;
      },
      releaseReference: function () {
        return --this.Th;
      },
      attach: function (f) {
        if (this.mapDisplay)
          throw "Error: A component can only be attached to one display!";
        this.mapDisplay = f;
      },
      detach: function () {
        delete this.mapDisplay;
      },
      destroy: nokia.maps.util.Q,
      Th: 1,
    });
    (function (f) {
      function e(c) {
        ovi.warn(
          "There is no UI defined for the display. Are you missing the UI package?"
        );
        var b = new f.Component();
        b.d = c + "Dummy";
        b.A = "0";
        return b;
      }
      f.Overview = function () {
        return e("Overview");
      };
      f.TypeSelector = function () {
        return e("TypeSelector");
      };
      f.DistanceMeasurement = function () {
        return e("DistanceMeasurement");
      };
      f.InfoBubbles = function () {
        return e("InfoBubbles");
      };
      f.RightClick = function () {
        return e("RightClick");
      };
      f.ScaleBar = function () {
        return e("ScaleBar");
      };
      f.ViewControl = function () {
        return e("ViewControl");
      };
      f.ZoomBar = function () {
        return e("ZoomBar");
      };
      f.ZoomRectangle = function () {
        return e("ZoomRectangle");
      };
      f.OverlaysSelector = function () {
        return e("OverlaysSelector");
      };
    })(nokia.maps.map.component);
    ovi.provide("nokia.maps.advrouting._packaging.base");
    ovi.provide("nokia.maps.routing._packaging.base");
    ovi.provide("nokia.maps.positioning._packaging.base");
    ovi.provide("ovi.json");
    (function () {
      function f(c, b) {
        if (typeof b === "string") {
          var a =
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.(\d{3}))?Z$/.exec(
              b
            );
          if (a)
            return new Date(
              Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6], +a[8] || 0)
            );
        }
        return b;
      }
      var e = window.JSON || {};
      window.JSON ||
        (function () {
          function c(a) {
            return a < 10 ? "0" + a : a;
          }
          function b(a) {
            d.lastIndex = 0;
            return d.test(a)
              ? '"' +
                  a.replace(d, function (a) {
                    var d = h[a];
                    return typeof d === "string"
                      ? d
                      : "\\u" +
                          ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                  }) +
                  '"'
              : '"' + a + '"';
          }
          function a(d, h) {
            var g,
              e,
              f,
              r,
              s = i,
              w,
              u = h[d];
            u &&
              typeof u === "object" &&
              ((g = Object.prototype.toString.apply(u)),
              g === "[object Date]"
                ? (u =
                    u.getUTCFullYear() +
                    "-" +
                    c(u.getUTCMonth() + 1) +
                    "-" +
                    c(u.getUTCDate()) +
                    "T" +
                    c(u.getUTCHours()) +
                    ":" +
                    c(u.getUTCMinutes()) +
                    ":" +
                    c(u.getUTCSeconds()) +
                    "Z")
                : l.test(g) && (u = u.valueOf()));
            typeof m === "function" && (u = m.call(h, d, u));
            switch (typeof u) {
              case "string":
                return b(u);
              case "number":
                return isFinite(u) ? String(u) : "null";
              case "boolean":
              case "null":
                return String(u);
              case "object":
                if (!u) return "null";
                i += j;
                w = [];
                if (Object.prototype.toString.apply(u) === "[object Array]") {
                  r = u.length;
                  for (g = 0; g < r; g += 1) w[g] = a(g, u) || "null";
                  f =
                    w.length === 0
                      ? "[]"
                      : i
                      ? "[\n" + i + w.join(",\n" + i) + "\n" + s + "]"
                      : "[" + w.join(",") + "]";
                  i = s;
                  return f;
                }
                if (m && typeof m === "object") {
                  r = m.length;
                  for (g = 0; g < r; g += 1)
                    (e = m[g]),
                      typeof e === "string" &&
                        (f = a(e, u)) &&
                        w.push(b(e) + (i ? ": " : ":") + f);
                } else
                  for (e in u)
                    Object.hasOwnProperty.call(u, e) &&
                      (f = a(e, u)) &&
                      w.push(b(e) + (i ? ": " : ":") + f);
                f =
                  w.length === 0
                    ? "{}"
                    : i
                    ? "{\n" + i + w.join(",\n" + i) + "\n" + s + "}"
                    : "{" + w.join(",") + "}";
                i = s;
                return f;
            }
          }
          var g =
              /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            d =
              /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            i,
            j,
            h = {
              "\u0008": "\\b",
              "\t": "\\t",
              "\n": "\\n",
              "\u000c": "\\f",
              "\r": "\\r",
              '"': '\\"',
              "\\": "\\\\",
            },
            m,
            l = /\[object (String|Number|Boolean)\]/;
          if (typeof e.stringify !== "function")
            e.stringify = function (d, b, h) {
              var c;
              j = i = "";
              if (typeof h === "number") for (c = 0; c < h; c += 1) j += " ";
              else typeof h === "string" && (j = h);
              if (
                (m = b) &&
                typeof b !== "function" &&
                (typeof b !== "object" || typeof b.length !== "number")
              )
                throw Error("JSON.stringify");
              return a("", { "": d });
            };
          if (typeof e.parse !== "function")
            e.parse = function (a, d) {
              function b(a, h) {
                var i,
                  c,
                  k = a[h];
                if (k && typeof k === "object")
                  for (i in k)
                    Object.hasOwnProperty.call(k, i) &&
                      ((c = b(k, i)), c !== void 0 ? (k[i] = c) : delete k[i]);
                return d.call(a, h, k);
              }
              var h;
              g.lastIndex = 0;
              g.test(a) &&
                (a = a.replace(g, function (a) {
                  return (
                    "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                  );
                }));
              if (
                /^[\],:{}\s]*$/.test(
                  a
                    .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                    .replace(
                      /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                      "]"
                    )
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                )
              )
                return (
                  (h = eval("(" + a + ")")),
                  typeof d === "function" ? b({ "": h }, "") : h
                );
              throw new SyntaxError("JSON.parse");
            };
        })();
      ovi.json = {
        parse: function (c, b) {
          return e.parse(c, b === void 0 ? f : b);
        },
        stringify: e.stringify,
      };
    })();
    ovi.provide("nokia.maps.net.IResult");
    ovi.provide("nokia.maps.behavior._packaging.base");
    ovi.provide("nokia.maps.map._packaging.base");
    ovi.provide("nokia.maps.dom.Touch");
    ovi.provide("nokia.maps.dom");
    (function (f) {
      function e(a, d) {
        a.getContext && a.getContext("2d").drawImage(d, 0, 0);
      }
      var c = null,
        b = { type: "load" },
        a = { type: "error" },
        g = (function () {
          var a = document.createElement("script");
          a.text = "https://";
          return !a.cloneNode(!0).text;
        })(),
        d = ovi.browser.msie,
        i = d && /(6|7|8)\.0/gi.test(ovi.browser.version);
      ovi.extend(f, {
        contains: d
          ? function (a, d) {
              return a.contains(d);
            }
          : function (a, d) {
              for (; d; ) {
                if (d === a) return !0;
                d = d.parentNode;
              }
              return !1;
            },
        loadImg: function (a, d, i, c) {
          var k,
            g,
            e = !0;
          a || (a = new Image());
          a.onload = a.onerror = function (d) {
            a.onload = a.onerror = null;
            k = (d || a.ownerDocument.parentWindow.event).type === "load";
            i && i.call(c, a, k, e);
          };
          a.src = d;
          if (k === void 0) {
            if (a.complete)
              a.onload((g = a.naturalWidth) || g === void 0 ? b : 1);
            e = !1;
          }
          return k;
        },
        cancelImg: function (d, b) {
          b ? d.onerror && d.onerror.call(d, a) : (d.onload = d.onerror = null);
          d.removeAttribute("src");
        },
        cloneNode: g
          ? function (a, d) {
              for (
                var b = a.cloneNode(!!d),
                  i = a.getElementsByTagName("script"),
                  c = b.getElementsByTagName("script"),
                  g = i.length;
                g--;

              )
                c[g].text = i[g].text;
              if (a.nodeName === "SCRIPT") b.text = a.text;
              d && e(b, a);
              return b;
            }
          : function (a, d) {
              var b = a.cloneNode(!!d);
              d && e(b, a);
              return b;
            },
        importNode:
          document.importNode &&
          document.importNode.toString().indexOf("[native code]") > 0 &&
          !d
            ? function (a, d, b) {
                a = a.importNode(d, !!b);
                b && e(a, d);
                return a;
              }
            : function (a, d, b) {
                var i, c, g, p, o;
                if (a !== d.ownerDocument) {
                  g = d.attributes;
                  i = a.createElement(d.nodeName);
                  for (c = g.length; c--; )
                    if ((p = g[c]).specified)
                      (o = p.name) === "style"
                        ? (i.style.cssText = d.style.cssText)
                        : o === "class"
                        ? (i.className = d.className)
                        : i.setAttribute(o, p.value);
                  if (b)
                    for (c = d.firstChild; c; )
                      i.appendChild(f.importNode(a, c, b)), (c = c.nextSibling);
                } else i = d.cloneNode(!!b);
                b && e(i, d);
                return i;
              },
        isQuirksMode: function (a) {
          ovi.type(a) !== "document" && (a = document);
          if (!a || typeof a.compatMode !== "string") return !0;
          return a.compatMode === "BackCompat" || a.compatMode === "QuirksMode";
        },
        getWindowSize: function (a) {
          if (
            ovi.type(a) !== "window" &&
            ((a = window), ovi.type(a) !== "window")
          )
            return null;
          var d =
              document.images &&
              document.compatMode &&
              document.compatMode.indexOf("CSS1") >= 0,
            b = a.document;
          if (a.innerWidth)
            return { width: a.innerWidth, height: a.innerHeight };
          if (d)
            return (
              (a = b.body.parentElement),
              { width: a.clientWidth, height: a.clientHeight }
            );
          if (b.body && b.body.clientWidth)
            return { width: b.body.clientWidth, height: b.body.clientHeight };
          return null;
        },
        setStyle: function (a, d) {
          var b = { constructor: !0, prototype: !0 };
          if (d && a && a.style)
            for (var i in d) !b[i] && i in a.style && (a.style[i] = d[i]);
          return a;
        },
        getStyle: function (a, d) {
          if (document.defaultView && document.defaultView.getComputedStyle) {
            var b = a.ownerDocument.defaultView.getComputedStyle(a, "");
            if (!b) return !1;
            return b[d];
          } else return a.currentStyle[d];
        },
        ownerWindow: function (a) {
          var d = ovi.type(a),
            b = null;
          if (!a) return null;
          if (d === "window") return a;
          if (d === "document") b = a;
          else if (a.ownerDocument) b = a.ownerDocument;
          else return null;
          return b.parentWindow || b.defaultView;
        },
        getScrollBarSize: function () {
          if (c) return c;
          var a = document,
            d = 0,
            b = 0,
            i = 0,
            k = 0,
            g = 0,
            e = 0,
            f = a.createElement("P"),
            q = a.createElement("P"),
            r,
            s;
          try {
            r = f.style;
            s = q.style;
            r.height = "200px";
            r.width = "200px";
            s.position = "absolute";
            s.top = 0;
            s.left = 0;
            s.visibility = "hidden";
            s.width = "100px";
            s.height = "100px";
            s.overflow = "hidden";
            q.appendChild(f);
            a.body.appendChild(q);
            b = q.offsetWidth;
            g = q.offsetHeight;
            s.overflow = "scroll";
            i = q.offsetWidth;
            e = q.offsetHeight;
            if (b === i) i = q.clientWidth;
            if (g === e) e = q.clientHeight;
            a.body.removeChild(q);
            d = b - i;
            k = g - e;
          } catch (w) {
            k = d = 0;
          }
          return k !== k || d !== d || k <= 0 || d <= 0
            ? (c = { width: 17, height: 17 })
            : (c = { width: d, height: k });
        },
        ha: function (a, d, b) {
          d = a.ownerDocument.createElement(d);
          if (b) d.className = b;
          a.appendChild(d);
          return d;
        },
        Fq: function (a) {
          var d = a.styleSheets,
            b = a.createElement("style");
          b.setAttribute("type", "text/css");
          a.getElementsByTagName("head")[0].appendChild(b);
          return (b = d[d.length - 1]);
        },
        Eq: d
          ? function (a, d, b) {
              a.addRule(d, b);
            }
          : function (a, d, b) {
              var i = a.cssRules;
              a.insertRule(d.concat("{", b, "}"), i ? i.length : 0);
            },
        $d:
          d && i
            ? function (a, d) {
                var b = a.style,
                  i = Math.round(d * 100);
                b.MsFilter =
                  '"progid:DXImageTransform.Microsoft.Alpha(opacity=' +
                  i +
                  ')"';
                b.filter = "alpha(opacity=" + i + ")";
              }
            : function (a, d) {
                a.style.opacity = d;
              },
        Yr: d
          ? function (a) {
              var d = this.Ml(a),
                b = d.getPropertyValue("background-image"),
                i,
                c,
                g,
                e = a.ownerDocument,
                f;
              if (b.toLowerCase().indexOf(".png") != -1)
                (i = d.getPropertyValue("background-position-x")),
                  (d = d.getPropertyValue("background-position-y")),
                  (f = e.createElement("img")),
                  (g = e.createElement("div")),
                  (g.style.position = "absolute"),
                  (g.style.left = i),
                  (g.style.top = d),
                  (c = e.createElement("div")),
                  g.appendChild(c),
                  (c.style.position = "absolute"),
                  (a.style.overflow = "hidden"),
                  (f.onload = function () {
                    c.style.filter = [
                      "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src='",
                      b,
                      "', sizingMethod='scale')",
                    ].join("");
                    c.style.width = this.width + "px";
                    c.style.height = this.height + "px";
                    g.style.width = this.width + "px";
                    g.style.height = this.height + "px";
                  }),
                  (b = b.substr(5, b.length - 7)),
                  (f.src = b),
                  a.insertBefore(g, a.firstChild),
                  (a.style.background = ""),
                  (a.opacityWrapper = g);
            }
          : function () {},
        Ml:
          d && !window.getComputedStyle
            ? function (a) {
                return new (function (a) {
                  this.el = a;
                  this.getPropertyValue = function (a) {
                    var d = /(\-([a-z]){1})/g;
                    a == "float" && (a = "styleFloat");
                    d.test(a) &&
                      (a = a.replace(d, function (a, d, b) {
                        return b.toUpperCase();
                      }));
                    return this.el.currentStyle[a]
                      ? this.el.currentStyle[a]
                      : null;
                  };
                })(a);
              }
            : window.getComputedStyle,
        findElement: function (a, d) {
          for (
            var b = RegExp("(^|\\s)" + a + "($|\\s)"),
              i = d.getElementsByTagName("*"),
              c = i.length;
            c--;

          )
            if (b.test(i[c].className)) return i[c];
          return null;
        },
      });
    })(nokia.maps.dom);
    ovi.provide("nokia.maps.gfx.Image");
    (function () {
      var f = (nokia.maps.gfx.Image = new ovi.Class({
        Statics: {
          d: 0,
          fromObjectListener: [],
          fromObject: function (e, c) {
            for (
              var b = f.fromObjectListener, a, g = b.length, d = -1;
              ++d < g;

            )
              if ((a = b[d](e, c || document))) break;
            return a;
          },
        },
      }));
    })();
    ovi.provide("nokia.maps.gfx.BitmapImage");
    (function () {
      var f = ovi.browser.msie,
        e = ovi.browser.version >= 8,
        c = nokia.maps.dom,
        b = ovi.type,
        a = c.setStyle,
        g = nokia.maps.gfx.Image,
        d = (nokia.maps.gfx.BitmapImage = new ovi.Class({
          Extends: nokia.maps.gfx.Image,
          initialize: function (a, d, h, c, l, k) {
            var e = b(a),
              f;
            this.d = g.d++;
            this.F = d || document;
            this.width = h || 0;
            this.height = c || 0;
            this.opacity = 1;
            this.offsetX = b(l) === "number" ? l : void 0;
            this.offsetY = b(k) === "number" ? k : void 0;
            if (e === "string") this.src = a;
            else if (e === "element") {
              if (
                ((this.src = a.src), a.complete && a.ownerDocument !== this.F)
              ) {
                try {
                  this.ka = f = a.clone();
                } catch (o) {
                  this.ka = f = null;
                }
                if (f)
                  (this.state = 1),
                    (this.width = this.width || f.naturalWidth || f.width),
                    (this.height = this.height || f.naturalHeight || f.height),
                    (this.naturalWidth = f.naturalWidth || f.width),
                    (this.naturalHeight = f.naturalHeight || f.height);
              }
            } else throw "Illegal argument 'image'";
          },
          isBitmap: 1,
          getDocument: function () {
            return this.F;
          },
          vh: function () {
            var a = -1,
              d = this.gc,
              b = (d && d.length) || 0,
              c;
            for (this.gc = null; ++a < b; ) {
              c = d[a];
              try {
                c[0].apply(c[1], c[2]);
              } catch (g) {
                ovi.warn(
                  "Exception in user defined callback within gfx.BitmapImage!"
                ),
                  ovi.debug(g);
              }
            }
          },
          Am: function (a, d) {
            var b = -1,
              c = this.Xe,
              g = (c && c.length) || 0;
            this.state = d ? 1 : -1;
            if (this.state === 1) {
              this.naturalWidth = a.naturalWidth || a.width;
              this.naturalHeight = a.naturalHeight || a.height;
              this.width = this.width || a.naturalWidth || a.width;
              for (
                this.height = this.height || a.naturalHeight || a.height;
                ++b < g;

              )
                this.Ra(c[b]);
              this.Xe = null;
            }
            this.vh();
          },
          prepare: function (a, d) {
            var h,
              g,
              l = !1,
              k,
              d = d || this;
            if (b(a) === "function") {
              h = this.gc || (this.gc = []);
              k = [].concat(arguments);
              k.splice(0, 2, this);
              for (g = h.length; g--; )
                if (h[g][0] === a && h[g][1] === d) {
                  l = !0;
                  break;
                }
              !l && h.push([a, d, k]);
            }
            if (this.state === 1) this.vh();
            else if (this.state !== 0)
              (this.state = 0),
                (this.ka = this.ka || this.F.createElement("IMG")),
                c.loadImg(this.ka, this.src, this.Am, this);
          },
          Ra: function (d) {
            var c = this.width && this.height,
              h;
            if (b(this.state) !== "number" || this.state <= 0)
              if ((this.prepare(), this.state <= 0))
                return (
                  (d = d || this.F.createElement("DIV")),
                  a(d, {
                    position: "relative",
                    overflow: "hidden",
                    width: c ? this.width + "px" : "0",
                    height: c ? this.height + "px" : "0",
                  }),
                  (this.Xe || (this.Xe = [])).push(d),
                  d
                );
            c = b(this.offsetX) === "number" && b(this.offsetY) === "number";
            try {
              h = this.ka.cloneNode(!0);
            } catch (g) {
              (h = this.F.createElement("IMG")), (h.src = this.src);
            }
            c &&
              a(h, {
                position: "absolute",
                left: -this.offsetX + "px",
                top: -this.offsetY + "px",
              });
            if (c || f) {
              d = d || this.F.createElement("DIV");
              a(d, {
                position: "relative",
                overflow: "hidden",
                width: this.width + "px",
                height: this.height + "px",
              });
              d.appendChild(h);
              if (f) h.style.position = "absolute";
              return d;
            }
            h.style.width = this.width + "px";
            h.style.height = this.height + "px";
            if (d)
              return (
                (d.style.width = this.width + "px"),
                (d.style.height = this.height + "px"),
                d.appendChild(h),
                d
              );
            return h;
          },
          createElement: function (a) {
            var d = this.Ra();
            this.setOpacity(d, a);
            return d;
          },
          setOpacity: function (d, c) {
            var h = b(c) === "number" && c >= 0 && c <= 1 ? c : this.opacity,
              g = d.ownerDocument,
              l,
              k = Math.round(h * 100);
            if ((h = +h) !== h || h < 0 || h > 1) throw "Invalid opacity!";
            d.$n$opacity = h;
            if (f) {
              if (h < 1 && !d.$n$opacityHack) {
                for (d.$n$opacityHack = !0; d.firstChild; )
                  d.removeChild(d.firstChild);
                l = g.createElement("DIV");
                if (!e) l.style.filter = "alpha(opacity=" + k + ")";
                a(l, {
                  position: "relative",
                  width: this.width + "px",
                  height: this.height + "px",
                  overflow: "hidden",
                });
                d.$n$alphaImageLoader =
                  "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod='scale', src='" +
                  this.src +
                  "')";
                g = g.createElement("DIV");
                g.style.filter =
                  d.$n$alphaImageLoader +
                  (e
                    ? "progid:DXImageTransform.Microsoft.Alpha(opacity=" +
                      k +
                      ")"
                    : "");
                a(g, {
                  position: "absolute",
                  top: (this.offsetX || 0) + "px",
                  left: (this.offsetY || 0) + "px",
                  width: this.width + "px",
                  height: this.height + "px",
                });
                l.appendChild(g);
                d.appendChild(l);
              }
              if (h < 1 || d.$n$opacityHack)
                if (
                  ((d.firstChild.firstChild.style.filter =
                    d.$n$alphaImageLoader +
                    (e
                      ? "progid:DXImageTransform.Microsoft.Alpha(opacity=" +
                        k +
                        ")"
                      : "")),
                  !e)
                )
                  d.firstChild.style.filter = "alpha(opacity=" + k + ")";
            } else d.style.opacity = h;
            return this;
          },
          clone: function (a, c, h, g, l) {
            a = a || this.F;
            c = b(c) === "number" ? c : this.width;
            h = b(h) === "number" ? h : this.height;
            g = b(g) === "number" ? g : this.offsetX;
            l = b(l) === "number" ? l : this.offsetY;
            if (a === this.F)
              return (
                (a = new d(this.src, a, c, h, g, l)),
                this.state > 0 &&
                  ovi.extend(a, {
                    state: this.state,
                    ka: this.ka,
                    naturalWidth: this.naturalWidth,
                    naturalHeight: this.naturalHeight,
                    width: c,
                    height: h,
                    offsetX: g,
                    offsetY: l,
                  }),
                a
              );
            return new d(
              this.src,
              a,
              this.width,
              this.height,
              this.offsetX,
              this.offsetY
            );
          },
        }));
      g.fromObjectListener.push(function (a, c) {
        if (a instanceof d) return a;
        var h = b(a);
        if (h === "element" && b(a.src) === "string" && a.ownerDocument)
          return new d(a, c);
        if (h === "string" && a.length) return new d(a, c);
      });
    })();
    ovi.provide("nokia.maps.gfx.Painter");
    nokia.maps.gfx.Painter = new ovi.Class({
      Statics: {
        defaultPainter: null,
        ig: function (f) {
          return (f = +f) !== f || f < 0 || f > 1 ? 1 : f;
        },
      },
    });
    ovi.provide("nokia.maps.util.FontHelper");
    (function (f) {
      function e(a, b) {
        return (a = a.replace(
          RegExp(
            "(?:((?:x*-)?small(?:er)?(?![-])|medium|(?:x*-)?large(?:r)?|[\\d\\.]*(?:px|pt|em|ex|%)))(?:/((?:[\\d\\.]*(?:px|pt|em|ex|%)|normal)))?",
            "gi"
          ),
          function (a, c, j) {
            if (c && c !== "") b.size = c;
            if (j && j !== "") b.lineHeight = j;
            return "";
          }
        ));
      }
      function c(a, b) {
        var d = [],
          a = a.replace(
            RegExp(
              "(?:(italic|oblique)|(small-caps)|(bold(?:er)?|lighter|[1-9]00)|(inherit|normal))+",
              "gi"
            ),
            function (a, c, h, e, l) {
              c && c !== ""
                ? (b.style = c)
                : h && h !== ""
                ? (b.variant = h)
                : e && e !== ""
                ? (b.weight = e)
                : l && l !== "" && d.push(l);
              return "";
            }
          );
        !b.style && d.length && (b.style = d.shift());
        !b.variant && d.length && (b.variant = d.shift());
        !b.weight && d.length && (b.weight = d.shift());
        return a;
      }
      var b = f.f;
      f.FontHelper = {
        parse: function (a) {
          var b = {},
            d = 0,
            i = [],
            j,
            a = a.replace(RegExp("'.*'|\".*\"", "gi"), function (a) {
              j = "_s_" + d;
              i[d] = a;
              d++;
              return j;
            }),
            a = e(a, b),
            a = c(a, b),
            a = a.replace(/_s_([\d]+)/, function (a, d) {
              return i[d];
            }),
            a = a.replace(/^[\s]+/, "");
          if (a !== "") b.family = a;
          if (typeof b.size === "string") b.size = f.FontHelper.uh(b.size);
          return b;
        },
        uh: function (a) {
          var c =
              /([0-9]*(\.[0-9]*){0,1}(e[\+\-]{1}[0-9]*){0,1})\s*([a-zA-Z]+)/g,
            d = c.exec(a);
          c.exec("");
          if (d) {
            a = parseFloat(d[1]);
            switch ((d = d[4].toLowerCase())) {
              case "pt":
                a = (a * 96) / 72;
                break;
              case "pc":
                a = ((a * 96) / 72) * 12;
                break;
              case "mm":
                a = (a * 96) / 25.4;
                break;
              case "cm":
                a = ((a * 96) / 25.4) * 10;
                break;
              case "in":
                a *= 96;
                break;
              case "px":
                break;
              case "em":
              case "ex":
                b("Unsupported font size unit: " + d);
                break;
              default:
                b("Unknown font size unit: " + d);
            }
            return a + "px";
          }
          return parseFloat(a) + "px";
        },
        toString: function (a) {
          var b = [];
          a.style && b.push(a.style);
          a.variant && b.push(a.variant);
          a.weight && b.push(a.weight);
          a.size &&
            (a.lineHeight
              ? b.push(a.size + "/" + a.lineHeight)
              : b.push(a.size));
          a.family && b.push(a.family);
          return b.join(" ");
        },
      };
    })(nokia.maps.util);
    ovi.provide("nokia.maps.geo.Coordinate");
    (function (f) {
      var e = f.util,
        c = Math,
        b = c.abs,
        a = c.floor,
        g = c.round,
        d = c.min,
        i = c.log,
        j = c.tan,
        h = c.sqrt,
        m = c.pow,
        l = c.sin,
        k = c.cos,
        n = c.asin,
        p = c.atan2,
        o = c.PI,
        q = o / 180,
        r = o / 4,
        s = o / 2,
        w = o * 2,
        u = o * 3,
        v = 180 / o,
        x = (f.geo.Coordinate = function (a, d, b, c) {
          c ||
            x.isValid(a, d, b) ||
            e.f(
              "Coordinate: lat:" + a + ", lng:" + d + (b ? ", alt:" + b : "")
            );
          this.longitude = +d;
          this.latitude = +a;
          if (b !== void 0) this.altitude = +b;
        });
      ovi.extend(x.prototype, {
        altitude: void 0,
        distance: function (a) {
          var b = this.latitude * q,
            c = a.latitude * q;
          return (
            12742e3 *
            n(
              d(
                1,
                h(
                  m(l((b - c) / 2), 2) +
                    k(b) *
                      k(c) *
                      m(l((this.longitude * q - a.longitude * q) / 2), 2)
                )
              )
            )
          );
        },
        Un: function (a, d) {
          if ((d /= 6371e3)) {
            a *= q;
            var b = q * this.latitude,
              c = l(b),
              h = l(d),
              i = k(d),
              g = q * this.longitude,
              j = k(b),
              b = n(j * k(a) * h + c * i),
              c = p(l(a) * j * h, i - c * l(b)),
              g = (((g + c + o) % (2 * o)) - o) * v;
          }
          return d ? new x(b * v, ((g + 540) % 360) - 180) : this;
        },
        walk: function (a, d, c) {
          var h, g, e, m, f;
          if (c) return this.Un(a, d);
          if (!(((a %= 360) + 90) % 180))
            return (
              (a =
                this.longitude +
                (d / (w * k(this.latitude * q) * 6371e3)) *
                  (a === 270 ? -360 : 360)),
              new x(this.latitude, ((a + 540) % 360) - 180)
            );
          if ((d /= 6371e3))
            (a *= q),
              (h = this.latitude * q),
              (g = this.longitude * q),
              (e = h + d * k(a)),
              (m = e - h),
              (c = i(j(e / 2 + r) / j(h / 2 + r))),
              (c = !isNaN(m / c) ? m / c : k(h)),
              (f = (d * l(a)) / c),
              b(e) > s && (e = e > 0 ? o - e : -(o - e));
          return d
            ? new x(e * v, (((g + f + u + (b(h + m) > s ? o : 0)) % w) - o) * v)
            : this;
        },
        equals: function (a) {
          return (
            a && this.latitude === a.latitude && this.longitude === a.longitude
          );
        },
      });
      ovi.extend(x, {
        isValid: function (a, d, c) {
          return (
            a != null &&
            a === +a &&
            a >= -90 &&
            a <= 90 &&
            d != null &&
            d === +d &&
            d >= -180 &&
            d <= 180 &&
            (c === void 0 || (c === +c && b(c) !== Infinity))
          );
        },
        fromObject: function () {
          var a, d, b, c;
          a = arguments;
          var h = a[0];
          c = a.length;
          if (h instanceof x) return h;
          if (c > 1) h = a;
          else if (h) c = h.length;
          else return null;
          a = h[0];
          d = h[1];
          b = h[2];
          if (c === 2 && a === +a && d === +d) return new x(a, d);
          if (c === 3 && a === +a && d === +d) return new x(a, d, b);
          c = h.lat;
          a = h.lng;
          if (c !== void 0 && a !== void 0) {
            if (c === +c && a === +a) return new x(+c, +a);
            return null;
          }
          c = h.latitude;
          a = h.longitude;
          if (c !== void 0 && a !== void 0 && c === +c && a === +a)
            return new x(+c, +a);
          return null;
        },
        mg: function (d, c, h) {
          var i = g(b(d) * 3600) / 3600,
            k = a(i),
            i = (i - k) * 3600,
            l = a(i / 60);
          return (
            k + "\u00b0 " + l + "' " + g(i - l * 60) + '" ' + (d < 0 ? h : c)
          );
        },
        asString: function (a) {
          return (
            x.mg(a.latitude, "N", "S") + ", " + x.mg(a.longitude, "E", "W")
          );
        },
      });
      x.prototype.toString = function () {
        return x.asString(this);
      };
    })(nokia.maps);
    ovi.provide("nokia.maps.util.QuadTree");
    (function (f) {
      function e(a, d) {
        for (var b, c, g, k, f, p, o, q = 0, r, s, w = 4, u; w--; ) {
          u = w + 4;
          f = [];
          b = +!(w % 3);
          p = d[w];
          for (r = (c = a[w]).length; r--; ) {
            g = c[r];
            if ((k = g.R))
              for (s = k.length; s--; ) if (((o = k[s][u]) > p) - b) p = o;
            for (s = 4; s--; )
              if ((k = g[s])) b ? k[u] < p && f.push(k) : k[u] > p && f.push(k);
          }
          q += f.length;
          d[w] = p;
          a[w] = f;
        }
        q && (d = e(a, d));
        return d;
      }
      function c() {
        f.f("Entry out of tree bounds");
      }
      var b = 1,
        a = (f.QuadTree = new ovi.Class({
          initialize: function (a, d, b, c, g) {
            this.Og = a || 10;
            this.Rh = d || 1;
            this.Sh = b || 1;
            this.ug = c || 0;
            this.vg = g || 0;
            this.flush();
          },
          Statics: {
            MIN_X: "7",
            MIN_Y: "4",
            MAX_X: "5",
            MAX_Y: "6",
            MID_X: "8",
            MID_Y: "9",
            TL: "0",
            TR: "1",
            BL: "2",
            BR: "3",
          },
          getExtremes: function () {
            var a, d;
            if (!(d = this.Zb))
              if (((a = this.dd), a.R || a["0"] || a["1"] || a["2"] || a["3"]))
                (d = [a]),
                  (a = e([d, d, d, d], [a["6"], a["7"], a["4"], a["5"]])),
                  (this.Zb = d = {}),
                  (d["4"] = a[0]),
                  (d["5"] = a[1]),
                  (d["6"] = a[2]),
                  (d["7"] = a[3]);
            return d || void 0;
          },
          flush: function () {
            this.dd = this.sc = new g(
              0,
              0,
              this.ug - this.Rh,
              this.vg - this.Sh,
              this.ug + this.Rh,
              this.vg + this.Sh
            );
            this.Zb = 0;
          },
          remove: function (a) {
            a.ma.Bb(a, this);
            this.Zb = 0;
          },
          insert: function (a, d, b, g) {
            var l,
              k = this.sc;
            a < b ? (l = a) : ((l = b), (b = a));
            d < g ? ((a = d), (d = g)) : (a = g);
            (l < k["7"] || a < k["4"] || b > k["5"] || d > k["6"]) && c();
            this.Zb = 0;
            return this.sb(this.sc, l, a, b, d, this.Og);
          },
          insertSorted: function (a, d, b, g) {
            var l = this.sc;
            (a < l["7"] || d < l["4"] || b > l["5"] || g > l["6"]) && c();
            this.Zb = 0;
            return this.sb(this.sc, a, d, b, g, this.Og);
          },
          sb: function (a, d, b, c, g, k) {
            var e = a["8"],
              f = a["9"];
            return k &&
              (c < e || (c < a["5"] && d >= e)) &&
              (g < f || (g < a["6"] && b >= f))
              ? this.sb(a.wl((b >= f ? 2 : 0) | (d >= e)), d, b, c, g, k - 1)
              : a.qa(d, b, c, g);
          },
          intersect: function (a, d, b, c, g) {
            var k = [];
            this.dc(this.dd, k, a, d, b, c, g);
            return k;
          },
          dc: function (a, d, b, c, g, k, e) {
            var f,
              o,
              q = a.R;
            o = a["7"];
            var r = a["8"],
              s = a["5"],
              w = a["4"],
              u = a["9"],
              v = a["6"],
              x;
            if (q)
              if (((f = q.length), b > o || g < s || c > w || k < v))
                for (; f--; )
                  (o = q[f]),
                    (s = o["7"]),
                    (w = o["4"]),
                    (v = o["5"]),
                    (x = o["6"]),
                    s > g ||
                      v < b ||
                      w > k ||
                      x < c ||
                      ((e || (s >= b && v <= g && w <= k && x >= c)) &&
                        d.push(o));
              else for (; f--; ) d.push(q[f]);
            g >= r &&
              (c <= u && a["1"] && this.dc(a["1"], d, b, c, g, k, e),
              k >= u && a["3"] && this.dc(a["3"], d, b, c, g, k, e));
            b <= r &&
              (c <= u && a["0"] && this.dc(a["0"], d, b, c, g, k, e),
              k >= u && a["2"] && this.dc(a["2"], d, b, c, g, k, e));
          },
        })),
        g = (a.Quad = function (a, d, b, c, g, k) {
          if (a)
            (this.ma = a),
              (this.d = d),
              d & 1
                ? ((b = a["8"]), (g = a["5"]))
                : ((b = a["7"]), (g = a["8"])),
              d & 2
                ? ((c = a["9"]), (k = a["6"]))
                : ((c = a["4"]), (k = a["9"]));
          this["7"] = b;
          this["4"] = c;
          this["5"] = g;
          this["6"] = k;
          this["8"] = (b + g) / 2;
          this["9"] = (c + k) / 2;
        }),
        d = (a.Entry = function (a, d, c, g, l) {
          this.id = b++;
          this.ma = a;
          this["7"] = d;
          this["4"] = c;
          this["5"] = g;
          this["6"] = l;
        });
      ovi.extend(g.prototype, {
        d: "",
        ma: null,
        wl: function (a) {
          return this[a] || (this[a] = new g(this, a));
        },
        qa: function (a, b, c, g) {
          a = new d(this, a, b, c, g);
          (this.R || (this.R = [])).push(a);
          return a;
        },
        Bb: function (a, d) {
          var b = this.R,
            c;
          if (b) {
            for (c = b.length; c--; )
              if (b[c] === a) {
                b.splice(c, 1);
                delete a.ma;
                break;
              }
            b.length || (delete this.R, this.yg(d));
          }
        },
        yg: function (a) {
          if (
            this.ma &&
            !this.R &&
            !this[0] &&
            !this[1] &&
            !this[2] &&
            !this[3]
          ) {
            delete this.ma[this.d];
            if (this === a.dd) a.dd = this.ma;
            this.ma.yg(a);
          }
        },
      });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.util.Strip");
    (function () {
      var f = (nokia.maps.util.Strip = function (e, c) {
        var b = (this.names = e || []).length,
          a = (this.offsets = {});
        for (this.data = c || []; b--; ) a[e[b]] = b;
      });
      ovi.extend(f, {
        stencil: function (e, c) {
          var b = new f(1, c);
          b.offsets = e.offsets;
          b.names = e.names;
          return b;
        },
        X_Y: new f(["x", "y"]),
        LAT_LNG: new f(["latitude", "longitude"]),
      });
    })();
    ovi.provide("nokia.maps.util.Uint32Array");
    nokia.maps.util.Uint32Array = function (f) {
      return ovi.type(f) === "array" ? f : Array(arguments.length ? +f : 0);
    };
    ovi.provide("nokia.maps.geo");
    (function (f) {
      function e(a, d, b, c, h, e) {
        var l = 0;
        a < b ? (l |= 1) : a > h && (l |= 2);
        d < c ? (l |= 4) : d > e && (l |= 8);
        return l;
      }
      var c = 0,
        b = Number.POSITIVE_INFINITY,
        a;
      ovi.extend(f.geo, {
        newProjectionId: function () {
          return c++;
        },
        clipLineVsRect: function (a, d, b, c, h, m, l, k, f) {
          f ? (f.length = 0) : (f = []);
          for (
            var p = !1,
              o,
              q = e(a, d, h, m, l, k),
              r = e(b, c, h, m, l, k),
              p = !1,
              s,
              w;
            ;

          )
            if (q | r)
              if (q & r) break;
              else
                (o = q ? q : r),
                  o & 8
                    ? ((s = a + ((b - a) * (k - d)) / (c - d)), (w = k))
                    : o & 4
                    ? ((s = a + ((b - a) * (m - d)) / (c - d)), (w = m))
                    : o & 2
                    ? ((w = d + ((c - d) * (h - a)) / (b - a)), (s = h))
                    : o & 1 &&
                      ((w = d + ((c - d) * (l - a)) / (b - a)), (s = l)),
                  o == q
                    ? ((a = s), (d = w), (q = e(a, d, h, m, l, k)))
                    : ((b = s), (c = w), (r = e(b, c, h, m, l, k)));
            else {
              p = !0;
              break;
            }
          p && f.push(a, d, b, c);
          return f;
        },
        intersectLine: (a = function (a, d, c, j) {
          if (!d || d.length < 4 || !a || a.length < 4) {
            if (c) c.length = 0;
            return 0;
          }
          var j = !j,
            h = 0,
            e = 0,
            l = 0,
            k = a.length,
            f,
            p,
            o,
            q,
            r,
            s = d[0],
            w = d[1],
            u = d[2],
            v = d[3],
            x = a[e++],
            z = a[e++];
          u < s && ((s ^= u), (u ^= s), (s ^= u));
          v < w && ((w ^= v), (v ^= w), (w ^= v));
          for (; e < k; ) {
            var E = a[e++],
              G = a[e++],
              L = (G - z) * (u - s) - (E - x) * (v - w),
              F = (E - x) * (w - z) - (G - z) * (s - x),
              B = (G - z) * (u - s) - (E - x) * (v - w),
              K = F / L,
              y = B / L,
              d = s + K * (u - s);
            f = w + K * (v - w);
            y = y >= 0 && y <= 1;
            j &&
              (x < E ? ((p = x), (r = E)) : ((p = E), (r = x)),
              z < G && ((o = z), (q = G)));
            L === 0 && F === 0 && B === 0
              ? ((d = f = b),
                (y = j
                  ? ((x >= s && x <= u) || (E >= s && E <= u)) &&
                    ((z >= w && z <= v) || (G >= w && G <= v))
                  : !0))
              : y &&
                j &&
                (y = K >= 0 && K <= 1 && d >= p && d <= r && f >= o && f <= q);
            y
              ? (h++, c && ((c[l++] = d), (c[l++] = f)))
              : c && (c[l++] = c[l++] = NaN);
            x = E;
            z = G;
          }
          if (c) c.length = l;
          return h;
        }),
        clipPolygonVsRect: function (c, d, i, j, h, e) {
          if (!c || c.length <= 4) return (e && ((e.length = 0) || e)) || [];
          for (
            var e = e || [],
              l = (e.length = 0),
              k = -1,
              f,
              p = c.length,
              o = 0,
              q,
              r,
              s = !1,
              w,
              u,
              v = !1,
              x = [],
              z = [],
              E = !1,
              G,
              L;
            ++k < 4;

          ) {
            q = c[p - 2];
            r = c[p - 1];
            k === 0
              ? ((s = r >= i), (f = [d, i, j, i]))
              : k === 1
              ? ((s = q <= j), (f = [j, i, j, h]))
              : k === 2
              ? ((s = r <= h), (f = [d, h, j, h]))
              : k === 3 && ((s = q >= d), (f = [d, i, d, h]));
            for (; o < p; )
              (w = c[o++]),
                (u = c[o++]),
                k === 0
                  ? (v = u >= i)
                  : k === 1
                  ? (v = w <= j)
                  : k === 2
                  ? (v = u <= h)
                  : k === 3 && (v = w >= d),
                v
                  ? (s ||
                      ((x[0] = q),
                      (x[1] = r),
                      (x[2] = w),
                      (x[3] = u),
                      a(f, x, z, !0),
                      (q = z[0]),
                      (r = z[1]),
                      q === b &&
                        (k === 0
                          ? ((q = w), (r = i))
                          : k === 1
                          ? ((q = j), (r = u))
                          : k === 2
                          ? ((q = w), (r = h))
                          : k === 3 && ((q = d), (r = u))),
                      o !== 2
                        ? ((e[l++] = q), (e[l++] = r))
                        : ((E = !0), (G = q), (L = r))),
                    (e[l++] = w),
                    (e[l++] = u))
                  : s &&
                    ((x[0] = q),
                    (x[1] = r),
                    (x[2] = w),
                    (x[3] = u),
                    a(f, x, z, !0),
                    (q = z[0]),
                    (r = z[1]),
                    q === b &&
                      (k === 0
                        ? ((q = w), (r = i))
                        : k === 1
                        ? ((q = j), (r = u))
                        : k === 2
                        ? ((q = w), (r = h))
                        : k === 3 && ((q = d), (r = u))),
                    (e[l++] = q),
                    (e[l++] = r)),
                (q = w),
                (r = u),
                (s = v);
            E && ((e[l++] = G), (e[l++] = L));
            E = !1;
            c = e;
            e.length = p = l;
            l = o = 0;
          }
          return e;
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.geo.Corridor");
    ovi.provide("nokia.maps.geo.IProjection");
    ovi.provide("nokia.maps.geo.Proximity");
    ovi.provide("nokia.maps.kml._packaging.base");
    ovi.provide("nokia.maps.clustering._packaging.base");
    ovi.provide("ovi._kernel");
    ovi.provide("nokia.maps.language.Info");
    ovi.provide("nokia.maps.resources.ui.i18n");
    (function () {
      var f = [
          "al ALB",
          "ar ARA ar-SA",
          "be BEL",
          "bg BUL bg-BG",
          "bn BEN",
          "bs BOS",
          "ca CAT",
          "cs CZE cs-CZ",
          "cy WEL",
          "da DAN da-DK",
          "de GER de-DE",
          "el GRE el-GR",
          "en ENG en-GB",
          "en-us ENG en-US",
          "es SPA es-ES",
          "eu BAQ",
          "et EST et-EE",
          "fa IRN fa-IR",
          "fi FIN fi-FI",
          "fr FRE fr-FR",
          "ga GLE",
          "gl GLG",
          "hi IND hi-IN",
          "he HBR",
          "hr SCR hr-HR",
          "hu HUN hu-HU",
          "id IND id-ID",
          "id-id IND id-ID",
          "in-id IND id-ID",
          "is ICE is-IS",
          "it ITA it-IT",
          "ja JPN",
          "km KHM",
          "ko KOR ko-KR",
          "ky KIR",
          "lt LIT lt-LT",
          "lv LAV lv-LV",
          "me MNE",
          "mi MAO",
          "mk MAC",
          "mn MON",
          "mo MOL",
          "ms MAY ms-MY",
          "nl DUT nl-NL",
          "no NOR no-NO",
          "pl POL pl-PL",
          "pt POR pt-PT",
          "pt-br BRA pt-BR",
          "py PYN",
          "ro RUM ro-RO",
          "ru RUS ru-RU",
          "sk SLO sk-SK",
          "sl SLV",
          "sr SRB sr-RS",
          "sv SWE sv-SE",
          "sw SWA",
          "ta TAM",
          "th THA th-TH",
          "tl PHL tl-PH",
          "tr TUR tr-TR",
          "uk UKR uk-UA",
          "ur PAK ur-PK",
          "vi VNM vi-VN",
          "zh CHI zh-CN",
          "zh-cn CHI zh-CN",
          "zh-hk CHN zh-HK",
          "zh-mo CHT",
          "zh-sg CHT",
          "zh-tw CHN zh-TW",
          "zh-chs CHI",
          "zh-cht CHT",
        ],
        e,
        c,
        b;
      nokia.maps.language.Info = new new ovi.Class({
        Extends: nokia.maps.util.OObject,
        initialize: function () {
          e && nokia.maps.util.Za("Cannot instantiate singleton class");
          e = this;
          var a = {},
            b;
          for (b = f.length; b--; ) {
            var d = f[b].split(" "),
              c = d[0],
              j = {};
            j.key = c;
            j.iso639_1 = c.substr(0, 2);
            j.marc = d[1];
            j.locale = d[2];
            a[c] = j;
          }
          e.definitions = a;
        },
        detect: function (a) {
          c ||
            (c = (function () {
              var a = nokia.maps.language.Info,
                d = (nokia.maps.Features &&
                  nokia.maps.Features.getFeatureMap().language) || ["en-GB"],
                c = d ? d.length : 0,
                j,
                h = {},
                e = [];
              for (b = d && d.length > 0 ? d[0] : "en-GB"; c--; )
                if (
                  ((j = d[c].toLowerCase()),
                  (j = a.getDefinition(j)) && j.locale && !h[j.key])
                )
                  (h[j.key] = j), e.push(j.locale);
              return h;
            })());
          return a === "none" ? "en-GB" : this.autoDetect(a);
        },
        autoDetect: function (a) {
          var g = nokia.maps.language.Info,
            d = b,
            a = g.getDefinition(
              !a || a === "auto" ? ovi.browser.language || d : a,
              c
            );
          if (!a || !a.locale) a = g.getDefinition(d, c);
          return a.locale;
        },
        getDefinition: function (a, b) {
          b = b || this.definitions;
          return a.length === 2 || a.length === 5
            ? b[a.toLowerCase()] || b[a.substr(0, 2).toLowerCase()]
            : null;
        },
        languageSetter: function (a) {
          var b = a.locale,
            d = b.substr(0, 2).toLowerCase(),
            b = b.substr(3, 2).toUpperCase(),
            c = nokia.maps.resources.ui.i18n;
          return c[d] && c[d][b]
            ? ((this.translations = new Function(
                "return " + c[d][b].translation.json + ";"
              )()),
              a)
            : this.language;
        },
      })();
    })();
    ovi.provide("nokia.maps.util.RTree");
    (function (f) {
      var e = Math;
      abs = e.abs;
      min = e.min;
      max = e.max;
      sqrt = e.sqrt;
      f.RTree = new ovi.Class({
        initialize: function (c, b, a) {
          var g = f.f;
          (typeof b != "number" || b < 2) &&
            g(
              "The given parameter 'maxEntries' is no number, or less than 2! maxEntries is " +
                b
            );
          (typeof a != "number" || a > b / 2) &&
            g(
              "The given parameter 'minEntries' is no number, or is not at least 2 times smaller than maxEntries! minEntries is" +
                a
            );
          this.MaxEntriesPerNode = b;
          this.MinEntriesPerNode = a;
          switch (c) {
            case f.RTree.QUADRATIC_PARTITIONING:
              this.splitNode = this.An;
              break;
            case f.RTree.LINEAR_PARTITIONING:
              this.splitNode = this.yn;
              break;
            case f.RTree.LINEAR_MOD_PARTITIONING:
              this.splitNode = this.zn;
              break;
            case f.RTree.DUMMY_PARTITIONING:
              this.splitNode = this.xn;
              break;
            default:
              g(
                "The given parameter 'partitioningAlgorithm' is not a valid option!"
              );
          }
          this.Root = new f.RTreeNode(!0);
        },
        Statics: {
          QUADRATIC_PARTITIONING: 0,
          LINEAR_PARTITIONING: 1,
          LINEAR_MOD_PARTITIONING: 2,
          DUMMY_PARTITIONING: 3,
        },
        MaxEntriesPerNode: null,
        MinEntriesPerNode: null,
        Root: null,
        Ta: 1,
        add: function (c) {
          var b = this.Root,
            a = 1,
            g = 0,
            d = null,
            i = null,
            j = Infinity,
            h;
          for (c.Volume = (c.X2 - c.X1) * (c.Y2 - c.Y1); a < this.Ta; ) {
            i = d = null;
            j = Infinity;
            for (g = 0; g < b.Entries.length; g++)
              if (
                ((h = b.Entries[g]),
                (h =
                  c.X2 == c.X1 && c.Y2 == c.Y1
                    ? sqrt(
                        (h.X1 - c.X1) * (h.X1 - c.X1) +
                          (h.Y1 - c.Y1) * (h.Y1 - c.Y1)
                      )
                    : (max(h.X2, c.X2) - min(h.X1, c.X1)) *
                        (max(h.Y2, c.Y2) - min(h.Y1, c.Y1)) -
                      h.Volume),
                h < j || (h == j && b.Entries[g].BoundingBox < i))
              )
                (d = g), (j = h), (i = b.Entries[g].Volume);
            b = b.Entries[d];
            a++;
          }
          b.addChild(c, a == 1);
          for (
            c =
              b.Entries.length > this.MaxEntriesPerNode
                ? this.splitNode(b)
                : [];
            b.ParentNode != null;

          )
            c.length != 2
              ? b.ParentNode.updateBoundingBox(b.X1, b.X2, b.Y1, b.Y2)
              : (b.ParentNode.removeChild(b.ParentEntry, !1),
                b.ParentNode.addChild(c[0], !1),
                b.ParentNode.addChild(c[1], !1),
                (c =
                  b.ParentNode.Entries.length > this.MaxEntriesPerNode
                    ? this.splitNode(b.ParentNode)
                    : [])),
              (b = b.ParentNode);
          if (c.length == 2)
            (this.Root = new f.RTreeNode(!1)),
              this.Root.addChild(c[0], !0),
              this.Root.addChild(c[1], !0),
              this.Ta++;
        },
        remove: function (c) {
          for (
            var b = [[null, null]], a = this.Root, g = 0, d = !1, i = 0, i = 0;
            a != null && !d;

          ) {
            if (a.Leaf)
              for (i = 0; i < a.Entries.length; i++) {
                if (a.Entries[i] == c) {
                  a.removeChild(i);
                  d = !0;
                  break;
                }
              }
            else {
              if (a.Entries.length > g + 1)
                for (i = g + 1; i < a.Entries.length; i++)
                  if (a.Entries[i].overlaps(c.X1, c.X2, c.Y1, c.Y2)) {
                    b[b.length++] = [a, i];
                    break;
                  }
              childOverlaps = !1;
              for (i = 0; i < a.Entries[g].Entries.length; i++)
                if (a.Entries[g].Entries[i].overlaps(c.X1, c.X2, c.Y1, c.Y2)) {
                  a = a.Entries[g];
                  g = i;
                  childOverlaps = !0;
                  break;
                }
              if (childOverlaps) continue;
            }
            d ||
              ((a = b[b.length - 1][0]), (g = b[b.length - 1][1]), b.length--);
          }
          if (a == null) return !1;
          c = [];
          for (i = 0; a.ParentNode != null; )
            a.calculateBoundingBox(),
              a.Entries.length < this.MinEntriesPerNode &&
                (a.Entries.length > 0
                  ? c.push([
                      this.Ta - i,
                      a.ParentNode.removeChild(a.ParentEntry),
                    ])
                  : a.ParentNode.removeChild(a.ParentEntry),
                i++),
              (a = a.ParentNode);
          b = this.Ta;
          for (i = 0; i < c.length; i++) {
            for (a = 0; a < c[i][1].Entries.length; a++)
              this.Yl(c[i][1].Entries[a], c[i][0]);
            if (this.Ta != b) for (a = 0; a < c.length; a++) c[a][0]++;
          }
          if (
            this.Root.Entries.length == 1 &&
            !(this.Root.Entries[0] instanceof f.RTreeRecord)
          )
            this.Ta--,
              (this.Root = this.Root.Entries[0]),
              (this.Root.ParentNode = null);
          return !0;
        },
        searchByPriority: function (c, b, a, g) {
          var d,
            i = {},
            j = [[null, null]],
            h = this.Root,
            e = 0;
          d = 0;
          var l;
          c > b && ((d = c), (c = b), (b = d));
          a > g && ((d = a), (a = g), (g = d));
          for (; h != null; ) {
            if (h.Leaf)
              for (d = 0; d < h.Entries.length; d++)
                h.Entries[d].overlaps(c, b, a, g) &&
                  (typeof i[h.Entries[d].Priority] == "undefined" &&
                    (i[h.Entries[d].Priority] = []),
                  (i[h.Entries[d].Priority][i[h.Entries[d].Priority].length++] =
                    h.Entries[d]));
            else {
              if (h.Entries.length > e + 1)
                for (d = e + 1; d < h.Entries.length; d++)
                  if (h.Entries[d].overlaps(c, b, a, g)) {
                    j[j.length++] = [h, d];
                    break;
                  }
              for (d = l = 0; d < h.Entries[e].Entries.length; d++)
                if (h.Entries[e].Entries[d].overlaps(c, b, a, g)) {
                  h = h.Entries[e];
                  e = d;
                  l = 1;
                  break;
                }
              if (l) continue;
            }
            h = j[j.length - 1][0];
            e = j[j.length - 1][1];
            j.length--;
          }
          return i;
        },
        search: function (c, b, a, g, d) {
          var i = [],
            d = d || this.Root,
            j,
            h,
            e;
          c > b && ((t = c), (c = b), (b = t));
          a > g && ((t = a), (a = g), (g = t));
          if (d.overlaps(c, b, a, g)) {
            h = 0;
            for (e = d.Entries.length; h < e; h++)
              (j = d.Entries[h]),
                j.overlaps(c, b, a, g) &&
                  (j.Leaf
                    ? i.push(j)
                    : (i = i.concat(this.search(c, b, a, g, j))));
          }
          return i;
        },
        Yl: function (c, b) {
          for (var a = this.Root, g = 0, d = 1, i, j, h, e; d < b; ) {
            j = i = null;
            h = Infinity;
            for (g = 0; g < a.Entries.length; g++)
              if (
                ((e = a.Entries[g]),
                (e =
                  (max(e.X2, c.X2) - min(e.X1, c.X1)) *
                    (max(e.Y2, c.Y2) - min(e.Y1, c.Y1)) -
                  e.Volume),
                e < h || (e == h && a.Entries[g].BoundingBox < j))
              )
                (i = g), (h = e), (j = a.Entries[g].Volume);
            a = a.Entries[i];
            d++;
          }
          a.addChild(c);
          for (
            g =
              a.Entries.length > this.MaxEntriesPerNode
                ? this.splitNode(a)
                : [];
            a.ParentNode != null;

          )
            g.length != 2
              ? a.ParentNode.updateBoundingBox(a.X1, a.X2, a.Y1, a.Y2)
              : (a.ParentNode.removeChild(a.ParentEntry, !1),
                a.ParentNode.addChild(g[0], !1),
                a.ParentNode.addChild(g[1], !1),
                (g =
                  a.ParentNode.Entries.length > this.MaxEntriesPerNode
                    ? this.splitNode(a.ParentNode)
                    : [])),
              (a = a.ParentNode);
          if (g.length == 2)
            (this.Root = new f.RTreeNode(!1)),
              this.Root.addChild(g[0]),
              this.Root.addChild(g[1]),
              this.Ta++;
        },
        splitNode: null,
        An: function (c) {
          for (
            var b = new f.RTreeNode(c.Leaf, c.ParentNode),
              a = new f.RTreeNode(c.Leaf, c.ParentNode),
              g = null,
              d = null,
              i = -Infinity,
              j = 0,
              h = 0,
              e = null,
              l = null,
              k = c.Entries.length,
              j = 0;
            j < k;
            j++
          ) {
            e = c.Entries[j];
            for (h = j + 1; h < k; h++)
              (l = c.Entries[h]),
                (l =
                  (max(e.X2, l.X2) - min(e.X1, l.X1)) *
                    (max(e.Y2, l.Y2) - min(e.Y1, l.Y1)) -
                  e.Volume -
                  l.Volume),
                l > i && ((g = j), (d = h), (i = l));
          }
          b.addChild(c.Entries.splice(g, 1)[0]);
          for (
            a.addChild(c.Entries.splice(d - 1, 1)[0]);
            c.Entries.length > 0;

          ) {
            if (this.MinEntriesPerNode - b.Entries.length == c.Entries.length) {
              for (; c.Entries.length > 0; )
                b.addChild(c.Entries.splice(0, 1)[0]);
              break;
            } else if (
              this.MinEntriesPerNode - a.Entries.length ==
              c.Entries.length
            ) {
              for (; c.Entries.length > 0; )
                a.addChild(c.Entries.splice(0, 1)[0]);
              break;
            }
            g = null;
            d = -1;
            for (j = 0; j < c.Entries.length; j++)
              (i = c.Entries[j]),
                (i = abs(
                  (max(b.X2, i.X2) - min(b.X1, i.X1)) *
                    (max(b.Y2, i.Y2) - min(b.Y1, i.Y1)) *
                    b.Volume -
                    (max(a.X2, i.X2) - min(a.X1, i.X1)) *
                      (max(a.Y2, i.Y2) - min(a.Y1, i.Y1)) *
                      a.Volume
                )),
                i > d && ((g = j), (d = i));
            b.getEnlargement(
              c.Entries[g].X1,
              c.Entries[g].X2,
              c.Entries[g].Y1,
              c.Entries[g].Y2
            ) -
              a.getEnlargement(
                c.Entries[g].X1,
                c.Entries[g].X2,
                c.Entries[g].Y1,
                c.Entries[g].Y2
              ) <
            0
              ? b.addChild(c.Entries.splice(g, 1)[0])
              : a.addChild(c.Entries.splice(g, 1)[0]);
          }
          return [b, a];
        },
        yn: function (c) {
          for (
            var b = new f.RTreeNode(c.Leaf, c.ParentNode),
              a = new f.RTreeNode(c.Leaf, c.ParentNode),
              g = null,
              d = null,
              i = -Infinity,
              j = 0,
              h = 0,
              e = null,
              l = null,
              k = c.Entries.length;
            j < k;
            j++
          ) {
            e = c.Entries[j];
            for (h = j + 1; h < k; h++)
              (l = c.Entries[h]),
                (l = max(
                  max(abs(e.X1 - l.X1), abs(e.X2 - l.X2)),
                  max(max(abs(e.Y1 - l.Y1), abs(e.Y2 - l.Y2)))
                )),
                l > i && ((g = j), (d = h), (i = l));
          }
          b.addChild(c.Entries.splice(g, 1)[0]);
          for (
            a.addChild(c.Entries.splice(d - 1, 1)[0]);
            c.Entries.length > 0;

          ) {
            if (this.MinEntriesPerNode - b.Entries.length == c.Entries.length) {
              for (; c.Entries.length > 0; )
                b.addChild(c.Entries.splice(0, 1)[0]);
              break;
            } else if (
              this.MinEntriesPerNode - a.Entries.length ==
              c.Entries.length
            ) {
              for (; c.Entries.length > 0; )
                a.addChild(c.Entries.splice(0, 1)[0]);
              break;
            }
            g = c.Entries[0];
            b.getEnlargement(g.X1, g.X2, g.Y1, g.Y2) -
              a.getEnlargement(g.X1, g.X2, g.Y1, g.Y2) <
            0
              ? b.addChild(c.Entries.splice(0, 1)[0])
              : a.addChild(c.Entries.splice(0, 1)[0]);
          }
          return [b, a];
        },
        zn: function (c) {
          for (
            var b = new f.RTreeNode(c.Leaf, c.ParentNode),
              a = new f.RTreeNode(c.Leaf, c.ParentNode),
              g = null,
              d = null,
              i = -Infinity,
              j = 0,
              h = 0,
              e = null,
              l = null,
              k = c.Entries.length;
            j < k;
            j++
          ) {
            e = c.Entries[j];
            for (h = j + 1; h < k; h++)
              (l = c.Entries[h]),
                (l = sqrt(
                  (e.X1 - l.X1) * (e.X1 - l.X1) + (e.Y1 - l.Y1) * (e.Y1 - l.Y1)
                )),
                l > i && ((g = j), (d = h), (i = l));
          }
          b.addChild(c.Entries.splice(g, 1)[0]);
          for (
            a.addChild(c.Entries.splice(d - 1, 1)[0]);
            c.Entries.length > 0;

          ) {
            if (this.MinEntriesPerNode - b.Entries.length == c.Entries.length) {
              for (; c.Entries.length > 0; )
                b.addChild(c.Entries.splice(0, 1)[0]);
              break;
            } else if (
              this.MinEntriesPerNode - a.Entries.length ==
              c.Entries.length
            ) {
              for (; c.Entries.length > 0; )
                a.addChild(c.Entries.splice(0, 1)[0]);
              break;
            }
            g = c.Entries[0];
            b.getEnlargement(g.X1, g.X2, g.Y1, g.Y2) -
              a.getEnlargement(g.X1, g.X2, g.Y1, g.Y2) <
            0
              ? b.addChild(c.Entries.splice(0, 1)[0])
              : a.addChild(c.Entries.splice(0, 1)[0]);
          }
          return [b, a];
        },
        xn: function (c) {
          for (
            var b = new f.RTreeNode(c.Leaf, c.ParentNode),
              a = new f.RTreeNode(c.Leaf, c.ParentNode),
              g = c.Entries.length / 2,
              d = 0,
              d = 0;
            d <= g;
            d++
          )
            b.addChild(c.Entries.splice(0, 1)[0], !0);
          for (; c.Entries.length > 0; )
            a.addChild(c.Entries.splice(0, 1)[0], !0);
          return [b, a];
        },
      });
    })(nokia.maps.util);
    ovi.provide("ovi.ConsoleLogger");
    (function () {
      try {
        typeof window.loadFirebugConsole === "function" &&
          window.loadFirebugConsole();
      } catch (f) {}
      var e = null;
      ovi.ConsoleLogger = function () {
        if (e !== null) return e;
        if (
          window &&
          window.console &&
          /function/.test(window.console.log + "")
        )
          for (
            var c = function (a) {
                a = /function/.test(window.console[a] + "") ? a : "log";
                return typeof window.console[a] === "function"
                  ? function () {
                      window.console[a].apply(window.console, arguments);
                    }
                  : function (b, c, h, g, l, k, e, f, o, q, r) {
                      window.console[a](
                        b || "",
                        c || "",
                        h || "",
                        g || "",
                        l || "",
                        k || "",
                        e || "",
                        f || "",
                        o || "",
                        q || "",
                        r ? "..." : ""
                      );
                    };
              },
              b = ["info", "debug", "warn", "error"],
              a = 0,
              g;
            (g = b[a]);
            a++
          )
            this[g] = c(g);
        else this.debug = this.info = this.warn = this.error = function () {};
        return (e = this);
      };
      ovi.Logger &&
        window &&
        window.console &&
        /function/.test(window.console.log + "") &&
        ovi.Logger.addLogger(new ovi.ConsoleLogger());
    })(ovi);
    ovi.provide("nokia.maps.util.ApplicationContext");
    (function (f) {
      var e,
        c = new ovi.Class({
          Extends: f.util.OObject,
          initialize: function () {
            if (e) return e;
            e = this;
            e.defaultLanguageSetter = function (b) {
              this.gm &&
                f.util.Za(
                  "defaultLanguage cannot be set after a display was initialized"
                );
              var a = f.language.Info,
                c = f.Features,
                d;
              if (f.Config.getDefault("language.overrideDetection")) {
                b = b === "auto" ? a.detect(b) : b;
                try {
                  d = c && !c.isLoaded("language", b);
                } catch (i) {
                  d = !1;
                }
              } else
                (b = a.detect(b) || "en-GB"),
                  (d = c && !c.isLoaded("language", b));
              d
                ? c.load({ language: b })
                : a.set("language", a.getDefinition(b));
              return b;
            };
          },
          authenticationToken: "",
          appId: "",
          defaultLanguage: "",
          useSSL: !1,
          lockLanguage: function () {
            this.gm = !0;
          },
        });
      f.util.ApplicationContext = new c();
    })(nokia.maps);
    ovi.provide("nokia.maps.util.Pen");
    (function (f) {
      var e = nokia.maps.gfx.Color.parseCss;
      f.Pen = new ovi.Class({
        strokeColor: "#05A",
        lineWidth: 1,
        lineCap: "round",
        lineJoin: "miter",
        miterLimit: 10,
        stroke: "solid",
        initialize: function (c, b) {
          var a,
            g,
            d = f.f;
          if (c) {
            if ("lineWidth" in c)
              !f.isNumber(c.lineWidth) && d("width must be in range [0..100]"),
                (c.lineWidth = f.lb(c.lineWidth, 0, 100));
            "stroke" in c &&
              c.stroke !== "solid" &&
              d("cannot set anything else than stroke=solid");
            "strokeColor" in c &&
              ((g = e(c.strokeColor)), g === null && d("Invalid color set!"));
            if ("lineJoin" in c)
              (g = c.lineJoin),
                g !== "miter" &&
                  g !== "round" &&
                  g !== "bevel" &&
                  d("Invalid lineJoin set!");
            if ("lineCap" in c)
              (g = c.lineCap),
                g !== "butt" &&
                  g !== "round" &&
                  g !== "square" &&
                  d("Invalid lineCap set!");
            "miterLimit" in c &&
              !f.isNumber(c.miterLimit) &&
              d("miterLimit must be a number");
          }
          if (b instanceof nokia.maps.util.Pen) for (a in b) this[a] = b[a];
          for (a in c) this[a] = c[a];
        },
      });
    })(nokia.maps.util);
    ovi.provide("ovi.dom");
    ovi.provide("nokia.maps.search._packaging.base");
    ovi.provide("nokia.maps.net.Request");
    (function (f) {
      if (!f.util.getConstructor(f.net.Request))
        var e = f.net,
          c = f.util,
          b = c.Q,
          a = c.isArray,
          g = c.isObject,
          d = c.isString,
          i = (function () {
            return window.ActiveXObject
              ? function () {
                  return new ActiveXObject("Microsoft.XMLHTTP");
                }
              : window.XMLHttpRequest;
          })(),
          j =
            "withCredentials" in new i()
              ? i
              : typeof XDomainRequest != "undefined"
              ? XDomainRequest
              : null,
          h = (e.Request = new ovi.Class({
            Extends: f.util.OObject,
            initialize: function (a, d) {
              var b = this;
              b.G = {};
              b.zi = {};
              b.Fe = h.managerCounter++;
              b.u = a === h.JSONP || a === h.XHR ? a : h.JSONP;
              b.pi = 3e4;
              b.ie = !1;
              b.me = "jsoncallback";
              b.xa = !1;
              b.d = null;
              d && d.timeout && (b.pi = d.timeout);
              d && d.callbackKey && (b.me = d.callbackKey);
              d && d.standardJSONP && (b.xa = d.standardJSONP);
              d && d.autoSkip && (b.ie = d.autoSkip);
              a == h.XHR && d && d.xDomain && (b.Vn = d.xDomain);
              b.u == h.JSONP &&
                b.xa == !1 &&
                (e.Request.callbacks[b.Fe] = function (a, d) {
                  b.rg(a, d);
                });
              if (
                b.u == h.XHR &&
                ((b.Ac = {}),
                (b.Ci = d || {}),
                window.execScript && window.ActiveXObject)
              ) {
                var c = "BinaryToArray" + new Date().getTime();
                window.execScript(
                  "Function " +
                    c +
                    "(Binary)\nDim i\nReDim byteArray(LenB(Binary))\nFor i = 1 To LenB(Binary)\n  byteArray(i-1) = ChrW(AscB(MidB(Binary, i, 1)))\nNext\n" +
                    c +
                    " = byteArray\nEnd Function\n",
                  "vbscript"
                );
              }
            },
            Statics: {
              JSONP: 1,
              XHR: 2,
              requestCounter: 1,
              managerCounter: 0,
              callbacks: {},
              requestParams: {},
              timeoutCallbacks: {},
              canceledRequests: {},
            },
            destroy: function () {
              this.cancelAll();
              this.xa == !1 && (e.Request.callbacks[that.Fe] = b);
            },
            send: function (a, d, b) {
              this.d = h.requestCounter++ + "" + new Date().getTime();
              this.G[this.d] = b != void 0 ? b : this.d;
              this.zi[this.G[this.d]] = this.d;
              this.u == h.JSONP ? this.nn(a, d, this.d) : this.qn(a, d, this.d);
              return b != void 0 ? b : this.d;
            },
            cancel: function (a) {
              a = a == void 0 ? this.d : this.zi[a];
              h.canceledRequests[a] = !0;
              this.u == h.JSONP ? this.ri(a) : this.bf(a);
              this.rc(a);
            },
            cancelAll: function () {
              for (var a in this.G) this.cancel(this.G[a]);
            },
            Jk: function (a) {
              var d = this;
              e.Request.callbacks[a] = function () {
                d.rg(a, arguments);
              };
            },
            nn: function (a, d, b) {
              var c = document.createElement("script");
              this.xa && this.Jk(b);
              h.requestParams[b] = [a, d];
              this.un(c, a, d, b);
              document.body.insertBefore(c, document.body.firstChild);
              this.ii(a, d, b);
            },
            qn: function (a, d, b) {
              var c = this.Ci.method || "GET",
                i,
                g = this.Ci;
              g.uri = a;
              this.Nk(a, d, b);
              this.ii(a, d, b);
              try {
                if (
                  ((this.Ac[b] = i = this.ml(b, g)),
                  i.open(
                    c,
                    this.Sn(c, g, this.Fd),
                    !g.sync,
                    g.username,
                    g.password
                  ),
                  this.pn(i, c, g, this.Fd),
                  g.sync &&
                    ovi.browser.mozilla &&
                    parseFloat(ovi.browser.version) < 2)
                )
                  this.onreadystatechange();
              } catch (j) {
                if (b in this.G)
                  (this.Fd.error = !0),
                    delete this.G[b],
                    h.callbacks[b](this.Fd);
              }
            },
            rg: function (a, d) {
              if (!h.canceledRequests[a]) {
                var b = h.requestParams[a],
                  c = b[1];
                if (!this.ie || a == this.d)
                  c({
                    response: d.length <= 1 ? d[0] : d,
                    status: 200,
                    id: this.G[a],
                    url: b[0],
                    error: !1,
                    timeout: !1,
                  });
                delete this.G[a];
                delete h.requestParams[a];
                this.xa && delete e.Request.callbacks[a];
              }
            },
            Nk: function (a, d, b) {
              var c = this;
              e.Request.callbacks[b] = function (a) {
                c.rc(b);
                (!c.ie || b == c.d) && d(a);
                c.bf(b);
              };
            },
            bf: function (a) {
              this.Ac[a] &&
                (this.Ac[a].abort(),
                (this.Ac[a] = null),
                delete this.Ac[a],
                delete e.Request.callbacks[a]);
            },
            un: function (a, d, b, c) {
              var i = this,
                g = d.indexOf("?") < 0 ? "?" : "&";
              d += i.xa
                ? g + i.me + "=nokia.maps.net.Request.callbacks[" + c + "]"
                : g +
                  i.me +
                  encodeURI(
                    "=(function () { nokia.maps.net.Request.callbacks[" +
                      i.Fe +
                      "](" +
                      c +
                      ", arguments); })"
                  );
              a.setAttribute("src", d);
              a.setAttribute("charset", "UTF-8");
              a.setAttribute("defer", "defer");
              a.id = c;
              a.onload = a.onreadystatechange = function () {
                if (
                  !this.readyState ||
                  this.readyState === "complete" ||
                  this.readyState === "loaded"
                )
                  i.rc(c),
                    delete h.requestParams[c],
                    i.xa && delete e.Request.callbacks[c],
                    document.getElementsByTagName("body")[0].removeChild(this);
              };
              a.onerror = function () {
                h.canceledRequests[c] ||
                  (i.rc(c),
                  (b = h.requestParams[c][1]),
                  b({
                    id: i.G[c],
                    url: h.requestParams[c][0],
                    error: !0,
                    timeout: !1,
                  }),
                  delete i.G[c],
                  delete h.requestParams[c],
                  i.xa && delete e.Request.callbacks[c],
                  document.getElementsByTagName("body")[0].removeChild(this));
              };
            },
            ii: function (a, d, b) {
              h.timeoutCallbacks[b] = setTimeout(this.ll(a, d, b), this.pi);
            },
            ll: function (a, d, b) {
              var c = this;
              return function () {
                h.canceledRequests[b] = !0;
                c.u == h.JSONP
                  ? ((d = h.requestParams[b][1]),
                    (a = h.requestParams[b][0]),
                    c.ri(b))
                  : c.bf(b);
                d({ status: 408, id: c.G[b], url: a, error: !1, timeout: !0 });
                delete c.G[b];
                c.rc(b);
              };
            },
            ri: function (a) {
              var d = document.getElementById(a);
              if (d)
                (d.onload = d.onreadystatechange = b),
                  (d.onerror = b),
                  (d.src = ""),
                  document.getElementsByTagName("body")[0].removeChild(d);
              delete h.requestParams[a];
              this.xa && (e.Request.callbacks[a] = b);
            },
            rc: function (a) {
              clearTimeout(h.timeoutCallbacks[a]);
              delete h.timeoutCallbacks[a];
            },
            pn: function (a, d, b) {
              var c = "text/plain",
                h = "",
                i;
              if (d !== "GET" && d !== "DELETE")
                if (b.json)
                  (c = "application/json"), (h = ovi.json.stringify(b.json));
                else if (b.xml)
                  if (((c = "text/xml"), XMLSerializer))
                    h = new XMLSerializer().serializeToString(b.xml);
                  else if (b.xml.xml) h = b.xml.xml;
                  else throw "error";
                else
                  b.content && d !== "GET"
                    ? ((c = "application/x-www-form-urlencoded"),
                      (h = this.Nh(b.content)))
                    : (h = b.body || "");
              c = b.mimeType || c;
              b.charset && (c += "; charset=" + b.charset);
              c = { "content-type": c };
              d = b.headers || {};
              for (i in d)
                d.hasOwnProperty(i) && (c[i.toString().toLowerCase()] = d[i]);
              if (b.preventCache === "headers" || b.preventCache === "both")
                c.pragma = c["cache-control"] = "no-cache";
              for (i in c)
                c.hasOwnProperty(i) &&
                  (i !== "content-type" || b.handleAs === "arraybuffer") &&
                  a.setRequestHeader(i, c[i]);
              b.handleAs === "binary" &&
                a.overrideMimeType &&
                (a.overrideMimeType(
                  (c["content-type"] = "text/text; charset=x-user-defined")
                ),
                (h = ""),
                delete c["content-length"]);
              if (b.handleAs === "arraybuffer") a.responseType = "arraybuffer";
              a.send(h);
            },
            Sn: function (a, d, b) {
              a = d.uri;
              d.preventCache &&
                d.preventCache !== "headers" &&
                (a +=
                  (a.indexOf("?") === -1 ? "?" : "&") +
                  "preventCache=" +
                  new Date().getTime());
              (d = d.uriParameters) &&
                (a += (a.indexOf("?") === -1 ? "?" : "&") + this.Nh(d));
              return (b.url = a);
            },
            Nh: function (d, b) {
              var c = [],
                h,
                i;
              if (g(d)) {
                for (h in d)
                  (i = b ? b + "." + h : h), c.push(this.params(d[h], i));
                return c.join("&");
              } else if (a(d)) {
                for (h = 0; h < d.length; h++) d[h] = this.params(d[h], b);
                return d.join("&");
              } else if (!d) return "";
              return b ? this.ci(b) + "=" + this.ci(d) : "" + d;
            },
            ci: function (a) {
              return encodeURIComponent(a)
                .replace(/\!/g, "%21")
                .replace(/\*/g, "%2A")
                .replace(/\'/g, "%27")
                .replace(/\(/g, "%28")
                .replace(/\)/g, "%29");
            },
            jn: function (a, d) {
              function b(a) {
                this.message = a;
                this.name = "ParserError";
              }
              var c = d.handleAs || "text";
              c === "autodetect" &&
                ((c = a.getResponseHeader("content-type") || ""),
                (c = c.match(/[+\/]json/)
                  ? "json"
                  : c.match(/[+\/]xml/)
                  ? "xml"
                  : "text"));
              switch (c) {
                case "json":
                  c = ovi.json.parse(a.responseText);
                  break;
                case "xml":
                  if (a.responseXML)
                    if (window.ActiveXObject) {
                      if (
                        ((c = new ActiveXObject("Microsoft.XMLDOM")),
                        (c.async = "false"),
                        c.loadXML(a.responseText),
                        c.documentElement === null)
                      )
                        throw new b("Broken XML - parser error");
                    } else if (
                      (c = a.responseXML.getElementsByTagName("parsererror")) &&
                      c.length > 0
                    )
                      throw new b(c.item(0).textContent);
                    else c = a.responseXML;
                  else if (DOMParser) {
                    if (
                      ((c = new DOMParser().parseFromString(
                        a.responseText,
                        "text/xml"
                      )),
                      (ovi.browser.safari || ovi.browser.chrome) &&
                        c.documentElement.textContent)
                    )
                      throw new b(c.documentElement.textContent);
                  } else throw new b("Broken XML - parser error");
                  break;
                case "arraybuffer":
                  c = a.response;
                  break;
                default:
                  c = a.responseText;
              }
              return c;
            },
            ml: function (a, b) {
              var c = this,
                g,
                e,
                f = { status: 417 };
              c.Fd = f;
              b = d(b) ? { uri: b } : b;
              g = b.window || window;
              try {
                (e = b.xhr || c.Vn ? new j() : new i()),
                  (c.onreadystatechange = e.onreadystatechange =
                    function () {
                      f.id = c.G[a];
                      f.timeout = !1;
                      f.error = !1;
                      if (!h.canceledRequests[a] && e.readyState === 4)
                        if (
                          ovi.browser.msie &&
                          (e.status === 2 || e.status === 3)
                        )
                          f.status = 401;
                        else {
                          f.status =
                            (e.status >= 300 && e.status !== 1223) ||
                            (e.status === 0 &&
                              !(e.responseType === "arraybuffer" ||
                              e.responseType === "blob"
                                ? e.response
                                : e.responseText) &&
                              ("file:" === g.location.protocol ||
                                "widget:" === g.location.protocol))
                              ? e.status || 404
                              : e.status || 200;
                          try {
                            f.response = c.jn(e, b);
                          } catch (d) {
                            if (a in c.G)
                              (f.error = !0), delete c.G[a], h.callbacks[a](f);
                          }
                          ovi.browser.msie && (e = null);
                          if (!(f.status >= 200 && f.status < 300 && !f.error))
                            f.error = !0;
                          delete c.G[a];
                          h.callbacks[a](f);
                        }
                    }),
                  g.location.protocol === "file:" &&
                    g.netscape &&
                    g.netscape.security &&
                    g.netscape.security.PrivilegeManager &&
                    g.netscape.security.PrivilegeManager.enablePrivilege &&
                    g.netscape.security.PrivilegeManager.enablePrivilege(
                      "UniversalBrowserRead"
                    );
              } catch (q) {
                if (a in c.G) (f.error = !0), delete c.G[a], h.callbacks[a](f);
              }
              return e;
            },
          }));
    })(nokia.maps);
    ovi.provide("nokia.maps.dom.EventTarget");
    (function (f) {
      if (!nokia.maps.util.getConstructor(nokia.maps.dom.EventTarget)) {
        var e = !e,
          c = !e,
          b = e,
          a = (f.EventTarget = function (a) {
            var a = a || this,
              b;
            if (!a.isEventTarget) {
              for (b in g) b in a || (a[b] = g[b]);
              a.draggable ? a.enableDrag() : a.disableDrag();
            }
            return a;
          }),
          g = {
            isEventTarget: e,
            draggable: c,
            enableUserSelect: function () {
              var a = this.style;
              if (ovi.type(this) === "element")
                (a.KhtmlUserSelect = "auto"),
                  (a.MozUserSelect = "auto"),
                  (a.OUserSelect = "auto"),
                  (a.WebkitUserSelect = "auto"),
                  (a.WebkitTouchCallout = "auto");
              return this;
            },
            disableUserSelect: function () {
              var a = this.style;
              if (ovi.type(this) === "element")
                (a.KhtmlUserSelect = "none"),
                  (a.MozUserSelect = "none"),
                  (a.OUserSelect = "none"),
                  (a.WebkitUserSelect = "none"),
                  (a.WebkitTouchCallout = "none");
              return this;
            },
            enableDrag: function () {
              var a = this.style;
              this.disableUserSelect();
              if (ovi.type(this) === "element")
                (a.WebkitUserDrag = "element"), (a.KhtmlUserDrag = "element");
              this.draggable = e;
              return this;
            },
            disableDrag: function () {
              var a = this.style;
              if (this.draggable && ovi.type(this) === "element")
                (a.KhtmlUserDrag = "auto"), (a.WebkitUserDrag = "auto");
              this.draggable = c;
              return this;
            },
            insertListener: function (a, b, c) {
              return this.addListenerNS(null, a, b, c, e);
            },
            addListener: function (a, b, c) {
              return this.addListenerNS(null, a, b, c);
            },
            insertListenerNS: function (a, b, c, h) {
              return this.addListenerNS(a, b, c, h, e);
            },
            addListenerNS: function (a, b, c, h, g) {
              var l = this.eventListener || (this.eventListener = {}),
                l = l[b] || (l[b] = []),
                h = h || !1,
                k,
                e;
              if (b === "beforeunload") (e = f.Page.ng)[e.length] = c;
              else if (b === "resize")
                if (
                  (((e = f.Page.df)[e.length] = k = { node: this }),
                  (b = ovi.type(this)) === "window")
                )
                  (k.layoutWidth = (b = f.Page(this)).layoutWidth),
                    (k.layoutHeight = b.layoutHeight);
                else if (b === "element")
                  (k.offsetWidth = this.offsetWidth),
                    (k.offsetHeight = this.offsetHeight);
              g ? l.unshift(c, h, a) : l.push(c, h, a);
              return this;
            },
            removeListener: function (a, b, c) {
              return this.removeListenerNS(null, a, b, c);
            },
            removeListenerNS: function (a, b, c, h) {
              var g = this.eventListener,
                l,
                k,
                e,
                h = h || !1;
              if (b === "beforeunload") {
                e = (l = f.Page.ng).length;
                for (k = -1; ++k < e; )
                  if (l[k] === c) {
                    l.splice(k, 1);
                    break;
                  }
              } else if (b === "resize") {
                e = (l = f.Page.df).length;
                for (k = -1; ++k < e; )
                  if (l[k].node === this) {
                    l.splice(k, 1);
                    break;
                  }
              }
              if (g && g[b]) {
                l = g[b];
                e = l.length;
                for (k = 0; k < e; k += 3)
                  if (l[k] === c && l[k + 1] === h && l[k + 2] === a) {
                    l.splice(k, 3);
                    break;
                  }
                l.length === 0 && delete g[b];
              }
              return this;
            },
            dispatch: function (d) {
              return a.dispatchEvent(this, d);
            },
            hitTest: function (a, b) {
              var g;
              if (
                this.parentNode &&
                this.ownerDocument &&
                (g = f.Page(this.ownerDocument).getClientRect(this)) &&
                a >= g.left &&
                a <= g.right &&
                b >= g.top &&
                b <= g.bottom
              )
                return e;
              return c;
            },
          };
        ovi.extend(a.prototype, g);
        a.getDispatchPath = function (a, b, c) {
          for (var h, g = [], l = c && c.u === "display"; a; )
            b
              ? (h = a.eventListener) && (h = h[b]) && h.length && g.push(a)
              : g.push(a),
              (a =
                l && a.u && a.getParent
                  ? a.getParent(c)
                  : b && a.parentNodes && c && a.parentNodes[c]
                  ? a.parentNodes[c]
                  : a.parentNode);
          return g;
        };
        a.catchException = function (a) {
          b = a === e;
        };
        a.dispatchEvent = function (d, c, g) {
          var c = c instanceof f.Event ? c : f.Page.parseEvent(c),
            h = c.type,
            m = c.namespaceURI,
            g = g || a.getDispatchPath(d, h, c.display || m),
            l = g.length,
            k,
            n,
            p,
            o;
          if (!h || l === 0) return e;
          c.target = c.target || d;
          c.eventPhase = 1;
          for (d = c.canSicker ? l - 1 : 0; d >= 0; d--)
            if (
              (d === 0 && c.eventPhase++,
              (n = g[d]),
              (c.currentTarget = n),
              (o = n.eventListener && n.eventListener[h]) && (p = o.length))
            ) {
              for (k = p - 3; k >= 0; k -= 3)
                if (
                  (o[k + 1] || d === 0) &&
                  !(o[k + 2] !== null && o[k + 2] !== m)
                ) {
                  if (b)
                    try {
                      o[k].call(n, c);
                    } catch (q) {
                      ovi.warn(
                        "Exception in event listener #" +
                          k / 3 +
                          ", capturing phase for event " +
                          h
                      ),
                        ovi.error(
                          String(q) === "[object Error]" ? q.message : q
                        );
                    }
                  else o[k].call(n, c);
                  if (c.propagation === 2) return !c.defaultPrevented;
                }
              if (c.propagation === 1) return !c.defaultPrevented;
            }
          c.eventPhase++;
          if (c.canBubble)
            for (d = 1; d < l; d++)
              if (
                ((n = g[d]),
                (c.currentTarget = n),
                (o = n.eventListener && n.eventListener[h]) && (p = o.length))
              ) {
                for (k = p - 3; k >= 0; k -= 3)
                  if (!o[k + 1] && !(o[k + 2] !== null && o[k + 2] !== m)) {
                    if (o[k])
                      if (b)
                        try {
                          o[k].call(n, c);
                        } catch (r) {
                          ovi.warn(
                            "Exception in event listener #" +
                              k / 3 +
                              ", bubbling phase for event " +
                              h
                          ),
                            ovi.error(r);
                        }
                      else o[k].call(n, c);
                    if (c.propagation === 2) return !c.defaultPrevented;
                  }
                if (c.propagation === 1) break;
              }
          return !c.defaultPrevented;
        };
      }
    })(nokia.maps.dom);
    ovi.provide("nokia.maps.dom.DataTransfer");
    (function () {
      if (!nokia.maps.util.getConstructor(nokia.maps.dom.DataTransfer)) {
        var f = !f,
          e = { text: "text/plain", url: "text/uri-list" },
          c = { string: f, number: f, boolean: f },
          b = {
            uninitialized: { copy: f, move: f, link: f },
            none: {},
            copy: { copy: f },
            copyLink: { copy: f, link: f },
            copyMove: { copy: f, move: f },
            all: { copy: f, move: f, link: f },
            link: { link: f },
            linkMove: { move: f, link: f },
            move: { move: f },
          },
          a = ovi.Array.indexOf,
          g = (nokia.maps.dom.DataTransfer = function (a) {
            var b = -1,
              c,
              h;
            this.types = [];
            this.data = {};
            this.ndt = a || null;
            if (a && (h = a.types) && (c = a.types.length))
              for (; ++b < c; ) this.types = h[b];
            this.files = (a && a.files) || [];
          });
        ovi.extend(g.prototype, {
          lift: f,
          realTime: !f,
          cursor: "pointer",
          dropEffect: "none",
          effectAllowed: "uninitialized",
          clearData: function (d) {
            var b = this.ndt,
              g,
              h = ovi.type(d),
              m = this.types;
            if (d === void 0)
              return (
                b && b.clearData(), (this.types = {}), (this.data = {}), this
              );
            if (!c[h]) throw "Invalid format supplied!";
            d = e[(d = ("" + d).toLowerCase())] || d;
            b && b.clearData(d);
            delete this.data[d];
            (g = a(m, d)) >= 0 && m.splice(g, 1);
            return this;
          },
          setData: function (d, b) {
            var g = this.ndt,
              h = ovi.type(d),
              m = ovi.type(b),
              l = this.types;
            if (!c[h]) throw "Invalid format supplied!";
            d = e[(d = ("" + d).toLowerCase())] || d;
            g && (m === "string" ? g.setData(d, b) : g.clearData(d));
            this.data[d] = b;
            a(l, d) < 0 && (l[l.length] = d);
            return this;
          },
          getData: function (a) {
            var b,
              g = this.ndt,
              h = ovi.type(a);
            if (!c[h]) throw "Invalid format supplied!";
            a = e[(a = ("" + a).toLowerCase())] || a;
            if (g && (b = g.getData(a))) return b;
            return this.data[a];
          },
          hasData: function (a) {
            var b = this.ndt,
              g = ovi.type(a);
            if (!c[g]) throw "Invalid format supplied!";
            a = e[(a = ("" + a).toLowerCase())] || a;
            if (b && b.getData(a)) return f;
            return a in this.data;
          },
          setDragImage: function () {},
          addElement: function () {},
          allows: function (a) {
            return b[this.effectAllowed][a];
          },
        });
      }
    })(nokia.maps.dom);
    ovi.provide("nokia.maps.geo.mercator");
    (function (f) {
      var e = f.util,
        c = e.Point,
        b = e.Strip,
        a = e.Uint32Array,
        g = (function () {
          for (var a = 31, d = {}; a--; ) d[Math.pow(2, a)] = a;
          return d;
        })(),
        d = e.Oe,
        i = f.geo.Coordinate,
        e = Math,
        j = e.min,
        h = e.max,
        m = e.log,
        l = e.tan,
        k = e.atan,
        n = e.exp,
        p = e.floor,
        o = e.PI,
        q = o / 4,
        r = o / 2,
        s = 180 / o;
      f.geo.mercator = {
        id: 0,
        pointToGeo: function (a) {
          var b = a.x,
            a = a.y;
          return new i(
            a <= 0 ? 90 : a >= 1 ? -90 : s * (2 * k(n(o * (1 - 2 * a))) - r),
            (b === 1 ? 1 : d(b, 1)) * 360 - 180,
            void 0,
            1
          );
        },
        xyToGeo: function (a, b) {
          return new i(
            b <= 0 ? 90 : b >= 1 ? -90 : s * (2 * k(n(o * (1 - 2 * b))) - r),
            (a === 1 ? 1 : d(a, 1)) * 360 - 180,
            void 0,
            1
          );
        },
        mapXYToGeo: function (a, b) {
          return new i(
            b <= 0
              ? 90
              : b >= 1073741823
              ? -90
              : s * (2 * k(n(o * (1 - (2 * b) / 1073741823))) - r),
            (a === 1073741823 ? 1 : d(a / 1073741823, 1)) * 360 - 180
          );
        },
        mapPointsToGeo: function (a, c) {
          for (
            var c = c || b.stencil(b.LAT_LNG),
              h = c.data,
              g = a.length,
              i = 0,
              l = 0,
              j = c.names.length,
              e = c.offsets.latitude,
              m = c.offsets.longitude,
              f,
              q;
            i < g;

          )
            (h[l + m] =
              ((f = a[i++]) === 1073741823 ? 1 : d(f / 1073741823, 1)) * 360 -
              180),
              (h[l + e] =
                (q = a[i++]) <= 0
                  ? 90
                  : q >= 1073741823
                  ? -90
                  : s * (2 * k(n(o * (1 - (2 * q) / 1073741823))) - r)),
              (l += j);
          return c;
        },
        geoToPoint: function (a) {
          return new c(
            a.longitude / 360 + 0.5,
            j(1, h(0, 0.5 - m(l(q + (r * a.latitude) / 180)) / o / 2))
          );
        },
        latLngToPoint: function (a, b) {
          return new c(
            b / 360 + 0.5,
            j(1, h(0, 0.5 - m(l(q + (r * a) / 180)) / o / 2))
          );
        },
        latLngToMapPoint: function (a, b) {
          return new c(
            p((b / 360 + 0.5) * 1073741823),
            p(j(1, h(0, 0.5 - m(l(q + (r * a) / 180)) / o / 2)) * 1073741823)
          );
        },
        geoToMapPoints: function (b, d) {
          var c = b.data,
            g = c.length,
            i = 0,
            k = 0,
            e = b.names.length,
            f = b.offsets.latitude,
            n = b.offsets.longitude;
          for (d || (d = new a((g / e) * 2)); k < g; )
            (d[i++] = p((c[k + n] / 360 + 0.5) * 1073741823)),
              (d[i++] = p(
                j(1, h(0, 0.5 - m(l(q + (r * c[k + f]) / 180)) / o / 2)) *
                  1073741823
              )),
              (k += e);
          return d;
        },
        scaleMapXY: function (a, b, d, h) {
          var i = 30 - g[d];
          return h
            ? new c(a >> i, b >> i)
            : ((h = (d -= 1) >> 1),
              new c((a >> i) + ((a & d) > h), (b >> i) + ((b & d) > h)));
        },
        scaleMapPoints: function (b, d, c, h, i) {
          var k = b.length,
            l = 0,
            j = 0,
            e = 0,
            f = 30 - g[d],
            m,
            n,
            o,
            q;
          c || (c = new a(k));
          i = !!i;
          if (h)
            if (i) for (; l < k; ) c[l] = b[l++] >> f;
            else {
              for (; j < k; )
                if (((l = b[j++] >> f), (n = b[j++] >> f), o !== l || q !== n))
                  (c[e++] = o = l), (c[e++] = q = n);
              c.length = e;
            }
          else {
            for (h = (d -= 1) >> 1; j < k; )
              if (
                ((l = ((m = b[j++]) >> f) + ((m & d) > h)),
                (n = ((m = b[j++]) >> f) + ((m & d) > h)),
                i || o !== l || q !== n)
              )
                (c[e++] = o = l), (c[e++] = q = n);
            if (!i) c.length = e;
          }
          return c;
        },
      };
    })(nokia.maps);
    ovi.provide("nokia.maps.language._packaging.base");
    ovi.provide("nokia.maps.util.Coroutine");
    (function () {
      function f() {
        var a = k(),
          d = a;
        N = 0;
        c();
        if (T)
          for (var g = k(), a = g + S.AF_MAX_EXEC_TIME; G.length && g < a; )
            (g = G.shift().data), (g = g.run()), c();
        else {
          g = k();
          for (a = g + S.MAX_EXEC_TIME; E.length && g < a; )
            A
              ? ((g = L.shift()),
                g || ((g = L), (L = F), (F = g), O++, (g = L.shift())),
                (g = g.data))
              : (g = E.shift().data),
              (g = g.run()),
              c(),
              (A = !A);
        }
        b((a = k()));
        D && h.clearTimeout(D);
        D = h.setTimeout(e, N + 75);
        y += a - d;
      }
      function e() {
        D && h.clearTimeout(D);
        D = setTimeout(e, 500);
        k() > N && f();
      }
      function c() {
        var a, b, d;
        for (a = a || k(); (b = z.l) && b && (d = b.data).yc <= a; )
          S.resume(d);
      }
      function b(a) {
        var b;
        G.length && M();
        E.length
          ? H(0)
          : (b = z.l)
          ? ((a = b.data.yc - (a || k())), H(a < 0 ? 0 : a))
          : H();
      }
      function a(a, b) {
        return b.nice(!0) - a.nice(!0);
      }
      function g(a, b) {
        return a.yc - b.yc;
      }
      function d(a, b) {
        o.call(this);
        j.prototype = (v && v.scope) || (u && u.scope) || {};
        var d = -1,
          c,
          h = a && a.Qk,
          g = new j(b);
        if (a && a.defaults) for (c in a.defaults) this[c] = a.defaults[c];
        this.id = "ctx#" + s++;
        this.parent = v || u || null;
        this.name = (this.coroutine = a) && a.od;
        this.S = { length: 0 };
        this.M = { length: 0 };
        if (b && b.length)
          for (; ++d < b.length && d < h.length; ) g[h[d]] = b[d];
        this.scope = g;
        this.Cd = new p(this);
        this.Gd = new p(this);
        this.Kd = new p(this);
      }
      function i(a, b) {
        var d = this,
          c = d.context;
        do if (d.has(a)) return (d[a] = b), this;
        while ((c = c.parent) && (d = c.scope));
        u.scope[a] = b;
        return this;
      }
      function j(a) {
        this.arguments = a;
        this.has = this.hasOwn = this.hasOwnProperty;
        this.set = i;
      }
      var h = window,
        m = nokia.maps.util,
        l = {
          0: { status: "terminated" },
          1: { status: "running" },
          2: { status: "blocking" },
        },
        k = m.now,
        n = m.LinkedList,
        p = n.Element,
        o = m.OObject,
        q = Array.prototype.slice,
        r = ovi.type,
        s = 1,
        w = !0;
      d.prototype = new o({
        status: 2,
        W: 0,
        ec: 0,
        ln: 0,
        ih: -1,
        kl: 0,
        priority: 50,
        prioritySetter: function (a) {
          if (r(a) !== "number") return this.priority;
          a < 0 && (a = 0);
          a > 100 && (a = 100);
          return a;
        },
        useAnimationFrame: !1,
        qd: 0,
        nice: function (a) {
          if (a && this.ec < this.timeStamp) {
            this.W -= (this.timeStamp - this.ec) / S.SLICE_SIZE / x.length;
            if (this.W < 0) this.W = 0;
            if (this.W > 300) this.W = 300;
            this.qd = this.priority - this.W;
            this.ec = this.timeStamp;
            this.realtime && (this.qd += 1e3);
          }
          return this.qd;
        },
        realtime: !1,
        precede: function (a) {
          a instanceof d &&
            ((this.S[a.id] = a),
            this.S.length++,
            (a.M[this.id] = this),
            a.M.length++,
            a.S[this.id] &&
              (delete a.S[this.id],
              a.S.length--,
              delete this.M[a.id],
              this.M.length--));
          return this;
        },
        postpone: function (a) {
          a instanceof d &&
            ((this.M[a.id] = a),
            this.M.length++,
            (a.S[this.id] = this),
            a.S.length++,
            a.M[this.id] &&
              (delete a.M[this.id],
              a.M.length--,
              delete this.S[a.id],
              this.S.length--));
          return this;
        },
        clearPrecedence: function () {
          if (!this.S.length) return null;
          for (var a = [], b = this.S, d; void 0 in b; )
            (d = b[void 0]), delete d.M[this.id], d.M.length--, a.push(d);
          this.S = { length: 0 };
          return a;
        },
        clearPostponement: function () {
          if (!this.M.length) return null;
          for (var a = [], b = this.M, d; void 0 in precedeList; )
            (d = b[void 0]), delete d.S[this.id], d.S.length--, a.push(d);
          this.M = { length: 0 };
          return a;
        },
        run: function (a, b) {
          if (!b && !this.useAnimationFrame && this.M.length) return k();
          if (!b && this.useAnimationFrame && !T) return k();
          var d = this.Kd,
            c = this.Cd,
            g = this.Gd,
            i = this.coroutine,
            j = v,
            e = this.scope,
            f,
            m,
            n,
            o = (n = k());
          this.nice(!0);
          d.list && d.list.remove(d);
          c.list && c.list.remove(c);
          g.list && g.list.remove(g);
          v = this;
          this.ln++;
          this.Wn = a ? 1.0e20 : n + (T ? S.AF_SLICE_SIZE : S.SLICE_SIZE);
          this.ih = O;
          this.set("status", 1);
          this.timeStamp = this.callTime = n;
          this.ue = !0;
          if (w)
            try {
              m = i.$b.call(e.that, e, this);
            } catch (q) {
              f = q;
            }
          else m = i.$b.call(e.that, e, this);
          v = j;
          n = k();
          this.W += (d = n - o) / S.SLICE_SIZE;
          if (this.W < 0) this.W = 0;
          if (this.W > 300) this.W = 300;
          this.qd = this.priority - this.W;
          this.kl += d;
          this.ec = n;
          B += d;
          y -= d;
          this.clearPrecedence();
          if (f && this.onError)
            try {
              f = this.onError(e, this, f);
            } catch (r) {}
          if (f || this.ue) {
            this.ue = !1;
            this.set("returnValue", m);
            S.kill(this);
            if (this.onTerminated) this.onTerminated(e, this);
            f &&
              (ovi.warn(
                "Coroutine '" + i.od + "' aborted abnormally with exception"
              ),
              ovi.info((f.name ? f.name + ": " : "") + f.message));
          } else if (
            l[this.status] !== m &&
            !this.Ql &&
            h.console &&
            h.console.warn
          )
            (this.Ql = !0),
              console.warn(
                "The coroutine with the name '" +
                  this.coroutine.od +
                  "' returned in a blocked state, but didn't return the Coroutine.BLOCK object.\nThe reason may be a bug that the developer of the coroutine forgot a return, which can lead to errors!"
              );
          return n;
        },
      });
      var u = new d(),
        v = null,
        x = { length: 0 },
        z = new n(),
        E = new n(),
        G = new n(),
        L = new n(),
        F = new n(),
        B = 0,
        K = k(),
        y = 0,
        A = !0,
        O = 0,
        N = 0,
        T = !1,
        M = (function () {
          function a() {
            b = !1;
            T = !0;
            if (w)
              try {
                f();
              } catch (d) {
                h && h.console && h.console.log && h.console.log(d);
              }
            else f();
            T = !1;
          }
          var b = !1,
            d =
              h.requestAnimationFrame ||
              h.webkitRequestAnimationFrame ||
              h.mozRequestAnimationFrame ||
              h.oRequestAnimationFrame ||
              h.msRequestAnimationFrame ||
              function (a) {
                setTimeout(a, 10);
              };
          return function () {
            b || ((b = !0), d(a));
          };
        })(),
        H = (function () {
          function a() {
            o = null;
            f();
          }
          function b(a) {
            if (
              a.source === h &&
              a.data === "nm.util.Coroutine#postMessageHack"
            )
              return (
                a.stopImmediatePropagation
                  ? a.stopImmediatePropagation()
                  : a.stopPropagation
                  ? a.stopPropagation()
                  : (a.cancelBubble = !0),
                !j && l ? ((j = l = !1), f()) : (j = l = !1),
                !1
              );
          }
          function d() {
            c = null;
            f();
          }
          var c = null,
            g =
              h.setImmediate ||
              h.webkitSetImmediate ||
              h.mozSetImmediate ||
              h.oSetImmediate ||
              h.msSetImmediate ||
              function (a) {
                return setTimeout(a, 0);
              },
            i =
              h.clearImmediate ||
              h.webkitClearImmediate ||
              h.mozClearImmediate ||
              h.oClearImmediate ||
              h.msClearImmediate ||
              function (a) {
                return clearTimeout(a);
              },
            l = !1,
            j = !1,
            e,
            m = (function () {
              var a = navigator,
                b = a.userAgent.toLowerCase(),
                d = !1;
              if ((e = a.appName === "Microsoft Internet Explorer"))
                +(
                  ((
                    (b.match(/(?:version|chrome|firefox|msie)[\/ ]([\d.]+)/) ||
                      [])[1] || ""
                  ).match(/([\d]+(?:[.][\d]+){0,1})/) || [])[1] || 0
                ) >= 9 &&
                  +h.document.documentMode >= 9 &&
                  (d = !0);
              return d;
            })(),
            n =
              e && !m
                ? !1
                : h.postMessage && (h.addEventListener || h.attachEvent),
            o = null;
          n &&
            (h.addEventListener
              ? h.addEventListener("message", b, !1)
              : h.attachEvent("onmessage", b));
          return function (b, e) {
            var e = e || k(),
              b = +b,
              f = e + b;
            if (f !== f || f < N || !N)
              o && (h.clearTimeout(o), (o = null)),
                c && (i(c), (c = null)),
                (j = !0),
                (N = 0);
            if (f === f && !N)
              if (((N = f), b < 16))
                if (n) {
                  if (!l || j)
                    (l = !0),
                      (j = !1),
                      h.postMessage("nm.util.Coroutine#postMessageHack", "*");
                } else c || (c = g(d));
              else o || (o = h.setTimeout(a, b));
          };
        })(),
        D,
        S = (nokia.maps.util.Coroutine = {
          TERMINATED: 0,
          RUNNING: 1,
          BLOCKING: 2,
          YIELDED: l[1],
          BLOCKED: l[2],
          KILLED: l[0],
          create: function (a, b) {
            function c() {
              var a = arguments,
                b,
                h = new d(c, (b = q.call(a, 0)));
              x[h.id] = h;
              x.length++;
              h.scope.that = this;
              h.scope.context = h;
              b.callee = a.callee;
              b.caller = a.callee.caller;
              h.ec = h.createTime = h.timeStamp = h.callTime = k();
              S.resume(h);
              return h;
            }
            c.Qk = q.call(arguments, 2);
            c.od = a;
            c.$b = b;
            return c;
          },
          createEx: function (a, b, d) {
            var c = q.call(arguments, 0),
              c = c.splice(2, 1) && this.create.apply(this, c);
            d && (c.defaults = d);
            return c;
          },
          forName: function (a) {
            var b,
              d,
              c = [];
            for (b in x)
              if ((d = x[b]).name && d.name.match(a)) c[c.length] = d;
            return c;
          },
          all: function () {
            var a,
              b = [];
            for (a in x) b.push(x[a]);
            return b;
          },
          forId: function (a) {
            return x[a];
          },
          wait: function (a, b, d) {
            var c = a.$blocking || (a.$blocking = {});
            if ((d = d || v)) return (c[d.id] = d), (d.Rc = a), S.suspend(d, b);
          },
          signal: function (a) {
            var b;
            if ((a = a && a.$blocking))
              for (b in a) return S.resume((b = a[b])), b;
          },
          broadcast: function (a) {
            var b,
              d = a && a.$blocking;
            if (d) {
              for (b in d) S.resume(d[b]);
              delete a.$blocking;
            }
          },
          shallYield: function () {
            var a = v;
            return a && (a.timeStamp = k()) && a.timeStamp >= a.Wn;
          },
          yield: function (a) {
            if ((a = a || v)) return S.suspend(a, 0);
          },
          sleep: function (a, b) {
            if ((b = b || v)) return (b.Rc = null), S.suspend(b, a);
          },
          kill: function (a) {
            arguments.length === 1 ? a instanceof d || (a = v) : (a = a || v);
            if (a) {
              if (a.status === 0) return S.KILLED;
              var b = a.Cd,
                c = a.Kd,
                h = a.Gd;
              b.list && b.list.remove(b);
              c.list && c.list.remove(c);
              h.list && h.list.remove(h);
              delete x[a.id];
              x.length--;
              S.broadcast(a);
              a.set("status", 0);
              return S.KILLED;
            }
          },
          suspend: function (b, d) {
            if ((b = b || v) && b.status !== 0) {
              if (d === null) d = Number.NaN;
              d = +d;
              b.ue = !1;
              var c = b.Cd,
                h = b.Kd,
                i = b.Gd;
              c.list && c.list.remove(c);
              h.list && h.list.remove(h);
              i.list && i.list.remove(i);
              b.set("timeStamp", k());
              if (d <= 0)
                return (
                  b.set("status", 1),
                  b.useAnimationFrame
                    ? (b.nice(!0), G.addSorted(a, null, c))
                    : (F.push(i), b.nice(!0), E.addSorted(a, null, c)),
                  S.YIELDED
                );
              if (d > 0) (b.yc = b.timeStamp + d), z.addSorted(g, null, h);
              b.set("status", 2);
              return S.BLOCKED;
            }
          },
          resume: function (d) {
            if (d && d.status === 2) {
              var c = d.Cd,
                h = d.Kd,
                g = d.Gd,
                i = k();
              if (d.Rc) delete d.Rc.$blocking[d.id], (d.Rc = d.yc = null);
              h.list && z.remove(h);
              d.set("timeStamp", i);
              d.nice(!0);
              d.useAnimationFrame
                ? G.addSorted(a, null, c)
                : (E.addSorted(a, null, c),
                  d.realtime ? L.unshift(g) : d.ih < O ? L.push(g) : F.push(g));
              d.set("status", 1);
              b(i);
            }
          },
          MIN_IDLE_TIME: 15,
          MAX_EXEC_TIME: 30,
          AF_MAX_EXEC_TIME: 10,
          SLICE_SIZE: 10,
          AF_SLICE_SIZE: 10,
          count: function () {
            return x.length;
          },
          taskCpuTime: function () {
            return B;
          },
          schedulerCpuTime: function () {
            return y;
          },
          totalCpuTime: function () {
            return k() - K;
          },
          current: function () {
            return v;
          },
          scheduler: function () {
            f();
          },
          schedulerNextRuntime: function () {
            return N;
          },
          killAll: function () {
            for (var a in x) S.kill(x[a], "killAll called!");
          },
          scope: function (a) {
            eval("fn = " + a.toString());
            return a;
          },
          catchException: function (a) {
            w = !!a;
          },
        });
      S.ExecutionContext = d;
      S.Scope = j;
      u.scope.global = u.scope;
      f();
    })();
    ovi.provide("nokia.maps.ui._packaging.base");
    ovi.provide("nokia.maps.net._packaging.base");
    ovi.provide("nokia.maps.dom.Page");
    (function (f) {
      if (!nokia.maps.util.getConstructor(nokia.maps.dom.Page)) {
        var e = !e,
          c = !e,
          b = nokia.maps.util,
          a = b.Coroutine,
          g = b.now,
          d = ovi.type,
          i = navigator,
          j = i.userAgent.toLowerCase(),
          h = i.appVersion,
          m = {
            windows: /Windows/.test(h),
            mac: /MacIntel/.test(i.platform),
            linux: /X11/.test(h) && !/tablet/.test(j) && !/armv7/.test(j),
            maemo:
              /apple/.test(j) && /linux/.test(j) && /armv7/.test(i.platform),
            iphone: /iphone/.test(j),
            ipad: /ipad/.test(j),
            android: /android/.test(j),
            meego: /meego/.test(j),
            windowsphone: /windows\ phone/.test(j),
          },
          l,
          k,
          n = {
            msie: (k = i.appName === "Microsoft Internet Explorer"),
            chrome: /chrome/.test(j),
            safari: /apple/.test(navigator.vendor) && !/browserng/.test(j),
            opera: /opera/.test(j),
            mozilla:
              /firefox|fennec/.test(j) && !/apple/.test(navigator.vendor),
            konqueror: /konqueror/.test(j),
            camino: /camino/.test(j),
            cp: /browserng/.test(j),
            fullVersion: (l =
              (j.match(/(?:version|chrome|firefox|msie)[\/ ]([\d.]+)/) ||
                [])[1] || ""),
            version: +((l.match(/([\d]+(?:[.][\d]+){0,1})/) || [])[1] || 0),
            touch: m.android || m.iphone || m.ipad || m.meego || m.maemo,
            mobile:
              /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
                j || i.vendor || window.opera
              ) ||
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(
                (j || i.vendor || window.opera).substr(0, 4)
              ),
            web: !this.mobile,
            language: i.language || i.userLanguage,
            webkit: /webkit/.test(j),
            gecko: /gecko\//.test(j),
            engineVersion: (j.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) ||
              [])[1],
            realVersion:
              (k &&
                ((window.console && console.profile && 9) ||
                  (document.documentMode != void 0 && 8))) ||
              Math.floor(+l),
          },
          p = n.webkit ? "offsetX" : "layerX",
          o = n.webkit ? "offsetY" : "layerY",
          q = function (h) {
            function i(a) {
              l(y(a));
            }
            function k(a) {
              j(a);
              l(y(a));
            }
            function l(b) {
              var d = b.type,
                h = b.button,
                g = ca[h],
                i,
                k = c;
              if (d === "resizestart" || d === "resize" || d === "resizeend")
                return gb(b.target, b);
              if (g)
                if (d === "mousedown" && g)
                  (g.down = b.clone()),
                    (g.up = null),
                    (g.pressed = e),
                    (g.preventClick = g.clickFired = g.longpressSent = c),
                    (Sa |= 1 << h);
                else if (d === "mouseup" && g)
                  (g.up = b.clone()), (g.pressed = c), (Sa &= ~(1 << h));
                else if (d === "click") {
                  if (g.clickFired || g.preventClick)
                    (k = e), g.preventClick && b.preventDefault();
                  g.clickFired = e;
                } else if (d === "longpress") g.longpressSent = e;
              if (d === "gesturestart") {
                qa = e;
                for (i in ha)
                  (h = ha[i]),
                    (h.tapFired = h.preventDrag = h.longpressSent = e);
                a.resume(fa);
              } else d === "gestureend" && ((qa = c), a.resume(fa));
              aa && !ib[d] && (k = e);
              if (
                !k &&
                ((b.shiftKey = Ta),
                (b.ctrlKey = Ua),
                (b.altKey = Va),
                (b.metaKey = Wa),
                (b.buttonState = Sa),
                gb(
                  b.target,
                  b,
                  d === "mouseout" || d == "mouseleave" ? b.Rg : !1
                ),
                d === "click" && b.defaultPrevented)
              )
                g.preventClick = e;
            }
            function j(a) {
              if (a) {
                var b = a.target || a.srcElement || null,
                  d = a.type,
                  c = "toElement" in a ? a.toElement : a.relatedTarget;
                if (sb[d])
                  (Ta = a.shiftKey),
                    (Ua = a.ctrlKey),
                    (Va = a.altKey),
                    (Wa = a.metaKey);
                if (jb[d]) {
                  if (
                    "pageX" in a &&
                    a.pageX !== void 0 &&
                    a.pageX !== null &&
                    a.pageX === a.pageX
                  )
                    (ia = a.pageX),
                      (ja = a.pageY),
                      (ua = a.clientX),
                      (va = a.clientY);
                  else if (
                    "clientX" in a &&
                    "scrollLeft" in C &&
                    a.clientX !== void 0 &&
                    a.clientX !== null &&
                    a.clientX == a.clientX
                  )
                    (ia =
                      a.clientX +
                      (h.documentElement.scrollLeft
                        ? h.documentElement.scrollLeft
                        : C.scrollLeft)),
                      (ja =
                        a.clientY +
                        (h.documentElement.scrollTop
                          ? h.documentElement.scrollTop
                          : C.scrollTop)),
                      (ua = a.clientX),
                      (va = a.clientY);
                  else return;
                  if (aa && na)
                    (W.style.display = "none"),
                      (b = h.elementFromPoint(a.clientX, a.clientY)),
                      (W.style.display = "block");
                  if (b && b.nodeType === 3) b = b.parentNode;
                  ka = b || null;
                  d === "mouseout" && !c && (ka = null);
                }
              }
            }
            function q(a) {
              d(a) === "element" && W.appendChild(a);
            }
            function G(a, b, c) {
              for (var h = d(a); la.childNodes.length; )
                la.removeChild(la.childNodes[0]);
              if (h === "element")
                (b = d(b) === "number" ? (b === b ? b : 0) : 0),
                  (c = d(c) === "number" ? (c === c ? c : 0) : 0),
                  (la.style.left = b + "px"),
                  (la.style.top = c + "px"),
                  la.appendChild(a);
            }
            function L() {
              Xa[J.effectAllowed]
                ? (ma = J.effectAllowed)
                : (J.effectAllowed = ma);
            }
            function F() {
              Xa[ma] && Xa[ma][J.dropEffect]
                ? (da = J.dropEffect)
                : (da = J.dropEffect = "none");
            }
            function B() {
              if (W) {
                for (
                  W.parentNode && W.parentNode.removeChild(W);
                  W.childNodes.length;

                )
                  W.removeChild(W.childNodes[0]);
                for (; la.childNodes.length; ) la.removeChild(la.childNodes[0]);
              }
            }
            function K() {
              ra = D.orientation;
              Ya = h.body.clientWidth;
              Ca = h.body.clientHeight;
              Da = D.innerWidth;
              Ha = D.innerHeight;
              Za = D.outerWidth;
              $a = D.outerHeight;
              if (!m.iphone) {
                if (!n.webkit)
                  (Ya = null),
                    Da
                      ? Ca || (Ca = h.documentElement.offsetHeight || null)
                      : ((Da = h.body.clientWidth),
                        (Ha = h.body.clientHeight),
                        (Ca = null));
                Za = Da;
                $a = Ha;
              }
              ra
                ? ra === -90
                  ? (ra = 90)
                  : ra === 90 && (ra = 270)
                : (ra = screen.width > screen.height ? 90 : 0);
              I.width = Ya;
              I.height = Ca;
              I.layoutWidth = Da;
              I.layoutHeight = Ha;
              I.viewportWidth = Za;
              I.viewportHeight = $a;
              I.orientation = ra;
            }
            function y(a) {
              if (a instanceof X) return a;
              var b, d, g, i, k, l;
              g =
                ((a = a || window.event) && (a.target || a.srcElement)) || null;
              if ((b = Ga) && Ga.nativeEvent === a)
                return (
                  (b.currentTarget = a.currentTarget),
                  (b.bubbles = a.bubbles),
                  (b.eventPhase = a.eventPhase),
                  (b.defaultPrevented = a.defaultPrevented),
                  b
                );
              b = new X();
              if (!(b.nativeEvent = a))
                throw "Invalid or no event object supplied!";
              if (!(b.type = a.type) || !b.type.length)
                throw "Invalid or no type in event!";
              b.bubbles = a.bubbles === e || a.bubbles === c ? a.bubbles : c;
              b.cancelable =
                a.cancelable === e || a.cancelable === c ? a.cancelable : e;
              b.currentTarget = a.currentTarget;
              b.defaultPrevented =
                a.defaultPrevented === e || a.defaultPrevented === c
                  ? a.defaultPrevented
                  : c;
              if (b.eventPhase) b.eventPhase = a.eventPhase;
              b.namespaceURI = a.namespaceURI;
              b.page = I;
              if (b.type === "DOMMouseScroll") b.type = "mousewheel";
              d = b.type;
              if ((b.target = g)) {
                if (b.target.nodeType === 3) b.target = b.target.parentNode;
              } else return (Ga = b);
              if (tb[b.type])
                (b.touches = a.touches),
                  (b.targetTouches = a.targetTouches),
                  (b.changedTouches = a.changedTouches);
              if (ub[d])
                (b.pageX = a.pageX),
                  (b.pageY = a.pageY),
                  (b.targetX = a[p]),
                  (b.targetY = a[o]),
                  (b.scale = a.scale),
                  (b.rotation = a.rotation);
              b.view = void 0;
              b.relatedTarget =
                "relatedTarget" in a
                  ? a.relatedTarget
                  : a.fromElement === g
                  ? a.toElement
                  : a.fromElement;
              b.detail = a.detail;
              if (a.display)
                (b.display = a.display),
                  (b.displayX = a.displayX),
                  (b.displayY = a.displayY);
              if (jb[d]) {
                b.shiftKey = a.shiftKey;
                b.altKey = a.altKey;
                b.ctrlKey = a.ctrlKey;
                b.metaKey = a.metaKey;
                b.screenX = a.screenX;
                b.screenY = a.screenY;
                b.clientX = a.clientX;
                b.clientY = a.clientY;
                "pageX" in a
                  ? ((b.pageX = a.pageX),
                    (b.pageY = a.pageY),
                    "layerX" in a
                      ? ((b.targetX =
                          n.msie && n.version == 9 ? a.offsetX : a[p]),
                        (b.targetY =
                          n.msie && n.version == 9 ? a.offsetY : a[o]))
                      : ((b.targetX = a.offsetX), (b.targetY = a.offsetY)))
                  : ((b.pageX =
                      a.clientX +
                      (h.documentElement.scrollLeft || C.scrollLeft)),
                    (b.pageY =
                      a.clientY + (h.documentElement.scrollTop || C.scrollTop)),
                    (b.targetX = a.offsetX),
                    (b.targetY = a.offsetY));
                if (vb[d]) {
                  g = a.button;
                  if (U && U <= 8 && d === "mousedown")
                    for (l = 0; l < ca.length; l++)
                      ca[l].pressed && (g &= ~ab[l]);
                  else if (
                    U &&
                    U <= 8 &&
                    (d === "click" || d === "contextmenu") &&
                    g === 0
                  )
                    for (l = k = g = 0; l < ca.length; l++)
                      if (
                        ((i = ca[l]), !i.pressed && i.up && i.up.timeStamp > k)
                      )
                        (g = ab[l]), (k = i.up.timeStamp);
                  b.button = (U && U <= 8) || n.konqueror ? wb[g] : g;
                  if (m.mac) {
                    d === "mousedown" &&
                      b.button === 0 &&
                      b.ctrlKey &&
                      (Ia = e);
                    if (Ia && b.button === 0) b.button = 2;
                    d === "click" && ((bb = Ia ? e : c), (Ia = c));
                    if (bb && d === "dblclick") (b.button = 2), (bb = c);
                  }
                }
                if (xb[d])
                  (b.deltaX = a.deltaX),
                    (b.deltaY = a.deltaY),
                    (b.deltaZ = a.deltaY),
                    (b.deltaMode = a.deltaMode);
                else if (yb[d])
                  b.wheelDelta = (a.wheelDelta || -a.detail) < 0 ? -1 : 1;
              }
              if (zb[d]) (b.data = a.data), (b.inputMode = b.inputMode);
              if (Ab[d])
                (b.keyIdentifier = a.keyIdentifier),
                  (b.keyLocation = a.keyLocation),
                  (b.repeat = a.v),
                  (b.ctrlKey = a.ctrlKey),
                  (b.shiftKey = a.shiftKey),
                  (b.altKey = a.altKey),
                  (b.metaKey = a.metaKey);
              return (Ga = b);
            }
            function A(a) {
              if (!a || !a.ownerDocument || !a.parentNode || a.parentNode === a)
                return null;
              var b,
                d =
                  n.gecko &&
                  h.getBoxObjectFor &&
                  a.style.position === "absolute" &&
                  (a.style.top === "" || a.style.left === "");
              b = a.offsetParent;
              var c = a.offsetLeft,
                g = a.offsetTop,
                i,
                k;
              if (a.getBoundingClientRect)
                (b = h.documentElement),
                  (c = b.pageXOffset
                    ? b.pageXOffset
                    : h.body.pageXOffset
                    ? h.body.pageXOffset
                    : D.pageXOffset
                    ? D.pageXOffset
                    : b.scrollLeft),
                  (g = b.pageYOffset
                    ? b.pageYOffset
                    : h.body.pageYOffset
                    ? h.body.pageYOffset
                    : D.pageYOffset
                    ? D.pageYOffset
                    : b.scrollTop),
                  (d = a.getBoundingClientRect()),
                  (d = {
                    left: d.left + c - b.clientLeft,
                    top: d.top + g - b.clientTop,
                    right: d.right + c - b.clientLeft,
                    bottom: d.bottom + c - b.clientTop,
                    width: d.width,
                    height: d.height,
                  });
              else if (h.getBoxObjectFor && !d)
                (d = h.getBoxObjectFor(a)),
                  (b = h.getBoxObjectFor(viewport)),
                  (d = {
                    left: d.screenX - b.screenX,
                    top: d.screenY - b.screenY,
                  }),
                  (d.right = d.left + a.offsetWidth - 1),
                  (d.bottom = d.top + a.offsetHeight - 1);
              else {
                for (; b; ) {
                  if ((i = b.offsetLeft) && i === i) c += i;
                  if ((k = b.offsetTop) && k === k) g += k;
                  if ((i = b.clientLeft) && i === i) c += i;
                  if ((k = b.clientTop) && k === k) g += k;
                  c -= b.scrollLeft;
                  if (!n.opera || b.tagName !== "TR") g -= b.scrollTop;
                  b = b.offsetParent;
                }
                if ((n.safari && a.style.position === "absolute") || n.opera)
                  g -= C.offsetTop;
                d = {
                  left: c,
                  top: g,
                  right: c + a.offsetWidth - 1,
                  bottom: g + a.offsetHeight - 1,
                };
              }
              if (!d.width)
                (d.width = d.right - d.left + 1),
                  (d.height = d.bottom - d.top + 1);
              return d;
            }
            function O(a, c) {
              if (d(a) === "string") return N(h.createElement(a), c);
              a.tagName ||
                b.f("tagName must be string or object with property 'tagName'");
              var g = h.createElement(a.tagName),
                i;
              for (i in a) rb[i] || g.setAttribute(i, a[i]);
              (c || (c = a.style)) && N(g, c);
              return g;
            }
            function N(a, b) {
              if (b && a && a.style)
                for (var d in b) !qb[d] && d in a.style && (a.style[d] = b[d]);
              return a;
            }
            function T() {}
            function M(a) {
              if (a) for (var b in a) this[b] = a[b];
              this.id = this.identifier;
            }
            function H() {
              this.pressed =
                this.longpressSent =
                this.clickFired =
                this.preventClick =
                  c;
              this.down = this.up = null;
            }
            var D = h.parentWindow || h.defaultView,
              S = h.documentElement,
              C = h.getElementsByTagName("BODY")[0],
              sa = h.getElementsByTagName("HEAD")[0],
              I = this,
              U = (function () {
                var a = 0;
                if (n.msie)
                  (a = 5),
                    h.documentMode
                      ? (a = h.documentMode)
                      : h.compatMode &&
                        h.compatMode === "CSS1Compat" &&
                        (a = 7);
                return a;
              })(),
              X = f.Event,
              V = f.EventTarget,
              ea = f.DataTransfer,
              Q = V.getDispatchPath,
              gb = V.dispatchEvent,
              P = ovi.dom.addEvent,
              hb = ovi.Array.indexOf;
            M.prototype = {
              id: null,
              identifier: null,
              target: null,
              timeStamp: 0,
              pageX: 0,
              pageY: 0,
              screenX: 0,
              screenY: 0,
              clientX: 0,
              clientY: 0,
            };
            T.prototype = {
              preventMoveDefault: c,
              preventDrag: c,
              pressed: c,
              longpressSent: c,
              tapFired: c,
              id: null,
              down: null,
              current: null,
              up: null,
            };
            var qb = { constructor: e, prototype: e },
              rb = { constructor: e, prototype: e, tagName: e, style: e },
              pa = Math.abs,
              Ga = null,
              tb = { touchstart: e, touchmove: e, touchend: e, touchcancel: e },
              ub = { gesturestart: e, gesturechange: e, gestureend: e },
              ib = {
                dragstart: e,
                drag: e,
                dragenter: e,
                dragleave: e,
                dragover: e,
                drop: e,
                dragend: e,
              },
              jb = ovi.extend(ovi.extend({}, ib), {
                mousemove: e,
                mouseup: e,
                mousedown: e,
                mouseover: e,
                mouseout: e,
                mouseenter: e,
                mouseleave: e,
                click: e,
                dblclick: e,
                mousewheel: e,
                contextmenu: e,
              }),
              vb = {
                mousedown: e,
                mouseup: e,
                contextmenu: e,
                click: e,
                dblclick: e,
              },
              yb = { mousewheel: e },
              xb = { wheel: e },
              zb = {},
              Ab = {},
              ab = { 0: 1, 1: 4, 2: 2, 3: 8, 4: 16 },
              wb = { 1: 0, 4: 1, 2: 2, 8: 3, 16: 4 },
              Ia = c,
              bb = c,
              Bb = h.compatMode !== "CSS1Compat",
              Ya = 0,
              Ca = 0,
              Da = 0,
              Ha = 0,
              Za = 0,
              $a = 0,
              ra = 0,
              Ja = (function () {
                var a = 0,
                  b = 0,
                  d = 0,
                  c = 0,
                  h = 0,
                  g = 0,
                  i = O("P", { height: "200px", width: "200px" }),
                  k = O("P", {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                  });
                try {
                  k.appendChild(i);
                  C.appendChild(k);
                  b = k.offsetWidth;
                  h = k.offsetHeight;
                  k.style.overflow = "scroll";
                  d = k.offsetWidth;
                  g = k.offsetHeight;
                  if (b === d) d = k.clientWidth;
                  if (h === g) g = k.clientHeight;
                  C.removeChild(k);
                  a = b - d;
                  c = h - g;
                } catch (l) {
                  c = a = 0;
                }
                return c !== c || a !== a || c <= 0 || a <= 0
                  ? { width: 17, height: 17 }
                  : { width: a, height: c };
              })(),
              ia = 0,
              ja = 0,
              ua = 0,
              va = 0,
              ka = null,
              ba = null,
              wa = [],
              ca = [new H(), new H(), new H(), new H(), new H()],
              Sa = 0,
              ha = [],
              Ka = 0,
              aa = c,
              qa = c,
              Xa = {
                uninitialized: { copy: e, move: e, link: e },
                none: {},
                copy: { copy: e },
                copyLink: { copy: e, link: e },
                copyMove: { copy: e, move: e },
                all: { copy: e, move: e, link: e },
                link: { link: e },
                linkMove: { move: e, link: e },
                move: { move: e },
              },
              La = c,
              Ma = 0,
              Na = 0,
              ga = null,
              $ = null,
              ma = null,
              na = e,
              da = null,
              kb = {
                none: n.msie ? "not-allowed" : "no-drop",
                link: n.msie || n.safari ? "default" : "alias",
                move: n.msie ? "hand" : "pointer",
                copy: n.msie || n.safari ? "default" : "copy",
              },
              oa = null,
              Z = null,
              xa = c,
              J = null,
              W = null,
              ya = null,
              lb = null,
              la = null,
              Ta = c,
              Ua = c,
              Va = c,
              Wa = c,
              sb = { keydown: e, keyup: e, mousedown: e, mouseup: e },
              Y = r.browser.mobile,
              mb = Y ? 5 : 150,
              Cb = Y ? 1 : 25,
              Oa = Y ? 3 : 1,
              fa = a.create("nokia.maps.dom.Page#queueCo", function (b, g) {
                var i,
                  k,
                  j = g.callTime,
                  f = j - r.LONGPRESS_INTERVAL,
                  m = c,
                  o = j + mb,
                  s,
                  p,
                  u,
                  v = -1,
                  z,
                  T,
                  H,
                  y,
                  A,
                  I;
                if (aa) {
                  if (
                    ($
                      ? ((A = (s = $.current.pageX) - Ma),
                        (I = (y = $.current.pageY) - Na),
                        (i = $))
                      : ((A = (s = ia) - Ma),
                        (I = (y = ja) - Na),
                        (i = ca[ga])),
                    (Ma = s),
                    (Na = y),
                    (W.style.left = s + "px"),
                    (W.style.top = y + "px"),
                    (!i.pressed && i.up) || qa || La)
                  ) {
                    if (na && !qa && !La && Z && da !== "none")
                      (i = new X({
                        type: "drop",
                        target: Z,
                        relatedTarget: oa,
                        button: ga,
                        pageX: s,
                        pageY: y,
                        deltaX: A,
                        deltaY: I,
                        dataTransfer: J,
                      })),
                        l(i),
                        F(),
                        i.defaultPrevented ||
                          ((i = J.getData("text/plain")),
                          d(Z) === "element" &&
                          (Z.nodeName === "TEXTAREA" ||
                            (Z.nodeName === "INPUT" &&
                              Z.type.toLowerCase() === "text"))
                            ? da === "copy" || da === "move"
                              ? i && i.length && (Z.value += i)
                              : (da = "none")
                            : (da = "none"));
                    else if (!na)
                      (J.dropEffect = da = "none"),
                        (i = new X({
                          type: "dragleave",
                          target: Z,
                          relatedTarget: oa,
                          button: ga,
                          cancelable: c,
                          pageX: s,
                          pageY: y,
                          deltaX: 0,
                          deltaY: 0,
                          dataTransfer: J,
                        })),
                        l(i);
                    J.dropEffect = da;
                    J.effectAllowed = ma;
                    i = new X({
                      type: "dragend",
                      target: oa,
                      relatedTarget: Z,
                      button: ga,
                      pageX: s,
                      pageY: y,
                      deltaX: 0,
                      deltaY: 0,
                      dataTransfer: J,
                    });
                    l(i);
                    fa.realtime = c;
                    if (n.msie)
                      C.releaseCapture && C.releaseCapture(),
                        (C.style.cursor = lb);
                    B();
                    aa = La = c;
                    J = $ = ga = null;
                  }
                } else if (!qa) {
                  if (ha.length === 1 && (i = ha[0]) && i.current)
                    if (
                      ((A = i.current.pageX - i.down.pageX),
                      (I = i.current.pageY - i.down.pageY),
                      i.pressed && !i.preventDrag && pa(A) + pa(I) > Oa)
                    )
                      ($ = i), (s = i.current.pageX), (y = i.current.pageY);
                  if (!$)
                    for (v in ca)
                      if (
                        ((i = ca[v]),
                        i.down &&
                          ((A = ia - i.down.pageX),
                          (I = ja - i.down.pageY),
                          i.pressed && pa(A) + pa(I) > Oa))
                      ) {
                        ga = +v;
                        s = ia;
                        y = ja;
                        break;
                      }
                  if ($ || ga !== null) {
                    p = i.down.target;
                    try {
                      for (; p; ) {
                        if (p.isEventTarget && p.draggable) break;
                        p = p.parentNode;
                      }
                    } catch (M) {
                      p = null;
                    }
                    if (p) {
                      $
                        ? ((A = (s = $.current.pageX) - $.down.pageX),
                          (I = (y = $.current.pageY) - $.down.pageY),
                          (i = $))
                        : ((A = (s = ia) - i.down.pageX),
                          (I = (y = ja) - i.down.pageY),
                          (i = ca[ga]));
                      Ma = s;
                      Na = y;
                      if (!W)
                        (W = O("DIV", {
                          position: "absolute",
                          top: i.down.pageX + "px",
                          left: i.down.pageY + "px",
                          zIndex: 65535,
                          overflow: "visible",
                          width: 0,
                          height: 0,
                        })),
                          (la = O("DIV", {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 255,
                            overflow: "visible",
                            width: 0,
                            height: 0,
                          })),
                          (ya = O("DIV", {
                            position: "absolute",
                            top: "-25px",
                            left: "-25px",
                            zIndex: 65535,
                            overflow: "visible",
                            width: "50px",
                            height: "50px",
                          })),
                          (ya.innerHTML = "&nbsp;");
                      W.appendChild(la);
                      !n.msie && !$ && W.appendChild(ya);
                      W.style.left = s + "px";
                      W.style.top = y + "px";
                      ya.style.cursor = "default";
                      C.appendChild(W);
                      J = new ea();
                      J.setDragImage = G;
                      J.addElement = q;
                      u = new X({
                        type: "dragstart",
                        target: p,
                        relatedTarget: null,
                        button: ga,
                        pageX: i.down.pageX,
                        pageY: i.down.pageY,
                        targetX: i.down.targetX,
                        targetY: i.down.targetY,
                        deltaX: 0,
                        deltaY: 0,
                        dataTransfer: J,
                      });
                      l(u);
                      if (u.defaultPrevented)
                        B(), (i.preventDrag = e), (aa = c), (J = $ = ga = null);
                      else if (
                        ((fa.realtime = J.realtime),
                        (oa = i.down.target = p),
                        (aa = e),
                        (na = J.lift !== c),
                        (Z = null),
                        (i.longpressSent = i.tapFired = i.preventClick = e),
                        (xa = c),
                        L(),
                        (J.effectAllowed = ma),
                        (J.dropEffect = da),
                        C.setCapture && C.setCapture(),
                        n.msie)
                      )
                        (lb = C.style.cursor || "auto"),
                          (C.style.cursor = "default");
                    } else ga = null;
                  }
                }
                if (aa) {
                  k = $ ? $.current.target : ka;
                  if (na && Z && Z !== k) {
                    p = k;
                    try {
                      for (; p; ) {
                        if (p === Z) break;
                        p = p.parentNode;
                      }
                    } catch (sa) {
                      p = null;
                    }
                    if (!p || p === D || p === h || p === C)
                      (i = new X({
                        type: "dragleave",
                        target: Z,
                        relatedTarget: oa,
                        button: ga,
                        pageX: s,
                        pageY: y,
                        dataTransfer: J,
                      })),
                        l(i),
                        (J.effectAllowed = ma),
                        (J.dropEffect = da = "none"),
                        (Z = null),
                        (xa = c);
                  }
                  if (na && !Z && k) {
                    p = k;
                    try {
                      for (; p; ) {
                        if (p.isEventTarget) break;
                        p = p.parentNode;
                      }
                    } catch (K) {
                      p = null;
                    }
                    if (p)
                      (k = new X({
                        type: "dragenter",
                        target: (Z = p),
                        relatedTarget: oa,
                        button: ga,
                        pageX: s,
                        pageY: y,
                        dataTransfer: J,
                      })),
                        l(k),
                        k.defaultPrevented
                          ? ((xa = e), F(), (J.effectAllowed = ma))
                          : ((xa = c),
                            (J.effectAllowed = ma),
                            (J.dropEffect = da = "none"));
                  }
                  if (na && Z && xa)
                    (k = new X({
                      type: "dragover",
                      target: Z,
                      relatedTarget: oa,
                      button: ga,
                      pageX: s,
                      pageY: y,
                      deltaX: A,
                      deltaY: I,
                      dataTransfer: J,
                    })),
                      l(k),
                      k.defaultPrevented
                        ? (F(), (J.effectAllowed = ma))
                        : ((xa = c),
                          (J.effectAllowed = ma),
                          (J.dropEffect = da = "none"));
                  s = new X({
                    type: "drag",
                    target: oa,
                    relatedTarget: Z,
                    button: ga,
                    pageX: s,
                    pageY: y,
                    deltaX: A,
                    deltaY: I,
                    dataTransfer: J,
                  });
                  l(s);
                  s.defaultPrevented && (La = e);
                  if (J)
                    if ((L(), (J.dropEffect = da), na)) {
                      if (((ya.style.cursor = kb[da]), n.msie))
                        C.style.cursor = kb[da];
                    } else
                      n.msie
                        ? (C.style.cursor =
                            J.cursor === "pointer"
                              ? "hand"
                              : J.cursor || "hand")
                        : (ya.style.cursor =
                            J.cursor === "hand"
                              ? "pointer"
                              : J.cursor || "pointer");
                  return a.sleep(Cb);
                }
                for (v in ca)
                  if (((i = ca[v]), i.pressed && (k = i.down)))
                    if (
                      ((m = e),
                      !i.longpressSent &&
                        k.target &&
                        pa(ia - k.pageX) + pa(ja - k.pageY) <= Oa &&
                        k.timeStamp <= f)
                    ) {
                      if (
                        ((i.longpressSent = e),
                        (s = k.clone()),
                        (s.type = "longpress"),
                        (s.nativeEvent = null),
                        l(s),
                        s.defaultPrevented)
                      )
                        i.preventClick = e;
                    } else
                      !i.longpressSent &&
                        o > k.timeStamp + r.LONGPRESS_INTERVAL &&
                        (o = k.timeStamp + r.LONGPRESS_INTERVAL);
                for (T in ha)
                  if (((i = ha[T]), i.pressed && (z = i.down)))
                    if (
                      ((m = e),
                      !i.longpressSent &&
                        (H = i.current) &&
                        z.target &&
                        pa(H.pageX - z.pageX) + pa(H.pageY - H.pageY) <= Oa &&
                        z.timeStamp <= f)
                    ) {
                      if (
                        ((i.longpressSent = e),
                        (s = new X(ovi.extend({ type: "longpress" }, z))),
                        l(s),
                        s.defaultPrevented)
                      )
                        i.tapFired = e;
                    } else
                      !i.longpressSent &&
                        o > z.timeStamp + r.LONGPRESS_INTERVAL &&
                        (o = z.timeStamp + r.LONGPRESS_INTERVAL);
                if (aa) return a.sleep(mb);
                if (m) {
                  if ((s = o - j) < 0) s = 1;
                  return a.sleep(s);
                }
                return a.sleep();
              })(),
              Pa = c,
              za = 0,
              Aa = c,
              cb = 0,
              Ea = null,
              Qa = 0,
              Ra = a.create("nokia.maps.dom.Page#mouseMoveCo", function (b, d) {
                var c, i, g, k;
                k = ba;
                var j = d.callTime;
                j >= Qa &&
                  (Ea && l(Ea), (Ea = null), (Qa = j + r.MOUSEMOVE_THRESHOLD));
                if (ba && ba !== ka)
                  (g = new X({
                    type: "mouseout",
                    target: ba,
                    relatedTarget: ka,
                    pageX: ia,
                    pageY: ja,
                    clientX: ua,
                    clientY: va,
                    Rg: d.mouseCurrentOverDispatchPath,
                  })),
                    (d.mouseCurrentOverDispatchPath = null),
                    l(g),
                    (ba = null);
                for (g = -1; ++g < wa.length; )
                  if (
                    ((i = wa[g]),
                    (c = hb(wa, i)) >= 0 && (!i.hitTest || !i.hitTest(ia, ja)))
                  )
                    wa.splice(c, 1),
                      (c = new X({
                        type: "mouseleave",
                        target: i,
                        pageX: ia,
                        pageY: ja,
                        clientX: ua,
                        clientY: va,
                        Rg: d.mouseCurrentEnterDispatchPath,
                      })),
                      (d.mouseCurrentEnterDispatchPath = null),
                      l(c),
                      g--;
                if (ka && !ba) {
                  ba = ka;
                  if (
                    ba !== D &&
                    ba !== h &&
                    ba !== C &&
                    ba !== S &&
                    hb(wa, ba) < 0
                  )
                    (g = new X({
                      type: "mouseenter",
                      target: ba,
                      pageX: ia,
                      pageY: ja,
                      clientX: ua,
                      clientY: va,
                    })),
                      wa.push(ba),
                      (g = y(g)),
                      (d.mouseCurrentEnterDispatchPath = V.getDispatchPath(
                        ba,
                        g.type,
                        g.display
                      )),
                      l(g);
                  k = new X({
                    type: "mouseover",
                    target: ba,
                    relatedTarget: k,
                    pageX: ia,
                    pageY: ja,
                    clientX: ua,
                    clientY: va,
                  });
                  k = y(k);
                  d.mouseCurrentOverDispatchPath = V.getDispatchPath(
                    ba,
                    k.type,
                    k.display
                  );
                  l(k);
                }
                if (!Ea || Qa <= j) return a.sleep();
                return a.sleep(Qa - j);
              })(),
              nb = c,
              Y = U && U <= 8 ? h : D,
              R = U && U <= 8 ? c : e;
            fa.onError = Ra.onError = function () {};
            P(
              h,
              "touchstart",
              function (b) {
                for (
                  var b = y(b),
                    d = -1,
                    c = b.changedTouches,
                    h = b.timeStamp,
                    i,
                    g,
                    k;
                  ++d < c.length;

                ) {
                  k = new T();
                  k.id = (i = new M(c[d])).id;
                  k.down = i;
                  k.current = i;
                  k.pressed = e;
                  if (qa) k.longpressSent = k.tapFired = k.preventDrag = e;
                  i.timeStamp = h;
                  ha.push(k);
                  g = k.down.target;
                  try {
                    for (; g; ) {
                      if (g && g.isEventTarget && g.draggable) {
                        k.preventMoveDefault = e;
                        break;
                      }
                      g = g.parentNode;
                    }
                  } catch (j) {}
                  b.target = i.target;
                  b.pageX = i.pageX;
                  b.pageY = i.pageY;
                  b.targetX = i[p];
                  b.targetY = i[o];
                  l(b);
                }
                a.resume(fa);
              },
              R
            );
            P(
              h,
              "touchmove",
              function (b) {
                for (
                  var d = y(b), c = -1, i, k = d.changedTouches, j = g(), e, f;
                  ++c < k.length;

                ) {
                  f = new M(k[c]);
                  f.timeStamp = j;
                  for (i = 0; i < ha.length; i++)
                    if (((e = ha[i]), e.id === f.id)) {
                      e.current = f;
                      if (aa)
                        (W.style.display = "none"),
                          (f.target = h.elementFromPoint(f.pageX, f.pageY)),
                          (W.style.display = "block");
                      e.preventMoveDefault && b.preventDefault();
                    }
                  if (!aa)
                    (d.target = f.target),
                      (d.pageX = f.pageX),
                      (d.pageY = f.pageY),
                      (d.targetX = f[p]),
                      (d.targetY = f[o]),
                      l(d);
                }
                aa
                  ? ((W.style.left = $.current.pageX + "px"),
                    (W.style.top = $.current.pageY + "px"),
                    (J.realTime || !na) && fa.run())
                  : fa.run();
                a.schedulerNextRuntime() < j - 10 && a.scheduler();
                (aa || qa) && b.preventDefault();
              },
              R
            );
            P(
              h,
              "touchend",
              function (b) {
                for (
                  var d = y(b), i = -1, k, j, f = d.changedTouches, m;
                  ++i < f.length;

                ) {
                  m = new M(f[i]);
                  for (k = 0; k < ha.length; k++) {
                    j = ha[k];
                    j.up = m;
                    j.pressed = c;
                    ha.splice(k--, 1);
                    if (aa)
                      (W.style.display = "none"),
                        (m.target = h.elementFromPoint(m.pageX, m.pageY)),
                        (W.style.display = "block");
                    d.target = m.target;
                    d.pageX = m.pageX;
                    d.pageY = m.pageY;
                    d.targetX = m[p];
                    d.targetY = m[o];
                    l(d);
                    if (
                      !aa &&
                      !d.defaultPrevented &&
                      ha.length === 0 &&
                      j.down.target === m.target &&
                      !j.tapFired
                    )
                      (j.tapFired = e),
                        l(
                          new X({
                            type: "tap",
                            target: m.target,
                            pageX: m.pageX,
                            pageY: m.pageY,
                            targetX: m.pageX + b[p],
                            targetY: m.pageY + b[o],
                          })
                        ),
                        (j = g()),
                        Ka > 0 && j < Ka
                          ? ((Ka = 0),
                            l(
                              new X({
                                type: "dbltap",
                                target: m.target,
                                pageX: m.pageX,
                                pageY: m.pageY,
                              })
                            ))
                          : (Ka = j + r.DOUBLE_TAP_TIME);
                  }
                }
                aa && b.preventDefault();
                a.resume(fa);
              },
              R
            );
            P(Y, "gesturestart", i, R);
            P(Y, "gesturechange", i, R);
            P(Y, "gestureend", i, R);
            P(
              Y,
              "orientationchange",
              function () {
                l(y(event));
                l(new X({ type: "resize", target: D }));
              },
              R
            );
            P(
              Y,
              "resize",
              function () {
                a.resume(s);
              },
              R
            );
            P(
              Y,
              "mouseover",
              function (a) {
                j(a);
              },
              R
            );
            P(
              Y,
              "mouseout",
              function (b) {
                var d = y(b),
                  c,
                  h;
                j(b);
                if (!n.msie && (c = b.relatedTarget) && c.nodeName === "IFRAME")
                  for (h in ca)
                    if (ca[h].pressed)
                      (b = d.clone()),
                        (b.target = ka),
                        (b.type = "mouseup"),
                        (b.button = h),
                        l(b);
                a.resume(Ra);
              },
              R
            );
            P(
              Y,
              "click",
              function (a) {
                var b;
                j(a);
                b = y(a);
                if (!(n.opera && a.button === 2)) {
                  if (n.opera && a.button === 2)
                    (time = g()) - za < r.DOUBLE_CLICK_TIME
                      ? ((doubleClickEvent = b.clone()),
                        (doubleClickEvent.type = "dblclick"),
                        l(doubleClickEvent),
                        (za = 0))
                      : (za = time);
                  l(b);
                }
              },
              R
            );
            P(Y, "wheel", k, R);
            P(Y, "mousewheel", k, R);
            P(Y, "DOMMouseScroll", k, R);
            P(Y, "dblclick", k, R);
            P(
              Y,
              "mousedown",
              function (b) {
                var d = y(b),
                  h;
                h = d.target;
                var i = d.pageX,
                  k = d.pageY,
                  f,
                  m;
                j(b);
                d.target = ka;
                if (
                  U &&
                  U <= 8 &&
                  d.button === 0 &&
                  h &&
                  h.style &&
                  (h.style.overflow === "auto" || h.style.overlfow === "scroll")
                )
                  if (
                    ((b = A(h)),
                    (f = b.right - Ja.width),
                    (m = b.bottom - Ja.height),
                    (h.clientHeight < h.scrollHeight &&
                      i >= f &&
                      i <= b.right) ||
                      (h.clientWidth < h.scrollWidth &&
                        k >= m &&
                        k <= b.bottom))
                  )
                    return;
                Pa = d.button === 2 ? e : c;
                l(d);
                if (n.opera && n.version < 11 && d.button === 2)
                  (Pa = c),
                    (d = d.clone()),
                    (d.type = "mouseup"),
                    l(d),
                    (h = d.clone()),
                    (h.type = "click"),
                    l(h),
                    (d = g()) - za < r.DOUBLE_CLICK_TIME
                      ? ((d = h.clone()), (d.type = "dblclick"), l(d), (za = 0))
                      : (za = d);
                a.resume(fa);
              },
              R
            );
            P(
              Y,
              "mouseup",
              function (b) {
                var d = y(b),
                  h,
                  i = ca[d.button];
                if (!n.opera || !(n.version < 11 && b.button === 2)) {
                  j(b);
                  d.target = ka;
                  if (U && U <= 8 && !i.pressed)
                    (Aa = e), (h = d.clone()), (h.type = "mousedown"), l(h);
                  if (i.pressed) {
                    !aa && !qa && fa.run();
                    l(d);
                    if (h && Aa)
                      (b = d.clone()),
                        (b.type = "click"),
                        l(b),
                        h.button !== 2 && (Aa = c);
                    a.resume(fa);
                  }
                }
              },
              R
            );
            P(
              Y,
              "contextmenu",
              function (a) {
                var b = y(a),
                  d;
                j(a);
                if (aa) b.preventDefault();
                else {
                  if (
                    Pa &&
                    !n.gecko &&
                    !Aa &&
                    ((a = b.clone()),
                    (a.type = "click"),
                    l(a),
                    a.button === 2 &&
                      (n.chrome ||
                        n.safari ||
                        n.opera ||
                        (n.msie && U && U >= 9)))
                  )
                    (d = g()) - cb < r.DOUBLE_CLICK_TIME
                      ? ((a = a.clone()), (a.type = "dblclick"), l(a), (cb = 0))
                      : (cb = d);
                  if (Aa) (a = b.clone()), (a.type = "dblclick"), l(a);
                  l(b);
                  Pa = Aa = c;
                }
              },
              R
            );
            P(
              Y,
              "mousemove",
              function (b) {
                var d,
                  c,
                  h,
                  i = -1,
                  k = g();
                j(b);
                d = y(b);
                d.target = ka;
                aa
                  ? ((W.style.left = ia + "px"),
                    (W.style.top = ja + "px"),
                    (J.realTime || !na) && fa.run())
                  : ((Ea = d), a.resume(Ra), fa.run());
                if (U && U <= 8) {
                  for (; ++i < ca.length; )
                    if (
                      ((h = ca[i]),
                      h.pressed &&
                        !(b.button & ab[i]) &&
                        ((h = h.down.target),
                        (c = d.clone()),
                        (c.type = "mouseup"),
                        (c.button = i),
                        l(c),
                        !aa && !c.defaultPrevented))
                    )
                      (c = d.clone()),
                        (c.type = "click"),
                        (c.button = i),
                        (c.target = h),
                        l(c);
                  a.schedulerNextRuntime() < k - 10 && a.scheduler();
                }
              },
              R
            );
            P(Y, "keydown", k, R);
            P(Y, "keypress", k, R);
            P(Y, "keyup", k, R);
            P(Y, "focus", k, R);
            P(Y, "blur", k, R);
            P(
              h,
              "selectstart",
              function (a) {
                for (
                  var a = y(a), b = Q(a.target), d = -1, c = b.length;
                  ++d < c;

                )
                  if (b[d].draggable) return a.preventDefault(), !1;
              },
              R
            );
            P(
              h,
              "dragstart",
              function (a) {
                if (!n.dnd)
                  for (var b = Q(a.target), d = b.length, h = -1; ++h < d; )
                    if (b[h].isEventTarget && b[h].draggable)
                      return (
                        a.preventDefault
                          ? a.preventDefault()
                          : (a.returnValue = c),
                        c
                      );
              },
              R
            );
            P(
              h,
              "drag",
              function (a) {
                var b = ka;
                j(a);
                ka = b || null;
              },
              R
            );
            P(
              h,
              "dragover",
              function (a) {
                if (a && a.target && a.target.droppable)
                  a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
              },
              R
            );
            P(
              h,
              "dragenter",
              function (a) {
                var a = y(a),
                  b;
                if (Z)
                  (b = a.target),
                    (a.target = Z),
                    (a.type = "dragleave"),
                    l(a),
                    (a.type = "dragenter"),
                    (a.target = b);
                l(a);
              },
              R
            );
            P(
              h,
              "drop",
              function (a) {
                l((a = y(a)));
                if (a.defaultPrevented)
                  (a.type = "dragleave"), (a.target = Z), l(a);
                if (nb) (a.type = "dragend"), (a.target = oa), l(a);
              },
              R
            );
            P(
              h,
              "dragend",
              function (a) {
                nb = e;
                (c || !Z) && l(y(a));
              },
              R
            );
            P(D, "beforeunload", k, c);
            K();
            h.$jslPage = I;
            I.window = D;
            I.document = h;
            I.html = S;
            I.head = sa;
            I.body = C;
            I.documentMode = U;
            I.quirksMode = Bb;
            I.scrollbarsWidth = Ja.width;
            I.scrollbarsHeight = Ja.height;
            I.parseEvent = y;
            I.update = K;
            I.processEvent = l;
            I.$ = function (a) {
              return this.document.getElementById(a);
            };
            I.setStyle = N;
            I.createElement = O;
            I.getClientRect = A;
            I.destroy = function () {
              a.kill(s);
              a.kill(fa);
              a.kill(Ra);
            };
            I.iu = function (a) {
              eval("fn = " + a.toString());
              return a;
            };
            I.ctrlKeyDown = function () {
              return Ua;
            };
            I.shiftKeyDown = function () {
              return Ta;
            };
            I.altKeyDown = function () {
              return Va;
            };
            I.metaKeyDown = function () {
              return Wa;
            };
          },
          r = (f.Page = function (a) {
            var b = document,
              c;
            if (!a) {
              if (b.$jslPage) return b.$jslPage;
              return new q(b);
            }
            if (a.$jslPage) return a.$jslPage;
            if ((c = d(a)) !== "document") {
              if (c === "window") b = a.document;
              else if (a.ownerDocument) b = a.ownerDocument;
              else if (a.parentNode)
                for (b = null; a && a.parentNode; ) {
                  if ((c = d(a)) === "document") {
                    b = a;
                    break;
                  }
                  if (c === "window") {
                    b = a.document;
                    break;
                  }
                  if (a.ownerDocument) {
                    b = a.ownerDocument;
                    break;
                  }
                  a = a.parentNode;
                }
              if (!b) throw "Invalid node given!";
            } else b = a;
            if (b.$jslPage) return b.$jslPage;
            return new q(b);
          }),
          i = {
            parseEvent: function (a) {
              if (a instanceof f.Event) return event;
              var b =
                  ((a = a || window.event) && (a.target || a.srcElement)) ||
                  null,
                b = (b && b.ownerDocument) || document;
              if (!b) return r().parseEvent(a);
              if (b.$jslPage) return b.$jslPage.parseEvent(a);
              return new q(b).parseEvent(a);
            },
            LONGPRESS_INTERVAL: 500,
            MOUSEMOVE_THRESHOLD: 0,
            DOUBLE_TAP_TIME: 500,
            DOUBLE_CLICK_TIME: 300,
            RESIZE_IDL_TIME: 1e3,
            RESIZE_SLEEP_MIN_TIME: 125,
            RESIZE_SLEEP_MAX_TIME: 500,
            platform: m,
            browser: n,
            ng: [],
            df: [],
          },
          s = a.create("nokia.maps.dom.Page#resizeCo", function (b, h) {
            var i = f.Event,
              g = r.df,
              k = g.length,
              l = h.callTime,
              j,
              m,
              n;
            switch (b.ip) {
              default:
                b.ip = 0;
              case 0:
                (b.resizeData = []), b.ip++;
              case 1:
                (b.i = -1), (b.resizesRunning = 0), b.ip++;
              case 2:
                for (; ++b.i < k; ) {
                  k = g[b.i];
                  n = k.node;
                  g = c;
                  k.mode = k.mode || 0;
                  if ((j = d(n)) === "window") {
                    if (
                      ((m = r(n)),
                      m.update(),
                      m.layoutWidth !== k.layoutWidth ||
                        m.layoutHeight !== k.layoutHeight)
                    )
                      (k.layoutWidth = m.layoutWidth),
                        (k.layoutHeight = m.layoutHeight),
                        (g = e);
                  } else if (
                    j === "element" &&
                    ((m = r(n)),
                    k.offsetWidth !== n.offsetWidth ||
                      k.offsetHeight !== n.offsetHeight)
                  )
                    (k.offsetWidth = n.offsetWidth),
                      (k.offsetHeight = n.offsetHeight),
                      (g = e);
                  if (g) {
                    if (k.mode === 0)
                      (k.mode = 1),
                        m.processEvent(
                          new i({ type: "resizestart", target: n })
                        );
                    k.lastResizeTime = l;
                    m.processEvent(new i({ type: "resize", target: n }));
                    b.resizesRunning++;
                  } else if (k.mode === 1)
                    l > k.lastResizeTime + r.RESIZE_IDL_TIME
                      ? ((k.mode = 0),
                        m.processEvent(new i({ type: "resizeend", target: n })))
                      : b.resizesRunning++;
                  return a.yield();
                }
                b.ip++;
              case 3:
                if (((b.ip = 1), b.resizesRunning))
                  return a.sleep(r.RESIZE_SLEEP_MIN_TIME);
            }
            return a.sleep(r.RESIZE_SLEEP_MAX_TIME);
          })();
        ovi.extend(r, i);
        s.onError = function () {};
        if (m.ipad || m.iphone)
          (a.MAX_EXEC_TIME = 10),
            (a.AF_MAX_EXEC_TIME = 10),
            (a.SLICE_SIZE = 5),
            (a.AF_SLICE_SIZE = 5);
      }
    })(nokia.maps.dom);
    ovi.provide("nokia.maps.gfx.IDL");
    (function () {
      var f = {},
        e = nokia.maps.dom.Page.browser,
        c = e.mozilla && !e.fullVersion.indexOf("3.6"),
        b = [],
        a = {
          BEGIN_2D_IMAGE: ["-", "begin2dImage"],
          BEGIN_PATH: ["@", "beginPath"],
          MOVE_TO: ["M", "moveTo"],
          LINE_TO: ["L", "lineTo"],
          BEZIER_CURVE_TO: ["C", "bezierCurveTo"],
          STROKE_TEXT: ["t", "strokeText"],
          FILL_TEXT: ["T", "fillText"],
          CLOSE_PATH: ["x", "closePath"],
          FILL: ["f", "fill"],
          STROKE: ["s", "stroke"],
          SAVE: [">", "save"],
          RESTORE: ["<", "restore"],
          SET: ["#", "set"],
          DRAW_IMAGE: ["I", "drawImage"],
          END: ["X", "end"],
        },
        g = (function () {
          var b = {},
            d,
            c;
          for (d in a) (c = a[d]), (b[d] = c[0].charCodeAt(0)), (f[b[d]] = d);
          return b;
        })(),
        d = [
          ["strokeColor", 255, 1],
          ["fillColor", 255, 2],
          ["lineWidth", 1, 3],
          ["lineCap", "round", 4],
          ["lineJoin", "miter", 5],
          ["miterLimit", 10, 6],
          ["font", "10px sans-serif", 7],
          ["textAlign", "start", 8],
          ["textBaseline", "middle", 9],
          ["opacity", 1, 10],
        ],
        i = nokia.maps.util.Matrix3D,
        j = (function () {
          for (var a = -1, b = d.length, c = []; ++a < b; ) c.push(d[a][0]);
          return c;
        })(),
        h = (nokia.maps.gfx.IDL = new ovi.Class({
          initialize: function (a) {
            this.data = a && a.length > 3 ? a : (a = []);
            this.width = a[1];
            this.height = a[2];
            this.description = a[3];
            this.resetState();
          },
          Statics: {
            attributeToIdentifier: {},
            identifierToAttribute: {},
            opcodes: g,
          },
          resetState: function () {
            var a = -1,
              b = d.length;
            this.Eb = [];
            for (this.matrix = new i(); ++a < b; ) this[d[a][0]] = d[a][1];
          },
          saveState: function (a) {
            var b = this.Eb,
              d = j.length,
              c = -1;
            b.push(a);
            for (b.push(this.matrix.clone()); ++c < d; ) b.push(this[j[c]]);
          },
          restoreState: function () {
            var a = this.Eb,
              b = j.length;
            if (!a.length) return this.resetState();
            for (; b; ) this[j[--b]] = a.pop();
            this.matrix = a.pop();
            return a.pop();
          },
          push: function () {
            for (
              var a = this.data,
                b = this.matrix.rows,
                d = b[0],
                b = b[1],
                h,
                i,
                j,
                e,
                r,
                s,
                w,
                u = -1,
                v = arguments,
                x = v.length;
              ++u < x;

            )
              if (((h = v[u]), h === g.BEGIN_2D_IMAGE))
                a.push(
                  h,
                  (this.width = +v[++u]),
                  (this.height = +v[++u]),
                  (this.description = "" + v[++u])
                );
              else if (h === g.MOVE_TO || h === g.LINE_TO)
                (s = +v[++u]),
                  (w = +v[++u]),
                  a.push(
                    h,
                    d[0] * s + d[1] * w + d[3],
                    b[0] * s + b[1] * w + b[3]
                  );
              else if (h === g.STROKE_TEXT || h === g.FILL_TEXT)
                (i = v[++u]),
                  (s = +v[++u]),
                  (w = +v[++u]),
                  (j = +v[++u]),
                  (e = +v[++u]),
                  a.push(
                    h,
                    i,
                    d[0] * s + d[1] * w + d[3],
                    b[0] * s + b[1] * w + b[3],
                    d[0] * j + d[1] * e + d[3],
                    b[0] * j + b[1] * e + b[3]
                  );
              else if (h === g.BEZIER_CURVE_TO)
                (i = +v[++u]),
                  (j = +v[++u]),
                  (e = +v[++u]),
                  (r = +v[++u]),
                  (s = +v[++u]),
                  (w = +v[++u]),
                  a.push(
                    h,
                    d[0] * i + d[1] * j + d[3],
                    b[0] * i + b[1] * j + b[3],
                    d[0] * e + d[1] * r + d[3],
                    b[0] * e + b[1] * r + b[3],
                    d[0] * s + d[1] * w + d[3],
                    b[0] * s + b[1] * w + b[3]
                  );
              else if (h === g.SET) a.push(h, v[++u], v[++u]);
              else if (h === g.DRAW_IMAGE)
                a.push(
                  h,
                  v[++u],
                  v[++u],
                  v[++u],
                  v[++u],
                  v[++u],
                  v[++u],
                  v[++u],
                  v[++u],
                  v[++u]
                );
              else if (f[h]) h === g.CLOSE_PATH && c && a.push(h), a.push(h);
              else throw 'Invalid opcode "' + h + '" found in IDL';
          },
          concat: function (a) {
            var d = new h(),
              c;
            for (c in this) d[c] = this[c];
            d.data = this.data.concat(a.data.slice(4));
            d.Eb = this.Eb.concat(b);
            return d;
          },
          append: function (a) {
            this.data = this.data.concat(a.data.slice(4));
            return this;
          },
          clone: function () {
            var a = new h(),
              d;
            for (d in this) a[d] = this[d];
            a.data = this.data.concat(b);
            a.Eb = this.Eb.concat(b);
            return a;
          },
        }));
      (function () {
        for (var a = -1, b = d.length, c, i; ++a < b; )
          (c = d[a]),
            (i = c[0]),
            (c = c[2]),
            (h.attributeToIdentifier[i] = c),
            (h.identifierToAttribute[c] = i);
      })();
    })();
    ovi.provide("nokia.maps.gfx.Graphics");
    (function () {
      var f = ovi.type,
        e = 1 / (180 / Math.PI),
        f = ovi.type,
        c = nokia.maps.gfx,
        b = nokia.maps.util,
        a = c.Color.parseCss,
        g = c.IDL,
        d = g.opcodes,
        i = g.attributeToIdentifier;
      nokia.maps.gfx.Graphics = new ovi.Class({
        initialize: function (a) {
          if (a instanceof g) this.k = a;
        },
        beginImage: function (a, b, c) {
          (this.k = new g()).push(d.BEGIN_2D_IMAGE, a, b, "" + c);
          return this;
        },
        getIDL: function () {
          return this.k;
        },
        setIDL: function (a) {
          this.k =
            a instanceof g
              ? a
              : b.f("idl must be an instance of nokia.maps.gfx.IDL");
          return this;
        },
        getWidth: function () {
          return this.k.width;
        },
        getHeight: function () {
          return this.k.height;
        },
        getMatrix: function () {
          return this.k.matrix;
        },
        getDescription: function () {
          return this.k.description;
        },
        save: function () {
          this.k && (this.k.push(d.SAVE), this.k.saveState());
          return this;
        },
        restore: function () {
          this.k && (this.k.push(d.RESTORE), this.k.restoreState());
          return this;
        },
        set: function (b, c) {
          var g = this.k;
          if (b === "width" || b === "height") {
            if ((c = +c) < 0) c = 0;
            g[b] = c;
            this.beginImage(g.width, g.height, g.description);
          } else if (b === "description") g.data[3] = g.description = c;
          else {
            b === "fillStyle" && (b = "fillColor");
            b === "strokeStyle" && (b = "strokeColor");
            if ((b === "fillColor" || b === "strokeColor") && f(c) === "string")
              c = a(c);
            g[b] = c;
            i[b] && g.data.push(d.SET, i[b], c);
          }
          return this;
        },
        fill: function () {
          this.k.data.push(d.FILL);
          return this;
        },
        stroke: function () {
          this.k.data.push(d.STROKE);
          return this;
        },
        scale: function (a, b) {
          this.k.matrix = this.k.matrix.scale(a, b, 1);
          return this;
        },
        rotate: function (a) {
          this.k.matrix = this.k.matrix.rotateZ(a * e);
          return this;
        },
        translate: function (a, b) {
          this.k.matrix = this.k.matrix.translate(a, b, 0);
          return this;
        },
        drawRect: function (a, b, c, i, g, e) {
          var f = this.k,
            o,
            q,
            g = +g || 0,
            e = +e || g;
          g === 0 && e === 0
            ? f.push(
                d.BEGIN_PATH,
                d.MOVE_TO,
                a,
                b,
                d.LINE_TO,
                (o = a + c),
                b,
                d.LINE_TO,
                o,
                (q = b + i),
                d.LINE_TO,
                a,
                q,
                d.CLOSE_PATH
              )
            : ((o = 0.5522847498 * g),
              (q = 0.5522847498 * e),
              (c = a + c),
              (i = b + i),
              f.push(
                d.BEGIN_PATH,
                d.MOVE_TO,
                a + g,
                b,
                d.LINE_TO,
                c - g,
                b,
                d.BEZIER_CURVE_TO,
                c - g + o,
                b,
                c,
                b + e - q,
                c,
                b + e,
                d.LINE_TO,
                c,
                i - e,
                d.BEZIER_CURVE_TO,
                c,
                i - e + q,
                c - g + o,
                i,
                c - g,
                i,
                d.LINE_TO,
                a + g,
                i,
                d.BEZIER_CURVE_TO,
                a + o,
                i,
                a,
                i - e + q,
                a,
                i - e,
                d.LINE_TO,
                a,
                b + e,
                d.BEZIER_CURVE_TO,
                a,
                b + e - q,
                a + o,
                b,
                a + g,
                b,
                d.CLOSE_PATH
              ));
          return this;
        },
        drawEllipse: function (a, b, c, i) {
          var g = this.k,
            e = a,
            f = a + c,
            o = b,
            q = b + i;
          c /= 2;
          var r = i / 2,
            s = 0.5522847498 * c,
            i = 0.5522847498 * r;
          a += c;
          b += r;
          c = a - s;
          s = a + s;
          r = b - i;
          i = b + i;
          g.push(
            d.BEGIN_PATH,
            d.MOVE_TO,
            a,
            q,
            d.BEZIER_CURVE_TO,
            s,
            q,
            f,
            i,
            f,
            b,
            d.BEZIER_CURVE_TO,
            f,
            r,
            s,
            o,
            a,
            o,
            d.BEZIER_CURVE_TO,
            c,
            o,
            e,
            r,
            e,
            b,
            d.BEZIER_CURVE_TO,
            e,
            i,
            c,
            q,
            a,
            q,
            d.CLOSE_PATH
          );
        },
        beginPath: function () {
          this.k.push(d.BEGIN_PATH);
          return this;
        },
        moveTo: function (a, b) {
          this.k.push(d.MOVE_TO, a, b);
          return this;
        },
        closePath: function () {
          this.k.push(d.CLOSE_PATH);
          return this;
        },
        lineTo: function (a, b) {
          this.k.push(d.LINE_TO, a, b);
          return this;
        },
        polylineTo: function (a) {
          for (var b = a.length, c = 0, i = []; c < b; )
            i.push(d.LINE_TO, a[c++], a[c++]);
          this.k.push.apply(this.k, i);
          return this;
        },
        quadraticCurveTo: function (a, b, d, c) {
          return this.bezierCurveTo(a, b, a, b, d, c);
        },
        bezierCurveTo: function (a, b, c, i, g, e) {
          this.k.push(d.BEZIER_CURVE_TO, a, b, c, i, g, e);
          return this;
        },
        fillText: function (a, b, c, i, g) {
          var e = this.k,
            i = f(i) === "number" ? i : b + 1,
            g = f(g) === "number" ? g : c;
          e.push(d.FILL_TEXT, a, b, c, i, g);
          return this;
        },
        strokeText: function (a, b, c, i, g) {
          var e = this.k,
            i = f(i) === "number" ? i : b + 1,
            g = f(g) === "number" ? g : c;
          e.push(d.STROKE_TEXT, a, b, c, i, g);
          return this;
        },
      });
    })();
    ovi.provide("nokia.maps.gfx.SvgParser");
    (function () {
      function f(a) {
        for (
          var a = a
              .replace(/[\,]/g, " ")
              .replace(/\s+/g, " ")
              .replace(/([0-9])(\-|\+)([0-9])/g, "$1 $2$3")
              .replace(/^\s+/g, "")
              .replace(/\s+$/g, "")
              .split(" "),
            b = 0,
            d = a.length;
          b < d;
          b++
        )
          a[b] = +a[b];
        return a;
      }
      function e(a) {
        a = d.FontHelper.uh(a);
        return +a.substr(0, a.length - 2);
      }
      function c(a, b) {
        var d = a.getAttribute(b);
        return d ? e(d) : 0;
      }
      function b(a, b, d) {
        for (; a && a.nodeType === 1; ) {
          if (a.getAttribute(b)) return a.getAttribute(b);
          a = a.parentNode;
        }
        return d;
      }
      var a = Math.PI,
        g = nokia.maps,
        d = g.util,
        i = d.Matrix3D,
        j = d.FontHelper.toString,
        h = nokia.maps.gfx,
        m = h.Graphics,
        l = h.Color.parseCss,
        k = h.IDL.opcodes,
        h = document.documentElement,
        n = g.dom.getStyle(h, "fontFamily"),
        p = g.dom.getStyle(h, "fontSize");
      nokia.maps.gfx.SvgParser = new ovi.Class({
        svg: function (a) {
          var b = this.I,
            d = b && b.getIDL(),
            h = d ? b.getWidth() : c(a, "width"),
            g = d ? b.getHeight() : c(a, "height"),
            k = a.getAttribute("viewBox"),
            e = k ? k.split(" ") : [0, 0, h, g],
            k = h / e[2],
            l = g / e[3],
            j = -e[0] * k,
            e = -e[1] * l;
          d || b.beginImage(h + 0, g + 0);
          b.getIDL().matrix = b.getIDL().matrix.concat(
            new i([
              [k, 0, 0, j],
              [0, l, 0, e],
              [0, 0, 1, 0],
            ])
          );
          this.Oh(a);
        },
        rect: function (a) {
          var b = c(a, "x"),
            d = c(a, "y"),
            h = c(a, "width"),
            i = c(a, "height"),
            g = c(a, "rx"),
            k = c(a, "ry") || g;
          this.I.drawRect(b, d, h, i, g, k);
          this.Ma(a, !0);
        },
        circle: function (a) {
          var b = c(a, "cx"),
            d = c(a, "cy"),
            h = c(a, "r");
          this.I.drawEllipse(b - h, d - h, 2 * h, 2 * h);
          this.Ma(a, !0);
        },
        ellipse: function (a) {
          var b = c(a, "cx"),
            d = c(a, "cy"),
            h = c(a, "rx"),
            i = c(a, "ry");
          this.I.drawEllipse(b - h, d - i, 2 * h, 2 * i);
          this.Ma(a, !0);
        },
        line: function (a) {
          var b = this.I,
            d = c(a, "x1"),
            h = c(a, "y1"),
            i = c(a, "x2"),
            g = c(a, "y2");
          b.beginPath();
          b.moveTo(d, h);
          b.lineTo(i, g);
          this.Ma(a, !0);
        },
        polyline: function (a) {
          var b = this.I,
            d = f(a.getAttribute("points")),
            c = d.length,
            h = 2;
          b.beginPath();
          for (b.moveTo(d[0], d[1]); h < c; h += 2) b.lineTo(d[h], d[h + 1]);
          this.Ma(a, !0);
        },
        polygon: function (a) {
          var b = this.I,
            d = f(a.getAttribute("points")),
            c = d.length,
            h = 2;
          b.beginPath();
          for (b.moveTo(d[0], d[1]); h < c; h += 2) b.lineTo(d[h], d[h + 1]);
          b.closePath();
          this.Ma(a, !0);
        },
        path: function (a) {
          var b = this.I,
            d = b.getIDL(),
            c;
          c = a
            .getAttribute("d")
            .replace(/[\,]/g, " ")
            .replace(/\s+/g, " ")
            .replace(/([0-9])\-/g, "$1 -")
            .replace(/([0-9])\+/g, "$1 ")
            .replace(/([a-zA-Z])([a-zA-Z])/g, "$1 $2")
            .replace(/([a-df-zA-DF-Z])([0-9]|\.|\-|\+)/g, "$1 $2")
            .replace(/([0-9])([a-df-zA-DF-Z])/g, "$1 $2")
            .replace(/^\s+/g, "")
            .replace(/\s+$/g, "")
            .split(" ");
          c = c.length === 1 && c[0] === "" ? [] : c;
          var h = this.Ma(a, !1),
            a = h & 1;
          h &= 2;
          var i = 0,
            g = 0,
            e = -1,
            l,
            j,
            f,
            m,
            n,
            p,
            K,
            y,
            A,
            O,
            N,
            T;
          for (d.push(k.BEGIN_PATH); ; ) {
            if (!A) {
              y = c[++e];
              if (!y) break;
              A = y.toLowerCase();
              y = y.toUpperCase() === y;
            }
            O = A;
            if (A === "m")
              (N = i = l = +c[++e] + (y ? 0 : i)),
                (T = g = j = +c[++e] + (y ? 0 : g)),
                d.push(k.MOVE_TO, l, j),
                (A = (K = +c[e + 1]) === K ? "l" : null);
            else if (A === "l")
              (i = l = +c[++e] + (y ? 0 : i)),
                (g = j = +c[++e] + (y ? 0 : g)),
                d.push(k.LINE_TO, l, j),
                (A = (K = +c[e + 1]) === K ? A : null);
            else if (A === "h")
              (i = l = +c[++e] + (y ? 0 : i)),
                (j = g),
                d.push(k.LINE_TO, l, j),
                (A = (K = +c[e + 1]) === K ? A : null);
            else if (A === "v")
              (l = i),
                (g = j = +c[++e] + (y ? 0 : g)),
                d.push(k.LINE_TO, l, j),
                (A = (K = +c[e + 1]) === K ? A : null);
            else if (A === "z")
              d.push(k.CLOSE_PATH), (A = null), (i = N), (g = T);
            else if (A === "c" || A === "q")
              (f = +c[++e] + (y ? 0 : i)),
                (m = +c[++e] + (y ? 0 : g)),
                A === "q"
                  ? ((n = f), (p = m))
                  : ((n = +c[++e] + (y ? 0 : i)), (p = +c[++e] + (y ? 0 : g))),
                (i = l = +c[++e] + (y ? 0 : i)),
                (g = j = +c[++e] + (y ? 0 : g)),
                d.push(k.BEZIER_CURVE_TO, f, m, n, p, l, j),
                (A = (K = +c[e + 1]) === K ? A : null);
            else if (A === "s" || A === "t")
              f === "c" || f === "q" || f === "s" || f === "t"
                ? ((n = i - n), (p = g - p), (f = i += n), (m = g += p))
                : (m = f = i),
                A === "q"
                  ? ((n = f), (p = m))
                  : ((n = +c[++e] + (y ? 0 : i)), (p = +c[++e] + (y ? 0 : g))),
                (i = l = +c[++e] + (y ? 0 : i)),
                (g = j = +c[++e] + (y ? 0 : g)),
                d.push(k.BEZIER_CURVE_TO, f, m, n, p, l, j),
                (A = (K = +c[e + 1]) === K ? A : null);
            else {
              ovi.warn(
                "SvgParser hit unknown command '" + A + "' at path element!"
              );
              break;
            }
            f = O;
          }
          a && b.stroke();
          h && b.fill();
        },
        text: function (a) {
          var d = this.I;
          d.getIDL();
          var h = this.Ma(a, !1),
            i = b(a, "font", null),
            g,
            i = i ? this.Gm(i) : {};
          i.style = b(a, "font-style", null) || i.style;
          i.variant = b(a, "font-variant", null) || i.variant;
          i.weight = b(a, "font-weight", null) || i.weight;
          i.size = e(b(a, "font-size", null) || i.size || p) + "px";
          i.family = b(a, "font-family", null) || i.family || n;
          d.set("font", j(i));
          d.set(
            "textAlign",
            b(a, "text-anchor", "start").replace("middle", "center")
          );
          if (h && (g = a.textContent || a.text))
            (i = c(a, "x")),
              (a = c(a, "y")),
              h & 1 && d.strokeText(g, i, a),
              h & 2 && d.fillText(g, i, a);
        },
        image: function () {},
        linearGradient: function () {},
        radialGradient: function () {},
        use: function () {},
        g: function (a) {
          this.Oh(a);
        },
        Gm: function (a) {
          var b = d.FontHelper.parse;
          this.we || (this.we = {});
          var c = this.we[a];
          c || (c = this.we[a] = b(a));
          return c;
        },
        Ve: function (a, b) {
          var c,
            h = ovi.type(a),
            i;
          if (h === "string") c = (i = nokia.maps.util.Hm(a)).documentElement;
          else if (h === "document" && a.documentElement)
            c = (i = a).documentElement;
          ovi.type(c) !== "element" &&
            d.f("svgMarkup needs to be a valid SVG string or XML document!");
          this.I = b || new m();
          this.Ph(c);
          return i;
        },
        parseSvg: function (a) {
          this.Ve(a);
          return this.I.getIDL();
        },
        parseSvgInfo: function (a) {
          return (a = this.Ve(a))
            ? {
                width: this.I.getWidth(),
                height: this.I.getHeight(),
                document: a,
              }
            : null;
        },
        parseSvgToGraphics: function (a, b) {
          this.Ve(a, b);
          return this.I;
        },
        Ph: function (a) {
          var b = this.I,
            d,
            c = this[a.nodeName];
          this.Mn(a);
          b.save();
          (d = a.getAttribute("transform")) && this.Pk(d);
          c && c.call(this, a);
          b.restore();
        },
        Oh: function (a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            a.nodeType === 1 && this.Ph(a);
        },
        Mn: function (a) {
          var b = a.getAttribute("style"),
            d,
            c = /([^:\s*]+)\s*:\s*([^;]+?)\s*(;|$)/g;
          if (b) {
            for (; (d = c.exec(b)); ) a.setAttribute(d[1], d[2]);
            a.removeAttribute("style");
          }
        },
        Pk: function (b) {
          for (
            var d,
              c = /([a-zA-Z]*)\s*\(([^\)]*)\)/g,
              h,
              g = this.I.getIDL(),
              k = g.matrix;
            (d = c.exec(b));

          )
            switch (((h = f(d[2])), d[1].toLowerCase())) {
              case "matrix":
                k = k.concat(
                  new i([
                    [h[0], h[2], 0, h[4]],
                    [h[1], h[3], 0, h[5]],
                    [0, 0, 1, 0],
                  ])
                );
                break;
              case "translate":
                k = k.translate(h[0], h.length > 1 ? h[1] : 0, 0);
                break;
              case "scale":
                k = k.scale(h[0], h.length > 1 ? h[1] : h[0], 0);
                break;
              case "rotate":
                h.length > 1 && (k = k.translate(h[1], h[2], 0));
                k = k.rotateZ(-(h[0] / 180) * a);
                h.length > 1 && (k = k.translate(-h[1], -h[2], 0));
                break;
              case "skewx":
                k = k.skewX(h[0]);
                break;
              case "skewy":
                k = k.skewY(h[0]);
            }
          g.matrix = k;
        },
        Ma: function (a, d) {
          var c = this.I,
            h = c.getIDL().matrix,
            i = 0,
            g = b(a, "fill", "#000"),
            k = b(a, "stroke", "none");
          c.set("opacity", +b(a, "opacity", "1"));
          g !== "none" &&
            ((i |= 2),
            c.set("fillColor", l(g, +b(a, "fill-opacity", "1"))),
            d && c.fill());
          if (k !== "none") {
            i |= 1;
            var j,
              h = h.getScale();
            c.set("strokeColor", l(k, +b(a, "stroke-opacity", "1")));
            (j = b(a, "stroke-width", 0)) &&
              c.set("lineWidth", e(j) * 0.5 * (h.x + h.y));
            c.set(
              "lineCap",
              b(a, "stroke-linecap", "flat").replace("flat", "butt")
            );
            c.set("lineJoin", b(a, "stroke-linejoin", "miter"));
            c.set("miterLimit", +b(a, "stroke-miterlimit", 4));
            d && c.stroke();
          }
          return i;
        },
      });
    })();
    ovi.provide("nokia.maps.geo.Strip");
    (function (f) {
      var e = f.geo.Coordinate,
        c = f.util,
        b = c.Coroutine,
        a = c.f,
        g = (f.geo.Strip = new ovi.Class({
          initialize: function (a, b) {
            this.internalArray = [];
            this.addAll(a, 0, b);
          },
          destroy: function () {
            this.kb && b.kill(this.kb);
          },
          internalArray: null,
          kb: null,
          Statics: {
            fromObject: function (a) {
              if (a instanceof g) return a;
              if (ovi.type(a) !== "array") return new g();
              return new g(
                a.length && ovi.type(a[0]) === "string"
                  ? g.convertToArray(a.slice(1), a[0])
                  : g.convertToArray(a, "auto"),
                "values lat lng alt"
              );
            },
            convertToArray: function (b, c) {
              if (!b) return [];
              if (b.length === 0 || c === "unsafe values lat lng alt") return b;
              if (b instanceof g) return b.asArray();
              var e = c ? c.split(" ") : ["auto"],
                h = [],
                f = !1,
                l,
                k,
                n = e.length,
                p = 0;
              e[0] === "unsafe" && ((f = !0), e.splice(0, 1), n--);
              for (n > 4 && a("convertToArray: i > 4"); n--; )
                (l = e[n]),
                  (l = this.En[l])
                    ? ((e[n] = l[0]), (p += l[1]))
                    : a("convertToArray: no member found");
              (p !== 100 || !e.length) &&
                a("convertToArray: counter does not match 100");
              (k = this.pe[e[0]])
                ? k.call(this, f, b, h, e.slice(1))
                : a("convertToArray: function expected");
              return h;
            },
            En: {
              lat: ["latitude", 1],
              lng: ["longitude", 2],
              alt: ["altitude", 0],
              unsafe: ["unsafe", 0],
              coords: ["coords", 100],
              auto: ["auto", 100],
              arrays: ["arrays", 97],
              values: ["values", 97],
            },
            al: { latitude: 0, longitude: 1, altitude: 2 },
            pe: {
              auto: function (a, b, e) {
                c.isNumber(b[0])
                  ? g.pe.values(a, b, e, ["latitude", "longitude"])
                  : g.pe.coords(a, b, e);
              },
              coords: function (b, c, g) {
                var h = c.length,
                  f,
                  l;
                for (f = 0; f < h; f++)
                  b
                    ? (l = c[f])
                    : (l = e.fromObject(c[f])) ||
                      a("coords: expected geo.Coordinate"),
                    g.splice(g.length, 0, l.latitude, l.longitude, l.altitude);
              },
              values: function (a, b, c, h) {
                g.Dg(!1, a, b, c, h);
              },
              arrays: function (a, b, c, h) {
                g.Dg(!0, a, b, c, h);
              },
            },
            Dg: function (b, c, j, h, f) {
              var l = b ? j[0].length : j.length,
                k = f.length,
                n = b ? j.length : 0,
                p,
                o;
              if (b)
                for (; n--; )
                  j[n].length !== l && a("_convertValues index out of bound");
              else
                l % k && a("_convertValues members length is incorrect"),
                  (l /= k);
              for (n = 0; n < l; n++) {
                o = [n * 3, 0, void 0, void 0, void 0];
                for (p = 0; p < k; p++)
                  o[g.al[f[p]] + 2] = b ? j[p][n] : j[n * k + p];
                c || e.isValid.apply(this, o.slice(2))
                  ? h.splice.apply(h, o)
                  : a("_convertValues: expected coords");
              }
            },
          },
          add: function (b, c) {
            var g = this.getLength(),
              b = e.fromObject(b),
              c = ~~(c === 0 || c > 0 ? c : g);
            c > g && a("add: index out of bound");
            b &&
              this.Fa(
                this,
                c,
                1,
                this.internalArray.splice(
                  c * 3,
                  0,
                  b.latitude,
                  b.longitude,
                  b.altitude
                )
              );
          },
          addAll: function (b, c, g) {
            var h = this.getLength(),
              c = ~~(c === 0 || c > 0 ? c : h);
            c > h ? a("addAll: index out of bound") : this.splice(c, 0, b, g);
          },
          addAllAsync: function (d, c, g, h) {
            var f = this,
              l = f.getLength(),
              k,
              n = d[0] instanceof e ? 1 : g ? (g.match("alt") ? 3 : 2) : 2,
              c = ~~(c === 0 || c > 0 ? c : l);
            c > l
              ? a("addAll: index out of bound")
              : (k = b.create(
                  "nokia.maps.geo.Strip#addAllAsyncCo",
                  function (a) {
                    for (
                      var d, c, h = a.idx, g = a.coords, i = a.multiplier;
                      (d = g.length) > 0;

                    )
                      if (
                        ((d = g.splice(0, (c = 300 * i) < d ? c : d)),
                        f.splice(h, 0, d, a.mode),
                        (h = a.idx = h + 300),
                        b.shallYield())
                      )
                        return b.yield();
                    a.callback && a.callback();
                  },
                  "coords",
                  "idx",
                  "mode",
                  "multiplier",
                  "callback"
                ));
            f.kb = k(d, c, g, n, h);
            f.kb.onTerminated = function () {
              f.kb = null;
            };
            f.kb.run();
          },
          set: function (b, c) {
            b = +b;
            (b < 0 || b > this.getLength() || isNaN(b)) &&
              a("geo.Strip#set: index out of bounds");
            (c = e.fromObject(c)) &&
              this.Fa(
                this,
                (b = ~~b),
                1,
                this.internalArray.splice(
                  b * 3,
                  3,
                  c.latitude,
                  c.longitude,
                  c.altitude
                )
              );
          },
          remove: function (b) {
            b = +b;
            b < 0 || b >= this.getLength() || isNaN(b)
              ? a("geo.Strip#remove: index out of bound")
              : this.Fa(
                  this,
                  (b = ~~b),
                  0,
                  this.internalArray.splice(b * 3, 3)
                );
          },
          splice: function (b, c, e, h) {
            ((b = +b) >= 0 && b <= this.getLength() && (c = +c) >= 0) ||
              a("splice: arguments out of bound, idx=" + b + ", remove=" + c);
            e = g.convertToArray(e, h);
            if (c || e.length)
              this.Fa(
                this,
                (b = ~~b),
                e.length / 3,
                this.internalArray.splice.apply(
                  this.internalArray,
                  [b * 3, ~~c * 3].concat(e)
                )
              );
          },
          get: function (b) {
            var c = this.internalArray;
            !(b >= 0 && b < c.length / 3) && a("get: index out of bound");
            b = ~~b * 3;
            return new e(c[b], c[b + 1], c[b + 2], 1);
          },
          getLatLng: function (b, c) {
            var g = [],
              h,
              e = 0;
            h = this.getLength();
            var l,
              b = +b;
            l = c < 0 ? h + c : c ? (c + b > h ? h : c + b) : b + 1;
            (isNaN(b) || b < 0 || (l = ~~l) < b) &&
              a("getLatLng: index and count combination out of bounds");
            for (h = ~~b; h < l; h++)
              (g[e++] = this.internalArray[h * 3]),
                (g[e++] = this.internalArray[h * 3 + 1]);
            return g;
          },
          getLength: function () {
            return (this.internalArray.length / 3) >>> 0;
          },
          asArray: function () {
            return [].concat(this.internalArray);
          },
          Fa: function () {
            var a = this.U,
              b;
            if (a) for (b = 0; b in a; ) a[b++].apply(a[b++], arguments);
          },
          addObserver: function (a, b) {
            typeof a !== "function" &&
              c.f("addObserver: callback is not a function");
            var g = this.U || (this.U = []),
              h = g.length;
            g[h++] = a;
            b && (g[h] = b);
            g.length = ++h;
          },
          removeObserver: function (a, b) {
            var c,
              h,
              g = 0;
            if ((c = this.U))
              for (h = c.length; g < h; )
                c[g] === a &&
                  c[g + 1] === b &&
                  (c.splice(g, 2), h === 2 && delete this.U),
                  (g += 2);
            return this;
          },
        }));
    })(nokia.maps);
    ovi.provide("nokia.maps.util._packaging.base");
    ovi.provide("nokia.maps.dom.Event");
    (function (f) {
      if (!nokia.maps.util.getConstructor(nokia.maps.dom.Event)) {
        var e = !e,
          c = !e,
          b = nokia.maps.util.now,
          a = (f.Event = function (a) {
            if (a) for (var d in a) this[d] = a[d];
            if (!this.timeStamp) this.timeStamp = b();
          });
        ovi.extend(a.prototype, {
          CAPTURING_PHASE: 1,
          AT_TARGET: 2,
          BUBBLING_PHASE: 3,
          bubbles: e,
          canBubble: e,
          canSicker: e,
          cancelable: e,
          defaultPrevented: c,
          PROPAGATION_OK: 0,
          PROPAGATION_STOP: 1,
          PROPAGATION_STOP_IMMEDIATE: 2,
          propagation: 0,
          stopPropagation: function () {
            var a = this.nativeEvent;
            if (this.propagation === 0 && ((this.propagation = 1), a))
              try {
                a.stopPropagation ? a.stopPropagation() : (a.cancelBubble = e);
              } catch (b) {}
            return this;
          },
          cancel: function () {
            return this.stopImmediatePropagation().preventDefault();
          },
          stopImmediatePropagation: function () {
            var a = this.nativeEvent;
            if (this.propagation !== 2 && ((this.propagation = 2), a))
              try {
                a.stopImmediatePropagation
                  ? a.stopImmediatePropagation()
                  : (a.cancelBubble = e);
              } catch (b) {}
            return this;
          },
          preventDefault: function () {
            var a = this.nativeEvent;
            if (!this.defaultPrevented && ((this.defaultPrevented = e), a))
              try {
                a.preventDefault ? a.preventDefault() : (a.returnValue = c);
              } catch (b) {}
            return this;
          },
          DOM_INPUT_METHOD_UNKNOWN: 0,
          DOM_INPUT_METHOD_KEYBOARD: 1,
          DOM_INPUT_METHOD_PASTE: 2,
          DOM_INPUT_METHOD_DROP: 3,
          DOM_INPUT_METHOD_IME: 4,
          DOM_INPUT_METHOD_OPTION: 5,
          DOM_INPUT_METHOD_HANDWRITING: 6,
          DOM_INPUT_METHOD_VOICE: 7,
          DOM_INPUT_METHOD_MULTIMODAL: 8,
          DOM_INPUT_METHOD_SCRIPT: 9,
          DOM_KEY_LOCATION_STANDARD: 0,
          DOM_KEY_LOCATION_LEFT: 1,
          DOM_KEY_LOCATION_RIGHT: 2,
          DOM_KEY_LOCATION_NUMPAD: 3,
          DOM_KEY_LOCATION_MOBILE: 4,
          DOM_KEY_LOCATION_JOYSTICK: 5,
          getModifierState: function () {
            throw "NOT IMPLEMENTED!";
          },
          DOM_DELTA_PIXEL: 0,
          DOM_DELTA_LINE: 1,
          DOM_DELTA_PAGE: 2,
          deltaMode: 0,
          preventUnload: function (a) {
            if (this.type === "beforeunload") this.nativeEvent.returnValue = a;
            return this;
          },
          clone: function () {
            return new a(this);
          },
        });
      }
    })(nokia.maps.dom);
    ovi.provide("nokia.maps.gfx.GraphicsImage");
    (function () {
      var f = Array.prototype.slice,
        e = nokia.maps.gfx,
        c = nokia.maps.util,
        b = ovi.type,
        a = e.IDL,
        g = e.Painter,
        d = e.Image,
        i = e.Graphics,
        j = new e.SvgParser(),
        h = (nokia.maps.gfx.GraphicsImage = new ovi.Class({
          Extends: nokia.maps.gfx.Image,
          initialize: function (h, e, k, j) {
            var p = f.call(arguments, 0),
              o = h,
              q = h;
            this.d = d.d++;
            if (b(h) !== "function")
              if ((q instanceof i && (o = q.getIDL()), o instanceof a))
                (this.k = o),
                  (this.width = o.width),
                  (this.height = o.height),
                  (this.state = 1),
                  (h = c.Q);
              else throw "GraphicsImage: Illegal render function or IDL!";
            this.F = k || document;
            this.$b = h;
            this.ql = e || this;
            this.opacity = 1;
            p.splice(0, 4, null);
            this.Rk = p;
            this.Kh = j instanceof g ? j : new g.defaultPainter();
          },
          isGraphics: 1,
          getDocument: function () {
            return this.F;
          },
          getIDL: function () {
            return this.k;
          },
          prepare: function (a, d) {
            var c, h;
            if (!this.state)
              (c = new i()),
                (h = this.Rk),
                (h[0] = c),
                this.$b.apply(this.ql, h),
                (this.k = c.getIDL()),
                (this.width = this.k.width),
                (this.height = this.k.height),
                (this.state = 1);
            if (b(a) === "function")
              this.gc || (this.gc = []),
                (h = [].concat(arguments)),
                h.splice(0, 2, this),
                a.apply(d || this, h);
          },
          createElement: function (a) {
            this.state || this.prepare();
            return this.Kh.createElement(
              this.k,
              this.F,
              typeof a === "number" ? a : this.opacity
            );
          },
          setOpacity: function (a, b) {
            this.Kh.setOpacity(a, b);
            return this;
          },
          clone: function (a) {
            var b, d;
            b = new h(this.$b);
            for (d in this) b[d] = this[d];
            if (a) b.F = a;
            return b;
          },
        }));
      d.fromObjectListener.unshift(function (b) {
        if (b instanceof h) return b;
        if (b instanceof a) return new h(a);
        if (typeof b === "string" && b.indexOf("<svg") >= 0)
          return new h(j.parseSvg(b));
      });
    })();
    ovi.provide("nokia.maps.geo.BoundingBox");
    (function (f) {
      function e(a, b) {
        var d = a + b / 2;
        d -= d > 180 ? 360 : 0;
        return d;
      }
      function c(a, b) {
        var d = b - a;
        d += d < 0 ? 360 : 0;
        return d;
      }
      var b = Math,
        a = b.min,
        g = b.max,
        d = b.abs,
        i = f.geo,
        j = f.util.f,
        h = i.Coordinate,
        m = (i.BoundingBox = function (a, b, d) {
          var a = h.fromObject(a),
            c;
          if (!a || (b && !(c = h.fromObject(b))))
            j(a ? "bottomRight" : "topLeft");
          this.topLeft = a;
          c
            ? d ||
              (a.latitude < c.latitude &&
                j("BoundingBox top latitude < bottom latitude"))
            : (c = a);
          if ((this.bottomRight = c) && a.longitude > c.longitude)
            this.isCDB = !0;
        });
      ovi.extend(m.prototype, {
        isCDB: !1,
        zc: void 0,
        cc: void 0,
        Wk: void 0,
        contains: function (a) {
          var b, d;
          a instanceof h && (a = new m(a, a));
          a = this.merge(a);
          d = a.getCenter();
          b = this.getCenter();
          return (
            d.latitude == b.latitude &&
            d.longitude == b.longitude &&
            this.getHeight() == a.getHeight() &&
            this.getWidth() == a.getWidth()
          );
        },
        intersects: function (a) {
          var b, d, c, h;
          b = this.topLeft.longitude <= this.bottomRight.longitude;
          d = a.topLeft.longitude <= a.bottomRight.longitude;
          c = this.topLeft.longitude < a.bottomRight.longitude;
          h = a.topLeft.longitude < this.bottomRight.longitude;
          return (
            this.bottomRight.latitude <= a.topLeft.latitude &&
            a.bottomRight.latitude <= this.topLeft.latitude &&
            ((!b && (!d || c || h)) || (!d && (c || h)) || (c && h))
          );
        },
        isEmpty: function () {
          return (
            this.topLeft.longitude === this.bottomRight.longitude &&
            this.topLeft.latitude === this.bottomRight.latitude
          );
        },
        getCenter: function () {
          var a = this.Wk;
          if (a == void 0)
            var a = this.topLeft.longitude,
              b = this.bottomRight.latitude,
              a = new h(
                b + (this.topLeft.latitude - b) / 2,
                e(a, c(a, this.bottomRight.longitude))
              );
          return a;
        },
        getWidth: function () {
          var a = this.zc;
          a == void 0 &&
            (a = c(this.topLeft.longitude, this.bottomRight.longitude));
          return a;
        },
        getHeight: function () {
          var a = this.cc;
          a == void 0 &&
            (a = this.topLeft.latitude - this.bottomRight.latitude);
          return a;
        },
        resizeToCenter: function (a) {
          a instanceof h ||
            j(
              "Parameter center must be an instance of nokia.maps.geo.Coordinate"
            );
          var b = this.topLeft.longitude,
            d = this.topLeft.latitude,
            g = this.bottomRight.longitude,
            i = this.bottomRight.latitude,
            f = e(b, c(b, g)),
            r = a.latitude - i - (d - i) / 2,
            s = a.longitude - f,
            s = s > 180 || s < -180 ? -(f + a.longitude) : s,
            a = b + (s < 0 ? 2 * s : 0);
          g += s > 0 ? 2 * s : 0;
          g = g > 180 ? g - 360 : g;
          d = r > 0 ? d + 2 * r : d;
          d >= 90 && (d = 90);
          i = r < 0 ? i + 2 * r : i;
          i <= -90 && (i = -90);
          return new m(new h(d, a < -180 ? 360 + a : a), new h(i, g));
        },
        merge: function (a) {
          a && a.push ? a.push(this) : (a = [this, a]);
          return m.merge(a);
        },
      });
      ovi.extend(m, {
        fromObject: function (a, b) {
          var d;
          if (a && (d = a.length) !== void 0) {
            if (d === 2 && a[0] instanceof h && a[1] instanceof h)
              return new m(a[0], a[1], b);
            if (d === 4)
              return new m(
                new h(a[0], a[1], void 0, b),
                new h(a[2], a[3], void 0, b),
                b
              );
          }
          return a instanceof m ? a : null;
        },
        coverAll: function (a) {
          (!a || a.length === void 0) &&
            j("no argument was given, array is expected");
          !a.length && j("empty array was given");
          for (
            var b = a[0],
              d = b.latitude,
              c = b.longitude,
              h = [d, c, d, c],
              g = a.length;
            --g;

          )
            (b = a[g]),
              (h = m.nd(h, [(d = b.latitude), (c = b.longitude), d, c]));
          return m.fromObject(h);
        },
        fromPath: function (a, b) {
          !a && j("no argument was given, geo strip is expected");
          !(a instanceof i.Strip) && j("geo strip is expected");
          var d = null,
            c,
            h,
            g = a.getLength(),
            e;
          if (g)
            if (g == 1)
              (c = a.get(0)),
                (d = [c.latitude, c.longitude, c.latitude, c.longitude]);
            else if (g == 2)
              (c = a.getLatLng(0)),
                c.push(c[0]),
                c.push(c[1]),
                (h = a.getLatLng(1)),
                h.push(h[0]),
                h.push(h[1]),
                (d = m.fromObject(m.nd(c, h), b));
            else {
              c = a.getLatLng(0);
              h = a.getLatLng(1);
              m.Vg((c = [c[0], c[1], h[0], h[1]]));
              d = c;
              for (e = 2; e < g; e++)
                (c = a.getLatLng(e - 1)),
                  (h = a.getLatLng(e)),
                  m.Vg((c = [c[0], c[1], h[0], h[1]])),
                  (d = m.nd(d, c));
            }
          return m.fromObject(d, b);
        },
        merge: function (a) {
          (!a || !a.length || !(a[0] instanceof m)) &&
            j("array of bounding boxes is expected");
          for (
            var b = a[0],
              d = b.topLeft,
              c = b.bottomRight,
              h = [d.latitude, d.longitude, c.latitude, c.longitude],
              g = a.length;
            --g;

          )
            (b = a[g]) instanceof m
              ? (h = m.nd(h, [
                  (d = b.topLeft).latitude,
                  d.longitude,
                  (c = b.bottomRight).latitude,
                  c.longitude,
                ]))
              : j("it is possible to merge bounding boxes only");
          return m.fromObject(h);
        },
        nd: function (b, d) {
          var h,
            i,
            j = b[1],
            f = b[3],
            m = d[1],
            s = d[3],
            w,
            u,
            v,
            x,
            z;
          h = a(b[2], d[2]);
          i = g(b[0], d[0]);
          w = c(j, f);
          u = e(j, w);
          v = c(m, s);
          z = e(m, v) - u;
          z += z - 1.0e-6 < 0 ? 360 : 0;
          z - 1.0e-6 < 180
            ? ((u = j), (x = s))
            : ((z = 360 - z), (u = m), (x = f));
          z = z + w / 2 + v / 2;
          z + 5.0e-7 >= 360
            ? ((u = -180), (x = 180))
            : z - 5.0e-7 < w
            ? ((u = j), (x = f))
            : z - 5.0e-7 < v && ((u = m), (x = s));
          return [i, u, h, x];
        },
        Vg: function (a) {
          var b = a[1],
            c = a[3],
            h = a[0],
            g = a[2];
          if (
            (b > c && c - b > 180) ||
            (b < c && b - c < -180) ||
            (c < b && d(c - b) < 180)
          )
            (a[1] = c), (a[3] = b);
          h < g && ((a[0] = g), (a[2] = h));
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.geo.QuadTree");
    (function (f) {
      function e(a, b) {
        var c = a.length,
          h = b.length,
          g,
          e = {};
        if (h) {
          for (; c--; ) e[a[c].id] = 1;
          for (; h--; ) (g = b[h]).id in e || a.push(g);
        }
      }
      var c = f.geo,
        b = f.util,
        a = c.BoundingBox,
        f = b.QuadTree,
        g = f.Entry,
        f = (c.QuadTree = new ovi.Class({
          initialize: function (a) {
            this.N = new b.QuadTree(a, 180, 90, 0, 0);
            this.Sc = ovi.Array();
          },
          isCDB: !1,
          getBoundingBox: function () {
            var b;
            if (!this.ia && !this.isCDB && (b = this.N.getExtremes()))
              this.ia = new a([-b["4"], b["7"]], [-b["6"], b["5"]]);
            return this.ia || null;
          },
          insertBoundingBox: function (a) {
            var b = a.topLeft,
              c = a.bottomRight,
              h = b.longitude,
              e = c.longitude,
              l;
            this.ia = null;
            if (a.isCDB)
              this.Sc.push(
                (l = new g(null, h, -b.latitude, e + 360, -c.latitude))
              ),
                (this.isCDB = !0);
            return l || this.N.insertSorted(h, -b.latitude, e, -c.latitude);
          },
          insertCoordinate: function (a) {
            var b = a.longitude,
              a = -a.latitude;
            this.ia = null;
            return this.N.insertSorted(b, a, b, a);
          },
          insertLine: function (a, b, c, h) {
            var e, l;
            this.ia = null;
            b < h ? (e = b) : ((e = h), (h = b));
            a < c ? ((b = -c), (a = -a)) : ((b = -a), (a = -c));
            if (h - e > 180)
              this.Sc.push((l = new g(null, h, b, e + 360, a))),
                (this.isCDB = !0);
            return l || this.N.insertSorted(e, b, h, a);
          },
          insertLineAlt: function (a, b, c, h, g) {
            return this.insertLine(a, b, h, g);
          },
          remove: function (a) {
            var b;
            if (a.ma) this.N.remove(a);
            else if ((a = (b = this.Sc).indexOf(a)) >= 0)
              b.splice(a, 1), (this.isCDB = b.length > 0);
            this.ia = null;
          },
          gd: function (a, b, c, h, g) {
            for (var e = this.Sc, k = e.length, f, p = [], o, q, r, s; k--; )
              (f = e[k]),
                (o = f[7]),
                (q = f[4]),
                (r = f[5]),
                (s = f[6]),
                o > c ||
                  r < a ||
                  q > h ||
                  s < b ||
                  ((g || (o >= a && r <= c && q <= h && s >= b)) && p.push(f));
            return p;
          },
          intersectBoundingBox: function (a, b) {
            var c = this.N,
              h = a.topLeft,
              g = a.bottomRight,
              l = -h.latitude,
              h = h.longitude,
              k = -g.latitude,
              g = g.longitude,
              f;
            a.isCDB
              ? ((f = c.intersect(-180, l, g, k, b)),
                e(f, c.intersect(h, l, 180, k, b)),
                e(f, this.gd(g, l, h + 360, k, b)))
              : ((f = c.intersect(h, l, g, k, b)),
                g > 0 && e(f, this.gd(h, l, g, k, b)),
                h < 0 && e(f, this.gd(h + 360, l, g + 360, k, b)));
            return f;
          },
          intersectCoordinate: function (a) {
            var b = -a.latitude,
              a = a.longitude,
              c = this.N.intersect(a, b, a, b, 1);
            e(c, this.gd(a, b, a, b, 1));
            return c;
          },
        }));
    })(nokia.maps);
    ovi.provide("nokia.maps.geo.Shape");
    (function (f) {
      function e(a, b) {
        return a / b < 0 && g(b - a) > 180;
      }
      var c = Math,
        b = c.min,
        a = c.max,
        g = c.abs,
        d = c.pow,
        i = c.sqrt,
        j = c.round,
        h = f.geo,
        m = f.util,
        l = m.Point,
        k = h.Coordinate,
        n = h.BoundingBox,
        p = m.clipping,
        o = m.Coroutine,
        q = [],
        r = !r;
      h.Shape = new ovi.Class({
        Extends: h.Strip,
        initialize: function (a, b) {
          this.N = new h.QuadTree(+b || 10);
          this._super(q);
          this.nb = !!a;
          this.qi = [];
          this.pb = 0;
          this.addObserver(this.Il, this);
        },
        Statics: {
          Ak: q,
          Xg: function (a, b) {
            var d = 0,
              c = a.arr,
              g,
              i,
              k,
              j,
              l,
              f,
              m,
              n,
              q = c.length;
            a.shape
              ? ((j = +c[a.i - 2]), (n = +c[a.i - 1]))
              : ((a.shape = new h.Shape(a.closed)),
                (a.i = 0),
                q > 2 &&
                  ((j = +c[a.i++]),
                  (n = +c[a.i++]),
                  a.shape.internalArray.push(j, n, 0)));
            i = a.shape;
            k = i.N;
            l = i.qi;
            for (g = i.internalArray; a.i < q; )
              if (
                ((f = +c[a.i++]),
                (m = +c[a.i++]),
                g.push(f, m, 0),
                ((j = k.insertLine(j, n, f, m)).jb = l.length),
                l.push(j),
                (i.pb += e(m, n)),
                (j = f),
                (n = m),
                !(++d & 15) && o.shallYield())
              )
                return o.yield();
            if (i.closed && c.length >= 2)
              (f = +c[0]),
                (m = +c[1]),
                g.push(f, m, 0),
                ((j = k.insertLine(j, n, f, m)).jb = l.length),
                (j.$closing = 1),
                l.push(enty),
                (i.pb += e(m, n));
            if (b && a.callback) return o.kill(b), a.callback.call(a.ctx, i);
            return i;
          },
          fromLatLngArray: function (a, b, d, c) {
            var h;
            if (m.isFunction(d))
              return (
                (h = o.create(
                  "nokia.maps.geo.Shape#fromLatLngArrayCo",
                  this.Xg,
                  "arr",
                  "closed",
                  "callback",
                  "ctx"
                )),
                (this.Yg = h(a, b, d, c || void 0)),
                null
              );
            return this.Xg({ arr: a, closed: b }, null);
          },
        },
        destroy: function () {
          this.Yg && o.kill(this.Yg);
          this._super();
        },
        getBoundingBox: function () {
          var a,
            b,
            d = this.ia;
          if (!d)
            (d = this.N.getBoundingBox() || n.fromPath(this)),
              this.nb &&
                this.pb &&
                ((a = this.get(0)),
                (b = this.get(this.getLength() - 1)),
                (d = d.merge(n.coverAll([a, b])))),
              (this.ia = d);
          return this.ia;
        },
        El: function (a) {
          var b = this.internalArray;
          this.internalArray = a.internalArray;
          this.Fa(this, 0, a.internalArray.length / 3, b);
        },
        Il: function (d, c, h, g) {
          var d = this.nb,
            i = this.N,
            k = this.qi,
            e = k.length,
            j = g.length / 3,
            g = a(c - 1, 0),
            l;
          this.ia = null;
          d && e && i.remove(k.splice(--e, 1)[0]);
          if (j) {
            e = b(c - 1 + j, e - 1);
            for (l = g; l <= e; l++) i.remove(k[l]);
            j = [g, e - g + 1];
          } else
            e > 0 && c <= e && c > 0
              ? (i.remove(k[g]), (j = [g, 1]))
              : (j = [g, 0]);
          g = a(c - 1, 0);
          e = b(c - 1 + h, this.getLength() - 2);
          for (l = g; l <= e; l++)
            j.push(
              i.insertLineAlt.apply(
                i,
                this.internalArray.slice(l * 3, l * 3 + 6)
              )
            );
          k.splice.apply(k, j);
          e = k.length;
          d &&
            e &&
            ((k[e++] = i.insertLine.apply(
              i,
              this.getLatLng(this.getLength() - 1).concat(this.getLatLng(0))
            )).$closing = 1);
          for (l = e; l--; ) k[l].jb = l;
          this.pb = this.Fg(this.internalArray, 3);
        },
        Gg: function (d, c, h) {
          if (!this.nb) return !1;
          for (var g = c.length, i = 1, k = 0, e = c[0], j, l; i < g; i++)
            (j = c[i]),
              (l = e.y + (j.y - e.y) * ((d.x - e.x) / (j.x - e.x))),
              b(e.x, j.x) <= d.x &&
                a(e.x, j.x) >= d.x &&
                (h ? l > d.y : l < d.y) &&
                k++,
              (e = j);
          return !!(k % 2);
        },
        Fg: function (a, b) {
          var d = this.nb ? 0 : b,
            c = 0,
            h = a.length,
            g = a[d ? 1 : h - b + 1],
            i;
          for (++d; d < h; d += b) (c += e((i = a[d]), g)), (g = i);
          return c;
        },
        Vl: function (a, b) {
          return a.jb - b.jb;
        },
        Um: function (a, b, d, c, h, g) {
          var i = a.x,
            a = -a.y,
            k = b.x,
            b = -b.y,
            e,
            j,
            f,
            d = -d,
            g = -g;
          if (i > k) {
            if (k > h || i < c) return;
            f = i;
            j = a;
            i = k;
            a = b;
            k = f;
            b = j;
            f = 1;
          } else if (i > h || k < c) return;
          if (a > b) {
            if (b > d || a < g) return;
            e = 1;
            a = -a;
            b = -b;
            j = g;
            g = -d;
            d = -j;
          } else if (a > d || b < g) return;
          if (i < c) {
            if ((a += ((c - i) * (b - a)) / (k - i)) > d) return;
            i = c;
          }
          if (a < g) {
            if ((i += ((g - a) * (k - i)) / (b - a)) > h) return;
            a = g;
          }
          k > h && ((b = a + ((h - i) * (b - a)) / (k - i)), (k = h));
          b > d && ((k = i + ((d - a) * (k - i)) / (b - a)), (b = d));
          e && ((a = -a), (b = -b));
          return f
            ? [new l(k, -b), new l(i, -a)]
            : [new l(i, -a), new l(k, -b)];
        },
        bd: function (a, b, d, c) {
          function h(a, b) {
            k && g(k - b) > 180 && (b += k < 0 ? -360 : 360);
            k = b;
            return d.latLngToPixel(a, b + (c ? c : 0));
          }
          var i = [],
            k,
            e = a.length,
            j,
            l = 0;
          for (j = 0; j < e; j += 2) i[l++] = h(a[j], a[j + 1]);
          b && (i[l] = h(a[0], a[1]));
          return i;
        },
        $h: function (a, b) {
          for (var d = [], c = Infinity, h = -1, i, d = 0; d < a.length; d += 2)
            (i = g(a[d + 1] - b)),
              (i += i > 180 ? 360 - i : i),
              i < c && ((c = i), (h = d));
          if (d > 0) return (d = a.splice(h, a.length - h)), d.concat(a);
          return a;
        },
        Tc: function (a, b, d, c, h) {
          if (!a.length) return a;
          for (var g = [], i, k = a.length, e, j, l, f, m, n, q; k--; ) {
            n = a[k];
            f = n.length;
            m = 0;
            for (e = 1; e < f; e++)
              if ((q = this.Um(n[e - 1], n[e], b, d, c, h)))
                (j = q[0]),
                  (l = q[1]),
                  m && m.equals(j) ? i.push(l) : g.push((i = q)),
                  (m = l);
          }
          f = g.length;
          f > 1 &&
            g[0][0].equals(g[f - 1][g[f - 1].length - 1]) &&
            g[0].splice.apply(g[0], [0, 1].concat(g.splice(f - 1, 1)[0]));
          return g;
        },
        Hk: function (a) {
          var b = a.length,
            d,
            c = 0,
            h,
            i,
            e,
            j = [],
            l;
          i = !1;
          for (d = 0; d < b; d += 2)
            (j[c++] = a[d]),
              (j[c++] = a[d + 1]),
              (e = new k(a[d], a[d + 1], void 0, r)),
              (h =
                a[d + 2] !== void 0
                  ? new k(a[d + 2], a[d + 3], void 0, r)
                  : new k(a[0], a[1], void 0, r)),
              (e = n.coverAll([e, h])),
              !i &&
                g(a[d + 1]) !== 180 &&
                g(h.longitude) !== 180 &&
                e.contains(new k(e.topLeft.latitude, 180, void 0, r)) &&
                ((i = g(h.latitude - a[d])),
                (e = g(h.longitude - a[d + 1])),
                (e += e > 180 ? -360 : 0),
                (l = g(180 - h.longitude)),
                (l += l > 180 ? -360 : 0),
                (i /= g(e) / g(l)),
                (h = h.latitude + (h.latitude > a[d] ? -i : i)),
                (i = a[d + 1] > 0 ? 180 : -180),
                (j[c++] = h),
                (j[c++] = i),
                (j[c++] = h),
                (j[c++] = -i),
                (i = !0));
          return j.length ? j : a;
        },
        Cl: function (a, b, d, c) {
          var h = [],
            i = a.length,
            k,
            e,
            j,
            l,
            f,
            m,
            n = !1;
          for (k = 0; k < i; k += c)
            if (
              ((e = a[k]),
              (j = a[k + 1]),
              k == 0 ||
                ((m = g(f - j)) > 180 ? 360 - m : m) > d ||
                g(l - e) > b)
            )
              !n &&
                g(j) == 180 &&
                (h.push(e), h.push(j), h.push(e), h.push(-j), (n = !0)),
                h.push(e),
                h.push(j),
                (l = e),
                (f = j);
          return h;
        },
        dh: function (a) {
          var b = [],
            c,
            h = a,
            g,
            k;
          do {
            g = j((h.origx ? h.origx : h.x) * 100) / 100;
            k = j((h.origy ? h.origy : h.y) * 100) / 100;
            if (!c || i(d(c.x - g, 2) + d(c.y - k, 2)) > 0.01)
              (c = new l(g, k)), b.push(c);
            h = h.next;
          } while (h && h != a);
          return b;
        },
        clip: function (a, b, d, c, i, j, f) {
          var m = this.nb,
            o = this.internalArray,
            F = b.topLeft,
            B = b.bottomRight,
            K = F.y,
            y = B.y,
            A = F.x,
            O = B.x,
            N = b.getCenter(),
            b = new l(O, K),
            T = new l(A, y),
            b = [F, b, B, T],
            T = a.pixelToGeo(F),
            B = a.pixelToGeo(B),
            M = a.pixelToGeo(N),
            T = n.fromPath(
              new h.Strip(
                [
                  T.latitude,
                  T.longitude,
                  T.latitude,
                  M.longitude,
                  T.latitude,
                  B.longitude,
                  B.latitude,
                  B.longitude,
                  B.latitude,
                  M.longitude,
                  B.latitude,
                  T.longitude,
                ],
                "unsafe values lat lng"
              )
            ),
            M = !1,
            H = 0,
            D,
            S = -2,
            B = [],
            C,
            H = [],
            sa,
            I,
            U = 0,
            X = 0,
            V;
          D = [];
          var ea = [],
            Q;
          if (d)
            (d /= 2),
              (X = N.x),
              (U = N.y),
              (H = a.xyToGeo(X - d, U - d)),
              (D = a.xyToGeo(X + d, U + d)),
              (U = g(H.latitude - D.latitude)),
              (X = g(H.longitude - D.longitude));
          if (m) {
            B = [[]];
            D = this.Cl(o, U, X, 3);
            Q = n.fromPath(
              new nokia.maps.geo.Strip(D, "unsafe values lat lng"),
              r
            );
            m &&
              (Q = Q.merge(
                new n(
                  new k(D[D.length - 2], D[D.length - 1], void 0, r),
                  void 0,
                  r
                ).merge(new n(new k(D[0], D[1], void 0, r), void 0, r))
              ));
            (H = Q.getWidth()) < 360 &&
              Q.topLeft.longitude == -180 &&
              (Q = new n(
                new k(Q.topLeft.latitude, 180, void 0, r),
                Q.bottomRight,
                r
              ));
            H < 360 &&
              Q.bottomRight.longitude == 180 &&
              (Q = new n(
                Q.topLeft,
                new k(Q.bottomRight.latitude, -180, void 0, r),
                r
              ));
            H < 360
              ? j == 0
                ? (C = T)
                : ((j = Q.getCenter().longitude),
                  (V = a.geoToPixel(Q.topLeft)),
                  (V.x -= f),
                  (V.y -= f),
                  (V = a.pixelToGeo(V)),
                  (C = a.geoToPixel(Q.bottomRight)),
                  (C.x += f),
                  (V.y += f),
                  (C = a.pixelToGeo(C)),
                  (C = n.fromPath(
                    new h.Strip(
                      [
                        V.latitude,
                        V.longitude,
                        V.latitude,
                        j,
                        V.latitude,
                        C.longitude,
                        C.latitude,
                        C.longitude,
                        C.latitude,
                        j,
                        C.latitude,
                        V.longitude,
                      ],
                      "unsafe values lat lng"
                    ),
                    r
                  )))
              : (C = Q);
            m && (D = this.$h(this.Hk(D), Q.topLeft.longitude));
            B[0] = this.bd(D, m, a);
            if (Q.getWidth() == 360 && this.Fg(D, 2) % 2 == 1) {
              B[0][1].x > B[0][B[0].length - 1].x && (B[0] = B[0].reverse());
              ea = [];
              H = B[0].length - 1;
              for (d = 0; d < H; d++)
                (o = B[0][d]),
                  (ea[d] = new l(o.x - 2 * a.w, o.y)),
                  (ea[d + H] = new l(o.x - a.w, o.y)),
                  (ea[d + 2 * H] = new l(o.x, o.y)),
                  (ea[d + 3 * H] = new l(o.x + a.w, o.y)),
                  (ea[d + 4 * H] = new l(o.x + 2 * a.w, o.y));
              B[0] = ea;
              V = a.latLngToPixel(c ? 90 : -90, 0);
              V.y = c ? V.y - 51 : V.y + 51;
              j = V.clone();
              V.x = B[0][B[0].length - 1].x + 1;
              j.x = B[0][0].x - 1;
              B[0].push(V, j);
            }
            M = this.Gg(F, B[0], c);
            ea = this.Tc(B, K, A, O, y);
            V = ea.length;
            H = B;
            Q.getWidth() < 360 &&
              Q.contains(new k(Q.topLeft.latitude, 180, void 0, r)) &&
              ((B = []),
              (D = this.$h(D, Q.bottomRight.longitude)),
              (B[0] = this.bd(D, m, a)),
              (M = !!(M ^ this.Gg(F, B[0], c))),
              (ea = this.Tc(B, K, A, O, y)),
              (V += ea.length),
              (H = H.concat(B)));
            Q.getWidth() < 360 &&
              !Q.contains(new k(Q.topLeft.latitude, 180, void 0, r)) &&
              C.contains(new k(Q.topLeft.latitude, 180, void 0, r)) &&
              ((B = Q.getCenter().longitude > 0 ? -360 : 360),
              (C = this.bd(D, m, a, B)),
              (B = [C]),
              (ea = this.Tc(B, K, A, O, y)),
              (V += ea.length),
              H.push(C));
          } else {
            f = this.N.intersectBoundingBox(T, r).sort(this.Vl);
            H = f.length;
            for (c = 0; c < H; c++)
              (N = f[c]),
                (F = N.jb),
                (D = F * 3),
                S + 1 !== F && B.push((C = [(sa = o[D]), (I = o[D + 1])])),
                (S = F),
                (D = N.$closing ? 0 : D + 3),
                (N = o[D]),
                (D = o[D + 1]),
                (!d ||
                  c === H - 1 ||
                  f[c + 1].jb !== F + 1 ||
                  g(I - D) > X ||
                  g(sa - N) > U) &&
                  C.push((sa = N), (I = D));
            if (this.pb) {
              F = [];
              for (c = 0; c < B.length; c++)
                if (((C = B[c]), (H = C.length))) {
                  o = [];
                  for (d = 0; d < H; d += 2)
                    d == 0 || (d > 0 && !e(C[d + 1], C[d - 1]))
                      ? o.push(C[d], C[d + 1])
                      : (o.push(C[d], C[d + 1]),
                        F.push(o),
                        (o = []),
                        (C[d - 1] += C[d - 1] < 0 ? 360 : -360),
                        o.push(C[d - 2], C[d - 1], C[d], C[d + 1]));
                  F.push(o);
                }
              B = F;
            }
            D = [];
            c = o = 0;
            for (H = B.length; c < H; c++)
              (C = B[c]), C.length && (D[o++] = this.bd(C, m, a));
            H = j ? this.Tc(D, K, A, O, y) : D;
          }
          if (!m || !V)
            if (m)
              if (M) {
                if (i) return (H = [b]), (H.fullfilled = 1), H;
                return q;
              } else return [];
            else return H;
          if (T.contains(Q)) return H;
          B = [];
          for (c = H.length; c--; )
            if (
              ((a = H[c]),
              (i = p.prepareList(a)),
              (a = p.prepareList(b)),
              (a = p.clip(a, i)))
            ) {
              C = this.dh(a);
              for (B.push(C); a.nextPoly; )
                (a = a.nextPoly), (C = this.dh(a)), B.push(C);
            }
          return B;
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.dom._packaging.base");
    ovi.provide("nokia.maps.gfx._packaging.base");
    ovi.provide("nokia.maps.geo._packaging.base");
    var fb = nokia.maps,
      ob = fb.config.params.language || "auto";
    delete fb.config.params;
    fb.loadPath = fb.config.baseUrl;
    fb.Config.setDefaults(nokia.maps.config);
    fb.util.ApplicationContext.set("defaultLanguage", ob);
    window.nokia.maps = nokia.maps;
  })();
}
/*
     FILE ARCHIVED ON 17:39:00 May 14, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:19:20 Sep 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 105.887
  exclusion.robots: 0.092
  exclusion.robots.policy: 0.083
  RedisCDXSource: 0.57
  esindex: 0.022
  LoadShardBlock: 87.956 (3)
  PetaboxLoader3.datanode: 153.839 (5)
  CDXLines.iter: 14.9 (3)
  load_resource: 299.606 (2)
  PetaboxLoader3.resolve: 219.985 (2)
*/
