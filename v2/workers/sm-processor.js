var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/proj4/lib/global.js
function global_default(defs2) {
  defs2("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs2("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
  defs2("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
  for (var i = 1; i <= 60; ++i) {
    defs2("EPSG:" + (32600 + i), "+proj=utm +zone=" + i + " +datum=WGS84 +units=m");
    defs2("EPSG:" + (32700 + i), "+proj=utm +zone=" + i + " +south +datum=WGS84 +units=m");
  }
  defs2("EPSG:5041", "+title=WGS 84 / UPS North (E,N) +proj=stere +lat_0=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m");
  defs2("EPSG:5042", "+title=WGS 84 / UPS South (E,N) +proj=stere +lat_0=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m");
  defs2.WGS84 = defs2["EPSG:4326"];
  defs2["EPSG:3785"] = defs2["EPSG:3857"];
  defs2.GOOGLE = defs2["EPSG:3857"];
  defs2["EPSG:900913"] = defs2["EPSG:3857"];
  defs2["EPSG:102113"] = defs2["EPSG:3857"];
}
__name(global_default, "default");

// node_modules/proj4/lib/constants/values.js
var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var PJD_GRIDSHIFT = 3;
var PJD_WGS84 = 4;
var PJD_NODATUM = 5;
var SRS_WGS84_SEMIMAJOR = 6378137;
var SRS_WGS84_SEMIMINOR = 6356752314e-3;
var SRS_WGS84_ESQUARED = 0.0066943799901413165;
var SEC_TO_RAD = 484813681109536e-20;
var HALF_PI = Math.PI / 2;
var SIXTH = 0.16666666666666666;
var RA4 = 0.04722222222222222;
var RA6 = 0.022156084656084655;
var EPSLN = 1e-10;
var D2R = 0.017453292519943295;
var R2D = 57.29577951308232;
var FORTPI = Math.PI / 4;
var TWO_PI = Math.PI * 2;
var SPI = 3.14159265359;

// node_modules/proj4/lib/constants/PrimeMeridian.js
var primeMeridian = {};
primeMeridian.greenwich = 0;
primeMeridian.lisbon = -9.131906111111;
primeMeridian.paris = 2.337229166667;
primeMeridian.bogota = -74.080916666667;
primeMeridian.madrid = -3.687938888889;
primeMeridian.rome = 12.452333333333;
primeMeridian.bern = 7.439583333333;
primeMeridian.jakarta = 106.807719444444;
primeMeridian.ferro = -17.666666666667;
primeMeridian.brussels = 4.367975;
primeMeridian.stockholm = 18.058277777778;
primeMeridian.athens = 23.7163375;
primeMeridian.oslo = 10.722916666667;
var PrimeMeridian_default = primeMeridian;

// node_modules/proj4/lib/constants/units.js
var units_default = {
  mm: { to_meter: 1e-3 },
  cm: { to_meter: 0.01 },
  ft: { to_meter: 0.3048 },
  "us-ft": { to_meter: 1200 / 3937 },
  fath: { to_meter: 1.8288 },
  kmi: { to_meter: 1852 },
  "us-ch": { to_meter: 20.1168402336805 },
  "us-mi": { to_meter: 1609.34721869444 },
  km: { to_meter: 1e3 },
  "ind-ft": { to_meter: 0.30479841 },
  "ind-yd": { to_meter: 0.91439523 },
  mi: { to_meter: 1609.344 },
  yd: { to_meter: 0.9144 },
  ch: { to_meter: 20.1168 },
  link: { to_meter: 0.201168 },
  dm: { to_meter: 0.1 },
  in: { to_meter: 0.0254 },
  "ind-ch": { to_meter: 20.11669506 },
  "us-in": { to_meter: 0.025400050800101 },
  "us-yd": { to_meter: 0.914401828803658 }
};

// node_modules/proj4/lib/match.js
var ignoredChar = /[\s_\-\/\(\)]/g;
function match(obj, key2) {
  if (obj[key2]) {
    return obj[key2];
  }
  var keys = Object.keys(obj);
  var lkey = key2.toLowerCase().replace(ignoredChar, "");
  var i = -1;
  var testkey, processedKey;
  while (++i < keys.length) {
    testkey = keys[i];
    processedKey = testkey.toLowerCase().replace(ignoredChar, "");
    if (processedKey === lkey) {
      return obj[testkey];
    }
  }
}
__name(match, "match");

// node_modules/proj4/lib/projString.js
function projString_default(defData) {
  var self = {};
  var paramObj = defData.split("+").map(function(v) {
    return v.trim();
  }).filter(function(a) {
    return a;
  }).reduce(function(p, a) {
    var split = a.split("=");
    split.push(true);
    p[split[0].toLowerCase()] = split[1];
    return p;
  }, {});
  var paramName, paramVal, paramOutname;
  var params2 = {
    proj: /* @__PURE__ */ __name(function(v) {
      self.projName = ["lonlat", "latlon", "latlong"].includes(v) ? "longlat" : v;
    }, "proj"),
    datum: "datumCode",
    rf: /* @__PURE__ */ __name(function(v) {
      self.rf = parseFloat(v);
    }, "rf"),
    lat_0: /* @__PURE__ */ __name(function(v) {
      self.lat0 = v * D2R;
    }, "lat_0"),
    lat_1: /* @__PURE__ */ __name(function(v) {
      self.lat1 = v * D2R;
    }, "lat_1"),
    lat_2: /* @__PURE__ */ __name(function(v) {
      self.lat2 = v * D2R;
    }, "lat_2"),
    lat_ts: /* @__PURE__ */ __name(function(v) {
      self.lat_ts = v * D2R;
    }, "lat_ts"),
    lon_0: /* @__PURE__ */ __name(function(v) {
      self.long0 = v * D2R;
    }, "lon_0"),
    lon_wrap: /* @__PURE__ */ __name(function(v) {
      self.long_wrap = parseFloat(v) * D2R;
    }, "lon_wrap"),
    lon_1: /* @__PURE__ */ __name(function(v) {
      self.long1 = v * D2R;
    }, "lon_1"),
    lon_2: /* @__PURE__ */ __name(function(v) {
      self.long2 = v * D2R;
    }, "lon_2"),
    alpha: /* @__PURE__ */ __name(function(v) {
      self.alpha = parseFloat(v) * D2R;
    }, "alpha"),
    gamma: /* @__PURE__ */ __name(function(v) {
      self.rectified_grid_angle = parseFloat(v) * D2R;
    }, "gamma"),
    lonc: /* @__PURE__ */ __name(function(v) {
      self.longc = v * D2R;
    }, "lonc"),
    x_0: /* @__PURE__ */ __name(function(v) {
      self.x0 = parseFloat(v);
    }, "x_0"),
    y_0: /* @__PURE__ */ __name(function(v) {
      self.y0 = parseFloat(v);
    }, "y_0"),
    k_0: /* @__PURE__ */ __name(function(v) {
      self.k0 = parseFloat(v);
    }, "k_0"),
    k: /* @__PURE__ */ __name(function(v) {
      self.k0 = parseFloat(v);
    }, "k"),
    a: /* @__PURE__ */ __name(function(v) {
      self.a = parseFloat(v);
    }, "a"),
    b: /* @__PURE__ */ __name(function(v) {
      self.b = parseFloat(v);
    }, "b"),
    r: /* @__PURE__ */ __name(function(v) {
      self.a = self.b = parseFloat(v);
    }, "r"),
    r_a: /* @__PURE__ */ __name(function() {
      self.R_A = true;
    }, "r_a"),
    zone: /* @__PURE__ */ __name(function(v) {
      self.zone = parseInt(v, 10);
    }, "zone"),
    south: /* @__PURE__ */ __name(function() {
      self.utmSouth = true;
    }, "south"),
    towgs84: /* @__PURE__ */ __name(function(v) {
      self.datum_params = v.split(",").map(function(a) {
        return parseFloat(a);
      });
    }, "towgs84"),
    to_meter: /* @__PURE__ */ __name(function(v) {
      self.to_meter = parseFloat(v);
    }, "to_meter"),
    units: /* @__PURE__ */ __name(function(v) {
      self.units = v;
      var unit = match(units_default, v);
      if (unit) {
        self.to_meter = unit.to_meter;
      }
    }, "units"),
    from_greenwich: /* @__PURE__ */ __name(function(v) {
      self.from_greenwich = v * D2R;
    }, "from_greenwich"),
    pm: /* @__PURE__ */ __name(function(v) {
      var pm = match(PrimeMeridian_default, v);
      self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R;
    }, "pm"),
    nadgrids: /* @__PURE__ */ __name(function(v) {
      if (v === "@null") {
        self.datumCode = "none";
      } else {
        self.nadgrids = v;
      }
    }, "nadgrids"),
    axis: /* @__PURE__ */ __name(function(v) {
      var legalAxis = "ewnsud";
      if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
        self.axis = v;
      }
    }, "axis"),
    approx: /* @__PURE__ */ __name(function() {
      self.approx = true;
    }, "approx"),
    over: /* @__PURE__ */ __name(function() {
      self.over = true;
    }, "over")
  };
  for (paramName in paramObj) {
    paramVal = paramObj[paramName];
    if (paramName in params2) {
      paramOutname = params2[paramName];
      if (typeof paramOutname === "function") {
        paramOutname(paramVal);
      } else {
        self[paramOutname] = paramVal;
      }
    } else {
      self[paramName] = paramVal;
    }
  }
  if (typeof self.datumCode === "string" && self.datumCode !== "WGS84") {
    self.datumCode = self.datumCode.toLowerCase();
  }
  self["projStr"] = defData;
  return self;
}
__name(projString_default, "default");

// node_modules/wkt-parser/PROJJSONBuilder.js
var PROJJSONBuilderBase = class {
  static {
    __name(this, "PROJJSONBuilderBase");
  }
  static getId(node) {
    const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
    if (idNode && idNode.length >= 3) {
      return {
        authority: idNode[1],
        code: parseInt(idNode[2], 10)
      };
    }
    return null;
  }
  static convertUnit(node, type = "unit") {
    if (!node || node.length < 3) {
      return { type, name: "unknown", conversion_factor: null };
    }
    const name = node[1];
    const conversionFactor = parseFloat(node[2]) || null;
    const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
    const id = idNode ? {
      authority: idNode[1],
      code: parseInt(idNode[2], 10)
    } : null;
    return {
      type,
      name,
      conversion_factor: conversionFactor,
      id
    };
  }
  static convertAxis(node) {
    const name = node[1] || "Unknown";
    let direction;
    const abbreviationMatch = name.match(/^\((.)\)$/);
    if (abbreviationMatch) {
      const abbreviation = abbreviationMatch[1].toUpperCase();
      if (abbreviation === "E") direction = "east";
      else if (abbreviation === "N") direction = "north";
      else if (abbreviation === "U") direction = "up";
      else if (node[2]) direction = node[2];
      else throw new Error(`Unknown axis abbreviation: ${abbreviation}`);
    } else {
      direction = node[2] || "unknown";
    }
    const orderNode = node.find((child) => Array.isArray(child) && child[0] === "ORDER");
    const order2 = orderNode ? parseInt(orderNode[1], 10) : null;
    const unitNode = node.find(
      (child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")
    );
    const unit = this.convertUnit(unitNode);
    return {
      name,
      direction,
      // Use the valid PROJJSON direction value
      unit,
      order: order2
    };
  }
  static extractAxes(node) {
    return node.filter((child) => Array.isArray(child) && child[0] === "AXIS").map((axis) => this.convertAxis(axis)).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  static convert(node, result = {}) {
    switch (node[0]) {
      case "PROJCRS":
        result.type = "ProjectedCRS";
        result.name = node[1];
        result.base_crs = node.find((child) => Array.isArray(child) && child[0] === "BASEGEOGCRS") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "BASEGEOGCRS")) : null;
        result.conversion = node.find((child) => Array.isArray(child) && child[0] === "CONVERSION") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "CONVERSION")) : null;
        const csNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
        if (csNode) {
          result.coordinate_system = {
            subtype: csNode[1],
            axis: this.extractAxes(node)
          };
        }
        const lengthUnitNode = node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT");
        if (lengthUnitNode) {
          const unit2 = this.convertUnit(lengthUnitNode);
          result.coordinate_system.unit = unit2;
        }
        result.id = this.getId(node);
        break;
      case "BASEGEOGCRS":
      case "GEOGCRS":
      case "GEODCRS":
        result.type = node[0] === "GEODCRS" ? "GeodeticCRS" : "GeographicCRS";
        result.name = node[1];
        const datumOrEnsembleNode = node.find(
          (child) => Array.isArray(child) && (child[0] === "DATUM" || child[0] === "ENSEMBLE")
        );
        if (datumOrEnsembleNode) {
          const datumOrEnsemble = this.convert(datumOrEnsembleNode);
          if (datumOrEnsembleNode[0] === "ENSEMBLE") {
            result.datum_ensemble = datumOrEnsemble;
          } else {
            result.datum = datumOrEnsemble;
          }
          const primem = node.find((child) => Array.isArray(child) && child[0] === "PRIMEM");
          if (primem && primem[1] !== "Greenwich") {
            datumOrEnsemble.prime_meridian = {
              name: primem[1],
              longitude: parseFloat(primem[2])
            };
          }
        }
        const geogCsNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
        result.coordinate_system = {
          subtype: geogCsNode ? geogCsNode[1] : "ellipsoidal",
          axis: this.extractAxes(node)
        };
        result.id = this.getId(node);
        break;
      case "DATUM":
        result.type = "GeodeticReferenceFrame";
        result.name = node[1];
        result.ellipsoid = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID")) : null;
        break;
      case "ENSEMBLE":
        result.type = "DatumEnsemble";
        result.name = node[1];
        result.members = node.filter((child) => Array.isArray(child) && child[0] === "MEMBER").map((member) => ({
          type: "DatumEnsembleMember",
          name: member[1],
          id: this.getId(member)
          // Extract ID as { authority, code }
        }));
        const accuracyNode = node.find((child) => Array.isArray(child) && child[0] === "ENSEMBLEACCURACY");
        if (accuracyNode) {
          result.accuracy = parseFloat(accuracyNode[1]);
        }
        const ellipsoidNode = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID");
        if (ellipsoidNode) {
          result.ellipsoid = this.convert(ellipsoidNode);
        }
        result.id = this.getId(node);
        break;
      case "ELLIPSOID":
        result.type = "Ellipsoid";
        result.name = node[1];
        result.semi_major_axis = parseFloat(node[2]);
        result.inverse_flattening = parseFloat(node[3]);
        const units = node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT"), result) : null;
        break;
      case "CONVERSION":
        result.type = "Conversion";
        result.name = node[1];
        result.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
        result.parameters = node.filter((child) => Array.isArray(child) && child[0] === "PARAMETER").map((param) => this.convert(param));
        break;
      case "METHOD":
        result.type = "Method";
        result.name = node[1];
        result.id = this.getId(node);
        break;
      case "PARAMETER":
        result.type = "Parameter";
        result.name = node[1];
        result.value = parseFloat(node[2]);
        result.unit = this.convertUnit(
          node.find(
            (child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")
          )
        );
        result.id = this.getId(node);
        break;
      case "BOUNDCRS":
        result.type = "BoundCRS";
        const sourceCrsNode = node.find((child) => Array.isArray(child) && child[0] === "SOURCECRS");
        if (sourceCrsNode) {
          const sourceCrsContent = sourceCrsNode.find((child) => Array.isArray(child));
          result.source_crs = sourceCrsContent ? this.convert(sourceCrsContent) : null;
        }
        const targetCrsNode = node.find((child) => Array.isArray(child) && child[0] === "TARGETCRS");
        if (targetCrsNode) {
          const targetCrsContent = targetCrsNode.find((child) => Array.isArray(child));
          result.target_crs = targetCrsContent ? this.convert(targetCrsContent) : null;
        }
        const transformationNode = node.find((child) => Array.isArray(child) && child[0] === "ABRIDGEDTRANSFORMATION");
        if (transformationNode) {
          result.transformation = this.convert(transformationNode);
        } else {
          result.transformation = null;
        }
        break;
      case "ABRIDGEDTRANSFORMATION":
        result.type = "Transformation";
        result.name = node[1];
        result.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
        result.parameters = node.filter((child) => Array.isArray(child) && (child[0] === "PARAMETER" || child[0] === "PARAMETERFILE")).map((param) => {
          if (param[0] === "PARAMETER") {
            return this.convert(param);
          } else if (param[0] === "PARAMETERFILE") {
            return {
              name: param[1],
              value: param[2],
              id: {
                "authority": "EPSG",
                "code": 8656
              }
            };
          }
        });
        if (result.parameters.length === 7) {
          const scaleDifference = result.parameters[6];
          if (scaleDifference.name === "Scale difference") {
            scaleDifference.value = Math.round((scaleDifference.value - 1) * 1e12) / 1e6;
          }
        }
        result.id = this.getId(node);
        break;
      case "AXIS":
        if (!result.coordinate_system) {
          result.coordinate_system = { type: "unspecified", axis: [] };
        }
        result.coordinate_system.axis.push(this.convertAxis(node));
        break;
      case "LENGTHUNIT":
        const unit = this.convertUnit(node, "LinearUnit");
        if (result.coordinate_system && result.coordinate_system.axis) {
          result.coordinate_system.axis.forEach((axis) => {
            if (!axis.unit) {
              axis.unit = unit;
            }
          });
        }
        if (unit.conversion_factor && unit.conversion_factor !== 1) {
          if (result.semi_major_axis) {
            result.semi_major_axis = {
              value: result.semi_major_axis,
              unit
            };
          }
        }
        break;
      default:
        result.keyword = node[0];
        break;
    }
    return result;
  }
};
var PROJJSONBuilder_default = PROJJSONBuilderBase;

// node_modules/wkt-parser/buildPROJJSON.js
function buildPROJJSON(root) {
  return PROJJSONBuilder_default.convert(root);
}
__name(buildPROJJSON, "buildPROJJSON");

// node_modules/wkt-parser/detectWKTVersion.js
function detectWKTVersion(wkt) {
  const normalizedWKT = wkt.toUpperCase();
  if (normalizedWKT.includes("PROJCRS") || normalizedWKT.includes("GEOGCRS") || normalizedWKT.includes("BOUNDCRS") || normalizedWKT.includes("VERTCRS") || normalizedWKT.includes("LENGTHUNIT") || normalizedWKT.includes("ANGLEUNIT") || normalizedWKT.includes("SCALEUNIT")) {
    return "WKT2";
  }
  if (normalizedWKT.includes("PROJCS") || normalizedWKT.includes("GEOGCS") || normalizedWKT.includes("LOCAL_CS") || normalizedWKT.includes("VERT_CS") || normalizedWKT.includes("UNIT")) {
    return "WKT1";
  }
  return "WKT1";
}
__name(detectWKTVersion, "detectWKTVersion");

// node_modules/wkt-parser/parser.js
var parser_default = parseString;
var NEUTRAL = 1;
var KEYWORD = 2;
var NUMBER = 3;
var QUOTED = 4;
var AFTERQUOTE = 5;
var ENDED = -1;
var whitespace = /\s/;
var latin = /[A-Za-z]/;
var keyword = /[A-Za-z84_]/;
var endThings = /[,\]]/;
var digets = /[\d\.E\-\+]/;
function Parser(text) {
  if (typeof text !== "string") {
    throw new Error("not a string");
  }
  this.text = text.trim();
  this.level = 0;
  this.place = 0;
  this.root = null;
  this.stack = [];
  this.currentObject = null;
  this.state = NEUTRAL;
}
__name(Parser, "Parser");
Parser.prototype.readCharicter = function() {
  var char = this.text[this.place++];
  if (this.state !== QUOTED) {
    while (whitespace.test(char)) {
      if (this.place >= this.text.length) {
        return;
      }
      char = this.text[this.place++];
    }
  }
  switch (this.state) {
    case NEUTRAL:
      return this.neutral(char);
    case KEYWORD:
      return this.keyword(char);
    case QUOTED:
      return this.quoted(char);
    case AFTERQUOTE:
      return this.afterquote(char);
    case NUMBER:
      return this.number(char);
    case ENDED:
      return;
  }
};
Parser.prototype.afterquote = function(char) {
  if (char === '"') {
    this.word += '"';
    this.state = QUOTED;
    return;
  }
  if (endThings.test(char)) {
    this.word = this.word.trim();
    this.afterItem(char);
    return;
  }
  throw new Error(`havn't handled "` + char + '" in afterquote yet, index ' + this.place);
};
Parser.prototype.afterItem = function(char) {
  if (char === ",") {
    if (this.word !== null) {
      this.currentObject.push(this.word);
    }
    this.word = null;
    this.state = NEUTRAL;
    return;
  }
  if (char === "]") {
    this.level--;
    if (this.word !== null) {
      this.currentObject.push(this.word);
      this.word = null;
    }
    this.state = NEUTRAL;
    this.currentObject = this.stack.pop();
    if (!this.currentObject) {
      this.state = ENDED;
    }
    return;
  }
};
Parser.prototype.number = function(char) {
  if (digets.test(char)) {
    this.word += char;
    return;
  }
  if (endThings.test(char)) {
    this.word = parseFloat(this.word);
    this.afterItem(char);
    return;
  }
  throw new Error(`havn't handled "` + char + '" in number yet, index ' + this.place);
};
Parser.prototype.quoted = function(char) {
  if (char === '"') {
    this.state = AFTERQUOTE;
    return;
  }
  this.word += char;
  return;
};
Parser.prototype.keyword = function(char) {
  if (keyword.test(char)) {
    this.word += char;
    return;
  }
  if (char === "[") {
    var newObjects = [];
    newObjects.push(this.word);
    this.level++;
    if (this.root === null) {
      this.root = newObjects;
    } else {
      this.currentObject.push(newObjects);
    }
    this.stack.push(this.currentObject);
    this.currentObject = newObjects;
    this.state = NEUTRAL;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error(`havn't handled "` + char + '" in keyword yet, index ' + this.place);
};
Parser.prototype.neutral = function(char) {
  if (latin.test(char)) {
    this.word = char;
    this.state = KEYWORD;
    return;
  }
  if (char === '"') {
    this.word = "";
    this.state = QUOTED;
    return;
  }
  if (digets.test(char)) {
    this.word = char;
    this.state = NUMBER;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error(`havn't handled "` + char + '" in neutral yet, index ' + this.place);
};
Parser.prototype.output = function() {
  while (this.place < this.text.length) {
    this.readCharicter();
  }
  if (this.state === ENDED) {
    return this.root;
  }
  throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
};
function parseString(txt) {
  var parser = new Parser(txt);
  return parser.output();
}
__name(parseString, "parseString");

// node_modules/wkt-parser/process.js
function mapit(obj, key2, value) {
  if (Array.isArray(key2)) {
    value.unshift(key2);
    key2 = null;
  }
  var thing = key2 ? {} : obj;
  var out = value.reduce(function(newObj, item) {
    sExpr(item, newObj);
    return newObj;
  }, thing);
  if (key2) {
    obj[key2] = out;
  }
}
__name(mapit, "mapit");
function sExpr(v, obj) {
  if (!Array.isArray(v)) {
    obj[v] = true;
    return;
  }
  var key2 = v.shift();
  if (key2 === "PARAMETER") {
    key2 = v.shift();
  }
  if (v.length === 1) {
    if (Array.isArray(v[0])) {
      obj[key2] = {};
      sExpr(v[0], obj[key2]);
      return;
    }
    obj[key2] = v[0];
    return;
  }
  if (!v.length) {
    obj[key2] = true;
    return;
  }
  if (key2 === "TOWGS84") {
    obj[key2] = v;
    return;
  }
  if (key2 === "AXIS") {
    if (!(key2 in obj)) {
      obj[key2] = [];
    }
    obj[key2].push(v);
    return;
  }
  if (!Array.isArray(key2)) {
    obj[key2] = {};
  }
  var i;
  switch (key2) {
    case "UNIT":
    case "PRIMEM":
    case "VERT_DATUM":
      obj[key2] = {
        name: v[0].toLowerCase(),
        convert: v[1]
      };
      if (v.length === 3) {
        sExpr(v[2], obj[key2]);
      }
      return;
    case "SPHEROID":
    case "ELLIPSOID":
      obj[key2] = {
        name: v[0],
        a: v[1],
        rf: v[2]
      };
      if (v.length === 4) {
        sExpr(v[3], obj[key2]);
      }
      return;
    case "EDATUM":
    case "ENGINEERINGDATUM":
    case "LOCAL_DATUM":
    case "DATUM":
    case "VERT_CS":
    case "VERTCRS":
    case "VERTICALCRS":
      v[0] = ["name", v[0]];
      mapit(obj, key2, v);
      return;
    case "COMPD_CS":
    case "COMPOUNDCRS":
    case "FITTED_CS":
    // the followings are the crs defined in
    // https://github.com/proj4js/proj4js/blob/1da4ed0b865d0fcb51c136090569210cdcc9019e/lib/parseCode.js#L11
    case "PROJECTEDCRS":
    case "PROJCRS":
    case "GEOGCS":
    case "GEOCCS":
    case "PROJCS":
    case "LOCAL_CS":
    case "GEODCRS":
    case "GEODETICCRS":
    case "GEODETICDATUM":
    case "ENGCRS":
    case "ENGINEERINGCRS":
      v[0] = ["name", v[0]];
      mapit(obj, key2, v);
      obj[key2].type = key2;
      return;
    default:
      i = -1;
      while (++i < v.length) {
        if (!Array.isArray(v[i])) {
          return sExpr(v, obj[key2]);
        }
      }
      return mapit(obj, key2, v);
  }
}
__name(sExpr, "sExpr");

// node_modules/wkt-parser/util.js
var D2R2 = 0.017453292519943295;
function d2r(input) {
  return input * D2R2;
}
__name(d2r, "d2r");
function applyProjectionDefaults(wkt) {
  const normalizedProjName = (wkt.projName || "").toLowerCase().replace(/_/g, " ");
  if (wkt.long0 === void 0 && wkt.longc !== void 0) {
    wkt.long0 = wkt.longc;
  }
  if (!wkt.lat_ts && wkt.lat1 && (normalizedProjName === "stereographic south pole" || normalizedProjName === "polar stereographic (variant b)")) {
    wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
    wkt.lat_ts = wkt.lat1;
    delete wkt.lat1;
  } else if (!wkt.lat_ts && wkt.lat0 && (normalizedProjName === "polar stereographic" || normalizedProjName === "polar stereographic (variant a)")) {
    wkt.lat_ts = wkt.lat0;
    wkt.lat0 = d2r(wkt.lat0 > 0 ? 90 : -90);
    delete wkt.lat1;
  }
}
__name(applyProjectionDefaults, "applyProjectionDefaults");

// node_modules/wkt-parser/transformPROJJSON.js
function processUnit(unit) {
  let result = { units: null, to_meter: void 0 };
  if (typeof unit === "string") {
    result.units = unit.toLowerCase();
    if (result.units === "metre") {
      result.units = "meter";
    }
    if (result.units === "meter") {
      result.to_meter = 1;
    }
  } else if (unit && unit.name) {
    result.units = unit.name.toLowerCase();
    if (result.units === "metre") {
      result.units = "meter";
    }
    result.to_meter = unit.conversion_factor;
  }
  return result;
}
__name(processUnit, "processUnit");
function toValue(valueOrObject) {
  if (typeof valueOrObject === "object") {
    return valueOrObject.value * valueOrObject.unit.conversion_factor;
  }
  return valueOrObject;
}
__name(toValue, "toValue");
function calculateEllipsoid(value, result) {
  if (value.ellipsoid.radius) {
    result.a = value.ellipsoid.radius;
    result.rf = 0;
  } else {
    result.a = toValue(value.ellipsoid.semi_major_axis);
    if (value.ellipsoid.inverse_flattening !== void 0) {
      result.rf = value.ellipsoid.inverse_flattening;
    } else if (value.ellipsoid.semi_major_axis !== void 0 && value.ellipsoid.semi_minor_axis !== void 0) {
      result.rf = result.a / (result.a - toValue(value.ellipsoid.semi_minor_axis));
    }
  }
}
__name(calculateEllipsoid, "calculateEllipsoid");
function transformPROJJSON(projjson, result = {}) {
  if (!projjson || typeof projjson !== "object") {
    return projjson;
  }
  if (projjson.type === "BoundCRS") {
    transformPROJJSON(projjson.source_crs, result);
    if (projjson.transformation) {
      if (projjson.transformation.method && projjson.transformation.method.name === "NTv2") {
        result.nadgrids = projjson.transformation.parameters[0].value;
      } else {
        result.datum_params = projjson.transformation.parameters.map((param) => param.value);
      }
    }
    return result;
  }
  Object.keys(projjson).forEach((key2) => {
    const value = projjson[key2];
    if (value === null) {
      return;
    }
    switch (key2) {
      case "name":
        if (result.srsCode) {
          break;
        }
        result.name = value;
        result.srsCode = value;
        break;
      case "type":
        if (value === "GeographicCRS") {
          result.projName = "longlat";
        } else if (value === "GeodeticCRS") {
          if (projjson.coordinate_system && projjson.coordinate_system.subtype === "Cartesian") {
            result.projName = "geocent";
          } else {
            result.projName = "longlat";
          }
        } else if (value === "ProjectedCRS" && projjson.conversion && projjson.conversion.method) {
          result.projName = projjson.conversion.method.name;
        }
        break;
      case "datum":
      case "datum_ensemble":
        if (value.ellipsoid) {
          result.ellps = value.ellipsoid.name;
          calculateEllipsoid(value, result);
        }
        if (value.prime_meridian) {
          result.from_greenwich = value.prime_meridian.longitude * Math.PI / 180;
        }
        break;
      case "ellipsoid":
        result.ellps = value.name;
        calculateEllipsoid(value, result);
        break;
      case "prime_meridian":
        result.long0 = (value.longitude || 0) * Math.PI / 180;
        break;
      case "coordinate_system":
        if (value.axis) {
          const directionMap = {
            "east": "e",
            "north": "n",
            "west": "w",
            "south": "s",
            "up": "u",
            "down": "d",
            "geocentricx": "e",
            "geocentricy": "n",
            "geocentricz": "u"
          };
          const mapped = value.axis.map((axis) => directionMap[axis.direction.toLowerCase()]);
          if (mapped.every(Boolean)) {
            result.axis = mapped.join("");
            if (result.axis.length === 2) {
              result.axis += "u";
            }
          }
          if (value.unit) {
            const { units, to_meter } = processUnit(value.unit);
            result.units = units;
            result.to_meter = to_meter;
          } else if (value.axis[0] && value.axis[0].unit) {
            const { units, to_meter } = processUnit(value.axis[0].unit);
            result.units = units;
            result.to_meter = to_meter;
          }
        }
        break;
      case "id":
        if (value.authority && value.code) {
          result.title = value.authority + ":" + value.code;
        }
        break;
      case "conversion":
        if (value.method && value.method.name) {
          result.projName = value.method.name;
        }
        if (value.parameters) {
          value.parameters.forEach((param) => {
            const paramName = param.name.toLowerCase().replace(/\s+/g, "_");
            const paramValue = param.value;
            if (param.unit && param.unit.conversion_factor) {
              result[paramName] = paramValue * param.unit.conversion_factor;
            } else if (param.unit === "degree") {
              result[paramName] = paramValue * Math.PI / 180;
            } else {
              result[paramName] = paramValue;
            }
          });
        }
        break;
      case "unit":
        if (value.name) {
          result.units = value.name.toLowerCase();
          if (result.units === "metre") {
            result.units = "meter";
          }
        }
        if (value.conversion_factor) {
          result.to_meter = value.conversion_factor;
        }
        break;
      case "base_crs":
        transformPROJJSON(value, result);
        result.datumCode = value.id ? value.id.authority + "_" + value.id.code : value.name;
        break;
      default:
        break;
    }
  });
  if (!result.datumCode && (projjson.type === "GeographicCRS" || projjson.type === "GeodeticCRS") && projjson.id) {
    result.datumCode = projjson.id.authority + "_" + projjson.id.code;
  }
  if (result.latitude_of_false_origin !== void 0) {
    result.lat0 = result.latitude_of_false_origin;
  }
  if (result.longitude_of_false_origin !== void 0) {
    result.long0 = result.longitude_of_false_origin;
  }
  if (result.latitude_of_standard_parallel !== void 0) {
    result.lat0 = result.latitude_of_standard_parallel;
    result.lat1 = result.latitude_of_standard_parallel;
  }
  if (result.latitude_of_1st_standard_parallel !== void 0) {
    result.lat1 = result.latitude_of_1st_standard_parallel;
  }
  if (result.latitude_of_2nd_standard_parallel !== void 0) {
    result.lat2 = result.latitude_of_2nd_standard_parallel;
  }
  if (result.latitude_of_projection_centre !== void 0) {
    result.lat0 = result.latitude_of_projection_centre;
  }
  if (result.longitude_of_projection_centre !== void 0) {
    result.longc = result.longitude_of_projection_centre;
  }
  if (result.easting_at_false_origin !== void 0) {
    result.x0 = result.easting_at_false_origin;
  }
  if (result.northing_at_false_origin !== void 0) {
    result.y0 = result.northing_at_false_origin;
  }
  if (result.latitude_of_natural_origin !== void 0) {
    result.lat0 = result.latitude_of_natural_origin;
  }
  if (result.longitude_of_natural_origin !== void 0) {
    result.long0 = result.longitude_of_natural_origin;
  }
  if (result.longitude_of_origin !== void 0) {
    result.long0 = result.longitude_of_origin;
  }
  if (result.false_easting !== void 0) {
    result.x0 = result.false_easting;
  }
  if (result.easting_at_projection_centre) {
    result.x0 = result.easting_at_projection_centre;
  }
  if (result.false_northing !== void 0) {
    result.y0 = result.false_northing;
  }
  if (result.northing_at_projection_centre) {
    result.y0 = result.northing_at_projection_centre;
  }
  if (result.standard_parallel_1 !== void 0) {
    result.lat1 = result.standard_parallel_1;
  }
  if (result.standard_parallel_2 !== void 0) {
    result.lat2 = result.standard_parallel_2;
  }
  if (result.scale_factor_at_natural_origin !== void 0) {
    result.k0 = result.scale_factor_at_natural_origin;
  }
  if (result.scale_factor_at_projection_centre !== void 0) {
    result.k0 = result.scale_factor_at_projection_centre;
  }
  if (result.scale_factor_on_pseudo_standard_parallel !== void 0) {
    result.k0 = result.scale_factor_on_pseudo_standard_parallel;
  }
  if (result.azimuth !== void 0) {
    result.alpha = result.azimuth;
  }
  if (result.azimuth_at_projection_centre !== void 0) {
    result.alpha = result.azimuth_at_projection_centre;
  }
  if (result.angle_from_rectified_to_skew_grid) {
    result.rectified_grid_angle = result.angle_from_rectified_to_skew_grid;
  }
  applyProjectionDefaults(result);
  return result;
}
__name(transformPROJJSON, "transformPROJJSON");

// node_modules/wkt-parser/index.js
var knownTypes = [
  "PROJECTEDCRS",
  "PROJCRS",
  "GEOGCS",
  "GEOCCS",
  "PROJCS",
  "LOCAL_CS",
  "GEODCRS",
  "GEODETICCRS",
  "GEODETICDATUM",
  "ENGCRS",
  "ENGINEERINGCRS"
];
function rename(obj, params2) {
  var outName = params2[0];
  var inName = params2[1];
  if (!(outName in obj) && inName in obj) {
    obj[outName] = obj[inName];
    if (params2.length === 3) {
      obj[outName] = params2[2](obj[outName]);
    }
  }
}
__name(rename, "rename");
function cleanWKT(wkt) {
  var keys = Object.keys(wkt);
  for (var i = 0, ii = keys.length; i < ii; ++i) {
    var key2 = keys[i];
    if (knownTypes.indexOf(key2) !== -1) {
      setPropertiesFromWkt(wkt[key2]);
    }
    if (typeof wkt[key2] === "object") {
      cleanWKT(wkt[key2]);
    }
  }
}
__name(cleanWKT, "cleanWKT");
function setPropertiesFromWkt(wkt) {
  if (wkt.AUTHORITY) {
    var authority = Object.keys(wkt.AUTHORITY)[0];
    if (authority && authority in wkt.AUTHORITY) {
      wkt.title = authority + ":" + wkt.AUTHORITY[authority];
    }
  }
  if (wkt.type === "GEOGCS") {
    wkt.projName = "longlat";
  } else if (wkt.type === "LOCAL_CS") {
    wkt.projName = "identity";
    wkt.local = true;
  } else {
    if (typeof wkt.PROJECTION === "object") {
      wkt.projName = Object.keys(wkt.PROJECTION)[0];
    } else {
      wkt.projName = wkt.PROJECTION;
    }
  }
  if (wkt.AXIS) {
    var axisOrder = "";
    for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
      var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()];
      if (axis[0].indexOf("north") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "north") {
        axisOrder += "n";
      } else if (axis[0].indexOf("south") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "south") {
        axisOrder += "s";
      } else if (axis[0].indexOf("east") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "east") {
        axisOrder += "e";
      } else if (axis[0].indexOf("west") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "west") {
        axisOrder += "w";
      }
    }
    if (axisOrder.length === 2) {
      axisOrder += "u";
    }
    if (axisOrder.length === 3) {
      wkt.axis = axisOrder;
    }
  }
  if (wkt.UNIT) {
    wkt.units = wkt.UNIT.name.toLowerCase();
    if (wkt.units === "metre") {
      wkt.units = "meter";
    }
    if (wkt.UNIT.convert) {
      if (wkt.type === "GEOGCS") {
        if (wkt.DATUM && wkt.DATUM.SPHEROID) {
          wkt.to_meter = wkt.UNIT.convert * wkt.DATUM.SPHEROID.a;
        }
      } else {
        wkt.to_meter = wkt.UNIT.convert;
      }
    }
  }
  var geogcs = wkt.GEOGCS;
  if (wkt.type === "GEOGCS") {
    geogcs = wkt;
  }
  if (geogcs) {
    if (geogcs.PRIMEM && geogcs.PRIMEM.convert) {
      wkt.from_greenwich = d2r(geogcs.PRIMEM.convert);
    }
    if (geogcs.DATUM) {
      wkt.datumCode = geogcs.DATUM.name.toLowerCase();
    } else {
      wkt.datumCode = geogcs.name.toLowerCase();
    }
    if (wkt.datumCode.slice(0, 2) === "d_") {
      wkt.datumCode = wkt.datumCode.slice(2);
    }
    if (wkt.datumCode === "new_zealand_1949") {
      wkt.datumCode = "nzgd49";
    }
    if (wkt.datumCode === "wgs_1984" || wkt.datumCode === "world_geodetic_system_1984") {
      if (wkt.PROJECTION === "Mercator_Auxiliary_Sphere") {
        wkt.sphere = true;
      }
      wkt.datumCode = "wgs84";
    }
    if (wkt.datumCode === "belge_1972") {
      wkt.datumCode = "rnb72";
    }
    if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
      wkt.ellps = geogcs.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk");
      if (wkt.ellps.toLowerCase().slice(0, 13) === "international") {
        wkt.ellps = "intl";
      }
      wkt.a = geogcs.DATUM.SPHEROID.a;
      wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf);
    }
    if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
      wkt.datum_params = geogcs.DATUM.TOWGS84;
    }
    if (~wkt.datumCode.indexOf("osgb_1936")) {
      wkt.datumCode = "osgb36";
    }
    if (~wkt.datumCode.indexOf("osni_1952")) {
      wkt.datumCode = "osni52";
    }
    if (~wkt.datumCode.indexOf("tm65") || ~wkt.datumCode.indexOf("geodetic_datum_of_1965")) {
      wkt.datumCode = "ire65";
    }
    if (wkt.datumCode === "ch1903+") {
      wkt.datumCode = "ch1903";
    }
    if (~wkt.datumCode.indexOf("israel")) {
      wkt.datumCode = "isr93";
    }
  }
  if (wkt.b && !isFinite(wkt.b)) {
    wkt.b = wkt.a;
  }
  if (wkt.rectified_grid_angle) {
    wkt.rectified_grid_angle = d2r(wkt.rectified_grid_angle);
  }
  function toMeter(input) {
    var ratio = wkt.to_meter || 1;
    return input * ratio;
  }
  __name(toMeter, "toMeter");
  var renamer = /* @__PURE__ */ __name(function(a) {
    return rename(wkt, a);
  }, "renamer");
  var list = [
    ["standard_parallel_1", "Standard_Parallel_1"],
    ["standard_parallel_1", "Latitude of 1st standard parallel"],
    ["standard_parallel_2", "Standard_Parallel_2"],
    ["standard_parallel_2", "Latitude of 2nd standard parallel"],
    ["false_easting", "False_Easting"],
    ["false_easting", "False easting"],
    ["false-easting", "Easting at false origin"],
    ["false_northing", "False_Northing"],
    ["false_northing", "False northing"],
    ["false_northing", "Northing at false origin"],
    ["central_meridian", "Central_Meridian"],
    ["central_meridian", "Longitude of natural origin"],
    ["central_meridian", "Longitude of false origin"],
    ["latitude_of_origin", "Latitude_Of_Origin"],
    ["latitude_of_origin", "Central_Parallel"],
    ["latitude_of_origin", "Latitude of natural origin"],
    ["latitude_of_origin", "Latitude of false origin"],
    ["scale_factor", "Scale_Factor"],
    ["k0", "scale_factor"],
    ["latitude_of_center", "Latitude_Of_Center"],
    ["latitude_of_center", "Latitude_of_center"],
    ["lat0", "latitude_of_center", d2r],
    ["longitude_of_center", "Longitude_Of_Center"],
    ["longitude_of_center", "Longitude_of_center"],
    ["longc", "longitude_of_center", d2r],
    ["x0", "false_easting", toMeter],
    ["y0", "false_northing", toMeter],
    ["long0", "central_meridian", d2r],
    ["lat0", "latitude_of_origin", d2r],
    ["lat0", "standard_parallel_1", d2r],
    ["lat1", "standard_parallel_1", d2r],
    ["lat2", "standard_parallel_2", d2r],
    ["azimuth", "Azimuth"],
    ["alpha", "azimuth", d2r],
    ["srsCode", "name"]
  ];
  list.forEach(renamer);
  applyProjectionDefaults(wkt);
}
__name(setPropertiesFromWkt, "setPropertiesFromWkt");
function wkt_parser_default(wkt) {
  if (typeof wkt === "object") {
    return transformPROJJSON(wkt);
  }
  const version = detectWKTVersion(wkt);
  var lisp = parser_default(wkt);
  if (version === "WKT2") {
    const projjson = buildPROJJSON(lisp);
    return transformPROJJSON(projjson);
  }
  var type = lisp[0];
  var obj = {};
  sExpr(lisp, obj);
  cleanWKT(obj);
  return obj[type];
}
__name(wkt_parser_default, "default");

