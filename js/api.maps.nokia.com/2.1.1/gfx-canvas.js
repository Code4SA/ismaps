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
              h = c[++e],
              g = c[++e],
              c = c[++e];
            if (h !== d.BEGIN_2D_IMAGE)
              throw "CanvasPainter.createElement: Illegal opcode in IDL";
            b.width = g;
            b.height = c;
            b.style.width = g + "px";
            b.style.height = c + "px";
            h = b.getContext("2d");
            h.clearRect(0, 0, g, c);
            this.drawIDLToCanvas(a, h);
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
    ovi.provide("nokia.maps.gfx._packaging.package-canvas");
  })();
}
/*
     FILE ARCHIVED ON 17:39:00 May 14, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:22:17 Sep 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 346.747
  exclusion.robots: 0.115
  exclusion.robots.policy: 0.106
  cdx.remote: 0.07
  esindex: 0.01
  LoadShardBlock: 251.128 (3)
  PetaboxLoader3.datanode: 201.055 (5)
  CDXLines.iter: 18.623 (3)
  PetaboxLoader3.resolve: 489.204 (3)
  load_resource: 473.768 (2)
*/
