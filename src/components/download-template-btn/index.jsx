import SortDownIcon from '@rsuite/icons/SortDown';
import { Button } from 'rsuite';
import * as XLSX from 'xlsx';
// eslint-disable-next-line react-refresh/only-export-components
export const downloadExcelTemplate = (arrayKey) => {
  const templateData = [arrayKey];

  const worksheet = XLSX.utils.aoa_to_sheet(templateData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

  XLSX.writeFile(workbook, 'Template.xlsx');
};

function DownloadTemplateBtn({ keys }) {
  return (
    <Button onClick={() => downloadExcelTemplate(keys)} startIcon={<SortDownIcon />}>
      Download template
    </Button>
  );
}

export default DownloadTemplateBtn;