// node_modules/proj4/lib/defs.js
function defs(name) {
  var that = this;
  if (arguments.length === 2) {
    var def = arguments[1];
    if (typeof def === "string") {
      if (def.charAt(0) === "+") {
        defs[
          /** @type {string} */
          name
        ] = projString_default(arguments[1]);
      } else {
        defs[
          /** @type {string} */
          name
        ] = wkt_parser_default(arguments[1]);
      }
    } else if (def && typeof def === "object" && !("projName" in def)) {
      defs[
        /** @type {string} */
        name
      ] = wkt_parser_default(arguments[1]);
    } else {
      defs[
        /** @type {string} */
        name
      ] = def;
      if (!def) {
        delete defs[
          /** @type {string} */
          name
        ];
      }
    }
  } else if (arguments.length === 1) {
    if (Array.isArray(name)) {
      return name.map(function(v) {
        if (Array.isArray(v)) {
          return defs.apply(that, v);
        } else {
          return defs(v);
        }
      });
    } else if (typeof name === "string") {
      if (name in defs) {
        return defs[name];
      }
    } else if ("EPSG" in name) {
      defs["EPSG:" + name.EPSG] = name;
    } else if ("ESRI" in name) {
      defs["ESRI:" + name.ESRI] = name;
    } else if ("IAU2000" in name) {
      defs["IAU2000:" + name.IAU2000] = name;
    } else {
      console.log(name);
    }
    return;
  }
}
__name(defs, "defs");
global_default(defs);
var defs_default = defs;

// node_modules/proj4/lib/parseCode.js
function testObj(code) {
  return typeof code === "string";
}
__name(testObj, "testObj");
function testDef(code) {
  return code in defs_default;
}
__name(testDef, "testDef");
function testWKT(code) {
  return code.indexOf("+") !== 0 && code.indexOf("[") !== -1 || typeof code === "object" && !("srsCode" in code);
}
__name(testWKT, "testWKT");
var codes = ["3857", "900913", "3785", "102113"];
function checkMercator(item) {
  if (item.title) {
    return item.title.toLowerCase().indexOf("epsg:") === 0 && codes.indexOf(item.title.substr(5)) > -1;
  }
  var auth = match(item, "authority");
  if (!auth) {
    return;
  }
  var code = match(auth, "epsg");
  return code && codes.indexOf(code) > -1;
}
__name(checkMercator, "checkMercator");
function checkProjStr(item) {
  var ext = match(item, "extension");
  if (!ext) {
    return;
  }
  return match(ext, "proj4");
}
__name(checkProjStr, "checkProjStr");
function testProj(code) {
  return code[0] === "+";
}
__name(testProj, "testProj");
function parse(code) {
  let out;
  if (testObj(code)) {
    if (testDef(code)) {
      out = defs_default[code];
    } else if (testWKT(code)) {
      out = wkt_parser_default(code);
      var maybeProjStr = checkProjStr(out);
      if (maybeProjStr) {
        out = projString_default(maybeProjStr);
      }
    } else if (testProj(code)) {
      out = projString_default(code);
    }
  } else if (!("projName" in code)) {
    out = wkt_parser_default(code);
  } else {
    out = code;
  }
  return out && checkMercator(out) ? defs_default["EPSG:3857"] : out;
}
__name(parse, "parse");
var parseCode_default = parse;

// node_modules/proj4/lib/extend.js
function extend_default(destination, source) {
  destination = destination || {};
  var value, property;
  if (!source) {
    return destination;
  }
  for (property in source) {
    value = source[property];
    if (value !== void 0) {
      destination[property] = value;
    }
  }
  return destination;
}
__name(extend_default, "default");

// node_modules/proj4/lib/common/msfnz.js
function msfnz_default(eccent, sinphi, cosphi) {
  var con = eccent * sinphi;
  return cosphi / Math.sqrt(1 - con * con);
}
__name(msfnz_default, "default");

// node_modules/proj4/lib/common/sign.js
function sign_default(x) {
  return x < 0 ? -1 : 1;
}
__name(sign_default, "default");

// node_modules/proj4/lib/common/adjust_lon.js
function adjust_lon_default(x, skipAdjust) {
  if (skipAdjust) {
    return x;
  }
  return Math.abs(x) <= SPI ? x : x - sign_default(x) * TWO_PI;
}
__name(adjust_lon_default, "default");

// node_modules/proj4/lib/common/tsfnz.js
function tsfnz_default(eccent, phi, sinphi) {
  var con = eccent * sinphi;
  var com = 0.5 * eccent;
  con = Math.pow((1 - con) / (1 + con), com);
  return Math.tan(0.5 * (HALF_PI - phi)) / con;
}
__name(tsfnz_default, "default");

// node_modules/proj4/lib/common/phi2z.js
function phi2z_default(eccent, ts) {
  var eccnth = 0.5 * eccent;
  var con, dphi;
  var phi = HALF_PI - 2 * Math.atan(ts);
  for (var i = 0; i <= 15; i++) {
    con = eccent * Math.sin(phi);
    dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi;
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return -9999;
}
__name(phi2z_default, "default");

// node_modules/proj4/lib/projections/merc.js
function init() {
  var con = this.b / this.a;
  this.es = 1 - con * con;
  if (!("x0" in this)) {
    this.x0 = 0;
  }
  if (!("y0" in this)) {
    this.y0 = 0;
  }
  this.long0 = this.long0 || 0;
  this.e = Math.sqrt(this.es);
  if (this.lat_ts) {
    if (this.sphere) {
      this.k0 = Math.cos(this.lat_ts);
    } else {
      this.k0 = msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  } else {
    if (!this.k0) {
      if (this.k) {
        this.k0 = this.k;
      } else {
        this.k0 = 1;
      }
    }
  }
}
__name(init, "init");
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
    return null;
  }
  var x, y;
  if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    return null;
  } else {
    if (this.sphere) {
      x = this.x0 + this.a * this.k0 * adjust_lon_default(lon - this.long0, this.over);
      y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
    } else {
      var sinphi = Math.sin(lat);
      var ts = tsfnz_default(this.e, lat, sinphi);
      x = this.x0 + this.a * this.k0 * adjust_lon_default(lon - this.long0, this.over);
      y = this.y0 - this.a * this.k0 * Math.log(ts);
    }
    p.x = x;
    p.y = y;
    return p;
  }
}
__name(forward, "forward");
function inverse(p) {
  var x = p.x - this.x0;
  var y = p.y - this.y0;
  var lon, lat;
  if (this.sphere) {
    lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
  } else {
    var ts = Math.exp(-y / (this.a * this.k0));
    lat = phi2z_default(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  lon = adjust_lon_default(this.long0 + x / (this.a * this.k0), this.over);
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse, "inverse");
var names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "Mercator_Variant_A", "merc"];
var merc_default = {
  init,
  forward,
  inverse,
  names
};

// node_modules/proj4/lib/projections/longlat.js
function init2() {
}
__name(init2, "init");
function identity(pt) {
  return pt;
}
__name(identity, "identity");
var names2 = ["longlat", "identity", "lonlat", "latlon", "latlong"];
var longlat_default = {
  init: init2,
  forward: identity,
  inverse: identity,
  names: names2
};

// node_modules/proj4/lib/projections.js
var projs = [merc_default, longlat_default];
var names3 = {};
var projStore = [];
function add(proj, i) {
  var len = projStore.length;
  if (!proj.names) {
    console.log(i);
    return true;
  }
  projStore[len] = proj;
  proj.names.forEach(function(n) {
    names3[n.toLowerCase()] = len;
  });
  return this;
}
__name(add, "add");
function getNormalizedProjName(n) {
  return n.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
}
__name(getNormalizedProjName, "getNormalizedProjName");
function get(name) {
  if (!name) {
    return false;
  }
  var n = name.toLowerCase();
  if (typeof names3[n] !== "undefined" && projStore[names3[n]]) {
    return projStore[names3[n]];
  }
  n = getNormalizedProjName(n);
  if (n in names3 && projStore[names3[n]]) {
    return projStore[names3[n]];
  }
}
__name(get, "get");
function start() {
  projs.forEach(add);
}
__name(start, "start");
var projections_default = {
  start,
  add,
  get
};

// node_modules/proj4/lib/constants/Ellipsoid.js
var ellipsoids = {
  MERIT: {
    a: 6378137,
    rf: 298.257,
    ellipseName: "MERIT 1983"
  },
  SGS85: {
    a: 6378136,
    rf: 298.257,
    ellipseName: "Soviet Geodetic System 85"
  },
  GRS80: {
    a: 6378137,
    rf: 298.257222101,
    ellipseName: "GRS 1980(IUGG, 1980)"
  },
  IAU76: {
    a: 6378140,
    rf: 298.257,
    ellipseName: "IAU 1976"
  },
  airy: {
    a: 6377563396e-3,
    b: 635625691e-2,
    ellipseName: "Airy 1830"
  },
  APL4: {
    a: 6378137,
    rf: 298.25,
    ellipseName: "Appl. Physics. 1965"
  },
  NWL9D: {
    a: 6378145,
    rf: 298.25,
    ellipseName: "Naval Weapons Lab., 1965"
  },
  mod_airy: {
    a: 6377340189e-3,
    b: 6356034446e-3,
    ellipseName: "Modified Airy"
  },
  andrae: {
    a: 637710443e-2,
    rf: 300,
    ellipseName: "Andrae 1876 (Den., Iclnd.)"
  },
  aust_SA: {
    a: 6378160,
    rf: 298.25,
    ellipseName: "Australian Natl & S. Amer. 1969"
  },
  GRS67: {
    a: 6378160,
    rf: 298.247167427,
    ellipseName: "GRS 67(IUGG 1967)"
  },
  bessel: {
    a: 6377397155e-3,
    rf: 299.1528128,
    ellipseName: "Bessel 1841"
  },
  bess_nam: {
    a: 6377483865e-3,
    rf: 299.1528128,
    ellipseName: "Bessel 1841 (Namibia)"
  },
  clrk66: {
    a: 63782064e-1,
    b: 63565838e-1,
    ellipseName: "Clarke 1866"
  },
  clrk80: {
    a: 6378249145e-3,
    rf: 293.4663,
    ellipseName: "Clarke 1880 mod."
  },
  clrk80ign: {
    a: 63782492e-1,
    b: 6356515,
    rf: 293.4660213,
    ellipseName: "Clarke 1880 (IGN)"
  },
  clrk58: {
    a: 6378293645208759e-9,
    rf: 294.2606763692654,
    ellipseName: "Clarke 1858"
  },
  CPM: {
    a: 63757387e-1,
    rf: 334.29,
    ellipseName: "Comm. des Poids et Mesures 1799"
  },
  delmbr: {
    a: 6376428,
    rf: 311.5,
    ellipseName: "Delambre 1810 (Belgium)"
  },
  engelis: {
    a: 637813605e-2,
    rf: 298.2566,
    ellipseName: "Engelis 1985"
  },
  evrst30: {
    a: 6377276345e-3,
    rf: 300.8017,
    ellipseName: "Everest 1830"
  },
  evrst48: {
    a: 6377304063e-3,
    rf: 300.8017,
    ellipseName: "Everest 1948"
  },
  evrst56: {
    a: 6377301243e-3,
    rf: 300.8017,
    ellipseName: "Everest 1956"
  },
  evrst69: {
    a: 6377295664e-3,
    rf: 300.8017,
    ellipseName: "Everest 1969"
  },
  evrstSS: {
    a: 6377298556e-3,
    rf: 300.8017,
    ellipseName: "Everest (Sabah & Sarawak)"
  },
  fschr60: {
    a: 6378166,
    rf: 298.3,
    ellipseName: "Fischer (Mercury Datum) 1960"
  },
  fschr60m: {
    a: 6378155,
    rf: 298.3,
    ellipseName: "Fischer 1960"
  },
  fschr68: {
    a: 6378150,
    rf: 298.3,
    ellipseName: "Fischer 1968"
  },
  helmert: {
    a: 6378200,
    rf: 298.3,
    ellipseName: "Helmert 1906"
  },
  hough: {
    a: 6378270,
    rf: 297,
    ellipseName: "Hough"
  },
  intl: {
    a: 6378388,
    rf: 297,
    ellipseName: "International 1909 (Hayford)"
  },
  kaula: {
    a: 6378163,
    rf: 298.24,
    ellipseName: "Kaula 1961"
  },
  lerch: {
    a: 6378139,
    rf: 298.257,
    ellipseName: "Lerch 1979"
  },
  mprts: {
    a: 6397300,
    rf: 191,
    ellipseName: "Maupertius 1738"
  },
  new_intl: {
    a: 63781575e-1,
    b: 63567722e-1,
    ellipseName: "New International 1967"
  },
  plessis: {
    a: 6376523,
    b: 6355863,
    ellipseName: "Plessis 1817 (France)"
  },
  krass: {
    a: 6378245,
    rf: 298.3,
    ellipseName: "Krassovsky, 1942"
  },
  SEasia: {
    a: 6378155,
    b: 63567733205e-4,
    ellipseName: "Southeast Asia"
  },
  walbeck: {
    a: 6376896,
    b: 63558348467e-4,
    ellipseName: "Walbeck"
  },
  WGS60: {
    a: 6378165,
    rf: 298.3,
    ellipseName: "WGS 60"
  },
  WGS66: {
    a: 6378145,
    rf: 298.25,
    ellipseName: "WGS 66"
  },
  WGS7: {
    a: 6378135,
    rf: 298.26,
    ellipseName: "WGS 72"
  },
  WGS84: {
    a: 6378137,
    rf: 298.257223563,
    ellipseName: "WGS 84"
  },
  sphere: {
    a: 6370997,
    b: 6370997,
    ellipseName: "Normal Sphere (r=6370997)"
  }
};
var Ellipsoid_default = ellipsoids;

// node_modules/proj4/lib/deriveConstants.js
var WGS84 = Ellipsoid_default.WGS84;
function eccentricity(a, b, rf, R_A) {
  var a2 = a * a;
  var b2 = b * b;
  var es = (a2 - b2) / a2;
  var e = 0;
  if (R_A) {
    a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
    a2 = a * a;
    es = 0;
  } else {
    e = Math.sqrt(es);
  }
  var ep2 = (a2 - b2) / b2;
  return {
    es,
    e,
    ep2
  };
}
__name(eccentricity, "eccentricity");
function sphere(a, b, rf, ellps, sphere2) {
  if (!a) {
    var ellipse = match(Ellipsoid_default, ellps);
    if (!ellipse) {
      ellipse = WGS84;
    }
    a = ellipse.a;
    b = ellipse.b;
    rf = ellipse.rf;
  }
  if (rf && !b) {
    b = (1 - 1 / rf) * a;
  }
  if (rf === 0 || Math.abs(a - b) < EPSLN) {
    sphere2 = true;
    b = a;
  }
  return {
    a,
    b,
    rf,
    sphere: sphere2
  };
}
__name(sphere, "sphere");

// node_modules/proj4/lib/constants/Datum.js
var datums = {
  wgs84: {
    towgs84: "0,0,0",
    ellipse: "WGS84",
    datumName: "WGS84"
  },
  ch1903: {
    towgs84: "674.374,15.056,405.346",
    ellipse: "bessel",
    datumName: "swiss"
  },
  ggrs87: {
    towgs84: "-199.87,74.79,246.62",
    ellipse: "GRS80",
    datumName: "Greek_Geodetic_Reference_System_1987"
  },
  nad83: {
    towgs84: "0,0,0",
    ellipse: "GRS80",
    datumName: "North_American_Datum_1983"
  },
  nad27: {
    nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
    ellipse: "clrk66",
    datumName: "North_American_Datum_1927"
  },
  potsdam: {
    towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
    ellipse: "bessel",
    datumName: "Potsdam Rauenberg 1950 DHDN"
  },
  carthage: {
    towgs84: "-263.0,6.0,431.0",
    ellipse: "clrk80ign",
    datumName: "Carthage 1934 Tunisia"
  },
  hermannskogel: {
    towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
    ellipse: "bessel",
    datumName: "Hermannskogel"
  },
  mgi: {
    towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
    ellipse: "bessel",
    datumName: "Militar-Geographische Institut"
  },
  osni52: {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "airy",
    datumName: "Irish National"
  },
  ire65: {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "mod_airy",
    datumName: "Ireland 1965"
  },
  rassadiran: {
    towgs84: "-133.63,-157.5,-158.62",
    ellipse: "intl",
    datumName: "Rassadiran"
  },
  nzgd49: {
    towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
    ellipse: "intl",
    datumName: "New Zealand Geodetic Datum 1949"
  },
  osgb36: {
    towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
    ellipse: "airy",
    datumName: "Ordnance Survey of Great Britain 1936"
  },
  s_jtsk: {
    towgs84: "589,76,480",
    ellipse: "bessel",
    datumName: "S-JTSK (Ferro)"
  },
  beduaram: {
    towgs84: "-106,-87,188",
    ellipse: "clrk80",
    datumName: "Beduaram"
  },
  gunung_segara: {
    towgs84: "-403,684,41",
    ellipse: "bessel",
    datumName: "Gunung Segara Jakarta"
  },
  rnb72: {
    towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
    ellipse: "intl",
    datumName: "Reseau National Belge 1972"
  },
  EPSG_5451: {
    towgs84: "6.41,-49.05,-11.28,1.5657,0.5242,6.9718,-5.7649"
  },
  IGNF_LURESG: {
    towgs84: "-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43"
  },
  EPSG_4614: {
    towgs84: "-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065"
  },
  EPSG_4615: {
    towgs84: "-494.088,-312.129,279.877,-1.423,-1.013,1.59,-0.748"
  },
  ESRI_37241: {
    towgs84: "-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031"
  },
  ESRI_37249: {
    towgs84: "-440.296,58.548,296.265,1.128,10.202,4.559,-0.438"
  },
  ESRI_37245: {
    towgs84: "-511.151,-181.269,139.609,1.05,2.703,1.798,3.071"
  },
  EPSG_4178: {
    towgs84: "24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01"
  },
  EPSG_4622: {
    towgs84: "-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984"
  },
  EPSG_4625: {
    towgs84: "126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227"
  },
  EPSG_5252: {
    towgs84: "0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439"
  },
  EPSG_4314: {
    towgs84: "597.1,71.4,412.1,0.894,0.068,-1.563,7.58"
  },
  EPSG_4282: {
    towgs84: "-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166"
  },
  EPSG_4231: {
    towgs84: "-83.11,-97.38,-117.22,0.005693,-0.044698,0.044285,0.1218"
  },
  EPSG_4274: {
    towgs84: "-230.994,102.591,25.199,0.633,-0.239,0.9,1.95"
  },
  EPSG_4134: {
    towgs84: "-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006"
  },
  EPSG_4254: {
    towgs84: "18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013"
  },
  EPSG_4159: {
    towgs84: "-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175"
  },
  EPSG_4687: {
    towgs84: "0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093"
  },
  EPSG_4227: {
    towgs84: "-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225"
  },
  EPSG_4746: {
    towgs84: "599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46"
  },
  EPSG_4745: {
    towgs84: "612.4,77,440.2,-0.054,0.057,-2.797,2.55"
  },
  EPSG_6311: {
    towgs84: "8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926"
  },
  EPSG_4289: {
    towgs84: "565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244"
  },
  EPSG_4230: {
    towgs84: "-68.863,-134.888,-111.49,-0.53,-0.14,0.57,-3.4"
  },
  EPSG_4154: {
    towgs84: "-123.02,-158.95,-168.47"
  },
  EPSG_4156: {
    towgs84: "570.8,85.7,462.8,4.998,1.587,5.261,3.56"
  },
  EPSG_4299: {
    towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
  },
  EPSG_4179: {
    towgs84: "33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84"
  },
  EPSG_4313: {
    towgs84: "-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747"
  },
  EPSG_4194: {
    towgs84: "163.511,127.533,-159.789"
  },
  EPSG_4195: {
    towgs84: "105,326,-102.5"
  },
  EPSG_4196: {
    towgs84: "-45,417,-3.5"
  },
  EPSG_4611: {
    towgs84: "-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246"
  },
  EPSG_4633: {
    towgs84: "137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824"
  },
  EPSG_4641: {
    towgs84: "-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993"
  },
  EPSG_4643: {
    towgs84: "-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002"
  },
  EPSG_4300: {
    towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
  },
  EPSG_4188: {
    towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
  },
  EPSG_4660: {
    towgs84: "982.6087,552.753,-540.873,6.681627,-31.611492,-19.848161,16.805"
  },
  EPSG_4662: {
    towgs84: "97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259"
  },
  EPSG_3906: {
    towgs84: "577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664"
  },
  EPSG_4307: {
    towgs84: "-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547"
  },
  EPSG_6892: {
    towgs84: "-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686"
  },
  EPSG_4690: {
    towgs84: "221.597,152.441,176.523,2.403,1.3893,0.884,11.4648"
  },
  EPSG_4691: {
    towgs84: "218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817"
  },
  EPSG_4629: {
    towgs84: "72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653"
  },
  EPSG_4630: {
    towgs84: "165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111"
  },
  EPSG_4692: {
    towgs84: "217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093"
  },
  EPSG_9333: {
    towgs84: "0,0,0,-0.008393,0.000749,-0.010276,0"
  },
  EPSG_9059: {
    towgs84: "0,0,0"
  },
  EPSG_4312: {
    towgs84: "601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887"
  },
  EPSG_4123: {
    towgs84: "-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496"
  },
  EPSG_4309: {
    towgs84: "-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365"
  },
  ESRI_104106: {
    towgs84: "-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058"
  },
  EPSG_4281: {
    towgs84: "-219.247,-73.802,269.529"
  },
  EPSG_4322: {
    towgs84: "0,0,4.5"
  },
  EPSG_4324: {
    towgs84: "0,0,1.9"
  },
  EPSG_4284: {
    towgs84: "43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549"
  },
  EPSG_4277: {
    towgs84: "446.448,-125.157,542.06,0.15,0.247,0.842,-20.489"
  },
  EPSG_4207: {
    towgs84: "-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46"
  },
  EPSG_4688: {
    towgs84: "347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647"
  },
  EPSG_4689: {
    towgs84: "410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218"
  },
  EPSG_4720: {
    towgs84: "0,0,4.5"
  },
  EPSG_4273: {
    towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21"
  },
  EPSG_4240: {
    towgs84: "204.64,834.74,293.8"
  },
  EPSG_4817: {
    towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21"
  },
  ESRI_104131: {
    towgs84: "426.62,142.62,460.09,4.98,4.49,-12.42,-17.1"
  },
  EPSG_4265: {
    towgs84: "-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"
  },
  EPSG_4263: {
    towgs84: "-111.92,-87.85,114.5,1.875,0.202,0.219,0.032"
  },
  EPSG_4298: {
    towgs84: "-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536"
  },
  EPSG_4270: {
    towgs84: "-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424"
  },
  EPSG_4229: {
    towgs84: "-121.8,98.1,-10.7"
  },
  EPSG_4220: {
    towgs84: "-55.5,-348,-229.2"
  },
  EPSG_4214: {
    towgs84: "12.646,-155.176,-80.863"
  },
  EPSG_4232: {
    towgs84: "-345,3,223"
  },
  EPSG_4238: {
    towgs84: "-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037"
  },
  EPSG_4168: {
    towgs84: "-170,33,326"
  },
  EPSG_4131: {
    towgs84: "199,931,318.9"
  },
  EPSG_4152: {
    towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
  },
  EPSG_5228: {
    towgs84: "572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378"
  },
  EPSG_8351: {
    towgs84: "485.021,169.465,483.839,7.786342,4.397554,4.102655,0"
  },
  EPSG_4683: {
    towgs84: "-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06"
  },
  EPSG_4133: {
    towgs84: "0,0,0"
  },
  EPSG_7373: {
    towgs84: "0.819,-0.5762,-1.6446,-0.00378,-0.03317,0.00318,0.0693"
  },
  EPSG_9075: {
    towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
  },
  EPSG_9072: {
    towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
  },
  EPSG_9294: {
    towgs84: "1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388"
  },
  EPSG_4212: {
    towgs84: "-267.434,173.496,181.814,-13.4704,8.7154,7.3926,14.7492"
  },
  EPSG_4191: {
    towgs84: "-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703"
  },
  EPSG_4237: {
    towgs84: "52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191"
  },
  EPSG_4740: {
    towgs84: "-1.08,-0.27,-0.9"
  },
  EPSG_4124: {
    towgs84: "419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496"
  },
  EPSG_5681: {
    towgs84: "584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922"
  },
  EPSG_4141: {
    towgs84: "23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262"
  },
  EPSG_4204: {
    towgs84: "-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194"
  },
  EPSG_4319: {
    towgs84: "226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798"
  },
  EPSG_4200: {
    towgs84: "24.82,-131.21,-82.66"
  },
  EPSG_4130: {
    towgs84: "0,0,0"
  },
  EPSG_4127: {
    towgs84: "-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359"
  },
  EPSG_4149: {
    towgs84: "674.374,15.056,405.346"
  },
  EPSG_4617: {
    towgs84: "-0.991,1.9072,0.5129,0.02579,0.00965,0.01166,0"
  },
  EPSG_4663: {
    towgs84: "-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485"
  },
  EPSG_4664: {
    towgs84: "-211.939,137.626,58.3,-0.089,0.251,0.079,0.384"
  },
  EPSG_4665: {
    towgs84: "-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048"
  },
  EPSG_4666: {
    towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"
  },
  EPSG_4756: {
    towgs84: "-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188"
  },
  EPSG_4723: {
    towgs84: "-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925"
  },
  EPSG_4726: {
    towgs84: "8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081"
  },
  EPSG_4267: {
    towgs84: "-8.0,160.0,176.0"
  },
  EPSG_5365: {
    towgs84: "-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693"
  },
  EPSG_4218: {
    towgs84: "304.5,306.5,-318.1"
  },
  EPSG_4242: {
    towgs84: "-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95"
  },
  EPSG_4216: {
    towgs84: "-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289"
  },
  ESRI_104105: {
    towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"
  },
  ESRI_104129: {
    towgs84: "0,0,0"
  },
  EPSG_4673: {
    towgs84: "174.05,-25.49,112.57"
  },
  EPSG_4202: {
    towgs84: "-124,-60,154"
  },
  EPSG_4203: {
    towgs84: "-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191"
  },
  EPSG_3819: {
    towgs84: "595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408"
  },
  EPSG_8694: {
    towgs84: "-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169"
  },
  EPSG_4145: {
    towgs84: "275.57,676.78,229.6"
  },
  EPSG_4283: {
    towgs84: "0.06155,-0.01087,-0.04019,0.039492,0.032722,0.032898,-0.009994"
  },
  EPSG_4317: {
    towgs84: "2.3287,-147.0425,-92.0802,-0.309248,0.324822,0.497299,5.689063"
  },
  EPSG_4272: {
    towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993"
  },
  EPSG_4248: {
    towgs84: "-307.7,265.3,-363.5"
  },
  EPSG_5561: {
    towgs84: "24,-121,-76"
  },
  EPSG_5233: {
    towgs84: "-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338"
  },
  ESRI_104130: {
    towgs84: "-86,-98,-119"
  },
  ESRI_104102: {
    towgs84: "682,-203,480"
  },
  ESRI_37207: {
    towgs84: "7,-10,-26"
  },
  EPSG_4675: {
    towgs84: "59.935,118.4,-10.871"
  },
  ESRI_104109: {
    towgs84: "-89.121,-348.182,260.871"
  },
  ESRI_104112: {
    towgs84: "-185.583,-230.096,281.361"
  },
  ESRI_104113: {
    towgs84: "25.1,-275.6,222.6"
  },
  IGNF_WGS72G: {
    towgs84: "0,12,6"
  },
  IGNF_NTFG: {
    towgs84: "-168,-60,320"
  },
  IGNF_EFATE57G: {
    towgs84: "-127,-769,472"
  },
  IGNF_PGP50G: {
    towgs84: "324.8,153.6,172.1"
  },
  IGNF_REUN47G: {
    towgs84: "94,-948,-1262"
  },
  IGNF_CSG67G: {
    towgs84: "-186,230,110"
  },
  IGNF_GUAD48G: {
    towgs84: "-467,-16,-300"
  },
  IGNF_TAHI51G: {
    towgs84: "162,117,154"
  },
  IGNF_TAHAAG: {
    towgs84: "65,342,77"
  },
  IGNF_NUKU72G: {
    towgs84: "84,274,65"
  },
  IGNF_PETRELS72G: {
    towgs84: "365,194,166"
  },
  IGNF_WALL78G: {
    towgs84: "253,-133,-127"
  },
  IGNF_MAYO50G: {
    towgs84: "-382,-59,-262"
  },
  IGNF_TANNAG: {
    towgs84: "-139,-967,436"
  },
  IGNF_IGN72G: {
    towgs84: "-13,-348,292"
  },
  IGNF_ATIGG: {
    towgs84: "1118,23,66"
  },
  IGNF_FANGA84G: {
    towgs84: "150.57,158.33,118.32"
  },
  IGNF_RUSAT84G: {
    towgs84: "202.13,174.6,-15.74"
  },
  IGNF_KAUE70G: {
    towgs84: "126.74,300.1,-75.49"
  },
  IGNF_MOP90G: {
    towgs84: "-10.8,-1.8,12.77"
  },
  IGNF_MHPF67G: {
    towgs84: "338.08,212.58,-296.17"
  },
  IGNF_TAHI79G: {
    towgs84: "160.61,116.05,153.69"
  },
  IGNF_ANAA92G: {
    towgs84: "1.5,3.84,4.81"
  },
  IGNF_MARQUI72G: {
    towgs84: "330.91,-13.92,58.56"
  },
  IGNF_APAT86G: {
    towgs84: "143.6,197.82,74.05"
  },
  IGNF_TUBU69G: {
    towgs84: "237.17,171.61,-77.84"
  },
  IGNF_STPM50G: {
    towgs84: "11.363,424.148,373.13"
  },
  EPSG_4150: {
    towgs84: "674.374,15.056,405.346"
  },
  EPSG_4754: {
    towgs84: "-208.4058,-109.8777,-2.5764"
  },
  ESRI_104101: {
    towgs84: "372.87,149.23,585.29"
  },
  EPSG_4693: {
    towgs84: "0,-0.15,0.68"
  },
  EPSG_6207: {
    towgs84: "293.17,726.18,245.36"
  },
  EPSG_4153: {
    towgs84: "-133.63,-157.5,-158.62"
  },
  EPSG_4132: {
    towgs84: "-241.54,-163.64,396.06"
  },
  EPSG_4221: {
    towgs84: "-154.5,150.7,100.4"
  },
  EPSG_4266: {
    towgs84: "-80.7,-132.5,41.1"
  },
  EPSG_4193: {
    towgs84: "-70.9,-151.8,-41.4"
  },
  EPSG_5340: {
    towgs84: "-0.41,0.46,-0.35"
  },
  EPSG_4246: {
    towgs84: "-294.7,-200.1,525.5"
  },
  EPSG_4318: {
    towgs84: "-3.2,-5.7,2.8"
  },
  EPSG_4121: {
    towgs84: "-199.87,74.79,246.62"
  },
  EPSG_4223: {
    towgs84: "-260.1,5.5,432.2"
  },
  EPSG_4158: {
    towgs84: "-0.465,372.095,171.736"
  },
  EPSG_4285: {
    towgs84: "-128.16,-282.42,21.93"
  },
  EPSG_4613: {
    towgs84: "-404.78,685.68,45.47"
  },
  EPSG_4607: {
    towgs84: "195.671,332.517,274.607"
  },
  EPSG_4475: {
    towgs84: "-381.788,-57.501,-256.673"
  },
  EPSG_4208: {
    towgs84: "-157.84,308.54,-146.6"
  },
  EPSG_4743: {
    towgs84: "70.995,-335.916,262.898"
  },
  EPSG_4710: {
    towgs84: "-323.65,551.39,-491.22"
  },
  EPSG_7881: {
    towgs84: "-0.077,0.079,0.086"
  },
  EPSG_4682: {
    towgs84: "283.729,735.942,261.143"
  },
  EPSG_4739: {
    towgs84: "-156,-271,-189"
  },
  EPSG_4679: {
    towgs84: "-80.01,253.26,291.19"
  },
  EPSG_4750: {
    towgs84: "-56.263,16.136,-22.856"
  },
  EPSG_4644: {
    towgs84: "-10.18,-350.43,291.37"
  },
  EPSG_4695: {
    towgs84: "-103.746,-9.614,-255.95"
  },
  EPSG_4292: {
    towgs84: "-355,21,72"
  },
  EPSG_4302: {
    towgs84: "-61.702,284.488,472.052"
  },
  EPSG_4143: {
    towgs84: "-124.76,53,466.79"
  },
  EPSG_4606: {
    towgs84: "-153,153,307"
  },
  EPSG_4699: {
    towgs84: "-770.1,158.4,-498.2"
  },
  EPSG_4247: {
    towgs84: "-273.5,110.6,-357.9"
  },
  EPSG_4160: {
    towgs84: "8.88,184.86,106.69"
  },
  EPSG_4161: {
    towgs84: "-233.43,6.65,173.64"
  },
  EPSG_9251: {
    towgs84: "-9.5,122.9,138.2"
  },
  EPSG_9253: {
    towgs84: "-78.1,101.6,133.3"
  },
  EPSG_4297: {
    towgs84: "-198.383,-240.517,-107.909"
  },
  EPSG_4269: {
    towgs84: "0,0,0"
  },
  EPSG_4301: {
    towgs84: "-147,506,687"
  },
  EPSG_4618: {
    towgs84: "-59,-11,-52"
  },
  EPSG_4612: {
    towgs84: "0,0,0"
  },
  EPSG_4678: {
    towgs84: "44.585,-131.212,-39.544"
  },
  EPSG_4250: {
    towgs84: "-130,29,364"
  },
  EPSG_4144: {
    towgs84: "214,804,268"
  },
  EPSG_4147: {
    towgs84: "-17.51,-108.32,-62.39"
  },
  EPSG_4259: {
    towgs84: "-254.1,-5.36,-100.29"
  },
  EPSG_4164: {
    towgs84: "-76,-138,67"
  },
  EPSG_4211: {
    towgs84: "-378.873,676.002,-46.255"
  },
  EPSG_4182: {
    towgs84: "-422.651,-172.995,84.02"
  },
  EPSG_4224: {
    towgs84: "-143.87,243.37,-33.52"
  },
  EPSG_4225: {
    towgs84: "-205.57,168.77,-4.12"
  },
  EPSG_5527: {
    towgs84: "-67.35,3.88,-38.22"
  },
  EPSG_4752: {
    towgs84: "98,390,-22"
  },
  EPSG_4310: {
    towgs84: "-30,190,89"
  },
  EPSG_9248: {
    towgs84: "-192.26,65.72,132.08"
  },
  EPSG_4680: {
    towgs84: "124.5,-63.5,-281"
  },
  EPSG_4701: {
    towgs84: "-79.9,-158,-168.9"
  },
  EPSG_4706: {
    towgs84: "-146.21,112.63,4.05"
  },
  EPSG_4805: {
    towgs84: "682,-203,480"
  },
  EPSG_4201: {
    towgs84: "-165,-11,206"
  },
  EPSG_4210: {
    towgs84: "-157,-2,-299"
  },
  EPSG_4183: {
    towgs84: "-104,167,-38"
  },
  EPSG_4139: {
    towgs84: "11,72,-101"
  },
  EPSG_4668: {
    towgs84: "-86,-98,-119"
  },
  EPSG_4717: {
    towgs84: "-2,151,181"
  },
  EPSG_4732: {
    towgs84: "102,52,-38"
  },
  EPSG_4280: {
    towgs84: "-377,681,-50"
  },
  EPSG_4209: {
    towgs84: "-138,-105,-289"
  },
  EPSG_4261: {
    towgs84: "31,146,47"
  },
  EPSG_4658: {
    towgs84: "-73,46,-86"
  },
  EPSG_4721: {
    towgs84: "265.025,384.929,-194.046"
  },
  EPSG_4222: {
    towgs84: "-136,-108,-292"
  },
  EPSG_4601: {
    towgs84: "-255,-15,71"
  },
  EPSG_4602: {
    towgs84: "725,685,536"
  },
  EPSG_4603: {
    towgs84: "72,213.7,93"
  },
  EPSG_4605: {
    towgs84: "9,183,236"
  },
  EPSG_4621: {
    towgs84: "137,248,-430"
  },
  EPSG_4657: {
    towgs84: "-28,199,5"
  },
  EPSG_4316: {
    towgs84: "103.25,-100.4,-307.19"
  },
  EPSG_4642: {
    towgs84: "-13,-348,292"
  },
  EPSG_4698: {
    towgs84: "145,-187,103"
  },
  EPSG_4192: {
    towgs84: "-206.1,-174.7,-87.7"
  },
  EPSG_4311: {
    towgs84: "-265,120,-358"
  },
  EPSG_4135: {
    towgs84: "58,-283,-182"
  },
  ESRI_104138: {
    towgs84: "198,-226,-347"
  },
  EPSG_4245: {
    towgs84: "-11,851,5"
  },
  EPSG_4142: {
    towgs84: "-125,53,467"
  },
  EPSG_4213: {
    towgs84: "-106,-87,188"
  },
  EPSG_4253: {
    towgs84: "-133,-77,-51"
  },
  EPSG_4129: {
    towgs84: "-132,-110,-335"
  },
  EPSG_4713: {
    towgs84: "-77,-128,142"
  },
  EPSG_4239: {
    towgs84: "217,823,299"
  },
  EPSG_4146: {
    towgs84: "295,736,257"
  },
  EPSG_4155: {
    towgs84: "-83,37,124"
  },
  EPSG_4165: {
    towgs84: "-173,253,27"
  },
  EPSG_4672: {
    towgs84: "175,-38,113"
  },
  EPSG_4236: {
    towgs84: "-637,-549,-203"
  },
  EPSG_4251: {
    towgs84: "-90,40,88"
  },
  EPSG_4271: {
    towgs84: "-2,374,172"
  },
  EPSG_4175: {
    towgs84: "-88,4,101"
  },
  EPSG_4716: {
    towgs84: "298,-304,-375"
  },
  EPSG_4315: {
    towgs84: "-23,259,-9"
  },
  EPSG_4744: {
    towgs84: "-242.2,-144.9,370.3"
  },
  EPSG_4244: {
    towgs84: "-97,787,86"
  },
  EPSG_4293: {
    towgs84: "616,97,-251"
  },
  EPSG_4714: {
    towgs84: "-127,-769,472"
  },
  EPSG_4736: {
    towgs84: "260,12,-147"
  },
  EPSG_6883: {
    towgs84: "-235,-110,393"
  },
  EPSG_6894: {
    towgs84: "-63,176,185"
  },
  EPSG_4205: {
    towgs84: "-43,-163,45"
  },
  EPSG_4256: {
    towgs84: "41,-220,-134"
  },
  EPSG_4262: {
    towgs84: "639,405,60"
  },
  EPSG_4604: {
    towgs84: "174,359,365"
  },
  EPSG_4169: {
    towgs84: "-115,118,426"
  },
  EPSG_4620: {
    towgs84: "-106,-129,165"
  },
  EPSG_4184: {
    towgs84: "-203,141,53"
  },
  EPSG_4616: {
    towgs84: "-289,-124,60"
  },
  EPSG_9403: {
    towgs84: "-307,-92,127"
  },
  EPSG_4684: {
    towgs84: "-133,-321,50"
  },
  EPSG_4708: {
    towgs84: "-491,-22,435"
  },
  EPSG_4707: {
    towgs84: "114,-116,-333"
  },
  EPSG_4709: {
    towgs84: "145,75,-272"
  },
  EPSG_4712: {
    towgs84: "-205,107,53"
  },
  EPSG_4711: {
    towgs84: "124,-234,-25"
  },
  EPSG_4718: {
    towgs84: "230,-199,-752"
  },
  EPSG_4719: {
    towgs84: "211,147,111"
  },
  EPSG_4724: {
    towgs84: "208,-435,-229"
  },
  EPSG_4725: {
    towgs84: "189,-79,-202"
  },
  EPSG_4735: {
    towgs84: "647,1777,-1124"
  },
  EPSG_4722: {
    towgs84: "-794,119,-298"
  },
  EPSG_4728: {
    towgs84: "-307,-92,127"
  },
  EPSG_4734: {
    towgs84: "-632,438,-609"
  },
  EPSG_4727: {
    towgs84: "912,-58,1227"
  },
  EPSG_4729: {
    towgs84: "185,165,42"
  },
  EPSG_4730: {
    towgs84: "170,42,84"
  },
  EPSG_4733: {
    towgs84: "276,-57,149"
  },
  ESRI_37218: {
    towgs84: "230,-199,-752"
  },
  ESRI_37240: {
    towgs84: "-7,215,225"
  },
  ESRI_37221: {
    towgs84: "252,-209,-751"
  },
  ESRI_4305: {
    towgs84: "-123,-206,219"
  },
  ESRI_104139: {
    towgs84: "-73,-247,227"
  },
  EPSG_4748: {
    towgs84: "51,391,-36"
  },
  EPSG_4219: {
    towgs84: "-384,664,-48"
  },
  EPSG_4255: {
    towgs84: "-333,-222,114"
  },
  EPSG_4257: {
    towgs84: "-587.8,519.75,145.76"
  },
  EPSG_4646: {
    towgs84: "-963,510,-359"
  },
  EPSG_6881: {
    towgs84: "-24,-203,268"
  },
  EPSG_6882: {
    towgs84: "-183,-15,273"
  },
  EPSG_4715: {
    towgs84: "-104,-129,239"
  },
  IGNF_RGF93GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGM04GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGSPM06GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGTAAF07GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGFG95GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGNCG: {
    towgs84: "0,0,0"
  },
  IGNF_RGPFGDD: {
    towgs84: "0,0,0"
  },
  IGNF_ETRS89G: {
    towgs84: "0,0,0"
  },
  IGNF_RGR92GDD: {
    towgs84: "0,0,0"
  },
  EPSG_4173: {
    towgs84: "0,0,0"
  },
  EPSG_4180: {
    towgs84: "0,0,0"
  },
  EPSG_4619: {
    towgs84: "0,0,0"
  },
  EPSG_4667: {
    towgs84: "0,0,0"
  },
  EPSG_4075: {
    towgs84: "0,0,0"
  },
  EPSG_6706: {
    towgs84: "0,0,0"
  },
  EPSG_7798: {
    towgs84: "0,0,0"
  },
  EPSG_4661: {
    towgs84: "0,0,0"
  },
  EPSG_4669: {
    towgs84: "0,0,0"
  },
  EPSG_8685: {
    towgs84: "0,0,0"
  },
  EPSG_4151: {
    towgs84: "0,0,0"
  },
  EPSG_9702: {
    towgs84: "0,0,0"
  },
  EPSG_4758: {
    towgs84: "0,0,0"
  },
  EPSG_4761: {
    towgs84: "0,0,0"
  },
  EPSG_4765: {
    towgs84: "0,0,0"
  },
  EPSG_8997: {
    towgs84: "0,0,0"
  },
  EPSG_4023: {
    towgs84: "0,0,0"
  },
  EPSG_4670: {
    towgs84: "0,0,0"
  },
  EPSG_4694: {
    towgs84: "0,0,0"
  },
  EPSG_4148: {
    towgs84: "0,0,0"
  },
  EPSG_4163: {
    towgs84: "0,0,0"
  },
  EPSG_4167: {
    towgs84: "0,0,0"
  },
  EPSG_4189: {
    towgs84: "0,0,0"
  },
  EPSG_4190: {
    towgs84: "0,0,0"
  },
  EPSG_4176: {
    towgs84: "0,0,0"
  },
  EPSG_4659: {
    towgs84: "0,0,0"
  },
  EPSG_3824: {
    towgs84: "0,0,0"
  },
  EPSG_3889: {
    towgs84: "0,0,0"
  },
  EPSG_4046: {
    towgs84: "0,0,0"
  },
  EPSG_4081: {
    towgs84: "0,0,0"
  },
  EPSG_4558: {
    towgs84: "0,0,0"
  },
  EPSG_4483: {
    towgs84: "0,0,0"
  },
  EPSG_5013: {
    towgs84: "0,0,0"
  },
  EPSG_5264: {
    towgs84: "0,0,0"
  },
  EPSG_5324: {
    towgs84: "0,0,0"
  },
  EPSG_5354: {
    towgs84: "0,0,0"
  },
  EPSG_5371: {
    towgs84: "0,0,0"
  },
  EPSG_5373: {
    towgs84: "0,0,0"
  },
  EPSG_5381: {
    towgs84: "0,0,0"
  },
  EPSG_5393: {
    towgs84: "0,0,0"
  },
  EPSG_5489: {
    towgs84: "0,0,0"
  },
  EPSG_5593: {
    towgs84: "0,0,0"
  },
  EPSG_6135: {
    towgs84: "0,0,0"
  },
  EPSG_6365: {
    towgs84: "0,0,0"
  },
  EPSG_5246: {
    towgs84: "0,0,0"
  },
  EPSG_7886: {
    towgs84: "0,0,0"
  },
  EPSG_8431: {
    towgs84: "0,0,0"
  },
  EPSG_8427: {
    towgs84: "0,0,0"
  },
  EPSG_8699: {
    towgs84: "0,0,0"
  },
  EPSG_8818: {
    towgs84: "0,0,0"
  },
  EPSG_4757: {
    towgs84: "0,0,0"
  },
  EPSG_9140: {
    towgs84: "0,0,0"
  },
  EPSG_8086: {
    towgs84: "0,0,0"
  },
  EPSG_4686: {
    towgs84: "0,0,0"
  },
  EPSG_4737: {
    towgs84: "0,0,0"
  },
  EPSG_4702: {
    towgs84: "0,0,0"
  },
  EPSG_4747: {
    towgs84: "0,0,0"
  },
  EPSG_4749: {
    towgs84: "0,0,0"
  },
  EPSG_4674: {
    towgs84: "0,0,0"
  },
  EPSG_4755: {
    towgs84: "0,0,0"
  },
  EPSG_4759: {
    towgs84: "0,0,0"
  },
  EPSG_4762: {
    towgs84: "0,0,0"
  },
  EPSG_4763: {
    towgs84: "0,0,0"
  },
  EPSG_4764: {
    towgs84: "0,0,0"
  },
  EPSG_4166: {
    towgs84: "0,0,0"
  },
  EPSG_4170: {
    towgs84: "0,0,0"
  },
  EPSG_5546: {
    towgs84: "0,0,0"
  },
  EPSG_7844: {
    towgs84: "0,0,0"
  },
  EPSG_4818: {
    towgs84: "589,76,480"
  },
  EPSG_10328: {
    towgs84: "0,0,0"
  },
  EPSG_9782: {
    towgs84: "0,0,0"
  },
  EPSG_9777: {
    towgs84: "0,0,0"
  },
  EPSG_10690: {
    towgs84: "0,0,0"
  },
  EPSG_10639: {
    towgs84: "0,0,0"
  },
  EPSG_10739: {
    towgs84: "0,0,0"
  },
  EPSG_7686: {
    towgs84: "0,0,0"
  },
  EPSG_8900: {
    towgs84: "0,0,0"
  },
  EPSG_5886: {
    towgs84: "0,0,0"
  },
  EPSG_7683: {
    towgs84: "0,0,0"
  },
  EPSG_6668: {
    towgs84: "0,0,0"
  },
  EPSG_20046: {
    towgs84: "0,0,0"
  },
  EPSG_10299: {
    towgs84: "0,0,0"
  },
  EPSG_10310: {
    towgs84: "0,0,0"
  },
  EPSG_10475: {
    towgs84: "0,0,0"
  },
  EPSG_4742: {
    towgs84: "0,0,0"
  },
  EPSG_10671: {
    towgs84: "0,0,0"
  },
  EPSG_10762: {
    towgs84: "0,0,0"
  },
  EPSG_10725: {
    towgs84: "0,0,0"
  },
  EPSG_10791: {
    towgs84: "0,0,0"
  },
  EPSG_10800: {
    towgs84: "0,0,0"
  },
  EPSG_10305: {
    towgs84: "0,0,0"
  },
  EPSG_10941: {
    towgs84: "0,0,0"
  },
  EPSG_10968: {
    towgs84: "0,0,0"
  },
  EPSG_10875: {
    towgs84: "0,0,0"
  },
  EPSG_6318: {
    towgs84: "0,0,0"
  },
  EPSG_10910: {
    towgs84: "0,0,0"
  }
};
for (key in datums) {
  datum = datums[key];
  if (!datum.datumName) {
    continue;
  }
  datums[datum.datumName] = datum;
}
var datum;
var key;
var Datum_default = datums;

// node_modules/proj4/lib/datum.js
function datum2(datumCode, datum_params, a, b, es, ep2, nadgrids) {
  var out = {};
  out.datum_type = PJD_NODATUM;
  if (datum_params) {
    out.datum_type = PJD_WGS84;
    out.datum_params = datum_params.map(parseFloat);
    if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
      out.datum_type = PJD_3PARAM;
    }
    if (out.datum_params.length > 3) {
      if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
        out.datum_type = PJD_7PARAM;
        out.datum_params[3] *= SEC_TO_RAD;
        out.datum_params[4] *= SEC_TO_RAD;
        out.datum_params[5] *= SEC_TO_RAD;
        out.datum_params[6] = out.datum_params[6] / 1e6 + 1;
      }
    }
  }
  if (nadgrids) {
    out.datum_type = PJD_GRIDSHIFT;
    out.grids = nadgrids;
  }
  out.a = a;
  out.b = b;
  out.es = es;
  out.ep2 = ep2;
  return out;
}
__name(datum2, "datum");
var datum_default = datum2;

