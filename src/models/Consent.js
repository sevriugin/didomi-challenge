/** Class representing a single consent. */
class Consent {
    /**
     * Create a consent. See {@link consentTypes} for further information.
     * @param {Symbol} type - The consent type.
     * @param {boolean} granted - The consent granted true/false. Default value is true.
     */
    constructor(type, granted = true) {
        this.type = type;
        this.granted = granted;
    }
}

export default Consent;