

(function ($) {

    var methods = {
        init: function (options) {
            return this.each( function () {
                var $this = $(this),
                    data = $this.data('textareaAutoHeight');

                // If the plugin hasn't been initialized yet
                if ( !data ) {

                    var settings = $.extend( {}, $.fn.textareaAutoHeight.defaults, options );

                    if ( !settings.submitButton ) {
                        settings.submitButton = $this.parents( "form" ).find("input[type='submit']:first");
                    }

                    $this.data( 'textareaAutoHeight', {
                        _settings: settings
                    } );

                    methods._render.call( this );
                    methods._bindEventHandlers.call( this );
                }

            } );
        },

        _render: function () {
            var $this = $(this),
                data = $this.data( 'textareaAutoHeight' );

            $this.addClass("textareaAutoHeight-message-box textareaAutoHeight-init");

            if(data._settings.hideSubmitButton) {
                data._settings.submitButton.hide();
            }

            var fontSize = $this.css('font-size'),
                lineHeight = Math.floor(parseInt(fontSize.replace('px',''), 10) * 1.3),
                height = data._settings.minLines * lineHeight;

            $this.height(height);

            if ( data._settings.useCounter ) {
                data.counterSpan = $('<span />', {
                    'class': "textareaAutoHeight-counter",
                    text: '0'
                }).insertAfter($this);
            }

            data.target = $this;
        },

        _fixTextareaHeight: function (e) {

            var $this = $(this),
                data = $this.data('textareaAutoHeight'),
                fontSize = $this.css('font-size'),
                lineHeight = Math.floor(parseInt(fontSize.replace('px',''), 10) * 1.3),
                height = $this.height();

            if ( height < data._settings.maxLines * lineHeight && $this.get(0).scrollHeight > $this.outerHeight() ) {
                $this.height(height + lineHeight);
            }
        },

        _bindEventHandlers: function () {
            var $this = $(this),
                data = $this.data('textareaAutoHeight');

            $this.on('keydown', function (e) {
                methods._doNewLineOrSubmit.call($this, e);
            });

            if ( data._settings.useCounter ) {
                data.target.on('keyup', function (e) {
                    methods._countLettersTyped.call($this, e);
                });

                $this.on('textareaAutoHeight.newtype', methods._updateLetterCounter);
            }

            $this.on('keyup', methods._fixTextareaHeight);

            $this.on('textareaAutoHeight.submit', function () {
                // Trigger submit button instead of adding a newline.
                data._settings.submitButton.trigger("click");
            });
        },

        _countLettersTyped: function (e) {
            var $this = $(this),
                data = $this.data('textareaAutoHeight');

            if ( data._settings.useDiv ) {
                data.letters = data.target.getPreText().length;
            } else {
                data.letters = data.target.val().length;
            }
            $this.trigger('textareaAutoHeight.newtype');
        },

        _updateLetterCounter: function () {
            var $this = $(this),
                data = $this.data('textareaAutoHeight');

            data.counterSpan.text(data.letters);
        },

        _doNewLineOrSubmit: function (e) {
            var $this = $(this),
                data = $this.data('textareaAutoHeight');

            // If not enter, proceed as usual
            if ( e.keyCode !== 13 ) {
                return true;
            }

            // If shift and enter, new line.
            if ( e.shiftKey ) {
                return true;
            }

            // Stop from making new line.
            e.preventDefault();
            $this.trigger('textareaAutoHeight.submit');
            return false;
        },

        // Set or retrive options.
        options: function(options) {
            var $this = $(this),
                data = $this.data('textareaAutoHeight');

            // Check if we should just return the options.
            if ( !options ) {
                return data._settings;
            }

            // Alter settings.
            data._settings = $.extend({}, data._settings, options);

            // Return this to allow chaining..
            return this;
        },

        remove: function(options) {
            var data = $(this).data("textareaAutoHeight");

            $("div.textareaAutoHeight-message-box").remove();
            data.counterSpan.remove();
            
            $(this)
                .removeClass('textareaAutoHeight-message-box')
                .removeClass('textareaAutoHeight-init')
                .data("textareaAutoHeight", undefined);

            return this;
        },

        numLetters: function () {
            return $(this).data('textareaAutoHeight').letters;
        }
    };

    $.fn.textareaAutoHeight = function (method) {
        // Allow method calls (but not prefixed by _
        if ( typeof method === "string" && method.substr(0,1) !== "_" && methods[ method ] ) {
            return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
        }
        // If argument is object or not set, init plugin.
        else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        }
        // No method found by argument input. Could be a private method.
        else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.textareaAutoHeight' );
            return this;
        }
    };

    $.fn.textareaAutoHeight.defaults = {
        useCounter: false,
        minLines: 2, // default number of lines to show
        maxLines: 5, // max number of lines to show before scroll
        hideSubmitButton: true,
        submitButton: undefined
    };

})(jQuery);