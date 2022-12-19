function template(posts,submission=null) {
    const submissionReceived = submission ? 
    `<div id="submission_received">Your submission has been received. (${Date()})</div>` : '';
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
</head>
<body>
<h1> Hypertape </h1>
<form method="POST" class="form-example">
    <label for="submission"></label>
    <input type="textarea" name="submission" id="submission" required>
    <input type="submit" value="Post">
</form>
    ${submissionReceived}
    <div class='post'>${posts.join('</div>\n<div class="post">')}</div>
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
    if (req.method == 'POST') {
        submission = request.body;
        posts.unshift(submission);
    }
    return new Response(
        template(posts,submission),
        {headers: {
            'content-type': 'text/html;charset=UTF-8',
        },}
   );
}