// node_modules/proj4/lib/nadgrid.js
var loadedNadgrids = {};
function nadgrid(key2, data, options) {
  if (data instanceof ArrayBuffer) {
    return readNTV2Grid(key2, data, options);
  }
  return { ready: readGeotiffGrid(key2, data) };
}
__name(nadgrid, "nadgrid");
function readNTV2Grid(key2, data, options) {
  var includeErrorFields = true;
  if (options !== void 0 && options.includeErrorFields === false) {
    includeErrorFields = false;
  }
  var view = new DataView(data);
  var isLittleEndian = detectLittleEndian(view);
  var header = readHeader(view, isLittleEndian);
  var subgrids = readSubgrids(view, header, isLittleEndian, includeErrorFields);
  var nadgrid2 = { header, subgrids };
  loadedNadgrids[key2] = nadgrid2;
  return nadgrid2;
}
__name(readNTV2Grid, "readNTV2Grid");
async function readGeotiffGrid(key2, tiff) {
  var subgrids = [];
  var subGridCount = await tiff.getImageCount();
  for (var subgridIndex = subGridCount - 1; subgridIndex >= 0; subgridIndex--) {
    var image = await tiff.getImage(subgridIndex);
    var rasters = await image.readRasters();
    var data = rasters;
    var lim = [image.getWidth(), image.getHeight()];
    var imageBBoxRadians = image.getBoundingBox().map(degreesToRadians);
    var modelPixelScale = typeof image.fileDirectory.getValue === "function" ? image.fileDirectory.getValue("ModelPixelScale") : (
      /** @type {any} */
      image.fileDirectory.ModelPixelScale
    );
    var del = [modelPixelScale[0], modelPixelScale[1]].map(degreesToRadians);
    var maxX = imageBBoxRadians[0] + (lim[0] - 1) * del[0];
    var minY = imageBBoxRadians[3] - (lim[1] - 1) * del[1];
    var latitudeOffsetBand = data[0];
    var longitudeOffsetBand = data[1];
    var nodes = [];
    for (let i = lim[1] - 1; i >= 0; i--) {
      for (let j = lim[0] - 1; j >= 0; j--) {
        var index = i * lim[0] + j;
        nodes.push([-secondsToRadians(longitudeOffsetBand[index]), secondsToRadians(latitudeOffsetBand[index])]);
      }
    }
    subgrids.push({
      del,
      lim,
      ll: [-maxX, minY],
      cvs: nodes
    });
  }
  var tifGrid = {
    header: {
      nSubgrids: subGridCount
    },
    subgrids
  };
  loadedNadgrids[key2] = tifGrid;
  return tifGrid;
}
__name(readGeotiffGrid, "readGeotiffGrid");
function getNadgrids(nadgrids) {
  if (nadgrids === void 0) {
    return null;
  }
  var grids = nadgrids.split(",");
  return grids.map(parseNadgridString);
}
__name(getNadgrids, "getNadgrids");
function parseNadgridString(value) {
  if (value.length === 0) {
    return null;
  }
  var optional = value[0] === "@";
  if (optional) {
    value = value.slice(1);
  }
  if (value === "null") {
    return { name: "null", mandatory: !optional, grid: null, isNull: true };
  }
  return {
    name: value,
    mandatory: !optional,
    grid: loadedNadgrids[value] || null,
    isNull: false
  };
}
__name(parseNadgridString, "parseNadgridString");
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
__name(degreesToRadians, "degreesToRadians");
function secondsToRadians(seconds) {
  return seconds / 3600 * Math.PI / 180;
}
__name(secondsToRadians, "secondsToRadians");
function detectLittleEndian(view) {
  var nFields = view.getInt32(8, false);
  if (nFields === 11) {
    return false;
  }
  nFields = view.getInt32(8, true);
  if (nFields !== 11) {
    console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian");
  }
  return true;
}
__name(detectLittleEndian, "detectLittleEndian");
function readHeader(view, isLittleEndian) {
  return {
    nFields: view.getInt32(8, isLittleEndian),
    nSubgridFields: view.getInt32(24, isLittleEndian),
    nSubgrids: view.getInt32(40, isLittleEndian),
    shiftType: decodeString(view, 56, 56 + 8).trim(),
    fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
    fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
    toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
    toSemiMinorAxis: view.getFloat64(168, isLittleEndian)
  };
}
__name(readHeader, "readHeader");
function decodeString(view, start2, end) {
  return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start2, end)));
}
__name(decodeString, "decodeString");
function readSubgrids(view, header, isLittleEndian, includeErrorFields) {
  var gridOffset = 176;
  var grids = [];
  for (var i = 0; i < header.nSubgrids; i++) {
    var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
    var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian, includeErrorFields);
    var lngColumnCount = Math.round(
      1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval
    );
    var latColumnCount = Math.round(
      1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval
    );
    grids.push({
      ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
      del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
      lim: [lngColumnCount, latColumnCount],
      count: subHeader.gridNodeCount,
      cvs: mapNodes(nodes)
    });
    var rowSize = 16;
    if (includeErrorFields === false) {
      rowSize = 8;
    }
    gridOffset += 176 + subHeader.gridNodeCount * rowSize;
  }
  return grids;
}
__name(readSubgrids, "readSubgrids");
function mapNodes(nodes) {
  return nodes.map(function(r) {
    return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];
  });
}
__name(mapNodes, "mapNodes");
function readGridHeader(view, offset, isLittleEndian) {
  return {
    name: decodeString(view, offset + 8, offset + 16).trim(),
    parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
    lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
    upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
    lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
    upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
    latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
    longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
    gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
  };
}
__name(readGridHeader, "readGridHeader");
function readGridNodes(view, offset, gridHeader, isLittleEndian, includeErrorFields) {
  var nodesOffset = offset + 176;
  var gridRecordLength = 16;
  if (includeErrorFields === false) {
    gridRecordLength = 8;
  }
  var gridShiftRecords = [];
  for (var i = 0; i < gridHeader.gridNodeCount; i++) {
    var record = {
      latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
      longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian)
    };
    if (includeErrorFields !== false) {
      record.latitudeAccuracy = view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian);
      record.longitudeAccuracy = view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian);
    }
    gridShiftRecords.push(record);
  }
  return gridShiftRecords;
}
__name(readGridNodes, "readGridNodes");

// node_modules/proj4/lib/Proj.js
function Projection(srsCode, callback) {
  if (!(this instanceof Projection)) {
    return new Projection(srsCode);
  }
  this.forward = null;
  this.inverse = null;
  this.init = null;
  this.name;
  this.axis;
  this.names = null;
  this.title;
  callback = callback || function(error) {
    if (error) {
      throw error;
    }
  };
  var json = parseCode_default(srsCode);
  if (typeof json !== "object") {
    callback("Could not parse to valid json: " + srsCode);
    return;
  }
  var ourProj = Projection.projections.get(json.projName);
  if (!ourProj) {
    callback("Could not get projection name from: " + srsCode);
    return;
  }
  if (json.datumCode && json.datumCode !== "none") {
    var datumDef = match(Datum_default, json.datumCode);
    if (datumDef) {
      json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(",") : null);
      json.ellps = datumDef.ellipse;
      json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
    }
  }
  json.axis = json.axis || "enu";
  json.ellps = json.ellps || "wgs84";
  json.lat1 = json.lat1 || json.lat0;
  var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
  var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
  var nadgrids = getNadgrids(json.nadgrids);
  var datumObj = json.datum || datum_default(
    json.datumCode,
    json.datum_params,
    sphere_.a,
    sphere_.b,
    ecc.es,
    ecc.ep2,
    nadgrids
  );
  extend_default(this, json);
  extend_default(this, ourProj);
  this.a = sphere_.a;
  this.b = sphere_.b;
  this.rf = sphere_.rf;
  this.sphere = sphere_.sphere;
  this.es = ecc.es;
  this.e = ecc.e;
  this.ep2 = ecc.ep2;
  this.datum = datumObj;
  if ("init" in this && typeof this.init === "function") {
    this.init();
  }
  if (!this.k0) {
    this.k0 = 1;
  }
  callback(null, this);
}
__name(Projection, "Projection");
Projection.projections = projections_default;
Projection.projections.start();
var Proj_default = Projection;

// node_modules/proj4/lib/datumUtils.js
function compareDatums(source, dest) {
  if (source.datum_type !== dest.datum_type) {
    return false;
  } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 5e-11) {
    return false;
  } else if (source.datum_type === PJD_3PARAM) {
    return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2];
  } else if (source.datum_type === PJD_7PARAM) {
    return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6];
  } else {
    return true;
  }
}
__name(compareDatums, "compareDatums");
function geodeticToGeocentric(p, es, a) {
  var Longitude = p.x;
  var Latitude = p.y;
  var Height = p.z ? p.z : 0;
  var Rn;
  var Sin_Lat;
  var Sin2_Lat;
  var Cos_Lat;
  if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
    Latitude = -HALF_PI;
  } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
    Latitude = HALF_PI;
  } else if (Latitude < -HALF_PI) {
    return { x: -Infinity, y: -Infinity, z: p.z };
  } else if (Latitude > HALF_PI) {
    return { x: Infinity, y: Infinity, z: p.z };
  }
  if (Longitude > Math.PI) {
    Longitude -= 2 * Math.PI;
  }
  Sin_Lat = Math.sin(Latitude);
  Cos_Lat = Math.cos(Latitude);
  Sin2_Lat = Sin_Lat * Sin_Lat;
  Rn = a / Math.sqrt(1 - es * Sin2_Lat);
  return {
    x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
    y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
    z: (Rn * (1 - es) + Height) * Sin_Lat
  };
}
__name(geodeticToGeocentric, "geodeticToGeocentric");
function geocentricToGeodetic(p, es, a, b) {
  var genau = 1e-12;
  var genau2 = genau * genau;
  var maxiter = 30;
  var P;
  var RR;
  var CT;
  var ST;
  var RX;
  var RK;
  var RN;
  var CPHI0;
  var SPHI0;
  var CPHI;
  var SPHI;
  var SDPHI;
  var iter;
  var X = p.x;
  var Y = p.y;
  var Z2 = p.z ? p.z : 0;
  var Longitude;
  var Latitude;
  var Height;
  P = Math.sqrt(X * X + Y * Y);
  RR = Math.sqrt(X * X + Y * Y + Z2 * Z2);
  if (P / a < genau) {
    Longitude = 0;
    if (RR / a < genau) {
      Latitude = HALF_PI;
      Height = -b;
      return {
        x: p.x,
        y: p.y,
        z: p.z
      };
    }
  } else {
    Longitude = Math.atan2(Y, X);
  }
  CT = Z2 / RR;
  ST = P / RR;
  RX = 1 / Math.sqrt(1 - es * (2 - es) * ST * ST);
  CPHI0 = ST * (1 - es) * RX;
  SPHI0 = CT * RX;
  iter = 0;
  do {
    iter++;
    RN = a / Math.sqrt(1 - es * SPHI0 * SPHI0);
    Height = P * CPHI0 + Z2 * SPHI0 - RN * (1 - es * SPHI0 * SPHI0);
    RK = es * RN / (RN + Height);
    RX = 1 / Math.sqrt(1 - RK * (2 - RK) * ST * ST);
    CPHI = ST * (1 - RK) * RX;
    SPHI = CT * RX;
    SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
    CPHI0 = CPHI;
    SPHI0 = SPHI;
  } while (SDPHI * SDPHI > genau2 && iter < maxiter);
  Latitude = Math.atan(SPHI / Math.abs(CPHI));
  return {
    x: Longitude,
    y: Latitude,
    z: Height
  };
}
__name(geocentricToGeodetic, "geocentricToGeodetic");
function geocentricToWgs84(p, datum_type, datum_params) {
  if (datum_type === PJD_3PARAM) {
    return {
      x: p.x + datum_params[0],
      y: p.y + datum_params[1],
      z: p.z + datum_params[2]
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    return {
      x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
      y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
      z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
    };
  }
}
__name(geocentricToWgs84, "geocentricToWgs84");
function geocentricFromWgs84(p, datum_type, datum_params) {
  if (datum_type === PJD_3PARAM) {
    return {
      x: p.x - datum_params[0],
      y: p.y - datum_params[1],
      z: p.z - datum_params[2]
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    var x_tmp = (p.x - Dx_BF) / M_BF;
    var y_tmp = (p.y - Dy_BF) / M_BF;
    var z_tmp = (p.z - Dz_BF) / M_BF;
    return {
      x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
      y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
      z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
    };
  }
}
__name(geocentricFromWgs84, "geocentricFromWgs84");

// node_modules/proj4/lib/datum_transform.js
function checkParams(type) {
  return type === PJD_3PARAM || type === PJD_7PARAM;
}
__name(checkParams, "checkParams");
function datum_transform_default(source, dest, point) {
  if (compareDatums(source, dest)) {
    return point;
  }
  if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
    return point;
  }
  var source_a = source.a;
  var source_es = source.es;
  if (source.datum_type === PJD_GRIDSHIFT) {
    var gridShiftCode = applyGridShift(source, false, point);
    if (gridShiftCode !== 0) {
      return void 0;
    }
    source_a = SRS_WGS84_SEMIMAJOR;
    source_es = SRS_WGS84_ESQUARED;
  }
  var dest_a = dest.a;
  var dest_b = dest.b;
  var dest_es = dest.es;
  if (dest.datum_type === PJD_GRIDSHIFT) {
    dest_a = SRS_WGS84_SEMIMAJOR;
    dest_b = SRS_WGS84_SEMIMINOR;
    dest_es = SRS_WGS84_ESQUARED;
  }
  if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) {
    return point;
  }
  point = geodeticToGeocentric(point, source_es, source_a);
  if (checkParams(source.datum_type)) {
    point = geocentricToWgs84(point, source.datum_type, source.datum_params);
  }
  if (checkParams(dest.datum_type)) {
    point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
  }
  point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);
  if (dest.datum_type === PJD_GRIDSHIFT) {
    var destGridShiftResult = applyGridShift(dest, true, point);
    if (destGridShiftResult !== 0) {
      return void 0;
    }
  }
  return point;
}
__name(datum_transform_default, "default");
function applyGridShift(source, inverse35, point) {
  if (source.grids === null || source.grids.length === 0) {
    console.log("Grid shift grids not found");
    return -1;
  }
  var input = { x: -point.x, y: point.y };
  var output = { x: Number.NaN, y: Number.NaN };
  var attemptedGrids = [];
  outer:
    for (var i = 0; i < source.grids.length; i++) {
      var grid2 = source.grids[i];
      attemptedGrids.push(grid2.name);
      if (grid2.isNull) {
        output = input;
        break;
      }
      if (grid2.grid === null) {
        if (grid2.mandatory) {
          console.log("Unable to find mandatory grid '" + grid2.name + "'");
          return -1;
        }
        continue;
      }
      var subgrids = grid2.grid.subgrids;
      for (var j = 0, jj = subgrids.length; j < jj; j++) {
        var subgrid = subgrids[j];
        var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 1e4;
        var minX = subgrid.ll[0] - epsilon;
        var minY = subgrid.ll[1] - epsilon;
        var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
        var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
        if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) {
          continue;
        }
        output = applySubgridShift(input, inverse35, subgrid);
        if (!isNaN(output.x)) {
          break outer;
        }
      }
    }
  if (isNaN(output.x)) {
    console.log("Failed to find a grid shift table for location '" + -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
    return -1;
  }
  point.x = -output.x;
  point.y = output.y;
  return 0;
}
__name(applyGridShift, "applyGridShift");
function applySubgridShift(pin, inverse35, ct) {
  var val = { x: Number.NaN, y: Number.NaN };
  if (isNaN(pin.x)) {
    return val;
  }
  var tb = { x: pin.x, y: pin.y };
  tb.x -= ct.ll[0];
  tb.y -= ct.ll[1];
  tb.x = adjust_lon_default(tb.x - Math.PI) + Math.PI;
  var t = nadInterpolate(tb, ct);
  if (inverse35) {
    if (isNaN(t.x)) {
      return val;
    }
    t.x = tb.x - t.x;
    t.y = tb.y - t.y;
    var i = 9, tol = 1e-12;
    var dif, del;
    do {
      del = nadInterpolate(t, ct);
      if (isNaN(del.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      dif = { x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y) };
      t.x += dif.x;
      t.y += dif.y;
    } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
    if (i < 0) {
      console.log("Inverse grid shift iterator failed to converge.");
      return val;
    }
    val.x = adjust_lon_default(t.x + ct.ll[0]);
    val.y = t.y + ct.ll[1];
  } else {
    if (!isNaN(t.x)) {
      val.x = pin.x + t.x;
      val.y = pin.y + t.y;
    }
  }
  return val;
}
__name(applySubgridShift, "applySubgridShift");
function nadInterpolate(pin, ct) {
  var t = { x: pin.x / ct.del[0], y: pin.y / ct.del[1] };
  var indx = { x: Math.floor(t.x), y: Math.floor(t.y) };
  var frct = { x: t.x - 1 * indx.x, y: t.y - 1 * indx.y };
  var val = { x: Number.NaN, y: Number.NaN };
  var inx;
  if (indx.x < 0 || indx.x >= ct.lim[0]) {
    return val;
  }
  if (indx.y < 0 || indx.y >= ct.lim[1]) {
    return val;
  }
  inx = indx.y * ct.lim[0] + indx.x;
  var f00 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx++;
  var f10 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx += ct.lim[0];
  var f11 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx--;
  var f01 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  var m11 = frct.x * frct.y, m10 = frct.x * (1 - frct.y), m00 = (1 - frct.x) * (1 - frct.y), m01 = (1 - frct.x) * frct.y;
  val.x = m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x;
  val.y = m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y;
  return val;
}
__name(nadInterpolate, "nadInterpolate");

// node_modules/proj4/lib/adjust_axis.js
var order = ["x", "y", "z"];
function adjustAxisToEnu(crs, point) {
  const out = {};
  for (let i = 0, ii = crs.axis.length; i < ii; i++) {
    if (i === 2 && point.z === void 0) {
      continue;
    }
    let v = point[order[i]];
    switch (crs.axis[i]) {
      case "e":
        out.x = v;
        break;
      case "w":
        out.x = -v;
        break;
      case "n":
        out.y = v;
        break;
      case "s":
        out.y = -v;
        break;
      case "u":
        out.z = v;
        break;
      case "d":
        out.z = -v;
        break;
      default:
        return null;
    }
  }
  return out;
}
__name(adjustAxisToEnu, "adjustAxisToEnu");
function adjustAxisFromEnu(crs, point) {
  const out = (
    /** @type {import("./core").InterfaceCoordinates} */
    {}
  );
  for (let i = 0, ii = crs.axis.length; i < ii; i++) {
    if (i === 2 && point.z === void 0) {
      continue;
    }
    switch (crs.axis[i]) {
      case "e":
        out[order[i]] = point.x;
        break;
      case "w":
        out[order[i]] = -point.x;
        break;
      case "n":
        out[order[i]] = point.y;
        break;
      case "s":
        out[order[i]] = -point.y;
        break;
      case "u":
        out[order[i]] = point.z;
        break;
      case "d":
        out[order[i]] = -point.z;
        break;
      default:
        return null;
    }
  }
  return out;
}
__name(adjustAxisFromEnu, "adjustAxisFromEnu");

// node_modules/proj4/lib/common/toPoint.js
function toPoint_default(array) {
  var out = {
    x: array[0],
    y: array[1]
  };
  if (array.length > 2) {
    out.z = array[2];
  }
  if (array.length > 3) {
    out.m = array[3];
  }
  return out;
}
__name(toPoint_default, "default");

// node_modules/proj4/lib/checkSanity.js
function checkSanity_default(point) {
  checkCoord(point.x);
  checkCoord(point.y);
}
__name(checkSanity_default, "default");
function checkCoord(num) {
  if (typeof Number.isFinite === "function") {
    if (Number.isFinite(num)) {
      return;
    }
    throw new TypeError("coordinates must be finite numbers");
  }
  if (typeof num !== "number" || num !== num || !isFinite(num)) {
    throw new TypeError("coordinates must be finite numbers");
  }
}
__name(checkCoord, "checkCoord");

// node_modules/proj4/lib/transform.js
function checkNotWGS(source, dest) {
  return (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM || source.datum.datum_type === PJD_GRIDSHIFT) && dest.datumCode !== "WGS84" || (dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM || dest.datum.datum_type === PJD_GRIDSHIFT) && source.datumCode !== "WGS84";
}
__name(checkNotWGS, "checkNotWGS");
function transformInternal(source, dest, point, enforceAxis) {
  var wgs842;
  var hasZ = point.z !== void 0;
  checkSanity_default(point);
  if (source.datum && dest.datum && checkNotWGS(source, dest)) {
    wgs842 = new Proj_default("WGS84");
    point = transformInternal(source, wgs842, point, enforceAxis);
    source = wgs842;
  }
  if (enforceAxis && source.axis !== "enu") {
    point = adjustAxisToEnu(source, point);
  }
  if (source.projName === "longlat") {
    point = {
      x: point.x * D2R,
      y: point.y * D2R,
      z: point.z || 0
    };
  } else {
    if (source.to_meter) {
      point = {
        x: point.x * source.to_meter,
        y: point.y * source.to_meter,
        z: point.z || 0
      };
    }
    point = source.inverse(point);
    if (!point) {
      return;
    }
  }
  if (source.from_greenwich) {
    point.x += source.from_greenwich;
  }
  point = datum_transform_default(source.datum, dest.datum, point);
  if (!point) {
    return;
  }
  point = /** @type {import('./core').InterfaceCoordinates} */
  point;
  if (dest.from_greenwich) {
    point = {
      x: point.x - dest.from_greenwich,
      y: point.y,
      z: point.z || 0
    };
  }
  if (dest.projName === "longlat") {
    if (dest.long_wrap !== void 0) {
      point.x = dest.long_wrap + adjust_lon_default(point.x - dest.long_wrap);
    }
    point = {
      x: point.x * R2D,
      y: point.y * R2D,
      z: point.z || 0
    };
  } else {
    point = dest.forward(point);
    if (dest.to_meter) {
      point = {
        x: point.x / dest.to_meter,
        y: point.y / dest.to_meter,
        z: point.z || 0
      };
    }
  }
  if (enforceAxis && dest.axis !== "enu") {
    return adjustAxisFromEnu(dest, point);
  }
  if (point && !hasZ && dest.projName !== "geocent") {
    delete point.z;
  }
  return point;
}
__name(transformInternal, "transformInternal");
function transform(source, dest, point, enforceAxis) {
  var pt;
  if (Array.isArray(point)) {
    pt = toPoint_default(point);
  } else {
    pt = { x: point.x, y: point.y, z: point.z, m: point.m };
  }
  return transformInternal(source, dest, pt, enforceAxis);
}
__name(transform, "transform");

// node_modules/proj4/lib/core.js
var wgs84 = Proj_default("WGS84");
function transformer(from, to, coords, enforceAxis) {
  var out, geocent, keys;
  if (Array.isArray(coords)) {
    out = transformInternal(from, to, toPoint_default(coords), enforceAxis) || { x: NaN, y: NaN };
    if (coords.length > 2) {
      geocent = typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent";
      if (geocent) {
        if (typeof out.z === "number") {
          return (
            /** @type {T} */
            [out.x, out.y, out.z].concat(coords.slice(3))
          );
        }
        return (
          /** @type {T} */
          [out.x, out.y, coords[2]].concat(coords.slice(3))
        );
      }
      if (enforceAxis && typeof out.z === "number") {
        return (
          /** @type {T} */
          [out.x, out.y, out.z].concat(coords.slice(3))
        );
      }
      return (
        /** @type {T} */
        [out.x, out.y].concat(coords.slice(2))
      );
    }
    return (
      /** @type {T} */
      [out.x, out.y]
    );
  } else {
    out = transformInternal(from, to, { x: coords.x, y: coords.y, z: coords.z, m: coords.m }, enforceAxis) || { x: NaN, y: NaN };
    keys = Object.keys(coords);
    if (keys.length === 2) {
      return (
        /** @type {T} */
        out
      );
    }
    geocent = typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent";
    keys.forEach(function(key2) {
      if (key2 === "x" || key2 === "y") {
        return;
      }
      if (key2 === "z" && (geocent || enforceAxis)) {
        return;
      }
      out[key2] = coords[key2];
    });
    return (
      /** @type {T} */
      out
    );
  }
}
__name(transformer, "transformer");
function checkProj(item) {
  if (item instanceof Proj_default) {
    return item;
  }
  if (typeof item === "object" && "oProj" in item) {
    return item.oProj;
  }
  return Proj_default(
    /** @type {string | PROJJSONDefinition} */
    item
  );
}
__name(checkProj, "checkProj");
function proj4(fromProjOrToProj, toProjOrCoord, coord) {
  var fromProj;
  var toProj;
  var single = false;
  var obj;
  if (typeof toProjOrCoord === "undefined") {
    toProj = checkProj(fromProjOrToProj);
    fromProj = wgs84;
    single = true;
  } else if (typeof /** @type {?} */
  toProjOrCoord.x !== "undefined" || Array.isArray(toProjOrCoord)) {
    coord = /** @type {T} */
    /** @type {?} */
    toProjOrCoord;
    toProj = checkProj(fromProjOrToProj);
    fromProj = wgs84;
    single = true;
  }
  if (!fromProj) {
    fromProj = checkProj(fromProjOrToProj);
  }
  if (!toProj) {
    toProj = checkProj(
      /** @type {string | PROJJSONDefinition | proj } */
      toProjOrCoord
    );
  }
  if (coord) {
    return transformer(fromProj, toProj, coord);
  } else {
    obj = {
      /**
       * @template {TemplateCoordinates} T
       * @param {T} coords
       * @param {boolean=} enforceAxis
       * @returns {T}
       */
      forward: /* @__PURE__ */ __name(function(coords, enforceAxis) {
        return transformer(fromProj, toProj, coords, enforceAxis);
      }, "forward"),
      /**
       * @template {TemplateCoordinates} T
       * @param {T} coords
       * @param {boolean=} enforceAxis
       * @returns {T}
       */
      inverse: /* @__PURE__ */ __name(function(coords, enforceAxis) {
        return transformer(toProj, fromProj, coords, enforceAxis);
      }, "inverse")
    };
    if (single) {
      obj.oProj = toProj;
    }
    return obj;
  }
}
__name(proj4, "proj4");
var core_default = proj4;

// node_modules/mgrs/mgrs.js
var NUM_100K_SETS = 6;
var SET_ORIGIN_COLUMN_LETTERS = "AJSAJS";
var SET_ORIGIN_ROW_LETTERS = "AFAFAF";
var A = 65;
var I = 73;
var O = 79;
var V = 86;
var Z = 90;
var mgrs_default = {
  forward: forward2,
  inverse: inverse2,
  toPoint
};
function forward2(ll, accuracy) {
  accuracy = accuracy || 5;
  return encode(LLtoUTM({
    lat: ll[1],
    lon: ll[0]
  }), accuracy);
}
__name(forward2, "forward");
function inverse2(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
  }
  return [bbox.left, bbox.bottom, bbox.right, bbox.top];
}
__name(inverse2, "inverse");
function toPoint(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat];
  }
  return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
}
__name(toPoint, "toPoint");
function degToRad(deg) {
  return deg * (Math.PI / 180);
}
__name(degToRad, "degToRad");
function radToDeg(rad) {
  return 180 * (rad / Math.PI);
}
__name(radToDeg, "radToDeg");
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lon;
  var a = 6378137;
  var eccSquared = 669438e-8;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N, T, C, A5, M2;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;
  if (Long === 180) {
    ZoneNumber = 60;
  }
  if (Lat >= 56 && Lat < 64 && Long >= 3 && Long < 12) {
    ZoneNumber = 32;
  }
  if (Lat >= 72 && Lat < 84) {
    if (Long >= 0 && Long < 9) {
      ZoneNumber = 31;
    } else if (Long >= 9 && Long < 21) {
      ZoneNumber = 33;
    } else if (Long >= 21 && Long < 33) {
      ZoneNumber = 35;
    } else if (Long >= 33 && Long < 42) {
      ZoneNumber = 37;
    }
  }
  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
  LongOriginRad = degToRad(LongOrigin);
  eccPrimeSquared = eccSquared / (1 - eccSquared);
  N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A5 = Math.cos(LatRad) * (LongRad - LongOriginRad);
  M2 = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
  var UTMEasting = k0 * N * (A5 + (1 - T + C) * A5 * A5 * A5 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 / 120) + 5e5;
  var UTMNorthing = k0 * (M2 + N * Math.tan(LatRad) * (A5 * A5 / 2 + (5 - T + 9 * C + 4 * C * C) * A5 * A5 * A5 * A5 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 * A5 / 720));
  if (Lat < 0) {
    UTMNorthing += 1e7;
  }
  return {
    northing: Math.round(UTMNorthing),
    easting: Math.round(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}
__name(LLtoUTM, "LLtoUTM");
function UTMtoLL(utm) {
  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }
  var k0 = 0.9996;
  var a = 6378137;
  var eccSquared = 669438e-8;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C12, R1, D, M2;
  var LongOrigin;
  var mu, phi1Rad;
  var x = UTMEasting - 5e5;
  var y = UTMNorthing;
  if (zoneLetter < "N") {
    y -= 1e7;
  }
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3;
  eccPrimeSquared = eccSquared / (1 - eccSquared);
  M2 = y / k0;
  mu = M2 / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu);
  N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C12 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D = x / (N1 * k0);
  var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C12 - 4 * C12 * C12 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C12 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C12 * C12) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);
  var lon = (D - (1 + 2 * T1 + C12) * D * D * D / 6 + (5 - 2 * C12 + 28 * T1 - 3 * C12 * C12 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);
  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  } else {
    result = {
      lat,
      lon
    };
  }
  return result;
}
__name(UTMtoLL, "UTMtoLL");
function getLetterDesignator(lat) {
  var LetterDesignator = "Z";
  if (84 >= lat && lat >= 72) {
    LetterDesignator = "X";
  } else if (72 > lat && lat >= 64) {
    LetterDesignator = "W";
  } else if (64 > lat && lat >= 56) {
    LetterDesignator = "V";
  } else if (56 > lat && lat >= 48) {
    LetterDesignator = "U";
  } else if (48 > lat && lat >= 40) {
    LetterDesignator = "T";
  } else if (40 > lat && lat >= 32) {
    LetterDesignator = "S";
  } else if (32 > lat && lat >= 24) {
    LetterDesignator = "R";
  } else if (24 > lat && lat >= 16) {
    LetterDesignator = "Q";
  } else if (16 > lat && lat >= 8) {
    LetterDesignator = "P";
  } else if (8 > lat && lat >= 0) {
    LetterDesignator = "N";
  } else if (0 > lat && lat >= -8) {
    LetterDesignator = "M";
  } else if (-8 > lat && lat >= -16) {
    LetterDesignator = "L";
  } else if (-16 > lat && lat >= -24) {
    LetterDesignator = "K";
  } else if (-24 > lat && lat >= -32) {
    LetterDesignator = "J";
  } else if (-32 > lat && lat >= -40) {
    LetterDesignator = "H";
  } else if (-40 > lat && lat >= -48) {
    LetterDesignator = "G";
  } else if (-48 > lat && lat >= -56) {
    LetterDesignator = "F";
  } else if (-56 > lat && lat >= -64) {
    LetterDesignator = "E";
  } else if (-64 > lat && lat >= -72) {
    LetterDesignator = "D";
  } else if (-72 > lat && lat >= -80) {
    LetterDesignator = "C";
  }
  return LetterDesignator;
}
__name(getLetterDesignator, "getLetterDesignator");
function encode(utm, accuracy) {
  var seasting = "00000" + utm.easting, snorthing = "00000" + utm.northing;
  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}
