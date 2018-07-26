/**
 * Returns the support of all actions
 * @see https://github.com/zenorocha/clipboard.js/blob/3382ea3d14a6c46d274df6147c73a83ef47e41b3/src/clipboard.js#L87
 *
 * @returns {boolean}
 */
export default function isCopySupported() {
    const actions = ['copy'];
    let support = typeof document !== 'undefined' && typeof document.queryCommandSupported === 'function';

    actions.forEach((action) => {
        support = support && document.queryCommandSupported(action);
    });

    return support;
}
