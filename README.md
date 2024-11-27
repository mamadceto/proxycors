# ProxyCORS Server

A simple Node.js-based proxy server that handles Cross-Origin Resource Sharing (CORS) by providing endpoints for fetching data from other URLs. This server can wrap responses in a JSON format, serve raw data, and support JSONP for client-side callback functions.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Endpoints](#endpoints)
   - [GET `/get`](#get-get)
   - [GET `/raw`](#get-raw)
4. [Customization](#customization)
5. [License](#license)

## Installation

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### Steps

1. Clone this repository:

   `git clone https://github.com/your-username/proxycors.git`

2. Navigate to the project directory:

   `cd proxycors`

3. Install dependencies:

   `npm install`

4. Run the server:

   `npm start`

   The server will start and be accessible on port `3000` (or the port specified in your `PORT` environment variable).

## Usage

Once the server is up and running, you can use it to make HTTP requests to other servers with CORS headers enabled. This can be particularly helpful when working with web applications that need to make cross-origin HTTP requests.

### Basic Structure

The proxy server has two main endpoints:

- **`/get`**: Wraps the response in a JSON format.
- **`/raw`**: Returns the raw response from the target URL.

## Endpoints

### GET `/get`

**Description**: Fetches data from a specified `url` and wraps it in a JSON object with the structure `{ contents: <response> }`. If a `callback` query parameter is provided, the response will be formatted as JSONP.

**Request Format**:

`GET http://localhost:3000/get?url=<target-url>&callback=<callback-function>`

**Parameters**:
- `url` (required): The target URL to fetch data from.
- `callback` (optional): A callback function name for JSONP response.

**Example Request**:

`GET http://localhost:3000/get?url=https://example.com/api/data&callback=myCallback`

**Example Response**:
- If `callback=myCallback` is provided:

myCallback({
  contents: "<html>...</html>"
});

- Otherwise:

{
  "contents": "<html>...</html>"
}

### GET `/raw`

**Description**: Fetches data from a specified `url` and returns the raw response without any modification.

**Request Format**:

`GET http://localhost:3000/raw?url=<target-url>`

**Parameters**:
- `url` (required): The target URL to fetch data from.

**Example Request**:

`GET http://localhost:3000/raw?url=https://example.com/api/data`

**Example Response**:
- Returns the raw response from `https://example.com/api/data`.

## Customization

### CORS Configuration

By default, the server allows cross-origin requests from all origins (`Access-Control-Allow-Origin: *`). You can modify this behavior in the `app.use()` middleware block to restrict allowed origins, methods, or headers according to your needs.

### Port Configuration

To change the default port (`3000`), you can set the `PORT` environment variable:

`PORT=8080 npm start`

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and use it according to your needs.
