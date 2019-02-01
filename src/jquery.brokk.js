// ---------------------------------
// ---------- BrokkJS ----------
// ---------------------------------
// Brief plugin description
// ------------------------
;(function ( $, window, document, undefined ) {

    var pluginName = 'brokkJS';

    function Plugin ( element, options ) {
        this.element = element;
        this._name = pluginName;
        this._defaults = $.fn.brokk.defaults;

        var attributes = {};
        $.each(this._defaults, function(index, value) {
            if (typeof value !== 'function') {
                var attrIndex = index.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                value = $(element).attr('data-brokk-'+attrIndex);
                if (value === 'this') {
                    value = element;
                }
                attributes[index] = value;
            }

        });
        if (typeof attributes.params !== 'undefined') {
            attributes.params = JSON.parse(attributes.params);
        }
        this.options = $.extend( {}, this._defaults, attributes );
        this.options = $.extend( {}, this.options, options );
        this.init();
    }

    function fireSuccessElements (plugin) {
        var element = plugin.options.toFireSuccessElements;
        if ($(element).data("plugin_" + pluginName)) {
            $(element).brokkApi().fire();
        }

    }

    $.extend(Plugin.prototype, {
        init: function () {
            this.buildCache();
            this.bindEvents();
        },
        destroy: function() {
            this.unbindEvents();
            this.$element.removeData();
        },
        buildCache: function () {
            this.$element = $(this.element);
        },
        bindEvents: function() {
            var plugin = this;

            switch (this.options.fireEvent) {
                case $.fn.brokk.fireEvents.ON_READY:
                    $(document).ready(function () {
                        plugin.fire();
                    });
                    break;
                case $.fn.brokk.fireEvents.ON_CLICK:
                    plugin.$element.on('click' + '.' + plugin._name, function () {
                        plugin.fire();
                    });
                    break;
                case $.fn.brokk.fireEvents.ON_SUBMIT:
                    plugin.$element.on('submit' + '.' + plugin._name, function (e) {
                        if ($(this)[0].checkValidity()) {
                            e.preventDefault();
                            plugin.fire();
                        }
                    });
                    break;
            }
        },
        unbindEvents: function() {
            this.$element.off('.'+this._name);
        },
        callback: function(callback, arguments) {
            if (typeof callback === 'function') {
                callback.call(this, arguments);
            }
        },
        fire: function () {
            var plugin = this;
            this.callback(this.options.before);
            $.ajax({
                url: this.options.requestUrl,
                type: this.options.requestMethod,
                dataType: 'json',
                data: this.options.requestParams,
                success: function (data) {
                    plugin.callback(plugin.options.onSuccess, {data: data});
                },
                error: function (xhr) {
                    plugin.callback(plugin.options.onError, {xhr: xhr});
                }
            }).always(function () {
                plugin.callback(plugin.options.onComplete);
            });

        },
        before: function (arguments) {
            $(this.options.triggerElements).prop('disabled', true);
            $(this.options.triggerElements).addClass('disabled');
            if ($(this.options.toUpdateElements).find('#brokk-loading').length === 0) {
                $(this.options.toUpdateElements).append('<span id="brokk-loading">' + $.fn.brokk.loadingTemplate + '</span>');
            }
        },
        onSuccess: function (arguments) {
            $(this.options.toUpdateElements).html(arguments.data);
            fireSuccessElements(this);
        },
        onError: function (arguments) {

        },
        onComplete: function (arguments) {
            $(this.options.triggerElements).prop('disabled', false);
            $(this.options.triggerElements).removeClass('disabled');
            $(this.options.toUpdateElements).find('#brokk-loading').remove();
        }

    });

    $.fn.brokk = function ( options ) {
        return this.each(function() {
            var pluginInstance = $.data( this, "plugin_" + pluginName );
            if (!pluginInstance) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

    $.fn.brokkApi = function () {
        return $.data( this[0], "plugin_" + pluginName );
    };

    $.fn.brokk.loadingTemplate = 'Loading';

    $.fn.brokk.fireEvents = {
        ON_READY: 'onReady',
        ON_CLICK: 'onClick',
        ON_SUBMIT: 'onSubmit'
    };

    $.fn.brokk.defaults = {
        requestUrl: null,
        requestMethod: 'GET',
        requestParams: null,
        fireEvent: $.fn.brokk.fireEvents.ON_READY,
        toUpdateElements: null,
        triggerElements: null,
        toFireSuccessElements: null,
        showOverLay: true,
        before: function (arguments) {
            this.before(arguments);
        },
        onSuccess: function (arguments) {
            this.onSuccess(arguments);
        },
        onError: function (arguments) {
            this.onError(arguments);
        },
        onComplete: function (arguments) {
            this.onComplete(arguments);
        }
    };

})( jQuery, window, document );