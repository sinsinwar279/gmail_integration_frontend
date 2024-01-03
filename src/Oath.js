import React, {useEffect, useState} from "react";
import {useSearchParams,useNavigate} from "react-router-dom";
import axios from "axios";
import {Table} from "antd";

function getHeadersData(headers, value){
    if (!headers || headers === []){
        return ""
    }

    console.log(headers, "headers")
    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        console.log(header.name, "header")
        console.log(header.name === value)
        if (header.name === value){
            return header.value
        }
    }

    return "empty"
}

const column = [
    {
        title: 'From',
        dataIndex: "payload",
        render: (_, { payload }) => {
            const headers = payload.headers;
            return (
                <>
                    <p>{getHeadersData(headers, "From")}</p>
                </>
            )
        }
    },
    {
        title: 'Subject',
        dataIndex: "payload",
        render: (_, { payload }) => {
            const headers = payload.headers;
            return (
                <>
                    <p>{getHeadersData(headers, "Subject")}</p>
                </>
            )
        }
    },
    {
        title: 'snippet',
        dataIndex: 'snippet'

    }
];

function Auth() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [params, setParams] = useSearchParams()
    const [tabledata, setTabledata] = useState([]);
    const data = params.get("code") || "none";
    const navigate = useNavigate();

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const fetchApi = async () => {
        try {
            const url = "http://localhost:8000/auth"
            console.log("before call")
            console.log(data)
            const res = await axios.post(url, {
                "code": data
            });
            console.log(res, "response")
            if (res.status === 200) {
                setTabledata(res.data.list);
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e)
        }
        // if((res.status)
    }
    useEffect(() => {
        setIsLoading(true);
        //navigate('/success')
        fetchApi();
        // setIsLoading(false)
    }, [])
    return (
        <>

            {
                isLoading ? (<>Loading</>) : (

                    <Table
                        className='custom-table-wrap product-table'
                        // rowSelection={rowSelection}
                        columns={column}
                        dataSource={tabledata}
                        loading={isLoading}
                        pagination={
                            false
                        }
                    />

                    // {
                    //     tabledata.length > 0 &&
                    //     (
                    //         <div className='pagination_wrap'>
                    //             <button onClick={() => {
                    //                 handleOtherDropdownChange(otherStoreSelected, previousPageLink, currentPage - 1)
                    //             }} disabled={currentPage === 1 || loadingTable}>Previous
                    //                 <svg viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg>
                    //             </button>
                    //
                    //             {!isLoading && (
                    //                 <div className='pagination_text' style={{}}>
                    //                     <span>Page {currentPage} of {Math.ceil(totalRecords / 50)}</span>
                    //                 </div>
                    //             )}
                    //
                    //             <button onClick={() => {
                    //                 handleOtherDropdownChange(otherStoreSelected, nextPageLink, currentPage + 1)
                    //             }} disabled={currentPage === Math.ceil(totalRecords / 50) || loadingTable}>Next
                    //                 <svg viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>
                    //             </button>
                    //         </div>
                    //     )
                    // }
                )
            }
        </>
    )
}

export default Auth;