__name(encode, "encode");
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 1e5);
  var setRow = Math.floor(northing / 1e5) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}
__name(get100kID, "get100kID");
function get100kSetForZone(i) {
  var setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }
  return setParm;
}
__name(get100kSetForZone, "get100kSetForZone");
function getLetter100kID(column, row, parm) {
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;
  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }
  if (colInt === I || colOrigin < I && colInt > I || (colInt > I || colOrigin < I) && rollover) {
    colInt++;
  }
  if (colInt === O || colOrigin < O && colInt > O || (colInt > O || colOrigin < O) && rollover) {
    colInt++;
    if (colInt === I) {
      colInt++;
    }
  }
  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }
  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  } else {
    rollover = false;
  }
  if (rowInt === I || rowOrigin < I && rowInt > I || (rowInt > I || rowOrigin < I) && rollover) {
    rowInt++;
  }
  if (rowInt === O || rowOrigin < O && rowInt > O || (rowInt > O || rowOrigin < O) && rollover) {
    rowInt++;
    if (rowInt === I) {
      rowInt++;
    }
  }
  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }
  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}
__name(getLetter100kID, "getLetter100kID");
function decode(mgrsString) {
  if (mgrsString && mgrsString.length === 0) {
    throw "MGRSPoint coverting from nothing";
  }
  var length = mgrsString.length;
  var hunK = null;
  var sb = "";
  var testChar;
  var i = 0;
  while (!/[A-Z]/.test(testChar = mgrsString.charAt(i))) {
    if (i >= 2) {
      throw "MGRSPoint bad conversion from: " + mgrsString;
    }
    sb += testChar;
    i++;
  }
  var zoneNumber = parseInt(sb, 10);
  if (i === 0 || i + 3 > length) {
    throw "MGRSPoint bad conversion from: " + mgrsString;
  }
  var zoneLetter = mgrsString.charAt(i++);
  if (zoneLetter <= "A" || zoneLetter === "B" || zoneLetter === "Y" || zoneLetter >= "Z" || zoneLetter === "I" || zoneLetter === "O") {
    throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString;
  }
  hunK = mgrsString.substring(i, i += 2);
  var set = get100kSetForZone(zoneNumber);
  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);
  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2e6;
  }
  var remainder = length - i;
  if (remainder % 2 !== 0) {
    throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString;
  }
  var sep = remainder / 2;
  var sepEasting = 0;
  var sepNorthing = 0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 1e5 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i, i + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }
  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;
  return {
    easting,
    northing,
    zoneLetter,
    zoneNumber,
    accuracy: accuracyBonus
  };
}
__name(decode, "decode");
function getEastingFromChar(e, set) {
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 1e5;
  var rewindMarker = false;
  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw "Bad character: " + e;
      }
      curCol = A;
      rewindMarker = true;
    }
    eastingValue += 1e5;
  }
  return eastingValue;
}
__name(getEastingFromChar, "getEastingFromChar");
function getNorthingFromChar(n, set) {
  if (n > "V") {
    throw "MGRSPoint given invalid Northing " + n;
  }
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0;
  var rewindMarker = false;
  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    if (curRow > V) {
      if (rewindMarker) {
        throw "Bad character: " + n;
      }
      curRow = A;
      rewindMarker = true;
    }
    northingValue += 1e5;
  }
  return northingValue;
}
__name(getNorthingFromChar, "getNorthingFromChar");
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
    case "C":
      northing = 11e5;
      break;
    case "D":
      northing = 2e6;
      break;
    case "E":
      northing = 28e5;
      break;
    case "F":
      northing = 37e5;
      break;
    case "G":
      northing = 46e5;
      break;
    case "H":
      northing = 55e5;
      break;
    case "J":
      northing = 64e5;
      break;
    case "K":
      northing = 73e5;
      break;
    case "L":
      northing = 82e5;
      break;
    case "M":
      northing = 91e5;
      break;
    case "N":
      northing = 0;
      break;
    case "P":
      northing = 8e5;
      break;
    case "Q":
      northing = 17e5;
      break;
    case "R":
      northing = 26e5;
      break;
    case "S":
      northing = 35e5;
      break;
    case "T":
      northing = 44e5;
      break;
    case "U":
      northing = 53e5;
      break;
    case "V":
      northing = 62e5;
      break;
    case "W":
      northing = 7e6;
      break;
    case "X":
      northing = 79e5;
      break;
    default:
      northing = -1;
  }
  if (northing >= 0) {
    return northing;
  } else {
    throw "Invalid zone letter: " + zoneLetter;
  }
}
__name(getMinNorthing, "getMinNorthing");

// node_modules/proj4/lib/Point.js
function Point(x, y, z) {
  if (!(this instanceof Point)) {
    return new Point(x, y, z);
  }
  if (Array.isArray(x)) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2] || 0;
  } else if (typeof x === "object") {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z || 0;
  } else if (typeof x === "string" && typeof y === "undefined") {
    var coords = x.split(",");
    this.x = parseFloat(coords[0]);
    this.y = parseFloat(coords[1]);
    this.z = parseFloat(coords[2]) || 0;
  } else {
    this.x = x;
    this.y = y;
    this.z = z || 0;
  }
  console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
}
__name(Point, "Point");
Point.fromMGRS = function(mgrsStr) {
  return new Point(toPoint(mgrsStr));
};
Point.prototype.toMGRS = function(accuracy) {
  return forward2([this.x, this.y], accuracy);
};
var Point_default = Point;

// node_modules/proj4/lib/common/pj_enfn.js
var C00 = 1;
var C02 = 0.25;
var C04 = 0.046875;
var C06 = 0.01953125;
var C08 = 0.01068115234375;
var C22 = 0.75;
var C44 = 0.46875;
var C46 = 0.013020833333333334;
var C48 = 0.007120768229166667;
var C66 = 0.3645833333333333;
var C68 = 0.005696614583333333;
var C88 = 0.3076171875;
function pj_enfn_default(es) {
  var en = [];
  en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
  en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
  var t = es * es;
  en[2] = t * (C44 - es * (C46 + es * C48));
  t *= es;
  en[3] = t * (C66 - es * C68);
  en[4] = t * es * C88;
  return en;
}
__name(pj_enfn_default, "default");

// node_modules/proj4/lib/common/pj_mlfn.js
function pj_mlfn_default(phi, sphi, cphi, en) {
  cphi *= sphi;
  sphi *= sphi;
  return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])));
}
__name(pj_mlfn_default, "default");

// node_modules/proj4/lib/common/pj_inv_mlfn.js
var MAX_ITER = 20;
function pj_inv_mlfn_default(arg, es, en) {
  var k = 1 / (1 - es);
  var phi = arg;
  for (var i = MAX_ITER; i; --i) {
    var s = Math.sin(phi);
    var t = 1 - es * s * s;
    t = (pj_mlfn_default(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
    phi -= t;
    if (Math.abs(t) < EPSLN) {
      return phi;
    }
  }
  return phi;
}
__name(pj_inv_mlfn_default, "default");

// node_modules/proj4/lib/projections/tmerc.js
function init3() {
  this.x0 = this.x0 !== void 0 ? this.x0 : 0;
  this.y0 = this.y0 !== void 0 ? this.y0 : 0;
  this.long0 = this.long0 !== void 0 ? this.long0 : 0;
  this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
  if (this.es) {
    this.en = pj_enfn_default(this.es);
    this.ml0 = pj_mlfn_default(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}
__name(init3, "init");
function forward3(p) {
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon_default(lon - this.long0, this.over);
  var con;
  var x, y;
  var sin_phi = Math.sin(lat);
  var cos_phi = Math.cos(lat);
  if (!this.es) {
    var b = cos_phi * Math.sin(delta_lon);
    if (Math.abs(Math.abs(b) - 1) < EPSLN) {
      return 93;
    } else {
      x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
      y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
      b = Math.abs(y);
      if (b >= 1) {
        if (b - 1 > EPSLN) {
          return 93;
        } else {
          y = 0;
        }
      } else {
        y = Math.acos(y);
      }
      if (lat < 0) {
        y = -y;
      }
      y = this.a * this.k0 * (y - this.lat0) + this.y0;
    }
  } else {
    var al = cos_phi * delta_lon;
    var als = Math.pow(al, 2);
    var c = this.ep2 * Math.pow(cos_phi, 2);
    var cs = Math.pow(c, 2);
    var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
    var t = Math.pow(tq, 2);
    var ts = Math.pow(t, 2);
    con = 1 - this.es * Math.pow(sin_phi, 2);
    al = al / Math.sqrt(con);
    var ml = pj_mlfn_default(lat, sin_phi, cos_phi, this.en);
    x = this.a * (this.k0 * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c + als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) + this.x0;
    y = this.a * (this.k0 * (ml - this.ml0 + sin_phi * delta_lon * al / 2 * (1 + als / 12 * (5 - t + 9 * c + 4 * cs + als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c + als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) + this.y0;
  }
  p.x = x;
  p.y = y;
  return p;
}
__name(forward3, "forward");
function inverse3(p) {
  var con, phi;
  var lat, lon;
  var x = (p.x - this.x0) * (1 / this.a);
  var y = (p.y - this.y0) * (1 / this.a);
  if (!this.es) {
    var f = Math.exp(x / this.k0);
    var g = 0.5 * (f - 1 / f);
    var temp = this.lat0 + y / this.k0;
    var h = Math.cos(temp);
    con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
    lat = Math.asin(con);
    if (y < 0) {
      lat = -lat;
    }
    if (g === 0 && h === 0) {
      lon = 0;
    } else {
      lon = adjust_lon_default(Math.atan2(g, h) + this.long0, this.over);
    }
  } else {
    con = this.ml0 + y / this.k0;
    phi = pj_inv_mlfn_default(con, this.es, this.en);
    if (Math.abs(phi) < HALF_PI) {
      var sin_phi = Math.sin(phi);
      var cos_phi = Math.cos(phi);
      var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var t = Math.pow(tan_phi, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      var d = x * Math.sqrt(con) / this.k0;
      var ds = Math.pow(d, 2);
      con = con * tan_phi;
      lat = phi - con * ds / (1 - this.es) * 0.5 * (1 - ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs - ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c - ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));
      lon = adjust_lon_default(this.long0 + d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c - ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi, this.over);
    } else {
      lat = HALF_PI * sign_default(y);
      lon = 0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse3, "inverse");
var names4 = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
var tmerc_default = {
  init: init3,
  forward: forward3,
  inverse: inverse3,
  names: names4
};

// node_modules/proj4/lib/common/sinh.js
function sinh_default(x) {
  var r = Math.exp(x);
  r = (r - 1 / r) / 2;
  return r;
}
__name(sinh_default, "default");

// node_modules/proj4/lib/common/hypot.js
function hypot_default(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  var a = Math.max(x, y);
  var b = Math.min(x, y) / (a ? a : 1);
  return a * Math.sqrt(1 + Math.pow(b, 2));
}
__name(hypot_default, "default");

// node_modules/proj4/lib/common/log1py.js
function log1py_default(x) {
  var y = 1 + x;
  var z = y - 1;
  return z === 0 ? x : x * Math.log(y) / z;
}
__name(log1py_default, "default");

// node_modules/proj4/lib/common/asinhy.js
function asinhy_default(x) {
  var y = Math.abs(x);
  y = log1py_default(y * (1 + y / (hypot_default(1, y) + 1)));
  return x < 0 ? -y : y;
}
__name(asinhy_default, "default");

// node_modules/proj4/lib/common/gatg.js
function gatg_default(pp, B) {
  var cos_2B = 2 * Math.cos(2 * B);
  var i = pp.length - 1;
  var h1 = pp[i];
  var h2 = 0;
  var h;
  while (--i >= 0) {
    h = -h2 + cos_2B * h1 + pp[i];
    h2 = h1;
    h1 = h;
  }
  return B + h * Math.sin(2 * B);
}
__name(gatg_default, "default");

// node_modules/proj4/lib/common/clens.js
function clens_default(pp, arg_r) {
  var r = 2 * Math.cos(arg_r);
  var i = pp.length - 1;
  var hr1 = pp[i];
  var hr2 = 0;
  var hr;
  while (--i >= 0) {
    hr = -hr2 + r * hr1 + pp[i];
    hr2 = hr1;
    hr1 = hr;
  }
  return Math.sin(arg_r) * hr;
}
__name(clens_default, "default");

// node_modules/proj4/lib/common/cosh.js
function cosh_default(x) {
  var r = Math.exp(x);
  r = (r + 1 / r) / 2;
  return r;
}
__name(cosh_default, "default");

// node_modules/proj4/lib/common/clens_cmplx.js
function clens_cmplx_default(pp, arg_r, arg_i) {
  var sin_arg_r = Math.sin(arg_r);
  var cos_arg_r = Math.cos(arg_r);
  var sinh_arg_i = sinh_default(arg_i);
  var cosh_arg_i = cosh_default(arg_i);
  var r = 2 * cos_arg_r * cosh_arg_i;
  var i = -2 * sin_arg_r * sinh_arg_i;
  var j = pp.length - 1;
  var hr = pp[j];
  var hi1 = 0;
  var hr1 = 0;
  var hi = 0;
  var hr2;
  var hi2;
  while (--j >= 0) {
    hr2 = hr1;
    hi2 = hi1;
    hr1 = hr;
    hi1 = hi;
    hr = -hr2 + r * hr1 - i * hi1 + pp[j];
    hi = -hi2 + i * hr1 + r * hi1;
  }
  r = sin_arg_r * cosh_arg_i;
  i = cos_arg_r * sinh_arg_i;
  return [r * hr - i * hi, r * hi + i * hr];
}
__name(clens_cmplx_default, "default");

// node_modules/proj4/lib/projections/etmerc.js
function init4() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  }
  if (this.approx) {
    tmerc_default.init.apply(this);
    this.forward = tmerc_default.forward;
    this.inverse = tmerc_default.inverse;
  }
  this.x0 = this.x0 !== void 0 ? this.x0 : 0;
  this.y0 = this.y0 !== void 0 ? this.y0 : 0;
  this.long0 = this.long0 !== void 0 ? this.long0 : 0;
  this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
  this.k0 = this.k0 !== void 0 ? this.k0 : 1;
  this.cgb = [];
  this.cbg = [];
  this.utg = [];
  this.gtu = [];
  var f = this.es / (1 + Math.sqrt(1 - this.es));
  var n = f / (2 - f);
  var np = n;
  this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))));
  this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));
  np = np * n;
  this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
  this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));
  np = np * n;
  this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
  this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));
  np = np * n;
  this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
  this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)));
  np = np * n;
  this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
  this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));
  np = np * n;
  this.cgb[5] = np * (601676 / 22275);
  this.cbg[5] = np * (444337 / 155925);
  np = Math.pow(n, 2);
  this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));
  this.utg[0] = n * (-0.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
  this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));
  this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
  this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));
  np = np * n;
  this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))));
  this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));
  np = np * n;
  this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
  this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));
  np = np * n;
  this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
  this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));
  np = np * n;
  this.utg[5] = np * (-20648693 / 638668800);
  this.gtu[5] = np * (212378941 / 319334400);
  var Z2 = gatg_default(this.cbg, this.lat0);
  this.Zb = -this.Qn * (Z2 + clens_default(this.gtu, 2 * Z2));
}
__name(init4, "init");
function forward4(p) {
  var Ce = adjust_lon_default(p.x - this.long0, this.over);
  var Cn = p.y;
  Cn = gatg_default(this.cbg, Cn);
  var sin_Cn = Math.sin(Cn);
  var cos_Cn = Math.cos(Cn);
  var sin_Ce = Math.sin(Ce);
  var cos_Ce = Math.cos(Ce);
  Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
  Ce = Math.atan2(sin_Ce * cos_Cn, hypot_default(sin_Cn, cos_Cn * cos_Ce));
  Ce = asinhy_default(Math.tan(Ce));
  var tmp = clens_cmplx_default(this.gtu, 2 * Cn, 2 * Ce);
  Cn = Cn + tmp[0];
  Ce = Ce + tmp[1];
  var x;
  var y;
  if (Math.abs(Ce) <= 2.623395162778) {
    x = this.a * (this.Qn * Ce) + this.x0;
    y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
  } else {
    x = Infinity;
    y = Infinity;
  }
  p.x = x;
  p.y = y;
  return p;
}
__name(forward4, "forward");
function inverse4(p) {
  var Ce = (p.x - this.x0) * (1 / this.a);
  var Cn = (p.y - this.y0) * (1 / this.a);
  Cn = (Cn - this.Zb) / this.Qn;
  Ce = Ce / this.Qn;
  var lon;
  var lat;
  if (Math.abs(Ce) <= 2.623395162778) {
    var tmp = clens_cmplx_default(this.utg, 2 * Cn, 2 * Ce);
    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];
    Ce = Math.atan(sinh_default(Ce));
    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var sin_Ce = Math.sin(Ce);
    var cos_Ce = Math.cos(Ce);
    Cn = Math.atan2(sin_Cn * cos_Ce, hypot_default(sin_Ce, cos_Ce * cos_Cn));
    Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);
    lon = adjust_lon_default(Ce + this.long0, this.over);
    lat = gatg_default(this.cgb, Cn);
  } else {
    lon = Infinity;
    lat = Infinity;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse4, "inverse");
var names5 = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"];
var etmerc_default = {
  init: init4,
  forward: forward4,
  inverse: inverse4,
  names: names5
};

// node_modules/proj4/lib/common/adjust_zone.js
function adjust_zone_default(zone, lon) {
  if (zone === void 0) {
    zone = Math.floor((adjust_lon_default(lon) + Math.PI) * 30 / Math.PI) + 1;
    if (zone < 0) {
      return 0;
    } else if (zone > 60) {
      return 60;
    }
  }
  return zone;
}
__name(adjust_zone_default, "default");

// node_modules/proj4/lib/projections/utm.js
var dependsOn = "etmerc";
function init5() {
  var zone = adjust_zone_default(this.zone, this.long0);
  if (zone === void 0) {
    throw new Error("unknown utm zone");
  }
  this.lat0 = 0;
  this.long0 = (6 * Math.abs(zone) - 183) * D2R;
  this.x0 = 5e5;
  this.y0 = this.utmSouth ? 1e7 : 0;
  this.k0 = 0.9996;
  etmerc_default.init.apply(this);
  this.forward = etmerc_default.forward;
  this.inverse = etmerc_default.inverse;
}
__name(init5, "init");
var names6 = ["Universal Transverse Mercator System", "utm"];
var utm_default = {
  init: init5,
  names: names6,
  dependsOn
};

// node_modules/proj4/lib/common/srat.js
function srat_default(esinp, exp) {
  return Math.pow((1 - esinp) / (1 + esinp), exp);
}
__name(srat_default, "default");

// node_modules/proj4/lib/projections/gauss.js
var MAX_ITER2 = 20;
function init6() {
  var sphi = Math.sin(this.lat0);
  var cphi = Math.cos(this.lat0);
  cphi *= cphi;
  this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
  this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
  this.phic0 = Math.asin(sphi / this.C);
  this.ratexp = 0.5 * this.C * this.e;
  this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat_default(this.e * sphi, this.ratexp));
}
__name(init6, "init");
function forward5(p) {
  var lon = p.x;
  var lat = p.y;
  p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat_default(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
  p.x = this.C * lon;
  return p;
}
__name(forward5, "forward");
function inverse5(p) {
  var DEL_TOL = 1e-14;
  var lon = p.x / this.C;
  var lat = p.y;
  var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
  for (var i = MAX_ITER2; i > 0; --i) {
    lat = 2 * Math.atan(num * srat_default(this.e * Math.sin(p.y), -0.5 * this.e)) - HALF_PI;
    if (Math.abs(lat - p.y) < DEL_TOL) {
      break;
    }
    p.y = lat;
  }
  if (!i) {
    return null;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse5, "inverse");
var names7 = ["gauss"];
var gauss_default = {
  init: init6,
  forward: forward5,
  inverse: inverse5,
  names: names7
};

// node_modules/proj4/lib/projections/sterea.js
function init7() {
  gauss_default.init.apply(this);
  if (!this.rc) {
    return;
  }
  this.sinc0 = Math.sin(this.phic0);
  this.cosc0 = Math.cos(this.phic0);
  this.R2 = 2 * this.rc;
  if (!this.title) {
    this.title = "Oblique Stereographic Alternative";
  }
}
__name(init7, "init");
function forward6(p) {
  var sinc, cosc, cosl, k;
  p.x = adjust_lon_default(p.x - this.long0, this.over);
  gauss_default.forward.apply(this, [p]);
  sinc = Math.sin(p.y);
  cosc = Math.cos(p.y);
  cosl = Math.cos(p.x);
  k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
  p.x = k * cosc * Math.sin(p.x);
  p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}
__name(forward6, "forward");
function inverse6(p) {
  var sinc, cosc, lon, lat, rho;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  p.x /= this.k0;
  p.y /= this.k0;
  if (rho = hypot_default(p.x, p.y)) {
    var c = 2 * Math.atan2(rho, this.R2);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
    lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
  } else {
    lat = this.phic0;
    lon = 0;
  }
  p.x = lon;
  p.y = lat;
  gauss_default.inverse.apply(this, [p]);
  p.x = adjust_lon_default(p.x + this.long0, this.over);
  return p;
}
__name(inverse6, "inverse");
var names8 = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
var sterea_default = {
  init: init7,
  forward: forward6,
  inverse: inverse6,
  names: names8
};

// node_modules/proj4/lib/projections/stere.js
function ssfn_(phit, sinphi, eccen) {
  sinphi *= eccen;
  return Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen);
}
__name(ssfn_, "ssfn_");
function init8() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.coslat0 = Math.cos(this.lat0);
  this.sinlat0 = Math.sin(this.lat0);
  if (this.sphere) {
    if (!isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
      this.k0 = 0.5 * (1 + sign_default(this.lat0) * Math.sin(this.lat_ts));
    }
  } else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (this.lat0 > 0) {
        this.con = 1;
      } else {
        this.con = -1;
      }
    }
    this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
    if (!isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && Math.abs(Math.cos(this.lat_ts)) > EPSLN) {
      this.k0 = 0.5 * this.cons * msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz_default(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
    }
    this.ms1 = msfnz_default(this.e, this.sinlat0, this.coslat0);
    this.X0 = 2 * Math.atan(ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
    this.cosX0 = Math.cos(this.X0);
    this.sinX0 = Math.sin(this.X0);
  }
}
__name(init8, "init");
function forward7(p) {
  var lon = p.x;
  var lat = p.y;
  var sinlat = Math.sin(lat);
  var coslat = Math.cos(lat);
  var A5, X, sinX, cosX, ts, rh;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
    p.x = NaN;
    p.y = NaN;
    return p;
  }
  if (this.sphere) {
    A5 = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
    p.x = this.a * A5 * coslat * Math.sin(dlon) + this.x0;
    p.y = this.a * A5 * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
    return p;
  } else {
    X = 2 * Math.atan(ssfn_(lat, sinlat, this.e)) - HALF_PI;
    cosX = Math.cos(X);
    sinX = Math.sin(X);
    if (Math.abs(this.coslat0) <= EPSLN) {
      ts = tsfnz_default(this.e, lat * this.con, this.con * sinlat);
      rh = 2 * this.a * this.k0 * ts / this.cons;
      p.x = this.x0 + rh * Math.sin(lon - this.long0);
      p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
      return p;
    } else if (Math.abs(this.sinlat0) < EPSLN) {
      A5 = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
      p.y = A5 * sinX;
    } else {
      A5 = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
      p.y = A5 * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
    }
    p.x = A5 * cosX * Math.sin(dlon) + this.x0;
  }
  return p;
}
__name(forward7, "forward");
function inverse7(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat, ts, ce, Chi;
  var rh = Math.sqrt(p.x * p.x + p.y * p.y);
  if (this.sphere) {
    var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
    lon = this.long0;
    lat = this.lat0;
    if (rh <= EPSLN) {
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
    if (Math.abs(this.coslat0) < EPSLN) {
      if (this.lat0 > 0) {
        lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
      } else {
        lon = adjust_lon_default(this.long0 + Math.atan2(p.x, p.y), this.over);
      }
    } else {
      lon = adjust_lon_default(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)), this.over);
    }
    p.x = lon;
    p.y = lat;
    return p;
  } else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (rh <= EPSLN) {
        lat = this.lat0;
        lon = this.long0;
        p.x = lon;
        p.y = lat;
        return p;
      }
      p.x *= this.con;
      p.y *= this.con;
      ts = rh * this.cons / (2 * this.a * this.k0);
      lat = this.con * phi2z_default(this.e, ts);
      lon = this.con * adjust_lon_default(this.con * this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
    } else {
      ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
      lon = this.long0;
      if (rh <= EPSLN) {
        Chi = this.X0;
      } else {
        Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
        lon = adjust_lon_default(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)), this.over);
      }
      lat = -1 * phi2z_default(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse7, "inverse");
var names9 = ["stere", "Stereographic_South_Pole", "Polar_Stereographic_variant_A", "Polar_Stereographic_variant_B", "Polar_Stereographic"];
var stere_default = {
  init: init8,
  forward: forward7,
  inverse: inverse7,
  names: names9,
  ssfn_
};

// node_modules/proj4/lib/projections/somerc.js
function init9() {
  if (!this.k0) {
    this.k0 = 1;
  }
  var phy0 = this.lat0;
  this.lambda0 = this.long0;
  var sinPhy0 = Math.sin(phy0);
  var semiMajorAxis = this.a;
  var invF = this.rf;
  var flattening = 1 / invF;
  var e2 = 2 * flattening - Math.pow(flattening, 2);
  var e = this.e = Math.sqrt(e2);
  this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
  this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
  this.b0 = Math.asin(sinPhy0 / this.alpha);
  var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
  var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
  var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
}
__name(init9, "init");
function forward8(p) {
  var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
  var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
  var S = -this.alpha * (Sa1 + Sa2) + this.K;
  var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);
  var I2 = this.alpha * (p.x - this.lambda0);
  var rotI = Math.atan(Math.sin(I2) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I2)));
  var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I2));
  p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
  p.x = this.R * rotI + this.x0;
  return p;
}
__name(forward8, "forward");
function inverse8(p) {
  var Y = p.x - this.x0;
  var X = p.y - this.y0;
  var rotI = Y / this.R;
  var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);
  var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
  var I2 = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));
  var lambda = this.lambda0 + I2 / this.alpha;
  var S = 0;
  var phy = b;
  var prevPhy = -1e3;
  var iteration = 0;
  while (Math.abs(phy - prevPhy) > 1e-7) {
    if (++iteration > 20) {
      return;
    }
    S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
    prevPhy = phy;
    phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
  }
  p.x = lambda;
  p.y = phy;
  return p;
}
__name(inverse8, "inverse");
var names10 = ["somerc"];
var somerc_default = {
  init: init9,
  forward: forward8,
  inverse: inverse8,
  names: names10
};

// node_modules/proj4/lib/projections/omerc.js
var TOL = 1e-7;
function isTypeA(P) {
  var typeAProjections = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"];
  var projectionName = typeof P.projName === "object" ? Object.keys(P.projName)[0] : P.projName;
  return "no_uoff" in P || "no_off" in P || typeAProjections.indexOf(projectionName) !== -1 || typeAProjections.indexOf(getNormalizedProjName(projectionName)) !== -1;
}
__name(isTypeA, "isTypeA");
function init10() {
  var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0, gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0;
  if (!this.k0) {
    this.k0 = 1;
  }
  this.no_off = isTypeA(this);
  this.no_rot = "no_rot" in this;
  var alp = false;
  if ("alpha" in this) {
    alp = true;
  }
  var gam = false;
  if ("rectified_grid_angle" in this) {
    gam = true;
  }
  if (alp) {
    alpha_c = this.alpha;
  }
  if (gam) {
    gamma = this.rectified_grid_angle;
    if (!alp) {
      alpha_c = 0;
      alp = true;
    }
  }
  if (alp || gam) {
    lamc = this.longc;
  } else {
    lam1 = this.long1;
    phi1 = this.lat1;
    lam2 = this.long2;
    phi2 = this.lat2;
    if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL || Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL || Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
      throw new Error();
    }
  }
  var one_es = 1 - this.es;
  com = Math.sqrt(one_es);
  if (Math.abs(this.lat0) > EPSLN) {
    sinph0 = Math.sin(this.lat0);
    cosph0 = Math.cos(this.lat0);
    con = 1 - this.es * sinph0 * sinph0;
    this.B = cosph0 * cosph0;
    this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
    this.A = this.B * this.k0 * com / con;
    D = this.B * com / (cosph0 * Math.sqrt(con));
    F = D * D - 1;
    if (F <= 0) {
      F = 0;
    } else {
      F = Math.sqrt(F);
      if (this.lat0 < 0) {
        F = -F;
      }
    }
    this.E = F += D;
    this.E *= Math.pow(tsfnz_default(this.e, this.lat0, sinph0), this.B);
  } else {
    this.B = 1 / com;
    this.A = this.k0;
    this.E = D = F = 1;
  }
  if (alp || gam) {
    if (alp) {
      gamma0 = Math.asin(Math.sin(alpha_c) / D);
      if (!gam) {
        gamma = alpha_c;
      }
    } else {
      gamma0 = gamma;
      alpha_c = Math.asin(D * Math.sin(gamma0));
    }
    this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
  } else {
    H = Math.pow(tsfnz_default(this.e, phi1, Math.sin(phi1)), this.B);
    L = Math.pow(tsfnz_default(this.e, phi2, Math.sin(phi2)), this.B);
    F = this.E / H;
    p = (L - H) / (L + H);
    J = this.E * this.E;
    J = (J - L * H) / (J + L * H);
    con = lam1 - lam2;
    if (con < -Math.PI) {
      lam2 -= TWO_PI;
    } else if (con > Math.PI) {
      lam2 += TWO_PI;
    }
    this.lam0 = adjust_lon_default(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B, this.over);
    gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon_default(lam1 - this.lam0, this.over)) / (F - 1 / F));
    gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
  }
  this.singam = Math.sin(gamma0);
  this.cosgam = Math.cos(gamma0);
  this.sinrot = Math.sin(gamma);
  this.cosrot = Math.cos(gamma);
  this.rB = 1 / this.B;
  this.ArB = this.A * this.rB;
  this.BrA = 1 / this.ArB;
  if (this.no_off) {
    this.u_0 = 0;
  } else {
    this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
    if (this.lat0 < 0) {
      this.u_0 = -this.u_0;
    }
  }
  F = 0.5 * gamma0;
  this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
  this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
}
__name(init10, "init");
function forward9(p) {
  var coords = {};
  var S, T, U, V2, W, temp, u, v;
  p.x = p.x - this.lam0;
  if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
    W = this.E / Math.pow(tsfnz_default(this.e, p.y, Math.sin(p.y)), this.B);
    temp = 1 / W;
    S = 0.5 * (W - temp);
    T = 0.5 * (W + temp);
    V2 = Math.sin(this.B * p.x);
    U = (S * this.singam - V2 * this.cosgam) / T;
    if (Math.abs(Math.abs(U) - 1) < EPSLN) {
      throw new Error();
    }
    v = 0.5 * this.ArB * Math.log((1 - U) / (1 + U));
    temp = Math.cos(this.B * p.x);
    if (Math.abs(temp) < TOL) {
      u = this.A * p.x;
    } else {
      u = this.ArB * Math.atan2(S * this.cosgam + V2 * this.singam, temp);
    }
  } else {
    v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
    u = this.ArB * p.y;
  }
  if (this.no_rot) {
    coords.x = u;
    coords.y = v;
  } else {
    u -= this.u_0;
    coords.x = v * this.cosrot + u * this.sinrot;
    coords.y = u * this.cosrot - v * this.sinrot;
  }
  coords.x = this.a * coords.x + this.x0;
  coords.y = this.a * coords.y + this.y0;
  if (p.z !== void 0) {
    coords.z = p.z;
  }
  if (p.m !== void 0) {
    coords.m = p.m;
  }
  return coords;
}
__name(forward9, "forward");
function inverse9(p) {
  var u, v, Qp, Sp, Tp, Vp, Up;
  var coords = {};
  p.x = (p.x - this.x0) * (1 / this.a);
  p.y = (p.y - this.y0) * (1 / this.a);
  if (this.no_rot) {
    v = p.y;
    u = p.x;
  } else {
    v = p.x * this.cosrot - p.y * this.sinrot;
    u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
  }
  Qp = Math.exp(-this.BrA * v);
  Sp = 0.5 * (Qp - 1 / Qp);
  Tp = 0.5 * (Qp + 1 / Qp);
  Vp = Math.sin(this.BrA * u);
  Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
  if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
    coords.x = 0;
    coords.y = Up < 0 ? -HALF_PI : HALF_PI;
  } else {
    coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
    coords.y = phi2z_default(this.e, Math.pow(coords.y, 1 / this.B));
    if (coords.y === Infinity) {
      throw new Error();
    }
    coords.x = -this.rB * Math.atan2(Sp * this.cosgam - Vp * this.singam, Math.cos(this.BrA * u));
  }
  coords.x += this.lam0;
  if (p.z !== void 0) {
    coords.z = p.z;
  }
  if (p.m !== void 0) {
    coords.m = p.m;
  }
  return coords;
}
__name(inverse9, "inverse");
var names11 = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Variant_B", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
var omerc_default = {
  init: init10,
  forward: forward9,
  inverse: inverse9,
  names: names11
};

