export async function onRequest(context) {
    return new Response(`Requested ${Date()}.
${JSON.parse(await HYPERTAPE_KV.get("hypertape-blob")).join('\n')}
`);
}
