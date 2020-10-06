/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"objectList/zobjectList/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});