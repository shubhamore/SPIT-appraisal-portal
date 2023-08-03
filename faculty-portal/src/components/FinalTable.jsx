import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";

const FinalTable = ({ facultyData, change }) => {
    // console.log(report)
    const [report, setReport] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReport = async () => {
            // console.log(viewBonus)
            await axios.post("http://localhost:5000/api/faculty/appraisal/getappraisal", {
                yearofAssesment: facultyData.yearofAssesment,
                facultyName: facultyData.facultyName,
            })
            .then((res) => {
                console.log(res.data)
                setReport(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        }
        fetchReport()
    },[change])

    return (
        <>
        {loading ? (
            <div>
                <CircularProgress />
            </div>
        ) : (
            <div>
            <div
                className="dimhead"
                style={{
                    backgroundColor: "#fabf8f",
                    margin: "0em auto",
                    padding: "0.4em 0.4em",
                    width: "95%",
                }}
            >
                <strong>
                    {" "}
                    Perception Marks out of 100 (G) :{" "}
                    {
                        report.Dimension4.confidentialReport.perceptionMarks
                    }{" "}
                </strong>
            </div>
            <table
                style={{
                    width: "95%",
                    margin: "0em auto",
                }}
            >
                {/* <Table bordered style={{ margin: "1rem", width: "95%" }}> */}
                <thead>
                    <tr>
                        <th className="table-header text-center align-middle">
                            Dimension
                        </th>
                        <th className="table-header text-center align-middle">
                            Total Marks
                        </th>
                        <th className="table-header text-center align-middle">
                            Multiplying factor as per cadre
                        </th>
                        <th className="table-header text-center align-middle">
                            Total Marks
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="table-content table-data text-center align-middle">
                            Academics
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension1.totalMarks.toFixed(2)}
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension1.multiplyingFactor.toFixed(2)}
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension1.finalMarks.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="table-content table-data text-center align-middle">
                            Research and Development
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension2.totalMarks.toFixed(2)}
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension2.multiplyingFactor.toFixed(2)}
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension2.finalMarks.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="table-content table-data text-center align-middle">
                            Administration and Outreach
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension3.totalMarks.toFixed(2)}
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension3.multiplyingFactor.toFixed(2)}
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension3.finalMarks.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="table-content table-data text-center align-middle">
                            Perception/ 360 degree feedback
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension4.totalMarks.toFixed(2)}
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension4.multiplyingFactor.toFixed(2)}
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.dimension4.finalMarks.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="table-content table-data text-center align-middle"
                            colSpan={3}
                        >
                            Grand Total (Faculty rating out of 100)
                        </td>
                        <td className="table-content table-data text-center align-middle">
                            {report.finalGrandTotal.GrandTotal.toFixed(2)}
                        </td>
                    </tr>
                </tbody>
                {/* </Table> */}
            </table>
        </div>
        )}
        </>
    );
};

export default FinalTable;