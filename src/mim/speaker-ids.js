/**
 * Created by Andrew Rapo on 12/27/15.
 */

class SpeakerIds {
    constructor(data) {
        this.data = data;
        this.speakerIdStatus = null;
        this.speakerIds = null;

        if (data) {
            this.initWithData(data);
        }
    }

    initWithData(data) {
        this.speakerIdStatus = data.speakerIdStatus;
        this.speakerIds = data.speakerIds;
    }

    toHtml() {
        let html = '<p>SpeakerIds:</br>';

        html += `speakerIdStatus: ${this.speakerIdStatus}</br>`;

        if (this.speakerIds) {
            this.speakerIds.forEach(id => {
                html += `${id}, `;
            });
        }

        html += '</p>';

        return html;
    }
}

export default SpeakerIds;
