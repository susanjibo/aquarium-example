/**
 * Created by Andrew Rapo on 12/22/15.
 */

import path from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';
import parse from 'csv-parse';
import MimConfig from './mim-config';

class MimDb {
    constructor() {
        this.configs = {};

    }

    initWithCSVData(config_path, prompts_path, callback) {
        if (!(config_path && prompts_path)) {
            console.log(`MimDb ERROR: data paths must be specified`);
        }

        console.log(`initWithTestCSVData`);
        var parser_settings = parse({delimiter: ',', columns: true}, (err, data) => {
            //console.log(data);
            this.initWithConfigsJSON(data);

            var parser_prompts = parse({delimiter: ',', columns: true}, (err, data) => {
                //console.log(data);
                this.initWithPromptsJSON(data);

                if (callback) {
                    callback();
                }
            });

            fs.createReadStream(prompts_path).pipe(parser_prompts);
        });

        fs.createReadStream(config_path).pipe(parser_settings);
    }


    initWithTestJSONData(config_path, prompts_path) {
        if (!(config_path && prompts_path)) {
            console.log(`MimDb ERROR: data paths must be specified`);
        }
        let config_data = require(config_path);
        this.initWithConfigsJSON(config_data);

        let prompts_data = require(prompts_path);
        this.initWithPromptsJSON(prompts_data);
    }

    initWithConfigsJSON(data) {
        console.log(`initWithConfigsJSON:`);
        data.forEach(config_data => {
            let config = new MimConfig();
            config.initWithJSON(config_data);
            this.configs[config.mimId] = config;
            console.log(`  added MIM: ${config.mimId}`);
        });
    }

    initWithPromptsJSON(data) {
        console.log(`initWithPromptsJSON:`);
        data.forEach(prompt_data => {
            //console.log(`prompt_data.mim_id: ${prompt_data.mim_id}`);
            //console.log(this.configs);
            let config = this.configs[prompt_data.mim_id];

            if (config) {
                config.addPromptWithJSON(prompt_data);
                console.log(`  added prompt to ${prompt_data.mim_id}: ${prompt_data.prompt_id} `);
            } else {
                console.log(`  skipping prompt: ${prompt_data.prompt_id}`);
            }


        });
    }

    getMimConfigsWithMimId(mim_id) {
        let result = this.configs[mim_id];

        if (!result) {
            console.log(`MimDb: getMimConfigsWithMimId: mim_id not found: ${mim_id}`);
        }

        return result;
    }

    getMimIds() {
        let result = Object.keys(this.configs);

        return result;
    }

    writeMimConfigsToFilesWithPath(data_path) {
        let mim_ids = this.getMimIds();

        mim_ids.forEach(mim_id => {
            this.writeMimConfigToFileWithPathAndMimId(data_path, mim_id);
        });
    }

    writeMimConfigToFileWithPathAndMimId(data_path, mim_id) {

        let mim_config = this.getMimConfigsWithMimId(mim_id);
        let filename = path.resolve(data_path, mim_config.skillId, mim_config.mimId + '.json');

        //fs.writeFile(filename, JSON.stringify(mim_config.toJSON()), (err) => {
        //    if (err) {
        //        console.log(`writeMimConfigToFileWithPathAndMimId`);
        //        console.log(err);
        //    }
        //});

        jsonfile.writeFile(filename, mim_config.toJSON(), {spaces: 2}, (err) => {
            if (err) {
                console.log(`writeMimConfigToFileWithPathAndMimId`);
                console.log(err);
            }
        });
    }

}

export
    default
    MimDb;
