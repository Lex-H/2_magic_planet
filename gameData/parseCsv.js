console.log("運行parseCsv.js")

import {promises as fs} from 'fs'; // 'fs/promises' not available in node 12
import { parse } from 'csv-parse/sync';


// Read the content
const content = await fs.readFile('./parseCsv/input.csv');

// Parse the CSV content
// columns: true，把CSV變成物件而不是預設的陣列
// bom: true => 可以正常開啟以UTF-8 編碼的CSV 檔案
const records = parse(content, {bom: true, columns: true});

// 將物件轉為JSON
const recordsJson = JSON.stringify(records);

// 寫入JSON到檔案
fs.writeFile('./parseCsv/output.json', recordsJson)

console.log('轉換成功！')