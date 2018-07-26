/**
 * Copy to clipboard
 * @see https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
 * @see https://github.com/sindresorhus/copy-text-to-clipboard
 *
 * @param {string} str
 * @returns {boolean}
 */
export default function copy(str) {
    // Create a <textarea> element
    const el = document.createElement('textarea');
    // Set its value to the string that you want copied
    el.value = str;
    // Make it readonly to be tamper-proof
    el.setAttribute('readonly', '');
    // Move outside the screen to make it invisible
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    // Append the <textarea> element to the HTML document
    document.body.appendChild(el);

    const documentSelection = document.getSelection();
    // Check if there is any content selected previously
    const selected = documentSelection.rangeCount > 0
        // Store selection if found
        ? documentSelection.getRangeAt(0)
        // Mark as false to know no selection existed before
        : false;

    // Select the <textarea> content
    el.select();
    // Explicit selection workaround for iOS
    el.selectionStart = 0;
    el.selectionEnd = str.length;

    // Copy - only works as a result of a user action (e.g. click events)
    const success = document.execCommand('copy');
    // Remove the <textarea> element
    document.body.removeChild(el);

    // If a selection existed before copying
    if (selected) {
        // Unselect everything on the HTML document
        documentSelection.removeAllRanges();
        // Restore the original selection
        documentSelection.addRange(selected);
    }

    return success;
}
