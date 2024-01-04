import React, {useEffect, useState} from "react";
import {useSearchParams,useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import {Table} from "antd";
import './styles.scss'
import { Pagination } from 'antd';


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
    const [showModel, setShowModel] = useState(false);
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
            const url = "http://localhost:4000/auth"
            console.log("before call")
            console.log(data)
            // const res = await axios.post(url, {
            //     "code": data
            // });
            // console.log(res, "response")
            if (true) {
                const list = [
                    {
                        "id": "18cc9cf4cd4372cb",
                        "threadId": "18cc9cf4cd4372cb",
                        "labelIds": [
                            "IMPORTANT",
                            "CATEGORY_UPDATES",
                            "INBOX"
                        ],
                        "snippet": "ORGANIZATION Minoan Experience Inc Greetings from MongoDB, Your latest bill for the MongoDB Atlas organization Minoan Experience Inc is now available. Your account has been charged $598.47 and billed",
                        "payload": {
                            "partId": "",
                            "mimeType": "multipart/mixed",
                            "filename": "",
                            "headers": [
                                {
                                    "name": "Delivered-To",
                                    "value": "suraj.singh@minoanexperience.com"
                                },
                                {
                                    "name": "Received",
                                    "value": "by 2002:a05:7108:5582:b0:364:7efa:2efc with SMTP id bh2csp6912990gdb;        Tue, 2 Jan 2024 02:54:15 -0800 (PST)"
                                },
                                {
                                    "name": "X-Google-Smtp-Source",
                                    "value": "AGHT+IE+htGPPRmkJRotCfQvKPQq28JbcgD1cwpJdlwWKgwZVMBilI65irW7Lh+fDccsWk6gznYA"
                                },
                                {
                                    "name": "X-Received",
                                    "value": "by 2002:a05:620a:951:b0:781:a663:6810 with SMTP id w17-20020a05620a095100b00781a6636810mr6215116qkw.14.1704192855469;        Tue, 02 Jan 2024 02:54:15 -0800 (PST)"
                                },
                                {
                                    "name": "ARC-Seal",
                                    "value": "i=1; a=rsa-sha256; t=1704192855; cv=none;        d=google.com; s=arc-20160816;        b=RiaZw4rs/U91zpne+euC/I9zuWdPgSr/N18JbRIuusmL1clroYXP/y5YzdWF7wRlfh         glf0K7IPeSljn9ytDDooeNS0l0ZOycgqg6zgcI7nPxx82Mp7x03caNpi28vQJ2WiIhDI         0DPA9Qk5B1r/i1EJ2KyODk7YXudofdZ9O2BR6YYKo2zqWqyE+2+ufz0f8bOJzU/Ipdjx         lt3S8xmGMwRZt6tJsTfrVKl1H7vjNrZR6YU7MVr+hnNtxx2jVHLNTBI1n/hsZ1uSXv7g         ZbFjnNrQrHw2Fzae3sME0uc/SPbU7AuM7gQ8FiZ0+5hTf4OUQZvuK/jiJzDhbBIzcwxN         MEkg=="
                                },
                                {
                                    "name": "ARC-Message-Signature",
                                    "value": "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;        h=feedback-id:mime-version:subject:message-id:to:reply-to:from:date         :dkim-signature:dkim-signature;        bh=My4+cXD6GO9XczO0hN2tjImW2b49FrV2SX6OixJqMmw=;        fh=5Dt2uGrm9ppNKejAGjPguP+ZMH5uqmXirW7QEBjGB1M=;        b=jorhgznzTbRn0fG4Kozysoz8GIX/7cP4xUTx8JvvCclyyV5u6B0kTEQNussz/PRE7W         bVb74QjGQjDoG+UNR8cQc75rg8HCsyClvYimjLD0r3FI1h/8be0jkNhO7bJ+EzCwYZTF         UUqpw6/4N9DAJ5T3Mi5UIQHCLWvhs5W83I0IWS5Un3pFJdvNloUxH25WQIMr7Mj7QpSF         O11YFvGO9CJc6X+hXCziU+WW8hn7CZqMJFsiYh4bAv7gNzXDdYPpdVFrhVEq6hzejFq8         eVTbD/DTSRfDwlkTKIbksSSqgXQM+fonOOqNLxRWveB9gccKBeZNbEP3XhtMmegPYrXq         NrVA=="
                                },
                                {
                                    "name": "ARC-Authentication-Results",
                                    "value": "i=1; mx.google.com;       dkim=pass header.i=@mongodb.com header.s=ko76z2kppla3wfp2jtfsovsgv5jpylfj header.b=\"McY/4iRU\";       dkim=pass header.i=@amazonses.com header.s=224i4yxa5dv7c2xz3womw6peuasteono header.b=YTqM49lA;       spf=pass (google.com: domain of 0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com designates 54.240.11.58 as permitted sender) smtp.mailfrom=0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=mongodb.com"
                                },
                                {
                                    "name": "Return-Path",
                                    "value": "<0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com>"
                                },
                                {
                                    "name": "Received",
                                    "value": "from a11-58.smtp-out.amazonses.com (a11-58.smtp-out.amazonses.com. [54.240.11.58])        by mx.google.com with ESMTPS id u7-20020a05620a0c4700b00781a14c43besi8080165qki.674.2024.01.02.02.54.15        for <suraj.singh@minoanexperience.com>        (version=TLS1_2 cipher=ECDHE-ECDSA-AES128-GCM-SHA256 bits=128/128);        Tue, 02 Jan 2024 02:54:15 -0800 (PST)"
                                },
                                {
                                    "name": "Received-SPF",
                                    "value": "pass (google.com: domain of 0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com designates 54.240.11.58 as permitted sender) client-ip=54.240.11.58;"
                                },
                                {
                                    "name": "Authentication-Results",
                                    "value": "mx.google.com;       dkim=pass header.i=@mongodb.com header.s=ko76z2kppla3wfp2jtfsovsgv5jpylfj header.b=\"McY/4iRU\";       dkim=pass header.i=@amazonses.com header.s=224i4yxa5dv7c2xz3womw6peuasteono header.b=YTqM49lA;       spf=pass (google.com: domain of 0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com designates 54.240.11.58 as permitted sender) smtp.mailfrom=0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=mongodb.com"
                                },
                                {
                                    "name": "DKIM-Signature",
                                    "value": "v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=ko76z2kppla3wfp2jtfsovsgv5jpylfj; d=mongodb.com; t=1704192854; h=Date:From:Reply-To:To:Message-ID:Subject:MIME-Version:Content-Type; bh=c5n/hPZS5zn/aog7YtLHKWswSigDzcRFscl2iQA61MM=; b=McY/4iRUjFa9tmb5uXzS+wyrkW+MmSb3rPV7EaS9gOYv2UcAjI43Io84CpjGTM95 3FLs+tJOmknIaVTRpaa4NDOaNL8GJG7WiptSDxBlUawHGWTmBcpmrQYw49eKTN6+mgZ veO3Munx6shIpqbYWIgQJWFcCbW8bdkx6LvnsNtM="
                                },
                                {
                                    "name": "DKIM-Signature",
                                    "value": "v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=224i4yxa5dv7c2xz3womw6peuasteono; d=amazonses.com; t=1704192854; h=Date:From:Reply-To:To:Message-ID:Subject:MIME-Version:Content-Type:Feedback-ID; bh=c5n/hPZS5zn/aog7YtLHKWswSigDzcRFscl2iQA61MM=; b=YTqM49lAI3cTslQAwIQJK21VlGalCh7Jm4/Bz6rIzq8iGnu05Bu/uOuf2UWnoJ3R TvNyPnhMXrp8ZHSjR6oL3hoRxPDKuMMcc2v8K4UdeRCwUfHKdNSalO3mGDumYuJocQQ tFF4EAo+zlSf3bJ50n5PWT3pdCy47m2vWhaam0ok="
                                },
                                {
                                    "name": "Date",
                                    "value": "Tue, 2 Jan 2024 10:54:14 +0000"
                                },
                                {
                                    "name": "From",
                                    "value": "MongoDB Cloud <cloud-manager-support@mongodb.com>"
                                },
                                {
                                    "name": "Reply-To",
                                    "value": "cloud-manager-support@mongodb.com"
                                },
                                {
                                    "name": "To",
                                    "value": "suraj.singh@minoanexperience.com"
                                },
                                {
                                    "name": "Message-ID",
                                    "value": "<0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@email.amazonses.com>"
                                },
                                {
                                    "name": "Subject",
                                    "value": "Minoan Experience Inc - Invoice Charge Successful"
                                },
                                {
                                    "name": "MIME-Version",
                                    "value": "1.0"
                                },
                                {
                                    "name": "Content-Type",
                                    "value": "multipart/mixed; boundary=\"----=_Part_105891_2108511638.1704192854757\""
                                },
                                {
                                    "name": "Feedback-ID",
                                    "value": "1.us-east-1.SQF4pBjWHY2JcNoZz7Je3LrKT+vZTBvBiJRSu0bEyrk=:AmazonSES"
                                },
                                {
                                    "name": "X-SES-Outgoing",
                                    "value": "2024.01.02-54.240.11.58"
                                }
                            ],
                            "body": {
                                "size": 0
                            },
                            "parts": [
                                {
                                    "partId": "0",
                                    "mimeType": "multipart/alternative",
                                    "filename": "",
                                    "headers": [
                                        {
                                            "name": "Content-Type",
                                            "value": "multipart/alternative; boundary=\"----=_Part_105890_1685826192.1704192854756\""
                                        }
                                    ],
                                    "body": {
                                        "size": 0
                                    },
                                    "parts": [
                                        {
                                            "partId": "0.0",
                                            "mimeType": "text/html",
                                            "filename": "",
                                            "headers": [
                                                {
                                                    "name": "Content-Type",
                                                    "value": "text/html; charset=utf-8"
                                                },
                                                {
                                                    "name": "Content-Transfer-Encoding",
                                                    "value": "7bit"
                                                }
                                            ],
                                            "body": {
                                                "size": 3621,
                                                "data": "PG1ldGEgY2hhcnNldD0iVVRGLTgiLz4NCiAgICA8dGFibGUgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBiZ2NvbG9yPSIjZjVmNmY3Ij4NCiAgICAgICAgPHRyPjx0ZCBoZWlnaHQ9IjUwIj48L3RkPjwvdHI-DQogICAgICAgIDx0cj4NCiAgICAgICAgICAgIDx0ZCBhbGlnbj0iY2VudGVyIiB2YWxpZ249InRvcCI-DQogICAgICAgICAgICAgICAgPCEtLSB0YWJsZSBsdmwgMSAtLT4NCiAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9IjYwMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBiZ2NvbG9yPSIjZmZmZmZmIiBzdHlsZT0iYm9yZGVyOjFweCBzb2xpZCAjZjFmMmY1IiBjbGFzcz0ibWFpbi1jb250ZW50Ij4NCiAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49IjMiIGhlaWdodD0iNjAiIGJnY29sb3I9IiNmZmZmZmYiIHN0eWxlPSJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlZWVlOyBwYWRkaW5nLWxlZnQ6MTZweDsiIGFsaWduPSJsZWZ0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9Imh0dHBzOi8vY2xvdWQubW9uZ29kYi5jb20vc3RhdGljL2ltYWdlcy9sb2dvLW1vbmdvZGItYXRsYXMucG5nIiBzdHlsZT0iZGlzcGxheTpibG9jazt3aWR0aDoxMTJweDtoZWlnaHQ6NDFweDsiLz4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ-DQogICAgICAgICAgICAgICAgICAgIDwvdHI-DQogICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sc3Bhbj0iMyIgaGVpZ2h0PSIyMCI-PC90ZD48L3RyPg0KICAgICAgICAgICAgICAgICAgICA8dHI-DQogICAgICAgICAgICAgICAgICAgICAgICA8dGQgd2lkdGg9IjIwIj48L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGFsaWduPSJsZWZ0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIHRhYmxlIGx2bCAyIC0tPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHdpZHRoPSIxMDAlIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49IjMiPjxzcGFuIHN0eWxlPSJmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOiM5OTk5OTkiIGNsYXNzPSJsYWJlbCI-T1JHQU5JWkFUSU9OPC9zcGFuPjwvdGQ-DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI-DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sc3Bhbj0iMyI-PHNwYW4gc3R5bGU9ImZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0Om5vcm1hbDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyMHB4O2NvbG9yOiMzMzMzMzMiPjxhIGhyZWY9Imh0dHBzOi8vY2xvdWQubW9uZ29kYi5jb20vdjIjL29yZy82MmUzNzQyMjJmYmQ2NTMzNzk0Y2Y1ODkvcHJvamVjdHMiPk1pbm9hbiBFeHBlcmllbmNlIEluYzwvYT48L3NwYW4-PC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sc3Bhbj0iMyIgaGVpZ2h0PSIyMCI-PC90ZD48L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sc3Bhbj0iMyIgaGVpZ2h0PSIxIiBiZ2NvbG9yPSIjZWVlZWVlIiBzdHlsZT0iZm9udC1zaXplOjFweDtsaW5lLWhlaWdodDoxcHg7Ij4mbmJzcDs8L3RkPjwvdHI-DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sc3Bhbj0iMyIgaGVpZ2h0PSIyMCI-PC90ZD48L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI-PHRkIGNvbHNwYW49IjMiPjxwPkdyZWV0aW5ncyBmcm9tIE1vbmdvREIsPC9wPg0KDQo8cD4NCllvdXIgbGF0ZXN0IGJpbGwgZm9yIHRoZSBNb25nb0RCIEF0bGFzIG9yZ2FuaXphdGlvbiA8Yj5NaW5vYW4gRXhwZXJpZW5jZSBJbmM8L2I-IGlzIG5vdyBhdmFpbGFibGUuDQoNCg0KDQogIFlvdXIgYWNjb3VudCBoYXMgYmVlbiBjaGFyZ2VkICQ1OTguNDcgIGFuZCBiaWxsZWQgdG8gYSBjcmVkaXQgY2FyZCBlbmRpbmcgaW4gMjE1OS4NCg0KDQoNCg0KWW91IG1heSB2aWV3IHlvdXIgYmlsbCA8YSBocmVmPSJodHRwczovL2Nsb3VkLm1vbmdvZGIuY29tL3YyIy9vcmcvNjJlMzc0MjIyZmJkNjUzMzc5NGNmNTg5L2JpbGxpbmcvcGF5bWVudEhpc3RvcnkiPmhlcmU8L2E-Lg0KDQpJZiB5b3UgaGF2ZSBhbnkgcXVlc3Rpb25zIGFib3V0IHlvdXIgYWNjb3VudCwgcGxlYXNlIHZpc2l0IDxhIGhyZWY9Imh0dHBzOi8vY2xvdWQubW9uZ29kYi5jb20vc3VwcG9ydCI-b3VyIHN1cHBvcnQgcGFnZTwvYT4uDQo8L3A-DQoNCjxwPg0KVGhhbmsgeW91IGZvciB1c2luZyBNb25nb0RCIEF0bGFzLg0KPC9wPg0KDQo8cD4NClNpbmNlcmVseSwNCjwvcD4NCjxwPg0KTW9uZ29EQiBBdGxhcw0KPC9wPg0KPC90ZD48L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI-PHRkIGNvbHNwYW49IjMiIGhlaWdodD0iMjAiPjwvdGQ-PC90cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49IjMiIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXIiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPSJmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtjb2xvcjojY2NjY2NjOyI-VGhpcyBtZXNzYWdlIHdhcyBzZW50IGZyb20gTW9uZ29EQiwgSW5jLiwgMTYzMyBCcm9hZHdheSwgMzh0aCBmbG9vciwgTlksIE5ZIDEwMDE5PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ-DQogICAgICAgICAgICAgICAgICAgICAgICA8dGQgd2lkdGg9IjIwIj48L3RkPg0KICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICA8dHI-PHRkIGNvbHNwYW49IjMiIGhlaWdodD0iMjAiPjwvdGQ-PC90cj4NCiAgICAgICAgICAgICAgICA8L3RhYmxlPg0KICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgPC90cj4NCiAgICAgICAgPHRyPg0KICAgICAgICAgICAgPHRkIGhlaWdodD0iNTAiPg0KICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgPC90cj4NCiAgICA8L3RhYmxlPg0KICAgIA0K"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "partId": "1",
                                    "mimeType": "application/pdf",
                                    "filename": "MongoDB Atlas Invoice - 2024-01-01 - Minoan Experience Inc.pdf",
                                    "headers": [
                                        {
                                            "name": "Content-Type",
                                            "value": "application/pdf; name=\"MongoDB Atlas Invoice - 2024-01-01 - Minoan Experience Inc.pdf\""
                                        },
                                        {
                                            "name": "Content-Transfer-Encoding",
                                            "value": "base64"
                                        },
                                        {
                                            "name": "Content-Disposition",
                                            "value": "attachment; filename=\"MongoDB Atlas Invoice - 2024-01-01 - Minoan Experience Inc.pdf\""
                                        }
                                    ],
                                    "body": {
                                        "attachmentId": "ANGjdJ9mCYNLlQ60aBRs7aeia3mNtqCcVYbqqCwslbOzxVv2FOa8oMiJm8YUxOI3ie3woB6D54uEAjQTbZBaGv5xmDZTlP4WLvSOXcyfxrR9wu8pFjtN7aORyTOecWjfAdj1ckvSR11gwBUwQmF9SXjNh0v-_YH2KJFeQ-OCesUOriuECOBUWSK_a0hn_Qcx9aEBCAki8kBWOIyyXFavEr4J0PqwvFAPItvUgYx_scrUmeNgo5PzW7gsfaE3TwQyoIX2aSA8lh9viyDNBj9JWDBTHFhoIzsWuvh6I2FxLFtfc9Noi7iDG1icYzqWSBTVO_xi7XlL_Ku_4Cr1LdFGeNxhwRaGP00e1xG4RdTlX8ap51ljAdU6KKct5yngcwXyQClIoFITue6eRTCEgMOS",
                                        "size": 51380
                                    }
                                }
                            ]
                        },
                        "sizeEstimate": 79580,
                        "historyId": "94789",
                        "internalDate": "1704192854000"
                    },
                    {
                        "id": "18cc4b394ba63dd8",
                        "threadId": "18cc4b394ba63dd8",
                        "labelIds": [
                            "IMPORTANT",
                            "CATEGORY_UPDATES",
                            "INBOX"
                        ],
                        "snippet": "Dear SURAJ SINGH Your payslip for the month of Dec 2023 has been released. Thank you. This is an auto-generated mail. Please do not reply. For any queries, write to us at sp@sproviders.com. PS: &quot;",
                        "payload": {
                            "partId": "",
                            "mimeType": "multipart/mixed",
                            "filename": "",
                            "headers": [
                                {
                                    "name": "Delivered-To",
                                    "value": "suraj.singh@minoanexperience.com"
                                },
                                {
                                    "name": "Received",
                                    "value": "by 2002:a05:7108:5582:b0:364:7efa:2efc with SMTP id bh2csp6402028gdb;        Mon, 1 Jan 2024 03:05:52 -0800 (PST)"
                                },
                                {
                                    "name": "X-Google-Smtp-Source",
                                    "value": "AGHT+IGg2ClWOa9SHA3jyKwEcettHHVwHa44HQNNhwhQx4/kkSYdYPZ3PwqyWchkeoGk1MypnRXK"
                                },
                                {
                                    "name": "X-Received",
                                    "value": "by 2002:a05:6808:4494:b0:3bb:c73e:7ca with SMTP id eq20-20020a056808449400b003bbc73e07camr14925309oib.2.1704107152476;        Mon, 01 Jan 2024 03:05:52 -0800 (PST)"
                                },
                                {
                                    "name": "ARC-Seal",
                                    "value": "i=1; a=rsa-sha256; t=1704107152; cv=none;        d=google.com; s=arc-20160816;        b=0Q7f4QKOGqx0z3nNrL5LA+BVUH9pidOsyn6okPigCsxw1dCjpiCCpD9gN01qGc+tFD         LR1iN+b6vtOAe4B9qBSRKKpIMGbSRLAQ4Yi0pqm6mpmhA8kbOUfUI9aBtX4UuhAZLqE6         Zng06VBrnEdRHOBr23jAJ04NJ930sz1E2t8waWVJ9JZx0JjDNxzgaeIzPrjqLSjBr8Fq         yIbuOGsmGBa13XD9NO1Vn8mnO1o+qQjqRbOSPORZckGyIuUvATmsD3wOXgpKdwJdUfQj         /Sb8ZLrwpRWxqKOjsLKr2/tQ7rCHrqNjjj+ea8C4R0rrseceW9Q/r17LAUuhTT2iQ0pc         mI3Q=="
                                },
                                {
                                    "name": "ARC-Message-Signature",
                                    "value": "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;        h=feedback-id:list-unsubscribe:tenant-id:mime-version:subject         :message-id:to:reply-to:from:date:dkim-signature:dkim-signature;        bh=b7TjBRBxJVAAnWU1v7TchpqjBDUfDj64zs9fb01srrA=;        fh=5Dt2uGrm9ppNKejAGjPguP+ZMH5uqmXirW7QEBjGB1M=;        b=zep5hKrwb4BWfA4WKduq88XlSECoXqH/HktEdFqlsXtn1UEUgKNRhptezYm5b0oGNr         bVxRoBcprrs4WqoSqBmd7PPa9LNd3AJXz4QkkCVPQTJrAJ8Aqr7QDjdLr6nVPQB1RpyW         6qqBO9cfL/kQqtTlIBPxBOk1ME3lL1DgunofO+JuM/YolIW4ZjU5e2GfMqtdxHJ6E/K/         HocWKYTXdEIKyXapwg1Z2K0lJnilIoBYRaj5LOvH/tlO17+eoLLSq9T/ai2AVIni0zDf         qO3XNZfFQaPpmqfTKRKBWyyQ3Gg5GLTj8fAbtMIoUmYlCDrZirrYEFkdMuHPigfQRiBV         AaUQ=="
                                },
                                {
                                    "name": "ARC-Authentication-Results",
                                    "value": "i=1; mx.google.com;       dkim=pass header.i=@greythr.com header.s=nc2048 header.b=XY+F2gAW;       dkim=pass header.i=@env.etransmail.com header.s=fnc header.b=uXUqVTwT;       spf=pass (google.com: domain of 17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com designates 175.158.69.173 as permitted sender) smtp.mailfrom=17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=greythr.com"
                                },
                                {
                                    "name": "Return-Path",
                                    "value": "<17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com>"
                                },
                                {
                                    "name": "Received",
                                    "value": "from mta-69.173.etransmail.com (mta-69.173.etransmail.com. [175.158.69.173])        by mx.google.com with ESMTPS id f184-20020a6251c1000000b006d9f66b15d6si9235909pfb.147.2024.01.01.03.05.51        for <suraj.singh@minoanexperience.com>        (version=TLS1_3 cipher=TLS_AES_256_GCM_SHA384 bits=256/256);        Mon, 01 Jan 2024 03:05:52 -0800 (PST)"
                                },
                                {
                                    "name": "Received-SPF",
                                    "value": "pass (google.com: domain of 17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com designates 175.158.69.173 as permitted sender) client-ip=175.158.69.173;"
                                },
                                {
                                    "name": "Authentication-Results",
                                    "value": "mx.google.com;       dkim=pass header.i=@greythr.com header.s=nc2048 header.b=XY+F2gAW;       dkim=pass header.i=@env.etransmail.com header.s=fnc header.b=uXUqVTwT;       spf=pass (google.com: domain of 17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com designates 175.158.69.173 as permitted sender) smtp.mailfrom=17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=greythr.com"
                                },
                                {
                                    "name": "DKIM-Signature",
                                    "value": "v=1; a=rsa-sha256; c=relaxed/relaxed; d=greythr.com; s=nc2048; h=feedback-id:list-unsubscribe:content-type:mime-version:subject:message-id:to:\t reply-to:from:from:to:subject; bh=b7TjBRBxJVAAnWU1v7TchpqjBDUfDj64zs9fb01srrA=; b=XY+F2gAWmqZzSP2LnoSKPLj1zT9PuY6saSyxZ7S+rD/eKxz0RsOqRqxw26Dr20Kv+f/ySLE/Aa5aU\t acs4jZatz4bWwSU5tupg4iYc21ldRm/sX3Q4D0+RQhO8RXPX3/lOUFZCP8z8UyqXgGxA8wwNH6NC9i\t sfM2p9E0PJ/Wadc21ZQLfyckOpM21wOXH126CBBum4Za9slOR4/Yw/PVf5ze/4ws4CQT9FKcyk/ELM\t f1mfjCyA7Geg9v/6bvHUrpQ9s5ufyXGVDn/D78uLlQzj7u2D6KvHXMxvVmvcwssx9jMps8greNXACx\t 8KPm3QbSC9fZ/HIxqtq2+vf1R/xdwnQ=="
                                },
                                {
                                    "name": "DKIM-Signature",
                                    "value": "v=1; a=rsa-sha256; c=relaxed/relaxed; d=env.etransmail.com; s=fnc; h=feedback-id:list-unsubscribe:content-type:mime-version:subject:message-id:to:\t reply-to:from:from:to:subject; bh=b7TjBRBxJVAAnWU1v7TchpqjBDUfDj64zs9fb01srrA=; b=uXUqVTwTSTeEx6Q/ED7MnU/2Eer9ROsqhqQLsZLoM0a6s7gx4hEehd/b53Cft6nuaBZAFkZFl12oi\t /JXMfUCZ4xHFmzOGZoto0dZN1fOM/qXoHkjYyrI6jhOAiKZ/xSP9qX0vQXPOwCUmmm2Hh5h/fqoubc\t EExQ4EveT7Xbxbs4="
                                },
                                {
                                    "name": "Date",
                                    "value": "Mon, 01 Jan 2024 16:35:51 +0530"
                                },
                                {
                                    "name": "From",
                                    "value": "HR Portal <no-reply@greythr.com>"
                                },
                                {
                                    "name": "Reply-To",
                                    "value": "no-reply@greythr.com"
                                },
                                {
                                    "name": "To",
                                    "value": "suraj.singh@minoanexperience.com"
                                },
                                {
                                    "name": "Message-ID",
                                    "value": "<1759108088.968469.1704107150976@gt-mailer-54d4f88464-pcqdp>"
                                },
                                {
                                    "name": "Subject",
                                    "value": "Payslip Released"
                                },
                                {
                                    "name": "MIME-Version",
                                    "value": "1.0"
                                },
                                {
                                    "name": "Content-Type",
                                    "value": "multipart/mixed; boundary=\"----=_Part_968467_1785522435.1704107150970\""
                                },
                                {
                                    "name": "Tenant-Id",
                                    "value": "1927cfd0-3752-5156-9d4b-3c4149b79872"
                                },
                                {
                                    "name": "X-JOB",
                                    "value": "greythr_eapi:177770:20240101"
                                },
                                {
                                    "name": "X-InjTime",
                                    "value": "1704107150"
                                },
                                {
                                    "name": "List-Unsubscribe",
                                    "value": "<mailto:17040501637903512-177770@usub.ftrans03.com?subject=Unsubscribe>, <http://delivery.greythr.com/VWMKDF?id=177770=NEtTAgEABQ4ITxMZQRQXQ0UVQxERQkJBFUYRGBgQRRdBF0MTFhcSGRgTExlBFBdDRQUfQkQQAwsbFVhWX1glWghZDFJYUkpJXUFaXA9XUk0GWg5NAFVSVQVTAQkOA1IOUQRWAgRLWk1MQwkWTlBSDwxDBkNITAUTUB9FUEoeBlgMGDVke3x2fwdaV0UXBw==>"
                                },
                                {
                                    "name": "Feedback-ID",
                                    "value": "MTc3NzcwOjIwMjQwMTAxXzE2Og==:pepipostE"
                                },
                                {
                                    "name": "X-FNCID",
                                    "value": "177770-17040501637903512-0"
                                },
                                {
                                    "name": "X-Mta-Source",
                                    "value": "greythr_eapi_177770"
                                },
                                {
                                    "name": "X-Traffic-Type",
                                    "value": "177770-2"
                                }
                            ],
                            "body": {
                                "size": 0
                            },
                            "parts": [
                                {
                                    "partId": "0",
                                    "mimeType": "multipart/related",
                                    "filename": "",
                                    "headers": [
                                        {
                                            "name": "Content-Type",
                                            "value": "multipart/related; boundary=\"----=_Part_968468_1351172084.1704107150970\""
                                        }
                                    ],
                                    "body": {
                                        "size": 0
                                    },
                                    "parts": [
                                        {
                                            "partId": "0.0",
                                            "mimeType": "text/html",
                                            "filename": "",
                                            "headers": [
                                                {
                                                    "name": "Content-Type",
                                                    "value": "text/html;charset=UTF-8"
                                                },
                                                {
                                                    "name": "Content-Transfer-Encoding",
                                                    "value": "7bit"
                                                }
                                            ],
                                            "body": {
                                                "size": 575,
                                                "data": "PHA-RGVhciBTVVJBSiBTSU5HSDxiciAvPllvdXIgcGF5c2xpcCBmb3IgdGhlIG1vbnRoIG9mIERlYyAyMDIzIGhhcyBiZWVuIHJlbGVhc2VkLjxiciAvPlRoYW5rIHlvdS48YnIgLz5UaGlzIGlzIGFuIGF1dG8tZ2VuZXJhdGVkIG1haWwuIFBsZWFzZSBkbyBub3QgcmVwbHkuPGJyIC8-Rm9yIGFueSBxdWVyaWVzLCB3cml0ZSB0byB1cyBhdCBzcEBzcHJvdmlkZXJzLmNvbS48L3A-PGJyLz48YnIvPjxici8-PGJyLz48ZGl2PjxzbWFsbD48Yj5QUzogPC9iPiJUaGlzIGUtbWFpbCBpcyBnZW5lcmF0ZWQgZnJvbSBmdXR1cmV4LmdyZXl0aHIuY29tIjwvc21hbGw-PC9kaXY-PGltZyBzcmM9J2h0dHA6Ly9kZWxpdmVyeS5ncmV5dGhyLmNvbS9WV01LREY_aWQ9MTc3NzcwPUxrdFRBZ0VBQlE0SVR4TVpRUlFYUTBVVlF4RVJRa0pCRlVZUkdCZ1FSUmRCRjBNVEZoY1NHUmdURXhsQkZCZERSUVVmUWtRUUF3c2JGVmhXWDFnbFdnaFpERkpZVWtwSlhVRmFYQTlYVWswR1dnNU5BRlZTVlFWVEFRa09BMUlPVVFSV0FnUkxXazFNUXdrV1RsQlNEd3hEQmtOSVRBVVRVQjlGVUVvZUJsZ01HRFZrZTN4MmZ3ZGFWMFVYQnc9PScgLz4="
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        "sizeEstimate": 6321,
                        "historyId": "94492",
                        "internalDate": "1704107151000"
                    },
                    {
                        "id": "18cc9cf4cd4372cb",
                        "threadId": "18cc9cf4cd4372cb",
                        "labelIds": [
                            "IMPORTANT",
                            "CATEGORY_UPDATES",
                            "INBOX"
                        ],
                        "snippet": "ORGANIZATION Minoan Experience Inc Greetings from MongoDB, Your latest bill for the MongoDB Atlas organization Minoan Experience Inc is now available. Your account has been charged $598.47 and billed",
                        "payload": {
                            "partId": "",
                            "mimeType": "multipart/mixed",
                            "filename": "",
                            "headers": [
                                {
                                    "name": "Delivered-To",
                                    "value": "suraj.singh@minoanexperience.com"
                                },
                                {
                                    "name": "Received",
                                    "value": "by 2002:a05:7108:5582:b0:364:7efa:2efc with SMTP id bh2csp6912990gdb;        Tue, 2 Jan 2024 02:54:15 -0800 (PST)"
                                },
                                {
                                    "name": "X-Google-Smtp-Source",
                                    "value": "AGHT+IE+htGPPRmkJRotCfQvKPQq28JbcgD1cwpJdlwWKgwZVMBilI65irW7Lh+fDccsWk6gznYA"
                                },
                                {
                                    "name": "X-Received",
                                    "value": "by 2002:a05:620a:951:b0:781:a663:6810 with SMTP id w17-20020a05620a095100b00781a6636810mr6215116qkw.14.1704192855469;        Tue, 02 Jan 2024 02:54:15 -0800 (PST)"
                                },
                                {
                                    "name": "ARC-Seal",
                                    "value": "i=1; a=rsa-sha256; t=1704192855; cv=none;        d=google.com; s=arc-20160816;        b=RiaZw4rs/U91zpne+euC/I9zuWdPgSr/N18JbRIuusmL1clroYXP/y5YzdWF7wRlfh         glf0K7IPeSljn9ytDDooeNS0l0ZOycgqg6zgcI7nPxx82Mp7x03caNpi28vQJ2WiIhDI         0DPA9Qk5B1r/i1EJ2KyODk7YXudofdZ9O2BR6YYKo2zqWqyE+2+ufz0f8bOJzU/Ipdjx         lt3S8xmGMwRZt6tJsTfrVKl1H7vjNrZR6YU7MVr+hnNtxx2jVHLNTBI1n/hsZ1uSXv7g         ZbFjnNrQrHw2Fzae3sME0uc/SPbU7AuM7gQ8FiZ0+5hTf4OUQZvuK/jiJzDhbBIzcwxN         MEkg=="
                                },
                                {
                                    "name": "ARC-Message-Signature",
                                    "value": "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;        h=feedback-id:mime-version:subject:message-id:to:reply-to:from:date         :dkim-signature:dkim-signature;        bh=My4+cXD6GO9XczO0hN2tjImW2b49FrV2SX6OixJqMmw=;        fh=5Dt2uGrm9ppNKejAGjPguP+ZMH5uqmXirW7QEBjGB1M=;        b=jorhgznzTbRn0fG4Kozysoz8GIX/7cP4xUTx8JvvCclyyV5u6B0kTEQNussz/PRE7W         bVb74QjGQjDoG+UNR8cQc75rg8HCsyClvYimjLD0r3FI1h/8be0jkNhO7bJ+EzCwYZTF         UUqpw6/4N9DAJ5T3Mi5UIQHCLWvhs5W83I0IWS5Un3pFJdvNloUxH25WQIMr7Mj7QpSF         O11YFvGO9CJc6X+hXCziU+WW8hn7CZqMJFsiYh4bAv7gNzXDdYPpdVFrhVEq6hzejFq8         eVTbD/DTSRfDwlkTKIbksSSqgXQM+fonOOqNLxRWveB9gccKBeZNbEP3XhtMmegPYrXq         NrVA=="
                                },
                                {
                                    "name": "ARC-Authentication-Results",
                                    "value": "i=1; mx.google.com;       dkim=pass header.i=@mongodb.com header.s=ko76z2kppla3wfp2jtfsovsgv5jpylfj header.b=\"McY/4iRU\";       dkim=pass header.i=@amazonses.com header.s=224i4yxa5dv7c2xz3womw6peuasteono header.b=YTqM49lA;       spf=pass (google.com: domain of 0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com designates 54.240.11.58 as permitted sender) smtp.mailfrom=0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=mongodb.com"
                                },
                                {
                                    "name": "Return-Path",
                                    "value": "<0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com>"
                                },
                                {
                                    "name": "Received",
                                    "value": "from a11-58.smtp-out.amazonses.com (a11-58.smtp-out.amazonses.com. [54.240.11.58])        by mx.google.com with ESMTPS id u7-20020a05620a0c4700b00781a14c43besi8080165qki.674.2024.01.02.02.54.15        for <suraj.singh@minoanexperience.com>        (version=TLS1_2 cipher=ECDHE-ECDSA-AES128-GCM-SHA256 bits=128/128);        Tue, 02 Jan 2024 02:54:15 -0800 (PST)"
                                },
                                {
                                    "name": "Received-SPF",
                                    "value": "pass (google.com: domain of 0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com designates 54.240.11.58 as permitted sender) client-ip=54.240.11.58;"
                                },
                                {
                                    "name": "Authentication-Results",
                                    "value": "mx.google.com;       dkim=pass header.i=@mongodb.com header.s=ko76z2kppla3wfp2jtfsovsgv5jpylfj header.b=\"McY/4iRU\";       dkim=pass header.i=@amazonses.com header.s=224i4yxa5dv7c2xz3womw6peuasteono header.b=YTqM49lA;       spf=pass (google.com: domain of 0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com designates 54.240.11.58 as permitted sender) smtp.mailfrom=0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@amazonses.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=mongodb.com"
                                },
                                {
                                    "name": "DKIM-Signature",
                                    "value": "v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=ko76z2kppla3wfp2jtfsovsgv5jpylfj; d=mongodb.com; t=1704192854; h=Date:From:Reply-To:To:Message-ID:Subject:MIME-Version:Content-Type; bh=c5n/hPZS5zn/aog7YtLHKWswSigDzcRFscl2iQA61MM=; b=McY/4iRUjFa9tmb5uXzS+wyrkW+MmSb3rPV7EaS9gOYv2UcAjI43Io84CpjGTM95 3FLs+tJOmknIaVTRpaa4NDOaNL8GJG7WiptSDxBlUawHGWTmBcpmrQYw49eKTN6+mgZ veO3Munx6shIpqbYWIgQJWFcCbW8bdkx6LvnsNtM="
                                },
                                {
                                    "name": "DKIM-Signature",
                                    "value": "v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=224i4yxa5dv7c2xz3womw6peuasteono; d=amazonses.com; t=1704192854; h=Date:From:Reply-To:To:Message-ID:Subject:MIME-Version:Content-Type:Feedback-ID; bh=c5n/hPZS5zn/aog7YtLHKWswSigDzcRFscl2iQA61MM=; b=YTqM49lAI3cTslQAwIQJK21VlGalCh7Jm4/Bz6rIzq8iGnu05Bu/uOuf2UWnoJ3R TvNyPnhMXrp8ZHSjR6oL3hoRxPDKuMMcc2v8K4UdeRCwUfHKdNSalO3mGDumYuJocQQ tFF4EAo+zlSf3bJ50n5PWT3pdCy47m2vWhaam0ok="
                                },
                                {
                                    "name": "Date",
                                    "value": "Tue, 2 Jan 2024 10:54:14 +0000"
                                },
                                {
                                    "name": "From",
                                    "value": "MongoDB Cloud <cloud-manager-support@mongodb.com>"
                                },
                                {
                                    "name": "Reply-To",
                                    "value": "cloud-manager-support@mongodb.com"
                                },
                                {
                                    "name": "To",
                                    "value": "suraj.singh@minoanexperience.com"
                                },
                                {
                                    "name": "Message-ID",
                                    "value": "<0100018cc9cf4aeb-550cebb5-9dde-4d1b-8927-7df9ad7299af-000000@email.amazonses.com>"
                                },
                                {
                                    "name": "Subject",
                                    "value": "Minoan Experience Inc - Invoice Charge Successful"
                                },
                                {
                                    "name": "MIME-Version",
                                    "value": "1.0"
                                },
                                {
                                    "name": "Content-Type",
                                    "value": "multipart/mixed; boundary=\"----=_Part_105891_2108511638.1704192854757\""
                                },
                                {
                                    "name": "Feedback-ID",
                                    "value": "1.us-east-1.SQF4pBjWHY2JcNoZz7Je3LrKT+vZTBvBiJRSu0bEyrk=:AmazonSES"
                                },
                                {
                                    "name": "X-SES-Outgoing",
                                    "value": "2024.01.02-54.240.11.58"
                                }
                            ],
                            "body": {
                                "size": 0
                            },
                            "parts": [
                                {
                                    "partId": "0",
                                    "mimeType": "multipart/alternative",
                                    "filename": "",
                                    "headers": [
                                        {
                                            "name": "Content-Type",
                                            "value": "multipart/alternative; boundary=\"----=_Part_105890_1685826192.1704192854756\""
                                        }
                                    ],
                                    "body": {
                                        "size": 0
                                    },
                                    "parts": [
                                        {
                                            "partId": "0.0",
                                            "mimeType": "text/html",
                                            "filename": "",
                                            "headers": [
                                                {
                                                    "name": "Content-Type",
                                                    "value": "text/html; charset=utf-8"
                                                },
                                                {
                                                    "name": "Content-Transfer-Encoding",
                                                    "value": "7bit"
                                                }
                                            ],
                                            "body": {
                                                "size": 3621,
                                                "data": "PG1ldGEgY2hhcnNldD0iVVRGLTgiLz4NCiAgICA8dGFibGUgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBiZ2NvbG9yPSIjZjVmNmY3Ij4NCiAgICAgICAgPHRyPjx0ZCBoZWlnaHQ9IjUwIj48L3RkPjwvdHI-DQogICAgICAgIDx0cj4NCiAgICAgICAgICAgIDx0ZCBhbGlnbj0iY2VudGVyIiB2YWxpZ249InRvcCI-DQogICAgICAgICAgICAgICAgPCEtLSB0YWJsZSBsdmwgMSAtLT4NCiAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9IjYwMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBiZ2NvbG9yPSIjZmZmZmZmIiBzdHlsZT0iYm9yZGVyOjFweCBzb2xpZCAjZjFmMmY1IiBjbGFzcz0ibWFpbi1jb250ZW50Ij4NCiAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49IjMiIGhlaWdodD0iNjAiIGJnY29sb3I9IiNmZmZmZmYiIHN0eWxlPSJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlZWVlOyBwYWRkaW5nLWxlZnQ6MTZweDsiIGFsaWduPSJsZWZ0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9Imh0dHBzOi8vY2xvdWQubW9uZ29kYi5jb20vc3RhdGljL2ltYWdlcy9sb2dvLW1vbmdvZGItYXRsYXMucG5nIiBzdHlsZT0iZGlzcGxheTpibG9jazt3aWR0aDoxMTJweDtoZWlnaHQ6NDFweDsiLz4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICANCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ-DQogICAgICAgICAgICAgICAgICAgIDwvdHI-DQogICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sc3Bhbj0iMyIgaGVpZ2h0PSIyMCI-PC90ZD48L3RyPg0KICAgICAgICAgICAgICAgICAgICA8dHI-DQogICAgICAgICAgICAgICAgICAgICAgICA8dGQgd2lkdGg9IjIwIj48L3RkPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGFsaWduPSJsZWZ0Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIHRhYmxlIGx2bCAyIC0tPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHdpZHRoPSIxMDAlIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49IjMiPjxzcGFuIHN0eWxlPSJmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOiM5OTk5OTkiIGNsYXNzPSJsYWJlbCI-T1JHQU5JWkFUSU9OPC9zcGFuPjwvdGQ-DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI-DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sc3Bhbj0iMyI-PHNwYW4gc3R5bGU9ImZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0Om5vcm1hbDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyMHB4O2NvbG9yOiMzMzMzMzMiPjxhIGhyZWY9Imh0dHBzOi8vY2xvdWQubW9uZ29kYi5jb20vdjIjL29yZy82MmUzNzQyMjJmYmQ2NTMzNzk0Y2Y1ODkvcHJvamVjdHMiPk1pbm9hbiBFeHBlcmllbmNlIEluYzwvYT48L3NwYW4-PC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sc3Bhbj0iMyIgaGVpZ2h0PSIyMCI-PC90ZD48L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sc3Bhbj0iMyIgaGVpZ2h0PSIxIiBiZ2NvbG9yPSIjZWVlZWVlIiBzdHlsZT0iZm9udC1zaXplOjFweDtsaW5lLWhlaWdodDoxcHg7Ij4mbmJzcDs8L3RkPjwvdHI-DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQgY29sc3Bhbj0iMyIgaGVpZ2h0PSIyMCI-PC90ZD48L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI-PHRkIGNvbHNwYW49IjMiPjxwPkdyZWV0aW5ncyBmcm9tIE1vbmdvREIsPC9wPg0KDQo8cD4NCllvdXIgbGF0ZXN0IGJpbGwgZm9yIHRoZSBNb25nb0RCIEF0bGFzIG9yZ2FuaXphdGlvbiA8Yj5NaW5vYW4gRXhwZXJpZW5jZSBJbmM8L2I-IGlzIG5vdyBhdmFpbGFibGUuDQoNCg0KDQogIFlvdXIgYWNjb3VudCBoYXMgYmVlbiBjaGFyZ2VkICQ1OTguNDcgIGFuZCBiaWxsZWQgdG8gYSBjcmVkaXQgY2FyZCBlbmRpbmcgaW4gMjE1OS4NCg0KDQoNCg0KWW91IG1heSB2aWV3IHlvdXIgYmlsbCA8YSBocmVmPSJodHRwczovL2Nsb3VkLm1vbmdvZGIuY29tL3YyIy9vcmcvNjJlMzc0MjIyZmJkNjUzMzc5NGNmNTg5L2JpbGxpbmcvcGF5bWVudEhpc3RvcnkiPmhlcmU8L2E-Lg0KDQpJZiB5b3UgaGF2ZSBhbnkgcXVlc3Rpb25zIGFib3V0IHlvdXIgYWNjb3VudCwgcGxlYXNlIHZpc2l0IDxhIGhyZWY9Imh0dHBzOi8vY2xvdWQubW9uZ29kYi5jb20vc3VwcG9ydCI-b3VyIHN1cHBvcnQgcGFnZTwvYT4uDQo8L3A-DQoNCjxwPg0KVGhhbmsgeW91IGZvciB1c2luZyBNb25nb0RCIEF0bGFzLg0KPC9wPg0KDQo8cD4NClNpbmNlcmVseSwNCjwvcD4NCjxwPg0KTW9uZ29EQiBBdGxhcw0KPC9wPg0KPC90ZD48L3RyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI-PHRkIGNvbHNwYW49IjMiIGhlaWdodD0iMjAiPjwvdGQ-PC90cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49IjMiIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXIiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPSJmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtjb2xvcjojY2NjY2NjOyI-VGhpcyBtZXNzYWdlIHdhcyBzZW50IGZyb20gTW9uZ29EQiwgSW5jLiwgMTYzMyBCcm9hZHdheSwgMzh0aCBmbG9vciwgTlksIE5ZIDEwMDE5PC9zcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ-DQogICAgICAgICAgICAgICAgICAgICAgICA8dGQgd2lkdGg9IjIwIj48L3RkPg0KICAgICAgICAgICAgICAgICAgICA8L3RyPg0KICAgICAgICAgICAgICAgICAgICA8dHI-PHRkIGNvbHNwYW49IjMiIGhlaWdodD0iMjAiPjwvdGQ-PC90cj4NCiAgICAgICAgICAgICAgICA8L3RhYmxlPg0KICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgPC90cj4NCiAgICAgICAgPHRyPg0KICAgICAgICAgICAgPHRkIGhlaWdodD0iNTAiPg0KICAgICAgICAgICAgICAgIA0KICAgICAgICAgICAgPC90ZD4NCiAgICAgICAgPC90cj4NCiAgICA8L3RhYmxlPg0KICAgIA0K"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "partId": "1",
                                    "mimeType": "application/pdf",
                                    "filename": "MongoDB Atlas Invoice - 2024-01-01 - Minoan Experience Inc.pdf",
                                    "headers": [
                                        {
                                            "name": "Content-Type",
                                            "value": "application/pdf; name=\"MongoDB Atlas Invoice - 2024-01-01 - Minoan Experience Inc.pdf\""
                                        },
                                        {
                                            "name": "Content-Transfer-Encoding",
                                            "value": "base64"
                                        },
                                        {
                                            "name": "Content-Disposition",
                                            "value": "attachment; filename=\"MongoDB Atlas Invoice - 2024-01-01 - Minoan Experience Inc.pdf\""
                                        }
                                    ],
                                    "body": {
                                        "attachmentId": "ANGjdJ9mCYNLlQ60aBRs7aeia3mNtqCcVYbqqCwslbOzxVv2FOa8oMiJm8YUxOI3ie3woB6D54uEAjQTbZBaGv5xmDZTlP4WLvSOXcyfxrR9wu8pFjtN7aORyTOecWjfAdj1ckvSR11gwBUwQmF9SXjNh0v-_YH2KJFeQ-OCesUOriuECOBUWSK_a0hn_Qcx9aEBCAki8kBWOIyyXFavEr4J0PqwvFAPItvUgYx_scrUmeNgo5PzW7gsfaE3TwQyoIX2aSA8lh9viyDNBj9JWDBTHFhoIzsWuvh6I2FxLFtfc9Noi7iDG1icYzqWSBTVO_xi7XlL_Ku_4Cr1LdFGeNxhwRaGP00e1xG4RdTlX8ap51ljAdU6KKct5yngcwXyQClIoFITue6eRTCEgMOS",
                                        "size": 51380
                                    }
                                }
                            ]
                        },
                        "sizeEstimate": 79580,
                        "historyId": "94789",
                        "internalDate": "1704192854000"
                    },

                    {
                        "id": "18cc4b394ba63dd8",
                        "threadId": "18cc4b394ba63dd8",
                        "labelIds": [
                            "IMPORTANT",
                            "CATEGORY_UPDATES",
                            "INBOX"
                        ],
                        "snippet": "Dear SURAJ SINGH Your payslip for the month of Dec 2023 has been released. Thank you. This is an auto-generated mail. Please do not reply. For any queries, write to us at sp@sproviders.com. PS: &quot;",
                        "payload": {
                            "partId": "",
                            "mimeType": "multipart/mixed",
                            "filename": "",
                            "headers": [
                                {
                                    "name": "Delivered-To",
                                    "value": "suraj.singh@minoanexperience.com"
                                },
                                {
                                    "name": "Received",
                                    "value": "by 2002:a05:7108:5582:b0:364:7efa:2efc with SMTP id bh2csp6402028gdb;        Mon, 1 Jan 2024 03:05:52 -0800 (PST)"
                                },
                                {
                                    "name": "X-Google-Smtp-Source",
                                    "value": "AGHT+IGg2ClWOa9SHA3jyKwEcettHHVwHa44HQNNhwhQx4/kkSYdYPZ3PwqyWchkeoGk1MypnRXK"
                                },
                                {
                                    "name": "X-Received",
                                    "value": "by 2002:a05:6808:4494:b0:3bb:c73e:7ca with SMTP id eq20-20020a056808449400b003bbc73e07camr14925309oib.2.1704107152476;        Mon, 01 Jan 2024 03:05:52 -0800 (PST)"
                                },
                                {
                                    "name": "ARC-Seal",
                                    "value": "i=1; a=rsa-sha256; t=1704107152; cv=none;        d=google.com; s=arc-20160816;        b=0Q7f4QKOGqx0z3nNrL5LA+BVUH9pidOsyn6okPigCsxw1dCjpiCCpD9gN01qGc+tFD         LR1iN+b6vtOAe4B9qBSRKKpIMGbSRLAQ4Yi0pqm6mpmhA8kbOUfUI9aBtX4UuhAZLqE6         Zng06VBrnEdRHOBr23jAJ04NJ930sz1E2t8waWVJ9JZx0JjDNxzgaeIzPrjqLSjBr8Fq         yIbuOGsmGBa13XD9NO1Vn8mnO1o+qQjqRbOSPORZckGyIuUvATmsD3wOXgpKdwJdUfQj         /Sb8ZLrwpRWxqKOjsLKr2/tQ7rCHrqNjjj+ea8C4R0rrseceW9Q/r17LAUuhTT2iQ0pc         mI3Q=="
                                },
                                {
                                    "name": "ARC-Message-Signature",
                                    "value": "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;        h=feedback-id:list-unsubscribe:tenant-id:mime-version:subject         :message-id:to:reply-to:from:date:dkim-signature:dkim-signature;        bh=b7TjBRBxJVAAnWU1v7TchpqjBDUfDj64zs9fb01srrA=;        fh=5Dt2uGrm9ppNKejAGjPguP+ZMH5uqmXirW7QEBjGB1M=;        b=zep5hKrwb4BWfA4WKduq88XlSECoXqH/HktEdFqlsXtn1UEUgKNRhptezYm5b0oGNr         bVxRoBcprrs4WqoSqBmd7PPa9LNd3AJXz4QkkCVPQTJrAJ8Aqr7QDjdLr6nVPQB1RpyW         6qqBO9cfL/kQqtTlIBPxBOk1ME3lL1DgunofO+JuM/YolIW4ZjU5e2GfMqtdxHJ6E/K/         HocWKYTXdEIKyXapwg1Z2K0lJnilIoBYRaj5LOvH/tlO17+eoLLSq9T/ai2AVIni0zDf         qO3XNZfFQaPpmqfTKRKBWyyQ3Gg5GLTj8fAbtMIoUmYlCDrZirrYEFkdMuHPigfQRiBV         AaUQ=="
                                },
                                {
                                    "name": "ARC-Authentication-Results",
                                    "value": "i=1; mx.google.com;       dkim=pass header.i=@greythr.com header.s=nc2048 header.b=XY+F2gAW;       dkim=pass header.i=@env.etransmail.com header.s=fnc header.b=uXUqVTwT;       spf=pass (google.com: domain of 17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com designates 175.158.69.173 as permitted sender) smtp.mailfrom=17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=greythr.com"
                                },
                                {
                                    "name": "Return-Path",
                                    "value": "<17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com>"
                                },
                                {
                                    "name": "Received",
                                    "value": "from mta-69.173.etransmail.com (mta-69.173.etransmail.com. [175.158.69.173])        by mx.google.com with ESMTPS id f184-20020a6251c1000000b006d9f66b15d6si9235909pfb.147.2024.01.01.03.05.51        for <suraj.singh@minoanexperience.com>        (version=TLS1_3 cipher=TLS_AES_256_GCM_SHA384 bits=256/256);        Mon, 01 Jan 2024 03:05:52 -0800 (PST)"
                                },
                                {
                                    "name": "Received-SPF",
                                    "value": "pass (google.com: domain of 17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com designates 175.158.69.173 as permitted sender) client-ip=175.158.69.173;"
                                },
                                {
                                    "name": "Authentication-Results",
                                    "value": "mx.google.com;       dkim=pass header.i=@greythr.com header.s=nc2048 header.b=XY+F2gAW;       dkim=pass header.i=@env.etransmail.com header.s=fnc header.b=uXUqVTwT;       spf=pass (google.com: domain of 17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com designates 175.158.69.173 as permitted sender) smtp.mailfrom=17040501637903512-177770-1-minoanexperience.com@delivery.greythr.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=greythr.com"
                                },
                                {
                                    "name": "DKIM-Signature",
                                    "value": "v=1; a=rsa-sha256; c=relaxed/relaxed; d=greythr.com; s=nc2048; h=feedback-id:list-unsubscribe:content-type:mime-version:subject:message-id:to:\t reply-to:from:from:to:subject; bh=b7TjBRBxJVAAnWU1v7TchpqjBDUfDj64zs9fb01srrA=; b=XY+F2gAWmqZzSP2LnoSKPLj1zT9PuY6saSyxZ7S+rD/eKxz0RsOqRqxw26Dr20Kv+f/ySLE/Aa5aU\t acs4jZatz4bWwSU5tupg4iYc21ldRm/sX3Q4D0+RQhO8RXPX3/lOUFZCP8z8UyqXgGxA8wwNH6NC9i\t sfM2p9E0PJ/Wadc21ZQLfyckOpM21wOXH126CBBum4Za9slOR4/Yw/PVf5ze/4ws4CQT9FKcyk/ELM\t f1mfjCyA7Geg9v/6bvHUrpQ9s5ufyXGVDn/D78uLlQzj7u2D6KvHXMxvVmvcwssx9jMps8greNXACx\t 8KPm3QbSC9fZ/HIxqtq2+vf1R/xdwnQ=="
                                },
                                {
                                    "name": "DKIM-Signature",
                                    "value": "v=1; a=rsa-sha256; c=relaxed/relaxed; d=env.etransmail.com; s=fnc; h=feedback-id:list-unsubscribe:content-type:mime-version:subject:message-id:to:\t reply-to:from:from:to:subject; bh=b7TjBRBxJVAAnWU1v7TchpqjBDUfDj64zs9fb01srrA=; b=uXUqVTwTSTeEx6Q/ED7MnU/2Eer9ROsqhqQLsZLoM0a6s7gx4hEehd/b53Cft6nuaBZAFkZFl12oi\t /JXMfUCZ4xHFmzOGZoto0dZN1fOM/qXoHkjYyrI6jhOAiKZ/xSP9qX0vQXPOwCUmmm2Hh5h/fqoubc\t EExQ4EveT7Xbxbs4="
                                },
                                {
                                    "name": "Date",
                                    "value": "Mon, 01 Jan 2024 16:35:51 +0530"
                                },
                                {
                                    "name": "From",
                                    "value": "HR Portal <no-reply@greythr.com>"
                                },
                                {
                                    "name": "Reply-To",
                                    "value": "no-reply@greythr.com"
                                },
                                {
                                    "name": "To",
                                    "value": "suraj.singh@minoanexperience.com"
                                },
                                {
                                    "name": "Message-ID",
                                    "value": "<1759108088.968469.1704107150976@gt-mailer-54d4f88464-pcqdp>"
                                },
                                {
                                    "name": "Subject",
                                    "value": "Payslip Released"
                                },
                                {
                                    "name": "MIME-Version",
                                    "value": "1.0"
                                },
                                {
                                    "name": "Content-Type",
                                    "value": "multipart/mixed; boundary=\"----=_Part_968467_1785522435.1704107150970\""
                                },
                                {
                                    "name": "Tenant-Id",
                                    "value": "1927cfd0-3752-5156-9d4b-3c4149b79872"
                                },
                                {
                                    "name": "X-JOB",
                                    "value": "greythr_eapi:177770:20240101"
                                },
                                {
                                    "name": "X-InjTime",
                                    "value": "1704107150"
                                },
                                {
                                    "name": "List-Unsubscribe",
                                    "value": "<mailto:17040501637903512-177770@usub.ftrans03.com?subject=Unsubscribe>, <http://delivery.greythr.com/VWMKDF?id=177770=NEtTAgEABQ4ITxMZQRQXQ0UVQxERQkJBFUYRGBgQRRdBF0MTFhcSGRgTExlBFBdDRQUfQkQQAwsbFVhWX1glWghZDFJYUkpJXUFaXA9XUk0GWg5NAFVSVQVTAQkOA1IOUQRWAgRLWk1MQwkWTlBSDwxDBkNITAUTUB9FUEoeBlgMGDVke3x2fwdaV0UXBw==>"
                                },
                                {
                                    "name": "Feedback-ID",
                                    "value": "MTc3NzcwOjIwMjQwMTAxXzE2Og==:pepipostE"
                                },
                                {
                                    "name": "X-FNCID",
                                    "value": "177770-17040501637903512-0"
                                },
                                {
                                    "name": "X-Mta-Source",
                                    "value": "greythr_eapi_177770"
                                },
                                {
                                    "name": "X-Traffic-Type",
                                    "value": "177770-2"
                                }
                            ],
                            "body": {
                                "size": 0
                            },
                            "parts": [
                                {
                                    "partId": "0",
                                    "mimeType": "multipart/related",
                                    "filename": "",
                                    "headers": [
                                        {
                                            "name": "Content-Type",
                                            "value": "multipart/related; boundary=\"----=_Part_968468_1351172084.1704107150970\""
                                        }
                                    ],
                                    "body": {
                                        "size": 0
                                    },
                                    "parts": [
                                        {
                                            "partId": "0.0",
                                            "mimeType": "text/html",
                                            "filename": "",
                                            "headers": [
                                                {
                                                    "name": "Content-Type",
                                                    "value": "text/html;charset=UTF-8"
                                                },
                                                {
                                                    "name": "Content-Transfer-Encoding",
                                                    "value": "7bit"
                                                }
                                            ],
                                            "body": {
                                                "size": 575,
                                                "data": "PHA-RGVhciBTVVJBSiBTSU5HSDxiciAvPllvdXIgcGF5c2xpcCBmb3IgdGhlIG1vbnRoIG9mIERlYyAyMDIzIGhhcyBiZWVuIHJlbGVhc2VkLjxiciAvPlRoYW5rIHlvdS48YnIgLz5UaGlzIGlzIGFuIGF1dG8tZ2VuZXJhdGVkIG1haWwuIFBsZWFzZSBkbyBub3QgcmVwbHkuPGJyIC8-Rm9yIGFueSBxdWVyaWVzLCB3cml0ZSB0byB1cyBhdCBzcEBzcHJvdmlkZXJzLmNvbS48L3A-PGJyLz48YnIvPjxici8-PGJyLz48ZGl2PjxzbWFsbD48Yj5QUzogPC9iPiJUaGlzIGUtbWFpbCBpcyBnZW5lcmF0ZWQgZnJvbSBmdXR1cmV4LmdyZXl0aHIuY29tIjwvc21hbGw-PC9kaXY-PGltZyBzcmM9J2h0dHA6Ly9kZWxpdmVyeS5ncmV5dGhyLmNvbS9WV01LREY_aWQ9MTc3NzcwPUxrdFRBZ0VBQlE0SVR4TVpRUlFYUTBVVlF4RVJRa0pCRlVZUkdCZ1FSUmRCRjBNVEZoY1NHUmdURXhsQkZCZERSUVVmUWtRUUF3c2JGVmhXWDFnbFdnaFpERkpZVWtwSlhVRmFYQTlYVWswR1dnNU5BRlZTVlFWVEFRa09BMUlPVVFSV0FnUkxXazFNUXdrV1RsQlNEd3hEQmtOSVRBVVRVQjlGVUVvZUJsZ01HRFZrZTN4MmZ3ZGFWMFVYQnc9PScgLz4="
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        "sizeEstimate": 6321,
                        "historyId": "94492",
                        "internalDate": "1704107151000"
                    }
                ]

                setTabledata(list);
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

    // function handleMailClick(){
    //     setShowModel(true);
    // }
    function closeMailClick(){
        setShowModel(false);

    }
    return (
        <>
            <div className="email_header">
                <div className={'container-fluid'}>
                    <div className={'inner_header_wrap'}>
                        <div className={'logo-wrap'}>
                            <a href="" className={'logo-ui'}>
                                <img src="https://dev-my.minoanexperience.com/assets/images/update-minoan_logo_green.svg" alt=""/>
                            </a>
                        </div>

                    </div>

                </div>

            </div>
           <div className={'table_outer_container'}>
               <div className={'table_inner_container'}>
                   {
                       isLoading ? (<>Loading</>) : (

                           <Table
                               className='custom-table-wrap product-table'
                               // rowSelection={rowSelection}
                               onRow={(record,index)=>{
                                   return{
                                       onClick:(e)=> {
                                           console.log({record,index})
                                           console.log("working");
                                           setShowModel(true);
                                       }
                                   }
                               }}
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
               </div>
               <div className={'pagination_outer'}>
                 <div className={'pagination_inner'}>
                     <Pagination defaultCurrent={1} total={50} />
                 </div>

               </div>
           </div>

            <div>
                <Modal

                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showModel}
                >
                    <Modal.Header closeButton  onClick={closeMailClick}>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Heading
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <p>apple</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeMailClick} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Auth;