// node_modules/proj4/lib/projections/lcc.js
function init11() {
  if (!this.lat2) {
    this.lat2 = this.lat1;
  }
  if (!this.k0) {
    this.k0 = 1;
  }
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.long0 = this.long0 || 0;
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  var temp = this.b / this.a;
  this.e = Math.sqrt(1 - temp * temp);
  var sin1 = Math.sin(this.lat1);
  var cos1 = Math.cos(this.lat1);
  var ms1 = msfnz_default(this.e, sin1, cos1);
  var ts1 = tsfnz_default(this.e, this.lat1, sin1);
  var sin2 = Math.sin(this.lat2);
  var cos2 = Math.cos(this.lat2);
  var ms2 = msfnz_default(this.e, sin2, cos2);
  var ts2 = tsfnz_default(this.e, this.lat2, sin2);
  var ts0 = tsfnz_default(this.e, this.lat0, Math.sin(this.lat0));
  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
  } else {
    this.ns = sin1;
  }
  if (isNaN(this.ns)) {
    this.ns = sin1;
  }
  this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
  this.rh = Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN ? 0 : this.a * this.f0 * Math.pow(ts0, this.ns);
  if (!this.title) {
    this.title = "Lambert Conformal Conic";
  }
}
__name(init11, "init");
function forward10(p) {
  var lon = p.x;
  var lat = p.y;
  if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
    lat = sign_default(lat) * (HALF_PI - 2 * EPSLN);
  }
  var con = Math.abs(Math.abs(lat) - HALF_PI);
  var ts, rh1;
  if (con > EPSLN) {
    ts = tsfnz_default(this.e, lat, Math.sin(lat));
    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
  } else {
    con = lat * this.ns;
    if (con <= 0) {
      return null;
    }
    rh1 = 0;
  }
  var theta = this.ns * adjust_lon_default(lon - this.long0, this.over);
  p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
  p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;
  return p;
}
__name(forward10, "forward");
function inverse10(p) {
  var rh1, con, ts;
  var lat, lon;
  var x = (p.x - this.x0) / this.k0;
  var y = this.rh - (p.y - this.y0) / this.k0;
  if (this.ns > 0) {
    rh1 = Math.sqrt(x * x + y * y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(x * x + y * y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * x, con * y);
  }
  if (rh1 !== 0 || this.ns > 0) {
    con = 1 / this.ns;
    ts = Math.pow(rh1 / (this.a * this.f0), con);
    lat = phi2z_default(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  } else {
    lat = -HALF_PI;
  }
  lon = adjust_lon_default(theta / this.ns + this.long0, this.over);
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse10, "inverse");
var names12 = [
  "Lambert Tangential Conformal Conic Projection",
  "Lambert_Conformal_Conic",
  "Lambert_Conformal_Conic_1SP",
  "Lambert_Conformal_Conic_2SP",
  "lcc",
  "Lambert Conic Conformal (1SP)",
  "Lambert Conic Conformal (2SP)"
];
var lcc_default = {
  init: init11,
  forward: forward10,
  inverse: inverse10,
  names: names12
};

// node_modules/proj4/lib/projections/krovak.js
function init12() {
  this.a = 6377397155e-3;
  this.es = 0.006674372230614;
  this.e = Math.sqrt(this.es);
  if (!this.lat0) {
    this.lat0 = 0.863937979737193;
  }
  if (!this.long0) {
    this.long0 = 0.7417649320975901 - 0.308341501185665;
  }
  if (!this.k0) {
    this.k0 = 0.9999;
  }
  this.s45 = 0.785398163397448;
  this.s90 = 2 * this.s45;
  this.fi0 = this.lat0;
  this.e2 = this.es;
  this.e = Math.sqrt(this.e2);
  this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
  this.uq = 1.04216856380474;
  this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
  this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
  this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
  this.k1 = this.k0;
  this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
  this.s0 = 1.37008346281555;
  this.n = Math.sin(this.s0);
  this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
  this.ad = this.s90 - this.uq;
}
__name(init12, "init");
function forward11(p) {
  var gfi, u, deltav, s, d, eps, ro;
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon_default(lon - this.long0, this.over);
  gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2);
  u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
  deltav = -delta_lon * this.alfa;
  s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
  d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
  eps = this.n * d;
  ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
  p.y = ro * Math.cos(eps) / 1;
  p.x = ro * Math.sin(eps) / 1;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  return p;
}
__name(forward11, "forward");
function inverse11(p) {
  var u, deltav, s, d, eps, ro, fi1;
  var ok;
  var tmp = p.x;
  p.x = p.y;
  p.y = tmp;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  ro = Math.sqrt(p.x * p.x + p.y * p.y);
  eps = Math.atan2(p.y, p.x);
  d = eps / Math.sin(this.s0);
  s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
  u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
  deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
  p.x = this.long0 - deltav / this.alfa;
  fi1 = u;
  ok = 0;
  var iter = 0;
  do {
    p.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
    if (Math.abs(fi1 - p.y) < 1e-10) {
      ok = 1;
    }
    fi1 = p.y;
    iter += 1;
  } while (ok === 0 && iter < 15);
  if (iter >= 15) {
    return null;
  }
  return p;
}
__name(inverse11, "inverse");
var names13 = ["Krovak", "Krovak Modified", "Krovak (North Orientated)", "Krovak Modified (North Orientated)", "krovak"];
var krovak_default = {
  init: init12,
  forward: forward11,
  inverse: inverse11,
  names: names13
};

// node_modules/proj4/lib/common/mlfn.js
function mlfn_default(e0, e1, e2, e3, phi) {
  return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi);
}
__name(mlfn_default, "default");

// node_modules/proj4/lib/common/e0fn.js
function e0fn_default(x) {
  return 1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x));
}
__name(e0fn_default, "default");

// node_modules/proj4/lib/common/e1fn.js
function e1fn_default(x) {
  return 0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x));
}
__name(e1fn_default, "default");

// node_modules/proj4/lib/common/e2fn.js
function e2fn_default(x) {
  return 0.05859375 * x * x * (1 + 0.75 * x);
}
__name(e2fn_default, "default");

// node_modules/proj4/lib/common/e3fn.js
function e3fn_default(x) {
  return x * x * x * (35 / 3072);
}
__name(e3fn_default, "default");

// node_modules/proj4/lib/common/gN.js
function gN_default(a, e, sinphi) {
  var temp = e * sinphi;
  return a / Math.sqrt(1 - temp * temp);
}
__name(gN_default, "default");

// node_modules/proj4/lib/common/adjust_lat.js
function adjust_lat_default(x) {
  return Math.abs(x) < HALF_PI ? x : x - sign_default(x) * Math.PI;
}
__name(adjust_lat_default, "default");

// node_modules/proj4/lib/common/imlfn.js
function imlfn_default(ml, e0, e1, e2, e3) {
  var phi;
  var dphi;
  phi = ml / e0;
  for (var i = 0; i < 15; i++) {
    dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return NaN;
}
__name(imlfn_default, "default");

// node_modules/proj4/lib/projections/cass.js
function init13() {
  if (!this.sphere) {
    this.e0 = e0fn_default(this.es);
    this.e1 = e1fn_default(this.es);
    this.e2 = e2fn_default(this.es);
    this.e3 = e3fn_default(this.es);
    this.ml0 = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
  }
}
__name(init13, "init");
function forward12(p) {
  var x, y;
  var lam = p.x;
  var phi = p.y;
  lam = adjust_lon_default(lam - this.long0, this.over);
  if (this.sphere) {
    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
  } else {
    var sinphi = Math.sin(phi);
    var cosphi = Math.cos(phi);
    var nl = gN_default(this.a, this.e, sinphi);
    var tl = Math.tan(phi) * Math.tan(phi);
    var al = lam * Math.cos(phi);
    var asq = al * al;
    var cl = this.es * cosphi * cosphi / (1 - this.es);
    var ml = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, phi);
    x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
    y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);
  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}
__name(forward12, "forward");
function inverse12(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var phi, lam;
  if (this.sphere) {
    var dd = y + this.lat0;
    phi = Math.asin(Math.sin(dd) * Math.cos(x));
    lam = Math.atan2(Math.tan(x), Math.cos(dd));
  } else {
    var ml1 = this.ml0 / this.a + y;
    var phi1 = imlfn_default(ml1, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
      p.x = this.long0;
      p.y = HALF_PI;
      if (y < 0) {
        p.y *= -1;
      }
      return p;
    }
    var nl1 = gN_default(this.a, this.e, Math.sin(phi1));
    var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
    var tl1 = Math.pow(Math.tan(phi1), 2);
    var dl = x * this.a / nl1;
    var dsq = dl * dl;
    phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
    lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);
  }
  p.x = adjust_lon_default(lam + this.long0, this.over);
  p.y = adjust_lat_default(phi);
  return p;
}
__name(inverse12, "inverse");
var names14 = ["Cassini", "Cassini_Soldner", "cass"];
var cass_default = {
  init: init13,
  forward: forward12,
  inverse: inverse12,
  names: names14
};

// node_modules/proj4/lib/common/qsfnz.js
function qsfnz_default(eccent, sinphi) {
  var con;
  if (eccent > 1e-7) {
    con = eccent * sinphi;
    return (1 - eccent * eccent) * (sinphi / (1 - con * con) - 0.5 / eccent * Math.log((1 - con) / (1 + con)));
  } else {
    return 2 * sinphi;
  }
}
__name(qsfnz_default, "default");

// node_modules/proj4/lib/common/authset.js
var P00 = 0.3333333333333333;
var P01 = 0.17222222222222222;
var P02 = 0.10257936507936508;
var P10 = 0.06388888888888888;
var P11 = 0.0664021164021164;
var P20 = 0.016415012942191543;
function authset(es) {
  var t;
  var APA = [];
  APA[0] = es * P00;
  t = es * es;
  APA[0] += t * P01;
  APA[1] = t * P10;
  t *= es;
  APA[0] += t * P02;
  APA[1] += t * P11;
  APA[2] = t * P20;
  return APA;
}
__name(authset, "authset");

// node_modules/proj4/lib/common/authlat.js
function authlat(beta, APA) {
  var t = beta + beta;
  return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t);
}
__name(authlat, "authlat");

// node_modules/proj4/lib/projections/laea.js
var S_POLE = 1;
var N_POLE = 2;
var EQUIT = 3;
var OBLIQ = 4;
function init14() {
  var t = Math.abs(this.lat0);
  if (Math.abs(t - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? S_POLE : N_POLE;
  } else if (Math.abs(t) < EPSLN) {
    this.mode = EQUIT;
  } else {
    this.mode = OBLIQ;
  }
  if (this.es > 0) {
    var sinphi;
    this.qp = qsfnz_default(this.e, 1);
    this.mmf = 0.5 / (1 - this.es);
    this.apa = authset(this.es);
    switch (this.mode) {
      case N_POLE:
        this.dd = 1;
        break;
      case S_POLE:
        this.dd = 1;
        break;
      case EQUIT:
        this.rq = Math.sqrt(0.5 * this.qp);
        this.dd = 1 / this.rq;
        this.xmf = 1;
        this.ymf = 0.5 * this.qp;
        break;
      case OBLIQ:
        this.rq = Math.sqrt(0.5 * this.qp);
        sinphi = Math.sin(this.lat0);
        this.sinb1 = qsfnz_default(this.e, sinphi) / this.qp;
        this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
        this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
        this.ymf = (this.xmf = this.rq) / this.dd;
        this.xmf *= this.dd;
        break;
    }
  } else {
    if (this.mode === OBLIQ) {
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }
  }
}
__name(init14, "init");
function forward13(p) {
  var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
  var lam = p.x;
  var phi = p.y;
  lam = adjust_lon_default(lam - this.long0, this.over);
  if (this.sphere) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    coslam = Math.cos(lam);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      if (y <= EPSLN) {
        return null;
      }
      y = Math.sqrt(2 / y);
      x = y * cosphi * Math.sin(lam);
      y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        coslam = -coslam;
      }
      if (Math.abs(phi + this.lat0) < EPSLN) {
        return null;
      }
      y = FORTPI - phi * 0.5;
      y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y));
      x = y * Math.sin(lam);
      y *= coslam;
    }
  } else {
    sinb = 0;
    cosb = 0;
    b = 0;
    coslam = Math.cos(lam);
    sinlam = Math.sin(lam);
    sinphi = Math.sin(phi);
    q = qsfnz_default(this.e, sinphi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinb = q / this.qp;
      cosb = Math.sqrt(1 - sinb * sinb);
    }
    switch (this.mode) {
      case this.OBLIQ:
        b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
        break;
      case this.EQUIT:
        b = 1 + cosb * coslam;
        break;
      case this.N_POLE:
        b = HALF_PI + phi;
        q = this.qp - q;
        break;
      case this.S_POLE:
        b = phi - HALF_PI;
        q = this.qp + q;
        break;
    }
    if (Math.abs(b) < EPSLN) {
      return null;
    }
    switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        b = Math.sqrt(2 / b);
        if (this.mode === this.OBLIQ) {
          y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
        } else {
          y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
        }
        x = this.xmf * b * cosb * sinlam;
        break;
      case this.N_POLE:
      case this.S_POLE:
        if (q >= 0) {
          x = (b = Math.sqrt(q)) * sinlam;
          y = coslam * (this.mode === this.S_POLE ? b : -b);
        } else {
          x = y = 0;
        }
        break;
    }
  }
  p.x = this.a * x + this.x0;
  p.y = this.a * y + this.y0;
  return p;
}
__name(forward13, "forward");
function inverse13(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var lam, phi, cCe, sCe, q, rho, ab;
  if (this.sphere) {
    var cosz = 0, rh, sinz = 0;
    rh = Math.sqrt(x * x + y * y);
    phi = rh * 0.5;
    if (phi > 1) {
      return null;
    }
    phi = 2 * Math.asin(phi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinz = Math.sin(phi);
      cosz = Math.cos(phi);
    }
    switch (this.mode) {
      case this.EQUIT:
        phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin(y * sinz / rh);
        x *= sinz;
        y = cosz * rh;
        break;
      case this.OBLIQ:
        phi = Math.abs(rh) <= EPSLN ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
        x *= sinz * this.cosph0;
        y = (cosz - Math.sin(phi) * this.sinph0) * rh;
        break;
      case this.N_POLE:
        y = -y;
        phi = HALF_PI - phi;
        break;
      case this.S_POLE:
        phi -= HALF_PI;
        break;
    }
    lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y);
  } else {
    ab = 0;
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      x /= this.dd;
      y *= this.dd;
      rho = Math.sqrt(x * x + y * y);
      if (rho < EPSLN) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      sCe = 2 * Math.asin(0.5 * rho / this.rq);
      cCe = Math.cos(sCe);
      x *= sCe = Math.sin(sCe);
      if (this.mode === this.OBLIQ) {
        ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
        q = this.qp * ab;
        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
      } else {
        ab = y * sCe / rho;
        q = this.qp * ab;
        y = rho * cCe;
      }
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        y = -y;
      }
      q = x * x + y * y;
      if (!q) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      ab = 1 - q / this.qp;
      if (this.mode === this.S_POLE) {
        ab = -ab;
      }
    }
    lam = Math.atan2(x, y);
    phi = authlat(Math.asin(ab), this.apa);
  }
  p.x = adjust_lon_default(this.long0 + lam, this.over);
  p.y = phi;
  return p;
}
__name(inverse13, "inverse");
var names15 = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
var laea_default = {
  init: init14,
  forward: forward13,
  inverse: inverse13,
  names: names15,
  S_POLE,
  N_POLE,
  EQUIT,
  OBLIQ
};

// node_modules/proj4/lib/common/asinz.js
function asinz_default(x) {
  if (Math.abs(x) > 1) {
    x = x > 1 ? 1 : -1;
  }
  return Math.asin(x);
}
__name(asinz_default, "default");

// node_modules/proj4/lib/projections/aea.js
function init15() {
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e3 = Math.sqrt(this.es);
  this.sin_po = Math.sin(this.lat1);
  this.cos_po = Math.cos(this.lat1);
  this.t1 = this.sin_po;
  this.con = this.sin_po;
  this.ms1 = msfnz_default(this.e3, this.sin_po, this.cos_po);
  this.qs1 = qsfnz_default(this.e3, this.sin_po);
  this.sin_po = Math.sin(this.lat2);
  this.cos_po = Math.cos(this.lat2);
  this.t2 = this.sin_po;
  this.ms2 = msfnz_default(this.e3, this.sin_po, this.cos_po);
  this.qs2 = qsfnz_default(this.e3, this.sin_po);
  this.sin_po = Math.sin(this.lat0);
  this.cos_po = Math.cos(this.lat0);
  this.t3 = this.sin_po;
  this.qs0 = qsfnz_default(this.e3, this.sin_po);
  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
  } else {
    this.ns0 = this.con;
  }
  this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
  this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
}
__name(init15, "init");
function forward14(p) {
  var lon = p.x;
  var lat = p.y;
  this.sin_phi = Math.sin(lat);
  this.cos_phi = Math.cos(lat);
  var qs = qsfnz_default(this.e3, this.sin_phi);
  var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
  var theta = this.ns0 * adjust_lon_default(lon - this.long0, this.over);
  var x = rh1 * Math.sin(theta) + this.x0;
  var y = this.rh - rh1 * Math.cos(theta) + this.y0;
  p.x = x;
  p.y = y;
  return p;
}
__name(forward14, "forward");
function inverse14(p) {
  var rh1, qs, con, theta, lon, lat;
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  if (this.ns0 >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  con = rh1 * this.ns0 / this.a;
  if (this.sphere) {
    lat = Math.asin((this.c - con * con) / (2 * this.ns0));
  } else {
    qs = (this.c - con * con) / this.ns0;
    lat = this.phi1z(this.e3, qs);
  }
  lon = adjust_lon_default(theta / this.ns0 + this.long0, this.over);
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse14, "inverse");
function phi1z(eccent, qs) {
  var sinphi, cosphi, con, com, dphi;
  var phi = asinz_default(0.5 * qs);
  if (eccent < EPSLN) {
    return phi;
  }
  var eccnts = eccent * eccent;
  for (var i = 1; i <= 25; i++) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    con = eccent * sinphi;
    com = 1 - con * con;
    dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi = phi + dphi;
    if (Math.abs(dphi) <= 1e-7) {
      return phi;
    }
  }
  return null;
}
__name(phi1z, "phi1z");
var names16 = ["Albers_Conic_Equal_Area", "Albers_Equal_Area", "Albers", "aea"];
var aea_default = {
  init: init15,
  forward: forward14,
  inverse: inverse14,
  names: names16,
  phi1z
};

