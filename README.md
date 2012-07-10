# jquery.textareaAutoHeight.js

Create a Facebook like input box in seconds. A text area will automaticly set height according to content, and 
submit on enter. If ```shift + enter``` is pressed, a new line will be inserted. 

## Basic usage

```javascript
$("textarea").textareaAutoHeight();
```

## Settings
```javascript
{
    useCounter: true, // Add a span with a counter of how meny characters there are in the text area.
    minLines: 2, // default number of lines to show
    maxLines: 5, // max number of lines to show before scroll
    hideSubmitButton: true, // Should hide submit button?
    submitButton: undefined // Override this if you need to specify what submit button to trigger on enter.
}
```
