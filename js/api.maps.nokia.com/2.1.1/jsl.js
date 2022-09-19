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
    (function (e) {
      function q(a) {
        for (
          var a = a.split("."), f = this, b = a[0] === "window" ? 1 : 0;
          b < a.length;
          b++
        )
          f = f[a[b]] || (f[a[b]] = {});
        return f;
      }
      var h = q(e);
      if (!(h.load && typeof h.load === "function")) {
        var n = function () {
            return !0;
          },
          g = {},
          i = {},
          r = function () {
            for (var a in i)
              i.hasOwnProperty(a) && i[a] && !i[a].cancelled && i[a].load();
          },
          k = function (a, f) {
            for (var b = g[a], c = b ? b.length : 0; c--; )
              if (b[c].name === f) return b[c];
            throw "unknown:[$1]".replace("$1", a + ":" + f);
          },
          m = function (a, f) {
            var b;
            if (!f || f === "auto")
              a: {
                for (var c = (b = g[a]) ? b.length : 0, d = 0; d < c; d++)
                  if (
                    b[d].readyState === "complete" ||
                    b[d].readyState === "loading"
                  ) {
                    b = b[d];
                    break a;
                  }
                for (d = 0; d < c; d++)
                  if (b[d].detector()) {
                    b = b[d];
                    break a;
                  }
                b = null;
              }
            else b = f === "none" ? null : k(a, f);
            return b;
          },
          s = function (a) {
            var a = a || n,
              f = {},
              b,
              c,
              d;
            for (c in g)
              if (g.hasOwnProperty(c)) {
                b = [];
                for (d = 0; d < g[c].length; d++)
                  a(g[c][d]) && b.push(g[c][d].name);
                b.length > 0 && (f[c] = b);
              }
            return f;
          },
          o = 0,
          p = function (a, f, b, c, d, e, g) {
            this.featureName = a;
            this.name = f;
            this.loadPath = b;
            this.detector = c || n;
            this.dependencies = d;
            this.charset = e || "utf-8";
            this.loadCallback = g;
            this.readyState = "uninitialized";
          };
        p.prototype = {
          onWrite: function (a) {
            this.readyState = "loading";
            a && r();
          },
          onLoad: function (a) {
            a && this.onWrite(a);
            this.readyState = "complete";
            r();
          },
          canLoad: function (a, f) {
            for (var b = this.dependencies, c = b ? b.length : 0, d; c--; ) {
              if (a[b[c]] === "none")
                throw "conflict:[$1]->[$2]"
                  .replace("$1", this.featureName)
                  .replace("$2", b[c]);
              d = m(b[c], a[b[c]] || "auto");
              if (
                d.readyState === "uninitialized" ||
                (!f && d.readyState === "loading")
              )
                return !1;
            }
            return !0;
          },
          onLoadCallback: function (a) {
            this.loadCallback && this.loadCallback();
            (a = a.getElementById(
              "_onLoad" + this.featureName + "_" + this.name
            )) &&
              a.parentNode &&
              a.parentNode.removeChild(a);
          },
          writeSync: function (a, f) {
            this.readyState = "loading";
            a.write(
              '<script type="text/javascript" charset="$ENC$" src="$SRC$"></script>'
                .replace("$SRC$", this.loadPath)
                .replace("$ENC$", this.charset)
            );
            this.loadCallback &&
              a.write(
                '<script id="$ID$" type="text/javascript" charset="utf-8">$CONTENT$</script>'
                  .replace(
                    "$ID$",
                    "_onLoad" + this.featureName + "_" + this.name
                  )
                  .replace(
                    "$CONTENT$",
                    e +
                      ".get('" +
                      this.featureName +
                      "','" +
                      this.name +
                      "').onLoadCallback(" +
                      e +
                      ".loaders[" +
                      f +
                      "].doc)"
                  )
              );
            this.onLoad(!0);
          },
          writeAsync: function (a, f, b) {
            this.readyState = "loading";
            var c = this,
              d = a.createElement("script");
            f && (d.async = !1);
            d.type = "text/javascript";
            d.charset = this.charset;
            d.onload = d.onreadystatechange = function () {
              var b = d.readyState;
              if (!b || /^(?:loaded|complete)$/i.test(b))
                (d.onload = d.onreadystatechange = null),
                  c.onLoadCallback && c.onLoadCallback(a),
                  c.onLoad(f);
            };
            d.onerror = function (a) {
              b(a);
            };
            d.src = this.loadPath;
            a.getElementsByTagName("head")[0].appendChild(d);
            this.onWrite(f);
          },
        };
        p.prototype.featureName = null;
        p.prototype.onLoadCallback = p.prototype.onLoadCallback;
        p.prototype.readyState = null;
        var l = function (a, f, b, c, d) {
          c = c || document;
          this.requested = a;
          this.onSuccess = f || n;
          this.onError = b || n;
          this.doc = c;
          this.writeSync = this.inHead = d || c.readyState != "complete";
          this.id = o++;
          i[this.id] = this;
        };
        l.prototype = {
          onFinished: function (a) {
            delete i[this.id];
            if (a) this.onError(a);
            else this.onSuccess();
            (a = this.doc.getElementById("_onSuccess" + this.id)) &&
              a.parentNode &&
              a.parentNode.removeChild(a);
          },
          load: function () {
            var a = this.requested,
              f,
              b,
              c = !0,
              d = this;
            try {
              for (b in a)
                g[b] &&
                  (f = m(b, a[b])) &&
                  this.loadSingle(
                    f,
                    a,
                    this.inHead,
                    this.writeSync,
                    function (a) {
                      d.onFinished(a);
                    }
                  ) &&
                  (c = !1);
              c && this.onDone();
            } catch (e) {
              this.onFinished(e), (this.onFinished = n);
            }
          },
          onDone: function () {
            if (!this.done) {
              var a = this;
              this.inHead
                ? document.write(
                    '<script id="$ID$" type="text/javascript" charset="utf-8">$CONTENT$</script>'
                      .replace("$ID$", "_onSuccess" + a.id)
                      .replace(
                        "$CONTENT$",
                        e + ".loaders[" + a.id + "].onFinished();"
                      )
                  )
                : window.setTimeout(function () {
                    a.onFinished();
                  }, 1);
              this.done = !0;
            }
          },
          loadSingle: function (a, f, b, c, d) {
            if (a.readyState === "complete") return !1;
            else if (a.readyState === "loading") return !0;
            var e, g;
            if (a.canLoad(f, c))
              b ? a.writeSync(this.doc, this.id) : a.writeAsync(this.doc, c, d);
            else {
              a = a.dependencies;
              for (e = a.length; e--; )
                (g = m(a[e], f[a[e]] || "auto")),
                  this.loadSingle(g, f, b, c, d);
            }
            return !0;
          },
        };
        l.prototype.onFinished = l.prototype.onFinished;
        l.prototype.id = null;
        l.prototype.doc = null;
        h.loaders = i;
        h.features = g;
        h._detectors = {};
        h.get = m;
        h.add = function (a, f, b, c, d, e, h) {
          (g[a] || (g[a] = [])).push(new p(a, f, b, c, d, h, e));
        };
        h.isLoaded = function (a, f) {
          return k(a, f).readyState === "complete";
        };
        h.load = function (a, f, b, c, d) {
          new l(a, f, b, c, d).load();
        };
        h.getFeatureMap = function () {
          return s(function (a) {
            return a.featureName != "base";
          });
        };
        h.getLoadedMap = function () {
          return s(function (a) {
            return a.featureName != "base" && a.readyState === "complete";
          });
        };
        q("nokia.maps").Features = h;
      }
    })("nokia.Features");
    nokia.maps.Features._detectors["ui-ovi_web"] = function () {
      return !0;
    };
    nokia.maps.Features._detectors["ui-nokia_generic"] = function () {
      var e = navigator.userAgent.toLowerCase(),
        q = (function () {
          var e = document.createElement("canvas");
          if (!e || !e.getContext) return !1;
          return typeof e.getContext("2d").fillText === "function";
        })(),
        h = document.implementation.hasFeature(
          "http://www.w3.org/TR/SVG11/feature#BasicStructure",
          "1.1"
        ),
        n = e.match(/msie/) && !window.opera && !q,
        e = e.match(/msie\s7/);
      return q || h || (n && !e);
    };
    nokia.maps.Features._detectors["search-nokia"] = function () {
      return !0;
    };
    nokia.maps.Features._detectors["routing-nokia"] = function () {
      return !0;
    };
    nokia.maps.Features._detectors["positioning-w3c"] = function () {
      var e = !1;
      try {
        e = !(
          !navigator ||
          !(
            navigator.geolocation &&
            typeof navigator.geolocation.getCurrentPosition === "function"
          )
        );
      } catch (q) {}
      return e;
    };
    nokia.maps.Features._detectors["behavior-touch"] = function () {
      return !0;
    };
    nokia.maps.Features._detectors["behavior-all"] = function () {
      return !0;
    };
    nokia.maps.Features._detectors["map-js-p2d-dom"] = function () {
      return !0;
    };
    nokia.maps.Features._detectors["map-js-p2d-canvas"] = function () {
      var e = document.createElement("canvas");
      return !(!e.getContext || !e.getContext("2d"));
    };
    nokia.maps.Features._detectors["gfx-vml"] = function () {
      return !document.implementation.hasFeature(
        "http://www.w3.org/TR/SVG11/feature#BasicStructure",
        "1.1"
      );
    };
    nokia.maps.Features._detectors["gfx-svg"] = function () {
      return document.implementation.hasFeature(
        "http://www.w3.org/TR/SVG11/feature#BasicStructure",
        "1.1"
      );
    };
    nokia.maps.Features._detectors["gfx-canvas"] = function () {
      var e = document.createElement("canvas");
      if (!e || !e.getContext) return !1;
      return typeof e.getContext("2d").fillText === "function";
    };
    this.nokia.maps = this.nokia.maps || {};
    this.nokia.maps.build = "nokiamapsapi-2.1.1-Bianca-20120207-w6-r13204";
    var j = this.nokia.maps,
      t = j.config || {};
    t.packages = t.packages || {
      search: [{ name: "nokia" }],
      routing: [{ name: "nokia" }],
      positioning: [{ name: "w3c" }],
      map: [
        { name: "js-p2d-canvas", dependencies: ["gfx"] },
        { name: "js-p2d-dom", dependencies: ["gfx"] },
      ],
      behavior: [{ name: "all" }, { name: "touch" }],
      gfx: [{ name: "canvas" }, { name: "svg" }, { name: "vml" }],
      ui: [
        { name: "nokia_generic", dependencies: ["gfx"] },
        { name: "ovi_web" },
      ],
      language: [
        { name: "en-GB" },
        { name: "en-US" },
        { name: "de-DE" },
        { name: "es-ES" },
        { name: "zh-CN" },
        { name: "fr-FR" },
        { name: "ru-RU" },
        { name: "it-IT" },
      ],
    };
    t.addons = t.addons || {
      kml: [{ name: "kml" }],
      heatmap: [{ name: "heatmap", dependencies: ["map"] }],
    };
    t.assetsPath = t.assetsPath || "assets/ovi/mapsapi";
    t.tileProviders = t.tileProviders || "nokia.maps.map.js.nokiaTileProviders";
    t.copyright = t.copyright || "nokia.maps.map._Copyright";
    t["language.warnOnMissingTranslation"] =
      t["language.warnOnMissingTranslation"] || !1;
    t.includePlaces = !0;
    j.config = t;
    nokia.maps.config = this.nokia.maps.config;
    (function (e) {
      function q(a) {
        p = a.dependencies || [];
        p.push("base");
        s = k + "-" + a.name;
        l.add(k, a.name, g + s + ".js", l._detectors[s], p);
      }
      function h(a) {
        for (var b = /([\\?&]([^=]+)=([^&#]+))/g, c, d = {}; (c = b.exec(a)); )
          d[c[2]] = c[3];
        return d;
      }
      function n() {
        if (r["jsl.js"]) return r["jsl.js"];
        for (
          var a = "jsl.js".replace(".", "\\."),
            b = document.getElementsByTagName("script"),
            c = b.length,
            a = RegExp("^(.*\\/" + a + ".*|" + a + ".*)");
          c--;

        )
          if (a.test(b[c].src)) return (r["jsl.js"] = b[c].src), r["jsl.js"];
        throw "InternalError: could not locate jsl.js in the environment.";
      }
      var g,
        i,
        r = {};
      if (!e.assetsPath)
        throw "Internal Error: no asset path has been specified";
      g =
        e.loadPath ||
        (function (a) {
          a = a.split("/").slice(0, -1);
          return a.join("/") + (a.length > 0 ? "/" : "");
        })(n());
      i = e.params || h(n());
      var k,
        m,
        s,
        o,
        p,
        l = nokia.maps.Features,
        a = this;
      for (k in e.packages) {
        m = e.packages[k];
        for (o = 0; o < m.length; o++) q(m[o]);
        k != "language" && !i[k] && (i[k] = "auto");
      }
      if (e.addons)
        for (k in e.addons) {
          m = e.addons[k];
          for (o = 0; o < m.length; o++) q(m[o]);
        }
      l.add("base", "noovi", g + "base_noovi.js", function () {
        return a.ovi && a.ovi.win;
      });
      l.add("base", "withovi", g + "base.js", function () {
        return !a.ovi || !a.ovi.win;
      });
      e.params = i;
      e.baseUrl = g;
      i.blank ||
        l.load(
          i,
          null,
          function (a) {
            throw a;
          },
          null,
          !0
        );
    })(this.nokia.maps.config);
  })();

  (function () {
    var a = [0.1];
    a.pop(), a.push("");
    if (a[0] !== "") {
      function b(a, b) {
        var c = a[b];
        a[b] = function () {
          return (
            this.length || (this[0] = "") || (this.length = 0),
            c.apply(this, arguments)
          );
        };
      }
      (a = Array.prototype), b(a, "push"), b(a, "splice");
    }
  })();
}
/*
     FILE ARCHIVED ON 06:32:14 Feb 27, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:12:32 Sep 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 4877.202
  exclusion.robots: 0.071
  exclusion.robots.policy: 0.064
  cdx.remote: 0.051
  esindex: 0.007
  LoadShardBlock: 219.382 (3)
  PetaboxLoader3.datanode: 345.967 (5)
  CDXLines.iter: 20.082 (3)
  load_resource: 383.866 (2)
  PetaboxLoader3.resolve: 210.655 (2)
*/