// node_modules/proj4/lib/projections/gnom.js
function init16() {
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
  this.infinity_dist = 1e3 * this.a;
  this.rc = 1;
}
__name(init16, "init");
function forward15(p) {
  var sinphi, cosphi;
  var dlon;
  var coslon;
  var ksp;
  var g;
  var x, y;
  var lon = p.x;
  var lat = p.y;
  dlon = adjust_lon_default(lon - this.long0, this.over);
  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);
  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if (g > 0 || Math.abs(g) <= EPSLN) {
    x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
  } else {
    x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
    y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p.x = x;
  p.y = y;
  return p;
}
__name(forward15, "forward");
function inverse15(p) {
  var rh;
  var sinc, cosc;
  var c;
  var lon, lat;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  p.x /= this.k0;
  p.y /= this.k0;
  if (rh = Math.sqrt(p.x * p.x + p.y * p.y)) {
    c = Math.atan2(rh, this.rc);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = asinz_default(cosc * this.sin_p14 + p.y * sinc * this.cos_p14 / rh);
    lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
    lon = adjust_lon_default(this.long0 + lon, this.over);
  } else {
    lat = this.phic0;
    lon = 0;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse15, "inverse");
var names17 = ["gnom"];
var gnom_default = {
  init: init16,
  forward: forward15,
  inverse: inverse15,
  names: names17
};

// node_modules/proj4/lib/common/iqsfnz.js
function iqsfnz_default(eccent, q) {
  var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
  if (Math.abs(Math.abs(q) - temp) < 1e-6) {
    if (q < 0) {
      return -1 * HALF_PI;
    } else {
      return HALF_PI;
    }
  }
  var phi = Math.asin(0.5 * q);
  var dphi;
  var sin_phi;
  var cos_phi;
  var con;
  for (var i = 0; i < 30; i++) {
    sin_phi = Math.sin(phi);
    cos_phi = Math.cos(phi);
    con = eccent * sin_phi;
    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return NaN;
}
__name(iqsfnz_default, "default");

// node_modules/proj4/lib/projections/cea.js
function init17() {
  if (!this.sphere) {
    this.k0 = msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
  }
}
__name(init17, "init");
function forward16(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  if (this.sphere) {
    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
  } else {
    var qs = qsfnz_default(this.e, Math.sin(lat));
    x = this.x0 + this.a * this.k0 * dlon;
    y = this.y0 + this.a * qs * 0.5 / this.k0;
  }
  p.x = x;
  p.y = y;
  return p;
}
__name(forward16, "forward");
function inverse16(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat;
  if (this.sphere) {
    lon = adjust_lon_default(this.long0 + p.x / this.a / Math.cos(this.lat_ts), this.over);
    lat = Math.asin(p.y / this.a * Math.cos(this.lat_ts));
  } else {
    lat = iqsfnz_default(this.e, 2 * p.y * this.k0 / this.a);
    lon = adjust_lon_default(this.long0 + p.x / (this.a * this.k0), this.over);
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse16, "inverse");
var names18 = ["cea"];
var cea_default = {
  init: init17,
  forward: forward16,
  inverse: inverse16,
  names: names18
};

// node_modules/proj4/lib/projections/eqc.js
function init18() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Equidistant Cylindrical (Plate Carre)";
  this.rc = Math.cos(this.lat_ts);
}
__name(init18, "init");
function forward17(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  var dlat = adjust_lat_default(lat - this.lat0);
  p.x = this.x0 + this.a * dlon * this.rc;
  p.y = this.y0 + this.a * dlat;
  return p;
}
__name(forward17, "forward");
function inverse17(p) {
  var x = p.x;
  var y = p.y;
  p.x = adjust_lon_default(this.long0 + (x - this.x0) / (this.a * this.rc), this.over);
  p.y = adjust_lat_default(this.lat0 + (y - this.y0) / this.a);
  return p;
}
__name(inverse17, "inverse");
var names19 = ["Equirectangular", "Equidistant_Cylindrical", "Equidistant_Cylindrical_Spherical", "eqc"];
var eqc_default = {
  init: init18,
  forward: forward17,
  inverse: inverse17,
  names: names19
};

// node_modules/proj4/lib/projections/poly.js
var MAX_ITER3 = 20;
function init19() {
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn_default(this.es);
  this.e1 = e1fn_default(this.es);
  this.e2 = e2fn_default(this.es);
  this.e3 = e3fn_default(this.es);
  this.ml0 = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
__name(init19, "init");
function forward18(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y, el;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  el = dlon * Math.sin(lat);
  if (this.sphere) {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.a * this.lat0;
    } else {
      x = this.a * Math.sin(el) / Math.tan(lat);
      y = this.a * (adjust_lat_default(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
    }
  } else {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.ml0;
    } else {
      var nl = gN_default(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
      x = nl * Math.sin(el);
      y = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
    }
  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}
__name(forward18, "forward");
function inverse18(p) {
  var lon, lat, x, y, i;
  var al, bl;
  var phi, dphi;
  x = p.x - this.x0;
  y = p.y - this.y0;
  if (this.sphere) {
    if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
      lon = adjust_lon_default(x / this.a + this.long0, this.over);
      lat = 0;
    } else {
      al = this.lat0 + y / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var tanphi;
      for (i = MAX_ITER3; i; --i) {
        tanphi = Math.tan(phi);
        dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
        phi += dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      lon = adjust_lon_default(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat), this.over);
    }
  } else {
    if (Math.abs(y + this.ml0) <= EPSLN) {
      lat = 0;
      lon = adjust_lon_default(this.long0 + x / this.a, this.over);
    } else {
      al = (this.ml0 + y) / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var cl, mln, mlnp, ma;
      var con;
      for (i = MAX_ITER3; i; --i) {
        con = this.e * Math.sin(phi);
        cl = Math.sqrt(1 - con * con) * Math.tan(phi);
        mln = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, phi);
        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
        ma = mln / this.a;
        dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
        phi -= dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
      lon = adjust_lon_default(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat), this.over);
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse18, "inverse");
var names20 = ["Polyconic", "American_Polyconic", "poly"];
var poly_default = {
  init: init19,
  forward: forward18,
  inverse: inverse18,
  names: names20
};

// node_modules/proj4/lib/projections/nzmg.js
var iterations = 1;
function init20() {
  this.A = [];
  this.A[1] = 0.6399175073;
  this.A[2] = -0.1358797613;
  this.A[3] = 0.063294409;
  this.A[4] = -0.02526853;
  this.A[5] = 0.0117879;
  this.A[6] = -55161e-7;
  this.A[7] = 26906e-7;
  this.A[8] = -1333e-6;
  this.A[9] = 67e-5;
  this.A[10] = -34e-5;
  this.B_re = [];
  this.B_im = [];
  this.B_re[1] = 0.7557853228;
  this.B_im[1] = 0;
  this.B_re[2] = 0.249204646;
  this.B_im[2] = 3371507e-9;
  this.B_re[3] = -1541739e-9;
  this.B_im[3] = 0.04105856;
  this.B_re[4] = -0.10162907;
  this.B_im[4] = 0.01727609;
  this.B_re[5] = -0.26623489;
  this.B_im[5] = -0.36249218;
  this.B_re[6] = -0.6870983;
  this.B_im[6] = -1.1651967;
  this.C_re = [];
  this.C_im = [];
  this.C_re[1] = 1.3231270439;
  this.C_im[1] = 0;
  this.C_re[2] = -0.577245789;
  this.C_im[2] = -7809598e-9;
  this.C_re[3] = 0.508307513;
  this.C_im[3] = -0.112208952;
  this.C_re[4] = -0.15094762;
  this.C_im[4] = 0.18200602;
  this.C_re[5] = 1.01418179;
  this.C_im[5] = 1.64497696;
  this.C_re[6] = 1.9660549;
  this.C_im[6] = 2.5127645;
  this.D = [];
  this.D[1] = 1.5627014243;
  this.D[2] = 0.5185406398;
  this.D[3] = -0.03333098;
  this.D[4] = -0.1052906;
  this.D[5] = -0.0368594;
  this.D[6] = 7317e-6;
  this.D[7] = 0.0122;
  this.D[8] = 394e-5;
  this.D[9] = -13e-4;
}
__name(init20, "init");
function forward19(p) {
  var n;
  var lon = p.x;
  var lat = p.y;
  var delta_lat = lat - this.lat0;
  var delta_lon = lon - this.long0;
  var d_phi = delta_lat / SEC_TO_RAD * 1e-5;
  var d_lambda = delta_lon;
  var d_phi_n = 1;
  var d_psi = 0;
  for (n = 1; n <= 10; n++) {
    d_phi_n = d_phi_n * d_phi;
    d_psi = d_psi + this.A[n] * d_phi_n;
  }
  var th_re = d_psi;
  var th_im = d_lambda;
  var th_n_re = 1;
  var th_n_im = 0;
  var th_n_re1;
  var th_n_im1;
  var z_re = 0;
  var z_im = 0;
  for (n = 1; n <= 6; n++) {
    th_n_re1 = th_n_re * th_re - th_n_im * th_im;
    th_n_im1 = th_n_im * th_re + th_n_re * th_im;
    th_n_re = th_n_re1;
    th_n_im = th_n_im1;
    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
  }
  p.x = z_im * this.a + this.x0;
  p.y = z_re * this.a + this.y0;
  return p;
}
__name(forward19, "forward");
function inverse19(p) {
  var n;
  var x = p.x;
  var y = p.y;
  var delta_x = x - this.x0;
  var delta_y = y - this.y0;
  var z_re = delta_y / this.a;
  var z_im = delta_x / this.a;
  var z_n_re = 1;
  var z_n_im = 0;
  var z_n_re1;
  var z_n_im1;
  var th_re = 0;
  var th_im = 0;
  for (n = 1; n <= 6; n++) {
    z_n_re1 = z_n_re * z_re - z_n_im * z_im;
    z_n_im1 = z_n_im * z_re + z_n_re * z_im;
    z_n_re = z_n_re1;
    z_n_im = z_n_im1;
    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
  }
  for (var i = 0; i < this.iterations; i++) {
    var th_n_re = th_re;
    var th_n_im = th_im;
    var th_n_re1;
    var th_n_im1;
    var num_re = z_re;
    var num_im = z_im;
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }
    th_n_re = 1;
    th_n_im = 0;
    var den_re = this.B_re[1];
    var den_im = this.B_im[1];
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }
    var den2 = den_re * den_re + den_im * den_im;
    th_re = (num_re * den_re + num_im * den_im) / den2;
    th_im = (num_im * den_re - num_re * den_im) / den2;
  }
  var d_psi = th_re;
  var d_lambda = th_im;
  var d_psi_n = 1;
  var d_phi = 0;
  for (n = 1; n <= 9; n++) {
    d_psi_n = d_psi_n * d_psi;
    d_phi = d_phi + this.D[n] * d_psi_n;
  }
  var lat = this.lat0 + d_phi * SEC_TO_RAD * 1e5;
  var lon = this.long0 + d_lambda;
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse19, "inverse");
var names21 = ["New_Zealand_Map_Grid", "nzmg"];
var nzmg_default = {
  init: init20,
  forward: forward19,
  inverse: inverse19,
  names: names21,
  iterations
};

// node_modules/proj4/lib/projections/mill.js
function init21() {
}
__name(init21, "init");
function forward20(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  var x = this.x0 + this.a * dlon;
  var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
  p.x = x;
  p.y = y;
  return p;
}
__name(forward20, "forward");
function inverse20(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon = adjust_lon_default(this.long0 + p.x / this.a, this.over);
  var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse20, "inverse");
var names22 = ["Miller_Cylindrical", "mill"];
var mill_default = {
  init: init21,
  forward: forward20,
  inverse: inverse20,
  names: names22
};

// node_modules/proj4/lib/projections/sinu.js
var MAX_ITER4 = 20;
function init22() {
  this.long0 = this.long0 || 0;
  if (!this.sphere) {
    this.en = pj_enfn_default(this.es);
  } else {
    this.n = 1;
    this.m = 0;
    this.es = 0;
    this.C_y = Math.sqrt((this.m + 1) / this.n);
    this.C_x = this.C_y / (this.m + 1);
  }
}
__name(init22, "init");
function forward21(p) {
  var x, y;
  var lon = p.x;
  var lat = p.y;
  lon = adjust_lon_default(lon - this.long0, this.over);
  if (this.sphere) {
    if (!this.m) {
      lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
    } else {
      var k = this.n * Math.sin(lat);
      for (var i = MAX_ITER4; i; --i) {
        var V2 = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
        lat -= V2;
        if (Math.abs(V2) < EPSLN) {
          break;
        }
      }
    }
    x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
    y = this.a * this.C_y * lat;
  } else {
    var s = Math.sin(lat);
    var c = Math.cos(lat);
    y = this.a * pj_mlfn_default(lat, s, c, this.en);
    x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
  }
  p.x = x;
  p.y = y;
  return p;
}
__name(forward21, "forward");
function inverse21(p) {
  var lat, temp, lon, s;
  p.x -= this.x0;
  lon = p.x / this.a;
  p.y -= this.y0;
  lat = p.y / this.a;
  if (this.sphere) {
    lat /= this.C_y;
    lon = lon / (this.C_x * (this.m + Math.cos(lat)));
    if (this.m) {
      lat = asinz_default((this.m * lat + Math.sin(lat)) / this.n);
    } else if (this.n !== 1) {
      lat = asinz_default(Math.sin(lat) / this.n);
    }
    lon = adjust_lon_default(lon + this.long0, this.over);
    lat = adjust_lat_default(lat);
  } else {
    lat = pj_inv_mlfn_default(p.y / this.a, this.es, this.en);
    s = Math.abs(lat);
    if (s < HALF_PI) {
      s = Math.sin(lat);
      temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
      lon = adjust_lon_default(temp, this.over);
    } else if (s - EPSLN < HALF_PI) {
      lon = this.long0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse21, "inverse");
var names23 = ["Sinusoidal", "sinu"];
var sinu_default = {
  init: init22,
  forward: forward21,
  inverse: inverse21,
  names: names23
};

// node_modules/proj4/lib/projections/eck6.js
function init23() {
  this.sphere = true;
  this.b = this.a;
  this.m = 1;
  this.n = 2.5707963267948966;
  this.es = 0;
  this.C_y = Math.sqrt((this.m + 1) / this.n);
  this.C_x = this.C_y / (this.m + 1);
}
__name(init23, "init");
var forward22 = forward21;
var inverse22 = inverse21;
var names24 = ["Eckert_VI", "eck6"];
var eck6_default = {
  init: init23,
  forward: forward22,
  inverse: inverse22,
  names: names24
};

// node_modules/proj4/lib/projections/moll.js
function init24() {
  this.x0 = this.x0 !== void 0 ? this.x0 : 0;
  this.y0 = this.y0 !== void 0 ? this.y0 : 0;
  this.long0 = this.long0 !== void 0 ? this.long0 : 0;
}
__name(init24, "init");
function forward23(p) {
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon_default(lon - this.long0, this.over);
  var theta = lat;
  var con = Math.PI * Math.sin(lat);
  while (true) {
    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
    theta += delta_theta;
    if (Math.abs(delta_theta) < EPSLN) {
      break;
    }
  }
  theta /= 2;
  if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
    delta_lon = 0;
  }
  var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
  var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;
  p.x = x;
  p.y = y;
  return p;
}
__name(forward23, "forward");
function inverse23(p) {
  var theta;
  var arg;
  p.x -= this.x0;
  p.y -= this.y0;
  arg = p.y / (1.4142135623731 * this.a);
  if (Math.abs(arg) > 0.999999999999) {
    arg = 0.999999999999;
  }
  theta = Math.asin(arg);
  var lon = adjust_lon_default(this.long0 + p.x / (0.900316316158 * this.a * Math.cos(theta)), this.over);
  if (lon < -Math.PI) {
    lon = -Math.PI;
  }
  if (lon > Math.PI) {
    lon = Math.PI;
  }
  arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
  if (Math.abs(arg) > 1) {
    arg = 1;
  }
  var lat = Math.asin(arg);
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse23, "inverse");
var names25 = ["Mollweide", "moll"];
var moll_default = {
  init: init24,
  forward: forward23,
  inverse: inverse23,
  names: names25
};

// node_modules/proj4/lib/projections/eqdc.js
function init25() {
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.lat2 = this.lat2 || this.lat1;
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn_default(this.es);
  this.e1 = e1fn_default(this.es);
  this.e2 = e2fn_default(this.es);
  this.e3 = e3fn_default(this.es);
  this.sin_phi = Math.sin(this.lat1);
  this.cos_phi = Math.cos(this.lat1);
  this.ms1 = msfnz_default(this.e, this.sin_phi, this.cos_phi);
  this.ml1 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat1);
  if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
    this.ns = this.sin_phi;
  } else {
    this.sin_phi = Math.sin(this.lat2);
    this.cos_phi = Math.cos(this.lat2);
    this.ms2 = msfnz_default(this.e, this.sin_phi, this.cos_phi);
    this.ml2 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat2);
    this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
  }
  this.g = this.ml1 + this.ms1 / this.ns;
  this.ml0 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
  this.rh = this.a * (this.g - this.ml0);
}
__name(init25, "init");
function forward24(p) {
  var lon = p.x;
  var lat = p.y;
  var rh1;
  if (this.sphere) {
    rh1 = this.a * (this.g - lat);
  } else {
    var ml = mlfn_default(this.e0, this.e1, this.e2, this.e3, lat);
    rh1 = this.a * (this.g - ml);
  }
  var theta = this.ns * adjust_lon_default(lon - this.long0, this.over);
  var x = this.x0 + rh1 * Math.sin(theta);
  var y = this.y0 + this.rh - rh1 * Math.cos(theta);
  p.x = x;
  p.y = y;
  return p;
}
__name(forward24, "forward");
function inverse24(p) {
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  var con, rh1, lat, lon;
  if (this.ns >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  if (this.sphere) {
    lon = adjust_lon_default(this.long0 + theta / this.ns, this.over);
    lat = adjust_lat_default(this.g - rh1 / this.a);
    p.x = lon;
    p.y = lat;
    return p;
  } else {
    var ml = this.g - rh1 / this.a;
    lat = imlfn_default(ml, this.e0, this.e1, this.e2, this.e3);
    lon = adjust_lon_default(this.long0 + theta / this.ns, this.over);
    p.x = lon;
    p.y = lat;
    return p;
  }
}
__name(inverse24, "inverse");
var names26 = ["Equidistant_Conic", "eqdc"];
var eqdc_default = {
  init: init25,
  forward: forward24,
  inverse: inverse24,
  names: names26
};

// node_modules/proj4/lib/projections/vandg.js
function init26() {
  this.R = this.a;
}
__name(init26, "init");
function forward25(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  var x, y;
  if (Math.abs(lat) <= EPSLN) {
    x = this.x0 + this.R * dlon;
    y = this.y0;
    p.x = x;
    p.y = y;
    return p;
  }
  var theta = asinz_default(2 * Math.abs(lat / Math.PI));
  if (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    x = this.x0;
    if (lat >= 0) {
      y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
    } else {
      y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
    }
    p.x = x;
    p.y = y;
    return p;
  }
  var al = 0.5 * Math.abs(Math.PI / dlon - dlon / Math.PI);
  var asq = al * al;
  var sinth = Math.sin(theta);
  var costh = Math.cos(theta);
  var g = costh / (sinth + costh - 1);
  var gsq = g * g;
  var m = g * (2 / sinth - 1);
  var msq = m * m;
  var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
  if (dlon < 0) {
    con = -con;
  }
  x = this.x0 + con;
  var q = asq + g;
  con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
  if (lat >= 0) {
    y = this.y0 + con;
  } else {
    y = this.y0 - con;
  }
  p.x = x;
  p.y = y;
  return p;
}
__name(forward25, "forward");
function inverse25(p) {
  var lon, lat;
  var xx, yy, xys, c1, c2, c3;
  var a1;
  var m1;
  var con;
  var th1;
  var d;
  p.x -= this.x0;
  p.y -= this.y0;
  con = Math.PI * this.R;
  xx = p.x / con;
  yy = p.y / con;
  xys = xx * xx + yy * yy;
  c1 = -Math.abs(yy) * (1 + xys);
  c2 = c1 - 2 * yy * yy + xx * xx;
  c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
  d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
  a1 = (c1 - c2 * c2 / 3 / c3) / c3;
  m1 = 2 * Math.sqrt(-a1 / 3);
  con = 3 * d / a1 / m1;
  if (Math.abs(con) > 1) {
    if (con >= 0) {
      con = 1;
    } else {
      con = -1;
    }
  }
  th1 = Math.acos(con) / 3;
  if (p.y >= 0) {
    lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  } else {
    lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }
  if (Math.abs(xx) < EPSLN) {
    lon = this.long0;
  } else {
    lon = adjust_lon_default(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx, this.over);
  }
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse25, "inverse");
var names27 = ["Van_der_Grinten_I", "VanDerGrinten", "Van_der_Grinten", "vandg"];
var vandg_default = {
  init: init26,
  forward: forward25,
  inverse: inverse25,
  names: names27
};

// node_modules/proj4/lib/common/vincenty.js
function vincentyInverse(lat1, lon1, lat2, lon2, a, f) {
  const L = lon2 - lon1;
  const U1 = Math.atan((1 - f) * Math.tan(lat1));
  const U2 = Math.atan((1 - f) * Math.tan(lat2));
  const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
  let lambda = L, lambdaP, iterLimit = 100;
  let sinLambda, cosLambda, sinSigma, cosSigma, sigma, sinAlpha, cos2Alpha, cos2SigmaM, C;
  let uSq, A5, B, deltaSigma, s;
  do {
    sinLambda = Math.sin(lambda);
    cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(
      cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
    );
    if (sinSigma === 0) {
      return { azi1: 0, s12: 0 };
    }
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
    cos2Alpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cos2Alpha !== 0 ? cosSigma - 2 * sinU1 * sinU2 / cos2Alpha : 0;
    C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
    lambdaP = lambda;
    lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
  if (iterLimit === 0) {
    return { azi1: NaN, s12: NaN };
  }
  uSq = cos2Alpha * (a * a - a * (1 - f) * (a * (1 - f))) / (a * (1 - f) * (a * (1 - f)));
  A5 = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
  s = a * (1 - f) * A5 * (sigma - deltaSigma);
  const azi1 = Math.atan2(cosU2 * sinLambda, cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
  return { azi1, s12: s };
}
__name(vincentyInverse, "vincentyInverse");
function vincentyDirect(lat1, lon1, azi1, s12, a, f) {
  const U1 = Math.atan((1 - f) * Math.tan(lat1));
  const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
  const sinAlpha1 = Math.sin(azi1), cosAlpha1 = Math.cos(azi1);
  const sigma1 = Math.atan2(sinU1, cosU1 * cosAlpha1);
  const sinAlpha = cosU1 * sinAlpha1;
  const cos2Alpha = 1 - sinAlpha * sinAlpha;
  const uSq = cos2Alpha * (a * a - a * (1 - f) * (a * (1 - f))) / (a * (1 - f) * (a * (1 - f)));
  const A5 = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  let sigma = s12 / (a * (1 - f) * A5), sigmaP, iterLimit = 100;
  let cos2SigmaM, sinSigma, cosSigma, deltaSigma;
  do {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    sinSigma = Math.sin(sigma);
    cosSigma = Math.cos(sigma);
    deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s12 / (a * (1 - f) * A5) + deltaSigma;
  } while (Math.abs(sigma - sigmaP) > 1e-12 && --iterLimit > 0);
  if (iterLimit === 0) {
    return { lat2: NaN, lon2: NaN };
  }
  const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  const lat2 = Math.atan2(
    sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp)
  );
  const lambda = Math.atan2(
    sinSigma * sinAlpha1,
    cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1
  );
  const C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
  const L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  const lon2 = lon1 + L;
  return { lat2, lon2 };
}
__name(vincentyDirect, "vincentyDirect");

// node_modules/proj4/lib/projections/aeqd.js
function init27() {
  this.sin_p12 = Math.sin(this.lat0);
  this.cos_p12 = Math.cos(this.lat0);
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.long0 = this.long0 || 0;
  this.f = this.es / (1 + Math.sqrt(1 - this.es));
}
__name(init27, "init");
function forward26(p) {
  var lon = p.x;
  var lat = p.y;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  var e0, e1, e2, e3, Mlp, Ml, c, kp, cos_c, vars, azi1;
  if (this.sphere) {
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
      p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
      p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
      return p;
    } else {
      cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
      c = Math.acos(cos_c);
      kp = c ? c / Math.sin(c) : 1;
      p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
      p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
      return p;
    }
  } else {
    e0 = e0fn_default(this.es);
    e1 = e1fn_default(this.es);
    e2 = e2fn_default(this.es);
    e3 = e3fn_default(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn_default(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
      p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn_default(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
      p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
      return p;
    } else {
      if (Math.abs(lon) < EPSLN && Math.abs(lat - this.lat0) < EPSLN) {
        p.x = this.x0;
        p.y = this.y0;
        return p;
      }
      vars = vincentyInverse(this.lat0, this.long0, lat, lon, this.a, this.f);
      azi1 = vars.azi1;
      p.x = this.x0 + vars.s12 * Math.sin(azi1);
      p.y = this.y0 + vars.s12 * Math.cos(azi1);
      return p;
    }
  }
}
__name(forward26, "forward");
function inverse26(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M2, azi1, s12, vars;
  if (this.sphere) {
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (rh > 2 * HALF_PI * this.a) {
      return;
    }
    z = rh / this.a;
    sinz = Math.sin(z);
    cosz = Math.cos(z);
    lon = this.long0;
    if (Math.abs(rh) <= EPSLN) {
      lat = this.lat0;
    } else {
      lat = asinz_default(cosz * this.sin_p12 + p.y * sinz * this.cos_p12 / rh);
      con = Math.abs(this.lat0) - HALF_PI;
      if (Math.abs(con) <= EPSLN) {
        if (this.lat0 >= 0) {
          lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -p.y), this.over);
        } else {
          lon = adjust_lon_default(this.long0 - Math.atan2(-p.x, p.y), this.over);
        }
      } else {
        lon = adjust_lon_default(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz), this.over);
      }
    }
    p.x = lon;
    p.y = lat;
    return p;
  } else {
    e0 = e0fn_default(this.es);
    e1 = e1fn_default(this.es);
    e2 = e2fn_default(this.es);
    e3 = e3fn_default(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M2 = Mlp - rh;
      lat = imlfn_default(M2 / this.a, e0, e1, e2, e3);
      lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
      p.x = lon;
      p.y = lat;
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M2 = rh - Mlp;
      lat = imlfn_default(M2 / this.a, e0, e1, e2, e3);
      lon = adjust_lon_default(this.long0 + Math.atan2(p.x, p.y), this.over);
      p.x = lon;
      p.y = lat;
      return p;
    } else {
      azi1 = Math.atan2(p.x, p.y);
      s12 = Math.sqrt(p.x * p.x + p.y * p.y);
      vars = vincentyDirect(this.lat0, this.long0, azi1, s12, this.a, this.f);
      p.x = vars.lon2;
      p.y = vars.lat2;
      return p;
    }
  }
}
__name(inverse26, "inverse");
var names28 = ["Azimuthal_Equidistant", "aeqd"];
var aeqd_default = {
  init: init27,
  forward: forward26,
  inverse: inverse26,
  names: names28
};

// node_modules/proj4/lib/projections/ortho.js
function init28() {
  this.sin_p14 = Math.sin(this.lat0 || 0);
  this.cos_p14 = Math.cos(this.lat0 || 0);
}
__name(init28, "init");
function forward27(p) {
  var sinphi, cosphi;
  var dlon;
  var coslon;
  var ksp;
  var g, x, y;
  var lon = p.x;
  var lat = p.y;
  dlon = adjust_lon_default(lon - (this.long0 || 0), this.over);
  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);
  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if (g > 0 || Math.abs(g) <= EPSLN) {
    x = (this.x0 || 0) + this.a * ksp * cosphi * Math.sin(dlon);
    y = (this.y0 || 0) + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p.x = x;
  p.y = y;
  return p;
}
__name(forward27, "forward");
function inverse27(p) {
  var rh;
  var z;
  var sinz, cosz;
  var con;
  var lon, lat;
  var long0, lat0;
  p.x -= this.x0 || 0;
  p.y -= this.y0 || 0;
  rh = Math.sqrt(p.x * p.x + p.y * p.y);
  z = asinz_default(rh / this.a);
  sinz = Math.sin(z);
  cosz = Math.cos(z);
  long0 = this.long0 || 0;
  lat0 = this.lat0 || 0;
  lon = long0;
  if (Math.abs(rh) <= EPSLN) {
    lat = lat0;
    p.x = lon;
    p.y = lat;
    return p;
  }
  lat = asinz_default(cosz * this.sin_p14 + p.y * sinz * this.cos_p14 / rh);
  con = Math.abs(lat0) - HALF_PI;
  if (Math.abs(con) <= EPSLN) {
    if (lat0 >= 0) {
      lon = adjust_lon_default(long0 + Math.atan2(p.x, -p.y), this.over);
    } else {
      lon = adjust_lon_default(long0 - Math.atan2(-p.x, p.y), this.over);
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  lon = adjust_lon_default(long0 + Math.atan2(p.x * sinz, rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz), this.over);
  p.x = lon;
  p.y = lat;
  return p;
}
__name(inverse27, "inverse");
var names29 = ["ortho"];
var ortho_default = {
  init: init28,
  forward: forward27,
  inverse: inverse27,
  names: names29
};

// node_modules/proj4/lib/projections/qsc.js
var FACE_ENUM = {
  FRONT: 1,
  RIGHT: 2,
  BACK: 3,
  LEFT: 4,
  TOP: 5,
  BOTTOM: 6
};
var AREA_ENUM = {
  AREA_0: 1,
  AREA_1: 2,
  AREA_2: 3,
  AREA_3: 4
};
function init29() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Quadrilateralized Spherical Cube";
  if (this.lat0 >= HALF_PI - FORTPI / 2) {
    this.face = FACE_ENUM.TOP;
  } else if (this.lat0 <= -(HALF_PI - FORTPI / 2)) {
    this.face = FACE_ENUM.BOTTOM;
  } else if (Math.abs(this.long0) <= FORTPI) {
    this.face = FACE_ENUM.FRONT;
  } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
    this.face = this.long0 > 0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
  } else {
    this.face = FACE_ENUM.BACK;
  }
  if (this.es !== 0) {
    this.one_minus_f = 1 - (this.a - this.b) / this.a;
    this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
  }
}
__name(init29, "init");
function forward28(p) {
  var xy = { x: 0, y: 0 };
  var lat, lon;
  var theta, phi;
  var t, mu;
  var area = { value: 0 };
  p.x -= this.long0;
  if (this.es !== 0) {
    lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
  } else {
    lat = p.y;
  }
  lon = p.x;
  if (this.face === FACE_ENUM.TOP) {
    phi = HALF_PI - lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = lon - HALF_PI;
    } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_1;
      theta = lon > 0 ? lon - SPI : lon + SPI;
    } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
      area.value = AREA_ENUM.AREA_2;
      theta = lon + HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = HALF_PI + lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = -lon + HALF_PI;
    } else if (lon < FORTPI && lon >= -FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta = -lon;
    } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = -lon - HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon > 0 ? -lon + SPI : -lon - SPI;
    }
  } else {
    var q, r, s;
    var sinlat, coslat;
    var sinlon, coslon;
    if (this.face === FACE_ENUM.RIGHT) {
      lon = qsc_shift_lon_origin(lon, +HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lon = qsc_shift_lon_origin(lon, +SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lon = qsc_shift_lon_origin(lon, -HALF_PI);
    }
    sinlat = Math.sin(lat);
    coslat = Math.cos(lat);
    sinlon = Math.sin(lon);
    coslon = Math.cos(lon);
    q = coslat * coslon;
    r = coslat * sinlon;
    s = sinlat;
    if (this.face === FACE_ENUM.FRONT) {
      phi = Math.acos(q);
      theta = qsc_fwd_equat_face_theta(phi, s, r, area);
    } else if (this.face === FACE_ENUM.RIGHT) {
      phi = Math.acos(r);
      theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
    } else if (this.face === FACE_ENUM.BACK) {
      phi = Math.acos(-q);
      theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
    } else if (this.face === FACE_ENUM.LEFT) {
      phi = Math.acos(-r);
      theta = qsc_fwd_equat_face_theta(phi, s, q, area);
    } else {
      phi = theta = 0;
      area.value = AREA_ENUM.AREA_0;
    }
  }
  mu = Math.atan(12 / SPI * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
  t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));
  if (area.value === AREA_ENUM.AREA_1) {
    mu += HALF_PI;
  } else if (area.value === AREA_ENUM.AREA_2) {
    mu += SPI;
  } else if (area.value === AREA_ENUM.AREA_3) {
    mu += 1.5 * SPI;
  }
  xy.x = t * Math.cos(mu);
  xy.y = t * Math.sin(mu);
  xy.x = xy.x * this.a + this.x0;
  xy.y = xy.y * this.a + this.y0;
  p.x = xy.x;
  p.y = xy.y;
  return p;
}
__name(forward28, "forward");
function inverse28(p) {
  var lp = { lam: 0, phi: 0 };
  var mu, nu, cosmu, tannu;
  var tantheta, theta, cosphi, phi;
  var t;
  var area = { value: 0 };
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
  mu = Math.atan2(p.y, p.x);
  if (p.x >= 0 && p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_0;
  } else if (p.y >= 0 && p.y >= Math.abs(p.x)) {
    area.value = AREA_ENUM.AREA_1;
    mu -= HALF_PI;
  } else if (p.x < 0 && -p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_2;
    mu = mu < 0 ? mu + SPI : mu - SPI;
  } else {
    area.value = AREA_ENUM.AREA_3;
    mu += HALF_PI;
  }
  t = SPI / 12 * Math.tan(mu);
  tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2));
  theta = Math.atan(tantheta);
  cosmu = Math.cos(mu);
  tannu = Math.tan(nu);
  cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
  if (cosphi < -1) {
    cosphi = -1;
  } else if (cosphi > 1) {
    cosphi = 1;
  }
  if (this.face === FACE_ENUM.TOP) {
    phi = Math.acos(cosphi);
    lp.phi = HALF_PI - phi;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = theta < 0 ? theta + SPI : theta - SPI;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = theta - HALF_PI;
    } else {
      lp.lam = theta;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = Math.acos(cosphi);
    lp.phi = phi - HALF_PI;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = -theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = -theta;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = -theta - HALF_PI;
    } else {
      lp.lam = theta < 0 ? -theta - SPI : -theta + SPI;
    }
  } else {
    var q, r, s;
    q = cosphi;
    t = q * q;
    if (t >= 1) {
      s = 0;
    } else {
      s = Math.sqrt(1 - t) * Math.sin(theta);
    }
    t += s * s;
    if (t >= 1) {
      r = 0;
    } else {
      r = Math.sqrt(1 - t);
    }
    if (area.value === AREA_ENUM.AREA_1) {
      t = r;
      r = -s;
      s = t;
    } else if (area.value === AREA_ENUM.AREA_2) {
      r = -r;
      s = -s;
    } else if (area.value === AREA_ENUM.AREA_3) {
      t = r;
      r = s;
      s = -t;
    }
    if (this.face === FACE_ENUM.RIGHT) {
      t = q;
      q = -r;
      r = t;
    } else if (this.face === FACE_ENUM.BACK) {
      q = -q;
      r = -r;
    } else if (this.face === FACE_ENUM.LEFT) {
      t = q;
      q = r;
      r = -t;
    }
    lp.phi = Math.acos(-s) - HALF_PI;
    lp.lam = Math.atan2(r, q);
    if (this.face === FACE_ENUM.RIGHT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
    }
  }
  if (this.es !== 0) {
    var invert_sign;
    var tanphi, xa;
    invert_sign = lp.phi < 0 ? 1 : 0;
    tanphi = Math.tan(lp.phi);
    xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
    lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
    if (invert_sign) {
      lp.phi = -lp.phi;
    }
  }
  lp.lam += this.long0;
  p.x = lp.lam;
  p.y = lp.phi;
  return p;
}
__name(inverse28, "inverse");
function qsc_fwd_equat_face_theta(phi, y, x, area) {
  var theta;
  if (phi < EPSLN) {
    area.value = AREA_ENUM.AREA_0;
    theta = 0;
  } else {
    theta = Math.atan2(y, x);
    if (Math.abs(theta) <= FORTPI) {
      area.value = AREA_ENUM.AREA_0;
    } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta -= HALF_PI;
    } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = theta >= 0 ? theta - SPI : theta + SPI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta += HALF_PI;
    }
  }
  return theta;
}
__name(qsc_fwd_equat_face_theta, "qsc_fwd_equat_face_theta");
function qsc_shift_lon_origin(lon, offset) {
  var slon = lon + offset;
  if (slon < -SPI) {
    slon += TWO_PI;
  } else if (slon > +SPI) {
    slon -= TWO_PI;
  }
  return slon;
}
__name(qsc_shift_lon_origin, "qsc_shift_lon_origin");
var names30 = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
var qsc_default = {
  init: init29,
  forward: forward28,
  inverse: inverse28,
  names: names30
};

// node_modules/proj4/lib/projections/robin.js
var COEFS_X = [
  [1, 22199e-21, -715515e-10, 31103e-10],
  [0.9986, -482243e-9, -24897e-9, -13309e-10],
  [0.9954, -83103e-8, -448605e-10, -986701e-12],
  [0.99, -135364e-8, -59661e-9, 36777e-10],
  [0.9822, -167442e-8, -449547e-11, -572411e-11],
  [0.973, -214868e-8, -903571e-10, 18736e-12],
  [0.96, -305085e-8, -900761e-10, 164917e-11],
  [0.9427, -382792e-8, -653386e-10, -26154e-10],
  [0.9216, -467746e-8, -10457e-8, 481243e-11],
  [0.8962, -536223e-8, -323831e-10, -543432e-11],
  [0.8679, -609363e-8, -113898e-9, 332484e-11],
  [0.835, -698325e-8, -640253e-10, 934959e-12],
  [0.7986, -755338e-8, -500009e-10, 935324e-12],
  [0.7597, -798324e-8, -35971e-9, -227626e-11],
  [0.7186, -851367e-8, -701149e-10, -86303e-10],
  [0.6732, -986209e-8, -199569e-9, 191974e-10],
  [0.6213, -0.010418, 883923e-10, 624051e-11],
  [0.5722, -906601e-8, 182e-6, 624051e-11],
  [0.5322, -677797e-8, 275608e-9, 624051e-11]
];
var COEFS_Y = [
  [-520417e-23, 0.0124, 121431e-23, -845284e-16],
  [0.062, 0.0124, -126793e-14, 422642e-15],
  [0.124, 0.0124, 507171e-14, -160604e-14],
  [0.186, 0.0123999, -190189e-13, 600152e-14],
  [0.248, 0.0124002, 710039e-13, -224e-10],
  [0.31, 0.0123992, -264997e-12, 835986e-13],
  [0.372, 0.0124029, 988983e-12, -311994e-12],
  [0.434, 0.0123893, -369093e-11, -435621e-12],
  [0.4958, 0.0123198, -102252e-10, -345523e-12],
  [0.5571, 0.0121916, -154081e-10, -582288e-12],
  [0.6176, 0.0119938, -241424e-10, -525327e-12],
  [0.6769, 0.011713, -320223e-10, -516405e-12],
  [0.7346, 0.0113541, -397684e-10, -609052e-12],
  [0.7903, 0.0109107, -489042e-10, -104739e-11],
  [0.8435, 0.0103431, -64615e-9, -140374e-14],
  [0.8936, 969686e-8, -64636e-9, -8547e-9],
  [0.9394, 840947e-8, -192841e-9, -42106e-10],
  [0.9761, 616527e-8, -256e-6, -42106e-10],
  [1, 328947e-8, -319159e-9, -42106e-10]
];
var FXC = 0.8487;
var FYC = 1.3523;
var C1 = R2D / 5;
var RC1 = 1 / C1;
var NODES = 18;
var poly3_val = /* @__PURE__ */ __name(function(coefs, x) {
  return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
}, "poly3_val");
var poly3_der = /* @__PURE__ */ __name(function(coefs, x) {
  return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
}, "poly3_der");
function newton_rapshon(f_df, start2, max_err, iters) {
  var x = start2;
  for (; iters; --iters) {
    var upd = f_df(x);
    x -= upd;
    if (Math.abs(upd) < max_err) {
      break;
    }
  }
  return x;
}
__name(newton_rapshon, "newton_rapshon");
function init30() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.long0 = this.long0 || 0;
  this.es = 0;
  this.title = this.title || "Robinson";
}
__name(init30, "init");
function forward29(ll) {
  var lon = adjust_lon_default(ll.x - this.long0, this.over);
  var dphi = Math.abs(ll.y);
  var i = Math.floor(dphi * C1);
  if (i < 0) {
    i = 0;
  } else if (i >= NODES) {
    i = NODES - 1;
  }
  dphi = R2D * (dphi - RC1 * i);
  var xy = {
    x: poly3_val(COEFS_X[i], dphi) * lon,
    y: poly3_val(COEFS_Y[i], dphi)
  };
  if (ll.y < 0) {
    xy.y = -xy.y;
  }
  xy.x = xy.x * this.a * FXC + this.x0;
  xy.y = xy.y * this.a * FYC + this.y0;
  if (ll.z !== void 0) {
    xy.z = ll.z;
  }
  if (ll.m !== void 0) {
    xy.m = ll.m;
  }
  return xy;
}
__name(forward29, "forward");
function inverse29(xy) {
  var ll = {
    x: (xy.x - this.x0) / (this.a * FXC),
    y: Math.abs(xy.y - this.y0) / (this.a * FYC)
  };
  if (ll.y >= 1) {
    ll.x /= COEFS_X[NODES][0];
    ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
  } else {
    var i = Math.floor(ll.y * NODES);
    if (i < 0) {
      i = 0;
    } else if (i >= NODES) {
      i = NODES - 1;
    }
    for (; ; ) {
      if (COEFS_Y[i][0] > ll.y) {
        --i;
      } else if (COEFS_Y[i + 1][0] <= ll.y) {
        ++i;
      } else {
        break;
      }
    }
    var coefs = COEFS_Y[i];
    var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i + 1][0] - coefs[0]);
    t = newton_rapshon(function(x) {
      return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
    }, t, EPSLN, 100);
    ll.x /= poly3_val(COEFS_X[i], t);
    ll.y = (5 * i + t) * D2R;
    if (xy.y < 0) {
      ll.y = -ll.y;
    }
  }
  ll.x = adjust_lon_default(ll.x + this.long0, this.over);
  if (xy.z !== void 0) {
    ll.z = xy.z;
  }
  if (xy.m !== void 0) {
    ll.m = xy.m;
  }
  return ll;
}
__name(inverse29, "inverse");
var names31 = ["Robinson", "robin"];
var robin_default = {
  init: init30,
  forward: forward29,
  inverse: inverse29,
  names: names31
};

// node_modules/proj4/lib/projections/geocent.js
function init31() {
  this.name = "geocent";
}
__name(init31, "init");
function forward30(p) {
  var point = geodeticToGeocentric(p, this.es, this.a);
  return point;
}
__name(forward30, "forward");
function inverse30(p) {
  var point = geocentricToGeodetic(p, this.es, this.a, this.b);
  return point;
}
__name(inverse30, "inverse");
var names32 = ["Geocentric", "geocentric", "geocent", "Geocent"];
var geocent_default = {
  init: init31,
  forward: forward30,
  inverse: inverse30,
  names: names32
};

// node_modules/proj4/lib/projections/tpers.js
var mode = {
  N_POLE: 0,
  S_POLE: 1,
  EQUIT: 2,
  OBLIQ: 3
};
var params = {
  h: { def: 1e5, num: true },
  // default is Karman line, no default in PROJ.7
  azi: { def: 0, num: true, degrees: true },
  // default is North
  tilt: { def: 0, num: true, degrees: true },
  // default is Nadir
  long0: { def: 0, num: true },
  // default is Greenwich, conversion to rad is automatic
  lat0: { def: 0, num: true }
  // default is Equator, conversion to rad is automatic
};
function init32() {
  Object.keys(params).forEach(function(p) {
    if (typeof this[p] === "undefined") {
      this[p] = params[p].def;
    } else if (params[p].num && isNaN(this[p])) {
      throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
    } else if (params[p].num) {
      this[p] = parseFloat(this[p]);
    }
    if (params[p].degrees) {
      this[p] = this[p] * D2R;
    }
  }.bind(this));
  if (Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
  } else if (Math.abs(this.lat0) < EPSLN) {
    this.mode = mode.EQUIT;
  } else {
    this.mode = mode.OBLIQ;
    this.sinph0 = Math.sin(this.lat0);
    this.cosph0 = Math.cos(this.lat0);
  }
  this.pn1 = this.h / this.a;
  if (this.pn1 <= 0 || this.pn1 > 1e10) {
    throw new Error("Invalid height");
  }
  this.p = 1 + this.pn1;
  this.rp = 1 / this.p;
  this.h1 = 1 / this.pn1;
  this.pfact = (this.p + 1) * this.h1;
  this.es = 0;
  var omega = this.tilt;
  var gamma = this.azi;
  this.cg = Math.cos(gamma);
  this.sg = Math.sin(gamma);
  this.cw = Math.cos(omega);
  this.sw = Math.sin(omega);
}
__name(init32, "init");
function forward31(p) {
  p.x -= this.long0;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var coslam = Math.cos(p.x);
  var x, y;
  switch (this.mode) {
    case mode.OBLIQ:
      y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y = cosphi * coslam;
      break;
    case mode.S_POLE:
      y = -sinphi;
      break;
    case mode.N_POLE:
      y = sinphi;
      break;
  }
  y = this.pn1 / (this.p - y);
  x = y * cosphi * Math.sin(p.x);
  switch (this.mode) {
    case mode.OBLIQ:
      y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y *= sinphi;
      break;
    case mode.N_POLE:
      y *= -(cosphi * coslam);
      break;
    case mode.S_POLE:
      y *= cosphi * coslam;
      break;
  }
  var yt, ba;
  yt = y * this.cg + x * this.sg;
  ba = 1 / (yt * this.sw * this.h1 + this.cw);
  x = (x * this.cg - y * this.sg) * this.cw * ba;
  y = yt * ba;
  p.x = x * this.a;
  p.y = y * this.a;
  return p;
}
__name(forward31, "forward");
function inverse31(p) {
  p.x /= this.a;
  p.y /= this.a;
  var r = { x: p.x, y: p.y };
  var bm, bq, yt;
  yt = 1 / (this.pn1 - p.y * this.sw);
  bm = this.pn1 * p.x * yt;
  bq = this.pn1 * p.y * this.cw * yt;
  p.x = bm * this.cg + bq * this.sg;
  p.y = bq * this.cg - bm * this.sg;
  var rh = hypot_default(p.x, p.y);
  if (Math.abs(rh) < EPSLN) {
    r.x = 0;
    r.y = p.y;
  } else {
    var cosz, sinz;
    sinz = 1 - rh * rh * this.pfact;
    sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
    cosz = Math.sqrt(1 - sinz * sinz);
    switch (this.mode) {
      case mode.OBLIQ:
        r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
        p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
        p.x *= sinz * this.cosph0;
        break;
      case mode.EQUIT:
        r.y = Math.asin(p.y * sinz / rh);
        p.y = cosz * rh;
        p.x *= sinz;
        break;
      case mode.N_POLE:
        r.y = Math.asin(cosz);
        p.y = -p.y;
        break;
      case mode.S_POLE:
        r.y = -Math.asin(cosz);
        break;
    }
    r.x = Math.atan2(p.x, p.y);
  }
  p.x = r.x + this.long0;
  p.y = r.y;
  return p;
}
__name(inverse31, "inverse");
var names33 = ["Tilted_Perspective", "tpers"];
var tpers_default = {
  init: init32,
  forward: forward31,
  inverse: inverse31,
  names: names33
};

// node_modules/proj4/lib/projections/geos.js
function init33() {
  this.flip_axis = this.sweep === "x" ? 1 : 0;
  this.h = Number(this.h);
  this.radius_g_1 = this.h / this.a;
  if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
    throw new Error();
  }
  this.radius_g = 1 + this.radius_g_1;
  this.C = this.radius_g * this.radius_g - 1;
  if (this.es !== 0) {
    var one_es = 1 - this.es;
    var rone_es = 1 / one_es;
    this.radius_p = Math.sqrt(one_es);
    this.radius_p2 = one_es;
    this.radius_p_inv2 = rone_es;
    this.shape = "ellipse";
  } else {
    this.radius_p = 1;
    this.radius_p2 = 1;
    this.radius_p_inv2 = 1;
    this.shape = "sphere";
  }
  if (!this.title) {
    this.title = "Geostationary Satellite View";
  }
}
__name(init33, "init");
function forward32(p) {
  var lon = p.x;
  var lat = p.y;
  var tmp, v_x, v_y, v_z;
  lon = lon - this.long0;
  if (this.shape === "ellipse") {
    lat = Math.atan(this.radius_p2 * Math.tan(lat));
    var r = this.radius_p / hypot_default(this.radius_p * Math.cos(lat), Math.sin(lat));
    v_x = r * Math.cos(lon) * Math.cos(lat);
    v_y = r * Math.sin(lon) * Math.cos(lat);
    v_z = r * Math.sin(lat);
    if ((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2 < 0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    tmp = this.radius_g - v_x;
    if (this.flip_axis) {
      p.x = this.radius_g_1 * Math.atan(v_y / hypot_default(v_z, tmp));
      p.y = this.radius_g_1 * Math.atan(v_z / tmp);
    } else {
      p.x = this.radius_g_1 * Math.atan(v_y / tmp);
      p.y = this.radius_g_1 * Math.atan(v_z / hypot_default(v_y, tmp));
    }
  } else if (this.shape === "sphere") {
    tmp = Math.cos(lat);
    v_x = Math.cos(lon) * tmp;
    v_y = Math.sin(lon) * tmp;
    v_z = Math.sin(lat);
    tmp = this.radius_g - v_x;
    if (this.flip_axis) {
      p.x = this.radius_g_1 * Math.atan(v_y / hypot_default(v_z, tmp));
      p.y = this.radius_g_1 * Math.atan(v_z / tmp);
    } else {
      p.x = this.radius_g_1 * Math.atan(v_y / tmp);
      p.y = this.radius_g_1 * Math.atan(v_z / hypot_default(v_y, tmp));
    }
  }
  p.x = p.x * this.a;
  p.y = p.y * this.a;
  return p;
}
__name(forward32, "forward");
function inverse32(p) {
  var v_x = -1;
  var v_y = 0;
  var v_z = 0;
  var a, b, det, k;
  p.x = p.x / this.a;
  p.y = p.y / this.a;
  if (this.shape === "ellipse") {
    if (this.flip_axis) {
      v_z = Math.tan(p.y / this.radius_g_1);
      v_y = Math.tan(p.x / this.radius_g_1) * hypot_default(1, v_z);
    } else {
      v_y = Math.tan(p.x / this.radius_g_1);
      v_z = Math.tan(p.y / this.radius_g_1) * hypot_default(1, v_y);
    }
    var v_zp = v_z / this.radius_p;
    a = v_y * v_y + v_zp * v_zp + v_x * v_x;
    b = 2 * this.radius_g * v_x;
    det = b * b - 4 * a * this.C;
    if (det < 0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    k = (-b - Math.sqrt(det)) / (2 * a);
    v_x = this.radius_g + k * v_x;
    v_y *= k;
    v_z *= k;
    p.x = Math.atan2(v_y, v_x);
    p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
    p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y));
  } else if (this.shape === "sphere") {
    if (this.flip_axis) {
      v_z = Math.tan(p.y / this.radius_g_1);
      v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1 + v_z * v_z);
    } else {
      v_y = Math.tan(p.x / this.radius_g_1);
      v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1 + v_y * v_y);
    }
    a = v_y * v_y + v_z * v_z + v_x * v_x;
    b = 2 * this.radius_g * v_x;
    det = b * b - 4 * a * this.C;
    if (det < 0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    k = (-b - Math.sqrt(det)) / (2 * a);
    v_x = this.radius_g + k * v_x;
    v_y *= k;
    v_z *= k;
    p.x = Math.atan2(v_y, v_x);
    p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
  }
  p.x = p.x + this.long0;
  return p;
}
__name(inverse32, "inverse");
var names34 = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
var geos_default = {
  init: init33,
  forward: forward32,
  inverse: inverse32,
  names: names34
};

// node_modules/proj4/lib/projections/eqearth.js
var A1 = 1.340264;
var A2 = -0.081106;
var A3 = 893e-6;
var A4 = 3796e-6;
var M = Math.sqrt(3) / 2;
function init34() {
  this.long0 = this.long0 !== void 0 ? this.long0 : 0;
  this.x0 = this.x0 !== void 0 ? this.x0 : 0;
  this.y0 = this.y0 !== void 0 ? this.y0 : 0;
  if (this.es !== 0) {
    this.apa = authset(this.es);
    this.qp = qsfnz_default(this.e, 1);
    this.rqda = Math.sqrt(0.5 * this.qp);
  }
}
__name(init34, "init");
function forward33(p) {
  var lam = adjust_lon_default(p.x - this.long0, this.over);
  var phi = p.y;
  var sinphi = Math.sin(phi);
  if (this.es !== 0) {
    sinphi = qsfnz_default(this.e, sinphi) / this.qp;
  }
  var paramLat = Math.asin(M * sinphi), paramLatSq = paramLat * paramLat, paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
  p.x = lam * Math.cos(paramLat) / (M * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
  p.y = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
  if (this.es !== 0) {
    p.x *= this.rqda;
    p.y *= this.rqda;
  }
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}
__name(forward33, "forward");
function inverse33(p) {
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  if (this.es !== 0) {
    p.x /= this.rqda;
    p.y /= this.rqda;
  }
  var EPS = 1e-9, NITER = 12, paramLat = p.y, paramLatSq, paramLatPow6, fy, fpy, dlat, i;
  for (i = 0; i < NITER; ++i) {
    paramLatSq = paramLat * paramLat;
    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
    fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - p.y;
    fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
    paramLat -= dlat = fy / fpy;
    if (Math.abs(dlat) < EPS) {
      break;
    }
  }
  paramLatSq = paramLat * paramLat;
  paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
  p.x = M * p.x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat);
  p.y = Math.asin(Math.sin(paramLat) / M);
  if (this.es !== 0) {
    p.y = authlat(p.y, this.apa);
  }
  p.x = adjust_lon_default(p.x + this.long0, this.over);
  return p;
}
__name(inverse33, "inverse");
var names35 = ["eqearth", "Equal Earth", "Equal_Earth"];
var eqearth_default = {
  init: init34,
  forward: forward33,
  inverse: inverse33,
  names: names35
};

