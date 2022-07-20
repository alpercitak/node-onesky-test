require('dotenv').config({ path: __dirname + '/./../.env' });

import fs = require('fs');
import { OneSky } from 'node-onesky';

const params = { PUBLIC_KEY: process.env.ONESKY_PUBLIC_KEY || '', SECRET_KEY: process.env.ONESKY_SECRET_KEY || '' };
const onesky = new OneSky(params);

(async () => {
  // // list locales
  // console.log(await onesky.locales.list());

  // // list project_types
  // console.log(await onesky.project_types.list());

  // // handle project groups
  let project_group_id: number = parseInt(process.env.ONESKY_PROJECT_GROUP_ID || '');

  if (!project_group_id) {
    // list all project groups
    let project_groups = ((await onesky.project_groups.list({ per_page: 100, page: 1 })) || {}).data;
    // get the first project group if there are many, otherwise create a new one
    if (project_groups.length) {
      project_group_id = project_groups[0].id;
    } else {
      const x = await onesky.project_groups.create({ name: 'node-onesky-projectgroup-001', locale: 'es' });
      project_group_id = x.data.id;
    }
  }

  // // display the details of the project group
  // console.log(await onesky.project_groups.show(project_group_id));

  // // list the languages of the project group
  // console.log(await onesky.project_groups.languages(project_group_id));

  // // delete the project group
  // console.log(await onesky.project_groups.delete(project_group_id));

  // // handle projects
  let project_id: number = parseInt(process.env.ONESKY_PROJECT_ID || '');

  if (!project_id) {
    // // list all projects in the project group
    let projects = ((await onesky.projects.list(project_group_id)) || {}).data;
    // // get the first project if there are many, otherwise create a new one
    if (projects.length) {
      project_id = projects[0].id;
    } else {
      const x = await onesky.projects.create(project_group_id, { project_type: 'website', name: 'node-onesky-project-001', description: 'description' });
      project_id = x.id;
    }
  }

  // // display project details
  // console.log(await onesky.projects.show(project_id));

  // // list the languages of the project
  // console.log(await onesky.projects.languages(project_id));

  // // update project details
  // console.log(await onesky.projects.update(project_id, {name: "node-onesky-project-001-upd", description: "description-upd"}));

  // // delete the project
  // console.log(await onesky.projects.delete(project_id));

  // // list the files of a project
  // console.log(await onesky.files.list(project_id, {per_page: 100, page: 1}));

  // // upload a file to a project
  // const data = {
  //     locale: "en",
  //     file: {
  //         // value: fs.createReadStream("./test.json"),
  //         value: JSON.stringify({ "Hello": "Hello", "Welcome": "Welcome", "Logout": "Logout" }),
  //         options: { filename: 'en.json' }
  //     },
  //     file_format: "HIERARCHICAL_JSON"
  // };
  // console.log(await onesky.files.upload(project_id, data));

  // // delete a file in a project
  // console.log(await onesky.files.delete(project_id, {file_name: "en.json"}));

  // // display quotations of a project
  // console.log(await onesky.quotations.show(project_id, {files: ["en.json"], to_locale: "es"}));

  // // list orders
  // console.log(await onesky.orders.list(project_id, {file_name: "en.json", per_page: 100, page: 1}));

  // // display order details
  // console.log(await onesky.orders.show(project_id, process.env.ONESKY_ORDER_ID));

  // // create order
  // console.log(await onesky.orders.create(project_id, {files: ["en.json"], to_locale: "zh-TW"}));

  // // list tasks
  // console.log(await onesky.tasks.list(project_id, {per_page: 100, page: 1, status: "completed"}));

  // // display task details
  // console.log(await onesky.tasks.show(project_id, process.env.ONESKY_IMPORT_ID));

  // // export translation
  // console.log(await onesky.translations.export(project_id, { locale: "en", source_file_name: "en.json", export_file_name: "en-export.json" }));

  // // export translation multilingual
  // console.log(await onesky.translations.export_multilingual(project_id, {source_file_name: "en.json", export_file_name: "en-export-multi.json", file_format: "I18NEXT_MULTILINGUAL_JSON"}));

  // // export translation app-descriptions
  // console.log(await onesky.translations.export_appdescriptions(project_id, {locale: "es"}));

  // // get translation status
  // console.log(await onesky.translations.status(project_id, {file_name: "en.json", locale: "es"}));
})();
