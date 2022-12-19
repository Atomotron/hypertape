export function onRequest(context) {
    return new Response(`Requested ${Date()}.
${JSON.parse(HYPERTAPE_KV.get("hypertape-blob")).join('\n')}
`);
}
