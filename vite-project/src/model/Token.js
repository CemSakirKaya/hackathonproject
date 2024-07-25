export default class Token {
    #id;
    #name;
    #description;
    #img;
    #details;

    constructor(id, name, description, img, details = []) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#img = img;
        this.#details = Array.isArray(details) ? details : [];
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getDescription() {
        return this.#description;
    }

    getImg() {
        return this.#img;
    }

    getDetails() {
        return this.#details;
    }

    setId(id) {
        this.#id = id;
    }

    setName(name) {
        this.#name = name;
    }

    setDescription(description) {
        this.#description = description;
    }

    setImg(img) {
        this.#img = img;
    }

    setDetails(details) {
        if (Array.isArray(details)) {
            this.#details = details;
        } else {
            throw new Error('Details must be an array');
        }
    }

    addDetail(detail) {
        this.#details.push(detail);
    }

    removeDetail(index) {
        if (index >= 0 && index < this.#details.length) {
            this.#details.splice(index, 1);
        } else {
            throw new Error('Invalid index');
        }
    }

    updateDetail(index, newDetail) {
        if (index >= 0 && index < this.#details.length) {
            this.#details[index] = newDetail;
        } else {
            throw new Error('Invalid index');
        }
    }
}