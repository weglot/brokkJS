# BrokkJS

## Installation

## How to Use

### Via jquery plugin

```javascript
$(document).ready(function(){
    $(selector).brokk({
        requestUrl: '/url-that-return-json',
        toUpdateElements: selector,
        onSuccess: function (arguments) {
            this.onSuccess(arguments); // Call default plugin onSuccess callback
            alert('Success!');
        },
    });
});
```

### Via data attribute

```html
<div data-brokk-request-url="/url-that-return-json" data-brokk-to-update-elements="this"></div>
```

```javascript
$(document).ready(function(){
    $(selector).brokk();
});
```

### Access instanciated object Api
```javascript
 $(selector).brokkApi().fire();
```

## Options

Any option can be passed through the use of a data attribute or plugin object.

```javascript
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
```
