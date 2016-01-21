/**
 * Created by Andrew Rapo on 12/22/15.
 */

import MimPrompt from './mim-prompt';

class MimConfig {

    constructor() {
        this.mimId = '';
        this.skillId = '';
        this.mimType = '';
        this.ruleName = '';
        this.ruleSlots = '';
        this.screenSlotsAvailable = false;
        this.sampleUtterances = '';
        this.timeout = 0;
        this.maxTries = null;
        this.forceConfirmation = false;
        this.bargeIn = true;
        this.photoQualityLight = false;
        this.notes = '';
        this.modified = '';

        this.prompts = [];
    }

    initWithJSON(data) {

        this.mimId = data.mim_id;
        this.skillId = data.skill_id;
        this.mimType = data.mim_type;
        this.ruleName = data.rule_name;
        this.ruleSlots = data.rule_slots;
        this.screenSlotsAvailable = data.screen_slots_available;
        this.sampleUtterances = data.sample_utterances;
        this.timeout = data.timeout;
        this.maxTries = data.max_tries;
        this.forceConfirmation = data.force_confirmation;
        this.bargeIn = data.barge_in;
        this.photoQualityLight = data.photo_quality_light;
        this.notes = data.notes;
        this.modified = data.modified;

        if (data.prompts) {
            data.prompts.forEach(prompt_data => {
                this.addPromptWithJSON(prompt_data);
            });
        }
    }

    addPromptWithJSON(data) {
        let prompt = new MimPrompt();
        prompt.initWithJSON(data);

        this.prompts.push(prompt);
    }

    getPromptsWithCategory(category) {
        let result = [];

        this.prompts.forEach(prompt => {
            if (prompt.promptCategory === category) {
                result.push(prompt);
            }
        });

        return result;
    }

    getPromptWithCategoryAndSubCategory(category, sub_category) {
        let prompts = [];
        let result = null;
        let prompt_count = 0;

        this.prompts.forEach(prompt => {
            if ((prompt.promptCategory === category) && (prompt.promptSubCategory === sub_category)) {
                prompts.push(prompt);
                prompt_count++;
            }
        });

        if (prompt_count > 0) {
            let random_index = Math.floor(Math.random() * prompt_count);
            result = prompts[random_index];
        }

        return result;
    }

    getErrorNoMatchPrompt() {
        let prompts = [];
        let result = null;
        let prompt_count = 0;

        this.prompts.forEach(prompt => {
            if ((prompt.promptCategory === MimConfig.promptCategoryError) && (prompt.promptSubCategory.substr(0,2) === 'NM')) {
                prompts.push(prompt);
                prompt_count++;
            }
        });

        if (prompt_count > 0) {
            let random_index = Math.floor(Math.random() * prompt_count);
            result = prompts[random_index];
        }

        return result;
    }

    getErrorNoInputPrompt() {
        let prompts = [];
        let result = null;
        let prompt_count = 0;

        this.prompts.forEach(prompt => {
            if ((prompt.promptCategory === MimConfig.promptCategoryError) && (prompt.promptSubCategory.substr(0,2) === 'NI')) {
                prompts.push(prompt);
                prompt_count++;
            }
        });

        //console.log(`getErrorNoInputPrompt: prompt_count: ${prompt_count}`);
        if (prompt_count > 0) {
            let random_index = Math.floor(Math.random() * prompt_count);
            result = prompts[random_index];
        }

        return result;
    }

    getSampleUtterancesAsNameLabelPairs() {
        //{name: 'pepperoni', label: 'Say: Pepperoni'}
        let result = [];

        if (this.sampleUtterances && (this.sampleUtterances != '')) {
            let slots = this.sampleUtterances.split(',');
            slots.forEach(slot => {
                let slot_obj = {name: slot, label: `Say: ${slot}`};
                result.push(slot_obj);
            });

        } else {
            console.log(`getSampleUtterancesAsNameLabelPairs: no utterances available`);
        }

        return result;
    }

    toString() {
        let result = `MimConfig: ${this.mimId}: \n`;

        this.prompts.forEach(prompt => {
            result += prompt.toString() + `\n`;
        });
        result += `\n`;

        return result;
    }

    toHtml() {
        let html = '<p>Mim Config:</br>';

        html += `mimId: ${this.mimId}</br>`;
        html += `skillId: ${this.skillId}</br>`;
        html += `mimType: ${this.mimType}</br>`;
        html += `ruleName: ${this.ruleName}</br>`;
        html += `ruleSlots: ${this.ruleSlots}</br>`;
        html += `screenSlotsAvailable: ${this.screenSlotsAvailable}</br>`;
        html += `sampleUtterances: ${this.sampleUtterances}</br>`;
        html += `timeout: ${this.timeout}</br>`;
        html += `maxTries: ${this.maxTries}</br>`;
        html += `forceConfirmation: ${this.forceConfirmation}</br>`;
        html += `bargeIn: ${this.bargeIn}</br>`;
        html += `photoQualityLight: ${this.photoQualityLight}</br>`;
        html += `modified: ${this.modified}</br>`;

        html += '</p>';

        return html;
    }

    toJSON() {
        let result = {};

        result.mim_id = this.mimId;
        result.skill_id = this.skillId;
        result.mim_type = this.mimType;
        result.rule_name = this.ruleName;
        result.rule_slots = this.ruleSlots;
        result.screen_slots_available = this.screenSlotsAvailable;
        result.sample_utterances = this.sampleUtterances;
        result.timeout = this.timeout;
        result.max_tries = this.maxTries;
        result.force_confirmation = this.forceConfirmation;
        result.barge_in = this.bargeIn;
        result.photo_quality_light = this.photoQualityLight;
        result.notes = this.notes;
        result.modified = this.modified;

        result.prompts = [];
        this.prompts.forEach(prompt => {
            result.prompts.push(prompt.toJSON());
        });

        return result;
    }
}

MimConfig.promptCategoryEntry = 'Entry-Core';
MimConfig.promptCategoryError = 'Errors';

MimConfig.promptSubCategoryQuestion = 'Question';
MimConfig.promptSubCategoryNoMatch = 'NoMatch';
MimConfig.promptSubCategoryNoInput = 'NoInput';


export default MimConfig;
