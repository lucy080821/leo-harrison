# How the web works

## The client–server model

The web is a **client–server** system: the **client** (a browser) sends a **request**, the **server** returns a **response**. They talk using a shared **protocol**, **HTTP**.

![A browser sending requests and the server returning responses](/lessons/foundations/09-how-the-web-works-http-en.svg)
*A page needs several requests: HTML first, then CSS and JavaScript.*

## One page view, step by step

1. You type a **URL**, e.g. `https://example.com/learning`.
2. The browser asks **DNS** to turn the domain name into an IP address.
3. It opens a connection (usually encrypted with **TLS**, hence HTTPS).
4. It sends a request: `GET /learning HTTP/1.1` plus **headers**.
5. The server replies with a status code (`200 OK`, `404 Not Found`…), headers and a **body**, usually HTML.
6. The browser parses the HTML, fetches CSS, JavaScript and images, then renders.

RFC 9110 (*HTTP Semantics*, 2022) defines the meaning of **methods** (`GET` retrieves a resource, `POST` submits data for processing, `PUT`, `DELETE`…) and **status codes** by class: 1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error.

## The three languages of the browser

According to MDN's guides, the three standard web technologies have different roles:

| Technology | Role |
|---|---|
| **HTML** | structure and content |
| **CSS** | presentation, layout |
| **JavaScript** | behaviour, interaction |

## REST and APIs

Roy Fielding (PhD dissertation, 2000, chapter 5) described the **REST** architectural style derived from the Web's own architecture: resources identified by URLs, manipulated through a **uniform interface** (the HTTP methods), each request self-descriptive (**stateless**). An **API** in this style returns data (often **JSON**) instead of an HTML page, for other applications to use.

## References

- Fielding, R., Nottingham, M., Reschke, J. (2022). *RFC 9110: HTTP Semantics*; *RFC 9112: HTTP/1.1*. IETF.
- Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*, chapter 5. UC Irvine.
- MDN Web Docs, *Learn web development: Getting started* and *How the web works*.
- Berners-Lee et al. (1994). The World-Wide Web. *CACM* 37(8).
