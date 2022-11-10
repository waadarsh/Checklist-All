const { Pool, Client } = require('pg');
const pgp = require('pg-promise')();
const { application } = require('express');
const path = require('path');

const cn = {
    user: 'postgres',
    host: 'localhost',
    database: 'rnaipl',
    port: 5432,
    password: 'nissan'
};
const connectionString = 'postgresql://postgres:nissan@localhost:5432/rnaipl';
const pool = new Pool({connectionString,});

exports.getAdmin = function(req, res) { 
    res.sendFile(path.join(__dirname, '../html/index.html'));
 };

 exports.postAdmin = function(req, res) { 
    const data = req.body;
    console.log(data.workInstructions[0].workArea.inputField1);
    (async () => {
        const client = await pool.connect();

        try {
                await client.query('BEGIN')
                const chklstHdr = 'INSERT INTO chklst_hdr(chklst_name,station_name,total_no_instruction,status_code) VALUES ($1,$2,$3,110)'
                const chklstHdrVal = await client.query(chklstHdr,[data.templateName, data.stationName,data.totalNoOfInstruction])
                for (let i = 0; i < data.totalNoOfInstruction; i++) {
                    console.log('\x1b[93m--------------------------------------------------------');
                    console.log('Work Instructions',i+1);
                    console.log('\x1b[93m--------------------------------------------------------\x1b[0m\n');
                    const chklstDtl = 'INSERT INTO chklst_dtl(chklst_seq_nbr,process_name,check_location,check_details,chklst_id) VALUES ($1,$2,$3,$4,(SELECT MAX(chklst_id) FROM chklst_hdr)) RETURNING chklst_dtl_id'
                    const chklstDtlVal = await client.query(chklstDtl,[data.workInstructions[i].index,data.workInstructions[i].processName,data.workInstructions[i].checkLocation,data.workInstructions[i].checkDetails])
                    const chklstDetId = chklstDtlVal.rows[0].chklst_dtl_id;
                    console.log('\x1b[95mWork Area',i+1,'\n');
                    const key = Object.keys(data.workInstructions[i].workArea);
                    for(let j = 0; j<key.length;j++){
                        if (key[j] === 'image') {
                            console.log(key[j], ' Component');
                            const imageDir = `INSERT INTO image_dir(image_bytes) VALUES ($1) RETURNING image_id`
                            const imageDirVal = await client.query(imageDir,[data.workInstructions[i].workArea.image])
                            const imageDirId = imageDirVal.rows[0].image_id;
                            console.log('Image Inserted Successfully');
                            const imageChklstComponent = `INSERT INTO chklst_component(base_component_id,chklst_dtl_id,composite_component) VALUES ((SELECT component_id FROM component WHERE component_name = 'image' ),$1,$2) RETURNING chklst_component_id`
                            const imageChklstComponentVal = await client.query(imageChklstComponent,[chklstDetId,'N'])
                            const imgChklstId = imageChklstComponentVal.rows[0].chklst_component_id;
                            const imageChklstProperty = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                            const imageChklstPropertyVal = await client.query(imageChklstProperty,[imgChklstId,'ImageId',imageDirId,'display'])
                            console.log(key[j],' component completed \n');
                        }
                        if(key[j] === 'inputField1' || key[j] === 'inputField2'){
                            console.log('Inside IF | Checklist Component');
                            let chklstComponent;
                            if(key[j] === 'inputField1') {
                                chklstComponent = `INSERT INTO chklst_component(base_component_id,composite_component,chklst_dtl_id) VALUES ((SELECT component_id FROM component WHERE component_name = 'inputField1' ),$1,$2) RETURNING chklst_component_id`
                            }
                            if(key[j] === 'inputField2') {
                                chklstComponent = `INSERT INTO chklst_component(base_component_id,composite_component,chklst_dtl_id) VALUES ((SELECT component_id FROM component WHERE component_name = 'inputField2' ),$1,$2) RETURNING chklst_component_id`
                            }
                            const chklstComponentVal = await client.query(chklstComponent,['Y',chklstDetId])
                            let chklstCompId = chklstComponentVal.rows[0].chklst_component_id;
                            console.log('Execution successful');
                            const chklstComponentLabel = `INSERT INTO chklst_component(base_component_id,chklst_dtl_id,composite_component) VALUES ((SELECT component_id FROM component WHERE component_name = 'p_label' ),$1,$2) RETURNING chklst_component_id`
                            const chklstComponentLabelVal = await client.query(chklstComponentLabel,[chklstDetId,'N'])
                            let chklstLabelId = chklstComponentLabelVal.rows[0].chklst_component_id;
                            console.log('Label inserted successfully');
                            const chklstComponentInput = `INSERT INTO chklst_component(base_component_id,chklst_dtl_id,composite_component) VALUES ((SELECT component_id FROM component WHERE component_name = 'input' ),$1,$2) RETURNING chklst_component_id`
                            const chklstComponentInputVal = await client.query(chklstComponentInput,[chklstDetId,'N'])
                            let chklstInputId = chklstComponentInputVal.rows[0].chklst_component_id;
                            console.log('Input inserted successfully');
                            console.log('Inside IF | Checklist Composite Component Mapping');
                            const chklstCompositeComponentMapping1 = `INSERT INTO chklst_composite_component_mapping(chklst_component_id,chklst_child_component_id) VALUES ($1,$2)`
                            const chklstCompositeComponentMappingVal1 = await client.query(chklstCompositeComponentMapping1,[chklstCompId,chklstLabelId])
                            console.log('Checklist Composite Component Mapping Part 1',key[j],' Successful');
                            const chklstCompositeComponentMapping2 = `INSERT INTO chklst_composite_component_mapping(chklst_component_id,chklst_child_component_id) VALUES ($1,$2)`
                            const chklstCompositeComponentMappingVal2 = await client.query(chklstCompositeComponentMapping2,[chklstCompId,chklstInputId])
                            console.log('Checklist Composite Component Mapping Part 2 ',key[j],' Successful');
                            console.log('Inside IF | Checklist Component Property');
                            const chklstComponentProperty1 = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                            if(key[j] === 'inputField1') {
                                const chklstComponentPropertyVal1 = await client.query(chklstComponentProperty1,[chklstLabelId,'innerHTML',data.workInstructions[i].workArea.inputField1,'display'])
                                console.log('Label Property Inserted Successfully')
                                const chklstComponentProperty2 = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                                const chklstComponentPropertyVal2 = await client.query(chklstComponentProperty2,[chklstInputId,'value','NULL','input'])
                                console.log('Input Property Inserted Successfully')
                            }
                            if(key[j] === 'inputField2') {
                                const chklstComponentPropertyVal1 = await client.query(chklstComponentProperty1,[chklstLabelId,'innerHTML',data.workInstructions[i].workArea.inputField2,'display'])
                                console.log('Label Property Inserted Successfully')
                                const chklstComponentProperty2 = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                                const chklstComponentPropertyVal2 = await client.query(chklstComponentProperty2,[chklstInputId,'value','NULL','input'])
                                console.log('Input Property Inserted Successfully')
                            }
                            console.log(key[j],' component completed \n');
                        }
                        if (key[j] === 'judgement') {
                            console.log(key[j], ' Component');
                            const judgementChklstComponent = `INSERT INTO chklst_component(base_component_id,composite_component,chklst_dtl_id) VALUES ((SELECT component_id FROM component WHERE component_name = 'judgement' ),$1,$2) RETURNING chklst_component_id`
                            const judgementChklstComponentVal = await client.query(judgementChklstComponent,['Y',chklstDetId])
                            const judgementChklstComponentId = judgementChklstComponentVal.rows[0].chklst_component_id;
                            const judgementButton1 = `INSERT INTO chklst_component(base_component_id,chklst_dtl_id,composite_component) VALUES ((SELECT component_id FROM component WHERE component_name = 'button' ),$1,$2) RETURNING chklst_component_id`
                            const judgementButton1Val = await client.query(judgementButton1,[chklstDetId,'N'])
                            const judgementButton2 = `INSERT INTO chklst_component(base_component_id,chklst_dtl_id,composite_component) VALUES ((SELECT component_id FROM component WHERE component_name = 'button' ),$1,$2) RETURNING chklst_component_id`
                            const judgementButton2Val = await client.query(judgementButton2,[chklstDetId,'N'])
                            const judgementInput = `INSERT INTO chklst_component(base_component_id,chklst_dtl_id,composite_component) VALUES ((SELECT component_id FROM component WHERE component_name = 'input' ),$1,$2) RETURNING chklst_component_id`
                            const judgementInputVal = await client.query(judgementInput,[chklstDetId,'N'])
                            const judgementChklstId1 = judgementButton1Val.rows[0].chklst_component_id;
                            const judgementChklstId2 = judgementButton2Val.rows[0].chklst_component_id;
                            const judgementChklstId3 = judgementInputVal.rows[0].chklst_component_id;
                            const judgementChklstCompositeComponentMapping1 = `INSERT INTO chklst_composite_component_mapping(chklst_component_id,chklst_child_component_id) VALUES ($1,$2)`
                            const judgementChklstCompositeComponentMappingVal1 = await client.query(judgementChklstCompositeComponentMapping1,[judgementChklstComponentId,judgementChklstId1])
                            const judgementChklstCompositeComponentMapping2 = `INSERT INTO chklst_composite_component_mapping(chklst_component_id,chklst_child_component_id) VALUES ($1,$2)`
                            const judgementChklstCompositeComponentMappingVal2 = await client.query(judgementChklstCompositeComponentMapping2,[judgementChklstComponentId,judgementChklstId2])
                            const judgementChklstCompositeComponentMapping3 = `INSERT INTO chklst_composite_component_mapping(chklst_component_id,chklst_child_component_id) VALUES ($1,$2)`
                            const judgementChklstCompositeComponentMappingVal3 = await client.query(judgementChklstCompositeComponentMapping3,[judgementChklstComponentId,judgementChklstId3])
                            const judgementComponentProperty1 = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                            const judgementComponentPropertyVal1 = await client.query(judgementComponentProperty1,[judgementChklstId1,'textContent','default','display'])
                            const judgementComponentProperty2 = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                            const judgementComponentPropertyVal2 = await client.query(judgementComponentProperty2,[judgementChklstId2,'textContent','default','display'])
                            const judgementComponentProperty3 = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                            const judgementComponentPropertyVal3 = await client.query(judgementComponentProperty3,[judgementChklstId3,'value','NULL','input'])
                            console.log(key[j],' component completed \n');
                        }
                        if (key[j] === 'comment') {
                            console.log(key[j], ' Component');
                            const commentChklstComponent = `INSERT INTO chklst_component(base_component_id,composite_component,chklst_dtl_id) VALUES ((SELECT component_id FROM component WHERE component_name = 'comment' ),$1,$2) RETURNING chklst_component_id`
                            const commentChklstComponentVal = await client.query(commentChklstComponent,['Y',chklstDetId])
                            let commentChklstCompId = commentChklstComponentVal.rows[0].chklst_component_id;
                            console.log('Execution successful');
                            const commentChklstComponentLabel = `INSERT INTO chklst_component(base_component_id,chklst_dtl_id,composite_component) VALUES ((SELECT component_id FROM component WHERE component_name = 'p_label' ),$1,$2) RETURNING chklst_component_id`
                            const commentChklstComponentLabelVal = await client.query(commentChklstComponentLabel,[chklstDetId,'N'])
                            let commentChklstLabelId = commentChklstComponentLabelVal.rows[0].chklst_component_id;
                            console.log('Label inserted successfully');
                            const commentChklstComponentInput = `INSERT INTO chklst_component(base_component_id,chklst_dtl_id,composite_component) VALUES ((SELECT component_id FROM component WHERE component_name = 'input' ),$1,$2) RETURNING chklst_component_id`
                            const commentChklstComponentInputVal = await client.query(commentChklstComponentInput,[chklstDetId,'N'])
                            let commentChklstInputId = commentChklstComponentInputVal.rows[0].chklst_component_id;
                            console.log('Input inserted successfully');
                            const commentChklstCompositeComponentMapping1 = `INSERT INTO chklst_composite_component_mapping(chklst_component_id,chklst_child_component_id) VALUES ($1,$2)`
                            const commentChklstCompositeComponentMappingVal1 = await client.query(commentChklstCompositeComponentMapping1,[commentChklstCompId,commentChklstLabelId])
                            console.log('Checklist Composite Component Mapping Part 1',key[j],' Successful');
                            const commentChklstCompositeComponentMapping2 = `INSERT INTO chklst_composite_component_mapping(chklst_component_id,chklst_child_component_id) VALUES ($1,$2)`
                            const commentChklstCompositeComponentMappingVal2 = await client.query(commentChklstCompositeComponentMapping2,[commentChklstCompId,commentChklstInputId])
                            console.log('Checklist Composite Component Mapping Part 2 ',key[j],' Successful');
                            const commentChklstComponentProperty1 = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                            const commentChklstComponentPropertyVal1 = await client.query(commentChklstComponentProperty1,[commentChklstLabelId,'innerHTML',data.workInstructions[i].workArea.comment,'display'])
                            console.log('Label Property Inserted Successfully')
                            const commentChklstComponentProperty2 = `INSERT INTO chklst_component_property(chklst_component_id,property_name,property_value,property_type) VALUES ($1,$2,$3,$4)`
                            const commentChklstComponentPropertyVal2 = await client.query(commentChklstComponentProperty2,[commentChklstInputId,'value','NULL','input'])
                            console.log('Input Property Inserted Successfully')
                            console.log(key[j],' component completed \n');
                        }
                    }
                    console.log('\x1b[95mWork Area',i+1,'\x1b[95mAdded Successfully\x1b[0m \n');
                }
                await client.query('COMMIT')
                console.log('\x1b[93mWork Instruction Added Successfully\x1b[0m \n');
                console.log('\x1b[92m--------------------------------------------------------'); 
                console.log('COMMIT Successful');
                console.log('--------------------------------------------------------\x1b[0m \n');
                res.sendFile(path.join(__dirname, '../views/ic.html'));
        } catch (e) {
            await client.query('ROLLBACK ');
            console.log('ROLLBACK',e)
            throw e;
        } finally {
            client.release();
        };
    })().catch(error => console.error(error.stack));
    
  };