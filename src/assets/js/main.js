var PROJECTNAMEJS = PROJECTNAMEJS || {};

PROJECTNAMEJS.Global = (function () {
    return {
    	/**
        * initialise javascript
        */
        Init: function () { 

        }
    }
})();

$(document).ready(function(){
	PROJECTNAMEJS.Global.Init();	

	var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70
  });     
});