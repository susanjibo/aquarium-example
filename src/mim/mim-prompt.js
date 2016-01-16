/**
 * Created by Andrew Rapo on 12/23/15.
 */

class MimDbPrompt {
    constructor() {
        this.id = '';
        this.mimId = '';
        this.promptCategory = '';
        this.promptSubCategory = '';
        this.index = '';
        this.condition = '';
        this.prompt = '';
        this.media = '';
        this.extra = '';
        this.promptId = '';
    }

    initWithJSON(data) {

        this.id = data.id;
        this.mimId = data.mim_id;
        this.promptCategory = data.prompt_category;
        this.promptSubCategory = data.prompt_sub_category;
        this.index = data.index;
        this.condition = data.condition;
        this.prompt = data.prompt;
        this.media = data.media;
        this.extra = data.extra;
        this.promptId = data.prompt_id;
    }

    getPromptText() {
        let result = this.prompt;

        return result;
    }

    toString() {
        let result = 'Prompt: ';
        result += this.mimId + ', ';
        result += this.promptCategory + ', ';
        result += this.promptSubCategory + ', ';
        result += this.index + ', ';
        result += this.condition + ', ';
        result += this.media + ': ';
        result += this.extra + ': ';
        result += '\'' + this.prompt + '\'';

        return result;
    }

    toHtml() {
        let html = '<p>Prompt:</br>';

        html += `mimId: ${this.mimId}</br>`;
        html += `promptCategory: ${this.promptCategory}</br>`;
        html += `promptSubCategory: ${this.promptSubCategory}</br>`;
        html += `index: ${this.index}</br>`;
        html += `condition: ${this.condition}</br>`;
        html += `prompt: ${this.prompt}</br>`;
        html += `extra: ${this.extra}</br>`;
        html += `media: ${this.media}</br>`;

        html += '</p>';

        return html;
    }

    toJSON() {
        let result = {};
        result.mim_id = this.mimId;
        result.prompt_category = this.promptCategory;
        result.prompt_sub_category = this.promptSubCategory
        result.index = this.index;;
        result.condition = this.condition;
        result.prompt = this.prompt;
        result.media = this.media;
        result.extra = this.extra;
        result.prompt_id = this.promptId;

        return result;
    }
}

export default MimDbPrompt;
