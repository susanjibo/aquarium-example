/**
 * Created by Andrew Rapo on 12/27/15.
 */


class AsrResult {
    constructor(data) {
        this.data = data;
        this.input = null;
        this.nlParse = null;
        this.heuristicScore = null;
        this.slotIds = null;

        if (data) {
            this.initWithData(data);
        }
    }


    initWithData(data) {
        this.input = data.Input;
        this.nlParse = data.NLParse;
        this.heuristicScore = data.heuristic_score;

        this.slotIds = [];
        if (this.nlParse) {
            let id;
            for (id in this.nlParse) {
                if (this.nlParse.hasOwnProperty(id)) {
                    this.slotIds.push(id);
                }
            }
        }
    }

    get state() {
        let result = 'na';

        if (!this.input) {
            result = 'noInput';
        } else if (this.slotIds && this.slotIds.length == 0) {
            result = 'noMatch';
        } else if (this.input && (this.slotIds && this.slotIds.length > 0)) {
            result = 'match';
        }

        return result;
    }

    toHtml() {
        let html = `<p>AsrResult: ${this.state}</br>`;

        html += `input: ${this.input}</br>`;
        html += `heuristicScore: ${this.heuristicScore}</br>`;

        if (this.slotIds) {
            this.slotIds.forEach(id => {
                html += `${id}: ${this.nlParse[id]}, `;
            });
        }

        html += '</p>';

        return html;
    }
}

export default AsrResult;
