/*****************************************************************
** Author: Asvin Goel, goel@telematique.eu
**
** A plugin for embedding tweets.
**
** Version: 1.0.0
** 
** License: MIT license (see LICENSE.md)
**
******************************************************************/

window.RevealEmbedTweet = window.RevealEmbedTweet || {
    id: 'RevealEmbedTweet',
    init: function(deck) {
        initEmbedTweet(deck);
    }
};

const initEmbedTweet = function(Reveal){
	var ready = false;
	window.twttr = (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
				t = window.twttr || {};
		if (d.getElementById(id)) return t;
		js = d.createElement(s);
		js.id = id;
		js.src = "https://platform.x.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);

		t._e = [];
		t.ready = function(f) {
				t._e.push(f);
		};
	}(document, "script", "twitter-wjs"));
	function load() {
		if ( twttr != undefined && !document.querySelector('section[data-markdown]:not([data-markdown-parsed])') ) {
			tweets = document.querySelectorAll(".tweet");
			for (i = 0; i < tweets.length; ++i) {
				tweets[i].style.cssText = "margin: 0;position: absolute; width:400px; left: 50%;transform: translate(-50%,0%);" + tweets[i].style.cssText;
				tweets[i].innerHTML = 	'<blockquote class="twitter-tweet" data-lang="en"><a href="' + tweets[i].getAttribute('data-src') + '">Loading...</a></blockquote>';
				let parentSection = tweets[i].closest("section");
				if (parentSection) {
					console.log(parentSection);
					parentSection.style.top = "0";
					parentSection.style.padding = "0";
				}
			}
			twttr.widgets.load()
		}
		else {
			setTimeout( load, 100 );
		}
	}

	Reveal.addEventListener( 'ready', function( event ) {
		load();
	} );

	this.refresh = load;

	return this;
};



