export function onRequest(context) {
    return new Response(`${Math.random()*100}`);
}
