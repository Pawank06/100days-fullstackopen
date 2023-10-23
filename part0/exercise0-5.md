```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->Browser: Open browser, visit https://studies.cs.helsinki.fi/exampleapp/spa
    activate Browser
    Browser->Server: Request the single-page app
    activate Server
    Server-->>Browser: Return the single-page app HTML
    deactivate Server

    User->Browser: Browser loads the single-page app
    Note right of Browser: The single-page app loads JavaScript and assets
    Note right of Browser: The app navigates to the Notes section

    Browser->Server: AJAX request for notes data
    activate Server
    Server-->>Browser: Return notes data (JSON)
    deactivate Server

    Note right of Browser: The app dynamically renders notes on the page
    User->Browser: Interacts with the single-page app (e.g., create, edit, or delete notes)```
