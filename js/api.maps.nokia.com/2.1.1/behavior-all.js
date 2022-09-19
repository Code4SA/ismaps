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
    ovi.provide("nokia.maps.util.math.douglasPeucker");
    (function (f) {
      var e = Math,
        c = e.min,
        b = e.abs,
        a = e.sqrt,
        g = e.pow,
        d = (f.douglasPeucker = function (e, f, h, m, l) {
          m === void 0 && ((m = 0), (l = e.length - 2));
          for (
            var k,
              n = 0,
              p = m,
              o = e[m],
              q = e[m + 1],
              r = e[l],
              s = e[l + 1],
              w = m + 2,
              u,
              v = (s - q) / (r - o) || 0;
            w < l;

          )
            if (
              ((k = e[w++]),
              (u = e[w++]),
              n <
                (k = c(
                  b(u - v * k - (q - v * o)) / a(g(v, 2) + 1),
                  a(g(k - o, 2) + g(u - q, 2)),
                  a(g(k - r, 2) + g(u - s, 2))
                )))
            )
              (n = k), (p = w - 2);
          n >= f || h > 0
            ? ((m = d(e, f, (h = (h || 0) - 1), m, p)),
              m.splice(m.length - 2, 2),
              (m = m.concat(d(e, f, h, p, l))))
            : (m = [e[m], e[m + 1], e[l], e[l + 1]]);
          return m;
        });
    })(nokia.maps.util.math);
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
    ovi.provide("nokia.maps.map.component.Copyright");
    (function (f) {
      f.map.component.Copyright = new ovi.Class({
        Extends: f.map.component.Component,
        initialize: function (e) {
          this._super(e);
        },
        d: "Copyright",
        A: "0.0.0.1",
        attach: function (e) {
          this._super(e);
        },
        detach: function (e) {
          this._super(e);
        },
        setPosition: function (e) {
          this.mapDisplay.set("copyrightAlignment", e);
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.panning.Click");
    (function (f) {
      var e = f.map.component;
      e.panning.Click = new ovi.Class({
        Extends: e.Component,
        d: "panning.Click",
        A: "0.0.0.1",
        initialize: function (c) {
          function b(b) {
            a.enabled &&
              (d.getComponentById("panning.Kinetic"),
              d.pan(
                0,
                0,
                -(d.width / 2 - b.displayX),
                -(d.height / 2 - b.displayY)
              ));
          }
          var a = this,
            g = e.Component.prototype,
            d;
          a._super(ovi.extend({ enabled: !0, useKineticPanning: !0 }, c));
          a.attach = function (c) {
            g.attach.call(a, c);
            d = c;
            d.addListener("click", b);
          };
          a.detach = function (c) {
            g.detach.call(a, c);
            d.removeListener("click", b);
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.panning.KineticMovement");
    (function (f) {
      var e = f.map.component,
        c = f.util,
        b = c.now,
        a = c.math.douglasPeucker,
        g = Math.sqrt,
        d = c.Vector3D,
        i = c.Coroutine;
      e.panning.KineticMovement = new ovi.Class({
        Extends: f.util.OObject,
        initialize: function (a, c, g) {
          if (!(g instanceof e.panning.Kinetic))
            throw "Can't instantiate abstract class KineticMovement!";
          c = c || b();
          this._super(
            ovi.extend(
              {
                fraction: 3.5,
                fractionHz: 10,
                maxFps: 25,
                fps: 0,
                frames: 0,
                direction: new d(0, 0, 0),
                speed: 0,
                enabled: !0,
                movementPhase: !0,
                slidingPhase: !1,
                finished: !1,
                aborted: !1,
              },
              a
            )
          );
          this.owner = g;
          this.sh = [];
          this.$t = this.of = c;
          this.nf = 0;
          this.jd = c;
          this.updateSpeedLimits();
        },
        updateSpeedLimits: function () {
          var a = this.owner.mapDisplay;
          a &&
            ((a = g(a.width * a.width + a.height * a.height)),
            this.set("stopSpeed", a * 0.05),
            this.set("minSpeed", a * 0.1),
            this.set("maxSpeed", a * 1));
        },
        moveBy: function (a, c, d, e) {
          var g = this.sh,
            e = (e = +e) === e ? e : b();
          if (e - this.jd > 250) g.length = 0;
          this.jd = e;
          g.push({ time: e, dx: a, dy: c });
          g.length > 300 && g.splice(0, 50);
          d && this.enabled && this.owner.mapDisplay.pan(0, 0, a, c);
          return this;
        },
        endMovement: function (c) {
          if (!this.movementPhase) return this;
          var c = (c = +c) === c ? c : b(),
            e = c - 250,
            f = this.sh,
            l = [],
            k = 0,
            n = c,
            p,
            o = 0,
            q = 0,
            r = 0;
          this.updateSpeedLimits();
          for (r = f.length - 1; r >= 0; r--)
            if (((p = f[r]), p.time > e))
              l.push(p.dx, p.dy),
                (k += g(p.dx * p.dx + p.dy * p.dy)),
                (n = p.time);
            else break;
          f.length = 0;
          if (!l.length)
            return (
              this.set("speed", 0),
              this.set("direction", 0),
              this.set("movementPhase", !1),
              this.set("slidingPhase", !1),
              this
            );
          r = (k / (c - n || 1.0e-9)) * 1e3;
          if (r > this.maxSpeed) r = this.maxSpeed;
          if (r < this.minSpeed) r = this.minSpeed;
          this.set("speed", r);
          l = a(l, 20);
          r = 0;
          for (e = l.length; r < e; ) (o += l[r++]), (q += l[r++]);
          this.set("direction", new d(o, q, 0).normalize());
          this.set("movementPhase", !1);
          this.set("slidingPhase", !0);
          this.nf = c;
          i.resume(this.owner.xe);
          return this;
        },
        stop: function (a, c) {
          var d = c === !1;
          if (this.aborted) return this;
          a = a || b();
          this.set("movementPhase", !1);
          this.set("slidingPhase", !1);
          this.set("lastUpdate", a);
          this.set("fps", this.frames / ((a - this.nf) / 1e3));
          this.set("finished", !0);
          this.set("aborted", d);
          this.set("speed", 0);
          i.resume(this.owner.xe);
          return this;
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.panning.Tap");
    (function (f) {
      var e = f.map.component;
      e.panning.Tap = new ovi.Class({
        Extends: e.Component,
        d: "panning.Tap",
        A: "0.0.0.1",
        initialize: function (c) {
          function b(b) {
            a.enabled &&
              (d.getComponentById("panning.Kinetic"),
              d.pan(
                0,
                0,
                -(d.width / 2 - b.displayX),
                -(d.height / 2 - b.displayY)
              ));
          }
          var a = this,
            g = e.Component.prototype,
            d;
          a._super(ovi.extend({ enabled: !0, useKineticPanning: !0 }, c));
          a.attach = function (c) {
            g.attach.call(a, c);
            d = c;
            d.addListener("tap", b);
          };
          a.detach = function (c) {
            g.detach.call(a, c);
            d.removeListener("tap", b);
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.zoom.DoubleClick");
    (function (f) {
      var e = f.map.component;
      e.zoom.DoubleClick = new ovi.Class({
        Extends: e.Component,
        d: "zoom.DoubleClick",
        A: "0.0.0.1",
        initialize: function () {
          function c(b) {
            a.enabled &&
              ((f = g.getComponentById("panning.Kinetic")) &&
                f.set("current", null),
              g.setZoomLevel(
                g.zoomLevel + (b.button === 2 ? -1 : 1),
                "default",
                b.displayX,
                b.displayY
              ),
              b.cancel());
          }
          function b(b) {
            a.enabled && b.preventDefault();
          }
          var a = this,
            g,
            d = e.Component.prototype,
            f;
          a._super({ enabled: !0 });
          a.attach = function (e) {
            d.attach.call(a, e);
            g = e;
            g.addListener("dblclick", c);
            g.addListener("contextmenu", b);
          };
          a.detach = function (e) {
            d.detach.call(a, e);
            g.removeListener("dblclick", c);
            g.removeListener("contextmenu", b);
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.zoom.DoubleTap");
    (function (f) {
      var e = f.map.component;
      e.zoom.DoubleTap = new ovi.Class({
        Extends: e.Component,
        d: "zoom.DoubleTap",
        A: "0.0.0.1",
        initialize: function () {
          function c(c) {
            b.enabled &&
              ((g = a.getComponentById("panning.Kinetic")) &&
                g.set("current", null),
              a.setAttributes(
                "default",
                a.pixelToGeo(c.displayX, c.displayY),
                a.zoomLevel + 1
              ),
              c.cancel());
          }
          var b = this,
            a,
            g,
            d = e.Component.prototype;
          b._super({ enabled: !0 });
          b.attach = function (e) {
            d.attach.call(b, e);
            a = e;
            a.addListener("dbltap", c);
          };
          b.detach = function (e) {
            d.detach.call(b, e);
            a.removeListener("dbltap", c);
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.zoom.GestureEvent");
    (function (f) {
      var f = f.map.component,
        e,
        c,
        b = ovi.Array.forEach,
        a = ovi.Array.indexOf,
        g = f.Component.prototype,
        d = ["gesturestart", "gestureend", "gesturechange"];
      f.zoom.GestureEvent = new ovi.Class({
        Extends: f.Component,
        d: "zoom.GestureEvent",
        A: "0.0.0.1",
        initialize: function () {
          c = this;
          c._super();
          c.attach = function (a) {
            g.attach.call(c, a);
            e = a;
            b(d, function (a) {
              e.addEvent(a);
            });
          };
          c.detach = function (a) {
            g.detach.call(c, a);
            b(d, function (a) {
              e.removeEvent(a);
            });
          };
        },
        addListener: function (b, c) {
          if (a(d, b) >= 0) return e.addListener(b, c), !0;
          return !1;
        },
        removeListener: function (b, c) {
          if (a(d, b) >= 0) return e.removeListener(b, c), !0;
          return !1;
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.zoom.MouseWheel");
    (function (f) {
      f.map.component.zoom.MouseWheel = new ovi.Class({
        Extends: f.map.component.Component,
        d: "zoom.MouseWheel",
        A: "0.0.0.1",
        initialize: function () {
          function e(a) {
            c.enabled &&
              (b.setZoomLevel(
                b.zoomLevel + a.wheelDelta,
                "default",
                a.displayX,
                a.displayY
              ),
              a.cancel());
          }
          var c = this,
            b,
            a = f.map.component.Component.prototype;
          c._super({ enabled: !0 });
          c.attach = function (g) {
            a.attach.call(c, g);
            b = g;
            b.addListener("mousewheel", e);
          };
          c.detach = function (g) {
            a.detach.call(c, g);
            b.removeListener("mousewheel", e);
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.panning.Kinetic");
    (function (f) {
      var e = f.map.component,
        c = e.panning,
        f = f.util,
        b = f.Coroutine;
      if (!f.getConstructor(c.Kinetic))
        c.Kinetic = new ovi.Class({
          Extends: e.Component,
          d: "panning.Kinetic",
          A: "0.0.0.1",
          initialize: function (a) {
            this._super(ovi.extend({ current: c }, a));
            var c = null,
              d = this,
              f = c,
              j = 0,
              h = 0,
              m = 0,
              l = 0,
              k = 0,
              n = (this.wn = b
                .create(
                  "nokia.maps.map.component.panning.Kinetic#slidingCo",
                  function (a, c) {
                    var d = a.that,
                      e = c.callTime,
                      g,
                      q;
                    if (f !== d.current)
                      (f = d.current), (m = j = h = l = k = 0);
                    if (!f || !f.slidingPhase) return b.sleep();
                    if (!m)
                      return (
                        (m = 1e3 / f.maxFps),
                        (j = e + m),
                        (h = e),
                        (l = k = 0),
                        b.sleep(m)
                      );
                    if (e < j) return b.sleep(j - e);
                    g = f.speed;
                    if (g > p.maxSpeed) g = p.maxSpeed;
                    g *= (e - h) / 1e3;
                    l += g * f.direction.x;
                    k += g * f.direction.y;
                    if (Math.abs(l) >= 1 || Math.abs(k) >= 1)
                      (g = Math.floor(l)),
                        (q = Math.floor(k)),
                        (l -= g),
                        (k -= q),
                        d.mapDisplay.pan(0, 0, g, q);
                    f.set("frames", f.frames + 1);
                    f.set("fps", f.frames / ((e - f.nf) / 1e3));
                    h = e;
                    j = e + m;
                    return b.sleep(m);
                  },
                  { priority: 100, useAnimationFrame: !0 }
                )
                .call(this)),
              p = c,
              o = 0,
              q = 0,
              r = (this.xe = b
                .createEx(
                  "nokia.maps.map.component.panning.Kinetic#fractionCo",
                  function (a, e) {
                    var h, f;
                    if (p !== d.current)
                      (p = d.current), (o = q = 0), b.resume(n);
                    if (!p || !p.slidingPhase) return b.sleep();
                    if (!o)
                      return (
                        (o = e.callTime),
                        (q = 1e3 / p.fractionHz),
                        b.resume(n),
                        b.sleep(q)
                      );
                    if ((f = q - ((h = e.callTime) - o)) > 0) return b.sleep(f);
                    b.resume(n);
                    o = h;
                    p.updateSpeedLimits();
                    h = f = p.speed;
                    if (f < p.minSpeed) f = p.minSpeed;
                    h -= (f * p.fraction) / p.fractionHz;
                    h <= p.stopSpeed && (h = 0);
                    p.set("speed", h);
                    if (h === 0)
                      return (
                        p.stop(c, !0), d.set("current", (p = c)), b.sleep()
                      );
                    return b.sleep(q);
                  },
                  { priority: 100 }
                )
                .call(this));
            n.set("priority", 100);
            r.set("priority", 100);
            d.addObserver(
              "current",
              function (a, c, d, e) {
                if (d !== e && (e && e.set("enabled", !1), d)) {
                  if (d.finished)
                    throw "Failed to reactivate already finished kinetic movement!";
                  d.set("enabled", !0);
                  b.resume(r);
                }
              },
              d
            );
            d.startMovement = function (a) {
              a = new e.panning.KineticMovement(null, a, d);
              d.set("current", a);
              return a;
            };
          },
          destroy: function () {
            b.kill(this.xe);
            b.kill(this.wn);
          },
        });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.zoom.Gesture");
    (function (f) {
      var e = f.map.component;
      e.zoom.Gesture = new ovi.Class({
        Extends: e.Component,
        d: "zoom.Gesture",
        A: "0.0.0.1",
        initialize: function () {
          function c(a) {
            if (g.enabled) {
              if (f) {
                if (k) j = a.scale;
                l && (h = m + a.rotation);
                r = q;
                for (var b = !1, c = !1; j >= 2; ) (j /= 2), r++, (b = !0);
                for (; j <= 0.75; ) (j *= 2), r--, (c = !0);
                !b && j > 1.1 && r++;
                !c && j < 0.9 && r--;
                d.transform(void 0, void 0, h, 1);
                l &&
                  ((h = m + a.rotation),
                  h >= -9 && h <= 9 && (h = 0),
                  d.set("heading", h));
                r !== d.zoomLevel && d.set("zoomLevel", r);
              }
              a.preventDefault();
            }
          }
          function b(a) {
            if (g.enabled) {
              if (f) {
                if (k) j = a.scale;
                l && (h = m + a.rotation);
                r !== d.zoomLevel && d.set("zoomLevel", r);
                d.transform(void 0, void 0, h, j);
                d.forceTileRender();
              } else {
                var b = a.rotation;
                j = a.scale;
                Math.abs(u - j) > 0.1 && !p && (o = !0);
                d.maxHeading != 0 && Math.abs(w - b) > 5 && !o && (p = !0);
                p && d.set("heading", 360 - b - 5);
                o &&
                  ((b = u > j ? v - 3 * (j - 0.1) : v + 3 / (j - 0.1)),
                  b !== x && d.setAttributes("default", s, (x = b)));
              }
              a.preventDefault();
            }
          }
          function a(a) {
            if (g.enabled)
              f
                ? ((r = q = d.zoomLevel), (h = m = d.heading), (j = 1))
                : ((o = p = !1),
                  (s = d.center),
                  (w = 0),
                  (u = 1),
                  (x = v = d.zoomLevel)),
                a.preventDefault();
          }
          var g = this,
            d,
            f,
            j = 0,
            h = 0,
            m,
            l = !1,
            k = !0,
            n = e.Component.prototype,
            p = !1,
            o = !1,
            q,
            r,
            s,
            w,
            u,
            v,
            x,
            z;
          g._super({ enabled: !0 });
          g.attach = function (h) {
            n.attach.call(g, h);
            d = h;
            z = new e.zoom.GestureEvent();
            d.addComponent(z);
            z.addListener("gesturestart", a);
            z.addListener("gesturechange", b);
            z.addListener("gestureend", c);
            d.kj && (f = !0);
          };
          g.detach = function (e) {
            n.detach.call(g, e);
            d.removeComponent(z);
            z.removeListener("gesturestart", a);
            z.removeListener("gesturechange", b);
            z.removeListener("gestureend", c);
          };
          g.enableRotation = function () {};
          g.disableRotation = function () {
            l = !1;
          };
          g.enableZoom = function () {
            k = !0;
          };
          g.disableZoom = function () {
            k = !1;
          };
        },
      });
    })(nokia.maps);
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
    ovi.provide("nokia.maps.map.component.panning.Drag");
    (function (f) {
      var e = f.map.component;
      e.panning.Drag = new ovi.Class({
        Extends: e.Component,
        Statics: { LMB: 1, RMB: 4, MMB: 2 },
        d: "panning.Drag",
        A: "0.0.0.1",
        initialize: function (c) {
          function b(a) {
            var b = a.dataTransfer,
              c = b && b.getData("application/map-drag-type");
            b && b.getData("application/map-drag-object");
            var b = a.deltaX,
              d = a.deltaY;
            if (c === "map") {
              if (b || d) h ? h.moveBy(-b, -d, !0) : j.pan(0, 0, -b, -d);
              h && (h.endMovement(), (h = null));
              a.stopImmediatePropagation();
            }
          }
          function a(a) {
            var b = a.dataTransfer,
              b = b && b.getData("application/map-drag-type"),
              c = a.deltaX,
              d = a.deltaY;
            if (b === "map") {
              if (c || d) h ? h.moveBy(-c, -d, !0) : j.pan(0, 0, -c, -d);
              a.stopImmediatePropagation();
            }
          }
          function g(a) {
            if (d.enabled && d.dragButtons & (1 << a.button)) {
              var b = j.getComponentById("panning.Kinetic"),
                c = a.dataTransfer,
                e = a.deltaX,
                g = a.deltaY;
              c.cursor = "hand";
              c.lift = !1;
              c.setData("application/map-drag-type", "map");
              c.setData("application/map-drag-object", j);
              c.setData("application/map-drag-object-offset", void 0);
              a.stopImmediatePropagation();
              d.useKineticPanning && b
                ? ((h = b.startMovement()), h.moveBy(-e, -g, !0))
                : ((h = null), j.pan(0, 0, -e, -g));
            }
          }
          var d = this,
            f = e.Component.prototype,
            j,
            h;
          d._super(ovi.extend({ enabled: !0, useKineticPanning: !0 }, c));
          d.dragButtons = d.dragButtons || 7;
          d.attach = function (c) {
            f.attach.call(d, c);
            j = c;
            j.addListener("dragstart", g);
            j.addListener("drag", a);
            j.addListener("dragend", b);
          };
          d.detach = function (c) {
            f.detach.call(d, c);
            j.removeListener("dragstart", g);
            j.removeListener("drag", a);
            j.removeListener("dragend", b);
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.objects.DragMarker");
    (function (f) {
      var e = f.util.Point,
        f = f.map,
        c = f.component,
        b = f.Marker,
        a = b.prototype.u,
        g = f.StandardMarker.prototype.u;
      c.objects.DragMarker = new ovi.Class({
        Extends: c.Component,
        d: "objects.DragMarker",
        A: "0.0.0.1",
        dragSourceOpacity: 1,
        dragIconOpacity: 0.5,
        initialize: function (d) {
          function f(c) {
            var d = c.dataTransfer,
              h = d && d.getData("application/map-drag-type"),
              i = d && d.getData("application/map-drag-object");
            if ((h === a || h === g) && i instanceof b) {
              if (i.getParent(o)) d.dropEffect = "none";
              else if (d.allows("move")) d.dropEffect = "move";
              else {
                d.dropEffect = "none";
                c.cancel();
                return;
              }
              h =
                d.getData("application/map-drag-object-offset") || new e(0, 0);
              i.set(
                "coordinate",
                o.pixelToGeo(
                  c.displayX - h.x + i.anchor.x,
                  c.displayY - h.y + i.anchor.y
                )
              );
              d.dropEffect !== "none" && o.objects.add(i);
              c.cancel();
            } else d.dropEffect = "none";
          }
          function j(b) {
            var c = b.dataTransfer,
              d = c && c.getData("application/map-drag-type"),
              e = c && c.getData("application/map-drag-object");
            if (d === a || d === g)
              (c.dropEffect = e.getParent(o) ? "move" : "copy"), b.cancel();
          }
          function h(b) {
            var c = b.dataTransfer,
              d = c && c.getData("application/map-drag-type"),
              e = c && c.getData("application/map-drag-object");
            if (d === a || d === g)
              (c.dropEffect = e.getParent(o) ? "move" : "copy"), b.cancel();
          }
          function m(b) {
            var c = b.dataTransfer,
              d = c && c.getData("application/map-drag-type"),
              e = c && c.getData("application/map-drag-object");
            if (d === a || d === g)
              e.removeListener("dragend", m, !0),
                c.dropEffect === "move" &&
                  ((dragMarkerParent = e.getParent(o)),
                  dragMarkerParent.objects.remove(e)),
                (e.icon.opacity = 1),
                e.aa("icon", e.icon, 2),
                b.stopImmediatePropagation();
          }
          function l(a) {
            var b = a.dataTransfer;
            (b && b.getData("application/map-drag-type")) === g &&
              a.stopImmediatePropagation();
          }
          function k(a) {
            if (n.enabled) {
              var c,
                d,
                h,
                g = a.target,
                f = a.dataTransfer;
              if (g instanceof b && g.draggable)
                (d = g.getDisplayBoundingBox(o)),
                  (c = a.displayX - d.topLeft.x),
                  (d = a.displayY - d.topLeft.y),
                  (h = g.getIconForRendering(document)),
                  f.setDragImage(h.createElement(n.dragIconOpacity), -c, -d),
                  (g.icon.opacity = n.dragSourceOpacity),
                  g.aa("icon", g.icon, 2),
                  f.setData("application/map-drag-type", g.u),
                  f.setData("application/map-drag-object", g),
                  f.setData("application/map-drag-object-offset", new e(c, d)),
                  (f.effectAllowed = "all"),
                  g.insertListener("dragend", m, !0),
                  a.stopImmediatePropagation();
            }
          }
          var n = this,
            p = c.Component.prototype,
            o;
          n._super(ovi.extend({ enabled: !0, useKineticPanning: !0 }, d));
          n.attach = function (a) {
            p.attach.call(n, a);
            o = a;
            o.addListener("dragstart", k);
            o.addListener("drag", l);
            o.addListener("dragend", m);
            o.addListener("dragenter", h);
            o.addListener("dragover", j);
            o.addListener("drop", f);
          };
          n.detach = function (a) {
            p.detach.call(n, a);
            o.removeListener("dragstart", k);
            o.removeListener("drag", l);
            o.removeListener("dragend", m);
            o.removeListener("dragenter", h);
            o.removeListener("dragover", j);
            o.removeListener("drop", f);
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.Behavior");
    (function (f) {
      var e = f.map.component;
      e.Behavior = new ovi.Class({
        Extends: e.Component,
        d: "Behavior",
        A: "0.0.0.1",
        initialize: function () {
          var c = this,
            b = ovi.bind,
            a,
            g,
            d,
            f,
            j,
            h,
            m,
            l;
          c.attach = function (k) {
            c.mapDisplay = a = k;
            var k = b(a, a.addComponent),
              n = e.zoom,
              p = e.panning;
            g = n.MouseWheel && k(new n.MouseWheel());
            d = n.DoubleClick && k(new n.DoubleClick());
            f = n.DoubleTap && k(new n.DoubleTap());
            j = n.Gesture && k(new n.Gesture());
            h = p.Drag && k(new p.Drag());
            m = p.Kinetic && k(new p.Kinetic());
            l = e.objects.DragMarker && k(new e.objects.DragMarker());
          };
          c.detach = function () {
            delete c.mapDisplay;
            var e = b(a, a.removeComponent);
            g && e(g);
            d && e(d);
            f && e(f);
            j && e(j);
            h && e(h);
            m && e(m);
            l && e(l);
            a = null;
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.behavior._packaging.package-all");
  })();
}
/*
     FILE ARCHIVED ON 17:39:00 May 14, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:23:53 Sep 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 170.557
  exclusion.robots: 0.077
  exclusion.robots.policy: 0.071
  cdx.remote: 0.072
  esindex: 0.009
  LoadShardBlock: 135.857 (3)
  PetaboxLoader3.datanode: 486.853 (5)
  CDXLines.iter: 16.063 (3)
  load_resource: 438.094 (2)
  PetaboxLoader3.resolve: 79.868 (2)
*/
