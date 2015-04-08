// stringified KO templates
 var knocktog = knocktog || {};
knocktog.loadKoTemplates = function () {
	ko.templates["firstName"] = "<p>First name: <strong data-bind=\x22text: firstName\x22></strong></p>";
	ko.templates["lastName"] = "<p>Last name: <strong data-bind=\x22text: lastName\x22></strong></p>";
}