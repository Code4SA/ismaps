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
    ovi.provide("nokia.maps.dom._extractCDATA");
    nokia.maps.dom.Gr = function (f, e) {
      var c, b, a, g;
      typeof f === "string" && (f = UIComponent.findElement(f));
      if (f && f.nodeType === 1) {
        c = f.getElementsByTagName("script");
        for (b = c.length || 0; b--; )
          (a = c[b]).type === "CDATA" &&
            (g = /^\s*<!\[CDATA\[\s*([\s\S]*)\s*\]\]>\s*$/.exec(a.text)) &&
            (g = g[1]) &&
            e(a, g, a.getAttribute("charset") || "" + b);
      }
    };
    ovi.provide("nokia.maps.util.proto");
    (function () {
      var f = {}.toString,
        e = (nokia.maps.util.proto = function (c, b, a) {
          var g = Function(),
            d,
            i;
          g.prototype = b;
          g = new g();
          for (d in c)
            c.hasOwnProperty(d) &&
              (g[d] =
                a && d in b && f.call((i = c[d])) === "[object Object]"
                  ? e(i, b[d], a)
                  : c[d]);
          if (a)
            for (d in b)
              if (
                b.hasOwnProperty(d) &&
                (i = b[d]) === g[d] &&
                f.call(i) === "[object Object]"
              )
                g[d] = e(0, i, a);
          return g;
        });
    })();
    ovi.provide("nokia.maps.ui.nokia_generic.SpaceManager");
    (function (f) {
      var e = {},
        c = (f.ui.nokia_generic.SpaceManager = new ovi.Class({
          initialize: function (b) {
            this.Nb = b;
            this.va = ovi.bind(this, this.va);
            b.addListener("resizeend", this.va);
          },
          Nb: null,
          et: 0,
          dt: 0,
          ob: {},
          Statics: {
            getSpaceManager: function (b) {
              e[b.d] || (e[b.d] = new c(b));
              return e[b.d];
            },
          },
          registerSpace: function (b, a, c, d, i) {
            this.ob[b] || (this.ob[b] = {});
            this.ob[b][a] = { topLeft: c, bottomRight: d, flexible: i || !1 };
          },
          setActiveState: function (b, a) {
            for (var c in this.ob[b])
              if (this.ob[b][c].active)
                (this.ob[b][c].active = !1), delete this.ob[b][c].active;
            this.ob[b] && this.ob[b][a] && (this.ob[b][a].active = !0);
          },
          removeComponent: function (b) {
            delete this.ob[b];
          },
          getDimensionsFor: function (b, a) {
            return a ? this.ob[b][a] : this.ob[b];
          },
          isSpaceFor: function () {},
          va: function () {
            this.et = this.Nb.C.offsetWidth;
            this.dt = this.Nb.C.offsetHeight;
          },
        }));
    })(nokia.maps);
    ovi.provide("nokia.maps.util.ObjectFormatter");
    (function (f) {
      var e = /\[\[([^\]]+)\]\]/gi,
        c = /\{\{([^\}]+)\}\}/gi;
      f.ObjectFormatter = new ovi.Class({
        format: function (b, a, c) {
          var d = a.match(e),
            i,
            j = 0,
            h;
          if (d)
            for (h = d.length; j < h; j++)
              (i = d[j].replace(e, "$1")),
                (valueString = this.Zh(i, b, c, !0)),
                (a = a.replace(d[j], valueString));
          return (a = this.Zh(a, b, c));
        },
        Zh: function (b, a, g, d) {
          var i = f.hn,
            e = b.match(c),
            h = !0,
            m,
            l = 0,
            k;
          if (e)
            for (k = e.length; l < k; l++)
              (m = e[l].replace(c, "$1")),
                (m = (g && g[m]) || i(m, a) || ""),
                (m = this.Zk(m)),
                m.length > 0 && (h = !1),
                (b = b.replace(e[l], m != null ? m : ""));
          return d && h ? "" : b;
        },
        Zk: function (b) {
          var a = "",
            c = typeof b;
          switch (c) {
            case "object":
            case "undefined":
            case "function":
              a = c;
              break;
            case "string":
              a = b;
              break;
            case "number":
            case "boolean":
              a += b;
          }
          return a;
        },
      });
    })(nokia.maps.util);
    ovi.provide("nokia.maps.ui.nokia_generic.ColorSet");
    (function (f) {
      var e = "background border stroke fill text".split(" "),
        c = f.util.proto,
        b = (f.ui.nokia_generic.ColorSet = function (g, d) {
          var i;
          if (a) return c(g, d ? (d instanceof b ? d : c(d, a)) : a);
          for (i = e.length; i--; ) this[e[i]] = "#F60";
        }),
        a = (b.tr = new b());
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.ColorScheme");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = "normal disable focus active".split(" "),
        b = nokia.maps.util.proto,
        a = (e.ColorScheme = function (d, i) {
          var j;
          if (g) return b(d, i ? (i instanceof a ? i : b(i, g, !0)) : g, !0);
          for (j = c.length; j--; ) this[c[j]] = e.ColorSet.tr;
        }),
        g = new a();
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.UIScaler");
    (function (f) {
      f.ui.nokia_generic.UIScaler = ovi.Class({
        Extends: f.util.OObject,
        ID_TESTNODE: "ovi_ppitest",
        scaleFactor: 0,
        Rp: {},
        rescale: function (e) {
          if (this.scaleFactor !== 0) return this.scaleFactor;
          var c = this.scaleFactor;
          this.Rp = e;
          this.Rt(e);
          e.parentNode.style.fontSize = "10px";
          this.isMobile()
            ? ((e =
                "https://web.archive.org/web/20140813152251/http://10.225.86.65/rest/deviceinfo?useragent=" +
                navigator.userAgent +
                "&format=jsonp"),
              new f.net.Request(1, { callbackKey: "callback" }).send(
                e,
                ovi.bind(this, this.dcsResponse)
              ))
            : ((c = Math.round(34) / 34), this.set("scaleFactor", c));
        },
        dcsResponse: function (e) {
          var c = 1,
            c = 0,
            b = e.response;
          if (
            b &&
            !e.error &&
            ((e =
              b.DeviceCompatibilityService &&
              b.DeviceCompatibilityService.DeviceInfoResponse &&
              b.DeviceCompatibilityService.DeviceInfoResponse.Characteristics
                ? b.DeviceCompatibilityService.DeviceInfoResponse
                    .Characteristics
                : null),
            !e || !(c = e["display.dpi"]))
          )
            e && (c = this.areaComparison(e));
          c = Math.round(34 * ((c || 165) / 96)) / 34;
          this.set("scaleFactor", c);
        },
        areaComparison: function (e) {
          try {
            var c =
                e["display.size"] ||
                e["display.size.inches"] ||
                (e["display.size.cms"]
                  ? this.mmToInch(e["display.size.cms"] * 100)
                  : !1),
              b = e["dimension.length"] - 0,
              a = e["dimension.width"] - 0,
              g = e["display.height"],
              d = e["display.width"],
              i;
            if (c) i = this.calcDiagonal(g, d) / c;
            else {
              var j = this.calcDiagonal(this.mmToInch(b), this.mmToInch(a));
              j *= 0.663979;
              i = this.calcDiagonal(g, d) / j;
            }
            return i;
          } catch (h) {}
        },
        scaleFactorSetter: function (e) {
          if (typeof e === "number")
            return (
              (this.Rp.style.cssText += ";font-size:" + e + "em;"),
              (this.scaleFactor = e)
            );
        },
        isMobile: function () {
          var e = ovi.platform,
            c = !0;
          if (navigator.userAgent.toLowerCase().indexOf("mobi") > -1) c = !0;
          else if (e.windows || e.mac) c = !1;
          return c;
        },
        Rt: function (e) {
          if (ovi.browser.msie) {
            var c = ovi.browser.version - 0;
            c <= 7
              ? ovi.dom.addClass(e, "IE7")
              : c <= 8 && ovi.dom.addClass(e, "IE8");
          }
        },
        zu: function (e) {
          var c = e.ownerDocument;
          return (
            this.Wt ||
            (this.Wt = (function () {
              var b = c.createElement("div");
              b.id = "ovi_ppitest";
              document.body.appendChild(b);
              return b;
            })())
          );
        },
        calcDiagonal: function (e, c) {
          return Math.sqrt(e * e - c * c);
        },
        mmToInch: function (e) {
          return e * 0.039370079;
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.common.Animator");
    (function () {
      var f = nokia.maps.util,
        e = f.now,
        c = Math.min,
        b = f.Coroutine;
      nokia.maps.ui.common.Animator = new ovi.Class({
        initialize: function (a, g, d, i) {
          var j = this;
          if (ovi.type(i) == "number") j.kg = i;
          j.Ok = a;
          j.te = g;
          j.kn = d;
          j.animatorCoCtx = b.create(
            "nokia.maps.ui.common.Animator",
            function () {
              var a = (e() - j.of) / 1e3 / j.te,
                a = j.kn ? a % 1 : c(1, a);
              j.Ok(a);
              a == 1 && j.stop();
              return b.sleep((1 / j.kg) * 1e3);
            }
          )();
          b.sleep(null, j.animatorCoCtx);
        },
        kg: 20,
        Jd: !1,
        start: function (a) {
          ovi.type(a) != "number" && (a = 0);
          this.of = e() - a * this.te * 1e3;
          if (!this.Jd) (this.Jd = !0), b.resume(this.animatorCoCtx);
        },
        stop: function () {
          if (!this.Jd) return 1;
          this.Jd = !1;
          b.sleep(null, this.animatorCoCtx);
          return (e() - this.of) / 1e3 / this.te;
        },
      });
    })();
    ovi.provide("nokia.maps.ui.nokia_generic.GfxTemplate");
    (function (f) {
      function e(a, b) {
        return g[b && typeof b === "string" ? b : 0];
      }
      var c = f.gfx,
        b = new c.SvgParser(),
        a = f.util,
        g,
        d = {
          background: "#00F",
          border: "#FF0",
          stroke: "#0F0",
          fill: "#FFA500",
          text: "#000",
          label: "FF9900",
        },
        i = {
          background: /darkgray/g,
          border: /darkblue/g,
          stroke: /darkgold/g,
          fill: /darkaqua/g,
          text: /darkpink/g,
          label: /_label(\d*)_/g,
        };
      f.ui.nokia_generic.GfxTemplate = new ovi.Class({
        initialize: function (c, h, f, l) {
          var k,
            l = a.proto(l, i);
          g = a.isArray(f) ? f : [f || ""];
          h = h || d;
          for (k in i) c = c.replace(l[k], k === "label" ? e : h[k]);
          this.nq = b.parseSvgInfo(c);
        },
        HORIZONTAL: 1,
        VERTICAL: 2,
        stencil: function (a, d, g) {
          var i = this.nq,
            k = i.width,
            i = i.height,
            e = new c.Graphics();
          if ((a = +a || 1) < 0 || a === 1 / 0) a = 1;
          d = d % 360 || 0;
          g = g & 3 || 0;
          e.save();
          e.beginImage(k * a, i * a, a + "_" + d + "_" + g);
          e.scale(a, a);
          d &&
            (e.translate(k / 2, i / 2),
            e.rotate(-d),
            e.translate(k / -2, i / -2));
          g & 1 && (e.translate(k, 0), e.scale(-1, 1));
          g & 2 && (e.translate(0, i), e.scale(1, -1));
          b.parseSvgToGraphics(this.nq.document, e);
          e.restore();
          return e;
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.UIComponent");
    (function (f) {
      var e = (f.ui.UIComponent = new ovi.Class({
        Extends: f.map.component.Component,
        Mixins: [f.dom.EventTarget],
        initialize: function (c) {
          this._super(c);
          this.onLanguageChange &&
            f.language.Info.addObserver(
              "language",
              this.onLanguageChange,
              this
            );
        },
        build: function (c) {
          !c &&
            !this.node &&
            ovi.error(
              '#build() method of component "' +
                this.getId() +
                '" was not implemented (properly).'
            );
          this.node
            ? this.getRootNode().appendChild(this.node)
            : this.set("node", e.findElement(c, this.getTemplate()));
        },
        attach: function (c) {
          this._super(c);
          this.node || this.build();
          this.show();
        },
        detach: function (c) {
          this.hide();
          this._super(c);
        },
        hiddenSetter: function (c) {
          if (!this.node) return c;
          c
            ? ovi.dom.addClass(this.node, "ovi_hidden")
            : ovi.dom.removeClass(this.node, "ovi_hidden");
          return c;
        },
        isHidden: function () {
          return this.hidden;
        },
        show: function () {
          this.set("hidden", !1);
        },
        hide: function () {
          this.set("hidden", !0);
        },
        expandedSetter: function (c) {
          return c;
        },
        isExpanded: function () {
          return this.expanded;
        },
        expand: function () {
          this.set("expanded", !0);
        },
        collapse: function () {
          this.set("expanded", !1);
        },
        findElement: function (c, b) {
          return e.findElement(c, b || this.node);
        },
        doc: function () {
          var c = this.mapDisplay.K || null;
          return c ? c.ownerDocument : null;
        },
        translate: function (c) {
          return e.getTranslation(c);
        },
        translateHtml: function (c) {
          return e.translateHtml(c);
        },
        gn: function (c, b, a) {
          return (c = c.replace(a, function (a, d) {
            return 'url("' + b + d + '")';
          }));
        },
        getRootNode: function () {
          return this.getTemplate();
        },
        getClippingNode: function () {
          return this.mapDisplay.mb;
        },
        getSize: function (c) {
          c = c === void 0 ? this.mapDisplay.K : c;
          return { width: c.clientWidth, height: c.clientHeight };
        },
        Statics: {
          renderTemplate: function (c, b, a) {
            var g = c.K,
              d = g.ownerDocument,
              i = d.createElement("style"),
              j = f.dom.EventTarget(d.createElement("div"));
            i.type = "text/css";
            j.className = "ovi_mp_controls";
            i.styleSheet
              ? (i.styleSheet.cssText = a)
              : i.appendChild(d.createTextNode(a));
            d.getElementsByTagName("head")[0].appendChild(i);
            b = b.replace(/(^[\s\S]*\<body\>)([\s\S]+)(<\/body>[\s\S]*)/, "$2");
            j.innerHTML = b;
            g.appendChild(j);
            j.style.zIndex = 0;
            c.Ya.addListener("mouseenter", ovi.bind(c, e.fa));
            c.Ya.addListener("mouseleave", ovi.bind(c, e.ea));
            c.addObserver("baseMapType", e.Ch, e);
            e.Ch(c, "baseMapType", e.baseMapType, null);
            return j;
          },
          findElement: function (c, b) {
            if (b instanceof nokia.maps.map.Display)
              return e.findElement(c, b.K) || e.findElement(c, b.mb);
            for (
              var a = RegExp("(^|\\s)" + c + "($|\\s)"),
                g = b.getElementsByTagName("*"),
                d = 0;
              d < g.length;
              d++
            )
              if (a.test(g[d].className)) return g[d];
            return null;
          },
          i18n: new f.language.Manager(),
          getTranslation: function (c) {
            return e.i18n.translateToken(c, !1);
          },
          translateHtml: function (c) {
            return e.i18n.translate(c, !1, /__i18n_([a-z\.]*_[a-z0-9]*)__/g);
          },
          Ch: function (c, b, a) {
            var b = c.K,
              g = ovi.dom.removeClass,
              d = ovi.dom.addClass;
            a === c.NORMAL
              ? (d(b, "ovi_mp_mapScheme_normal"),
                g(b, "ovi_mp_mapScheme_satellite"),
                g(b, "ovi_mp_mapScheme_terrain"))
              : a === c.SATELLITE
              ? (g(b, "ovi_mp_mapScheme_normal"),
                d(b, "ovi_mp_mapScheme_satellite"),
                g(b, "ovi_mp_mapScheme_terrain"))
              : a === c.TERRAIN &&
                (g(b, "ovi_mp_mapScheme_normal"),
                g(b, "ovi_mp_mapScheme_satellite"),
                d(b, "ovi_mp_mapScheme_terrain"));
          },
          fa: function () {
            ovi.dom.addClass(this.K, "ovi_mp_hover");
          },
          ea: function () {
            ovi.dom.removeClass(this.K, "ovi_mp_hover");
          },
          hideAll: function (c, b) {
            for (
              var a = (c.Bg = {}), g, d = c.components.asArray(), i = d.length;
              i--;

            )
              if (((g = d[i]), g instanceof e))
                (a[g.getId()] = g.hidden), g === b ? g.show() : g.hide();
          },
          restoreAll: function (c) {
            var b = c.Bg,
              a;
            if (b) {
              for (a in b) c.getComponentById(a).set("hidden", b[a]);
              delete c.Bg;
            }
          },
        },
      }));
      f.ui.AbstractUIComponent = f.ui.UIComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.UIComponent");
    ovi.provide("nokia.maps.resources.ui.nokia_generic.html");
    nokia.maps.resources.ui.nokia_generic.html =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml">\n\t<head>\n\t\t<title>Nokia Maps - UI Components for Web</title>\n\t\t<!--<link rel="stylesheet" type="text/css" href="ovi_touch.css" />-->\n\t</head>\n\t<body>\n\t\t<!-- Icon (actually pictograph) resources are added as SVG comments in faux script tags (<script type="text/foobar">). This hack insures that browsers\n\t\twhich are capable of parsing inline SVG do not begin to parse the cdata content, as webkit browsers are prone to do.\n\t\t<svg> tags are added to tags which have these been consciously omitted as they measure up to the 34x34 standard dimensions-->\n\t\t<!-- hiddenListener START -->\n\t\t<div class="nm_hiddenListener nm_hidden">\r\n\t\t</div>\n\t\t<!-- hiddenListener END -->\n\t\t\n\t\t<!--info bubble START -->\n\t\t<div class="nm_infoBubble" role="tooltip" aria-hidden="true">\n\t\t\t<div class="nm_bubble">\n\t\t\t\t<div class="nm_bubble_bg nm_contentBG"></div>\n\t\t\t\t<div class="nm_bubble_controls">\n\t\t\t\t\t<a href="javascript:void(0)" class="nm_bubble_control_close">&times;</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="nm_bubble_content">\n\t\t\t\t\t<h3 class="nm_bubble_content_title">123 Bubble title</h3>\n\t\t\t\t\t<p class="nm_bubble_content_description">Bubble content</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="nm_bubble_linksbar"></div>\n\t\t\t\t<div  class="nm_bubble_tail">\n\t\t\t\t\t<script type="CDATA"  charset="infobubble">\n\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t\t<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' height=\'16\' width=\'20\'>\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<path style="color:#000000;fill:#000F1A;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" id="path3069" d="m -35,52 l 10,16 l 0,-2 c 0,-2.216 1.784,-4 4,-4 l 6,0 L -35,52 z" transform="translate(35,-52)" />\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t]]>\n\t\t\t\t\t</script>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<!-- info bubble END -->\n\t\t\n\t\t<div class="nm_arrangeableAnchor nm_top">\n\t\t\t<!-- Positioning START -->\n\t\t\t<div class="nm_positioningWrap nm_wrap nm_left nm_singleButton" aria-role="button" aria-pressed="false" aria-busy="false"  aria-hidden="true" >\n\t\t\t\t<div class="nm_firstBG"></div>\n\t\t\t\t<div class="nm_pos_icon_normal">\n\t\t\t\t\t<script type="CDATA" charset="positioning_normal">\n\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t <path style="color:#000000;fill:none;stroke:darkgold;stroke-width:0.75;stroke-miterlimit:4;stroke-dasharray:none;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" id="path3988" d="m -21,31  c 0.0000 3.3137 -2.6863 6.0000 -6.0000 6.0000 c -3.3137 0.0000 -6.0000 -2.6863 -6.0000 -6.0000 c -0.0000 -3.3137 2.6863 -6.0000 6.0000 -6.0000 c 3.3137 -0.0000 6.0000 2.6863 6.0000 6.0000 z" transform="matrix(1.4117647,0,0,1.4117647,55.117647,-26.764706)"/>\n\t\t\t\t\t\t <path style="color:#000000;fill:darkaqua;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" id="path3218" d="m -21,31  c 0.0000 3.3137 -2.6863 6.0000 -6.0000 6.0000 c -3.3137 0.0000 -6.0000 -2.6863 -6.0000 -6.0000 c -0.0000 -3.3137 2.6863 -6.0000 6.0000 -6.0000 c 3.3137 -0.0000 6.0000 2.6863 6.0000 6.0000 z" transform="translate(44,-14)"/>\n\t\t\t\t\t\t]]>\n\t\t\t\t\t</script>\n\t\t\t\t</div>\n\t\t\t\t<div class="nm_pos_icon_pressed">\n\t\t\t\t\t<!-- The pressed icon is the same as above for now but will probably change in the future. -->\n\t\t\t\t\t<script type="CDATA" charset="positioning_pressed">\n\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t <path style="color:#000000;fill:none;stroke:darkgold;stroke-width:0.75;stroke-miterlimit:4;stroke-dasharray:none;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" id="path3988" d="m -21,31  c 0.0000 3.3137 -2.6863 6.0000 -6.0000 6.0000 c -3.3137 0.0000 -6.0000 -2.6863 -6.0000 -6.0000 c -0.0000 -3.3137 2.6863 -6.0000 6.0000 -6.0000 c 3.3137 -0.0000 6.0000 2.6863 6.0000 6.0000 z" transform="matrix(1.4117647,0,0,1.4117647,55.117647,-26.764706)"/>\n\t\t\t\t\t\t <path style="color:#000000;fill:darkaqua;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" id="path3218" d="m -21,31  c 0.0000 3.3137 -2.6863 6.0000 -6.0000 6.0000 c -3.3137 0.0000 -6.0000 -2.6863 -6.0000 -6.0000 c -0.0000 -3.3137 2.6863 -6.0000 6.0000 -6.0000 c 3.3137 -0.0000 6.0000 2.6863 6.0000 6.0000 z" transform="translate(44,-14)"\n\t\t\t\t\t\t />]]>\n\t\t\t\t\t</script>\n\t\t\t\t</div>\n\t\t\t\t<div class="nm_pos_icon_busy">\n\t\t\t\t\t<!-- The pressed icon is the same as above for now but will probably change in the future. -->\n\t\t\t\t\t<script type="CDATA" charset="positioning_busy">\n\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t <path style="color:#000000;fill:none;stroke:darkgold;stroke-width:0.75;stroke-miterlimit:4;stroke-dasharray:none;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" id="path3988" d="m -21,31  c 0.0000 3.3137 -2.6863 6.0000 -6.0000 6.0000 c -3.3137 0.0000 -6.0000 -2.6863 -6.0000 -6.0000 c -0.0000 -3.3137 2.6863 -6.0000 6.0000 -6.0000 c 3.3137 -0.0000 6.0000 2.6863 6.0000 6.0000 z" transform="matrix(1.4117647,0,0,1.4117647,55.117647,-26.764706)"/>\n\t\t\t\t\t\t <path style="color:#000000;fill:darkaqua;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" id="path3218" d="m -21,31  c 0.0000 3.3137 -2.6863 6.0000 -6.0000 6.0000 c -3.3137 0.0000 -6.0000 -2.6863 -6.0000 -6.0000 c -0.0000 -3.3137 2.6863 -6.0000 6.0000 -6.0000 c 3.3137 -0.0000 6.0000 2.6863 6.0000 6.0000 z" transform="translate(44,-14)"\n\t\t\t\t\t\t />]]>\n\t\t\t\t\t</script>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- Positioning END -->\n\t\t\t<!-- MapSettings START-->\n\t\t\t<ul class="nm_mapSettingsWrap nm_layout_horizontal nm_right" aria-role="menubar" aria-expanded="false" >\n\t\t\t\t<ul class="nm_wrapperBG">\n\t\t\t\t\t<li></li>\n\t\t\t\t\t<li></li>\n\t\t\t\t\t<li></li>\n\t\t\t\t</ul>\n\t\t\t\t<li class="nm_publicTransport nm_wrap" aria-hidden="true" aria-role="menuitemradio">\n\t\t\t\t\t<div class="nm_firstBG"></div>\n\t\t\t\t\t\t<script type="CDATA" charset="publicTransport">\n\t\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t\t<path d="m 20.445561,26 h 2.58417 v -1.292085 h -2.58417 V 26 z" id="path3113" style="fill:darkaqua;stroke:none" />\n\t\t\t\t\t\t\t<path d="m 10.970269,26 h 2.58417 v -1.292085 h -2.58417 V 26 z" id="path3111" style="fill:darkaqua;stroke:none" />\n\t\t\t\t\t\t\t<path d="m 21.061847,22.26838 c -0.771141,0 -1.396706,-0.628111 -1.396706,-1.401796 c 0,-0.771649 0.625565,-1.401794 1.396706,-1.401794 c 0.77572,0 1.402812,0.627601 1.402812,1.401794 c 0,0.772667 -0.626074,1.401796 -1.402812,1.401796 z m -8.126238,-0.0056 c -0.774194,0 -1.400777,-0.623529 -1.400777,-1.396196 c 0,-0.769103 0.626583,-1.399759 1.400777,-1.399759 c 0.772667,0 1.398741,0.625566 1.398741,1.399759 c 0,0.772667 -0.626074,1.396196 -1.398741,1.396196 z M 11.989901,13.002736 C 11.988506,12.450978 12.271014,12 12.815647,12 l 8.347497,0 C 21.710832,12 21.998605,12.450978 22,13.002736 l 0.0101,3.995546 C 22.011499,17.551567 21.718387,18 21.173244,18 l -8.347498,0 C 12.280095,18 12.001398,17.551567 12,16.998282 z M 13,10 l 8,0 l 0,1 l -8,0 z m 6.584161,-2.0000001 l -5.155636,0 C 11.825325,7.9999999 10,9.4973374 10,10.986027 l 0,11.482166 C 10,23.844028 10.718665,24 11.463846,24 l 11.07129,0 C 23.27879,24 24,23.857495 24,22.481656 L 24,11 C 24,9.4917667 22.149293,7.9999999 19.584161,7.9999999 z" id="path3075" style="fill:darkaqua;stroke:none" />\n\t\t\t\t\t\t\t]]>\n\t\t\t\t\t\t</script>\n\t\t\t\t</li>\n\t\t\t\t<li class="nm_traffic nm_wrap" aria-hidden="true" aria-role="menuitemradio">\n\t\t\t\t\t<div class="nm_firstBG"></div>\n\t\t\t\t\t\t<script type="CDATA" charset="traffic">\n\t\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t\t<path d="m 13.999309,24.730567 l 0,1.269433 L 12,26 l 0,-1.590264 c 0.283371,0.201199 0.625954,0.320831 1.002374,0.320831 z" id="path6066" style="fill:darkaqua" />\n\t\t\t\t\t\t\t<path d="m 13.126235,18.456519 c 0.129904,-0.381254 0.925036,-2.773294 0.925036,-2.773294 c 0.133529,-0.409652 0.514781,-0.681542 0.947392,-0.681542 l 8.000258,0 c 0.430193,0 0.815675,0.272496 0.951017,0.681542 c 0,0 0.793923,2.39204 0.921409,2.773294 c 0.233827,0.237452 0.835614,0.838029 0.835614,0.838029 C 25.893661,19.478831 26,19.733805 26,20.000258 l 0,3.001079 c 0,0.551639 -0.446507,0.999352 -0.999352,0.999352 l -12.000087,0 c -0.554659,0 -1.00177,-0.447713 -1.00177,-0.999352 l 0,-3.001683 c 0,-0.266454 0.104527,-0.521428 0.29606,-0.705709 c -6.04e-4,0 0.601183,-0.60058 0.831384,-0.837426 z M 22.527038,16 l -7.049847,0 l -0.780631,2.999698 l 8.607484,0 z m 1.301455,6.719778 c 0.734107,0 1.327434,-0.600579 1.327434,-1.338311 c 0,-0.742565 -0.591514,-1.33831 -1.327434,-1.33831 c -0.733504,0 -1.330457,0.59514 -1.330457,1.33831 c 0,0.737732 0.596953,1.338311 1.330457,1.338311 z m -9.656381,0 c 0.732899,0 1.32683,-0.600579 1.32683,-1.338311 c 0,-0.742565 -0.593931,-1.33831 -1.32683,-1.33831 c -0.736525,0 -1.331061,0.59514 -1.331061,1.33831 c 6.04e-4,0.737732 0.592724,1.338311 1.331061,1.338311 z" id="path6058" style="fill:darkaqua" />\n\t\t\t\t\t\t\t<path d="m 25.998188,24.409736 l 0,1.590264 l -1.997497,0 l 0,-1.269433 l 0.998144,0 c 0.372794,0 0.717189,-0.119632 0.999353,-0.320831 z" id="path6038" style="fill:darkaqua" />\n\t\t\t\t\t\t\t<path d="m 10.1875,16.03125 c 0.732899,0 1.3125,0.601185 1.3125,1.34375 c 0,0.737732 -0.579601,1.34375 -1.3125,1.34375 c -0.738337,0 -1.343146,-0.606018 -1.34375,-1.34375 c 0,-0.74317 0.607225,-1.34375 1.34375,-1.34375 z M 11,11 c -0.432611,0 -0.803971,0.277848 -0.9375,0.6875 c 0,0 -0.807596,2.399996 -0.9375,2.78125 c -0.230201,0.236846 -0.844354,0.8125 -0.84375,0.8125 C 8.089717,15.465531 8,15.733546 8,16 l 0,3 c 0,0.551639 0.445341,1 1,1 l 2.03125,0 c 0,-0.482549 0.17439,-1.002768 0.59375,-1.40625 c 0.0029,-0.0028 -0.0026,-0.02875 0,-0.03125 c 0.0053,-0.005 0.02255,0.0082 0.03125,0 c 0.01731,-0.01633 0.03226,-0.03395 0.0625,-0.0625 c 0.06048,-0.0571 0.12906,-0.13335 0.21875,-0.21875 c 0.121577,-0.11576 0.240203,-0.210852 0.34375,-0.3125 c 0.196435,-0.580002 0.875,-2.59375 0.875,-2.59375 c 0.04476,-0.137321 0.115265,-0.25348 0.1875,-0.375 l -2.65625,0 l 0.78125,-3 l 7.0625,0 l 0.53125,2 l 1.65625,0 C 20.460535,13.223655 19.9375,11.6875 19.9375,11.6875 C 19.802158,11.278454 19.430193,11 19,11 l -8,0 z" id="path6071" style="fill:darkaqua" />\n\t\t\t\t\t\t\t<path d="M 8,20.40625 L 8,22 l 2,0 l 0,-1.28125 l -1,0 c -0.37642,0 -0.716629,-0.111301 -1,-0.3125 z" id="path6040" style="fill:darkaqua"/>\n\t\t\t\t\t\t\t]]>\n\t\t\t\t\t\t</script>\n\t\t\t\t</li>\n\t\t\t\t<dl class="nm_dropDownMenu  nm_mapSelectorWrap nm_wrap" aria-expanded="false" aria-haspopup="true" aria-role="menu" aria-hidden="true" ><dt class="nm_menuItemMapType" aria-role="menuitem"><span class="nm_labelOpen nm_firstBG" aria-role="label" title="__i18n_ovi.service.map._t20__">__i18n_ovi.service.map._t17__<!--<span class="nm_dropdown_arrow"></span>--></span><span class="nm_labelClose"  aria-role="label">__i18n_ovi.service.map._t61__</span></dt><dd class="nm_normal nm_first" aria-role="menuitemradio" tabindex="-1"><span class="nm_secondBG">__i18n_ovi.service.map._t17__</span><span class="nm_icon">&#8984;</span></dd><dd class="nm_satellite" aria-role="menuitemradio" tabindex="-1"><span class="nm_secondBG">__i18n_ovi.service.map._t18__</span><span class="nm_icon">&#8984;</span></dd><dd class="nm_terrain nm_last" aria-role="menuitemradio" tabindex="-1"><span class="nm_secondBG">__i18n_ovi.service.map._t19__</span><span class="nm_icon">&#8984;</span></dd></dl>\n\t\t\t</ul>\n\t\t\t<!-- MapSettings END -->\n\t\t</div>\n\t\t<!-- Positioning END -->\n\t\t\n\t\t<!-- Zoombar START -->\n\t\t<div class="nm_arrangeableAnchor nm_middle">\r\n\t\t\t<div class="nm_zoomWrap nm_wrap nm_right" aria-expanded="true" aria-hidden="true" >\n\t\t\t\t<!-- Aria-expanded states set to true are required here (both above and below) as measurements are taken based on this state at initialisation-->\n\t\t\t\t\t<div class="nm_zoomButtons nm_buttonPair">\n\t\t\t\t\t\t<div class="nm_firstBG nm_background">&nbsp;</div>\r\n\t\t\t\t\t\t<div class="nm_zoomIn" aria-role="button">\n\t\t\t\t\t\t\t<script type="CDATA"  charset="zoomin">\n\t\t\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t\t\t\t<path fill="darkaqua" fill-rule="nonzero" style="enable-background:accumulate;color:#000000;" d="M16,4.875v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z"/>\n\t\t\t\t\t\t\t\t]]>\n\t\t\t\t\t\t\t</script>\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="nm_zoomOut" aria-role="button">\n\t\t\t\t\t\t\t<script type="CDATA" charset="zoomout">\n\t\t\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t\t\t\t<g transform="translate(0,-1018.3622)" id="layer1" style="display:inline">\n\t\t\t\t\t\t\t\t\t\t<rect width="2" height="8" x="517.16022" y="208.91977" transform="matrix(0,1,-1,0,229.9198,523.20198)" id="rect6052" style="color:#000000;fill:darkaqua;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />\n\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t]]>\n\t\t\t\t\t\t\t</script>\n\t\t\t\t\t\t </div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="nm_zoomLevels" aria-expanded="false" aria-hidden="false" role="application" aria-valuemin="0" aria-valuemax="20" aria-valuenow="10">\r\n\t\t\t\t\t\t<div class="nm_zoomSlider" aria-role="button">\r\n\t\t\t\t\t\t\t<div class="nm_secondBG nm_background"></div>\n\t\t\t\t\t\t\t<div class="nm_zoomSliderTrack">\r\n\t\t\t\t\t\t\t\t<div aria-role="button" class="nm_zoomSliderKnob" title="__i18n_ovi.service.map._t42__" draggable="true" unselectable="on">\r\n\t\t\t\t\t\t\t\t\t<span class="nm_thirdBG"></span>\r\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<!-- Dynamically created according to map zoom levels-->\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<ul class="nm_zoomBookmarks" aria-role="listbox">\r\n\t\t\t\t\t\t\t<li class="nm_zoomBookmark nm_zoomBookmark_street" aria-role="option">\r\n\t\t\t\t\t\t\t\t\t<span class=" nm_secondBG nm_background">__i18n_ovi.service.map._t46__</span>\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t<li class="nm_zoomBookmark nm_zoomBookmark_city" aria-role="option">\r\n\t\t\t\t\t\t\t\t\t<span class="nm_secondBG">__i18n_ovi.service.map._t45__</span>\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t<li class="nm_zoomBookmark nm_zoomBookmark_state" aria-role="option">\r\n\t\t\t\t\t\t\t\t\t<span class="nm_secondBG">__i18n_ovi.service.map._t44__</span>\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t<li class="nm_zoomBookmark nm_zoomBookmark_country" aria-role="option">\r\n\t\t\t\t\t\t\t\t\t<span class="nm_secondBG">__i18n_ovi.service.map._t43__</span>\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- zoomBar END -->\n\t\t\n\t\t<div class="nm_arrangeableAnchor nm_bottom">\n\t\t\t<!-- Overview START -->\n\t\t\t<div class="nm_overviewWrap nm_wrap nm_right" aria-expanded="false" unselectable="on" aria-hidden="true" >\n\t\t\t\t<div class="nm_overviewMap" unselectable="on"></div>\n\t\t\t\t<div class="nm_overviewButton nm_singleButton" aria-role="button" unselectable="on">\n\t\t\t\t\t<div class="nm_firstBG"></div>\n\t\t\t\t\t<script type="CDATA" charset="overview">\n\t\t\t\t\t\t<![CDATA[\n\t\t\t\t\t\t\t<path d="m 8,10 l 0,14 l 18,0 l 0,-14 z m 1,1 l 16,0 l 0,12 L 9,23 z" id="rect3114" style="color:#000000;fill:darkaqua;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />\n\t\t\t\t\t\t\t<path d="m 10,12 l 0,10 l 6,0 l 0,-6 l 8,0 l 0,-4 z" id="rect3119" style="color:#000000;fill:darkaqua;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />\n\t\t\t\t\t\t]]>\n\t\t\t\t\t</script>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- Overview END -->\t\n\t\t\t\n\t\t\t<!-- Scalebar START -->\n\t\t\t<!--<div class="nm_scalebarAnchor" aria-hidden="true">-->\n\t\t\t\t<div class="nm_scalebarWrap nm_wrap nm_metric nm_right"  aria-hidden="true" aria-role="button">\n\t\t\t\t\t<div class="nm_scalebarTemplate" aria-role="button">\n\t\t\t\t\t\t<div class="nm_scaleBarExpandableElement"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class="nm_scalebarUnitinfo" aria-hidden="true">__i18n_ovi.service.map._t26__</span>\n\t\t\t\t\t<!--Style definition below is here because it reset everything and in CSS file should be easily changed without any warning.-->\n\t\t\t\t\t<span class="nm_scalebarTextTester" style="text-align: left; font-weight: normal; font-size: 10px; font-family: Arial; font-style: normal; font-variant: normal; text-transform: none; text-decoration: none; visibility: hidden;"></span>\n\t\t\t\t</div>\n\t\t\t<!--</div>-->\n\t\t\t<!-- Scalebar END -->\n\t\t</div>\n\t\t\n\t\t<!-- RightClick menu START -->\n\t\t<div class="nm_rcMenu nm_wrap" aria-hidden="true" aria-role="menu">\n\t\t\t<div class="nm_rcMenuItem"></div>\n\t\t\t<div class="nm_rcMenuSeparator"></div>\n\t\t\t<div class="nm_rcMenuPin"></div>\n\t\t</div>\n\t\t<!-- RightClick menu END -->\n\t</body>\n</html>';
    ovi.provide("nokia.maps.resources.ui.nokia_generic.css");
    nokia.maps.resources.ui.nokia_generic.css =
      '.ovi_mp_controls{font-family:Arial,Helvetica,sans-serif;}.ovi_mp_controls ul,.ovi_mp_controls li,.ovi_mp_controls dl,.ovi_mp_controls dd{padding:0;margin:0;list-style:none;font-size:1em;}.nm_crnode a:hover{color:#0BD!important;}.nm_hidden,.ovi_mp_controls [aria-hidden="true"],.nm_infoBubble[aria-hidden="true"],.nm_rcMenu[aria-hidden="true"]{display:none!important;}.nm_conceal{visibility:hidden;}.ovi_mp_controls [aria-role="button"],.ovi_mp_controls [aria-role="option"],.ovi_mp_controls [aria-role="menuitem"],.ovi_mp_controls [aria-role="menuitemradio"]{min-width:3.4em;min-height:3.4em;cursor:pointer;}[aria-role="menuitemradio"] .nm_firstBG{width:3.2em;height:2.6em;margin:.3em 0;}.nm_layout_horizontal [aria-role="menuitemradio"] .nm_firstBG{margin:.3em 0;}.ovi_mp_controls [aria-disabled="true"]{cursor:default;}.nm_gfx{position:absolute;top:0;}.nm_wrap{-webkit-transform:scale(1);}.nm_hover .nm_wrap{opacity:1;}.nm_wrap:hover,.nm_wrap:focus,.nm_wrap[aria-expanded="true"],[aria-role="menuitemradio"]:focus{outline:none;opacity:1;}.nm_wrap:hover .nm_firstBG,.nm_wrap:focus .nm_firstBG{border-color:#FFF;opacity:1;outline:none;}.nm_firstBG{color:#000F1A;border:.1em solid #E6E6E6;background-image:-webkit-gradient(linear,0% 0,0% 100%,from(#ECECEC),to(#CCC));background-image:-webkit-linear-gradient(top,#ECECEC,#CCC);background-image:-moz-linear-gradient(top,#ECECEC,#CCC);background-image:-ms-linear-gradient(top,#ECECEC,#CCC);background-image:-o-linear-gradient(#ececec,#ccc);background-image:linear-gradient(top,#ECECEC,#CCC);background-color:#DBDBDB;-webkit-border-radius:.3em;-moz-border-radius:.3em;-o-border-radius:.3em;-ms-border-radius:.3em;border-radius:.3em;border-radius:0 \\0/;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ECECEC\',endColorstr=\'#CCCCCC\');}[aria-disabled="true"] .nm_firstBG,.nm_wrap[aria-disabled="true"]:hover .nm_firstBG,.nm_wrap[aria-disabled="true"]:active .nm_firstBG{background-image:none;background-color:#BFBFBF;filter:none;border-color:#E6E6E6;}.nm_firstBG:hover{color:#0BD;}.nm_firstBG:focus,.nm_secondBG:focus,.nm_secondBG:hover{background-color:#0BD;color:white;}.nm_secondBG{color:#E6E6E6;background-color:#000F1A;-webkit-border-radius:.4em;-moz-border-radius:.4em;-o-border-radius:.4em;border-radius:.4em;white-space:nowrap;}.nm_hover [aria-role="button"]:hover .nm_secondBG,.nm_hover [aria-role="option"]:hover .nm_secondBG,.nm_hover [aria-role="menuitem"]:hover .nm_secondBG,.nm_hover [aria-role="menuitemradio"]:hover .nm_secondBG,.ovi_mp_controls [aria-role="button"]:active .nm_secondBG,.ovi_mp_controls [aria-role="option"]:active .nm_secondBG,.ovi_mp_controls [aria-role="menuitem"]:active .nm_secondBG,.ovi_mp_controls [aria-role="menuitemradio"]:active .nm_secondBG,.ovi_mp_controls [aria-role="button"]:focus .nm_secondBG,.ovi_mp_controls [aria-role="option"]:focus .nm_secondBG,.ovi_mp_controls [aria-role="menuitem"]:focus .nm_secondBG,.ovi_mp_controls [aria-role="menuitemradio"]:focus .nm_secondBG,[aria-role="menuitem"][aria-selected="true"] .nm_secondBG,[aria-role="menuitem"][aria-selected="true"]:focus .nm_secondBG,[aria-role="menuitem"][aria-selected="true"]:hover .nm_secondBG,[aria-role="menuitemradio"][aria-checked="true"] .nm_secondBG,[aria-role="menuitemradio"][aria-checked="true"]:focus .nm_secondBG,[aria-role="menuitemradio"][aria-checked="true"]:hover .nm_secondBG{background-color:#0BD;color:#FFF;}[aria-role="menuitem"][aria-selected="true"] .nm_secondBG,[aria-role="menuitemradio"][aria-checked="true"] .nm_secondBG{font-weight:bold;}.ovi_mp_controls [aria-role="button"]:focus .nm_secondBG,.ovi_mp_controls [aria-role="option"]:focus .nm_secondBG,.ovi_mp_controls [aria-role="menuitem"]:focus .nm_secondBG,.ovi_mp_controls [aria-role="menuitemradio"]:focus .nm_secondBG{border:.1em solid #fff;margin:-0.1em;}.ovi_mp_controls [aria-role="button"]:hover .nm_secondBG,.ovi_mp_controls [aria-role="option"]:hover .nm_secondBG,.ovi_mp_controls [aria-role="menuitem"]:hover .nm_secondBG,.ovi_mp_controls [aria-role="menuitemradio"]:hover .nm_secondBG{background-color:#0BD;}.nm_thirdBG{background-image:-webkit-gradient(linear,0% 0,0% 100%,from(#ECECEC),to(#CCC));background-image:-moz-linear-gradient(top,#ECECEC,#CCC);background-image:-o-linear-gradient(#ececec,#ccc);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ECECEC\',endColorstr=\'#CCCCCC\');background-color:#DBDBDB;}[aria-disabled="true"] .nm_thirdBG{background-image:none;background-color:#BFBFBF;}.ovi_mp_controls .nm_wrapperBG{background-color:#000F1A;-webkit-border-radius:.5em;-moz-border-radius:.5em;-o-border-radius:.5em;border-radius:.5em;padding:0 .7em;overflow:hidden;}.nm_wrapperBG li{border-bottom:.1em solid #4E575F;display:block;height:3.2em;}.nm_wrapperBG li:first-child{visibility:hidden;}.nm_contentBG{background-color:#000F1A;-webkit-border-radius:.4em;-moz-border-radius:.4em;-o-border-radius:.4em;border-radius:.4em;}.nm_singleButton{float:inherit;}.nm_singleButton .nm_firstBG{position:relative;width:2.6em;height:2.6em;margin:.3em;}.nm_buttonPair{position:relative;width:1.6em;height:6.8em;overflow:hidden;}.nm_buttonPair .nm_firstBG{width:1.4em;height:6.6em;margin:0 auto;}.nm_buttonPair .nm_zoomIn{margin-top:-6.6em;}.nm_buttonPair .nm_zoomOut{position:absolute;}[aria-expanded="true"] .nm_labelOpen{display:none!important;}[aria-expanded="false"] .nm_labelClose{display:none!important;}[aria-role="menuitemradio"] .nm_gfx{margin:-0.3em 0;}.nm_layout_horizontal [aria-role="menuitemradio"] .nm_gfx{margin:0;}.nm_arrangeableAnchor{position:absolute;width:100%;height:0;}.nm_arrangeableAnchor.nm_top{top:0;}.nm_arrangeableAnchor.nm_middle{top:50%;}.nm_arrangeableAnchor.nm_bottom{bottom:0;}.nm_bottom .nm_wrap{margin-top:-3.4em;}.nm_bottom .nm_gfx{top:auto;bottom:0;}.nm_left{float:left;}.nm_center{margin-left:50%;float:left;}.nm_right{float:right;}.nm_cover{position:absolute;top:0;width:3.4em;height:3.4em;}.nm_zoomHorAnchor{position:absolute;width:100%;top:50%;height:0;}.nm_zoomButtons{position:absolute;top:-3.4em;right:0;width:3.4em;-moz-transition:top 200ms linear,right 200ms linear,height 200ms linear;-webkit-transition:top 200ms linear,right 200ms linear,height 200ms linear;-o-transition:top 200ms linear,right 200ms linear,height 200ms linear;transition:top 200ms linear,right 200ms linear,height 200ms linear;-webkit-transform:scale(1);}.nm_zoomButtons .nm_firstBG{-moz-transition:width 200ms linear,height 200ms linear;-webkit-transition:width 200ms linear,height 200ms linear;-o-transition:width 200ms linear,height 200ms linear;transition:width 200ms linear,height 200ms linear;}.nm_zoomWrap[aria-expanded="false"] .nm_zoomButtons{width:1.7em;height:3.4em;right:-0.2em;top:-1.7em;}.nm_zoomWrap[aria-expanded="false"].nm_left .nm_zoomButtons{left:-0.2em;right:auto;}.nm_zoomWrap[aria-expanded="false"]:active .nm_zoomButtons,.nm_zoomWrap[aria-expanded="false"].nm_active .nm_zoomButtons{top:-1.8em;height:3.6em;}.nm_zoomWrap[aria-expanded="false"]:active .nm_zoomButtons .nm_firstBG,.nm_zoomWrap[aria-expanded="false"].nm_active .nm_zoomButtons .nm_firstBG{height:3.6em;}.nm_zoomWrap[aria-expanded="false"] .nm_zoomButtons .nm_firstBG{width:.7em;height:3.4em;border:none;}.nm_zoomWrap[aria-expanded="false"] .nm_zoomButtons [aria-role="button"]{min-height:1.7em;min-width:1.7em;}.nm_zoomWrap[aria-expanded="false"] .nm_zoomIn{margin-top:-3.4em;}.nm_zoomLevels{position:absolute;right:2.5em;width:3.4em;-moz-transition:right 200ms ease-out,margin-top 200ms linear;-webkit-transition:right 200ms ease-out,margin-top 200ms linear;-o-transition:right 200ms ease-out,margin-top 200ms linear;transition:right 200ms ease-out,margin-top 200ms linear;-webkit-transform:scale(1);}.nm_zoomWrap[aria-expanded="false"] .nm_zoomLevels{right:0;margin-top:-1.7em;}.nm_zoomLevels[aria-expanded="false"]{margin-top:-3.3em;}.nm_zoomLevels[aria-expanded="true"]{margin-top:-6.7em;}.nm_zoomSlider{-webkit-transform:scale(1);}.nm_zoomSlider .nm_secondBG{position:relative;margin:0 auto;-moz-transition:width 200ms linear,height 200ms linear;-webkit-transition:width 200ms linear,height 200ms linear;-o-transition:width 200ms linear,height 200ms linear;transition:width 200ms linear,height 200ms linear;}.nm_zoomWrap[aria-expanded="false"] .nm_secondBG{width:.4em;height:3.3em;}.nm_zoomWrap[aria-expanded="true"] .nm_zoomLevels[aria-expanded="false"] .nm_secondBG{width:.6em;height:6.8em;}.nm_zoomWrap[aria-expanded="true"] .nm_zoomLevels[aria-expanded="false"]:active .nm_secondBG,.nm_zoomWrap[aria-expanded="true"] .nm_zoomLevels[aria-expanded="false"].nm_active .nm_secondBG{height:6.392em;width:.564em;margin-top:.3em;}.nm_zoomLevels[aria-expanded="true"] .nm_zoomSlider .nm_secondBG{width:1.2em;height:13.4em;}.nm_zoomLevels[aria-expanded="true"]:active .nm_secondBG,.nm_zoomLevels[aria-expanded="true"].nm_active .nm_secondBG{width:1.176em;height:13.132em;margin-top:.134em;}.nm_zoomSliderTrack{position:absolute;left:0;width:100%;background-color:transparent;}.nm_zoomWrap[aria-expanded="false"] .nm_zoomSliderTrack{top:.2em;height:2.8em;}.nm_zoomWrap[aria-expanded="true"] .nm_zoomSliderTrack{top:.4em;height:5.8em;}.nm_zoomLevels[aria-expanded="true"] .nm_zoomSliderTrack{height:11.3em;top:1.05em;}.nm_zoomSliderKnob{position:absolute;margin-top:-1.7em;margin-left:0;cursor:pointer;}.nm_zoomSliderKnob[aria-disabled="true"]{width:.4em;height:.2em;min-width:.4em;min-height:.2em;left:1.5em;margin-top:-0.1em;}.nm_zoomSliderKnob .nm_thirdBG{position:absolute;width:.2em;height:.4em;top:0;left:.1em;-webkit-border-radius:.1em;-moz-border-radius:.1em;-o-border-radius:.1em;border-radius:.1em;-moz-transition:width 200ms linear,height 200ms linear;-webkit-transition:width 200ms linear,height 200ms linear;-o-transition:width 200ms linear,height 200ms linear;transition:width 200ms linear,height 200ms linear;}.nm_zoomWrap[aria-expanded="true"] .nm_zoomSliderKnob[aria-disabled="true"]{margin-top:-0.3em;left:1.4em;min-width:0;min-height:0;}.nm_zoomWrap[aria-expanded="true"] .nm_zoomSliderKnob .nm_thirdBG{width:.4em;height:.8em;top:0;left:.1em;-webkit-border-radius:.2em;-moz-border-radius:.2em;-o-border-radius:.2em;border-radius:.2em;}.nm_zoomLevels[aria-expanded="true"] .nm_zoomSliderKnob .nm_thirdBG{width:.8em;height:1.8em;top:.8em;left:1.3em;-webkit-border-radius:.4em;-moz-border-radius:.4em;-o-border-radius:.4em;border-radius:.4em;}.nm_zoomLevels[aria-expanded="true"] .nm_zoomSliderKnob:active .nm_thirdBG{width:.784em;height:1.72em;background-color:red;}.nm_zoomBookmarks{position:absolute;top:0;list-style:none;margin:0;padding:0;-webkit-transform:scale(1);}.nm_right .nm_zoomBookmarks{text-align:right;right:3.4em;}.nm_zoomLevels[aria-expanded="false"] .nm_zoomBookmarks{display:none;}.nm_zoomBookmark{padding:0;line-height:3.4em;}.nm_zoomBookmark .nm_secondBG{width:100%;padding:.1em .6em;white-space:pre;}.nm_left .nm_zoomButtons{left:0;right:auto;}.nm_left .nm_zoomLevels{left:0;right:auto;margin-left:2.5em;}.nm_left .nm_zoomBookmarks{margin-left:3.4em;}.nm_left[aria-expanded="false"] .nm_zoomLevels{margin-left:0!important;margin-top:-1.6em!important;}.nm_positioningWrap{width:3.4em;overflow:hidden;}.nm_positioningWrap[aria-pressed="true"] .nm_pos_icon_normal{display:none;}.nm_positioningWrap[aria-pressed="false"] .nm_pos_icon_pressed{display:none;}.nm_positioningWrap[aria-busy="false"] .nm_pos_icon_busy{display:none;}.nm_positioningWrap[aria-busy="true"] .nm_pos_icon_normal,.nm_positioningWrap[aria-busy="true"] .nm_pos_icon_pressed{display:none;}.nm_positioningWrap:active .nm_firstBG{background-image:none;filter:none;background-color:#333;}.nm_infoBubble{cursor:default;position:absolute;left:400px;top:100px;white-space:normal;outline:none;color:white;-webkit-transform:scale(1);}.nm_bubble{font-family:arial,helvetica,sans;-webkit-border-radius:.4em;-moz-border-radius:.4em;-o-border-radius:.4em;border-radius:.4em;}.nm_infoBubble .nm_bubble_bg{position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;}.nm_noborder{border:0!important;}.nm_bubble_lp0{padding-left:0!important;}.nm_bubble_content{padding:1.5em;font-size:1em;}.nm_bubble_sidelinks{right:1.5em;position:absolute;text-align:right;}.nm_bubble_sidelinks a{color:#595;text-decoration:none;}.nm_hover .nm_bubble_sidelinks a:hover{text-decoration:underline;}.nm_bubble_content a,.nm_bubble_content a:visited{color:white;}.nm_bubble_content h3{font-size:1.2em;color:#000F1A;margin:0 0 .5em 0;border:0;padding:0;}.nm_bubble_content p{margin:0 0 .5em 0;}.nm_bubble_controls{position:absolute;top:-0.3em;right:.3em;}.nm_bubble_controls a{color:#999;text-decoration:none;font-size:2em;}.nm_hover .nm_bubble_controls a:hover{text-decoration:none;}.nm_bubble_linksbar{display:none;margin:0 1.5em;padding:1.0em 0 1.0em 0;border-top:.1em solid #d2d2d2;}.nm_bubble_linksbar a{text-decoration:none;color:#595;padding:0 .7em 0 .5em;border-right:.1em solid #cfcfcf;}.nm_hover .nm_bubble_linksbar a:hover{text-decoration:underline;}.nm_bubble_tail{position:absolute;left:-1.0em;top:-1.0em;}.nm_alignLeftAbove .nm_bubble_tail{left:auto;right:1.1em;top:auto;bottom:.7em;}.nm_alignLeftBelow .nm_bubble_tail{left:auto;right:1.1em;top:-1.0em;}.nm_alignRightAbove .nm_bubble_tail{left:-1.0em;top:auto;bottom:.7em;}.nm_alignRightBelow .nm_bubble_tail{left:-1.0em;top:-1.0em;}.nm_right[aria-role="menubar"]{margin-right:.3em;}.nm_left[aria-role="menubar"]{margin-left:.3em;}.ovi_mp_controls .nm_mapSelectorWrap{position:relative;}.nm_ie78 .nm_mapSelectorWrap{position:relative;float:right;}.nm_mapSettingsWrap{-webkit-transform:scale(1);}.nm_layout_horizontal[aria-role="menubar"] .nm_wrapperBG{height:2.8em;margin-top:.3em;margin-bottom:-3.1em;}.nm_openVertSelector[aria-role="menubar"] .nm_wrapperBG{height:13.5em;margin-bottom:-13.8em;}[aria-role="menubar"][aria-expanded="false"] .nm_wrapperBG{display:none;visibility:hidden;}[aria-role="menubar"] [aria-role="menuitem"] .nm_firstBG,[aria-role="menubar"] [aria-role="menuitemradio"] .nm_firstBG{-webkit-border-radius:0;-moz-border-radius:0;-o-border-radius:0;border-radius:0;}.nm_left[aria-role="menubar"] [aria-role="menu"]:first-child .nm_firstBG,.nm_left[aria-role="menubar"] [aria-role="menuitem"]:first-child .nm_firstBG,.nm_left[aria-role="menubar"] [aria-role="menuitemradio"]:first-child .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menu"]:nth-child(2) .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menuitem"]:nth-child(2) .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menuitemradio"]:nth-child(2) .nm_firstBG,.nm_right[aria-role="menubar"] .nm_lastInGroup[aria-role="menu"] .nm_firstBG,.nm_right[aria-role="menubar"] .nm_lastInGroup[aria-role="menuitem"] .nm_firstBG,.nm_right[aria-role="menubar"] .nm_lastInGroup[aria-role="menuitemradio"] .nm_firstBG,.nm_left[aria-role="menubar"] .nm_firstInGroup[aria-role="menu"] .nm_firstBG,.nm_left[aria-role="menubar"] .nm_firstInGroup[aria-role="menuitem"] .nm_firstBG,.nm_left[aria-role="menubar"] .nm_firstInGroup[aria-role="menuitemradio"] .nm_firstBG{-webkit-border-top-right-radius:.4em;-webkit-border-bottom-right-radius:.4em;-moz-border-radius-topright:.4em;-moz-border-radius-bottomright:.4em;-o-border-top-right-radius:.4em;-o-border-bottom-right-radius:.4em;border-top-right-radius:.4em;border-bottom-right-radius:.4em;border-radius:0 \\0/;}.nm_left[aria-role="menubar"] [aria-role="menu"]:nth-child(2) .nm_firstBG,.nm_left[aria-role="menubar"] [aria-role="menuitem"]:nth-child(2) .nm_firstBG,.nm_left[aria-role="menubar"] [aria-role="menuitemradio"]:nth-child(2) .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menu"]:first-child .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menuitem"]:first-child .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menuitemradio"]:first-child .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menu"]:nth-child(1)+li .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menuitem"]:nth-child(1)+li .nm_firstBG,.nm_right[aria-role="menubar"] [aria-role="menuitemradio"]:nth-child(1)+li .nm_firstBG,.nm_right[aria-role="menubar"] .nm_firstInGroup[aria-role="menu"] .nm_firstBG,.nm_right[aria-role="menubar"] .nm_firstInGroup[aria-role="menuitem"] .nm_firstBG,.nm_right[aria-role="menubar"] .nm_firstInGroup[aria-role="menuitemradio"] .nm_firstBG,.nm_left[aria-role="menubar"] .nm_lastInGroup[aria-role="menu"] .nm_firstBG,.nm_left[aria-role="menubar"] .nm_lastInGroup[aria-role="menuitem"] .nm_firstBG,.nm_left[aria-role="menubar"] .nm_lastInGroup[aria-role="menuitemradio"] .nm_firstBG{-webkit-border-top-left-radius:.4em;-webkit-border-bottom-left-radius:.4em;-moz-border-radius-topleft:.4em;-moz-border-radius-bottomleft:.4em;-o-border-top-left-radius:.4em;-o-border-bottom-left-radius:.4em;border-top-left-radius:.4em;border-bottom-left-radius:.4em;border-radius:0 \\0/;}.nm_right>[aria-role="menu"],.nm_right>[aria-role="menuitem"],.nm_right>[aria-role="menuitemradio"]{float:right;}.nm_left>[aria-role="menu"],.nm_left>[aria-role="menuitem"],.nm_left>[aria-role="menuitemradio"]{float:left;}.nm_layout_horizontal[aria-role="menubar"] .nm_dropDownMenu{height:auto;margin:0;}.nm_layout_horizontal[aria-role="menubar"] .nm_dropDownMenu.nm_layout_horizontal{display:inline;float:inherit;height:auto;background:none;margin:0;}.nm_left .nm_ie78.nm_dropDownMenu{float:left;}.nm_right .nm_ie78.nm_dropDownMenu{float:right;}.nm_left [aria-role="menu"].nm_layout_horizontal dt{float:left;text-align:left;}.nm_right [aria-role="menu"].nm_layout_horizontal dt{float:right;text-align:right;}.nm_dropDownMenu{margin:0;}.nm_dropDownMenu dt .nm_firstBG{display:block;line-height:2.6em;margin:.3em 0;padding:0 1em;font-weight:bold;min-height:2.6em;}.nm_dropDownMenu.nm_layout_horizontal [aria-role="menuitemradio"]{display:inline;float:left;}.nm_right .nm_dropDownMenu.nm_layout_horizontal [aria-role="menuitemradio"]{float:right;}.nm_dropDownMenu[aria-expanded="false"] [aria-role="menuitemradio"]{display:none;}.nm_dropDownMenu dd{line-height:3.4em;margin:0 .6em;white-space:nowrap;}.nm_ie78 .nm_layout_horizontal.nm_dropDownMenu dd{margin:0 .6em;}.nm_mapSelectorWrap.nm_layout_horizontal .nm_dropDownMenu dd{border-bottom:none;}.nm_dropDownMenu dd.nm_last{border-bottom:none;}.nm_dropDownMenu dd .nm_secondBG{display:inline;padding:.5em 1em;margin:0;}.nm_dropDownMenu dd .nm_icon{display:none;position:absolute;left:1.3em;color:white;margin:.6em 0 0;width:2.3em;height:2.3em;background-color:orange;*margin:0;}.nm_right .nm_icon{position:relative;float:left;left:0;}.nm_dropDownMenu .nm_labelClose{color:#00BBDC;font-weight:bold;line-height:3.4em;padding:0 1.2em;}.nm_dropDownMenu[aria-expanded="false"]{background:none;}.nm_dropdown_arrow{width:0;height:0;border:0;border-top:.4em solid #333;border-right:.4em solid transparent;border-left:.4em solid transparent;display:inline-block;padding:.1em 0 0 0;margin:0 .4em 0;}.nm_layout_horizontal .nm_dropdown_arrow{border-right:.3em solid #333;border-top:.3em solid transparent;border-bottom:.3em solid transparent;border-left:0;padding:0;}.nm_layout_horizontal .nm_dropDownMenu:focus .nm_dropdown_arrow,.nm_layout_horizontal .nm_dropDownMenu:hover .nm_dropdown_arrow{border-right-color:#00BBDC;}.nm_rcMenu{font-family:arial,helvetica,sans;padding-bottom:8px;background-color:#000F1A;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#F2333333,endColorstr=#F2333333);zoom:1;position:absolute;z-index:3;width:158px;-moz-border-radius:.4em;-webkit-border-radius:.4em;-o-border-radius:.4em;border-radius:.4em;}.nm_rcMenu,.nm_rcMenu span{color:#fff;font-weight:normal;}.nm_rcMenu .nm_rcMenuItemHeader{background-color:#000;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#F2000000,endColorstr=#F2000000);zoom:1;padding:10px!important;-moz-border-radius-topleft:.4em;-moz-border-radius-topright:.4em;-webkit-border-top-left-radius:.4em;-webkit-border-top-right-radius:.4em;-o-border-top-left-radius:.4em;-o-border-top-right-radius:.4em;border-top-left-radius:.4em;border-top-right-radius:.4em;}.nm_rcMenu .nm_rcMenuItem.top{margin-top:8px;}.nm_rcMenu .nm_rcMenuItem{overflow:hidden;text-align:left;padding:1px 10px 0 10px;cursor:default;}.clickable:hover,.nm_rcMenu.nm_hover .clickable:hover{background-color:#00BBDC;zoom:1;color:#FFF;cursor:pointer;}.nm_rcMenu .nm_rcMenuSeparator{height:0;margin:8px 10px;border-top:1px solid #333;border-bottom:1px solid #666;line-height:0;font-size:0;}.nm_rcMenu .nm_rcMenuSeparatorHeader{margin-left:0;margin-right:0;margin-top:0;line-height:0;}.nm_rcMenuPin{width:32px;height:32px;background:url("assets/ovi/mapsapi/ui/images/ovi_web/controls.png") no-repeat -76px -60px;position:absolute;}.nm_overviewAnchor{margin:.4em;margin-right:0;float:right;margin-top:-29px;}.nm_overviewWrap{margin-bottom:.3em;overflow:hidden;bottom:inherit;width:3.4em;height:3.4em;-webkit-transition:width .3s ease-in-out,height .3s ease-in-out,margin-top .3s ease-in-out;-moz-transition:width .3s ease-in-out,height .3s ease-in-out,margin-top .3s ease-in-out;-o-transition:width .3s ease-in-out,height .3s ease-in-out,margin-top .3s ease-in-out;-ms-transition:width .3s ease-in-out,height .3s ease-in-out,margin-top .3s ease-in-out;transition:width .3s ease-in-out,height .3s ease-in-out,margin-top .3s ease-in-out;}.nm_overviewWrap.anim{width:300px;height:200px;}.nm_overviewMap{width:0;height:0;border:.1em solid #333;background-color:#EEE;}.nm_overviewButton{position:absolute;float:none;bottom:inherit;}.nm_left .nm_overviewButton{left:0;}.nm_right .nm_overviewButton{right:0;}.nm_ie78 .nm_overviewButton{bottom:0;}.nm_ie78 .nm_overviewButton .nm_gfx{top:0;}.nm_overviewWrap[aria-expanded="false"] .nm_overviewMap{display:none;}.nm_bottom .nm_scalebarTemplate .nm_gfx{margin-top:1.3em;bottom:auto;position:static;}';
    (function (f) {
      function e(b) {
        var d = o[b];
        d || a.f("No valid WAI-ARIA name: " + b);
        return d;
      }
      var c = f.ui.nokia_generic,
        b = f.gfx,
        a = f.util,
        g = f.dom,
        d = g.Page,
        i = f.dom.EventTarget,
        j = g.Gr,
        h = c.GfxTemplate,
        m = c.ColorSet,
        l = f.ui.AbstractUIComponent,
        k = g.contains,
        n = ovi.bind,
        p = ovi.dom.addClass,
        o = {
          disabled: "aria-disabled",
          expanded: "aria-expanded",
          hidden: "aria-hidden",
          pressed: "aria-pressed",
          selected: "aria-selected",
          checked: "aria-checked",
          valuenow: "aria-valuenow",
          valuemax: "aria-valuemax",
          valuemin: "aria-valuemin",
          busy: "aria-BUSY",
          role: "aria-role",
        },
        g = d.browser.msie,
        q = !!(d.browser.msie && d.browser.version < 9),
        r = d.browser.touch,
        s = r ? "touch" : "mouse",
        w = r ? "tap" : "click",
        u = r ? "dbltap" : "dblclick",
        v = s + (r ? "start" : "down"),
        x = s + (r ? "end" : "up"),
        z = s + "move",
        E = s + "enter",
        G = s + "leave",
        L = s + "over";
      s += "out";
      var F = d.browser.mobile,
        B = new b.Painter.defaultPainter(),
        d = new m({
          background: "",
          border: "",
          stroke: "#333",
          fill: "#333",
          text: "#333",
        }),
        K = new c.ColorScheme({
          normal: d,
          disable: new m({ stroke: "#999", fill: "#999", text: "#999" }, d),
          focus: new m({ stroke: "#0BD", fill: "#0BD", text: "#0BD" }, d),
          active: new m({ stroke: "#0BD", fill: "#0BD", text: "#0BD" }, d),
        }),
        y = (c.UIComponent = new ovi.Class({
          Extends: f.ui.UIComponent,
          initialize: function (a) {
            var b = this;
            b.fa = n(b, b.fa);
            b.zj = n(b, b.zj);
            b.ea = n(b, b.ea);
            b._super(a);
            b.Cf = ["nm_draggable", "nm_dragging", "nm_pointer", "nm_wait"];
            b.Vc = [];
            b.aj = [];
            b.I = [];
            b.Xi = [];
            b.Pl = {};
            b.Sb = F ? 1.5 : 1;
            b.Bf = "vertical";
            b.Jc = ovi.bind(b, b.Jc);
            b.Wd = ovi.bind(b, b.Wd);
            b.Lp = function () {
              b.$j();
            };
          },
          Statics: {
            CSS_CONCEAL: "nm_conceal",
            EVENT_CLICK: w,
            EVENT_DBLCLICK: u,
            EVENT_LONGPRESS: "longpress",
            EVENT_DOWN: v,
            EVENT_UP: x,
            EVENT_MOVE: z,
            EVENT_ENTER: E,
            EVENT_LEAVE: G,
            EVENT_OUT: s,
            EVENT_OVER: L,
            EVENT_DRAGSTART: "dragstart",
            EVENT_DRAG: "drag",
            EVENT_DRAGEND: "dragend",
            EVENT_DROP: "drop",
            EVENT_FOCUS: "focus",
            EVENT_BLUR: "blur",
            EVENT_KEYDOWN: "keydown",
            LAYOUT_HORIZONTAL: "horizontal",
            LAYOUT_VERTICAL: "vertical",
            CSS_CLASS_PREFIX: "nm_",
            CSS_GFX: "nm_gfx",
          },
          attach: function (a) {
            this._super(a);
            F && p(this.node, "nm_hover");
            if (!q)
              (this.node = i(this.node)),
                this.node.addListener(y.EVENT_KEYDOWN, this.Jc),
                this.node.addListener(y.EVENT_BLUR, this.Wd),
                this.node.setAttribute("tabindex", 0);
          },
          detach: function (a) {
            q ||
              (this.node.removeListener(y.EVENT_KEYDOWN, this.Jc),
              this.node.removeListener(y.EVENT_BLUR, this.Wd));
            this.yo();
            this._super(a);
          },
          getTemplate: function () {
            var a = this.mapDisplay,
              b;
            if (!a.$ui)
              (a.$ui = l.renderTemplate(
                a,
                nokia.maps.resources.ui.nokia_generic.html,
                this.gn(
                  nokia.maps.resources.ui.nokia_generic.css,
                  f.loadPath,
                  /url\([\"\']?((\.\.\/)*[a-zA-Z0-9\/\-\_]*[\.][a-zA-Z0-9]{3,})[\"\']?\)/gi
                )
              )),
                (b = this.getRootNode()),
                (b.style.cssText += ";font-size:" + this.Sb + "em;"),
                (b = b.parentNode.parentNode),
                (b.style.cssText += ";font-size:10px !important;"),
                q && p(b, "nm_ie78");
            return a.$ui;
          },
          rn: function (a) {
            this.lj ? this.ge(a) : (p(this.mapDisplay.K, a), this.Cb(a));
          },
          setCursorDraggable: function () {
            this.rn("nm_draggable");
          },
          setCursorPointer: function () {
            this.rn("nm_pointer");
          },
          setCursorWait: function () {
            this.rn("nm_wait");
          },
          setCursorDefault: function () {
            this.lj = 0;
            this.zg();
            this.Vc.length ? this.sn() : this.Cb();
          },
          setCursorDragging: function () {
            this.lj = 1;
            p(this.mapDisplay.K, "nm_dragging");
            this.Cb("nm_dragging");
            this.ge("nm_draggable");
            this.Ti = setTimeout(this.Lp, 1e3);
          },
          keepCursorDragging: function () {
            if (!this.lj)
              this.setCursorDragging(),
                this.zg(),
                (this.Ti = setTimeout(this.Lp, 500));
          },
          ge: function (a) {
            this.Vc.push(a);
          },
          sn: function () {
            var a = this.Vc.pop();
            p(this.mapDisplay.K, a);
            this.Cb(a);
            this.Vc = [];
          },
          Cb: function (a) {
            for (var b = this.Cf.length, d = this.mapDisplay.K, c; b--; )
              (c = this.Cf[b]) !== a && ovi.dom.removeClass(d, c);
          },
          Jc: function () {},
          Wd: function () {},
          yp: r
            ? function (a) {
                var b = a.currentTarget,
                  d = this.Xi;
                d[d.length - 1] !== b && this.Xi.push(b);
                a && a.preventDefault();
                this.setCssActive(b, !0);
              }
            : a.Q,
          Rs: r
            ? function () {
                var a;
                if ((a = this.Xi[0])) this.Xi.shift(), this.setCssActive(a, !1);
              }
            : a.Q,
          setCssActive: function (a, b) {
            a && ovi.dom[b ? "addClass" : "removeClass"](a, "nm_active");
          },
          $j: function () {
            this.lj = 0;
            this.Cb();
          },
          zg: function () {
            if (this.Ti) clearTimeout(this.Ti), (this.Ti = 0);
          },
          show: function () {
            this.setAria("hidden", !1);
          },
          hide: function () {
            this.setAria("hidden", !0);
          },
          showTooltip: function (a, b) {
            var d = this.mapDisplay.getComponentById("Tooltip");
            (d ||
              this.mapDisplay.components.add((d = new c.TooltipComponent()))) &&
              d.addTooltip(a, b);
          },
          hideTooltip: function () {
            var a = this.mapDisplay.getComponentById("Tooltip");
            a && a.removeTooltip();
          },
          hiddenSetter: function (a) {
            this.node && this.node.setAttribute("aria-hidden", !!a);
            return a;
          },
          ji: function (a) {
            a.preventDefault();
            a.stopPropagation();
          },
          getAria: function (a, b) {
            var d;
            d = (b || this.node).getAttribute(e(a));
            return (
              d === "true" ||
              (d ? (d === "false" ? !1 : (isNaN(d) && d) || +d) : null)
            );
          },
          hasAria: function (a, b) {
            return this.getAria(a, b) !== null;
          },
          hasAriaValue: function (a, b, d) {
            return this.getAria(a, d) === b;
          },
          setAria: function (a, b, d) {
            (d || this.node).setAttribute(e(a), b);
          },
          conceal: function () {
            this.set("conceal", !0);
          },
          reveal: function () {
            this.set("conceal", !1);
          },
          concealSetter: function (a) {
            this.node &&
              ovi.dom[a ? "addClass" : "removeClass"](this.node, "nm_conceal");
            return !!a;
          },
          isConcealed: function (a) {
            return ovi.dom.hasClass(a || this.node, "nm_conceal");
          },
          Ru: function () {
            ovi.dom.toggleClass(this.node, "nm_conceal");
          },
          yu: function () {
            for (var a = this.aj, b = a.length; b--; )
              if (this.getAria("expanded", a[b])) break;
            return b + 1;
          },
          Ft: function () {
            for (var a = 0, b; (b = arguments[a++]); ) this.aj.push(b);
          },
          Vt: a.Q,
          layoutHorizontal: function () {
            this.Bf = "horizontal";
            this.Pa && p(this.Pa, "nm_layout_horizontal");
          },
          layoutVertical: function () {
            this.Bf = "vertical";
            this.Pa && ovi.dom.removeClass(this.Pa, "nm_layout_horizontal");
          },
          triggerRedraw:
            g || F
              ? function (a) {
                  var b = this,
                    d = a || null;
                  b.set("conceal", !0);
                  setTimeout(function () {
                    b.set("conceal", !1);
                    d && d.apply(b, []);
                  }, 50);
                }
              : a.Q,
          ws: function (a) {
            var b = this;
            return function (d, c, h) {
              b.ot(d, c, h, a);
            };
          },
          ot: function (a, b, d, c) {
            var g = a.parentNode,
              a = (this.Pl[d] = { Sg: a, ma: g, So: 0, Bn: {} }),
              i,
              k;
            for (k in c)
              if ((i = c[k]) instanceof m)
                a.Bn[k] = {
                  Tt: new h(
                    /<svg/.test(b)
                      ? b
                      : "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='34' width='34'>" +
                        b +
                        "</svg>",
                    i
                  ),
                };
            this.setGraphics(d, "normal", this.Sb, 0, 0);
            this.gr(g);
          },
          gr: q
            ? function (a) {
                var b = document.createElement("DIV");
                this.findElement("nm_gfx", a);
                b.className = "nm_cover";
                a.appendChild(b);
              }
            : a.Q,
          initGraphics: function (a, b) {
            b = b === "default" ? K : b || { normal: new m() };
            j(a, this.ws(b));
          },
          setGraphics: function (a, d, c, h, g) {
            var c = c || this.Sb,
              h = h || 0,
              g = g & 3 || 0,
              i = this.Pl[a],
              d = d ? i.Bn[d] : i.Bn.normal,
              k = c + "_" + h + "_" + g,
              e = d[k];
            e || (e = d[k] = d.Tt.stencil(c, h, g));
            i.So === c
              ? B.updateElement(e.getIDL(), i.Sg)
              : (i.Sg.parentNode.replaceChild(
                  (d = new b.GraphicsImage(e).createElement()),
                  i.Sg
                ),
                (i.Sg = d),
                (i.So = c),
                (d.className = "nm_gfx nm_gfx_" + a));
            return i.Sg;
          },
          Ki: function () {
            for (var a = arguments.length, b; a--; )
              (b = arguments[a]),
                b.addListener(y.EVENT_OVER, this.fa, !0),
                b.addListener(y.EVENT_DOWN, this.zj, !0),
                b.addListener(y.EVENT_UP, r ? this.ea : this.fa, !0),
                b.addListener(y.EVENT_OUT, this.ea, !0);
          },
          yo: function () {
            for (var a = arguments.length, b; a--; )
              (b = arguments[a]),
                b.removeListener(y.EVENT_OVER, this.fa, !0),
                b.removeListener(y.EVENT_DOWN, this.zj, !0),
                b.removeListener(y.EVENT_UP, r ? this.ea : this.fa, !0),
                b.removeListener(y.EVENT_OUT, this.ea, !0);
          },
          isMouseover: function (a) {
            return (
              !a.relatedTarget ||
              (k(
                a.currentTarget.ownerDocument.documentElement,
                a.relatedTarget
              ) &&
                !k(a.currentTarget, a.relatedTarget))
            );
          },
          isMouseout: function (a) {
            return !a.relatedTarget || !k(a.currentTarget, a.relatedTarget);
          },
          fa: function (a) {
            this.isMouseover(a) &&
              (a = this.getGraphicsIdByNode(a.currentTarget)) &&
              this.setGraphics(a, "focus");
          },
          ea: function (a) {
            this.isMouseout(a) &&
              (a = this.getGraphicsIdByNode(a.currentTarget)) &&
              this.setGraphics(a, "normal");
          },
          zj: function (a) {
            (a = this.getGraphicsIdByNode(a.currentTarget)) &&
              this.setGraphics(a, "active");
          },
          getGraphicsIdByNode: function (a) {
            var b,
              d = this.Pl;
            for (b in d) if (d[b] && d[b].ma === a) return b;
          },
          dk: function () {
            var a = this.getAria("hidden", this.node),
              b = ["menu", "menuitem", "menuitemradio"],
              d = this.node.parentNode.childNodes,
              c = d.length,
              h = b.length,
              g,
              i = [];
            g = ovi.dom;
            var k = g.addClass,
              e = g.removeClass;
            if (c == 1)
              k(this.node, "nm_lastInGroup"), k(this.node, "nm_firstInGroup");
            else {
              for (; c--; )
                if (((g = d[c]), g.nodeType == 1)) {
                  if (g === this.node && !a)
                    e(g, "nm_lastInGroup"), e(g, "nm_firstInGroup"), i.push(g);
                  else
                    for (; h--; )
                      if (
                        this.hasAriaValue("role", b[h], g) &&
                        !this.getAria("hidden", g)
                      ) {
                        e(g, "nm_lastInGroup");
                        e(g, "nm_firstInGroup");
                        i.push(g);
                        break;
                      }
                  h = b.length;
                }
              i.length > 0 &&
                (k(i[0], "nm_firstInGroup"), k(i.pop(), "nm_lastInGroup"));
            }
          },
        }));
      f.ui.UIComponent = y;
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.Overview");
    (function (f) {
      var e = Math,
        c = e.round,
        b = e.min;
      f.map.component.Overview = new ovi.Class({
        Extends: f.ui.UIComponent,
        initialize: function (a) {
          this._super(a);
          this.bb = ovi.bind(this, this.bb);
        },
        d: "Overview",
        A: "0.0.0.1",
        attach: function (a) {
          this._super(a);
          this.mainBgColor = a.D.style.backgroundColor;
          a.addObserver("center", this.Ge, this);
          a.addObserver("zoomLevel", this.Le, this);
          a.addListener("resizeend", this.bb);
        },
        detach: function (a) {
          a.removeObserver("center", this.Ge, this);
          a.removeObserver("zoomLevel", this.Le, this);
          a.removeListener("resizeend", this.bb);
          this._super(a);
        },
        showMap: function (a) {
          if (!this.miniMapDisplay)
            (this.tf = 3),
              (this.miniMapDisplay = new f.map.Display(a, {
                draggable: !1,
                parentDisplay: this.mapDisplay,
                center: this.mapDisplay.center,
                zoomLevel: this.mapDisplay.zoomLevel - this.tf,
              }));
        },
        updateMinimap: function () {
          this.Ge.call(this, null, null, this.mapDisplay.center, null);
          this.Le.call(this, null, null, this.mapDisplay.zoomLevel, null);
        },
        Ge: function (a, b, d) {
          this.miniMapDisplay && this.miniMapDisplay.setCenter(d, "default");
        },
        Le: function (a, b, d) {
          this.miniMapDisplay &&
            ((d =
              d - this.tf >= this.miniMapDisplay.minZoomLevel
                ? d - this.tf
                : this.miniMapDisplay.minZoomLevel),
            this.miniMapDisplay.setZoomLevel(d, "default"));
        },
        bb: function () {
          var a;
          this.expanded &&
            ((a = this.getMinimapDimensions()), this.resize(a.width, a.height));
        },
        getMinimapDimensions: function () {
          return {
            width: b(200, c(this.mapDisplay.C.offsetWidth * 0.25)),
            height: b(150, c(this.mapDisplay.C.offsetHeight * 0.33)),
          };
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.Traffic");
    (function (f) {
      f.map.component.Traffic = new ovi.Class({
        Extends: f.ui.UIComponent,
        attach: function (e) {
          this._super(e);
        },
        detach: function (e) {
          this._super(e);
        },
        d: "Traffic",
        A: "0.0.0.1",
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.PublicTransport");
    (function (f) {
      f.map.component.PublicTransport = new ovi.Class({
        Extends: f.ui.UIComponent,
        attach: function (e) {
          this._super(e);
        },
        detach: function (e) {
          this._super(e);
        },
        d: "PublicTransport",
        A: "0.0.0.1",
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.TypeSelector");
    (function (f) {
      f.map.component.TypeSelector = new ovi.Class({
        Extends: f.ui.UIComponent,
        attach: function (e) {
          this._super(e);
          this.updateType &&
            this.mapDisplay.addObserver("baseMapType", this.updateType, this);
        },
        detach: function (e) {
          this.updateType &&
            this.mapDisplay.removeObserver(
              "baseMapType",
              this.updateType,
              this
            );
          this._super(e);
        },
        d: "TypeSelector",
        A: "0.0.0.1",
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.InfoBubbles");
    (function (f) {
      var e = f.util;
      f.map.component.InfoBubbles = new ovi.Class({
        Extends: f.ui.UIComponent,
        ALIGNMENT_LEFT: "left",
        ALIGNMENT_RIGHT: "right",
        ALIGNMENT_ABOVE: "above",
        ALIGNMENT_BELOW: "below",
        ALIGNMENT_AUTO: "auto",
        DIMENSION_AUTO: "auto",
        openBubbleHandles: null,
        initialize: function (c) {
          var b = this;
          b._super(c);
          b.Bh = function () {
            b.Al();
          };
          b.Ah = function () {
            b.Ia();
            b.zl();
          };
          b.oh = function (a) {
            var c = a.target;
            c.$locationData
              ? (b.addBubble(c.$locationData), a.preventDefault())
              : c.metaData &&
                c.metaData.Search &&
                (b.addBubble(c.metaData.Search), a.preventDefault());
          };
          b.xb = function () {
            b.Ia();
          };
          b.Se = {};
          b.openBubbleHandles = new e.OList();
          b.set(
            "options",
            new e.OObject({
              defaultXAlignment: "right",
              defaultYAlignment: "below",
              defaultWidth: "auto",
              defaultHeight: "auto",
            })
          );
        },
        d: "InfoBubbles",
        A: "0.0.0.1",
        Eh: function (c, b, a) {
          if (b === "remove" && (c = this.Se[a]))
            delete this.Se[a], delete c.fh;
        },
        attach: function (c) {
          this._super(c);
          this.set("openHandlesList", this.openBubbleHandles);
          f.map.plugin && c instanceof f.map.plugin.Display
            ? (c.addListener("mapviewchangestart", this.Bh),
              c.addListener("mapviewchangeend", this.Ah))
            : (c.addObserver("center", this.xb, this),
              c.addObserver("zoomLevel", this.xb, this),
              c.addListener("mapviewchangeend", this.xb));
          c.addListener("click", this.oh);
          this.openBubbleHandles.addObserver(this.Eh, this);
        },
        detach: function (c) {
          for (var b = this.openBubbleHandles, a = b.getLength(); a--; )
            this.removeBubble(b.get(a));
          f.map.plugin && c instanceof f.map.plugin.Display
            ? (c.removeListener("mapviewchangestart", this.Bh),
              c.removeListener("mapviewchangeend", this.Ah))
            : (c.removeObserver("center", this.xb, this),
              c.removeObserver("zoomLevel", this.xb, this),
              c.removeListener("mapviewchangeend", this.xb));
          c.removeListener("click", this.oh);
          this.openBubbleHandles.removeObserver(this.Eh, this);
          this.set("openHandlesList", null);
          this.options.style = null;
          this._super(c);
        },
        addBubble: function (c, b) {
          var a;
          if (this.mapDisplay && !(typeof c === "object" && c.fh != null)) {
            a = this.showBubble(c, b);
            if (typeof c === "object") (this.Se[a] = c), (c.fh = a);
            return a;
          }
        },
        removeBubble: function (c) {
          this.closeBubble(c);
        },
        bubbleExists: function (c) {
          if (!this.openBubbleHandles) return !1;
          return this.openBubbleHandles.indexOf(c) >= 0;
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.RightClick");
    (function (f) {
      var e,
        c,
        b = f.dom.Page;
      f.map.component.RightClick = new ovi.Class({
        Extends: f.ui.UIComponent,
        ENTRY_ZOOMIN: "{$zoomin}",
        ENTRY_ZOOMOUT: "{$zoomout}",
        ENTRY_STARTROUTE: "{$startroute}",
        ENTRY_ADDVIAPOINT: "{$addviapoint}",
        ENTRY_ENDROUTE: "{$endroute}",
        ENTRY_CTXROUTE: "{$ctxroute}",
        ENTRY_REMOVEVIAPOINT: "{$removeviapoint}",
        initialize: function (a) {
          this._super(a);
          this.ud = ovi.bind(this, this.ud);
          this.xd = ovi.bind(this, this.xd);
          this.ra = ovi.bind(this, this.ra);
          this.Aa = [];
          this.Ib = ovi.bind(this, this.Ib);
          this.Jb = ovi.bind(this, this.Jb);
          this.Ig = ovi.bind(this, this.Ig);
          this.hi = ovi.bind(this, this.hi);
          this.hg = ovi.bind(this, this.hg);
          this.gf = ovi.bind(this, this.gf);
          this.he = ovi.bind(this, this.he);
          this.hf = ovi.bind(this, this.hf);
        },
        destroy: function () {
          this.L && this.L.destroy();
          this._super();
        },
        zk: 4,
        d: "RightClick",
        A: "0.0.0.1",
        attach: function (a) {
          var c = this,
            d,
            i;
          c._super(a);
          c.hide();
          a.qc && a.qc();
          a.qc = function () {
            if (ovi.platform.windows || ovi.platform.linux || ovi.platform.mac)
              a.removeListener(
                ovi.platform.mac ? "contextmenu" : "click",
                c.ud
              ),
                a.removeListener("mousedown", c.ra),
                a.removeListener("mousewheel", c.ra);
            b.browser.touch &&
              (a.removeListener("longpress", c.xd),
              a.removeListener("tap", c.ra));
            delete a.qc;
          };
          d = 0;
          for (i = c.mapDisplay.components.getLength(); d < i; d++)
            c.mapDisplay.components.get(d).getId() ==
            "search.component.RightClick"
              ? c.useSearchComponent(c.mapDisplay.components.get(d))
              : c.mapDisplay.components.get(d).getId() ==
                  "routing.component.RightClick" &&
                c.useRouteComponent(c.mapDisplay.components.get(d));
          if (ovi.platform.windows || ovi.platform.linux || ovi.platform.mac)
            a.addListener(ovi.platform.mac ? "contextmenu" : "click", c.ud),
              a.addListener("mousedown", c.ra),
              a.addListener("mousewheel", c.ra);
          a.addListener("mapviewchangestart", c.ra);
          b.browser.touch &&
            (a.addListener("longpress", c.xd), a.addListener("tap", c.ra));
          c.mapDisplay.D.oncontextmenu = function () {
            return !1;
          };
          c.Sd = !1;
        },
        detach: function (a) {
          a.qc && a.qc();
          delete this.L;
          delete this.jf;
          this._super(a);
        },
        ud: function (a) {
          (ovi.platform.mac || a.button == 2) && this.wi(a);
        },
        ra: function (a) {
          (((a.type == "mousedown" || a.type == "tap") && !this.Fn(a.target)) ||
            a.type == "mousewheel" ||
            a.type == "mapviewchangestart") &&
            this.hide();
        },
        Fn: function (a) {
          for (var b = this.node, d; (d = a.parentNode); ) {
            if (d == b) return !0;
            a = a.parentNode;
          }
          return !1;
        },
        xd: function (a) {
          this.wi(a);
        },
        wi: function (a) {
          var b = this.L ? this.L.L : null,
            d;
          a.preventDefault();
          e = this.mapDisplay.pixelToGeo(a.displayX, a.displayY);
          c = new f.util.Point(a.displayX, a.displayY);
          this.clear();
          a = this.mapDisplay.getObjectAt(a.displayX, a.displayY);
          this.move(c);
          a &&
          a.identifier &&
          (a.identifier === "rightClickMarker" || a.identifier === "waypoints")
            ? b &&
              ((d = b.O.length - b.pa - b.za),
              (!d || !((a.text == "A" && !b.za) || (a.text == "B" && !b.pa))) &&
                this.hl(a))
            : this.gl();
        },
        hl: function (a) {
          this.setPinHidden(!0);
          this.addEntry(this.ENTRY_REMOVEVIAPOINT, ovi.bind(this, this.an, a));
          this.show();
        },
        gl: function () {
          var a = this.mapDisplay,
            b = this.L ? this.L.L : null;
          this.jf && this.jf.revGeocode(e);
          this.L &&
            a.zoomLevel > this.zk &&
            (this.addEntry(this.ENTRY_STARTROUTE, this.gf),
            b &&
              (b.pa || b.za) &&
              this.addEntry(this.ENTRY_ADDVIAPOINT, this.he),
            this.Sd || this.addEntry(this.ENTRY_ENDROUTE, this.hf),
            this.addSeparator());
          a.zoomLevel < a.maxZoomLevel &&
            this.addEntry(this.ENTRY_ZOOMIN, this.Ib);
          a.zoomLevel > a.minZoomLevel &&
            this.addEntry(this.ENTRY_ZOOMOUT, this.Jb);
          this.show();
        },
        locationResponse: function (a) {
          var b = "";
          if (ovi.type(a) == "object") {
            var a = a.address,
              d = a.street ? a.street : "",
              c = a.houseNumber ? a.houseNumber : "",
              e = a.city ? a.city : "",
              h = a.postalCode ? a.postalCode : "",
              f = a.state ? a.state : "";
            d + c && (b = d + " " + c + "<br/>");
            h + e && (b += h + " " + e + ", ");
            b += b
              ? a.country
                ? a.country
                : ""
              : (f ? f + ", " : "") + (a.country ? a.country : "");
          } else b = "";
          b && this.addHeader(b);
        },
        an: function (a) {
          this.L.removeWaypoint(a);
          this.hide();
        },
        ar: function () {
          for (var a = this.Aa.length, b = this.mapDisplay.objects; a--; )
            b.remove(this.Aa[a]);
          this.Aa = [];
        },
        Cc: function (a, b, d) {
          a = new f.geo.Coordinate(a, b);
          this.L.setWaypoints(d, a);
        },
        Gq: function (a, b, d) {
          a = new f.map.StandardMarker(a, {
            text: b,
            identifier: "rightClickMarker",
            pos: d,
          });
          this.mapDisplay.objects.add(a);
          return a;
        },
        useRouteComponent: function (a) {
          this.L = a;
        },
        fixDestinationWaypoint: function (a) {
          this.Sd = a;
        },
        useSearchComponent: function (a) {
          this.jf = a;
        },
        Ib: function () {
          this.hide();
          this.mapDisplay.setZoomLevel(
            this.mapDisplay.zoomLevel + 1,
            "default",
            c.x,
            c.y
          );
        },
        Jb: function () {
          this.hide();
          this.mapDisplay.setZoomLevel(
            this.mapDisplay.zoomLevel - 1,
            "default",
            c.x,
            c.y
          );
        },
        gf: function () {
          this.hide();
          this.Cc(e.latitude, e.longitude, "start");
        },
        he: function () {
          this.hide();
          this.Cc(e.latitude, e.longitude, "via");
        },
        hf: function () {
          this.hide();
          this.Cc(e.latitude, e.longitude, "dest");
        },
        Ig: function () {
          this.hide();
        },
        hi: function () {
          this.hide();
        },
        hg: function () {
          this.hide();
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.ZoomBar");
    (function (f) {
      f.map.component.ZoomBar = new ovi.Class({
        Extends: f.ui.UIComponent,
        attach: function (e) {
          this._super(e);
          this.updateZoomLevel &&
            this.mapDisplay.addObserver(
              "zoomLevel",
              this.updateZoomLevel,
              this
            );
        },
        detach: function (e) {
          this.updateZoomLevel &&
            this.mapDisplay.removeObserver(
              "zoomLevel",
              this.updateZoomLevel,
              this
            );
          this._super(e);
        },
        d: "ZoomBar",
        A: "0.0.0.1",
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.OverviewComponent");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = f.dom.EventTarget,
        b = e.UIComponent.EVENT_CLICK,
        a = Math,
        g = a.pow,
        d = a.round;
      e.OverviewComponent = new ovi.Class({
        Extends: f.map.component.Overview,
        build: function () {
          var a = ovi.bind;
          this._super("nm_overviewWrap");
          this.Ua = c(this.findElement("nm_overviewButton", this.node));
          this.Gc = this.findElement("nm_overviewMap");
          this.yh = a(this, this.yh);
          this.ef = a(this, this.ef);
          this.Wh = new f.ui.common.Animator(this.ef, 0.6);
        },
        attach: function (a) {
          this._super(a);
          a = this.Ua;
          this.mainBgColor &&
            (this.Gc.style.backgroundColor = this.mainBgColor);
          this.initGraphics(a, "default");
          this.Ki(a);
          a.addListener(b, this.yh);
          this.Hh();
          this.set("conceal", !1);
          this.triggerRedraw();
        },
        detach: function (a) {
          var d = this.Ua;
          this.set("conceal", !1);
          d.removeListener(b, this.yh);
          this._super(a);
          this.triggerRedraw();
        },
        Jc: function (a) {
          a.nativeEvent.keyCode === 13 && this.yh();
        },
        yh: function () {
          this.expanded ? this.collapse() : this.expand();
          this.setCursorDefault();
        },
        expandedSetter: function (a) {
          a
            ? (this.setAria("expanded", !0, this.node),
              this.showMap(this.Gc),
              (this.Qg = this.getMinimapDimensions()),
              (this.Xh = !1),
              this.resize(this.Qg.width, this.Qg.height))
            : (this.setAria("expanded", !1, this.node),
              (this.Xh = !0),
              this.resize(0, 0),
              this.node.removeAttribute("style"),
              this.Gc.removeAttribute("style"));
          return a;
        },
        resize: function (a, b) {
          var d = this.Gc,
            c = this.node;
          d.style.width = c.style.width = a + "px";
          d.style.height = c.style.height = b + "px";
          c.style.marginTop = -b + 1 + "px";
        },
        wo: 0,
        uo: 0,
        Op: function (a, b) {
          this.Yh = !1;
          this.jq = this.wo;
          this.hq = this.uo;
          this.xr = a - this.jq;
          this.vr = b - this.hq;
          this.Wh.stop();
          this.Wh.start();
          this.wm();
        },
        ef: function (a) {
          var b = -2 * g(a, 3) + 3 * g(a, 2),
            c = this.vr * b;
          this.fn(d(this.jq + this.xr * b), d(this.hq + c));
          if (a == 1) (this.Yh = !0), this.vm(), this.updateMinimap();
        },
        fn: function (a, b) {
          var d = this.Gc,
            c = this.node;
          if (!this.Yh)
            if ((this.Hh(), a + 9 <= 27 || b + 10 <= 31)) {
              if (this.Xh)
                (d.style.width =
                  d.style.height =
                  c.style.width =
                  c.style.height =
                  c.marginTop =
                    ""),
                  (d.style.top = "-29px"),
                  this.setAria("expanded", !1, this.node);
            } else
              (this.wo = a),
                (this.uo = b),
                (d.style.width = c.style.width = a + "px"),
                (d.style.height = c.style.height = b + "px"),
                (d.style.top = -b + "px"),
                (c.style.marginTop = -b + 1 + "px");
        },
        wm: function () {
          var a = new f.dom.Event();
          a.type = "resizestart";
          a.target = this;
          this.dispatch(a);
        },
        Hh: function () {
          var a = new f.dom.Event();
          a.type = "resize";
          a.target = this;
          this.dispatch(a);
        },
        vm: function () {
          var a = new f.dom.Event();
          a.type = "resizeend";
          a.target = this;
          this.dispatch(a);
        },
      });
      f.map.component.Overview = e.OverviewComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.PublicTransportAndTrafficMixin");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = f.dom.EventTarget,
        b = e.UIComponent,
        f = f.dom.Page,
        a = !!(f.browser.msie && f.browser.version < 9),
        g = b.EVENT_CLICK;
      e.PublicTransportAndTrafficMixin = new ovi.Class({
        initialize: function () {
          this.dj = !1;
        },
        build: function () {
          var a = ovi.bind;
          this._super(b.CSS_CLASS_PREFIX + this.Sl);
          this.Ua = c(this.node);
          this.mc = a(this, this.mc);
          this.va = a(this, this.va);
        },
        Ji: function () {
          var a = this.mapDisplay;
          this.initGraphics(this.Ua, "default");
          a.addObserver("baseMapType", this.xh, this);
          a.availableBaseMapTypes.addObserver(this.Nd, this);
          a.addObserver("zoomLevel", this.Nd, this);
          a.addListener("resizeend", this.va);
          this.Nd();
          this.set("conceal", !1);
          this.dk();
        },
        detach: function (a) {
          var b = this.Ua,
            c = this.mapDisplay;
          c.baseMapType === this.Ob && c.set("baseMapType", c.NORMAL);
          this.Ob = null;
          b.removeListener(g, this.mc);
          a.removeObserver("baseMapType", this.xh, this);
          a.availableBaseMapTypes.removeObserver(this.Nd, this);
          a.removeObserver("zoomLevel", this.Nd, this);
          a.removeListener("resizeend", this.va);
          this.set("conceal", !0);
          this.setAria("disabled", null, this.node);
          this._super(a);
          this.dk();
          this.dj = !1;
        },
        xh: function (a, b, c, h) {
          this.dj
            ? (this.dj = !1)
            : h === a.SATELLITE || h === a.TERRAIN
            ? ((a = this.getAria("pressed", this.Ua) ? !0 : !1),
              (b = this.em()),
              a && b ? this.mapDisplay.set("baseMapType", this.Ob) : this.Tg(b))
            : c === this.Ob
            ? (this.setAria("pressed", !0, this.Ua), this.Tg(!0))
            : c === a.TRAFFIC || c === a.SMART_PT || c === a.NORMAL
            ? (this.setAria("pressed", !1, this.Ua), this.Tg(!0), this.ao())
            : this.Tg(!1);
        },
        Nd: function () {
          var a = this.mapDisplay,
            b = this.Ob,
            c = this.em();
          if (!c && this.getAria("pressed", this.Ua)) this.dj = !0;
          a.baseMapType == b && !c && a.set("baseMapType", a.NORMAL);
          a.baseMapType == a.NORMAL &&
            c &&
            this.getAria("pressed", this.Ua) &&
            a.set("baseMapType", b);
          this.Tg(c);
        },
        em: function () {
          var a = this.mapDisplay,
            b = this.Ob,
            c = a.baseMapType;
          return (
            a.availableBaseMapTypes.indexOf(b) >= 0 &&
            a.zoomLevel >= b.minDataZoomLevel &&
            a.zoomLevel <= b.maxDataZoomLevel &&
            (c === a.NORMAL || c === a.SMART_PT || c === a.TRAFFIC)
          );
        },
        mc: function () {
          var a = this.mapDisplay,
            b = this.Ob;
          a.set("baseMapType", a.baseMapType === b ? a.NORMAL : b);
        },
        Tg: function (b) {
          var c = this.Ua,
            e = this.getAria("disabled", c);
          this.ao();
          e !== !b &&
            (this.setAria("disabled", !b, this.node),
            b
              ? (c.addListener(g, this.mc),
                this.Ki(c),
                a || this.node.setAttribute("tabindex", 0))
              : b === !1 &&
                (c.removeListener(g, this.mc),
                this.yo(c),
                a || this.node.removeAttribute("tabindex")));
        },
        ao: function () {
          var a = this.em(),
            b = this.mapDisplay.baseMapType == this.Ob,
            c = this.Sl;
          this.setCssActive(this.node, b);
          a
            ? b
              ? this.setGraphics(c, "active")
              : this.setGraphics(c, "normal")
            : this.setGraphics(c, "disable");
        },
        ea: function (a) {
          this.getAria("pressed", this.Ua) || this._super(a);
        },
        Jc: function (a) {
          a.nativeEvent.keyCode === 13 && this.mc();
        },
        va: function () {
          var a = this.Ob,
            b = this.getRootNode().parentNode.parentNode,
            c = b.clientWidth / this.Sb,
            a = a === this.mapDisplay.TRAFFIC ? 312 : 276;
          b.clientHeight / this.Sb < 356
            ? c < a
              ? this.setAria("hidden", !0)
              : this.setAria("hidden", !1)
            : this.setAria("hidden", !1);
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.TrafficComponent");
    (function (f) {
      var e = f.ui.nokia_generic;
      e.TrafficComponent = new ovi.Class({
        Extends: f.map.component.Traffic,
        Mixins: [e.PublicTransportAndTrafficMixin],
        initialize: function (c) {
          this._super(c);
          this.Sl = "traffic";
          this.Ob = null;
        },
        attach: function (c) {
          this._super(c);
          this.Ob = c.TRAFFIC;
          this.Ji();
        },
      });
      f.map.component.Traffic = e.TrafficComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.PublicTransportComponent");
    (function (f) {
      var e = f.ui.nokia_generic;
      e.PublicTransportComponent = new ovi.Class({
        Extends: f.map.component.PublicTransport,
        Mixins: [e.PublicTransportAndTrafficMixin],
        initialize: function (c) {
          this._super(c);
          this.Sl = "publicTransport";
          this.Ob = null;
        },
        attach: function (c) {
          this._super(c);
          this.Ob = c.SMART_PT;
          this.Ji();
        },
      });
      f.map.component.PublicTransport = e.PublicTransportComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.MapSelectorComponent");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = f.util,
        b = f.dom,
        a = b.EventTarget,
        g = e.UIComponent,
        d = b.Page,
        i = c.Point,
        j = e.SpaceManager,
        h = ovi.dom.addClass,
        m = ovi.dom.removeClass,
        l = g.EVENT_CLICK,
        k = g.EVENT_BLUR,
        n = g.LAYOUT_VERTICAL,
        p = !!(d.browser.msie && d.browser.version < 9),
        o = ovi.Array.indexOf,
        q = "DIV DD DT DL LI UL".split(" ");
      e.MapSelectorComponent = new ovi.Class({
        Extends: f.map.component.TypeSelector,
        ae: null,
        width: 0,
        build: function () {
          this._super("nm_mapSelectorWrap");
          var b = this.mapDisplay,
            c = ovi.bind;
          this.Pa = this.node;
          var d = (this.Zo = a(
              this.findElement("nm_menuItemMapType", this.node)
            )),
            h = (this.Uq = a(
              this.findElement("nm_labelOpen nm_firstBG", this.node)
            )),
            b = (this.Ke = [
              {
                node: a(this.findElement("nm_normal", this.node)),
                type: b.NORMAL,
              },
              {
                node: a(this.findElement("nm_satellite", this.node)),
                type: b.SATELLITE,
              },
              {
                node: a(this.findElement("nm_terrain", this.node)),
                type: b.TERRAIN,
              },
            ]),
            g = b.length;
          this.contract = c(this, this.contract);
          this.vd = c(this, this.vd);
          for (h.i18n = { title: h.getAttribute("title") }; g--; )
            (h = b[g]),
              (h.onClick = c(this, this.kp, h)),
              (h.textNode = this.findElement("nm_secondBG", h.node)),
              (h.i18n = h.textNode.innerHTML);
          a(this.node).disableUserSelect();
          this.mc = c(this, this.mc);
          this.va = c(this, this.va);
          c = this.findElement("nm_labelOpen", d);
          this.$o = { node: c, i18n: c.innerHTML };
          c = this.findElement("nm_labelClose", d);
          this.rs = { node: c, i18n: c.innerHTML };
          this.hide();
          this.onLanguageChange();
          this.va();
          this.contract();
        },
        attach: function (a) {
          this._super(a);
          var b = this.mapDisplay,
            c = this.Ke,
            d = c.length;
          this.Zo.addListener(l, this.mc);
          for (b.addObserver("baseMapType", this.Dn, this); d--; )
            c[d].node.addListener(l, c[d].onClick);
          this.Dn(a, "baseMapType", a.baseMapType);
          this.ae = j.getSpaceManager(a);
          this.fk();
          b.addListener("resizestart", this.contract);
          b.addListener("resizeend", this.va);
          this.show();
          this.set("conceal", !1);
          this.dk();
        },
        detach: function (a) {
          var b = this.mapDisplay,
            c = this.Pa,
            d = this.Ke,
            h = d.length;
          this.Zo.removeListener(l, this.mc);
          c.removeListener(k, this.contract);
          b.removeObserver("baseMapType", this.Dn, this);
          b.removeListener("resizestart", this.contract);
          for (b.removeListener("resizeend", this.va); h--; )
            d[h].node.removeListener(l, d[h].onClick);
          this.ae.removeComponent(this.getId());
          this.hide();
          this._super(a);
          this.dk();
        },
        expand: function () {
          var b = this.ae,
            c = this.node,
            d = c.parentNode,
            g = window.document;
          b && b.setActiveState(this.getId(), "1");
          this.setAria("expanded", !0, c);
          this.setAria("expanded", !0, d);
          this.Bf === n && h(d, "nm_openVertSelector");
          g = a(g);
          g.addListener(l, this.vd);
          this.triggerRedraw();
        },
        contract: function () {
          var a = this.ae,
            b = this.node,
            c = b.parentNode,
            d = window.document;
          a && a.setActiveState(this.getId(), "0");
          this.setAria("expanded", !1, b);
          this.setAria("expanded", !1, c);
          this.Bf === n && m(c, "nm_openVertSelector");
          d.removeListener && d.removeListener(l, this.vd);
          this.triggerRedraw();
        },
        Dn: function (a, b, c) {
          a = this.Ke;
          for (b = a.length; b--; ) a[b].type === c && this.Wp(a[b]);
        },
        Wp: function (a) {
          var b = this.$o.node,
            c = this.Dq;
          c && this.setAria("checked", !1, c.node);
          this.Dq = a;
          this.setAria("checked", !0, a.node);
          p
            ? (b.innerHTML = a.textNode.innerHTML)
            : (b.firstChild.innerHTML = a.textNode.innerHTML);
        },
        vd: function (a) {
          b.contains(this.node, a.target) || this.Wd();
        },
        Wd: function () {
          if (!this.je)
            (this.je = null),
              this.getAria("expanded", this.node) && this.contract(),
              this.Ff();
          this.je = null;
        },
        Jc: function (a) {
          var b = a.target,
            c = a.nativeEvent.keyCode,
            d = this.Bf,
            h = g.LAYOUT_HORIZONTAL,
            i = g.LAYOUT_VERTICAL,
            k = this.Ke,
            e,
            l;
          this.je = b;
          if (b === this.Pa)
            switch (c) {
              case 40:
                k[0].node.focus();
                break;
              case 38:
                k[k.length - 1].node.focus();
                break;
              case 37:
                k[0].node.focus();
                break;
              case 39:
                k[k.length - 1].node.focus();
                break;
              case 13:
                this.getAria("expanded", this.node)
                  ? this.contract()
                  : this.expand();
                this.Ff();
                break;
              case 9:
                (this.je = null), this.Ff();
            }
          else {
            for (l = e = this.Ke.length; l--; ) if (k[l].node === b) break;
            switch (c) {
              case 40:
                if (d === h) break;
                l += 1;
                l === e ? k[0].node.focus() : k[l].node.focus();
                break;
              case 38:
                if (d === h) break;
                l -= 1;
                l < 0 ? k[e - 1].node.focus() : k[l].node.focus();
                break;
              case 37:
                if (d === i) break;
                l += 1;
                l === e ? k[0].node.focus() : k[l].node.focus();
                break;
              case 39:
                if (d === i) break;
                l -= 1;
                l < 0 ? k[e - 1].node.focus() : k[l].node.focus();
                break;
              case 13:
                this.kp(k[l], a);
                break;
              case 9:
                (this.je = null), this.Ff();
            }
          }
        },
        mc: function (a) {
          this.getAria("expanded", this.node) ? this.contract() : this.expand();
          this.je = a.currentTarget;
          this.Ff();
        },
        kp: function (a, b) {
          this.je = b.currentTarget;
          this.mapDisplay.set("baseMapType", a.type);
          this.Wp(a);
        },
        onLanguageChange: function () {
          var a;
          a = this.Uq;
          var b = this.$o,
            c = this.rs,
            d = this.Ke,
            h = d.length;
          a.title = this.translateHtml(a.i18n.title);
          b.node.innerHTML = this.translateHtml(b.i18n);
          c.node.innerHTML = this.translateHtml(c.i18n);
          p
            ? (b.node.innerHTML = this.translateHtml(b.i18n))
            : (b.node.firstChild.innerHTML = this.translateHtml(b.i18n));
          for (c.node.innerHTML = this.translateHtml(c.i18n); h--; )
            (a = d[h].textNode), (a.innerHTML = this.translateHtml(d[h].i18n));
          this.Ff();
        },
        Ff: p
          ? function () {
              var a = this.node,
                b = a.parentNode,
                c = b.childNodes,
                d = 0,
                h,
                i = a.childNodes,
                k = i.length,
                e;
              e = this.getAria("expanded", a);
              var a = this.Bf === g.LAYOUT_VERTICAL,
                l = 0;
              if (e) {
                for (; k--; )
                  (h = i[k]),
                    o(q, h.nodeName) > 0 &&
                      !this.getAria("hidden", h) &&
                      ((e = h.currentStyle || window.getComputedStyle(h)),
                      (h = h.offsetWidth - 0),
                      (h += (e && (e.marginLeft.slice(0, -2) - 0) * 10) || 0),
                      (h += (e && (e.marginRight.slice(0, -2) - 0) * 10) || 0),
                      a ? (d = l = h > l ? h + 2 : l) : ((d += h), (d += 2)));
                for (k = c.length; k--; )
                  if (((h = c[k]), h.nodeName === "LI"))
                    (i = h.offsetWidth), (d += i);
                b.style.width = d / 10 + "em";
              } else b.style.width = "auto";
            }
          : c.Q,
        fk: function () {
          var a = this.ae,
            b = this.Pa,
            c = this.mapDisplay,
            d = ovi.dom.offset(b, c.C),
            h;
          a.registerSpace(
            this.getId(),
            "0",
            (h = new i(d.left, d.top)),
            h.add(new i(b.offsetWidth, b.offsetHeight))
          );
          this.expand();
          d = ovi.dom.offset(b, c.C);
          a.registerSpace(
            this.getId(),
            "1",
            (h = new i(d.left, d.top)),
            h.add(new i(b.offsetWidth, b.offsetHeight))
          );
          this.contract();
        },
        va: function () {
          var a = this.getRootNode().parentNode.parentNode,
            b = a.clientHeight / this.Sb,
            a = a.clientWidth / this.Sb,
            c = this.Ke[2].node,
            h = d.platform.ipad || d.platform.iphone,
            g = d.browser.fullVersion.replace(".", "").substring(0, 2),
            g = h && g >= 51;
          b < 413
            ? (this.layoutHorizontal(),
              a < 368
                ? this.setAria("hidden", !0, c)
                : this.setAria("hidden", !1, c))
            : (!g && h ? this.layoutHorizontal() : this.layoutVertical(),
              this.setAria("hidden", !1, c));
          this.triggerRedraw();
        },
      });
      f.map.component.TypeSelector = e.MapSelectorComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.ZoomBarComponent");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = f.dom.EventTarget,
        b = e.UIComponent,
        a = f.util.Point,
        g = e.SpaceManager,
        d = f.util.lb,
        i = ovi.bind,
        j = Math.round,
        h = Math.floor,
        m = Math.ceil,
        l = [16, 13, 11, 5],
        k = b.EVENT_CLICK,
        n = b.EVENT_DOWN,
        p = b.EVENT_UP,
        o = b.EVENT_LEAVE,
        q = b.EVENT_OUT,
        r = b.EVENT_DBLCLICK,
        s = b.EVENT_LONGPRESS,
        w = f.dom.Page.DOUBLE_CLICK_TIME;
      e.ZoomBarComponent = new ovi.Class({
        Extends: f.map.component.ZoomBar,
        build: function () {
          var a,
            b,
            d = 4;
          this._super("nm_zoomWrap");
          this.disableUserSelect();
          this.Ud = 2;
          this.knobTitle = "";
          this.yk = this.node;
          this.Di = c(this.findElement("nm_zoomIn"), this.node);
          this.Ei = c(this.findElement("nm_zoomOut"), this.node);
          this.xk = c(this.findElement("nm_zoomLevels"), this.node);
          this.uc = c(this.findElement("nm_zoomSlider"), this.node);
          this.Ld = c(
            this.findElement("nm_zoomSliderKnob"),
            this.uc
          ).enableDrag();
          this.Mt = this.findElement("nm_zoomSliderTrack", this.uc);
          this.zf = c(this.findElement("nm_zoomBookmarks"), this.node);
          i(this, this.Xl);
          for (
            a = this.Ub =
              [
                this.findElement("nm_zoomBookmark_street", this.zf),
                this.findElement("nm_zoomBookmark_city", this.zf),
                this.findElement("nm_zoomBookmark_state", this.zf),
                this.findElement("nm_zoomBookmark_country", this.zf),
              ];
            d--;

          )
            (b = this.findElement("nm_secondBG", a[d])),
              (a[d] = {
                outer: c(a[d]),
                inner: b,
                i18n: b.innerHTML,
                onClick: i(this, this.tm, d),
                zoomLevel: l[d],
              });
          this.li = i(this, this.li);
          this.Md = i(this, this.Md);
          this.cg = i(this, this.cg);
          this.eg = i(this, this.eg);
          this.Mc = i(this, this.Mc);
          this.yd = i(this, this.yd);
          this.zd = i(this, this.zd);
          this.Re = i(this, this.Re);
          this.Cj = i(this, this.Cj);
          this.Of = i(this, this.Of);
          this.Gj = i(this, this.Gj);
          this.Fj = i(this, this.Fj);
          this.wj = i(this, this.wj);
          this.vj = i(this, this.vj);
          this.Hs = i(this, this.Hs);
          this.uj = i(this, this.uj);
          this.va = i(this, this.va);
          this.Ft(this.yk, this.xk);
          this.Vf = ovi.bind(this, this.Vf);
          this.onLanguageChange();
          this.hide();
          this.Vt();
        },
        attach: function (a) {
          this._super(a);
          var b = this.uc,
            b = i(b, b.addListener),
            c = this.zf,
            d = this.Ub,
            h = d.length,
            e = this.Di,
            l = i(e, e.addListener),
            j = this.Ei,
            f = i(j, j.addListener),
            m = this.Ld,
            m = i(m, m.addListener),
            w = i(a, a.addObserver);
          this.initGraphics(e, "default");
          this.initGraphics(j, "default");
          this.Ki(e, j);
          w("zoomLevel", this.li);
          w("maxZoomLevel", this.Md);
          w("minZoomLevel", this.Md);
          w("baseMapType", this.Md);
          b(n, this.yd);
          b(p, this.zd);
          b(k, this.Re);
          b(r, this.Cj);
          b(s, this.Gj);
          b(o, this.Fj);
          m(n, this.jp);
          m("dragstart", this.wj);
          m("drag", this.vj);
          m(k, this.uj);
          for (c.addListener(k, this.ji); h--; )
            d[h].outer.addListener(k, d[h].onClick);
          l(n, this.cg);
          l(p, this.Mc);
          l(q, this.Mc);
          f(n, this.eg);
          f(p, this.Mc);
          f(q, this.Mc);
          this.ae = g.getSpaceManager(a);
          this.fk();
          a.addListener("resizestart", this.va);
          this.show();
          this.set("expandLevel", 2);
          this.il();
          this.set("conceal", !1);
        },
        detach: function (a) {
          var b = this.uc,
            c = this.Ld,
            d = this.Di,
            h = this.Ei,
            g = this.Ub,
            i = g.length;
          this._super(a);
          a.removeObserver("zoomLevel", this.li);
          a.removeObserver("maxZoomLevel", this.Md);
          a.removeObserver("minZoomLevel", this.Md);
          a.removeObserver("baseMapType", this.Md);
          b.removeListener(n, this.yd);
          b.removeListener(p, this.zd);
          b.removeListener(k, this.Re);
          b.removeListener(r, this.Cj);
          b.removeListener(s, this.Gj);
          b.addListener(o, this.Fj);
          c.removeListener("dragstart", this.wj);
          c.removeListener("drag", this.vj);
          c.removeListener(n, this.jp);
          c.removeListener(k, this.uj);
          for (this.zf.removeListener(k, this.ji); i--; )
            g[i].outer.removeListener(k, g[i].onClick);
          d.removeListener(n, this.cg);
          d.removeListener(p, this.Mc);
          h.removeListener(n, this.eg);
          h.removeListener(p, this.Mc);
          a.removeListener("resizestart", this.va);
          this.ae.removeComponent(this.getId());
          this.hide();
          this.set("conceal", !0);
        },
        show: function () {
          this._super();
        },
        yl: function () {
          var a = this.expandLevel;
          if (a <= this.Ud)
            if (
              (this.setAria("expanded", !0, this.aj[a]),
              a++,
              this.set("expandLevel", a),
              a === 1)
            )
              (a = this.Sb),
                this.setGraphics("zoomin", null, a, null, null),
                this.setGraphics("zoomout", null, a, null, null);
            else if (a === this.Ud)
              this.setAria("disabled", !1, this.Ld),
                (this.Ld.title = this.knobTitle);
          this.triggerRedraw(this.Xl);
        },
        il: function () {
          var a = this.expandLevel;
          if (a-- >= 0) {
            this.setAria("expanded", !1, this.aj[a]);
            this.set("expandLevel", a);
            if (a < this.Ud)
              this.setAria("disabled", !0, this.Ld), (this.Ld.title = "");
            a === 0 &&
              ((a = this.Sb / 2),
              this.setGraphics("zoomin", null, a, null, null),
              this.setGraphics("zoomout", null, a, null, null));
          }
          this.triggerRedraw();
        },
        expandLevelSetter: function (a) {
          a === this.Ud && this.Xl();
          return a;
        },
        wg: function (a, b) {
          var c = this.mapDisplay,
            g = (b ? h : m)(a);
          c &&
            (this.hk(
              d(g + (g === a) * (b ? -1 : 1), c.minZoomLevel, c.maxZoomLevel),
              !0
            ),
            this.Vf(!0));
        },
        kq: function (a, b) {
          this.Bc = window.setInterval(b ? this.eg : this.cg, 1e3, a);
        },
        Mc: function (a) {
          var b = this.Bc;
          if (b) window.clearInterval(b), (this.Bc = null);
          this.Rs(a);
        },
        cg: function (a) {
          this.yp(a);
          this.wg(this.mapDisplay.zoomLevel);
          this.Bc || this.kq(a);
        },
        eg: function (a) {
          this.yp(a);
          this.wg(this.mapDisplay.zoomLevel, !0);
          this.Bc || this.kq(a, !0);
        },
        yd: function () {
          this.setCssActive(this.xk, !0);
          this.setCssActive(this.yk, !0);
        },
        zd: function () {
          this.setCssActive(this.xk, !1);
          this.setCssActive(this.yk, !1);
        },
        Fj: function () {
          this.setCssActive(this.xk, !1);
          this.setCssActive(this.yk, !1);
        },
        Re: function (a) {
          var b = this;
          if (b.dblTimer)
            window.clearTimeout(this.dblTimer), (b.dblTimer = null);
          b.dblTimer = window.setTimeout(function () {
            b.Of(a);
          }, w);
        },
        Cj: function () {
          if (this.dblTimer)
            window.clearTimeout(this.dblTimer), (this.dblTimer = null);
          this.expandLevel === 0 ? this.yl() : this.il();
        },
        Gj: function (a) {
          a.cancel();
          this.expandLevel === 0 ? this.yl() : this.il();
        },
        Of: function (a) {
          this.expandLevel < this.Ud
            ? this.yl()
            : (this.It(a.targetY || a.nativeEvent.offsetY), this.Vf());
        },
        Jc: function (a) {
          var b = a.nativeEvent.keyCode;
          if (b === 38 || b === 43 || b === 107) this.cg(a), this.Mc(a);
          else if (b === 40 || b === 45 || b === 109) this.eg(a), this.Mc(a);
        },
        Xl: function () {
          var a = this.mapDisplay;
          this.Hp = this.Mt.clientHeight / 100;
          this.Md(a);
          this.li(a, "zoomLevel", a.zoomLevel);
        },
        hk: function (a) {
          var b = this.mapDisplay,
            c = b.maxZoomLevel,
            b = b.minZoomLevel;
          this.vn((d(a, b, c) / (c - b)) * 100);
        },
        It: function (a) {
          this.vn(100 - d(a / this.Hp, 0, 100));
        },
        vn: function (a) {
          a = j(a * this.im) / this.im;
          this.Ld.style.top = 100 - (this.dq = d(a, 0, 100)) + "%";
        },
        Vf: function (a) {
          var b = this.mapDisplay,
            c = d(this.dq * this.im, b.minZoomLevel, b.maxZoomLevel);
          a ? b.setZoomLevel(c, "default") : b.set("zoomLevel", c);
        },
        li: function (a, b, c) {
          this.setAria("valuenow", Math.round(c), this.kd);
          this.hk(c);
        },
        Md: function (a) {
          var b = a.maxZoomLevel,
            c = a.minZoomLevel;
          this.setAria("valuemax", b, this.kd);
          this.setAria("valuemin", c, this.kd);
          this.im = (b - c) / 100;
          this.hk(a.zoomLevel);
        },
        wj: function (a) {
          a.dataTransfer.realTime = !0;
          a.dataTransfer.lift = !1;
          this.Vm = this.dq;
        },
        vj: function (a) {
          if (this.expandLevel === this.Ud)
            (this.Vm = -a.deltaY / this.Hp + this.Vm),
              (a = d(this.Vm, 0, 100)),
              this.vn(a),
              this.co && window.clearTimeout(this.co),
              (this.co = window.setTimeout(this.Vf, 20));
        },
        jp: function (a) {
          this.expandLevel === this.Ud && a.cancel();
        },
        uj: function (a) {
          this.expandLevel === this.Ud && a.cancel();
        },
        tm: function (a) {
          this.hk(this.Ub[a].zoomLevel);
          this.Vf(!0);
        },
        onLanguageChange: function () {
          for (var a = this.Ub, b = a.length, c = this.Ld.title; b--; )
            a[b].inner.innerHTML = this.translateHtml(a[b].i18n);
          this.Ld.title = this.knobTitle = this.translateHtml(c);
        },
        fk: function () {
          var b = this.ae,
            c = this.findElement("nm_zoomSlider"),
            d = this.findElement("nm_zoomBookmarks"),
            h = this.findElement("nm_background"),
            g = this.findElement("nm_zoomButtons").offsetWidth,
            i = this.mapDisplay,
            k,
            e = this.expandLevel,
            l;
          this.set("expandLevel", 0);
          l = ovi.dom.offset(c, i.C);
          ovi.dom.offset(h, i.C);
          b.registerSpace(
            this.getId(),
            "0",
            (k = new a(l.left, l.top)),
            k.add(new a(c.offsetWidth + g, h.offsetHeight))
          );
          this.set("expandLevel", 1);
          l = ovi.dom.offset(c, i.C);
          ovi.dom.offset(h, i.C);
          b.registerSpace(
            this.getId(),
            "1",
            (k = new a(l.left, l.top)),
            k.add(new a(c.offsetWidth + g, c.offsetHeight))
          );
          this.set("expandLevel", 2);
          l = ovi.dom.offset(d, i.C);
          ovi.dom.offset(h, i.C);
          b.registerSpace(
            this.getId(),
            "2",
            (k = new a(l.left, l.top)),
            k.add(new a(d.offsetWidth + c.offsetWidth + g, d.offsetHeight))
          );
          this.set("expandLevel", e);
        },
        va: function () {
          this.fk();
        },
      });
      f.map.component.ZoomBar = e.ZoomBarComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.positioning.component.Positioning");
    (function (f) {
      f.positioning.component.Positioning = new ovi.Class({
        Extends: f.ui.UIComponent,
        initialize: function (e) {
          this._super(e);
          this.responseHandler = ovi.bind(this, this.responseHandler);
          this.DEFAULT_SVG_MARKER_SRC =
            '<svg xmlns="http://www.w3.org/2000/svg" width="34" version="1.1" height="34" baseProfile="tiny" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg2"><path d="m 25.489083,17 c 0,4.688377 -3.800705,8.489083 -8.489083,8.489083 C 12.311621,25.489083 8.510917,21.688377 8.510917,17 c 0,-4.688377 3.800704,-8.489083 8.489083,-8.489083 c 4.688378,0 8.489083,3.800706 8.489083,8.489083 z" id="path3761" style="color:#000000;fill:#ffffff;fill-opacity:0.50196078;stroke:none;stroke-width:1.02183414;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" /><path d="m 25.489083,17 c 0,4.688377 -3.800705,8.489083 -8.489083,8.489083 C 12.311621,25.489083 8.5109169,21.688377 8.5109169,17 C 8.5109169,12.311623 12.311621,8.510917 17,8.510917 c 4.688378,0 8.489083,3.800706 8.489083,8.489083 z" id="path5230" style="color:#000000;fill:none;stroke:#00bbdc;stroke-width:1.02183414;stroke-linecap:butt;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" /><path d="m 22,17 c 0,2.761417 -2.238583,5 -5,5 c -2.761417,0 -5,-2.238583 -5,-5 c 0,-2.761417 2.238583,-5 5,-5 c 2.761417,0 5,2.238583 5,5 z" id="path3218" style="color:#000000;fill:#00bbdc;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" /></svg>';
        },
        d: "Positioning",
        A: "0.0.0.1",
        accuracyCircle: null,
        build: function (e) {
          e && this._super(e);
        },
        removeCircle: function () {
          this.accuracyCircle &&
            this.mapDisplay.objects.remove(this.accuracyCircle);
          this.accuracyCircle = null;
          this.positionMarker &&
            this.mapDisplay.objects.remove(this.positionMarker);
          this.positionMarker = null;
        },
        detach: function (e) {
          this.removeCircle();
          this._super(e);
        },
        requestPosition: function (e, c) {
          var b = this,
            a;
          f.positioning.Manager &&
            ((a = new f.positioning.Manager()),
            a.getCurrentPosition(function (a) {
              b.responseHandler(a);
              e(a);
            }, c));
        },
        responseHandler: function (e) {
          var c = e.coords,
            e = new f.map.Circle(c, c.accuracy, this.no || {}),
            b = new f.gfx.SvgParser(),
            b = new f.gfx.GraphicsImage(
              b.parseSvg(this.DEFAULT_SVG_MARKER_SRC)
            ),
            c = new f.map.Marker(c, {
              icon: b,
              anchor: [b.width / 2, b.height / 2],
            });
          this.removeCircle();
          this.showPosition(e, c);
          this.accuracyCircle = e;
          this.positionMarker = c;
        },
        showPosition: function (e, c) {
          this.mapDisplay.objects.addAll([e, c]);
          this.mapDisplay.zoomTo(e.getBoundingBox(), !1);
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.InfoBubbleComponent");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = f.util,
        b = f.dom.EventTarget,
        a = (e.InfoBubbleComponent = new ovi.Class({
          Extends: f.map.component.InfoBubbles,
          initialize: function () {
            this._super();
            this.Ii.x = this.Yc.x *= this.Sb;
            this.Ii.y = this.Yc.y *= this.Sb;
            this.os = new c.ObjectFormatter();
            this.Ia = ovi.bind(this, this.Ia);
          },
          Statics: {
            ADDRESS_FORMAT:
              "[[{{address.street}} {{address.houseNumber}}, ]][[{{address.postalCode}}]][[{{address.city}}, ]][[{{address.county}} ,]][[{{address.country}}]]",
            GEOCOORD_FORMAT: "Longitude: {{longitude}}, Latitude: {{latitude}}",
            FORMATTER: new c.ObjectFormatter(),
          },
          Bt: null,
          us: !1,
          Yn: -1,
          Zr: -1,
          ks: !1,
          j: { x: 0, y: 0 },
          ts: 0,
          md: 0,
          zc: 280,
          ss: 0,
          ps: 0,
          cc: 80,
          ep: "",
          Fu: "",
          Gu: "",
          Ii: { x: 0, y: 0 },
          gu: !0,
          Wc: 0,
          Yc: { x: 6, y: -10 },
          ga: { longitude: 0, latitude: 0 },
          pg: null,
          Ur: !1,
          supportsMultiBubble: !1,
          build: function () {
            this._super("nm_infoBubble");
            this.node = f.dom.cloneNode(this.node, !0);
            b(this.node);
            this.qg = this.findElement("nm_bubble", this.node);
            this.Ag = b(this.findElement("nm_bubble_control_close", this.qg));
            this.pg = this.findElement("nm_bubble_content", this.qg);
            this.St = b(this.findElement("nm_bubble_tail", this.qg));
            this.nu = this.findElement("nm_bubble_bg", this.qg);
            this.mapDisplay.mb.appendChild(this.node);
            this.cd = ovi.bind(this, this.cd);
          },
          attach: function (a) {
            this._super(a);
            this.initGraphics(this.St);
            this.Ag.addListener("click", this.cd);
            this.mapDisplay.addListener("resize", this.Ia);
            this.mapDisplay.addListener("resizeend", this.Ia);
            this.node.style.cssText += ";font-size:" + this.Sb + "em;";
            this.hide();
          },
          detach: function (a) {
            this.Ag.removeListener("click", this.cd);
            this.mapDisplay.removeListener("resize", this.Ia);
            this.mapDisplay.removeListener("resizeend", this.Ia);
            this._super(a);
          },
          optionsSetter: function (a) {
            var b = this.options;
            b &&
              (b.removeObserver("defaultXAlignment", this.La, this),
              b.removeObserver("defaultYAlignment", this.La, this),
              b.removeObserver("defaultWidth", this.La, this),
              b.removeObserver("defaultHeight", this.La, this));
            a &&
              (a.addObserver("defaultXAlignment", this.La, this),
              a.addObserver("defaultYAlignment", this.La, this),
              a.addObserver("defaultWidth", this.La, this),
              a.addObserver("defaultHeight", this.La, this));
            return a;
          },
          La: function (a, b, c) {
            switch (b) {
              case "defaultXAlignment":
              case "defaultYAlignment":
                this.mn(this);
                break;
              case "defaultWidth":
                this.setBubbleSize(c, this.options.defaultHeight);
                break;
              case "defaultHeight":
                this.setBubbleSize(this.options.defaultWidth, c);
            }
          },
          showBubble: function (a, b) {
            this.closeBubble();
            this.ok.prototype.show.call(this);
            this.updateBubble(0, a, b);
            this.openHandlesList && this.openHandlesList.add(0);
            return 0;
          },
          updateBubble: function (b, c, i) {
            var e,
              h,
              f,
              b = a.FORMATTER,
              l = this.options;
            typeof c === "string"
              ? (f = c)
              : c.address
              ? c.address.label
                ? ((e = c.address.label), (h = b.format(c, a.ADDRESS_FORMAT)))
                : (e = b.format(c, a.ADDRESS_FORMAT))
              : i && i.longitude
              ? (e = b.format(i, a.GEOCOORD_FORMAT))
              : (f = c);
            this.setContent(e, h, f);
            this.setGeoPosition(i || this.ga);
            this.setBubbleSize(l.defaultWidth, l.defaultHeight);
          },
          restyleTail: function () {},
          closeBubble: function () {
            this.openHandlesList && this.openHandlesList.remove(0);
            this.ok.prototype.hide.call(this);
          },
          Ia: function () {
            this.setGeoPosition(this.ga);
          },
          Al: function () {
            that.set("conceal", !0);
          },
          zl: function () {
            that.set("conceal", !1);
          },
          setContent: function (a, b, c) {
            this.pg.innerHTML = this.Om(a, b, c);
            this.di(this);
          },
          setGeoPosition: function (a) {
            this.ga = a = f.geo.Coordinate.fromObject(a);
            this.rf(this);
          },
          setBubbleSize: function (a, b) {
            if (this.mapDisplay) {
              var c,
                e = this.node.style;
              e.whiteSpace = "nowrap";
              e.width = "";
              if (
                a !== "auto" &&
                ((e.whiteSpace = "normal"),
                (c = this.node.offsetWidth),
                c <= a - this.Wc * 2)
              )
                e.width = a - this.Wc * 2 + "px";
              e.height = "";
              if (
                b !== "auto" &&
                ((e.whiteSpace = "normal"),
                (c = this.node.offsetHeight),
                c <= b - this.Wc * 2)
              )
                e.height = b - this.Wc * 2 + "px";
              this.di(this);
            }
          },
          Rn: function () {
            if (this.mapDisplay) {
              var a = this.node,
                b = this.options;
              if (!this.hidden)
                (this.zc = a.offsetWidth), (this.cc = a.offsetHeight);
              b &&
                (b.set("actualWidth", this.zc), b.set("actualHeight", this.cc));
            }
          },
          cd: function () {
            this.closeBubble();
          },
          rf: function () {
            if (!this.getAria("hidden")) {
              var a = this.mapDisplay,
                b = a.width,
                c = a.height,
                e = a.padding,
                h = a.geoToPixel(this.ga),
                f = this.Yc.x,
                l = this.Yc.y,
                k = this.zc + f,
                n = this.cc,
                p = this.options,
                a = p.defaultXAlignment,
                p = p.defaultYAlignment,
                o = this.node,
                q = "nm_infoBubble nm_align";
              a === "right" && (a = h.x + k > b - e.right ? "left" : "right");
              a === "left" && (a = h.x - k <= e.left ? "right" : "left");
              p === "below" && (p = h.y + n > c - e.bottom ? "above" : "below");
              p === "above" && (p = h.y - n <= e.top ? "below" : "above");
              b = a === "left" ? h.x - k : h.x + f + 6;
              c = p === "above" ? h.y - (n - l) : h.y - l;
              q += a === "left" ? "Left" : "Right";
              q += p === "above" ? "Above" : "Below";
              o.className = q;
              o.style.left = b + "px";
              o.style.top = c + "px";
              if (this.ep !== q) (this.ep = q), this.Jr(a, p);
            }
          },
          Jr: function (a, b) {
            var c = this.options,
              e = 0;
            a !== c.defaultXAlignment &&
              ((e = 1), c.set("actualXAlignment", a));
            b !== c.defaultYAlignment &&
              ((e += 2), c.set("actualYAlignment", b));
            this.setGraphics("infobubble", null, null, null, e);
          },
          mn: function (a) {
            window.setTimeout(function () {
              a.rf();
            }, 0);
          },
          di: function (a) {
            window.setTimeout(function () {
              a.Rn();
              a.rf();
            });
          },
          setPixelPosition: function (a, b) {
            this.ga = this.maDisplay.pixelToGeo(a, b);
            this.Mq();
            this.Dt({ x: a, y: b });
          },
          gt: function () {
            this.Yn = this.Zn(this.mapDisplay.zoomLevel());
          },
          Zn: function (a) {
            if (a >= 14) return 14;
            else if (a >= 10 && a <= 13) return 10;
            else if (a >= 0 && a <= 9) return 9;
            return 0;
          },
          Om: function (a, b, c) {
            var e = "",
              a = a || "",
              b = b || "",
              c = c || "";
            a && (e += '<h3 class="nm_bubble_content_title">' + a + "</h3>");
            b &&
              (e += '<p class="nm_bubble_content_description">' + b + "</p>");
            c && (e = c);
            return e;
          },
        }));
      f.map.component.InfoBubbles = e.InfoBubbleComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.RightClickComponent");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = f.dom,
        b = f.dom.EventTarget,
        a = f.dom.Page.browser.touch,
        g = ovi.dom.addClass,
        d = ovi.dom.removeClass,
        i = {
          "{$zoomin}": "rightClickMenu.zoomIn",
          "{$zoomout}": "rightClickMenu.zoomOut",
          "{$startroute}": "rightClickMenu.setStartWaypoint",
          "{$addviapoint}": "rightClickMenu.addWaypoint",
          "{$endroute}": "rightClickMenu.setDestinationWaypoint",
          "{$removeviapoint}": "rightClickMenu.removeRoutePoint",
        },
        j = e.UIComponent.EVENT_CLICK;
      e.RightClickComponent = new ovi.Class({
        Extends: f.map.component.RightClick,
        build: function () {
          var a,
            b,
            c = ovi.bind;
          this._super("nm_rcMenu");
          a = this.node.parentNode;
          b = this.node = this.node.cloneNode(!0);
          a.appendChild(b);
          this.xl = b.removeChild(this.findElement("nm_rcMenuItem"), b);
          this.ei = b.removeChild(this.findElement("nm_rcMenuSeparator"), b);
          this.zb = b.parentNode.appendChild(
            this.findElement("nm_rcMenuPin"),
            b
          );
          this.vd = c(this, this.vd);
          this.clear();
          this.hide();
        },
        Km: 32,
        Jm: 32,
        Xj: !1,
        addEntry: function (a, b, c) {
          a = this.Hg(this.translate(i[a]) || a, b);
          this.rb
            ? this.rb == 1 &&
              this.bc &&
              g(this.addSeparator(), "nm_rcMenuSeparatorHeader")
            : c
            ? (g(a, "nm_rcMenuItemHeader"), (this.bc = !0))
            : g(a, "top");
          this.mh[this.rb] = { node: a, listener: b };
          this.node.appendChild(a);
          this.rb++;
        },
        addHeader: function (a, b) {
          var c = this.node,
            k;
          if (!this.bc)
            this.rb
              ? (d(c.firstChild, "top"),
                (seperator = this.ei.cloneNode(!0)),
                g(seperator, "nm_rcMenuSeparatorHeader"),
                c.insertBefore(seperator, c.firstChild),
                (k = this.Hg(a, b)),
                g(k, "nm_rcMenuItemHeader"),
                (this.bc = !0),
                c.insertBefore(k, c.firstChild),
                this.rb++)
              : this.addEntry(a, b, !0);
        },
        updateHeaderContent: function (a) {
          this.bc ||
            f.util.Za(
              "Header content could not be updated: No header was added to the right click menu."
            );
          this.node.firstChild.innerHTML = a;
        },
        addSeparator: function () {
          return this.node.appendChild(this.ei.cloneNode(!0));
        },
        clear: function () {
          var a, b;
          this.node.innerHTML = "";
          this.rb = 0;
          this.bc = !1;
          if ((b = this.mh))
            for (a = 0; a < b.length; a++)
              b[a].listener && b[a].node.removeListener("click", b[a].listener);
          this.mh = [];
          this.setPinHidden(!1);
        },
        move: function (a) {
          var b = Math.round,
            c = this.node;
          this.zb.style.left = a.x - b(this.Km / 2) + "px";
          this.zb.style.top = a.y - b(this.Jm / 2) + "px";
          c.style.left = a.x + "px";
          c.style.top = a.y + "px";
        },
        zr: function () {
          var a = this.node,
            b = a.style.left.slice(0, -2),
            c = a.style.top.slice(0, -2),
            d = a.offsetWidth,
            g = a.offsetHeight,
            e = this.mapDisplay,
            i = e.height;
          if (e.width - b < d) a.style.left = b - d + "px";
          if (i - c < g) a.style.top = c - g + "px";
        },
        setPinHidden: function (a) {
          var c = window.document;
          if ((this.Xj = a))
            this.setAria("hidden", !0, this.zb),
              (this.zb.style.display = "none"),
              c.removeListener && c.removeListener(j, this.vd);
          else if (!this.getAria("hidden"))
            this.setAria("hidden", !1, this.zb),
              (c = b(c)),
              c.addListener(j, this.vd),
              this.zr(),
              (this.zb.style.display = "");
        },
        vd: function (a) {
          c.contains(this.node, a.target) || this.Wd();
        },
        Wd: function () {
          this.clear();
          this.hide();
        },
        hide: function () {
          this._super();
          this.setPinHidden(!0);
          this.triggerRedraw();
        },
        show: function () {
          this._super();
          this.setPinHidden(!1);
        },
        Hg: function (c, d) {
          var e = this.xl.cloneNode(!0),
            k;
          e.innerHTML = c;
          ovi.type(d) == "function" &&
            ((k = b(e)).addListener("click", d),
            a && k.addListener("tap", d),
            g(e, "clickable"));
          return e;
        },
      });
      f.map.component.RightClick = e.RightClickComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.map.component.ScaleBar");
    (function (f) {
      f.map.component.ScaleBar = new ovi.Class({
        Extends: f.ui.UIComponent,
        d: "ScaleBar",
        A: "0.0.0.1",
        attach: function (e) {
          this._super(e);
          this.updateScale &&
            this.mapDisplay
              .addObserver("zoomLevel", this.updateScale, this)
              .addObserver("center", this.updateScale, this)
              .addObserver("copyrightWidth", this.updateScale, this);
        },
        detach: function (e) {
          this.updateScale &&
            this.mapDisplay
              .removeObserver("zoomLevel", this.updateScale, this)
              .removeObserver("center", this.updateScale, this)
              .removeObserver("copyrightWidth", this.updateScale, this);
          this._super(e);
        },
        showImperialUnits: !1,
        showImperialUnitsSetter: function (e) {
          this.switchUnit(e);
          return e;
        },
        calculateMPP: function () {
          var e;
          e = this.mapDisplay;
          var c = e.C.offsetHeight,
            b;
          f.map.plugin &&
          f.map.plugin.npapi &&
          e instanceof f.map.plugin.npapi.Display
            ? (e = e.zoomScale / 100)
            : e.geoToPixel({ latitude: 90, longitude: 0 }).y < 0 &&
              e.geoToPixel({ latitude: -90, longitude: 0 }).y > c
            ? (e = e.pixelToGeo(0, c / 2).distance(e.pixelToGeo(1, c / 2)))
            : ((c = new f.geo.Coordinate(0, 0)),
              (b = e.geoToPixel(c)),
              (e = e.pixelToGeo(b.x + 1, b.y).distance(c)));
          return e;
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.PositioningComponent");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = f.dom.EventTarget,
        b = e.UIComponent.EVENT_CLICK,
        a = e.ColorSet,
        g = new e.ColorScheme({
          normal: new a({ stroke: "#333", fill: "#333" }),
          disable: new a({ stroke: "#D6D6D6", fill: "#D6D6D6" }),
          focus: new a({ stroke: "#333", fill: "#00BBDC" }),
          active: new a({ stroke: "#FFF", fill: "#FFF" }),
        }),
        d = new e.ColorScheme({
          normal: new a({ stroke: "#333", fill: "#00BBDC" }),
          focus: new a({ stroke: "#333", fill: "#333" }),
          active: new a({ stroke: "#FFF", fill: "#FFF" }),
        }),
        i = new e.ColorScheme({
          normal: new a({ stroke: "#0099BB", fill: "#0099BB" }),
          focus: new a({ stroke: "#333", fill: "#333" }),
          active: new a({ stroke: "#333", fill: "#333" }),
        });
      e.PositioningComponent = new ovi.Class({
        Extends: f.positioning.component.Positioning,
        build: function () {
          this._super("nm_positioningWrap");
          this.Pa = c(this.node);
          this.ko = c(this.findElement("nm_pos_icon_normal"), this.Pa);
          this.lo = c(this.findElement("nm_pos_icon_pressed"), this.Pa);
          this.jo = c(this.findElement("nm_pos_icon_busy"), this.Pa);
          this.Gh = ovi.bind(this, this.Gh);
        },
        attach: function (a) {
          this._super(a);
          a = this.Pa;
          this.initGraphics(this.ko, g);
          this.initGraphics(this.lo, d);
          this.initGraphics(this.jo, i);
          f.positioning.Manager
            ? (a.addListener(b, this.Gh), this.Ki(this.ko, this.lo, this.jo))
            : (this.setAria("disabled", !0, a),
              this.setGraphics("positioning_normal", "disable"));
          this.set("conceal", !1);
        },
        detach: function (a) {
          nokia.maps.positioning.Manager && this.Pa.removeListener(b, this.Gh);
          this._super(a);
        },
        Gh: function () {
          var a = this,
            b = a.Pa;
          a.getAria("pressed", b)
            ? (a.removeCircle(), a.setAria("pressed", !1, b))
            : (a.setAria("pressed", !0, b),
              a.setAria("busy", !0, b),
              (a.no = {
                pen: { strokeColor: "#00BBDC", lineWidth: 2 },
                brush: { color: "#FFFFFF99" },
              }),
              a.requestPosition(
                function () {
                  a.setAria("busy", !1, b);
                },
                function () {
                  setTimeout(function () {
                    a.setAria("pressed", !1, b);
                    a.setAria("busy", !1, b);
                  }, 8e3);
                }
              ));
        },
        Jc: function (a) {
          !this.getAria("disabled", this.node) &&
            a.nativeEvent.keyCode === 13 &&
            this.Gh();
        },
      });
      f.positioning.component.Positioning = e.PositioningComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.ui.nokia_generic.ScaleBarComponent");
    (function (f) {
      var e = f.ui.nokia_generic,
        c = f.gfx,
        b = f.dom.EventTarget,
        a = e.UIComponent,
        g = a.EVENT_CLICK,
        d = a.EVENT_OVER,
        i = a.EVENT_OUT,
        j = a.EVENT_FOCUS,
        h = a.EVENT_BLUR,
        m = a.CSS_GFX,
        l = Math,
        k = l.floor,
        n = l.round,
        p = c.GraphicsImage,
        o = c.Color.parseCss,
        c = e.ColorSet,
        q = new e.ColorScheme({
          normal: new c({ stroke: "#DDD", fill: "#000" }),
          focus: new c({ stroke: "#FFF", fill: "#0bd" }),
        }),
        r = (e.ScaleBarComponent = new ovi.Class({
          Extends: f.map.component.ScaleBar,
          Statics: { Ck: 0.3048006, gg: 1609.344, Dk: 0.6 },
          build: function () {
            var a = ovi.bind;
            this._super("nm_scalebarWrap");
            this.Pa = this.node;
            this.Fr = this.Nc = b(
              this.findElement("nm_scaleBarExpandableElement")
            );
            this.pf = this.findElement("nm_scalebarUnitinfo");
            this.pq = this.findElement("nm_scalebarTextTester");
            this.tq = this.pf.innerHTML;
            this.pq.style.font = "bold 10px Arial";
            this.qf = a(this, this.be);
            this.Hb = a(this, this.Hb);
            this.Gb = a(this, this.Gb);
            this.ya = a(this, this.ya);
            this.Kg = q.normal;
            this.bi = null;
            this.onLanguageChange();
          },
          attach: function (a) {
            this._super(a);
            a = this.Nc;
            this.mapDisplay.addListener("mapviewchangeend", this.ya);
            a.addListener(g, this.qf);
            a.addListener(d, this.Hb);
            a.addListener(i, this.Gb);
            a.addListener(j, this.Hb);
            a.addListener(h, this.Gb);
            this.show();
            this.ya();
            this.set("conceal", !1);
          },
          detach: function (a) {
            var b = this.Nc;
            this.mapDisplay.removeListener("mapviewchangeend", this.ya);
            b.removeListener(g, this.qf);
            b.removeListener(d, this.Hb);
            b.removeListener(i, this.Gb);
            b.removeListener(j, this.Hb);
            b.removeListener(h, this.Gb);
            this.Mp();
            this.bi = null;
            this._super(a);
            this.hide();
            this.set("conceal", !0);
          },
          show: function () {
            this._super();
          },
          fa: function () {
            this.setCursorPointer();
            this.Kg = q.focus;
            this.ya();
          },
          ea: function () {
            this.setCursorDefault();
            this.Kg = q.normal;
            this.ya();
          },
          Jc: function (a) {
            a.nativeEvent.keyCode === 13 && this.be(a);
          },
          be: function (a) {
            a && (a.preventDefault(), a.stopPropagation());
            this.Kg = q.normal;
            this.set("showImperialUnits", !this.Lb);
          },
          switchUnit: function (a) {
            (this.Lb = a)
              ? (ovi.dom.removeClass(this.Nc, "nm_metric"),
                ovi.dom.addClass(this.Nc, "nm_imperial"))
              : (ovi.dom.removeClass(this.Nc, "nm_imperial"),
                ovi.dom.addClass(this.Nc, "nm_metric"));
            this.ya();
          },
          Hb: function (a) {
            if (this.isMouseover(a))
              this.fa(),
                (this.node.title = this.translate(
                  "ovi.service.map._" + (this.Lb ? "t30" : "t29")
                ));
          },
          Gb: function (a) {
            this.isMouseout(a) && this.ea();
          },
          ya: function () {
            var a = this.mapDisplay.D,
              b = this.calculateMPP();
            if (this.or != b)
              (this.nr = b),
                this.calculateDistance(b),
                (b = k((this.ai / this.rl) * 100)),
                (this.md = n(r.Dk * a.offsetWidth)),
                this.Kr(b, this.ai);
          },
          Kr: function (a, b) {
            function c(a, b) {
              a.beginPath();
              a.moveTo(2, 8);
              a.lineTo(2, 16);
              a.lineTo(b - 2, 16);
              a.lineTo(b - 2, 8);
              a.lineTo(b - 4, 8);
              a.lineTo(b - 4, 14);
              a.lineTo(4, 14);
              a.lineTo(4, 8);
              a.lineTo(2, 8);
              a.closePath();
              return a;
            }
            var d = this,
              h = b + " " + d.sl,
              g = new p(function (b) {
                var g = a + 4 + 2,
                  e = g + 2,
                  k = d.pq,
                  i = 0;
                k.innerHTML = h;
                i = e - k.offsetWidth - 4 - 2 - 2;
                b.beginImage(e, 20, "ScaleBar");
                d.Pa.style.width = e + "px";
                d.Pa.style.height = "20px";
                b.set("strokeColor", o(d.Kg.stroke));
                b.set("fillColor", o(d.Kg.fill));
                b.set("lineWidth", 2.5);
                b.set("lineJoin", "round");
                b.set("font", "bold 10px Arial");
                b.strokeText(h, i + 0.5, 10);
                b.fillText(h, i, 10);
                b.set("lineWidth", 4);
                b = c(b, g);
                b.stroke();
                b.set("lineWidth", 0);
                b = c(b, g);
                b.fill();
              });
            d.Mp();
            d.bi = g.createElement();
            d.bi.className = m;
            d.Fr.appendChild(d.bi);
          },
          Mp: function () {
            var a = this.bi;
            a && a.parentNode && a.parentNode.removeChild(a);
          },
          calculateDistance: function (a) {
            a *= 100;
            var b;
            this.Lb
              ? a < r.gg
                ? ((a /= r.Ck), (b = this.translate("ovi.service.map._t23")))
                : ((a /= r.gg), (b = this.translate("ovi.service.map._t24")))
              : a < 1e3
              ? (b = this.translate("ovi.service.map._t25"))
              : ((a /= 1e3), (b = this.translate("ovi.service.map._t26")));
            this.sl = b;
            this.rl = a;
            b = l.pow(10, k(l.log(a) / l.LN10));
            a >= 5 * b ? (b *= 5) : a >= 2 * b && (b *= 2);
            this.ai = b;
          },
          onLanguageChange: function () {
            f.language.Info.language.alpha2 == "en"
              ? this.Lb || this.be()
              : this.Lb && this.be();
          },
        }));
      f.map.component.ScaleBar = e.ScaleBarComponent;
    })(nokia.maps);
    ovi.provide("nokia.maps.ui._packaging.package-nokia_generic");
  })();
}
/*
     FILE ARCHIVED ON 15:22:51 Aug 13, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:26:33 Sep 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 81.801
  exclusion.robots: 0.257
  exclusion.robots.policy: 0.244
  cdx.remote: 0.083
  esindex: 0.01
  LoadShardBlock: 49.864 (3)
  PetaboxLoader3.datanode: 129.148 (5)
  CDXLines.iter: 18.538 (3)
  load_resource: 202.097 (2)
  PetaboxLoader3.resolve: 80.498 (2)
*/