// node_modules/proj4/lib/projections/bonne.js
var EPS10 = 1e-10;
function init35() {
  var c;
  this.phi1 = this.lat1;
  if (Math.abs(this.phi1) < EPS10) {
    throw new Error();
  }
  if (this.es) {
    this.en = pj_enfn_default(this.es);
    this.m1 = pj_mlfn_default(
      this.phi1,
      this.am1 = Math.sin(this.phi1),
      c = Math.cos(this.phi1),
      this.en
    );
    this.am1 = c / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1);
    this.inverse = e_inv;
    this.forward = e_fwd;
  } else {
    if (Math.abs(this.phi1) + EPS10 >= HALF_PI) {
      this.cphi1 = 0;
    } else {
      this.cphi1 = 1 / Math.tan(this.phi1);
    }
    this.inverse = s_inv;
    this.forward = s_fwd;
  }
}
__name(init35, "init");
function e_fwd(p) {
  var lam = adjust_lon_default(p.x - (this.long0 || 0), this.over);
  var phi = p.y;
  var rh, E, c;
  rh = this.am1 + this.m1 - pj_mlfn_default(phi, E = Math.sin(phi), c = Math.cos(phi), this.en);
  E = c * lam / (rh * Math.sqrt(1 - this.es * E * E));
  p.x = rh * Math.sin(E);
  p.y = this.am1 - rh * Math.cos(E);
  p.x = this.a * p.x + (this.x0 || 0);
  p.y = this.a * p.y + (this.y0 || 0);
  return p;
}
__name(e_fwd, "e_fwd");
function e_inv(p) {
  p.x = (p.x - (this.x0 || 0)) / this.a;
  p.y = (p.y - (this.y0 || 0)) / this.a;
  var s, rh, lam, phi;
  rh = hypot_default(p.x, p.y = this.am1 - p.y);
  phi = pj_inv_mlfn_default(this.am1 + this.m1 - rh, this.es, this.en);
  if ((s = Math.abs(phi)) < HALF_PI) {
    s = Math.sin(phi);
    lam = rh * Math.atan2(p.x, p.y) * Math.sqrt(1 - this.es * s * s) / Math.cos(phi);
  } else if (Math.abs(s - HALF_PI) <= EPS10) {
    lam = 0;
  } else {
    throw new Error();
  }
  p.x = adjust_lon_default(lam + (this.long0 || 0), this.over);
  p.y = adjust_lat_default(phi);
  return p;
}
__name(e_inv, "e_inv");
function s_fwd(p) {
  var lam = adjust_lon_default(p.x - (this.long0 || 0), this.over);
  var phi = p.y;
  var E, rh;
  rh = this.cphi1 + this.phi1 - phi;
  if (Math.abs(rh) > EPS10) {
    p.x = rh * Math.sin(E = lam * Math.cos(phi) / rh);
    p.y = this.cphi1 - rh * Math.cos(E);
  } else {
    p.x = p.y = 0;
  }
  p.x = this.a * p.x + (this.x0 || 0);
  p.y = this.a * p.y + (this.y0 || 0);
  return p;
}
__name(s_fwd, "s_fwd");
function s_inv(p) {
  p.x = (p.x - (this.x0 || 0)) / this.a;
  p.y = (p.y - (this.y0 || 0)) / this.a;
  var lam, phi;
  var rh = hypot_default(p.x, p.y = this.cphi1 - p.y);
  phi = this.cphi1 + this.phi1 - rh;
  if (Math.abs(phi) > HALF_PI) {
    throw new Error();
  }
  if (Math.abs(Math.abs(phi) - HALF_PI) <= EPS10) {
    lam = 0;
  } else {
    lam = rh * Math.atan2(p.x, p.y) / Math.cos(phi);
  }
  p.x = adjust_lon_default(lam + (this.long0 || 0), this.over);
  p.y = adjust_lat_default(phi);
  return p;
}
__name(s_inv, "s_inv");
var names36 = ["bonne", "Bonne (Werner lat_1=90)"];
var bonne_default = {
  init: init35,
  names: names36
};

// node_modules/proj4/lib/projections/ob_tran.js
var projectionType = {
  OBLIQUE: {
    forward: forwardOblique,
    inverse: inverseOblique
  },
  TRANSVERSE: {
    forward: forwardTransverse,
    inverse: inverseTransverse
  }
};
var paramSets = {
  ROTATE: {
    o_alpha: "oAlpha",
    o_lon_c: "oLongC",
    o_lat_c: "oLatC"
  },
  NEW_POLE: {
    o_lat_p: "oLatP",
    o_lon_p: "oLongP"
  },
  NEW_EQUATOR: {
    o_lon_1: "oLong1",
    o_lat_1: "oLat1",
    o_lon_2: "oLong2",
    o_lat_2: "oLat2"
  }
};
function init36() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.long0 = this.long0 || 0;
  this.title = this.title || "General Oblique Transformation";
  this.isIdentity = names2.includes(this.o_proj);
  if (!this.o_proj) {
    throw new Error("Missing parameter: o_proj");
  }
  if (this.o_proj === `ob_tran`) {
    throw new Error("Invalid value for o_proj: " + this.o_proj);
  }
  const newProjStr = this.projStr.replace("+proj=ob_tran", "").replace("+o_proj=", "+proj=").trim();
  const oProj = Proj_default(newProjStr);
  if (!oProj) {
    throw new Error("Invalid parameter: o_proj. Unknown projection " + this.o_proj);
  }
  oProj.long0 = 0;
  this.obliqueProjection = oProj;
  let matchedSet;
  const paramSetsKeys = Object.keys(paramSets);
  const parseParam = /* @__PURE__ */ __name((name) => {
    if (typeof this[name] === `undefined`) {
      return void 0;
    }
    const val = parseFloat(this[name]) * D2R;
    if (isNaN(val)) {
      throw new Error("Invalid value for " + name + ": " + this[name]);
    }
    return val;
  }, "parseParam");
  for (let i = 0; i < paramSetsKeys.length; i++) {
    const setKey = paramSetsKeys[i];
    const set = paramSets[setKey];
    const params2 = Object.entries(set);
    const setHasParams = params2.some(
      ([p]) => typeof this[p] !== "undefined"
    );
    if (!setHasParams) {
      continue;
    }
    matchedSet = set;
    for (let ii = 0; ii < params2.length; ii++) {
      const [inputParam, param] = params2[ii];
      const val = parseParam(inputParam);
      if (typeof val === "undefined") {
        throw new Error("Missing parameter: " + inputParam + ".");
      }
      this[param] = val;
    }
    break;
  }
  if (!matchedSet) {
    throw new Error("No valid parameters provided for ob_tran projection.");
  }
  const { lamp, phip } = createRotation(this, matchedSet);
  this.lamp = lamp;
  if (Math.abs(phip) > EPSLN) {
    this.cphip = Math.cos(phip);
    this.sphip = Math.sin(phip);
    this.projectionType = projectionType.OBLIQUE;
  } else {
    this.projectionType = projectionType.TRANSVERSE;
  }
}
__name(init36, "init");
function forward34(p) {
  return this.projectionType.forward(this, p);
}
__name(forward34, "forward");
function inverse34(p) {
  return this.projectionType.inverse(this, p);
}
__name(inverse34, "inverse");
function createRotation(params2, how) {
  let phip, lamp;
  if (how === paramSets.ROTATE) {
    let lamc = params2.oLongC;
    let phic = params2.oLatC;
    let alpha = params2.oAlpha;
    if (Math.abs(Math.abs(phic) - HALF_PI) <= EPSLN) {
      throw new Error("Invalid value for o_lat_c: " + params2.o_lat_c + " should be < 90\xB0");
    }
    lamp = lamc + Math.atan2(-1 * Math.cos(alpha), -1 * Math.sin(alpha) * Math.sin(phic));
    phip = Math.asin(Math.cos(phic) * Math.sin(alpha));
  } else if (how === paramSets.NEW_POLE) {
    lamp = params2.oLongP;
    phip = params2.oLatP;
  } else {
    let lam1 = params2.oLong1;
    let phi1 = params2.oLat1;
    let lam2 = params2.oLong2;
    let phi2 = params2.oLat2;
    let con = Math.abs(phi1);
    if (Math.abs(phi1) > HALF_PI - EPSLN) {
      throw new Error("Invalid value for o_lat_1: " + params2.o_lat_1 + " should be < 90\xB0");
    }
    if (Math.abs(phi2) > HALF_PI - EPSLN) {
      throw new Error("Invalid value for o_lat_2: " + params2.o_lat_2 + " should be < 90\xB0");
    }
    if (Math.abs(phi1 - phi2) < EPSLN) {
      throw new Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");
    }
    if (con < EPSLN) {
      throw new Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");
    }
    lamp = Math.atan2(
      Math.cos(phi1) * Math.sin(phi2) * Math.cos(lam1) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2),
      Math.sin(phi1) * Math.cos(phi2) * Math.sin(lam2) - Math.cos(phi1) * Math.sin(phi2) * Math.sin(lam1)
    );
    phip = Math.atan(-1 * Math.cos(lamp - lam1) / Math.tan(phi1));
  }
  return { lamp, phip };
}
__name(createRotation, "createRotation");
function forwardOblique(self, lp) {
  let { x: lam, y: phi } = lp;
  lam = adjust_lon_default(lam - self.long0, self.over);
  const coslam = Math.cos(lam);
  const sinphi = Math.sin(phi);
  const cosphi = Math.cos(phi);
  lp.x = adjust_lon_default(
    Math.atan2(
      cosphi * Math.sin(lam),
      self.sphip * cosphi * coslam + self.cphip * sinphi
    ) + self.lamp
  );
  lp.y = Math.asin(
    self.sphip * sinphi - self.cphip * cosphi * coslam
  );
  const result = self.obliqueProjection.forward(lp);
  if (self.isIdentity) {
    result.x *= R2D;
    result.y *= R2D;
  }
  return result;
}
__name(forwardOblique, "forwardOblique");
function forwardTransverse(self, lp) {
  let { x: lam, y: phi } = lp;
  lam = adjust_lon_default(lam - self.long0, self.over);
  const cosphi = Math.cos(phi);
  const coslam = Math.cos(lam);
  lp.x = adjust_lon_default(
    Math.atan2(
      cosphi * Math.sin(lam),
      Math.sin(phi)
    ) + self.lamp
  );
  lp.y = Math.asin(-1 * cosphi * coslam);
  const result = self.obliqueProjection.forward(lp);
  if (self.isIdentity) {
    result.x *= R2D;
    result.y *= R2D;
  }
  return result;
}
__name(forwardTransverse, "forwardTransverse");
function inverseOblique(self, lp) {
  if (self.isIdentity) {
    lp.x *= D2R;
    lp.y *= D2R;
  }
  const innerLp = self.obliqueProjection.inverse(lp);
  let { x: lam, y: phi } = innerLp;
  if (lam < Number.MAX_VALUE) {
    lam -= self.lamp;
    const coslam = Math.cos(lam);
    const sinphi = Math.sin(phi);
    const cosphi = Math.cos(phi);
    lp.x = Math.atan2(
      cosphi * Math.sin(lam),
      self.sphip * cosphi * coslam - self.cphip * sinphi
    );
    lp.y = Math.asin(
      self.sphip * sinphi + self.cphip * cosphi * coslam
    );
  }
  lp.x = adjust_lon_default(lp.x + self.long0);
  return lp;
}
__name(inverseOblique, "inverseOblique");
function inverseTransverse(self, lp) {
  if (self.isIdentity) {
    lp.x *= D2R;
    lp.y *= D2R;
  }
  const innerLp = self.obliqueProjection.inverse(lp);
  let { x: lam, y: phi } = innerLp;
  if (lam < Number.MAX_VALUE) {
    const cosphi = Math.cos(phi);
    lam -= self.lamp;
    lp.x = Math.atan2(
      cosphi * Math.sin(lam),
      -1 * Math.sin(phi)
    );
    lp.y = Math.asin(
      cosphi * Math.cos(lam)
    );
  }
  lp.x = adjust_lon_default(lp.x + self.long0);
  return lp;
}
__name(inverseTransverse, "inverseTransverse");
var names37 = ["General Oblique Transformation", "General_Oblique_Transformation", "ob_tran"];
var ob_tran_default = {
  init: init36,
  forward: forward34,
  inverse: inverse34,
  names: names37
};

// node_modules/proj4/projs.js
function projs_default(proj43) {
  proj43.Proj.projections.add(tmerc_default);
  proj43.Proj.projections.add(etmerc_default);
  proj43.Proj.projections.add(utm_default);
  proj43.Proj.projections.add(sterea_default);
  proj43.Proj.projections.add(stere_default);
  proj43.Proj.projections.add(somerc_default);
  proj43.Proj.projections.add(omerc_default);
  proj43.Proj.projections.add(lcc_default);
  proj43.Proj.projections.add(krovak_default);
  proj43.Proj.projections.add(cass_default);
  proj43.Proj.projections.add(laea_default);
  proj43.Proj.projections.add(aea_default);
  proj43.Proj.projections.add(gnom_default);
  proj43.Proj.projections.add(cea_default);
  proj43.Proj.projections.add(eqc_default);
  proj43.Proj.projections.add(poly_default);
  proj43.Proj.projections.add(nzmg_default);
  proj43.Proj.projections.add(mill_default);
  proj43.Proj.projections.add(sinu_default);
  proj43.Proj.projections.add(eck6_default);
  proj43.Proj.projections.add(moll_default);
  proj43.Proj.projections.add(eqdc_default);
  proj43.Proj.projections.add(vandg_default);
  proj43.Proj.projections.add(aeqd_default);
  proj43.Proj.projections.add(ortho_default);
  proj43.Proj.projections.add(qsc_default);
  proj43.Proj.projections.add(robin_default);
  proj43.Proj.projections.add(geocent_default);
  proj43.Proj.projections.add(tpers_default);
  proj43.Proj.projections.add(geos_default);
  proj43.Proj.projections.add(eqearth_default);
  proj43.Proj.projections.add(bonne_default);
  proj43.Proj.projections.add(ob_tran_default);
}
__name(projs_default, "default");

// node_modules/proj4/lib/index.js
var proj42 = Object.assign(core_default, {
  defaultDatum: "WGS84",
  Proj: Proj_default,
  WGS84: new Proj_default("WGS84"),
  Point: Point_default,
  toPoint: toPoint_default,
  defs: defs_default,
  nadgrid,
  transform,
  mgrs: mgrs_default,
  version: "__VERSION__"
});
projs_default(proj42);
var lib_default = proj42;

