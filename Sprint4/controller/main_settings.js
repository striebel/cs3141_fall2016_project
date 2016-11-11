
$(window).on('hashchange', function() {
	var redirect = (window.location.hash).substr(1);
	var iframe = document.getElementById('iframe');
	iframe.src = "../" + redirect + "/" + redirect + ".html"
});