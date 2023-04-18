import { saveAs } from 'file-saver';
import XLSX from 'sheetjs-style';

const exportToExcel = async (excelData, fileName) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const filetExtension = '.xlsx';

  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = {
    Sheets: { data: ws },
    SheetNames: ['data'],
  };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  saveAs(data, fileName + filetExtension);
};

export default { exportToExcel };
