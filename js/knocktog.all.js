//  THIS FILE IS GENERATED DO NO MODIFY 
//   Tue Apr 07 2015 20:36:18 GMT-0400 (EDT)
// ko template engine using string templates
// based on  https://github.com/rniemeyer/SamplePresentation/blob/master/js/stringTemplateEngine.js
// see http://www.knockmeout.net/2011/10/ko-13-preview-part-3-template-sources.html
// modified to not use require.js
var knocktog = knocktog || {};

knocktog.configureKoStringTemplateEngine = function(ko) {
    //define a template source that tries to key into an object first to find a template string
    var templates = {},
        data = {},
        engine = new ko.nativeTemplateEngine();

    ko.templateSources.stringTemplate = function(template) {
        this.templateName = template;
    };

    ko.utils.extend(ko.templateSources.stringTemplate.prototype, {
        data: function(key, value) {
            data[this.templateName] = data[this.templateName] || {};

            if (arguments.length === 1) {
                return data[this.templateName][key];
            }

            data[this.templateName][key] = value;
        },
        text: function(value) {
            if (arguments.length === 0) {
                // return '.print' version of template if instructed to do so
                if( ko.templateNameSuffix && templates[this.templateName+ko.templateNameSuffix] ) {
                    return templates[this.templateName+ko.templateNameSuffix];
                } else {
                    return templates[this.templateName];
                }
            }

//            if(ko.templateNameSuffix && templates[this.templateName+ko.templateNameSuffix]) {
//                templates[this.templateName+ko.templateNameSuffix] = value;
//            }
            templates[this.templateName] = value;
        }
    });

    engine.makeTemplateSource = function(template, doc) {
        var elem;
        if (typeof template === "string") {
            elem = (doc || document).getElementById(template);

            if (elem) {
                return new ko.templateSources.domElement(elem);
            }

            return new ko.templateSources.stringTemplate(template);
        }
        else if (template && (template.nodeType == 1) || (template.nodeType == 8)) {
            return new ko.templateSources.anonymousTemplate(template);
        }
    };

    //make the templates accessible
    ko.templates = templates;

    //make this new template engine our default engine
    ko.setTemplateEngine(engine);
};
//  THIS FILE IS GENERATED DO NO MODIFY 
//   Tue Apr 07 2015 20:36:18 GMT-0400 (EDT)
// stringified KO templates
 var knocktog = knocktog || {};
knocktog.loadKoTemplates = function () {
	ko.templates["firstName"] = "<p>First name: <strong data-bind=\x22text: firstName\x22></strong></p>";
	ko.templates["lastName"] = "<p>Last name: <strong data-bind=\x22text: lastName\x22></strong></p>";
}