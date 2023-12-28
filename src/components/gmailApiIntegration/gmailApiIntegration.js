import React, { useEffect, useState } from 'react';
import {Base64} from 'js-base64';

const GmailApiQuickstart = () => {
    const [previousPageLink, setPreviousPageLink] = useState("")
    const [nextPageLink, setNextPageLink] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    async function handleAuthClick() {

        console.log(window.gapi.client.getToken(), "window.gapi.client.getToken()")
        if (window.gapi.client.getToken() === null) {
            console.log("inside")
            let token = localStorage.getItem("googleTokenClient")
            console.log(token, "token")
            if (token){
                window.tokenClient = JSON.parse(token);
                document.getElementById('signout_button').style.visibility = 'visible';
                // document.getElementById('authorize_button').innerText = 'Refresh';
                await listLabels();
                // window.tokenClient.requestAccessToken({prompt: ''});
            }else {

                // Prompt the user to select a Google Account and ask for consent to share their data
                // when establishing a new session.
                window.tokenClient.requestAccessToken({prompt: 'consent'});
            }
        } else {
            console.log("else")
            // Skip display of account chooser and consent dialog for an existing session.
            document.getElementById('signout_button').style.visibility = 'visible';
            // document.getElementById('authorize_button').innerText = 'Refresh';
            await listLabels();
        }

        window.tokenClient.callback = async (resp) => {

            if (resp.error !== undefined) {
                throw (resp);
            }

            console.log(window.gapi.client.getToken(), "window.gapi.client.getToken() 2")
            document.getElementById('signout_button').style.visibility = 'visible';
            // document.getElementById('authorize_button').innerText = 'Refresh';
            await listLabels();


        };
    }


    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick() {
        const token = window.gapi.client.getToken();
        if (token !== null) {
            window.google.accounts.oauth2.revoke(token.access_token);
            window.gapi.client.setToken('');
            document.getElementById('content').innerText = '';
            document.getElementById('authorize_button').innerText = 'Authorize';
            document.getElementById('signout_button').style.visibility = 'hidden';
        }
    }

    function getDataFromParts(res){
        let rawBody = res.result.payload?.parts
        // console.log(rawBody)
        if (!rawBody) return ""

        let decodedBody = ""
        for (let index = 0; index < rawBody.length; index++){
            let item = rawBody[index]
            // console.log(item)
            // console.log(item.mimeType)
            if(item.mimeType === "text/html"){
                decodedBody = item.body.data;
                break;
            }
            else if(item["mimeType"] === "text/plain"){
                decodedBody = item.body.data;
            }
        }
        // console.log(decodedBody);

        return Base64.decode(decodedBody.replace(/-/g, '+').replace(/_/g, '/'));
    }

    function decodeMailBody(res){
        let rawBody = res.result.payload.body?.data
        if (!rawBody) return getDataFromParts(res)

        const decodedHtmlString = Base64.decode(rawBody.replace(/-/g, '+').replace(/_/g, '/'));
        return decodedHtmlString
    }

    function getHeadersData(res){
        const headers = res?.result?.payload?.headers;
        if (!headers || headers === []){
            return ""
        }

        let headersMap = {}
        headers.forEach((header) => {
            if (header["name"] === "From" || header["name"] === "Subject"){
                headersMap[header["name"]] = header["value"]
            }
        })

        return headersMap
    }

    function elementContainsText(element, text) {
        return element.textContent.includes(text);
    }

    function getGreatGrandparent(element) {
        var greatGrandparent = element.parentElement?.parentElement?.parentElement;
        return greatGrandparent;
    }

    function findAnchorByTextContent(sibling) {
        console.log(sibling, "a array")
        for (var i = 0; i < sibling.length; i++) {
            if (sibling[i].textContent.includes("Qty")) {
                return sibling[i];
            }
        }
        return null;
    }

    function getSku(url){
        var match = url.match(/-([^\/]+)\.html/);

        if (match && match[1]) {
            return match[1].split('-').pop();
        }
        return null
    }

    function extractOrderAndTrackingInfo(decodedBody) {
        let newDiv = document.createElement('div');

        // Set inner HTML or text content for the new element
        newDiv.innerHTML = decodedBody
        document.body.appendChild(newDiv);
        // Get the elements containing order and tracking information
        let paragraphs = document.querySelectorAll('p');

        // Initialize variables to store order and tracking elements
        let orderElement = null;
        let trackingElement = null;

        // Iterate over the paragraphs and find the ones with specific content
        paragraphs.forEach(function (paragraph) {
            let content = paragraph.textContent.trim();
            if (content.startsWith('Order #:')) {
                orderElement = paragraph;
            } else if (content.startsWith('Tracking #:')) {
                trackingElement = paragraph;
            }
        });

        // Extract order and tracking numbers
        let orderNumber = orderElement ? orderElement.textContent.trim().split(':')[1].trim() : null;
        let trackingNumber = trackingElement ? trackingElement.textContent.trim().split(':')[1].trim() : null;

        // Extract links
        let orderLink = orderElement ? orderElement.querySelector('a').getAttribute('href') : null;
        let trackingLink = trackingElement ? trackingElement.querySelector('a').getAttribute('href') : null;

        // Display the results
        // console.log('Order Number:', orderNumber);
        // console.log('Order Link:', orderLink);
        // console.log('Tracking Number:', trackingNumber);
        // console.log('Tracking Link:', trackingLink);


        var strongElement = Array.from(document.querySelectorAll('strong')).find(element => elementContainsText(element, 'Item(s) in this Shipment'));
        let shippingOrderDetails = []

        // Check if the <strong> element is found
        if (strongElement) {
            // Find the first <tr> ancestor with an "id" containing "Row"
            var ancestorTr = strongElement.closest('tr[id*=Row]');

            // Check if the ancestor <tr> is found
            if (ancestorTr) {
                // Get the parent of the ancestor <tr>
                var parentOfAncestor = ancestorTr.parentNode;

                // Iterate over all the siblings of the parent
                var sibling = parentOfAncestor.nextElementSibling;

                while (sibling) {
                    // console.log(sibling, "sibling")

                    var qtyElement = Array.from(sibling.querySelectorAll('a')).find(element => elementContainsText(element, 'Qty'));
                    // console.log(qtyElement, "anchors")


                    if(qtyElement){
                        var spanValue = qtyElement.querySelector('span').textContent.trim();
                        // console.log("Quantity : ", spanValue);

                        var grandparents = getGreatGrandparent(qtyElement);

                        var firstChild = grandparents.firstElementChild;
                        // console.log('First child of the great-grandparent:', firstChild);


                        var hrefValue = firstChild.querySelector('a').getAttribute('href');
                        var textContent = firstChild.textContent.trim();

                        // Display the results
                        // console.log('Href:', hrefValue);
                        // console.log('Text Content:', textContent);

                        if (spanValue && hrefValue && textContent){
                            shippingOrderDetails.push({
                                "Quantity": spanValue,
                                "sku": getSku(hrefValue),
                                "title": textContent
                            })
                        }
                    }

                    // Move to the next sibling
                    sibling = sibling.nextElementSibling;
                }
            } else {
                console.log('Ancestor <tr> with "Row" in id not found.');
            }
        } else {
            console.log('Strong element not found.');
        }

        // console.log(shippingOrderDetails)

        const reqBody = {
            'Order Number:': orderNumber,
            'Order Link:': orderLink,
            'Tracking Number:': trackingNumber,
            'Tracking Link:': trackingLink,
            'shippingOrderDetails': shippingOrderDetails
        }

        console.log(reqBody, "ReqBody")


        document.body.removeChild(newDiv);
    }


    function addRow(res){
        var table = document.getElementById("myTable");
        var row = table.insertRow(table.rows.length);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        // console.log(res.result.payload.body)
        const decodedBody = decodeMailBody(res)
        const headersData = getHeadersData(res);

        // console.log(decodedBody, "html body")

        cell1.innerHTML = headersData["From"];
        cell2.innerHTML = headersData["Subject"];
        cell3.innerHTML = res.result.snippet;
        cell4.innerHTML = decodedBody;

        if(decodedBody && headersData["From"].includes("<orders@minoanexperience.com>")) extractOrderAndTrackingInfo(decodedBody)
    }

    function updateTableData(res){
        setTotalRecords(res.result?.resultSizeEstimate)
        setNextPageLink(res.result?.nextPageToken)
        setPreviousPageLink(res.result?.previousPageToken)
    }

    /**
     * Print all Labels in the authorized user's inbox. If no labels
     * are found an appropriate message is printed.
     */
    async function listLabels(pageCode = "", page = 1) {
        console.log("listLabels")
        let response;
        try {
            response = await window.gapi.client.gmail.users.messages.list({
                'userId': 'me',
                "maxResults": 10,
                "pageToken": pageCode
            });
        } catch (err) {
            document.getElementById('content').innerText = err.message;
            return;
        }
        console.log(response)

        updateTableData(response)

        const labels = response.result.messages;
        if (!labels || labels.length == 0) {
            document.getElementById('content').innerText = 'No labels found.';
            return;
        }

        document.getElementById("myTable").innerHTML = "";

        for (const item of labels) {
            response = await window.gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': item.id
            });
            console.log(response)
            addRow(response)
        }

        setCurrentPage(page);
    }

    return (
        <>
            <meta charSet="UTF-8" />
            <title>
                &lt;!DOCTYPE html&gt; &lt;html&gt; &lt;head&gt; &lt;title&gt;Gmail API
                Quickstart
            </title>
            <meta charSet="utf-8" />
            <p>Gmail API Quickstart</p>
            {/*Add buttons to initiate auth sequence and sign out*/}
            <button id="authorize_button" onClick={handleAuthClick}>
                Authorize
            </button>
            <button id="signout_button" onClick={handleSignoutClick}>
                Sign Out
            </button>
            <pre id="content" style={{ whiteSpace: "pre-wrap" }} />
            <table id="myTable" border="1">
                <tr>
                </tr>
            </table>

            <button onClick={() => {
                listLabels(previousPageLink, currentPage - 1)
            }}>Previous</button>

            {(
                <div className='pagination_text' style={{}}>
                    <span>Page {currentPage} of {Math.ceil(totalRecords / 50)}</span>
                </div>
            )}

            <button onClick={() => {
                listLabels(nextPageLink, currentPage + 1)
            }} disabled={currentPage === Math.ceil(totalRecords / 50)}>Next</button>
        </>
    );
};

export default GmailApiQuickstart;