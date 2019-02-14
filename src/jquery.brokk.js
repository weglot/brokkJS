// ---------------------------------
// ---------- BrokkJS ----------
// ---------------------------------
// Brief plugin description
// ------------------------
;(function ($, window, document, undefined) {

    var pluginName = 'brokkJS';

    function Plugin(element, options) {
        this.element = element;
        this._name = pluginName;
        this._defaults = $.fn.brokk.defaults;
        var attributes = {};
        var arrayElements = ['toUpdateElements', 'triggerElements', 'toFireSuccessElements'];        
        $.each(this._defaults, function (index, value) {           
            if (typeof value !== 'function') {
                var attrIndex = index.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                value = $(element).attr('data-brokk-' + attrIndex);
                if (value === 'this') {
                    value = element;
                }
                if ( arrayElements.indexOf(index) !== -1 && typeof value === 'string') {                 
                    value = value.split(',').map(function(item) {
                        return item.trim() === 'this' ? element : item;
                    });                    
                }
                if (index === 'requestParams' && typeof value !== 'undefined') {
                    value = JSON.parse(value);
                }
                attributes[index] = value;
            }
        });  
        if (typeof attributes.params !== 'undefined') {
            attributes.params = JSON.parse(attributes.params);
        }
        this.options = $.extend({}, this._defaults, attributes);
        this.options = $.extend({}, this.options, options);
        this.init();       
    }

    $.extend(Plugin.prototype, {
        init: function () {
            this.buildCache();
            this.bindEvents();
        },
        destroy: function () {
            this.unbindEvents();
            this.$element.removeData();
        },
        buildCache: function () {
            this.$element = $(this.element);
        },
        bindEvents: function () {
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
        unbindEvents: function () {
            this.$element.off('.' + this._name);
        },
        callback: function (callback, arguments) {
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
        fireSuccessElements: function (arguments) {
            $(this.options.toFireSuccessElements).each(function() {
                if($(this).data("plugin_" + pluginName) ) {
                    $(this).brokkApi().fire();
                }
            });            
        },
        before: function (arguments) {            
            this.options.triggerElements.forEach(function(element) {
                $(element).prop('disabled', true);
                $(element).addClass('disabled');
            });
            if (this.options.showOverLay) {               
                this.options.toUpdateElements.forEach(function(element) {
                    if($(element).find('#brokk-loading').length === 0) {
                        $(element).append('<span id="brokk-loading">' + $.fn.brokk.loadingTemplate + '</span>');
                    }
                });                      
            }           
        },
        onSuccess: function (arguments) {            
            this.options.toUpdateElements.forEach(function(element) {
                $(element).html(arguments.data);
            });           
        },
        onError: function (arguments) {

        },
        onComplete: function (arguments) {           
            this.options.triggerElements.forEach(function(element) {
                $(element).prop('disabled', false);
                $(element).removeClass('disabled');
            });            
            this.options.toUpdateElements.forEach(function(element) {
                $(element).find('#brokk-loading').remove()
            });           
        }
    });

    $.fn.brokk = function (options) {
        return this.each(function () {
            var pluginInstance = $.data(this, "plugin_" + pluginName);
            if (!pluginInstance) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

    $.fn.brokkApi = function () {
        return $.data(this[0], "plugin_" + pluginName);
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
        toUpdateElements: [], // todo adjust
        triggerElements: [],
        toFireSuccessElements: [],
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

})(jQuery, window, document);