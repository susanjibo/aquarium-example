/**
 * Created by Andrew Rapo on 12/27/15.
 */

class MimState {
    constructor() {
        this.tries = 0;
        this.noInputCount = 0;
        this.noMatchCount = 0;
        this.lastResultState = '';
        this.success = false;
        this.failure = false;
        this.promptText = '';

    }

    get done() {
        return (this.success || this.failure);
    }

    incrementTries() {
        this.tries++;
    }

    incrementNoInputCount() {
        this.noInputCount++
    }

    incrementNoMatchCount() {
        this.noMatchCount++
    }

    toHtml() {
        let html = '<p>MimState:</br>';

        html += `promptText: <strong>${this.promptText}</strong></br>`;
        html += `try (#): ${this.tries}</br>`;
        html += `noInputCount: ${this.noInputCount}</br>`;
        html += `noMatchCount: ${this.noMatchCount}</br>`;
        html += `lastResultState: ${this.lastResultState}</br>`;
        html += `success: ${this.success}</br>`;
        html += `failure: ${this.failure}</br>`;
        html += `done: ${this.done}</br>`;

        html += '</p>';

        return html;
    }
}

export default MimState;
