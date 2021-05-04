import { v4 as uuidv4 } from 'uuid';

class Option {
    constructor(label, value, icon, title) {
        this.id = uuidv4(); 
        this.label = label;
        this.value = value;
        this.icon = icon;
        this.title = title;
    }
}

export default Option;