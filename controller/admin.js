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

    (async () => {
        const client = await pool.connect();

        try {
                await client.query('BEGIN')
                const chklstHdr = 'INSERT INTO chklst_hdr(chklst_name,station_name,total_no_instruction,status_code) VALUES ($1,$2,$3,90)'
                const chklstHdrVal = await client.query(chklstHdr,[data.templateName, data.stationName,data.totalNoOfInstruction])
                for (let i = 0; i < data.totalNoOfInstruction; i++) {
                    const chklstDtl = 'INSERT INTO chklst_dtl(chklst_seq_nbr,process_name,check_location,check_details,chklst_id) VALUES ($1,$2,$3,$4,(SELECT MAX(chklst_id) FROM chklst_hdr))'
                    const chklstDtlVal = await client.query(chklstDtl,[data.workInstructions[i].index,data.workInstructions[i].processName,data.workInstructions[i].checkLocation,data.workInstructions[i].checkDetails])
                    const key = Object.keys(data.workInstructions[i].workArea);
                    console.log('Inside For loop 1');
                    for(let j = 0; j<key.length;j++){
                        console.log('inside for loop 2');
                        if(key[j] === 'inputField1' || key[j] === 'inputField2'){
                            console.log('Inside IF | Checklist Component');
                            let chklstComponent;
                            if(key[j] === 'inputField1') {
                                chklstComponent = `INSERT INTO chklst_component(chklst_dtl_id,base_component_id,composite_component) VALUES ((SELECT MAX(chklst_dtl_id) FROM chklst_dtl),(SELECT component_id FROM component WHERE component_name = 'inputField1' ),$1) RETURNING chklst_dtl_id,chklst_component_id`
                            }
                            if(key[j] === 'inputField2') {
                                chklstComponent = `INSERT INTO chklst_component(chklst_dtl_id,base_component_id,composite_component) VALUES ((SELECT MAX(chklst_dtl_id) FROM chklst_dtl),(SELECT component_id FROM component WHERE component_name = 'inputField2' ),$1) RETURNING chklst_dtl_id,chklst_component_id`
                            }
                            const chklstComponentVal = await client.query(chklstComponent,['Y'])
                            let chklstDetId = chklstComponentVal.rows[0].chklst_dtl_id;
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
                            console.log(key[j],' completed');
                        }
                    }
                }
                await client.query('COMMIT')
                console.log('COMMIT Successful'); 

        } catch (e) {
            await client.query('ROLLBACK ');
            console.log('ROLLBACK',e)
            throw e;
        } finally {
            client.release();
        };
    })().catch(error => console.error(error.stack));
    
    res.send("Test");
  };