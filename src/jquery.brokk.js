// ---------------------------------
// ---------- BrokkJS ----------
// ---------------------------------
// Lightweight plugin to make ajax call and block rendering
// ------------------------
;(function ($, window, document, undefined) {

    var pluginName = 'brokkJS';

    function Plugin(element, options) {
        this.element = element;
        this._name = pluginName;
        this._defaults = $.fn.brokk.defaults;
        var attributes = {};
        var arrayParams = ['toUpdateElements', 'triggerElements', 'toFireSuccessElements'];
        $.each(this._defaults, function (index, value) {
            if (typeof value !== 'function') {
                var attrIndex = index.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                value = $(element).data('brokk-' + attrIndex);
                if (arrayParams.indexOf(index) !== -1 && typeof value === 'string') {
                    value = value.split(',').map(function (item) {
                        return item.trim() === 'this' ? element : item;
                    });
                }
                attributes[index] = value;
            }
        });
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
                        if ($(this).prop('disabled')) {
                            return;
                        }
                        plugin.fire();
                    });
                    plugin.$element.on('keypress' + '.' + plugin._name, function (e) {
                        var keycode = (e.keyCode ? e.keyCode : e.which);
                        if ($(this).prop('disabled') || keycode !== '13') {
                            return;
                        }
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
                case $.fn.brokk.fireEvents.MANUAL:
                    break;
                case $.fn.brokk.fireEvents.DISABLED:
                    break;
            }
            plugin.$element.on('click' + '.' + plugin._name, function () {
                plugin.callback(plugin.options.onClick);
            });
            plugin.$element.on('submit' + '.' + plugin._name, function (e) {
                e.preventDefault();
                plugin.callback(plugin.options.onSubmit);
            });
        },
        unbindEvents: function () {
            this.$element.off('.' + this._name);
        },
        callback: function (callback, args) {
            if (typeof callback === 'function') {
                callback.call(this, args);
            }
        },
        fire: function () {
            this.callback(this.options.before);
            if (this.options.fireEvent === $.fn.brokk.fireEvents.DISABLED) {
                return;
            }
            this.ajax();
        },
        ajax: function () {
            let plugin = this;
            if (this.options.requestUrl === null) {
                console.warn('No requestUrl defined.');
                return;
            }
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
        fireSuccessElements: function (args) {
            this.options.toFireSuccessElements.forEach(function (element) {
                if ($(element).data("plugin_" + pluginName)) {
                    $(element).brokkApi().fire();
                }
            });
        },
        before: function (args) {
            var triggerOverlay = this.options.triggerElementsOverlay;
            this.options.triggerElements.forEach(function (element) {
                $(element).prop('disabled', true);
                $(element).addClass('disabled');
                $(element).data('brokk-html', $(element).html());
                if (triggerOverlay != null) {
                    $(element).html('<span id="brokk-trigger-overlay">' + triggerOverlay + '</span>');
                }
            });
            if (this.options.toUpdateElementsOverlay) {
                var updateOverlay = this.options.toUpdateElementsOverlay;
                this.options.toUpdateElements.forEach(function (element) {
                    if ($(element).find('#brokk-update-overlay').length === 0) {
                        $(element).append('<span id="brokk-update-overlay">' + updateOverlay + '</span>');
                    }
                });
            }
        },
        onSuccess: function (args) {
            this.options.toUpdateElements.forEach(function (element)  {
                $(element).html(args.data);
            });
            this.fireSuccessElements();
        },
        onError: function (args) {

        },
        onComplete: function (args) {
            this.options.triggerElements.forEach(function (element) {
                $(element).prop('disabled', false);
                $(element).removeClass('disabled');
                $(element).html($(element).data('brokk-html'));
            });
            this.options.toUpdateElements.forEach(function (element) {
                $(element).find('#brokk-update-overlay').remove()
            });
        },
        onClick: function (args) {},
        onSubmit: function (args) {}
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
        if (typeof this[0] !== 'undefined') {
            return $.data(this[0], "plugin_" + pluginName);
        } else {
            console.info('This element was not initialized with Brokk.');
            return new Plugin(this[0], {});
        }
    };

    $.fn.brokk.fireEvents = {
        ON_READY: 'onReady',
        ON_CLICK: 'onClick',
        ON_SUBMIT: 'onSubmit',
        MANUAL: 'manual',
        DISABLED: 'disabled'
    };

    $.fn.brokk.defaults = {
        requestUrl: null,
        requestMethod: 'GET',
        requestParams: null,
        fireEvent: $.fn.brokk.fireEvents.ON_READY,
        toUpdateElements: [],
        toUpdateElementsOverlay: 'Loading',
        triggerElements: [],
        triggerElementsOverlay: null,
        toFireSuccessElements: [],
        before: function (args) {
            this.before(args);
        },
        onSuccess: function (args) {
            this.onSuccess(args);
        },
        onError: function (args) {
            this.onError(args);
        },
        onComplete: function (args) {
            this.onComplete(args);
        },
        onClick: function (args) {
            this.onClick(args);
        },
        onSubmit: function (args) {
            this.onSubmit(args);
        },
    };
})(jQuery, window, document);
