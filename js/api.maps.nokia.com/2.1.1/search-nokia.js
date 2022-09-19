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
    ovi.provide("nokia.maps.search.component.GeocodeComponent");
    (function (f) {
      var e = f.search,
        c = f.util.Q;
      e.component.GeocodeComponent = new ovi.Class({
        Extends: f.map.component.Component,
        d: "Geocode",
        A: "0.0.0.1",
        initialize: function (b) {
          this.Wa = b || new e.Manager();
          this.Wa.addObserver("state", this.Fs, this);
        },
        attach: function (b) {
          this._super(b);
        },
        detach: function (b) {
          this._super(b);
        },
        geocode: function (b) {
          this.xu = !0;
          this.Wa.geocode(b);
        },
        Fs: function () {},
        showMapMarkers: function () {
          this.Aa = new nokia.maps.search.component.SearchResultSet(
            this.Wa.locations
          ).container;
          this.mapDisplay.objects.add(this.Aa);
          this.mapDisplay.zoomTo(this.Aa.getBoundingBox());
          this.Wa.clear();
        },
        clearMapMarkers: function () {
          this.Aa && this.mapDisplay.objects.remove(this.Aa);
        },
        prevPage: c,
        nextPage: c,
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.search.component.SearchComponent");
    (function (f) {
      var e = f.search,
        c = f.util.Q;
      e.component.SearchComponent = new ovi.Class({
        Extends: f.map.component.Component,
        d: "Search",
        A: "0.0.0.1",
        initialize: function (b) {
          this.Wa = b || new e.Manager();
          this.Wa.addObserver("state", this.Qs, this);
        },
        attach: function (b) {
          this._super(b);
        },
        detach: function (b) {
          this._super(b);
        },
        search: function (b) {
          this.yt = !0;
          this.Wa.search(b);
        },
        Qs: function () {},
        showMapMarkers: function () {
          this.Aa = new e.component.SearchResultSet(
            this.Wa.locations
          ).container;
          this.mapDisplay.objects.add(this.Aa);
          this.mapDisplay.zoomTo(this.Aa.getBoundingBox());
          this.Wa.clear();
        },
        clearMapMarkers: function () {
          this.Aa && this.mapDisplay.objects.remove(this.Aa);
        },
        yt: !1,
        prevPage: c,
        nextPage: c,
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.search.component.RightClick");
    (function (f) {
      var e = f.search,
        c = f.map.component;
      e.component.RightClick = new ovi.Class({
        Extends: c.Component,
        d: "search.component.RightClick",
        A: "0.0.0.1",
        initialize: function (b) {
          this.Jo = b || new e.Manager();
          this.Jo.addObserver("state", this.Ns, this);
        },
        attach: function (b) {
          this._super(b);
          b.components.addObserver(this.oo, this);
          this.qo();
        },
        detach: function (b) {
          this.MapRightClick && this.MapRightClick.useSearchComponent(null);
          b.components.removeObserver(this.oo, this);
          this.MapRightClick = null;
          this._super(b);
        },
        oo: function (b, a, e) {
          a === "add" && e instanceof c.RightClick && this.qo();
        },
        qo: function () {
          (this.MapRightClick =
            this.mapDisplay.getComponentById("RightClick")) &&
            this.MapRightClick &&
            this.MapRightClick.useSearchComponent(this);
        },
        revGeocode: function (b) {
          this.Jo.reverseGeocode(b);
        },
        Ns: function (b) {
          var a = null;
          if (b.state == "finished") {
            a = b.locations.length > 0 ? b.locations[0] : "not found!";
            if (!this.MapRightClick)
              this.MapRightClick =
                this.mapDisplay.getComponentById("RightClick");
            this.MapRightClick.locationResponse(a);
          }
        },
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.search.component.SearchResultSet");
    (function (f) {
      var e = f.map;
      f.search.component.SearchResultSet = new ovi.Class({
        initialize: function (c) {
          for (
            var b,
              a = 0,
              g = c ? c.length : 0,
              d,
              i = (this.container = new e.Container());
            a < g;
            a++
          )
            (b = c[a]),
              (coord = new f.geo.Coordinate(
                +b.displayPosition.latitude,
                +b.displayPosition.longitude
              )),
              (d = new e.StandardMarker(coord, { text: "" + (a + 1) })),
              d.set("$locationData", b),
              i.objects.add(d);
        },
        container: null,
      });
    })(nokia.maps);
    ovi.provide("nokia.maps.search.Address");
    ovi.provide("nokia.maps.search.Location");
    ovi.provide("nokia.maps.search.LocationFilter");
    ovi.provide("nokia.maps.search.Place");
    ovi.provide("nokia.maps.search.ServiceError");
    ovi.provide("nokia.maps.util.services");
    (function (f) {
      ovi.extend(f, {
        getBaseURL: function (e, c, b) {
          var a = e.get("secureConnection"),
            g = null,
            d = null,
            f = e.get(c + "." + b + ".baseUrl") || e.get(c + ".baseUrl"),
            j =
              e.get(c + "." + b + ".secure.baseUrl") ||
              e.get(c + ".secure.baseUrl"),
            h = e.get(c + "." + b + ".secure.interface") || m,
            m = e.get(c + "." + b + ".interface") || e.get(c + ".interface");
          if (a == "force")
            return j && ((g = j), (d = h || m), (g += d ? d + "?" : "")), g;
          a == "prefer" && ((g = j), (d = h));
          g || (g = f);
          d || (d = m || "");
          d != "" && (d += "?");
          g += d;
          return g;
        },
      });
    })(nokia.maps.util.services);
    ovi.provide("nokia.maps.search._packaging.package");
    ovi.provide("nokia.maps.search.Manager");
    (function (f) {
      if (!f.util.getConstructor(f.search.Manager))
        var e = (f.search.Manager = new ovi.Class({
          Extends: f.util.OObject,
          initialize: function (c, b) {
            var a = c || {};
            this.Dc = b || new f.Config();
            if (this.constructor === e) return new e.Va(a);
            this._super(a);
          },
          Statics: {
            setDefImpl: function (c) {
              return this.Va ? !0 : (this.Va = c) && !1;
            },
          },
        }));
    })(nokia.maps);
    ovi.provide("nokia.maps.search.nokia.Manager");
    (function (f) {
      function e(a, b, c) {
        for (var d in c) a.hasOwnProperty(d) && (b[c[d]] = a[d]);
      }
      function c(a, b) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
      }
      var b = f.geo,
        a = f.search,
        g = f.util,
        d = g.services,
        i = g.ApplicationContext,
        j = f.Config,
        h = f.net.Request,
        m = b.BoundingBox,
        l = b.Coordinate,
        k = {
          "eat-drink": "9000022",
          "going-out": "9000023",
          "sights-museums": "9000024",
          transport: "9000025",
          accommodation: "9000026",
          shopping: "9000027",
          "business-services": "9000028",
          "leisure-outdoor": "9000029",
          facilities: "9000030",
          "administrative-areas-buildings": "9000031",
          "natural-geographical": "9000032",
        },
        n = {
          9000022: "eat-drink",
          9000023: "going-out",
          9000024: "sights-museums",
          9000025: "transport",
          9000026: "accommodation",
          9000027: "shopping",
          9000028: "business-services",
          9000029: "leisure-outdoor",
          9000030: "facilities",
          9000031: "administrative-areas-buildings",
          9000032: "natural-geographical",
        },
        p = { vi: "address", dv: "NokiaMapsAPI" },
        o = { vi: "where", dv: "NokiaMapsAPI" },
        q = { vi: "places", dv: "NokiaMapsAPI" },
        r = { output: "json" },
        s = {
          addrCountryCode: "country",
          addrCountryName: "countryName",
          addrStateName: "state",
          addrCountyName: "county",
          addrCityName: "city",
          addrDistrictName: "district",
          addrPostalCode: "postalCode",
          addrStreetName: "street",
          addrHouseNumber: "houseNumber",
          title: "label",
        },
        w = {
          countryCode: "country",
          country: "countryName",
          state: "state",
          county: "county",
          city: "city",
          district: "district",
          postCode: "postalCode",
          label: "label",
          placesId: "placesId",
          title: "title",
        },
        u = { name: "street", number: "houseNumber" },
        b = (a.nokia.Manager = new ovi.Class({
          Extends: a.Manager,
          initialize: function (a) {
            window.OK = "OK";
            window.FAILED = "FAILED";
            this.maxResults = 20;
            this.ki = {};
            this.Db = new h(h.JSONP, { callbackKey: "callback_func" });
            this._super(a);
          },
          locations: [],
          places: [],
          ki: null,
          bk: 1,
          state: "initial",
          xs: null,
          ht: null,
          At: null,
          Yi: !1,
          geocode: function (a, b) {
            this.Fl({
              searchText: a,
              geoArea: b,
              url: d.getBaseURL(this.Dc, "search", "geocode"),
              urlp: p,
            });
          },
          reverseGeocode: function (a, b) {
            var c;
            if (!(a = l.fromObject(a)))
              throw g.f(
                "reverseGeocode: the parameter 'position' is not a valid geo-coordinate."
              );
            c = {
              lat: a.latitude,
              long: a.longitude,
              lg: f.language.Info.getDefinition(
                g.ApplicationContext.defaultLanguage
              ).marc,
            };
            b != null && (c.isshifted = b ? "1" : "0");
            c = this.constructUrl(
              d.getBaseURL(this.Dc, "search", "reversegeocode"),
              c,
              r
            );
            this.ki[this.bk] = this.jt;
            this.Db.send(c, ovi.bind(this, this.Go), this.bk++);
            this.Yi = !1;
            this.set("state", "started");
          },
          placeSearch: function (a, b, c) {
            if (!c) throw "Not Implemented";
            this.Fl({
              searchText: a,
              geoArea: c,
              url: d.getBaseURL(this.Dc, "search", "placesearch"),
              urlp: q,
              categories: b,
            });
          },
          search: function (a, b) {
            this.Fl({
              searchText: a,
              geoArea: b,
              url: d.getBaseURL(this.Dc, "search", "search"),
              urlp: o,
            });
          },
          getPlaces: function () {
            return this.places;
          },
          getLocations: function () {
            return this.locations;
          },
          constructUrl: function (a, b, d, e, h) {
            var g = {},
              f = [],
              e = e ? "&amp;" : "&";
            c(b, g);
            d = d ? d : {};
            c(d, g);
            if (!h)
              i.appId && (g.app_id = i.appId),
                i.authenticationToken && (g.token = i.authenticationToken);
            for (param in g)
              g.hasOwnProperty(param) &&
                ((b = encodeURIComponent(param)),
                (d = encodeURIComponent(g[param])),
                f.push(b + "=" + d));
            a += f.join(e);
            return a;
          },
          Fl: function (a) {
            var b,
              c = a.geoArea,
              d = (useMos = !1);
            c ? (c.line ? (useMos = !0) : (d = !0)) : (d = !0);
            if (d)
              (b = {
                q: a.searchText,
                to: this.maxResults,
                la: i.defaultLanguage || "en-GB",
              }),
                (b = this.Jq(b, c)),
                (b = this.Iq(b, a.categories)),
                (b = this.constructUrl(a.url, b, a.urlp));
            else if (useMos) throw "Not Implemented";
            this.ki[this.bk] = this.kt;
            this.Db.send(b, ovi.bind(this, this.Go), this.bk++);
            this.Yi = !1;
            this.set("state", "started");
          },
          Jq: function (a, b) {
            a.lat = 0;
            a.lon = 0;
            if (
              b &&
              b.center &&
              ((a.lat = b.center.latitude),
              (a.lon = b.center.longitude),
              b.radius)
            )
              a.ds = b.radius;
            return a;
          },
          Iq: function (a, b) {
            var c = [],
              d,
              e = 0,
              h;
            if (b && b.length > 0) {
              for (h = b.length; e < h; e++) (d = k[b[e]]) && c.push(d);
              if (c.length > 0) a.vi = c.join(",");
            }
            return a;
          },
          Go: function (a) {
            var b = a.id;
            this.locations = [];
            this.places = [];
            try {
              this.ki[b].call(this, a.response);
            } catch (c) {
              this.Yi = !0;
            }
            this.Yi
              ? this.set("state", "failed")
              : this.set("state", "finished");
            delete this.ki[b];
          },
          kt: function (a) {
            var b,
              c,
              d,
              h,
              g,
              f,
              i,
              k,
              a = a.results;
            if (!a) throw "Invalid Response";
            d = a.length <= this.maxResults ? a.length : this.maxResults;
            for (c = 0; c < d; c++) {
              b = a[c].properties;
              i = a[c].categories;
              g = h = k = void 0;
              var j = [];
              if (i && i.length > 0) {
                k = 0;
                for (h = i.length; k < h; k++) (g = n[i[k].id]) && j.push(g);
              }
              k = j;
              h = {};
              i = b.placesId;
              e(b, h, s);
              g = new l(b.geoLatitude, b.geoLongitude, null, !0);
              if (b.geoBbxLatitude1) {
                f = b;
                var q = (j = void 0),
                  r = void 0,
                  q = new l(+f.geoBbxLatitude1, +f.geoBbxLongitude1, null, !0),
                  j = new l(+f.geoBbxLatitude2, +f.geoBbxLongitude2, null, !0),
                  r = new l(+f.geoLatitude, +f.geoLongitude, null, !0);
                f = m.coverAll([j, r, q]);
              }
              h = {
                label: b.title,
                displayPosition: g,
                navigationPosition: g,
                mapView: f,
                address: h,
              };
              i &&
                ((b = {
                  placesId: i,
                  name: h.label,
                  locations: [h],
                  categories: k,
                  suppliers: ["Nokia"],
                }),
                this.places.push(b));
              this.locations.push(h);
            }
          },
          jt: function (a) {
            this.Ep(a);
          },
          Lu: function (a) {
            this.Ep(a);
          },
          Ep: function (a) {
            var b, c, d, h, g, f;
            b = a.places;
            if (!b) throw "Invalid Response";
            if (a.resultCode != "OK") throw "Query Failed";
            d = b.length <= this.maxResults ? b.length : this.maxResults;
            for (a = 0; a < d; a++)
              if (
                ((c = b[a]),
                (f = {}),
                c.address &&
                  (c.address.thoroughfare && e(c.address.thoroughfare, f, u),
                  e(c.address, f, w)),
                c.location)
              ) {
                c = c.location;
                if (c.boundingBox) {
                  h = c.bbox.northWest;
                  var i = c.bbox.southEast,
                    k = c.position,
                    i = new l(+i.latitude, +i.longitude, null, !0);
                  h = new l(+h.latitude, +h.longitude, null, !0);
                  k = new l(+k.latitude, +k.longitude, null, !0);
                  h = m.coverAll([h, k, i]);
                }
                if (c.position)
                  (g = c.position),
                    (g = new l(g.latitude, g.longitude, null, !0));
                c = {
                  label: c.label,
                  displayPosition: g,
                  navigationPosition: g,
                  mapView: h,
                  address: f,
                };
                this.locations.push(c);
              }
          },
          getTypeSuggestions: function () {
            throw "Not Implemented";
          },
          Mu: function (a) {
            this.At = a;
            this.ht = this.xs = null;
          },
          nextPage: function () {
            throw "Not Implemented";
          },
          previousPage: function () {
            throw "Not Implemented";
          },
          Ju: function () {
            throw "Not Implemented";
          },
          clear: function () {
            this.places = [];
            this.locations = [];
            this.set("state", "cleared");
          },
          getAvailableCategories: function () {
            var a = [],
              b;
            for (b in k) a.push(b);
            return a;
          },
        }));
      f.search.Manager.setDefImpl(b);
      j.setDefaultsNS(
        "search",
        {
          baseUrl:
            "https://web.archive.org/web/20170514173900/http://where.desktop.mos.svc.ovi.com/",
          interface: "json",
          "reversegeocode.baseUrl":
            "https://web.archive.org/web/20170514173900/http://loc.desktop.maps.svc.ovi.com/",
          "reversegeocode.interface": "geocoder/rgc/2.0",
        },
        !0
      );
    })(nokia.maps);
    ovi.provide("nokia.maps.search._packaging.package-nokia");
  })();
}
/*
     FILE ARCHIVED ON 17:39:00 May 14, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:20:17 Sep 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 178.591
  exclusion.robots: 0.083
  exclusion.robots.policy: 0.075
  RedisCDXSource: 0.562
  esindex: 0.007
  LoadShardBlock: 160.852 (3)
  PetaboxLoader3.datanode: 207.182 (5)
  CDXLines.iter: 14.686 (3)
  load_resource: 368.511 (2)
  PetaboxLoader3.resolve: 305.012 (2)
*/
