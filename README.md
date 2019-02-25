# BrokkJS

## Installation

## How to Use

### Via jquery plugin

```javascript
$(document).ready(function(){
    $(selector).brokk({
        requestUrl: '/url-that-return-json',
        toUpdateElements: selector,
        onSuccess: function (args) {
            this.onSuccess(args); // Call default plugin onSuccess callback
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
    toUpdateElements: [],
    triggerElements: [],
    toFireSuccessElements: [],
    showOverlay: true,
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
    }
};
```
