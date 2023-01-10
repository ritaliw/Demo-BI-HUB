import React from 'react';
import Report from './Report'

export function reportList(props) {
    let Reports = props.filteredReports.map((report) => {
        return <Report key={report.key} type={report.Name} title={report.Description} page={report.CollectionName} collectionName={report.ReportType} />
    });

    return (
        <div className="reports-data">{Reports}</div>
    );
}
export default reportList;