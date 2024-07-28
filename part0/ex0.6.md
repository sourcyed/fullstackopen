```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note left of server: The server adds the new note to the notes array

    Note right of browser: The browser executes the callback function that adds the new note to the notes and renders them
```
