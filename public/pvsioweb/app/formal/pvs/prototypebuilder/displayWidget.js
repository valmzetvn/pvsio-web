/**
 * 
 * @author Patrick Oladimeji
 * @date Dec 29, 2012 : 1:24:55 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, es5: true */
/*global define, d3, require, __dirname, process, _*/
define(['./baseWidget', './widgetType', 'util/property', './displayMappings'],
	function (baseWidget, widgetType, property, displayMappings) {
        "use strict";
        var widgetTypes = [{value: widgetType.Button, label: widgetType.Button},
                           {value: widgetType.Display, label: widgetType.Display}];
    
        function predefinedRegexes() {
            var res = [];
            _.each(displayMappings.preset, function (value) {
                res.push(value);
            });
            return res;
        }
        
        return function (regex, label) {
            var o = baseWidget(widgetType.Display);
            o.regex = property.call(o, regex || '');
            //o.label = property.call(o, label || '');
            o.predefinedRegex = property.call(o, "");
            o.prefix = property.call(o, "");
            o.toJSON = function () {
                return {
                    predefinedRegex: o.predefinedRegex(),
                    regex: o.regex(),
                    prefix: o.prefix(),
                    type: o.type()
                };
            };
            
            o.getRenderData = function () {
                var res = [];
                res.push({label: "Area Type", element: "select", value: o.type(), data: widgetTypes, name: 'type'});
                res.push({label: "Value Type", element: "select", value: o.predefinedRegex(), data: predefinedRegexes(),
                          name: "predefinedRegex", other: ['required']});
                res.push({label: "Area Identifier", element: "input", inputType: "text", value: o.prefix(), name: "prefix", other: ['required']});
                res.push({label: "Regex", element: "input", inputType: "text", value: o.regex(), name: 'regex', other: ['required']});
                //res.push({label:"Label", element:"input", inputType:"text", value:o.label(), name:"label"});
                return res;
            };
            return o;
        };
	});