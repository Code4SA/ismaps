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
    ovi.provide("nokia.maps.positioning.Manager");
    (function (f) {
      var e = (f.positioning.Manager = new ovi.Class({
        Extends: f.util.OObject,
        initialize: function (c) {
          c = c || {};
          if (this.constructor === e) return new e.Va(c);
        },
        Statics: {
          setDefImpl: function (c) {
            return this.Va ? !0 : (this.Va = c) && !1;
          },
        },
      }));
    })(nokia.maps);
    ovi.provide("nokia.maps.positioning.w3c.Manager");
    (function (f) {
      var e,
        c = (f.w3c.Manager = new ovi.Class({
          Extends: f.Manager,
          initialize: function () {
            if (
              !navigator ||
              !navigator.geolocation ||
              !navigator.geolocation.getCurrentPosition
            )
              throw "w3c positioning is not available in the environment";
            e = navigator.geolocation;
            this._super();
          },
          getCurrentPosition: function (b, a, c) {
            e.getCurrentPosition(b, a, c);
          },
          watchPosition: function (b, a, c) {
            return e.watchPosition(b, a, c);
          },
          clearWatch: function (b) {
            e.clearWatch(b);
          },
        }));
      f.Manager.setDefImpl(c);
    })(nokia.maps.positioning);
    ovi.provide("nokia.maps.positioning._packaging.package-w3c");
    (function (f) {
      var e = f.positioning;
      e.component = e.component || {};
      e.component.Positioning =
        e.component.Positioning ||
        function () {
          ovi.warn(
            "There is no UI defined for the display. Are you missing the UI package?"
          );
          var c = new f.map.component.Component();
          c.d = "PositioningDummy";
          c.A = "0";
          return c;
        };
    })(nokia.maps);
  })();
}
/*
     FILE ARCHIVED ON 17:39:00 May 14, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:22:48 Sep 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 69.841
  exclusion.robots: 0.093
  exclusion.robots.policy: 0.085
  cdx.remote: 0.063
  esindex: 0.008
  LoadShardBlock: 43.481 (3)
  PetaboxLoader3.datanode: 64.578 (5)
  CDXLines.iter: 14.899 (3)
  load_resource: 115.03 (2)
  PetaboxLoader3.resolve: 64.415 (2)
*/
