function template(posts,submission=null) {
    const submissionReceived = submission ? 
    `<div id="submission_received">Your submission has been received. (${Date()})</div>` : '';
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="hypertape.css">
</head>
<body>
<main>
<header>
<h1> Hypertape </h1>
<form method="POST" class="form-example">
    <label for="submission"></label>
    <textarea name="submission" id="submission" rows="6" cols="80" required></textarea>
    <input type="submit" value="Post">
</form>
    ${submissionReceived}
</header>
    <article class='post'>${posts.join('</article>\n<article class="post">')}</article>
</main>
</body>
</html>`;
}

export async function onRequest(context) {
    const posts = JSON.parse(
        await context.env.HYPERTAPE_KV.get("hypertape-blob")
    );
    // Extract submission
    let submission = null;
    const req = context.request;
    const {method, headers} = req;
    if (req.method == 'POST') {
        const contentType = headers.get('content-type') || '';
        if (contentType.includes('form')) {
            const formData = await req.formData();
            if (formData.has('submission')) {
                submission = formData.get('submission');
                posts.unshift(submission);
                // Send new data to KV store.
                const newValue = JSON.stringify(posts);
                await context.env.HYPERTAPE_KV.put("hypertape-blob",newValue);
            }
        }
    }
    return new Response(
        template(posts,submission),
        {headers: {
            'content-type': 'text/html;charset=UTF-8',
        },}
   );
}
