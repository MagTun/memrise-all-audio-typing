// ==UserScript==
// @name           Memrise All Audio Typing
// @namespace      https://github.com/cooljingle
// @description    Turns all tests into audio typing
// @match          https://www.memrise.com/course/*/garden/*
// @match          https://www.memrise.com/garden/review/*
// @version        0.0.1
// @updateURL      https://github.com/cooljingle/memrise-all-audio-typing/raw/master/Memrise_All_Audio_Typing.user.js
// @downloadURL    https://github.com/cooljingle/memrise-all-audio-typing/raw/master/Memrise_All_Audio_Typing.user.js
// @grant          none
// ==/UserScript==

$(document).ready(function() {
    var testBoxTemplates = _.filter(Object.keys(MEMRISE.garden.box_mapping), key => MEMRISE.garden.box_mapping[key].prototype instanceof MEMRISE.garden.box_types.TestBox);
    MEMRISE.garden.boxes.load = (function() {
        var cached_function = MEMRISE.garden.boxes.load;
        return function() {
            enableAllAudioTyping();
            var result = cached_function.apply(this, arguments);
            return result;
        };
    }());

    function enableAllAudioTyping() {
        MEMRISE.garden.session.box_factory.make = (function() {
            var cached_function = MEMRISE.garden.session.box_factory.make;
            return function() {
                var result = cached_function.apply(this, arguments);
                if(_.contains(testBoxTemplates, result.template)) {
                    result.template = "typing";
                    result.promptWith = "audio";
                }
                return result;
            };
        }());
    }
});