// src/ostn15-grid.json
var ostn15_grid_default = { minE: 0, minN: 0, step: 2e4, cols: 36, rows: 63, eastShifts: [90.75, 91.04, 91.331, 91.622, 91.913, 92.344, 92.724, 93.092, 93.42, 93.618, 93.708, 93.903, 94.077, 94.249, 94.493, 94.833, 95.098, 95.352, 95.651, 96.009, 96.309, 96.609, 97.001, 97.316, 97.386, 97.456, 97.549, 97.832, 98.278, 98.788, 99.298, 99.805, 100.237, 101.195, 102.152, 103.11, 90.74, 91.031, 91.322, 91.604, 91.88, 92.184, 92.636, 92.995, 93.281, 93.512, 93.705, 93.892, 94.062, 94.234, 94.407, 94.708, 94.923, 95.186, 95.457, 95.873, 96.173, 96.48, 96.931, 97.269, 97.339, 97.413, 97.558, 97.941, 98.387, 98.897, 99.407, 99.907, 100.404, 101.361, 102.319, 103.276, 90.723, 91.012, 91.302, 91.591, 91.87, 92.144, 92.425, 92.732, 93.065, 93.421, 93.705, 93.876, 94.048, 94.219, 94.344, 94.494, 94.757, 95.02, 95.282, 95.734, 96.037, 96.411, 96.861, 97.222, 97.292, 97.417, 97.667, 98.051, 98.496, 99.006, 99.502, 99.895, 100.57, 101.528, 102.485, 103.443, 90.723, 91.012, 91.302, 91.58, 91.854, 92.128, 92.406, 92.687, 92.972, 93.312, 93.615, 93.908, 94.012, 94.14, 94.305, 94.38, 94.59, 94.853, 95.116, 95.54, 95.9, 96.342, 96.792, 97.174, 97.28, 97.421, 97.777, 98.16, 98.605, 99.115, 99.583, 99.826, 100.736, 101.694, 102.652, 103.609, 90.723, 91.012, 91.289, 91.564, 91.838, 92.112, 92.386, 92.668, 92.949, 93.231, 93.497, 93.764, 93.949, 94.021, 94.08, 94.44, 94.713, 94.879, 95.061, 95.524, 95.795, 96.306, 96.784, 97.143, 97.284, 97.503, 97.886, 98.27, 98.714, 99.199, 99.693, 99.945, 100.903, 101.861, 102.818, 103.765, 90.723, 90.999, 91.274, 91.548, 91.822, 92.096, 92.371, 92.649, 92.93, 93.212, 93.457, 93.665, 93.844, 94, 94.256, 94.525, 94.705, 94.862, 95.242, 95.485, 95.87, 96.428, 96.842, 97.159, 97.318, 97.624, 97.971, 98.315, 98.809, 99.281, 99.624, 100.112, 101.069, 102.032, 102.911, 103.727, 90.709, 90.983, 91.258, 91.532, 91.806, 92.081, 92.355, 92.63, 92.911, 93.193, 93.462, 93.643, 93.819, 94.095, 94.385, 94.603, 94.911, 95.094, 95.4, 95.605, 95.913, 96.348, 96.87, 97.079, 97.383, 97.651, 97.916, 98.487, 98.912, 99.373, 99.57, 100.299, 101.189, 102.036, 102.851, 103.504, 90.693, 90.968, 91.242, 91.516, 91.791, 92.065, 92.339, 92.614, 92.892, 93.173, 93.467, 93.629, 93.939, 94.109, 94.285, 94.665, 94.972, 95.296, 95.507, 95.641, 95.951, 96.247, 96.739, 97.063, 97.531, 97.792, 97.982, 98.495, 99.093, 99.426, 99.892, 100.571, 101.192, 101.973, 102.626, 103.28, 90.678, 90.952, 91.226, 91.501, 91.775, 92.049, 92.323, 92.598, 92.872, 93.154, 93.473, 93.673, 93.959, 94.049, 94.372, 94.685, 94.951, 95.276, 95.558, 95.858, 96.098, 96.383, 96.566, 96.904, 97.655, 98.046, 98.226, 98.52, 99.144, 99.629, 100.044, 100.728, 101.454, 102.094, 102.734, 103.345, 90.319, 90.686, 91.054, 91.422, 91.759, 92.033, 92.308, 92.582, 92.856, 93.135, 93.467, 93.708, 93.971, 94.079, 94.523, 94.691, 95.046, 95.323, 95.649, 95.82, 96.162, 96.406, 96.647, 96.913, 97.578, 98.178, 98.431, 98.717, 99.156, 99.772, 100.187, 100.872, 101.612, 102.025, 102.555, 103.085, 89.919, 90.287, 90.654, 91.022, 91.389, 91.757, 92.125, 92.493, 92.833, 93.115, 93.467, 93.681, 93.914, 94.163, 94.373, 94.659, 95.007, 95.47, 95.688, 95.986, 96.162, 96.368, 96.732, 97.037, 97.454, 98.004, 98.364, 98.801, 99.383, 99.916, 100.346, 100.838, 101.628, 101.961, 102.295, 102.825, 89.519, 89.887, 90.254, 90.622, 90.99, 91.357, 91.732, 92.133, 92.533, 92.942, 93.214, 93.505, 93.85, 94.161, 94.338, 94.681, 95.037, 95.39, 95.759, 96.055, 96.211, 96.556, 96.773, 97.117, 97.526, 97.825, 98.559, 98.85, 99.383, 99.952, 100.446, 100.841, 101.631, 101.977, 102.31, 102.644, 89.119, 89.511, 89.911, 90.311, 90.696, 91.08, 91.464, 91.848, 92.238, 92.7, 93.044, 93.328, 93.719, 94.049, 94.298, 94.606, 95.028, 95.382, 95.714, 95.925, 96.278, 96.612, 97.024, 97.428, 97.857, 98.166, 98.559, 98.86, 99.418, 99.877, 100.415, 101.046, 101.624, 101.993, 102.326, 102.659, 88.76, 89.144, 89.528, 89.912, 90.296, 90.68, 91.064, 91.524, 91.986, 92.448, 92.807, 93.206, 93.602, 93.927, 94.214, 94.642, 94.737, 95.278, 95.634, 96.118, 96.426, 96.9, 97.314, 97.568, 98.136, 98.574, 98.855, 99.042, 99.564, 100.043, 100.439, 101.184, 101.644, 102.052, 102.415, 102.785, 88.36, 88.744, 89.128, 89.512, 89.896, 90.347, 90.81, 91.272, 91.734, 92.196, 92.612, 92.997, 93.436, 93.765, 94.211, 94.54, 94.814, 95.195, 95.742, 96.158, 96.532, 97.036, 97.551, 97.829, 98.337, 98.797, 99.085, 99.358, 99.991, 100.378, 100.811, 101.399, 101.869, 102.516, 102.862, 103.32, 87.96, 88.344, 88.728, 89.172, 89.633, 90.096, 90.558, 91.02, 91.482, 91.944, 92.406, 92.789, 93.274, 93.666, 94.219, 94.608, 94.836, 95.403, 95.765, 96.248, 96.711, 97.238, 97.579, 98.224, 98.635, 99.149, 99.553, 99.853, 100.361, 100.771, 101.288, 101.776, 102.317, 103.001, 103.541, 104.052, 87.56, 87.995, 88.457, 88.919, 89.382, 89.843, 90.306, 90.768, 91.23, 91.692, 92.154, 92.631, 93.138, 93.649, 94.179, 94.607, 94.791, 95.311, 95.836, 96.468, 96.772, 97.347, 97.745, 98.404, 98.915, 99.351, 99.811, 100.258, 100.704, 101.23, 101.493, 102.046, 102.56, 103.224, 104.04, 104.784, 87.281, 87.743, 88.205, 88.668, 89.156, 89.645, 90.133, 90.621, 91.11, 91.598, 92.087, 92.567, 93.205, 93.688, 94.154, 94.56, 95.042, 95.47, 96.061, 96.603, 97.112, 97.536, 98.176, 98.722, 99.187, 99.665, 100.12, 100.586, 101.195, 101.505, 101.898, 102.313, 102.93, 103.654, 104.379, 105.104, 87.121, 87.65, 88.178, 88.704, 89.193, 89.681, 90.17, 90.658, 91.147, 91.635, 92.124, 92.612, 93.192, 93.696, 94.183, 94.598, 94.984, 95.659, 96.123, 96.702, 97.11, 97.732, 98.311, 98.858, 99.417, 99.928, 100.485, 100.997, 101.777, 101.913, 102.275, 102.734, 103.185, 103.788, 104.546, 105.304, 86.721, 87.25, 87.778, 88.307, 88.835, 89.364, 89.893, 90.421, 90.95, 91.478, 92.007, 92.582, 93.176, 93.706, 94.178, 94.637, 95.139, 95.641, 96.145, 96.73, 97.334, 97.859, 98.401, 99.117, 99.682, 100.335, 100.78, 101.327, 101.877, 102.226, 102.684, 103.143, 103.602, 104.062, 104.626, 105.384, 86.321, 86.85, 87.378, 87.907, 88.435, 88.964, 89.492, 90.042, 90.656, 91.27, 91.884, 92.498, 93.273, 93.774, 94.151, 94.633, 95.075, 95.648, 96.251, 96.823, 97.268, 98.039, 98.649, 99.261, 99.946, 100.52, 101.15, 101.801, 102.176, 102.634, 103.093, 103.552, 104.012, 104.47, 104.93, 105.464, 85.921, 86.45, 86.978, 87.507, 88.116, 88.731, 89.344, 89.958, 90.573, 91.186, 91.801, 92.415, 93.111, 93.707, 94.196, 94.598, 95.124, 95.719, 96.177, 96.863, 97.519, 98.257, 98.872, 99.461, 100.199, 100.72, 101.398, 102.126, 102.584, 103.043, 103.503, 103.961, 104.421, 104.88, 105.339, 105.798, 85.577, 86.191, 86.805, 87.419, 88.033, 88.647, 89.261, 89.875, 90.489, 91.103, 91.717, 92.331, 93.065, 93.609, 94.125, 94.617, 95.088, 95.6, 96.412, 97.036, 97.793, 98.453, 99.073, 99.729, 100.334, 100.967, 101.64, 102.292, 102.786, 103.28, 103.775, 104.269, 104.763, 105.257, 105.748, 106.207, 85.44, 86.064, 86.688, 87.311, 87.936, 88.56, 89.178, 89.792, 90.405, 91.02, 91.634, 92.251, 92.996, 93.511, 94.027, 94.543, 95.049, 95.734, 96.575, 97.264, 97.981, 98.603, 99.213, 99.998, 100.621, 101.271, 101.864, 102.448, 102.942, 103.437, 103.931, 104.425, 104.919, 105.441, 105.966, 106.491, 85.131, 85.823, 86.447, 87.072, 87.696, 88.32, 88.944, 89.567, 90.191, 90.816, 91.44, 92.146, 92.966, 93.552, 94.13, 94.765, 95.444, 96.008, 96.668, 97.388, 98.02, 98.753, 99.422, 100.189, 100.868, 101.572, 102.139, 102.739, 103.304, 103.829, 104.354, 104.879, 105.404, 105.929, 106.454, 106.979, 84.731, 85.424, 86.116, 86.809, 87.456, 88.079, 88.703, 89.327, 89.952, 90.576, 91.2, 92.007, 92.858, 93.628, 94.29, 94.919, 95.732, 96.291, 96.893, 97.544, 98.201, 98.838, 99.681, 100.338, 101.091, 101.817, 102.416, 103.016, 103.615, 104.214, 104.813, 105.367, 105.892, 106.417, 106.942, 107.467, 84.331, 85.024, 85.716, 86.409, 87.101, 87.794, 88.463, 89.088, 89.711, 90.335, 90.959, 91.841, 92.734, 93.492, 94.191, 95.076, 95.826, 96.375, 97.066, 97.672, 98.42, 99.057, 99.812, 100.559, 101.262, 102.024, 102.757, 103.462, 103.999, 104.535, 105.09, 105.69, 106.289, 106.888, 107.43, 107.955, 83.931, 84.623, 85.316, 86.009, 86.701, 87.394, 88.086, 88.779, 89.471, 90.095, 90.719, 91.715, 92.595, 93.552, 94.463, 95.142, 95.846, 96.57, 97.206, 97.825, 98.559, 99.246, 99.976, 100.646, 101.461, 102.235, 103.008, 103.769, 104.545, 105.136, 105.672, 106.21, 106.747, 107.283, 107.82, 108.363, 83.635, 84.321, 85.007, 85.693, 86.379, 87.065, 87.751, 88.436, 89.122, 89.808, 90.557, 91.641, 92.62, 93.52, 94.327, 95.089, 95.914, 96.556, 97.284, 97.977, 98.628, 99.353, 100.063, 100.876, 101.661, 102.434, 103.208, 103.981, 104.754, 105.513, 106.273, 106.81, 107.346, 107.884, 108.42, 108.957, 83.527, 84.164, 84.85, 85.536, 86.222, 86.908, 87.593, 88.279, 88.965, 89.654, 90.702, 91.644, 92.708, 93.488, 94.285, 95.06, 95.876, 96.555, 97.37, 98.098, 98.675, 99.575, 100.22, 101.087, 101.86, 102.633, 103.407, 104.18, 104.954, 105.727, 106.501, 107.258, 107.947, 108.483, 109.02, 109.558, 83.14, 83.997, 84.733, 85.379, 86.064, 86.75, 87.436, 88.122, 88.808, 89.731, 90.72, 91.628, 92.524, 93.487, 94.304, 94.996, 95.815, 96.629, 97.401, 98.104, 98.856, 99.604, 100.487, 101.286, 102.059, 102.833, 103.606, 104.38, 105.153, 105.927, 106.7, 107.474, 108.247, 109.002, 109.62, 110.157, 82.74, 83.597, 84.453, 85.309, 85.939, 86.593, 87.279, 87.965, 88.872, 89.743, 90.691, 91.575, 92.527, 93.484, 94.288, 95.098, 95.904, 96.721, 97.444, 98.125, 98.917, 99.857, 100.712, 101.485, 102.259, 103.032, 103.806, 104.579, 105.353, 106.126, 106.9, 107.673, 108.447, 109.22, 109.994, 110.757, 82.34, 83.196, 84.053, 84.909, 85.765, 86.583, 87.145, 87.983, 88.974, 89.914, 90.806, 91.736, 92.518, 93.448, 94.164, 95.102, 96.012, 96.776, 97.488, 98.159, 99.03, 100.01, 100.903, 101.685, 102.459, 103.232, 104.005, 104.779, 105.552, 106.326, 107.099, 107.873, 108.646, 109.42, 110.193, 110.966, 82.288, 83.138, 83.987, 84.837, 85.686, 86.535, 87.353, 88.319, 89.219, 90.117, 91.017, 92.042, 92.792, 93.567, 94.358, 95.236, 96.071, 96.974, 97.547, 98.28, 98.939, 100.142, 100.874, 101.586, 102.299, 103.064, 103.85, 104.637, 105.424, 106.211, 106.998, 107.785, 108.572, 109.359, 110.146, 110.933, 82.619, 83.468, 84.317, 85.167, 86.016, 86.866, 87.657, 88.584, 89.475, 90.306, 91.267, 92.084, 92.901, 93.722, 94.655, 95.342, 96.226, 96.999, 97.666, 98.304, 99.112, 100.178, 100.891, 101.604, 102.316, 103.029, 103.742, 104.455, 105.224, 106.011, 106.798, 107.585, 108.372, 109.159, 109.946, 110.732, 83.016, 83.822, 84.648, 85.497, 86.346, 87.196, 87.962, 88.937, 89.783, 90.634, 91.458, 92.295, 93.086, 93.882, 94.714, 95.443, 96.264, 97.086, 97.813, 98.344, 99.283, 100.196, 100.908, 101.621, 102.334, 103.046, 103.759, 104.472, 105.185, 105.897, 106.611, 107.385, 108.172, 108.959, 109.746, 110.532, 83.416, 84.223, 85.029, 85.836, 86.676, 87.526, 88.391, 89.331, 90.066, 90.951, 91.753, 92.385, 93.234, 94.065, 94.86, 95.58, 96.352, 97.096, 97.892, 98.455, 99.455, 100.213, 100.926, 101.638, 102.351, 103.064, 103.777, 104.49, 105.202, 105.915, 106.628, 107.341, 108.053, 108.766, 109.545, 110.332, 83.816, 84.622, 85.429, 86.235, 87.042, 87.866, 88.777, 89.514, 90.316, 91.173, 91.888, 92.596, 93.405, 94.172, 94.992, 95.709, 96.47, 97.258, 97.979, 98.58, 99.446, 100.23, 100.944, 101.656, 102.369, 103.082, 103.794, 104.507, 105.22, 105.933, 106.645, 107.358, 108.071, 108.784, 109.497, 110.209, 84.192, 85.002, 85.811, 86.621, 87.43, 88.268, 88.935, 89.788, 90.583, 91.38, 92.109, 92.9, 93.686, 94.386, 95.146, 95.859, 96.607, 97.279, 98.067, 98.704, 99.47, 100.248, 100.961, 101.674, 102.386, 103.099, 103.812, 104.524, 105.237, 105.95, 106.663, 107.376, 108.089, 108.801, 109.513, 110.202, 84.652, 85.354, 86.149, 86.958, 87.815, 88.553, 89.308, 90.097, 90.818, 91.653, 92.451, 93.088, 93.835, 94.514, 95.35, 95.967, 96.625, 97.295, 98.015, 98.748, 99.553, 100.265, 100.978, 101.691, 102.404, 103.116, 103.829, 104.538, 105.227, 105.916, 106.605, 107.294, 107.974, 108.547, 109.119, 109.692, 85.252, 85.953, 86.654, 87.355, 88.147, 88.908, 89.674, 90.368, 91.195, 91.94, 92.724, 93.328, 94.025, 94.678, 95.452, 96.088, 96.728, 97.365, 98.092, 98.754, 99.563, 100.252, 100.941, 101.63, 102.32, 103.009, 103.698, 104.387, 105.076, 105.672, 106.245, 106.818, 107.39, 107.963, 108.535, 109.108, 85.852, 86.534, 87.144, 87.765, 88.539, 89.311, 90.06, 90.672, 91.429, 92.128, 92.864, 93.568, 94.238, 94.893, 95.543, 96.161, 96.807, 97.401, 98.135, 98.657, 99.348, 100.102, 100.791, 101.48, 102.169, 102.798, 103.37, 103.943, 104.515, 105.088, 105.661, 106.233, 106.806, 107.379, 107.952, 108.524, 86.336, 86.957, 87.579, 88.249, 88.982, 89.739, 90.441, 91.027, 91.75, 92.433, 93.127, 93.787, 94.393, 95.019, 95.701, 96.213, 96.801, 97.457, 98.087, 98.812, 99.317, 99.923, 100.495, 101.068, 101.641, 102.214, 102.786, 103.359, 103.932, 104.504, 105.077, 105.649, 106.222, 106.795, 107.367, 107.94, 86.771, 87.393, 88.035, 88.766, 89.398, 90.071, 90.642, 91.208, 92.047, 92.701, 93.339, 93.877, 94.463, 95.201, 95.817, 96.314, 96.755, 97.47, 98.179, 98.879, 99.528, 100.044, 100.554, 101.069, 101.624, 102.179, 102.734, 103.289, 103.844, 104.399, 104.954, 105.509, 106.064, 106.619, 107.174, 107.729, 87.207, 87.828, 88.494, 89.128, 89.722, 90.345, 91.018, 91.643, 92.418, 93.089, 93.547, 94.016, 94.634, 95.301, 95.968, 96.515, 96.91, 97.609, 98.334, 99.024, 99.606, 100.156, 100.712, 101.268, 101.793, 102.304, 102.814, 103.363, 103.918, 104.474, 105.028, 105.583, 106.138, 106.693, 107.248, 107.803, 87.661, 88.2, 88.862, 89.524, 90.181, 90.756, 91.331, 91.921, 92.716, 93.357, 93.963, 94.32, 94.919, 95.556, 96.147, 96.795, 97.231, 97.795, 98.537, 99.115, 99.643, 100.191, 100.747, 101.303, 101.858, 102.414, 102.97, 103.526, 104.054, 104.564, 105.102, 105.657, 106.212, 106.767, 107.322, 107.877, 87.897, 88.591, 89.262, 89.924, 90.581, 91.079, 91.694, 92.24, 93.07, 93.654, 94.265, 94.7, 95.211, 95.761, 96.321, 96.893, 97.498, 98.051, 98.638, 99.148, 99.68, 100.226, 100.782, 101.338, 101.894, 102.45, 103.005, 103.561, 104.117, 104.673, 105.229, 105.784, 106.315, 106.841, 107.396, 107.951, 88.242, 88.936, 89.63, 90.324, 90.932, 91.49, 92.132, 92.729, 93.371, 93.984, 94.573, 95.048, 95.49, 95.923, 96.474, 97.067, 97.62, 98.155, 98.674, 99.188, 99.717, 100.261, 100.817, 101.373, 101.928, 102.484, 103.04, 103.596, 104.152, 104.708, 105.263, 105.82, 106.375, 106.931, 107.487, 108.043, 88.542, 89.234, 89.925, 90.616, 91.301, 91.951, 92.571, 93.105, 93.747, 94.283, 94.819, 95.375, 95.851, 96.018, 96.627, 97.222, 97.747, 98.2, 98.708, 99.225, 99.755, 100.296, 100.852, 101.408, 101.964, 102.519, 103.075, 103.631, 104.187, 104.743, 105.298, 105.854, 106.41, 106.966, 107.522, 108.078, 88.806, 89.497, 90.187, 90.872, 91.558, 92.243, 92.911, 93.531, 94.142, 94.681, 95.219, 95.758, 96.06, 96.256, 96.738, 97.261, 97.846, 98.253, 98.741, 99.263, 99.792, 100.331, 100.887, 101.443, 101.998, 102.554, 103.11, 103.666, 104.222, 104.778, 105.334, 105.89, 106.445, 107.001, 107.563, 108.132, 89.069, 89.758, 90.443, 91.129, 91.814, 92.499, 93.185, 93.87, 94.49, 95.058, 95.596, 95.958, 96.238, 96.476, 96.928, 97.366, 98.016, 98.394, 98.771, 99.3, 99.829, 100.366, 100.922, 101.478, 102.033, 102.589, 103.145, 103.701, 104.257, 104.812, 105.368, 105.926, 106.495, 107.064, 107.633, 108.202, 89.329, 90.014, 90.699, 91.385, 92.07, 92.756, 93.441, 94.126, 94.811, 95.435, 95.858, 96.137, 96.417, 96.698, 97.117, 97.544, 97.964, 98.554, 98.888, 99.337, 99.866, 100.401, 100.957, 101.513, 102.068, 102.624, 103.18, 103.736, 104.292, 104.859, 105.427, 105.996, 106.565, 107.134, 107.703, 108.272, 89.585, 90.27, 90.956, 91.641, 92.326, 93.065, 93.807, 94.549, 95.291, 95.654, 96.14, 96.441, 96.742, 97.043, 97.349, 97.773, 98.19, 98.647, 99.083, 99.449, 99.904, 100.436, 100.992, 101.547, 102.103, 102.659, 103.222, 103.791, 104.36, 104.929, 105.497, 106.066, 106.635, 107.204, 107.773, 108.342, 90.355, 91.097, 91.839, 92.581, 93.323, 94.065, 94.807, 94.9, 94.988, 95.643, 96.181, 96.708, 97.139, 97.44, 97.741, 98.042, 98.456, 98.88, 99.29, 99.724, 100.018, 100.471, 101.027, 101.585, 102.153, 102.723, 103.292, 103.861, 104.43, 104.999, 105.567, 106.142, 106.722, 107.302, 107.883, 108.461, 91.355, 92.097, 92.839, 93.581, 94.323, 94.448, 94.175, 94.323, 94.98, 95.628, 96.171, 96.698, 97.225, 97.752, 98.138, 98.439, 98.74, 99.141, 99.563, 99.971, 100.326, 100.609, 101.147, 101.728, 102.308, 102.887, 103.467, 104.047, 104.628, 105.208, 105.783, 106.353, 106.923, 107.476, 108.016, 108.555, 92.355, 93.097, 93.839, 93.995, 93.722, 93.449, 93.657, 94.315, 94.972, 95.612, 96.161, 96.688, 97.215, 97.742, 98.269, 98.796, 99.137, 99.438, 99.825, 100.229, 100.645, 100.927, 101.373, 101.953, 102.533, 103.105, 103.675, 104.245, 104.815, 105.385, 105.927, 106.467, 107.006, 107.546, 108.086, 108.625, 93.355, 93.542, 93.27, 92.997, 92.724, 92.992, 93.649, 94.307, 94.964, 95.597, 96.151, 96.677, 97.205, 97.732, 98.259, 98.786, 99.313, 99.835, 100.136, 100.508, 100.895, 101.246, 101.607, 102.137, 102.708, 103.278, 103.838, 104.378, 104.918, 105.457, 105.997, 106.537, 107.076, 107.616, 108.156, 108.695, 92.817, 92.544, 92.272, 91.999, 92.327, 92.984, 93.641, 94.298, 94.956, 95.581, 96.14, 96.667, 97.194, 97.722, 98.249, 98.776, 99.303, 99.83, 100.357, 100.834, 101.193, 101.565, 101.847, 102.289, 102.829, 103.368, 103.908, 104.448, 104.988, 105.527, 106.067, 106.607, 107.146, 107.686, 108.226, 108.765, 91.819, 91.546, 91.274, 91.661, 92.318, 92.976, 93.633, 94.29, 94.948, 95.566, 96.126, 96.657, 97.184, 97.712, 98.238, 98.766, 99.293, 99.82, 100.347, 100.875, 101.401, 101.815, 102.047, 102.354, 102.894, 103.434, 103.973, 104.514, 105.054, 105.596, 106.15, 106.703, 107.257, 107.81, 108.364, 108.91, 90.821, 90.548, 90.996, 91.653, 92.31, 92.968, 93.625, 94.282, 94.939, 95.55, 96.11, 96.647, 97.174, 97.701, 98.228, 98.756, 99.283, 99.81, 100.337, 100.864, 101.391, 101.925, 102.39, 102.578, 103.131, 103.684, 104.238, 104.791, 105.345, 105.897, 106.432, 106.959, 107.466, 107.972, 108.479, 108.985, 89.823, 90.33, 90.988, 91.645, 92.302, 92.959, 93.617, 94.274, 94.931, 95.535, 96.095, 96.637, 97.164, 97.691, 98.218, 98.745, 99.273, 99.799, 100.327, 100.854, 101.384, 101.951, 102.54, 102.915, 103.419, 103.954, 104.489, 105.001, 105.507, 106.014, 106.52, 107.027, 107.534, 108.04, 108.547, 109.053, 89.665, 90.322, 90.979, 91.637, 92.294, 92.951, 93.609, 94.266, 94.923, 95.519, 96.079, 96.626, 97.154, 97.681, 98.208, 98.735, 99.262, 99.789, 100.317, 100.844, 101.385, 101.978, 102.522, 103.016, 103.537, 104.049, 104.562, 105.069, 105.575, 106.082, 106.588, 107.095, 107.602, 108.108, 108.615, 109.121, 89.657, 90.314, 90.971, 91.629, 92.286, 92.943, 93.6, 94.257, 94.915, 95.503, 96.063, 96.616, 97.144, 97.67, 98.198, 98.725, 99.252, 99.779, 100.307, 100.838, 101.395, 102.004, 102.504, 103.018, 103.561, 104.073, 104.585, 105.098, 105.61, 106.123, 106.635, 107.147, 107.659, 108.172, 108.683, 109.189], northShifts: [-82.02, -81.914, -81.807, -81.701, -81.595, -81.368, -81.209, -81.055, -80.843, -80.64, -80.511, -80.341, -80.297, -80.071, -80.356, -80.981, -81.716, -82.034, -82.255, -81.984, -81.558, -81.132, -81.052, -81.321, -81.894, -82.465, -82.904, -83.146, -83.331, -83.412, -83.491, -83.579, -83.844, -83.956, -84.068, -84.18, -81.442, -81.336, -81.23, -81.117, -81.057, -80.949, -80.8, -80.634, -80.419, -80.316, -80.146, -80.038, -80.009, -79.802, -79.722, -80.403, -80.988, -81.248, -81.499, -81.381, -80.955, -80.56, -80.692, -80.936, -81.507, -82.06, -82.216, -82.522, -82.704, -82.784, -82.863, -83.025, -83.299, -83.412, -83.524, -83.636, -80.909, -80.899, -80.889, -80.879, -80.808, -80.712, -80.477, -80.288, -80.126, -79.943, -79.774, -79.751, -79.722, -79.533, -79.227, -79.941, -80.201, -80.461, -80.721, -80.773, -80.353, -80.237, -80.331, -80.55, -81.121, -81.369, -81.591, -81.897, -82.076, -82.156, -82.277, -82.538, -82.755, -82.867, -82.979, -83.092, -80.721, -80.711, -80.701, -80.626, -80.53, -80.435, -80.271, -80.027, -79.789, -79.601, -79.463, -79.287, -79.289, -79.25, -79.216, -79.215, -79.415, -79.675, -79.934, -80.016, -79.75, -79.877, -79.97, -80.164, -80.526, -80.679, -80.967, -81.272, -81.448, -81.528, -81.732, -82.081, -82.211, -82.323, -82.435, -82.547, -80.533, -80.523, -80.443, -80.347, -80.252, -80.156, -80.06, -79.82, -79.577, -79.333, -79.184, -79.139, -79.14, -79.162, -79.172, -78.988, -78.959, -79.108, -79.302, -79.429, -79.402, -79.495, -79.572, -79.682, -79.835, -80.037, -80.342, -80.648, -80.82, -80.974, -81.181, -81.554, -81.666, -81.779, -81.891, -82.105, -80.345, -80.261, -80.165, -80.069, -79.974, -79.878, -79.783, -79.615, -79.371, -79.127, -79.013, -78.902, -78.861, -78.819, -78.743, -78.741, -78.798, -78.839, -78.968, -79.201, -79.109, -79.125, -79.225, -79.201, -79.347, -79.399, -79.735, -80.062, -80.231, -80.429, -80.724, -81.01, -81.122, -81.333, -81.676, -81.996, -80.078, -79.983, -79.887, -79.791, -79.695, -79.6, -79.504, -79.408, -79.165, -78.921, -78.795, -78.739, -78.544, -78.498, -78.602, -78.576, -78.626, -78.543, -78.746, -78.741, -78.878, -78.801, -78.865, -79.123, -79.176, -79.262, -79.532, -79.666, -79.737, -79.908, -80.247, -80.561, -80.889, -81.271, -81.555, -81.876, -79.8, -79.704, -79.609, -79.513, -79.417, -79.322, -79.226, -79.131, -78.959, -78.714, -78.577, -78.458, -78.294, -78.357, -78.351, -78.343, -78.334, -78.181, -78.203, -78.3, -78.354, -78.519, -78.607, -78.918, -78.942, -78.955, -79.083, -79.184, -79.436, -79.599, -79.757, -80.343, -80.822, -81.114, -81.435, -81.757, -79.522, -79.426, -79.331, -79.235, -79.139, -79.043, -78.948, -78.852, -78.753, -78.509, -78.359, -78.186, -78.062, -78.184, -78.046, -77.982, -77.986, -77.898, -77.97, -77.975, -78.03, -78.207, -78.357, -78.692, -78.82, -78.741, -78.812, -79.049, -78.975, -79.129, -79.593, -79.84, -80.339, -80.663, -80.986, -81.317, -78.73, -78.789, -78.849, -78.908, -78.861, -78.765, -78.67, -78.574, -78.479, -78.303, -78.134, -77.93, -77.837, -77.854, -77.678, -77.653, -77.698, -77.664, -77.642, -77.714, -77.871, -78.008, -78.063, -78.301, -78.428, -78.451, -78.482, -78.53, -78.602, -78.913, -79.228, -79.459, -79.801, -80.011, -80.364, -80.717, -77.849, -77.909, -77.969, -78.028, -78.088, -78.148, -78.208, -78.267, -78.202, -78.097, -77.894, -77.685, -77.593, -77.464, -77.469, -77.445, -77.267, -77.419, -77.586, -77.598, -77.791, -77.843, -77.927, -78.042, -78.078, -78.259, -78.29, -78.278, -78.413, -78.651, -78.893, -79.251, -79.538, -79.651, -79.764, -80.117, -76.969, -77.029, -77.089, -77.149, -77.208, -77.268, -77.348, -77.495, -77.642, -77.761, -77.602, -77.406, -77.213, -77.203, -77.116, -77.045, -77.1, -77.147, -77.444, -77.548, -77.596, -77.739, -77.76, -77.808, -77.899, -78.127, -77.994, -78.148, -78.229, -78.538, -78.752, -79.043, -79.268, -79.387, -79.5, -79.613, -76.09, -76.214, -76.361, -76.508, -76.622, -76.734, -76.845, -76.957, -77.077, -77.298, -77.308, -77.086, -76.984, -76.881, -76.827, -76.796, -76.623, -76.927, -77.125, -77.226, -77.361, -77.666, -77.611, -77.674, -77.765, -77.786, -77.832, -77.912, -78.042, -78.283, -78.486, -78.642, -78.992, -79.124, -79.237, -79.35, -75.385, -75.496, -75.609, -75.72, -75.831, -75.944, -76.055, -76.273, -76.495, -76.716, -76.854, -76.716, -76.674, -76.578, -76.558, -76.439, -76.457, -76.636, -76.917, -77.011, -77.16, -77.285, -77.554, -77.574, -77.523, -77.502, -77.558, -77.664, -77.948, -78.132, -78.312, -78.411, -78.803, -79.021, -79.145, -79.245, -74.595, -74.706, -74.819, -74.93, -75.041, -75.248, -75.47, -75.691, -75.912, -76.134, -76.36, -76.242, -76.222, -76.279, -76.23, -76.197, -76.319, -76.398, -76.489, -76.558, -76.689, -76.808, -77.248, -77.176, -77.025, -77.218, -77.398, -77.475, -77.564, -77.837, -78.031, -78.241, -78.539, -78.832, -78.871, -78.921, -73.805, -73.916, -74.028, -74.223, -74.445, -74.666, -74.888, -75.109, -75.331, -75.552, -75.774, -75.768, -75.753, -75.808, -75.708, -75.781, -75.874, -75.914, -76.027, -76.078, -76.261, -76.461, -76.616, -76.781, -76.806, -76.886, -77.093, -77.055, -77.217, -77.514, -77.793, -78.051, -78.263, -78.489, -78.57, -78.621, -73.015, -73.199, -73.42, -73.641, -73.863, -74.085, -74.306, -74.527, -74.749, -74.97, -75.192, -75.29, -75.263, -75.236, -75.177, -75.19, -75.251, -75.352, -75.426, -75.545, -75.798, -75.939, -76.11, -76.406, -76.481, -76.545, -76.689, -76.718, -77.003, -77.252, -77.479, -77.743, -77.937, -78.094, -78.182, -78.321, -72.395, -72.616, -72.838, -73.059, -73.275, -73.49, -73.706, -73.921, -74.136, -74.352, -74.567, -74.717, -74.723, -74.579, -74.65, -74.678, -74.759, -74.889, -74.92, -75.113, -75.361, -75.45, -75.609, -75.853, -76.051, -76.193, -76.351, -76.584, -76.71, -76.949, -77.1, -77.448, -77.586, -77.694, -77.801, -77.909, -71.784, -71.993, -72.202, -72.411, -72.626, -72.841, -73.057, -73.273, -73.488, -73.703, -73.919, -74.134, -74.226, -74.17, -74.172, -74.101, -74.242, -74.302, -74.479, -74.611, -74.794, -74.864, -75.076, -75.095, -75.408, -75.724, -75.949, -76.284, -76.472, -76.511, -76.684, -76.704, -76.726, -76.831, -76.986, -77.141, -71.209, -71.417, -71.625, -71.835, -72.043, -72.252, -72.461, -72.669, -72.878, -73.087, -73.296, -73.503, -73.58, -73.678, -73.631, -73.803, -73.811, -73.813, -73.797, -73.959, -74.042, -74.18, -74.471, -74.622, -74.897, -75.152, -75.414, -75.524, -75.869, -75.879, -75.899, -75.919, -75.939, -75.959, -76.046, -76.201, -70.632, -70.841, -71.05, -71.259, -71.467, -71.676, -71.885, -72.093, -72.299, -72.506, -72.713, -72.92, -73.129, -73.07, -72.967, -73.111, -73.221, -73.211, -73.228, -73.523, -73.562, -73.617, -73.907, -74.14, -74.289, -74.465, -74.802, -75.106, -75.075, -75.095, -75.114, -75.134, -75.154, -75.173, -75.194, -75.261, -70.056, -70.265, -70.474, -70.682, -70.889, -71.096, -71.303, -71.509, -71.716, -71.922, -72.129, -72.335, -72.522, -72.39, -72.279, -72.24, -72.515, -72.576, -72.773, -72.776, -72.745, -72.836, -73.186, -73.424, -73.652, -73.689, -74.032, -74.27, -74.289, -74.309, -74.329, -74.349, -74.369, -74.389, -74.408, -74.428, -69.479, -69.686, -69.892, -70.099, -70.305, -70.512, -70.718, -70.925, -71.131, -71.338, -71.544, -71.751, -71.833, -71.713, -71.6, -71.487, -71.625, -71.914, -71.902, -71.974, -72.089, -72.264, -72.601, -72.822, -73.049, -72.997, -73.29, -73.534, -73.547, -73.559, -73.572, -73.585, -73.597, -73.61, -73.624, -73.644, -68.874, -69.084, -69.294, -69.505, -69.716, -69.927, -70.134, -70.341, -70.547, -70.754, -70.961, -71.168, -71.149, -71.035, -70.922, -70.808, -70.723, -71.085, -71.089, -71.324, -71.538, -71.73, -71.864, -72.032, -72.273, -72.512, -72.696, -72.801, -72.814, -72.827, -72.839, -72.852, -72.865, -72.863, -72.859, -72.855, -68.257, -68.438, -68.648, -68.859, -69.069, -69.28, -69.491, -69.701, -69.911, -70.122, -70.333, -70.55, -70.422, -70.248, -70.096, -70.059, -70.033, -70.265, -70.429, -70.657, -70.735, -70.792, -71.05, -71.264, -71.573, -71.752, -71.925, -71.957, -71.972, -71.968, -71.964, -71.961, -71.957, -71.953, -71.949, -71.945, -67.681, -67.862, -68.042, -68.222, -68.423, -68.634, -68.844, -69.055, -69.266, -69.476, -69.686, -69.963, -69.507, -69.548, -69.542, -69.495, -69.47, -69.516, -69.717, -69.883, -69.954, -70.087, -70.268, -70.466, -70.699, -70.884, -70.915, -70.946, -70.978, -71.009, -71.04, -71.05, -71.046, -71.042, -71.039, -71.035, -67.106, -67.286, -67.467, -67.647, -67.827, -68.008, -68.198, -68.409, -68.619, -68.83, -69.04, -69.359, -69.1, -69.039, -69.056, -68.721, -68.825, -68.845, -69.046, -69.134, -69.256, -69.45, -69.728, -69.927, -70.038, -70.136, -70.209, -70.167, -70.113, -70.06, -70.03, -70.062, -70.093, -70.124, -70.129, -70.125, -66.53, -66.71, -66.89, -67.071, -67.251, -67.432, -67.612, -67.793, -67.973, -68.183, -68.394, -68.626, -68.546, -68.457, -68.266, -68.123, -68.179, -68.282, -68.376, -68.401, -68.557, -68.767, -68.924, -69.156, -69.185, -69.289, -69.394, -69.49, -69.54, -69.49, -69.437, -69.383, -69.329, -69.276, -69.222, -69.177, -65.784, -65.975, -66.167, -66.358, -66.549, -66.741, -66.932, -67.123, -67.315, -67.506, -67.645, -67.542, -67.55, -67.537, -67.488, -67.44, -67.486, -67.592, -67.708, -67.757, -67.917, -67.984, -68.205, -68.237, -68.332, -68.436, -68.54, -68.645, -68.749, -68.845, -68.867, -68.813, -68.76, -68.706, -68.652, -68.599, -64.841, -65.007, -65.198, -65.389, -65.581, -65.772, -65.963, -66.155, -66.346, -66.536, -66.517, -66.602, -66.762, -66.577, -66.655, -66.7, -66.796, -66.84, -66.826, -66.991, -67.119, -67.272, -67.357, -67.375, -67.479, -67.583, -67.687, -67.792, -67.896, -68, -68.104, -68.199, -68.19, -68.136, -68.083, -68.029, -64.255, -64.219, -64.25, -64.421, -64.612, -64.803, -64.995, -65.186, -65.377, -65.44, -65.573, -65.765, -65.876, -65.834, -65.865, -66.013, -66.047, -65.963, -66.091, -66.205, -66.271, -66.392, -66.437, -66.522, -66.626, -66.73, -66.834, -66.939, -67.043, -67.147, -67.251, -67.355, -67.46, -67.553, -67.513, -67.459, -63.677, -63.641, -63.605, -63.568, -63.66, -63.835, -64.026, -64.217, -64.303, -64.527, -64.599, -64.823, -65.018, -65.099, -65.134, -65.187, -65.269, -65.271, -65.344, -65.42, -65.533, -65.629, -65.564, -65.668, -65.773, -65.877, -65.981, -66.085, -66.19, -66.294, -66.398, -66.502, -66.607, -66.711, -66.815, -66.889, -63.099, -63.063, -63.027, -62.991, -62.954, -62.94, -63.07, -63.245, -63.443, -63.562, -63.709, -63.869, -64.045, -64.126, -64.261, -64.417, -64.532, -64.496, -64.521, -64.574, -64.567, -64.615, -64.718, -64.815, -64.92, -65.024, -65.129, -65.232, -65.337, -65.441, -65.546, -65.649, -65.754, -65.858, -65.963, -66.066, -62.333, -62.3, -62.268, -62.235, -62.203, -62.171, -62.157, -62.155, -62.431, -62.646, -62.882, -63.031, -63.129, -63.277, -63.433, -63.538, -63.59, -63.609, -63.851, -63.85, -63.904, -63.875, -64.019, -64.169, -64.318, -64.43, -64.525, -64.62, -64.715, -64.809, -64.904, -64.998, -65.093, -65.188, -65.282, -65.377, -61.359, -61.327, -61.295, -61.262, -61.23, -61.197, -61.199, -61.227, -61.484, -61.718, -61.985, -62.263, -62.33, -62.473, -62.602, -62.838, -62.756, -63.006, -63.005, -63.139, -63.126, -63.134, -63.284, -63.434, -63.584, -63.734, -63.885, -64.035, -64.142, -64.237, -64.332, -64.427, -64.521, -64.616, -64.711, -64.806, -59.994, -60.212, -60.322, -60.289, -60.256, -60.224, -60.241, -60.199, -60.616, -60.985, -61.218, -61.409, -61.577, -61.762, -61.922, -61.993, -62.055, -62.125, -62.159, -62.368, -62.349, -62.399, -62.55, -62.7, -62.85, -63, -63.15, -63.3, -63.45, -63.6, -63.75, -63.854, -63.949, -64.044, -64.139, -64.233, -58.614, -58.832, -59.049, -59.267, -59.283, -59.251, -59.325, -59.553, -59.877, -60.119, -60.368, -60.657, -60.804, -61, -61.149, -61.234, -61.314, -61.408, -61.416, -61.6, -61.572, -61.666, -61.816, -61.966, -62.116, -62.266, -62.416, -62.566, -62.716, -62.866, -63.017, -63.167, -63.317, -63.467, -63.567, -63.662, -57.235, -57.452, -57.67, -57.887, -58.105, -58.319, -58.551, -58.753, -59.026, -59.365, -59.618, -59.707, -59.941, -60.251, -60.373, -60.547, -60.579, -60.698, -60.729, -60.852, -60.826, -60.931, -61.081, -61.231, -61.381, -61.531, -61.682, -61.832, -61.982, -62.132, -62.282, -62.432, -62.582, -62.732, -62.882, -63.032, -56.233, -56.5, -56.766, -57.033, -57.299, -57.498, -57.762, -58.09, -58.249, -58.58, -58.812, -58.839, -59.016, -59.418, -59.62, -59.8, -59.896, -59.972, -60.138, -60.105, -60.071, -60.196, -60.347, -60.497, -60.647, -60.797, -60.947, -61.097, -61.247, -61.397, -61.547, -61.697, -61.848, -61.998, -62.149, -62.324, -55.304, -55.626, -55.9, -56.166, -56.396, -56.657, -56.982, -57.227, -57.538, -57.84, -58.132, -58.3, -58.519, -58.746, -58.975, -59.156, -59.265, -59.284, -59.4, -59.281, -59.312, -59.463, -59.613, -59.763, -59.913, -60.063, -60.213, -60.368, -60.543, -60.718, -60.893, -61.068, -61.258, -61.601, -61.945, -62.289, -54.305, -54.626, -54.947, -55.269, -55.562, -55.886, -56.206, -56.492, -56.762, -57.008, -57.458, -57.57, -57.763, -58.092, -58.279, -58.441, -58.535, -58.629, -58.651, -58.655, -58.585, -58.761, -58.936, -59.112, -59.287, -59.462, -59.637, -59.813, -59.988, -60.298, -60.641, -60.986, -61.33, -61.673, -62.017, -62.361, -53.305, -53.63, -53.988, -54.454, -54.595, -55.063, -55.518, -55.768, -55.95, -56.181, -56.708, -56.932, -57.137, -57.404, -57.603, -57.723, -57.925, -57.938, -58.001, -58.05, -58.027, -58.206, -58.381, -58.557, -58.732, -58.995, -59.338, -59.682, -60.026, -60.37, -60.713, -61.058, -61.402, -61.745, -62.089, -62.433, -52.462, -52.929, -53.395, -53.772, -54.117, -54.461, -54.853, -55.146, -55.427, -55.715, -56.069, -56.279, -56.576, -56.808, -56.98, -57.136, -57.228, -57.191, -57.316, -57.366, -57.51, -57.692, -58.035, -58.379, -58.723, -59.067, -59.41, -59.754, -60.098, -60.442, -60.785, -61.13, -61.473, -61.817, -62.161, -62.505, -51.869, -52.335, -52.764, -53.106, -53.587, -53.9, -54.244, -54.604, -54.753, -54.982, -55.338, -55.732, -55.997, -56.21, -56.394, -56.5, -56.58, -56.577, -56.663, -56.826, -56.943, -57.254, -57.611, -57.969, -58.327, -58.686, -59.043, -59.401, -59.759, -60.118, -60.475, -60.833, -61.191, -61.55, -61.907, -62.265, -51.276, -51.742, -52.155, -52.609, -52.985, -53.231, -53.473, -53.886, -54.186, -54.505, -54.768, -55.115, -55.389, -55.662, -55.924, -56.06, -56.046, -56.025, -56.141, -56.288, -56.495, -56.808, -57.152, -57.495, -57.849, -58.206, -58.563, -58.921, -59.279, -59.637, -59.996, -60.353, -60.711, -61.069, -61.428, -61.785, -50.728, -51.18, -51.568, -51.954, -52.266, -52.496, -52.876, -53.317, -53.615, -53.925, -54.191, -54.401, -54.715, -55.028, -55.232, -55.561, -55.543, -55.515, -55.672, -55.802, -56.085, -56.385, -56.728, -57.072, -57.416, -57.76, -58.104, -58.448, -58.8, -59.158, -59.516, -59.873, -60.231, -60.589, -60.948, -61.306, -50.114, -50.526, -50.903, -51.29, -51.597, -51.81, -52.29, -52.702, -52.928, -53.243, -53.617, -53.897, -54.164, -54.45, -54.751, -54.908, -55.042, -55.056, -55.11, -55.45, -55.677, -55.961, -56.305, -56.649, -56.993, -57.337, -57.681, -58.024, -58.369, -58.712, -59.056, -59.4, -59.751, -60.109, -60.467, -60.826, -49.392, -49.804, -50.217, -50.629, -50.948, -51.247, -51.497, -51.867, -52.378, -52.75, -53.117, -53.399, -53.769, -53.946, -54.194, -54.375, -54.494, -54.496, -54.728, -55.085, -55.267, -55.538, -55.882, -56.226, -56.57, -56.914, -57.257, -57.601, -57.945, -58.289, -58.633, -58.977, -59.321, -59.664, -60.008, -60.353, -48.739, -49.154, -49.569, -49.987, -50.415, -50.801, -51.152, -51.434, -51.872, -52.243, -52.614, -52.979, -53.374, -53.569, -53.669, -53.817, -53.915, -54.007, -54.377, -54.675, -54.858, -55.115, -55.458, -55.803, -56.147, -56.49, -56.834, -57.178, -57.522, -57.866, -58.209, -58.554, -58.898, -59.241, -59.585, -59.929, -48.139, -48.554, -48.974, -49.402, -49.83, -50.258, -50.666, -51.016, -51.371, -51.765, -52.16, -52.555, -52.998, -53.173, -53.228, -53.367, -53.535, -53.701, -54.025, -54.266, -54.449, -54.692, -55.035, -55.379, -55.723, -56.067, -56.411, -56.755, -57.099, -57.442, -57.786, -58.131, -58.474, -58.818, -59.147, -59.463, -47.539, -47.961, -48.389, -48.817, -49.245, -49.673, -50.101, -50.529, -50.88, -51.259, -51.654, -52.083, -52.527, -52.841, -52.924, -53.045, -53.145, -53.369, -53.674, -53.856, -54.04, -54.268, -54.612, -54.956, -55.3, -55.644, -55.987, -56.332, -56.675, -57.019, -57.363, -57.702, -58.018, -58.332, -58.648, -58.963, -46.948, -47.376, -47.804, -48.232, -48.66, -49.088, -49.516, -49.944, -50.372, -50.754, -51.171, -51.615, -52.058, -52.503, -52.62, -52.731, -52.837, -53.085, -53.227, -53.448, -53.631, -53.845, -54.189, -54.533, -54.877, -55.22, -55.564, -55.909, -56.252, -56.572, -56.887, -57.202, -57.517, -57.833, -58.147, -58.463, -46.363, -46.791, -47.219, -47.647, -48.074, -48.502, -48.929, -49.356, -49.782, -50.281, -50.612, -51.037, -51.462, -51.888, -52.3, -52.358, -52.443, -52.604, -52.746, -53.007, -53.221, -53.422, -53.766, -54.11, -54.453, -54.797, -55.127, -55.442, -55.757, -56.072, -56.387, -56.702, -57.017, -57.332, -57.648, -57.962, -45.768, -46.194, -46.621, -47.048, -47.475, -47.902, -48.328, -49.135, -49.765, -49.789, -50.129, -50.441, -50.801, -51.227, -51.653, -52.078, -52.165, -52.224, -52.345, -52.509, -52.774, -52.998, -53.342, -53.681, -53.997, -54.311, -54.627, -54.942, -55.257, -55.572, -55.887, -56.205, -56.526, -56.848, -57.169, -57.492, -45.167, -45.595, -46.022, -46.448, -46.875, -47.663, -48.682, -49.248, -49.265, -49.319, -49.672, -49.984, -50.296, -50.609, -50.992, -51.418, -51.843, -51.972, -52.032, -52.195, -52.388, -52.606, -52.901, -53.221, -53.543, -53.864, -54.185, -54.506, -54.828, -55.149, -55.473, -55.8, -56.128, -56.439, -56.736, -57.034, -44.568, -44.994, -45.421, -46.191, -47.211, -48.231, -48.732, -48.748, -48.764, -48.847, -49.215, -49.528, -49.84, -50.152, -50.464, -50.776, -51.182, -51.607, -51.778, -51.871, -52.047, -52.266, -52.486, -52.807, -53.129, -53.455, -53.782, -54.109, -54.436, -54.763, -55.063, -55.361, -55.66, -55.958, -56.257, -56.555, -43.968, -44.718, -45.739, -46.758, -47.779, -48.215, -48.231, -48.247, -48.264, -48.375, -48.758, -49.071, -49.383, -49.695, -50.008, -50.32, -50.632, -50.947, -51.372, -51.584, -51.729, -51.925, -52.142, -52.418, -52.745, -53.073, -53.39, -53.688, -53.987, -54.285, -54.583, -54.881, -55.18, -55.478, -55.777, -56.075, -44.267, -45.287, -46.307, -47.327, -47.698, -47.714, -47.731, -47.747, -47.764, -47.905, -48.301, -48.614, -48.926, -49.238, -49.55, -49.863, -50.175, -50.488, -50.8, -51.137, -51.391, -51.584, -51.794, -52.024, -52.315, -52.612, -52.91, -53.208, -53.507, -53.805, -54.104, -54.402, -54.7, -54.998, -55.296, -55.595, -44.834, -45.855, -46.874, -47.181, -47.198, -47.214, -47.231, -47.247, -47.263, -47.433, -47.833, -48.157, -48.469, -48.781, -49.093, -49.406, -49.718, -50.03, -50.343, -50.655, -50.967, -51.276, -51.52, -51.741, -52.032, -52.323, -52.614, -52.904, -53.195, -53.487, -53.781, -54.074, -54.367, -54.661, -54.954, -55.248, -45.402, -46.423, -46.665, -46.681, -46.698, -46.714, -46.73, -46.746, -46.763, -46.962, -47.362, -47.7, -48.012, -48.325, -48.637, -48.949, -49.262, -49.574, -49.886, -50.199, -50.511, -50.972, -51.255, -51.488, -51.782, -52.075, -52.368, -52.662, -52.955, -53.249, -53.545, -53.824, -54.059, -54.294, -54.528, -54.763, -45.971, -46.148, -46.165, -46.181, -46.197, -46.213, -46.23, -46.246, -46.263, -46.491, -46.891, -47.243, -47.555, -47.868, -48.18, -48.492, -48.805, -49.117, -49.429, -49.742, -50.12, -50.531, -50.86, -51.244, -51.546, -51.841, -52.138, -52.385, -52.619, -52.854, -53.089, -53.324, -53.559, -53.794, -54.029, -54.264, -45.632, -45.648, -45.665, -45.68, -45.697, -45.713, -45.73, -45.746, -45.762, -46.019, -46.42, -46.786, -47.099, -47.41, -47.723, -48.035, -48.347, -48.66, -48.972, -49.284, -49.746, -50.089, -50.472, -50.92, -51.222, -51.437, -51.651, -51.885, -52.12, -52.355, -52.589, -52.824, -53.059, -53.294, -53.528, -53.763, -45.132, -45.147, -45.164, -45.18, -45.197, -45.213, -45.229, -45.245, -45.262, -45.549, -45.948, -46.329, -46.642, -46.954, -47.266, -47.579, -47.891, -48.203, -48.516, -48.923, -49.334, -49.645, -50.085, -50.516, -50.876, -51.091, -51.305, -51.52, -51.735, -51.949, -52.164, -52.378, -52.593, -52.807, -53.029, -53.264] };

// src/index.js
var ETRS89_TM = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
var WGS842 = "+proj=longlat +datum=WGS84 +no_defs";
var grid = {
  minE: ostn15_grid_default.minE,
  minN: ostn15_grid_default.minN,
  step: ostn15_grid_default.step,
  cols: ostn15_grid_default.cols,
  rows: ostn15_grid_default.rows,
  eastShifts: ostn15_grid_default.eastShifts,
  northShifts: ostn15_grid_default.northShifts
};
function interpolateShifts(easting, northing) {
  const colF = (easting - grid.minE) / grid.step;
  const rowF = (northing - grid.minN) / grid.step;
  const col0 = Math.floor(colF);
  const row0 = Math.floor(rowF);
  const col1 = col0 + 1;
  const row1 = row0 + 1;
  if (col0 < 0 || col1 >= grid.cols || row0 < 0 || row1 >= grid.rows) {
    return null;
  }
  const fx = colF - col0;
  const fy = rowF - row0;
  const idx00 = row0 * grid.cols + col0;
  const idx01 = row0 * grid.cols + col1;
  const idx10 = row1 * grid.cols + col0;
  const idx11 = row1 * grid.cols + col1;
  const e00 = grid.eastShifts[idx00];
  const e01 = grid.eastShifts[idx01];
  const e10 = grid.eastShifts[idx10];
  const e11 = grid.eastShifts[idx11];
  const n00 = grid.northShifts[idx00];
  const n01 = grid.northShifts[idx01];
  const n10 = grid.northShifts[idx10];
  const n11 = grid.northShifts[idx11];
  if (e00 == null || e01 == null || e10 == null || e11 == null || n00 == null || n01 == null || n10 == null || n11 == null) {
    return null;
  }
  const eastShift = e00 * (1 - fx) * (1 - fy) + e01 * fx * (1 - fy) + e10 * (1 - fx) * fy + e11 * fx * fy;
  const northShift = n00 * (1 - fx) * (1 - fy) + n01 * fx * (1 - fy) + n10 * (1 - fx) * fy + n11 * fx * fy;
  return { eastShift, northShift };
}
__name(interpolateShifts, "interpolateShifts");
function transformOstn15(easting, northing) {
  const shifts = interpolateShifts(easting, northing);
  if (!shifts) return null;
  const etrs89E = easting - shifts.eastShift;   // changed + to -
  const etrs89N = northing - shifts.northShift;   // changed + to -
  const [lng, lat] = lib_default(ETRS89_TM, WGS842, [etrs89E, etrs89N]);
  return { lng, lat };
}

__name(transformOstn15, "transformOstn15");
function convertWktToGeoJson(wkt) {
  if (!wkt || typeof wkt !== "string") return null;
  const match2 = wkt.match(/^(\w+)\s*\((.*)\)$/);
  if (!match2) return null;
  const type = match2[1].toUpperCase();
    const coordStr = match2[2].replace(/[()]/g, "");
  const points = coordStr.split(",").map((pair) => {
    const [easting, northing] = pair.trim().split(/\s+/).map(Number);
    const result = transformOstn15(easting, northing);
    if (!result) throw new Error("Coordinate outside OSTN15 coverage");
    return [result.lng, result.lat];
  });
  for (const [lng, lat] of points) {
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
      throw new Error("Non-finite coordinate after conversion");
    }
    if (lng < -11 || lng > 2 || lat < 49 || lat > 61) {
      throw new Error("Converted coordinate outside UK coverage");
    }
  }
  let geometry;
  if (type === "POINT") {
    geometry = { type: "Point", coordinates: points[0] };
  } else if (type === "LINESTRING") {
    geometry = { type: "LineString", coordinates: points };
  } else if (type === "POLYGON") {
    geometry = { type: "Polygon", coordinates: [points] };
  } else {
    return null;
  }
  const lngs = points.map((p) => p[0]);
  const lats = points.map((p) => p[1]);
  const bbox = [
    Math.min(...lngs),
    Math.min(...lats),
    Math.max(...lngs),
    Math.max(...lats)
  ];
  return JSON.stringify({ ...geometry, bbox });
}
__name(convertWktToGeoJson, "convertWktToGeoJson");
function computeGeometryMeta(geom, latitude, longitude) {
  if (geom && geom.type && geom.coordinates) {
    // convertWktToGeoJson already computed bbox — use it if present
    if (geom.bbox && geom.bbox.length === 4) {
      return {
        geometryType: geom.type,
        bboxMinLng: geom.bbox[0],
        bboxMinLat: geom.bbox[1],
        bboxMaxLng: geom.bbox[2],
        bboxMaxLat: geom.bbox[3],
      };
    }
    // Fallback: compute from coordinates
    const coords = flattenCoords(geom.coordinates, geom.type);
    if (coords.length === 0) {
      return { geometryType: geom.type, bboxMinLng: null, bboxMinLat: null, bboxMaxLng: null, bboxMaxLat: null };
    }
    let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
    for (const [lng, lat] of coords) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    return { geometryType: geom.type, bboxMinLng: minLng, bboxMinLat: minLat, bboxMaxLng: maxLng, bboxMaxLat: maxLat };
  }
  if (latitude != null && longitude != null) {
    return { geometryType: "Point", bboxMinLng: longitude, bboxMinLat: latitude, bboxMaxLng: longitude, bboxMaxLat: latitude };
  }
  return { geometryType: null, bboxMinLng: null, bboxMinLat: null, bboxMaxLng: null, bboxMaxLat: null };
}

function flattenCoords(coords, type) {
  const result = [];
  const depth = { Point: 0, MultiPoint: 1, LineString: 1, MultiLineString: 2, Polygon: 2, MultiPolygon: 3 }[type] ?? 1;
  function walk(node, currentDepth) {
    if (currentDepth === depth) {
      if (Array.isArray(node) && node.length >= 2) result.push([node[0], node[1]]);
      return;
    }
    if (Array.isArray(node)) for (const child of node) walk(child, currentDepth + 1);
  }
  walk(coords, 0);
  return result;
}

var index_default = {
  async queue(batch, env, ctx) {
        const stmt = env.DB.prepare(
      `INSERT OR IGNORE INTO events (event_reference, event_time, permit_status, permit_reference, properties, longitude, latitude, geometry, raw_payload, geometry_type, bbox_min_lng, bbox_min_lat, bbox_max_lng, bbox_max_lat)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    const statements = [];
    const messagesToAck = [];
        for (const message of batch.messages) {
            const smEvent = typeof message.body === "string" ? JSON.parse(message.body) : message.body;
      const raw = JSON.stringify(smEvent);
      const obj = smEvent.object_data || {};
          
      const snsEventRef = smEvent.event_reference || null;
      

      const eventTime = smEvent.event_time || null;
      const permitStatus = obj.permit_status || null;
      const permitRef = obj.permit_reference_number || null;
      const properties = JSON.stringify(smEvent);
      const wkt = obj.works_location_coordinates || null;
      let geoJson = null;
      let longitude = null;
      let latitude = null;
      let conversionError = false;

      if (wkt) {
        try {
          geoJson = convertWktToGeoJson(wkt);
          if (geoJson) {
            const geom = JSON.parse(geoJson);
            if (geom.type === "Point") {
              longitude = geom.coordinates[0];
              latitude = geom.coordinates[1];
            } else if (geom.type === "LineString") {
              longitude = geom.coordinates[0][0];
              latitude = geom.coordinates[0][1];
            } else if (geom.type === "Polygon") {
              longitude = geom.coordinates[0][0][0];
              latitude = geom.coordinates[0][0][1];
            }
          }
        } catch (err) {
          console.error("Conversion failed:", err.message, "WKT:", wkt);
          conversionError = true;
        }
      }
      if (conversionError) {
        message.retry();
        continue;
      }
      let parsedGeom = null;
      if (geoJson) {
        try { parsedGeom = JSON.parse(geoJson); } catch { parsedGeom = null; }
      }
      const meta = computeGeometryMeta(parsedGeom, latitude, longitude);
            statements.push(
        stmt.bind(
          snsEventRef,
          eventTime,
          permitStatus,
          permitRef,
          properties,
          longitude,
          latitude,
          geoJson,
          raw,
          meta.geometryType,
          meta.bboxMinLng,
          meta.bboxMinLat,
          meta.bboxMaxLng,
          meta.bboxMaxLat
        )
      );

      messagesToAck.push(message);
    }
    try {
      await env.DB.batch(statements);
      for (const message of messagesToAck) {
        message.ack();
      }
    } catch (err) {
      console.error("D1 insert failed:", err);
      for (const message of messagesToAck) {
        message.retry();
      }
    }
  }
};
export {
  index_default as default
};
