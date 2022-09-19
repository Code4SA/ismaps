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
    ovi.provide("nokia.maps.map._Copyright");
    ovi.provide("nokia.maps.resources.copyright.html");
    nokia.maps.resources.copyright.html =
      '<div class="nm_crimg" style="display:block;position:absolute;bottom:0;left:8px;width:52px;height:31px;cursor:pointer" title="Nokia Maps"></div> \r\n<div class="nm_crnode" style="position:relative;top:0;padding-left:10px;padding-bottom:8px;height:13px;font-size:10px;font-family:arial, sans-serif;color:#333;text-shadow:0 0 5px #fff;white-space:nowrap;"> \r\n\t<span class="nm_crtext"></span>&nbsp;<a href="https://web.archive.org/web/20170514173900/http://maps.nokia.com/services/terms" target="_blank" title="Terms of Use" style="color:#333;text-decoration: underline;">Terms of Use</a>\r\n</div>';
    (function (f) {
      function e(a) {
        g.test(a) || f.util.f("alignment '" + a + "'");
        this.Eg.Od(a);
        return a;
      }
      var c = f.dom,
        b = Math.floor,
        a = f.util.Point,
        g = /^(top|middle|bottom)(left|center|right)$/;
      f.map.fg = new ovi.Class({
        initialize: function (a) {
          var b = this,
            g,
            h;
          b.P = a;
          g = b.jl = c.ha(a.Xb, "div");
          g.innerHTML = f.resources.copyright.html;
          b.ni = (b.Gn = c.findElement("nm_crtext", g)).parentNode;
          (h = (b.ka = g = c.findElement("nm_crimg", g))
            .style).backgroundRepeat = "no-repeat";
          h.backgroundImage =
            "url(" + f.loadPath + f.config.assetsPath + "/logo.png)";
          if (g.getAttribute("title") === "Nokia Maps")
            g.onclick = function () {
              var b = a.center;
              window.open(
                [
                  "https://web.archive.org/web/20170514173900/http://maps.nokia.com/?cid=nokiamaps-fw-ilc-na-acq-na-thirdparty-g0-na-1#",
                  b.latitude,
                  b.longitude,
                  a.zoomLevel,
                  "0|0|",
                ].join("|")
              );
            };
          a.T("poweredByWidth", g.offsetWidth);
          a.T("poweredByHeight", g.offsetHeight);
          a.copyrightAlignmentSetter = e;
          a.addObserver("baseMapType", b.Yd, b);
          a.addListener("mapviewchangeend", function () {
            b.Yd();
          });
          a.addListener("resizeend", function () {
            b.Od();
          });
          b.Od(a.copyrightAlignment);
          b.Yd();
        },
        Od: function (c) {
          var e = this.P,
            f = this.jl,
            h = this.ni,
            m = this.ka;
          if (c) {
            var l = g.exec(c),
              c = l[1],
              l = l[2],
              k = f.style;
            k.cssText =
              "position:absolute;" +
              (c === "middle"
                ? "top:50%;margin-top:" + b(f.offsetHeight / -2) + "px;"
                : c + ":" + (c === "top" ? "14px;" : "-7px;")) +
              (l === "center"
                ? "left:50%;margin-left:" + b(f.offsetWidth / -2) + "px;"
                : l + ":" + (l === "left" ? "-4px;" : "4px;")) +
              "width:" +
              k.width +
              ";height:" +
              k.height +
              ";";
          }
          f = new a(f.offsetLeft, f.offsetTop);
          e.T("copyrightPosition", f.add({ x: h.offsetLeft, y: h.offsetTop }));
          e.T("poweredByPosition", f.add({ x: m.offsetLeft, y: m.offsetTop }));
        },
        Yd: function () {
          var a = this.P,
            b = this.ni;
          this.Gn.innerHTML = "&copy; " + a.getCopyright();
          this.Od();
          a.T("copyrightWidth", b.offsetWidth);
          a.T("copyrightHeight", b.offsetHeight);
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.Provider");
    nokia.maps.map.Provider = new ovi.Class({
      initialize: function (f) {
        ovi.extend(this, f);
      },
    });
    ovi.provide("nokia.maps.util.Cache");
    (function (f) {
      function e(a, b, c, d) {
        this.d = a;
        this.Ea = b;
        if (this.j !== d) this.j = d;
        if (c) (c.Ab = this).Xa = c;
      }
      function c(a, b) {
        d.Ea = a;
        d.j = b === void 0 ? 1 : b;
        return d;
      }
      function b(a) {
        return a === void 0
          ? 1
          : isNaN((a = +a)) || a < 0 || a === j
          ? f.f()
          : a;
      }
      var a = {},
        g = {},
        d = {},
        i = {},
        j = 1 / 0;
      f.Cache = new ovi.Class({
        initialize: function (a, c, d, e) {
          this.Ne = b(a);
          if (c) this.Ik = c;
          if (d) this.um = d;
          if (e) this.Ja = e;
          this.R = {};
        },
        Statics: { DONT: a, NEXT: g, NOT_ENOUGH_SPACE: i, change: c },
        j: 0,
        change: c,
        add: function (c, f, l) {
          var k = this.Ik,
            j = this.Ja,
            p = this.R,
            o = p[c],
            q;
          if (k) {
            if ((k = k(f)) === g)
              return o && this.remove(c, 1), j ? j.add(c, f, l) : g;
            if (k === a) return o && this.remove(c), a;
            k === d ? ((f = k.Ea), (l = k.j)) : (f = k);
          }
          if ((l = b(l)) > this.Ne) return j ? j.add(c, f, l) : i;
          if (o) (this.j += l - o.j), (o.Ea = f), (o.j = l), this.rh(o);
          else {
            o = p[c] = this.wb = new e(c, f, this.wb, l);
            if (!this.hc) this.hc = o;
            this.j += l;
          }
          for (; this.j > this.Ne; )
            this.Bb((q = this.hc).d, q), j && j.add(q.d, q.Ea, q.j);
        },
        get: function (a, b) {
          var c = this.R[a],
            d;
          c && (b || this.rh(c));
          return c ? c.Ea : ((d = this.Ja) && d.get(a, b)) || void 0;
        },
        remove: function (a, b) {
          var c = this.R[a],
            d,
            e;
          c && this.Bb(a, c);
          if (!b && (d = this.Ja)) e = d.remove(a, b);
          return c ? c.Ea : e;
        },
        removeAll: function (a) {
          var b = this.R,
            c,
            d;
          for (c in b) b.hasOwnProperty(c) && !c.indexOf(a) && this.Bb(c, b[c]);
          (d = this.Ja) && d.removeAll(a);
        },
        destroy: function () {
          var a = this.R,
            b,
            c;
          for (c in a) ((b = a[c]).Xa = 0), (b.Ab = 0);
          this.hc = this.wb = 0;
          this.Ja && this.Ja.destroy();
        },
        Bb: function (a, b, c) {
          var d = b.Ab,
            e = b.Xa,
            g;
          d
            ? e
              ? ((d.Xa = e).Ab = d)
              : ((this.hc = d).Xa = void 0)
            : (this.wb = e)
            ? (e.Ab = void 0)
            : (this.hc = void 0);
          if (!c) delete this.R[a], (this.j -= b.j), (g = this.um) && g(b.Ea);
          return b.Ea;
        },
        rh: function (a) {
          var b = this.wb;
          if ((b = this.wb) !== a) {
            this.Bb(a.d, a, 1);
            if (b) (b.Ab = a).Xa = b;
            (this.wb = a).Ab = void 0;
          }
        },
        toString: function () {
          return (
            "Cache[" +
            this.j +
            " of " +
            this.Ne +
            "]" +
            (this.Ja ? " next" + this.Ja : "")
          );
        },
      });
      e.prototype.j = 1;
    })(nokia.maps.util);
    ovi.provide("nokia.maps.map.js.Tile");
    (function () {
      var f = nokia.maps,
        e = f.dom.importNode,
        c = f.dom.cloneNode,
        b = f.util.now,
        a = -1 / 0;
      ovi.extend(
        (nokia.maps.map.js.Tile = function (a, b, c) {
          this.id = a;
          if ((this.oa = b)) b.style.position = "absolute";
          if (c) this.expires = c;
        }).prototype,
        {
          expires: 0,
          Lc: 1,
          getNode: function (a) {
            var b = this.oa,
              f;
            return (
              b &&
              ((a && a !== document && e(a, b, 1)) ||
                ((f = b.parentNode) && f.nodeType !== 11 && c(b, 1)) ||
                b)
            );
          },
          isExpired: function (c) {
            var d = this.expires;
            return d && (d === a || d < (c || b()));
          },
        }
      );
    })();
    ovi.provide("nokia.maps.map.js.p2d.canvas.Tile");
    (function () {
      var f = {
        cache: [],
        query: function (e) {
          var c = null;
          if (!(c = this.cache.shift()))
            (c = e.createElement("CANVAS")),
              (c.width = c.height = 256),
              (c.style.cssText =
                "width:256px; height:256px; position:absolute;"),
              (c.use3D = null);
          return c;
        },
        release: function (e) {
          e.ownerDocument === document && this.cache.push(e);
        },
      };
      (nokia.maps.map.js.p2d.canvas.Tile = function (e, c, b, a, g) {
        var d = 1 << e,
          f = 22 - e;
        this.leftSMP = b << 8;
        this.topSMP = c << 8;
        this.id = e + "_" + c + "_" + b;
        this.display = g;
        this.doc = a;
        this.zoomLevel = e;
        this.row = c < 0 || c >= d ? -1 : c;
        this.col = (b %= d) < 0 ? b + d : b;
        this.leftMP = this.col << f;
        this.topMP = this.row << f;
        this.zrcId = e + "_" + c + "_" + this.col;
        this.tileProviderLoadState = {};
        this.tileProviderRenderState = {};
      }).prototype = {
        checkAddy: function (e, c, b) {
          var a = 1 << e;
          return e < this.min || e > this.max || c < 0 || c >= (a = 1 << e)
            ? -1
            : (b %= a) < 0
            ? b + a
            : b;
        },
        setTopLeft: function (e, c) {
          var b = this.getCanvas();
          b.use3D
            ? this.display.cssTransform(
                b,
                "translate3d(" + e + "px," + c + "px,0px)"
              )
            : (((b = b.style).left = e + "px"), (b.top = c + "px"));
        },
        getCanvas: function () {
          var e = this.Vk || (this.Vk = f.query(this.doc)),
            c = this.display;
          if (e.use3D === null)
            c.use3D
              ? ((e.use3D = !0), c.cssTransform(e, "translate3d(0px,0px,0px)"))
              : ((e.use3D = !1), ((c = e.style).left = "0px"), (c.top = "0px"));
          return e;
        },
        getContext: function () {
          return this.Fo || (this.Fo = this.getCanvas().getContext("2d"));
        },
        release: function () {
          var e = this.Vk;
          if (e)
            e.parentNode && e.parentNode.removeChild(e),
              document === this.doc && f.release(e),
              (this.Vk = this.Fo = null);
        },
        renderPhase: 0,
        render: !0,
        rendering: !1,
        renderTime: 0,
        containsSpatialObjects: !1,
      };
    })();
    ovi.provide("nokia.maps.map.js.p2d.canvas.TileComposition");
    (nokia.maps.map.js.p2d.canvas.TileComposition = function (f, e, c) {
      this.tiles = f || [];
      this.tilesById = {};
      for (var f = 0, b = this.tilesById, a = this.tiles.length; f < a; f++)
        b[this.tiles[f].id] = this.tiles[f];
      this.centerRow = e || 0;
      this.centerCol = c || 0;
    }).prototype = {
      addTile: function (f) {
        var e = f.id,
          c = this.tiles,
          b = this.tilesById,
          a = b[e];
        a ? (c[c.indexOf(a)] = f) : c.push(f);
        b[e] = f;
        return a;
      },
      replaceTile: function (f) {
        var e = f.id,
          c = this.tiles,
          b = this.tilesById,
          a = b[e];
        if (a) return (c[c.indexOf(a)] = f), (b[e] = f), !0;
        return !1;
      },
      hasTile: function (f) {
        return this.tilesById[f.id];
      },
    };
    ovi.provide("nokia.maps.map.HitArea");
    (function () {
      var f = Math,
        e = f.PI / 180,
        c = f.ceil,
        b = f.min,
        a = f.sin,
        g = f.cos,
        d = nokia.maps.util,
        i = (nokia.maps.map.HitArea = new ovi.Class({
          initialize: function (f, h) {
            var i = (h = [].concat(h)).length,
              l = i,
              k,
              n,
              p,
              o,
              q;
            this.values = h;
            for (this.type = f; l--; )
              isNaN((h[l] = h[l])) &&
                d.f("Given argument is not the array of numbers");
            f === "rect" &&
              i > 3 &&
              ((h = [+h[0], +h[1], +h[2], +h[1], +h[2], +h[3], +h[0], +h[3]]),
              (f = "poly"));
            if (f === "circle" && i > 2 && (p = +h[2]) > 0) {
              k = +h[0];
              n = +h[1];
              l = b(c(p) * 2, 40);
              o = 360 / l;
              for (h = []; l--; )
                (q = o * l * e), h.push(k + a(q) * p, n + g(q) * p);
              f = "poly";
            }
            if (f === "poly" && i && !(h.length % 2)) this.cb = h;
            !this.cb && d.f("bad polygon");
          },
          Statics: {
            from: function (a) {
              return a instanceof i
                ? a
                : new i(a.type, a.values ? a.values : a.coords);
            },
          },
          hitTest: function (a, b) {
            return a.isCoveredBy(this.cb, b, 1);
          },
        }));
    })();
    ovi.provide("nokia.maps.util.ColorHelper");
    (function (f) {
      function e(a) {
        var c;
        if (a.charAt(0) === "#") c = i[a.length] ? a : null;
        else if (a.substr(0, 3) === "rgb") {
          c = a.match(/\d+(\.\d+)?/g);
          var d = c.length;
          c =
            d > 2 && d < 5
              ? [
                  "#",
                  b(+c[0]),
                  b(+c[1]),
                  b(+c[2]),
                  d > 3 ? b(+c[3] * 255) : "ff",
                ].join("")
              : null;
        }
        c || f.f("Invalid color definition: " + a);
        return c;
      }
      function c(a) {
        return !/^(#|rgb).*/.test(a);
      }
      function b(a) {
        return a < 16 ? "0" + g(a).toString(16) : g(a).toString(16);
      }
      function a(a) {
        a = d(a, 16);
        return (a << 4) + a;
      }
      var g = Math.round,
        d = parseInt,
        i = {
          4: function (a) {
            return [
              "#",
              a.charAt(1),
              a.charAt(1),
              a.charAt(2),
              a.charAt(2),
              a.charAt(3),
              a.charAt(3),
              "ff",
            ].join("");
          },
          5: function (a) {
            return [
              "#",
              a.charAt(1),
              a.charAt(1),
              a.charAt(2),
              a.charAt(2),
              a.charAt(3),
              a.charAt(3),
              a.charAt(4),
              a.charAt(4),
            ].join("");
          },
          7: function (a) {
            return a + "ff";
          },
          9: function (a) {
            return a;
          },
        },
        j = {
          4: function (b) {
            return [a(b.charAt(1)), a(b.charAt(2)), a(b.charAt(3)), 255];
          },
          5: function (b) {
            return [
              a(b.charAt(1)),
              a(b.charAt(2)),
              a(b.charAt(3)),
              a(b.charAt(4)),
            ];
          },
          7: function (a) {
            a = d(a.substring(1), 16);
            return [(a >> 16) & 255, (a >> 8) & 255, a & 255, 255];
          },
          9: function (a) {
            a = d(a.substring(1), 16);
            return [(a >> 24) & 255, (a >> 16) & 255, (a >> 8) & 255, a & 255];
          },
        };
      f.ColorHelper = {
        toInternal: function (a) {
          return c(a) ? a : ((a = e(a)), i[a.length] ? i[a.length](a) : a);
        },
        toRGBA: function (a, b) {
          return c(a) ? [0, 0, 0, 255] : (b || (a = e(a)), j[a.length](a));
        },
        getHex3: function (a, b) {
          return c(a)
            ? a
            : (b || ((a = e(a)), (a = i[a.length] ? i[a.length](a) : a)),
              a.substr(0, 7));
        },
        getAlpha: function (a, b) {
          return c(a)
            ? 1
            : (b || ((a = e(a)), (a = i[a.length] ? i[a.length](a) : a)),
              d(a.substr(7, 2), 16) / 255);
        },
        toRandomRGBA: function (a, d) {
          if (c(a)) return "000000ff";
          else {
            for (var a = this.toRGBA(a, d), e = 0; e < 4; e++)
              a[e] =
                "" +
                b(
                  e < 3 ? Math.floor(Math.random() * (a[e] - 0 + 1)) + 0 : a[e]
                );
            return a.join("");
          }
        },
      };
    })(nokia.maps.util);
    ovi.provide("nokia.maps.map.overlay.ObjectProvider");
    nokia.maps.map.overlay.ObjectProvider = new ovi.Class({
      Extends: nokia.maps.map.Provider,
      Mixins: [nokia.maps.util.OObject],
      readyObjects: null,
      cache: nokia.maps.util.Q,
      finishRequest: function (f, e) {
        e && (this.notify(f), this.cache(f));
      },
      notify: function (f) {
        this.set("readyObjects", f);
      },
    });
    ovi.provide("nokia.maps.language.Manager");
    nokia.maps.language.Manager = ovi.Class({
      translateToken: function (f, e, c) {
        c = c || nokia.maps.language.Info.translations;
        c = c[f];
        e && c == null && ovi.warn("Translation: Cannot translate token: " + f);
        return c || f;
      },
      translate: function (f, e, c) {
        var c = c || /__i18n_([a-z\.]*_[a-z0-9]*)__/g,
          b = this,
          a = nokia.maps.language.Info.translations;
        return f.replace(c, function (c, d) {
          (d == null || typeof d === "number") &&
            nokia.maps.util.f("keyRegexp does not contain a valid token group");
          return b.translateToken(d, e, a);
        });
      },
    });
    ovi.provide("nokia.maps.geo.PixelProjection");
    (function (f) {
      var e = f.util,
        c = e.Point,
        b = e.f,
        f = (f.geo.PixelProjection = function (a, c, d, e, f) {
          ((this.p = a) && (this.w = +c) && (this.h = +d)) || b();
          if (e) this.x = +e;
          if (f) this.y = +f;
        });
      ovi.extend(f.prototype, {
        x: 0,
        y: 0,
        geoToPixel: function (a) {
          a = this.p.latLngToPoint(a.latitude, a.longitude);
          return new c(a.x * this.w - this.x, a.y * this.h - this.y);
        },
        latLngToPixel: function (a, b) {
          var d = this.p.latLngToPoint(a, b);
          return new c(d.x * this.w - this.x, d.y * this.h - this.y);
        },
        pointToPixel: function (a) {
          return new c(a.x * this.w - this.x, a.y * this.h - this.y);
        },
        xyToPixel: function (a, b) {
          return new c(a * this.w - this.x, b * this.h - this.y);
        },
        pixelToPoint: function (a) {
          return new c((a.x + this.x) / this.w, (a.y + this.y) / this.h);
        },
        xyToPoint: function (a, b) {
          return new c((a + this.x) / this.w, (b + this.y) / this.h);
        },
        pixelToGeo: function (a) {
          return this.p.xyToGeo(
            (a.x + this.x) / this.w,
            (a.y + this.y) / this.h
          );
        },
        xyToGeo: function (a, b) {
          return this.p.xyToGeo((a + this.x) / this.w, (b + this.y) / this.h);
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.js.Animate");
    (function () {
      var f = nokia.maps,
        e = f.dom,
        c = f.util,
        f = Math,
        b = f.abs,
        a = f.pow,
        g = f.round,
        d = c.Coroutine;
      nokia.maps.map.js.Animate = new ovi.Class({
        initialize: function (a) {
          this.Nb = a;
          this.qe = [
            "transform",
            "MozTransform",
            "webkitTransform",
            "msTransform",
            "oTransform",
          ];
          this.pl = [
            "transformOrigin",
            "MozTransformOrigin",
            "webkitTransformOrigin",
            "msTransformOrigin",
            "oTransformOrigin",
          ];
          this.isCSS3Capable = !1;
          this.supportsCSS3();
        },
        Qc: null,
        destroy: function () {
          this.Uc && d.kill(this.Uc);
          this.re && d.kill(this.re);
        },
        Ri: c.Q,
        Pi: c.Q,
        Si: function (a, b) {
          return a === void 0 ? !1 : "" + a + "px " + b + "px";
        },
        pan: function (a) {
          var e = this.Nb,
            h = this.re,
            f = 1e3 / 30,
            l = g(300 / f),
            k,
            n,
            p = e.geoToPixel(e.center),
            o = e.geoToPixel(a),
            q;
          if (
            !(b((k = o.x - p.x)) <= e.width && b((n = o.y - p.y)) <= e.height)
          )
            return e.set("center", a), !1;
          h && d.kill(h);
          h = this.re = d.create("panCo", function (a, b) {
            if (!a.has("pixelPerFrameX"))
              (a.pixelPerFrameX = (k / l) >> 0),
                (a.pixelPerFrameY = (n / l) >> 0),
                e.pan(0, 0, k % l, n % l),
                (k -= k % l),
                (n -= n % l),
                (a.center = e.center),
                (a.zoomLevel = e.zoomLevel);
            if (!a.center.equals(e.center) || a.zoomLevel !== e.zoomLevel)
              return (a.mapViewChanged = !0), d.kill(b);
            e.pan(0, 0, a.pixelPerFrameX, a.pixelPerFrameY);
            k -= a.pixelPerFrameX;
            n -= a.pixelPerFrameY;
            a.center = e.center;
            if (k || n) return d.sleep(f);
          })();
          q = e.preloadTiles(c.Q, e.zoomLevel, a);
          h.onTerminated = function () {
            h.scope.mapViewChanged || e.set("center", a);
            q.cancel();
          };
          return !0;
        },
        supportsCSS3: function () {
          var a = document,
            b = a.createElement("div"),
            a = a.body,
            c;
          a.appendChild(b);
          for (c = this.qe.length; c--; )
            if (this.qe[c] in b.style) {
              this.nl = this.qe[c];
              this.ol = this.pl[c];
              this.isCSS3Capable = !0;
              break;
            }
          a.removeChild(b);
        },
        zoom: function (c, g, h, f, l) {
          var k = this,
            n = k.Nb,
            p = k.Uc,
            o = n.zoomLevel - c > 0 ? -1 : 1,
            q,
            r = n.j,
            s,
            w,
            u,
            v = k.nl,
            f = k.Si(f, l),
            x,
            g = g ? r.divide(2).sub(n.geoToPixel(g)) : null;
          !p && k.Ri();
          s = k.Qc.style;
          f && (s[k.ol] = f);
          u = new Date();
          p
            ? h == "constantvelocity"
              ? (q += 300 * b(n.zoomLevel - c))
              : ((q += 300), (x = p.scope.internalZoomLevel))
            : ((x = n.zoomLevel),
              (q = h == "constantvelocity" ? 300 * b(x - c) : 300));
          p
            ? ((p.scope.startZoomLevel = x),
              (p.scope.endZoomLevel = c),
              (p.scope.direction = o),
              (p.scope.duration = q),
              (p.scope.translate = g))
            : ((k.Xn = d.create(
                "zoomCo",
                function (b) {
                  var c = b.that;
                  if (!b.has("s"))
                    (b.s = 0),
                      (b.zoomStep = 0),
                      (b.scale = 1),
                      (b.translateString = ""),
                      (b.time = 0),
                      (b.oldTime = 0),
                      (b.internalZoomLevel = n.zoomLevel);
                  for (;;) {
                    w = new Date();
                    b.oldTime = b.time;
                    b.time = (w - u) / 300;
                    b.timeNormalized = (w - u) / q;
                    h == "constantvelocity"
                      ? (b.internalZoomLevel +=
                          b.direction * (b.time - b.oldTime))
                      : (b.internalZoomLevel =
                          b.startZoomLevel +
                          b.time * (b.endZoomLevel - b.startZoomLevel));
                    if (
                      b.s > 100 ||
                      (b.direction > 0 &&
                        b.internalZoomLevel > b.endZoomLevel) ||
                      (b.direction < 0 && b.internalZoomLevel < b.endZoomLevel)
                    )
                      break;
                    b.scale = a(2, b.internalZoomLevel - b.startZoomLevel);
                    if (b.translate)
                      b.translateString =
                        " translate(" +
                        b.translate.x * b.timeNormalized +
                        "px, " +
                        b.translate.y * b.timeNormalized +
                        "px)";
                    s[v] = "scale(" + b.scale + ")" + b.translateString;
                    e.$d(c.Qc, 1 - b.timeNormalized);
                    b.s++;
                    return d.sleep(20);
                  }
                  b.scale = a(2, b.endZoomLevel - b.startZoomLevel);
                  if (b.translate)
                    b.translateString =
                      " translate(" +
                      b.translate.x +
                      "px, " +
                      b.translate.y +
                      "px)";
                  s[v] = "scale(" + b.scale + ")" + b.translateString;
                  c.zoomAnimationInProgress = !1;
                },
                "startZoomLevel",
                "endZoomLevel",
                "direction",
                "duration",
                "translate"
              )),
              (p = k.Uc = k.Xn(x, c, o, q, g)),
              p.run(),
              (p.onTerminated = function () {
                k.Pi();
                k.Uc = null;
              }));
          k.zoomAnimationInProgress = !0;
        },
      });
    })();
    ovi.provide("nokia.maps.gfx.CanvasPainter");
    (function () {
      var f = nokia.maps.gfx,
        e = Math,
        c = e.sqrt,
        b = e.pow,
        a = f.Painter,
        e = f.IDL,
        g = f.Color,
        d = e.opcodes,
        i = e.identifierToAttribute,
        j = a.ig,
        h = (nokia.maps.gfx.CanvasPainter = new ovi.Class({
          Extends: nokia.maps.gfx.Painter,
          updateElement: function (a, b, c) {
            this.ca(a, b, b.ownerDocument);
            c = j(c);
            b.style.opacity = b.$n$opacity = c;
          },
          createElement: function (a, b, c) {
            var d = (b = b || document).createElement("CANVAS");
            this.ca(a, d, b);
            c = j(c);
            d.style.opacity = d.$n$opacity = c;
            return d;
          },
          setOpacity: function (a, b) {
            b = j(b);
            a.style.opacity = a.$n$opacity = b;
            return this;
          },
          ca: function (a, b) {
            if (!a || !a.data)
              throw "CanvasPainter.createElement: Illegal IDL given";
            var c = a.data,
              e = -1,
              g = c[++e],
              h = c[++e],
              c = c[++e];
            if (g !== d.BEGIN_2D_IMAGE)
              throw "CanvasPainter.createElement: Illegal opcode in IDL";
            b.width = h;
            b.height = c;
            b.style.width = h + "px";
            b.style.height = c + "px";
            g = b.getContext("2d");
            g.clearRect(0, 0, h, c);
            this.drawIDLToCanvas(a, g);
          },
          drawIDLToCanvas: function (a, e) {
            if (!a || !a.data)
              throw "CanvasPainter.createElement: Illegal IDL given";
            var h = a.data,
              f = -1,
              j,
              o,
              q,
              r,
              s,
              w,
              u,
              v,
              x = !1,
              z;
            j = h[++f];
            if (j !== d.BEGIN_2D_IMAGE)
              throw "CanvasPainter.createElement: Illegal opcode in IDL";
            ++f;
            ++f;
            ++f;
            e.save();
            for (e.lineCap = "round"; (j = h[++f]); )
              j === d.BEGIN_PATH
                ? e.beginPath()
                : j === d.MOVE_TO
                ? e.moveTo(h[++f], h[++f])
                : j === d.LINE_TO
                ? e.lineTo(h[++f], h[++f])
                : j === d.BEZIER_CURVE_TO
                ? e.bezierCurveTo(
                    h[++f],
                    h[++f],
                    h[++f],
                    h[++f],
                    h[++f],
                    h[++f]
                  )
                : j === d.FILL
                ? (e.fill(), h[f + 1] === d.STROKE && (f++, x || e.stroke()))
                : j === d.STROKE
                ? (x || e.stroke(), h[f + 1] === d.FILL && (f++, e.fill()))
                : j === d.SET
                ? ((w = i[h[++f]]),
                  (u = h[++f]),
                  w === "fillColor"
                    ? (e.fillStyle = g.getCssRGBA(u))
                    : w === "strokeColor"
                    ? (e.strokeStyle = g.getCssRGBA(u))
                    : w === "opacity"
                    ? (e.globalAlpha = +u)
                    : w !== "textBaseline" &&
                      (w === "lineWidth"
                        ? (x = (e[w] = u) === 0)
                        : w && (e[w] = u)))
                : j === d.DRAW_IMAGE
                ? ((w = h[++f]),
                  (u = h[++f]),
                  (j = h[++f]),
                  (o = h[++f]),
                  (q = h[++f]),
                  (v = h[++f]),
                  (s = h[++f]),
                  (r = h[++f]),
                  (z = h[++f]),
                  e.drawImage(w, u, j, o, q, v, s, r, z))
                : j === d.SAVE
                ? e.save()
                : j === d.RESTORE
                ? e.restore()
                : ((w = j === d.FILL_TEXT),
                  (u = j === d.STROKE_TEXT) || w
                    ? ((q = h[++f]),
                      (j = h[++f]),
                      (o = h[++f]),
                      (r = h[++f] - j),
                      (s = h[++f] - o),
                      (v = c(b(r, 2) + b(s, 2))),
                      (r /= v),
                      (s /= v),
                      e.save(),
                      e.transform(v * r, v * s, v * -s, v * r, j, o),
                      w && e.fillText(q, 0, 0),
                      u && e.strokeText(q, 0, 0),
                      e.restore())
                    : j === d.CLOSE_PATH && e.closePath());
            e.restore();
          },
        }));
      (function () {
        var b = document.createElement("CANVAS"),
          c;
        if (
          b &&
          b.getContext &&
          (c = b.getContext("2d")) &&
          typeof c.fillText === "function"
        )
          a.defaultPainter = h;
      })();
    })();
    ovi.provide("nokia.maps.map.DisplayContainer");
    (function () {
      var f = nokia.maps,
        e = f.dom,
        c = ovi.Array.indexOf,
        b = f.util;
      nokia.maps.map.DisplayContainer = new ovi.Class({
        initialize: function (a, f) {
          function d(b) {
            var d = n.getClientRect(k),
              e = +b.pageX,
              f = +b.pageY,
              g,
              i,
              m = b.type,
              v = b.dataTransfer,
              y,
              A = null;
            y = null;
            var O = r,
              N = -1;
            if (a.width !== a.C.offsetWidth || a.height !== a.C.offsetHeight)
              a.T("width", a.C.offsetWidth),
                a.T("height", a.C.offsetHeight),
                (b.type == "resizestart" || b.type == "resize") && a.eb(16);
            b.display = a;
            if (
              !h[m] &&
              e === e &&
              f === f &&
              ((b.displayX = g = e - d.left),
              (b.displayY = i = f - d.top),
              m !== "drag" &&
                m !== "drop" &&
                m !== "dragend" &&
                m !== "dragleave" &&
                m !== "gesturestart" &&
                m !== "gesturechange" &&
                m !== "gestureend")
            )
              b.displayObjects = A = a.getObjectsAt(b.displayX, b.displayY);
            y = (A && A.length > 0 && A[0]) || a;
            if (m === "dragstart") {
              for (y = u(y); y && y.length; ) {
                if (y[0] && y[0].draggable) break;
                y.shift();
              }
              p = y = (y && y[0]) || a;
              q = !1;
            } else if (m === "drag") y = p;
            else if (
              v &&
              (m === "dragenter" || m === "dragover" || m === "dragleave")
            ) {
              m === "dragleave" && (y = null);
              o !== y &&
                ((m = new l({
                  type: "dragleave",
                  target: o,
                  relatedTarget: p,
                  pageX: e,
                  pageY: f,
                  display: a,
                  displayX: g,
                  displayY: i,
                  dataTransfer: v,
                })),
                w(o, m),
                (o = null),
                (q = !1));
              if (!o && y)
                (m = new l({
                  type: "dragenter",
                  target: (o = y),
                  relatedTarget: p,
                  pageX: e,
                  pageY: f,
                  display: a,
                  displayX: g,
                  displayY: i,
                  dataTransfer: v,
                })),
                  w(o, m),
                  (q = m.defaultPrevented);
              q
                ? ((m = new l({
                    type: "dragover",
                    target: o,
                    relatedTarget: p,
                    pageX: e,
                    pageY: f,
                    display: a,
                    displayX: g,
                    displayY: i,
                    dataTransfer: v,
                  })),
                  w(o, m))
                : (v.dropEffect = "none");
              b.cancel();
              return;
            } else if (m === "drop") {
              o && q
                ? ((m = b.clone()), (m.target = o), w(o, m))
                : (v.dropEffect = "none");
              b.cancel();
              return;
            } else if (m === "dragend")
              (b.target = y = p), (p = o = null), (q = !1);
            else {
              if (h[m] || (r && r !== y))
                (e = b.clone()),
                  (e.type = "mouseout"),
                  (e.target = r),
                  (e.relatedTarget = h[m] ? b.relatedTarget : y),
                  w(r, e),
                  (r = null);
              for (; ++N < s.length; )
                if ((!A || c(A, s[N]) < 0) && (s[N] !== a || h[m]))
                  (e = b.clone()),
                    (e.type = "mouseleave"),
                    (e.target = s[N]),
                    delete e.relatedTarget,
                    w(e.target, e),
                    s.splice(N--, 1);
              if (!h[m] && !r) {
                if (c(s, y) < 0)
                  (e = b.clone()),
                    (e.type = "mouseenter"),
                    (e.target = y),
                    delete e.relatedTarget,
                    w(y, e),
                    s.push(y);
                e = b.clone();
                e.type = "mouseover";
                e.target = r = y;
                e.relatedTarget = j[m] ? b.relatedTarget : O;
                w(r, e);
              }
            }
            if (!h[m] && !j[m]) (b.target = y), w(y, b);
          }
          var i = e.ha(f, "div");
          this.C = i;
          i.style.cssText =
            "position:relative;width:100%;height:100%;overflow:hidden;";
          this.D = f;
          this.doc = this.C.ownerDocument;
          (this.Fc = e.ha(i, "div")).style.cssText = (this.Ya = e.ha(
            (this.Xb = e.ha(i, "div")),
            "div"
          )).style.cssText =
            "position:absolute;z-index:0;width:100%;height:100%;overflow:hidden;";
          (this.K = e.ha(i, "div")).style.cssText = "z-index:0;";
          (this.mb = e.ha(this.Xb, "div")).style.cssText = "position:absolute;";
          this.Xb.style.cssText =
            "position:absolute;z-index:0;width:100%;height:100%;overflow:hidden;";
          a.T("width", this.C.offsetWidth);
          a.T("height", this.C.offsetHeight);
          if (ovi.browser.msie)
            (this.Ya.style.backgroundColor = "white"),
              nokia.maps.dom.$d(this.Ya, 0);
          this.xc = e.Page(this.K);
          var j = { mouseover: !0, mouseenter: !0 },
            h = { mouseout: !0, mouseleave: !0 },
            m = {
              dragstart: !0,
              drag: !0,
              dragenter: !0,
              dragover: !0,
              drop: !0,
              dragleave: !0,
              dragend: !0,
              mouseover: !0,
              mouseout: !0,
              mousedown: !0,
              mousemove: !0,
              mouseup: !0,
              keydown: !0,
              keyup: !0,
              focus: !0,
              blur: !0,
              tap: !0,
              dbltap: !0,
              click: !0,
              dblclick: !0,
              longpress: !0,
              mousewheel: !0,
              contextmenu: !0,
              resizestart: !0,
              resize: !0,
              resizeend: !0,
              beforeunload: !0,
              touchstart: !0,
              touchmove: !0,
              touchend: !0,
            },
            i = e.EventTarget,
            l = e.Event,
            k = i(this.Ya).enableDrag(),
            a = i(a).enableDrag(),
            n = (this.pc = e.Page(k)),
            p,
            o,
            q,
            r = null,
            s = [],
            w = i.dispatchEvent,
            u = i.getDispatchPath,
            v;
          for (v in m) k.addListener(v, d);
          this.addEvent = function (a) {
            m[a] = !0;
            return k.addListener(a, d);
          };
          this.removeEvent = function (a) {
            delete m[a];
            return k.removeListener(a, d);
          };
          this.containerDestroy = function () {
            var a = this,
              c;
            for (c in m) k.removeListener(c, d);
            a.C && a.C.parentNode.removeChild(a.C);
            setTimeout(function () {
              for (var c in a) a[c] = typeof a[c] == "function" ? b.Q : null;
            }, 0);
          };
        },
      });
    })();
    ovi.provide("nokia.maps.map.Object");
    (function () {
      var f = 0,
        e = 0,
        c = {
          rev: 0,
          comparator: function (b) {
            return function (a, c) {
              for (
                var d = a.ja(b),
                  f = c.ja(b),
                  j = d.length,
                  h = f.length,
                  m = j < h ? j : h,
                  l = 0,
                  k;
                l < m;
                l++
              )
                if ((k = f[l] - d[l])) return e ? -k : k;
              return e ? j - h : h - j;
            };
          },
          sort: function (b, a, c, d) {
            for (var f = [], j = a.Pd, h, m = b.length; m--; )
              ((h = b[m]).getIconForRendering || h.drawToTile) &&
                (c || h.isVisible(a)) &&
                f.push(h);
            e = d;
            f.sort(j);
            return f;
          },
          create: function (b, a) {
            var c = b.getParent(a),
              d;
            d = null;
            c &&
              ((d = (d = c !== a ? c.ja(a) : null) ? d.slice() : []),
              d.push(b.zIndex, c.objects.indexOf(b)));
            return d;
          },
        };
      nokia.maps.map.Object = new ovi.Class({
        Extends: nokia.maps.util.OObject,
        Mixins: [nokia.maps.dom.EventTarget],
        Statics: { sortByZInfo: c.sort },
        initialize: function (b) {
          this.d = f++;
          this.B = {};
          this._super(b);
          this.addObserver("*", this.ba, this);
          if (this.u === "display") this.Pd = c.comparator(this);
        },
        destroy: function () {
          for (var b = this.getDisplays(), a = b.length, c; a--; )
            b[a].objects.remove(this);
          if ((b = this.eventListener))
            for (c in b)
              for (; b[c] && b[c].length > 0; )
                (a = b[c]), this.removeListenerNS(a[2], c, a[0], a[1]);
          this.removeObserver("*", this.ba, this);
          this.B = null;
        },
        CHANGE_SPATIAL: 1,
        CHANGE_VISUAL: 2,
        CHANGE_ZINDEX: 4,
        isEventTarget: !0,
        zIndex: 0,
        visibility: !0,
        u: "object",
        Z: 2147483647,
        If: -1 / 0,
        ba: function (b, a, c) {
          this.aa(a, c, (this.Z |= a === "zIndex" && 4));
        },
        getDisplays: function () {
          var b = this.B,
            a = [],
            c;
          for (c in b) b.hasOwnProperty(c) && a.push(b[c].P);
          return a;
        },
        isAdded: function (b) {
          return this.B.hasOwnProperty(b.d);
        },
        getParent: function (b) {
          return (b = b && this.B[b.d]) && b.D;
        },
        isVisible: function (b) {
          var a = this,
            c;
          do c = a.visibility;
          while (c && (a = a.getParent(b)));
          return c;
        },
        aa: function (b, a, c) {
          for (var d = this.getDisplays(), e = d.length; e--; )
            d[e].Mb(this, b, a, c, 0);
          this.Z = 0;
        },
        zIndexSetter: function (b) {
          this.ub();
          return b;
        },
        eventListenerSetter: function (b) {
          var a;
          a = 0;
          var c, d;
          if (b) {
            if ((a = this.eventListener))
              for (d in a)
                for (; a[d] && a[d].length > 0; )
                  (c = a[d]), this.removeListenerNS(c[2], d, c[0], c[1]);
            for (d in b)
              if ((a = ovi.type((c = b[d]))) === "array")
                for (a = 0; a < c.length; a += 3)
                  this.addListenerNS(c[a + 2], d, c[a], c[a + 1]);
              else a === "function" && this.addListenerNS(null, d, c, !1);
          }
          return this.eventListener;
        },
        ja: function (b) {
          var a = this.B[b.d],
            e;
          if (!(e = a.ib)) e = a.ib = c.create(this, b);
          return e;
        },
        ub: function () {
          var b = this.B,
            a;
          for (a in b) if (b.hasOwnProperty(a)) b[a].ib = void 0;
        },
      });
    })();
    ovi.provide("nokia.maps.map.Container");
    (function () {
      var f = nokia.maps.util;
      nokia.maps.map.Container = new ovi.Class({
        Extends: nokia.maps.map.Object,
        initialize: function (e, c) {
          var b = (this.objects = new f.OList());
          b.addObserver(this.fl, this);
          this._super(c);
          e && b.addAll(e);
        },
        u: "container",
        objectsSetter: function (e) {
          return this.objects.addAll(e);
        },
        fl: function (e, c, b, a) {
          var f = this.getDisplays(),
            d = f.length,
            i = 0;
          if (c === "add") {
            for (; d--; ) f[d].sg(b) && i++;
            d = f.length;
            if (i < d)
              throw (
                (this.objects.removeAt(a),
                "cannot add object more than one time to display")
              );
            for (; d--; ) f[d].ne(this, b, a);
          } else for (; d--; ) f[d].Rd(b);
          a < e.X.length - 1 && this.gh(a);
        },
        getBoundingBox: function () {
          for (var e = this.objects, c = e.getLength(), b, a = null; c--; )
            if ((b = e.get(c).getBoundingBox())) a = !a ? b : a.merge(b);
          return a;
        },
        gh: function (e) {
          for (var c = this.objects.X, b = c.length; e < b; ) c[e++].ub();
        },
        ub: function () {
          this._super();
          this.gh(0);
        },
      });
    })();
    ovi.provide("nokia.maps.map.js.copyrights");
    ovi.provide("nokia.maps.resources.copyrights.json");
    nokia.maps.resources.copyrights.json =
      '/*\n * Fetched 2010-11-08 from\n * http://maptile.maps.svc.ovi.com/maptiler/v2/copyright/newest?referer=&token=&output=xml&callback_func=BAR&callback_id=FOO\n *\n * Manually correction by Thomas Fischer:\n * - add missing default copyrights (whole world, level 0-20) for "normal" and "hybrid"\n * - fix wrong label for Chineese "normal" map from "NAVTEQ 2010" into "NavInfo 2010"\n * - changed all "2010" to "2011"\n */\n\n{\n\t"normal": [\n\t\t{\n\t\t\t"minLevel": 0,\n\t\t\t"maxLevel": 20,\n\t\t\t"label": "NAVTEQ 2011",\n\t\t\t"alt": "copyright 2011 NAVTEQ All Rights Reserved"\n\t\t},\n\t\t{\n\t\t\t"minLevel": 9,\n\t\t\t"maxLevel": 20,\n\t\t\t"label": "NavInfo 2011",\n\t\t\t"alt": "copyright 2011 NavInfo Co Ltd. All Rights Reserved",\n\t\t\t"boxes": [\n\t\t\t\t[29.1171, 84.2005, 41.5657, 124.1865],\n\t\t\t\t[41.5630, 85.7494, 47.1087, 90.6305],\n\t\t\t\t[41.5601, 90.6025, 42.5667, 101.8172],\n\t\t\t\t[42.5506, 90.6234, 44.2497, 95.3195],\n\t\t\t\t[30.4401, 80.8031, 45.1197, 85.7610],\n\t\t\t\t[23.3901, 98.7867, 29.1184, 120.0226],\n\t\t\t\t[26.3574, 120.0168, 29.1201, 122.1214],\n\t\t\t\t[41.5652, 112.0222, 44.7488, 126.5498],\n\t\t\t\t[44.7472, 119.9286, 49.3447, 129.5186],\n\t\t\t\t[49.3350, 120.7819, 53.0810, 125.4870],\n\t\t\t\t[43.0083, 126.5408, 47.7089, 130.9583],\n\t\t\t\t[45.3400, 130.9452, 47.6509, 133.1190],\n\t\t\t\t[36.0000, 76.8533, 40.9910, 80.8040],\n\t\t\t\t[48.0400, 116.5004, 49.5037, 120.7834],\n\t\t\t\t[18.1302, 108.0738, 23.4047, 117.3293],\n\t\t\t\t[22.8489, 99.5674, 23.4100, 104.7658],\n\t\t\t\t[28.3256, 85.1978, 29.1306, 92.9427],\n\t\t\t\t[38.5986, 74.5747, 40.2635, 76.8557],\n\t\t\t\t[30.9888, 79.6755, 34.1592, 80.8057],\n\t\t\t\t[45.1121, 82.8615, 46.8092, 85.7618],\n\t\t\t\t[47.1043, 85.7107, 48.3877, 88.5712],\n\t\t\t\t[44.2477, 90.6263, 44.9384, 93.5556],\n\t\t\t\t[21.9867, 106.8269, 23.4067, 108.0747],\n\t\t\t\t[42.0392, 126.5396, 43.0312, 129.2131],\n\t\t\t\t[28.0162, 96.1699, 29.1244, 97.3297],\n\t\t\t\t[27.6988, 98.1610, 29.1224, 98.7953],\n\t\t\t\t[44.7469, 116.2866, 46.4130, 119.9547],\n\t\t\t\t[22.1509, 99.4518, 22.8888, 101.5251],\n\t\t\t\t[41.5609, 106.4521, 42.1729, 112.0338],\n\t\t\t\t[40.8870, 124.1700, 41.5679, 125.9757],\n\t\t\t\t[49.4970, 119.3816, 50.6762, 120.8089],\n\t\t\t\t[49.3316, 125.4225, 51.2651, 126.9184],\n\t\t\t\t[37.1464, 75.1441, 38.6352, 76.8756],\n\t\t\t\t[41.4833, 127.1282, 42.0490, 128.0580],\n\t\t\t\t[45.8638, 133.1031, 48.0605, 133.6508],\n\t\t\t\t[47.4507, 133.6275, 48.3165, 134.5299],\n\t\t\t\t[32.3204, 120.8063, 36.6148, 125.2434],\n\t\t\t\t[28.0898, 122.1926, 32.4149, 129.4044],\n\t\t\t\t[25.2971, 120.8675, 28.2165, 126.5996],\n\t\t\t\t[21.1021, 118.0693, 25.3132, 122.3802],\n\t\t\t\t[14.0561, 112.4204, 22.5872, 119.5878],\n\t\t\t\t[19.6497, 119.4778, 21.1806, 121.0020],\n\t\t\t\t[9.7891, 109.6162, 15.5257, 118.1505],\n\t\t\t\t[5.6145, 106.8594, 9.8540, 115.3392],\n\t\t\t\t[4.2167, 108.2902, 5.6612, 112.5326],\n\t\t\t\t[12.6250, 118.0910, 14.1308, 119.5515],\n\t\t\t\t[2.7992, 109.6809, 4.2559, 111.1337],\n\t\t\t\t[7.0220, 115.3165, 9.8518, 116.7427],\n\t\t\t\t[18.2459, 106.8169, 19.7338, 108.3471],\n\t\t\t\t[36.5488, 123.7356, 40.6430, 125.8812],\n\t\t\t\t[19.6980, 107.9469, 21.5553, 108.3115],\n\t\t\t\t[4.1736, 103.9404, 7.1033, 106.9522],\n\t\t\t\t[6.9882, 105.4241, 8.5050, 106.8956]\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t"minLevel": 9,\n\t\t\t"maxLevel": 20,\n\t\t\t"label": "2011 THTC",\n\t\t\t"alt": "copyright 2011 Iran Maps provided by THTC",\n\t\t\t"boxes": [\n\t\t\t\t[29.8960, 48.0337, 36.6154, 60.4761],\n\t\t\t\t[35.7922, 45.2450, 38.9187, 53.8126],\n\t\t\t\t[32.4091, 45.6075, 35.8327, 48.0570],\n\t\t\t\t[26.4373, 52.5746, 29.9127, 62.9038],\n\t\t\t\t[29.8613, 60.4731, 31.4985, 61.8767],\n\t\t\t\t[31.4630, 60.4320, 36.6154, 60.9466],\n\t\t\t\t[30.8911, 47.4205, 32.4190, 48.0706],\n\t\t\t\t[24.9641, 57.0085, 26.4565, 62.2974],\n\t\t\t\t[26.6229, 62.8963, 27.2549, 63.3307],\n\t\t\t\t[34.5901, 60.9157, 36.6464, 61.3015],\n\t\t\t\t[36.5729, 53.7891, 37.6781, 60.3488],\n\t\t\t\t[37.6386, 54.8182, 38.2889, 58.2282],\n\t\t\t\t[38.9000, 46.6111, 39.7085, 48.3898],\n\t\t\t\t[36.4006, 44.0295, 39.7794, 46.0038],\n\t\t\t\t[33.7685, 45.4011, 34.6038, 45.6497],\n\t\t\t\t[27.5226, 50.1860, 29.9188, 52.6222]\n\t\t\t]\n\t\t}\n\t],\n\t"satellite": [\n\t\t{\n\t\t\t"minLevel": 0,\n\t\t\t"maxLevel": 20,\n\t\t\t"label": "DigitalGlobe 2011",\n\t\t\t"alt": "copyright 2011 DigitalGlobe, Inc."\n\t\t}\n\t],\n\t"hybrid": [\n\t\t{\n\t\t\t"minLevel": 0,\n\t\t\t"maxLevel": 20,\n\t\t\t"label": "NAVTEQ 2011",\n\t\t\t"alt": "copyright 2011 NAVTEQ All Rights Reserved"\n\t\t},\n\t\t{\n\t\t\t"minLevel": 9,\n\t\t\t"maxLevel": 20,\n\t\t\t"label":"NAVTEQ & DigitalGlobe 2011",\n\t\t\t"alt": "copyright 2011 NAVTEQ & DigitalGlobe All Rights Reserved"\n\t\t},\n\t\t{\n\t\t\t"minLevel": 9,\n\t\t\t"maxLevel": 20,\n\t\t\t"label": "NavInfo & DigitalGlobe 2011",\n\t\t\t"alt": "copyright 2011 NavInfo Co Ltd. & DigitalGlobe All Rights Reserved",\n\t\t\t"boxes": [\n\t\t\t\t[29.1171, 84.2005, 41.5657, 124.1865],\n\t\t\t\t[41.5630, 85.7494, 47.1087, 90.6305],\n\t\t\t\t[41.5601, 90.6025, 42.5667, 101.8172],\n\t\t\t\t[42.5506, 90.6234, 44.2497, 95.3195],\n\t\t\t\t[30.4401, 80.8031, 45.1197, 85.7610],\n\t\t\t\t[23.3901, 98.7867, 29.1184, 120.0226],\n\t\t\t\t[26.3574, 120.0168, 29.1201, 122.1214],\n\t\t\t\t[41.5652, 112.0222, 44.7488, 126.5498],\n\t\t\t\t[44.7472, 119.9286, 49.3447, 129.5186],\n\t\t\t\t[49.3350, 120.7819, 53.0810, 125.4870],\n\t\t\t\t[43.0083, 126.5408, 47.7089, 130.9583],\n\t\t\t\t[45.3400, 130.9452, 47.6509, 133.1190],\n\t\t\t\t[36.0000, 76.8533, 40.9910, 80.8040],\n\t\t\t\t[48.0400, 116.5004, 49.5037, 120.7834],\n\t\t\t\t[18.1302, 108.0738, 23.4047, 117.3293],\n\t\t\t\t[22.8489, 99.5674, 23.4100, 104.7658],\n\t\t\t\t[28.3256, 85.1978, 29.1306, 92.9427],\n\t\t\t\t[38.5986, 74.5747, 40.2635, 76.8557],\n\t\t\t\t[30.9888, 79.6755, 34.1592, 80.8057],\n\t\t\t\t[45.1121, 82.8615, 46.8092, 85.7618],\n\t\t\t\t[47.1043, 85.7107, 48.3877, 88.5712],\n\t\t\t\t[44.2477, 90.6263, 44.9384, 93.5556],\n\t\t\t\t[21.9867, 106.8269, 23.4067, 108.0747],\n\t\t\t\t[42.0392, 126.5396, 43.0312, 129.2131],\n\t\t\t\t[28.0162, 96.1699, 29.1244, 97.3297],\n\t\t\t\t[27.6988, 98.1610, 29.1224, 98.7953],\n\t\t\t\t[44.7469, 116.2866, 46.4130, 119.9547],\n\t\t\t\t[22.1509, 99.4518, 22.8888, 101.5251],\n\t\t\t\t[41.5609, 106.4521, 42.1729, 112.0338],\n\t\t\t\t[40.8870, 124.1700, 41.5679, 125.9757],\n\t\t\t\t[49.4970, 119.3816, 50.6762, 120.8089],\n\t\t\t\t[49.3316, 125.4225, 51.2651, 126.9184],\n\t\t\t\t[37.1464, 75.1441, 38.6352, 76.8756],\n\t\t\t\t[41.4833, 127.1282, 42.0490, 128.0580],\n\t\t\t\t[45.8638, 133.1031, 48.0605, 133.6508],\n\t\t\t\t[47.4507, 133.6275, 48.3165, 134.5299],\n\t\t\t\t[32.3204, 120.8063, 36.6148, 125.2434],\n\t\t\t\t[28.0898, 122.1926, 32.4149, 129.4044],\n\t\t\t\t[25.2971, 120.8675, 28.2165, 126.5996],\n\t\t\t\t[21.1021, 118.0693, 25.3132, 122.3802],\n\t\t\t\t[14.0561, 112.4204, 22.5872, 119.5878],\n\t\t\t\t[19.6497, 119.4778, 21.1806, 121.0020],\n\t\t\t\t[9.7891, 109.6162, 15.5257, 118.1505],\n\t\t\t\t[5.6145, 106.8594, 9.8540, 115.3392],\n\t\t\t\t[4.2167, 108.2902, 5.6612, 112.5326],\n\t\t\t\t[12.6250, 118.0910, 14.1308, 119.5515],\n\t\t\t\t[2.7992, 109.6809, 4.2559, 111.1337],\n\t\t\t\t[7.0220, 115.3165, 9.8518, 116.7427],\n\t\t\t\t[18.2459, 106.8169, 19.7338, 108.3471],\n\t\t\t\t[36.5488, 123.7356, 40.6430, 125.8812],\n\t\t\t\t[19.6980, 107.9469, 21.5553, 108.3115],\n\t\t\t\t[4.1736, 103.9404, 7.1033, 106.9522],\n\t\t\t\t[6.9882, 105.4241, 8.5050, 106.8956]\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t"minLevel": 9,\n\t\t\t"maxLevel": 20,\n\t\t\t"label":"THTC & DigitalGlobe 2011",\n\t\t\t"alt": "copyright 2011 Iran Maps provided by THTC & DigitalGlobe",\n\t\t\t"boxes": [\n\t\t\t\t[29.8960, 48.0337, 36.6154, 60.4761],\n\t\t\t\t[35.7922, 45.2450, 38.9187, 53.8126],\n\t\t\t\t[32.4091, 45.6075, 35.8327, 48.0570],\n\t\t\t\t[26.4373, 52.5746, 29.9127, 62.9038],\n\t\t\t\t[29.8613, 60.4731, 31.4985, 61.8767],\n\t\t\t\t[31.4630, 60.4320, 36.6154, 60.9466],\n\t\t\t\t[30.8911, 47.4205, 32.4190, 48.0706],\n\t\t\t\t[24.9641, 57.0085, 26.4565, 62.2974],\n\t\t\t\t[26.6229, 62.8963, 27.2549, 63.3307],\n\t\t\t\t[34.5901, 60.9157, 36.6464, 61.3015],\n\t\t\t\t[36.5729, 53.7891, 37.6781, 60.3488],\n\t\t\t\t[37.6386, 54.8182, 38.2889, 58.2282],\n\t\t\t\t[38.9000, 46.6111, 39.7085, 48.3898],\n\t\t\t\t[36.4006, 44.0295, 39.7794, 46.0038],\n\t\t\t\t[33.7685, 45.4011, 34.6038, 45.6497],\n\t\t\t\t[27.5226, 50.1860, 29.9188, 52.6222]\n\t\t\t]\n\t\t}\n\t],\n\t"terrain": [\n\t\t{\n\t\t\t"minLevel": 0,\n\t\t\t"maxLevel": 20,\n\t\t\t"label": "SRTM V4, 2011, CIAT",\n\t\t\t"alt": "SRTM V4, 2011, CIAT"\n\t\t}\n\t]\n}';
    (function () {
      var f = nokia.maps,
        e = f.geo.BoundingBox,
        c = (f.resources.copyrights = eval(
          "(" + nokia.maps.resources.copyrights.json + ")"
        )),
        f = nokia.maps.map.js.copyrights,
        b,
        a,
        g,
        d,
        i,
        j;
      for (b in c)
        if (c.hasOwnProperty(b)) {
          a = c[b];
          for (i = a.length; i--; )
            if ((g = a[i].boxes))
              for (j = g.length; j--; )
                (d = g[j]), (g[j] = new e([d[2], d[1]], [d[0], d[3]], !0));
        }
      f.get = function (a, b, d) {
        var e = [],
          f,
          g,
          i,
          j,
          r;
        if ((a = c[a]))
          for (i = a.length; i--; )
            if (((f = a[i]), d >= f.minLevel && d <= f.maxLevel)) {
              if ((g = f.boxes)) {
                r = 0;
                for (j = g.length; j--; )
                  if (g[j].intersects(b)) {
                    r = 1;
                    break;
                  }
              } else r = 1;
              r && e.push({ label: f.label, alt: f.alt });
            }
        return e;
      };
    })();
    ovi.provide("nokia.maps.map._MarkerIcon");
    (function () {
      function f(a) {
        if (typeof a === "object" && a.strokeColor)
          a.strokeColor = b.ColorHelper.getHex3(a.strokeColor);
        if (a instanceof g) return a;
        else if (typeof a === "object") return new g(a);
        return new g({ strokeColor: b.ColorHelper.getHex3(a) });
      }
      var e = nokia.maps,
        c = e.map.HitArea,
        b = e.util,
        a = b.Point,
        g = b.Pen,
        d = b.Brush,
        i = e.gfx.GraphicsImage,
        j = new e.gfx.SvgParser(),
        h = b.lc("shape text textPen pen brush effect"),
        m = b.flatMerge(b.lc("anchor hitArea"), h),
        l = (nokia.maps.map.ab = new ovi.Class({
          Extends: nokia.maps.util.OObject,
          initialize: function (a) {
            var b;
            a && "shape" in a
              ? ((this.shape = this.shapeSetter((b = a.shape))),
                delete a.shape,
                this._super(a),
                (a.shape = b))
              : ((this.shape = this.shapeSetter(this.shape)), this._super(a));
            this.addObserver("*", this.ed);
          },
          Statics: {
            Zj: m,
            wa: function (a) {
              return a in m;
            },
            rd: function (a) {
              return !(a in h);
            },
            db: {
              balloon: [
                '<path style="opacity:0.4;fill:#353535" d="m 68.999,117 c 0,1.668 -2.687,3 -6.001,3 c -3.312,0 -5.999,-1.332 -5.999,-3 c 0,-1.666 2.688,-3 5.999,-3 c 3.314,0 6.001,1.334 6.001,3 z" transform="translate(-50,-86)"/><path style="fill:__PEN__" d="m 106,-21 c -3.472,0 -6.7335,1.325 -9.1875,3.75 C 94.3585,-14.824 93,-11.58625 93,-8.15625 c 0,3.432 1.3585,6.6385 3.8125,9.0625 L 106,10 l 9.1875,-9.09375 c 2.455,-2.426 3.8125,-5.6325 3.8125,-9.0625 c 0,-3.428 -1.3575,-6.66575 -3.8125,-9.09375 C 112.7325,-19.675 109.474,-21 106,-21 z" transform="translate(-93,21)"/><path style="fill:#ffffff" d="m 106,-20 c -3.207,0 -6.234,1.22975 -8.5,3.46875 c -2.264,2.237 -3.5,5.217 -3.5,8.375 c 0,3.16 1.236,6.139 3.5,8.375 l 8.5,8.375 l 8.5,-8.375 c 2.264,-2.236 3.5,-5.215 3.5,-8.375 c 0,-3.158 -1.236,-6.137 -3.5,-8.375 C 112.233,-18.77025 109.209,-20 106,-20 z" transform="translate(-93,21)"/><path style="fill:__BRUSH__;fill-opacity:1" d="m 62.998,88.1875 c -6.984391,0 -10.738298,4.963982 -10.8105,10.6525 c 0,3.268 0.9535,5.611 3.0255,7.658 l 7.785,7.691 l 7.789,-7.691 c 2.072,-2.047 3.0255,-4.268 3.0255,-7.658 C 73.584296,93.067975 69.982391,88.1875 62.998,88.1875 z" transform="translate(-50,-86)"/><text x="13" y="18" font-size="10pt" font-family="arial" font-weight="bold" text-anchor="middle" fill="__TEXTPEN__" textContent = "__TEXTCONTENT__">__TEXT__</text>',
                28,
                36,
                13,
                31,
                "poly",
                [0, 16, 0, 7, 8, 0, 18, 0, 26, 7, 26, 16, 18, 34, 8, 34],
              ],
            },
          },
          text: "",
          pen: new g({ strokeColor: "#FFF" }),
          textPen: new g({ strokeColor: "#FFF" }),
          brush: new d({ color: "#1080dd" }),
          shape: "balloon",
          effect: "none",
          ed: function (a, b) {
            if (b in h) a.ta = 0;
          },
          shapeSetter: function (d) {
            var e = (this.kk = l.db[d] || b.f("shape"));
            this.j = new a(e[1], e[2]);
            this.anchor = new a(e[3], e[4]);
            this.hitArea = e[5] ? new c(e[5], e[6]) : void 0;
            return d;
          },
          brushSetter: function (a) {
            if (typeof a === "object" && a.color)
              a.color = b.ColorHelper.getHex3(a.color);
            if (a instanceof d) return a;
            else if (typeof a === "object") return new d(a);
            return new d({ color: b.ColorHelper.getHex3(a) });
          },
          penSetter: f,
          textPenSetter: f,
          textSetter: function (a) {
            return b.sanitizeText(a);
          },
          getIcon: function () {
            if (this.ta) return this.ta;
            var a = l.db[this.shape],
              b = a[1],
              c = a[2];
            return (this.ta = new i(
              j.parseSvg(
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' +
                  b +
                  '" height="' +
                  c +
                  '" viewBox="0 0 ' +
                  b +
                  " " +
                  c +
                  '">' +
                  a[0]
                    .replace("__TEXTCONTENT__", this.text)
                    .replace("__TEXT__", this.text)
                    .replace("__TEXTPEN__", this.textPen.strokeColor)
                    .replace("__PEN__", this.pen.strokeColor)
                    .replace("__BRUSH__", this.brush.color) +
                  "</svg>"
              )
            ));
          },
        }));
    })();
    ovi.provide("nokia.maps.map.overlay.SearchLayer");
    nokia.maps.map.overlay.SearchLayer = new ovi.Class({
      Extends: nokia.maps.map.overlay.ObjectProvider,
      initialize: function (f, e) {
        nokia.maps.search.Manager ||
          nokia.maps.util.Za(
            "Class nokia.maps.search.Manager must be loaded before using SearchLayer"
          );
        this._super(e);
        this.searchTerm = f;
        this.managers = [this.Jg()];
        this.Wl();
        this.da = 0;
      },
      max: 18,
      wc: 256,
      Jg: function () {
        return new nokia.maps.search.Manager().addObserver(
          "state",
          this.ac,
          this
        );
      },
      request: function (f, e) {
        var c = this.oc,
          b = this.wc,
          a = this.max,
          g,
          d = c.geoToPixel(e.topLeft),
          i = c.geoToPixel(e.bottomRight);
        g = (d.y / b) >> (a - f);
        var d = (d.x / b) >> (a - f),
          j = (i.y / b) >> (a - f),
          i = (i.x / b) >> (a - f),
          h,
          m,
          l,
          k;
        this.da++;
        for (h = g; h < j + 1; h++)
          for (m = d; m < i + 1; m++)
            (l = new nokia.maps.geo.BoundingBox(
              c.xyToGeo((m * b) << (a - f), (h * b) << (a - f)),
              c.xyToGeo(((m + 1) * b) << (a - f), ((h + 1) * b) << (a - f))
            )),
              (k = m + "_" + h + "_" + f),
              this.Qa[k]
                ? this.notify(this.Qa[k])
                : ((g = this.managers.pop() || this.Jg()),
                  (g.cn = this.da),
                  g.search(this.searchTerm, l),
                  (g.vc = k));
      },
      cache: function (f) {
        this.Qa[f.vc] = f;
      },
      Wl: function () {
        var f = 1 << this.max;
        this.oc = new nokia.maps.geo.PixelProjection(
          nokia.maps.geo.mercator,
          this.wc * f,
          this.wc * f
        );
        this.Qa = {};
      },
      ac: function (f, e, c) {
        c == "finished"
          ? ((e = []),
            f.locations.length > 0 &&
              (e = new nokia.maps.search.component.SearchResultSet(
                f.locations
              ).container.objects.asArray()),
            (e.vc = f.vc),
            f.cn == this.da ? this.finishRequest(e, !0) : this.cache(e))
          : c == "failed" && this.finishRequest([], !1);
        (c == "finished" || c == "failed") && this.managers.push(f);
      },
    });
    ovi.provide("nokia.maps.map.overlay.ObjectTileProvider");
    nokia.maps.map.overlay.ObjectTileProvider = new ovi.Class({
      Extends: nokia.maps.map.overlay.ObjectProvider,
      initialize: function (f) {
        var e;
        this._super(f);
        this.Qa = {};
        this.Ds = new nokia.maps.geo.QuadTree(this.max - this.min + 1);
        this.Qq = {};
        this.da = 0;
        f = 1 << this.max;
        e = this.tileSize;
        this.oc = new nokia.maps.geo.PixelProjection(
          nokia.maps.geo.mercator,
          e * f,
          e * f
        );
      },
      max: 18,
      tileSize: 256,
      request: function (f, e) {
        this.da++;
        f > this.max || f < this.min ? this.notify([]) : this.dn(f, e);
      },
      cache: function (f) {
        this.Qa[f.vc] = f;
      },
      getCachedTile: function (f, e, c) {
        return this.Qa[this.ah(f, e, c)];
      },
      objectTileArrived: function (f, e, c, b, a, g) {
        g
          ? ((e = this.ah(e, c, b)),
            (f.vc = e),
            a == this.da ? this.finishRequest(f, !0) : this.cache(f))
          : this.finishRequest([], !1);
      },
      Jl: function (f, e) {
        var c = this.max,
          b = this.tileSize,
          a = this.oc,
          g = a.geoToPixel(e.topLeft),
          a = a.geoToPixel(e.bottomRight);
        return [
          (g.y / b) >> (c - f),
          (g.x / b) >> (c - f),
          (a.y / b) >> (c - f),
          (a.x / b) >> (c - f),
        ];
      },
      dn: function (f, e) {
        for (
          var c = this.Jl(f, e), b = c[1], a = c[2], g = c[3], d, c = c[0];
          c < a + 1;
          c++
        )
          for (d = b; d < g + 1; d++) this.requestTile(this.da, f, c, d);
      },
      ah: function (f, e, c) {
        for (var b = []; f--; )
          (mask = 1 << f), b.push(((c & mask) !== 0) + ((e & mask) !== 0) * 2);
        return b.join("");
      },
    });
    ovi.provide("nokia.maps.map.Spatial");
    nokia.maps.map.Spatial = new ovi.Class({
      Extends: nokia.maps.map.Object,
      initialize: function (f) {
        this._super(f);
      },
      simplify: 3,
      Kf: 1,
    });
    ovi.provide("nokia.maps.map.Display");
    (function () {
      var f = !f,
        e = !f,
        c = nokia.maps,
        b = c.dom,
        a = c.util,
        g = a.Point,
        d = c.geo,
        i = d.Coordinate,
        j = 1,
        h = [
          "copyrightWidth",
          "copyrightHeight",
          "copyrightPosition",
          "poweredByWidth",
          "poweredByHeight",
          "poweredByPosition",
          "width",
          "height",
        ],
        m = { add: "attach", remove: "detach" },
        l = (nokia.maps.map.Display = new ovi.Class({
          Extends: nokia.maps.map.Container,
          initialize: function (b, e) {
            nokia.maps.util.ApplicationContext.lockLanguage();
            if (this.constructor === l) return new l.Va(b, e);
            for (var f = this, k = h.length; k--; ) f[h[k] + "Setter"] = f.$l;
            f.enableDrag();
            f.namespaceURI = "nokia.maps.dom.Display#" + b.id + ":" + j++;
            if (!f.hasOwnProperty("_projection")) f.oc = d.mercator;
            f.components = new a.OList();
            f.components.addObserver(f.bl, f);
            f.components.Gk = f.components.qa;
            f.components.qa = function (b, c, d) {
              for (var e = this.X, f = e.length, h = b.getId(), g = 0; f--; )
                e[f].getId() === h &&
                  ++g === 1 &&
                  a.f(
                    "It's not allowed to add another map component instance with id: \"" +
                      h +
                      '"'
                  );
              this.Gk(b, c, d);
            };
            f.overlays = new a.OList();
            f.overlays.addObserver(f.Yk, f);
            f.td = ovi.bind(f, f.td);
            f.Pe = new a.OList();
            f.animation = new a.OList(["none", "default"]);
            f.copyrightPosition = f.poweredByPosition = new g(0, 0);
            f.center = new i(0, 0);
            f.set(
              "baseMapType",
              (e && e.baseMapType) || f.availableBaseMapTypes.get(0)
            );
            f._super(void 0, e);
            k = f.parentDisplay;
            f.Eg = (f.is =
              k && k.visibility && k.width > f.width && k.height > f.height)
              ? null
              : c.map.fg && new c.map.fg(f);
            setTimeout(function () {
              f.Zc("start", 0);
            }, 0);
          },
          Statics: {
            setDefImpl: function (a) {
              return this.Va ? e : (this.Va = a) && f;
            },
          },
          u: "display",
          margin: 0,
          fixedCenter: f,
          fading: 250,
          doc: null,
          xc: null,
          pc: null,
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
          Ae: e,
          copyrightWidth: 0,
          copyrightHeight: 0,
          copyrightAlignment: "bottomleft",
          poweredByWidth: 0,
          poweredByHeight: 0,
          minZoomLevel: 0,
          maxZoomLevel: 0,
          zoomLevel: 0,
          minTilt: 0,
          maxTilt: 0,
          tilt: 0,
          minHeading: 0,
          maxHeading: 0,
          heading: 0,
          setPadding: function (a, b, c, d) {
            var e = arguments.length,
              e =
                e > 3
                  ? [a, b, c, d]
                  : e > 2
                  ? [a, b, c, b]
                  : e > 1
                  ? [a, b, a, b]
                  : [a, a, a, a];
            this.set("padding", {
              top: e[0],
              right: e[1],
              bottom: e[2],
              left: e[3],
            });
          },
          paddingSetter: function (b) {
            isNaN(b.top - b.right - b.bottom - b.left) && a.f();
            var c = this.padding;
            return c.top != b.top ||
              c.right != b.right ||
              c.bottom != b.bottom ||
              c.left != b.left
              ? {
                  top: +b.top,
                  right: +b.right,
                  bottom: +b.bottom,
                  left: +b.left,
                }
              : c;
          },
          $l: function (a) {
            return this.Ae ? a : this[this.Mg];
          },
          bl: function (a, b, c) {
            (a = m[b]) && c[a](this);
          },
          centerSetter: function (a) {
            a = i.fromObject(a);
            if (a instanceof i) return a;
            nokia.maps.util.f("coord");
          },
          T: function (a, b) {
            this.Ae = f;
            this.Mg = a;
            this.kf(a, b);
            this.Mg = null;
            this.Ae = e;
          },
          setCopyrightAlignment: function (a) {
            this.set("copyrightAlignment", a);
          },
          dl: function (a) {
            b.ha(a, "div");
            var c = new nokia.maps.map.DisplayContainer(this, a);
            this.C = c.C;
            this.D = c.D;
            this.doc = this.C.ownerDocument;
            this.Fc = c.Fc;
            this.Ya = c.Ya;
            this.Xb = c.Xb;
            this.K = c.K;
            this.mb = c.mb;
            this.xc = c.xc;
            this.pc = c.pc;
            this.T("width", a.offsetWidth);
            this.T("height", a.offsetHeight);
            this.addEvent = function (a) {
              c.addEvent(a);
            };
            this.removeEvent = function (a) {
              c.removeEvent(a);
            };
            this.Cg = function () {
              c.containerDestroy();
            };
          },
          getUIContainer: function () {
            return this.K;
          },
          getClippingUIContainer: function () {
            return this.mb;
          },
          destroy: function () {
            for (
              var a, b = this.components;
              b.getLength() > 0 && (a = b.get(0));

            )
              this.removeComponent(a);
            this.pc && this.pc.destroy();
            this.xc && this.xc.destroy();
            this.Cg && this.Cg();
          },
          getComponentById: function (a) {
            for (var b = -1, c = this.components.getLength(), d; ++b < c; )
              if ((d = this.components.get(b)) && d.getId() === a) return d;
            return null;
          },
          addComponent: function (a) {
            var b = this.getComponentById(a.getId());
            if (b) return b.queryReference();
            this.components.add(a);
            return a;
          },
          removeComponent: function (a) {
            var b = a.releaseReference();
            b <= 0 && this.components.remove(a);
            return b;
          },
          componentsSetter: function (a) {
            return this.components.addAll(a);
          },
          getDisplays: function () {
            return [this];
          },
          aa: a.Q,
          sg: function (a) {
            var b, c;
            if (a instanceof nokia.maps.map.Container) {
              b = a.objects.asArray();
              for (c = b.length; c--; ) if (!this.sg(b[c])) return e;
            }
            return !a.B[this.d];
          },
          ne: function (a, b) {
            var c, d, e;
            b.B[this.d] = new k(this, a, b);
            if (b instanceof nokia.maps.map.Container) {
              c = b.objects.asArray();
              d = c.length;
              for (e = 0; e < d; e++) this.ne(b, c[e], e);
            }
          },
          Rd: function (a) {
            var b, c, d;
            if (a instanceof nokia.maps.map.Container) {
              b = a.objects.asArray();
              c = b.length;
              for (d = 0; d < c; d++) this.Rd(b[d]);
            }
            delete a.B[this.d];
          },
          MAPVIEWCHANGE_CENTER: 1,
          MAPVIEWCHANGE_ZOOM: 2,
          MAPVIEWCHANGE_HEADING: 4,
          MAPVIEWCHANGE_TILT: 8,
          MAPVIEWCHANGE_SIZE: 16,
          Zc: function (a, b) {
            this.dispatch(
              new l.MapViewChangeEvent({
                type: "mapviewchange" + a,
                target: this.D,
                display: this,
                data: b,
              })
            );
          },
          We: 0,
          cj: function () {
            if (this.Td) this.Zc("end", 0), (this.Td = 0);
          },
          Ef: function (a) {
            var b;
            if ((b = this.We)) if ((this.Zc("", b), a)) this.We = 0;
          },
          eb: function (a) {
            if (!this.Td) this.Zc("start", 0), (this.Td = 1);
            this.We |= a;
          },
          Yk: function (a, b, c) {
            if (c instanceof nokia.maps.map.overlay.ObjectProvider)
              if (
                (this.Pe[b](c),
                c[b + "Observer"]("readyObjects", this.rm, this),
                b == "add")
              ) {
                c.readyObjects = null;
                if (c.D) c.ff = c.D;
                c.D = new nokia.maps.map.Container();
                this.objects.add(c.D);
                if (!this.wh)
                  (this.wh = !0), this.addListener("mapviewchangeend", this.td);
                this.td();
              } else if (c.readyObjects)
                this.objects.remove(c.D),
                  c.ff ? ((c.D = c.ff), delete c.ff) : delete c.D,
                  delete c.Ka;
          },
          wh: !1,
          da: 0,
          jh: 1,
          td: function () {
            var a = this.zoomLevel,
              b,
              c = this.Pe.getLength();
            for (this.da++; c--; )
              (b = this.Pe.get(c)),
                a > b.max || a < b.min
                  ? b.Ka && (delete b.Ka, b.D.objects.clear())
                  : b.request(a, this.getViewBounds());
          },
          rm: function (a, b, c) {
            var d = [],
              e;
            if (this.da != this.jh) {
              if (a.Ka)
                for (b = a.Ka.length; b--; )
                  a.Ka[b].Ce &&
                    (a.D.objects.remove(a.Ka[b]), delete a.Ka[b].Ce);
              e = a.D.objects.asArray();
              for (b = e.length; b--; ) e[b].Ce = !0;
              a.Ka = e;
            }
            for (b = c.length; b--; )
              c[b].isAdded(this) || d.push(c[b]), delete c[b].Ce;
            this.jh = this.da;
            a.D.objects.addAll(d);
          },
        })),
        k = (l.Bq = function (a, b, c) {
          this.P = a;
          this.D = b;
          this.Cs = c;
          if (c.Kf) this.Ue = {};
        }),
        n = (l.MapViewChangeEvent = function (a) {
          b.Event.call(this, a);
        }),
        p = {
          MAPVIEWCHANGE_CENTER: 1,
          MAPVIEWCHANGE_ZOOM: 2,
          MAPVIEWCHANGE_HEADING: 4,
          MAPVIEWCHANGE_TILT: 8,
          MAPVIEWCHANGE_SIZE: 16,
        };
      a.flatMerge(n, p);
      p.data = 0;
      a.flatMerge((n.prototype = new b.Event()), p);
    })();
    ovi.provide("nokia.maps.map.Marker");
    (function () {
      var f = nokia.maps,
        e = f.util,
        c = f.dom,
        b = f.gfx,
        a = e.Point,
        g = e.Strip,
        d = new a(0, 0),
        i = e.Rectangle,
        j = f.map.ab,
        h = f.geo,
        m = f.map.HitArea,
        l = h.Coordinate;
      nokia.maps.map.Marker = new ovi.Class({
        Extends: nokia.maps.map.Object,
        initialize: function (a, b) {
          var c;
          if (this.u === "marker" && (!b || !("icon" in b)))
            (c = new j()),
              this.set("icon", c.getIcon()),
              this.set("anchor", c.anchor),
              this.set("hitArea", c.hitArea);
          this.ua = {};
          this._super(b);
          this.set("coordinate", a, 1);
        },
        u: "marker",
        anchor: d,
        j: d,
        coordinateSetter: function (a) {
          (a = l.fromObject(a)) || e.f();
          this.ua = {};
          return a;
        },
        hitAreaSetter: function (a) {
          return !a ? a : m.from(a);
        },
        anchorSetter: function (b) {
          (b = a.fromObject(b)) || e.f("you have to set util.Point");
          return b;
        },
        iconSetter: function (c) {
          ovi.type(c);
          c instanceof b.Image || (c = b.Image.fromObject(c));
          c instanceof b.Image || e.f("icon");
          this.icon = c.F === document ? c : c.clone(document);
          this.j = new a(c.width, c.height);
          return this.icon;
        },
        getBoundingBox: function () {
          return h.BoundingBox.coverAll([this.coordinate]);
        },
        getDisplayBoundingBox: function (a) {
          this.isAdded(a) ||
            e.f("the map object is not added to the given display");
          a = a.geoToPixel(this.coordinate).sub(this.anchor);
          return new i([a, a.add(this.j)]);
        },
        hitTest: function (b, c, d, e) {
          b = this.getDisplayBoundingBox(b);
          c = new a(c, d);
          d = this.hitArea;
          return b.contains(c) && (!d || d.hitTest(c.sub(b.topLeft), e));
        },
        getDisplayOffset: function (b, c, d) {
          return new a(c, d).sub(b.geoToPixel(this.coordinate));
        },
        ba: function (a, b, c, d) {
          this.Z |= b === "coordinate" ? 1 : 2;
          this._super(a, b, c, d);
        },
        fd: function (b) {
          var d = "error";
          if (b.state === 1)
            (this.j = new a(b.width, b.height)),
              this.aa("icon", this.icon, 2),
              (d = "load");
          this.dispatch(
            new c.Event({ type: d, target: this, relatedTarget: b })
          );
        },
        getIconForRendering: function (a) {
          var b = this.icon;
          a !== document && (b = b.clone(a));
          b.state || b.prepare(this.fd, this);
          return b;
        },
        project: function (a) {
          return (
            this.ua[a.id] ||
            (this.ua[a.id] = a.geoToMapPoints(
              g.stencil(g.LAT_LNG, [
                this.coordinate.latitude,
                this.coordinate.longitude,
              ])
            ))
          );
        },
      });
    })();
    ovi.provide("nokia.maps.map.StandardMarker");
    (function () {
      function f(a, b, c) {
        a.J.set(b, c);
        if (b === "shape")
          (a.j = a.J.j),
            a.set("anchor", a.J.anchor),
            a.set("hitArea", a.J.hitArea);
        return a.J[b];
      }
      var e = nokia.maps,
        c = e.util,
        b = e.map.ab,
        e = (nokia.maps.map.StandardMarker = new ovi.Class({
          Extends: nokia.maps.map.Marker,
          initialize: function (a, e) {
            var d = (this.J = new b(c.flatMerge({}, e, 1, b.wa)));
            c.flatMerge(this, d, 1, b.wa);
            this.j = d.j;
            this._super(a, c.flatMerge({}, e, 1, b.rd));
          },
          u: "standardmarker",
          shapeSetter: function (a) {
            return f(this, "shape", a);
          },
          textSetter: function (a) {
            return f(this, "text", a);
          },
          textPenSetter: function (a) {
            return f(this, "textPen", a);
          },
          penSetter: function (a) {
            return f(this, "pen", a);
          },
          brushSetter: function (a) {
            return f(this, "brush", a);
          },
          getIconForRendering: function (a) {
            this.set("icon", this.J.getIcon());
            return this._super(a);
          },
        }));
      c.flatMerge(e.prototype, b.prototype, !0, b.wa);
    })();
    ovi.provide("nokia.maps.map.overlay.PlaceLayer");
    (function () {
      var f = nokia.maps.net.Request;
      nokia.maps.map.overlay.PlaceLayer = new ovi.Class({
        Extends: nokia.maps.map.overlay.ObjectTileProvider,
        initialize: function (e) {
          e = e || {};
          this._super(e);
          this.Db = new f(f.JSONP);
        },
        requestTile: function (e, c, b, a) {
          var f, d;
          (d = this.getCachedTile(c, b, a))
            ? this.notify(d)
            : (f = this.getUrl(c, b, a)) &&
              this.Db.send(f, ovi.bind(this, this.ac, e, c, b, a));
        },
        ac: function (e, c, b, a, f) {
          var d = !f.error && !f.timeout;
          this.objectTileArrived(d ? this.Ze(f.response) : null, c, b, a, e, d);
        },
        Ze: function (e) {
          var c = this.Wa || (this.Wa = new nokia.maps.search.Manager()),
            b,
            a,
            f,
            d,
            i = [],
            j;
          c.zt(e);
          for (b = 0; b < c.places.length; b++) {
            f = c.places[b];
            j = e.response.view[0].result[b].place.additionalData[0].value;
            for (a = 0; a < f.locations.length; a++)
              (d = f.locations[a]),
                i.push(
                  new nokia.maps.map.Marker(d.displayPosition, {
                    icon:
                      "https://web.archive.org/web/20170514173900/http://img.lbsp.navteq.com/places/icons/symNT" +
                      j +
                      ".gif",
                  })
                );
          }
          return i;
        },
        getUrl: function (e, c, b) {
          for (
            var a = [
                "https://web.archive.org/web/20170514173900/http://prd.lbsp.navteq.com/search/6.2/placesearch.json?token=JSLOCAPI_DEV_LBSP_ALL&jsonAttributes=1&categoryids=9580;9500;9501;9578;9512&maxresults=25&pageinformation=1&xplacescore=1&quadkey=",
              ],
              f;
            e-- > 0;

          )
            (f = 1 << e), a.push(((b & f) !== 0) + ((c & f) !== 0) * 2);
          return a.join("");
        },
      });
    })();
    ovi.provide("nokia.maps.map.overlay.TrafficIncidents");
    (function () {
      var f = nokia.maps.net.Request;
      nokia.maps.map.overlay.TrafficIncidents = new ovi.Class({
        Extends: nokia.maps.map.overlay.ObjectTileProvider,
        initialize: function (e) {
          this._super(e);
          this.mf = ovi.bind(this, this.mf);
          this.Rl = new nokia.maps.language.Manager();
          this.Db = new f(f.JSONP);
        },
        requestTile: function (e, c, b, a) {
          var f, d;
          (d = this.getCachedTile(c, b, a))
            ? this.notify(d)
            : (f = this.getUrl(c, b, a)) &&
              this.Db.send(f, ovi.bind(this, this.ac, e, c, b, a));
        },
        ac: function (e, c, b, a, f) {
          var d = !f.error && !f.timeout;
          this.objectTileArrived(d ? this.Ze(f.response) : null, c, b, a, e, d);
        },
        Ze: function (e) {
          if (e.TRAFFICITEMS && e.TRAFFICITEMS.TRAFFICITEM) {
            if (!this.km) this.km = [];
            var c = [],
              e = e.TRAFFICITEMS.TRAFFICITEM,
              b;
            for (b in e)
              if (
                e[b].LOCATION &&
                e[b].LOCATION.GEOLOC &&
                e[b].LOCATION.GEOLOC.ORIGIN
              ) {
                var a = new nokia.maps.geo.Coordinate(
                    e[b].LOCATION.GEOLOC.ORIGIN.LATITUDE,
                    e[b].LOCATION.GEOLOC.ORIGIN.LONGITUDE
                  ),
                  f = null;
                switch (e[b].TRAFFICITEMTYPEDESC) {
                  case "CONSTRUCTION":
                    f =
                      nokia.maps.loadPath +
                      "assets/navteq/ui/images/navteq_web/trafficitems/construction.png";
                    break;
                  case "EVENT":
                    f =
                      nokia.maps.loadPath +
                      "assets/navteq/ui/images/navteq_web/trafficitems/event.png";
                    break;
                  case "MASS TRANSIT":
                    f =
                      nokia.maps.loadPath +
                      "assets/navteq/ui/images/navteq_web/trafficitems/masstransit.png";
                    break;
                  default:
                    f =
                      nokia.maps.loadPath +
                      "assets/navteq/ui/images/navteq_web/trafficitems/incident.png";
                }
                var d = "";
                e[b].TRAFFICITEMDESCRIPTION &&
                  (d += e[b].TRAFFICITEMDESCRIPTION[1].content + "<br/>");
                e[b].CRITICALITY &&
                  e[b].CRITICALITY.DESCRIPTION &&
                  (d +=
                    this.Rl.translateToken("nvt.languages.ui._t43") +
                    ": " +
                    e[b].CRITICALITY.DESCRIPTION);
                a = new nokia.maps.map.Marker(a, {
                  icon: f,
                  eventListener: { click: this.mf },
                });
                a.anchor.x = 10;
                a.anchor.y = 14;
                a.$content = d;
                c.push(a);
              }
            return c;
          }
          return [];
        },
        mf: function (e) {
          var c = e.target;
          if (!this.tooltips) {
            var b;
            (b = e.display.getComponentById("InfoBubbles"))
              ? (this.tooltips = b)
              : ((this.tooltips = new nokia.maps.map.component.InfoBubbles()),
                e.display.components.add(this.tooltips));
          }
          this.Lg != null && this.tooltips.removeBubble(this.Lg);
          this.Lg = this.tooltips.addBubble(c.$content, c.coordinate);
        },
      });
    })();
    ovi.provide("nokia.maps.map.Polyline");
    (function (f) {
      var e = nokia.maps.geo,
        c = e.BoundingBox,
        b = e.Coordinate,
        f = nokia.maps.util,
        a = f.isArray,
        g = f.Strip,
        d = nokia.maps.util.Rectangle,
        i = f.Point,
        j = nokia.maps.gfx.Color,
        h = f.Pen,
        m = j.parseCss,
        l = new g(["latitude", "longitude", "altitude"]),
        k = e.Shape.Ak,
        n = !n,
        p = [],
        o = (nokia.maps.map.Polyline = new ovi.Class({
          Extends: nokia.maps.map.Spatial,
          initialize: function (b, c) {
            b instanceof e.Strip ||
              a(b) ||
              f.f("Argument coords is not instance of geo.Strip or Array.");
            var d = (this.path =
              b instanceof e.Shape ? b : new e.Shape(this.closedShape));
            d.addObserver(this.ba, this);
            b instanceof e.Shape
              ? (d.nb = this.closedShape)
              : b instanceof e.Strip
              ? d.El(b)
              : d.splice(0, 0, b, "auto");
            this.Je = {};
            this.pen = this.penSetter(c && c.pen);
            c && delete c.pen;
            this._super(c);
          },
          destroy: function () {
            this.path.destroy();
            this._super();
          },
          Statics: { Pc: 100, Bk: p },
          u: "polyline",
          color: null,
          stroke: "solid",
          width: 0,
          lineJoin: null,
          pen: null,
          closedShape: !1,
          ba: function (a, b, c, d) {
            b === "path" || a instanceof nokia.maps.geo.Shape
              ? ((this.ke = 0), (this.Je = {}), (this.Z |= 1))
              : b !== "zIndex" && (this.Z |= 2);
            this._super(a, b, c, d);
          },
          getNearest: function (a) {
            var b = this.path,
              a = this.getNearestIndex(a);
            return b.get(a);
          },
          getNearestIndex: function (a) {
            for (
              var b = this.path.asArray(),
                c = b.length,
                d = e.Coordinate.fromObject(a),
                f,
                h = d.distance({ latitude: b[0], longitude: b[1] }),
                g = 0,
                a = 3;
              a < c;
              a += 3
            )
              (f = d.distance({ latitude: b[a], longitude: b[a + 1] })),
                f < h && ((g = a / 3), (h = f));
            return g;
          },
          getBoundingBox: function () {
            var a = this.path,
              d = this.ke;
            if (!d)
              (d = a.getBoundingBox()),
                d.getWidth() == 360 &&
                  a.pb % 2 == 1 &&
                  (d = d.merge(
                    new c(
                      new b(this.coverNorthPole ? 90 : -90, 0, void 0, n),
                      void 0,
                      n
                    )
                  )),
                (this.ke = d);
            return d;
          },
          pathSetter: function (a) {
            var b = this.path;
            b.splice(
              0,
              b.getLength(),
              e.Strip.convertToArray(a),
              "unsafe values lat lng alt"
            );
            return b;
          },
          widthSetter: function (a) {
            (a = f.lb(a, 0, o.Pc)) !== a &&
              f.f("width must be in range [0.." + o.Pc + "]");
            this.pen = new h({ lineWidth: a }, this.pen);
            return a;
          },
          strokeSetter: function (a) {
            a !== "solid" && f.f("cannot set anything else than stroke=solid");
            this.pen = new h({ stroke: a }, this.pen);
            return a;
          },
          colorSetter: function (a) {
            m(a) === null && f.f("Invalid color set!");
            this.pen = new h({ strokeColor: a }, this.pen);
            return a;
          },
          lineJoinSetter: function (a) {
            this.pen = new h({ lineJoin: a }, this.pen);
            return a;
          },
          penSetter: function (a) {
            a instanceof h || (a = new h(a));
            this.set("width", a.lineWidth);
            this.set("color", a.strokeColor);
            this.set("lineJoin", a.lineJoin);
            return a;
          },
          coveredByTile: function (a, b, c) {
            var d = a ? a.length : 0,
              b = new i(b, c),
              c = !1,
              e = this.width;
            if (this.closedShape)
              for (; d--; )
                if (b.isCoveredBy(a[d], e, n)) {
                  c = n;
                  break;
                }
            return c;
          },
          drawToTile: function (a, e, f) {
            var h = this.closedShape,
              g = this.getBoundingBox();
            c.fromObject(
              [90, g.topLeft.longitude, -90, g.bottomRight.longitude],
              n
            ).contains(new b(0, 180, void 0, 1));
            var g = this.pen.lineWidth,
              l = this.pen.lineCap,
              m = this.pen.lineJoin,
              z = this.pen.miterLimit,
              E = f ? 2 * (g > 1 ? g : 1) : 0,
              E = new d([
                new i(-E, -E),
                new i(a.getWidth() + E, a.getHeight() + E),
              ]),
              e = this.path.clip(
                e,
                E,
                this.simplify,
                this.coverNorthPole,
                this.ve,
                f,
                o.Pc
              ),
              f = e.length,
              G,
              E = g || h;
            if (f) {
              g &&
                (a.set("strokeColor", j.parseCss(this.pen.strokeColor)),
                a.set("lineWidth", g));
              l && a.set("lineCap", l);
              m && a.set("lineJoin", m);
              z && a.set("miterLimit", z);
              for (
                h &&
                a.set(
                  "fillColor",
                  j.parseCss(
                    this.brush.fill === "none" ? "#0000" : this.brush.color
                  )
                );
                f--;

              ) {
                l = e[f];
                z = l.length;
                G = l[0];
                if (E) {
                  a.beginPath();
                  a.moveTo(G.x, G.y);
                  for (m = 1; m < z; m++) a.lineTo((G = l[m]).x, G.y);
                  h && (a.closePath(), a.fill());
                  g && a.stroke();
                }
                for (m = z; m--; ) l.push((G = l[m]).x, G.y);
                l.splice(0, z);
              }
              return !h || !e.fullfilled ? e : p;
            } else return e === k ? p : !1;
          },
          project: function (a) {
            return (
              this.Je[a.id] ||
              (this.Je[a.id] = a.geoToMapPoints(
                g.stencil(l, this.path.internalArray)
              ))
            );
          },
        }));
    })(nokia.maps.util);
    ovi.provide("nokia.maps.map.Polygon");
    (function () {
      var f = nokia.maps.util.Brush;
      nokia.maps.map.Polygon = new ovi.Class({
        Extends: nokia.maps.map.Polyline,
        initialize: function (e, c) {
          this.brush = this.brushSetter(c && c.brush);
          c && delete c.brush;
          this._super(e, c);
        },
        u: "polygon",
        fillColor: null,
        brush: null,
        closedShape: !0,
        coverNorthPole: !1,
        ve: 136,
        fillColorSetter: function (e) {
          var c = nokia.maps.gfx.Color,
            b = c.parseCss(e);
          if (b === null) throw "Invalid fillColor set!";
          this.ve = c.alpha(b);
          this.brush = new f({ color: e }, this.brush);
          return e;
        },
        brushSetter: function (e) {
          var c = nokia.maps.gfx.Color,
            b;
          e instanceof f || (e = new f(e));
          this.set("fillColor", e.color);
          b = c.parseCss(e.color);
          this.ve = c.alpha(b);
          return e;
        },
        coverNorthPoleSetter: function (e) {
          return !!e;
        },
      });
    })();
    ovi.provide("nokia.maps.map.js.ObjTile");
    (function () {
      var f = nokia.maps,
        e = f.dom.importNode,
        c = f.dom.cloneNode,
        b = f.map,
        a = b.Polyline.Bk,
        b = b.js,
        f = f.gfx,
        g = f.Graphics,
        d = f.IDL,
        i = f.GraphicsImage,
        j = f.Painter.defaultPainter.isVML,
        h = -1 / 0,
        m = [].concat,
        f = (b.ObjTile = function (a, b, c, d) {
          this.id = a;
          this.V = b;
          this.Qh = c;
          this.lh = d;
          this.yb = {};
          this.le = {};
        });
      ovi.extend((f.prototype = new b.Tile()), {
        expires: -1 / 0,
        getIDL: function () {
          var a,
            b = this.Ul;
          return (
            b &&
            new d(
              m.apply(
                [d.opcodes.BEGIN_2D_IMAGE, (a = this.V).width, a.height, ""],
                b
              )
            )
          );
        },
        getNode: function (a) {
          var b = this.oa,
            d,
            f;
          if (!b && (d = this.getIDL()))
            (this.oa = b = new i(d, null, document).createElement()),
              (b.style.position = "absolute");
          if (b) {
            if (a && a !== document) b = e(a, b, 1);
            else if (j || ((f = b.parentNode) && f.nodeType !== 11))
              b = c(b, 1);
            return b;
          }
        },
        Ec: function (a) {
          var b = this.yb,
            c;
          this.Ye = null;
          if (!a) for (c in b) b.hasOwnProperty(c) && this.Pg(b[c][0]);
        },
        Pg: function (a) {
          var b = a.d,
            c = this.yb;
          if (b in c)
            delete a.B[this.V.P.d].Ue[this.id], delete c[b], (this.expires = h);
        },
        Uh: function (a, b, c) {
          var d = a.d,
            e = this.yb;
          d in e || (a.B[this.V.P.d].Ue[this.id] = this);
          return (e[d] = b ? [a, b, c] : [a]);
        },
        Nl: function (b) {
          var c = [],
            d = this.le,
            e,
            f,
            h,
            g,
            i,
            j,
            m,
            v,
            x;
          for (f in d)
            if (d.hasOwnProperty(f) && (h = (e = d[f])[1])) {
              g = e[0];
              if (!(i = h === a)) {
                j = g.width || 0;
                for (m = h.length; m-- && !i; )
                  if (
                    ((x = b.isCoveredBy(h[m], j, (v = g.closedShape))),
                    v && g.brush.fill === "none" && x === "S" && (x = !1),
                    (x && v) || (!v && (x === "E" || x === "V")))
                  )
                    i = 1;
              }
              i && c.push(g);
            }
          return c;
        },
        paint: function (a) {
          var b = 1,
            c = this.Ye,
            d = c.length;
          if (d) {
            for (
              var e = this.V,
                f = e.P,
                h = this.Qh,
                i = this.lh,
                j = e.width,
                e = e.height,
                m = [],
                v,
                x,
                z = this.yb,
                E,
                G = new g();
              d--;

            )
              if (((x = c[d]), !a || x.isAdded(f))) {
                v = x.d;
                if (!(v = z[v]))
                  G.beginImage(j, e),
                    (b = x.drawToTile(G, h, i))
                      ? (v = this.Uh(x, b, G.getIDL().data.slice(4)))
                      : this.Uh(x),
                    (b = 1);
                v && (E = v[2]) && m.push(E);
              }
            if (b && ((this.oa = null), m.length)) (b = 0), (this.Ul = m);
          }
          this.Ye = 0;
          this.le = {};
          for (var L in this.yb) this.le[L] = this.yb[L];
          return !b;
        },
      }).constructor = f;
    })();
    ovi.provide("nokia.maps.map.Rectangle");
    (function () {
      var f = nokia.maps,
        e = f.util,
        f = f.geo,
        c = f.Strip,
        b = f.BoundingBox;
      nokia.maps.map.Rectangle = new ovi.Class({
        Extends: nokia.maps.map.Polygon,
        initialize: function (a, b) {
          a = this.boundingBoxSetter(a, 1);
          this._super(this.Wb((this.boundingBox = a)), b);
        },
        simplify: 0,
        u: "rectangle",
        Wb: function (a) {
          var b = a.topLeft,
            d = b.latitude,
            e = b.longitude,
            f = a.bottomRight,
            b = f.latitude,
            f = f.longitude,
            e = [d, e, d, f, b, f, b, e],
            f = 0;
          if (a.getWidth() >= 180)
            (a = a.getCenter()),
              (f = a.longitude),
              e.splice(6, 0, b, f),
              e.splice(2, 0, d, f);
          return new c(e, "unsafe values lat lng");
        },
        boundingBoxSetter: function (a, c) {
          a = b.fromObject(a) || e.f();
          c || this.set("path", this.Wb(a));
          return a;
        },
      });
    })();
    ovi.provide("nokia.maps.map.Circle");
    (function () {
      var f = nokia.maps,
        e = Math,
        c = e.asin,
        b = e.sin,
        a = e.cos,
        g = e.abs,
        d = e.PI,
        i = d / 180,
        j = 180 / d,
        h = f.util,
        m = f.geo.Coordinate;
      nokia.maps.map.Circle = new ovi.Class({
        Extends: nokia.maps.map.Polygon,
        initialize: function (a, b, c) {
          this._super(
            this.Wb(
              (this.center = this.centerSetter(a, 1)),
              (this.radius = this.radiusSetter(b, 1)),
              c && "precision" in c
                ? this.precisionSetter(c.precision, 1)
                : this.precision
            ),
            c
          );
        },
        u: "circle",
        precision: 60,
        centerSetter: function (a, b) {
          a = m.fromObject(a) || h.f();
          b || this.lf(a, this.radius, this.precision);
          return a;
        },
        radiusSetter: function (a, b) {
          (a = h.lb(a, 0, 1e7)) !== a &&
            h.f("Passed argument is not a number.");
          b || this.lf(this.center, a, this.precision);
          return a;
        },
        precisionSetter: function (a, b) {
          ((a = h.lb(a, 4, 360)) !== a || a === Infinity) &&
            h.f("Passed argument is not a number or is a infinity.");
          b || this.lf(this.center, this.radius, a);
          return a;
        },
        lf: function (a, b, c) {
          this.set("path", this.Wb(a, b, c));
        },
        Wb: function (a, b, c) {
          var d = 270,
            c = 360 / c,
            e = [],
            a = m.fromObject(a);
          this.set("coverNorthPole", a.latitude > 0 ? !0 : !1);
          if (g(a.latitude === 90)) e = this.cl(a, b, c, d, 630);
          else for (; d < 630; d += c) e.push(a.walk(d, b, 1));
          this.ke = null;
          return e;
        },
        cl: function (e, f, h, g, o) {
          f /= 6371e3;
          for (var q = [], e = i * e.latitude, r, s; g < o; g += h)
            (r = i * g),
              (s = c(b(e) * a(f) + a(e) * b(f) * a(r))),
              (r = ((r + d) % (2 * d)) - d),
              q.push(new m(s * j, r * j));
          return q;
        },
      });
    })();
    ovi.provide("nokia.maps.map.js.TileProvider");
    (function () {
      var f = 0,
        e = nokia.maps,
        c = e.util.Cache,
        b = c.NEXT,
        a = c.DONT;
      new Image();
      var g = e.map.js.ObjTile,
        d = [],
        i = e.util,
        j = i.Point,
        h = i.now,
        e = e.geo,
        m = e.PixelProjection,
        i = Math,
        l = i.floor,
        k = i.min,
        n = i.max;
      nokia.maps.map.js.TileProvider = new ovi.Class({
        Extends: nokia.maps.map.Provider,
        Mixins: [nokia.maps.dom.EventTarget],
        initialize: function (a) {
          var b,
            c,
            d = [],
            e = [],
            h,
            g,
            i,
            l;
          this.id = f++;
          ovi.extend(this, a);
          i = this.max = k(this.max, 30);
          l = this.min = n(this.min, 0);
          this.Na = {};
          this.U = [];
          this.wc = new j(this.width, this.height);
          a = this.projection;
          h = this.width;
          for (g = this.height; i >= l; )
            (b = 1 << i),
              (c = function (a, b) {
                this.y = a * g;
                this.x = b * h;
              }),
              (c.prototype = new m(a, h * b, g * b)),
              (e[i] = new c(0, 0)),
              (d[i--] = c);
          this.Fk = d;
          this.Ad = e;
        },
        width: 256,
        height: 256,
        min: 0,
        opacity: 1,
        alpha: !1,
        scalable: !0,
        cache: new c(
          128,
          function (a) {
            return a.oa ? a : b;
          },
          null,
          new c(
            512,
            function (a) {
              return a instanceof g ? ((a.oa = null), a) : b;
            },
            function (a) {
              a.Ec();
            },
            new c(2048, function (b) {
              return b instanceof g ? a : !0;
            })
          )
        ),
        projection: e.mercator,
        createId: function (a, b, c, d) {
          return d || (c = this.checkAddy(a, b, c)) !== -1
            ? this.id + "_" + a + "_" + b + "_" + c
            : !1;
        },
        checkAddy: function (a, b, c) {
          var d = 1 << a;
          return a < this.min || a > this.max || b < 0 || b >= (d = 1 << a)
            ? -1
            : (c %= d) < 0
            ? c + d
            : c;
        },
        cancel: function (a) {
          var b = this.Na[a];
          if (b && !--b.Lc) return this.finishRequest(a, b, 0, 1, 0), b;
        },
        finishRequest: function (a, b, c, d, e) {
          var f;
          if (!d && (f = this.cache)) c ? f.add(a, b) : f.remove(a);
          e || (delete this.Na[a], this.notify(b, c));
        },
        request: function (a, b, c, d, e) {
          var f, g;
          f = !1;
          var i;
          e === void 0 && (e = h());
          if ((c = this.checkAddy(a, b, c)) !== -1)
            if ((g = this.Na[(f = this.createId(a, b, c, 1))]))
              d || g.Lc++, (f = !0);
            else {
              if (
                (i = this.cache) &&
                (g = i.get(f)) &&
                g !== !0 &&
                g.isExpired(e)
              )
                i.remove(f, 1), (g = !1);
              f =
                (g === !0 || !g) && !d
                  ? this.create(a, b, c, f, !1, e) || !1
                  : (g !== !0 && g) || !1;
            }
          return f;
        },
        getCopyrights: function () {
          return d;
        },
        addObserver: function (a, b) {
          var c = this.U,
            d = c.length;
          c[d++] = a;
          b && (c[d] = b);
          c.length = ++d;
        },
        removeObserver: function (a, b) {
          for (var c = this.U, d = c.length, e = 0; e < d; )
            c[e] === a && c[e + 1] === b && (c.splice(e, 2), (e = d)), (e += 2);
        },
        notify: function (a, b) {
          for (var c = this.U, d = 0; d in c; ) c[d++].call(c[d++], a, b);
        },
        getTileAdr: function (a) {
          return new j(l(a.x / this.width), l(a.y / this.height));
        },
        nj: function (a) {
          return a >= this.min && a <= this.max;
        },
        destroy: function () {
          var a = this.cache,
            b = this.Na,
            c,
            d;
          a && a.removeAll(this.id);
          for (c in b) if ((d = b[c]) && d.Lc) (d.Lc = 1), this.cancel(c);
        },
        dispatchInvalidateEvent: function (a) {
          var b = new nokia.maps.dom.Event();
          b.type = "invalidate";
          b.boundingBox = a;
          this.dispatch(b);
        },
      });
    })();
    ovi.provide("nokia.maps.map.js.ImgTileProvider");
    (function () {
      var f = nokia.maps.dom,
        e = f.loadImg,
        c = f.cancelImg,
        b = nokia.maps.map.js.Tile;
      nokia.maps.map.js.ImgTileProvider = new ovi.Class({
        Extends: nokia.maps.map.js.TileProvider,
        create: function (a, c, d, f, j, h) {
          var m = this,
            l = new b(
              f,
              (j = document.createElement("img")),
              m.expires ? m.expires(h, a, c, d) : 0
            ),
            a = e(j, m.getUrl(a, c, d), function (a, b, c) {
              m.finishRequest(f, l, b, !1, c);
            });
          a === void 0 && (m.Na[f] = l);
          return a ? l : a !== !1;
        },
        cancel: function (a) {
          var b;
          (b = this._super(a)) && c(b.oa, 1);
          return b;
        },
      });
    })();
    ovi.provide("nokia.maps.map._packaging.package");
    ovi.provide("nokia.maps.map.js.ObjTileProvider");
    (function () {
      var f = nokia.maps,
        e = f.util.Coroutine,
        c = f.geo.BoundingBox,
        f = f.map,
        b = f.Object,
        a = f.Polyline.Pc,
        g = f.js.ObjTile;
      nokia.maps.map.js.ObjTileProvider = new ovi.Class({
        Extends: nokia.maps.map.js.TileProvider,
        initialize: function (b, c, e) {
          this.label = "Spatial";
          this.P = b;
          this.fb = c;
          this._super(e);
          this.Ha = Math.round(a / 2) + 1;
          this.Xd = {};
          this.Jh(this);
          this.Kc = ovi.Array();
        },
        No: 1,
        ej: 0,
        finishRequest: function (a, b, c, e, f) {
          this._super(a, b, c, e, f);
          f || this.Xm(b);
        },
        Xm: function (a) {
          var b, c, e;
          e = (b = this.Kc).length;
          for (c = 0; c < e; c++) if (b[c] === a) return b.splice(c, 1);
        },
        Jh: e.create(
          "nokia.maps.map.js.ObjTileProvider#_paintCo",
          function (a) {
            for (var a = a.that, b, c; (b = a.Kc.shift()); )
              if (
                ((c = b.paint(1)), a.finishRequest(b.id, b, c), e.shallYield())
              )
                return e.yield();
            return e.wait(a.Xd);
          },
          "that"
        ),
        vl: function (a) {
          var b = this.cache;
          b && b.remove(a.id, 1);
          a.Ec();
        },
        Ll: function (a) {
          for (var b = a.length, c = 0; b--; )
            c += a[b].path.internalArray.length;
          return c;
        },
        $e: function (a, b) {
          var c,
            f = !1,
            g;
          if (a.expires < b) {
            g = a.id;
            if ((c = this.Ol(a.Qh, a.lh)).length)
              (a.expires = b),
                (a.Ye = c),
                (f = !this.ej && this.Ll(c) > 3e3 ? !0 : a.paint() && a);
            if (f !== !0) f || this.vl(a), this.finishRequest(g, a, f, 0, 1);
            else if (!(c = this.Na)[g])
              (c[g] = a), this.Kc.push(a), e.signal(this.Xd);
          } else f = a;
          return f;
        },
        request: function (a, b, c, e, f) {
          var g,
            k,
            e = !1,
            n;
          if ((c = this.checkAddy(a, b, c)) !== -1)
            e = (k = this.Na[(g = this.createId(a, b, c, 1))])
              ? this.$e(k, f)
              : (n = this.cache) && (k = n.get(g)) && k !== !0
              ? this.$e(k, f)
              : this.create(a, b, c, g, !1, f);
          return e;
        },
        create: function (a, b, c, e, f, l) {
          return this.$e(new g(e, this, new this.Fk[a](b, c), a), l);
        },
        Ol: function (a, e) {
          var f = this.P,
            h = this.Ha,
            g = this.fb.intersectBoundingBox(
              e
                ? new c(
                    a.xyToGeo(-h, -h),
                    a.xyToGeo(this.width + h, this.height + h),
                    !0
                  )
                : new c(
                    a.xyToGeo(0, 0),
                    a.xyToGeo(this.width, this.height),
                    !0
                  ),
              !0
            );
          if ((h = g.length)) {
            for (; h--; ) g[h] = g[h].Hc;
            g = b.sortByZInfo(g, f);
          }
          return g;
        },
      });
    })(nokia.maps.map.js);
    ovi.provide("nokia.maps.map.js.nokiaTileProviders");
    (function () {
      function f(e, f, m, l, k, n, p) {
        var o = 10,
          o = g.max(g.min(10, o || 1), 1);
        return new b.ImgTileProvider({
          width: 256,
          height: 256,
          label: e,
          alt: f,
          min: k || 0,
          max: n || 20,
          cfg: new a(),
          cfgNS: "map.tileprovider.ovi." + (p ? "mrs." : ""),
          cfgNSsecure: "map.tileprovider.ovi.secure." + (p ? "mrs." : ""),
          getUrl: function (a, b, e) {
            var f = c.ApplicationContext,
              h = this.cfg.get("secureConnection"),
              g,
              k,
              j = f.authenticationToken,
              n = f.appId,
              f = d[f.defaultLanguage.substr(0, 2)],
              p = [];
            if (h == "prefer" || h == "force")
              (g = this.cfg.get(this.cfgNSsecure + "urlPrefix")),
                (k = this.cfg.get(this.cfgNSsecure + "url"));
            !g &&
              !k &&
              h != "force" &&
              ((g = this.cfg.get(this.cfgNS + "urlPrefix")),
              (k = this.cfg.get(this.cfgNS + "url")));
            g = [
              g,
              i(98 + ((b + e) % o)),
              k,
              m,
              ".",
              l,
              "/",
              a,
              "/",
              e,
              "/",
              b,
              "/",
              256,
              "/",
              "png8",
            ];
            j && p.push("token=" + j);
            n && p.push("app_id=" + n);
            f && p.push("lg=" + f);
            return g.join("") + (p.length ? "?" + p.join("&") : "");
          },
          getCopyrights: function (a, c) {
            return b.copyrights.get(m, a, c);
          },
        });
      }
      var e = nokia.maps,
        c = e.util,
        b = e.map.js,
        a = e.Config,
        g = Math,
        d = {
          zh: "CHI",
          es: "SPA",
          fr: "FRE",
          it: "ITA",
          de: "GER",
          ru: "RUS",
        },
        i = String.fromCharCode,
        e =
          (b.nokiaTileProviders =
          nokia.maps.map.js.nokiaTileProviders =
            {
              base: [
                f("Map", "Show street map", "normal", "day"),
                f("Hybrid", "Show hybrid imagery", "hybrid", "day"),
                f("Terrain", "Show terrain map", "terrain", "day"),
                f("Smart Map", "Show smart map", "normal", "day.grey"),
                f(
                  "Public Transit Map",
                  "Show public transport",
                  "normal",
                  "day.transit"
                ),
                f(
                  "Traffic Map",
                  "Show traffic",
                  "normal",
                  "day.grey",
                  0,
                  20,
                  !0
                ),
              ],
              overlay: [],
            });
      e.constants = {
        NORMAL: e.base[0],
        SATELLITE: e.base[1],
        TERRAIN: e.base[2],
        SMARTMAP: e.base[3],
        SMART_PT: e.base[4],
        TRAFFIC: e.base[5],
      };
      e.constants.TRAFFIC.minDataZoomLevel = 6;
      e.constants.TRAFFIC.maxDataZoomLevel = 20;
      e.constants.SMART_PT.minDataZoomLevel = 10;
      e.constants.SMART_PT.maxDataZoomLevel = 20;
      nokia.maps.Config.setDefaultsNS("map.tileprovider", {
        "ovi.url": ".maptile.maps.svc.ovi.com/maptiler/v2/maptile/newest/",
        "ovi.mrs.url": ".mrsmon.lbs.ovi.com/maptiler/v2/traffictile/newest/",
        "ovi.urlPrefix": "http://",
        "ovi.mrs.urlPrefix": "http://",
      });
    })();
    ovi.provide("nokia.maps.map.js.Display");
    (function () {
      var f = nokia.maps,
        e = f.geo,
        c = e.BoundingBox,
        b = f.map,
        a = b.Container,
        g = b.Object.sortByZInfo,
        d = b.js.ObjTileProvider,
        i = f.util,
        j = i.ApplicationContext.defaultLanguage.indexOf("zh")
          ? ""
          : " GS(2011)6015\u53f7",
        h = i.lb,
        m = i.now,
        l = i.Point,
        m = i.now,
        k = Math.round,
        n = ovi.buildNS(f.config.tileProviders),
        p = b.js.Animate,
        o = ovi.Array,
        q = (nokia.maps.map.js.Display = new ovi.Class({
          Extends: nokia.maps.map.Display,
          initialize: function (a, b) {
            this.availableBaseMapTypes = new i.OList(n.base);
            this.availableOverlays = new i.OList(n.overlay);
            this.doc = a.ownerDocument;
            this.fb = new e.QuadTree(this.Fi);
            this.hh = {};
            this._super(a, b);
            !this.H && (this.H = new p(this));
            this.animation.add("constantvelocity");
            this.animation.add("constanttime");
            this.tb = ovi.bind(this, this.tb);
            this.overlays.addObserver(this.fm, this);
          },
          Fi: 18,
          Ee: 0,
          Ro: 0,
          To: 1,
          ms: 1,
          tn: function () {
            var a = this.sd,
              b = this.baseMapType,
              c = b.width,
              e = b.height;
            if (
              !a ||
              a.width !== c ||
              a.height !== e ||
              a.projection !== b.projection
            )
              a && a.destroy(),
                (this.sd = new d(this, this.fb, {
                  width: c,
                  height: e,
                  projection: b.projection,
                  max: 30,
                }));
          },
          Ha: new i.Point(0, 0),
          marginSetter: function (a) {
            this.margin = a = +a || 0;
            this.Ha = new i.Point(a, a);
            this.update();
            return a;
          },
          baseMapTypeSetter: function (a) {
            this.tn();
            this.set("maxZoomLevel", a.max);
            this.set("minZoomLevel", a.min);
            this.set("zoomLevel", this.zoomLevelSetter(this.zoomLevel));
            this.baseMapType &&
              this.baseMapType.removeListener("invalidate", this.tb);
            a.addListener("invalidate", this.tb);
            return a;
          },
          tb: function (a) {
            this.cm(a.target, a.boundingBox);
            this.update();
          },
          zoomLevelSetter: function (a) {
            isNaN((a = k(h(a, this.minZoomLevel, this.maxZoomLevel)))) &&
              i.f("zoomLevel");
            this.Pb = this.baseMapType.Ad[a];
            this.zoomLevel !== a && (this.bn(a), this.gi());
            return a;
          },
          tiltSetter: function (a) {
            return h(a, this.minTilt, this.maxTilt);
          },
          headingSetter: function (a) {
            isNaN(+a) && i.f("heading");
            if ((a %= 360) < 0) a += 360;
            return (a = k(h(a, this.minHeading, this.maxHeading)));
          },
          destroy: function () {
            this.H && this.H.destroy();
            this._super();
          },
          getObjectAt: function (a, b) {
            return this.getObjectsAt(a, b, 1)[0];
          },
          getObjectsWithin: function (a, b, d, e) {
            return this.$g(new c(this.pixelToGeo(a, b), this.pixelToGeo(d, e)));
          },
          $g: function (a, b) {
            for (
              var c = this.fb.intersectBoundingBox(a, 1), d = c.length, e;
              d--;

            )
              c[d] = c[d].Hc;
            c = g(c, this, b);
            e = this.Ic.N.intersectBoundingBox(a, 1);
            for (d = e.length; d--; ) e[d] = e[d].Hc;
            e = g(e, this, b, 1);
            return c.concat(e);
          },
          Be: function (b) {
            return !(b instanceof a);
          },
          ne: function (a, b) {
            this._super(a, b);
            this.Be(b) && this.Mb(b, null, null, 0, 1);
          },
          Rd: function (a) {
            this.Be(a) && this.Mb(a, null, null, 0, -1);
            this._super(a);
          },
          Mb: function (a, b, c, d, e) {
            var b = a.Kf,
              f,
              c = this.hh,
              h,
              g;
            if (this.Be(a)) {
              g = a.If = m();
              (f = c[a.d]) ? (d = f[1] |= d) : (c[a.d] = [a, d]);
              if (d & this.CHANGE_SPATIAL || e)
                e !== 1 && (b ? this.$m(a) : this.Ym(a)),
                  e !== -1 && (b ? this.Lk(a) : this.Kk(a));
              if (b) {
                if (((this.Ee = g), e !== 1))
                  for (h in ((d = a.B[this.d].Ue), d)) d[h].Pg(a);
              } else this.am(a, d, g, e);
              this.update();
            } else
              for (h = a.objects.getLength(); h--; )
                this.Mb(a.objects.get(h), null, null, 2, 0);
          },
          Lk: function (a) {
            var b = a.getBoundingBox();
            if (b) (a.B[this.d].ee = this.fb.insertBoundingBox(b)).Hc = a;
          },
          $m: function (a) {
            var a = a.B[this.d],
              b = a.ee;
            if (b) this.fb.remove(b), (a.ee = null);
          },
          getCopyright: function () {
            var a = this.getViewBounds(),
              b = this.zoomLevel,
              c = [this.baseMapType].concat(this.overlays.asArray()),
              d = c.length,
              e = 0,
              f = [];
            if (a)
              for (; e < d; e++)
                c[e] instanceof nokia.maps.map.js.TileProvider &&
                  (f = f.concat(c[e].getCopyrights(a, b)));
            for (e = f.length; e--; ) f[e] = f[e].label + (e ? "" : j);
            return f.join(", ");
          },
          setZoomLevel: function (a, b, c, d) {
            var e,
              f,
              g = this.padding,
              j;
            if (isNaN((a = k(h(a, this.minZoomLevel, this.maxZoomLevel)))))
              i.f("zoomLevel");
            else if (
              this.zoomLevel !== a &&
              (c !== void 0 &&
                ((e = this.pixelToGeo(c, d)), (f = this.tc((j = new l(c, d))))),
              !e || (e && f.y >= 0 && f.y <= 1))
            )
              (this.Pm = j),
                this.H &&
                  this.H.isCSS3Capable &&
                  b &&
                  b !== "none" &&
                  this.H.zoom(a, null, b, c, d),
                this.set("zoomLevel", a),
                e &&
                  ((a = this.geoToPixel(e)),
                  this.setCenter(
                    this.pixelToGeo(
                      (this.j.x + g.left - g.right) / 2 + a.x - c,
                      (this.j.y + g.top - g.bottom) / 2 + a.y - d
                    )
                  )),
                this.update(-1, 1);
          },
          setAttributes: function (a, b, c, d, e) {
            if (
              c &&
              c > this.minZoomLevel &&
              c < this.maxZoomLevel &&
              c !== this.zoomLevel &&
              (!b || this.center.equals(b)) &&
              !d &&
              !e &&
              a &&
              a !== "none"
            )
              this.H && this.H.zoom(c, b, a);
            else if (
              !b ||
              this.center.equals(b) ||
              !a ||
              !(
                a !== "none" &&
                (!c || c === this.zoomLevel) &&
                this.H &&
                this.H.pan(b)
              )
            )
              b !== void 0 && this.set("center", b),
                c !== void 0 && this.set("zoomLevel", c),
                d !== void 0 && this.set("tilt", d),
                e !== void 0 && this.set("heading", e),
                this.update(-1, 1);
          },
          fm: function (a, c, d) {
            var e;
            if (
              c === "add" &&
              (!(d instanceof b.Provider) ||
                o.indexOf((e = a.asArray()), d) !== o.lastIndexOf(e, d))
            )
              return 1;
            d instanceof f.map.overlay.TrafficIncidents ||
              (c === "add"
                ? d.addListener("invalidate", this.tb)
                : d.removeListener("invalidate", this.tb));
          },
        }));
      i.flatMerge(q.prototype, n.constants);
    })();
    ovi.provide("nokia.maps.map.js.p2d.Display");
    (function () {
      var f = ovi.browser.msie ? 300 : 150,
        e = nokia.maps,
        c = e.dom,
        b = e.util,
        a = b.Coroutine,
        g = b.Oe,
        d = b.Point,
        i = e.map,
        j = e.geo.BoundingBox,
        e = Math,
        h = e.round,
        m = e.max,
        l = e.ceil,
        k = e.log,
        n = e.LN2,
        p = new d(0, 0),
        o = i.js.p2d.Animate;
      nokia.maps.map.js.p2d.Display = new ovi.Class({
        Extends: nokia.maps.map.js.Display,
        initialize: function (a, b) {
          var d = this,
            e;
          d.Yb = a.ownerDocument;
          d.dl(a);
          (d.vb = c.ha(d.Fc, "div")).style.cssText = "position:relative;";
          d.Ga = p;
          d.Mh = p;
          d.cf = {};
          if (!this.kj) d.Ba = d.Vh(d);
          b = b || {};
          b.components && (e = b.components.splice(0));
          d._super(a, b);
          d.addListener("resize", function () {
            d.Qd();
          });
          d.Qd(1, 1);
          d.addObserver("padding", d.Dm);
          d.addObserver("center", function (a) {
            a.eb(1);
          });
          d.addObserver("zoomLevel", function (a) {
            a.eb(2);
          });
          d.addObserver("heading", function (a) {
            a.eb(4);
          });
          d.addObserver("tilt", function (a) {
            a.eb(8);
          });
          !d.H && (d.H = new o(d));
          e && (b.components.concat(e), d.set("components", e));
        },
        na: p,
        j: p,
        Xc: p,
        jg: null,
        Vh: a.create(
          "nokia.maps.map.js.p2d.Display#_renderCo",
          function (b, c) {
            var d = b.that,
              e = c.callTime,
              h = 0,
              g;
            if (!b.update && (d.cj(), !b.update)) return a.wait(d.cf);
            if (!b.nextFull) b.nextFull = e + 500;
            if (!b.nextQuick) b.nextQuick = e + f;
            if (e > b.nextFull)
              d.ca(1), (b.update = b.nextFull = b.nextQuick = 0);
            else if (e > b.nextQuick) d.ca(), (b.nextQuick = 0);
            b.nextFull && (h = b.nextFull - e);
            if (b.nextQuick && (g = b.nextQuick - e) && (h === 0 || h > g))
              h = g + 1;
            if (h) return a.sleep(h);
            return a.sleep(f);
          },
          "that"
        ),
        update: function (c, d) {
          var e,
            h = this.Ba.scope;
          e = !d;
          if ((c = +c) !== c) (h.update = 1), a.signal(this.cf);
          else if (c <= 0) this.ca(e);
          else {
            e = b.now() + (d ? (c > f ? f : c) : c > 500 ? 500 : c);
            if (d && (!h.nextQuick || h.nextQuick > e)) h.nextQuick = e;
            else if (!d && (!h.nextFull || h.nextFull > e)) h.nextFull = e;
            h.update = 1;
            a.signal(this.cf);
          }
          return this;
        },
        destroy: function () {
          this.baseMapTypeSetter();
          a.kill(this.Ba);
          this._super();
        },
        Qd: function (a, b) {
          var c = this.C,
            c = new d(c.offsetWidth, c.offsetHeight),
            e,
            f;
          if (a || !c.equals(this.j))
            this.T("width", c.x),
              this.T("height", c.y),
              (e = this.padding),
              (c = this.Xc =
                (this.j = c)
                  .add({ x: e.left - e.right, y: e.top - e.bottom })
                  .divide(2)
                  .round()),
              (b = b || this.fixedCenter) || (f = this.pixelToGeo(c.x, c.y)),
              this.gi(),
              this.fi(this.centerSetter(b ? this.center : f)),
              this.eb(16),
              this.update();
        },
        Dm: function (a) {
          a.Qd(1);
        },
        baseMapTypeSetter: function (a) {
          if (a) (this.baseMapType = a), this._super(a);
          return a;
        },
        tc: function (a, b) {
          a = this.Pb.pixelToPoint(a.sub(this.na)).add(this.Ga);
          if (b) a.x = g(a.x, 1);
          return a;
        },
        Tp: function (a, b) {
          return this.Pb.pointToPixel(this.tc(new d(a, b), 1)).round();
        },
        lm: function (a, b) {
          var c = this.Pb,
            d = c.pointToPixel(a.sub(this.Ga)).floor().add(this.na);
          d.x += h(this.Ga.x - (b || a).x) * c.w;
          return d;
        },
        centerSetter: function (a) {
          a = this._super(a);
          this.Ga = this.baseMapType.projection.geoToPoint(a);
          this.na = this.Xc;
          this.update();
          return a;
        },
        gk: function (a) {
          var b = this.vb.style,
            a = (this.Mh = a ? this.Mh.add(a) : this.Ha.multiply(-1));
          b.left = a.x + "px";
          b.top = a.y + "px";
        },
        pan: function (a, b, c, e, f) {
          if (a - c || b - e) {
            var h = this.padding,
              i = this.width - h.left - h.right,
              k = this.height - h.top - h.bottom,
              a = new d(a - c, b - e),
              h = this.pixelToGeo(i / 2 + h.left - a.x, k / 2 + h.top - a.y);
            if (!f || !(f !== "none" && this.H && this.H.pan(h)))
              (f = this.Ga = this.Ga.sub(this.Pb.pixelToPoint(a))),
                (f.x = g(f.x, 1)),
                this.gk(a),
                this.fi(),
                this.Ef(),
                this.update();
          }
        },
        fi: function () {
          var a = this.center,
            b = this.baseMapType.projection.pointToGeo(this.tc(this.Xc));
          if (!b.equals(a)) this.af("center", (this.center = b), a);
        },
        setCenter: function (a, b) {
          b && b !== "none" && this.H ? this.H.pan(a) : this.set("center", a);
        },
        getBestZoomLevel: function (a) {
          var c = this.minZoomLevel,
            d = this.maxZoomLevel,
            e = d,
            f,
            h,
            g = this.padding,
            i = this.width,
            j = this.height,
            o = a.length,
            p = this.baseMapType.Ad[d];
          for (isNaN(o) && b.f(); o-- && e; )
            (h = a[o]),
              (f = p.geoToPixel(h.topLeft)),
              (h = p.geoToPixel(h.bottomRight)),
              f.equals(h) && (h.x++, h.y++),
              (f =
                d -
                l(
                  m(
                    k(f.x > h.x ? f.x + h.x - i : h.x - f.x) / n -
                      k(i - g.left - g.right) / n,
                    k(h.y - f.y) / n - k(j - g.top - g.bottom) / n
                  )
                )),
              f < e && (e = f);
          return m(e, c);
        },
        zoomTo: function (a, b) {
          var c;
          b ? (a = a.resizeToCenter((c = this.center))) : (c = a.getCenter());
          this.setZoomLevel(this.getBestZoomLevel([a]), "none");
          !b && this.set("center", c);
        },
        getViewBounds: function (a) {
          var a = a || this.padding,
            b = this.j,
            c = a.top,
            d = a.left,
            e = b.y - a.bottom,
            a = b.x - a.right;
          if (d > a) d = a = this.na.x;
          if (c > e) c = e = this.na.y;
          c = this.pixelToGeo(d, c);
          e = this.pixelToGeo(a, e);
          return a - d < this.baseMapType.width * (1 << this.zoomLevel)
            ? new j(c, e)
            : j.fromObject([c.latitude, -180, e.latitude, 180]);
        },
        geoToPixel: function (a) {
          return this.lm(this.baseMapType.projection.geoToPoint(a));
        },
        pixelToGeo: function (a, b) {
          return this.baseMapType.projection.pointToGeo(this.tc(new d(a, b)));
        },
        setTilt: function (a) {
          this.set("tilt", a);
        },
        gi: function (a) {
          a = a || this.Xc;
          this.Ga = this.tc(a);
          this.na = a;
        },
        setHeading: function (a) {
          this.set("heading", a);
        },
      });
    })();
    ovi.provide("nokia.maps.map.js.p2d.canvas.Display");
    (function () {
      var f = Math.PI / 180,
        e = Math,
        c = e.abs,
        b = e.max,
        a = e.sqrt,
        g = e.ceil,
        d = e.round,
        i = nokia.maps,
        j = i.util,
        h = j.lb,
        m = j.Point,
        l = j.Coroutine,
        e = j.Strip,
        k = j.Matrix3D,
        n = new k(),
        p = i.gfx,
        o = p.GraphicsImage,
        q = p.BitmapImage,
        r = p.CanvasPainter,
        p = i.geo,
        s = p.mercator,
        w = p.Coordinate,
        u = p.BoundingBox,
        v = p.QuadTree,
        p = i.map,
        x = p.Object.sortByZInfo,
        z = p.js.p2d.canvas,
        E = z.Tile,
        G = z.TileComposition,
        L = i.dom.Page,
        F = L.browser.mobile,
        B = F ? 9 : 34;
      new m(0, 0);
      var K = Date.now,
        i = new e(["latitude", "longitude"]);
      new e(["latitude", "longitude", "altitude"]);
      new e(["x", "y"]);
      var y = [
          [1, 0],
          [0, 1],
          [-1, 0],
          [0, -1],
        ],
        A = e.stencil(i, [0, 0]),
        O = [],
        N = { x: 0, y: 0 },
        e = (z.Display = new ovi.Class({
          Extends: nokia.maps.map.js.p2d.Display,
          initialize: function (a, b) {
            this.vf = !0;
            this.update = j.Q;
            this.yf = { length: 0 };
            var c = this;
            this.zIndexSortComparator = function (a, b) {
              for (
                var d = a.ja(c),
                  e = b.ja(c),
                  f = d.length,
                  h = e.length,
                  g = f < h ? f : h,
                  i = 0,
                  k;
                i < g;
                i++
              )
                if ((k = d[i] - e[i])) return k;
              return f - h;
            };
            this.Me = {};
            this.Nu = new v();
            this.mm = {};
            this.wu = function () {
              this.bj(1);
            };
            if (b && b.components) {
              var d = b.components;
              delete b.components;
            }
            this.fadingSetter(this.fading);
            this._super(a, b);
            this.H = null;
            var e = (this.Iu = L(this.Yb)),
              f = this.padding,
              h = (this.Tu = e.createElement({
                tagName: "DIV",
                name: "viewportNode",
                style: {
                  position: "absolute",
                  top: f.top + "px",
                  left: f.left + "px",
                  right: f.right + "px",
                  bottom: f.bottom + "px",
                  overflow: "visible",
                  display: "block",
                },
              })),
              f = (this.qu = e.createElement({
                tagName: "DIV",
                name: "centerNode",
                style: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "0px",
                  height: "0px",
                  overflow: "visible",
                  display: "block",
                },
              })),
              e = (this.qj = e.createElement({
                tagName: "DIV",
                name: "mapSurface",
                style: {
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "0px",
                  height: "0px",
                  overflow: "visible",
                  display: "block",
                },
              }));
            h.appendChild(f);
            f.appendChild(e);
            if (this.use3D)
              var g = "0px 0px 0px",
                i = "translate3d(0px,0px,0px)",
                l = "flat";
            else (g = "0px 0px"), (i = "translate(0px,0px)"), (l = "flat");
            this.cssTransformOrigin(e, g);
            this.cssTransform(e, i);
            this.cssTransformStyle(e, l);
            this.cssTransformOrigin(f, g);
            this.cssTransform(f, i);
            this.cssTransformStyle(f, l);
            this.cssTransformOrigin(h, g);
            this.cssTransform(h, i);
            this.cssTransformStyle(h, l);
            this.Fc.appendChild(h);
            this.mo = new r();
            this.Sp = new k();
            this.vk = new k();
            this.jc = new G();
            A.data.length = O.length = 0;
            A.data[0] = this.center.latitude;
            A.data[1] = this.center.longitude;
            this.Ca = s.geoToMapPoints(A, []);
            this.kc = this.zoomLevel;
            f = 22 - this.zoomLevel;
            this.Xk = [this.Ca[0] >> f, this.Ca[1] >> f];
            this.vs = this.Ca.slice(0, 2);
            this.om = this.Xk.slice(0, 2);
            this.Vd = !1;
            this.pm = this.qm = 0;
            this.Pb = this.baseMapType.Ad[this.zoomLevel];
            this.addObserver("padding", function (a, b, c) {
              b = h.style;
              b.left = c.left + "px";
              b.top = c.top + "px";
              b.bottom = c.bottom + "px";
              b.right = c.right + "px";
              a.Vd = !0;
              a.update();
            });
            this.vb.parentNode.removeChild(this.vb);
            this.xf = {};
            this.wf = [];
            f = this.overlays.asArray();
            for (e = 0; e < f.length; e++)
              f[e] instanceof nokia.maps.map.js.TileProvider &&
                (this.wf.push(f[e]), (this.xf[f[e].id] = f[e]));
            this.overlays.addObserver(this.Us, this);
            this.wf.unshift(this.baseMapType);
            this.xf[this.baseMapType.id] = this.baseMapType;
            this.addObserver("baseMapType", this.Pq, this);
            this.qk = this.Yt();
            this.si = this.cu();
            this.Ba = this.Vh();
            this.Ba.onError = function () {
              this.Vd = !0;
              return null;
            };
            this.setMapView(this.Ca[0], this.Ca[1], this.zoomLevel);
            this.set("center", this.center);
            this.vf = !1;
            this.sd.ej = 1;
            this.Ba.run(!0, !0);
            d && this.set("components", d);
            this.eb(23);
            this.Eg && this.Eg.Yd();
            delete this.update;
          },
          hm: K(),
          jd: K(),
          Mf: 0,
          Hi: !1,
          bp: 1,
          pm: 0,
          qm: 0,
          minHeading: 0,
          maxHeading: 0,
          use3D: L.browser.webkit ? !0 : !1,
          use2D:
            L.browser.opera || L.browser.webkit || L.browser.msie ? !1 : !0,
          kj: !0,
          Wg: !1,
          mapPointToTileId: function (a, b, c, d) {
            d = !d ? 30 - c : 8;
            return c + "_" + (b >> d) + "_" + (a >> d);
          },
          iconToTileIds: function (c, d, e, f, h, i) {
            var k = i.x,
              j = i.y,
              l = 1 << e,
              m = l + 2,
              n = c - k,
              f = c + f - i.x,
              h = d + h - i.y,
              n = f - c,
              f = h - d,
              h = a(k * k + j * j),
              n = a(n * n + f * f),
              i = g(b(h, n)),
              k = [],
              j = 256 << e,
              q,
              n = c - i,
              f = (c + i) | 255,
              h = (d + i) | 255,
              c = n;
            for (d -= i; d <= h; ) {
              for (; c <= f; )
                (i = d > 0 ? (d >> 8) % m : -1),
                  (q = c > 0 ? (c >> 8) % l : ((j + c) >> 8) % l),
                  k.push(e + "_" + i + "_" + q),
                  (c += 256);
              c = n;
              d += 256;
            }
            return k;
          },
          Us: function (a, b, c) {
            if (c instanceof nokia.maps.map.js.TileProvider) {
              var d,
                a = this.wf,
                e = this.xf,
                f = c.id,
                h = this.yf,
                g = h[f],
                i;
              if (b === "add") (e[f] = c), a.push(c);
              else {
                if (g) {
                  d = this.jc.tiles;
                  for (i = d.length; i--; )
                    (b = d[i]),
                      b.tileProviderLoadState[f] &&
                        delete b.tileProviderLoadState[f],
                      b.tileProviderRenderState[f] &&
                        delete b.tileProviderRenderState[f],
                      (b.render = !0);
                  h.length -= g.length;
                  delete h[f];
                }
                delete e[f];
                for (i = a.length; i--; )
                  if (a[i] === c) {
                    a.splice(i, 1);
                    break;
                  }
              }
              this.update();
            }
          },
          Pq: function (a, b, c, d) {
            this.yf[d.id] &&
              ((this.yf.length -= this.yf[d.id].length), delete this.yf[d.id]);
            delete this.xf[d.id];
            this.wf[0] = c;
            this.xf[c.id] = c;
            a = this.jc.tiles;
            for (c = a.length; c--; )
              (b = a[c]),
                delete b.tileProviderLoadState[d.id],
                delete b.tileProviderRenderState[d.id],
                (b.render = !0);
            this.update();
          },
          er: function (b, c, d) {
            var e = this.width,
              f = this.height,
              h = this.Yb,
              i = 30 - d;
            b >>= i;
            c >>= i;
            var k,
              e = ((this.Mf ? (k = g(a(e * e + f * f))) : e) + 511) >> 9,
              j = ((this.Mf ? k : f) + 511) >> 9,
              f = 0;
            k = new G([], c, b);
            var i = b - e,
              l = b + e,
              m = c - j,
              n = c + j;
            k.addTile(new E(d, c, b, h, this));
            for (
              var q = 0,
                o = 0,
                p = 0,
                r = 1,
                f = 0,
                e = e > j ? (e << 1) + 1 : (j << 1) + 1,
                e = e * e - 1;
              f++ < e;

            )
              (b += y[q][0]),
                (c += y[q][1]),
                b >= i &&
                  b <= l &&
                  c >= m &&
                  c <= n &&
                  k.addTile(new E(d, c, b, h, this)),
                ++p === r &&
                  ((p = 0), ++q === 4 && (q = 0), ++o === 2 && ((o = 0), r++));
            return k;
          },
          normalizeMapPoints: function (a, b, c) {
            for (
              var c = c || [],
                d = 0,
                b = 256 << (b === void 0 ? 22 : b),
                e = b - 1,
                f,
                h,
                g = a.length;
              d < g;

            )
              (c[d] = (f = a[d] % b) < 0 ? f + b : f),
                d++,
                (c[d] = (h = a[d]) < 0 ? 0 : h >= b ? e : h),
                d++;
            c.length = d;
            return c;
          },
          setMapView: function (a, b, d) {
            var e = !1,
              f = this.vs,
              h = this.om,
              g = this.Ca,
              i = this.Xk,
              k = 22 - d;
            g[0] = a;
            g[1] = b;
            this.normalizeMapPoints(g, 22, g);
            i[0] = a >> k;
            i[1] = b >> k;
            a = this.er(g[0], g[1], d);
            b = a.tiles[0];
            g = h[0] - i[0];
            k = h[1] - i[1];
            if (this.kc !== d || c(g) >= 16384 || c(k) >= 16384)
              (e = !0),
                (this.kc = d),
                (f[0] = b.leftMP),
                (f[1] = b.topMP),
                (h[0] = b.leftSMP),
                (h[1] = b.topSMP),
                (g = h[0] - i[0]),
                (k = h[1] - i[1]);
            this.transform(g, k);
            i = this.jc.tiles;
            d = i.length;
            for (f = 0; f < d; f++)
              (b = i[f]),
                a.replaceTile(b) ? (b.isPositioned = !e) : b.release();
            e = a.tiles;
            d = e.length;
            for (f = 0; f < d; f++)
              (i = e[f]),
                i.isPositioned ||
                  i.setTopLeft(i.leftSMP - h[0], i.topSMP - h[1]);
            this.jc = a;
            this.Vd = !1;
            this.hm = K();
            this.update();
          },
          Yt: l.createEx(
            "nokia.maps.map.js.p2d.dom.canvas.Display#_tileLoadingCo",
            function (a, b) {
              if (!a.hasOwn("updateQueue"))
                (a.updateQueue = []), (a.qaAnyTileLoaded = !1);
              var c = this.jc,
                d,
                e,
                f,
                h;
              h = this.yf;
              var g,
                i = this.wf,
                k = this.xf,
                j,
                m,
                n,
                q,
                o = a.updateQueue;
              if (this.vq(o)) {
                for (j in h)
                  if (j !== "length" && ((g = h[j]), (m = k[j]), g && g.length))
                    for (q = g.length; q--; )
                      (d = g[q]),
                        c.hasTile(d) ||
                          (m.cancel(m.createId(d.zoomLevel, d.row, d.col)),
                          delete d.tileProviderLoadState[m.id],
                          g.splice(q, 1),
                          h.length--);
                if (l.shallYield()) return l.yield();
              }
              this.Hi = o.length === 0;
              if (!this.Hi) {
                k = i.length;
                for (q = 0; q < k; q++) {
                  m = i[q];
                  j = m.id;
                  g = h[j] || (h[j] = []);
                  for (c = 0; c < o.length; c++)
                    if (
                      ((d = o[c]),
                      (e = d.tileProviderLoadState),
                      (f = d.tileProviderRenderState),
                      (n = m.request(
                        d.zoomLevel,
                        d.row,
                        d.col,
                        !0,
                        b.timeStamp
                      )),
                      n === !0)
                    )
                      e[j] || (e[j] = "loading");
                    else if (n) {
                      if (f[j] !== 2) (d.render = !0), l.resume(this.Ba);
                      e[j] = "loaded";
                      if ((d = g.indexOf(d)) >= 0) g.splice(d, 1), h.length--;
                    } else if (!e[j] && h.length < B)
                      if (
                        ((n = m.request(
                          d.zoomLevel,
                          d.row,
                          d.col,
                          !1,
                          b.timeStamp
                        )),
                        n === !0)
                      )
                        (a.qaAnyTileLoaded = !0),
                          (e[j] = "loading"),
                          g.indexOf(d) == -1 && (g.push(d), h.length++);
                      else if (n) {
                        if (((e[j] = "loaded"), f[j] !== 2))
                          (d.render = !0), l.resume(this.Ba);
                      } else if (((e[j] = "na"), f[j] === 1))
                        (d.render = !0), l.resume(this.Ba);
                }
                for (c = 0; c < o.length; c++) {
                  d = o[c];
                  e = d.tileProviderLoadState;
                  h = !0;
                  for (q = 0; q < k; q++)
                    if (
                      ((m = i[q]),
                      (j = m.id),
                      e[j] !== "na" && e[j] !== "loaded")
                    ) {
                      h = !1;
                      break;
                    }
                  h && o.splice(c--, 1);
                }
                if (l.shallYield()) return l.yield();
              }
              if (o.length) return l.sleep(50);
              this.Hi = !0;
              if (this.Vd) return l.sleep();
              if (this.qaOnLoad) {
                try {
                  this.qaOnLoad(this.zoomLevel, a.qaAnyTileLoaded);
                } catch (p) {}
                a.qaAnyTileLoaded = !1;
              }
              return l.sleep();
            },
            {}
          ),
          vq: function (a) {
            if (!a.lastSetMapView) (a.lastSetMapView = 0), (a.lastUpdate = 0);
            if (a.lastSetMapView < this.hm || a.lastUpdate < this.jd)
              return (
                (a.lastSetMapView = this.hm),
                (a.lastUpdate = this.jd),
                (a.length = 0),
                a.push.apply(a, this.jc.tiles),
                !0
              );
            return !1;
          },
          cu: l.createEx(
            "nokia.maps.map.js.p2d.canvas.Display#_updateCo",
            function (a) {
              var b = !1,
                c,
                d,
                e;
              if (!a.hasOwn("updateQueue")) a.updateQueue = [];
              a = a.updateQueue;
              this.vq(a);
              try {
                for (e = 0; e < a.length; e++)
                  if (((c = a[e]), c.render)) a.splice(e--, 1);
                  else {
                    d = this.sd.request(c.zoomLevel, c.row, c.col, !1, this.Ee);
                    if (d !== !0) {
                      if (d) {
                        if (!c.renderTime || (d && c.renderTime < this.Ee))
                          (c.render = !0), (b = c.containsSpatialObjects = !0);
                      } else if (c.containsSpatialObjects)
                        (c.render = !0),
                          (c.containsSpatialObjects = !1),
                          (b = !0);
                      a.splice(e--, 1);
                    }
                    if (l.shallYield()) return l.yield();
                  }
              } finally {
                b && l.resume(this.Ba);
              }
              if (a.length) return l.sleep(50);
              return l.sleep();
            },
            { useAnimationFrame: !0 }
          ),
          pt: function (a, b, c) {
            var d = 0,
              e = 0,
              f = 256,
              h = a.zoomLevel,
              g = a.row,
              i = a.col,
              k,
              j = a.getContext();
            if (h < b.min) return -1;
            for (; h >= b.min && f >= 64; ) {
              if ((k = b.request(h, g, i, !0, c)) && k !== !0) {
                j.save();
                try {
                  (j.globalAlpha = b.opacity),
                    j.drawImage(k.getNode(), d, e, f, f, 0, 0, 256, 256);
                } catch (l) {}
                j.restore();
                return h === a.zoomLevel ? 2 : 1;
              }
              if (!b.scalable) break;
              d = (d >> 1) + ((i & 1) << 7);
              e = (e >> 1) + ((g & 1) << 7);
              h--;
              f >>= 1;
              g >>= 1;
              i >>= 1;
            }
            return 0;
          },
          forceTileRender: function () {
            this.Wg = !0;
            try {
              this.Ba.run(!0, !0);
            } catch (a) {}
            this.Wg = !1;
          },
          Vh: l.createEx(
            "nokia.maps.map.js.p2d.canvas.Display#_renderCo",
            function (a, b) {
              var c = this.wf,
                d,
                e = this.jc.tiles,
                g = 0,
                i,
                k = 1,
                j,
                m,
                n,
                p,
                r,
                w,
                u;
              if (!a.hasOwn("nextSetMapView")) a.nextSetMapView = 0;
              if (
                this.Vd &&
                a.nextSetMapView <= b.timeStamp &&
                (this.setMapView(this.Ca[0], this.Ca[1], this.kc),
                (a.nextSetMapView = b.timeStamp + (L.browser.ipad ? 750 : 250)),
                (this.Vd = !1),
                l.resume(this.qk),
                (e = this.jc.tiles),
                l.shallYield())
              )
                return l.yield();
              for (this.rendering = !0; k < 8; ) {
                w = 0;
                for (u = e.length; w < u; w++) {
                  i = e[w];
                  if (i.render)
                    (i.rendering = !0),
                      (i.render = !1),
                      (i.renderTime = b.timeStamp),
                      (i.Jn = 0),
                      (i.eq = 0),
                      (i.nm = 0);
                  if (i.rendering)
                    try {
                      a.mapViewChangeEndTime = 0;
                      if (k === 1 || i.renderPhase >= 1)
                        for (i.renderPhase |= 1; i.Jn < c.length; ) {
                          d = c[i.Jn];
                          i.Jn++ === 0 &&
                            i.getContext().clearRect(0, 0, 256, 256);
                          i.tileProviderRenderState[d.id] = this.pt(
                            i,
                            d,
                            b.timeStamp
                          );
                          if (this.Wg) break;
                          if (l.shallYield()) return l.yield();
                        }
                      if (this.Wg) continue;
                      if (l.shallYield()) return l.yield();
                      if (k === 2 || i.renderPhase >= 2)
                        if (
                          ((i.renderPhase |= 2), (r = i.getContext()), !i.eq)
                        ) {
                          j = this.sd.request(
                            i.zoomLevel,
                            i.row,
                            i.col,
                            !0,
                            this.Ee
                          );
                          if (j === !0) {
                            l.resume(this.si);
                            continue;
                          } else if (j && (m = j.getIDL()))
                            (i.containsSpatialObjects = !0),
                              r.save(),
                              this.mo.drawIDLToCanvas(m, r),
                              r.restore();
                          i.eq = 1;
                        }
                      if (l.shallYield()) return l.yield();
                      if (k === 4 || i.renderPhase >= 4) {
                        i.renderPhase |= 4;
                        if ((n = this.Me[i.zrcId]) && n.length) {
                          if (
                            n.unsorted &&
                            (n.sort(this.zIndexSortComparator),
                            delete n.unsorted,
                            l.shallYield())
                          )
                            return l.yield();
                          for (O.length = 0; i.nm < n.length; ) {
                            p = n[i.nm];
                            s.scaleMapPoints(
                              p.project(this.oc),
                              256 << this.kc,
                              O
                            );
                            r.save();
                            r.translate(-i.leftSMP, -i.topSMP);
                            r.translate(O[0], O[1]);
                            this.Mf && r.rotate(-this.Mf * f);
                            var v = p.getIconForRendering(this.Yb),
                              x,
                              y,
                              E,
                              B,
                              G = !0;
                            if (v instanceof q && v.state >= 0) {
                              if (v.state === 1)
                                try {
                                  (r.globalAlpha = v.opacity),
                                    +v.offsetX !== v.offsetX ||
                                    +v.offsetY !== v.offsetY
                                      ? r.drawImage(
                                          v.ka,
                                          0,
                                          0,
                                          v.naturalWidth,
                                          v.naturalHeight,
                                          -p.anchor.x,
                                          -p.anchor.y,
                                          v.width,
                                          v.height
                                        )
                                      : (E = h(+v.offsetX, 0, v.naturalWidth)),
                                    (B = h(+v.offsetY, 0, v.naturalHeight)),
                                    (x = h(+v.width, 0, v.naturalWidth - E)),
                                    (y = h(+v.height, 0, v.naturalHeight - B)),
                                    x &&
                                      y &&
                                      r.drawImage(
                                        v.ka,
                                        E,
                                        B,
                                        x,
                                        y,
                                        -p.anchor.x,
                                        -p.anchor.y,
                                        x,
                                        y
                                      ),
                                    (G = !1);
                                } catch (A) {}
                            } else if (v instanceof o && v.state >= 0) {
                              if (v.state === 1)
                                try {
                                  (r.globalAlpha = v.opacity),
                                    r.translate(-p.anchor.x, -p.anchor.y),
                                    this.mo.drawIDLToCanvas(v.getIDL(), r),
                                    (G = !1);
                                } catch (K) {}
                            } else G = !1;
                            r.restore();
                            if (G) break;
                            if (++i.nm % 5 === 0 && l.shallYield())
                              return l.yield();
                          }
                        }
                        i.rendering = !1;
                        i.renderPhase |= 8;
                      }
                    } finally {
                      (z = i.getCanvas()).parentNode || this.qj.appendChild(z);
                    }
                  i.rendering === !1 && g++;
                  if (l.shallYield()) return l.yield();
                }
                k <<= 1;
              }
              if (this.Wg || l.shallYield()) return l.yield();
              if (g < e.length) return l.sleep(F ? 150 : 50);
              this.rendering = !1;
              if (a.mapViewChangeEndTime === 1.0e21)
                if (this.Td) a.mapViewChangeEndTime = 0;
                else return l.sleep();
              if (!this.Hi) return this.Ef(), l.sleep();
              if (!a.mapViewChangeEndTime)
                return (
                  (a.mapViewChangeEndTime = b.timeStamp + 500), l.sleep(500)
                );
              if (a.mapViewChangeEndTime <= b.timeStamp)
                this.Ef(!0), this.cj(), (a.mapViewChangeEndTime = 1.0e21);
              return l.sleep(
                (u = a.mapViewChangeEndTime) === 1.0e21
                  ? void 0
                  : u - b.timeStamp
              );
            },
            { useAnimationFrame: !0 }
          ),
          Qd: function () {
            this.na.x = this.width >> (1 + (this.width & 1));
            this.na.y = this.height >> (1 + (this.height & 1));
            this.j.x = this.width;
            this.j.y = this.height;
            if (this.Ba) (this.Vd = !0), this.update();
          },
          cssTransform: function (a, b) {
            var c = a.style;
            c.webkitTransform = b;
            c.MozTransform = b;
            c.mozTransform = b;
            c.oTransform = b;
            c.msTransform = b;
            c.transform = b;
          },
          cssTransformOrigin: function (a, b) {
            var c = a.style;
            c.webkitTransformOrigin = b;
            c.MozTransformOrigin = b;
            c.mozTransformOrigin = b;
            c.oTransformOrigin = b;
            c.msTransformOrigin = b;
            c.transformOrigin = b;
          },
          cssTransformStyle: function (a, b) {
            var c = a.style;
            c.webkitTransformStyle = b;
            c.MozTransformStyle = b;
            c.mozTransformStyle = b;
            c.oTransformStyle = b;
            c.msTransformStyle = b;
            c.transformStyle = b;
          },
          cssBackfaceVisibility: function (a, b) {
            var c = a.style;
            c.backfaceVisibility = b;
            c.MozBackfaceVisibility = b;
            c.webkitBackfaceVisibility = b;
            c.mozBackfaceVisibility = b;
            c.msBackfaceVisibility = b;
            c.oBackfaceVisibility = b;
          },
          transform: function (a, b, c, d) {
            this.pm = a = a === void 0 ? this.pm : a || 0;
            this.qm = b = b === void 0 ? this.qm : b || 0;
            this.Mf = c = c === void 0 ? this.Mf : c || 0;
            this.bp = d = d === void 0 ? this.bp : d || 1;
            this.Sp = n.rotateZ(-c * f);
            this.vk = n.rotateZ(c * f);
            if (this.use3D) {
              var e = -a + "px " + -b + "px 0px",
                h = "translate3d(" + a + "px," + b + "px,0px)";
              c && (h += " rotate3d(0, 0, 1, " + c + "deg)");
              d !== 1 && (h += " scale3d(" + d + "," + d + ",1)");
            } else
              this.use2D
                ? ((e = -a + "px " + -b + "px"),
                  (h = "translate(" + a + "px," + b + "px)"),
                  c && (h += " rotate(" + c + "deg)"),
                  d !== 1 && (h += " scale(" + d + "," + d + ")"))
                : ((c = this.qj.style),
                  (c.left = a + "px"),
                  (c.top = b + "px"));
            h &&
              (this.cssTransformOrigin(this.qj, e),
              this.cssTransform(this.qj, h));
          },
          centerSetter: function (a) {
            a = w.fromObject(a);
            if (!a) throw "Invalid coord value for center!";
            if (!this.vf)
              (A.data.length = 0),
                A.data.push(a.latitude, a.longitude),
                (O.length = 0),
                s.geoToMapPoints(A, O),
                this.setMapView(O[0], O[1], this.zoomLevel);
            return a;
          },
          headingSetter: function (a) {
            var b,
              c,
              a = this._super(a);
            if (!this.vf && a !== this.heading) {
              for (b = (c = this.jc.tiles).length; b--; ) c[b].render = !0;
              this.transform(void 0, void 0, a);
              this.setMapView(this.Ca[0], this.Ca[1], this.kc);
              this.forceTileRender();
            }
            return a;
          },
          zoomLevelSetter: function (a) {
            a = Math.round(a);
            if (a !== a) return this.zoomLevel;
            if (a < this.minZoomLevel) a = this.minZoomLevel;
            if (a > this.maxZoomLevel) a = this.maxZoomLevel;
            this.Pb = this.baseMapType.Ad[a];
            !this.vf &&
              this.kc !== a &&
              (this.setMapView(this.Ca[0], this.Ca[1], a),
              this.forceTileRender());
            return a;
          },
          mu: "#ffffff",
          pan: function (a, b, c, e) {
            a = this.vk.transformVector({ x: a, y: b, z: 0 });
            e = this.vk.transformVector({ x: c, y: e, z: 0 });
            c = d(e.x - a.x);
            e = d(e.y - a.y);
            if (c !== 0 || e !== 0) {
              var a = 22 - this.kc,
                b = this.Ca,
                f = this.Xk;
              b[0] += c << a;
              b[1] += e << a;
              f[0] = b[0] >> a;
              f[1] = b[1] >> a;
              this.normalizeMapPoints(b, 22, b);
              this.transform(
                this.om[0] - f[0],
                this.om[1] - f[1],
                void 0,
                void 0
              );
              A.data.length = 0;
              s.mapPointsToGeo(b, A);
              this.vf = !0;
              this.set("center", new w(A.data[0], A.data[1], 0, !0));
              this.vf = !1;
              this.Vd = !0;
              this.update();
            }
          },
          setZoomLevel: function (a, b, c, e) {
            isNaN((a = d(h(a, this.minZoomLevel, this.maxZoomLevel)))) &&
              j.f("zoomLevel");
            if (c || e)
              if (((c = +c), (e = +e), c === c && e === e))
                var f = this.pixelToMP(c, e);
            this.set("zoomLevel", a);
            f &&
              ((a = this.mpToPixel(f[0], f[1])),
              this.pan(0, 0, a.x - c, a.y - e));
          },
          setCenter: function (a) {
            this.set("center", a);
          },
          Kk: function () {},
          Ym: function () {},
          bm: 0,
          am: function (a, b, c, d) {
            this.bm++;
            try {
              var b = {},
                c = 0,
                e,
                f,
                h,
                g,
                i,
                k,
                j;
              if (d <= 0) {
                if ((e = this.mm[a.d]) && (i = e.length))
                  for (h = 0; h < i; h++)
                    if ((f = this.Me[(k = e[h])])) {
                      for (; (g = f.indexOf(a)) >= 0; )
                        (b[k] = !0), c++, f.splice(g, 1), (f.unsorted = !0);
                      f.length || delete this.Me[k];
                    }
                delete this.mm[a.d];
              }
              if (
                d >= 0 &&
                ((j = a.getIconForRendering(this.Yb)),
                this.bm &&
                  a.isVisible(this) &&
                  a.icon &&
                  a.icon.state !== void 0)
              ) {
                var l = a.project(this.oc),
                  m = l[0],
                  n = l[1],
                  q;
                this.mm[a.d] = e = [];
                for (h = 22; h >= 0; h--) {
                  q = this.iconToTileIds(m, n, h, j.width, j.height, a.anchor);
                  g = 0;
                  for (i = q.length; g < i; g++)
                    e.push((k = q[g])),
                      (b[k] = !0),
                      c++,
                      (f = this.Me[k] || (this.Me[k] = [])),
                      f.push(a),
                      (f.unsorted = !0);
                  m >>= 1;
                  n >>= 1;
                }
              }
              if (c) {
                var a = !1,
                  o = this.jc.tiles,
                  p;
                h = 0;
                for (i = o.length; h < i; h++)
                  if ((p = o[h]) && b[p.zrcId]) a = p.render = !0;
                a && this.update();
              }
            } finally {
              this.bm = 0;
            }
          },
          getObjectsAt: function (a, b, c) {
            var d = [],
              e = this.pixelToMP(a, b),
              f = this.mapPointToTileId(e[0], e[1], this.kc),
              h,
              g = this.Me[f],
              i = (g && g.length) || 0;
            i &&
              g.unsorted &&
              (g.sort(this.zIndexSortComparator), delete g.unsorted);
            for (; i--; )
              if (((h = g[i]), h.hitTest(this, a, b) && (d.push(h), c)))
                return d;
            f = f.split("_");
            this.pixelToMP();
            b = 22 - this.kc;
            a = (e[0] >> b) & 255;
            e = (e[1] >> b) & 255;
            if (
              (f = this.sd.request(f[0], f[1], f[2], !0)) &&
              f !== !0 &&
              (g = f.Nl(new m(a, e))) &&
              g.length
            )
              g.sort(this.zIndexSortComparator),
                g.reverse(),
                g.push.apply(d, g);
            return d;
          },
          destroy: function () {
            this.Ba = l.kill(this.Ba);
            this.qk = l.kill(this.qk);
            this.si = l.kill(this.si);
            this._super();
          },
          pixelToMP: function (a, b, c) {
            c = c || [];
            a = a === void 0 ? 0 : a - this.width / 2;
            b = b === void 0 ? 0 : b - this.height / 2;
            a = this.vk.transformVector({ x: a, y: b, z: 0 });
            b = 22 - this.kc;
            c[0] = this.Ca[0] + (d(a.x) << b);
            c[1] = this.Ca[1] + (d(a.y) << b);
            return c;
          },
          mpToPixel: function (a, b) {
            var c = 22 - this.kc,
              e = (a - this.Ca[0]) >> c,
              c = (b - this.Ca[1]) >> c,
              c = this.Sp.transformVector({ x: e, y: c, z: 0 }),
              e = d(c.x + this.width / 2),
              c = d(c.y + this.height / 2);
            return new m(e, c);
          },
          geoToPixel: function (a) {
            A.data.length = O.length = 0;
            A.data[0] = a.latitude;
            A.data[1] = a.longitude;
            s.geoToMapPoints(A, O);
            return this.mpToPixel(O[0], O[1]);
          },
          pixelToGeo: function (a, b) {
            s.mapPointsToGeo(this.pixelToMP(a, b), A);
            return new w(A.data[0], A.data[1], 0, !0);
          },
          getObjectsWithin: function (a, b, c, d) {
            return this.$g(
              this.getViewBounds({
                left: a,
                top: b,
                right: this.width - c,
                bottom: this.height - d,
              })
            );
          },
          $g: function (a, b) {
            for (
              var c = this.fb.intersectBoundingBox(a, 1), d = c.length;
              d--;

            )
              c[d] = c[d].Hc;
            var c = x(c, this, b),
              e = a.topLeft.longitude,
              f = a.topLeft.latitude,
              h = a.bottomRight.longitude,
              g = a.bottomRight.latitude,
              d = 22,
              i = 1073741824,
              k,
              j;
            k = A.data;
            k.length = O.length = 0;
            k.push(f, e, g, h);
            s.geoToMapPoints(A, O);
            k = O[2] - O[0];
            for (j = O[3] - O[1]; j > 1024 || k > 1024; )
              (i >>= 1), d--, (j >>= 1), (k >>= 1);
            s.scaleMapPoints(O, i, O);
            i = this.iconToTileIds(O[0], O[1], d, k, j, N);
            d = i.length;
            k = [];
            for (var l, m, n, q, o, p; --d; )
              if ((m = this.Me[i[d]])) {
                l = m.length;
                for (j = 0; j < l; j++)
                  (n = m[j]) &&
                    (q = n.coordinate) &&
                    (o = q.latitude) <= f &&
                    o >= g &&
                    (p = q.longitude) >= e &&
                    p <= h &&
                    (b || n.isVisible(this)) &&
                    k.indexOf(n) === -1 &&
                    k.push(n);
              }
            k.sort(this.zIndexSortComparator);
            return c.concat(k);
          },
          getViewBounds: function (a) {
            var a = a || this.padding,
              b = a.left,
              c = this.width - a.right,
              d = a.top,
              a = this.height - a.bottom;
            try {
              return u.coverAll([
                this.pixelToGeo(b, d),
                this.pixelToGeo(c, d),
                this.pixelToGeo(c, a),
                this.pixelToGeo(b, a),
              ]);
            } catch (e) {}
            return null;
          },
          update: function (a) {
            this.jd = K();
            l.resume(this.qk);
            (a = +a) !== a || a >= 1
              ? (l.resume(this.si), l.resume(this.Ba))
              : (this.si.run(!1, !0), this.Ba.run(!1, !0));
          },
          fadingSetter: function (a) {
            isNaN((a = +a)) || (a < 0 && j.f());
            var b = g(a / 150) + 1;
            this.Bl = 1 / b;
            this.Eo = a / b;
            return a;
          },
          baseMapTypeSetter: function (a) {
            this.baseMapType = a;
            this._super(a);
            return a;
          },
          cm: function () {
            for (var a = this.jc.tiles, b = a.length; b--; ) a[b].render = !0;
          },
        }));
      nokia.maps.map.Display.setDefImpl(e);
    })();
    ovi.provide("nokia.maps.map._packaging.package-js-p2d-canvas");
  })();
}
/*
     FILE ARCHIVED ON 17:39:00 May 14, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:23:24 Sep 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 144.69
  exclusion.robots: 0.144
  exclusion.robots.policy: 0.132
  cdx.remote: 0.096
  esindex: 0.011
  LoadShardBlock: 66.829 (3)
  PetaboxLoader3.datanode: 92.974 (5)
  CDXLines.iter: 18.548 (3)
  load_resource: 139.99 (2)
  PetaboxLoader3.resolve: 95.035 (2)
*/
