export async function onRequestGet(context) {
    const blob = await context.env.HYPERTAPE_KV.get("hypertape-blob");
    return new Response(`Requested ${Date()}
${blob}`);
}
