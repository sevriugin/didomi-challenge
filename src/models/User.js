import Consent from './Consent';
import consentTypes, { consentTypesMap, consentTypeReverseMap } from './consentTypes';

import { v4 as uuidv4 } from 'uuid';

/** Class representing a user and assosiated consents. */
class User {
    /**
     * Create a user with empty consents array and rundom id.
     * @param {string} name - The user name.
     * @param {string} email - The user email.
     */
    constructor(name, email) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.consents = [];
    }
    /** 
     * Return consent if user has this type of consent or undefined if not
     * @param {Symbol} type - The consent type
     * @returns {Consent | undefined} The Consent object or undefined 
    */
    has(type) {
        return this.consents.find(item => item.type === type)
    }
    /**
     * Add new consent to user if he does not have this type. 
     * Does nothing if consent type already exist in user object.
     * @param {Symbol} type - The consent type 
     * @param {boolean} granted - The consent status 
     * @returns {User} User object 
     */
    add(type, granted = true) {
        if(this.has(type) === undefined) {
            let consent = new Consent(type, granted)
            this.consents.push(consent);
        }
        return this
    }
    /**
     * Toggle / add consent of type to user object. If consent exist it 
     *  toggles consent granted property if not add new consent to user
     *  object with granted == true
     * @param {Symbol} type 
     * @returns {User} User object
     */
    toggle(type) {
        let consent = this.has(type);

        if(consent === undefined) {
            this.add(type);
        } else {
            consent.granted = !consent.granted;  
        }
    }
    /**
     * Returns concatenation of consent titles that user has with 
     *  granded property equal to true. 
     * @returns {sring} concatenation of granted consents titles 
     */
    consetsToString() {
        let result = ''; let first = true;

        for (const item of this.consents) {
            if (item.granted) {
                if (first) {
                    result = result + consentTypes[item.type];
                    first = false;
                } else {
                    result = result + ', ' + consentTypes[item.type]; 
                }
            }
        }

        return result;
    }
    /**
     * Check if object is valid 
     * @returns {boolean}
     */
    get isValid() {
        if (this.name === '' || this.email === '') return false;

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) return false;

        if (this.consents.length === 0) return false;

        if (this.consents.find(item => item.granted) === undefined) return false;

        return true;
    }
    /**
     * Check if object is empty
     * @returns {boolean}
     */
    get isEmpty() {
        if(this.name === '' && this.email === '' && this.consents.length === 0) return true;

        return false
    }
    /**
     * Empty the object and return it as result
     * @returns {User} reference to this empty object
     */
    empty() {
        this.id = uuidv4();
        this.name = '';
        this.email = '';
        this.consents = []; 

        return this
    }
    /**
     * Serialize User object converting consets sybmols to strings 
     * @returns {any} serialized user object
     */
    serialize() {
        const serialized = { id: this.id, name: this.name, email: this.email }
        serialized.consents = this.consents.map(item => ({
            type: consentTypeReverseMap.get(item.type),
            granted: item.granted 
        }));
        return serialized; 
    }
    /**
     * Create new user from data object
     * @param {any} data 
     * @returns {User}
     */
    static userFromData(data) {
        const user =  new User(data.name, data.email);

        if (data.consents) {
            for (const item of data.consents) {
                if(consentTypesMap.has(item.type)) {
                    const type = consentTypesMap.get(item.type);
                    const granted = item.granted;
                    user.add(type, granted);
                }
            }
        }
        return user;
    }
    /**
     * Create new empty User object
     * @returns {User} empty user object with name and email === ''
     */
    static newEmpty() {
        const user = new User('','');
        return user;
    }
}

export default User;